---
title: "불소로 잡은 산화물 TFT의 이동도와 안정성"
summary: "이동도를 올리면 안정성이 무너지는 트레이드오프, IGZO TFT 채널에 이온주입 공정 하나만 더해 둘 다 잡았습니다. 이동도 12.1→38.6cm²/V·s, 문턱전압 변화 최대 1.74V. 공정 스텝을 늘리지 않고 스펙을 함께 끌어올릴 수 있다는 뜻이라 백플레인 공정 담당자가 눈여겨볼 결과입니다."
section: paper
reporter: PEER
publishedAt: 2026-07-27
readingMinutes: 8
tags: [IGZO TFT, 이온주입, 산화물 반도체, 연세대]
sources:
  - type: paper
    title: "Direct Channel Implantation of B and BF₂ Ions for Functional Control of Oxygen Vacancies in Oxide Semiconductor Thin Film Transistors"
    url: "https://doi.org/10.1002/adfm.77185"
featured: true
paywallAfter: 0
---

<div class="paper-card">
  <div><span class="label">논문</span><a href="https://doi.org/10.1002/adfm.77185" target="_blank" rel="noopener">Direct Channel Implantation of B and BF₂ Ions for Functional Control of Oxygen Vacancies in Oxide Semiconductor Thin Film Transistors</a></div>
  <div><span class="label">저자</span><span>공동 제1저자 Beom Soo Kim · Jong Bin An, 교신 Hyun Jae Kim<span class="dim">(연세대 전기전자공학부)</span></span></div>
  <div><span class="label">게재</span><span>Advanced Functional Materials, 2026 · Early View <span class="dim">(권·호 미배정)</span> · <code>DOI 10.1002/adfm.77185</code></span></div>
</div>

산화물 반도체 TFT는 오래된 딜레마를 안고 있었다. 이동도를 높이면 안정성이 떨어지고, 안정성을 잡으려면 공정이 복잡해졌다. 연세대 연구진은 채널에 이온 하나를 심는 것만으로 이 둘을 함께 잡았다. 이동도는 12.1에서 38.6cm²/V·s로 세 배 넘게 뛰었고, 같은 조건에서 문턱전압 변화는 오히려 줄었다.

## 1. 왜 어려운 문제였나

IGZO 같은 산화물 반도체 TFT는 LTPS TFT보다 이동도가 낮고, 장시간 구동·고온·광조사에 노출되면 문턱전압이 밀리는 데 특히 취약하다. 전자가 쌓이면 비정질 산화물 안에 결함이 생기고, 빛을 받으면 산소공공(V_O)이 이온화되며 전하 균형이 흐트러진다.

지금까지는 IGZO 조성을 바꾸거나, 패시베이션·차광층을 추가하거나, 회로 단으로 보상하는 식으로 대응해 왔다. 그런데 이런 접근은 대부분 공정 단계를 늘리면서 정작 성능과 신뢰성 사이의 트레이드오프를 다시 만들어냈다. 이온주입 자체는 이미 쓰이는 기술이지만, 지금까지는 소스·드레인 영역의 접촉저항을 낮추는 용도로만 쓰였을 뿐, 채널 영역 자체에 적용된 사례는 거의 없었다.

## 2. 발상의 전환: 같은 자리에, 다른 이온

연구진은 스크린 산화막(HfOx)을 통해 IGZO 채널 안에 붕소(B) 또는 불소이붕소(BF₂) 이온을 직접 심었다. 도즈는 1×10¹⁵ ions/cm²로 동일하게 두고, 이온 종류와 에너지만 바꿨다.

붕소만 심으면 산소공공과 산소 침입형 결함이 함께 늘어 이동도는 오르지만 안정성은 오히려 나빠졌다. 반면 불소이붕소를 심으면 불소 이온이 산소공공을 부동태화(passivate)해, 이동도 향상은 그대로 가져가면서 안정성까지 함께 개선됐다. 별도의 도핑층이나 패시베이션층을 추가하는 다단계 공정 없이, 단일 이온주입 공정 하나로 도핑과 결함 제어를 동시에 해낸 것이다.

<figure class="fig-single">
  <img src="/articles/2026-07-27-yonsei-igzo-tft-implantation/Fig1_공정개념도.jpg" alt="B와 BF2 이온주입 IGZO TFT 제작 공정 개념도">
  <figcaption><span class="fig-num">그림 1</span>B·BF₂ 이온주입 IGZO TFT 제작 공정 개념도. <span class="dim">출처: 논문 Fig. 1, CC BY-NC-ND 4.0</span></figcaption>
</figure>

## 3. 결과: 붕소와 불소가 갈리는 지점

<div class="stat-row">
  <div><b>38.6 cm²/V·s</b><span>이동도<span class="dim">(비주입 12.1, B 60keV)</span></span></div>
  <div><b>1.74 V</b><span>PBTS 문턱전압 변화<span class="dim">(비주입 2.46V, BF₂ 40keV)</span></span></div>
  <div><b>1.04 V</b><span>NBIS 문턱전압 변화<span class="dim">(비주입 3.12V, BF₂ 40keV)</span></span></div>
</div>

**표 1 · 이온주입 전후 성능 비교** (도즈는 전 조건 1×10¹⁵ ions/cm²로 동일)

| 조건 | 이동도 [cm²/V·s] | PBTS ΔVth [V] | NBIS ΔVth [V] |
|---|---:|---:|---:|
| 비주입(pristine) | 12.1 | 2.46 | 3.12 |
| B, 40 keV | 37.2 | 4.44 (악화) | 4.39 (악화) |
| BF₂, 40 keV | 35.8 | 1.74 (개선) | 1.04 (개선) |
| B, 60 keV | 38.6 (이동도 최고) | 7.72 | 6.22 |

*PBTS: +20V 게이트전압·60℃·10,000초 스트레스. NBIS: −20V 게이트전압·백색광(5700lux) 조사·10,000초.
붕소는 에너지를 올릴수록 이동도는 더 오르지만 안정성은 더 나빠진다. 불소이붕소는 그 반대로 간다.
자료: 논문 Table 1, Figure 3·4.*

<figure class="fig-single">
  <img src="/articles/2026-07-27-yonsei-igzo-tft-implantation/Fig7_결함보정메커니즘.jpg" alt="B와 BF2 이온주입 활성화 과정의 결함 보정 메커니즘 개념도">
  <figcaption><span class="fig-num">그림 2</span>붕소(B)와 불소이붕소(BF₂) 주입 후 어닐링 과정에서 결함이 갈리는 메커니즘. <span class="dim">출처: 논문 Fig. 7, CC BY-NC-ND 4.0</span></figcaption>
</figure>

## 4. 의미: 백플레인 공정에 새 변수 하나

IGZO TFT는 이미 현세대 고급 디스플레이 백플레인의 핵심 소재다. 이동도와 안정성을 함께 개선하면서도 공정 단계를 늘리지 않는다는 점은, 기존 이온주입 인프라(소스·드레인 도핑용)를 채널 공정까지 그대로 확장할 수 있다는 뜻이기도 하다.

다만 이번 결과는 시험소자(채널 폭·길이 100µm) 단위이고, 스트레스 시험도 10,000초(약 2.8시간) 가속시험까지만 진행됐다. 대면적 패널 공정에서의 균일성·수율 데이터는 아직 없다.

## 5. 한눈 요약

| | |
|---|---|
| **한 줄 요약** | IGZO 채널에 BF₂ 이온을 직접 주입해 이동도(12.1→38.6cm²/V·s)와 안정성(ΔVth 최대 1.74V)을 동시에 개선 |
| **핵심 성과** | 이동도 38.6cm²/V·s(B 60keV) · PBTS ΔVth 1.74V(BF₂ 40keV) · NBIS ΔVth 1.04V(BF₂ 40keV) |
| **강점** | 별도 도핑층·패시베이션층 없이 단일 이온주입 공정으로 도핑과 결함 부동태화 동시 달성 |
| **게재** | Advanced Functional Materials, 2026 (Early View) |

## 6. 핵심 용어

<dl class="term-list">
  <div><dt>IGZO</dt><dd>인듐·갈륨·아연·산소로 이뤄진 산화물 반도체. LTPS보다 이동도는 낮지만 대면적 균일성이 좋아 고해상도 디스플레이 백플레인에 널리 쓰인다.</dd></div>
  <div><dt>산소공공(V_O)</dt><dd>산화물 결정 안에서 산소 원자가 빠진 자리. 전하를 내놓는 도너처럼 작용해 이동도를 올리지만, 과하면 안정성을 해치는 결함으로도 작용한다.</dd></div>
  <div><dt>PBTS / NBIS</dt><dd>각각 양의 바이어스+열 스트레스, 음의 바이어스+광조사 스트레스. TFT가 오래 켜져 있거나 빛에 노출됐을 때 문턱전압이 밀리는 정도를 측정하는 표준 안정성 시험이다.</dd></div>
  <div><dt>채널 이온주입</dt><dd>반도체에 특정 이온을 강제로 박아 넣는 공정. 기존에는 소스·드레인의 저항을 낮추는 용도로만 쓰였고, 채널 자체에 적용한 사례는 드물었다.</dd></div>
</dl>

이번 주 다른 논문 21편은 [7월 3주차 디스플레이 논문 브리핑](/article/2026-08-14-paper-week3-brief)에서 짧게 훑었다.
