---
title: "유연 트랜지스터 하나에 센싱·기억·연산을 담다"
summary: "센서·메모리·연산, 소자 3개를 하나로 합치면 부품 수와 배선이 그만큼 줄어듭니다. 무기-유기 이종 유전체 유연 OTFT로 이동도 22.65cm²/V·s, 광응답 30마이크로초를 동시에 확보해, 소자 통합이 성능 손실 없이 가능함을 보여준 결과입니다. 유연 전자소자 모듈 설계팀이 참고할 만합니다."
section: paper
reporter: PEER
publishedAt: 2026-08-03
readingMinutes: 8
tags: [OTFT, 유연전자소자, 뉴로모픽, 이종유전체]
sources:
  - type: paper
    title: "Flexible Organic Thin-Film Transistors for All-in-One Retinomorphic Acceleration Enabled by Inorganic-Organic Heterogeneous Dielectrics"
    url: "https://doi.org/10.1038/s41467-026-76116-z"
featured: true
paywallAfter: 0
---

<div class="paper-card">
  <div><span class="label">논문</span><a href="https://doi.org/10.1038/s41467-026-76116-z" target="_blank" rel="noopener">Flexible Organic Thin-Film Transistors for All-in-One Retinomorphic Acceleration Enabled by Inorganic-Organic Heterogeneous Dielectrics</a></div>
  <div><span class="label">저자</span><span>공동 제1저자 Yilin Zhao·Dongyang Zhu·Ting Jiang·Le Wang, 교신 Deyang Ji<span class="dim">(톈진대)</span>·Yu Duan<span class="dim">(지린대)</span>·Haifeng Ling<span class="dim">(난징우전대)</span></span></div>
  <div><span class="label">게재</span><span>Nature Communications, 2026 · Article in Press <span class="dim">(권·호 미배정)</span> · <code>DOI 10.1038/s41467-026-76116-z</code></span></div>
</div>

인공 시각 시스템은 지금까지 빛을 감지하는 소자, 정보를 저장하는 소자, 연산하는 소자를 따로 만들어 붙였다. 톈진대·난징우전대·지린대 공동 연구진은 이 셋을 트랜지스터 하나에 욱여넣었다. 유연 기판 위에서 빛을 감지하는 데 30마이크로초, 그 정보를 저장하는 데는 10년 넘게 버틴다.

## 1. 왜 어려운 문제였나

빛으로 신호를 주고받는 소자는 유독 뒤처져 있었다. 전기 펄스로 움직이는 통합 소자는 이미 나노초급 속도, 10년 이상 유지, 100만 회 이상 내구성, 95% 이상 인식정확도까지 갖췄지만, 정작 시각 센싱에 필수인 광 펄스 반응형 소자는 밀리초급 속도, 1만 초 수준의 유지시간, 1000회 미만의 내구성, 90% 안팎의 인식정확도에 머물러 있었다.

유기 반도체로 이 격차를 메우려 하면 새로운 벽에 부딪힌다. 반도체를 고이동도·고속 스위칭에 맞추면 메모리 유지시간이 1000초 미만으로 떨어져 사실상 휘발성이 되고, 반대로 유전체를 전하트랩(메모리 유지)에 맞추면 이동도와 속도가 크게 나빠진다. 이동도와 메모리 유지시간을 동시에 잡는 계면 설계가 풀리지 않은 숙제였다.

## 2. 발상의 전환: 적층 순서를 뒤집다

무기물과 유기물을 함께 쌓을 때는 보통 무기물의 고온 공정 제약 때문에 "유기물을 무기물 위에" 쌓는 순서를 따른다. 연구진은 이 순서를 뒤집었다. 폴리아믹산(PAA)을 먼저 스핀코팅한 뒤, 그 위에 저온(80℃) 플라즈마 원자층증착으로 산화알루미늄(Al₂O₃)을 얇게 길렀다.

그 결과 PAA의 자기정렬 나노그루브 구조가 주는 우수한 전하수송과, Al₂O₃의 산소공공이 만드는 깊은 전하트랩(우수한 메모리 유지)을 한 소자 안에서 동시에 얻었다. 이동도를 희생하지 않고도 메모리 소자를 만든 셈이다.

<figure class="fig-single">
  <img src="/articles/2026-07-28-flexible-otft-retinomorphic/Fig2_소자어레이및특성.png" alt="유연 기판 위 OTFT 소자 구조 개념도와 대면적 소자 어레이 실물 사진, 전기·광학 특성 그래프">
  <figcaption><span class="fig-num">그림 1</span>유연 OTFT 소자 구조(a)와 130개 소자로 이뤄진 대면적 어레이 실물(b), 전달특성·굽힘시험·광응답 데이터(c–h). <span class="dim">출처: 논문 Fig. 2, CC BY 4.0</span></figcaption>
</figure>

## 3. 결과: 감지하고, 저장하고, 눈처럼 반응한다

<div class="stat-row">
  <div><b>22.65 cm²/V·s</b><span>평균 이동도<span class="dim">(130개 소자, 최대 29.11)</span></span></div>
  <div><b>30 µs</b><span>광응답 속도</span></div>
  <div><b>10년 이상</b><span>전하 유지<span class="dim">(13.9시간 실측 후 외삽)</span></span></div>
</div>

전기 신호에 대한 순수 응답 속도는 130나노초까지 나왔고, 이미지를 실제로 저장하는 안정적 다단계 프로그래밍 속도는 10마이크로초였다. 둘은 서로 다른 조건에서 측정한 별개의 수치다. 3mm 반경으로 1000회 굽힌 뒤에도 초기 이동도의 90%를 유지했다.

이 소자로 손글씨 숫자·손동작·얼굴 세 가지를 인식시켰다. 평평한 상태에서 정확도는 숫자 94.78%, 손동작 99.83%, 얼굴 92.56%였고, 3mm로 구부린 상태에서도 각각 93.88%, 96.67%, 91.96%로 크게 떨어지지 않았다. 이 수치는 소자가 직접 실시간으로 추론한 결과가 아니라, 측정한 소자의 시냅스 특성을 시뮬레이션(NeuroSim)에 대입해 산출한 값이다.

실제 하드웨어 데모도 만들었다. Zynq FPGA 보드에 소자의 실측 시냅스 특성을 가중치 모델로 얹고, 경량 신경망(YOLOv3-tiny)의 컨볼루션 연산은 FPGA가 맡는 방식으로 실시간 얼굴 검출 시스템을 구성했다. 인형이나 기계 눈에는 반응하지 않고, 마스크를 쓴 얼굴이나 여러 물체가 섞인 배경에서도 얼굴만 정확히 잡아냈다.

<figure class="fig-single">
  <img src="/articles/2026-07-28-flexible-otft-retinomorphic/Fig6_얼굴검출데모.png" alt="실시간 얼굴 검출 데모 사진 3장. 얼굴 미검출, 얼굴 검출, 여러 물체 속 얼굴 검출">
  <figcaption><span class="fig-num">그림 2</span>실시간 얼굴 검출 데모. 얼굴이 없으면 반응하지 않고(왼쪽), 마스크를 써도(가운데), 여러 물체가 섞여 있어도(오른쪽) 얼굴만 정확히 검출했다. <span class="dim">출처: 논문 Fig. 6, CC BY 4.0</span></figcaption>
</figure>

빛에 강하게 반응하면 동공이 반사적으로 좁아지는 사람 눈의 움직임도 흉내 냈다. 소자 어레이를 인공 동공 뒤에 두고 광신호를 감지하면, 외부 회로가 그 신호로 동공을 닫는 식이다.

## 4. 의미: 디스플레이가 아니라 비전 센서 논문이지만

이 논문은 처음부터 끝까지 우주항공용 지능형 객체탐지와 에지 컴퓨팅을 목표로 한다. "디스플레이"나 "백플레인"이라는 단어는 본문에 한 번도 나오지 않는다. 그러니 이 소자가 디스플레이용으로 만들어졌다고 보긴 어렵다.

다만 소재·공정 관점에서는 디스플레이 업계가 눈여겨볼 지점이 있다. 유연 기판 위에서 20cm²/V·s를 넘는 이동도, 80℃의 저온 공정 호환성, 3mm 굽힘에서도 90%를 유지하는 안정성은 유연 AMOLED 백플레인 TFT가 요구하는 핵심 지표와 정확히 겹친다. 디스플레이용으로 만든 소자는 아니지만, 유연 백플레인 공정을 고민하는 엔지니어라면 참고할 만한 저온 이종유전체 공정 성과다.

## 5. 한눈 요약

| | |
|---|---|
| **한 줄 요약** | 무기-유기 이종 유전체 적층 순서를 뒤집어, 유연 OTFT 하나에 센싱·메모리·연산을 통합(이동도 22.65cm²/V·s, 광응답 30µs) |
| **핵심 성과** | 전하유지 10년 이상(외삽) · 인식정확도 92~99%(NeuroSim 시뮬레이션) · 3mm 굽힘 후 이동도 90% 유지 |
| **강점** | 저온(80℃) 공정 호환, 유연 기판에서 강성 기판보다 오히려 높은 이동도 |
| **게재** | Nature Communications, 2026 (Article in Press) |

## 6. 핵심 용어

<dl class="term-list">
  <div><dt>OTFT</dt><dd>유기 반도체를 채널로 쓰는 박막트랜지스터. 무기 반도체보다 저온·저비용 공정이 가능하고 유연 기판에 잘 맞는다.</dd></div>
  <div><dt>무기-유기 이종 유전체</dt><dd>서로 다른 두 재료(이 논문에서는 Al₂O₃와 PAA)를 적층해 하나로는 얻기 힘든 특성(전하수송+전하트랩)을 동시에 확보하는 유전체 구조.</dd></div>
  <div><dt>레티노모픽(retinomorphic)</dt><dd>망막을 모사한다는 뜻. 빛에 반응해 동공이 즉각 좁아지는 것과 같은 생체 시각 반사 행동을 전자소자로 재현하는 것을 가리킨다.</dd></div>
  <div><dt>NeuroSim</dt><dd>실제 소자에서 측정한 시냅스 특성(전도도 변화 등)을 입력해, 신경망이 그 소자로 동작했을 때의 성능을 계산하는 시뮬레이션 도구.</dd></div>
</dl>

이번 주 다른 논문 9편은 [7월 4주차 디스플레이 논문 브리핑](/article/2026-08-14-paper-week4-brief)에서 짧게 훑었다.
