---
title: "Apple's Taptic Engine Patent Loss: $5.7 Billion"
searchTitle: "Inside Apple's Haptic Engine and the Taction Patent Fight: LRA, Back-EMF Control, Ferrofluid Damping, and the Q-Factor 1.5 Line"
summary: "Apple doesn't disclose what's inside the Taptic Engine, which makes it tempting to read the $5.72 billion verdict as \"infringement despite not using ferrofluid.\" But the record says otherwise: Apple's courtroom defense wasn't that its vibration lacks damping fluid — it was that its Q-factor exceeds 1.5, meaning the vibration is less damped than the claim requires. We dissect Apple's haptic technology first, then trace how that defense fell apart."
section: issue
reporter: DESK
lang: en
translationOf: 2026-09-29-taction-apple-haptic-q-factor
publishedAt: 2026-09-29
collectWeekStart: '2026-09-21'
readingMinutes: 13
tags: [금주의핫이슈, 햅틱, 탭틱엔진, 특허소송, Q값, 페로플루이드, 감쇠, 택션테크놀로지, 애플, 연방순회항소법원, 액추에이터]
sources:
  - type: patent
    title: "Systems and methods for generating damped electromagnetically actuated planar motion for audio-frequency vibrations (Taction Technology, 발명자 Silmon James Biggs, 우선일 2014-09-24 · 등록 2020-05-19 · 예상 만료 2035-09-24)"
    number: "US10659885B2"
    url: "https://patents.google.com/patent/US10659885B2/en"
  - type: patent
    title: "Systems and methods for generating damped electromagnetically actuated planar motion for audio-frequency vibrations (Taction Technology, 우선일 2014-09-24 · 등록 2020-10-27, '885와 명세서 공통)"
    number: "US10820117B2"
    url: "https://patents.google.com/patent/US10820117B2/en"
  - type: patent
    title: "Electronic device including multi-phase driven linear haptic actuator and related methods (Apple Inc., 발명자 Arman Hajati, 2017-07-25 출원 · 2021-01-12 등록, 코일 하나로 구동하고 다른 코일로 역기전력을 읽어 위치·속도 추정·기계적 스토퍼 접촉 회피)"
    number: "US10890973B2"
    url: "https://patents.google.com/patent/US10890973B2/en"
  - type: patent
    title: "Electronic device having a shock-resistant haptic engine (Apple Inc., 2022-11-23 출원 · 2025-09-02 등록, 플렉셔로 매단 질량과 덮개의 비선형 캔틸레버 판스프링·모따기로 초기 저강성 후기 고강성)"
    number: "US12405667B2"
    url: "https://patents.google.com/patent/US12405667B2/en"
  - type: article
    title: "Headphone haptics maker sues Apple over modern Taptic Engine (AppleInsider, 2021-04-27, 코일 스프링·중심 로드에서 플렉셔·자성유체로 바뀌었다는 서술은 택션 소장의 주장으로 소개)"
    url: "https://appleinsider.com/articles/21/04/27/headphone-haptics-maker-sues-apple-over-modern-taptic-engine"
  - type: disclosure
    title: "Taction Technology, Inc. v. Apple Inc. 연방순회항소법원 판결 (사건 2023-2349, 2025-08-13 선고, 청구항 1 전문·1심의 「고감쇠 출력」·「기계적 감쇠」·「Q값 1.5 미만」 해석과 그 파기 이유·Moore 수석판사 외 2인)"
    url: "https://www.cafc.uscourts.gov/opinions-orders/23-2349.OPINION.8-13-2025_2558003.pdf"
  - type: article
    title: "Apple faces $5.7 billion patent infringement verdict over iPhone and Apple Watch haptics (CNBC, 2026-09-26, 배심 평결 57억 2,196만 달러·고의 침해 아님·애플 항소 방침)"
    url: "https://www.cnbc.com/2026/09/26/apple-taction-technology-patent-infringement-verdict.html"
  - type: article
    title: "Apple owes Taction $5.7B after losing haptic feedback IP trial (AppleInsider, 2026-09-26, 2021년 4월 제소·샌디에이고 배심·대상 제품 아이폰과 애플워치)"
    url: "https://appleinsider.com/articles/26/09/26/apple-owes-taction-57b-after-losing-haptic-feedback-ip-trial"
  - type: article
    title: "Apple Owes $5.7 Billion for Infringement of Haptics Patents (Bloomberg Law, 2026-09, 소송 자금을 버포드 캐피털 계열 투자체가 댔다는 보도)"
    url: "https://news.bloomberglaw.com/ip-law/apple-owes-5-7-billion-to-litigation-funded-firm-in-patent-case"
  - type: article
    title: "A Super Touchy Reversal by the Federal Circuit Gives Taction Another Bite at Apple (The National Law Review, 2025-08, 항소심 파기 요지 해설)"
    url: "https://natlawreview.com/article/super-touchy-reversal-federal-circuit-gives-taction-another-bite-apple"
---

<p class="kicker-inline">This Week's Hot Issue</p>

This column gathers the display industry news that broke over the past week (Monday through Sunday) and digs a little deeper into the single hottest issue among them.

## News the Press Covered, September 21 to 27

This week brought a steady run of process and cost stories, capped on the final day by a court verdict.

**First, Apple lost a haptics patent lawsuit.** On September 26, a jury in the U.S. District Court for the Southern District of California awarded Apple **$5.72196 billion (about ₩7.75 trillion)** in damages — the largest patent verdict in U.S. history — and found the infringement was not willful.

**Second, LG Display began mass production of the world's first 720Hz gaming OLED.** It's a 24.5-inch full-HD panel with a 0.02ms response time. Samsung Display is countering with a same-size 500Hz QD-OLED.

**Third, decisions on the polarizer-free process diverged.** Samsung Display began evaluating a halftone black PDL process that cuts the photomask count from six to five, and on the same day Apple pushed back the introduction of polarizer-free panels by one to two years.

**Fourth, micro-LED got pushed off the wrist.** Garmin dropped its plans to adopt it for smartwatches, and LG Display held onto its OLED exclusivity on the Apple Watch. UBI Research, however, forecast that micro-LED smartwatch shipments will be 10 times today's volume by 2030.

**Fifth, three Chinese panel makers raised LCD prices while cutting output.** BOE, CSOT, and HKC agreed to halt factories for one to two weeks during October's National Day holiday, and notified customers of price increases on 65-inch and 75-inch TV panels.

**Sixth, a clause banning the procurement of Chinese-made OLEDs was written into the U.S. National Defense Authorization Act.** Effective June 30, 2027, it excludes them from Department of Defense procurement.

This week's coverage doesn't revisit dual UTG and foldable market share, the Asan A7 fab, or the 12-inch OLEDoS investment, all of which we already covered in previous issues.

**The hottest issue of September 21 to 27 is "Apple's haptics patent verdict."**

**This issue takes it in a different order.** Start with the verdict and all that's left is patent language. So we look first at what Apple actually uses to create the sense of touch, then at why that landed inside someone else's claim.

## Which Family Does Apple's Taptic Engine Belong To

First, a note on names — this part has two of them. The name Apple uses in product descriptions is the **Taptic Engine**, which debuted with the Apple Watch in 2014. Apple's own patent documents, though, call the same thing a **haptic engine**. The Apple patent discussed later in this piece is literally titled "shock-resistant haptic engine."

The first is a trademark-style product name; the second is a technical term. **So in this article, Taptic Engine refers to the part inside Apple's own products, and haptic engine refers to the general category of parts that produce touch sensations.**

**Devices that create touch feedback fall into three broad families.** Eccentric rotating mass motors (ERM) that spin a weight, linear resonant actuators (LRA) that shuttle a mass back and forth, and piezoelectric elements that flex under voltage.

An ERM spins a weight to shake the whole device. It's cheap, but the spin-up and spin-down lag means it can't produce a crisp "click."

An LRA pushes a spring-mounted mass with a coil to shuttle it back and forth. It responds quickly, but **it moves strongly only near its resonant frequency.** This is exactly the point Taction's patent attacked in the prior art: lean on a single frequency and there's little force outside it, and it doesn't stop cleanly either.

Apple's Taptic Engine belongs to this family. It pushes the mass **sideways** rather than back and forth, using a coil and magnet to generate that motion. The problem is always the same one: **the faster you make it move, the harder it is to stop.**

## Apple's Patent Reads Position With a Coil to Damp Motion

**Apple's patent US10,890,973 describes splitting the coils into multiple groups — one drives the mass while another reads its position.** It was filed in 2017 and granted in 2021. The inventor, **Arman Hajati**, appears on more than twenty of Apple's haptics-related patent filings, which makes his work a useful clue to which direction the company is pushing its touch components.

The read-out method is back-EMF. As the magnet passes the coil, it induces a voltage in the coil, and the patent states that value can be used to **estimate position and velocity at the same time**. It's a structure where the driving component doubles as its own sensor, with no separate sensor added.

What matters is what's done with that information. The patent states that multi-phase driving **damps** the motion and keeps the mass **from striking a mechanical stopper**, reducing unwanted vibration and noise. It also states that the force stays even across the entire range of travel.

**In other words, the solution Apple's patent writes down is control, not fluid.** Where Taction's patent suppresses motion with a material — ferrofluid — Apple's patent reads the motion with a coil and suppresses it through feedback.

This structure connects directly to the issue that comes next. **Whether damping by material and damping by control can both fall under the same claim** was the final question in this lawsuit.

## Apple's Newest Patent Is About Shock, Not Damping

**Apple's patent US12,405,667, granted on September 2, 2025, is a structure that keeps the haptic engine from breaking when the device is dropped.** It was filed in November 2022.

This patent also **suspends the mass on flexures.** What's newly added is a **nonlinear cantilever leaf spring** attached to the cover side. When a shock hits, instead of slamming directly into a hard surface, the mass lands on this spring first.

The spring's thickness increases gradually along its length, and the tip is chamfered. As a result, **it's soft at the start of the impact and stiffens as it compresses fully.** It's a design that spreads the force out over time instead of letting it land all at once.

What this patent doesn't say is just as telling. **What provides the damping isn't this document's subject.** But one thing can still be read from it: because it's a part that moves a heavy mass quickly, **it's vulnerable to drops, and the thinner it's made, the less spare room there is.**

## But Is There Ferrofluid Inside the Taptic Engine

**This is where things stall. Apple doesn't disclose what's inside the Taptic Engine.** Teardown photos show a metal mass and coils, and whether there's oil sitting between them can't be determined from a photograph.

There's only one public account. The complaint Taction filed in April 2021 states that Apple's earlier design used a coil spring and a center rod, while its more recent design uses flexures and ferrofluid. **This is the plaintiff's allegation, not a fact Apple has confirmed.** Later press coverage has simply carried that complaint forward.

So here's what this article cannot answer, stated up front. **How much ferrofluid sits inside an iPhone, and starting from which model, is not confirmed by any public record.** Teardown reports don't cover that item either.

**But reading the litigation record changes the shape of the question.** The point Apple actually fought over in court wasn't "there's no such oil inside ours." To get to that, we first have to look at the patents at issue.

## The Patents at Issue Were Originally for Headphones

The jury found two patents infringed: **US10,659,885 and US10,820,117**. Both belong to the same patent family owned by Taction Technology, with a priority date of **September 24, 2014**.

**Both patents share the same inventor — James Biggs, Taction's founder.** He earned a PhD in bioengineering at the University of Utah, studied touch at MIT's Touch Lab, and then worked at an artificial-muscle company. Of his twenty-seven patents, twenty are in haptics — **reading this man's patents is effectively reading Taction.**

The two patents didn't target smartphones. The specification describes a **vibration module that lets a headphone earcup make bass felt on the body**. Its starting point is a criticism of the existing approach: pushing the earcup back and forth compresses the air inside the ear, causing sound to swell by 10–20dB at 50–100Hz and turning it muddy.

So the direction Taction chose was **planar motion**. Moving the mass sideways instead of back and forth pushes less air toward the ear, and instead creates sensation by rubbing the skin. The specification also notes this lets the module be made thin — a flat shape whose thickness is less than one-third of its width or length.

## What a Single Claim Line Required

The opinion treated claim 1 of the '885 patent as the representative claim. **It's built from six elements.**

| Element of Claim 1 | What It Means |
|---|---|
| A housing | The outer frame |
| A plurality of coils carrying current | The side that generates the magnetic field |
| A plurality of magnets disposed adjacent the coils | The side that receives the force |
| A moving part comprising an inertial mass and magnets | The mass that actually moves |
| A suspension formed of a plurality of flexures | Guides the moving part in **planar motion** |
| Ferrofluid damping | **Ferrofluid in direct physical contact** with the moving part suppresses its motion |

<div class="fig-cap">The elements of Claim 1 of US10,659,885. Reproduced from the original text quoted in the Federal Circuit's opinion (2023-2349).</div>

<div class="fig-frame">
  <img src="/articles/2026-09-29-taction-apple-haptic-q-factor/fig1-claim-anatomy.svg" alt="On the left, a cross-section of the vibration module: two coils are fixed inside the housing, and a moving part made of an inertial mass and magnets hangs from flexures, moving side to side in a plane. Ferrofluid sits in contact with the moving part. On the right are the two claim phrases at issue in the lawsuit: that the moving part's motion is damped by ferrofluid in physical contact with it, and that the ferrofluid reduces mechanical resonance within 40 to 200 hertz. Below is a note that this patent was originally used for headphones in 2014." />
  <div class="fig-cap">The elements of claim 1, and the two phrases at issue in the lawsuit. The claim only requires that damping occur — it doesn't say what must provide it. Written by DESK based on the original text quoted in the Federal Circuit's opinion and the patent specification.</div>
</div>

The last two lines might as well be the whole lawsuit. The claim states that "**wherein movement of the moving part is damped by a ferrofluid in physical contact with the moving part**," and that the ferrofluid "**reduces at least one mechanical resonance within a range of 40 Hz to 200 Hz**."

Ferrofluid is an oil mixed with magnetic particles. It clings around the magnet, and when the moving part moves, it shears and absorbs energy. **It's a way to get damping without adding another part**, which matters a great deal in thin devices.

The patent also has a drawing showing where that damping sits. Figure 9B is a cross-section of the module, with magnets and coils facing each other top and bottom and layers stacked in between. The patent describes this configuration as a **ferrofluid-damped module**.

<div class="fig-frame">
  <img src="/articles/2026-09-29-taction-apple-haptic-q-factor/patent-fig9b-ferrofluid-section.webp" alt="Figure 9B of patent US10,659,885. A cross-section of the flat module viewed from the side: two pairs of magnets with alternating polarity sit at the center, top and bottom, with layers stacked between and around them. Reference numeral 904 denotes the moving part; 905a, 905b, and 905c denote the housing and suspension sections; 907 denotes the coil; and 911 denotes the layer sandwiched in between." />
  <div class="fig-cap">US10,659,885, Figure 9B. A flat module far thinner than it is wide or long, with the magnet and coil facing each other top and bottom. Source: USPTO published drawing.</div>
</div>

## The Q-Factor Was Where This Case Was Decided

**The Q-factor is the single number that expresses how much a vibration has been damped, and this lawsuit turned on where that number gets cut.** A footnote in the opinion recorded the definition both sides agreed on: **a Q of 0.5 means critical damping, greater than 0.5 means underdamping, and less means overdamping.**

Underdamping is the state where a single strike leaves a lingering ring. It resonates strongly at the resonant frequency and is weak everywhere else. A well-damped vibration, by contrast, comes out evenly across a broad range and stops the moment it's supposed to stop.

The patent didn't just describe that flatness in words. Figure 5C plots a measured curve of acceleration against frequency: the line climbs starting around 40Hz, then lies nearly flat all the way above it. **That's the same range the claim specifies, 40Hz to 200Hz.**

<div class="fig-frame">
  <img src="/articles/2026-09-29-taction-apple-haptic-q-factor/patent-fig5c-frequency-response.webp" alt="Figure 5C of patent US10,659,885. The horizontal axis is frequency (hertz) and the vertical axis is acceleration (g, peak-to-peak), both on log scales. The curve climbs to nearly 0.5g near 40 hertz, then stays almost flat up to 200 hertz." />
  <div class="fig-cap">US10,659,885, Figure 5C. Below 40Hz it drops off steeply; above it, it lies flat with no resonance peak. This is the shape of a well-damped vibration. Source: USPTO published drawing.</div>
</div>

It's the latter that Taction's patent aimed for. The specification disparaged the prior art this way: it said a high Q-factor "**renders the device useless for faithfully reproducing low-frequency tactile effects in the 15Hz to 120Hz range**," and that because there was no mechanism for critical damping, "**the tactile acceleration frequency response was underdamped, with a Q-factor between 1.5 and 3**."

<div class="sim-embed" data-sim="haptic-q-factor-demo" data-params='{"q":2.2,"f0":130,"ref":true}'>
  <template data-sim-note>This uses only two textbook equations for a second-order vibration system (mass-spring-damper). The frequency response is 1÷√((1−r²)²+(r/Q)²), and the ringing/decay is exp(−ω₀t/2Q)·cos(ω_d t) — once Q drops to 0.5 or below, there's no oscillation, only exponential decay. <b>No constants are estimated; only Q and the resonant frequency are exposed as sliders.</b> The chart marks the definition the opinion's footnote recorded (a Q of 0.5 is critical damping, above that is underdamping, below is overdamping), the line the district court drew (a Q of 1.5), and the 40Hz–200Hz band the claim specifies. The actual Q-factor and resonant frequency of Apple's Taptic Engine or Taction's module have never been disclosed, so the values shown here are not figures for any specific product.</template>
</div>

The district court drew a line on the claim based on this description: to infringe, **the Q-factor had to be below 1.5**. It found that Apple's products had a Q-factor above 1.5, ruled there was no infringement, and closed the case on summary judgment.

## Apple's Defense Wasn't "It's Not There" — It Was "It's Less Damped"

**Here's the logic that won Apple its district-court victory: our Taptic Engine's Q-factor is greater than 1.5.** The argument is that Apple's vibration isn't damped as much as the claim requires.

Flip the framing and the meaning becomes clear. **Apple beat the infringement claim by arguing "ours rings longer."** Its defense amounted to saying its resonance is less suppressed, and less even across a broad band — the opposite of what it says when selling the product.

**By contrast, the argument "there's no ferrofluid anywhere in our product" was not the axis of this lawsuit.** Footnote 5 of the opinion notes that both sides did not dispute that Taction's infringement contentions stated **where** each claim element was located in the product. The district court's basis for excluding Taction's expert opinion wasn't the location of the elements either — it was that the expert failed to explain **how** the product achieves high-damping output.

Let's draw one line here. **What the two sides didn't dispute was the procedural requirement that the contentions stated a location — not a factual finding that the Taptic Engine actually contains ferrofluid.** Still, it's clear where the weight of the defense actually rested.

Apple's statement after the verdict points the same way. Apple said the Taptic Engine is fundamentally different from Taction's technology, and that "**Taction's own testing of Apple's products at trial confirmed that**." That means this was a dispute over **measured values**, not a dispute over a parts list.

**So reading this verdict as "found to infringe despite not using ferrofluid" misses the mark.** More precisely, the district court had bolted two walls onto the claim — that the damping had to be mechanical, and that the Q-factor had to be below 1.5 — and the appeals court knocked both walls down, taking the defense that had been leaning on them down with them.

## How the Appeals Court Erased That Line

**On August 13, 2025, the Federal Circuit found that line had no basis and reversed the district court.** It gave three reasons.

First, what the specification called "useless" was **an LRA with no damping** — a linear resonant actuator. Since the claim requires damping, that description has nothing to do with the scope of the claim.

Second, "critically damped" and "underdamped" can be read not as put-downs but as **plain statements of fact**. The former is simply the term for the non-oscillating state (a Q of 0.5), and the latter for the oscillating state (a Q above 0.5).

Third is the decisive one. A patent in the same family, **US9,430,921, expressly recites "a Q-factor of less than 1.5" in claims 1, 14, 18, 20, and 33.** If the specification's wording alone were read as having already disclaimed that limitation, those claims would become meaningless.

**In other words, the mere fact that a separate patent had written the number into its claims is what kept that same number from being read into a patent that hadn't.**

<div class="fig-frame">
  <img src="/articles/2026-09-29-taction-apple-haptic-q-factor/fig2-three-limits.svg" alt="At the top is a timeline running from the April 2021 complaint, to Apple's 2023 district-court win, to the August 2025 appellate reversal, to the September 2026 jury verdict. Below it, the three limitations the district court added to the claim sit side by side: high-damping output survived, while mechanical damping and a Q-factor below 1.5 were struck. The bottom band notes that a related patent in the same family, US9430921, expressly recites a Q-factor below 1.5 in its claims, so it cannot be read as a disclaimer." />
  <div class="fig-cap">Two of the three limitations the district court added were struck down. The existence of a sibling patent that had written the number into its claims kept that same number from being read into a patent that hadn't. Written by DESK based on the court's opinion.</div>
</div>

## The Bigger Question Was "What Provides the Damping"

**The district court had held that high-damping output must be achieved through mechanical damping, and the appeals court struck that limitation too.** The mere fact that the specification didn't give an example of non-mechanical damping isn't grounds to narrow the claim, it held. The specification itself had left the door open, stating that vibration "**may be damped in any suitable manner**."

With that limitation gone, the scope widened. Taction's expert argued that the frequency response of Apple's Taptic Engine is shaped by **closed-loop software control**, and that this, combined with **ferrofluid** damping inside the Taptic Engine, produces the even response.

For component makers, the implication is plain. **Shaping a characteristic with control software doesn't let you sidestep a patent that describes a mechanical structure.** If the claim doesn't limit the means of damping, a result reached through software lands in the exact same place.

**The exclusion of the expert opinion** — the other basis on which the district court closed the case — was reversed as well. The local patent rules only required stating **where** each claim element was located in the product, yet the court had demanded **how** as well, which the rules never called for.

## What Remains

**The verdict set the damages figure, but it didn't end the case.** Apple has said it will appeal, maintaining that the Taptic Engine is fundamentally different from Taction's technology. The jury found the infringement wasn't willful, which means the path to tripling the damages is closed.

The litigation funding also says something about this case's character. According to Bloomberg Law, Taction's litigation costs were funded by **an investment vehicle affiliated with Burford Capital**. It explains where the stamina to fight over a single patent for more than 10 years came from.

**How the calculation behind the $5.7 billion damages figure was reached is not established by any public record.** All that's confirmed is that the accused products span the iPhone and Apple Watch broadly, and that the infringement period is long. This article does not speculate on the methodology.

## Outlook

**We don't think it's likely this verdict stands as is.** The largest verdicts in U.S. patent litigation are frequently cut down or reversed on appeal, and this case already has a history of being overturned once. This time, though, the fact that the direction of the reversal ran the other way works against Apple.

**What component makers should be watching now isn't the dollar figure — it's the wording of the claims.** Here are three things worth checking.

First, **will Apple change the Taptic Engine's structure?** Stripping out ferrofluid damping, or changing the planar-motion approach, would turn a design change into a design-around. The question is whether that's possible while keeping both thinness and the feel of touch intact.

Second, **will infringement claims premised on software control spread to other cases?** This ruling showed that a claim which doesn't limit the means of damping can reach as far as software. That has a direct impact on component makers who handle both actuators and drive chips together.

Third, **how will the practice of writing numerical limitations into claims change?** What saved Taction this time was the fact that a Q-factor had been expressly recited in a different patent. A number written only in the specification can always be turned by the other side into grounds for a limitation — that's the practical lesson this case leaves behind.
