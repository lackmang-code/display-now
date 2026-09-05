---
title: "Blue phosphorescent OLED: an analysis of 8 patents"
searchTitle: "Blue phosphorescent OLED (PHOLED): an analysis of 8 patents"
summary: "The patent claiming the principle of blue phosphorescence expired in 2020-08. Six years past expiry, no adoption into mass production has been announced. In this stretch where nobody can block it and nobody can build it, we checked against granted patent originals where the actual line of defense has moved."
lang: en
translationOf: 2026-08-18-blue-phosphorescent-oled-patents
section: patent
reporter: CLAIM
publishedAt: 2026-08-18
collectWeekStart: '2026-08-10'
readingMinutes: 15
tags: [blue-phosphorescence, PHOLED, Universal-Display, TADF, Kyulux, OLED-materials]
sources:
  - type: patent
    title: "OLEDs doped with phosphorescent compounds (US6,303,238, Princeton University·University of Southern California, 2001-10-16 등록 / 2017-12-01 만료)"
    url: "https://patents.google.com/patent/US6303238B1/en"
  - type: patent
    title: "Organometallic compounds and emission-shifting organic electrophosphorescence (US6,939,624, Universal Display Corp·Princeton University·USC, 2005-09-06 등록 / 2020-08-11 만료)"
    url: "https://patents.google.com/patent/US6939624B2/en"
  - type: patent
    title: "Organometallic compounds and emission-shifting organic electrophosphorescence (TW593625B, 동일 패밀리 대만 등록건, 2004-06-21 등록)"
    url: "https://patents.google.com/patent/TW593625B/en"
  - type: patent
    title: "Hybrid OLED having phosphorescent and fluorescent emitters (US9,070,884, Universal Display Corp, 2015-06-30 등록 / 2029-10-16 만료 예정)"
    url: "https://patents.google.com/patent/US9070884B2/en"
  - type: patent
    title: "Delayed-fluorescence material and organic electroluminescence element using same (US10,454,038, Kyulux Inc, 2019-10-22 등록 / 2033-08-13 만료 예정)"
    url: "https://patents.google.com/patent/US10454038B2/en"
  - type: patent
    title: "Organic electroluminescent devices (US2026/0026191A1, Universal Display Corp, 우선일 2014-07-24 / 2026-01-22 공개)"
    url: "https://patents.google.com/patent/US20260026191A1/en"
  - type: patent
    title: "Organic electroluminescent materials and devices (US2025/0268098A1, Universal Display Corp, 우선일 2014-01-08 / 2025-08-21 공개)"
    url: "https://patents.google.com/patent/US20250268098A1/en"
  - type: patent
    title: "유기 전계발광 재료 및 소자 (KR2025-0058728A, 유니버설 디스플레이, 우선일 2019-11-14 / 2025-04-30 공개)"
    url: "https://patents.google.com/patent/KR20250058728A/en"
  - type: disclosure
    title: "Universal Display Corporation Q2 2026 Earnings Call Transcript (2026-07-30): 상용화 시점 관련 경영진 발언 및 2026년 매출 가이던스"
    url: "https://www.fool.com/earnings/call-transcripts/2026/07/30/universal-display-oled-q2-2026-earnings-call-transcript/"
  - type: article
    title: "Unlocking Blue: A Deep Dive into Phosphorescent Blue OLEDs (Universal Display Corporation, 2026-06-23)"
    url: "https://oled.com/blog/unlocking-blue-a-deep-dive-into-phosphorescent-blue-oleds/"
featured: false
paywallAfter: 0
---

A patent lasts 20 years. The premise of the system is that you commercialize the technology within that time and recover its value.

Blue phosphorescent OLED is a case where that premise broke. The patent claiming the principle secured priority in 2000-08 and its term ended on 2020-08-11. 6 years on, as of 2026-08, no panel maker has announced putting this technology into mass production.

Nobody now monopolizes that principle. And still nobody can build the product. In this stretch we check against granted patent originals where the actual line of defense has moved.

## 1. Overview

### 1.1 Background and purpose

Red and green in OLED crossed from fluorescence to phosphorescence in the 2000s. Phosphorescence uses an internal quantum efficiency of 100% in theory where fluorescence stops at 25%, so the switch translates directly into a power gain. Blue alone is still fluorescent.

The purpose is confirmation, not prediction. We do not guess "when it will come." We carry over what companies and universities actually wrote in patent specifications and what state those rights are in now.

### 1.2 Scope

The subject is eight patents spanning 22 years, by priority date from 1997 to 2019. The applicants are Princeton University, the University of Southern California (USC), Universal Display, Kyushu University and Kyulux. In-house material patents from panel makers (Samsung Display, LG Display) were not put into this sample. The lineage of rights in this technology started with material companies and universities.

### 1.3 Data sources and search

<div class="tbl-wrap">

| Item | Content |
|---|---|
| Data source | Google Patents (patents.google.com) as a single source. Paid registers such as KIPRIS were not obtained |
| Searches used | `"phosphorescent organic light emitting"` · `"blue phosphorescent"` with assignee specified · `"thermally activated delayed fluorescence"` with inventor specified |
| Search discarded | `"blue phosphorescent"` alone: 8,134 hits, but the top results were luminous paint and printing plate patents from the 1920s to the 1960s. A phrase match unrelated to OLED |
| Sort | Oldest first (sort=old) checked first, then supplemented by newest first |
| Assignee verification | For every patent in the sample, the Google Patents *Application filed by* / *Current Assignee* fields were opened directly |
| Limits | A sample of 8, not an exhaustive survey. Claim counts and citation counts are not used as indicators (distorted by continuations and divisionals) |

</div>

### 1.4 Classification

The collected patents were classified on two axes: "what produces the blue (the lever)" and "what was given up (the price)." The levers fall into three branches: phosphorescence (use the triplet directly), hybrid (leave only blue fluorescent), and delayed fluorescence (lift the triplet back up to the singlet).

## 2. Quantitative sketch

### 2.1 Term roadmap

<figure class="fig-single">
  <img src="/articles/2026-08-18-blue-phosphorescent-oled-patents/2026-08-18-blue-phosphorescent-oled-patents-fig2.svg" alt="A chart showing six blue phosphorescence related patents as horizontal bars from priority date to expiry. The original blue phosphorescence patent starts in 2000 and expires in 2020-08, ending to the left of the present, while the hybrid, TADF and recent filing bars run past the present out to 2029 through 2039." />
  <figcaption><span class="fig-num">Figure 1</span>The terms of six patents. Only the patent claiming the principle (second row) ends to the left of the present. <span class="src">Based on Google Patents bibliographic data (priority date, Anticipated/Adjusted expiration), compiled by CLAIM</span></figcaption>
</figure>

The two originals have already expired. Only the detour, the 3rd path, and the applications newly filed in 2025 stretch to the right of the present.

### 2.2 Three numbers

<div class="stat-row">
  <div><b>20 years</b><span>the term of the blue phosphorescence principle patent (2000-08-11 → 2020-08-11)</span></div>
  <div><b>6 years</b><span>the period since expiry with no announced adoption into mass production</span></div>
  <div><b>2014</b><span>the priority date the filings Universal Display made in 2025 and 2026 hang from</span></div>
</div>

### 2.3 Lever × price matrix

<div class="tbl-wrap">

| Lever | Representative patent | How blue is produced | Price | Current status |
|---|---|---|---|---|
| Phosphorescence | US6939624B2 | uses the triplet of an iridium complex directly for emission | blue photons carry high energy, so the material degrades fast | **expired** (2020-08-11) |
| Hybrid | US9070884B2 | phosphorescent red and green only, blue left fluorescent | blue efficiency is tied to 25% | in force (2029-10-16) |
| Delayed fluorescence | US10454038B2 | lifts the triplet back to the singlet with heat and draws it out as fluorescence | color purity and lifetime are separate tasks | in force (2033-08-13) |

</div>

## 3. Qualitative analysis: 5 patents

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Princeton University · USC</span>
    <span class="num">US6303238B1 <span class="tag status-granted">expired</span></span>
  </div>
  <div class="patent-card-body">

#### Title

OLEDs doped with phosphorescent compounds

#### Bibliography

Priority 1997-12-01 · granted 2001-10-16 · expired 2017-12-01 · inventors Mark Thompson, Paul Burrows, Stephen Forrest and 3 others

#### Substance of the independent claim

<div class="quote-box"><p>An organic light emitting device producing electroluminescence in a heterostructure comprising an emissive layer containing a phosphorescent dopant compound. Platinum octaethylporphyrin (PtOEP) is given as an example of the dopant.</p></div>

#### Reading

This is the starting point of phosphorescent OLED itself. The inventor list overlaps with the team that first announced phosphorescent OLED to the academic world in 1998. This patent did not specify a color. Blue splits off as a separate problem only from the next patent. A record of "first family litigation filed" remains in the Google Patents bibliography, but as this analysis does not treat litigation it is noted as fact only.

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Universal Display · Princeton University · USC</span>
    <span class="num">US6939624B2 <span class="tag status-granted">expired</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Organometallic compounds and emission-shifting organic electrophosphorescence

#### Bibliography

Priority 2000-08-11 · filed 2001-10-16 · granted 2005-09-06 · **expired 2020-08-11** · family EP·AU·CN·JP·KR·WO·TW

The inventors are Sergey Lamansky, Mark Thompson, Vadim Adamovich, Peter Djurovich, **Chihaya Adachi**, Marc Baldo, Stephen Forrest and Raymond Kwong, 8 in all.

#### The goal the abstract states

<div class="quote-box"><p>Phosphorescent organometallic compounds giving improved electroluminescence, aimed "particularly at the blue region of the visible spectrum."</p></div>

#### The conditions the claims set

<div class="quote-box"><p>The lowest triplet excited state of the host material has a decay rate of less than about 1 per second; the lowest triplet excited state of the guest material dispersed in the host has a radiative decay rate greater than about 1×10⁵ or 1×10⁶ per second; and the lowest triplet energy level of the host is lower than the lowest triplet energy level of the guest.</p></div>

#### Reading

The design conditions that make blue phosphorescence work were already fixed numerically as of 2000. That the host must have lower triplet energy than the guest so that energy does not leak back, and that the guest must emit quickly while the host decays slowly. Both conditions still have to be observed when designing blue phosphorescent materials today.

**This patent expired on 2020-08-11.** Its status is "Expired - Lifetime." The conditions above are now in the public domain.

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Universal Display</span>
    <span class="num">US9070884B2 <span class="tag status-granted">in force</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Hybrid OLED having phosphorescent and fluorescent emitters

#### Bibliography

Priority 2005-04-13 · granted 2015-06-30 · expiry expected 2029-10-16 · status Active

#### Abstract

<div class="quote-box"><p>An organic light emitting device having combined emission from at least two emissive materials, a fluorescent blue emissive material and a phosphorescent emissive material. It provides a device structure optimizing efficiency and lifetime through a combination of fluorescent and phosphorescent emitters.</p></div>

#### Reading

The name of this patent is itself a record of the detour. Since blue cannot be made phosphorescent, leave blue fluorescent and use phosphorescence for red and green only. It was filed in 2005, 5 years after the blue phosphorescence principle patent appeared.

The drawing shows that compromise exactly.

<div class="fig-frame">
  <img src="/articles/2026-08-18-blue-phosphorescent-oled-patents/2026-08-18-blue-phosphorescent-oled-patents-fig1.png" alt="Original patent drawing, Figure 3 of US9070884B2. A device cross section stacked on an ITO substrate with Ir(Ph-ppy)3, NPD, CBP:Ir(Ph-ppy)3, CBP:Ir(pq)2(acac), ADN:BFD47, Alq3, LiF and Al in order. Only the blue emissive layer uses a fluorescent dopant." />
  <div class="fig-cap">FIG. 3 (US9070884B2): device stack cross section. From the bottom: ITO (anode) · Ir(Ph-ppy)₃ · NPD · <b>CBP:Ir(Ph-ppy)₃ (green phosphorescent)</b> · <b>CBP:Ir(pq)₂(acac) (red phosphorescent)</b> · <b>ADN:BFD47 (blue fluorescent)</b> · Alq₃ · LiF · Al (cathode). Red and green alone use iridium complexes (phosphorescent) while blue alone uses a fluorescent dopant. Original drawing.</div>
</div>

The red and green layers have iridium complexes doped into a CBP host. Phosphorescent. Only the blue layer has BFD47 in an ADN host. Fluorescent. Inside one device, blue alone emits by a different principle.

This patent is in force until 2029-10. And as will be seen later, the prototype disclosed in 2026 still uses this structure.

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Kyulux (Kyushu University spinout)</span>
    <span class="num">US10454038B2 <span class="tag status-granted">in force</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Delayed-fluorescence material and organic electroluminescence element using same

#### Bibliography

Priority 2011-07-15 · filed 2012-07-13 · granted 2019-10-22 · expiry expected 2033-08-13 · inventors Tetsuya Nakagawa, **Chihaya Adachi**

#### History of transfer

Two assignments are stamped in the Google Patents event record.

<div class="tbl-wrap">

| Date | Event |
|---|---|
| 2012-07-13 | filed |
| 2014-01-16 | assigned to Kyushu University National University Corporation |
| 2016-10-04 | assigned to Kyulux, Inc. |
| 2019-10-22 | granted |

</div>

#### Reading

This is the 3rd path. Instead of using the triplet directly for emission, thermal energy lifts it up to the singlet level and it is emitted as fluorescence. No noble metal such as iridium is needed.

What deserves attention is the inventor. Chihaya Adachi, who was on the inventor list of the 2000 blue phosphorescence principle patent (US6939624B2), solves the same problem again 11 years later by a different principle. In between he had left Princeton for Kyushu University, and the rights passed through the university to a spinout company. One person opened both branches.

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Universal Display</span>
    <span class="num">US2026/0026191A1 <span class="tag status-granted">pending</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Organic electroluminescent devices

#### Bibliography

**Priority 2014-07-24 · filed 2025-06-20 · published 2026-01-22** · inventors Nicholas Thompson, **Marc Baldo**, Michael Weaver, Vinod Menon

#### Substance

<div class="quote-box"><p>A method of improving device operation by maximizing non-radiative transfer of the excited state energy of the emissive material into surface plasmon polaritons of an enhancement layer. The enhancement layer is placed within a threshold distance.</p></div>

#### Reading

The date matters more than the content. It is an application filed in 2025-06 with a priority date of 2014-07. Term runs from the priority date, so even if this application is granted, protection ends in 2034.

The same pattern repeats. The application filed in 2025-05 (US2025/0268098A1) has a priority date of 2014-01, and the two Korean applications filed in 2025-04 have priority dates of 2017-07 and 2019-11. Recent documents keep appearing, but the clock is set 10 years back.

Marc Baldo is on the inventor list. The same person who was named on the 2000 blue phosphorescence principle patent. He is in the 26th year on the same problem.

One more thing. The Korean application published in 2025-04 (KR2025-0058728A) defines a "phosphorescent blue emitter" in its specification as **emission λmax below 470nm, or CIE coordinates X<0.2 and Y<0.2**. Where the principle patent set triplet energy conditions, the recent application draws its boundary with color coordinate figures. It is the place where the center of gravity of the claim moved from physical condition to performance specification.

  </div>
</div>

## 4. Comparative analysis

### 4.1 A threshold not crossed in a full 20 years

The patent system gives 20 years. Blue phosphorescence used all 20 and did not reach commercialization.

What blocked it has been stated by the rights holder itself. On its technology blog in 2026-06, Universal Display set out that historically a trade-off has repeated in which raising the efficiency or color purity of blue phosphorescence cuts lifetime, and securing lifetime cuts efficiency. The physical reason given is that blue photons carry high energy so the load on the material is large, and producing a deep blue requires pushing current density higher.

Here is where it divides. It was not patents blocking it. The principle was published in 2000 and even the rights were released in 2020, yet the threshold nobody crossed in more than 20 years was the lifetime of the material.

### 4.2 The detour is still in service after 20 years

The hybrid patent of 2005 looks like a stopgap. A structure to hold out until blue phosphorescence works.

Yet according to the explanation given at Universal Display's Q2 results on 2026-07-30, the tablet-sized prototypes LG Display disclosed at SID Display Week in 2025 and 2026 were **a hybrid tandem structure with blue phosphorescence put into it**.

It is not a full conversion. Even with blue phosphorescence inside, the device is still a hybrid. The structure drawn as a detour in 2005 remains the skeleton of the 2026 prototype, and that patent is in force until 2029. The detour became the main line.

### 4.3 It does not name a date

At the same results call, management was asked repeatedly about the timing of commercialization. President Steven Abramson's answer was that no specific schedule can be given at this point and that it depends on customers' commercialization roadmaps.

At the same event the company adjusted its 2026 annual revenue guidance to the **lower end** of the 630 million to 670 million dollar range. No separate revenue outlook for blue phosphorescence was given.

The fact that the patent has expired and the fact that a date cannot be pinned point the same way. The bottleneck of this technology is not rights but performance.

### 4.4 The line of defense moved

That the original was released does not make this area unclaimed ground.

<div class="tbl-wrap">

| Band | What it protects | Expiry |
|---|---|---|
| Original (2000 priority) | the triplet energy conditions under which blue phosphorescence holds | expired 2020 |
| Detour (2005 priority) | the hybrid device structure leaving blue fluorescent | 2029 |
| 3rd path (2011 priority) | delayed fluorescence material and device | 2033 |
| Improvement (2014 to 2019 priority) | specific compound compositions, host combinations, light extraction structures | 2034 to 2039 |

</div>

Anyone can use the principle. The **specific compounds and combinations** that actually give usable lifetime are covered by improvement patents with priority dates after 2014. That is why reading the expiry of the original patent as a signal to enter is a mistake. The door opened, but the passage was cut somewhere else.

## 5. Counter-evidence and limits

- **Expiry is not the same as freedom.** What expired is the scope claimed by US6939624B2, and subsequent granted patents and pending applications remain in the same technical area. This analysis does not judge freedom to operate.
- **CLAIM does not judge infringement or invalidity.** The expiry dates and statuses above are a transfer of Google Patents bibliographic data, not a judgment of legal validity.
- **Expiry dates are bibliographic values.** "Anticipated/Adjusted expiration" is an estimate reflecting term adjustment and may not reflect early lapse from unpaid fees. The register was not obtained.
- **Expiry for pending applications is a calculated value.** The dotted bars in Figure 1 are the priority date plus 20 years, which may change with term adjustment on grant.
- **The scope of material patents is not fully read this way.** Compound claims list substituents broadly in Markush form, so the actual coverage is hard to gauge from claim language alone.
- **The sample is 8 patents.** In-house material patents from panel makers and patents from material companies such as Idemitsu Kosan and Merck were not put in this scope. That is a task for a later piece.
- **Mass production is judged by announcement.** "No adoption into mass production has been announced" is a statement based on published results calls and materials, not a statement excluding undisclosed production.

## 6. Conclusions and implications

Three things remain.

**First, read the expiry of the original patent as an opportunity, but check the passage again.** The principle conditions of blue phosphorescence have been in the public domain since 2020. But the compound compositions that actually give lifetime are covered by patents with priority dates after 2014, and that protection runs to 2034 through 2039. Anyone reviewing material sourcing should look at that band, not the expired original.

**Second, hybrid has hardened from a transitional stage into a design standard.** The structure of the 2005 detour patent is in the 2026 prototype as it stands, and the right is alive until 2029. A plan that assumes blue phosphorescence arrives as a "full conversion" may not match the actual device structure.

**Third, this is a case where timing cannot be predicted from patents.** CLAIM reads roadmaps from granted patents, but what the patents told us here was not a schedule but the absence of one. There are technologies that do not work even after 20 years, and at that point a patent tells you not when it will work but what is blocking it. The bottleneck of blue phosphorescence is not rights but lifetime.

Rights on the delayed fluorescence branch remain until 2033. Whether blue goes phosphorescent or delayed fluorescent, or holds out longer as hybrid, is something no patent answers yet.

## 7. Appendix: full patent specification table

<div class="tbl-wrap">

| Number | Assignee (verified) | Priority | Granted | Expiry | Status | Family |
|---|---|---|---|---|---|---|
| US6303238B1 | Princeton University · USC | 1997-12-01 | 2001-10-16 | 2017-12-01 | expired | US |
| US6939624B2 | Universal Display · Princeton University · USC | 2000-08-11 | 2005-09-06 | 2020-08-11 | expired | US |
| TW593625B | Princeton University · USC · Universal Display | 2000-08-11 | 2004-06-21 | unknown | expired | EP·AU·CN·JP·KR·WO·TW |
| US9070884B2 | Universal Display | 2005-04-13 | 2015-06-30 | 2029-10-16 | in force | WO·US·TW |
| US10454038B2 | Kyulux (transferred from Kyushu University) | 2011-07-15 | 2019-10-22 | 2033-08-13 | in force | CN·EP·KR·WO·JP·US·TW |
| US2025/0268098A1 | Universal Display | 2014-01-08 | not granted | ~2034 | pending | US·CN·KR |
| US2026/0026191A1 | Universal Display | 2014-07-24 | not granted | ~2034 | pending | WO·EP·US·CN·JP·KR |
| KR2025-0058728A | Universal Display | 2019-11-14 | not granted | ~2039 | pending | EP·CN·JP·KR |

</div>

The assignee column is a value confirmed for every patent by opening the Google Patents *Application filed by* or *Current Assignee* field directly.
