---
title: "Display paper briefing, 31 August to 6 September"
searchTitle: "Display paper briefing 2026, 31 August to 6 September"
summary: "Twelve display-related papers, briefly introduced, picked out of 1,296 screened across 31 major journals. One on a transparent QLED electrode is covered as a separate in-depth article."
section: paper
reporter: PEER
publishedAt: 2026-09-08
collectWeekStart: '2026-08-31'
readingMinutes: 8
tags:
- 논문 브리핑
- 9월 1주차
sources:
- type: paper
  title: "Stable Quantum Dot Light-Emitting Diodes Compatible With Household Alternating Current Electricity"
  url: https://doi.org/10.1002/adfm.78117
- type: paper
  title: "Ultrathin nano-layered boron nitride stabilizing perovskite quantum dot-based light-emitting diodes"
  url: https://doi.org/10.1038/s41467-026-77166-z
- type: paper
  title: "Shallow Trap States Control Electrical Performance of Amorphous Oxide Semiconductor Thin-Film Transistors"
  url: https://doi.org/10.1002/adfm.78029
- type: paper
  title: "Passivation-Dependent Device-Level Thermal Robustness of Indium Gallium Oxide Thin-Film Transistors under Dynamic Random-Access Memory Relevant 600 °C Nitrogen Annealing"
  url: https://doi.org/10.1021/acsami.6c10253
- type: paper
  title: "Electron Transport in Quantum Dot Light-Emitting Diodes"
  url: https://doi.org/10.1002/aelm.70546
- type: paper
  title: "High-Efficiency Deep Blue Single-Gaussian Europium(II) Emitters and Their Emitter-Host Interactions"
  url: https://doi.org/10.1002/adfm.78099
- type: paper
  title: "Acetylene Functionalization of Multiple-Resonant Materials Enabling Strong Two-Photon Absorption and Delayed Luminescence With Highly Efficient Exciplex-Sensitized Electroluminescence"
  url: https://doi.org/10.1002/adom.71649
- type: paper
  title: "Metastable Fingerprint States in a Frustrated Cholesteric Liquid Crystal"
  url: https://doi.org/10.1021/acsaelm.6c00920
- type: paper
  title: "Complementary Asymmetric Fluorinated Viologen and Conjugated Phenyl Viologen for Black Electrochromic Devices with High Cycling Stability"
  url: https://doi.org/10.1021/acsami.6c13289
- type: paper
  title: "Trans-Reflective Dichroic Display-Integrated Colorful Semi-Transparent Organic Photovoltaic Glass"
  url: https://doi.org/10.1002/adfm.78077
- type: paper
  title: "Donor-Engineered Chiral Indium–Salen Complexes for Tunable Circularly Polarized Luminescence"
  url: https://doi.org/10.1002/adfm.78009
- type: paper
  title: "Deep-Learning-Based Denoising for Improved Phase Precision in Electron Holography of Electromagnetic Fields in Nanoscale Materials"
  url: https://doi.org/10.1002/advs.77380
featured: false
paywallAfter: 0
lang: en
translationOf: 2026-09-08-paper-week5-brief
---

From Monday 31 August to Sunday 6 September 2026, **1,296** papers published in 31 major journals were checked in full and narrowed to 112 with a display connection. One of those, on the upper electrode of a transparent QLED, is covered as a separate in-depth article, and **12** are introduced briefly here.

This week what stood out was **work on what surrounds the emitter rather than the emitter itself**. A two-dimensional material slipped in at an interface, a seed layer split into two, the trap distribution of an electron transport layer measured, a passivation material changed. Two words come up again and again: **traps and interfaces**. And two papers ask whether oxide semiconductors, beyond the display backplane, can withstand **the requirements of memory**.

## 1. A QLED plugged straight into the wall, with flicker down to 13%

*Advanced Functional Materials · 09.02 · Jiming Wang, Harbin Institute of Technology*

QLEDs, like other p-n junction devices, turn on only under direct current. They cannot be connected straight to household 220V alternating current, and with charge pushed in continuously from one side they degrade faster as well.

The team **connected two QLEDs of opposite polarity in parallel.** The two devices light alternately on the positive and negative half cycles of the alternating current, so they run directly from AC without a converter. With accumulated charge draining away each half cycle, T95 lifetime at 10,000 nits rose **from 95 hours to 279 hours.**

What remained was flicker, because the screen goes dark in the stretch where the sine voltage falls below the turn-on voltage of the device. Using multi-phase driving with several phase-shifted AC signals to fill that dark stretch brought **flicker down from 100% to 13%.**

## 2. One layer of boron nitride extends perovskite QLED lifetime

*Nature Communications · 09.01 · Jindi Wang, Zhengzhou University of Light Industry and Zhengzhou University*

Perovskite QLEDs have raised efficiency quickly but have been held back by operational stability. The main cause is ions moving along the electric field and wrecking interfaces.

The team put in **ultrathin nano-layered boron nitride (BN) as a buried interfacial layer.** BN interacts with the perovskite to passivate interfacial defects while **removing the ion migration pathway itself**, directly suppressing ion movement. Exciton recombination and charge transport also became less sensitive to heat.

Average external quantum efficiency was **30.05%**, 1.7 times that of the control. Lifetime is written as T50 of 25,263 hours at an initial luminance of 100 nits, about 100 times, but **that value is extrapolated, not measured.** It is safer read as a multiple.

## 3. What sets the performance of an oxide TFT was shallow traps

*Advanced Functional Materials · 09.02 · Måns J. Mattsson, Department of Physics, Oregon State University*

The characteristics of amorphous oxide semiconductor TFTs are governed by electronic states near the conduction band mobility edge. Because those states are hard to measure directly, the usual approach has been to work backwards from the transfer curve.

The team measured the subgap density of states of a-IGZO **to within 0.1eV of the mobility edge** using ultrabroadband photoconductive density-of-states spectroscopy. And with that alone they **reproduced the transfer curves of 25 process conditions with no adjustable parameters.** The only extra variable needed to fit the full curve was the conduction band tail energy.

How shallow defects push threshold voltage, subthreshold swing and mobility together falls into order this way. Experiments raising indium concentration systematically, together with DFT+U calculations, narrowed down the identity of the defects. The paper notes explicitly that this material is used **in display panel and DRAM development alike.**

## 4. Only one passivation survived 600℃

*ACS Applied Materials &amp; Interfaces · 09.04 · Jeong Eun Oh, Hanyang University*

As silicon DRAM approaches its scaling limit, oxide semiconductors are being raised as channel candidates. Off current is low and process compatibility is good. The problem is the back-end thermal budget: it has to survive **600℃ annealing in nitrogen**, a condition that creates oxygen deficiency in oxides.

The team put three passivations, Al₂O₃, HfO₂ and SiO₂, on indium gallium oxide TFTs and compared them before and after 600℃ treatment. **Only the device with Al₂O₃ kept switching**, while the ones with HfO₂ and SiO₂ reached a state where characteristics could not be extracted after 10 minutes of annealing.

It is a result showing what gets caught first when a display backplane material is put into a memory process.

## 5. The traps blocking electrons in a QLED sit between core and shell

*Advanced Electronic Materials · 09.04 · Shuxin Li, State Key Laboratory of Luminescent Materials and Devices, South China University of Technology*

An earlier report from the same laboratory established that **hole transport in quantum dot films is trap-free space-charge-limited current.** This time they looked at the electron side.

Analysing current density-voltage curves of single-carrier devices made with red, green and blue core/multishell quantum dots, **electron transport was strongly blocked by traps.** The traps form a Gaussian distribution inside the bandgap, at a concentration of about 1×10²³ m⁻³ and a centre level about 4.0eV below the vacuum level. The distributions were similar across all three colours.

From the correlation between surface-to-volume ratio and trap count, the team proposes that these traps sit **at the core-shell interface.** It is a materials-side explanation of why electrons and holes are so hard to balance in quantum dot devices.

## 6. A narrow deep-blue emitter made with europium(II)

*Advanced Functional Materials · 09.03 · Mahmoud Soleimani, Institute of Applied Physics, TU Dresden*

Europium(II) complexes have parity-allowed 4f-5d transitions, which gives narrow emission lines and suits deep blue, yet cases of putting them into vacuum-deposited OLEDs have been rare.

The team **paired a crown ether ligand with a carborate anion** to define the coordination environment around the europium and raise steric shielding. The two emitters made this way delivered narrow deep-blue emission, **a quantum yield close to 90%**, and thermal stability sufficient for vacuum deposition.

Density functional calculations and time-resolved measurements pinned down that steric shielding around the europium centre and energetic confinement of the excited 5d electron govern emission efficiency. It stops short of a device demonstration and closes by offering design guidelines.

## 7. One acetylene group quadruples two-photon absorption

*Advanced Optical Materials · 09.03 · Ikechukwu D. Nwosu, Department of Chemistry, University of Manchester*

Emitters that combine high colour purity with two-photon absorption are rare. Multi-resonance TADF emitters have narrow emission lines to begin with, but their nonlinear optical response has hardly been studied.

The team **attached a terminal acetylene group** to a carbazole-fused azaborine framework. π conjugation extended and the LUMO spread out, giving the second singlet excited state charge-transfer character, and the two-photon absorption cross-section grew **from 36 GM to 156 GM.** Photoluminescence quantum yield and the narrow emission line were kept.

Calculations showed a structure in which **S₂ handles two-photon absorption and S₁ the narrow emission**, each separately. Green electroluminescence was also confirmed in solution-processed and vacuum-deposited OLEDs sensitised with an exciplex host.

## 8. Liquid crystal stripes that stay eight hours after the voltage is cut

*ACS Applied Electronic Materials · 09.05 · Timothy Ogolla, Kent State University*

In a cholesteric liquid crystal the molecules twist into a helix, and when that helical axis lies parallel to the substrate a periodic stripe appears. Because it looks like a fingerprint under the microscope it is called a **fingerprint texture** (unrelated to biometric fingerprints).

Until now this texture came in only two kinds. Either the ratio of cell thickness to helical pitch (confinement ratio ρ=d/p) is greater than 1, in which case it forms by itself and stays, or it forms only under an electric field and unwinds as soon as the field is removed.

This paper made a metastable stripe state that persists without a field, in **a cell with ρ below 1**, by applying high voltage at low frequency and then **removing it slowly.** Under optimal conditions (ρ≈1, alignment layer rubbed 5 times, 80mV/s) it holds for **400 to 500 minutes.** In a cell doped with a dichroic dye four optical states were distinguished, transparent, two coloured and hazy, and the state could also be erased with CTAB doping. The work aims at liquid crystal windows that hold a state without power.

## 9. A black made by overlapping two viologens

*ACS Applied Materials &amp; Interfaces · 09.03 · Zekuo Lv, Harbin Institute of Technology*

Getting **a neutral black** out of an electrochromic device is difficult. In the viologen family absorption piles up in one wavelength band so the colour drifts, and cycling stability also falls as radical cations aggregate with each other.

The team mixed two viologens. Fluorinated benzyl viologen (TFBV) suppresses radical cation aggregation and raises redox stability, but its absorption is weak from 450 to 550nm. **Cyanophenyl viologen (CPV)** fills that stretch, because extended π conjugation pushes its absorption to longer wavelengths.

Overlapping two different absorption spectra to cover the whole visible range evenly is the method, and it leads on to smart windows and reflective displays.

## 10. The screen makes electricity: semi-transparent solar glass with different colours front and back

*Advanced Functional Materials · 09.02 · Ruiqi Tian, Faculty of Physics and Optoelectronic Engineering, Beijing University of Technology*

Putting building-integrated photovoltaics and a display on one sheet of glass means dealing with a relationship in which **efficiency, transmittance and colour purity** eat into one another.

The team newly defined the product of the three as a figure of merit (FoM = efficiency × maximum transmittance × colour purity). In effect it writes into the metric that boasting about one loses the others. And in designing an asymmetric metal-dielectric-metal-dielectric colour filter they set the thickness of the top dielectric layer at **λ/4n**, breaking the optical field at the dielectric-metal interface and raising reflection at non-resonant wavelengths.

The result was FoM of **4.71%, 2.04% and 2.29%** in blue, green and red. Being a Janus structure with different colours front and back, dual-mode reflective and transmissive display is also possible.

## 11. Swapping donors moved circularly polarised luminescence from blue to green

*Advanced Functional Materials · 09.02 · Haein Kim, Department of Applied Chemistry, Kyung Hee University*

A screen throws away half its light at the polariser. That is why materials that emit light already rotating one way are being studied. Yet cases of getting circularly polarised luminescence out of group 13 elements, indium complexes in particular, have been almost absent.

The team swapped six donors into a chiral indium-salen complex and moved emission continuously **from 441nm to 525nm.** The luminescence dissymmetry factor was on the order of 10⁻³ in solution, and rose to a maximum of **1.8×10⁻²** once fixed in a PMMA film.

But **the two complexes with the largest dissymmetry were the dimmest in film** (quantum yields of 1% and 0.5%). The paper itself writes that there is no simple relationship between donor rigidity and dissymmetry. There is no device demonstration.

## 12. Cutting the dose electron holography needs to 1/25

*Advanced Science · 08.31 · Ye Luo, School of Future Technology, South China University of Technology*

Electron holography is one of the few methods that measures potential and magnetic field inside a specimen on a nanometre scale, and its sensitivity is blocked by shot noise. Fire more electrons and the noise falls, but the specimen is damaged.

The team built an unsupervised neural network **with the physics that phase information concentrates in the Fourier-space sideband put in as prior knowledge.** Replacing downsampling with an anti-aliasing operator also prevented sideband contamination. Phase precision improved **3 to 4 fold**, and for weak magnetic signals the required dose fell to **about 1/25.**

What is worth noting is not the size of the improvement but that **the form was preserved.** Even after denoising, phase noise still follows the inverse square root of electron count. What the network changed is not the shape of the curve but the coefficient in front of it. The authors also state explicitly that resolution does not improve, because it is set by the aperture.
