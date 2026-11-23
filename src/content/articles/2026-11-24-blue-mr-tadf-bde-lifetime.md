---
title: "공액 확장으로 네 배 늘린 순청색 OLED 수명"
searchTitle: "순청색 MR-TADF 수명 개선: 실리콘 가교 발광체 DPSi-4BP-BN, 라디칼 음이온 C-N 결합해리에너지, 수평 쌍극자 배향 79%, 외부양자효율 27.3%, CIEy 0.18, LT80 213시간"
summary: "다중공명 발광체는 색순도와 효율을 올려 왔지만 수명은 따라오지 않았다. 열화가 일어나는 자리를 전자를 받은 상태의 C-N 결합으로 특정하고 그 결합을 단단히 하자, 같은 조건의 기준 소자 52시간이 213시간으로 늘었다."
section: paper
reporter: PEER
publishedAt: 2026-11-24
collectWeekStart: '2026-11-16'
readingMinutes: 5
tags: [OLED, MR-TADF, 청색수명, 결합해리에너지, 쌍극자배향]
sources:
  - type: paper
    title: "π-Expanded Arylamine Ancillary Substituents on Silicon-Bridged Multi-Resonance TADF Emitters Enable Superior Horizontal Orientation and Long-Lifetime Blue Organic Light-Emitting Devices"
    url: https://doi.org/10.1002/smll.76827
---

다중공명(multiple resonance, MR) 발광체는 붕소와 질소를 골격에 번갈아 넣어 전자 구름을
서로 다른 원자에 몰아 둔다. 그 덕에 스펙트럼이 좁고 색이 순수하다. 청색 OLED의 색순도는
이 설계로 크게 올라갔다.

문제는 수명이었다. 외부양자효율 20%를 넘기면서 동시에 오래 버티는 순청색 소자는 나오지
않았다. 특히 CIEy가 0.20보다 낮은 영역에서 그랬다.

야마가타대학교 유기재료과학과의 Haruaki Shiga 외 9인이 이번에 다룬 것은 발광 효율이나
색순도가 아니다. 분자가 어디서 끊어지는지다.

## 끊어지는 자리는 전자를 받은 상태의 C-N 결합이다

유기 발광체가 구동 중에 열화하는 경로는 여러 가지다. 이 연구가 겨냥한 것은 분자 안의
탄소-질소 결합이다. MR 골격에서 아릴아민이 붙는 자리이고, 구조상 가장 약한 결합이다.

중요한 것은 그 결합이 중성 상태에서 약한 것이 아니라는 점이다. 소자가 켜져 있는 동안
발광층의 분자는 전자를 받아 라디칼 음이온이 되고, 정공을 받아 라디칼 양이온이 된다. 결합이
가장 약해지는 것은 전자를 받은 상태다. 그래서 설계가 노려야 하는 값은 중성 분자의 결합해리
에너지가 아니라 음이온 상태의 결합해리에너지다.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/design-strategy.webp" style="max-width:500px;width:100%;margin:0 auto;" alt="DABNA-1과 tCzBN을 바탕으로 한 강건한 청색 다중공명 발광체 설계 전략과 이 연구의 개념을 나란히 보여주는 도식이다" />
  <figcaption>그림 1. (a) 기존의 강건한 청색 MR 발광체 설계 전략, (b) 이 연구의 개념. <span class="src">Small (2026) Figure 1, CC BY 4.0</span></figcaption>
</figure>

## 실리콘 가교와 주변 공액, 두 단계로 올린 결합해리에너지

연구진은 두 단계로 결합을 단단히 했다. 먼저 골격에 실리콘 가교를 넣었다. 대표적인 청색 MR
발광체인 DABNA-1과 비교하면 삼중항 상태의 결합해리에너지가 0.13 eV, 음이온 상태의 값이
0.21 eV 올라갔다. 음이온 쪽이 더 많이 올라간 것이 설계 의도에 맞는다.

다음이 이번 연구의 몫이다. 실리콘 가교 골격의 주변 아릴아민에 비페닐 또는
다이벤조싸이오펜을 붙여 공액을 늘렸다. 두 분자를 각각 DPSi-4BP-BN과 DPSi-3DBT-BN이라
불렀다. 이 치환으로 삼중항 상태의 값은 거의 변하지 않았고 음이온 상태의 값만 올랐다.
연구진은 계산 방법을 바꿔 가며 같은 경향이 나오는지 확인했다. M06-2X-D3로 얻은 결과를
B3LYP-D3와 PBE0-D3로 다시 계산해 음이온 C-N 결합해리에너지의 증가가 재현되는 것을 봤다.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/homo-lumo-bde.webp" style="max-width:431px;width:100%;margin:0 auto;" alt="세 발광체의 최고준위 점유 분자궤도와 최저준위 비점유 분자궤도 분포 및 에너지 준위, 그리고 결합해리에너지 값을 비교한 그래프 패널이다" />
  <figcaption>그림 2. (a) 세 분자의 분자궤도 분포와 에너지 준위, (b) 결합해리에너지 비교. <span class="src">Small (2026) Figure 2, CC BY 4.0</span></figcaption>
</figure>

공액을 늘리면서도 MR 구조는 건드리지 않았다. 전자 구름을 번갈아 놓인 원자에 몰아 두는
배치가 좁은 스펙트럼의 근원이므로, 그것이 흐트러지면 색순도를 잃는다.

## 좁은 스펙트럼은 그대로 남았다

묽은 톨루엔 용액에서 두 분자 모두 462 nm에서 좁은 청색 발광을 냈다. 광발광 양자수율은
최대 96%, 반치폭은 21 nm 아래였다. 공액을 늘렸는데 스펙트럼이 넓어지지 않은 것이 이 설계가
MR 성격을 지켰다는 증거다.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/synthesis-spectra.webp" style="max-width:500px;width:100%;margin:0 auto;" alt="두 발광체의 합성 경로와 묽은 톨루엔 용액에서 측정한 자외가시광 흡수 스펙트럼 및 발광 스펙트럼 패널이다" />
  <figcaption>그림 3. (a) 합성 경로, (b) 흡수 스펙트럼, (c) 발광 스펙트럼. 묽은 톨루엔 용액(1 × 10⁻⁵ M)이다. <span class="src">Small (2026) Figure 3, CC BY 4.0</span></figcaption>
</figure>

## 덤으로 따라온 수평 배향

공액을 늘린 결과로 하나가 더 나왔다. 분자가 막 안에서 눕는 정도다.

발광 분자의 쌍극자가 기판에 평행하게 누우면 빛이 막 밖으로 나오기 쉽다. 서 있으면 도파
모드로 갇힌다. 그래서 수평 배향은 광추출 효율과 직결된다. 연구진은 진공 증착한 막에서
각도에 따른 발광 강도를 재어 배향을 평가했다.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/dipole-orientation.webp" style="max-width:500px;width:100%;margin:0 auto;" alt="두 발광체를 0.5 중량퍼센트로 도핑한 호스트 막에서 각도에 따라 측정한 발광 강도, 발광체의 흡수 스펙트럼과 보조 도펀트의 규격화 발광 스펙트럼 패널이다" />
  <figcaption>그림 4. 0.5 wt% 도핑 막의 각도별 발광 강도. <span class="src">Small (2026) Figure 4, CC BY 4.0</span></figcaption>
</figure>

수평 발광 쌍극자 배향비는 두 분자 모두 79%였다. 저자들은 이를 중등도로 수평을 선호하는
정도라고 적었다. 완전 무작위라면 67%다.

## 외부양자효율 27.3%와 수명 213시간

소자는 하이퍼형광 구조로 만들었다. MR 발광체를 최종 발광체로 쓰고, 삼중항을 거둬들이는
일은 다른 재료가 맡는 방식이다.

<figure class="fig-single">
  <img src="/articles/2026-11-24-blue-mr-tadf-bde-lifetime/device-performance.webp" style="max-width:293px;width:100%;margin:0 auto;" alt="하이퍼 OLED에 쓰인 재료들의 화학 구조, 소자 에너지 다이어그램, 전계발광 스펙트럼, 전류밀도-전압-휘도 특성, 휘도에 따른 외부양자효율 곡선 패널이다" />
  <figcaption>그림 5. (a) 재료 구조, (b) 에너지 다이어그램, (c) 전계발광 스펙트럼, (d) 전류밀도·전압·휘도, (e) 효율 곡선. <span class="src">Small (2026) Figure 5, CC BY 4.0</span></figcaption>
</figure>

전계발광 봉우리는 467 nm와 465 nm, 반치폭은 25 nm였다. CIEy는 두 소자가 각각 0.16과
0.18로, 논문이 순청색 기준으로 잡은 0.20보다 낮았다. 켜짐 전압은 2.53 V다. 최대 외부양자효율은 DPSi-4BP-BN이 27.3%, DPSi-3DBT-BN이 23.4%로, 주변 공액을
늘리지 않은 기준 분자 DPSi-Ph-BN의 21.8%를 넘었다. 저자들은 이 차이의 주된 이유를 쌍극자
수평 배향이 좋아진 것으로 봤다.

수명 쪽 차이가 더 크다. 1,000 cd/m²에서 초기 휘도의 80%까지 걸린 시간이 DPSi-4BP-BN은
213시간, DPSi-3DBT-BN은 75.5시간이었다. 같은 조건의 기준 소자는 52시간이다. 앞쪽은
네 배가 넘는다.

두 분자의 차이도 읽을 거리다. 둘 다 음이온 결합해리에너지가 올랐고 배향비도 같은 79%인데
수명은 213시간과 75.5시간으로 세 배 가까이 벌어졌다. 결합해리에너지 하나로 수명이 정해지는
것은 아니라는 뜻이다.

## 산업까지의 거리

이 논문이 주는 것은 수치보다 겨냥할 자리다. 청색 발광체의 수명을 늘리려 할 때 중성 분자의
결합 세기를 보는 것만으로는 부족하고, 전자를 받은 상태에서 어느 결합이 가장 약해지는지를
계산해 그 자리를 보강해야 한다는 것이다. 계산 방법을 셋으로 교차 확인한 것도 설계 지침으로
쓰기에는 값이 있다.

다만 213시간은 양산 소자의 수명과 비교할 값이 아니다. 이 논문의 값은 같은 조건에서 기준 소자 대비 몇 배인지를
보는 상대 비교이고, 절대값으로 제품 수명을 가늠하는 자리가 아니다.

조건도 좁다. LT80은 초기 휘도의 80%까지만 본 값이어서, 더 긴 구간에서 곡선이 어떻게
꺾이는지는 알 수 없다. 하이퍼형광 구조라 수명에는 보조 도펀트와 호스트의 열화도 함께
들어가는데, 이 논문은 최종 발광체 쪽 설계만 바꿨다.

수평 배향 79%도 한계가 있다. 완전 무작위인 67%보다는 높지만 배향성이 강한 발광체들이
보이는 수치에는 못 미친다. 효율을 더 올릴 여지가 그 자리에 남아 있다는 뜻이고, 공액을
늘리는 방향을 더 밀면 분자가 커져 증착 공정과 막 안정성에서 다른 대가를 치를 수 있다.
