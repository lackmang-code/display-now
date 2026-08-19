---
title: "레이턴-삼성 폴더블 힌지 특허소송 분석"
summary: "레이턴 컴퓨팅의 폴더블 힌지 소송을 언론은 '타이밍 문제'로 요약했지만, 특허 원문의 우선일을 따져보면 얘기가 다릅니다. 레이턴의 개념 특허는 삼성보다 4년 앞섰는데, 정작 힌지 구조 특허는 삼성·레노버보다 6년 늦었습니다. 폴더블 힌지 IP 리스크를 검토하는 담당자가 참고할 우선일 분석입니다."
section: patent
reporter: CLAIM
publishedAt: 2026-08-14
readingMinutes: 14
tags: [특허소송, 레이턴컴퓨팅, 삼성전자, 레노버, 폴더블힌지]
sources:
  - type: patent
    title: "Flexible and rigid touch screen display computing devices (US11,106,242, Lepton Computing LLC, 2021-08-31 등록)"
    url: "https://patents.google.com/patent/US11106242B2/en"
  - type: patent
    title: "Hinge device and foldable display apparatus having the same (US9,250,733, Samsung Electronics Co., Ltd., 2016-02-02 등록)"
    url: "https://patents.google.com/patent/US9250733B2/en"
  - type: patent
    title: "Double-shaft hinge and electronic device (US9,611,680, Lenovo (Beijing) Co., Ltd., 2017-04-04 등록)"
    url: "https://patents.google.com/patent/US9611680B2/en"
  - type: patent
    title: "Hinge mechanism having plate stops for a flexible display device (US11,614,779, Lepton Computing LLC, 2023-03-28 등록)"
    url: "https://patents.google.com/patent/US11614779B2/en"
  - type: disclosure
    title: "Lepton Computing LLC v. Samsung Electronics, Co., Ltd. et al (2:26-cv-00338) (PacerMonitor)"
    url: "https://www.pacermonitor.com/public/case/64287656/Lepton_Computing_LLC_v_Samsung_Electronics,_Co,_Ltd_et_al"
  - type: article
    title: "Samsung foldables hit with lawsuit by an apparent patent troll (9to5Google)"
    url: "https://9to5google.com/2026/04/27/samsung-foldable-lawsuit-lepton/"
featured: false
paywallAfter: 0
---

<p class="lede">2026년 4월 23일, 레이턴 컴퓨팅이라는 미국 회사가 삼성전자를 텍사스동부지법에 제소했다. 갤럭시Z폴드·플립·트라이폴드 전 라인이 자사 특허 9건을 침해했다며 판매금지를 요구했다. 여러 매체가 "레이턴의 가장 오래된 특허 등록일이 삼성 첫 폴드 출시보다 늦다"는 시간차를 지적하며 소송의 신빙성에 의문을 던졌다. 그런데 등록일이 아니라 우선일로, 그것도 레이턴이 가진 특허 전부를 따로 열어보면 이야기가 갈라진다. 절반은 정말 늦었고, 절반은 놀랍도록 이르다.</p>

## 1. 개요

### 1.1 분석 배경 및 목적

특허 소송에서 "누가 먼저인가"는 등록일이 아니라 우선일(priority date)로 따진다. 언론 보도는 대개 등록일 하나만 인용해 "타이밍 문제"라는 단순한 결론을 낸다. CLAIM은 그 결론이 실제 특허 원문과 맞는지, 레이턴이 보유한 특허 전부를 우선일순으로 직접 확인한다.

### 1.2 분석 범위

기간은 두지 않았다. 레이턴의 특허 포트폴리오 자체가 언제부터 시작됐는지 확인하는 게 이번 조사의 핵심이었기 때문이다. 우선일 기준 2010년부터 2026년 소송 제기까지를 대상으로 한다. 대상은 레이턴 컴퓨팅(2건) · 삼성전자(1건) · 레노버 베이징(1건), 그리고 소송 사건기록 1건.

### 1.3 데이터 소스 및 검색식

<div class="tbl-wrap">

| 항목 | 내용 |
|---|---|
| 데이터 소스 | 구글특허(patents.google.com) + 소송 관련 사실은 공개 보도(9to5google·BGR·PacerMonitor 등)로 교차확인 |
| 검색 방식 | 먼저 소송 당사자(레이턴 컴퓨팅) 특허 전부를 `assignee:(Lepton Computing)`로 조회해 우선일순 정렬. "물방울힌지" 같은 마케팅 용어의 정확한 구문 검색은 전부 무관한 결과만 나와 폐기 |
| 정렬 기준 | **오래된 순(sort=old)**으로 레이턴 포트폴리오의 실제 최초 우선일부터 확인 |
| 교차 검증 | 중국계 회사(레노버 베이징)가 삼성보다 먼저였을 가능성도 별도 확인. 이번 건에서는 삼성이 7개월 앞섰음을 원문으로 확인 |
| 한계 | PACER(미국 연방법원 전자기록)는 유료라 소송장에 실제 첨부된 9개 특허 번호 전체는 확인하지 못했다. 확인된 레이턴 특허(2건)만 원문 근거로 쓴다 |

</div>

### 1.4 기술분류체계

레이턴의 특허를 "특허 유형" 하나의 축으로 나눈다. 재구성 가능한 세그먼트 디스플레이라는 **넓은 개념 특허**와, 실제 접히는 힌지의 물리적 구조를 청구하는 **힌지 구조 특허**. 이 둘을 구분하지 않고 "레이턴 특허"로 뭉뚱그리면 타이밍 논쟁이 부정확해진다.

## 2. 정량 스케치

전수조사가 아니라 소송 당사자의 핵심 특허를 우선일·유형·격차 세 방식으로 배치해 확인한다.

### 2.1 기술 로드맵: 우선일 기준

<div class="viz-box">
  <div class="viz-title">PRIORITY DATE TIMELINE · 2010–2026</div>
  <svg viewBox="0 0 1080 220" width="100%" role="img" aria-label="Timeline of hinge-related patents and lawsuit, 2010 to 2026">
<line x1="40" y1="120" x2="1040" y2="120" stroke="#c9c9c4" stroke-width="2"/>
<line x1="40.0" y1="116" x2="40.0" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="40.0" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2009</text>
<line x1="95.6" y1="116" x2="95.6" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="95.6" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2010</text>
<line x1="151.1" y1="116" x2="151.1" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="151.1" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2011</text>
<line x1="206.7" y1="116" x2="206.7" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="206.7" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2012</text>
<line x1="262.2" y1="116" x2="262.2" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="262.2" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2013</text>
<line x1="317.8" y1="116" x2="317.8" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="317.8" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2014</text>
<line x1="373.3" y1="116" x2="373.3" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="373.3" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2015</text>
<line x1="428.9" y1="116" x2="428.9" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="428.9" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2016</text>
<line x1="484.4" y1="116" x2="484.4" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="484.4" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2017</text>
<line x1="540.0" y1="116" x2="540.0" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="540.0" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2018</text>
<line x1="595.6" y1="116" x2="595.6" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="595.6" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2019</text>
<line x1="651.1" y1="116" x2="651.1" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="651.1" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2020</text>
<line x1="706.7" y1="116" x2="706.7" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="706.7" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2021</text>
<line x1="762.2" y1="116" x2="762.2" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="762.2" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2022</text>
<line x1="817.8" y1="116" x2="817.8" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="817.8" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2023</text>
<line x1="873.3" y1="116" x2="873.3" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="873.3" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2024</text>
<line x1="928.9" y1="116" x2="928.9" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="928.9" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2025</text>
<line x1="984.4" y1="116" x2="984.4" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="984.4" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2026</text>
<line x1="1040.0" y1="116" x2="1040.0" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="1040.0" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2027</text>
<line x1="632.6" y1="64" x2="632.6" y2="176" stroke="#b8391f" stroke-width="1.2" stroke-dasharray="4,3"/>
<text x="632.6" y="58" font-size="10.5" fill="#b8391f" text-anchor="middle" class="mono">갤럭시Z폴드 출시 2019-09</text>
<line x1="128.0" y1="120" x2="128.0" y2="94.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="128.0" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="128.0" y="74" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">레이턴(개념)</text>
<text x="128.0" y="88" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">재구성형 세그먼트 디스플레이</text>
<line x1="322.4" y1="120" x2="322.4" y2="146.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="322.4" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="322.4" y="164" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">삼성전자</text>
<text x="322.4" y="178" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">수용공간 힌지 · 피인용 305</text>
<line x1="354.8" y1="120" x2="354.8" y2="94.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="354.8" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="354.8" y="74" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">레노버 베이징</text>
<text x="354.8" y="88" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">이중축 힌지</text>
<line x1="660.4" y1="120" x2="660.4" y2="146.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="660.4" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="660.4" y="164" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">레이턴(힌지)</text>
<text x="660.4" y="178" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">플레이트스톱 힌지</text>
<line x1="998.3" y1="120" x2="998.3" y2="94.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="998.3" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="998.3" y="74" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">소송 제기</text>
<text x="998.3" y="88" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">레이턴 v. 삼성 (2:26-cv-00338)</text>
</svg>
</div>

레이턴의 개념 특허(2010)가 맨 왼쪽에 있다. 그런데 삼성(2014-02)·레노버(2014-09) 힌지 특허를 거쳐 6년이 지난 뒤에야 레이턴 자신의 힌지 구조 특허(2020-03)가 나온다. 점선으로 표시한 삼성 첫 폴드 출시(2019-09)조차 레이턴의 힌지 특허보다 6개월 이르다. 소송(2026-04)은 이 모든 특허가 이미 존재한 뒤에 제기됐다.

### 2.2 특허유형 × 회사 매트릭스

<div class="viz-box">
  <div class="viz-title">CONCEPT PATENT vs HINGE-STRUCTURE PATENT, BY COMPANY</div>
  <div class="matrix-grid" style="grid-template-columns: 110px repeat(2, 1fr);">
    <div class="corner"></div>
    <div class="col-head">개념 특허</div>
    <div class="col-head">힌지 구조 특허</div>
    <div class="row-head">레이턴</div>
    <div class="cell"><span class="matrix-chip">2010-08 · 재구성형 세그먼트 디스플레이</span></div>
    <div class="cell"><span class="matrix-chip alt">2020-03 · 플레이트스톱 힌지</span></div>
    <div class="row-head">삼성전자</div>
    <div class="cell empty">·</div>
    <div class="cell"><span class="matrix-chip">2014-02 · 수용공간 힌지(피인용 305)</span></div>
    <div class="row-head">레노버 베이징</div>
    <div class="cell empty">·</div>
    <div class="cell"><span class="matrix-chip">2014-09 · 이중축 힌지</span></div>
  </div>
</div>

"개념 특허" 열에는 레이턴만 있다. 여기서는 레이턴이 정말 원조다. 그런데 실제 소송의 핵심인 "힌지 구조 특허" 열을 보면 순서가 뒤집힌다. 삼성(2014-02)과 레노버(2014-09)가 레이턴(2020-03)보다 6년 앞선다. 레이턴이 "원조"라고 주장할 수 있는 범위와, 소송이 실제로 겨누는 범위가 다르다는 뜻이다.

### 2.3 우선일 격차: 핵심 사건 사이의 시간

<div class="viz-box">
  <div class="viz-title">YEARS BETWEEN KEY DATES</div>
  <svg viewBox="0 0 1080 220" width="100%" role="img" aria-label="Gaps in years between key priority dates and events">
<line x1="230.0" y1="22" x2="230.0" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="230.0" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2010</text>
<line x1="328.2" y1="22" x2="328.2" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="328.2" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2012</text>
<line x1="426.4" y1="22" x2="426.4" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="426.4" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2014</text>
<line x1="524.5" y1="22" x2="524.5" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="524.5" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2016</text>
<line x1="622.7" y1="22" x2="622.7" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="622.7" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2018</text>
<line x1="720.9" y1="22" x2="720.9" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="720.9" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2020</text>
<line x1="819.1" y1="22" x2="819.1" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="819.1" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2022</text>
<line x1="917.3" y1="22" x2="917.3" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="917.3" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2024</text>
<line x1="1015.5" y1="22" x2="1015.5" y2="198" stroke="#e4e4de" stroke-width="1"/>
<text x="1015.5" y="216" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2026</text>
<text x="216" y="46.0" font-size="12" font-weight="700" fill="#12120e" text-anchor="end">레이턴(개념) → 삼성 힌지</text>
<rect x="258.6" y="30" width="171.8" height="24" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="344.5" y="46.0" font-size="11" fill="#12120e" text-anchor="middle" class="mono">약 3.5년</text>
<text x="216" y="88.0" font-size="12" font-weight="700" fill="#12120e" text-anchor="end">삼성 힌지 → 레이턴(힌지)</text>
<rect x="430.5" y="72" width="298.6" height="24" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="579.8" y="88.0" font-size="11" fill="#12120e" text-anchor="middle" class="mono">약 6.1년</text>
<text x="216" y="130.0" font-size="12" font-weight="700" fill="#12120e" text-anchor="end">삼성 폴드 출시 → 레이턴(힌지)</text>
<rect x="704.5" y="114" width="24.5" height="24" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="716.8" y="130.0" font-size="11" fill="#12120e" text-anchor="middle" class="mono">약 0.5년</text>
<text x="216" y="172.0" font-size="12" font-weight="700" fill="#12120e" text-anchor="end">레이턴(힌지) → 소송 제기</text>
<rect x="729.1" y="156" width="298.6" height="24" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="878.4" y="172.0" font-size="11" fill="#12120e" text-anchor="middle" class="mono">약 6.1년</text>
</svg>
</div>

레이턴의 개념 특허부터 삼성의 힌지 특허까지 4년, 삼성의 힌지 특허부터 레이턴의 힌지 특허까지 6년, 삼성 제품 출시부터 레이턴의 힌지 특허까지도 6개월, 그리고 그 모든 것으로부터 소송 제기까지 다시 여러 해가 걸렸다. "레이턴이 삼성보다 늦었다"는 언론 보도는 이 세 번째 구간(삼성 힌지 vs 레이턴 힌지)에는 맞고, 개념 특허 구간에는 틀리다.

## 3. 정성 분석: 특허 4건 + 소송 1건

연대순으로 배열했다. 청구항 1 전문(요지)과 명세서가 스스로 밝힌 종래기술 문제, 수치 한정을 그대로 인용한다.

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">레이턴 컴퓨팅 (개념)</span>
    <span class="num">US11106242B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Flexible and rigid touch screen display computing devices

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>터치스크린 디스플레이가 여러 세그먼트로 구성되고 유연한 회로로 연결되어, 콤팩트한 상태(휴대폰 크기)에서 확장된 상태(태블릿 크기)로 재구성 가능한 컴퓨팅 장치.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>"작은 터치스크린 장치와의 물리적 상호작용이 어렵다." 선택·조작·텍스트 입력이 부정확해지고, 제한된 화면 크기로 열람 용량이 줄어드는 문제.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">최초 우선일</span><span class="v">2010-08-10 (임시출원 US 61/372,391)</span></div><div class="num-cell"><span class="k">출원일</span><span class="v">2019-02-19</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2021-08-31</span></div><div class="num-cell"><span class="k">세그먼트 크기</span><span class="v">4.3인치, 854×480, 16:9</span></div><div class="num-cell"><span class="k">세그먼트 수</span><span class="v">4개 또는 8개</span></div><div class="num-cell"><span class="k">유연회로 커넥터</span><span class="v">최소 0.90mm 두께</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);"><strong>2010년 임시출원에서 시작해 여러 건의 계속출원(continuation)으로 이어지는 패밀리다.</strong> 힌지의 물리적 구조가 아니라 "세그먼트 디스플레이를 재구성한다"는 넓은 개념을 청구한다. 특정 힌지 메커니즘과는 다른 층위의 특허임에 주의.</div>
<div class="no-fig-note">특정 힌지 구조를 도해하는 도면보다는 회로·세그먼트 배치도 위주로, 이번 세션에서 확보하지 못했다.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">삼성전자</span>
    <span class="num">US9250733B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Hinge device and foldable display apparatus having the same

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>플렉시블 디스플레이 패널의 좌우를 지지하는 제1·제2 몸체와, 이를 접이식으로 연결하는 힌지 부재, 그리고 접힌 부분이 곡률을 형성하도록 스윙하며 수용공간을 만드는 제1·제2 지지부로 구성된 힌지 장치.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>접힌 부분(폴딩부)이 수용공간 상단에 위치해 배면이 지지되지 않는 상태가 되고, 그 결과 터치 입력 시 디스플레이가 밀려 정확한 터치가 어려워지는 문제.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">우선일</span><span class="v">2014-02-17</span></div><div class="num-cell"><span class="k">출원일</span><span class="v">2014-08-18</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2016-02-02</span></div><div class="num-cell"><span class="k">피인용</span><span class="v">305건</span></div><div class="num-cell"><span class="k">패밀리</span><span class="v">US, KR</span></div><div class="num-cell"><span class="k">펼침 각도</span><span class="v">180도(직선 각)</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">후속 특허 305건에 인용된, 이번 조사에서 확인한 것 중 가장 많이 참조되는 힌지 특허다.</div>

<div class="fig-frame">
  <img src="/articles/2026-08-14-lepton-samsung-hinge-lawsuit/2026-08-14-lepton-samsung-hinge-lawsuit-fig1.png" alt="삼성전자 힌지 수용공간 구조 단면도" />
  <div class="fig-cap">FIG. 5 (US9250733B2): 힌지축(210)과 기어(510, 530)가 맞물려 접힘부 아래 수용공간(400)을 만드는 단면 구조. 원문 도면.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">레노버 베이징</span>
    <span class="num">US9611680B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Double-shaft hinge and electronic device

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>서로 평행한 제1·제2 회전축과 전달장치로 구성된 이중축 힌지로, 전달장치는 각 축에 고정된 제1·제2 전달부재와 그 사이에서 양쪽에 맞물리는 제3 전달부재를 포함한다.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>명세서는 구체적 문제점보다 기존 방식이 "더 적은 선택지"를 제공한다고만 언급. 삼성 특허만큼 문제의식이 상세히 서술되지 않음.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">우선일</span><span class="v">2014-09-03</span></div><div class="num-cell"><span class="k">출원일</span><span class="v">2015-03-26</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2017-04-04</span></div><div class="num-cell"><span class="k">패밀리</span><span class="v">US, CN, DE</span></div><div class="num-cell"><span class="k">수치 한정</span><span class="v">명시적 수치 없음(상대적 위치관계만 기재)</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">삼성(2014-02)보다 7개월 늦지만, 청구 구조가 근본적으로 다르다(지지공간 vs 맞물림 전달). 같은 시기 독립적으로 개발됐을 가능성.</div>

<div class="fig-frame">
  <img src="/articles/2026-08-14-lepton-samsung-hinge-lawsuit/2026-08-14-lepton-samsung-hinge-lawsuit-fig2.png" alt="레노버 베이징 이중축 힌지 분해도" />
  <div class="fig-cap">FIG. 2 (US9611680B2): 두 개의 평행한 회전축(1, 2)과 베벨기어(31, 32, 33), 캠 와셔 스택(11, 12, 13, 20)으로 구성된 이중축 힌지 분해 사시도. 원문 도면.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">레이턴 컴퓨팅 (힌지)</span>
    <span class="num">US11614779B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Hinge mechanism having plate stops for a flexible display device

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>플렉시블 터치 디스플레이의 제1·제2 컴포넌트와, 적어도 하나의 플레이트가 뻗어나온 힌지 슬리브 구조를 포함하며, 구조적 지지부와 결합된 제1·제2 플레이트가 힌지 슬리브 플레이트에 대해 회전할 때 정지되는 힌지 메커니즘.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>플렉시블 디스플레이는 접힐 때 곡률반경을 가지므로 두께를 희생하지 않고 접힌 세그먼트를 구성하기 어렵고, 디스플레이의 곡률 한계를 넘는 둔각으로 접히지 않도록 구조적 힌지 지지가 필요하다는 문제.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">우선일</span><span class="v">2020-03-25</span></div><div class="num-cell"><span class="k">출원일</span><span class="v">2021-03-25</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2023-03-28</span></div><div class="num-cell"><span class="k">계속출원</span><span class="v">US12124301B2(2024-10-22 등록)</span></div><div class="num-cell"><span class="k">완전 폴딩 각도</span><span class="v">10도 미만</span></div><div class="num-cell"><span class="k">완전 확장 각도</span><span class="v">170~190도</span></div><div class="num-cell"><span class="k">폴딩 중 최대 각도</span><span class="v">90도 제한</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);"><strong>이 특허의 우선일(2020-03-25)은 삼성 갤럭시Z폴드 출시(2019-09)보다 6개월 늦고, 삼성의 힌지 특허(2014-02)보다는 6년 늦다.</strong> 레이턴의 특허 중 실제 힌지 구조에 가장 가까운 이 특허가, 소송에서 다투는 시기적으로 가장 불리한 지점이다.</div>
<div class="no-fig-note">이 특허의 원문 도면은 이번 세션에서 확보하지 못했다.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">소송</span>
    <span class="num">2:26-cv-00338 <span class="tag">계속 중(2026-08-14 기준)</span></span>
  </div>
  <div class="patent-card-body">

#### 사건명

Lepton Computing LLC v. Samsung Electronics, Co., Ltd. et al

#### 소장 요지

<div class="quote-box"><p>텍사스동부지법에 접수된 특허침해소송. 갤럭시Z폴드·플립·트라이폴드가 유연 디스플레이·힌지 메커니즘·UI 전환 등과 관련된 특허 9건을 침해했다고 주장.</p></div>

#### 레이턴이 스스로 밝힌 배경

<div class="quote-box"><p>레이턴은 스스로를 "폴더블폰의 원조 개발자"로 칭하며 2008년까지 거슬러 올라가는 개념·시제품이 있다고 주장한다(실제로 상용 스마트폰을 출시한 적은 없음).</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">제소일</span><span class="v">2026-04-23</span></div><div class="num-cell"><span class="k">법원</span><span class="v">미국 텍사스동부지법</span></div><div class="num-cell"><span class="k">관할 근거</span><span class="v">삼성전자아메리카 플레이노 캠퍼스</span></div><div class="num-cell"><span class="k">청구 취지</span><span class="v">손해배상·로열티·판매금지</span></div><div class="num-cell"><span class="k">대상 특허</span><span class="v">9건(구체적 번호는 PACER 유료 열람 필요, 미확인)</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);"><strong>확인 안 된 부분을 명확히 한다.</strong> 이 소송이 실제로 겨누는 9건의 특허 번호는 확인하지 못했다. 위 두 레이턴 특허(개념·힌지)는 레이턴의 전체 특허 목록에서 우선일 기준 대표성 있는 두 건을 고른 것으로, 소장에 첨부된 9건과 100% 일치한다고 단정하지 않는다.</div>
<div class="no-fig-note">법원 소장 자체는 이미지가 아니라 텍스트 문서이며, PACER 접근 제한으로 원문을 확인하지 못했다.</div>

  </div>
</div>

## 4. 비교분석

### 4.1 레이턴의 두 물결: 2010년과 2020년은 다른 이야기다

레이턴 컴퓨팅의 특허를 우선일순으로 늘어놓으면 뚜렷한 두 물결이 보인다. 첫 물결은 2010년 8월, 임시출원(US 61/372,391)에서 시작해 여러 건의 계속출원을 거쳐 지금도 이어지는 **"재구성형 세그먼트 디스플레이"** 개념이다. 4.3인치 세그먼트 4개 또는 8개를 유연 회로로 연결해 휴대폰 크기에서 태블릿 크기로 재구성한다는 내용으로, 특정 힌지 구조를 청구하지 않는다.

두 번째 물결은 2020년 3월, **"플레이트스톱이 있는 힌지 메커니즘"**이다. 완전히 접힌 상태 10도 미만, 완전히 펼친 상태 170\~190도로 접히는 각도 범위를 규정하고, 힌지 슬리브에서 뻗어나온 플레이트가 회전을 막아서는 구조를 청구한다. 이게 실제로 삼성의 물리적 힌지와 비교될 만한 특허다. 그런데 이 특허의 우선일(2020-03-25)은 삼성 갤럭시Z폴드 출시(2019-09)보다도 6개월 늦다.

즉 "레이턴이 원조"라는 주장이 성립하려면 어느 물결을 말하는지부터 밝혀야 한다. 넓은 개념이라면 맞다. 힌지 그 자체라면, 적어도 이번에 확인한 삼성·레노버 특허보다는 늦다.

### 4.2 삼성 vs 레노버: 7개월 차이로 갈린 2014년의 경쟁

2014년 2월, 삼성전자는 두 개의 몸체가 접히는 부분에 "수용공간(accommodation space)"을 만들어 접힌 디스플레이 패널이 눌리지 않도록 지지하는 힌지 구조를 출원했다. 이 특허(US9250733B2)는 지금까지 305건의 후속 특허에 인용됐다. 업계 전반이 참조하는 기초 특허라는 뜻이다.

같은 해 9월, 레노버 베이징은 다른 접근을 냈다. 평행한 두 회전축 사이에 전달부재를 두어 맞물려 돌아가게 하는 "이중축 힌지"(US9611680B2)다. 삼성이 접힌 부분을 **지지하는 공간**을 청구한 반면, 레노버는 두 축이 **맞물려 도는 전달 구조** 자체를 청구했다. 같은 시기, 같은 문제, 다른 메커니즘.

7개월이라는 격차가 "삼성이 레노버에 영향을 줬다"는 뜻은 아니다. 두 청구항의 구조가 근본적으로 다르다는 점에서 독립적으로 개발됐을 가능성이 있다. 다만 확인하지 않았다.

### 4.3 소송: 무엇을 겨누고 있는가

2026년 4월 23일 접수된 소송(Lepton Computing LLC v. Samsung Electronics Co., Ltd. et al, 사건번호 2:26-cv-00338, 텍사스동부지법)은 레이턴이 스스로를 "폴더블폰의 원조 개발자"라 칭하며 2008년까지 거슬러 올라가는 개념과 시제품이 있었다고 주장한다. 소장은 갤럭시Z폴드·플립·트라이폴드 전 라인이 유연 디스플레이·힌지 메커니즘·UI 전환 관련 특허 9건을 침해했다고 주장하며 판매금지를 요구한다.

확인할 수 있었던 두 특허를 근거로 보면, 이 소송이 "개념" 쪽 특허(2010)에 기댄다면 시간상 유리하고, "힌지 구조" 쪽 특허(2020)에 기댄다면 불리하다. 소장에 첨부된 9건 각각이 어느 쪽인지는 법원 기록(PACER, 유료)에만 있어 이번 조사로는 확인하지 못했다. 그래서 이 기사는 "레이턴이 이긴다/진다"는 판단을 내리지 않는다.

## 5. 반증 및 한계

**확인한 2건이 소송에 실제로 첨부된 9건과 같다고 단정하지 않는다.** 레이턴의 구글특허 assignee 목록에서 우선일이 가장 이른 것(2010)과 힌지에 가장 가까운 것(2020)을 골랐을 뿐, 소장의 실제 청구 특허 목록(PACER 유료)은 확인하지 못했다.

**우선일 우위를 곧 특허 유효성의 우위로 읽지 않는다.** 2010년 특허가 더 이르다고 해서 그 청구항이 삼성의 힌지 구조를 실제로 포괄하는지는 별개 문제다. 이건 법원이 판단할 몫이다.

**삼성-레노버 사이의 시간차를 인과관계로 읽지 않는다.** 7개월 먼저 냈다고 해서 삼성이 레노버에 영향을 줬다는 근거는 없다. 청구항 구조 자체가 다르다.

**도구가 붙여주는 해설을 검증 없이 쓰지 않는다.** 웹검색 결과가 언급한 화웨이의 CN217847335U를 실제로 열어보니 라벨 포장재 특허였다. 완전히 무관했다. 이 건은 기사에서 제외했다. 확인 없이 인용했다면 존재하지 않는 화웨이 특허를 실제 근거처럼 실었을 것이다.

**도면 확보의 한계.** 삼성 특허(17개 도면 존재 확인)의 원문 도면은 이번 세션에서 구글특허 뷰어 접속이 불안정해 확보하지 못했다. 확인되지 않은 것은 "없다"고 단정하지 않고 그대로 밝힌다.

## 6. 결론 및 시사점

"타이밍 문제"라는 언론의 한 줄 요약은 절반만 맞았다. 레이턴의 힌지 구조 특허(2020)는 확실히 삼성(2014)·레노버(2014)보다 늦다. 그런데 레이턴의 더 넓은 개념 특허(2010)는 그 누구보다도 이르다. 소송의 승패는 소장이 실제로 어느 특허를, 어떤 청구항으로 겨누고 있는지에 달려 있고, 이건 CLAIM이 판단할 문제가 아니라 법원이 판단할 문제다. 다만 "언론이 인용한 등록일 하나로 소송 전체를 재단할 수 없다"는 건 이번 조사로 확인됐다. 다음 편에서는 PACER를 통해 실제 소장에 첨부된 9건의 특허 목록을 확보해, 이 검증을 완성해볼 만하다.

<dl class="term-list">
  <div><dt>검색식</dt><dd>assignee:(Lepton Computing), sort=old, 레이턴 포트폴리오 전체를 우선일순 확인. 삼성·레노버는 개별 특허번호 직접 대조</dd></div>
  <div><dt>기준일</dt><dd>우선일(priority date) 기준, 2010~2026년</dd></div>
  <div><dt>데이터 확보일</dt><dd>2026-08-14</dd></div>
  <div><dt>분류 규칙</dt><dd>특허유형(개념 특허 vs 힌지 구조 특허) × 회사</dd></div>
</dl>

*본 분석은 공개 특허 공보 및 공개 보도에 기반한 정리이며 각 회사·소송 당사자의 공식 입장이 아니다. 침해·무효에 대한 자체 판단은 하지 않는다.*

## 7. 부록: 특허 스펙 전체

<div class="tbl-wrap">

| 회사 | 특허번호 | 상태 | 우선일 | 패밀리 |
|---|---|---|---|---|
| 레이턴 컴퓨팅(개념) | US11106242B2 | 등록 | 2010-08-10 | US(다수 계속출원), WO |
| 삼성전자 | US9250733B2 | 등록(피인용 305) | 2014-02-17 | US, KR |
| 레노버 베이징 | US9611680B2 | 등록 | 2014-09-03 | US, CN, DE |
| 레이턴 컴퓨팅(힌지) | US11614779B2 | 등록 | 2020-03-25 | US(계속출원 US12124301B2), WO |
| 소송 | 2:26-cv-00338 | 계속 중 | 제소 2026-04-23 | 텍사스동부지법 |

</div>
