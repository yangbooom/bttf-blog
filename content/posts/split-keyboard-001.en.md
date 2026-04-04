---
title: Why I'm Building My Own Split Keyboard
date: 2026-04-03
tags:
  - hardware
  - keyboard
  - split-keyboard
  - ZMK
  - NUCODE
  - 누코드
  - NU40 DK
  - MCU
categories:
  - hardware
description: Starting from the limitations I felt using the Keychron Q11, this post explains why I'm designing a thinner, better-looking wireless split TKL keyboard and outlines the overall project architecture.
---

# EP.01 — Why I'm Building My Own Split Keyboard

> What this post covers
>
> - The limitations I felt while using the Keychron Q11
> - Why there's no real market for a "thin and good-looking split TKL"
> - The overall spec and architecture of the project
> - The BOM and estimated cost

---

## The Q11 Is Good. But.

I've been using the Keychron Q11 as my main keyboard. I'm happy with the split TKL layout itself. Once you get used to typing with your hands spread apart, it's hard to go back to a regular keyboard.

The problem is thickness.

The Q11 is a solid board with an aluminum unibody and a gasket mount, but that also makes it thick. Its front height is around 22mm, which means your wrists end up bent at a pretty noticeable angle if you type without a wrist rest. On the desk, it also feels visually heavy. To be honest, it's bulky.

Then there's the design. If I'm being charitable, the Q11 looks practical. If I'm not, it looks plain. That's the limitation of a mass-produced product. It's a tool I look at for more than eight hours a day, and I kept thinking it would be nice if it were something that actually made me happy every time I saw it.

So the requirements are simple.

- Keep the split TKL layout.
- Make it much thinner.
- Make it look the way I want.

## The Market Doesn't Really Have an Answer

If you look for a "thin split TKL," there are barely any options.

Low-profile split keyboards do exist. But most of them are minimal layouts in the 40- to 60-key range — boards like the Corne, Lily58, or Sofle. Their philosophy is to cover everything with layers, but that doesn't fit the way I type. I want a physical function row and physical arrow keys.

On the other hand, true split TKL boards are rare outside the Q11, and the ones that do exist are all thick. If you're using standard MX switches, it's difficult to push the profile below a certain point.

So the conclusion was obvious: **build it myself.**

The key to reducing thickness is the case. If I remove unnecessary margins from the PCB and optimize the internal space of the case down to the millimeter, I should be able to make something noticeably slimmer than the Q11. If I machine it out of CNC aluminum, I can keep the profile thin without giving up rigidity, and I can finish it the way I want.

And while I'm at it, I want to make it wireless. On the Q11, the two halves have to be connected by a cable. If that cable disappears too, the desk gets much cleaner.

## Project Spec

The goal is to keep what I liked about the Q11 and change what I didn't.

### What Changes Compared to the Q11

| Item | Keychron Q11 | This project |
|------|---------------|--------------|
| Layout | Split TKL (89 keys) | Split TKL (~87 keys) |
| Front height | ~22mm | Target: 15mm or less |
| Left/right connection | USB-C cable | BLE 5.0 wireless |
| PC connection | Wired USB-C | BLE / USB hybrid |
| Case | Production CNC aluminum | Custom CNC aluminum |
| Switches | MX hotswap | MX hotswap (same) |
| Firmware | QMK (VIA) | ZMK |
| Weight | About 2kg total | As light as possible |

### Hardware

| Item | Choice | Notes |
|------|--------|-------|
| Controller | NUCODE NU40 DK | Based on nRF52840 |
| Switch mounting | MX-compatible hotswap sockets | Kailh or Gateron |
| Diodes | 1N4148W (SOD-123) | SMD, one per key |
| Case | CNC aluminum 6061 | Three-piece top + bottom + plate |
| Battery | 3.7V LiPo | One per half |
| PCB | 2-layer, 1.6mm | FR-4 |

### Software & Fabrication

| Item | Choice |
|------|--------|
| Firmware | ZMK (Zephyr-based, BLE-native) |
| Schematic design | KiCad 9 + marbastlib |
| Case design | Fusion 360 |
| PCB/CNC manufacturing | PCBWay |

## Why NUCODE NU40 DK

For wireless custom keyboards, the de facto standard is the nice!nano. It uses the nRF52840 in a Pro Micro-compatible form factor, so you can get up and running with ZMK right away.

But for this project, I chose the NUCODE NU40 DK.

**More GPIO headroom.** If you build an 87-key TKL as a matrix, each half needs at least 14 pins of its own: 6 rows and 8 columns. The nice!nano is constrained by the Pro Micro form factor, so there isn't much room left in terms of GPIO. The NU40 DK exposes almost all of the nRF52840's GPIO, which makes pin assignment much more flexible.

**A Korean company.** NUCODE is a Seoul-based official partner of Nordic Semiconductor. That means faster part sourcing and the possibility of getting technical support in Korean.

**Native fit with Zephyr.** Since ZMK runs on top of Zephyr, the fit is naturally good. And during debugging, I can still use the Arduino IDE for quick experiments.

There are trade-offs, of course. It's not a Pro Micro footprint, which means I have to design the PCB from scratch, and I also have to write a custom board definition for ZMK. But there isn't an off-the-shelf PCB for a split TKL like this anyway, so in practice I would be building it from scratch either way.

## Overall Architecture

```text
┌─────────────────────────────┐     BLE 5.0     ┌─────────────────────────────┐
│        Left (Central)       │ ◄──────────────► │      Right (Peripheral)     │
│                             │                  │                             │
│  ┌─────────┐  ┌──────────┐ │                  │ ┌──────────┐  ┌─────────┐  │
│  │NU40 DK  │──│Key matrix│ │                  │ │Key matrix│──│NU40 DK  │  │
│  │         │  │  44 keys  │ │                  │ │  43 keys  │  │         │  │
│  └────┬────┘  └──────────┘ │                  │ └──────────┘  └────┬────┘  │
│       │                     │                  │                    │       │
│  ┌────┴────┐  ┌──────────┐ │                  │ ┌──────────┐  ┌───┴─────┐ │
│  │ USB-C   │  │ Battery  │ │                  │ │ Battery  │  │ USB-C   │ │
│  │(charge/ │  │ 3.7V LiPo│ │                  │ │ 3.7V LiPo│  │(charge) │ │
│  │ wired)  │  └──────────┘ │                  │ └──────────┘  └─────────┘ │
│  └────┬────┘               │                  │                            │
└───────┼─────────────────────┘                  └────────────────────────────┘
        │ BLE 5.0 / USB
        ▼
   ┌─────────┐
   │   PC    │
   └─────────┘
```

The left half acts as the central side. It receives key input from the right half over BLE and passes everything to the PC. When USB-C is connected, it switches into wired mode and charges the battery at the same time. Unlike the Q11, there's no cable between the two halves.

## Strategy for Making It Thinner

The core challenge of this project is thickness. If I want to stay under a 15mm front height while still using standard MX switches, I have to optimize every element down to the millimeter.

The stack height of an MX switch looks roughly like this.

```text
     ┌──────────┐
     │ Keycap   │  ~6.5mm
     └────┬─────┘
     ┌────┴─────┐
     │ Switch   │  ~5mm (above plate)
─────┤ Plate    ├───── ← reference line
     │ Switch   │  ~5mm (below plate)
     └────┬─────┘
     ┌────┴─────┐
     │ PCB      │  ~1.6mm
     └────┬─────┘
          │ Hotswap socket  ~2mm
     ┌────┴─────┐
     │ Bottom   │  ~2mm (case wall)
     └──────────┘
```

The space above the plate is basically untouchable. The only place I can really save height is below the plate.

- **PCB-to-plate spacing** — normally around 5mm, but it may be possible to push it down to 3.5mm if the hotswap socket clearance is secured
- **Bottom case interior** — only as much space as the height of the rear-side components and the battery requires
- **Bottom case wall thickness** — with CNC aluminum, 1.5 to 2mm should be enough

Going from the Q11's roughly 22mm front height down to a target of around 15mm means shaving off about 7mm. That's the central technical challenge of the whole project. I'll go into the actual section views and mechanical design in the case episode.

## BOM and Estimated Cost

| Item | Qty | Estimated unit price | Subtotal |
|------|-----|----------------------|----------|
| NUCODE NU40 DK | 2 | ~₩30,000 | ₩60,000 |
| Hotswap sockets (Kailh) | 90 | ~₩150 | ₩13,500 |
| 1N4148W diodes | 90 | ~₩30 | ₩2,700 |
| PCB fabrication (PCBWay) | 5 left/right sets | ~$15 | ₩20,000 |
| PCBA (SMT assembly) | 5 left/right sets | ~$30 | ₩40,000 |
| CNC case (aluminum) | 1 left/right set | ~$150 | ₩200,000 |
| Anodizing | 1 set | ~$30 | ₩40,000 |
| LiPo battery | 2 | ~₩5,000 | ₩10,000 |
| USB-C connector and misc. parts | - | - | ₩15,000 |
| Switches / keycaps | - | - | Using parts I already own |
| **Total** |  |  | **About ₩400,000** |

> These are rough estimates. CNC machining cost in particular can change a lot depending on the geometry. I'll share the real numbers in the ordering episode.

The Q11 launched at around $200, so purely in terms of cost, this is about twice as expensive. But if 400,000 won gets me a one-of-a-kind keyboard with the thickness and design I actually want, that doesn't feel like a bad trade.

## Series Roadmap

| Episode | Topic | Core content |
|---------|-------|--------------|
| **EP.01** | Why build it myself? | The post you're reading now |
| **EP.02** | Layout design and key matrix | KLE, matrix basics, GPIO pin mapping |
| **EP.03** | Schematic and PCB design in KiCad | Schematic, PCB layout, Gerber generation |
| **EP.04** | Case design in Fusion 360 | CNC modeling for a slim profile |
| **EP.05** | PCBWay ordering guide | One-stop PCB + CNC ordering |
| **EP.06** | Building the ZMK firmware | NU40 DK board definition, keymap, build |
| **EP.07** | Assembly, testing, and retrospective | Final build and comparison with the Q11 |

I plan to publish the schematic, firmware code, and 3D case model on GitHub.

---

> TIP: If this is your first time designing a custom keyboard PCB, start with ai03's [PCB Design Guide](https://wiki.ai03.com/books/pcb-design). For wireless nRF52840-based designs, ebastler's [ZMK Hardware Design Guide](https://github.com/ebastler/zmk-designguide) is the best reference I've found.

---

## References

- [Keychron Q11 product page](https://www.keychron.com/products/keychron-q11-qmk-custom-mechanical-keyboard)
- [NUCODE official site](https://nuworks.io/)
- [ZMK Firmware documentation](https://zmk.dev/docs)
- [ebastler/zmk-designguide](https://github.com/ebastler/zmk-designguide)

In the next post, I'll lock in the layout with Keyboard Layout Editor and go through the basics of key matrices and GPIO pin assignment on the nRF52840.
