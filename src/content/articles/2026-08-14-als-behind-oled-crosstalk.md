---
title: "화면이 밝은데 자동 밝기는 바깥을 어떻게 잴까"
searchTitle: "언더디스플레이 조도센서(ALS) 원리와 OLED 크로스토크"
summary: "OLED 아래로 숨은 조도센서가 자기 발광 빛과 외부광을 구분하지 못하면, 화면 밝기 제어가 통째로 흔들립니다. 편광판을 없애는 최근 트렌드가 이 문제를 오히려 키우는 이유와, 센서·패널 설계팀이 실제로 마주치는 크로스토크 보정 방법을 정리했습니다."
section: tech-note
reporter: TEKER
publishedAt: 2026-08-14
series:
  id: teker-deep
  part: 1
  episode: 3
readingMinutes: 10
tags: [ALS, 조도센서, OLED, 크로스토크]
sources:
  - type: disclosure
    title: "ams OSRAM TCS3720 데이터시트"
  - type: patent
    title: "Display-ambient light sensor crosstalk compensation using heat map and emission mask"
    number: "US12498264"
  - type: patent
    title: "ALS sensing/compensation system"
    number: "US12288512"
  - type: patent
    title: "OLED display panel stack structure"
    number: "US11974458"
  - type: paper
    title: "24-4: Foldable AMOLED Display Utilizing Novel COE Structure"
    url: "https://www.researchgate.net/publication/325490705"
  - type: disclosure
    title: "삼성디스플레이 Eco² OLED 보도자료"
    url: "https://global.samsungdisplay.com/28402"
  - type: paper
    title: "Sensor OLED: simultaneous fingerprint and biomarker sensing display"
    url: "https://www.nature.com/articles/s44172-024-00239-8"
featured: false
paywallAfter: 0
---

## 1. ALS란 무엇인가

어두운 방에 들어가면 화면이 스르륵 어두워지고, 햇빛 아래로 나가면 다시 밝아진다. 이 밝기를 맞추는 눈이 조도센서(ALS, Ambient Light Sensor)다. 밝기만 재는 센서로 생각하면 절반만 아는 셈이다. 요즘 behind-OLED용 ALS(ams OSRAM TCS3720 등)는 Red·Green·Blue·Clear, 즉 RGB+C 네 채널을 동시에 읽는 작은 컬러 카메라에 가깝다. 세 가지를 뽑아낸다. Clear 채널로 주변 밝기(조도)를 재고, RGB 채널의 비율로 지금 빛이 햇빛인지 형광등인지 색온도(CCT)를 읽어 화면의 화이트밸런스를 자동 조정하고, 조명이 눈에 안 보이게 깜빡이는 주파수(플리커)를 잡아 카메라 촬영 시 줄무늬(밴딩)를 막는다.

주변광 밝기와 색온도를 바꾸면 화면이 어떻게 반응하는지 직접 움직여볼 수 있다.

<div class="sim-embed" data-sim="als-white-balance-demo" data-params='{"ambientIntensityPct":55,"ambientTempK":4500}'>
  <p class="sim-fallback">JavaScript가 꺼져 있으면 이 영역이 표시되지 않습니다.</p>
</div>

이 센서는 원래 화면 위 베젤에 편하게 앉아 있었다. 그런데 화면이 앞면을 거의 다 덮는 풀스크린 시대가 오면서 앉을 자리를 잃고 화면 밑으로 숨어들어야 했다. 이 순간부터 이야기는 센서가 아니라 OLED의 이야기가 된다.

## 2. 투과율이라는 벽

<figure class="fig-float">
  <img src="/articles/2026-08-14-als-behind-oled-crosstalk/als_chip.webp" alt="behind-OLED ALS 센서 실물 다이 단면 사진" />
  <figcaption>behind-OLED ALS 센서의 실물 다이 단면. RGB+C 포토다이오드 영역이 위쪽에 보인다.</figcaption>
</figure>

OLED가 우리에겐 스스로 빛을 내는 화려한 화면이지만, 그 아래 센서 눈높이에서 보면 여러 겹으로 쌓인 불투명한 막이다. 외부광이 센서에 닿으려면 커버글라스·편광판·박막봉지·화소층을 모두 투과해야 한다. 화소전극(Anode)은 전반사막이라 투과율이 0에 가깝지만, 전극 사이 하부배선이 만든 미세한 그물망으로 빛이 새어 나간다. 특허 US11974458이 기술하는 OLED 패널 적층 구조가 이 경로를 보여준다. 그래서 ALS에게 가장 중요한 단어는 OLED의 투과특성이다.

빛이 너무 약하면 OLED 쪽이 더 투명해지는 수밖에 없다. 감도를 아무리 손톱만 한 칩에 욱여넣어도 한계가 있어서, 화소 배치·캐소드(음극) 패턴·터치 전극 구조를 투과율 쪽으로 다시 설계하는 일이 패널의 몫으로 넘어간다.

<figure class="fig-single">
  <img src="/articles/2026-08-14-als-behind-oled-crosstalk/oled_refl_trans.webp" alt="같은 OLED 패널을 반사(좌)·투과(우)로 촬영한 실제 이미지. 배선 사이 그물망으로만 빛이 통과" />
  <figcaption>같은 OLED 패널을 반사(좌)·투과(우)로 본 실제 이미지. 배선 사이 그물망으로만 빛이 통과한다.</figcaption>
</figure>

## 3. 화소 자신의 빛과 싸우다

센서 바로 위 화소도 빛을 낸다. 외부광(신호)과 화소 누설광(잡음)이 뒤섞여 센서에 들어온다는 뜻이다. 특허 US12498264는 이 문제를 두 갈래로 푼다. 하나는 타이밍이다. 화소가 짧게 꺼지는 블랭킹 구간에 맞춰 빛을 재면 순수한 외부광에 가깝게 잡힌다. 이를 위해 DDIC가 발광 타이밍을, LTPO 백플레인이 낮은 구동 주파수를 내어준다. 다른 하나는 계산이다. 화소별 광 누설을 열지도(heat map)로 만들어 화면 내용과 밝기를 반영해 잡음을 빼낸다.

<figure class="fig-single">
  <img src="/articles/2026-08-14-als-behind-oled-crosstalk/blanking_sync.webp" alt="블랭킹 동기화 타이밍 그래프 3단. OLED 발광 파형, 센서 측정창, 누적 광전하량" />
  <figcaption>OLED 발광(위)이 짧게 꺼지는 블랭킹 구간에 센서 측정창(가운데)을 맞추면 누적 광전하량(아래)에서 화소 누설광을 덜어낼 수 있다.</figcaption>
</figure>

동기화 타이밍이 얼마나 정확한지, 보정 알고리즘이 얼마나 강한지에 따라 최종 측정 오차가 달라진다. 아래에서 두 변수를 직접 움직여볼 수 있다.

<div class="sim-embed" data-sim="crosstalk-heatmap-demo" data-params='{"syncErrorPct":40,"correctionPct":50}'>
  <p class="sim-fallback">JavaScript가 꺼져 있으면 이 영역이 표시되지 않습니다.</p>
</div>

손가락이 센서를 가리면 값이 튄다. 이 경우도 스스로 판정해 값에 꼬리표를 달아 걸러낸다.

## 4. POL-less가 되면 더 쉬워질까

요즘 OLED는 편광판을 걷어내는(POL-less) 쪽으로 간다. OLED는 금속 전극이 많아 외부광을 거울처럼 반사하는데, 이 반사를 누르려고 덮는 원형 편광판이 빛의 약 절반을 흡수한다. 그래서 편광판 대신 블랙 PDL(화소 정의층)과 컬러필터로 반사를 억제하는 구조가 등장했다. 삼성은 이를 OCF, BOE·비전옥스는 CoE(Color filter on Encapsulation)라 부른다. 이 구조를 다룬 학술 논문이 그 단면을 구체적으로 보여준다.[^1] 삼성디스플레이는 이 구조를 적용한 Eco² OLED가 투과율을 33% 끌어올렸다고 밝혔다.[^2]

여기서 흔한 오해가 하나 있다. "편광판을 없앴으니 빛이 더 들어와 ALS엔 무조건 좋다"는 생각이다. 그렇게 단순하지 않다. POL-less가 하는 일은 빛을 더 통과시키는 것이 아니라 편광판 없이도 반사를 억제하는 것이다. 그 역할을 떠맡은 블랙 PDL과 컬러필터도 그 자체로 빛을 흡수·차단한다. 일반 OLED에서 센서 창 역할을 하던 Anode 사이 그물망 공간이 POL-less 구조에서는 블랙 PDL과 컬러필터로 오히려 모두 가려져, 투과율이 사실상 0에 가까워질 수 있다. POL-less 패널이라고 해서 센서가 쓸 투과율이 저절로 확보되는 것은 아니라는 뜻이다.

<figure class="fig-single">
  <img src="/articles/2026-08-14-als-behind-oled-crosstalk/polless_layers.webp" alt="일반 OLED(좌)와 POL-less OLED(우) 적층 비교. 우측은 블랙 PDL·컬러필터가 투과창을 덮는다" />
  <figcaption>일반 OLED(좌)와 POL-less OLED(우) 적층 비교. 우측은 편광판 대신 블랙 PDL·컬러필터가 반사를 억제하지만, 그만큼 센서용 투과창도 함께 가린다.</figcaption>
</figure>

진짜 과제는 POL-less의 저반사 광학특성을 유지하면서도 센서 영역에서는 ALS가 쓸 만큼의 투과율을 따로 확보하는 패널 구조를 만드는 것이다. 반사는 눌러야 하고(어두워야 화질이 좋다) 투과는 살려야 하는(밝아야 센서가 읽는다), 정면으로 충돌하는 두 요구를 센서 위 영역만 국소적으로 다시 설계해 양립시켜야 한다.

## 5. 남은 물음

### ① ALS 없이 ALS 기능을 패널에 심을 수 있는가

백플레인 능동소자(LTPS·a-Si·Oxide TFT)는 원래 빛에 반응한다. 화소를 켜고 끄는 트랜지스터가 빛을 받으면 전류가 흔들리는데, 보통은 보정해야 할 골칫거리지만 거꾸로 쓰면 광센서가 된다. 특히 Oxide(IGZO/IZO) TFT는 단파장 빛에 민감하고(밴드갭 3.0eV 이상) 누설이 낮아 유망하다. a-IZO 광센서는 청색광에서 광응답도 1280 A/W, SNR 약 10⁵을 보고한 연구도 있다.[^3] 여기에 OLED와 같은 공정으로 화소 사이에 인쇄할 수 있는 유기 포토다이오드(OPD)를 더하면, 흡수 파장을 400~600nm로 좁혀 IR 필터 없이 가시광만 읽을 수 있다. 실제로 지문과 생체신호를 동시에 감지하는 센서 OLED 연구도 나왔다.[^4]

### ② 특별한 패널 구조는 누가 설계하는가

POL-less의 저반사와 센서의 고투과를 국소적으로 양립시키는 구조는 아직 정답이 정해지지 않았다. 패널·구동회로·센서가 한 몸으로 설계되는 시스템 문제이기 때문이다.

## 6. 핵심 용어

<dl class="term-list">
  <div><dt>ALS</dt><dd>Ambient Light Sensor. 주변 밝기·색온도·플리커를 읽는 다채널 광센서.</dd></div>
  <div><dt>크로스토크</dt><dd>센서가 받는 빛에 외부광(신호)과 화소 자체 발광(잡음)이 섞이는 현상.</dd></div>
  <div><dt>블랭킹</dt><dd>화소가 짧게 꺼지는 구간. 이때 맞춰 측정하면 화소 누설광을 피할 수 있다.</dd></div>
  <div><dt>POL-less</dt><dd>원형 편광판을 걷어내고 블랙 PDL·컬러필터로 반사를 억제하는 구조(OCF/CoE).</dd></div>
  <div><dt>OPD</dt><dd>유기 포토다이오드. OLED와 같은 공정으로 화소 사이에 넣는 광센서 소자.</dd></div>
</dl>

[^1]: SID 논문 "24-4: Foldable AMOLED Display Utilizing Novel COE Structure". POL-less/CoE 구조의 단면을 학술적으로 기술한다.
[^2]: 삼성디스플레이 Eco² OLED 보도자료. 편광판 제거로 투과율 33% 향상, 소비전력 최대 25% 절감을 밝혔다.
[^3]: a-IZO 청색광센서 연구(Sci. Rep.). 광응답도·SNR 수치는 연구 단계 결과이며 상용 수치가 아니다.
[^4]: Nature Communications Engineering에 실린 센서 OLED 연구. 지문과 생체신호를 한 화면에서 동시에 감지하는 프로토타입을 보고한다.
