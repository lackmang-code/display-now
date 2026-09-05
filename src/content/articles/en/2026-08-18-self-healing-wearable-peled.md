---
title: "A light-emitting layer that heals itself in two hours at room temperature"
searchTitle: "Self-healing perovskite LED emissive layer and wearable encapsulation"
summary: "A self-healing polymer modeled on the layered structure of a butterfly wing was put into both the emissive layer and the encapsulation, and the perovskite LED kept 93% of its luminance after 1,000 bends. A figure of 30 days at 70% humidity came with it. Cracking and moisture ingress, the two things holding wearable displays back, were handled together by one encapsulant."
lang: en
translationOf: 2026-08-18-self-healing-wearable-peled
section: paper
reporter: PEER
publishedAt: 2026-08-18
collectWeekStart: '2026-08-10'
readingMinutes: 8
tags: [perovskite-LED, self-healing-polymer, wearable-display, encapsulation, NTUT]
sources:
  - type: paper
    title: "Multimodal Bioinspired Self-Healing Composites Enabling Durable and High-Efficiency Wearable Perovskite Light-Emitting Diodes"
    url: "https://doi.org/10.1002/advs.77039"
featured: true
paywallAfter: 0
---

<div class="paper-card">
  <div><span class="label">Paper</span><a href="https://doi.org/10.1002/advs.77039" target="_blank" rel="noopener">Multimodal Bioinspired Self-Healing Composites Enabling Durable and High-Efficiency Wearable Perovskite Light-Emitting Diodes</a></div>
  <div><span class="label">Authors</span><span>1st author Loganathan Veeramuthu, corresponding Chi-Ching Kuo<span class="dim">(National Taipei University of Technology)</span> · Yehonadav Bekenstein<span class="dim">(Technion)</span> · Tao Zhou<span class="dim">(Pennsylvania State University)</span> and others, 14 in total</span></div>
  <div><span class="label">Published</span><span>Advanced Science, online 2026-08-10 · Online ahead of print <span class="dim">(volume and pages not assigned)</span> · <code>DOI 10.1002/advs.77039</code></span></div>
</div>

The reason wearable displays do not get out of the lab is usually not efficiency but **breaking**. Micro-cracks form through folding and unfolding, layers separate, and moisture gets in through the gap. Adding an encapsulant usually does not help because it is stiff and cracks along with everything else, and once damage has formed there is no way back.

Researchers at National Taipei University of Technology solved this with a **polymer that heals itself**. And not only in the encapsulation layer, but mixed into the light-emitting layer as well. In effect the material that prevents damage and the material that emits light were no longer kept apart but combined into one.

## 1. A design taken from a butterfly wing

The design starts from a butterfly wing. The cuticle of a butterfly wing has hard protein layers and soft hydrated regions stacked in alternation, and gets strength, flexibility and environmental stability at the same time.

The researchers carried that structure over into three kinds of bonding.

- **Strong hydrogen bonds**: the force that holds the material firmly together
- **Weak hydrogen bonds**: the flexibility that lets the chains move
- **Dynamic disulfide bonds**: the restoring power that rejoins a broken backbone at room temperature

With the three working together, a polymer was made that heals on its own at room temperature without heat or light applied from outside. It is not the kind that loads a healing agent in advance and stops when it runs out; the bonds themselves rejoin repeatedly.

<figure class="fig-single">
  <img src="/articles/2026-08-18-self-healing-wearable-peled/Fig2_자가치유거동.jpg" alt="Self-healing behavior of the polymer at room temperature and under extreme conditions, tensile recovery curves, healing efficiency by condition, and notched fracture test results" />
  <figcaption><span class="fig-num">Figure 1</span>Self-healing behavior at room temperature and under extreme conditions. A severed specimen rejoins, and healing occurs underwater and below freezing as well. <span class="dim">Source: paper Fig. 2, CC BY 4.0</span></figcaption>
</figure>

The properties of the polymer itself stand out first.

| Item | Value |
|---|---|
| Stretchability | 4,950% |
| Toughness | 30.47 MJ/m³ |
| Healing efficiency (underwater) | 98% |
| Healing efficiency (phosphate-buffered saline) | 89% |
| Healing efficiency (minus 5 degrees) | 84% |

That healing efficiency came out highest underwater is worth noting. It is the result of designing hydrophilic regions in so that water helps the chains move. It also means the design has in mind something worn on skin that sweats.

## 2. Mixed into the emissive layer, efficiency went up 13 times

The researchers mixed this polymer into a quasi-2D perovskite emissive layer. The polymer acted as a scaffold for crystal growth, improving phase purity and crystallinity, and worked as a buffer between the perovskite and the charge transport layer, reducing deep traps.

The composition with 4% polymer gave the best result.

| Item | With 4% polymer | Without |
|---|---|---|
| Maximum luminance | 9,598 cd/m² (4.75V) | 6,022 cd/m² (6V) |
| Maximum external quantum efficiency | **10.52%** | 0.81% |
| Turn-on voltage | 2.5V | 3.25V |

Efficiency rose 13 times. Adding more, 6% or 8%, instead produced phase separation and aggregation that blocked charge and lowered performance. The amount added is itself a design variable.

## 3. Results in the flexible device

The actual wearable form is a structure with polymer mixed into the emissive layer and the same polymer encapsulating it above. The paper calls this an integrated self-healing polymer (ISHP) device.

<figure class="fig-single">
  <img src="/articles/2026-08-18-self-healing-wearable-peled/Fig5_유연소자안정성.jpg" alt="Structure of the flexible perovskite LED, luminance-current density-voltage characteristics, luminance retention over 1000 bends, stability over 30 days at 70% humidity, and operational lifetime curve" />
  <figcaption><span class="fig-num">Figure 2</span>Performance and durability of the flexible device. Measured under 1,000 bends, 30 days at 70% humidity, and continuous operation respectively. <span class="dim">Source: paper Fig. 5, CC BY 4.0</span></figcaption>
</figure>

| Item | Integrated self-healing device | Comparison device |
|---|---|---|
| Maximum luminance | 1,410 cd/m² (6.25V) | 1,310 cd/m² (polymer only, no encapsulation) |
| External quantum efficiency | **8.43%** | 6.10% |
| Current efficiency | 20.67 cd/A | 1.17 cd/A |
| Luminance after 1,000 bends | **93.43%** | 77.97% |
| Luminance after 30 days at 70% humidity | **79.93%** | about 26% (at day 9) |
| Operational lifetime (initial 200 cd/m², T50) | about 310 minutes | not reported in the paper |

The bending test conditions are a bend radius of 5 millimeters at 1 hertz. One control the researchers included matters here. They also built and compared **a device encapsulated with an ordinary silicone polymer (PDMS) that does not heal itself**. That device retained 83.20% after 1,000 bends. The self-healing device was at 93.43%.

In other words, of the improvement in performance, the share contributed by encapsulation as physical protection and the share contributed by self-healing actually refilling cracks were separated out. 10 percentage points came from the restoring capability of the disulfide bonds.

## 4. What it means

In wearable display development, encapsulation has always been a process tacked on at the end. It was a layer added after the device was made in order to block moisture and oxygen, and so being stiff was taken as unavoidable.

This paper pulled the encapsulant into the emissive layer. The same polymer works twice, as an additive inside the emissive layer helping crystal growth and reducing traps, and as a protective film outside refilling cracks. It is an approach that stacks function onto a layer already present rather than adding another layer, which suits wearable forms that have to be made thin.

It is early to read the numbers straight across as production criteria. The absolute luminance of the flexible device is around 1,410 cd/m², and operational lifetime is about 310 minutes from an initial 200 cd/m². Still, for having separated out how much self-healing is worth under two real use conditions, bending and humidity, with a control in place, there is grounds enough to look again at encapsulation design for stretchable and wearable displays.
