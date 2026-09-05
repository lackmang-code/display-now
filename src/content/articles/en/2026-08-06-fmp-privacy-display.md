---
title: "FMP, the privacy display rolling out across every Galaxy S27"
searchTitle: "How the FMP privacy display works and its adoption in the Galaxy S27"
summary: "A privacy display costing 10% more than an equivalent OLED, and Samsung Electronics is widening it from a single model, the Galaxy S26 Ultra, to all four S27 models. Over the same period, a review of BOE panels for cost reduction fell through. Which side Samsung bet on between cost and differentiation: the two decisions set side by side from primary material, for procurement and planning."
section: issue
reporter: DESK
publishedAt: 2026-08-06
readingMinutes: 9
lang: en
translationOf: 2026-08-06-fmp-privacy-display
tags: [금주의핫이슈, 프라이버시디스플레이, FMP, 갤럭시S27, 삼성디스플레이, 칩플레이션]
sources:
  - type: article
    title: "'칩플레이션'에 골치인데…프라이버시 OLED 원가 10% 더 높다 (디일렉)"
    url: "https://www.thelec.kr/news/articleView.html?idxno=60375"
  - type: article
    title: "'옆 사람은 못 본다' 갤S27 4종 모두 프라이버시 모드 적용 (디일렉)"
    url: "https://www.thelec.kr/news/articleView.html?idxno=58938"
  - type: article
    title: "'패널로 시야각 제어'…삼성D, 프라이버시 디스플레이 검증 (디일렉)"
    url: "https://www.thelec.kr/news/articleView.html?idxno=52766"
  - type: article
    title: "삼성D, FMP 적용한 OLED로 '프라이버시 디스플레이' 검증 통과 (ZDNet Korea)"
    url: "https://zdnet.co.kr/view/?no=20260226091005"
  - type: article
    title: "화질을 지키기 위한 5년의 집념…삼성 '프라이버시 디스플레이' (전자신문)"
    url: "https://www.etnews.com/20260301000031"
  - type: article
    title: "中 BOE, 삼성 갤럭시S27 OLED 공급 불발 (전자신문, 2026-06-30)"
    url: "https://www.etnews.com/20260630000076"
  - type: article
    title: "\"갤럭시S27, 4개 모델로 나온다…'프로' 추가\" (ZDNet Korea, 2026-07-27)"
    url: "https://zdnet.co.kr/view/?no=20260727135700"
  - type: disclosure
    title: "챗봇이 알려주는 사생활 보호의 새로운 솔루션, 삼성디스플레이 FMP(Flex Magic Pixel™) 기술 (삼성디스플레이 뉴스룸, 2026-03-03)"
    url: "https://news.samsungdisplay.com/34440"
featured: false
paywallAfter: 0
---

<div class="kicker" style="font-family:var(--font-mono); font-size:13px; letter-spacing:0.1em; color:oklch(0.45 0.12 315); margin:0 0 6px;">HOT ISSUE OF THE WEEK</div>

This column gathers the display industry stories that poured out over one week (Monday to Sunday) and digs a little deeper into the hottest single issue among them. For 27 July to 2 August, this week's hot issue was the "privacy display" Samsung Electronics has decided to widen across every Galaxy S27 model.

A component costing 10% more, and the number of models using it multiplied by four. For a decision made when soaring semiconductor prices have made cost reduction the topic of the day, it is odd. And yet over the same period Samsung dropped another plan it had been reviewing to save cost. Set the two side by side and the picture comes out a little clearer.

## It was one model, the S26 Ultra; for the S27 it is all four

Samsung Electronics put a "privacy display" into only one model last year, the Galaxy S26 Ultra. It is a function that keeps the screen sharp seen head-on while making it hard to see from an angle at the side. The market research firm Counterpoint Research estimates the panel costs about 10% more than an equivalent LTPO OLED. And yet from the Galaxy S27 due next year, Samsung Electronics has decided to put the function into all four models: base, Plus, Pro (new) and Ultra. The models carrying it go from one to four.

Over the same period news running in the opposite direction also appeared in the industry: that so-called "chipflation," the soaring prices of memory semiconductors such as DRAM and NAND, is pressing down on smartphone costs. Samsung Electronics did indeed review China's BOE as the OLED panel supplier for the base Galaxy S27 to save cost, going as far as sending a request for information (RFI). At a moment sensitive to cost, one hand was widening a more expensive component while the other looked for a cheaper supplier.

## Why it cannot be seen from the side

The name Samsung Display gives this function is Flex Magic Pixel (FMP). It was first shown at MWC in 2024, and beneath it lie more than 150 core patents filed since 2020. The principle is to put two kinds of subpixel into a single pixel. A wide viewing angle general RGB subpixel and a narrow viewing angle privacy RGB subpixel are placed side by side in one pixel site. Turn privacy mode on and the narrow viewing angle subpixel is driven hard while the wide one is turned down, keeping the head-on brightness while reducing only the light seen from the side.

What actually makes that "narrow viewing angle" is the BM (black matrix). The BM is a structure already present in every OLED panel, originally dividing the R, G and B subpixels and stopping the colours mixing. Samsung Display stacked this BM in several dense layers, only at the privacy pixel sites. Black partitions were raised layer on layer at every path where light leaks sideways. On the general pixel side these partitions are low so light spreads widely; on the privacy pixel side they are high so light escapes almost vertically only.

![Principle diagram of the FMP multi-shading structure. At the privacy pixel, several layers of BM (black matrix) pass light only vertically, while at the normal pixel the BM is low and light spreads sideways as well](/articles/2026-08-06-fmp-privacy-display/samsungdisplay-fmp-bm-structure.png)
*In the cross-section on the left the BM (black partitions) on the privacy pixel side is stacked far higher than on the normal pixel, so light goes straight up only. On the right is a photograph of light actually leaking from the subpixels, in which the light of the privacy pixel is visibly gathered far more narrowly. Conventional OLEDs had no room to stack the BM this far, and Samsung Display secured that space with a separate process to complete the structure. Source: Samsung Display Newsroom ("FMP (Flex Magic Pixel™) technology," 2026-03-03).*

The result was confirmed by measurement at the independent certification body UL Solutions. Taking head-on brightness as 100, tilting the screen 45 degrees and viewing from the side drops the brightness to 3.5%, and at 60 degrees to below 0.9%. A comparison makes the figures land better. According to Samsung Display, an ordinary privacy protection film attached to a screen drops side brightness only to about 40% of head-on. FMP's 0.9% means more than 40 times darker than that. It means no loss of image quality for the person viewing head-on, while the screen content is effectively invisible once more than 45 degrees off axis.

![A comparison of Normal Mode and Privacy Mode at five angles. Head-on both modes are sharp, but at the four angles above, below, left and right the Privacy Mode screen is completely blacked out](/articles/2026-08-06-fmp-privacy-display/samsungdisplay-fmp-normal-vs-privacy.png)
*Head-on (centre), both Normal Mode and Privacy Mode are sharp. And yet at the four angles above, below, left and right, only the Privacy Mode screen is completely blacked out. Source: Samsung Display Newsroom ("FMP (Flex Magic Pixel™) technology," 2026-03-03).*

## And over the same period, another decision

Negotiations with BOE fell through in the end. According to Electronic Times reporting, as of 30 June 2026 the discussion of BOE panel supply for the base Galaxy S27 was finally dropped. The article states that the exact reason for the collapse was not confirmed, while pointing to internal resistance as the main background: that Samsung Display found it hard to accept panels from its Chinese competitor BOE going into Samsung Electronics, its core customer and parent. As a result Samsung Display continues to supply the entire Galaxy S27 line-up exclusively.

That these two things, "widening the privacy display to four models" and "the collapse of the BOE supply review," happened over the same period is itself clear. But from the material this article confirmed it is hard to assert a direct causal relation between the two decisions. The confirmed reason for the BOE collapse is internal resistance; a technical reason, that "BOE could not build a privacy pixel structure at the level of FMP," is stated nowhere in any material. What is confirmed is that, as a result of Samsung Display supplying every S27 model exclusively, the plan to put its own patented privacy display technology into all four could be pushed through without coordinating with another supplier.

## Outlook

That FMP technology, built on more than 150 patents, is one of the few certain points of differentiation Samsung Display now holds against its Chinese competitors became clear from these two pieces of news. That the function was not cut but widened, despite the cost pressure of chipflation that Samsung cannot control, reads as a judgement to hold on through premium differentiating features rather than be pushed out in a volume contest.

There are two points at which to check whether that judgement is right. One is how far the prices of the four models rise against their predecessors after the Galaxy S27 actually launches (how much of the 10% cost rise is passed to the consumer price). The other is when Chinese panel makers catch up with this privacy pixel structure. The longer the 150 patents actually hold them off, the longer the life of this differentiation strategy. Conversely, the moment a Chinese maker puts out similar performance at a lower price, today's calculus of "differentiate even if it sells dearer" has to go back to the calculator.
