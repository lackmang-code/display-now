---
title: "Display paper briefing, week 3 of August"
searchTitle: "Display paper briefing 2026 August week 3"
summary: "Sixteen display-related papers, picked out of 1,002 screened across 12 major journals. The remaining two are covered as separate in-depth articles."
section: paper
reporter: PEER
publishedAt: 2026-08-25
collectWeekStart: '2026-08-17'
readingMinutes: 8
lang: en
translationOf: 2026-08-25-paper-week3-brief
tags:
- 논문 브리핑
- 8월 3주차
sources:
- type: paper
  title: In situ dry repair and passivation unlocks size-independent performance in III-nitride micro-LEDs
  url: https://doi.org/10.1038/s41566-026-01990-4
- type: paper
  title: "Hierarchical Gradient Black Matrix Cavities: Enabling Superior Inkjet-Printed Quantum-Dot Color Conversion Pixels for Micro-LED Displays"
  url: https://doi.org/10.1002/lpor.71746
- type: paper
  title: Strategies for Enhancing Efficiency and Operational Stability in Green Phosphorescence-Sensitized Fluorescence (PSF) Organic Light-Emitting Diode (OLED) Technology
  url: https://doi.org/10.1002/smll.75361
- type: paper
  title: Direct Integration of Conductive, Emissive Perovskite Nanocrystals Into Efficient Light-Emitting Diodes Without Post-Synthetic Ligand Exchange
  url: https://doi.org/10.1002/adfm.77751
- type: paper
  title: Carbazolyl-Substituted Benzoic Anhydrides as Efficient Triplet Harvesters for High-Brightness Blue Organic Light-Emitting Diodes
  url: https://doi.org/10.1021/acsami.6c11053
- type: paper
  title: Vacuum-Based Monolithically In Situ Integration of Quantum-Confined CsPbBr3 Nanocrystals for Spectrally Stable Blue Electroluminescence
  url: https://doi.org/10.1002/adma.74731
- type: paper
  title: Helically Chiral Tetradentate Pt(II) Complexes for Simultaneous Deep-Blue Electroluminescence and Circularly Polarized Luminescence via Diastereoselective Synthesis
  url: https://doi.org/10.1002/adma.74664
- type: paper
  title: 3D Reconfigurable Display Devices Enabled by a Composite Emissive Layer with Integrated Electroluminescent and Shape-Memory Functions
  url: https://doi.org/10.1002/adfm.77845
- type: paper
  title: Pixel-Level Reconfigurable Pancharatnam-Berry Phase Induced by Inter-Layer Coupling of Isotropic Metasurfaces
  url: https://doi.org/10.1002/adfm.77925
- type: paper
  title: Ultrastretchable Electrochromic Hydrogel and Asymmetric Electrodes for Novel Flexible and Stretchable Passive-Matrix and Active-Matrix Dynamic Information Displays
  url: https://doi.org/10.1002/smll.75419
- type: paper
  title: Ambient-Stabilized Cadmium-Free Pure-Blue Colloidal Quantum Dot Supraparticle Microlasers for Proof-of-Concept Low-Speckle Projection
  url: https://doi.org/10.1002/lpor.71774
- type: paper
  title: Multifunctional Glycinamide Hydrochloride Interface Bridging Enables Efficient Tin Perovskite Light-Emitting Diodes
  url: https://doi.org/10.1002/lpor.71771
- type: paper
  title: Side-DBR Guided Exciton-Polariton Lasing With Near-Field Mode Imaging in an InGaN Thin-Film Ridge Waveguide
  url: https://doi.org/10.1002/lpor.71760
- type: paper
  title: Alignment-Controlled Circularly Polarized Thermally Activated Delayed Fluorescence in Chiral Nematic Liquid Crystals
  url: https://doi.org/10.1021/acsami.6c08888
- type: paper
  title: Pixel-Registered Trimodal Visible/NIR/X-Ray Imaging Enabled by a Single-Material Rare-Earth-Free Double Perovskite
  url: https://doi.org/10.1002/lpor.71777
- type: paper
  title: A new platform for achieving long-term air-stable long persistent luminescence in amorphous organic system
  url: https://doi.org/10.1038/s41377-026-02367-6
featured: false
paywallAfter: 0
---

Between 17 and 23 August 2026, 1,002 papers published online in 12 major journals were screened in full. The 16 that touch display directly are introduced briefly here.

Two are covered in depth separately: [a germanium exciplex host that accelerates reverse intersystem crossing in MR-TADF](/en/article/2026-08-25-germanium-exciplex-host-mrtadf) and [a Sungkyunkwan University study on the multiple-solution problem in time-resolved photoluminescence](/en/article/2026-08-25-skku-deep-learning-carrier-kinetics).

## The biggest news this week

### 1. The size effect in micro-LEDs has been reversed

*Nature Photonics · 08.20 · Jinjian Yan, Xiamen University · Xiamen Future Display Institute · Nanjing University · Fudan University*

The oldest wall in micro-LED commercialization is the size effect. The smaller the chip, the worse the perimeter-to-area ratio becomes, so sidewall damage left by etching weighs that much more heavily and efficiency collapses. Blue and green chips below 5μm reported so far have rarely exceeded 30% external quantum efficiency.

The authors show that the cause is not a physical limit but **damage left by the process**, and erase it with a dry step that follows immediately inside the same etching chamber. Right after the main etch, with the self-bias held extremely low, a purely chemical etch in pure chlorine plasma strips the damaged layer, and the chlorine adsorbed in its place passivates the surface. Leaving out boron trichloride, commonly used as an assist gas, is the core of the design: calculations indicate that adsorbed boron creates deep-level traps inside the bandgap.

Transmission electron microscopy confirmed that the damaged region 50 to 100nm deep and the amorphous surface layer were gone, and that the quantum well and electron blocking layer interfaces had recovered to the atomic level right out to the edge.

| Item | Untreated | After treatment |
|---|---|---|
| Relative internal quantum efficiency at room temperature | 32.5% | **98.5%** |
| Interface trap density | 1.03×10<sup>12</sup> cm<sup>-2</sup>eV<sup>-1</sup> | below detection limit |
| Effective emitting width of a 15μm device | 8.34μm | 14.81μm |
| Carrier lifetime at the edge | 6.51ns (center 11.87ns) | 12.29ns (center 12.39ns) |
| Yield of 1.6μm devices | 90.5% (wet etch 75.0%) | **98.8%** |

<figure class="fig-single">
  <img src="/articles/2026-08-25-paper-week3-brief/microled-size-effect-reversal.svg" alt="Four metrics placed side by side before and after the dry repair and passivation treatment, and the two figures showing that peak efficiency rises as the chip gets smaller" />
  <figcaption>Figure. The four metrics split by the treatment, and the one result in this paper that stands out most. The size effect does not merely disappear; its direction is reversed. <span class="src">Drawn by this magazine from the values the paper reports · the original is in a subscription journal, so its figures are not reproduced here</span></figcaption>
</figure>

What stands out most is that **the size effect does not merely disappear; its direction is reversed**. Peak efficiency of the treated devices was 38.9% at 100μm and rose to 47.6% at 1.6μm. Once sidewall recombination is gone, what remains is light extraction efficiency, which only improves as the device shrinks. A 2μm device with an added Bragg reflector recorded 64.7% in blue and 55.1% in green, values the authors say were verified by third-party reports from an accredited test laboratory. They went as far as building a 0.39-inch, 3,387 PPI blue and green microdisplay module.

## The other 15

### 2. A graded-step black matrix to contain inkjet quantum-dot color conversion

*Laser &amp; Photonics Reviews · 08.17 · Huilong Yang, Fuzhou University, Engineering Research Center of Flat Panel Display Technology*

When quantum-dot color conversion is put on top of micro-LEDs, the trouble is that inkjet-deposited droplets do not dry evenly inside the black matrix. Making the side walls a graded step suppressed capillary flow and contact-line pinning. Hydrophobic treatment raised the contact angle on glass from 17.7 to 84.4 degrees and on the photoresist from 47.6 to 92.5 degrees. Printing six times produced a 4.5μm-thick color conversion layer, and blue transmittance was brought down to 0.198%.

### 3. Efficiency and lifetime strategies for phosphorescence-sensitized fluorescent OLEDs

*Small · 08.22 · Odugu Pavan Kumar, Kyung Hee University, Department of Information Display · review*

Phosphorescent sensitization is widely used to work around the slow reverse intersystem crossing of MR-TADF. But the radiative rate of a phosphorescent sensitizer is low, which limits the Förster transfer rate and, in the end, leaves efficiency below the TADF-sensitized route. This review works through the physical quantities that govern that transfer rate one by one. It offers two alternatives: widening the overlap between the terminal emitter's absorption coefficient and the sensitizer's emission spectrum, and using dual-channel transfer with a high-triplet exciplex host. Worth reading alongside the germanium host feature in the same issue.

### 4. A perovskite nanocrystal LED with the ligand exchange step removed

*Advanced Functional Materials · 08.20 · Jigeon Kim, Kookmin University · Sungkyunkwan University · Hanyang University · Korea University*

Putting colloidal nanocrystals into a device normally entails a post-treatment that swaps the long ligands used in synthesis for shorter ones. The authors stabilized the surface with bromide ions instead of oleate, synthesizing nanocrystals with a low ligand density to begin with. The stronger binding suppresses surface defects, and fewer ligands means higher charge mobility in the film. A device using them as synthesized, with no exchange step, reached a maximum external quantum efficiency of 11.4%, more than four times the 2.7% of the conventional route. A joint study by four Korean universities.

### 5. Triplet harvesting split by a single substitution position

*ACS Applied Materials &amp; Interfaces · 08.19 · Myroslava Aksionova, Lviv University · Kaunas University of Technology · Polish Academy of Sciences*

Four carbazolyl-substituted benzoic anhydrides were made and compared. The one with carbazole in the para position gave neither delayed fluorescence nor phosphorescence, while in the ortho-substituted one the singlet-triplet energy gap narrowed and delayed fluorescence and room-temperature phosphorescence appeared together. A sky-blue device gave a maximum external quantum efficiency of 21.0% and luminance above 62,000 cd/m<sup>2</sup>.

### 6. Blue nanocrystals formed in place by a vacuum process

*Advanced Materials · 08.20 · Jianfeng Ou*

Rather than transferring solution-processed perovskite nanocrystals, quantum-confined CsPbBr<sub>3</sub> nanocrystals were formed directly inside the device during vacuum deposition. The approach targets the spectral stability of blue electroluminescence.

### 7. Deep-blue electroluminescence and circularly polarized luminescence from one molecule

*Advanced Materials · 08.22 · Jieying Tong*

A tetradentate platinum complex with a helically chiral structure was synthesized diastereoselectively, giving deep-blue electroluminescence and circularly polarized luminescence at the same time.

### 8. A display putting electroluminescence and shape memory in one layer

*Advanced Functional Materials · 08.21 · Chenshun Hu, Beijing Institute of Graphic Communication, Research Center of Printed Electronics*

Shape-memory function was compounded into the emissive layer itself, making a display whose screen deforms into three dimensions and returns.

### 9. Rewriting geometric phase pixel by pixel

*Advanced Functional Materials · 08.22 · Fei Zhang, Institute of Optics and Electronics, Chinese Academy of Sciences*

Coupling between two layers of isotropic metasurfaces was used to reconfigure the Pancharatnam-Berry phase pixel by pixel.

### 10. A stretchable electrochromic display

*Small · 08.22 · Yichen Li*

An ultrastretchable electrochromic hydrogel and asymmetric electrodes were used to build a flexible, stretchable display that works in both passive-matrix and active-matrix modes.

### 11. A cadmium-free pure-blue quantum-dot microlaser

*Laser &amp; Photonics Reviews · 08.22 · Weiguo Chen, Fuzhou University*

A thin alumina shell was grown by atomic layer deposition on supraparticles self-assembled from ZnSeTe/ZnS quantum dots. Blocking oxygen ingress extended the operating half-life by more than two orders of magnitude, and the lasing threshold fell from 36 to 26 μJ/cm<sup>2</sup>. Because the supraparticles are mutually incoherent, speckle contrast came to 0.015, below the threshold of human perception. The work targets light sources for projection displays.

### 12. A tin perovskite near-infrared LED

*Laser &amp; Photonics Reviews · 08.20 · Hao Tu, Northwestern Polytechnical University*

Glycinamide hydrochloride was placed at the interface to control oxidation of tin ions and crystallization together. Maximum external quantum efficiency rose from 6.32% to 10.80% and operating lifetime increased ninefold.

### 13. Polariton lasing confined by side Bragg reflectors

*Laser &amp; Photonics Reviews · 08.21 · Wai Yuen Fu, University of Hong Kong*

Distributed Bragg reflectors were raised on both sides of an InGaN/GaN thin-film ridge waveguide, creating feedback without relying on the facets. At room temperature the vacuum Rabi splitting was about 25meV and the Q factor about 5000.

### 14. Circularly polarized delayed fluorescence controlled by liquid crystal alignment

*ACS Applied Materials &amp; Interfaces · 08.17 · Nurul Ilmi, Nara Institute of Science and Technology*

The orientation of the emitter was controlled inside a chiral nematic liquid crystal to obtain circularly polarized delayed fluorescence.

### 15. Visible, near-infrared and X-ray in one pixel from one material

*Laser &amp; Photonics Reviews · 08.18 · Qiming Huang, Ningbo University of Technology*

A rare-earth-free double perovskite co-doped with tellurium and molybdenum gave 570nm visible emission (quantum yield 17.6%) and 910nm near-infrared (41.7%) from a single material. Heavy elements make X-ray absorption strong as well, recording a light yield of 35,073 photons/MeV and spatial resolution of 13.6 lp/mm. One detector obtains three kinds of image with no pixel misregistration.

### 16. Amorphous organic long persistent luminescence that lasts in air

*Light: Science &amp; Applications · 08.18 · Zhenjiang Liu*

A platform was proposed for achieving long persistent luminescence with long-term air stability in an amorphous organic system rather than a crystal.

<div class="sources-box">
<h3>Selection criteria</h3>
<p>Papers first published online between 2026-08-17 and 08-23 in the 12 major journals on our registry (display trade titles are deliberately excluded, since readers follow those directly) were collected in full, and those touching display devices, materials and processes directly were selected. The reference date is the first online publication date, and a paper is not covered again when it appears in a formal issue. The figures in each item are values confirmed in that paper's abstract and body.</p>
</div>
