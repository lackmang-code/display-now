---
title: "QLED Efficiency Lost to Residual TMAH in ZnO Electron Transport Layers"
searchTitle: "QLED efficiency loss: residual TMAH from ZnO nanoparticle precursors, thermal diffusion into the quantum dot layer, exciton quenching, ToF-SIMS depth profiles, pre-annealing and KOH synthesis"
summary: "Raising the anneal temperature improved electron transport yet cut QLED luminance and efficiency. Residual TMAH from ZnO nanoparticle synthesis survives purification and diffuses into the quantum dots, quenching excitons."
section: paper
reporter: PEER
lang: en
translationOf: 2026-11-10-tmah-residue-qled-quenching
publishedAt: 2026-11-10
collectWeekStart: '2026-11-02'
readingMinutes: 7
tags: [QLED, quantum dots, ZnO nanoparticles, electron transport layer, exciton quenching]
sources:
  - type: paper
    title: "Residual Tetramethylammonium Hydroxide Limits ZnO Nanoparticle-Based Quantum Dot Light-Emitting Diode Performance"
    url: "https://doi.org/10.1002/adom.72025"
---

In quantum dot light-emitting devices, zinc oxide nanoparticles are the de facto standard for the electron transport layer. They offer high electron conductivity, a conduction band well matched to the quantum dots, and a deep valence band that blocks hole leakage.

So research usually works on the properties of zinc oxide itself or on the interface between zinc oxide and the quantum dots. What a team from Seoul National University and Sungkyunkwan University points to this time is neither. It is an impurity left over from the precursor used to make the zinc oxide.

## It started with a mismatch

What the team saw looked like a contradiction. Raising the annealing temperature of the quantum dot layer increased current density monotonically across the whole voltage range, but luminance fell up to 120 degrees and then rose again above that. External quantum efficiency followed luminance.

More current means electrons were getting in more easily. Yet the light decreased. The electrons that entered were failing to become light and disappearing somewhere.

The monotonic rise in current can be explained. When the quantum dots are annealed, the zinc oxide layer beneath them is heated too, and its electron conductivity goes up. Raising only the annealing temperature on the zinc oxide side did the same thing. Current and luminance were following different causes.

## The culprit came from the precursor

Zinc oxide nanoparticles are made by hydrolyzing zinc acetate with tetramethylammonium hydroxide (TMAH). TMAH is the hydroxide source. In semiconductor processing it is also used as a photoresist developer, and there were already reports of TMAH left after development interfering with the next process step.

The team carried that precedent over to quantum dot devices. After the synthesized zinc oxide was purified by repeated washing with acetone, infrared spectroscopy still showed peaks at 1489 and 950 inverse centimeters. These are carbon-nitrogen bond vibrations of the tetramethylammonium ion. Washing does not remove it.

<figure class="fig-single">
  <img src="/articles/2026-11-10-tmah-residue-qled-quenching/fig1-zno-synthesis-ftir.webp" alt="Zinc oxide nanoparticle synthesis and residue detection: panels of a synthesis schematic, absorption and emission spectra, a transmission electron micrograph and infrared spectra" />
  <figcaption>Figure 1. Zinc oxide synthesis and residual TMAH. The dashed lines in (c) mark the tetramethylammonium ion peaks at 1489 and 950 inverse centimeters. <span class="src">Advanced Optical Materials (2026) Figure 1, CC BY 4.0</span></figcaption>
</figure>

This zinc oxide had a first exciton absorption peak at 332 nanometers, band-edge emission at 359 nanometers and an average particle size of about 4.2 nanometers.

Thermogravimetric analysis showed TMAH losing weight distinctly between 130 and 150 degrees. That is the range where it decomposes into trimethylamine and methanol, and the boiling points of both products are below 130 degrees. It overlaps exactly with the annealing temperatures used to build devices.

## Watching it cross over

The team built inverted quantum dot devices. On glass and ITO they placed 50 nanometers of zinc oxide nanoparticles, then 15 nanometers of red InP/ZnSe/ZnS quantum dots, followed by a 50-nanometer hole transport layer (TCTA), 10 nanometers of molybdenum oxide and 130 nanometers of aluminum. The quantum dots have an emission peak at 625 nanometers and an average diameter of 10 nanometers.

The inverted structure was chosen for a reason. Annealing the quantum dots necessarily heats the zinc oxide beneath them as well, while the upper charge transport layer and electrode have not yet been deposited and are left untouched. The structure isolates the effect of heat on just the zinc oxide and quantum dot layers.

Annealing on the zinc oxide side was fixed at 120 degrees for 30 minutes, and only the quantum dot annealing temperature was varied from room temperature to 180 degrees, for 15 minutes each. To examine depth profiles, separate samples were also made with each of the two layers 90 nanometers thick.

<figure class="fig-single">
  <img src="/articles/2026-11-10-tmah-residue-qled-quenching/fig2-tofsims-diffusion.webp" alt="Thermal diffusion analysis: panels of the inverted device and fabrication sequence, time-of-flight secondary ion mass spectrometry depth profiles, a schematic of behavior with temperature, emission spectra and time-resolved decay curves, and triexponential component amplitudes" />
  <figcaption>Figure 2. Thermal diffusion of the residue. In (b), as the quantum dot annealing temperature rises, the tetramethylammonium peak in the quantum dot layer moves away from the interface and grows stronger. <span class="src">Advanced Optical Materials (2026) Figure 2, CC BY 4.0</span></figcaption>
</figure>

Time-of-flight secondary ion mass spectrometry showed it directly. With indium ions as a reference marker to distinguish the layers, a strong tetramethylammonium signal appeared in the zinc oxide layer, and it was strongest at the interface between the zinc oxide and the quantum dots. It accumulates preferentially at the interface.

A clear peak was also detected in the quantum dot layer, and as the quantum dot annealing temperature rose to 120 degrees, that peak moved away from the interface and grew stronger. It was crossing over. At 180 degrees, the signal dropped sharply in both layers. At that temperature it decomposes and evaporates.

## What happens after it crosses

Three optical measurements pointed the same way.

Steady-state emission intensity fell up to a quantum dot anneal of 120 degrees and recovered above that. Time-resolved emission decay became faster up to 120 degrees and then slowed again. Average lifetime followed the same trend.

Fitting the decay curves with a triexponential function separated the components. The amplitude associated with nonradiative recombination grew up to 120 degrees and then shrank, while the two amplitudes associated with interlayer energy transfer and radiative recombination moved in the opposite direction. The shape matches exactly the tetramethylammonium distribution shown by the secondary ion analysis.

Control experiments ruled out other explanations.

- Films of quantum dots alone showed no change in emission or decay with annealing temperature. Without zinc oxide, it does not happen
- Changing the annealing temperature on the zinc oxide side did not greatly alter the optical properties of the quantum dots
- Surface roughness measured by atomic force microscopy barely changed either. It is not a morphology effect
- The same nonmonotonic behavior remained after 24 hours of vacuum drying before annealing. Residual solvent is not carrying the residue along; heat itself causes the redistribution

The team also determined which part of TMAH causes the quenching. As a comparison they used tetramethylammonium hexafluorophosphate, which has the same cation and differs only in having a less reactive anion, and emission fell with that as well. The quencher is the tetramethylammonium cation, not the hydroxide ion.

They also checked whether the quantum dots were being damaged. In infrared spectroscopy, the carboxylate peaks of the native oleic acid ligands (1466 and 1557 inverse centimeters) stayed almost unchanged after TMAH was mixed in, and in X-ray photoelectron spectroscopy the carboxylate carbon (288.2 electronvolts) did not change either. What increased were the carbon-nitrogen bond (286.2 electronvolts) and quaternary ammonium nitrogen (402.0 electronvolts). The ligands were not stripped off. This is a reversible quenching that switches off emission only while TMAH sits nearby.

Cadmium-based red and green quantum dots showed the same behavior. The story is not limited to InP systems.

## How much the device lost

<figure class="fig-single">
  <img src="/articles/2026-11-10-tmah-residue-qled-quenching/fig3-device-characteristics.webp" alt="Device characteristics: panels of current density, voltage and luminance curves by quantum dot annealing temperature, external quantum efficiency curves, time-resolved electroluminescence curves, and the delay and rise times extracted from them" />
  <figcaption>Figure 3. Device characteristics. Current density rises monotonically, but luminance and efficiency fall up to 120 degrees and then recover. The delay and rise times in (d) separate the two effects. <span class="src">Advanced Optical Materials (2026) Figure 3, CC BY 4.0</span></figcaption>
</figure>

Time-resolved electroluminescence separated the two effects. The delay time between charge entering and emission starting shortened as the annealing temperature rose. That means electron injection and transport improved, consistent with the monotonic rise in current density. The rise time related to exciton recombination, by contrast, lengthened up to 120 degrees and shortened above that. The residue that had diffused in was pushing up nonradiative recombination.

Comparing two films shows how much was lost. A bilayer with zinc oxide treated at 120 degrees lost 63.6 percent of its emission at a quantum dot anneal of 120 degrees. A bilayer with zinc oxide pre-treated at 180 degrees lost only 8.61 percent under the same conditions.

The devices make it clearer. In a device with zinc oxide treated at 120 degrees, external quantum efficiency fell 53.5 percent at a quantum dot anneal of 120 degrees.

Under the same conditions, a device with zinc oxide pre-treated at 180 degrees fell only 5.4 percent. Whether one round of heat came first decided half of the efficiency.

## Two ways to prevent it

<figure class="fig-single">
  <img src="/articles/2026-11-10-tmah-residue-qled-quenching/fig4-suppression.webp" alt="Residue suppression strategies: panels of infrared spectra before and after treatment, emission and time-resolved decay, device characteristics and efficiency curves, a comparison of two synthesis routes, and a comparison of efficiency losses" />
  <figcaption>Figure 4. Two suppression methods. Panel (h) shows the efficiency loss at a quantum dot anneal of 120 degrees. <span class="src">Advanced Optical Materials (2026) Figure 4, CC BY 4.0</span></figcaption>
</figure>

First, heat the zinc oxide sufficiently before depositing the quantum dots. A temperature of 180 degrees is where TMAH decomposes and its products evaporate. In the infrared spectra of films treated this way, the peaks at 1489 and 950 inverse centimeters were not seen.

Second, do not use TMAH in the first place. Zinc oxide made with potassium hydroxide as the hydroxide source showed neither peak, and the efficiency loss at a quantum dot anneal of 120 degrees was held to 8.2 percent.

The two methods suppressed it to similar levels: 5.4 percent and 8.2 percent.

The team measured lifetime separately too. A quantum dot anneal of 120 degrees did not accelerate luminance degradation during operation with any of the three zinc oxide treatments. Initial efficiency was cut, but the devices did not die any faster.

## The distance to industry

The process window has to be redrawn. A quantum dot layer anneal of 120 degrees is a common condition in this field, and so is 120 degrees for the zinc oxide layer. The result says that combining the two as they stand throws away half the efficiency. "It was purified, so it is fine" did not hold.

The figure does, however, come from one set of conditions. The value of 53.5 percent is for the pairing of zinc oxide at 120 degrees and quantum dots at 120 degrees. Where process temperatures are set differently, the loss will differ. So what this paper offers is closer to a checklist item than to the number "53.5 percent": confirm what the precursor was, and whether the process has passed the temperature at which its residue leaves.

Applying it is not hard. A 180-degree pre-anneal adds one process step, and potassium hydroxide synthesis swaps a precursor. Neither requires developing a new material. But the paper does not address whether zinc oxide made with potassium hydroxide matches the existing kind in particle size, dispersibility and conductivity. That comparison has to come first before it goes on a production line.

It also adds value that a detection method comes with the finding. The two infrared peaks and the secondary ion mass spectrometry depth profile are both measurements that can be run at the process site. Pinpointing a cause and providing a way to confirm it are different things, and this paper does both.
