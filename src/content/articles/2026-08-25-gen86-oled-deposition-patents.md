---
title: "8.6세대 OLED 증착장비 특허 6건 분석"
summary: "8.6세대 유리는 6세대의 2.2배 넓습니다. 그런데 LG디스플레이 등록특허는 6세대 풀 글래스와 8.6세대 하프 글래스를 한 문장에 묶어 놓았습니다. 판 이론으로 계산해 보면 두 크기의 처짐이 거의 같습니다. 장비사와 마스크사 여섯 곳의 등록 특허로 이 세대 전환의 실제 병목을 확인했습니다."
section: patent
reporter: CLAIM
publishedAt: 2026-08-25
collectWeekStart: '2026-08-17'
readingMinutes: 14
tags: [8.6세대, 증착장비, 파인메탈마스크, 정전척, 캐논토키, 선익시스템, 야스, IT OLED]
sources:
  - type: patent
    title: "대면적 디스플레이 제조를 위한 수평 고정형 유기 증착 장비용 기판 처리 장치 (KR102651394B1, 엘지디스플레이·이에스티, 2022-10-19 출원 / 2024-03-29 등록)"
    url: "https://patents.google.com/patent/KR102651394B1/en"
  - type: patent
    title: "정전척 시스템, 성막 장치, 흡착체 분리 방법 (KR102085447B1, 캐논 톡키, 2018-09-21 출원 / 2020-03-05 등록)"
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
featured: false
paywallAfter: 0
---

8.6세대 유리 한 장은 2290mm x 2620mm다. 면적으로 6제곱미터, 6세대(1500mm x 1850mm) 두 장이 들어가고도 남는다. 이 유리를 진공 챔버 안에서 뒤집어 매달고, 그 아래에 얇은 금속 마스크를 붙인 다음, 유기물을 뿌려 화소를 그린다.

LG디스플레이가 2022년에 출원해 2024년에 등록받은 특허가 있다. 그 명세서에는 해결하려는 과제가 이렇게 적혀 있다.

<div class="quote-box"><p>휨 현상없이 대면적 기판(예를 들면, 6세대 풀 글래스 기판 내지 8.6세대 하프 글래스 기판)을 정전기력으로 충분히 척킹할 수 있는 대면적 디스플레이 제조를 위한 수평 고정형 유기 증착 장비용 기판 처리 장치를 제공하는데 있다.</p><cite>KR102651394B1 명세서</cite></div>

6세대 풀과 8.6세대 하프가 한 문장 안에 하나의 범위로 묶여 있다. 두 크기는 면적으로 2.77제곱미터와 3.00제곱미터, 거의 같다. 8.6세대 유리를 반으로 자르면 다루기가 6세대 수준으로 되돌아온다는 뜻이다.

이 기사는 그 문장에서 출발한다. 여섯 곳의 등록 특허를 읽어, 유리가 커질 때 실제로 무엇이 무너지고 누가 어느 자리를 맡고 있는지 확인한다.

## 1. 개요

### 1.1 분석 배경 및 목적

IT용 OLED 전환의 기준 유리가 6세대에서 8.6세대로 올라가고 있다. 면적이 2.16배가 되면 한 장에서 뽑는 패널 수가 늘어 원가가 떨어진다. 여기까지는 산수다.

문제는 그 유리를 진공 안에서 다루는 쪽에 있다. 증착기는 유리를 아래에서 위로 밀어 올려 정전척에 매달고, 그 상태로 마스크를 자석으로 끌어 붙인 뒤 아래에서 유기물을 뿌린다. 유리도 마스크도 자기 무게로 처진다. 처지면 마스크와 유리 사이에 틈이 생기고, 틈이 생기면 증기가 옆으로 새어 화소 경계가 번진다.

목적은 예측이 아니라 확인이다. 어느 회사가 8.6세대 장비를 언제 납품할지는 이 기사에서 다루지 않는다. 등록된 청구항이 무엇을 붙잡고 있는지만 읽는다.

### 1.2 분석 범위

여섯 건이다. 출원인은 야스, 캐논토키, 선익시스템, 오럼머티리얼, 엘지디스플레이와 이에스티(공동), 템스코다. 장비사 셋, 마스크 관련 둘, 패널사 하나다.

패널사인 LG디스플레이를 표본에 넣은 이유는 이 건이 패널 특허가 아니라 증착 장비의 기판 처리 장치 특허이기 때문이다. 장비를 사는 쪽이 장비 부품을 직접 청구한 사례라 오히려 이 지형에서 빠뜨릴 수 없다.

마스크를 쓰지 않는 패터닝 방식은 이번 범위에서 제외했다. 지금 서고 있는 8.6세대 IT 라인이 쓰는 것은 마스크를 대고 증착하는 방식이고, 이 기사는 그 라인의 장비를 다룬다. 마스크 없는 쪽은 겨냥하는 지점이 달라 별도 편에서 다룬다.

수주 현황, 점유율, 납기 같은 시장 정보는 다루지 않는다. 이 매체는 취재를 하지 않고 공개된 특허와 공시만 근거로 삼는다. 따라서 "누가 독점하고 있다"는 서술도 하지 않는다. 특허가 말해주는 것은 소유가 아니라 겨냥이다.

### 1.3 데이터 소스 및 검색식

<div class="tbl-wrap">

| 항목 | 내용 |
|---|---|
| 데이터 소스 | 구글특허(patents.google.com) 단일 소스. KIPRIS 등 유료 등록원부는 미확보 |
| 채택한 검색식 | 출원인 지정 + `status=GRANT` + `country=KR` 조합, 기술 구문 `"mask tension"` · `"evaporation source"` · `"sagging"` + `"organic light emitting"` |
| 폐기한 검색식 | `"2290mm"` 단독: 173건이 나왔으나 상위 결과가 철강 압연·풍력 발전기였다. 구글특허의 수치 검색은 구문을 정확히 붙잡지 못한다. `"8.6 generation"`도 같은 이유로 폐기(534건, 태양열 집열기·연료전지가 섞였다) |
| 대신 쓴 방법 | 후보 특허 본문을 직접 받아 `8.6`, `2290`, `Grade 2` 같은 문자열을 원문에서 확인했다. 검색 결과가 아니라 명세서 본문에서 찾은 것만 인용한다 |
| 출원인 검증 | 여섯 건 전부 구글특허 서지사항의 출원인 필드를 개별로 열어 확인했다. LG디스플레이 건은 이에스티와 공동 출원임을 이 단계에서 확인했다 |
| 한계 | 전수조사가 아닌 6건 표본. 건수는 지표로 쓰지 않았다(출원인 이름 표기 차이로 집계가 크게 흔들린다) |

</div>

### 1.4 기술분류체계

여섯 건을 "무엇을 손보는가(레버)"와 "무엇을 지키려 하는가(목적)"로 갈랐다. 레버는 셋이다. 기판과 마스크를 **붙잡는** 쪽, 유기물을 **뿌리는** 쪽, 마스크 자체를 **고치는** 쪽. 목적도 셋이다. 처짐과 평탄도, 두께 균일도, 패턴 정밀도.

## 2. 정량 스케치

### 2.1 유리가 커지면 처짐은 몇 배가 되는가

도입부의 문장이 왜 성립하는지부터 계산했다. 등분포 자중을 받는 사각판의 최대 처짐은 짧은 변 길이의 4제곱에 비례하고, 가로세로비에 따른 계수가 붙는다. 세 크기를 같은 유리 두께로 놓고 상대값만 비교했다.

<div class="viz-box">
  <div class="viz-title">RELATIVE SAG BY GLASS SIZE (CALCULATED)</div>
<svg viewBox="0 0 960 230" width="100%" xmlns="http://www.w3.org/2000/svg">
<line x1="300" y1="34" x2="300" y2="205" stroke="#c9c9c4" stroke-width="1"/>
<text x="300" y="24" font-size="11" fill="#8a8a80" text-anchor="start" class="mono">6세대 풀 글래스 = 1.0</text>
<text x="286" y="66" font-size="13" font-weight="700" fill="#12120e" text-anchor="end">6세대 풀 글래스</text>
<text x="286" y="82" font-size="11" fill="#6f6f66" text-anchor="end" class="mono">1500 x 1850 mm  (2.77 m2)</text>
<rect x="300" y="48" width="124.8" height="30" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="434.8" y="68" font-size="13" font-weight="700" fill="#12120e" text-anchor="start" class="mono">1.00배</text>
<text x="286" y="118" font-size="13" font-weight="700" fill="#12120e" text-anchor="end">8.6세대 하프 글래스</text>
<text x="286" y="134" font-size="11" fill="#6f6f66" text-anchor="end" class="mono">1310 x 2290 mm  (3.00 m2)</text>
<rect x="300" y="100" width="111.8" height="30" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="421.8" y="120" font-size="13" font-weight="700" fill="#12120e" text-anchor="start" class="mono">0.90배</text>
<text x="286" y="170" font-size="13" font-weight="700" fill="#12120e" text-anchor="end">8.6세대 풀 글래스</text>
<text x="286" y="186" font-size="11" fill="#6f6f66" text-anchor="end" class="mono">2290 x 2620 mm  (6.00 m2)</text>
<rect x="300" y="152" width="600.0" height="30" fill="oklch(0.45 0.10 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.5"/>
<text x="886.0" y="172" font-size="13" font-weight="700" fill="#fdfdfc" text-anchor="end" class="mono">4.81배</text>
<text x="300" y="222" font-size="11" fill="#8a8a80" class="mono">자중 등분포, 사방 단순지지, 동일 유리 두께 가정. 절대값이 아니라 배율만 본다</text>
</svg>
</div>

8.6세대 원장을 그대로 다루면 처짐이 6세대의 약 4.8배가 된다. 그런데 반으로 잘라 2290mm x 1310mm로 만들면 0.90배, 6세대보다 오히려 작아진다. 면적은 8퍼센트 늘었는데 처짐은 줄어든다. 짧은 변이 1500mm에서 1310mm로 짧아졌기 때문이다. 처짐을 정하는 것은 면적이 아니라 짧은 변이다.

LG디스플레이 명세서가 6세대 풀과 8.6세대 하프를 한 범위로 묶은 것은 이 계산과 맞아떨어진다. 기계적으로 두 크기는 같은 급이다.

이 값은 사방 단순지지와 자중 등분포를 가정한 개략 추정이다. 실제 장비는 정전척이 유리 전면을 흡착하므로 지지 조건이 전혀 다르고, 절대 처짐량도 이 계산과 다르다. 배율의 감각만 보는 용도다.

### 2.2 여섯 건이 놓인 자리

<div class="viz-box">
  <div class="viz-title">FILING TO GRANT</div>
<svg viewBox="0 0 960 290" width="100%" xmlns="http://www.w3.org/2000/svg">
<line x1="210" y1="44" x2="930" y2="44" stroke="#c9c9c4" stroke-width="1"/>
<line x1="210.0" y1="40" x2="210.0" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="210.0" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2015</text>
<line x1="275.5" y1="40" x2="275.5" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="275.5" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2016</text>
<line x1="340.9" y1="40" x2="340.9" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="340.9" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2017</text>
<line x1="406.4" y1="40" x2="406.4" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="406.4" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2018</text>
<line x1="471.8" y1="40" x2="471.8" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="471.8" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2019</text>
<line x1="537.3" y1="40" x2="537.3" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="537.3" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2020</text>
<line x1="602.7" y1="40" x2="602.7" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="602.7" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2021</text>
<line x1="668.2" y1="40" x2="668.2" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="668.2" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2022</text>
<line x1="733.6" y1="40" x2="733.6" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="733.6" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2023</text>
<line x1="799.1" y1="40" x2="799.1" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="799.1" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2024</text>
<line x1="864.5" y1="40" x2="864.5" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="864.5" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2025</text>
<line x1="930.0" y1="40" x2="930.0" y2="48" stroke="#c9c9c4" stroke-width="1"/>
<text x="930.0" y="32" font-size="10.5" fill="#8a8a80" text-anchor="middle" class="mono">2026</text>
<text x="196" y="77" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">야스</text>
<text x="196" y="91" font-size="10.5" fill="#6f6f66" text-anchor="end" class="mono">선형증발원 차단판</text>
<rect x="246.0" y="66" width="100.1" height="15" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="246.0" cy="73.5" r="4" fill="oklch(0.45 0.10 150)"/>
<text x="355.1" y="78" font-size="10.5" fill="#4d4d45" class="mono">KR101699168B1</text>
<text x="196" y="111" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">캐논토키</text>
<text x="196" y="125" font-size="10.5" fill="#6f6f66" text-anchor="end" class="mono">정전척 분리 순서 제어</text>
<rect x="453.5" y="100" width="95.6" height="15" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="453.5" cy="107.5" r="4" fill="oklch(0.45 0.10 150)"/>
<text x="558.1" y="112" font-size="10.5" fill="#4d4d45" class="mono">KR102085447B1</text>
<text x="196" y="145" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">선익시스템</text>
<text x="196" y="159" font-size="10.5" fill="#6f6f66" text-anchor="end" class="mono">증착원 3축 위치 조절</text>
<rect x="575.2" y="134" width="99.5" height="15" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="575.2" cy="141.5" r="4" fill="oklch(0.45 0.10 150)"/>
<text x="683.7" y="146" font-size="10.5" fill="#4d4d45" class="mono">KR102355870B1</text>
<text x="196" y="179" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">오럼머티리얼</text>
<text x="196" y="193" font-size="10.5" fill="#6f6f66" text-anchor="end" class="mono">마스크 잔류응력 제어</text>
<rect x="692.4" y="168" width="216.7" height="15" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="692.4" cy="175.5" r="4" fill="oklch(0.45 0.10 150)"/>
<text x="900.1" y="180" font-size="10.5" fill="#2a2a24" text-anchor="end" class="mono">KR102854300B1</text>
<text x="196" y="213" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">LG디스플레이 · 이에스티</text>
<text x="196" y="227" font-size="10.5" fill="#6f6f66" text-anchor="end" class="mono">수평 고정형 기판 처리</text>
<rect x="720.5" y="202" width="94.3" height="15" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="720.5" cy="209.5" r="4" fill="oklch(0.45 0.10 150)"/>
<text x="823.8" y="214" font-size="10.5" fill="#4d4d45" class="mono">KR102651394B1</text>
<text x="196" y="247" font-size="12.5" font-weight="700" fill="#12120e" text-anchor="end">템스코</text>
<text x="196" y="261" font-size="10.5" fill="#6f6f66" text-anchor="end" class="mono">8세대급 마스크 분할 접합</text>
<rect x="738.9" y="236" width="49.1" height="15" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1.4"/>
<circle cx="738.9" cy="243.5" r="4" fill="oklch(0.45 0.10 150)"/>
<text x="797.0" y="248" font-size="10.5" fill="#4d4d45" class="mono">KR102595560B1</text>
<text x="210" y="282" font-size="11" fill="#8a8a80" class="mono">막대 왼쪽 끝 = 출원일, 오른쪽 끝 = 등록일. 여섯 건 모두 등록 유지 중</text>
</svg>
</div>

2015년 야스 건을 빼면 나머지 다섯은 2018년 이후에 몰려 있고, 그중 셋이 2022년 5월부터 2023년 1월 사이 여덟 달에 들어왔다. 서로 다른 세 회사가 거의 같은 시기에 각자의 자리에서 출원했다는 뜻이다. 다만 이것을 하나의 사건에 대한 동시 대응으로 읽지는 않는다. 표본이 여섯 건이고, 각사의 전체 출원 흐름을 보지 않았다.

### 2.3 레버 x 목적 매트릭스

<div class="viz-box">
  <div class="viz-title">WHAT THEY CHANGE x WHAT THEY PROTECT</div>
<svg viewBox="0 0 960 340" width="100%" xmlns="http://www.w3.org/2000/svg">
<rect x="152" y="6" width="260" height="34" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="282.0" y="30" font-size="12.5" font-weight="700" fill="#2a2a24" text-anchor="middle">처짐과 평탄도</text>
<rect x="416" y="6" width="260" height="34" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="546.0" y="30" font-size="12.5" font-weight="700" fill="#2a2a24" text-anchor="middle">두께 균일도</text>
<rect x="680" y="6" width="260" height="34" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="810.0" y="30" font-size="12.5" font-weight="700" fill="#2a2a24" text-anchor="middle">패턴 정밀도</text>
<rect x="6" y="46" width="142" height="92" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="77.0" y="94.0" font-size="13" font-weight="700" fill="#2a2a24" text-anchor="middle">붙잡는다</text>
<rect x="152" y="46" width="260" height="92" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="164" y="57" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="172" y="70" font-size="11.5" font-weight="700" fill="#12120e">LG디스플레이 · 이에스티</text>
<text x="172" y="83" font-size="10" fill="#4d4d45" class="mono">티타늄 냉각판 7~12mm</text>
<rect x="164" y="97" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="172" y="110" font-size="11.5" font-weight="700" fill="#12120e">캐논토키</text>
<text x="172" y="123" font-size="10" fill="#4d4d45" class="mono">전극 분할 정전척</text>
<rect x="416" y="46" width="260" height="92" fill="#f7f6f2" stroke="#dcdcd6"/>
<text x="546.0" y="94.0" font-size="11" fill="#b5b5ae" text-anchor="middle" class="mono">표본 없음</text>
<rect x="680" y="46" width="260" height="92" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="692" y="57" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="700" y="70" font-size="11.5" font-weight="700" fill="#12120e">캐논토키</text>
<text x="700" y="83" font-size="10" fill="#4d4d45" class="mono">흡착 순서대로 분리</text>
<rect x="6" y="142" width="142" height="92" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="77.0" y="190.0" font-size="13" font-weight="700" fill="#2a2a24" text-anchor="middle">뿌린다</text>
<rect x="152" y="142" width="260" height="92" fill="#f7f6f2" stroke="#dcdcd6"/>
<text x="282.0" y="190.0" font-size="11" fill="#b5b5ae" text-anchor="middle" class="mono">표본 없음</text>
<rect x="416" y="142" width="260" height="92" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="428" y="153" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="436" y="166" font-size="11.5" font-weight="700" fill="#12120e">야스</text>
<text x="436" y="179" font-size="10" fill="#4d4d45" class="mono">차단판 높이 변주</text>
<rect x="428" y="193" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="436" y="206" font-size="11.5" font-weight="700" fill="#12120e">선익시스템</text>
<text x="436" y="219" font-size="10" fill="#4d4d45" class="mono">증착원 3축 이동</text>
<rect x="680" y="142" width="260" height="92" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="692" y="153" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="700" y="166" font-size="11.5" font-weight="700" fill="#12120e">야스</text>
<text x="700" y="179" font-size="10" fill="#4d4d45" class="mono">섀도우 유발 빔 차단</text>
<rect x="6" y="238" width="142" height="92" fill="#f2efe6" stroke="#dcdcd6"/>
<text x="77.0" y="286.0" font-size="13" font-weight="700" fill="#2a2a24" text-anchor="middle">마스크를 고친다</text>
<rect x="152" y="238" width="260" height="92" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="164" y="249" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="172" y="262" font-size="11.5" font-weight="700" fill="#12120e">오럼머티리얼</text>
<text x="172" y="275" font-size="10" fill="#4d4d45" class="mono">압연 잔류응력 상쇄</text>
<rect x="164" y="289" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="172" y="302" font-size="11.5" font-weight="700" fill="#12120e">템스코</text>
<text x="172" y="315" font-size="10" fill="#4d4d45" class="mono">4방향 텐션</text>
<rect x="416" y="238" width="260" height="92" fill="#f7f6f2" stroke="#dcdcd6"/>
<text x="546.0" y="286.0" font-size="11" fill="#b5b5ae" text-anchor="middle" class="mono">표본 없음</text>
<rect x="680" y="238" width="260" height="92" fill="#fdfdfc" stroke="#dcdcd6"/>
<rect x="692" y="249" width="236" height="32" fill="oklch(0.88 0.03 150)" stroke="oklch(0.45 0.10 150)" stroke-width="1"/>
<text x="700" y="262" font-size="11.5" font-weight="700" fill="#12120e">템스코</text>
<text x="700" y="275" font-size="10" fill="#4d4d45" class="mono">멀티 클램프 셀 조정</text>
</svg>
</div>

세 칸이 비어 있다. 빈 칸은 그 회사가 그 문제를 안 푼다는 뜻이 아니라 이번 표본에 없다는 뜻이다. 눈에 띄는 것은 "패턴 정밀도" 열에 세 회사가 서로 다른 레버로 들어와 있다는 점이다. 캐논토키는 붙잡는 방식으로, 야스는 뿌리는 방식으로, 템스코는 마스크 자체로 같은 목표를 겨냥한다.

## 3. 정성 분석: 특허 6건

출원일 순으로 배열했다. 청구항 요지와 명세서가 스스로 밝힌 문제, 수치 한정을 그대로 옮긴다.

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">야스 YAS</span>
    <span class="num">KR101699168B1 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

쉐도우 효과 방지를 위한 선형증발원용 차단판

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>선형증발원의 중심부에 폭을 가로지르는 방향으로 배치되어, 증발되는 물질 빔 중 쉐도우 효과를 일으킬 수 있는 것을 차단하는 차단판. 차단판으로 인한 박막 두께의 특이점 형성을 방지하기 위해, 차단판의 높이가 폭 방향을 따라 일정하게 유지되지 않고 낮아지거나 높아지거나 높낮이를 반복하여 변화되게 형성된다.</p></div>

#### 이 특허가 다루는 문제

마스크에는 두께가 있다. 증기가 수직으로 들어오면 구멍 모양 그대로 찍히지만, 비스듬히 들어오면 구멍 벽에 가려 화소 가장자리가 흐려진다. 이것이 섀도우다. 선형증발원은 물질을 방사상으로 뿜기 때문에 비스듬한 성분이 반드시 생긴다.

이 특허의 답은 그 성분을 물리적으로 막아 세우는 것이다. 그런데 막아 세우면 막은 자리 바로 아래의 막 두께가 푹 꺼진다. 그래서 차단판의 높이를 폭 방향으로 일정하게 두지 않고 오르내리게 만들어, 꺼짐이 한 지점에 몰리지 않게 흩는다. 하나를 얻고 하나를 잃은 뒤, 잃은 것을 모양으로 되찾는 구조다.

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">차단판 위치</span><span class="v">선형증발원 상단부로부터 50~100mm 틈새</span></div><div class="num-cell"><span class="k">차단 방향</span><span class="v">x, y 두 방향 진행 모두 차단</span></div><div class="num-cell"><span class="k">차단판 길이</span><span class="v">증발원 폭을 가로지르고도 남는 길이</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">4</span></div></div>

<div class="fig-frame">
  <img src="/articles/2026-08-25-gen86-oled-deposition-patents/fig2-yas-shield.png" alt="선형증발원 위에 세워진 차단판과 그로 인한 막두께 특이점 그래프" />
  <div class="fig-cap">도면1 (KR101699168B1): 선형증발원(100)의 폭을 가로지르는 차단판(200), 그리고 그 아래 그래프가 차단판 위치에서 막두께가 꺼지는 특이점을 보여준다. 원문 도면.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">캐논토키 Canon Tokki</span>
    <span class="num">KR102085447B1 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

정전척 시스템, 성막 장치, 피흡착체 분리 방법

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>복수의 전극부를 포함하는 정전척과 전압 인가부, 전압 제어부로 구성된다. 제어부는 제1 피흡착체와 그것을 거쳐 흡착된 제2 피흡착체가 접촉한 상태 그대로 정전척에서 함께 떨어지도록 전압을 인가하되, 각 전극부에 흡착 전압이 인가되었던 순서와 같은 순서로 인가한다.</p></div>

종속항이 두 피흡착체의 정체를 밝힌다. 제1 피흡착체는 절연성 재료로 이루어진 기판, 제2 피흡착체는 금속성 재료로 이루어진 마스크다. 또 다른 종속항은 흡착 전압이 가장 먼저 인가된 전극부에 절대값이 더 큰 전압을 걸도록 한정한다.

#### 이 특허가 다루는 문제

정전척은 붙이는 장치가 아니라 붙였다 떼는 장치다. 대면적에서 어려운 쪽은 떼는 쪽이다. 유리 아래에 마스크가 자기력으로 붙어 있는 상태에서 전극을 한꺼번에 끄면 넓은 판이 한 지점부터 뜯기며 흔들리고, 그 순간 유리와 마스크가 서로 어긋난다.

청구항이 요구하는 것은 순서다. 붙일 때 1번, 2번, 3번 순서로 걸었으면 뗄 때도 같은 순서로 건다. 넓은 판을 통째로 다루지 않고 시간 축으로 쪼개는 접근이다.

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">전극부</span><span class="v">복수(개수 미한정)</span></div><div class="num-cell"><span class="k">제1 피흡착체</span><span class="v">절연성 기판</span></div><div class="num-cell"><span class="k">제2 피흡착체</span><span class="v">금속성 마스크</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">19</span></div></div>

<div class="no-fig-note" style="border-left-color: oklch(0.45 0.10 150);">이 건은 청구항에 치수 한정이 거의 없다. 크기가 아니라 제어 순서를 청구했기 때문이다. 특정 세대의 유리를 지목하지 않으므로 8.6세대 전용 특허로 읽지 않는다.</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">선익시스템 Sunic System</span>
    <span class="num">KR102355870B1 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

증착 소스의 위치 조절이 가능한 증착 장치

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>진공 챔버 하측에 증착 소스를 두고, 제1 이동부가 제1 방향으로, 제2 이동부가 그와 수직한 제2 방향으로, 제3 이동부가 다시 두 방향 모두와 수직한 제3 방향으로 소스를 움직인다. 제3 이동부는 승강 지지부와 승강부를 포함하고, 소스 하측에서 연장된 부분에 제1 플랜지와 제2 플랜지, 그 사이의 스프링을 둔다.</p></div>

#### 이 특허가 다루는 문제

증착 소스가 챔버 하측에 있다는 청구항의 서술은 이 장비가 기판을 위에 매다는 구조임을 말해준다. 유리가 커지면 소스와 기판 사이 거리, 소스의 좌우 위치가 막 두께 분포를 그대로 좌우한다. 이 특허는 챔버를 다시 만들지 않고 소스만 세 방향으로 움직여 그 분포를 잡는다.

플랜지 사이에 스프링을 넣은 구조가 눈에 띈다. 명세서는 이 부분의 목적을 별도로 강조하지 않지만, 고온부와 구동부 사이에 탄성 요소를 끼우는 배치다. 그 이상은 명세서에서 확인하지 못했으므로 해석을 붙이지 않는다.

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">이동 자유도</span><span class="v">서로 수직한 3방향</span></div><div class="num-cell"><span class="k">소스 위치</span><span class="v">진공 챔버 하측</span></div><div class="num-cell"><span class="k">탄성 요소</span><span class="v">제1, 제2 플랜지 사이 스프링</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">6</span></div></div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">오럼머티리얼 Aurum Material</span>
    <span class="num">KR102854300B1 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

마스크의 인장력 제어 방법

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>프레임과 복수의 마스크가 연결된 프레임 일체형 마스크를 만드는 과정에서, (a) 압연 공정으로 제조한 마스크 금속막의 두께 방향 내부 응력 분포를 판단하고, (b) 그 분포에 따라 적어도 한쪽 면의 두께를 감축한 뒤, (c) 마스크 패턴을 형성한다. 이때 금속막은 두께 방향으로 상부와 하부에 압축응력 구간을, 중간부에 인장응력 구간을 포함한다.</p></div>

#### 이 특허가 다루는 문제

파인메탈마스크는 인바 합금을 압연해 만든다. 압연은 위아래에서 눌러 늘이는 공정이라 금속막 안에 응력이 층으로 남는다. 이 특허가 밝히는 분포는 상부와 하부가 압축, 중간부가 인장이다.

문제는 이 분포가 위아래로 완전히 대칭이 아닐 때다. 대칭이 아니면 판은 저절로 휜다. 마스크가 커질수록 이 편차가 처짐으로 드러난다. 이 특허의 답은 인장을 더 세게 거는 것이 아니라, 패턴을 넣기 전에 한쪽 면을 깎아 응력 분포를 미리 맞추는 것이다. 늘여서 펴는 대신 재료 안쪽에서 원인을 지운다.

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">응력 분포</span><span class="v">상하 압축, 중간 인장</span></div><div class="num-cell"><span class="k">조정 방법</span><span class="v">적어도 일면의 두께 감축</span></div><div class="num-cell"><span class="k">패턴 형성</span><span class="v">임시접착부로 템플릿에 붙인 상태</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">12</span></div></div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">LG디스플레이 · 이에스티</span>
    <span class="num">KR102651394B1 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

대면적 디스플레이 제조를 위한 수평 고정형 유기 증착 장비용 기판 처리 장치

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>평평한 상면과 하면을 갖는 티타늄 냉각 플레이트, 그 하면에 코팅된 제1유전층과 전극층, 제2유전층으로 이루어져 아래에서 올라오는 글래스 기판을 정전기력으로 척킹하는 정전척, 그리고 상면에 위치해 아래에서 올라오는 마스크를 자기력으로 척킹하는 요크 플레이트를 포함한다. 냉각 플레이트 안에는 폭이 다른 두 채널로 냉각 유로를 만든다. 티타늄 냉각 플레이트와 제1유전층의 열팽창 계수 편차는 1.5퍼센트이고, 플레이트 두께는 7mm에서 12mm, 정전척 두께는 20에서 1000마이크로미터다.</p></div>

#### 명세서가 밝힌 문제

<div class="quote-box"><p>휨 현상없이 대면적 기판(예를 들면, 6세대 풀 글래스 기판 내지 8.6세대 하프 글래스 기판)을 정전기력으로 충분히 척킹할 수 있는 (중략) 기판 처리 장치를 제공하는데 있다.</p></div>

명세서는 대상 유리 크기를 "6세대 풀 사이즈(6GF) 내지 8.6세대 하프 사이즈(8.6GH)인 대략 1850mm x 1500mm 내지 2290mm x 1310mm"로 적었고, 마스크는 인바 재질일 수 있다고 덧붙였다.

#### 이 특허가 다루는 문제

처짐은 유리에서 끝나지 않는다. 유리를 붙잡는 판도 처진다. 명세서는 티타늄 플레이트의 7~12mm라는 두께를, 마스크가 8.6세대 하프 글래스에 척킹되는 동시에 플레이트가 자중으로 휘지 않는 두께로 설명한다. 여기에 더해 가장자리를 따라 지지 부재를 붙이고, 유리와 마스크의 데드존에 대응하는 안쪽 영역에 보조 지지 부재를 추가해 플레이트의 휨을 막는다.

재질을 티타늄으로 고른 이유도 명세서에 있다. 티타늄의 열팽창 계수는 8.6, 유전층인 알루미나는 7.3이다. 두 값이 가까워야 온도가 올라갈 때 유전층에 균열이 생기지 않는다. 증착 중 유리는 계속 데워지므로, 붙잡는 판은 동시에 식히는 판이어야 한다. 그래서 판 안에 미앤더 형태의 냉각 유로가 두 줄 이상 들어간다.

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">대상 유리</span><span class="v">1850x1500 ~ 2290x1310mm</span></div><div class="num-cell"><span class="k">냉각 플레이트</span><span class="v">Ti Grade 2, 두께 7~12mm</span></div><div class="num-cell"><span class="k">정전척 두께</span><span class="v">20~1000um</span></div><div class="num-cell"><span class="k">제1유전층</span><span class="v">400~600um</span></div><div class="num-cell"><span class="k">열팽창 계수</span><span class="v">Ti 8.6 / Al2O3 7.3</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">24</span></div></div>

<div class="fig-frame">
  <img src="/articles/2026-08-25-gen86-oled-deposition-patents/fig1-lgd-esc-stack.png" alt="요크 플레이트, 티타늄 냉각 플레이트, 정전척, 글래스 기판, 마스크가 아래로 매달린 단면도" />
  <div class="fig-cap">도면1 (KR102651394B1): 위에서부터 자석이 박힌 요크 플레이트(130, 131), 티타늄 냉각 플레이트(110), 정전척(120), 글래스 기판(10), 그리고 프레임(21)에 걸린 마스크(20). 전체 구조가 아래를 향해 매달린다. 원문 도면.</div>
</div>

  </div>
</div>

<div class="patent-card">
  <div class="patent-card-head">
    <span class="co">템스코 Temsco</span>
    <span class="num">KR102595560B1 <span class="tag status-granted">등록</span></span>
  </div>
  <div class="patent-card-body">

#### 발명의 명칭

분할 접합법과 샵 마스크를 이용한 8세대급 OLED 메탈 마스크의 제조방법

#### 독립항(청구항 1) 요지

<div class="quote-box"><p>8세대급 패턴 마스크를 설정된 면적에 따라 여러 장으로 분할해 준비하고(S100), 이음부를 용접해 원장 마스크를 만들되 샵 마스크로 단변 방향 이음부를 막아 장변과 함께 4방향 텐션을 도모하며(S200), 분할된 패턴 마스크의 이음부를 용접하고(S300), 멀티 클램프로 원장 마스크와 샵 마스크, 키 시트의 테두리를 개별 또는 동시에 인장해 패터닝된 셀의 스펙을 정밀 조정한 뒤(S400), 프레임 접합단에 용접하고 인장용 연장부를 잘라 마무리한다(S500).</p></div>

#### 이 특허가 다루는 문제

이 청구항의 첫 단계가 이 기사에서 가장 직설적인 문장이다. 8세대급 마스크는 한 장으로 만들지 않는다. 나눠 만들어 용접으로 잇는다.

이어 붙인 판은 이음매마다 성질이 다르다. 그래서 인장도 한 번에 걸지 않고, 멀티 클램프로 테두리를 개별 또는 동시에 당겨 셀 하나하나의 위치를 맞춘다. 유리가 커진 결과가 마스크 쪽에서는 통짜를 포기하는 형태로 나타난 셈이다.

다만 이 특허의 표기는 "8세대급"이다. 8.6세대를 지목한 문구는 이 명세서에서 확인하지 못했다. 8세대급이라는 표현이 8.6세대를 포함하는지는 명세서만으로 판단할 수 없다.

#### 수치 한정

<div class="num-grid"><div class="num-cell"><span class="k">마스크 제작</span><span class="v">분할 후 용접 접합</span></div><div class="num-cell"><span class="k">텐션 방향</span><span class="v">4방향(장변, 단변)</span></div><div class="num-cell"><span class="k">인장 수단</span><span class="v">멀티 클램프, 개별 또는 동시</span></div><div class="num-cell"><span class="k">청구항 수</span><span class="v">3</span></div></div>

<div class="fig-frame">
  <img src="/articles/2026-08-25-gen86-oled-deposition-patents/fig3-temsco-split-mask.png" alt="분할된 마스크 시트를 용접선과 용접 너깃으로 이어 붙인 평면도와 사시도" />
  <div class="fig-cap">도면11 (KR102595560B1): 분할된 패턴 시트(녹색)와 샵 마스크(자주색)를 용접선(Welding Line)과 너깃(Nugget)으로 잇는 구조. 아래 단면도에서 시트가 여러 장으로 나뉘어 프레임에 걸린 것이 보인다. 원문 도면.</div>
</div>

  </div>
</div>

## 4. 비교분석

### 4.1 같은 문제를 세 층이 나눠 갖는다

여섯 건을 나란히 놓으면 하나의 문제가 세 층으로 갈라져 있는 것이 보인다. 유리가 커지면 마스크와 유리 사이에 틈이 생긴다. 이 틈을 없애는 방법이 층마다 다르다.

붙잡는 층은 유리와 마스크를 물리적으로 밀착시킨다. LG디스플레이와 이에스티는 위에서 자석으로 마스크를 끌어당기고 아래로 처지지 않는 두께의 판을 쓴다. 캐논토키는 붙잡는 것보다 떼는 순간을 청구했다.

뿌리는 층은 틈을 없애는 대신 틈이 있어도 번지지 않게 한다. 야스의 차단판은 비스듬한 증기 자체를 없애 버린다. 틈이 남아 있어도 수직으로만 들어오면 그림자가 생기지 않는다.

마스크 층은 마스크가 애초에 처지지 않게 만든다. 오럼머티리얼은 압연이 남긴 응력을 지우고, 템스코는 통짜 제작을 포기하고 여러 장을 이어 4방향으로 당긴다.

세 층 중 어느 하나만 해결해도 문제가 풀리지 않는다는 것이 이 배치가 말해주는 바다.

### 4.2 8.6세대를 명세서에 적어 넣은 특허와 그러지 않은 특허

여섯 건 중 8.6세대를 문자로 적은 것은 LG디스플레이 건 하나다. 나머지 다섯은 세대를 지목하지 않거나(캐논토키, 선익시스템, 오럼머티리얼, 야스), 8세대급이라고만 적었다(템스코).

세대를 적으면 권리 범위가 좁아진다. 적지 않으면 넓게 남지만 그 세대를 겨냥했다는 근거도 남지 않는다. 이 차이를 우열로 읽지 않는다. 다만 확실한 것은 하나다. 8.6세대 하프 글래스라는 표현이 등록 청구항의 설명 안에 이미 들어와 있고, 그 크기가 2290mm x 1310mm로 특정돼 있다는 사실이다.

원장 2290mm x 2620mm를 반으로 자르면 정확히 2290mm x 1310mm다. 이 수치가 명세서에 적혔다는 것은 적어도 이 출원인이 8.6세대 유리를 절반으로 다루는 공정을 전제하고 장비 부품을 설계했다는 뜻으로 읽힌다. 다만 이것은 명세서의 수치에서 나온 해석이고, 실제 양산 공정이 그렇게 간다는 확인은 아니다.

### 4.3 붙잡는 판은 동시에 식히는 판이다

이 표본에서 가장 뜻밖이었던 것은 열이다. 처짐 이야기를 하다 보면 무게와 두께만 남을 것 같은데, LG디스플레이 청구항의 절반은 냉각에 관한 것이다. 판 안에 유로를 파고, 유로를 덮는 커버를 따로 두고, 재질을 티타늄으로 골라 유전층과 열팽창을 맞춘다.

이유는 단순하다. 유기물을 증발시키려면 증발원이 뜨거워야 하고, 그 복사열이 그대로 기판으로 온다. 유리가 데워지면 늘어난다. 인바 마스크는 열팽창이 거의 없는 합금이니 유리만 늘어난다. 둘의 정렬이 어긋난다. 대면적일수록 같은 팽창률이라도 절대 어긋남이 커진다.

그래서 붙잡는 장치가 곧 식히는 장치가 된다. 두 기능이 한 판에 들어가면 재질 선택이 열팽창 정합 문제로 바뀌고, 그 결과가 티타늄이라는 답이다.

### 4.4 청구항 안의 수치 하나가 맞아떨어지지 않는다

LG디스플레이 청구항 1은 "티타늄 냉각 플레이트와 제1유전층의 열팽창 계수 편차는 1.5퍼센트"라고 한정한다. 명세서는 그 근거로 티타늄 8.6, 알루미나 7.3이라는 값을 든다.

두 값의 차이는 1.3이고, 8.6을 기준으로 하면 약 15퍼센트다. 1.5퍼센트가 되지 않는다. 명세서 어디에도 이 1.5퍼센트가 어떤 기준에서 나온 값인지는 적혀 있지 않다.

CLAIM은 이것이 오기인지 다른 산정 기준인지 판단하지 않는다. 특허의 유효성에 대한 판단은 이 매체가 하는 일이 아니다. 다만 이 수치는 청구항에 들어간 한정 사항이므로 권리 범위와 직접 관련이 있고, 명세서만으로는 확인되지 않는다는 사실을 그대로 적어 둔다.

## 5. 반증 및 한계

**표본이 여섯 건이다.** 이 지형이 8.6세대 증착 장비 특허의 전부가 아니다. 각 회사의 최근 출원 상당수는 아직 공개되지 않았을 수 있다. 특허는 출원 후 18개월이 지나야 공개되므로, 2025년 이후 출원분은 구조적으로 보이지 않는다.

**매트릭스의 빈 칸을 "그 회사가 안 한다"로 읽지 않는다.** 표본에 없다는 뜻이다.

**출원 시기의 근접을 인과로 읽지 않는다.** 2022년 중반부터 여덟 달 사이에 세 건이 몰려 있지만, 이것이 같은 사건에 대한 대응인지는 확인하지 못했다.

**처짐 배율은 계산값이다.** 사방 단순지지, 자중 등분포, 동일 두께를 가정한 판 이론 계산이며, 실제 장비의 지지 조건과 다르다. 절대값이 아니라 배율 비교로만 쓴다. 이 계산은 특허 명세서에서 인용한 것이 아니라 이 기사가 직접 수행한 것이다.

**원장 치수는 직접 확인한 값이 아니다.** 이 기사에서 특허 원문으로 확인한 것은 LG디스플레이 명세서의 하프 사이즈 2290mm x 1310mm다. 8.6세대 원장 2290mm x 2620mm는 업계에서 통용되는 규격이고, 하프의 두 배라는 산수로 맞아떨어지지만 이번 표본의 명세서에서 그 수치를 직접 찾지는 못했다.

**건수 비교를 지표로 쓰지 않았다.** 조사 과정에서 출원인별 등록 건수를 세어 보았으나, 같은 회사가 한글명, 영문명, 일본어 표기로 흩어져 색인되는 탓에 검색어에 따라 값이 크게 달라졌다. 이 기사에서는 건수를 인용하지 않는다.

**도구 해설을 그대로 옮기지 않았다.** 구글특허의 기계번역은 1차 파악에만 쓰고, 인용한 문장은 모두 한국어 원문에서 확인했다. 선익시스템 건의 스프링 구조처럼 명세서가 목적을 밝히지 않은 부분은 해석을 붙이지 않고 비워 두었다.

**도면은 세 건만 실었다.** 야스, LG디스플레이, 템스코 건은 원문 PDF에서 도면을 확보했다. 캐논토키, 선익시스템, 오럼머티리얼 건은 이번에 확보하지 못했다. 도면이 없다는 뜻이 아니라 이번 작업에서 싣지 못했다는 뜻이다.

## 6. 결론 및 시사점

8.6세대는 유리를 두 배로 키우는 일이 아니라, 두 배가 된 유리를 어떻게 다시 반으로 나눌 것인가의 문제로 특허에 나타난다. LG디스플레이 명세서가 6세대 풀과 8.6세대 하프를 한 범위로 묶은 것, 그 범위가 계산상 거의 같은 급이라는 것이 그 증거다.

여섯 건이 보여주는 구도는 이렇다. 대면적화의 부담은 한 회사가 지지 않는다. 붙잡는 쪽, 뿌리는 쪽, 마스크를 만드는 쪽이 각자 자기 층에서 같은 문제를 나눠 갖는다. 장비사만 준비돼도, 마스크사만 준비돼도 라인은 서지 않는다.

그리고 이 표본에서 가장 조용한 사실은 마스크 쪽에 있다. 8세대급 마스크는 이미 통짜 제작을 포기하고 이어 붙이는 방식으로 넘어갔다. 유리를 키우는 데 걸리는 시간과 마스크를 키우는 데 걸리는 시간이 다르다는 뜻이고, 그 격차가 세대 전환의 속도를 정한다.

마스크를 크게 만드는 일이 어려워질수록, 그 어려움은 유리를 자르는 쪽과 마스크를 나누는 쪽으로 함께 옮겨간다. 이 표본이 보여주는 8.6세대의 실제 모습은 그 두 가지를 동시에 감당하는 공정이다.

## 7. 부록: 특허 스펙 표

<div class="tbl-wrap">

| 번호 | 출원인 | 출원일 | 등록일 | 청구항 | 상태 | 핵심 |
|---|---|---|---|---|---|---|
| KR101699168B1 | 야스 | 2015-07-22 | 2017-01-31 | 4 | 등록 유지 | 선형증발원 차단판, 높이 변주 |
| KR102085447B1 | 캐논 톡키 | 2018-09-21 | 2020-03-05 | 19 | 등록 유지 | 정전척 흡착, 분리 순서 제어 |
| KR102355870B1 | 선익시스템 | 2020-07-30 | 2022-02-07 | 6 | 등록 유지 | 증착 소스 3축 위치 조절 |
| KR102854300B1 | 오럼머티리얼 | 2022-05-16 | 2025-09-05 | 12 | 등록 유지 | 압연 잔류응력 상쇄로 장력 제어 |
| KR102651394B1 | 엘지디스플레이, 이에스티 | 2022-10-19 | 2024-03-29 | 24 | 등록 유지 | 수평 고정형, 티타늄 냉각 정전척 |
| KR102595560B1 | 템스코 | 2023-01-30 | 2023-10-31 | 3 | 등록 유지 | 8세대급 마스크 분할 접합, 4방향 인장 |

</div>

출원일은 한국 출원일 기준이다. 우선일이 이보다 앞서는 건이 있을 수 있으나 이번 조사에서 개별 확인하지 않았다. 상태는 구글특허 법적 상태 필드 기준이며, 연차료 납부 이력까지 확인한 것은 아니다.
