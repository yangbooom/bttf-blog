---
title: Brain in a Vat 001
date: 2026-03-15
tags:
  - simulation
  - eon-systems
  - brain
  - connectome
  - drosophila
  - mujoco
categories:
  - Fun
---

The Matrix. Brain in a vat. Always thought these were fascinating concepts.

I once saw a project that simulated [C. elegans](https://en.wikipedia.org/wiki/Caenorhabditis_elegans) — all 302 neurons, simulated in their entirety. Cool, sure, but it's such a simple organism that it didn't blow my mind.

Then [Eon Systems](https://eon.systems/) simulated a **fruit fly brain**, brought it to life inside a computer, and the virtual fly started moving like a real one.

Whoa... how on earth did they do that?

### The Secret: Connectome

Digging through their GitHub repos and organization revealed a lot.

{{< github repo="eonsystemspbc/fly-brain" description="Drosophila brain simulation with spiking neural networks" >}}

Behind it all was a monumental effort to digitize the entire fruit fly brain — what's called a **Connectome**. For the adult fruit fly, roughly 140,000 neurons and tens of millions of synapses have been mapped.

Another interesting piece was the [MuJoCo](https://mujoco.org/) model. It appears to be used for physics simulation, and they even modeled the fly body.

### But Flies Are Gross

I think fruit fly larvae were kind of cute when I was a kid. So tiny.

So I made up my mind.
I want to reproduce Eon Systems' methodology for the **Drosophila larva**. I'm calling it the **Oraclarva** project.

Fortunately, the data for larvae is quite well-established. A complete brain connectome for the L1 larva was published in 2023 (3,016 neurons, 548,000 synapses), and research on motor circuits and behavioral patterns has been accumulating.

Here's roughly what needs to be done:

1. **Connectome data** — neuron-synapse connectivity map of the larval brain
2. **Spiking neural network** — brain simulation based on the LIF model
3. **MuJoCo body model** — physics simulation of the larval body
4. **Sensorimotor loop** — brain controls the body, body feeds back to the brain

### References & Resources

#### Connectome (Brain Map)

**Winding et al. 2023** — *Science*
Complete brain connectome of the Drosophila L1 larva. 3,016 neurons, 548,000 synapses.
The first time an entire insect brain was mapped at synapse-level resolution.
https://doi.org/10.1126/science.add9330

**Eichler et al. 2017** — *Nature*
Complete connectome of the L1 larval mushroom body. 223 Kenyon cells.
The core circuit for learning and memory.
https://doi.org/10.1038/nature23455

**Ohyama et al. 2015** — *Nature*
Multisensory behavioral selection circuit. The pathway by which larvae decide actions in response to stimuli.
https://doi.org/10.1038/nature14297

#### Brain Simulation

**Shiu et al. 2024** — *Nature*
LIF (Leaky Integrate-and-Fire) simulation of the adult Drosophila brain.
The original reference for the model to be applied to larvae.
https://doi.org/10.1038/s41586-024-07763-9

#### Body Simulation & Biomechanics

**Sun et al. 2022** — *BMC Biology*
Neuromechanical model of larval crawling. Measured parameters including muscle force 134µN, speed 0.64mm/s, SLS model, etc.
Key reference for the MuJoCo body model.
https://doi.org/10.1186/s12915-022-01336-w

**Wang-Chen et al. 2024** — *Nature Methods*
NeuroMechFly v2. Adult Drosophila MuJoCo simulation. Architecture reference for the "larval version."
https://doi.org/10.1038/s41592-024-02497-y

#### VNC & CPG (Motor Circuits)

**Fushiki et al. 2016** — *eLife*
Larval crawling wave propagation circuit. A27h (excitatory) and Eve (inhibitory) interneurons generate posterior-to-anterior waves.
Direct basis for the VNC spiking circuit.
https://doi.org/10.7554/eLife.13253

**Pulver et al. 2015**
Motor patterns persist even when the VNC is isolated from the brain → evidence that the CPG resides in the VNC, not the brain.

#### Related Projects

{{< github repo="nawrotlab/larvaworld" description="Drosophila larva behavioral simulation (Box2D-based)" >}}

{{< github repo="eonsystemspbc/flybody" description="Adult Drosophila anatomical MuJoCo model (Eon Systems fork)" >}}

{{< github repo="TuragaLab/flybody" description="Adult Drosophila anatomical MuJoCo model (original)" >}}

---

In the next post, I'll start by loading and dissecting the connectome data.
