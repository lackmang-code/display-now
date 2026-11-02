---
title: "커버윈도 결정화유리·사파이어"
searchTitle: "커버윈도 결정화유리(Glass-Ceramic)·사파이어(Sapphire): 리튬 다이실리케이트, 나노 결정과 투명성, 파괴인성, 경도, 굴절률과 반사, Ceramic Shield"
summary: "결정화유리는 유리 속에 150nm 이하 결정을 키워 파괴인성을 0.82에서 1.15MPa·m^0.5로 올렸지만, 경도는 유리와 같은 6.5GPa 근처에 머문다. 사파이어는 22.5GPa로 세 배 넘게 단단하지만 이온교환을 할 수 없고 한 면 반사가 7.7%다. 결정이 투명하게 남는 조건, 결정화 열처리, 사파이어가 시계에 남은 이유를 정리한다."
section: tech-note
reporter: TEKER
publishedAt: 2026-11-03
collectWeekStart: '2026-10-26'
readingMinutes: 9
tags: [커버윈도, 결정화유리, 사파이어, 세라믹실드, 파괴인성, 나노결정, 이온교환]
series:
  id: teker-deep
  part: 3
  episode: 2
featured: false
sources:
  - type: patent
    title: "US12071364B2 Glass ceramic articles having improved properties and methods for making the same (Corning, 우선일 2018-07-16)"
    url: "https://patents.google.com/patent/US12071364"
  - type: patent
    title: "US11634360B2 Chemically strengthened lithium disilicate-petalite glass-ceramics (Corning, 우선일 2018-11-13)"
    url: "https://patents.google.com/patent/US11634360"
  - type: patent
    title: "EP1390312A1 Transparent gallate glass-ceramics (Corning, 우선일 2001-05-03)"
    url: "https://patents.google.com/patent/EP1390312"
  - type: patent
    title: "US9718249B2 Laminated aluminum oxide cover component (Apple, 우선일 2012-11-16)"
    url: "https://patents.google.com/patent/US20140139978A1/en"
  - type: article
    title: "Corning, Gorilla Glass Ceramic 2 Product Information Sheet (2025-05)"
    url: "https://www.corning.com/microsites/csm/gorillaglass/PI_Sheets/CGG_Corning%20Gorilla%20Glass%20Ceramic%202_PI%20Sheet.pdf"
  - type: article
    title: "Corning, Gorilla Glass Victus 2 Product Information Sheet"
    url: "https://www.corning.com/microsites/csm/gorillaglass/PI_Sheets/Gorilla_Glass_Victus_2_PI_Sheet.pdf"
  - type: article
    title: "Kyocera Fineceramics Europe, SA100 Sapphire material data sheet (2023-04-03)"
    url: "https://www.kyocera-fineceramics.de/fileadmin/user_upload/Download/werkstoffdatenblaetter/saphir/Kyocera_Fineceramics_Europe_SA100.pdf"
  - type: article
    title: "NIST Ceramic Data Portal, Fracture toughness of sapphire (Iwasa & Ueno 1981 외)"
    url: "https://srdata.nist.gov/CeramicDataPortal/Tough/Ftgsaph"
  - type: article
    title: "Corning, Gorilla Glass Success (2013-05)"
    url: "https://www.corning.com/emea/en/about-us/news-events/features/gorilla-glass-success.html"
  - type: article
    title: "GT Advanced Technologies, Form 8-K cleansing materials (SEC, 2015-03)"
    url: "https://www.sec.gov/Archives/edgar/data/0001394954/000162828015001409/cleansingmaterialsmarch3.htm"
  - type: article
    title: "GT Advanced Technologies, GT Advanced Technologies Announces Larger Capacity ASF165 Sapphire Furnace (2014-05)"
    url: "https://eqs-news.com/news/corporate/gt-advanced-technologies-announces-larger-capacity-asfr165-sapphire-furnace/799788"
  - type: article
    title: "Apple Newsroom, Apple introduces iPhone 12 Pro and iPhone 12 Pro Max with 5G (2020-10-13)"
    url: "https://www.apple.com/newsroom/2020/10/apple-introduces-iphone-12-pro-and-iphone-12-pro-max-with-5g/"
  - type: article
    title: "Apple Newsroom, Apple awards Corning $45 million from its Advanced Manufacturing Fund (2021-05-10)"
    url: "https://www.apple.com/newsroom/2021/05/apple-awards-corning-45-million-from-its-advanced-manufacturing-fund/"
  - type: article
    title: "Apple Newsroom, Apple debuts iPhone 17 (2025-09)"
    url: "https://www.apple.com/newsroom/2025/09/apple-debuts-iphone-17/"
  - type: article
    title: "Apple, Apple Watch Series 12 Technical Specifications"
    url: "https://www.apple.com/si/apple-watch-series-12/specs/"
  - type: article
    title: "Apple, Apple Watch Ultra 4 Technical Specifications"
    url: "https://www.apple.com/si/apple-watch-ultra-4/specs/"
  - type: article
    title: "Samsung Newsroom, Samsung Galaxy S25 Ultra Introduces Corning Gorilla Armor 2 (2025-01)"
    url: "https://news.samsung.com/ca/samsung-galaxy-s25-ultra-introduces-corning-gorilla-armor-2-the-industrys-first-anti-reflective-glass-ceramic-for-mobile-devices"
---
1편은 화학강화유리가 남긴 숙제 둘로 끝났다. 하나는 이온교환이 경도를 올리지 못해 긁힘이 그대로 남는다는
것이고, 다른 하나는 압축을 넣는 방식에 한계가 있어 그다음은 소재 자체의 인성을 올려야 한다는 것이다.
이 편은 분류도의 같은 유리 줄 평판 칸에서 두 숙제에 각각 답하려 한 두 소재를 본다.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/window-map.svg" alt="커버윈도 분류도. 가로 칸은 평판, 곡면, 접힘, 차량 대면적이고 세로 줄은 유리와 플라스틱이며, 소재마다 쓰이는 곳이 적혀 있다. 유리 평판 칸은 강화유리(폰·태블릿·노트북), 결정화유리(폰 전면·시계), 사파이어(시계·렌즈 커버)다. 유리 곡면은 3D 열성형 유리(곡면 폰·웨어러블), 접힘은 UTG(폴더블 폰), 차량은 냉간 성형 유리(차량 대시보드)다. 플라스틱 줄은 PMMA·PC(산업용 디스플레이), 성형 PC(차량 커버렌즈), CPI(2019년 첫 폴더블), PC·PMMA(차량 디스플레이·HUD)다. 이 편이 다루는 결정화유리와 사파이어가 강조돼 있다." />
  <figcaption>3부 분류도. 이 편은 유리 줄 평판 칸의 결정화유리와 사파이어를 다룬다.</figcaption>
</figure>

결정화유리는 유리 속에 작은 결정을 키운 소재이고, 사파이어는 처음부터 하나의 결정인 소재다. 둘 다
결정을 쓰지만 얻는 것이 다르다. 결정화유리는 질겨졌고, 사파이어는 단단하다. 이 편은 그 차이가 어디서
오는지, 그리고 그 대가가 무엇인지를 숫자로 본다.

## 유리 속에 결정을 키우면 무엇이 달라지나

**결정을 키워 얻은 것은 경도가 아니라 인성과 강성이다.** Corning이 2025년 5월 낸 Gorilla
Glass Ceramic 2 제품 시트는 파괴인성을 1.15MPa·m^0.5로 적었다. 같은 회사의 알루미노실리케이트
유리 Victus 2는 0.82다. 1.4배다.

영률도 79에서 103GPa로 1.3배가 됐다. 그런데 경도는 거의 그대로다. 두 시트가 서로 다른 눈금으로
적어 그대로 비교할 수는 없지만, 강화 뒤 Victus 2는 비커스 670, Glass Ceramic 2는 누프
660kgf/mm²로 둘 다 6.5GPa 근처다.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/properties.svg" alt="Victus 2 유리, Glass Ceramic 2, 사파이어의 물성을 다섯 줄 막대로 비교한 그림. 파괴인성은 0.82, 1.15, 결정면에 따라 2.4에서 4.5MPa·m^0.5. 경도는 6.6(비커스), 6.5(누프), 22.5GPa(비커스). 영률은 79, 103, 470GPa. 밀도는 2.41, 2.48, 3.97g/cm³. 한 면 반사는 굴절률로 계산해 4.3, 4.5, 7.7%다." />
  <figcaption>결정화유리는 질기고 뻣뻣해졌지만 경도는 유리 자리에 머문다. 사파이어는 단단하고 무겁고 더 반사한다.</figcaption>
</figure>

Corning 특허 출원에도 같은 범위가 나온다. 2018년 우선일의 출원은 파괴인성 1.0~2.0MPa·m^0.5,
영률 95~110GPa를 양태로 적었다. 같은 시기 다른 출원은 이중 외팔보 시험으로 1.32, 셰브론
노치 시험으로 1.1MPa·m^0.5를 쟀다.

결정은 유리와 다른 상이다. 2018년 출원은 리튬 다이실리케이트와 페탈라이트 두 결정을 각각 20wt%
넘게 두고, 남은 유리를 5~30wt%로 적었다. 다른 출원은 결정이 70~99%를 차지하는 범위를 들었다.
유리 속에 결정을 섞은 것이 아니라, 결정 사이에 유리가 조금 남은 쪽에 가깝다.

인성이 오른 것은 1편의 압축 예산과 이어진다. 같은 출원은 최대 중앙 인장을 90MPa 넘게 잡은
양태를 적었다. 1편에서 본 유리의 파쇄성 문턱식을 대면 0.75mm 판의 문턱은 59MPa이다. 유리라면
터질 쪽의 인장을 범위에 넣은 셈이다.

애플이 2020년 아이폰 12 Pro에서 이 소재를 Ceramic Shield라는 이름으로 내놓았다. 애플은 나노 세라믹
결정을 넣어 인성을 크게 높였고, 낙하 성능이 이전 세대 아이폰보다 4배 좋아졌다고 소개했다. 경도나 긁힘은
그때 말하지 않았다.

## 결정화 열처리와 이온교환

결정은 판을 다 만든 뒤에 키운다. 녹인 유리를 판으로 성형하고, 그 판을 두 번 데운다. 애플은 2021년
Corning 투자를 발표하며 이를 「유리 기질 안에 나노 결정을 만드는 고온 결정화 단계」로 설명했다.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/ceramming.svg" alt="결정화 열처리 모식도. 위에는 유리 판 세 장이 있다. 첫째는 결정이 없는 유리, 둘째는 작은 핵이 점처럼 생긴 판, 셋째는 150나노미터 이하 결정이 판의 70에서 99퍼센트를 채운 판이다. 아래 온도 그래프는 550에서 650도에서 핵을 만들고, 680에서 800도에서 결정을 키운 뒤, 분당 약 4도로 약 450도까지 식히고 급랭하는 이력이다." />
  <figcaption>낮은 온도에서 핵을 심고, 높은 온도에서 키운다(Corning US12071364B2의 범위).</figcaption>
</figure>

Corning의 2018년 출원은 핵 생성을 550~650℃에서 1분에서 6시간, 결정 성장을 680~800℃에서
1분에서 4시간으로 적었다. 그 뒤 분당 약 4℃로 약 450℃까지 천천히 식히고 급랭한다.

결정을 키운 뒤에도 이온교환을 한다. 남은 유리와 결정에 든 리튬·나트륨이 바꿔 넣을 이온이 된다.
같은 해 리튬 다이실리케이트·페탈라이트 출원의 실시예는 질산칼륨 80%, 질산나트륨 20%에 질산리튬 0.1%를 더한 욕조에
500℃로 16시간 담갔다.

이 출원이 든 압축 깊이는 80~300마이크로미터, 두께의 약 0.18~0.25배다. 1편의 리튬 유리가 두께
0.5mm에서 90마이크로미터였던 것과 같은 방향으로, 더 깊은 쪽까지 범위를 잡았다.

## 결정이 있는데 왜 투명한가

**결정이 빛의 파장보다 훨씬 작고, 결정과 유리의 굴절률이 거의 같기 때문이다.** 둘 중 하나만으로는
부족하다. Corning의 2001년 투명 결정화유리 출원은 1969년 Beall·Duke 논문을 인용해 이 조건을 적었다.

결정과 유리의 굴절률 차가 크면 결정이 50nm보다 작아야 투명하고, 10nm까지 낮추는 편이 좋다. 굴절률
차와 결정의 복굴절이 둘 다 작으면 50nm보다 큰 결정도 투명할 수 있다. Corning의 2018년 출원이
결정 크기를 150nm 이하로 잡은 것은 이 둘째 길이다.

Glass Ceramic 2 시트는 내부와 압축층의 굴절률을 둘 다 1.54로 적었다. 0.6mm 두께의 haze는
0.15% 이하, 투과율은 500nm 이상에서 90% 이상, 400~500nm에서 88% 이상이다. 파란 쪽이 조금
덜 통과한다.

아래 시뮬은 결정을 작은 구로 보고 레일리 산란으로 haze를 계산한다. 이 모형에서 결정이 부피의 80%를
차지하고 크기가 150nm라면, 결정과 유리의 굴절률 차를 약 0.001 안에 묶어야 시트의 0.15%를 지킨다.
결정을 50nm로 줄이면 허용 폭이 약 0.005로 다섯 배 넓어진다.

<div class="sim-embed" data-sim="gc-haze-demo">
  <template data-sim-note>결정 크기·굴절률 차·결정 비율을 바꾸며 0.6mm 결정화유리의 haze가 Corning 시트 값 0.15%를 넘는지 봅니다. 결정을 서로 같은 크기의 구로 보고 레일리 산란 단면적으로 감쇠를 계산했습니다. 결정이 70~99%를 차지하는 조밀한 계라 부피 비율 f 대신 두 상 혼합 근사인 f(1−f)를 썼고, 결정의 복굴절·크기 분포·배열 상관·표면 반사는 넣지 않았습니다. 흩어진 빛을 모두 haze로 셌습니다. 실제 haze 측정은 2.5° 밖으로 꺾인 빛만 세므로 이 값이 더 큽니다. 기준선은 Corning Gorilla Glass Ceramic 2 제품 시트의 haze 상한(0.6mm, 0.15%)입니다. 결정과 유리의 실제 굴절률 차는 공개되지 않아 프리셋을 두지 않았습니다.</template>
</div>

파란빛이 더 흩어지는 것도 같은 식에서 나온다. 레일리 산란은 파장의 네제곱에 반비례해, 450nm는
550nm보다 약 2.2배 더 흩어진다. 시트에서 파란 쪽 투과율 하한이 2%포인트 낮은 것과 방향이 같다.

낙하 숫자는 시트끼리 줄 세우기 어렵다. Glass Ceramic 2 시트는 0.6mm 판이 80방 사포에서
1m 낙하를 견뎠고, 경쟁 리튬 알루미노실리케이트는 대개 0.5m 이하에서 깨졌다고 적었다. 그런데 1편에서
본 Victus 2 시트도 80방 사포 1m를 적었다.

삼성은 2025년 1월 갤럭시 S25 울트라에 Corning의 결정화유리 Gorilla Armor 2를 쓰며, 콘크리트를
모사한 면에서 2.2m 낙하를 견뎠고 다른 결정화유리는 1m에서 깨졌다고 소개했다. 모두 회사가 정한 조건의
사내 시험이다.

## 사파이어는 왜 시계에 남았나

**사파이어는 셋 가운데 가장 단단하고 가장 질기지만, 이온교환으로 압축을 넣을 수 없고 더 무겁고 더
반사한다.** 사파이어는 산화알루미늄 단결정이다. 교세라 자료는 순도 99.99% 이상, 비커스 경도
22.5GPa로 적었다. 강화유리의 6.5GPa보다 세 배 넘게 단단하다.

인성도 숫자로는 높다. 미국 국립표준기술연구소(NIST) 자료에 모인 측정에서 사파이어의 파괴인성은 금이
가는 결정면에 따라 2.4에서 4.5MPa·m^0.5다. Glass Ceramic 2의 두 배에서 네 배 가까이다.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/flaw-strength.svg" alt="표면 흠의 깊이(10에서 200마이크로미터, 로그 눈금)에 따른 파괴 응력 그래프. 응력은 파괴인성을 1.12 곱하기 루트 파이 a로 나눈 값이다. 사파이어는 파괴인성 2.4에서 4.5 사이의 띠, Glass Ceramic 2는 1.15, Victus 2는 0.82다. 50마이크로미터 흠에서 각각 171, 82, 58메가파스칼이다. 유리와 결정화유리는 여기에 이온교환 압축이 더해지지만 사파이어에는 바꿔 넣을 알칼리 이온이 없다는 메모가 있다." />
  <figcaption>인성만 보면 사파이어가 가장 높다. 유리와 결정화유리는 여기에 이온교환 압축을 더한다.</figcaption>
</figure>

표면에 깊이 a의 흠이 있을 때 소재가 견디는 응력은 대략 인성을 √(πa)에 비례하는 값으로 나눈
것이다. 50마이크로미터 흠이라면 사파이어는 낮은 쪽 인성으로도 171MPa, Glass Ceramic 2 82MPa, Victus 2
58MPa이다.

그런데 유리와 결정화유리는 이 위에 이온교환 압축을 얹는다. 흠 끝이 압축 안에 있으면 당기는 힘은 그
압축부터 상쇄해야 한다. 1편에서 본 리튬 유리는 90마이크로미터 깊이까지 압축이 이어졌다. 사파이어에는
바꿔 넣을 알칼리 이온이 없다.

Corning은 2013년 자사 글에서 비슷한 마모를 겪은 뒤 고릴라글래스를 깨는 데 사파이어보다 약 세 배
큰 힘이 든다고 썼다. 시험 조건은 밝히지 않았고, 경쟁 소재에 대한 회사 주장이다. 같은 글은 사파이어가
부피당 67% 무겁다고 적었다. 교세라 밀도 3.97과 Victus 2의 2.41을 견주면 맞는 숫자다.

빛에서도 손해를 본다. 사파이어의 굴절률은 약 1.77로 유리보다 높아, 코팅이 없을 때 한 면 반사가
7.7%다. Glass Ceramic 2는 4.5%다. 두 면을 합치면 14.3%와 8.6%로 약 6%포인트 차이다.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/reflection.svg" alt="수직 입사에서 두 판의 반사를 비교한 그림. 굴절률 1.54인 Glass Ceramic 2는 앞면에서 4.5퍼센트, 뒷면에서 4.1퍼센트를 반사해 두 면 합계 8.6퍼센트, 투과 91.4퍼센트다. 굴절률 1.77인 사파이어는 앞면 7.7퍼센트, 뒷면 6.6퍼센트로 합계 14.3퍼센트, 투과 85.7퍼센트다." />
  <figcaption>굴절률이 높을수록 표면 반사가 크다. 코팅 없이 두 면을 합치면 약 6%포인트 차이다.</figcaption>
</figure>

Corning이 2013년 글에서 사파이어가 빛을 약 6%포인트 덜 통과시킨다고 적은 것과 같은 크기다. 사파이어
커버는 2부 AR 편에서 본 반사방지 코팅이 유리보다 더 절실하다.

만드는 일도 다르다. 유리는 녹여서 판으로 흘리지만, 사파이어는 결정 덩어리를 키워 자르고 갈아야 한다.
같은 Corning 글은 사파이어를 만드는 데 유리보다 4,000배 넘게 오래 걸리고, 커버 가공비가 고릴라글래스
값의 열 배를 넘는다고 주장했다.

대량 생산을 겨냥한 시도는 있었다. 사파이어 성장로 업체 GT Advanced Technologies는 2014년 5월
한 번에 165kg짜리 덩어리를 키우는 로를 발표했다. 앞 모델보다 40% 큰 덩어리다.

이 회사는 애플의 선급금으로 애리조나 메사에서 사파이어 공장을 돌렸다. 2015년 3월 공시에 따르면 받을 수
있던 선급금 5억 7,800만 달러 가운데 4억 3,900만 달러를 받았다.

메사에 있던 장비 2,138대 가운데 2,036대가 애플과의 합의에 묶였고, 덩어리 약 3,500개가 남았다. 메사와 세일럼의 사파이어 사업은
정리 단계에 들어갔다.

그래서 사파이어는 작은 면에 남았다. 애플 사양표 기준으로 Apple Watch Ultra 4는 평평한 사파이어
전면을, Series 12는 티타늄과 세라믹 케이스에만 사파이어를 쓴다. 같은 Series 12의 알루미늄 케이스는
Ceramic Shield 2다.

| 소재 | 지금 쓰이는 자리 (회사 발표 기준) |
|---|---|
| 결정화유리 | 아이폰 12 Pro 이후 Ceramic Shield, 갤럭시 S25 울트라 Gorilla Armor 2, Apple Watch Series 12 알루미늄 |
| 사파이어 | Apple Watch Ultra 4, Apple Watch Series 12 티타늄·세라믹 |

애플은 2012년 출원에서 결정 방향이 서로 다른 사파이어 층을 여러 장 붙인 커버를 냈다. 방향마다 다른
기계적 성질을 겹쳐 쓰려는 것이다. 단결정의 방향성이 설계 변수이자 숙제라는 뜻이다.

## 결정화유리·사파이어 칸에서 남는 것

이 칸의 숫자로 줄이면, 결정화유리는 파괴인성을 0.82에서 1.15MPa·m^0.5로 올리면서 굴절률 1.54와
haze 0.15%를 지켰다. 사파이어는 경도 22.5GPa로 긁힘을 막지만 이온교환 압축이 없고 두 면 반사가
14.3%다.

1편의 두 숙제 가운데 인성은 결정화유리가 풀었고, 긁힘은 이 칸에서 끝내 소재가 아니라 코팅으로 넘어갔다.
애플은 2025년 아이폰 17의 Ceramic Shield 2에 자체 설계한 코팅으로 긁힘 저항을 3배 올렸다고
밝혔다. 삼성의 Gorilla Armor 2 역시 긁힘 저항과 반사방지를 함께 내세웠다.

다음 편은 유리 줄을 떠나 플라스틱 줄로 간다. 같은 평판 칸에서 PMMA와 PC는 깨지지 않는 대신 무엇을
내주는지, 그리고 2부에서 본 하드코트가 왜 거기서 시작됐는지를 본다.
