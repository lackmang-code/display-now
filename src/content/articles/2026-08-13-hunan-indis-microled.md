---
title: "플로팅게이트로 얻은 Micro-LED 화소의 비휘발성과 조명 겸용"
searchTitle: "Micro-LED 플로팅게이트 화소의 비휘발성 구동 원리"
summary: "디스플레이와 조명을 별도 모듈로 만들 필요가 없어질 수도 있습니다. 후난대 연구진이 픽셀마다 투명 플로팅게이트 메모리 하나만 얹어, 리프레시 없이 이미지를 유지하면서 조명으로도 쓰는 Micro-LED를 구현했습니다. 꺼진 상태 소비전력은 픽셀당 1.4피코와트입니다. 신제품 카테고리를 고민하는 기획팀이라면 눈여겨볼 결과입니다."
section: paper
reporter: PEER
publishedAt: 2026-08-13
readingMinutes: 8
tags: [Micro-LED, 플로팅게이트 메모리, 비휘발성 디스플레이, 후난대]
sources:
  - type: paper
    title: "Dual-function Floating-Gate Memory Driver for Energy-Efficient Integrated Display–Illumination System"
    url: "https://doi.org/10.1038/s41467-026-76263-3"
featured: true
paywallAfter: 0
---

<div class="paper-card">
  <div><span class="label">논문</span><a href="https://doi.org/10.1038/s41467-026-76263-3" target="_blank" rel="noopener">Dual-function Floating-Gate Memory Driver for Energy-Efficient Integrated Display–Illumination System</a></div>
  <div><span class="label">저자</span><span>공동 제1저자 Haifeng Wu · Yizhe Wang, 교신 Xiao Wang · Dong Li · Anlian Pan<span class="dim">(후난대)</span> 외 총 21인</span></div>
  <div><span class="label">게재</span><span>Nature Communications, 2026 · Article in Press <span class="dim">(권·페이지 미배정)</span> · <code>DOI 10.1038/s41467-026-76263-3</code></span></div>
</div>

Micro-LED 디스플레이는 화면과 조명을 늘 따로 만들어 왔다. 회로가 다르고, 구동 방식이 다르기 때문이다. 후난대 연구진은 픽셀마다 투명 메모리 소자 하나를 얹는 것만으로 이 둘을 한 칩 안에 합쳤다. 전원을 계속 넣지 않아도 이미지가 꺼지지 않는다. 꺼진 상태에서 픽셀 하나가 쓰는 전력은 1.4피코와트, 웬만한 누설전류보다도 작다.

## 1. 왜 어려운 문제였나

지금까지 Micro-LED 디스플레이는 화면을 계속 켜 두려면 전원을 끊임없이 공급해야 했다. 디스플레이 상태를 저장해 두는 비휘발성 기능이 없었기 때문이다. 정적인 이미지를 오래 띄워 두거나, 전력이 제한된 환경에서 재구성 가능한 화면을 만들려는 시도는 매번 이 한계에 부딪혔다.

설상가상으로 회로 자체가 "디스플레이 전용"으로 설계돼 있었다. 대면적에서 균일하게 빛을 뿌리는 조명 기능까지 넣으려면 별도 모듈을 덧붙여야 했고, 그만큼 부피와 전력, 제어 복잡도가 함께 늘었다. 화면과 조명을 각자 다른 회로로 만들다 보니 하나로 합칠 방법이 마땅치 않았던 셈이다.

## 2. 발상의 전환: 픽셀마다 스위치를 하나씩

연구진은 Micro-LED 위에 투명 ITO 플로팅게이트 메모리(FGM)를 수직으로 쌓았다. 픽셀 하나에 발광소자 하나, 메모리 하나(1M1D). 이 조합에 어떤 전압을 걸어주느냐에 따라 같은 칩이 두 가지 얼굴을 한다.

1. 픽셀마다 투명 플로팅게이트 메모리 1개를 Micro-LED와 수직으로 쌓는다(1M1D 구조)
2. 픽셀별로 게이트 전압을 걸면(Type-II) 그 픽셀의 상태가 저장돼, 리프레시 없이 이미지가 유지된다
3. 전체 어레이에 공통 anode 전압을 걸면(Type-I) 저장 기능 없이 균일하게 빛나는 조명으로 전환된다

<figure class="fig-single">
  <img src="/articles/2026-08-13-hunan-indis-microled/Fig1_개념도.png" alt="INDIS 개념도. Micro-LED와 투명 플로팅게이트 메모리를 수직으로 쌓은 1M1D 구조 및 웨이퍼·어레이 사진" />
  <figcaption><span class="fig-num">그림 1</span>Micro-LED와 투명 플로팅게이트 메모리를 수직으로 쌓은 1M1D 구조. 게이트 전압(Type-II)과 공통 anode 전압(Type-I)으로 디스플레이 모드와 조명 모드를 전환한다. <span class="dim">출처: 논문 Fig. 1, CC BY 4.0</span></figcaption>
</figure>

연구진은 이 구조를 INDIS(Integrated Nonvolatile Display–Illumination System)라 이름 붙였다.

## 3. 결과: 거의 0에 가까운 대기전력

<div class="stat-row">
  <div><b>1.4 pW</b><span>픽셀당 정적(off) 전력</span></div>
  <div><b>&gt;10⁸</b><span>1M1D 통합소자 on/off ratio</span></div>
  <div><b>96.87%</b><span>200초 후 밝기 유지율<span class="dim">(9V 게이트펄스)</span></span></div>
</div>

4인치 웨이퍼 100개 소자 통계에서 Type-II(3단자, 디스플레이 모드) on/off ratio는 평균 1.75×10⁸, 제작 수율은 98%를 넘었다. 게이트 펄스 하나를 전환하는 데 드는 스위칭 에너지는 11.41pJ. 10×10 픽셀 어레이(피치 45µm, Micro-LED 크기 7.5µm, 환산하면 564 PPI급)로 "I ♥ HNU" 문자를 실제로 띄워 검증했고, 보충자료에는 200×128 픽셀로 확장한 "MICRO" 문자 데모도 실려 있다.

**표 1 · 대기전력 비교(같은 논문 Table S2 기준, 본문 서술과 일치하는 수치만 사용)**

| 방식 | 정적(off) 전력 | 드라이버 전압 손실 |
|---|---:|---:|
| 본 연구 (ITO 플로팅게이트) | 1.4 pW | 11.71% |
| ITO-TFT | 20 pW | 11.43% |
| MoS₂-TFT | 14 pW | 14.3% |
| LTPS-TFT | 33 pW | 29.6% |

*정적 전력은 대기 상태에서 픽셀 하나가 계속 새는 전류를 뜻한다. 자료: 논문 Table S2.*

<figure class="fig-single">
  <img src="/articles/2026-08-13-hunan-indis-microled/Fig3_전력비교.png" alt="1M1D 픽셀 소자 특성과 경쟁 기술 대비 전력 비교 그래프" />
  <figcaption><span class="fig-num">그림 2</span>1M1D 통합 픽셀의 전기적 특성(a–g)과 경쟁 기술 대비 전력·손실 비교(h). <span class="dim">출처: 논문 Fig. 3, CC BY 4.0</span></figcaption>
</figure>

## 4. 의미: 화면과 조명의 경계가 흐려진다

디스플레이와 조명을 분리해 만들던 관행은 부피와 전력 예산이 늘 문제였다. 이 연구는 회로 하나, 전압 인가 방식 하나의 차이로 그 경계를 지운다. 상시 켜 놓아야 하는 정적 화면(대기 정보 표시, 저전력 웨어러블 인터페이스 등)이나, 화면과 조명을 함께 갖춰야 하는 소형 기기에서 특히 쓸모가 클 것으로 보인다.

다만 이번 시연은 청색·녹색 Micro-LED에 한정돼 있다. 풀컬러 구현에 필요한 적색까지 통합한 결과는 이번 논문에 없다.

## 5. 한눈 요약

| | |
|---|---|
| **한 줄 요약** | Micro-LED에 투명 플로팅게이트 메모리를 쌓아, 디스플레이·조명을 한 칩에서 전환(정적 전력 1.4pW) |
| **핵심 성과** | on/off ratio &gt;10⁸ · 200초 밝기유지율 96.87% · 564 PPI급 10×10 어레이 데모 |
| **강점** | 리프레시 없이 이미지 유지, 경쟁 기술(LTPS-TFT 등) 대비 대기전력 훨씬 낮음 |
| **게재** | Nature Communications, 2026 (Article in Press) |

## 6. 핵심 용어

<dl class="term-list">
  <div><dt>플로팅게이트 메모리</dt><dd>전하를 가둬 두는 절연된 게이트로 정보를 저장하는 비휘발성 메모리 구조. 전원이 꺼져도 상태가 유지된다.</dd></div>
  <div><dt>1M1D</dt><dd>픽셀 하나에 메모리(Memory) 하나, 발광소자(Diode) 하나를 짝지은 구조. 복잡한 보상 회로 없이 픽셀별 제어가 가능하다.</dd></div>
  <div><dt>비휘발성 디스플레이</dt><dd>전원 공급이 끊기거나 리프레시하지 않아도 화면 내용이 유지되는 디스플레이.</dd></div>
  <div><dt>INDIS</dt><dd>Integrated Nonvolatile Display–Illumination System. 이 논문이 제시한, 디스플레이와 조명을 한 칩에서 겸하는 소자 개념의 이름.</dd></div>
</dl>

이번 주 다른 논문 14편은 [8월 1주차 디스플레이 논문 브리핑](/article/2026-08-14-paper-week1-brief)에서 짧게 훑었다.
