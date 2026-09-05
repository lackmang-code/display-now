---
title: "The screen is lit, so how does auto-brightness measure the outside?"
searchTitle: "How the under-display ambient light sensor (ALS) works and OLED crosstalk"
summary: "If an ambient light sensor hidden under an OLED cannot tell its own emitted light from external light, screen brightness control wobbles wholesale. Why the recent trend of removing the polarizer makes this problem worse, and the crosstalk correction methods sensor and panel design teams actually meet."
section: tech-note
reporter: TEKER
publishedAt: 2026-08-14
series:
  id: teker-deep
  part: 1
  episode: 3
readingMinutes: 10
lang: en
translationOf: 2026-08-14-als-behind-oled-crosstalk
tags: [ALS, 조도센서, OLED, 크로스토크]
sources:
  - type: disclosure
    title: "ams OSRAM TCS3720 데이터시트"
  - type: patent
    title: "Display-ambient light sensor crosstalk compensation using heat map and emission mask"
    number: "US12498264"
  - type: patent
    title: "ALS sensing/compensation system"
    number: "US12288512"
  - type: patent
    title: "OLED display panel stack structure"
    number: "US11974458"
  - type: paper
    title: "24-4: Foldable AMOLED Display Utilizing Novel COE Structure"
    url: "https://www.researchgate.net/publication/325490705"
  - type: disclosure
    title: "삼성디스플레이 Eco² OLED 보도자료"
    url: "https://global.samsungdisplay.com/28402"
  - type: paper
    title: "Sensor OLED: simultaneous fingerprint and biomarker sensing display"
    url: "https://www.nature.com/articles/s44172-024-00239-8"
featured: false
paywallAfter: 0
---

## 1. What an ALS is

Walk into a dark room and the screen dims by itself; step out into sunlight and it brightens again. The eye matching that brightness is the ambient light sensor (ALS). To think of it as a sensor that only measures brightness is to know half of it. Today's behind-OLED ALS (the ams OSRAM TCS3720 and others) is closer to a small colour camera reading four channels at once: red, green, blue and clear, RGB+C. It extracts three things. The clear channel measures ambient brightness (illuminance); the ratio of the RGB channels reads the colour temperature (CCT), whether the light is sunlight or fluorescent, to adjust the screen's white balance automatically; and it catches the frequency at which lighting flickers invisibly to the eye, preventing banding stripes when a camera shoots.

You can move the ambient brightness and colour temperature yourself and see how the screen responds.

<div class="sim-embed" data-sim="als-white-balance-demo" data-params='{"ambientIntensityPct":55,"ambientTempK":4500}'>
  <p class="sim-fallback">This area is not shown if JavaScript is turned off.</p>
</div>

This sensor used to sit comfortably in the bezel above the screen. Then the full-screen era, in which the screen covers almost the whole front face, took its seat away and it had to hide beneath the screen. From that moment the story stops being about the sensor and becomes a story about the OLED.

## 2. The wall called transmittance

<figure class="fig-float">
  <img src="/articles/2026-08-14-als-behind-oled-crosstalk/als_chip.webp" alt="Cross-sectional photograph of an actual behind-OLED ALS sensor die" />
  <figcaption>A cross-section of an actual behind-OLED ALS sensor die. The RGB+C photodiode region is visible at the top.</figcaption>
</figure>

An OLED is a brilliant self-emitting screen to us, but from sensor eye level beneath it, it is an opaque film stacked many layers deep. For external light to reach the sensor it has to pass cover glass, polarizer, thin film encapsulation and pixel layers. The pixel electrode (anode) is a fully reflective film so its transmittance is close to zero, but light leaks out through the fine mesh made by the lower wiring between the electrodes. The OLED panel stack structure described in patent US11974458 shows that path. So the most important word for an ALS is the OLED's transmission characteristics.

If the light is too weak, the OLED side has no choice but to become more transparent. There is a limit to how much sensitivity can be crammed into a fingernail-sized chip, so redesigning the pixel arrangement, cathode pattern and touch electrode structure toward transmittance passes to the panel.

<figure class="fig-single">
  <img src="/articles/2026-08-14-als-behind-oled-crosstalk/oled_refl_trans.webp" alt="Actual images of the same OLED panel photographed in reflection (left) and transmission (right). Light passes only through the mesh between the wiring" />
  <figcaption>Actual images of the same OLED panel seen in reflection (left) and transmission (right). Light passes only through the mesh between the wiring.</figcaption>
</figure>

## 3. Fighting the pixels' own light

The pixels directly above the sensor emit light too. Which means external light (the signal) and pixel leakage light (the noise) enter the sensor mixed together. Patent US12498264 solves this two ways. One is timing. Measuring the light in step with the blanking interval, when the pixels briefly turn off, catches something close to pure external light. For this the DDIC gives up its emission timing and the LTPO backplane its low drive frequency. The other is calculation. Pixel-by-pixel light leakage is made into a heat map, reflecting the screen content and brightness, and subtracted as noise.

<figure class="fig-single">
  <img src="/articles/2026-08-14-als-behind-oled-crosstalk/blanking_sync.webp" alt="A three-tier blanking synchronization timing graph: OLED emission waveform, sensor measurement window, accumulated photocharge" />
  <figcaption>Line up the sensor measurement window (centre) with the blanking interval where OLED emission (top) briefly turns off, and the pixel leakage light can be removed from the accumulated photocharge (bottom).</figcaption>
</figure>

How accurate the synchronization timing is and how strong the correction algorithm is decide the final measurement error. You can move the two variables yourself below.

<div class="sim-embed" data-sim="crosstalk-heatmap-demo" data-params='{"syncErrorPct":40,"correctionPct":50}'>
  <p class="sim-fallback">This area is not shown if JavaScript is turned off.</p>
</div>

A finger covering the sensor makes the value jump. That case too is judged by the sensor itself, which tags the value and filters it out.

## 4. Does going POL-less make it easier?

Today's OLEDs are heading toward stripping out the polarizer (POL-less). An OLED has many metal electrodes and reflects external light like a mirror, and the circular polarizer laid over it to suppress that reflection absorbs about half the light. So structures suppressing reflection with a black PDL (pixel defining layer) and colour filters instead of a polarizer appeared. Samsung calls this OCF, while BOE and Visionox call it CoE (colour filter on encapsulation). An academic paper on this structure shows its cross-section concretely.[^1] Samsung Display stated that its Eco² OLED using this structure raised transmittance by 33%.[^2]

There is a common misunderstanding here: "the polarizer is gone, so more light comes in and it must be good for the ALS." It is not that simple. What POL-less does is not let more light through but suppress reflection without a polarizer. The black PDL and colour filters that took over that role themselves absorb and block light. The mesh space between anodes that acted as the sensor's window in an ordinary OLED can, in a POL-less structure, be covered entirely by the black PDL and colour filters, bringing transmittance effectively close to zero. A POL-less panel does not mean the transmittance a sensor can use is secured automatically.

<figure class="fig-single">
  <img src="/articles/2026-08-14-als-behind-oled-crosstalk/polless_layers.webp" alt="Stack comparison of an ordinary OLED (left) and a POL-less OLED (right). On the right the black PDL and colour filter cover the transmitting window" />
  <figcaption>Stack comparison of an ordinary OLED (left) and a POL-less OLED (right). On the right a black PDL and colour filter suppress reflection instead of a polarizer, but cover the sensor's transmitting window by that much too.</figcaption>
</figure>

The real challenge is building a panel structure that maintains POL-less low-reflection optics while separately securing, in the sensor region, enough transmittance for the ALS to use. Reflection must be suppressed (dark means good image quality) and transmission must be preserved (bright means the sensor can read), and these two head-on demands have to be reconciled by redesigning only the region above the sensor, locally.

## 5. Questions remaining

### ① Can ALS function be planted in the panel without an ALS?

Backplane active devices (LTPS, a-Si, oxide TFTs) respond to light by nature. When the transistor turning a pixel on and off receives light, its current wavers; usually a nuisance to be corrected, but used in reverse it becomes a photosensor. Oxide (IGZO/IZO) TFTs in particular are sensitive to short-wavelength light (bandgap above 3.0eV) and low in leakage, which makes them promising. There is research reporting an a-IZO photosensor with a photoresponsivity of 1280 A/W and an SNR of about 10⁵ under blue light.[^3] Add an organic photodiode (OPD), printable between pixels in the same process as the OLED, and the absorption wavelength can be narrowed to 400 to 600nm to read visible light alone without an IR filter. Research on a sensor OLED detecting fingerprints and biosignals simultaneously has indeed appeared.[^4]

### ② Who designs the special panel structure?

The structure reconciling POL-less low reflection and the sensor's high transmission locally has no settled answer yet, because it is a system problem in which panel, driver circuitry and sensor are designed as one body.

## 6. Key terms

<dl class="term-list">
  <div><dt>ALS</dt><dd>Ambient light sensor. A multi-channel photosensor reading ambient brightness, colour temperature and flicker.</dd></div>
  <div><dt>crosstalk</dt><dd>The phenomenon of external light (the signal) and the pixels' own emission (the noise) mixing in the light the sensor receives.</dd></div>
  <div><dt>blanking</dt><dd>The interval in which the pixels briefly turn off. Measuring in step with it avoids the pixel leakage light.</dd></div>
  <div><dt>POL-less</dt><dd>A structure stripping out the circular polarizer and suppressing reflection with a black PDL and colour filters (OCF/CoE).</dd></div>
  <div><dt>OPD</dt><dd>Organic photodiode. A photosensor device placed between pixels in the same process as the OLED.</dd></div>
</dl>

[^1]: The SID paper "24-4: Foldable AMOLED Display Utilizing Novel COE Structure." It describes the cross-section of the POL-less/CoE structure academically.
[^2]: Samsung Display Eco² OLED press release. It states a 33% transmittance improvement and up to 25% power saving from removing the polarizer.
[^3]: Research on an a-IZO blue light sensor (Sci. Rep.). The photoresponsivity and SNR figures are research-stage results, not commercial figures.
[^4]: Sensor OLED research published in Nature Communications Engineering. It reports a prototype detecting fingerprints and biosignals simultaneously on one screen.
