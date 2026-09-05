---
title: "Non-volatility and dual illumination in a Micro-LED pixel, from a floating gate"
searchTitle: "How the Micro-LED floating gate pixel drives non-volatilely"
summary: "Display and illumination may no longer need to be built as separate modules. A Hunan University group stacked a single transparent floating gate memory on each pixel to make a Micro-LED that holds an image without refresh and doubles as lighting. Static power in the off state is 1.4 picowatts per pixel. A result worth watching for any planning team thinking about a new product category."
section: paper
reporter: PEER
publishedAt: 2026-08-13
readingMinutes: 8
lang: en
translationOf: 2026-08-13-hunan-indis-microled
tags: [Micro-LED, 플로팅게이트 메모리, 비휘발성 디스플레이, 후난대]
sources:
  - type: paper
    title: "Dual-function Floating-Gate Memory Driver for Energy-Efficient Integrated Display–Illumination System"
    url: "https://doi.org/10.1038/s41467-026-76263-3"
featured: true
paywallAfter: 0
---

<div class="paper-card">
  <div><span class="label">Paper</span><a href="https://doi.org/10.1038/s41467-026-76263-3" target="_blank" rel="noopener">Dual-function Floating-Gate Memory Driver for Energy-Efficient Integrated Display–Illumination System</a></div>
  <div><span class="label">Authors</span><span>Co-first authors Haifeng Wu · Yizhe Wang, corresponding Xiao Wang · Dong Li · Anlian Pan<span class="dim">(Hunan University)</span>, 21 authors in total</span></div>
  <div><span class="label">Published</span><span>Nature Communications, 2026 · Article in Press <span class="dim">(volume and pages not assigned)</span> · <code>DOI 10.1038/s41467-026-76263-3</code></span></div>
</div>

Micro-LED displays have always been built with screen and lighting made separately, because the circuits differ and the drive schemes differ. A Hunan University group merged the two into one chip merely by stacking a single transparent memory device on each pixel. The image does not go out without continuous power. In the off state one pixel uses 1.4 picowatts, less than most leakage currents.

## 1. Why this was a hard problem

Until now a Micro-LED display had to be supplied with power without interruption to keep the screen on, because there was no non-volatile function storing the display state. Attempts to hold a static image for a long time, or to make a reconfigurable screen in a power-limited environment, ran into this limit every time.

Worse, the circuit itself was designed as "display only." Adding a lighting function that spreads light uniformly over a large area meant bolting on a separate module, increasing volume, power and control complexity together. With screen and lighting made from different circuits, there was no ready way to merge them.

## 2. The turn: one switch per pixel

The group stacked a transparent ITO floating gate memory (FGM) vertically on top of the Micro-LED. One emitter and one memory per pixel (1M1D). Depending on which voltage is applied to the combination, the same chip wears two faces.

1. One transparent floating gate memory per pixel, stacked vertically with the Micro-LED (the 1M1D structure)
2. Apply a gate voltage per pixel (Type-II) and that pixel's state is stored, so the image is held without refresh
3. Apply a common anode voltage across the whole array (Type-I) and it turns into uniform lighting with no storage function

<figure class="fig-single">
  <img src="/articles/2026-08-13-hunan-indis-microled/Fig1_개념도.png" alt="INDIS concept diagram. The 1M1D structure stacking a Micro-LED and a transparent floating gate memory vertically, with wafer and array photographs" />
  <figcaption><span class="fig-num">Figure 1</span>The 1M1D structure stacking a Micro-LED and a transparent floating gate memory vertically. Gate voltage (Type-II) and common anode voltage (Type-I) switch between display mode and illumination mode. <span class="dim">Source: paper Fig. 1, CC BY 4.0</span></figcaption>
</figure>

The group named this structure INDIS (Integrated Nonvolatile Display–Illumination System).

## 3. Result: standby power close to zero

<div class="stat-row">
  <div><b>1.4 pW</b><span>static (off) power per pixel</span></div>
  <div><b>&gt;10⁸</b><span>on/off ratio of the 1M1D integrated device</span></div>
  <div><b>96.87%</b><span>brightness retention after 200 seconds<span class="dim">(9V gate pulse)</span></span></div>
</div>

In statistics over 100 devices on a 4-inch wafer, the Type-II (three-terminal, display mode) on/off ratio averaged 1.75×10⁸ and fabrication yield exceeded 98%. The switching energy to flip one gate pulse is 11.41pJ. A 10×10 pixel array (pitch 45µm, Micro-LED size 7.5µm, equivalent to about 564 PPI) was used to display the characters "I ♥ HNU" in practice, and the supplementary material carries a demonstration of the characters "MICRO" scaled up to 200×128 pixels.

**Table 1 · Standby power comparison (based on Table S2 of the same paper; only figures consistent with the body text are used)**

| Approach | Static (off) power | Driver voltage loss |
|---|---:|---:|
| This work (ITO floating gate) | 1.4 pW | 11.71% |
| ITO-TFT | 20 pW | 11.43% |
| MoS₂-TFT | 14 pW | 14.3% |
| LTPS-TFT | 33 pW | 29.6% |

*Static power means the current one pixel keeps leaking in the standby state. Source: paper Table S2.*

<figure class="fig-single">
  <img src="/articles/2026-08-13-hunan-indis-microled/Fig3_전력비교.png" alt="Graphs of the 1M1D pixel device characteristics and the power comparison against competing technologies" />
  <figcaption><span class="fig-num">Figure 2</span>Electrical characteristics of the integrated 1M1D pixel (a-g) and the power and loss comparison against competing technologies (h). <span class="dim">Source: paper Fig. 3, CC BY 4.0</span></figcaption>
</figure>

## 4. What it means: the line between screen and lighting blurs

The practice of building display and lighting separately always had volume and power budget as its problem. This work erases that line with one circuit and one difference in how voltage is applied. It looks especially useful for static screens that have to stay on (standby information display, low-power wearable interfaces) and for small devices that need both screen and lighting.

This demonstration is limited to blue and green Micro-LEDs, though. A result integrating the red needed for full colour is not in this paper.

## 5. At a glance

| | |
|---|---|
| **In one line** | stacking a transparent floating gate memory on a Micro-LED to switch display and illumination on one chip (static power 1.4pW) |
| **Core results** | on/off ratio &gt;10⁸ · 96.87% brightness retention at 200 seconds · a 564 PPI-class 10×10 array demonstration |
| **Strengths** | holds the image without refresh, standby power far below competing technologies (LTPS-TFT and others) |
| **Published** | Nature Communications, 2026 (Article in Press) |

## 6. Key terms

<dl class="term-list">
  <div><dt>floating gate memory</dt><dd>A non-volatile memory structure storing information in an insulated gate that traps charge. The state is held even with the power off.</dd></div>
  <div><dt>1M1D</dt><dd>A structure pairing one memory and one diode per pixel. It allows per-pixel control without complex compensation circuitry.</dd></div>
  <div><dt>non-volatile display</dt><dd>A display whose screen content is held even when the power supply stops or it is not refreshed.</dd></div>
  <div><dt>INDIS</dt><dd>Integrated Nonvolatile Display–Illumination System. The name this paper gives its device concept combining display and illumination on one chip.</dd></div>
</dl>

The other 14 papers of the week are swept briefly in the [display paper briefing for week 1 of August](/en/article/2026-08-14-paper-week1-brief).
