---
title: Starting This Blog
date: 2026-03-15
tags:
  - hardware
  - nudk40
  - meetup
categories:
  - hardware
---

> If you don't say anything, no one will hear you.

This quote has been stuck in my head lately. So I decided to start writing.

## The Beginning

Through an introduction from the founder of [nucode](https://nuworks.io), I'm starting technical writing on hardware. It begins with building something based on the NUDK40, but this blog will also be a place to document everything else I want to make.

Paprika Data Lab, Walla, and life in the turbulent age of AI — I want to record what I'm doing right now.

## Nucode Technical Writers Meetup

We held a meetup on March 7th. It was the push I needed to finally start writing, something I'd only been thinking about.

People from so many different backgrounds showed up, which was great. What to build? The problem was having too many things to make.

#### Things I Want to Build
1. **Wireless split keyboard**
2. **Board game simulator** — hardware-based
3. **NUDK40 simulator**
4. **Flipper Zero expansion kit**

The **wireless split keyboard** — existing products are either too expensive or not aesthetically pleasing.

The **NUDK40 simulator** was an idea inspired by the Arduino emulator [Velxio](https://velxio.dev/). My current thinking is to use `nrf52840` from the repo below to emulate a virtual NUDK40 with [Renode](https://renode.io).

{{< github repo="antmicro/renode-zephyr-nrf52840" description="Renode simulation of Zephyr RTOS on nRF52840" >}}

[Flipper Zero](https://flipper.net) — it's been about two years since I bought it with so much excitement... and I still can't find a good use for it. Access cards and TV remotes, at best.

I haven't decided yet, so nothing's moving forward. I should ask the other writers in the group what looks interesting to them.

Hopefully by the next post, I'll have picked a topic.
