---
title: "UTG(폴더블 커버글라스) 특허 분석"
summary: "코닝이 2014년 등록한 접히는 유리 특허를 Schott가 이의신청으로 걸었고, 유럽특허청은 취소로 답했다. 그해부터 2024년 도우인시스까지, 폴더블 유리 특허 일곱 건을 우선일 순서대로 원문 청구항까지 열어봤다."
section: patent
reporter: CLAIM
publishedAt: 2026-08-14
readingMinutes: 16
tags: [특허소송, UTG, 폴더블유리, 코닝, Schott, 삼성디스플레이, 도우인시스]
sources:
  - type: patent
    title: "Bendable glass stack assemblies, articles and methods of making the same (EP3099642B1, Corning Inc, 2018-03-21 등록 → 취소)"
    url: "https://patents.google.com/patent/EP3099642B1/en"
  - type: disclosure
    title: "JUVE Patent — Corning and Schott battle over flexible glass handset displays"
    url: "https://www.juve-patent.com/cases/corning-and-schott-battle-over-flexible-glass-handset-displays/"
  - type: patent
    title: "Long-term bendable glass material and method for producing a long-term bendable glass material (US12130278B2, Schott AG, 등록)"
    url: "https://patents.google.com/patent/US12130278B2/en"
  - type: patent
    title: "유리 기판, 이의 제조 방법, 및 이를 포함하는 표시 장치 (KR102810405B1, 삼성디스플레이, 2025-05-22 등록)"
    url: "https://patents.google.com/patent/KR102810405B1/en"
  - type: patent
    title: "Ultrathin glass ceramic article and method for producing an ultrathin glass ceramic article (US20250002398A1, Schott Glass Technologies (Suzhou) Co. Ltd., 출원중)"
    url: "https://patents.google.com/patent/US20250002398A1/en"
  - type: patent
    title: "Glass article, display device including the glass article, and method of manufacturing the glass article (US20250346523A1, Samsung Display Co., Ltd., 출원중)"
    url: "https://patents.google.com/patent/US20250346523A1/en"
  - type: patent
    title: "Glass strengthening molten salt and glass strengthening method using the same (US20250353786A1, Samsung Display Co., Ltd., 출원중)"
    url: "https://patents.google.com/patent/US20250353786A1/en"
  - type: patent
    title: "글라스의 폴딩 영역을 보이지 않게 부분 식각하는 방법 (KR102714616B1, 주식회사 도우인시스, 등록)"
    url: "https://patents.google.com/patent/KR102714616B1/en"
featured: false
paywallAfter: 0
---

<p class="lede">2014년, 코닝은 접히는 유리를 스택으로 쌓아 올리는 특허를 등록했다. Schott는 그 특허가 실제로 재현 가능한지 유럽특허청(EPO)에 문제를 제기했다. 심판부는 두 건을 취소했고 한 건은 심리가 남아 있었다. 코닝은 항소권을 보유한다. 이건 추정이나 서사가 아니라 공개된 EPO 사건 기록이다. 이 소송을 시작점으로 삼아, 2014년 코닝부터 2024년 도우인시스까지 폴더블 유리 특허 일곱 건을 우선일 순서로 전부 열어봤다.</p>

## 1. 개요

### 1.1 분석 배경 및 목적

폴더블 디스플레이의 커버유리는 "얇을수록 잘 접히지만 얇을수록 잘 깨진다"는 모순을 안고 있다. 이 모순을 실제로 어떻게 풀고 있는지, 등록·공개 특허 원문을 근거로 확인한다. 목적은 예측이 아니라 확인이다. 회사가 실제로 특허 명세서에 뭐라고 썼는지를 그대로 옮긴다.

### 1.2 분석 범위

기간은 두지 않았다. 폴더블 유리라는 기술 자체가 실제로 언제부터 특허화됐는지를 확인하는 게 이번 분석의 핵심 과제 중 하나였기 때문이다. 우선일 기준 2014년부터 2024년까지, 10년에 걸친 일곱 건을 대상으로 한다. 대상 기업은 코닝·Schott(2건)·삼성디스플레이(3건)·도우인시스.

### 1.3 데이터 소스 및 검색식

<div class="tbl-wrap">

| 항목 | 내용 |
|---|---|
| 데이터 소스 | 구글특허(patents.google.com) 단일 소스. KIPRIS 등 유료 등록원부는 미확보 |
| 검색 방식 | 정확한 구문 검색 `"foldable glass substrate"` · `"bendable glass"`. 넓은 키워드("ultra-thin glass" 등)는 관련 없는 결과가 섞여 폐기 |
| 정렬 기준 | **오래된 순(sort=old)** 우선 확인 후 최신 방향으로 보완. 최신순만 쓰면 오래된 회사의 원조 특허를 놓친다는 걸 이전 시도에서 확인했다 |
| 선정 방식 | 정확한 구문이 실제 폴더블 디스플레이 맥락에서 쓰였는지 원문 대조 후, B-1 지표(패밀리 국가수·등록여부·포기소멸·분할계속출원)로 대표성 확인 |
| 한계 | 전수조사가 아니라 7건 표본 분석. 청구항 수·발명자 수·패밀리 원건수는 지표로 쓰지 않음(계속출원·분할로 왜곡되는 사례 확인됨) |

</div>

### 1.4 기술분류체계

수집된 특허를 "무엇을 바꾸는가(레버)"와 "무엇을 노리는가(목적)" 두 축으로 분류했다. 레버는 구조(층·스택 배치) · 공정(강화 처리·물성 스펙) · 소재전환(유리 자체를 다른 재료로) 3가지, 목적은 강도(내충격) · 외관(폴딩 자국 시인성) 2가지로 나눈다.

## 2. 정량 스케치

전수조사가 아니므로 "몇 건"을 세는 정량분석 대신, 확보한 7건을 시간·레버·수치 세 방식으로 배치해 상대적 위치를 확인한다.

### 2.1 기술 로드맵 — 우선일 기준

<div class="viz-box">
  <div class="viz-title">PRIORITY DATE TIMELINE · 2014–2024</div>
  <svg viewBox="0 0 1080 220" width="100%" role="img" aria-label="Timeline of UTG patents by priority date, 2014 to 2024">
<line x1="40" y1="120" x2="1040" y2="120" stroke="#c9c9c4" stroke-width="2"/>
<line x1="40.0" y1="116" x2="40.0" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="40.0" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2014</text>
<line x1="130.9" y1="116" x2="130.9" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="130.9" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2015</text>
<line x1="221.8" y1="116" x2="221.8" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="221.8" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2016</text>
<line x1="312.7" y1="116" x2="312.7" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="312.7" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2017</text>
<line x1="403.6" y1="116" x2="403.6" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="403.6" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2018</text>
<line x1="494.5" y1="116" x2="494.5" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="494.5" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2019</text>
<line x1="585.5" y1="116" x2="585.5" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="585.5" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2020</text>
<line x1="676.4" y1="116" x2="676.4" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="676.4" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2021</text>
<line x1="767.3" y1="116" x2="767.3" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="767.3" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2022</text>
<line x1="858.2" y1="116" x2="858.2" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="858.2" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2023</text>
<line x1="949.1" y1="116" x2="949.1" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="949.1" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2024</text>
<line x1="1040.0" y1="116" x2="1040.0" y2="124" stroke="#c9c9c4" stroke-width="1"/>
<text x="1040.0" y="142" font-size="11" fill="#8a8a80" text-anchor="middle" class="mono">2025</text>
<line x1="40.0" y1="120" x2="40.0" y2="94.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="40.0" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="40.0" y="74" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">코닝</text>
<text x="40.0" y="88" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">스택 조립 · 등록 후 취소</text>
<line x1="199.1" y1="120" x2="199.1" y2="146.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="199.1" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="199.1" y="164" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">Schott①</text>
<text x="199.1" y="178" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">장기 굽힘 내구성 스펙</text>
<line x1="562.7" y1="120" x2="562.7" y2="94.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="562.7" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="562.7" y="74" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">삼성디스플레이①</text>
<text x="562.7" y="88" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">폴딩부 두께차 화학강화(원형)</text>
<line x1="471.8" y1="120" x2="471.8" y2="146.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="471.8" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="471.8" y="164" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">Schott②</text>
<text x="471.8" y="178" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">유리-세라믹 전환</text>
<line x1="623.3" y1="120" x2="623.3" y2="94.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="623.3" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="623.3" y="74" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">삼성디스플레이②</text>
<text x="623.3" y="88" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">Beilby층 구조</text>
<line x1="714.2" y1="120" x2="714.2" y2="146.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="714.2" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="714.2" y="164" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">삼성디스플레이③</text>
<text x="714.2" y="178" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">용융염 화학강화</text>
<line x1="964.2" y1="120" x2="964.2" y2="94.0" stroke="#4d4d45" stroke-width="1.2"/>
<circle cx="964.2" cy="120" r="5" fill="oklch(0.45 0.10 150)" stroke="#fdfdfc" stroke-width="1.5"/>
<text x="964.2" y="74" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="middle">도우인시스</text>
<text x="964.2" y="88" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">차등식각 정제(외관)</text>
<line x1="40.0" y1="120" x2="199.1" y2="120" stroke="oklch(0.45 0.10 150)" stroke-width="3" stroke-linecap="round"/>
<path d="M 562.7 120 Q 763.5 74 964.2 120" fill="none" stroke="#8a8a80" stroke-width="1" stroke-dasharray="3,3"/>
</svg>
</div>

진한 실선으로 이은 코닝(2014)–Schott①(2015) 구간이 실제 EPO 소송 당사자 쌍이다. 점선 곡선으로 이은 삼성디스플레이①(2019)–도우인시스(2024) 구간은 "폴딩부를 비폴딩부와 다르게 처리한다"는 같은 발상이 5년 뒤 다른 회사·다른 수단·다른 목적으로 재등장한 구간이다. 폴더블 유리 특허의 실제 첫 물결은 2026년이 아니라 2014~2015년에 이미 있었다.

### 2.2 레버 × 목적 매트릭스

<div class="viz-box">
  <div class="viz-title">WHAT THEY CHANGE × WHAT THEY WANT</div>
  <div class="matrix-grid" style="grid-template-columns: 90px repeat(3, 1fr);">
    <div class="corner"></div>
    <div class="col-head">구조</div>
    <div class="col-head">공정</div>
    <div class="col-head">소재전환</div>
    <div class="row-head">강도</div>
    <div class="cell"><span class="matrix-chip">코닝(2014) · 스택 조립</span><span class="matrix-chip">삼성디스플레이①(2019) · 두께차 화학강화</span><span class="matrix-chip">삼성디스플레이②(2020) · Beilby층</span></div>
    <div class="cell"><span class="matrix-chip">Schott①(2015) · 굽힘내구 스펙</span><span class="matrix-chip">삼성디스플레이③(2021) · 용융염</span></div>
    <div class="cell"><span class="matrix-chip">Schott②(2018) · 유리-세라믹</span></div>
    <div class="row-head">외관</div>
    <div class="cell"><span class="matrix-chip alt">도우인시스(2024) · 차등식각</span></div>
    <div class="cell empty">—</div>
    <div class="cell empty">—</div>
  </div>
</div>

강도 행에 여섯 건, 외관 행에 한 건이 몰려 있다. 도우인시스(외관 행)와 삼성디스플레이①(강도 행)은 둘 다 "구조" 열, 둘 다 "폴딩부를 비폴딩부와 다르게 처리한다"는 상위 발상을 공유하지만, 구체적 수단은 다르다. 삼성디스플레이①은 화학강화(2차) 깊이를 영역별로 다르게 주고, 도우인시스는 식각으로 영역별 두께를 깎아낸다. 같은 발상이 다른 도구·다른 목적으로 갈라진 사례에 가깝다.

### 2.3 수치 비교 — 압축응력(CS) 구간

<div class="viz-box">
  <div class="viz-title">SURFACE COMPRESSIVE STRESS (CS) · MPa</div>
  <svg viewBox="0 0 1080 190" width="100%" role="img" aria-label="Compressive stress range comparison across three patents">
<line x1="220.0" y1="24" x2="220.0" y2="166" stroke="#e4e4de" stroke-width="1"/>
<text x="220.0" y="184" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">0</text>
<line x1="401.8" y1="24" x2="401.8" y2="166" stroke="#e4e4de" stroke-width="1"/>
<text x="401.8" y="184" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">500</text>
<line x1="583.6" y1="24" x2="583.6" y2="166" stroke="#e4e4de" stroke-width="1"/>
<text x="583.6" y="184" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">1000</text>
<line x1="765.5" y1="24" x2="765.5" y2="166" stroke="#e4e4de" stroke-width="1"/>
<text x="765.5" y="184" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">1500</text>
<line x1="947.3" y1="24" x2="947.3" y2="166" stroke="#e4e4de" stroke-width="1"/>
<text x="947.3" y="184" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2000</text>
<text x="620.0" y="200" font-size="10.5" fill="#6f6f66" text-anchor="middle" class="mono">MPa</text>
<text x="206" y="51.0" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">코닝(2014)</text>
<rect x="256.4" y="34" width="690.9" height="26" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="601.8" y="51.0" font-size="11" fill="#12120e" text-anchor="middle" class="mono">100~2000MPa (전형 600~1000)</text>
<text x="206" y="95.0" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">Schott②(2018)</text>
<rect x="256.4" y="78" width="690.9" height="26" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="601.8" y="95.0" font-size="11" fill="#12120e" text-anchor="middle" class="mono">100~2000MPa</text>
<text x="206" y="139.0" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">삼성디스플레이③(2021)</text>
<rect x="401.8" y="122" width="545.5" height="26" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="674.5" y="139.0" font-size="11" fill="#12120e" text-anchor="middle" class="mono">500~2000MPa</text>
</svg>
</div>

코닝(2014)·Schott②(2018)·삼성디스플레이③(2021) 세 특허가 명시한 압축응력 구간이 100~2000MPa 부근에서 넓게 겹친다. 7년의 시차와 서로 다른 레버(스택 구조·유리세라믹·용융염 공정)를 쓰고도 같은 수치 구간에 도달했다는 뜻이다. 이 겹침이 세 회사 제품의 실제 강도가 같다는 뜻은 아니다. 측정 두께·시험 조건이 명세서마다 다를 수 있어 직접 비교하지 않는다(5장 반증 참조). Schott①·삼성디스플레이①②·도우인시스 특허는 CS를 수치로 명시하지 않아 이 차트에서 제외했다.

## 3. 정성 분석 — 특허 7건

연대순으로 배열했다. 청구항 1 전문(요지)과 명세서가 스스로 밝힌 종래기술 문제, 수치 한정을 그대로 인용한다.

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">코닝 Corning</span>
    <span class="num">EP3099642B1 <span class="tag status-granted">등록 후 취소</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Bendable glass stack assemblies, articles and methods of making the same

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>두께 약 25~125μm의 유리 소자와, 그 제1주면에서 일정 깊이까지 형성된 압축응력 영역을 포함하는 스택 어셈블리 구성.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>금속박은 "high cost and a lack of optical transparency", 고분자박은 "marginal optical transparency, lack of thermal stability and limited hermeticity". 기존 소재 대비 유연 디스플레이용 소재의 한계를 지목.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">유리 두께</span><span class="v">25~125μm (선호 50~100)</span></div><div class="num-cell"><span class="k">압축응력(CS)</span><span class="v">100~2000MPa (예시 772MPa)</span></div><div class="num-cell"><span class="k">응력깊이(DOL)</span><span class="v">≤15μm</span></div><div class="num-cell"><span class="k">굽힘반경</span><span class="v">3~20mm (선호 1~5)</span></div><div class="num-cell"><span class="k">천공저항</span><span class="v">≥1.5kgf</span></div><div class="num-cell"><span class="k">연필경도</span><span class="v">≥8H</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);"><strong>등록 후 취소됨(2018-03-21 등록 → EPO 심판부가 Schott의 이의신청을 받아들여 취소).</strong> 심판부는 명세서에 기재된 절차로 실제 재현이 가능한지(reproducibility)에 의문을 제기했다. 코닝은 항소권을 보유한다. 최종 확정 여부는 이 기사 작성 시점 기준 별도 확인 필요.</div>

<div class="fig-frame">
  <img src="/articles/2026-08-14-utg-six-companies-deep-report/2026-08-14-utg-six-companies-deep-report-fig1.png" alt="코닝 스택 어셈블리 사시도" />
  <div class="fig-cap">FIG. 1 (EP3099642B1) — 유리 소자(50)와 압축응력영역(60)을 포함한 스택 어셈블리(100) 사시도. 원문 도면.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Schott ①</span>
    <span class="num">US12130278B2 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Long-term bendable glass material and method for producing a long-term bendable glass material

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>두께 500μm 미만(최소 3μm)이고, 곡률반경 R로 1일 이상 저장 후에도 반년 내 파괴확률이 0.1 미만이며, 임계 균열깊이를 초과하지 않는 롤 형태의 장기굽힘 유리 소재.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>"이미 단일 파괴만으로도 심각한 문제"가 발생하며, 기존 연구는 "지연 파괴(delayed breakage)" 측면과 "장기간 안정성"을 고려하지 않았다는 문제를 지목. 한 번 안 깨지는 것과 오래 안 깨지는 것은 다른 문제라는 지적.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">두께</span><span class="v">&lt;500μm (선호 20~200)</span></div><div class="num-cell"><span class="k">곡률반경</span><span class="v">1~10⁷mm (선호 10~10³)</span></div><div class="num-cell"><span class="k">롤 코어 직경</span><span class="v">&gt;75mm (선호 &gt;150)</span></div><div class="num-cell"><span class="k">저장기간</span><span class="v">≥1일 (선호 5~300일)</span></div><div class="num-cell"><span class="k">파괴확률</span><span class="v">&lt;0.1 (선호 &lt;0.01)</span></div><div class="num-cell"><span class="k">상대습도 조건</span><span class="v">40~100%</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">코닝의 EP3099642(위)를 상대로 EPO 이의신청을 제기한 회사가 Schott다. 이 특허는 그 Schott 자신의 동시대(2015-10-02 우선일, 코닝보다 20개월 늦음) 독자 출원. 취소된 코닝과 달리 <strong>현재도 등록 상태(Active)</strong>.</div>
<div class="no-fig-note">이 특허의 원문 도면은 이번 세션에서 확보하지 못했다.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">삼성디스플레이 ①</span>
    <span class="num">KR102810405B1 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

유리 기판, 이의 제조 방법, 및 이를 포함하는 표시 장치

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>제1 두께를 갖는 폴딩 부분 및 그보다 큰 제2 두께를 갖는 비폴딩 부분을 포함하고, 양 부분 모두 제1층과 이를 둘러싸며 더 큰 압축응력을 갖는 제2층(화학강화층)을 포함하되, 비폴딩 부분의 제2층 깊이가 폴딩 부분의 제2층 깊이보다 큰 유리 기판. (청구항 12)</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>명세서는 구체적 종래기술 문제를 인용문으로 제시하지 않고, 유리 기판을 표시 장치에 적용하기 위해 향상된 내구성을 갖는 유리 기판에 대한 연구가 진행되고 있다는 일반적 배경만 밝힌다. 다른 카드들과 달리 이 특허는 뚜렷한 종래기술 비판 문장이 없다.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">폴딩부 두께(T1)</span><span class="v">10~50μm</span></div><div class="num-cell"><span class="k">비폴딩부 두께(T2)</span><span class="v">40~100μm</span></div><div class="num-cell"><span class="k">제2층 깊이비(폴딩:비폴딩)</span><span class="v">0.5~0.9배</span></div><div class="num-cell"><span class="k">이온교환 온도</span><span class="v">350~500℃</span></div><div class="num-cell"><span class="k">등록일</span><span class="v">2025-05-22</span></div><div class="num-cell"><span class="k">패밀리</span><span class="v">KR, US, CN</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);"><strong>이 카드는 최초 조사 단계에서 특허번호를 잘못 짚었던 것을 바로잡은 결과다.</strong> 애초 이 자리에 있던 KR102244984B1은 출원인이 삼성디스플레이가 아니라 중국 쿤산 비전옥스(Kunshan Visionox) 계열사였다. 검증 과정에서 발견해 진짜 삼성디스플레이 특허(우선일 2019-10-31)로 교체했다. 도우인시스(맨 아래 카드, 2024)가 "폴딩부만 다르게 깎는다"는 발상을 시인성(외관) 목적으로 정제하기 5년 전, 삼성디스플레이는 같은 영역 구분을 강도(화학강화 깊이) 목적으로 이미 청구하고 있었다.</div>

<div class="fig-frame">
  <img src="/articles/2026-08-14-utg-six-companies-deep-report/2026-08-14-utg-six-companies-deep-report-fig2.png" alt="삼성디스플레이 폴딩부·비폴딩부 두께차 단면도" />
  <div class="fig-cap">FIG. 3a (KR102810405B1) — 폴딩 영역(FA, 두께 T1)이 비폴딩 영역(NFA, 두께 T2)보다 얇고, 제2층(화학강화층) 깊이도 영역별로 다르게 형성된 단면. 원문 도면.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">Schott ②</span>
    <span class="num">US20250002398A1 <span class="tag">출원중</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Ultrathin glass ceramic article and method for producing an ultrathin glass ceramic article

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>두께(t) 0.3mm 이하의 초박형 유리-세라믹 물품으로, 결정상을 포함하는 외층과 비정질상 중심부로 구성되며 구배 구조 또는 층상 구조를 가짐.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>"glass has a quite low break resistance and poor anti-scratch resistance", "pen drop tests in flexible display show low breakage heights e.g., only a few centimeters". 순수 강화유리만으로는 깨짐저항·내스크래치성이 부족하다는 문제.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">두께</span><span class="v">0.01~0.3mm (최소 0.03까지)</span></div><div class="num-cell"><span class="k">외층 결정상</span><span class="v">5~80vol%</span></div><div class="num-cell"><span class="k">중심부 결정상</span><span class="v">0~70vol%</span></div><div class="num-cell"><span class="k">압축응력(CS)</span><span class="v">100~2000MPa</span></div><div class="num-cell"><span class="k">펜드롭 높이</span><span class="v">≥t²/800mm</span></div><div class="num-cell"><span class="k">굽힘반경</span><span class="v">≤900×t mm</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">Schott는 ①(2015, 순수 유리 물성 스펙 접근)에서 3년 뒤 ②(2018, 유리라는 재료 범주 자체를 유리-세라믹으로 바꾸는 접근)로 옮겨간다. 한 회사가 같은 문제를 서로 다른 두 갈래로 다시 공략한 사례.</div>

<div class="fig-frame">
  <img src="/articles/2026-08-14-utg-six-companies-deep-report/2026-08-14-utg-six-companies-deep-report-fig3.png" alt="Schott 유리-세라믹 결정상 구배 단면도" />
  <div class="fig-cap">FIG. (US20250002398A1) — 두께 t의 단면. 외층(t1, t2)과 중심부(B) 사이 결정상 함량(x/xx/xxx로 표기)이 층마다 다른 구배 구조. 원문 도면.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">삼성디스플레이 ②</span>
    <span class="num">US20250346523A1 <span class="tag">출원중</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Glass article, display device including the glass article, and method of manufacturing the glass article

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>평탄부(flat portion)와 두께 방향으로 굴곡된 측면부(side portion)로 구성된 유리 물품으로, 베이스와 Beilby층을 포함하되 Beilby층은 평탄부에는 배치되고 측면부의 적어도 일부에는 배치되지 않음.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>"Glass articles applied to them are frequently exposed to external impacts". 얇으면서도 외부 충격에 견뎌야 한다는 상충 요구. 균열 폭·길이·개수와 볼드롭(낙구) 시험으로 내충격성을 정량 검증.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">제1균열 폭</span><span class="v">0.05~0.15mm</span></div><div class="num-cell"><span class="k">제1균열 길이</span><span class="v">≤5mm</span></div><div class="num-cell"><span class="k">제1균열 개수</span><span class="v">≤5개</span></div><div class="num-cell"><span class="k">제2균열 폭</span><span class="v">&gt;0.15mm</span></div><div class="num-cell"><span class="k">볼드롭(150g) 기준</span><span class="v">≥35cm</span></div><div class="num-cell"><span class="k">볼드롭 범위</span><span class="v">50~80cm</span></div></div>

<div class="no-fig-note">이 특허(20개 도면 존재)의 원문 도면은 구글특허 뷰어 접속이 불안정해 확보하지 못했다.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">삼성디스플레이 ③</span>
    <span class="num">US20250353786A1 <span class="tag">출원중</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

Glass strengthening molten salt and glass strengthening method using the same

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>유리를 응고점 약 220℃ 이상 320℃ 미만인 용융염으로 강화하는 방법. 용융염은 KNO₃를 포함하는 제1염과, Li⁺·Na⁺·K⁺·Cs⁺·Rb⁺ 중 하나 이상을 포함하는 제2염으로 구성.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>"residual salts may be frozen on the surface" 및 그로 인한 계면 응력, 표면 손상·균열·오목함·주름 발생. 강화욕에서 나온 뒤 유리 표면에 남는 잔류염이 냉각되며 응고되어 결함을 유발하는 문제.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">유리 두께</span><span class="v">10~50μm (선호 20~30)</span></div><div class="num-cell"><span class="k">압축응력(CS)</span><span class="v">500~2000MPa</span></div><div class="num-cell"><span class="k">응력깊이(DOL)</span><span class="v">5~10μm</span></div><div class="num-cell"><span class="k">DOL/CS</span><span class="v">≥0.0113μm/MPa</span></div><div class="num-cell"><span class="k">강화 온도(1단계)</span><span class="v">350~400℃</span></div><div class="num-cell"><span class="k">용융염 응고점</span><span class="v">220~315℃</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">같은 회사(삼성디스플레이) 안에서 ①(2019, 폴딩부 두께차 화학강화)·②(2020, Beilby층 구조)·③(2021, 용융염 공정) 세 특허가 서로 다른 레버를 동시에 쓰고 있다. 한 회사가 한 가지 답만 밀지 않는다는 증거.</div>
<div class="no-fig-note">용융염 조성·공정 조건 중심 특허로, 원문 도면을 이번 세션에서 확보하지 못했다.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">도우인시스</span>
    <span class="num">KR102714616B1 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

글라스의 폴딩 영역을 보이지 않게 부분 식각하는 방법

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>식각액 도포 수단(23)을 글라스의 폴딩 영역에 배치하는 단계와, 이동 수단으로 왕복이동시키되 시간대별 이동거리를 점차 늘려 평평한 폴딩면과 경사진 슬로프면을 형성하는 단계를 포함하는 방법.</p></div>

#### 명세서가 밝힌 종래기술 문제

<div class="quote-box"><p>"폴딩 영역과 경계부에서 수평면 대비 10도 이상의 급격한 경사면이 형성"되어 "폴딩 영역의 경계가 육안에 의해 쉽게 식별", "화질 저하"로 이어지는 문제. 강도가 아니라 시인성(외관) 문제.</p></div>

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">슬로프면(1-1)</span><span class="v">수평면 대비 0.5도 이하</span></div><div class="num-cell"><span class="k">슬로프면(2-1)</span><span class="v">수평면 대비 1도 이하</span></div><div class="num-cell"><span class="k">슬로프면(3-1)</span><span class="v">수평면 대비 0.5도 이하</span></div><div class="num-cell"><span class="k">존속기간 만료</span><span class="v">2044-03-05</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">삼성디스플레이①(2019, 위)이 처음 연 "폴딩부 두께차" 아이디어를, 5년 뒤 강도가 아니라 외관(시인성) 문제로 방향을 틀어 정제한 특허. 유리 제조사가 아니라 후공정 협력사가 같은 수단을 다른 목적으로 재발명한 사례.</div>

<div class="fig-frame">
  <img src="/articles/2026-08-14-utg-six-companies-deep-report/2026-08-14-utg-six-companies-deep-report-fig4.png" alt="도우인시스 폴딩부 부분식각 단면도" />
  <div class="fig-cap">FIG. (KR102714616B1) — 다공성 소재(23)를 이용해 폴딩 영역을 부분 식각, 완만한 슬로프면을 형성하는 구조. 원문 도면.</div>
</div>

  </div>
</div>

## 4. 비교분석

### 4.1 코닝 vs Schott — 특허가 된 소송

2014년 1월, 코닝은 접히는 유리를 층층이 쌓아 올리는 "스택 어셈블리" 구조로 EP3099642를 출원했다. 유리 소자 두께 25~125μm, 압축응력 100~2000MPa, 굽힘반경 3~20mm. 폴더블 유리가 갖춰야 할 스펙을 구체적 수치로 못박은, 이 리포트에서 확인한 것 중 가장 이른 폴더블 전용 특허다. 2018년 3월 등록됐다.

Schott는 이 특허에 EPO(유럽특허청) 이의신청으로 맞섰다. 심판부의 쟁점은 특허가 유효한지 이전에 **"이 방법대로 하면 실제로 재현되는가"**였다. 청구항이 아무리 정교해도 명세서에 적힌 절차를 그대로 따라가면 진짜로 그 결과물이 나오는지 EPO가 의심한 것이다. 같은 특허 패밀리의 자매 특허 EP3099643은 2020년 5월, EP3099644는 2021년 1월에 취소됐다. EP3099642 자신은 2021년 4월 26일 구술심리가 예정된 상태였다. 코닝은 항소권을 보유한다.

Schott가 이 시기 홀로 손 놓고 있었던 건 아니다. 코닝보다 20개월 늦은 2015년 10월, Schott는 자신의 독자 특허(Schott①, 훗날 US12130278B2로 등록)를 출원했다. 접근이 다르다. 코닝이 "어떻게 쌓을 것인가"(구조)를 청구한 반면, Schott①은 "얼마나 오래 안 깨지는가"(장기 굽힘 내구성)를 청구 대상으로 삼았다. 저장 습도 40~100%, 저장기간 최소 1일, 반년 내 파괴확률 0.1 미만. 한 번의 굽힘이 아니라 시간이 지나도 깨지지 않아야 한다는 조건을 수치로 규정한다. 이 특허는 지금도 등록(Active) 상태다.

정리하면 이렇다. 코닝은 "어떻게 접을 것인가"를 먼저 청구했고, 그중 상당수가 취소됐다. Schott는 거의 같은 시기에 "얼마나 오래 접을 것인가"라는 다른 질문을 청구해 살아남았다. 침해나 무효 여부에 대한 판단은 이 기사의 몫이 아니다. 다만 두 회사가 같은 문제 앞에서 서로 다른 청구 전략을 택했고, 결과가 갈렸다는 사실만은 EPO의 공개 기록이 보여준다.

### 4.2 삼성디스플레이 → 도우인시스 — 5년 걸친 같은 발상, 다른 수단

2019년 10월, 삼성디스플레이는 "유리 기판" 특허를 출원했다(청구항 12). 핵심은 단순하다. 폴딩 부분을 비폴딩 부분보다 얇게 만들고, 두 부분 모두에 화학강화층(제2층)을 입히되 비폴딩 부분 쪽 강화 깊이를 더 깊게 준다. 목적은 강도였다. 얇은 폴딩부와 두꺼운 비폴딩부가 서로 다른 응력 조건에 놓이니, 강화 공정도 영역별로 달리 설계한 것이다.

2024년 3월, 도우인시스는 "폴딩 영역을 보이지 않게 부분 식각하는 방법"을 출원했다. 상위 발상은 비슷하다. 폴딩 영역과 비폴딩 영역을 다르게 처리한다. 그런데 구체적 수단과 목적이 다르다. 삼성디스플레이①이 화학강화 공정(깊이 제어)을 쓴 것과 달리, 도우인시스는 식각으로 표면을 깎아낸다. 목적도 강도가 아니라 **시인성**이다. 식각 경계가 수평면 대비 10도 이상으로 급하면 접힌 자국이 육안에 보인다는 문제를, 경사각을 0.5~1도 이하로 완만하게 깎아서 해결한다.

5년의 시차를 둔 두 특허가 서로를 인용하는지는 확인하지 않았다. 인용 관계를 근거로 "도우인시스가 삼성디스플레이를 참고했다"고 주장하지 않는다. 다만 "폴딩부를 비폴딩부와 다르게 처리한다"는 같은 상위 발상이, 유리 제조사(삼성디스플레이)에서 후공정 협력사(도우인시스)로, 화학강화라는 수단에서 식각이라는 수단으로, 강도라는 목적에서 외관이라는 목적으로 넘어갔다는 사실 관계만 남긴다.

### 4.3 Schott — 3년 뒤 다른 갈래

Schott①(2015)이 "얼마나 오래 안 깨지는가"를 유리 그대로 규정했다면, Schott②(2018)는 재료 범주 자체를 바꿨다. 유리-세라믹. 결정상을 포함하는 외층과 비정질상 중심부로 구성된 구배 구조다. 외층 결정상 5~80vol%, 중심부 0~70vol%로 결정화 정도를 위치별로 다르게 줘서, 순수 유리보다 나은 굽힘반경(900×t mm 이하)을 공식으로 제시한다. 두께 하한은 0.03mm. 이번 7건 중 가장 얇다.

한 회사 안에서도 "유리를 그대로 쓰되 스펙을 정밀 규정"(2015)과 "유리라는 재료 범주 자체를 바꾼다"(2018), 서로 다른 두 갈래가 3년 간격으로 나왔다.

### 4.4 삼성디스플레이 — 한 회사, 세 가지 레버

삼성디스플레이의 세 특허(①2019 두께차 화학강화, ②2020 Beilby층 구조, ③2021 용융염 공정)는 구조·구조·공정으로 레버가 갈린다. ②는 폴딩부의 평탄면에만 Beilby층을 두고 굴곡부에는 두지 않는 층 배치로 충격 저항을 설계하고 볼드롭 테스트로 검증한다. ③은 유리 조성이 아니라 강화 공정(용융염의 조성·응고점)을 정밀 제어해, 응고된 잔류염이 유리 표면에 남아 계면 응력을 일으키는 문제를 막는다. 한 회사가 같은 목표(강도) 앞에서 레버를 하나로 고정하지 않고 병행하고 있다는 뜻이다.

## 5. 반증 및 한계

**EPO의 취소 결정을 코닝 기술 전체에 대한 평가로 확대하지 않는다.** 취소된 건 EP3099642 패밀리의 특정 청구항이 "명세서대로 재현 가능한가"라는 절차적 쟁점이었다. 코닝이 폴더블 유리 사업 전반에서 뒤처졌다는 뜻으로 읽지 않는다. 항소 결과와 그 이후 코닝의 후속 특허 전략은 이번 조사 범위 밖이다.

**수치 겹침을 강도 우열로 읽지 않는다.** CS 구간이 겹치는 세 특허(코닝·Schott②·삼성디스플레이③)는 측정 두께와 시험 방법이 각기 다를 수 있어, 겹침을 "동급 강도"로 해석하지 않는다.

**인용 관계를 확인 없이 인과로 읽지 않는다.** 삼성디스플레이①(2019)과 도우인시스(2024)가 비슷한 발상(폴딩부를 비폴딩부와 다르게 처리)을 쓴다는 사실은 확인했지만, 두 특허 사이에 실제 인용·참고 관계가 있는지는 확인하지 않았다.

**매트릭스의 빈 칸을 "그 회사가 안 하고 있다"로 읽지 않는다.** 이번 표본은 7건뿐이다. 코닝·삼성디스플레이가 소재전환 레버를 쓰는 특허가 없다는 뜻이 아니라, 이번에 확보한 표본에 없다는 뜻이다.

**도구가 붙여주는 해설을 검증 없이 쓰지 않는다.** 이전 조사에서 무관한 특허를 "폴더블의 기반기술"이라 성급히 연결했던 적이 있다. 이번 세션에서도 "삼성디스플레이① KR102244984B1"이라는 특허번호를 처음엔 그대로 썼는데, 도면을 다시 찾는 과정에서 출원인을 원문(KIPO 등록특허공보)으로 직접 대조하니 실제로는 중국 쿤산 비전옥스 계열사의 특허였다. 검증 없이 넘어갔다면 그대로 실릴 뻔한 오류다. 진짜 삼성디스플레이 특허(KR102810405B1)로 교체하고 카드 본문 전체를 다시 썼다.

**도면 확보의 한계.** 코닝·삼성디스플레이①·도우인시스·Schott②는 원문 도면을 실었다. Schott①·삼성디스플레이②③ 3건은 이번 세션에서 확보하지 못했다. 확인되지 않은 것은 "없다"고 단정하지 않고 그대로 밝힌다.

## 6. 결론 및 시사점

2014년부터 지금까지 폴더블 유리 특허를 관통하는 건 표준 해법의 부재다. 코닝은 구조(스택 조립)로 먼저 나섰다가 EPO에서 절차적 타격을 입었고, Schott는 거의 같은 시점에 다른 청구 전략(장기 굽힘 내구성 스펙)으로 살아남은 뒤 3년 후 아예 다른 재료(유리-세라믹)로 한 번 더 갈라졌다. 삼성디스플레이는 세 가지 레버(두께차 화학강화·Beilby층·용융염)를 동시에 특허화했고, 그중 하나(폴딩부·비폴딩부 구분)는 5년 뒤 도우인시스가 화학강화 대신 식각으로, 강도가 아닌 외관 문제로 수단과 목적을 모두 바꿔 재사용했다. 어느 쪽이 실제 양산에서 우위를 점했는지는 이 표본만으로 판단할 수 없다. 그건 특허가 아니라 실제 출하량과 수율의 문제다. 다음 편에서는 EP3099642의 항소 결과를 추적하거나, Schott①·②처럼 한 회사 안에서 레버가 갈리는 다른 사례를 더 찾아볼 만하다.

<dl class="term-list">
  <div><dt>검색식</dt><dd>"foldable glass substrate" · "bendable glass" 정확한 구문 검색 + 출원인 지정, 결과를 sort=old(오래된순) 우선 확인</dd></div>
  <div><dt>기준일</dt><dd>우선일(priority date) 기준, 2014~2024년 랜드마크 특허 선정</dd></div>
  <div><dt>데이터 확보일</dt><dd>2026-08-14</dd></div>
  <div><dt>분류 규칙</dt><dd>레버(구조·공정·소재전환) × 목적(강도·외관) 2축 매트릭스</dd></div>
</dl>

*본 분석은 공개 특허 공보 및 EPO 공개 사건기록에 기반한 정리이며 각 회사의 공식 입장이 아니다. 침해·무효에 대한 자체 판단은 하지 않으며, EPO의 취소·항소 상태는 위 사건기록에 근거해 인용했다.*

## 7. 부록 — 특허 스펙 전체

<div class="tbl-wrap">

| 회사 | 특허번호 | 상태 | 우선일 | 패밀리 |
|---|---|---|---|---|
| 코닝 | EP3099642B1 | 등록 후 취소(항소권 보유) | 2014-01-29 | EP (자매특허 US/WO 등 확인 필요) |
| Schott ① | US12130278B2 | 등록 | 2015-10-02 | US, DE, JP, CN |
| 삼성디스플레이 ① | KR102810405B1 | 등록 | 2019-10-31 | KR, US, CN |
| Schott ② | US20250002398A1 | 출원중 | 2018-10-10 | KR, CN, WO, EP, US |
| 삼성디스플레이 ② | US20250346523A1 | 출원중 | 2020-06-11 | KR, US, CN, EP |
| 삼성디스플레이 ③ | US20250353786A1 | 출원중 | 2021-06-02 | KR, US, CN |
| 도우인시스 | KR102714616B1 | 등록 | 2024-03-05 | KR |

</div>
