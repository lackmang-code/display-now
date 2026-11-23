---
title: "Quantum Dot Phosphor Absorptance Raised by Inverting Holes into Pillars"
searchTitle: "Quantum dot color conversion absorptance: phase-inverted 2D photonic crystal phosphor, TiO2 nanopillars, overlapping TE and TM dual Gamma-point resonances, laser interference lithography, absolute absorptance of 0.8, 6.5-fold fluorescence enhancement"
summary: "In a color conversion phosphor, blue light that passes through unabsorbed is lost. A Seoul National University team inverted a photonic crystal's air holes into TiO2 pillars and overlapped TE and TM resonances at the blue excitation wavelength, lifting absolute absorptance to 0.8 by changing structure, not material."
section: paper
reporter: PEER
lang: en
translationOf: 2026-11-24-photonic-crystal-phosphor-absorptance
publishedAt: 2026-11-24
collectWeekStart: '2026-11-16'
readingMinutes: 5
tags: [quantum dots, color conversion, photonic crystal, phosphor, micro LED]
sources:
  - type: paper
    title: "Phase-Inverted Dual-Resonant 2D Photonic Crystal Phosphor Enabling High Excitation-Photon Absorptance (~80%) and Enhanced Color Conversion"
    url: https://doi.org/10.1002/advs.78783
---

Quantum dot displays and quantum dot color-converted micro LEDs use the same path: color conversion, in which a blue light source excites quantum dots to produce green and red. If the quantum dot layer fails to absorb all of the blue light, that light passes through without being converted. It is an efficiency loss, and the leaked blue also shifts the color coordinates.

The simplest remedy is to stack the quantum dot layer thicker. But a thicker layer increases scattering and shifts color, and where pixels shrink, as in micro LEDs, thickness itself becomes a constraint.

Lakjong Jeong and four co-authors at the Department of Physics and Astronomy and the Inter-university Semiconductor Research Center, Seoul National University, took a different route. Instead of using more quantum dots, they changed the structure beneath them.

## Holding light in a photonic crystal increases absorption

A photonic crystal is a structure whose refractive index varies periodically. When light of a particular wavelength enters, a resonance forms inside the structure and the light dwells there longer. A longer dwell time means more chances to be absorbed.

Attempts to apply this principle to color conversion phosphors are not new. The approach is to build a one- or two-dimensional photonic crystal from silicon nitride or TiO₂ and place colloidal quantum dots on top. TiO₂ is used because its large refractive index contrast with the quantum dots strengthens light-matter interaction.

Earlier structures mostly took the form of a slab perforated with air holes. This is the point the researchers changed.

<figure class="fig-single">
  <img src="/articles/2026-11-24-photonic-crystal-phosphor-absorptance/phc-structure.webp" style="max-width:820px;width:100%;margin:0 auto;" alt="Schematic of a TiO2 nanopillar photonic crystal phosphor coated with colloidal quantum dots, with the directions of excitation light and emission indicated" />
  <figcaption>Figure 1. A two-dimensional photonic crystal phosphor built on TiO₂ nanopillars. The directions of excitation light and emission are indicated. <span class="src">Advanced Science (2026) Figure 1, CC BY 4.0</span></figcaption>
</figure>

## Why the holes were inverted into pillars

An array of air holes and an array of pillars are inverted versions of each other. The period is the same either way, but the refractive index distribution seen by light differs, and so does the character of the resonances.

The researchers chose TiO₂ nanopillars and set the ratio of pillar diameter to lattice constant at 0.6, a value selected by computing absorptance spectra for a range of diameters.

Fabrication proceeds as follows: laser interference lithography forms a two-dimensional square lattice pattern, a chromium hard mask is built, TiO₂ is etched, and quantum dots are spin-coated on top at 2,000 rpm. Laser interference lithography was used because it can lay the same pattern over a large area.

<figure class="fig-single">
  <img src="/articles/2026-11-24-photonic-crystal-phosphor-absorptance/fabrication.webp" style="max-width:820px;width:100%;margin:0 auto;" alt="Schematic of the photonic crystal phosphor fabrication process and the laser interference lithography setup used for large-area patterning, with top-view electron micrographs and focused ion beam cross-sections before and after quantum dot coating" />
  <figcaption>Figure 2. (a) Fabrication sequence, (b) laser interference lithography setup for large-area patterning, (c) to (f) top-view electron micrographs and focused ion beam cross-sections before and after quantum dot coating. <span class="src">Advanced Science (2026) Figure 2, CC BY 4.0</span></figcaption>
</figure>

## Overlapping the TE and TM resonances

The core of this paper is not the structural inversion itself but how the resonances are used.

A photonic crystal supports resonances whose character depends on polarization: the TE mode, with the electric field parallel to the plane, and the TM mode, with the magnetic field parallel to the plane. Earlier studies matched only one of them, usually the TE resonance, to the excitation wavelength.

The researchers drew the two resonances close together in the spectrum and overlapped them near 450 nm, the target excitation wavelength of blue LEDs. When the two peaks overlap, they form a single broad, high absorption peak. That is how a peak exceeding an absorptance of 0.8 was produced.

In the spectrum calculated for a geometry that can actually be fabricated, the peak sat at 473 nm, slightly red-shifted from the original 450 nm target. Using finite-difference time-domain calculations, the researchers confirmed that further reducing the lattice constant moves the overlap toward 450 nm. The resonance wavelength can thus be tuned by the photonic crystal period.

<figure class="fig-single">
  <img src="/articles/2026-11-24-photonic-crystal-phosphor-absorptance/optical-absorptance.webp" style="max-width:600px;width:100%;margin:0 auto;" alt="Calculated reflectance, transmittance and absorptance spectra of the two-dimensional photonic crystal phosphor with an inset absorption enhancement factor, plus a three-dimensional surface plot of photoluminescence excitation measurements and the fluorescence enhancement factor spectrum" />
  <figcaption>Figure 3. (a) Calculated reflectance, transmittance and absorptance spectra (inset: absorption enhancement factor), (c) three-dimensional surface plot of photoluminescence excitation measurements and fluorescence enhancement factor spectrum. <span class="src">Advanced Science (2026) Figure 3, CC BY 4.0</span></figcaption>
</figure>

## Absorptance of 0.8, fluorescence up 6.5-fold

The fabricated phosphor approached an absolute absorptance of 0.8 in the blue excitation band. The absorption enhancement factor was defined as the absorptance of the photonic crystal phosphor divided by that of the reference phosphor, and was obtained both by calculation and by experiment.

The reference phosphor is a flat quantum dot film containing a similar amount of quantum dots. The quantum dot fluorescence enhancement factor reached a maximum of about 6.5. At wavelengths away from resonance, this value approached 1, which is evidence that the two samples really do contain similar amounts of quantum dots. The brightness did not come from adding more quantum dots.

Set against earlier work, the result's position becomes clearer. Before it came a one-dimensional silicon nitride structure in 2017, a two-dimensional silicon nitride dual-resonance structure in 2019 and a two-dimensional TiO₂ single TE resonance structure in 2022. The 2022 study achieved an absorptance of about 0.5 and fluorescence of about 7-fold.

That this paper's fluorescence multiple of 6.5 is lower does not mean inferior performance. The reference differs. The reference quantum dot films in earlier studies were 12 nm to 50 nm thick, whereas this paper compared against a film of about 120 nm. A thick reference already absorbs a substantial amount, so the enhancement multiple comes out smaller. Looked at in absolute absorptance rather than multiples, this study's contribution is the rise from about 0.5 in the 2022 study to 0.8.

## The difference visible to the eye

The researchers also compared photographs: one capturing only quantum dot emission through a bandpass filter and one capturing only transmitted excitation light.

<figure class="fig-single">
  <img src="/articles/2026-11-24-photonic-crystal-phosphor-absorptance/visual-comparison.webp" style="max-width:400px;width:100%;margin:0 auto;" alt="Side-by-side comparison of photographs of quantum dot fluorescence from the reference phosphor and the photonic crystal phosphor taken through a bandpass filter, and photographs of transmitted excitation light" />
  <figcaption>Figure 4. (a, b) Comparison of quantum dot fluorescence photographs of the reference phosphor and the photonic crystal phosphor. <span class="src">Advanced Science (2026) Figure 4, CC BY 4.0</span></figcaption>
</figure>

## Distance to industry

The value of this result for practitioners lies in its being structural rather than material. Instead of synthesizing new quantum dots or changing their composition, it changed the period and shape of the underlying structure to extract more conversion from the same quantum dots. It offers a way to raise absorption while keeping the quantum dot layer thin, which fits the direction of shrinking pixels.

The gate is the process. Uniformly erecting TiO₂ nanopillar arrays over a large area remains to be done. Laser interference lithography suits laying periodic patterns over wide areas, but entering panel processes requires demonstrating uniformity and yield at panel size. How much absorptance drops when the ratio of pillar diameter to lattice constant departs from 0.6 also sets the process margin, yet the paper covered only the rationale for choosing the design value.

The resonance wavelength sitting at 473 nm also becomes a problem if left as is. Blue LEDs emit near 450 nm, so a 23 nm difference cuts absorptance. The researchers showed by calculation that reducing the lattice constant can bring it into alignment, but whether that geometry can actually be fabricated and deliver the same absorptance is the next step.

The angle of incoming light is another open question. Photonic crystal resonances are sensitive to the angle of incidence, and the Γ-point resonance used in this paper targets normal incidence. How absorptance changes when light enters at various angles in a backlight or micro LED pixel is not addressed in this paper.
