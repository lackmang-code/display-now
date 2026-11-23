---
title: "Backplane IGZO Interlayer Lowers Dark Current in a ZnO UV Sensor"
searchTitle: "IGZO interlayer ZnO nanorod ultraviolet photodetector: leakage suppression, photo-to-dark current ratio of 15,897 and a 90-degree hydrothermal growth process"
summary: "IGZO, the display backplane oxide, was inserted as an interlayer in a UV photodetector. Its wide bandgap passes 365-nanometer light and blocks only leakage, cutting dark current to about 6 nanoamperes. Response is slow, though, and detectivity is higher without IGZO."
section: paper
reporter: PEER
lang: en
translationOf: 2026-11-03-igzo-interlayer-uv-photodetector
publishedAt: 2026-11-03
collectWeekStart: '2026-10-26'
readingMinutes: 5
tags: [IGZO, oxide semiconductor, UV photodetector, ZnO nanorods, dark current, hydrothermal growth, in-panel sensors]
sources:
  - type: paper
    title: "Engineering Vertically Aligned ZnO Nanorods with Amorphous IGZO for High-Performance UV Photodetection"
    url: "https://doi.org/10.1021/acsaelm.6c01908"
featured: false
paywallAfter: 0
---

<div class="paper-card">
  <div><span class="label">Paper</span><a href="https://doi.org/10.1021/acsaelm.6c01908" target="_blank" rel="noopener">Engineering Vertically Aligned ZnO Nanorods with Amorphous IGZO for High-Performance UV Photodetection</a></div>
  <div><span class="label">Authors</span><span>First and corresponding author Bohr-Ran Huang and 2 others <span class="dim">(National Taiwan University of Science and Technology)</span></span></div>
  <div><span class="label">Published</span><span>ACS Applied Electronic Materials · published online 2026-10-31 · <code>DOI 10.1021/acsaelm.6c01908</code></span></div>
</div>

To people in displays, IGZO is a backplane material. Being amorphous, it deposits uniformly over large glass; for an amorphous material it conducts electrons well; and when switched off it leaks almost nothing. Those three properties made it the standard choice for oxide thin-film transistors.

This paper puts the same material not into a transistor but into an ultraviolet sensor. And it uses IGZO not as the light-absorbing layer but as an **interlayer that does not absorb light**.

UV detectors face a long-standing dilemma. Current in the dark should be small and current under illumination should be large, but getting both at once is hard. ZnO nanorods absorb UV strongly and offer a large surface area, making them a strong absorber candidate, but grown directly on a silicon substrate they leak current at the junction. Add a layer to block the leakage path, and the photogenerated charge gets blocked too.

## 1. One layer between the absorber and the substrate

The structure has three layers: vertically aligned ZnO nanorods on top, n-type silicon at the bottom, and amorphous IGZO in between. Silver interdigitated electrodes sit on top of the nanorods.

<figure class="fig-single">
  <img src="/articles/2026-11-03-igzo-interlayer-uv-photodetector/fig1-device-structure.webp" alt="Device operation schematic and structure. Left: the path along which charge is generated and transported under UV light. Right: the stack of silver interdigitated electrodes, vertical ZnO nanorods, IGZO layer and n-type silicon substrate" />
  <figcaption>Figure 1. Device operation and layer stack. Vertical ZnO nanorods stand beneath the silver interdigitated electrodes, with the IGZO layer and n-type silicon substrate below them. <span class="src">ACS Applied Electronic Materials (2026) Fig. 4, CC BY 4.0</span></figcaption>
</figure>

Two control devices were built alongside: a ZnO nanorod/silicon structure without IGZO, and an IGZO/silicon structure without nanorods. Only by measuring all three under the same conditions can the role of the interlayer be isolated.

## 2. The process is not far from a backplane line

IGZO was deposited by RF sputtering: an argon-to-oxygen flow ratio of 20 to 5, working pressure of 25 millitorr, power of 50 watts and deposition time of 10 minutes. The ZnO thin film used as a seed layer was sputtered under the same conditions.

The nanorods were then grown from solution. 0.6585 grams of zinc acetate and 0.420 grams of hexamethylenetetramine were dissolved in 100 milliliters of distilled water, and the substrate was immersed at 90 degrees for 30 minutes.

What stands out is that the maximum process temperature is 90 degrees. With only sputtering and low-temperature solution growth, the process itself is not that far from a display backplane line.

<figure class="fig-single">
  <img src="/articles/2026-11-03-igzo-interlayer-uv-photodetector/fig2-sem.webp" alt="Six scanning electron microscope panels: top and cross-sectional views of the ZnO nanorod on IGZO stack, of IGZO alone, and of ZnO nanorods alone" />
  <figcaption>Figure 2. Scanning electron micrographs of the three structures. From top left: plan and cross-sectional views of the ZnO nanorod/IGZO stack, IGZO alone and ZnO nanorods alone. <span class="src">ACS Applied Electronic Materials (2026) Fig. 5, CC BY 4.0</span></figcaption>
</figure>

Transmission electron microscopy of the interface shows a clear ZnO (002) lattice spacing of about 0.260 nanometers, with an amorphous region adjacent to it. This means the IGZO remains amorphous. Raman spectroscopy picked up a vibrational peak near 437 wavenumbers, confirming the wurtzite phase, and X-ray diffraction showed a signal strongly oriented along (002).

<figure class="fig-single">
  <img src="/articles/2026-11-03-igzo-interlayer-uv-photodetector/fig3-tem-mapping.webp" alt="Seven transmission electron microscopy panels: overall image, high-resolution image showing lattice fringes, selected-area electron diffraction pattern, and elemental maps of indium, gallium, zinc and oxygen" />
  <figcaption>Figure 3. Transmission electron microscopy of the interface. The high-resolution image distinguishes the ZnO (002) lattice from the adjoining amorphous IGZO region, and the elemental maps show the layer composition. <span class="src">ACS Applied Electronic Materials (2026) Fig. 6, CC BY 4.0</span></figcaption>
</figure>

## 3. IGZO does not absorb the light

How does the interlayer block only leakage while passing photogenerated charge? The answer lies in the bandgap.

Optical bandgaps from Tauc plots are about 3.19 electron volts for the stack, about 3.27 electron volts for ZnO nanorods alone, and about 4.43 electron volts for IGZO. The 365-nanometer light used in the measurements exceeds the ZnO bandgap but falls short of the IGZO bandgap. Absorption therefore occurs in the nanorods, and IGZO is nearly transparent.

The roles thus divide cleanly. The nanorods absorb UV and generate charge; IGZO carries that charge toward the silicon while blocking leakage in the opposite direction. The wide bandgap also means few thermally generated carriers.

## 4. Dark current drops to the nanoampere range

The current-voltage characteristics show the result. Dark current stays close to zero across the entire measured voltage range, while under UV the current rises almost linearly, reaching the level of 1/10,000 of an ampere at 5 volts.

In numbers, the dark current is 6.02 nanoamperes and the photocurrent 95.7 microamperes. The photocurrent divided by the dark current is 15,897. Under the same 5-volt, 365-nanometer conditions, the IGZO-only device gave 1,280 and the nanorod-only device 500. Adding the interlayer widened the ratio by more than a factor of twelve.

Responsivity was reported as 0.233 amperes per watt and specific detectivity as about 1.92×10¹² Jones.

<figure class="fig-single">
  <img src="/articles/2026-11-03-igzo-interlayer-uv-photodetector/fig4-iv-dark-uv.webp" alt="Four current-voltage panels: the ZnO nanorod/IGZO stack device, the IGZO-only device, the stack device on a logarithmic scale, and the ZnO nanorod-only device, each in the dark and under UV illumination" />
  <figcaption>Figure 4. Current-voltage characteristics of the three devices, in the dark and under 365-nanometer UV illumination. The third panel replots the same data on a logarithmic scale. <span class="src">ACS Applied Electronic Materials (2026) Fig. 10, CC BY 4.0</span></figcaption>
</figure>

## 5. Slow, and detectivity runs the other way

That is the part the paper puts forward. The same data raise two points.

The first is speed. Under repeated on/off UV cycling, the photocurrent returns to nearly the same height every cycle, but a single on/off takes 22.83 seconds to rise and 7.95 seconds to decay. That is on the scale of seconds. The authors attribute this to long-lived trapped charge and slow surface adsorption and desorption. It is a limitation commonly reported in ZnO-based photodetectors, and this structure does not escape it.

<figure class="fig-single">
  <img src="/articles/2026-11-03-igzo-interlayer-uv-photodetector/fig5-transient-response.webp" alt="Four transient photoresponse panels: repeated on/off response of the stack device, rise and decay time analysis of a single pulse, and response curves of the ZnO nanorod-only and IGZO-only devices" />
  <figcaption>Figure 5. Transient response under repeated 365-nanometer UV illumination. The second panel reads the rise and decay times from a single pulse: 22.83 seconds and 7.95 seconds. Incident power density 3.152 milliwatts per square centimeter, bias 5 volts. <span class="src">ACS Applied Electronic Materials (2026) Fig. 11, CC BY 4.0</span></figcaption>
</figure>

The second is a point where the comparison table and the text disagree. The text states that the nanorod-only device is inferior in photo-to-dark current ratio and detectivity, but **in the paper's comparison table that device's specific detectivity is about 9×10¹² Jones, more than four times the stack device's 1.92×10¹² Jones.** The stack device clearly wins on photo-to-dark current ratio, but not on detectivity. The achievement of this device should therefore be read as leakage suppression, not detectivity.

Responsivity is not a selling point either. Other studies in the same table report 4 amperes per watt for a ZnO/vanadium pentoxide structure and 0.62 amperes per watt for nanorods combined with niobium selenide. This device's 0.233 amperes per watt is lower.

## 6. The distance to displays

Why, then, read this paper from the display side? For two reasons.

One is a new use for IGZO. Until now IGZO has been a material for opening and closing switches. Here, **thanks to its wide bandgap, the property of "not responding to light" becomes useful.** It leaves absorption to another layer and only blocks leakage. In the trend toward building sensors into panels, the same material could serve two functions.

The other is the process. The maximum temperature is 90 degrees, using only sputtering and solution growth. That is within what glass substrates tolerate, and IGZO sputtering equipment is already on the line.

The distance remains clear, however. The substrate of this device is not glass but n-type silicon with a resistivity of 1 to 10 ohm-centimeters, and **the silicon acts both as the electrode that collects charge and as one side of the junction**. Moving to glass would require designing a new layer to take over that role, which this paper does not address.

Speed is still an obstacle as well. For slow applications such as ambient light sensing, a response on the scale of seconds is not a problem, but it cannot be used for applications that must read quickly inside the screen, such as fingerprints or images.

We also looked for the length and diameter of the nanorods, but they are not given as numbers. The paper only mentions differences in morphology and thickness between structures in the micrographs. With growth fixed at 90 degrees for 30 minutes, reproduction should be possible, but what changes when the dimensions change cannot be read from this paper.
