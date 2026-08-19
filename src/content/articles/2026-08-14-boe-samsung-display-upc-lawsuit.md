---
title: "BOE-삼성디스플레이 언더패널 카메라 특허소송 분석"
summary: "BOE가 특허 4건을 들고 삼성디스플레이를 제소한 지 넉 달 만에 약 1조 원 규모 라이선스 합의로 조용히 끝났습니다. 3년을 끌어온 양사 전면전이 왜 이렇게 빨리 정리됐는지, 소송에 실제 첨부된 특허 4건의 청구범위를 원문으로 뜯어봤습니다. IP·사업개발 담당자를 위한 라이선싱 전략 참고 자료입니다."
section: patent
reporter: CLAIM
publishedAt: 2026-08-14
readingMinutes: 13
tags: [특허소송, BOE, 삼성디스플레이, UPC, 언더패널카메라]
sources:
  - type: patent
    title: "Display panel and method for manufacturing the same (US11,037,994, BOE, 2021-06-15 등록)"
    url: "https://patents.google.com/patent/US11037994B2/en"
  - type: patent
    title: "Display substrate and driving method thereof, and display device (US12,266,309, BOE, 2025-04-01 등록)"
    url: "https://patents.google.com/patent/US12266309B2/en"
  - type: patent
    title: "Display substrate and driving method thereof, and display device (US12,307,976, BOE, 2025-05-20 등록)"
    url: "https://patents.google.com/patent/US12307976B2/en"
  - type: patent
    title: "Array substrate, display panel, and display device (US11,695,017, BOE, 2023-07-04 등록)"
    url: "https://patents.google.com/patent/US11695017B2/en"
  - type: disclosure
    title: "BOE Technology Group Co., Ltd. et al v. Samsung Display Co., Ltd. (2:25-cv-00715) (PacerMonitor)"
    url: "https://www.pacermonitor.com/public/case/59023650/BOE_Technology_Group_Co,_Ltd_et_al_v_Samsung_Display_Co,_Ltd"
  - type: article
    title: "BOE files a lawsuit against Samsung Display saying it infringes upon its under-the-OLED camera IP (OLED-Info)"
    url: "https://www.oled-info.com/boe-files-lawsuit-against-samsung-display-saying-it-infringes-upon-its-under"
  - type: article
    title: "Samsung Display and BOE settle ITC OLED patent lawsuit (The Elec)"
    url: "https://www.thelec.net/news/articleView.html?idxno=5496"
  - type: article
    title: "Samsung Display, China's BOE settle OLED patent and trade secret lawsuits (TechCrunch)"
    url: "https://techcrunch.com/2025/11/20/samsung-display-chinas-boe-settle-oled-patent-and-trade-secret-lawsuits"
featured: false
paywallAfter: 0
---

<p class="lede">2025년 7월 15일, BOE Technology Group과 자회사 Chengdu BOE Optoelectronics가 삼성디스플레이를 텍사스동부지법에 제소했다(2:25-cv-00715). 갤럭시Z폴드5·폴드6에 쓰인 언더패널카메라(UPC, 화면 아래 카메라를 심는 기술) 구조가 자사 특허 4건을 침해했다는 주장이었다. 이 소송은 삼성디스플레이와 BOE가 2022년 12월부터 이어온 훨씬 큰 분쟁의 한 조각이었다. ITC(미국국제무역위원회) 조사와 여러 건의 지방법원 소송이 동시에 진행 중이었고, 2025년 11월 두 회사가 전 세계 소송을 한꺼번에 접으며 약 1조 원 규모 라이선스 계약으로 마무리했다. BOE의 소장에 실제로 첨부된 특허 4건을 원문으로 열어본다.</p>

## 1. 개요

### 1.1 분석 배경 및 목적

BOE와 삼성디스플레이 사이의 소송은 한둘이 아니다. ITC 조사 1건에 지방법원 소송 최소 5건이 2022년 말부터 겹쳐 진행됐고, 대부분 구체적 특허 번호가 언론에 나오지 않는다. CLAIM은 그중 실제 특허 번호가 공개된 소송(BOE→삼성디스플레이, UPC 관련) 하나를 골라 첨부 특허 4건을 원문으로 확인한다.

### 1.2 분석 범위

기간은 두지 않았다. 4건 특허의 실제 우선일과 소송 제기·종결 시점 사이의 격차를 확인하는 게 핵심이었기 때문이다. 우선일 기준 2018년부터 2025년 소송 종결까지를 대상으로 한다. 대상은 BOE 특허 4건(그중 2건은 같은 출원의 형제 계속출원), 그리고 이 소송을 포함한 삼성-BOE 분쟁의 병행 소송 4건.

### 1.3 데이터 소스 및 검색식

<div class="tbl-wrap">

| 항목 | 내용 |
|---|---|
| 데이터 소스 | 구글특허(patents.google.com) + 소송 관련 사실은 공개 보도(OLED-Info·The Elec·KED Global·TechCrunch 등)와 PacerMonitor 사건기록으로 교차확인 |
| 특허 확보 경로 | OLED-Info 보도가 인용한 특허번호 4건을 먼저 구글특허 원문으로 직접 대조해 실제 출원인이 BOE(또는 BOE 자회사)인지 확인한 뒤에만 카드로 작성(B-0 규칙) |
| 인용관계 확인 | 4건 중 2건(BOE②·③)은 서지사항의 "Continuation of application" 항목으로 같은 부모출원(US11,600,230)에서 갈라진 형제출원임을 확인. 별도 특허가 아니라 같은 발명의 두 조각일 가능성을 집필 전 단계에서 반영 |
| 사건기록 | 병행 소송 4건의 제소일·종결일은 PacerMonitor 공개 사건요약으로 확인. 소장 원문(청구항 대 특허 매칭)은 유료라 확보하지 못함 |
| 한계 | ITC 조사 1건과 그 외 보도된 소송(예: 삼성디스플레이의 LCD 특허 소송)은 특허 번호가 공개되지 않아 이번 조사 범위에서 제외 |

</div>

### 1.4 기술분류체계

BOE의 4개 특허를 "무엇을 바꾸는가(레버)" 하나의 축으로 나눈다. 화소 배치·밀도를 조정하는 **화소구조 특허**와, 센서 영역을 지나는 배선을 재배치하는 **배선구조 특허**. 같은 UPC 목표를 서로 다른 층위에서 청구한다.

## 2. 정량 스케치

전수조사가 아니라 소송에 첨부된 특허 4건을 우선일·레버·소송기간 세 방식으로 배치해 확인한다.

### 2.1 기술 로드맵: 우선일 기준

<div class="viz-box">
  <div class="viz-title">PRIORITY DATE TIMELINE · 2018–2026</div>
  <svg viewBox="0 0 1080 300" width="100%" role="img" aria-label="Broken-axis timeline: BOE patent priority dates clustered in 2018, lawsuit events clustered in 2025">
<line x1="60" y1="160" x2="470" y2="160" stroke="#c9c9c4" stroke-width="2"/>
<text x="265.0" y="194" font-size="15" fill="#8a8a80" text-anchor="middle" class="mono">2018 (특허 우선일)</text>
<line x1="246.4" y1="160" x2="246.4" y2="134.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="246.4" cy="160" r="6" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="246.4" y="104" font-size="20" font-weight="700" fill="#12120e" text-anchor="middle">BOE②③(쌍둥이)</text>
<text x="246.4" y="126" font-size="15" fill="#6f6f66" text-anchor="middle" class="mono">픽셀밀도 차등화</text>
<line x1="320.9" y1="160" x2="320.9" y2="186.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="320.9" cy="160" r="6" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="320.9" y="218" font-size="20" font-weight="700" fill="#12120e" text-anchor="middle">BOE①(994)</text>
<text x="320.9" y="240" font-size="15" fill="#6f6f66" text-anchor="middle" class="mono">투과영역 픽셀구조(원조)</text>
<line x1="395.5" y1="160" x2="395.5" y2="134.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="395.5" cy="160" r="6" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="395.5" y="104" font-size="20" font-weight="700" fill="#12120e" text-anchor="middle">BOE④(017)</text>
<text x="395.5" y="126" font-size="15" fill="#6f6f66" text-anchor="middle" class="mono">배선게더링+차광</text>
<line x1="590" y1="160" x2="1040" y2="160" stroke="#c9c9c4" stroke-width="2"/>
<text x="815.0" y="194" font-size="15" fill="#8a8a80" text-anchor="middle" class="mono">2025 (소송)</text>
<line x1="665.0" y1="160" x2="665.0" y2="134.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="665.0" cy="160" r="6" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="665.0" y="104" font-size="20" font-weight="700" fill="#12120e" text-anchor="middle">소송 제기</text>
<text x="665.0" y="126" font-size="15" fill="#6f6f66" text-anchor="middle" class="mono">BOE→삼성디스플레이 2:25-cv-00715</text>
<line x1="965.0" y1="160" x2="965.0" y2="186.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="965.0" cy="160" r="6" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="965.0" y="218" font-size="20" font-weight="700" fill="#12120e" text-anchor="middle">합의 종결</text>
<text x="965.0" y="240" font-size="15" fill="#6f6f66" text-anchor="middle" class="mono">전세계 소송 일괄 종료</text>
<line x1="515.0" y1="150" x2="527.0" y2="170" stroke="#8a8a80" stroke-width="2"/>
<line x1="533.0" y1="150" x2="545.0" y2="170" stroke="#8a8a80" stroke-width="2"/>
<text x="530.0" y="140" font-size="15" fill="#b8391f" text-anchor="middle" class="mono">2019~2024 (7년 공백)</text>
<text x="530.0" y="198" font-size="15" fill="#b8391f" text-anchor="middle" class="mono">갤럭시Z폴드5 출시 2023-08</text>
</svg>
</div>

BOE의 4개 특허 우선일은 전부 2018년, 6~10월 사이 넉 달에 몰려 있다. 그런데 이 특허들이 실제로 소송에 등장한 건 그로부터 **7년 뒤인 2025년 7월**이다. 점선으로 표시한 갤럭시Z폴드5 출시(2023-08)조차 소송 제기보다 2년 가까이 이르다. 우선일과 소송 제기 사이의 이 7년은, 특허 자체가 최근에 나온 게 아니라 분쟁이 뒤늦게 불붙었다는 뜻이다.

### 2.2 레버 × 특허 매트릭스

<div class="viz-box">
  <div class="viz-title">WHAT EACH PATENT CHANGES</div>
  <div class="matrix-grid" style="grid-template-columns: 110px repeat(2, 1fr);">
    <div class="corner"></div>
    <div class="col-head">화소구조</div>
    <div class="col-head">배선구조</div>
    <div class="row-head">BOE①</div>
    <div class="cell"><span class="matrix-chip">994 · 투과영역 배치(원조)</span></div>
    <div class="cell empty">·</div>
    <div class="row-head">BOE②③</div>
    <div class="cell"><span class="matrix-chip alt">266309/307976 · 화소밀도 차등화(쌍둥이)</span></div>
    <div class="cell empty">·</div>
    <div class="row-head">BOE④</div>
    <div class="cell empty">·</div>
    <div class="cell"><span class="matrix-chip">017 · 배선 게더링+차광</span></div>
  </div>
</div>

4건 중 3건이 "화소구조" 열에 몰려 있고, 그중 2건(②·③)은 사실상 같은 발명의 형제 계속출원이다. 실질적으로 서로 다른 아이디어는 2가지(화소 vs 배선)뿐인데, 소송에는 4건으로 늘어서 있다. 계속출원을 여러 건 확보해두면 같은 발명으로도 소장에 첨부할 특허 수를 늘릴 수 있다는 걸 보여주는 사례다.

### 2.3 소송 4건 존속기간: 제소부터 종결까지

<div class="viz-box">
  <div class="viz-title">CASE DURATION · FILED → DISMISSED</div>
  <svg viewBox="0 0 1080 300" width="100%" role="img" aria-label="Duration of each parallel lawsuit from filing to dismissal">
<line x1="354.8" y1="32" x2="354.8" y2="272" stroke="#e4e4de" stroke-width="1"/>
<text x="354.8" y="294" font-size="15" fill="#8a8a80" text-anchor="middle" class="mono">2023.5</text>
<line x1="491.9" y1="32" x2="491.9" y2="272" stroke="#e4e4de" stroke-width="1"/>
<text x="491.9" y="294" font-size="15" fill="#8a8a80" text-anchor="middle" class="mono">2024</text>
<line x1="628.9" y1="32" x2="628.9" y2="272" stroke="#e4e4de" stroke-width="1"/>
<text x="628.9" y="294" font-size="15" fill="#8a8a80" text-anchor="middle" class="mono">2024.5</text>
<line x1="765.9" y1="32" x2="765.9" y2="272" stroke="#e4e4de" stroke-width="1"/>
<text x="765.9" y="294" font-size="15" fill="#8a8a80" text-anchor="middle" class="mono">2025</text>
<line x1="903.0" y1="32" x2="903.0" y2="272" stroke="#e4e4de" stroke-width="1"/>
<text x="903.0" y="294" font-size="15" fill="#8a8a80" text-anchor="middle" class="mono">2025.5</text>
<line x1="1040.0" y1="32" x2="1040.0" y2="272" stroke="#e4e4de" stroke-width="1"/>
<text x="1040.0" y="294" font-size="15" fill="#8a8a80" text-anchor="middle" class="mono">2026</text>
<text x="284" y="61.0" font-size="16" font-weight="700" fill="#12120e" text-anchor="end">삼성 1차 특허소송(2:23-cv-00309)</text>
<rect x="332.0" y="40" width="548.1" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="606.0" y="61.0" font-size="15" fill="#12120e" text-anchor="middle" class="mono">약 2.0년, 자진취하</text>
<text x="284" y="119.0" font-size="16" font-weight="700" fill="#12120e" text-anchor="end">삼성 2차 영업비밀소송(2:25-cv-00325)</text>
<rect x="834.4" y="98" width="159.9" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="914.4" y="119.0" font-size="15" fill="#12120e" text-anchor="middle" class="mono">약 7.7개월</text>
<text x="284" y="177.0" font-size="16" font-weight="700" fill="#12120e" text-anchor="end">삼성 2차 특허소송(2:25-cv-00412)</text>
<rect x="834.4" y="156" width="182.7" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="925.8" y="177.0" font-size="15" fill="#12120e" text-anchor="middle" class="mono">약 7.5개월</text>
<text x="284" y="235.0" font-size="16" font-weight="700" fill="#12120e" text-anchor="end">BOE→삼성 UPC소송(2:25-cv-00715)</text>
<rect x="903.0" y="214" width="91.4" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="948.6" y="235.0" font-size="15" fill="#12120e" text-anchor="middle" class="mono">약 4.2개월</text>
</svg>
</div>

삼성의 2023년 첫 소송은 2년을 끌다 자진취하됐다. 그런데 2025년에 새로 시작된 나머지 세 소송(삼성 영업비밀·삼성 특허·BOE 특허)은 시작 시점이 제각각인데도 **2025년 11월 19~25일, 거의 동시에 취하**됐다. 각자 다른 법정 다툼이 아니라, 하나의 협상 패키지 안에서 움직였다는 뜻이다.

## 3. 정성 분석: BOE 특허 4건

BOE가 2025년 7월 삼성디스플레이를 상대로 낸 소송에 첨부된 특허 4건이다. 청구항 1 전문(요지)과 명세서가 스스로 밝힌 종래기술 문제, 수치 한정을 그대로 인용한다.

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">BOE ①</span>
    <span class="num">US11037994B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Display panel and method for manufacturing the same

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>복수의 제1화소부와 제1투과부를 포함하는 표시영역을 갖는 표시패널로서, 제1투과부는 외부광이 패널 한쪽 면에서 반대쪽 면으로 투과하도록 구성되고, 적어도 두 개의 제1화소부가 하나 이상의 제1투과부로 이격되어 배치됨.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>명세서는 구체적 종래기술 비판 문장보다 배경설명 위주로 서술한다. 카메라·지문인식 등 언더패널 부품을 위해 화면 일부의 광투과율을 높이는 기술 일반의 필요성만 밝힌다.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">우선일</span><span class="v">2018-08-29(CN)</span></div><div class="num-cell"><span class="k">출원일</span><span class="v">2019-04-24</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2021-06-15</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">18항</span></div><div class="num-cell"><span class="k">도면 수</span><span class="v">11매</span></div><div class="num-cell"><span class="k">공동출원인</span><span class="v">Chengdu BOE + BOE Technology Group</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">이번 4건 중 <strong>우선일이 두 번째로 이른 특허</strong>다. 화소 사이에 투과부를 두어 빛을 통과시킨다는, 언더패널카메라(UPC)의 가장 기초적인 아이디어를 청구한다.</div>

<div class="fig-frame">
  <img src="/articles/2026-08-14-boe-samsung-display-upc-lawsuit/2026-08-14-boe-samsung-display-upc-lawsuit-fig1.png" alt="BOE 언더패널카메라 투과영역 단면도" />
  <div class="fig-cap">FIG. 1 (US11037994B2): 화소(87)와 투과영역(90) 사이로 외부광이 봉지층(60/82)을 통과해 하부 센서(80)에 도달하는 단면 구조. 원문 도면.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">BOE ②</span>
    <span class="num">US12266309B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Display substrate and driving method thereof, and display device

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>제1화소부·제2화소부를 포함하는 제1반복영역으로 구성된 제1표시영역과, 제3화소부·투과화소를 포함하는 제2반복영역으로 구성된 제2표시영역을 포함하되, 제2표시영역의 화소밀도가 제1표시영역보다 낮고 광투과율은 더 높은 표시기판.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>명세서 인용문 없음. 화소밀도를 영역별로 달리해 투과율과 해상도를 동시에 확보한다는 설계 목표만 청구항에 담겨 있다.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">우선일</span><span class="v">2018-06-20/06-29(CN, 3건)</span></div><div class="num-cell"><span class="k">출원일</span><span class="v">2023-01-23</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2025-04-01</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">16항</span></div><div class="num-cell"><span class="k">도면 수</span><span class="v">41매</span></div><div class="num-cell"><span class="k">계속출원 계보</span><span class="v">17/578,175 → US11,600,230의 연속출원</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);"><strong>BOE③(US12307976B2, 아래)과 우선일·출원일·발명자가 모두 동일한 쌍둥이 출원이다.</strong> 같은 부모출원(US11,600,230)에서 갈라진 두 개의 계속출원을 소송에 각각 별개 특허로 첨부했다.</div>
<div class="no-fig-note">41매 도면 중 대표도(전체 화소배열)는 확보했으나(부록 참조), 개별 청구항에 대응하는 세부도는 이번 세션에서 크롭하지 못했다.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">BOE ③</span>
    <span class="num">US12307976B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Display substrate and driving method thereof, and display device

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>BOE②(US12266309B2)와 명칭·청구 구조가 사실상 동일. 제1·제2표시영역의 화소밀도·광투과율 차등화 구조.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>BOE②와 동일한 명세서를 공유한다.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">우선일</span><span class="v">2018-06-20/06-29(CN, 3건, BOE②와 동일)</span></div><div class="num-cell"><span class="k">출원일</span><span class="v">2023-01-23(BOE②와 동일)</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2025-05-20</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">미확인</span></div><div class="num-cell"><span class="k">계속출원 계보</span><span class="v">17/578,175 → US11,600,230의 연속출원(BOE②의 형제출원)</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">한 발명을 <strong>두 건의 별개 계속출원으로 쪼개 두 건의 소송 근거로 쓴 사례</strong>다. 특허 포트폴리오 전략(같은 명세서에서 청구범위를 조금씩 달리한 계속출원을 여러 건 확보)이 소송 첨부 특허 수를 부풀릴 수 있음을 보여준다.</div>
<div class="no-fig-note">BOE②와 명세서·도면을 공유하는 형제출원이라 이번 세션에서는 개별 도면을 별도 확보하지 않았다.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">BOE ④</span>
    <span class="num">US11695017B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Array substrate, display panel, and display device

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>베이스기판·제1방향으로 뻗은 복수의 제1배선·베이스기판 위에 배치된 하나 이상의 제1차광스트립을 포함하는 어레이기판으로서, 센서부 영역을 지나는 배선들이 그룹으로 나뉘어 각 그룹이 하나의 게더링부를 이루고, 각 게더링부의 정투영이 대응 차광스트립의 정투영 범위 안에 위치함.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>센서 컴포넌트 영역을 지나는 배선이 화소 사이 간격을 어지럽히면 그 영역의 화질이 저하된다는 문제. 배선을 차광스트립 아래로 모아 화소 배열 자체는 흐트러뜨리지 않는 것이 목표.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">우선일</span><span class="v">2018-10-11(CN)</span></div><div class="num-cell"><span class="k">출원경로</span><span class="v">PCT/CN2019/110371, 2019-10-10</span></div><div class="num-cell"><span class="k">국내단계진입</span><span class="v">2020-04-29</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2023-07-04</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">19항</span></div><div class="num-cell"><span class="k">도면 수</span><span class="v">9매</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">이번 4건 중 <strong>유일하게 배선·차광 구조를 청구하는 특허</strong>다. 나머지 세 건이 화소 자체의 밀도·투과율을 다루는 반면, 이 특허는 화소 사이를 지나는 배선의 경로를 다룬다. 같은 UPC 목표를 다른 레버(화소구조 vs 배선구조)로 공략한 셈.</div>

<div class="fig-frame">
  <img src="/articles/2026-08-14-boe-samsung-display-upc-lawsuit/2026-08-14-boe-samsung-display-upc-lawsuit-fig2.png" alt="BOE 배선 게더링 영역 평면도" />
  <div class="fig-cap">FIG. 1 (US11695017B2): 센서 영역(50)을 지나는 배선(L1~L6)을 그룹으로 묶어 차광스트립(20) 투영범위 안에 모으는 평면 구조. 원문 도면.</div>
</div>

  </div>
</div>

## 4. 비교분석

### 4.1 BOE①·②③: 화소구조 안의 두 세대

BOE①(US11037994B2, 우선일 2018-08-29)은 가장 단순한 아이디어다. 화소와 화소 사이에 투과부를 두어 빛이 패널을 통과하게 한다. 화소 배열 자체는 균일하게 두고, 그 틈새에 구멍을 낸다는 접근이다.

BOE②·③(US12266309B2 / US12307976B2, 우선일 2018-06-20)은 한 발 더 나아간다. 화면을 두 영역으로 나눠 카메라 위 영역은 화소밀도를 낮추고 투과율을 높이며, 나머지 영역은 밀도를 그대로 유지한다. 균일한 틈새가 아니라 **영역별로 다른 화소 배치**를 설계하는 쪽으로 청구범위가 넓어진 셈이다. 흥미로운 건 이 두 특허가 완전히 같은 발명의 형제 계속출원이라는 점이다. 서지사항의 "Continuation of application No. 17/578,175, now Pat. No. 11,600,230"이 두 특허 모두에 동일하게 적혀 있다.

같은 발명에서 갈라진 계속출원을 소송에 별개 특허로 첨부하는 건 미국 특허 실무에서 드문 일이 아니다. 청구범위를 조금씩 달리해 침해 주장의 폭을 넓히는 전략이다. 다만 독자 입장에서는 "특허 4건"이라는 숫자가 실제로는 "서로 다른 아이디어 3가지(투과부·화소밀도·배선)"임을 알아둘 필요가 있다.

### 4.2 BOE④: 화소가 아니라 배선을 건드리다

BOE④(US11695017B2, 우선일 2018-10-11)는 다른 층위의 문제를 겨눈다. 화소 자체가 아니라, 화소 사이를 지나는 배선이다. 센서 영역을 통과하는 배선을 그대로 두면 화소 배열이 불규칙해져 화질이 떨어진다. 그래서 이 배선들을 그룹으로 묶어 차광스트립 아래로 모아버린다. 화소구조 3건이 "빛을 어떻게 통과시킬까"를 풀었다면, 이 특허는 "회로를 어떻게 숨길까"를 푼다.

PCT 경로(PCT/CN2019/110371)로 출원돼 국제출원 후 미국 국내단계로 진입했다는 점도 다른 3건(모두 미국 직접출원 또는 계속출원)과 다르다. BOE가 이 아이디어만큼은 애초에 여러 국가 동시 보호를 염두에 뒀다는 뜻일 수 있다.

### 4.3 소송: 7년 묵은 특허가 왜 지금 등장했나

4건 모두 우선일이 2018년인데, 소송은 2025년 7월에야 제기됐다. 이 격차 자체는 이례적이지 않다. 미국 특허 소송은 흔히 상대 제품이 실제로 시장에 나온 뒤, 그것도 협상이 결렬된 뒤에야 제기된다. 갤럭시Z폴드5(2023-08)·폴드6이 시장에서 몇 년 팔린 뒤, 그리고 삼성디스플레이가 2022년 12월부터 시작한 ITC 조사·소송 공세가 격화된 뒤에야 BOE가 맞소송으로 응수한 흐름과 맞아떨어진다.

실제로 이 소송은 넉 달 만인 2025년 11월 21일 종결됐다. 승소도 패소도 아니라 "화해 성립에 따른 쌍방 취하"였다. 특허 4건의 실체적 침해 여부를 법원이 판단한 기록은 없다.

## 5. 반증 및 한계

**4건 모두 실제 소장에 첨부된 특허인지, 소장 원문으로 직접 확인하지 않았다.** OLED-Info 등 공개 보도가 인용한 특허번호를 구글특허로 대조해 BOE 출원임은 확인했지만, 소장(complaint) 원문 문서는 유료·접근제한으로 열람하지 못했다.

**BOE②·③을 "형제출원"으로 판단한 근거는 서지사항의 계속출원 표기뿐이다.** 두 특허의 청구항 1이 문언까지 동일한지는 대조하지 않았다. 계속출원이어도 청구범위는 등록 과정에서 달라질 수 있다.

**7년의 우선일-소송 격차를 "BOE가 뒤늦게 특허를 발굴했다"는 식으로 해석하지 않는다.** 특허 소송은 상대의 실제 침해 제품이 시장에 나온 뒤 제기되는 게 일반적이며, 이번 소송도 그 통상적 패턴에서 벗어나지 않는다.

**소송이 넉 달 만에 끝났다고 BOE 주장이 약했다고 단정하지 않는다.** 화해로 종결된 소송은 어느 쪽 주장이 강했는지에 대한 법원의 판단 없이 끝난다. 합의 조건(비공개)이 어느 쪽에 유리했는지도 이 기사는 판단하지 않는다.

**도구가 붙여주는 해설을 검증 없이 쓰지 않는다.** 검색 결과 요약이 case 2:25-cv-00430과 2:25-cv-00715를 같은 소송처럼 언급하는 대목이 있었으나, PacerMonitor 원문 대조 결과 BOE가 원고인 소송은 2:25-cv-00715 하나였다. 확인 없이 썼다면 사건번호를 잘못 실을 뻔했다.

## 6. 결론 및 시사점

BOE가 삼성디스플레이에 낸 UPC 특허소송은 겉보기엔 "특허 4건짜리 정면충돌"이지만, 원문을 열어보면 실질적으로 다른 아이디어는 3가지(투과부 배치·화소밀도 차등화·배선 게더링)뿐이고 그나마도 우선일은 전부 2018년 한 해에 몰려 있다. 소송이 2025년에야 제기되고 넉 달 만에 화해로 끝난 건, 특허의 신선도가 아니라 양사 관계의 협상 타이밍 문제였다는 정황이 짙다. 실제로 같은 시기 삼성디스플레이·BOE 사이의 다른 소송 3건도 같은 열흘 사이에 함께 취하됐다. 개별 소송을 따로 읽으면 "누가 이겼나"를 묻게 되지만, 나란히 놓고 보면 "언제 합의가 끝났는가" 하나의 질문으로 수렴한다. 다음 편에서는 이번에 특허 번호가 공개되지 않은 삼성디스플레이의 반대쪽 소송(2:25-cv-00412, BOE 패널이 쓰인 Nubia·RedMagic 겨냥)을 원문으로 확인해볼 만하다.

<dl class="term-list">
  <div><dt>검색식</dt><dd>공개 보도 인용 특허번호 4건을 구글특허 원문으로 개별 대조, assignee 필드 직접 확인(B-0 규칙)</dd></div>
  <div><dt>기준일</dt><dd>우선일(priority date) 및 소송 제소일·종결일 기준, 2018~2025년</dd></div>
  <div><dt>데이터 확보일</dt><dd>2026-08-14</dd></div>
  <div><dt>분류 규칙</dt><dd>레버(화소구조 vs 배선구조) × 특허, 계속출원 관계는 서지사항으로 확인</dd></div>
</dl>

*본 분석은 공개 특허 공보 및 공개 보도·법원 공개기록에 기반한 정리이며 각 회사·소송 당사자의 공식 입장이 아니다. 침해·무효에 대한 자체 판단은 하지 않는다.*

## 7. 부록: 특허·소송 스펙 전체

<div class="tbl-wrap">

| 구분 | 번호 | 상태 | 우선일/제소일 | 비고 |
|---|---|---|---|---|
| BOE① | US11037994B2 | 등록 | 2018-08-29 | 투과영역 화소배치 |
| BOE② | US12266309B2 | 등록 | 2018-06-20 | 화소밀도 차등화(BOE③과 형제출원) |
| BOE③ | US12307976B2 | 등록 | 2018-06-20 | 화소밀도 차등화(BOE②와 형제출원) |
| BOE④ | US11695017B2 | 등록 | 2018-10-11 | 배선 게더링+차광, PCT경로 |
| 소송(본건) | 2:25-cv-00715 | 종결(화해) | 2025-07-15 제소 → 2025-11-21 종결 | BOE→삼성디스플레이, 텍사스동부지법 |
| 병행소송① | 2:23-cv-00309 | 종결(자진취하) | 2023-06-26 제소 → 2025-06-04 종결 | 삼성디스플레이→BOE, 특허 |
| 병행소송② | 2:25-cv-00325 | 종결(화해) | 2025-04-01 제소 → 2025-11-25 종결 | 삼성디스플레이→BOE, 영업비밀 |
| 병행소송③ | 2:25-cv-00412 | 종결(화해 추정) | 2025-04-17 제소 → 2025-12-02 종결 | 삼성디스플레이→BOE, 특허(Nubia·RedMagic) |

</div>
