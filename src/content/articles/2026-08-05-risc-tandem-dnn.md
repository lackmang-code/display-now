---
title: "빛의 잔상에서 RISC의 속도를 읽다"
summary: "탠덤 딥러닝으로 TADF 소자 내부의 RISC 속도를 비파괴로 추정했습니다. 단일 모델의 R² 0.775가 0.985까지 올라갔습니다."
section: paper
reporter: PEER
publishedAt: 2026-08-05
readingMinutes: 9
tags: [TADF, RISC, 딥러닝, 성균관대]
sources:
  - type: paper
    title: "A deep learning model for inferring the reverse intersystem crossing rate of TADF OLEDs"
    url: "https://doi.org/10.1039/D5MH01156F"
featured: true
paywallAfter: 0
---

<div class="paper-card">
  <div><span class="label">논문</span><a href="https://doi.org/10.1039/D5MH01156F" target="_blank" rel="noopener">A deep learning model for inferring the reverse intersystem crossing rate of TADF OLEDs</a></div>
  <div><span class="label">저자</span><span>Junseop Lim, Seungwon Han, 김재민<span class="dim">(교신·중앙대)</span>, 이준엽<span class="dim">(교신·성균관대 첨단디스플레이공학과)</span></span></div>
  <div><span class="label">게재</span><span>Materials Horizons (RSC), 2026, 13, 272–282 · <code>DOI 10.1039/D5MH01156F</code></span></div>
</div>

OLED의 효율과 수명은 발광층 안 엑시톤 동역학에 달려 있다. 그중 삼중항 에너지를 다시 빛으로 되돌리는 역계간전이(RISC) 속도는 소자 설계의 핵심 지표지만, 정작 정확히 알아내기가 까다롭다. 성균관대·중앙대 공동 연구진은 딥러닝으로, 구동 중인 소자의 과도 전계발광(trEL) 곡선 하나만으로 이 속도를 추정하는 모델을 제시했다.

## 1. 왜 어려운 문제였나

TADF(열활성지연형광) 소자의 trEL(과도 전계발광) 분석은 전압이 끊긴 후 찰나의 순간 동안 벌어지는 복합적인 물리 현상을 다룬다. 이 곡선에는 폴라론 재결합, 계간전이(ISC/RISC), 삼중항 소멸(TTA/TPA) 등 다차원적 과정이 한꺼번에 얽혀 있다.

이 감쇠 곡선을 역으로 추적해 각 속도상수를 구하려 하면, 서로 다른 변수 조합이 거의 완벽하게 동일한 곡선을 도출하는 '다중 해(multiple solutions)' 난제에 부딪힌다. 특히 박막의 무질서도에 따라 변동 폭이 매우 넓은 폴라론 재결합 속도(γ)의 불확실성이 연쇄 반응의 마지막 결과물인 RISC 추정을 방해하는 핵심 요인이었다. 족적이 복잡하게 뒤엉킨 현장에서, 흐릿한 지문 하나만으로 진범을 특정해야 하는 상황이었던 셈이다.

## 2. 발상의 전환 — 문제를 두 단계로

물리 기반 미분방정식으로 trEL 곡선 2만 개를 합성해 학습했다. 핵심은 모든 상수를 한 번에 풀지 않고, 물리적 인과를 모델의 순서로 옮긴 탠덤(tandem) 구조다.

1. 가장 큰 교란 요인인 재결합 속도(γ)를 먼저 예측해 해 공간을 좁힌다
2. γ 값에 따라 구간별로 전문화된 27개 모델 중 하나가 자동 선택된다
3. 좁혀진 범위에서 RISC 속도를 정밀하게 추론한다

<figure class="fig-single">
  <div class="img-slot">assets/f4_tandem.png</div>
  <figcaption><span class="fig-num">그림 1</span>탠덤 아키텍처 — 1단계가 재결합 속도 γ를 예측하면, 구간별 전용 모델이 자동 선택돼 RISC를 추론한다.</figcaption>
</figure>

## 3. 결과 — 단일 모델의 한계를 넘어

효과는 분명했다. 단일 모델에서 0.775에 머물던 RISC 예측 정확도(R²)가 탠덤 구조에서 0.985까지 상승했다. 검증은 실제 소자로 이뤄졌다. 청색 TADF 소자(최대 EQE 22.5%)의 trEL을 입력하자, 예측값이 정밀 실험값과 사실상 일치했다.

<div class="stat-row">
  <div><b>0.985</b><span>탠덤 R² <span class="dim">(단일 0.775)</span></span></div>
  <div><b>22.5%</b><span>검증 소자 최대 EQE</span></div>
  <div><b>예측 ≈ 실측</b><span>γ · k<sub>RISC</sub> 일치</span></div>
</div>

**표 1 · 검증 소자의 예측값과 실측값**

| 물성 | 예측 | 실측 | 단위 |
|---|---:|---:|---|
| 재결합 속도 γ | 7.28 | 7.27 | ×10⁻¹¹ cm³s⁻¹ |
| 역계간전이 속도 k<sub>RISC</sub> | 3.19 | 3.01 | ×10⁵ s⁻¹ |

*두 값 모두 오차 범위 내에서 일치했다. 자료: 논문 Fig. 7.*

<figure class="fig-single">
  <div class="img-slot">assets/f7_results.png</div>
  <figcaption><span class="fig-num">그림 2</span>예측값과 실측값의 비교. γ는 7.28 대 7.27(×10⁻¹¹), k<sub>RISC</sub>는 3.19 대 3.01(×10⁵).</figcaption>
</figure>

## 4. 의미 — 소자 분석의 패러다임 전환

기존에는 후보 물질마다 박막을 만들어 여러 측정과 수치 피팅을 거쳐야 했고, 그마저 다중 해 문제로 신뢰도가 흔들렸다. 이 방법은 실제 구동 소자의 trEL 한 번으로 핵심 물성을 즉시 추출한다. 디스플레이 소재 개발이 반복 실험에서 데이터 기반 설계로 옮겨가는 흐름을 보여준다.

> "소자 내부를 더 깊이 이해하는 것에서, 다음 디스플레이가 시작됩니다."
>
> — 이준엽 성균관대 첨단디스플레이공학과 교수

## 5. 한눈 요약

| | |
|---|---|
| **한 줄 요약** | trEL 곡선 하나로 OLED의 RISC 속도를 딥러닝으로 추정 (R²=0.985) |
| **핵심 성과** | 단일 모델 0.775 → 탠덤 모델 0.985 · 검증 소자 EQE 22.5% |
| **강점** | 박막 측정 불필요, 실제 구동 소자에서 비파괴 분석 |
| **게재** | Materials Horizons (RSC), 2026 |

## 6. 핵심 용어

<dl class="term-list">
  <div><dt>TADF</dt><dd>열에너지로 삼중항을 단일항으로 끌어올려 발광에 활용, 중금속 없이 고효율을 내는 발광 방식.</dd></div>
  <div><dt>RISC</dt><dd>삼중항 → 단일항으로 에너지를 되돌리는 과정. 빠를수록 지연형광 효율이 높다.</dd></div>
  <div><dt>다중 해 문제</dt><dd>서로 다른 변수 조합이 동일한 곡선을 내, 유일한 해를 특정할 수 없는 역문제의 난점.</dd></div>
  <div><dt>trEL</dt><dd>펄스 구동 후 빛이 감쇠하는 곡선. 소자 내부 동역학의 '지문'에 해당.</dd></div>
</dl>
