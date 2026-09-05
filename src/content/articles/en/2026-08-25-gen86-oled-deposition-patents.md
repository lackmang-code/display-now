---
title: "Nine granted patents on Gen 8.6 OLED deposition and masks"
searchTitle: "Analysis of nine Gen 8.6 OLED deposition equipment and fine metal mask patents"
summary: "Gen 8.6 glass is 2.2 times wider than Gen 6. And yet an LG Display granted patent binds Gen 6 full glass and Gen 8.6 half glass into a single sentence. Work it out with plate theory and the sag of the two sizes is almost identical. Using nine granted patents from eight equipment and mask makers, we confirmed the real bottleneck in this generation change, and included a simulator for calculating for yourself why the mask has to be made in pieces."
section: patent
reporter: CLAIM
publishedAt: 2026-08-25
collectWeekStart: '2026-08-17'
readingMinutes: 30
lang: en
translationOf: 2026-08-25-gen86-oled-deposition-patents
tags: [8.6세대, 증착장비, 파인메탈마스크, 정전척, 캐논토키, 선익시스템, 야스, 알박, 파인원, IT OLED]
sources:
  - type: patent
    title: "대면적 디스플레이 제조를 위한 수평 고정형 유기 증착 장비용 기판 처리 장치 (KR102651394B1, 엘지디스플레이·이에스티, 2022-10-19 출원 / 2024-03-29 등록)"
    url: "https://patents.google.com/patent/KR102651394B1/en"
  - type: patent
    title: "정전척 시스템, 성막 장치, 흡착체 분리 방법 (KR102085447B1, 캐논토키, 2018-09-21 출원 / 2020-03-05 등록)"
    url: "https://patents.google.com/patent/KR102085447B1/en"
  - type: patent
    title: "쉐도우 효과 방지를 위한 선형증발원용 차단판 (KR101699168B1, 야스, 2015-07-22 출원 / 2017-01-31 등록)"
    url: "https://patents.google.com/patent/KR101699168B1/en"
  - type: patent
    title: "증착 소스의 위치 조절이 가능한 증착 장치 (KR102355870B1, 선익시스템, 2020-07-30 출원 / 2022-02-07 등록)"
    url: "https://patents.google.com/patent/KR102355870B1/en"
  - type: patent
    title: "마스크의 인장력 제어 방법 및 마스크 제조 방법 (KR102854300B1, 오럼머티리얼, 2022-05-16 출원 / 2025-09-05 등록)"
    url: "https://patents.google.com/patent/KR102854300B1/en"
  - type: patent
    title: "분할 접합법과 샵 마스크를 이용한 8세대급 OLED 메탈 마스크의 제조방법 (KR102595560B1, 템스코, 2023-01-30 출원 / 2023-10-31 등록)"
    url: "https://patents.google.com/patent/KR102595560B1/en"
  - type: patent
    title: "워크 유지 장치, 얼라인먼트 장치 및 성막 장치 (JP7462696B2, 캐논토키, 2022-04-25 출원 / 2024-04-05 등록)"
    url: "https://patents.google.com/patent/JP7462696B2/en"
  - type: patent
    title: "진공증착장치용 증착원 및 이 증착원을 구비하는 진공증착장치 (JP7675116B2, 알박, 2023-01-27 출원 / 2025-05-12 등록)"
    url: "https://patents.google.com/patent/JP7675116B2/en"
  - type: patent
    title: "박막 증착 장치 및 그 방법 (KR102845249B1, 파인원, 2025-04-17 출원 / 2025-08-12 등록)"
    url: "https://patents.google.com/patent/KR102845249B1/en"
featured: false
paywallAfter: 0
---

One sheet of Gen 8.6 glass is 2290mm x 2620mm. Six square metres in area, enough to hold two sheets of Gen 6 (1500mm x 1850mm) with room to spare. This glass is hung upside down inside a vacuum chamber, a thin metal mask is attached beneath it, and organic material is sprayed up to draw the pixels.

There is a patent LG Display filed in 2022 and had granted in 2024. Its specification states the problem to be solved like this.

<div class="quote-box"><p>To provide a substrate handling apparatus for horizontal fixed-type organic deposition equipment for large-area display manufacturing, capable of chucking a large-area substrate (for example, a Gen 6 full glass substrate through to a Gen 8.6 half glass substrate) sufficiently by electrostatic force without warping.</p><cite>KR102651394B1 specification</cite></div>

Gen 6 full and Gen 8.6 half are bound into a single range within one sentence. In area the two sizes are 2.77 and 3.00 square metres, almost the same. Cut Gen 8.6 glass in half and handling it returns to the Gen 6 level.

This article starts from that sentence. Reading nine granted patents from eight companies, it confirms what actually breaks when the glass grows, and who is holding which position.

## 1. Overview

### 1.1 Background and purpose

The reference glass for the IT OLED transition is moving from Gen 6 to Gen 8.6. When area becomes 2.16 times, the number of panels cut from one sheet rises and cost falls. That much is arithmetic.

The problem lies on the side of handling that glass in vacuum. The deposition tool pushes the glass up from below onto an electrostatic chuck, pulls a mask up against it with magnets, then sprays organic material from underneath. Both glass and mask sag under their own weight. Sagging opens a gap between mask and glass, and a gap lets vapour leak sideways, blurring the pixel edge.

The purpose here is confirmation, not prediction. Which company will deliver Gen 8.6 equipment and when is not covered in this article. It reads only what the granted claims hold.

### 1.2 Scope

Nine cases. Eight applicants: YAS, Canon Tokki (two), Sunic System, ULVAC, Aurum Material, LG Display with EST (joint), Temsco, FineOne. Five equipment makers, two mask-related, one panel maker.

Korean and Japanese grants are included together. Most of Canon Tokki's and ULVAC's Korean grants cluster in 2019 and 2020, and the recent ones remain in Japan. Without reading the Japanese grants, the landscape would be drawn with those two companies' positions left blank.

LG Display, a panel maker, is in the sample because this case is not a panel patent but a patent on the substrate handling apparatus of a deposition tool. It is an instance of the buyer of equipment claiming an equipment component directly, which makes it impossible to leave out of this landscape.

Patterning methods that do not use a mask are excluded from this scope. What the Gen 8.6 IT lines now going up use is deposition through a mask, and this article covers the equipment of those lines. The maskless side aims at a different point and is treated in a separate piece.

Order books, market share and delivery schedules are not covered. This magazine does no reporting and takes only published patents and disclosures as grounds. So it does not write "company X dominates" either. What a patent tells you is not ownership but aim.

### 1.3 Data source and search strings

<div class="tbl-wrap">

| Item | Content |
|---|---|
| Data source | Google Patents (patents.google.com), single source. Paid registers such as KIPRIS were not obtained |
| Search strings used | applicant designation + `status=GRANT` + `country=KR` combinations, technical phrases `"mask tension"` · `"evaporation source"` · `"sagging"` + `"organic light emitting"` |
| Search strings discarded | `"2290mm"` alone: returned 173 results, but the top ones were steel rolling and wind turbines. Google Patents' numeric search does not hold a phrase precisely. `"8.6 generation"` was discarded for the same reason (534 results, mixed with solar collectors and fuel cells) |
| Method used instead | Candidate patent texts were downloaded directly and strings such as `8.6`, `2290` and `Grade 2` confirmed in the original. Only what was found in the specification body, not in search results, is cited |
| Japanese applicant re-search | Japanese companies are poorly caught by Korean and English spellings. Only after re-searching `キヤノントッキ株式会社` and `株式会社アルバック` did the recent grants appear. `撓み` (sagging) and `大型基板` were then applied to narrow to large-area cases |
| Vertical-type search | Chinese-character searches such as `縦型` and `立式蒸镀` returned only noise (8,054 and 13,038 results respectively, with semiconductors and architecture at the top). Only after switching to the English phrase `"substrate is held vertically"` did relevant grants appear |
| Citation check | The cited and citing lists of all nine were downloaded and cross-checked for pairs citing each other within the sample |
| Applicant verification | All nine had their applicant field on the Google Patents bibliographic record opened individually. The LG Display case was confirmed at this stage to be a joint filing with EST |
| Limits | A 6-case sample, not an exhaustive survey. Counts were not used as an indicator (tallies swing widely with variations in applicant name spelling) |

</div>

### 1.4 Technical classification

The six cases were split by "what they change (the lever)" and "what they are trying to protect (the aim)." There are three levers: the side that **holds** substrate and mask, the side that **sprays** the organic material, and the side that **fixes** the mask itself. There are three aims as well: sag and flatness, thickness uniformity, and pattern precision.

The holding side splits again into three: the route of making the plate thicker to resist, the route of moving the support points to reduce bending, and the route of pre-bending the plate against the direction it will sag. Three companies each hold one.

## 2. Quantitative sketch

### 2.1 How many times does sag grow as the glass grows?

We first calculated why the sentence in the introduction holds. The maximum sag of a rectangular plate under uniformly distributed self-weight is proportional to the fourth power of the short side length, with a coefficient depending on the aspect ratio. The three sizes were placed at the same glass thickness and only relative values compared.

<div class="viz-box">
  <div class="viz-title">RELATIVE SAG BY GLASS SIZE (CALCULATED)</div>
<svg viewBox="0 0 650 236" width="650" xmlns="http://www.w3.org/2000/svg">
<line x1="236" y1="34" x2="236" y2="212" stroke="#c9c9c4" stroke-width="1"/>
<text x="236" y="24" font-size="12.5" fill="#8a8a80" text-anchor="start" class="mono">Gen 6 full glass = 1.0</text>
<text x="224" y="63" font-size="14.5" font-weight="700" fill="#12120e" text-anchor="end">Gen 6 full glass</text>
<text x="224" y="80" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">1500 x 1850 mm (2.77 m2)</text>
<rect x="236" y="44" width="72.8" height="34" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="317.8" y="67" font-size="15" font-weight="700" fill="#12120e" text-anchor="start" class="mono">1.00x</text>
<text x="224" y="121" font-size="14.5" font-weight="700" fill="#12120e" text-anchor="end">Gen 8.6 half glass</text>
<text x="224" y="138" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">1310 x 2290 mm (3.00 m2)</text>
<rect x="236" y="102" width="65.2" height="34" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="310.2" y="125" font-size="15" font-weight="700" fill="#12120e" text-anchor="start" class="mono">0.90x</text>
<text x="224" y="179" font-size="14.5" font-weight="700" fill="#12120e" text-anchor="end">Gen 8.6 full glass</text>
<text x="224" y="196" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">2290 x 2620 mm (6.00 m2)</text>
<rect x="236" y="160" width="350.0" height="34" fill="oklch(0.45 0.10 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="574.0" y="183" font-size="15" font-weight="700" fill="#fdfdfc" text-anchor="end" class="mono">4.81x</text>
<text x="236" y="230" font-size="12" fill="#8a8a80" class="mono">uniform self-weight, simply supported on four sides, same glass thickness</text>
</svg>
</div>

Handle a Gen 8.6 mother sheet whole and the sag becomes about 4.8 times that of Gen 6. Cut it in half to 2290mm x 1310mm, though, and it is 0.90 times, smaller than Gen 6. The area is 8 percent larger yet the sag falls, because the short side went from 1500mm to 1310mm. What sets the sag is not the area but the short side.

That the LG Display specification binds Gen 6 full and Gen 8.6 half into one range agrees with this calculation. Mechanically the two sizes are the same class.

This value is a rough estimate assuming simple support on four sides and uniformly distributed self-weight. Real equipment chucks the entire face of the glass electrostatically, so the support condition is altogether different and the absolute sag differs from this calculation too. It is for a sense of the ratio only.

### 2.2 Where the nine cases sit

<div class="viz-box">
  <div class="viz-title">FILING TO GRANT</div>
<svg viewBox="0 0 650 430" width="650" xmlns="http://www.w3.org/2000/svg">
<line x1="186" y1="52" x2="636" y2="52" stroke="#c9c9c4" stroke-width="1"/>
<line x1="186.0" y1="48" x2="186.0" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<text x="186.0" y="38" font-size="12.5" fill="#8a8a80" text-anchor="middle" class="mono">2015</text>
<line x1="226.9" y1="48" x2="226.9" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<line x1="267.8" y1="48" x2="267.8" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<text x="267.8" y="38" font-size="12.5" fill="#8a8a80" text-anchor="middle" class="mono">2017</text>
<line x1="308.7" y1="48" x2="308.7" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<line x1="349.6" y1="48" x2="349.6" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<text x="349.6" y="38" font-size="12.5" fill="#8a8a80" text-anchor="middle" class="mono">2019</text>
<line x1="390.5" y1="48" x2="390.5" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<line x1="431.5" y1="48" x2="431.5" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<text x="431.5" y="38" font-size="12.5" fill="#8a8a80" text-anchor="middle" class="mono">2021</text>
<line x1="472.4" y1="48" x2="472.4" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<line x1="513.3" y1="48" x2="513.3" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<text x="513.3" y="38" font-size="12.5" fill="#8a8a80" text-anchor="middle" class="mono">2023</text>
<line x1="554.2" y1="48" x2="554.2" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<line x1="595.1" y1="48" x2="595.1" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<text x="595.1" y="38" font-size="12.5" fill="#8a8a80" text-anchor="middle" class="mono">2025</text>
<line x1="636.0" y1="48" x2="636.0" y2="56" stroke="#c9c9c4" stroke-width="1"/>
<text x="176" y="85" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">YAS</text>
<text x="176" y="100" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">KR101699168B1</text>
<rect x="208.5" y="76" width="62.6" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="208.5" cy="85" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="176" y="123" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">Canon Tokki</text>
<text x="176" y="138" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">KR102085447B1</text>
<rect x="338.2" y="114" width="59.7" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="338.2" cy="123" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="176" y="161" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">Sunic System</text>
<text x="176" y="176" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">KR102355870B1</text>
<rect x="414.3" y="152" width="62.2" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="414.3" cy="161" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="176" y="199" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">Canon Tokki</text>
<text x="176" y="214" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">JP7462696B2</text>
<rect x="485.0" y="190" width="79.8" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="485.0" cy="199" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="176" y="237" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">Aurum Material</text>
<text x="176" y="252" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">KR102854300B1</text>
<rect x="487.5" y="228" width="135.4" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="487.5" cy="237" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="176" y="275" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">LG Display · EST</text>
<text x="176" y="290" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">KR102651394B1</text>
<rect x="505.1" y="266" width="58.9" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="505.1" cy="275" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="176" y="313" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">ULVAC</text>
<text x="176" y="328" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">JP7675116B2</text>
<rect x="516.1" y="304" width="93.7" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="516.1" cy="313" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="176" y="351" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">Temsco</text>
<text x="176" y="366" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">KR102595560B1</text>
<rect x="516.5" y="342" width="30.7" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="516.5" cy="351" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="176" y="389" font-size="13.5" font-weight="700" fill="#12120e" text-anchor="end">FineOne</text>
<text x="176" y="404" font-size="12" fill="#6f6f66" text-anchor="end" class="mono">KR102845249B1</text>
<rect x="607.0" y="380" width="13.1" height="18" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="607.0" cy="389" r="4.5" fill="oklch(0.45 0.10 150)"/>
<text x="186" y="420" font-size="12" fill="#8a8a80" class="mono">bar left edge = filing date, right edge = grant date</text>
</svg>
</div>

Leave out the YAS case from 2015 and the other eight cluster after 2018, and **five of them arrived within the nine months between April 2022 and January 2023.** Canon Tokki, Aurum Material, LG Display, ULVAC, Temsco. Five different companies filed at almost the same time, each from its own position. We do not read this as a simultaneous response to one event, however. The sample is nine cases, and each company's overall filing flow was not examined.

The latest, the FineOne case, was filed in April 2025 and granted four months later. It is the shortest gap between filing and grant in this sample.

### 2.3 Lever x aim matrix

<div class="viz-box">
  <div class="viz-title">WHAT THEY CHANGE x WHAT THEY PROTECT</div>
<svg viewBox="0 0 650 480" width="650" xmlns="http://www.w3.org/2000/svg">
<rect x="104" y="4" width="175" height="32" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="191.5" y="27" font-size="13.5" font-weight="700" fill="#2a2a24" text-anchor="middle">Sag and flatness</text>
<rect x="283" y="4" width="175" height="32" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="370.5" y="27" font-size="13.5" font-weight="700" fill="#2a2a24" text-anchor="middle">Thickness uniformity</text>
<rect x="462" y="4" width="175" height="32" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="549.5" y="27" font-size="13.5" font-weight="700" fill="#2a2a24" text-anchor="middle">Pattern precision</text>
<rect x="4" y="44" width="96" height="154" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="52.0" y="123.0" font-size="13.5" font-weight="700" fill="#2a2a24" text-anchor="middle">HOLD</text>
<rect x="104" y="44" width="175" height="154" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="112" y="56" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="119" y="70" font-size="12.5" font-weight="700" fill="#12120e">LG Display · EST</text>
<text x="119" y="85" font-size="11.5" fill="#4d4d45" class="mono">Ti plate 7-12mm</text>
<rect x="112" y="100" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="119" y="114" font-size="12.5" font-weight="700" fill="#12120e">Canon Tokki</text>
<text x="119" y="129" font-size="11.5" fill="#4d4d45" class="mono">move the support point</text>
<rect x="112" y="144" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="119" y="158" font-size="12.5" font-weight="700" fill="#12120e">FineOne</text>
<text x="119" y="173" font-size="11.5" fill="#4d4d45" class="mono">pre-bend the other way</text>
<rect x="283" y="44" width="175" height="154" fill="#f7f6f2" stroke="#dcdcd6"/>
<text x="370.5" y="123.0" font-size="12" fill="#b5b5ae" text-anchor="middle" class="mono">no sample</text>
<rect x="462" y="44" width="175" height="154" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="470" y="56" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="477" y="70" font-size="12.5" font-weight="700" fill="#12120e">Canon Tokki</text>
<text x="477" y="85" font-size="11.5" fill="#4d4d45" class="mono">release order control</text>
<rect x="4" y="202" width="96" height="154" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="52.0" y="281.0" font-size="13.5" font-weight="700" fill="#2a2a24" text-anchor="middle">SPRAY</text>
<rect x="104" y="202" width="175" height="154" fill="#f7f6f2" stroke="#dcdcd6"/>
<text x="191.5" y="281.0" font-size="12" fill="#b5b5ae" text-anchor="middle" class="mono">no sample</text>
<rect x="283" y="202" width="175" height="154" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="291" y="214" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="298" y="228" font-size="12.5" font-weight="700" fill="#12120e">YAS</text>
<text x="298" y="243" font-size="11.5" fill="#4d4d45" class="mono">varied shield height</text>
<rect x="291" y="258" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="298" y="272" font-size="12.5" font-weight="700" fill="#12120e">Sunic System</text>
<text x="298" y="287" font-size="11.5" fill="#4d4d45" class="mono">3-axis source motion</text>
<rect x="291" y="302" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="298" y="316" font-size="12.5" font-weight="700" fill="#12120e">ULVAC</text>
<text x="298" y="331" font-size="11.5" fill="#4d4d45" class="mono">lattice partitions</text>
<rect x="462" y="202" width="175" height="154" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="470" y="214" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="477" y="228" font-size="12.5" font-weight="700" fill="#12120e">YAS</text>
<text x="477" y="243" font-size="11.5" fill="#4d4d45" class="mono">shadow beam blocking</text>
<rect x="4" y="360" width="96" height="110" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="52.0" y="417.0" font-size="13.5" font-weight="700" fill="#2a2a24" text-anchor="middle">FIX</text>
<rect x="104" y="360" width="175" height="110" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="112" y="372" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="119" y="386" font-size="12.5" font-weight="700" fill="#12120e">Aurum Material</text>
<text x="119" y="401" font-size="11.5" fill="#4d4d45" class="mono">cancel residual stress</text>
<rect x="112" y="416" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="119" y="430" font-size="12.5" font-weight="700" fill="#12120e">Temsco</text>
<text x="119" y="445" font-size="11.5" fill="#4d4d45" class="mono">split, then 4-way tension</text>
<rect x="283" y="360" width="175" height="110" fill="#f7f6f2" stroke="#dcdcd6"/>
<text x="370.5" y="417.0" font-size="12" fill="#b5b5ae" text-anchor="middle" class="mono">no sample</text>
<rect x="462" y="360" width="175" height="110" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="470" y="372" width="159" height="36" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="477" y="386" font-size="12.5" font-weight="700" fill="#12120e">Temsco</text>
<text x="477" y="401" font-size="11.5" fill="#4d4d45" class="mono">multi-clamp adjustment</text>
</svg>
</div>

Three cells are empty. An empty cell does not mean that company does not work on that problem; it means it is not in this sample.

Two positions stand out. One is that **three companies sit together in the "hold x sag" cell**. Three different answers to the same problem. The other is the "pattern precision" column. Canon Tokki aims at the same goal by holding, YAS by spraying, Temsco through the mask itself.

## 3. Qualitative analysis: nine patents

Arranged by filing date. The gist of the claims, the problem the specification states for itself, and the numeric limitations are carried over as they stand.

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">YAS</span>
    <span class="num">KR101699168B1 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Shield plate for a linear evaporation source to prevent the shadow effect

#### Gist of independent claim 1

<div class="quote-box"><p>A shield plate placed across the width at the centre of a linear evaporation source, blocking that part of the evaporated material beam which can cause the shadow effect. To prevent the formation of a singularity in film thickness caused by the shield plate, the height of the shield plate is not held constant along the width direction but is formed to fall, rise, or repeatedly vary in height.</p></div>

#### The problem this patent addresses

A mask has thickness. Vapour arriving vertically prints the hole shape as it is, but vapour arriving obliquely is blocked by the hole wall and the pixel edge blurs. That is the shadow. A linear evaporation source emits material radially, so an oblique component necessarily arises.

This patent's answer is to physically block that component. But blocking it makes the film thickness dip sharply right beneath the block. So the shield plate's height is not held constant across the width but made to rise and fall, scattering the dip rather than concentrating it at one point. It is a structure that gains one thing, loses another, then recovers the loss through shape.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">shield position</span><span class="v">gap of 50-100mm from the top of the linear source</span></div><div class="num-cell"><span class="k">blocking direction</span><span class="v">blocks travel in both x and y</span></div><div class="num-cell"><span class="k">shield length</span><span class="v">longer than the source width it crosses</span></div><div class="num-cell"><span class="k">claims</span><span class="v">4</span></div></div>

<div class="fig-frame">
  <img src="/articles/2026-08-25-gen86-oled-deposition-patents/fig2-yas-shield.webp" alt="A shield plate standing over a linear evaporation source and the resulting film thickness singularity graph" />
  <div class="fig-cap">FIG. 1 (KR101699168B1): the shield plate (200) crossing the width of the linear evaporation source (100), and beneath it a graph showing the singularity where film thickness dips at the shield position. Original figure.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Canon Tokki</span>
    <span class="num">KR102085447B1 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Electrostatic chuck system, film forming apparatus, method of separating an adsorbed body

#### Gist of independent claim 1

<div class="quote-box"><p>Comprising an electrostatic chuck including a plurality of electrode sections, a voltage applying section and a voltage control section. The control section applies voltage so that a first adsorbed body and a second adsorbed body attracted through it come away from the chuck together while still in contact, applying it in the same order in which the attracting voltage was applied to each electrode section.</p></div>

Dependent claims reveal the identity of the two adsorbed bodies. The first is a substrate of insulating material, the second a mask of metallic material. Another dependent claim limits the electrode section to which the attracting voltage was applied first to carry a voltage of greater absolute value.

#### The problem this patent addresses

An electrostatic chuck is not a device for attaching but for attaching and then releasing. At large area the hard part is the release. With the mask held magnetically beneath the glass, switching all electrodes off at once tears a wide plate away starting at one point, and it shakes; in that moment glass and mask go out of alignment.

What the claim demands is order. If the voltage was applied first, second, third when attaching, it is applied in the same order when releasing. It is an approach that splits a wide plate along the time axis rather than handling it whole.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">electrode sections</span><span class="v">plural (count not limited)</span></div><div class="num-cell"><span class="k">first adsorbed body</span><span class="v">insulating substrate</span></div><div class="num-cell"><span class="k">second adsorbed body</span><span class="v">metallic mask</span></div><div class="num-cell"><span class="k">claims</span><span class="v">19</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">This case has almost no dimensional limitation in its claims, because what it claims is control order rather than size. It does not name a particular generation of glass, so we do not read it as a Gen 8.6-specific patent.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Sunic System</span>
    <span class="num">KR102355870B1 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Deposition apparatus with adjustable deposition source position

#### Gist of independent claim 1

<div class="quote-box"><p>A deposition source is placed at the lower side of a vacuum chamber, and a first moving section moves it in a first direction, a second moving section in a second direction perpendicular to that, and a third moving section in a third direction perpendicular to both. The third moving section includes a lifting support and a lifting section, and a portion extending below the source carries a first flange, a second flange and a spring between them.</p></div>

#### The problem this patent addresses

That the claim places the deposition source at the lower side of the chamber tells us the tool hangs the substrate above. As the glass grows, the distance between source and substrate and the source's lateral position directly govern the thickness distribution. This patent grips that distribution by moving only the source in three directions, without rebuilding the chamber.

The structure with a spring between flanges stands out. The specification does not separately emphasize the purpose of this part, but it is an arrangement inserting an elastic element between the hot section and the drive section. Beyond that could not be confirmed in the specification, so no interpretation is attached.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">degrees of freedom</span><span class="v">3 mutually perpendicular directions</span></div><div class="num-cell"><span class="k">source position</span><span class="v">lower side of the vacuum chamber</span></div><div class="num-cell"><span class="k">elastic element</span><span class="v">spring between first and second flange</span></div><div class="num-cell"><span class="k">claims</span><span class="v">6</span></div></div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Canon Tokki</span>
    <span class="num">JP7462696B2 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Work holding device, alignment device and film forming device

#### Gist of independent claim 1

<div class="quote-box"><p>Comprising a first support unit supporting the work and a second support unit suspending that first support unit. The first unit has a first base member extending in one direction, a second base member extending parallel to and apart from it, a plurality of support portions arranged along that direction on each base to bear the periphery of the work, and a connecting member joining the two bases. The second unit has support shafts suspending each base. The connecting member joins the base at a position closer to the support shaft than the support portion located at the end.</p></div>

#### The problem the specification states

<div class="quote-box"><p>As the work grows larger, the load burden on the supporting structure may need to be considered. For instance, enlarging the area of organic EL displays and improving production efficiency calls for film formation using large-size substrates. Generally, thin plates of glass or resin are often used as the substrate in organic EL display manufacture, and as substrate size grows, the sag when the substrate is held horizontally grows too.</p><cite>JP7462696B2 specification</cite></div>

#### The problem this patent addresses

Where the earlier LG Display case resisted by making the plate thicker, this one solves it by **where to suspend and where to join**. Suspend a long base member at two points and the parts outside those points sag while the inside lifts. The limitation to pull the connecting member toward the support shaft, inside the end support portion, aims at that balance.

Neither the material nor the thickness changes. Only the geometry. It is a second answer to the same problem.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">dimensional limits</span><span class="v">none (relative position only)</span></div><div class="num-cell"><span class="k">support method</span><span class="v">suspension (second unit hangs the first)</span></div><div class="num-cell"><span class="k">support location</span><span class="v">periphery of the work</span></div><div class="num-cell"><span class="k">claims</span><span class="v">8</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">The specification states that the carrier body has higher rigidity than the substrate and so "holds the substrate while suppressing the substrate's own sag." The demand that the holder be stiffer than the held becomes an equipment design condition as such at large area.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Aurum Material</span>
    <span class="num">KR102854300B1 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Method of controlling mask tension

#### Gist of independent claim 1

<div class="quote-box"><p>In making a frame-integrated mask with a frame and a plurality of masks joined, (a) the through-thickness internal stress distribution of the mask metal film produced by rolling is determined, (b) the thickness of at least one face is reduced according to that distribution, and then (c) the mask pattern is formed. The metal film includes compressive stress regions at the upper and lower parts through the thickness and a tensile stress region in the middle.</p></div>

#### The problem this patent addresses

A fine metal mask is made by rolling Invar alloy. Rolling presses and stretches from above and below, leaving stress inside the metal film in layers. The distribution this patent identifies is compression at top and bottom, tension in the middle.

The trouble is when that distribution is not perfectly symmetric top to bottom. If it is not, the plate bends of its own accord. The larger the mask, the more this asymmetry shows as sag. This patent's answer is not to pull harder, but to cut one face before patterning so the stress distribution is matched in advance. Rather than stretching it flat, it erases the cause inside the material.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">stress distribution</span><span class="v">compression top and bottom, tension in the middle</span></div><div class="num-cell"><span class="k">adjustment method</span><span class="v">thickness reduction of at least one face</span></div><div class="num-cell"><span class="k">pattern formation</span><span class="v">while attached to a template by a temporary bond</span></div><div class="num-cell"><span class="k">claims</span><span class="v">12</span></div></div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">LG Display · EST</span>
    <span class="num">KR102651394B1 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Substrate handling apparatus for horizontal fixed-type organic deposition equipment for large-area display manufacturing

#### Gist of independent claim 1

<div class="quote-box"><p>Comprising a titanium cooling plate with flat upper and lower faces; an electrostatic chuck formed of a first dielectric layer, an electrode layer and a second dielectric layer coated on that lower face, chucking by electrostatic force the glass substrate rising from below; and a yoke plate positioned on the upper face chucking by magnetic force the mask rising from below. Inside the cooling plate a cooling path is formed of two channels of differing width. The deviation in thermal expansion coefficient between the titanium cooling plate and the first dielectric layer is 1.5 percent, the plate thickness is 7mm to 12mm, and the electrostatic chuck thickness is 20 to 1000 micrometres.</p></div>

#### The problem the specification states

<div class="quote-box"><p>To provide a (omitted) substrate handling apparatus capable of chucking a large-area substrate (for example, a Gen 6 full glass substrate through to a Gen 8.6 half glass substrate) sufficiently by electrostatic force without warping.</p></div>

The specification gives the target glass size as "Gen 6 full size (6GF) through to Gen 8.6 half size (8.6GH), approximately 1850mm x 1500mm to 2290mm x 1310mm," adding that the mask may be of Invar.

#### The problem this patent addresses

Sag does not end with the glass. The plate holding the glass sags too. The specification explains the titanium plate's thickness of 7 to 12mm as the thickness at which the mask chucks to Gen 8.6 half glass while the plate itself does not bend under its own weight. On top of that, support members are attached along the edge and auxiliary support members added in the inner region corresponding to the dead zone of glass and mask, preventing the plate from bending.

The reason titanium was chosen is in the specification as well. Titanium's thermal expansion coefficient is 8.6, and alumina, the dielectric layer, is 7.3. The two values have to be close so that the dielectric layer does not crack as the temperature rises. Since the glass keeps warming during deposition, the plate that holds must also be the plate that cools. Hence two or more meander-form cooling paths inside the plate.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">target glass</span><span class="v">1850x1500 to 2290x1310mm</span></div><div class="num-cell"><span class="k">cooling plate</span><span class="v">Ti Grade 2, thickness 7-12mm</span></div><div class="num-cell"><span class="k">chuck thickness</span><span class="v">20-1000um</span></div><div class="num-cell"><span class="k">first dielectric</span><span class="v">400-600um</span></div><div class="num-cell"><span class="k">thermal expansion</span><span class="v">Ti 8.6 / Al2O3 7.3</span></div><div class="num-cell"><span class="k">claims</span><span class="v">24</span></div></div>

<div class="fig-frame">
  <img src="/articles/2026-08-25-gen86-oled-deposition-patents/fig1-lgd-esc-stack.webp" alt="Cross-section with the yoke plate, titanium cooling plate, electrostatic chuck, glass substrate and mask suspended downward" />
  <div class="fig-cap">FIG. 1 (KR102651394B1): from the top, the yoke plate with embedded magnets (130, 131), the titanium cooling plate (110), the electrostatic chuck (120), the glass substrate (10), and the mask (20) held on the frame (21). The whole structure hangs facing downward. Original figure.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">ULVAC</span>
    <span class="num">JP7675116B2 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Deposition source for a vacuum deposition apparatus and a vacuum deposition apparatus provided with it

#### Gist of independent claim 1

<div class="quote-box"><p>Comprising a containing box filled with deposition material and having an emission opening in its upper face, heating means, and moving means that scans the box in one direction while swapping it between a first and a second position. Inside the box, partition members projecting above the upper surface of the deposition material facing the emission opening divide the interior into several small spaces. The partitions are formed by assembling plate material into a lattice, and the gap between partition and inner wall of the box is 15mm or less.</p></div>

#### The problem the specification states

<div class="quote-box"><p>Where the deposition material is an evaporating material that passes through a liquid phase to a gas phase, the material inside the containing box is always molten and liquid. For this reason, when the movement speed rises during swap or scan movement, the liquid surface of the deposition material facing the emission opening sloshes in waves.</p><cite>JP7675116B2 specification</cite></div>

#### The problem this patent addresses

This is where an axis other than sag first appears in this sample. The deposition source sweeps beneath the substrate. The slower the sweep, the more even the thickness distribution, but the more time it takes. The specification states that scan speed is set relatively slow when in-plane uniformity matters, and conversely that swap movement speed is better as fast as possible when productivity is considered.

**Uniformity and productivity pull the same variable in opposite directions.** Raise the speed and the molten material's surface sloshes; slosh and the height of the evaporating surface wavers. The partitions confine and suppress that sloshing within the lattice. As the glass grows, the sweep distance grows too, so this problem grows with large area.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">partition form</span><span class="v">plate material assembled into a lattice</span></div><div class="num-cell"><span class="k">partition height</span><span class="v">projecting above the material surface</span></div><div class="num-cell"><span class="k">gap to inner wall</span><span class="v">15mm or less</span></div><div class="num-cell"><span class="k">claims</span><span class="v">3</span></div></div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Temsco</span>
    <span class="num">KR102595560B1 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Method of manufacturing a Gen 8 class OLED metal mask using split bonding and a shop mask

#### Gist of independent claim 1

<div class="quote-box"><p>A Gen 8 class pattern mask is prepared split into several sheets according to a set area (S100); the joints are welded to make a full-sheet mask, with a shop mask closing the short-side joints to achieve 4-way tension together with the long sides (S200); the joints of the split pattern masks are welded (S300); a multi-clamp tensions the edges of the full-sheet mask, shop mask and key sheet individually or simultaneously to finely adjust the specification of the patterned cells (S400); and finally it is welded at the frame bonding end and the tensioning extensions are cut off (S500).</p></div>

#### The problem this patent addresses

The first step of this claim is the most direct sentence in this article. A Gen 8 class mask is not made in one piece. It is made in pieces and joined by welding.

A joined plate has different properties at each seam. So tension is not applied all at once either; a multi-clamp pulls the edges individually or simultaneously to set the position of each cell. The consequence of larger glass shows up, on the mask side, as giving up the single piece.

The wording of this patent is "Gen 8 class," however. A phrase naming Gen 8.6 could not be confirmed in this specification. Whether "Gen 8 class" includes Gen 8.6 cannot be judged from the specification alone.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">mask fabrication</span><span class="v">split, then welded</span></div><div class="num-cell"><span class="k">tension directions</span><span class="v">4-way (long and short sides)</span></div><div class="num-cell"><span class="k">tensioning means</span><span class="v">multi-clamp, individual or simultaneous</span></div><div class="num-cell"><span class="k">claims</span><span class="v">3</span></div></div>

<div class="fig-frame">
  <img src="/articles/2026-08-25-gen86-oled-deposition-patents/fig3-temsco-split-mask.webp" alt="Plan and perspective views of split mask sheets joined by weld lines and weld nuggets" />
  <div class="fig-cap">FIG. 11 (KR102595560B1): the structure joining the split pattern sheets (green) and the shop mask (purple) with weld lines and nuggets. In the section below, the sheet is visibly divided into several pieces held on the frame. Original figure.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">FineOne</span>
    <span class="num">KR102845249B1 <span class="tag status-granted">granted</span></span>
  </div>
  <div class="patent-card-body">

#### Title

Thin film deposition apparatus and method

#### Gist of independent claim 1

<div class="quote-box"><p>Comprising an electrostatic chuck having a first face and embedded electrodes; a base having a second face opposite the first face on which the chuck is formed, and internal cooling channels, and having a <b>curved shape with the first face concave and the second face convex</b>; and a magnet plate provided on the second face.</p></div>

#### The problem the specification states

<div class="quote-box"><p>As substrates grow larger, the plate of the apparatus for fixing substrate and mask grows larger too. The problem is that a large plate may sag downward under its own weight. Sag of the plate causes defects in the formation of fine RGB subpixels.</p><cite>KR102845249B1 specification</cite></div>

#### The problem this patent addresses

A third answer to the same problem. It neither makes the plate thicker nor moves the support points. **It bends the plate in advance against the direction it will sag.** A curved base with the face holding the substrate concave and the opposite face convex. The idea is that when self-weight pulls the plate down, that bend cancels out and it goes flat.

The components are almost identical to the LG Display case above. An electrostatic chuck holds the substrate, cooling channels are cut inside, and a magnet plate on the opposite face pulls the mask. From the same component set, only one thing differs: the shape.

#### Numeric limitations

<div class="num-grid"><div class="num-cell"><span class="k">base shape</span><span class="v">first face concave, second face convex</span></div><div class="num-cell"><span class="k">cooling channel</span><span class="v">U channel closed with a cover</span></div><div class="num-cell"><span class="k">mask chucking</span><span class="v">magnet plate on the second face</span></div><div class="num-cell"><span class="k">claims</span><span class="v">9</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">This case <b>carries LG Display's KR102651394B1 as a cited reference.</b> It is the only pair among the nine that actually cites the other. Discussed in Section 4.5.</div>

  </div>
</div>

## 4. Comparative analysis

### 4.1 One problem divided among three layers

Place the six cases side by side and one problem is visibly split across three layers. As the glass grows, a gap opens between mask and glass. How that gap is eliminated differs by layer.

The holding layer presses glass and mask physically together. LG Display and EST pull the mask up with magnets from above and use a plate of a thickness that will not sag. Canon Tokki claimed the moment of release rather than the holding.

The spraying layer, instead of eliminating the gap, keeps it from blurring even when it is there. YAS's shield plate does away with the oblique vapour itself. Even with a gap remaining, vapour arriving only vertically casts no shadow.

The mask layer makes the mask so it does not sag in the first place. Aurum Material erases the stress rolling left behind; Temsco gives up single-piece fabrication and joins several sheets, pulling them 4 ways.

What this arrangement says is that solving any one of the three layers alone does not solve the problem. And the spraying layer carries one more axis unrelated to sag. As the ULVAC case writes, sweep the source quickly and the molten material's surface sloshes; sweep it slowly and productivity falls. As the glass grows the sweep distance grows, so this conflict grows with it.

### 4.2 One sag, three answers

This is the sharpest contrast in the sample. To the same problem of a large plate sagging under its own weight, three companies had three different answers granted.

<div class="tbl-wrap">

| Applicant | Answer | What went into the claim |
|---|---|---|
| LG Display, EST | make it thicker | titanium cooling plate 7-12mm, support members at edge and dead zone |
| Canon Tokki | move the support point | connecting member joined closer to the support shaft than the end support portion |
| FineOne | pre-bend it the other way | curved base with first face concave and second convex |

</div>

The three answers differ in character. The first resists through material and thickness, the second changes where the force acts, and the third, rather than removing the deformation, puts it in beforehand in reverse so it cancels. This article does not judge which is better. But that all three were granted reads as meaning this problem has not closed on a single right answer.

### 4.3 Tension, splitting, and the shadow

The mask side is a different matter. A mask cannot be made thicker. Thicker means higher hole walls, which shade the oblique vapour more. So a mask is pulled flat. That is why Aurum Material deals with tension and Temsco splits the mask and pulls it 4 ways.

We built a way to calculate how the pulling force, the size of the pieces and the angle at which vapour arrives meet at the pixel edge. The variable each of the three patents touches is in as one slider.

<div class="sim-embed" data-sim="fmm-tension-sag-demo" data-params='{"spanMm":1310,"tensionMPa":20,"beamDeg":20}'>
</div>

At the default, set the support spacing to 1310mm, the short side of Gen 8.6 half glass, and the sag comes out in millimetres. That means a single-piece mask does not hold. Pull the slider toward 100mm and the sag falls to a few micrometres. Since sag is proportional to the square of the support spacing, reducing the piece to 1/13 makes the sag 1/170.

That curve is why the first step of Temsco's claim is "a Gen 8 class pattern mask is prepared split into several sheets according to a set area." Splitting the mask reads not as a lack of technology to make it large, but as the most efficient means of reducing sag.

Lower the incidence angle slider toward 0 degrees and the shadow disappears even at the same sag. That is where YAS's shield plate aims. If you cannot reduce the gap, reduce the angle. But cutting the beam to reduce the angle costs deposition efficiency and thickness uniformity, which is why that patent makes the shield height rise and fall along the width.

### 4.4 Vertical or horizontal

All nine cases in this article belong to the family that lays the substrate horizontally. The glass is hung upside down and sprayed from below. That is also why sag is the problem.

Horizontal is not the only way. The FineOne specification sets out both.

<div class="quote-box"><p>OLED deposition is divided into vertical and horizontal types. The former stands the substrate vertically and sends organic material sideways to deposit it; the latter places the substrate horizontally and vaporizes organic material beneath the substrate to deposit it. To prevent sag due to gravity and for precise colour patterning, the mask must adhere to the substrate stably, tightly and uniformly.</p><cite>KR102845249B1 specification</cite></div>

Stand the substrate up and gravity acts along the plate rather than in the direction that bends it. Much of the sag problem disappears on the spot. And yet all nine cases in this sample are horizontal.

We stop here. No granted patent claiming the vertical type was found in this search. That does not mean none exists, only that none was found, and this article does not judge whether the reason is an absence of technology or a limit of the search terms. One thing is confirmed: a statement that the two methods are distinct exists inside a granted specification.

### 4.5 The one pair actually connected

The cited and citing lists of all nine were cross-checked. Within the sample, one pair cites the other.

**FineOne's KR102845249B1 (filed April 2025) carries LG Display and EST's KR102651394B1 (filed October 2022) as a cited reference.** The two patents have almost identical components. An electrostatic chuck holds the substrate, cooling channels are cut inside, magnets on the opposite face pull the mask. What differs is one thing: the shape of the base. One made a flat plate thicker; the other bent the plate in advance.

We do not read chronological order as causation. Appearing on a citation list and having been consulted are different statements. But this pair is a case of the same problem treated with the same component set and split only by shape, and that relation remains as a public record.

The other eight do not cite one another. That appears to be because they treat the same problem from different layers, but this too is an observation within a sample of nine.

### 4.6 Patents that write Gen 8.6 into the specification, and those that do not

Of the nine, one writes Gen 8.6 in words: the LG Display case. The rest either name no generation (Canon Tokki's two, Sunic System, ULVAC, Aurum Material, YAS, FineOne) or write only "Gen 8 class" (Temsco). Canon Tokki and FineOne, though, put the same situation at the head of their specifications with the word "enlargement" instead of a generation.

Writing the generation narrows the scope of the right. Not writing it leaves the scope broad but also leaves no evidence that the generation was the aim. We do not read this difference as better or worse. One thing is certain, though. The expression "Gen 8.6 half glass" has already entered the description of a granted claim, and that size is specified as 2290mm x 1310mm.

Cut a mother sheet of 2290mm x 2620mm in half and you get exactly 2290mm x 1310mm. That this figure was written into a specification reads as meaning that at least this applicant designed equipment components on the premise of a process handling Gen 8.6 glass in halves. But this is an interpretation drawn from a figure in the specification, not a confirmation that the actual production process goes that way.

### 4.7 The plate that holds is also the plate that cools

The most unexpected thing in this sample is heat. Talk of sag would seem to leave only weight and thickness, and yet half of the LG Display claim is about cooling. Paths are cut inside the plate, a separate cover closes the paths, and titanium is chosen as the material to match thermal expansion with the dielectric layer.

The reason is simple. Evaporating organic material requires the source to be hot, and that radiant heat comes straight at the substrate. Warm the glass and it expands. Invar mask is an alloy with almost no thermal expansion, so only the glass expands. Their alignment drifts. The larger the area, the larger the absolute drift at the same expansion rate.

So the holding device becomes the cooling device. Once the two functions sit in one plate, material selection turns into a thermal expansion matching problem, and the outcome of that is the answer: titanium.

### 4.8 One figure inside the claim does not add up

LG Display's claim 1 limits "the deviation in thermal expansion coefficient between the titanium cooling plate and the first dielectric layer" to 1.5 percent. The specification gives, as grounds, the values 8.6 for titanium and 7.3 for alumina.

The difference between the two values is 1.3, which against 8.6 is about 15 percent. It does not come to 1.5 percent. Nowhere in the specification is it stated on what basis that 1.5 percent was arrived at.

CLAIM does not judge whether this is a typographical error or a different calculation basis. Judging a patent's validity is not what this magazine does. But since this figure is a limitation inside the claim it bears directly on the scope of the right, and we record as it stands that it cannot be confirmed from the specification alone.

## 5. Counter-evidence and limits

**The sample is nine cases.** This landscape is not the whole of Gen 8.6 deposition equipment patents. A good deal of each company's recent filings may not yet be published. A patent is published 18 months after filing, so filings from 2025 onward are structurally invisible.

**Empty cells in the matrix are not read as "that company does not do this."** They mean it is not in the sample.

**Closeness of filing dates is not read as causation.** Five cases cluster in the nine months between April 2022 and January 2023, but whether this is a response to the same event could not be confirmed.

**The sag ratios are calculated values.** They come from plate theory assuming simple support on four sides, uniformly distributed self-weight and identical thickness, and differ from the support conditions of real equipment. They are used only as ratio comparisons, not absolute values. This calculation is not quoted from a patent specification; this article performed it.

**The mother sheet dimensions were not confirmed directly.** What this article confirmed in a patent original is the half size of 2290mm x 1310mm in the LG Display specification. The Gen 8.6 mother sheet of 2290mm x 2620mm is a specification in common industry use, and it works out as twice the half by arithmetic, but that figure was not found directly in the specifications of this sample.

**Counts were not used as an indicator.** Grant counts by applicant were tallied during the work, but because the same company is indexed scattered across Korean, English and Japanese spellings, values swung widely with the search term. This article does not cite counts.

**Tool commentary was not carried over as is.** Google Patents machine translation was used only for first-pass comprehension, and every quoted sentence was confirmed in the Korean original. Where the specification does not state a purpose, as with the spring structure in the Sunic System case, no interpretation was attached and it was left blank.

**No granted vertical-type patent was obtained.** The FineOne specification describes vertical and horizontal separately, but all nine cases in this sample are horizontal. No grant claiming the vertical type was found in this search. Chinese-character search terms (縦型, 立式蒸镀) returned only noise, and only switching to an English phrase search caught relevant cases. Changing the terms further may turn some up.

**Only one citation relation was confirmed.** This is the result of cross-checking the cited and citing lists of all nine, and apart from the FineOne and LG Display pair, none cite one another within the sample. Appearing on a citation list was not transcribed as "consulted."

**The simulator is a model.** The calculator in Section 4.3 is a one-dimensional tensioned strip model that ignores bending stiffness and does not include the effect of the mask being pulled onto the substrate magnetically. Real equipment reduces the gap far more with magnetic chucking. It is there to show the relation between support spacing and sag, not a value representing any particular tool's performance.

**Only three figures are included.** Figures were obtained from the original PDFs for the YAS, LG Display and Temsco cases. The other six could not be obtained this time. That does not mean there are no figures, only that they could not be included in this work.

## 6. Conclusions and implications

Gen 8.6 appears in the patents not as the business of doubling the glass but as the question of how to divide the doubled glass back in half. That the LG Display specification binds Gen 6 full and Gen 8.6 half into one range, and that the range is by calculation almost the same class, is the evidence.

The structure the nine cases show is this. The burden of going large area is not carried by one company. The holding side, the spraying side and the mask-making side each take a share of the same problem in their own layer. A line will not stand with only the equipment makers ready, nor with only the mask makers ready.

Even within the holding layer the answers have not converged. Make it thicker, move the support point, or pre-bend it the other way. Three companies had three granted, and the latest of them carries the earliest as a cited reference. It reads as a stretch where no standard has yet been set.

And the quietest fact in this sample is on the mask side. Gen 8 class masks have already given up single-piece fabrication and moved to joining. Which means the time it takes to enlarge glass and the time it takes to enlarge a mask are different, and that gap sets the pace of the generation change.

The harder it becomes to make a mask large, the more that difficulty moves together onto the side that cuts the glass and the side that splits the mask. The real shape of Gen 8.6 this sample shows is a process bearing both at once.

## 7. Appendix: patent specification table

<div class="tbl-wrap">

| Number | Applicant | Filed | Granted | Claims | Status | Core |
|---|---|---|---|---|---|---|
| KR101699168B1 | YAS | 2015-07-22 | 2017-01-31 | 4 | in force | linear source shield, varied height |
| KR102085447B1 | Canon Tokki | 2018-09-21 | 2020-03-05 | 19 | in force | electrostatic chucking, release order control |
| KR102355870B1 | Sunic System | 2020-07-30 | 2022-02-07 | 6 | in force | 3-axis deposition source positioning |
| KR102854300B1 | Aurum Material | 2022-05-16 | 2025-09-05 | 12 | in force | tension control by cancelling rolling residual stress |
| KR102651394B1 | LG Display, EST | 2022-10-19 | 2024-03-29 | 24 | in force | horizontal fixed type, titanium cooled chuck |
| KR102595560B1 | Temsco | 2023-01-30 | 2023-10-31 | 3 | in force | Gen 8 class mask split bonding, 4-way tension |
| JP7462696B2 | Canon Tokki | 2022-04-25 | 2024-04-05 | 8 | in force | suspended support, connecting member position limit |
| JP7675116B2 | ULVAC | 2023-01-27 | 2025-05-12 | 3 | in force | source lattice partitions, gap 15mm or less |
| KR102845249B1 | FineOne | 2025-04-17 | 2025-08-12 | 9 | in force | curved base cancelling sag |

</div>

Korean grants are dated by Korean filing date, Japanese grants by Japanese filing date. Some may have earlier priority dates, but these were not confirmed individually in this survey. Status follows the Google Patents legal status field, and annuity payment history was not checked.
