---
title: "Why does a selfie shot through the screen come out fine?"
searchTitle: "Under-display camera (UDC) diffraction and image restoration"
summary: "UDC image degradation is the price of lowering pixel density, and a single phenomenon, diffraction, creates three defects at once: blur, flare and halo. The solutions split two ways, computational restoration (software) and metasurfaces (optics). From principle to patent landscape, for the optical and pixel design engineers who have to decide which one to invest in."
section: tech-note
reporter: TEKER
publishedAt: 2026-08-11
series:
  id: teker-deep
  part: 1
  episode: 1
readingMinutes: 12
lang: en
translationOf: 2026-08-11-udc-diffraction
tags: [UDC, OLED, 메타서피스, 삼성디스플레이]
sources:
  - type: disclosure
    title: "BOE, 삼성디스플레이 상대 미국 특허 침해 소송 제기 (2026)"
  - type: patent
    title: "Google의 이중 패턴·이중 센서 UDC 구조"
    number: "EP4218225A1"
  - type: paper
    title: "메타서피스 기반 UDC 회절 고차 모드 억제 연구"
    url: "https://arxiv.org/abs/2504.17368"
  - type: article
    title: "GSMArena의 ZTE Axon 20 언더디스플레이 카메라 리뷰"
featured: true
paywallAfter: 0
---

## 1. How the hole-less screen came about

The other sensors hidden under an OLED, the ambient light sensor and the proximity sensor, were a matter of "does light pass through." The ambient light sensor only had to measure one quantity of light, the proximity sensor only had to send one signal there and back. UDC is different. It has to form an image of millions of pixels from the light that got through. Passing through is not enough; it has to be sharp.

The Axon 20 that ZTE put out in September 2020 had no camera hole anywhere on its screen. It was the world's first commercialized under-display camera, and the trick was simple: the pixels where the camera sat were arranged more sparsely than the rest. That was all.

<figure class="fig-grid-2">
  <img src="/articles/2026-08-11-udc-diffraction/ZTE_구멍없음_비교.webp" alt="Comparison of a punch-hole phone and the ZTE Axon 20" />
  <img src="/articles/2026-08-11-udc-diffraction/ZTE_매크로_픽셀밀도차이.webp" alt="Macro shot of the ZTE Axon 20 camera region" />
</figure>
<p class="fig-caption-row">
  <span>A punch-hole phone (left) and the ZTE Axon 20 (right). There is no hole on the right. <span class="src">Source: GSMArena</span></span>
  <span>Macro shot. The camera region on the left has sparser pixels than the ordinary screen on the right. <span class="src">Source: GSMArena</span></span>
</p>

Competition over this position is still under way. Visionox filed first on a dual low-density and high-density structure, and BOE refined it a step further into a chequerboard arrangement. Other panel makers including Samsung have each accumulated patents on variant structures. The goal of hiding a camera under the screen is the same while the arrangement differs by company, and those minute differences became the boundary line of disputes. In 2026 BOE filed a patent infringement suit against Samsung in a US court.[^1]

**Table 1 · Comparison of pixel arrangements in the camera region**

| Party | Arrangement | Aim | Timing |
|---|---|---|---:|
| ZTE Axon 20 | low density only in the camera region | first commercialization. transmittance takes priority | 2020.09 |
| Visionox | dual low-density and high-density structure | eases the visible brightness step at the boundary | earlier filing |
| **BOE** | chequerboard (grid alternating) arrangement | distributes the transmitting sections to ease diffraction fringes | improvement |
| Samsung and others | numerous variant arrangements | design-around. the target of BOE's 2026 suit | 2026 dispute |

*Source: compiled from each company's published patents and publicly known litigation facts. Interpretation of claim scope is not included.*

## 2. Why the image quality worsens

<figure class="fig-single">
  <img src="/articles/2026-08-11-udc-diffraction/AI일러스트_회절원리개념도.webp" alt="Concept diagram of an external light source reaching the transparent pixel region and diffraction fringes spreading out" />
  <figcaption>The transparent pixel region made by arranging the pixels above the camera sparsely (enlarged, left). An external light source passes through these regular gaps and diffraction fringes spread out. <span class="src">AI-generated image</span></figcaption>
</figure>

The screen above the camera is not thinned out at random. Transparent gaps open between the pixels in a regular pattern. The problem starts here. Light is a wave, and a wave passing through narrow gaps repeating regularly does not travel straight. It spreads in all directions, interferes with itself and makes fringes. Diffraction. The same principle by which a streetlight seen through a fine insect screen appears smeared enters every image an under-screen camera receives.

The lower the density, the more light comes in. But at the same time that regularly thinned arrangement itself increases the diffraction. **The more you open it, the blurrier it gets** — that is the paradox. The fundamental trade-off UDC design is held by is here.

You can move the gap width and the wavelength yourself and see how the diffraction angle changes.

<div class="sim-embed" data-sim="udc-diffraction-demo" data-params='{"apertureUm":3,"wavelengthNm":550}'>
  <p class="sim-fallback">This area is not shown if JavaScript is turned off.</p>
</div>

**Table 2 · The three image degradations diffraction makes**

| Phenomenon | What is seen | Physical cause |
|---|---|---|
| blur `Blur` | sharpness falls across the whole image | light from one point spreads out broadly instead of forming a sharp point |
| flare `Flare` | star-shaped streaks extend from a bright light source | the spread light aligns along the grain of the grid |
| halo `Halo` | a rainbow rim around a light source | the bending angle differs by wavelength, so colours separate |

<figure class="fig-single">
  <img src="/articles/2026-08-11-udc-diffraction/AI일러스트_UDC셀피시뮬레이션.webp" alt="A simulated selfie image with the blur, flare and halo made by diffraction overlaid" />
  <figcaption>A simulated image made on the assumption of all three phenomena appearing in one scene. The rainbow rim around the streetlight is the halo, the star-shaped streaks the flare, and the soft focus across the background the blur. <span class="src">AI-generated image</span></figcaption>
</figure>

## 3. Filling it in by calculation: restoration algorithms

Diffraction that structure could not fully block has to be filled in somewhere. Since the ECCV challenge of 2020, the computer vision field has held a competition on this problem every year. An actual UDC panel is placed in front of a camera, a monitor is photographed to measure the point spread function (PSF) — how far a single point source spreads when captured — and that data is used to restore the blurred image in reverse.

<figure class="fig-timeline">
  <figcaption class="fig-caption-mono">Figure 3 · The current of restoration algorithm research</figcaption>
  <div class="timeline-row">
    <div class="timeline-item"><span class="year">2020</span><b>ECCV Challenge</b><span>benchmark fixed</span></div>
    <div class="timeline-item"><span class="year">2021</span><b>DISCNet</b><span>measured PSF plus deep learning restoration</span></div>
    <div class="timeline-item"><span class="year">2023</span><b>Scattering Effect</b><span>blurring reinterpreted as a scattering medium</span></div>
    <div class="timeline-item"><span class="year accent">2026</span><b>UCMNet</b><span>network 30% lighter, performance held</span></div>
  </div>
  <div class="fig-note">An already established research field with a conference challenge every year.</div>
</figure>

Google solved the same problem differently. It divided the camera region into two sections and planted a light-blocking pattern of a different shape in each. One is rectangular, the other circular. Under the rectangular pattern is a monochrome sensor, under the circular one a colour sensor. One yields an image favourable to sharpness and the other one favourable to colour reproduction, and the two are then merged by artificial intelligence.[^2]

> Rather than striving to remove the distortion, deliberately design two different distortions, extract two kinds of information, and build one image by calculation.

## 4. Erasing it optically: metasurfaces

In 2025 a route appeared that needs no calculation at all: the metasurface, an optical surface designed at the nanometre scale. It optically suppresses the higher-order diffraction modes made by the regular pixel arrangement, obtaining a clean image in real time without passing through a neural network. It is the approach of erasing the cause itself optically rather than correcting after the fact.[^3]

<figure class="fig-single">
  <img src="/articles/2026-08-11-udc-diffraction/메타서피스_Fig8_복원비교.webp" alt="Comparison of MTF and restored images before and after applying the metasurface" />
  <figcaption>Above: modulation transfer function (MTF) by wavelength. Applying the metasurface brings it close to the ideal curve (the Airy function). Below: original / without metasurface / with metasurface. Sharpness recovers greatly even without a neural network. <span class="src">Source: arXiv:2504.17368</span></figcaption>
</figure>

You can move the suppression strength yourself and see how close the measured MTF curve comes to the ideal Airy curve.

<div class="sim-embed" data-sim="metasurface-mtf-demo" data-params='{"suppressionPct":45}'>
  <p class="sim-fallback">This area is not shown if JavaScript is turned off.</p>
</div>

**Table 3 · The two branches of solution compared**

| Category | Software · restoration algorithm | Hardware · metasurface |
|---|---|---|
| Point of intervention | after capture (undoing the blurred image) | before capture (suppressing the diffraction itself) |
| Maturity | a conference challenge every year since 2020. an established field | at the 2025 paper stage. before production validation |
| Cost | compute resources and latency | an added nanostructure process |
| Limit | there is a limit to restoring lost information | covering the whole visible band at once is the challenge |

## 5. Two questions remaining

### ① The metasurface is still before production validation

Designing a nanostructure to suppress diffraction across the whole visible band (450 to 630nm) at once, and being able to lay that structure onto an existing OLED panel process as it is, are different problems. Whether paper-level performance reproduces on an actual production line is not yet confirmed.

### ② Optics and calculation: where to draw the line

Filling in by calculation and suppressing optically are less a competitive relation than a combinable one. Optimizing the division of roles — how far the panel structure blocks and from where the neural network restores — is the substantive design problem of the next stage.

## 6. Key terms

<dl class="term-list">
  <div><dt>UDC</dt><dd>Under-display camera. A structure placing the camera beneath the screen to remove the front-face hole.</dd></div>
  <div><dt>diffraction</dt><dd>The phenomenon in which a wave passing regular narrow gaps spreads and interferes to make fringes. The single cause of UDC image degradation.</dd></div>
  <div><dt>PSF</dt><dd>Point spread function. A function expressing how far a single point source spreads when captured, and the input to restoration algorithms.</dd></div>
  <div><dt>MTF</dt><dd>Modulation transfer function. A sharpness indicator expressing how much contrast is preserved at each spatial frequency.</dd></div>
  <div><dt>metasurface</dt><dd>An optical surface controlling the phase and amplitude of light by arraying nanostructures smaller than the wavelength.</dd></div>
</dl>

[^1]: The patent infringement suit BOE filed against Samsung in a US court in 2026. The text covers only the fact of the filing and carries no judgement on claim scope or infringement.
[^2]: Google patent EP4218225A1. A structure combining two light-blocking patterns and two kinds of sensor and then fusing them by machine learning.
[^3]: arXiv:2504.17368. Research suppressing higher-order diffraction modes with a metasurface. At the paper stage; application to a production process is not validated.
