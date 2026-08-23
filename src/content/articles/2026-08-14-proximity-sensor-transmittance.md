---
title: "통화할 때 화면은 어떻게 저절로 꺼질까"
summary: "근접센서 신호가 OLED를 두 번 통과하면 세기는 거리의 제곱(T²)으로 줄어듭니다. 신호 마진을 확보하려 발광을 키우면 이번엔 TFT 광열화라는 신뢰성 리스크가 따라옵니다. 언더디스플레이 센서를 설계하는 엔지니어가 이 트레이드오프를 어떻게 풀어야 하는지 정리했습니다."
section: tech-note
reporter: TEKER
publishedAt: 2026-08-14
series:
  id: teker-deep
  part: 1
  episode: 2
readingMinutes: 10
tags: [근접센서, OLED, TFT, ams OSRAM]
sources:
  - type: patent
    title: "Emissive display configured with through-display zero-distance proximity sensor"
    number: "US12050264"
  - type: patent
    title: "Organic light emitting display device for preventing deterioration of driving transistors"
    number: "US9666120"
  - type: patent
    title: "Array substrate, display panel and display device thereof"
    number: "US11978396"
  - type: patent
    title: "Synchronously and locally turning-off sub pixels in under-display sensor area of AMOLED panel"
    number: "US10984731"
  - type: paper
    title: "Sputtering-driven formation of interstitial oxygen for intrinsic NIR detection in IGZO phototransistor"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13043663/"
  - type: disclosure
    title: "ams OSRAM TCS3720 데이터시트 및 CES 공개 자료"
  - type: patent
    title: "Light-blocking pigment composition and light-blocking member for display"
    number: "US20160200912A1"
  - type: patent
    title: "Perylene black pigments with enhanced near-infrared-transparency properties"
    number: "WO2025031982A1"
  - type: disclosure
    title: "DIC Spectrasense™ Black L 0082 / BASF PALIOGEN® Black 계열 제품 자료"
featured: false
paywallAfter: 0
---

## 1. 화면에 손이 다가오면

전화가 걸려 오고, 화면에 귀를 대는 순간 화면이 꺼진다. 이 익숙한 동작 뒤에는 OLED 패널 아래 숨은, 손톱보다 작은 칩 하나가 있다. 근접 센서(Proximity Sensor)다. 지난 편에서 다룬 UDC 카메라가 "외부에서 들어온 빛으로 상을 맺는" 문제였다면, 근접 센서는 "패널이 직접 빛을 쏘고 그 반사를 되받는" 문제다.

이 칩의 임무는 단순하다. 지금 화면 앞에 뭔가 가까이 있는가. 그런데 답을 알아내는 방식이 수동 감지와는 정반대다. 밖에서 들어오는 빛을 가만히 받기만 해서는 판단할 수 없다. 근접 센서는 스스로 빛을 쏘고, 그 빛이 되돌아오는지를 직접 확인해야 한다. 그것도 사람 눈에는 보이지 않는 근적외선, 파장 940nm로.

왜 굳이 안 보이는 빛을 따로 쏠까. 가시광은 이미 주변 조명·햇빛으로 가득 차 있어서, 센서가 쏜 빛과 원래 있던 빛을 구별할 수 없다. 반면 940nm 근적외선은 자연광에 거의 섞이지 않는 "깨끗한" 대역이라, 지금 돌아온 빛이 방금 쏜 그 빛인지를 명확히 구분할 수 있다.

<figure class="fig-single">
  <img src="/articles/2026-08-14-proximity-sensor-transmittance/그림2_TCS3720_다이사진.webp" alt="ams TCS3720 실제 다이 사진. ALS와 Proximity 영역 통합" />
  <figcaption>실제 3-in-1 통합 센서 다이(ams TCS3720, 3.34×1.36×0.6mm OLGA 패키지). <span class="src">출처: ams OSRAM 데이터시트</span></figcaption>
</figure>

이 능동 감지 방식 덕분에 통화 중 자동 화면 소등은 물론, 커버 케이스가 덮였는지, 주머니 속에 들어갔는지까지 판단할 수 있다. 문제는 이 "쏘고 받는" 방식이 OLED 패널에게는 완전히 새로운 숙제를 던진다는 점이다.

## 2. 신호는 왜 제곱으로 사라지는가

근적외선은 패널을 두 번 통과한다. 나갈 때 한 번, 물체에 반사돼 돌아올 때 한 번이다. 패널의 IR 투과율을 T라 하면 최종 신호는 T²에 비례해 줄어든다. 특허 US12050264에 따르면 OLED 패널의 IR 투과율은 대략 3~10% 수준인데, 이 값을 제곱하면 실제 수신 신호는 0.09~1%까지 떨어진다.[^1] 빛을 한 번만 통과시키는 감지보다 자릿수가 다르게 약해지는 셈이다. 손실의 대부분은 금속 음극층에서 발생하며, 편광판은 오히려 IR을 잘 통과시켜 주범이 아니다.

여기에 또 하나의 변수가 끼어든다. 다음 절에서 다룰 차광층(BML)이다. TFT를 지키려고 차광층을 두껍게 할수록 정작 통과시켜야 할 IR까지 함께 막힌다. 아래에서 차광 비율과 패널 개구 투과율을 직접 움직여 이 트레이드오프를 확인할 수 있다.

<div class="sim-embed" data-sim="proximity-transmittance-demo" data-params='{"baseTransmittancePct":6,"shieldRatioPct":40}'>
  <p class="sim-fallback">JavaScript가 꺼져 있으면 이 영역이 표시되지 않습니다.</p>
</div>

## 3. TFT가 새로운 방식으로 위협받는다

광원이 생기자 TFT가 새로운 방식으로 위협받는다. LTPS·Oxide(IGZO) TFT는 원래 빛에 반응하는 성질이 있어서, OLED 패널은 설계 단계부터 정면에서 들어오는 외부광을 막는 차광구조를 갖추고 있다. 하지만 정면광을 막도록 설계된 기존 구조로는 패널 배면에서 새로 생긴 IR 광원의 노출 경로를 막지 못한다. 그래서 구동 TFT(T1) 하부에 별도의 금속 차광층(BML, Bottom Metal Layer)을 추가해야 한다.[^2]

<figure class="fig-single">
  <img src="/articles/2026-08-14-proximity-sensor-transmittance/그림3_LTPO_BML단면도.webp" alt="LTPO 백플레인 단면도. LTPS와 Oxide TFT가 공존하는 하이브리드 구조, BML 위치 표시" />
  <figcaption>BML은 스택 맨 아래 Barrier층에, LTPS TFT 하부에만 선택적으로 형성된다. <span class="src">출처: 특허 도면 재구성</span></figcaption>
</figure>

왜 T1(구동 TFT)이 특히 취약할까. T1은 OLED에 흘리는 전류를 직접 제어하는 소자다. IR이 조사되면 활성층 내에 광전류가 생기고, 이는 문턱전압(Vth)을 이동시킨다. Vth가 이동하면 T1이 설정보다 많거나 적은 전류를 흘려 OLED 휘도에 오류가 생긴다. 그 결과가 IR 조사 영역에 나타나는 화면 얼룩, 이른바 워터마크 아티팩트다.[^3] LTPS(다결정 실리콘)와 Oxide(IGZO)는 취약한 경로가 다르다. LTPS는 밴드갭이 약 1.1eV로 좁아 850~940nm 대역에서도 결정립계 트랩 상태를 거쳐 광전류가 늘어날 수 있고, IGZO는 원래 자외선·가시광에 더 민감하지만 표면 산소 결함 준위를 통해 850nm 근처에서도 상당한 광응답을 낸다는 사실이 최근 IGZO 포토트랜지스터 연구에서 확인됐다(반응도 42.5A/W).[^4]

ams의 TCS3720은 ALS Engine과 Proximity Engine을 한 다이에 통합한 3-in-1 센서다. LED 구동 핀이 IR LED를 켜고, 반사파는 아날로그-디지털 변환을 거쳐 디지털 신호로 바뀐다. 핵심은 VSYNC 핀이다. 디스플레이 프레임 신호를 받아 블랭킹 구간에만 맞춰 IR을 쏘고 받는다.

<figure class="fig-single">
  <img src="/articles/2026-08-14-proximity-sensor-transmittance/그림1_TCS3720_블록도.webp" alt="ams TCS3720 블록도. ALS Engine, Proximity Engine, Digital Core 구조" />
  <figcaption>TCS3720 블록도. 근접·조도·디지털 코어가 한 칩에 통합된다. <span class="src">출처: ams OSRAM 데이터시트</span></figcaption>
</figure>

## 4. 또 다른 과제들

화소를 구획하는 BPDL(Black Photo-definable Layer)과 BM(Black Matrix)에도 새로운 요구가 얹힌다. 원래 화소 사이로 새는 빛을 막아 명암비를 높이는 이 차광막은 가시광에는 완전히 불투명해야 제 역할을 한다. 그런데 근접 센서 시대에는 같은 소재가 940nm 근적외선만은 통과시켜야 한다는 모순된 요구가 하나 더 얹힌다. 사람 눈에는 새까맣게 보이면서 IR 파장 창에서는 투명한, 이중적인 광학 특성이 필요한 셈이다.

이런 이중특성 소재는 이미 실재한다. 특허 US20160200912A1은 가시광(400~800nm)에서는 투과율 1% 이하, 근적외선(800~1100nm)에서는 80% 이상을 확보한 디스플레이용 차광 안료 조성물을 제시한다.[^5] 카본블랙 대신 페릴렌(perylene)계 안료를 쓰는 것이 핵심으로, 2025년 공개된 특허(WO2025031982A1)는 이 페릴렌 흑색 안료의 근적외선 투과 특성을 한층 개선한 배합을 다룬다.[^6] 같은 원리가 자동차 업계에도 있다. 라이다·카메라 센서를 차체 도장 아래 숨기려는 목적으로, DIC의 Spectrasense™ 계열이나 BASF의 PALIOGEN® Black 계열처럼 "눈에는 검게, 센서에는 투명하게" 보이는 안료가 이미 상용화돼 있다.[^7] 아래에서 소재를 바꿔가며 가시광·IR 투과 스펙트럼이 어떻게 달라지는지 볼 수 있다.

<div class="sim-embed" data-sim="bpdl-bm-spectrum-demo" data-params='{"material":"dual","coveragePct":50}'>
  <p class="sim-fallback">JavaScript가 꺼져 있으면 이 영역이 표시되지 않습니다.</p>
</div>

또 하나의 방향은 아예 별도 칩을 없애는 것이다. 유기 포토다이오드(OPD)는 근적외선에도 반응할 수 있다. 여기에 발광까지 겸하는 자발광-수광 통합 소자가 더해진다면, 화소 자체가 발광부와 수신부를 겸하는 구조도 가능하다. 아직 걸음마 단계지만, 패널 회사가 차별화할 수 있는 연구 테마다.

## 5. 남은 물음

### ① 차광과 투과, 어디까지 절충할 것인가

T1을 완전히 가리면 광열화는 사라지지만 IR 투과율도 함께 줄어든다. 이미 3~10%에 불과한 투과율을 더 낮추는 대신, T1 위치만 선택적으로 가리거나 픽셀 개구부·픽셀 간 간극을 IR 경로로 활용하는 레이아웃 최적화가 현실적인 절충안으로 논의되고 있다. 최적의 차광 비율이 얼마인지는 아직 공개된 정량 기준이 없다.

### ② 크로스토크는 완전히 없앨 수 있는가

물체까지 가지 않고 패널 내부에서 산란·반사되다 곧바로 수신부로 새는 직접 결합광은 반사파와 구별되지 않는 잡음이다. 발광부와 수신부를 물리적으로 떨어뜨리거나 광학 배리어를 세워 줄일 수는 있지만, 패널이 얇아질수록 이 여유 공간도 함께 줄어든다.

## 6. 핵심 용어

<dl class="term-list">
  <div><dt>근접 센서</dt><dd>물체가 화면에 가까이 있는지를 스스로 빛을 쏘고 반사파를 받아 판단하는 능동형 센서.</dd></div>
  <div><dt>T²</dt><dd>근적외선이 패널을 왕복(발신+수신)하며 겪는 투과율 손실. 편도 투과율 T의 제곱에 비례해 신호가 줄어든다.</dd></div>
  <div><dt>BML</dt><dd>Bottom Metal Layer. 구동 TFT(T1)를 배면 IR로부터 보호하기 위해 스택 하부에 추가하는 금속 차광층.</dd></div>
  <div><dt>워터마크 아티팩트</dt><dd>IR 조사로 TFT 문턱전압이 이동해 생기는 국소적 휘도 오류. 화면에 얼룩 형태로 나타난다.</dd></div>
  <div><dt>BPDL/BM</dt><dd>화소 사이 누설광을 막는 차광막. 근접 센서용으로는 가시광은 막고 IR만 통과시키는 이중 특성이 요구된다.</dd></div>
</dl>

[^1]: 특허 US12050264. OLED 패널의 근적외선 투과율 3~10% 수치 및 방출-수신 양방향 구조를 근거로 한다.
[^2]: 특허 US9666120(구동 TFT 광열화 방지를 위한 차광 구조), US11978396(이중 차광층 구조).
[^3]: 특허 US10984731. 언더디스플레이 센서 영역에서 IR 발광부와 픽셀 회로 간 상호작용으로 생기는 밝기 이상(깜빡임·얼룩) 현상과 완화 구조를 다룬다.
[^4]: IGZO 포토트랜지스터의 850nm 근적외선 감지 연구. 계면 산소 결함을 이용해 반응도 42.5 A/W, 외부양자효율 6.2×10³%를 달성했다고 보고한다.
[^5]: 특허 US20160200912A1. 디스플레이용 차광 안료 조성물이 가시광(400~800nm) 투과율 1% 이하, 근적외선(800~1100nm) 투과율 80% 이상을 동시에 만족한다고 명시한다.
[^6]: 특허 WO2025031982A1(2025년 공개). 페릴렌계 흑색 안료의 근적외선 투과 특성을 개선한 배합을 다룬다.
[^7]: DIC Spectrasense™ Black L 0082, BASF PALIOGEN® Black 계열 제품 공개 자료. 디스플레이용은 아니지만 자동차 라이다·카메라 센서를 가시광에는 검게, 센서 파장에는 투명하게 감추는 동일한 원리의 상용 안료다.
