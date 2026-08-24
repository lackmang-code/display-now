---
title: "청색 인광 OLED 특허 8건 분석"
searchTitle: "청색 인광 OLED(PHOLED) 특허 8건 분석"
summary: "청색 인광의 원리를 청구한 특허는 2020년 8월에 존속기간이 끝났습니다. 만료 6년이 지난 지금도 양산 채택은 공표되지 않았습니다. 아무도 막을 수 없는데 아무도 만들지 못하는 이 구간에서 실제 방어선이 어디로 옮겨갔는지를 등록 특허 원문으로 확인했습니다."
section: patent
reporter: CLAIM
publishedAt: 2026-08-18
collectWeekStart: '2026-08-10'
readingMinutes: 15
tags: [청색인광, PHOLED, 유니버설디스플레이, TADF, 큐럭스, OLED재료]
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

특허의 존속기간은 20년이다. 그 안에 기술을 상용화해 값을 회수하라는 것이 이 제도의 전제다.

청색 인광 OLED는 그 전제가 깨진 사례다. 원리를 청구한 특허는 2000년 8월에 우선권을 확보했고, 2020년 8월 11일에 존속기간이 끝났다. 그로부터 6년이 지난 2026년 8월 현재, 이 기술을 양산에 넣었다고 공표한 패널사는 없다.

이제 누구도 그 원리를 독점하지 못한다. 그런데도 아무도 제품을 못 만든다. 이 구간에서 실제 방어선이 어디로 옮겨갔는지를 등록 특허 원문으로 확인한다.

## 1. 개요

### 1.1 분석 배경 및 목적

OLED의 적색과 녹색은 2000년대에 형광에서 인광으로 넘어갔다. 인광은 이론상 내부양자효율 100%를 쓰고 형광은 25%에 그치므로, 전환은 그대로 소비전력 이득이 된다. 청색만 아직 형광이다.

목적은 예측이 아니라 확인이다. "언제 나온다"를 점치지 않는다. 회사와 대학이 특허 명세서에 실제로 무엇을 썼고, 그 권리가 지금 어떤 상태인지를 그대로 옮긴다.

### 1.2 분석 범위

우선일 기준 1997년부터 2019년까지, 22년에 걸친 여덟 건을 대상으로 한다. 출원인은 프린스턴대·서던캘리포니아대(USC)·유니버설디스플레이·규슈대·큐럭스다. 패널사(삼성디스플레이·LG디스플레이)의 자체 재료 특허는 이번 표본에 넣지 않았다. 이 기술의 권리 계보가 재료사와 대학에서 시작됐기 때문이다.

### 1.3 데이터 소스 및 검색식

<div class="tbl-wrap">

| 항목 | 내용 |
|---|---|
| 데이터 소스 | 구글특허(patents.google.com) 단일 소스. KIPRIS 등 유료 등록원부는 미확보 |
| 채택한 검색식 | `"phosphorescent organic light emitting"` · `"blue phosphorescent"` + 출원인 지정 · `"thermally activated delayed fluorescence"` + 발명자 지정 |
| 폐기한 검색식 | `"blue phosphorescent"` 단독: 8,134건이 나왔으나 상위 결과가 1920~60년대 야광 도료·인쇄판 특허였다. OLED와 무관한 문구 일치 |
| 정렬 기준 | 오래된 순(sort=old) 우선 확인 후 최신순으로 보완 |
| 출원인 검증 | 표본 전건에 대해 구글특허 *Application filed by* / *Current Assignee* 필드를 직접 열어 확인 |
| 한계 | 전수조사가 아닌 8건 표본. 청구항 수·피인용 수는 지표로 쓰지 않음(계속출원·분할로 왜곡) |

</div>

### 1.4 기술분류체계

수집된 특허를 "무엇으로 청색을 내는가(레버)"와 "무엇을 포기했는가(대가)" 두 축으로 분류했다. 레버는 인광(삼중항을 직접 쓴다) · 하이브리드(청색만 형광으로 남긴다) · 지연형광(삼중항을 일중항으로 되올린다) 세 갈래다.

## 2. 정량 스케치

### 2.1 존속기간 로드맵

<figure class="fig-single">
  <img src="/articles/2026-08-18-blue-phosphorescent-oled-patents/2026-08-18-blue-phosphorescent-oled-patents-fig2.svg" alt="청색 인광 관련 특허 여섯 건의 우선일부터 만료일까지를 가로 막대로 표시한 차트. 청색 인광 원조 특허는 2000년 시작해 2020년 8월 만료되어 2026년 현재 시점보다 왼쪽에서 끝나고, 하이브리드·TADF·최신 출원 막대는 현재 시점을 지나 2029~2039년까지 이어진다." />
  <figcaption><span class="fig-num">그림 1</span>여섯 건의 존속기간. 원리를 청구한 특허(둘째 줄)만 현재 시점 왼쪽에서 끝난다. <span class="src">구글특허 서지사항(우선일·Anticipated/Adjusted expiration) 기준, CLAIM 작성</span></figcaption>
</figure>

원조 두 건은 이미 만료됐다. 우회로와 제3의 길, 그리고 2025년에 새로 낸 출원들만 현재 시점 오른쪽으로 뻗는다.

### 2.2 세 개의 숫자

<div class="stat-row">
  <div><b>20년</b><span>청색 인광 원리 특허의 존속기간 (2000-08-11 → 2020-08-11)</span></div>
  <div><b>6년</b><span>만료 이후 지금까지, 양산 채택이 공표되지 않은 기간</span></div>
  <div><b>2014년</b><span>유니버설디스플레이가 2025~26년에 낸 출원들이 매달려 있는 우선일</span></div>
</div>

### 2.3 레버 × 대가 매트릭스

<div class="tbl-wrap">

| 레버 | 대표 특허 | 청색을 내는 방식 | 대가 | 현재 상태 |
|---|---|---|---|---|
| 인광 | US6939624B2 | 이리듐 착체의 삼중항을 직접 발광에 쓴다 | 청색은 광자 에너지가 높아 재료가 빨리 상한다 | **만료** (2020-08-11) |
| 하이브리드 | US9070884B2 | 적·녹만 인광, 청색은 형광으로 남긴다 | 청색 효율은 25%에 묶인다 | 유효 (2029-10-16) |
| 지연형광 | US10454038B2 | 삼중항을 열로 일중항에 되올려 형광으로 뽑는다 | 색순도·수명 확보가 별도 과제 | 유효 (2033-08-13) |

</div>

## 3. 정성 분석: 특허 5건

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">프린스턴대 · USC</span>
    <span class="num">US6303238B1 <span class="tag status-granted">만료</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

OLEDs doped with phosphorescent compounds

#### 서지

우선일 1997-12-01 · 등록 2001-10-16 · 만료 2017-12-01 · 발명자 마크 톰슨, 폴 버로우스, 스티븐 포레스트 외 3인

#### 독립항 요지

<div class="quote-box"><p>인광 도판트 화합물을 함유한 발광층을 포함하는 이종구조로 전계발광을 일으키는 유기 발광소자. 도판트의 예로 백금 옥타에틸포르피린(PtOEP)을 든다.</p></div>

#### 판독

인광 OLED 자체의 출발점이다. 발명자 명단은 1998년 인광 OLED를 학계에 처음 알린 팀과 겹친다. 이 특허는 색을 특정하지 않았다. 청색이 별도의 문제로 떨어져 나오는 것은 다음 특허부터다. 구글특허 서지에 "최초 패밀리 소송 제기" 기록이 남아 있으나, 이번 분석은 소송을 다루지 않으므로 사실 표기에 그친다.

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">유니버설디스플레이 · 프린스턴대 · USC</span>
    <span class="num">US6939624B2 <span class="tag status-granted">만료</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Organometallic compounds and emission-shifting organic electrophosphorescence

#### 서지

우선일 2000-08-11 · 출원 2001-10-16 · 등록 2005-09-06 · **만료 2020-08-11** · 패밀리 EP·AU·CN·JP·KR·WO·TW

발명자는 세르게이 라만스키, 마크 톰슨, 바딤 아다모비치, 피터 주로비치, **아다치 치하야**, 마크 발도, 스티븐 포레스트, 레이먼드 쾅 8인이다.

#### 초록이 명시한 목표

<div class="quote-box"><p>개선된 전계발광을 내는 인광 유기금속 화합물로서, "특히 가시광의 청색 영역"을 겨냥한다.</p></div>

#### 청구범위가 건 조건

<div class="quote-box"><p>호스트 재료의 최저 삼중항 여기상태는 붕괴율이 초당 약 1 미만이고, 호스트에 분산된 게스트 재료의 최저 삼중항 여기상태는 복사붕괴율이 초당 약 1×10⁵ 또는 1×10⁶을 넘으며, 호스트의 최저 삼중항 에너지준위가 게스트의 최저 삼중항 에너지준위보다 낮을 것.</p></div>

#### 판독

청색 인광을 성립시키는 설계 조건이 2000년 시점에 이미 수치로 확정돼 있었다. 호스트가 게스트보다 삼중항 에너지가 낮아야 에너지가 되돌아 새지 않는다는 것, 게스트는 빨리 빛으로 내보내고 호스트는 느리게 붕괴해야 한다는 것. 이 두 조건은 오늘 청색 인광 재료를 설계할 때도 그대로 지켜야 한다.

**이 특허는 2020년 8월 11일에 만료됐다.** 상태는 "Expired - Lifetime"이다. 위 조건은 이제 공중의 영역에 있다.

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">유니버설디스플레이</span>
    <span class="num">US9070884B2 <span class="tag status-granted">유효</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Hybrid OLED having phosphorescent and fluorescent emitters

#### 서지

우선일 2005-04-13 · 등록 2015-06-30 · 만료 예정 2029-10-16 · 상태 Active

#### 초록

<div class="quote-box"><p>적어도 두 발광재료(형광 청색 발광재료와 인광 발광재료)의 결합 발광을 갖는 유기 발광소자. 형광과 인광 발광체의 조합으로 효율과 수명을 최적화한 소자 구조를 제공한다.</p></div>

#### 판독

이 특허의 이름 자체가 우회의 기록이다. 청색을 인광으로 못 만들겠으니 청색만 형광으로 남기고 적·녹만 인광으로 쓰겠다는 것이다. 출원 시점이 2005년, 청색 인광 원리 특허가 나온 지 5년 뒤다.

도면이 그 타협을 그대로 보여준다.

<div class="fig-frame">
  <img src="/articles/2026-08-18-blue-phosphorescent-oled-patents/2026-08-18-blue-phosphorescent-oled-patents-fig1.png" alt="US9070884B2 Figure 3 특허 원문 도면. ITO 기판 위로 Ir(Ph-ppy)3, NPD, CBP:Ir(Ph-ppy)3, CBP:Ir(pq)2(acac), ADN:BFD47, Alq3, LiF, Al 순으로 쌓인 소자 단면. 청색 발광층만 형광 도판트를 쓴다." />
  <div class="fig-cap">FIG. 3 (US9070884B2): 소자 적층 단면. 아래에서부터 ITO(양극) · Ir(Ph-ppy)₃ · NPD · <b>CBP:Ir(Ph-ppy)₃(녹색 인광)</b> · <b>CBP:Ir(pq)₂(acac)(적색 인광)</b> · <b>ADN:BFD47(청색 형광)</b> · Alq₃ · LiF · Al(음극). 적·녹만 이리듐 착체(인광)를 쓰고 청색만 형광 도판트를 쓴다. 원문 도면.</div>
</div>

적색층과 녹색층에는 CBP 호스트에 이리듐 착체가 도핑돼 있다. 인광이다. 청색층만 ADN 호스트에 BFD47이 들어간다. 형광이다. 한 소자 안에서 청색만 다른 원리로 빛난다.

이 특허는 2029년 10월까지 유효하다. 그리고 뒤에서 보겠지만, 2026년에 공개된 프로토타입도 여전히 이 구조를 쓴다.

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">큐럭스 (규슈대 스핀오프)</span>
    <span class="num">US10454038B2 <span class="tag status-granted">유효</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Delayed-fluorescence material and organic electroluminescence element using same

#### 서지

우선일 2011-07-15 · 출원 2012-07-13 · 등록 2019-10-22 · 만료 예정 2033-08-13 · 발명자 나카가와 데쓰야, **아다치 치하야**

#### 권리 이전 이력

구글특허 이벤트 기록에 양도가 두 번 찍혀 있다.

<div class="tbl-wrap">

| 일자 | 사건 |
|---|---|
| 2012-07-13 | 출원 |
| 2014-01-16 | 규슈대학 국립대학법인에 양도 |
| 2016-10-04 | 큐럭스(Kyulux, Inc.)에 양도 |
| 2019-10-22 | 등록 |

</div>

#### 판독

제3의 길이다. 삼중항을 직접 발광에 쓰는 대신, 열에너지로 일중항 준위까지 되올린 뒤 형광으로 내보낸다. 이리듐 같은 귀금속이 필요 없다.

주목할 것은 발명자다. 2000년 청색 인광 원리 특허(US6939624B2)의 발명자 명단에 있던 아다치 치하야가, 11년 뒤 다른 원리로 같은 문제를 다시 푼다. 그 사이 그는 프린스턴을 떠나 규슈대에 있었고, 권리는 대학을 거쳐 스핀오프 회사로 넘어갔다. 한 사람이 두 갈래를 다 열어놓은 셈이다.

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">유니버설디스플레이</span>
    <span class="num">US2026/0026191A1 <span class="tag status-granted">출원중</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Organic electroluminescent devices

#### 서지

**우선일 2014-07-24 · 출원 2025-06-20 · 공개 2026-01-22** · 발명자 니콜라스 톰슨, **마크 발도**, 마이클 위버, 비노드 메논

#### 요지

<div class="quote-box"><p>발광재료의 여기상태 에너지를 강화층의 표면 플라스몬 폴라리톤으로 비복사 전달하는 것을 최대화해 소자 동작을 개선하는 방법. 강화층을 문턱거리 이내에 배치한다.</p></div>

#### 판독

내용보다 날짜가 중요하다. 2025년 6월에 낸 출원인데 우선일은 2014년 7월이다. 존속기간은 우선일에서 기산되므로 이 출원이 등록돼도 보호는 2034년에 끝난다.

같은 패턴이 반복된다. 2025년 5월 출원(US2025/0268098A1)의 우선일은 2014년 1월, 2025년 4월 한국 출원 두 건의 우선일은 각각 2017년 7월과 2019년 11월이다. 최근 서류가 계속 나오지만 시계는 10년 전에 맞춰져 있다.

발명자 명단에 마크 발도가 있다. 2000년 청색 인광 원리 특허에 이름을 올렸던 그 사람이다. 26년째 같은 문제 위에 있는 셈이다.

한 가지 더. 2025년 4월 공개된 한국 출원(KR2025-0058728A)은 명세서에서 "인광성 청색 이미터"를 **발광 λmax 470nm 미만, 또는 CIE 좌표 X<0.2·Y<0.2**로 정의한다. 원리 특허가 삼중항 에너지 조건을 걸었다면, 최근 출원은 색좌표 수치로 범위를 긋는다. 청구의 무게중심이 물리 조건에서 성능 스펙으로 옮겨간 자리다.

  </div>
</div>

## 4. 비교분석

### 4.1 20년을 다 쓰고도 못 넘긴 문턱

특허 제도는 20년을 준다. 청색 인광은 그 20년을 다 쓰고도 상용화에 닿지 못했다.

무엇이 막았는지는 권리자 자신이 밝혀뒀다. 유니버설디스플레이는 2026년 6월 자사 기술 블로그에서, 청색 인광의 효율이나 색순도를 올리면 수명이 깎이고 수명을 잡으면 효율이 깎이는 맞교환이 역사적으로 반복됐다고 정리했다. 청색은 광자 에너지가 높아 재료에 걸리는 부담이 크고, 깊은 청색을 내려면 전류밀도를 더 올려야 한다는 것이 그 물리적 이유다.

여기서 갈린다. 특허가 막고 있던 것이 아니었다. 원리는 2000년에 공개됐고 2020년에는 권리마저 풀렸는데, 20년 넘게 아무도 넘지 못한 문턱은 재료의 수명이었다.

### 4.2 우회로가 20년째 현역이다

2005년의 하이브리드 특허는 임시방편처럼 보인다. 청색 인광이 될 때까지만 버티는 구조다.

그런데 2026년 7월 30일 유니버설디스플레이 2분기 실적 발표에서 나온 설명에 따르면, LG디스플레이가 SID 디스플레이위크 2025년과 2026년에 공개한 태블릿 크기 프로토타입은 **하이브리드 탠덤 구조에 청색 인광을 넣은 것**이었다.

전면 전환이 아니다. 청색 인광이 들어가도 소자는 여전히 하이브리드다. 2005년에 우회로로 그려둔 구조가 2026년 프로토타입의 뼈대로 남아 있고, 그 특허는 2029년까지 유효하다. 우회로가 본선이 된 셈이다.

### 4.3 시점을 말하지 않는다

같은 실적 발표에서 경영진은 상용화 시점을 반복해서 질문받았다. 스티븐 에이브럼슨 대표의 답은 지금 시점에서 구체적 일정을 줄 수 없으며 그것은 고객사의 상용화 로드맵에 달려 있다는 것이었다.

같은 자리에서 회사는 2026년 연간 매출 가이던스를 6억 3,000만~6억 7,000만 달러 구간의 **하단**으로 조정했다. 청색 인광 관련 매출 전망은 따로 제시되지 않았다.

특허가 만료됐다는 사실과 시점을 못 박지 못한다는 사실이 같은 방향을 가리킨다. 이 기술의 병목은 권리가 아니라 성능이다.

### 4.4 방어선이 옮겨갔다

원천이 풀렸다고 이 영역이 무주공산이 된 것은 아니다.

<div class="tbl-wrap">

| 구간 | 무엇을 보호하나 | 만료 |
|---|---|---|
| 원천 (2000년 우선) | 청색 인광이 성립하는 삼중항 에너지 조건 | 2020년 만료 |
| 우회 (2005년 우선) | 청색만 형광으로 남긴 하이브리드 소자 구조 | 2029 |
| 제3의 길 (2011년 우선) | 지연형광 재료와 소자 | 2033 |
| 개량 (2014~2019년 우선) | 구체적 화합물 조성·호스트 조합·광추출 구조 | 2034~2039 |

</div>

원리는 누구나 쓸 수 있다. 실제로 쓸 만한 수명이 나오는 **특정 화합물과 그 조합**은 2014년 이후 우선일의 개량 특허가 덮고 있다. 원천특허 만료를 진입 신호로 읽으면 곤란한 이유다. 문은 열렸지만 통로는 다른 곳에 다시 났다.

## 5. 반증 및 한계

- **만료가 곧 자유는 아니다.** 만료된 것은 US6939624B2가 청구한 범위이며, 같은 기술 영역에 후속 등록특허와 계류 출원이 남아 있다. 이 분석은 자유실시 가능 여부를 판단하지 않는다.
- **CLAIM은 침해·무효를 판단하지 않는다.** 위 만료일과 상태는 구글특허 서지사항의 전달이며 법적 유효성 판단이 아니다.
- **만료일은 서지값이다.** "Anticipated/Adjusted expiration"은 존속기간 조정을 반영한 추정치로, 연차료 미납 등에 따른 조기 소멸은 반영되지 않을 수 있다. 등록원부는 미확보다.
- **계류 출원의 만료는 계산값이다.** 그림 1의 점선 막대는 우선일에 20년을 더한 값으로, 등록 시 존속기간 조정으로 달라질 수 있다.
- **재료 특허의 범위는 이 방식으로 다 읽히지 않는다.** 화합물 청구항은 치환기를 넓게 나열하는 마쿠쉬 형식이라, 청구범위 문언만으로 실제 커버 범위를 가늠하기 어렵다.
- **표본은 8건이다.** 패널사 자체 재료 특허와 이데미츠코산·머크 등 재료사 특허는 이번 범위에 넣지 않았다. 다음 편의 과제다.
- **양산 여부는 공표 기준이다.** "양산 채택이 공표되지 않았다"는 것은 공개된 실적 발표·자료를 근거로 한 서술이며, 비공개 양산을 배제하는 서술이 아니다.

## 6. 결론 및 시사점

세 가지가 남는다.

**첫째, 원천특허 만료를 기회로 읽되 통로를 다시 확인해야 한다.** 청색 인광의 원리 조건은 2020년부터 공중의 영역에 있다. 그러나 실제 수명이 나오는 화합물 조성은 2014년 이후 우선일 특허들이 덮고 있고, 그 보호는 2034~2039년까지 이어진다. 재료 소싱을 검토한다면 만료된 원천이 아니라 이 구간을 봐야 한다.

**둘째, 하이브리드는 과도기가 아니라 설계 표준으로 굳었다.** 2005년 우회 특허의 구조가 2026년 프로토타입에 그대로 있고 권리는 2029년까지 살아 있다. 청색 인광 도입을 "전면 전환"으로 상정한 계획은 실제 소자 구조와 어긋날 수 있다.

**셋째, 시점을 특허로 예측할 수 없는 사례다.** CLAIM은 등록 특허에서 로드맵을 읽지만, 이번 건에서 특허가 알려준 것은 일정이 아니라 일정의 부재다. 20년이 지나도 안 되는 기술이 있고, 그때 특허는 언제 되는지가 아니라 무엇이 막고 있는지를 말해준다. 청색 인광의 병목은 권리가 아니라 수명이다.

지연형광 갈래의 권리는 2033년까지 남아 있다. 청색이 인광으로 갈지 지연형광으로 갈지, 혹은 하이브리드로 더 버틸지는 아직 어느 특허도 답하지 않는다.

## 7. 부록: 특허 스펙 전체

<div class="tbl-wrap">

| 번호 | 출원인 (검증 완료) | 우선일 | 등록일 | 만료 | 상태 | 패밀리 |
|---|---|---|---|---|---|---|
| US6303238B1 | 프린스턴대 · USC | 1997-12-01 | 2001-10-16 | 2017-12-01 | 만료 | US |
| US6939624B2 | 유니버설디스플레이 · 프린스턴대 · USC | 2000-08-11 | 2005-09-06 | 2020-08-11 | 만료 | US |
| TW593625B | 프린스턴대 · USC · 유니버설디스플레이 | 2000-08-11 | 2004-06-21 | 미상 | 만료 | EP·AU·CN·JP·KR·WO·TW |
| US9070884B2 | 유니버설디스플레이 | 2005-04-13 | 2015-06-30 | 2029-10-16 | 유효 | WO·US·TW |
| US10454038B2 | 큐럭스 (규슈대에서 이전) | 2011-07-15 | 2019-10-22 | 2033-08-13 | 유효 | CN·EP·KR·WO·JP·US·TW |
| US2025/0268098A1 | 유니버설디스플레이 | 2014-01-08 | 미등록 | ~2034 | 출원중 | US·CN·KR |
| US2026/0026191A1 | 유니버설디스플레이 | 2014-07-24 | 미등록 | ~2034 | 출원중 | WO·EP·US·CN·JP·KR |
| KR2025-0058728A | 유니버설디스플레이 | 2019-11-14 | 미등록 | ~2039 | 출원중 | EP·CN·JP·KR |

</div>

출원인 열은 전건에 대해 구글특허 *Application filed by* 또는 *Current Assignee* 필드를 직접 열어 확인한 값이다.
