---
title: "Pure-Blue OLED Lifetime Quadrupled by Conjugation Extension"
searchTitle: "Pure-blue MR-TADF lifetime: silicon-bridged emitter DPSi-4BP-BN, radical-anion C-N bond dissociation energy, 79% horizontal dipole orientation, 27.3% external quantum efficiency, CIEy 0.18, LT80 of 213 hours"
summary: "Multi-resonance emitters have raised color purity and efficiency, but lifetime lagged. Pinpointing degradation at the C-N bond of the electron-accepting state and stiffening it stretched LT80 from 52 hours in the reference device to 213 hours."
section: paper
reporter: PEER
lang: en
translationOf: 2026-11-24-blue-mr-tadf-bde-lifetime
publishedAt: 2026-11-24
collectWeekStart: '2026-11-16'
readingMinutes: 4
tags: [OLED, MR-TADF, blue lifetime, bond dissociation energy, dipole orientation]
sources:
  - type: paper
    title: "π-Expanded Arylamine Ancillary Substituents on Silicon-Bridged Multi-Resonance TADF Emitters Enable Superior Horizontal Orientation and Long-Lifetime Blue Organic Light-Emitting Devices"
    url: https://doi.org/10.1002/smll.76827
---

Multiple resonance (MR) emitters alternate boron and nitrogen in their framework, localizing the electron cloud on different atoms. This gives a narrow spectrum and pure color. The color purity of blue OLEDs has risen substantially thanks to this design.

The problem was lifetime. No pure-blue device had exceeded 20% external quantum efficiency while also lasting long, especially in the region where CIEy is below 0.20.

What Haruaki Shiga and nine co-authors at the Department of Organic Materials Science, Yamagata University, address this time is neither emission efficiency nor color purity. It is where the molecule breaks.

## The breaking point is the C-N bond in the electron-accepting state

Organic emitters degrade during operation through several pathways. This study targets the carbon-nitrogen bond inside the molecule. It is where the arylamine attaches to the MR framework, and structurally it is the weakest bond.

The key point is that the bond is not weak in the neutral state. While the device is on, molecules in the emissive layer accept electrons to become radical anions and accept holes to become radical cations. The bond is weakest in the electron-accepting state. So the value a design should target is not the bond dissociation energy of the neutral molecule but that of the anion state.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/design-strategy.webp" style="max-width:500px;width:100%;margin:0 auto;" alt="Schematic placing robust blue multi-resonance emitter design strategies based on DABNA-1 and tCzBN side by side with the concept of this study" />
  <figcaption>Figure 1. (a) Conventional design strategies for robust blue MR emitters, (b) the concept of this study. <span class="src">Small (2026) Figure 1, CC BY 4.0</span></figcaption>
</figure>

## Bond dissociation energy raised in two steps: silicon bridging and peripheral conjugation

The researchers stiffened the bond in two steps. First, they introduced a silicon bridge into the framework. Compared with DABNA-1, a representative blue MR emitter, the bond dissociation energy rose by 0.13 eV in the triplet state and by 0.21 eV in the anion state. The larger rise on the anion side matches the design intent.

The next step is this study's contribution. Biphenyl or dibenzothiophene was attached to the peripheral arylamines of the silicon-bridged framework to extend conjugation. The two molecules were named DPSi-4BP-BN and DPSi-3DBT-BN. This substitution left the triplet-state value almost unchanged and raised only the anion-state value. The researchers checked whether the same trend appeared with different computational methods. Results obtained with M06-2X-D3 were recalculated with B3LYP-D3 and PBE0-D3, and the increase in anion C-N bond dissociation energy was reproduced.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/homo-lumo-bde.webp" style="max-width:431px;width:100%;margin:0 auto;" alt="Graph panels comparing the highest occupied and lowest unoccupied molecular orbital distributions and energy levels of the three emitters, together with their bond dissociation energies" />
  <figcaption>Figure 2. (a) Molecular orbital distributions and energy levels of the three molecules, (b) comparison of bond dissociation energies. <span class="src">Small (2026) Figure 2, CC BY 4.0</span></figcaption>
</figure>

The MR structure was left untouched while conjugation was extended. Localizing the electron cloud on alternating atoms is the origin of the narrow spectrum, so disturbing it would cost color purity.

## The narrow spectrum survived

In dilute toluene solution, both molecules gave narrow blue emission at 462 nm. Photoluminescence quantum yield reached up to 96%, and the full width at half maximum was below 21 nm. That the spectrum did not broaden despite the extended conjugation is evidence that the design preserved the MR character.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/synthesis-spectra.webp" style="max-width:500px;width:100%;margin:0 auto;" alt="Panels showing the synthesis routes of the two emitters and their UV-visible absorption and emission spectra measured in dilute toluene solution" />
  <figcaption>Figure 3. (a) Synthesis routes, (b) absorption spectra, (c) emission spectra. Dilute toluene solution (1 × 10⁻⁵ M). <span class="src">Small (2026) Figure 3, CC BY 4.0</span></figcaption>
</figure>

## Horizontal orientation as a side benefit

Extending conjugation produced one more result: how far the molecules lie flat in the film.

When the dipole of an emitting molecule lies parallel to the substrate, light escapes the film more easily. When it stands upright, light is trapped in waveguide modes. Horizontal orientation therefore bears directly on light outcoupling efficiency. The researchers evaluated orientation by measuring angle-dependent emission intensity from vacuum-deposited films.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/dipole-orientation.webp" style="max-width:500px;width:100%;margin:0 auto;" alt="Panels of angle-dependent emission intensity measured in host films doped with the two emitters at 0.5 weight percent, the absorption spectra of the emitters and the normalized emission spectrum of the assistant dopant" />
  <figcaption>Figure 4. Angle-dependent emission intensity of 0.5 wt% doped films. <span class="src">Small (2026) Figure 4, CC BY 4.0</span></figcaption>
</figure>

The horizontal emitting dipole ratio was 79% for both molecules. The authors described this as a moderate preference for horizontal orientation. A fully random distribution gives 67%.

## 27.3% external quantum efficiency and 213-hour lifetime

The devices used a hyperfluorescence structure, in which the MR emitter serves as the final emitter and a different material harvests the triplets.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/device-performance.webp" style="max-width:293px;width:100%;margin:0 auto;" alt="Panels showing the chemical structures of the materials used in the hyper OLED, the device energy diagram, electroluminescence spectra, current density-voltage-luminance characteristics and external quantum efficiency versus luminance" />
  <figcaption>Figure 5. (a) Material structures, (b) energy diagram, (c) electroluminescence spectra, (d) current density, voltage and luminance, (e) efficiency curves. <span class="src">Small (2026) Figure 5, CC BY 4.0</span></figcaption>
</figure>

Electroluminescence peaks were at 467 nm and 465 nm, with a full width at half maximum of 25 nm. CIEy was 0.16 and 0.18 for the two devices, below the 0.20 the paper takes as the pure-blue criterion. The turn-on voltage is 2.53 V. Maximum external quantum efficiency was 27.3% for DPSi-4BP-BN and 23.4% for DPSi-3DBT-BN, exceeding the 21.8% of the reference molecule DPSi-Ph-BN, which lacks the extended peripheral conjugation. The authors attributed the difference mainly to improved horizontal dipole orientation.

The lifetime gap is larger. The time to reach 80% of initial luminance at 1,000 cd/m² was 213 hours for DPSi-4BP-BN and 75.5 hours for DPSi-3DBT-BN. The reference device under the same conditions lasted 52 hours. The former is more than four times longer.

The difference between the two molecules is also worth reading. Both raised the anion bond dissociation energy and share the same 79% orientation ratio, yet their lifetimes of 213 hours and 75.5 hours differ by nearly a factor of three. Bond dissociation energy alone does not determine lifetime.

## Distance to industry

What this paper offers is less a number than a target. To extend the lifetime of a blue emitter, looking at bond strength in the neutral molecule is not enough; one should calculate which bond becomes weakest in the electron-accepting state and reinforce that site. Cross-checking with three computational methods also adds value for use as a design guideline.

That said, 213 hours is not a value to compare with the lifetime of mass-production devices. The paper's figure is a relative comparison of how many times longer a device lasts than the reference under the same conditions, not a basis for estimating absolute product lifetime.

The conditions are also narrow. LT80 looks only to 80% of initial luminance, so how the curve bends over a longer span is unknown. Because the device is a hyperfluorescence structure, degradation of the assistant dopant and host also enters the lifetime, yet the paper changed only the design of the final emitter.

The 79% horizontal orientation has limits too. It is higher than the fully random 67% but falls short of figures shown by strongly oriented emitters. That leaves room to raise efficiency further, while pushing conjugation extension further makes the molecule larger and may exact other costs in the deposition process and film stability.
