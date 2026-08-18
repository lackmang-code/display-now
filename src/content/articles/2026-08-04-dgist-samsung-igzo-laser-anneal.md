---
title: "레이저로 잡은 산화물 TFT의 안정성과 접촉저항"
summary: "삼성전자 반도체연구소가 공동 참여한 연구입니다. 텅스텐 게이트에 레이저를 한 번 쬐는 공정 스텝 하나만으로 산화물 TFT 안정성(PBS 문턱전압 변화 83%↓)과 접촉저항(59%↓)을 동시에 잡았고, 커패시터리스 D램 셀 데이터 유지율은 34.8%→87.9%로 뛰었습니다. 차세대 공정 후보를 찾는 팀이라면 챙겨볼 결과입니다."
section: paper
reporter: PEER
publishedAt: 2026-08-04
readingMinutes: 8
tags: [IGZO TFT, 레이저 어닐링, 커패시터리스 D램, DGIST, 삼성전자]
sources:
  - type: paper
    title: "Simultaneous Enhancement of Performance and Stability in Dual-Gate a-IGZO Thin-Film Transistors via Single-Step Laser Annealing for Capacitor-Less DRAM"
    url: "https://doi.org/10.1002/adfm.77445"
featured: true
paywallAfter: 0
---

<div class="paper-card">
  <div><span class="label">논문</span><a href="https://doi.org/10.1002/adfm.77445" target="_blank" rel="noopener">Simultaneous Enhancement of Performance and Stability in Dual-Gate a-IGZO Thin-Film Transistors via Single-Step Laser Annealing for Capacitor-Less DRAM</a></div>
  <div><span class="label">저자</span><span>제1저자 Sihyeon Kwon 외 DGIST 연구진, 삼성전자 반도체연구소<span class="dim">(Woohyun Hwang·Wanki Kim·Daewon Ha)</span> 공동참여, 교신 Hyuk-Jun Kwon<span class="dim">(DGIST)</span></span></div>
  <div><span class="label">게재</span><span>Advanced Functional Materials, 2026 · Early View <span class="dim">(권·호 미배정)</span> · <code>DOI 10.1002/adfm.77445</code></span></div>
</div>

산화물 TFT를 메모리 소자로 쓰려면 상충하는 두 조건을 동시에 만족해야 한다: 셀 상태를 안정적으로 유지할 양(+)의 문턱전압, 그리고 빠르게 읽어낼 만큼 큰 전류. DGIST와 삼성전자 연구진은 금속 게이트에 레이저를 한 번 쬐는 것만으로 이 둘을 함께 잡았다. 문턱전압 변화는 83% 줄었고, 데이터 유지율은 34.8%에서 87.9%로 뛰었다.

## 1. 왜 어려운 문제였나

듀얼게이트 구조로 읽기 트랜지스터를 만들면, 셀 안에서 자체적으로 상태를 보상하려면 안정적인 양(+)의 문턱전압이 필요하고, 빠른 읽기 동작을 위해서는 큰 구동전류(3µA 이상)가 필요하다. 그런데 이 둘은 서로를 갉아먹는 관계다. 양의 문턱전압을 얻으려고 산소공공 같은 결함을 없애면 채널의 캐리어 밀도가 줄고, 캐리어 밀도가 낮아지면 이동도도 함께 떨어진다(percolation 전도 메커니즘). 게다가 소스·드레인의 접촉 특성까지 나빠져 전하 주입이 어려워지니, 구동전류는 이중으로 손해를 본다.

기존에 시도된 방법들도 저마다 대가가 있었다. 화학적 처리(수소 플라스마, 불소 도핑)는 소자를 손상시킬 위험이 있었고, 이종접합 콘택 같은 구조적 설계는 공정을 복잡하게 만들었다. 통상적인 노(furnace) 열처리는 시간이 길어 주변층에서 불순물이 새어 들어왔고, 자외선 레이저 어닐링은 오히려 산소공공을 늘려 문턱전압을 음의 방향으로 밀어내고 채널을 손상시켰다. 손상도 없고 공정도 늘리지 않으면서 두 조건을 동시에 만족시키는 방법은 그동안 풀리지 않은 숙제로 남아 있었다.

## 2. 발상의 전환: 금속 게이트만 지지는 레이저

연구진은 532nm 연속발진(CW) 레이저를 소자 전체가 아니라 텅스텐(W) 상부게이트 전극에만 선택적으로 쬐었다. 텅스텐이 레이저를 흡수하면서 수직 방향으로 급격한 열 구배가 생기고, 이 하나의 열 구배가 동시에 두 가지 일을 한다.

1. 게이트 유전체(Al₂O₃)와 IGZO 채널의 계면으로 산소가 재분배되면서 산소공공·수산기 결함이 줄어든다. 문턱전압이 양의 방향으로 이동하고, 벌크 캐리어는 크게 잃지 않아 이동도도 유지된다
2. 동시에 소스·드레인 접촉부의 저항성 산화텅스텐(WOx) 계면층이 분해되며 전도성 n+ 영역이 만들어진다. 접촉저항이 낮아진다

별도의 화학 처리나 구조 변경 없이, 레이저 조사 한 번으로 채널과 접촉부를 동시에 최적화한 것이 이 연구의 핵심이다.

<figure class="fig-single">
  <img src="/articles/2026-08-04-dgist-samsung-igzo-laser-anneal/Fig1_소자구조공정.png" alt="듀얼게이트 IGZO TFT 구조와 텅스텐 게이트 선택적 레이저 조사 공정 개념도">
  <figcaption><span class="fig-num">그림 1</span>듀얼게이트 IGZO TFT 구조와 텅스텐 게이트 선택적 레이저 조사에 따른 화학적 변화 메커니즘. <span class="dim">출처: 논문 Fig. 1, CC BY 4.0</span></figcaption>
</figure>

## 3. 결과: 트랜지스터도, 메모리 셀도 함께 좋아졌다

<div class="stat-row">
  <div><b>83%</b><span>PBS 문턱전압 변화 감소<span class="dim">(738mV→122mV)</span></span></div>
  <div><b>59%</b><span>접촉저항 감소<span class="dim">(15.9→6.5Ω·cm)</span></span></div>
  <div><b>87.9%</b><span>D램 데이터 유지율<span class="dim">(10,000초 후, 기존 34.8%)</span></span></div>
</div>

**표 1 · 레이저 어닐링(70mW) 전후 비교**

| 지표 | 레이저 전 | 레이저 후 | 측정 조건 |
|---|---:|---:|---|
| 이동도 | 미보고 | 37.9 cm²/V·s | 듀얼게이트 동작, VDS=0.1V |
| 문턱전압 | 음의 값 | +0.27 V | 듀얼게이트 동작, VDS=0.1V |
| on/off 전류비 | 미보고 | &gt;10⁹ | VDS=1V |
| PBS 문턱전압 변화(3600초) | 738 mV | 122 mV | +2.5 MV/cm 인가 |
| 접촉저항 | 15.9 Ω·cm | 6.5 Ω·cm | TLM 측정 |
| 쇼트키 장벽(W/IGZO) | 0.77 eV | 0.52 eV | UPS·UV-vis 기반 |

*레이저 파워는 30~70mW 구간에서만 유효하고, 80mW 이상에서는 열손상이 발생했다. 자료: 논문 Table 1, Figure 4·6.*

레이저 처리 소자를 2T0C(트랜지스터 2개, 커패시터 0개) D램 셀의 읽기 트랜지스터로 넣어 시험한 결과, 메모리 윈도우는 10⁵ 이상으로 유지됐고 게이트 간 결합 기울기는 이론적 한계(-1V/V)에 가까운 -0.98V/V를 기록했다. 가장 눈에 띄는 건 데이터 유지 시험이다. 10,000초 동안 반복 읽기 동작을 시켰을 때, 레이저 처리 전 소자는 "1" 상태 전류가 초기값의 34.8%까지 떨어졌지만, 레이저 처리 후 소자는 87.9%를 유지했다.

<figure class="fig-single">
  <img src="/articles/2026-08-04-dgist-samsung-igzo-laser-anneal/Fig7_D램리텐션.png" alt="2T0C D램 셀 읽기 동작 측정 및 10000초 데이터 리텐션 그래프">
  <figcaption><span class="fig-num">그림 2</span>2T0C D램 셀 읽기 동작 측정 구성과 10,000초 데이터 리텐션 비교. <span class="dim">출처: 논문 Fig. 7, CC BY 4.0</span></figcaption>
</figure>

## 4. 의미: 백플레인 공정에 더할 수 있는 한 단계

IGZO TFT는 이미 디스플레이 백플레인의 핵심 소재이고, 이번 결과가 겨냥한 커패시터리스 D램은 그 응용 범위를 메모리 영역까지 넓히는 방향이다. 별도 화학 공정이나 구조 변경 없이 기존 레이저 어닐링 장비로 게이트 금속만 선택 조사한다는 점은, 대면적 패널 공정 라인에 추가 공정 부담 없이 얹을 수 있는 가능성을 시사한다.

다만 이번 검증은 개별 소자 단위이며, 실제 고집적 어레이에서 다수 셀이 함께 동작할 때의 간섭이나 수율은 아직 다뤄지지 않았다. 데이터 유지 시험도 10,000초(약 2.8시간)까지만 진행됐다.

## 5. 한눈 요약

| | |
|---|---|
| **한 줄 요약** | 텅스텐 게이트에 레이저를 선택 조사해 IGZO TFT의 안정성(ΔVth 83%↓)과 접촉저항(59%↓)을 동시에 개선 |
| **핵심 성과** | 이동도 37.9cm²/V·s · PBS ΔVth 122mV(83%↓) · 접촉저항 6.5Ω·cm(59%↓) · D램 리텐션 87.9% |
| **강점** | 화학 처리·구조 변경 없이 단일 레이저 조사 공정으로 채널과 접촉부 동시 최적화 |
| **게재** | Advanced Functional Materials, 2026 (Early View) |

## 6. 핵심 용어

<dl class="term-list">
  <div><dt>듀얼게이트(DG) TFT</dt><dd>상부·하부 두 개의 게이트를 가진 트랜지스터 구조. 한쪽 게이트로 데이터를 쓰고 다른 쪽으로 읽어, 커패시터 없이도 메모리 셀처럼 동작시킬 수 있다.</dd></div>
  <div><dt>2T0C D램</dt><dd>트랜지스터 2개로 구성하고 커패시터를 쓰지 않는 D램 셀 구조. 커패시터 소형화의 물리적 한계를 우회하는 차세대 메모리 후보 중 하나다.</dd></div>
  <div><dt>PBS / 문턱전압(Vth)</dt><dd>PBS(양의 바이어스 스트레스)는 게이트에 계속 양의 전압을 걸어 소자를 스트레스 시키는 표준 안정성 시험. 문턱전압은 트랜지스터가 켜지기 시작하는 전압으로, 이 값이 시험 중 얼마나 밀리는지가 안정성 지표다.</dd></div>
  <div><dt>쇼트키 장벽</dt><dd>금속과 반도체가 접합할 때 생기는 에너지 장벽. 낮을수록 전하가 잘 넘어가 접촉저항이 줄어든다.</dd></div>
</dl>

이번 주 다른 논문 9편(과 유연 OTFT 심층기사 1편)은 [7월 4주차 디스플레이 논문 브리핑](/article/2026-08-14-paper-week4-brief)에서 짧게 훑었다.
