---
title: "Ultra-Thin Glass Cover Windows"
searchTitle: "Ultra-thin glass (UTG) cover windows: mother glass forming and thinning, fold bending stress and the 200,000-cycle limit radius, chemical strengthening and self-breakage of thin glass, pen drop and puncture, fatigue and edges, variable-thickness structures"
summary: "UTG's fold limit is set by surface strain, not thickness. The 200,000-cycle limit radius scales with thickness at about 1.2% strain, three times CPI's crease limit. Strengthening must stay shallow: 50 μm glass self-broke within the time thick glass needs, and a 4 μm layer survived 7.6 times higher drops."
section: tech-note
reporter: TEKER
lang: en
translationOf: 2026-11-24-utg-window
publishedAt: 2026-11-24
collectWeekStart: '2026-11-16'
readingMinutes: 13
tags: [cover window, UTG, ultra-thin glass, foldable, chemical strengthening, bending stress, pen drop]
series:
  id: teker-deep
  part: 3
  episode: 5
featured: false
sources:
  - type: patent
    title: "US9321678B2 Bendable glass stack assemblies, articles and methods of making the same (Corning, priority date 2014-01-29)"
    url: "https://patents.google.com/patent/US9321678B2/en"
  - type: patent
    title: "US12044822B2 Flexible glass-based cover window having smaller thickness folding part (UTI, priority date 2019-03-11)"
    url: "https://patents.google.com/patent/US12044822B2/en"
  - type: patent
    title: "US11673829B2 Window panel, electronic apparatus including same, and method for manufacturing window panel (Samsung Display, priority date 2018-12-28)"
    url: "https://patents.google.com/patent/US11673829B2/en"
  - type: patent
    title: "US11465930B2 Flexible ultrathin glass with high contact resistance (Schott, priority date 2017-06-02)"
    url: "https://patents.google.com/patent/US11465930B2/en"
  - type: patent
    title: "US10688756B2 Foldable electronic device assemblies and cover elements for the same (Corning, priority date 2016-01-15)"
    url: "https://patents.google.com/patent/US10688756B2/en"
  - type: patent
    title: "US11286203B2 Ultra-thin, non-frangible glass and methods of making (Corning, priority date 2016-01-13)"
    url: "https://patents.google.com/patent/US11286203B2/en"
  - type: patent
    title: "US12434995B2 Ultrathin glass with high impact resistance (Schott, priority date 2018-05-18)"
    url: "https://patents.google.com/patent/US12434995B2/en"
  - type: patent
    title: "US11711937B2 Display apparatus and method of manufacturing the same (Samsung Display, priority date 2020-07-01)"
    url: "https://patents.google.com/patent/US11711937B2/en"
  - type: patent
    title: "US12428337B2 Method for manufacturing ultra-thin glass substrate, ultra-thin glass substrate, and display device (BOE, priority date 2022-05-31)"
    url: "https://patents.google.com/patent/US12428337B2/en"
  - type: patent
    title: "US11851363B2 Method for manufacturing ultra-thin glass substrate and method for manufacturing display panel (Flexi Glass, priority date 2020-10-26)"
    url: "https://patents.google.com/patent/US11851363B2/en"
  - type: patent
    title: "US10974990B2 Ultrathin chemically toughened glass article and method for the production of such a glass article (Schott, priority date 2014-09-12)"
    url: "https://patents.google.com/patent/US10974990B2/en"
  - type: paper
    title: "Oh E., Oh S., Lee S., Jeon S., Kim T., Mechanical modeling of pen drop test for protecting ultra-thin glass layers, Journal of the Microelectronics and Packaging Society 29(3), 49–53 (2022)"
    url: "https://doi.org/10.6117/kmeps.2022.29.3.049"
  - type: paper
    title: "Wang Shasha et al., Finite Element Analysis and Optimization Study of Ultra-Thin Glass Cracks in Flexible Displays, SID 2025 Digest P-157"
    url: "https://sid.org/Portals/sid/Files/SID-Digest/docs/P-157.pdf"
  - type: article
    title: "Samsung Newsroom, The Breakthroughs Powering Samsung's Thinnest, Most Refined Foldables (2025-08-04)"
    url: "https://news.samsung.com/za/the-breakthroughs-powering-samsungs-thinnest-most-refined-foldables"
  - type: article
    title: "Samsung Display Introduces Foldable Display with Easily Bendable, Ultra-thin Glass (2020-02-19)"
    url: "https://news.samsung.com/us/samsung-utg-glass-foldable-display-easily-bendable-ultra-thin-glass"
  - type: article
    title: "ZDNet Korea, President Roh Tae-moon: \"Galaxy Z Fold8 and Ultra UTG thickness varies with titanium and size\" (2026-07-23)"
    url: "https://zdnet.co.kr/view/?no=20260723042306"
  - type: article
    title: "ZDNet Korea, Samsung Electronics' 'Wide Fold' UTG is 30% thicker than Galaxy Z Fold8, crease improvement expected (2026-06-12)"
    url: "https://zdnet.co.kr/view/?no=20260612112445"
---

Episodes 1 through 4 covered flat and curved covers. This episode takes the folding cell of the classification map: ultra-thin glass (UTG). The CPI film in Episode 3 was limited by the crease left after being held folded. UTG is credited with fewer creases than colorless polyimide and with higher hardness, which makes it more scratch-resistant (KAIST 2022). Glass has no creep, so it leaves no crease. Instead, its outer surface goes into tension with every fold, and when that tension overcomes a flaw, the glass breaks. UTG design is decided on a single trade-off: thinner glass folds more easily, and thicker glass resists puncture better.

<figure class="fig-single">
  <img src="/articles/2026-11-24-utg-window/window-map.svg" alt="Cover window classification map. The columns are flat, curved, folding and large automotive; the rows are glass and plastic. The folding cell of the glass row, UTG (foldable phones), covered in this episode, is highlighted. Below, the series order is listed as tempered glass, glass-ceramics and sapphire, plastics, curved and 3D, UTG, and hybrid." />
  <figcaption>Part 3 classification map. This episode covers the folding cell of the glass row.</figcaption>
</figure>

How glass can fold without breaking is shown first in a DISPLAY NOW video (8 minutes 47 seconds). The article follows the same flow in more detail with evidence and figures.

<div class="yt-clip" data-yt="oVXr5k49XIU" data-poster="/videos/utg-cover.webp" data-title="How Does Glass Fold? The Ultra-Thin Glass in Foldable Phones"></div>

## Forming and thinning UTG mother glass

UTG refers to glass 100 μm thick or less. There are three ways to make the mother glass. Schott draws a thin ribbon directly by down-draw, pulling molten glass downward. A Schott patent lists down-draw together with overflow fusion and redraw, which re-stretches a heated glass preform. If the mother glass is thicker than the target, it is thinned by dissolving it in acid.

A BOE patent sprayed acid over an entire 170 μm sheet, etching both sides down to 32 μm (target 30 μm). Thinned glass develops defects from the moment it is cut. A Flexi Glass patent states that glass of about 100 μm before strengthening chips at the edges and forms microcracks from scribing wheel pressure alone. BOE rounded the edges of the folding zone by etching once during thinning and once more during micro-etching after strengthening, and reported that first-pass yield rose from 53% to 91%. Micro-etching is a process that blunts the sharp microcrack tips on surfaces and edges. The same patent states that the previous process required CNC finishing of 30 to 100 μm specimens and was sensitive to process variables.

Few specifications of commercial UTG are public. When Samsung Display announced 30 μm UTG in February 2020, it explained that a special material was injected to a certain depth during strengthening to make hardness uniform. In the same announcement it said the glass had passed a 200,000-cycle folding test by the French certification body Bureau Veritas. Specific figures for strengthening conditions and compressive layer depth are examined in a later section through patent examples.

## Fold bending stress and the 200,000-cycle limit radius

When a sheet is folded to radius R, the outer surface stretches and the inner surface contracts. Multiplying the surface strain used in Episode 3 (the rate at which the outer surface stretches), ε = t/(2R + t), by the elastic modulus gives stress. A Corning patent writes the maximum surface bending stress as σ = E/(1−ν²)·(t/2)·(1/R), explaining that stress is proportional to thickness and elastic modulus and inversely proportional to radius. Folding 50 μm glass with an elastic modulus of 72 GPa and a Poisson's ratio of 0.2 to a radius of 2 mm gives a surface stress of about 0.94 GPa.

Table 1 of a UTI patent lists, by folding-section thickness, the minimum radius at which 95% passed 200,000 folds: 0.8 mm at 20 μm, 1.3 mm at 30 μm, 1.7 mm at 40 μm, 1.9 mm at 45 μm and 2.1 mm at 50 μm. Calculating surface strain for the five rows gives 1.14 to 1.23%, nearly identical. Although thickness changes 2.5-fold, the limit strain stays the same, and the radius grows in proportion to thickness. In stress terms this is about 0.9 GPa. An example in a Corning patent falls in the same band. Glass 75 μm thick with a surface compression of 775 MPa and a 10 μm compressive layer folded more than 200,000 times at a plate spacing of 8 mm. This patent takes the static bend radius in a test folding the specimen into a C shape between two plates as 0.414 times the plate spacing, so the radius is about 3.3 mm and the surface bending stress about 0.85 GPa (calculated).

In real stacks, the neutral plane does not lie at the middle of the glass. A BOE analysis states that as the PI and PET layers above the UTG thicken, the UTG's neutral plane shifts toward the top surface and the bottom surface takes greater tension. A value calculated for glass alone is a starting point; the thickness and elastic modulus of the protective and adhesive layers change the stress at the glass surface.

<figure class="fig-single">
  <img src="/articles/2026-11-24-utg-window/bend-limit.svg" alt="On the left, a cross-section of glass folded to radius R: the outer surface is in tension, the inner in compression, and surface strain is t/(2R+t). The graph on the right plots the minimum radius for 95 percent passing 200,000 folds, 0.8, 1.3, 1.7, 1.9 and 2.1 millimeters, at folding-section thicknesses of 20, 30, 40, 45 and 50 micrometers. The points sit on the 1.2 percent surface strain line, and the 0.4 percent CPI crease limit line lies at about three times that radius." />
  <figcaption>UTG's 200,000-cycle limit radius lies on the line of about 1.2% surface strain (UTI US12044822B2 Table 1, 95% pass criterion). The dashed line is the 0.4% crease limit of the CPI in Episode 3.</figcaption>
</figure>

The CPI in Episode 3 had a crease-free limit of 0.4%. Glass takes about three times that strain for 200,000 cycles. The two figures rest on different criteria. CPI's 0.4% is where a crease begins to remain, while glass's 1.2% is what it passes without breaking. Below 1.2%, glass leaves no crease; above it, fracture occurs instead of a crease.

## Chemical strengthening and central tension in thin glass

The conclusion of Episode 1 was that the deeper the compressive layer, the better the drop resistance. In UTG, the direction is reversed. In Episode 1's equation CT = CS·DOL/(t − 2·DOL), the denominator t − 2·DOL is the central thickness excluding the compressive layers. For 550 μm glass that is hundreds of μm, but for 50 μm glass it is tens of μm, so deepening the compressive layer by just a few μm multiplies central tension (CT) several times.

Table 1 of a Samsung Display patent compares the same single-salt 420 °C condition by thickness. Glass of 700 μm reached CT of 17 MPa at 30 minutes and 57 MPa at 360 minutes, remaining stable for six hours. Glass of 50 μm reached CT of 283 MPa at 30 minutes and 604 MPa at 60 minutes, and specimens treated for 120 to 180 minutes broke on their own. The unit of strengthening time drops from hours to minutes. Episode 1's frangibility threshold equation was built for glass 0.3 mm and thicker and cannot be applied to 30 to 50 μm. A Corning patent's frangibility curve also goes only as far as about 97 MPa at 300 μm, about 135 MPa at 200 μm and about 200 MPa at 100 μm. The direction, in which allowable CT rises as glass thins, is the same, but no public equation directly gives the threshold for 30 to 50 μm.

In the same patent, Samsung Display also describes the opposite approach. When 50 μm glass was treated for 240 minutes or longer, self-breakage disappeared again, and surface compression dropped from 500 MPa to 353 MPa. The patent states that designing the compressive layer depth to be half the thickness or more yields surface compression of 200 MPa or higher at thicknesses of 100 μm or less without self-breakage. This is the condition in which the compressive layer spreads through the entire thickness and the central tension zone disappears.

<figure class="fig-single">
  <img src="/articles/2026-11-24-utg-window/ion-exchange.svg" alt="The left graph shows central tension versus treatment time in a single salt at 420 degrees. For 700-micrometer glass it is nearly flat, from 17 at 30 minutes to 57 megapascals at 360 minutes; for 50-micrometer glass it rises steeply to 283 at 30 minutes and 604 megapascals at 60 minutes, and the glass broke on its own in the 120 to 180 minute range. The bars on the right show, for 50-micrometer glass strengthened at 390 degrees for 2, 5 and 20 minutes, compressive layer depths of 4, 6 and 11 micrometers, central tensions of 67, 111 and 267 megapascals, and sandpaper ball drop heights of 13.7, 5.7 and 1.8 millimeters." />
  <figcaption>(a) In the same salt bath, the CT of 50 μm glass rises on a scale of minutes (Samsung Display US11673829B2 Table 1). (b) The shallower the compressive layer, the higher the drop height (Schott US11465930B2, 4.5 g ball on P180 sandpaper).</figcaption>
</figure>

A Schott patent compared the same 50 μm glass strengthened at 390 °C for 2, 5 and 20 minutes. Compressive layers were 4, 6 and 11 μm, and CT was 67, 111 and 267 MPa. In a test dropping a 4.5 g acrylic ball onto glass laid on a steel plate with P180 sandpaper on top, average failure heights were 13.7, 5.7 and 1.8 mm. The glass with a 4 μm compressive layer survived 7.6 times higher than the one with 11 μm. The same direction held at 70 μm and 100 μm. Specimens were cut from down-draw mother glass with a diamond wheel and tested without edge treatment.

| Thickness | Strengthening time | CS (MPa) | DoL (μm) | CT (MPa) | Average ball drop (mm) | Failure bend radius (mm) |
|---|---|---|---|---|---|---|
| 50 μm | 20 min (comparative) | 680 | 11 | 267 | 1.8 | under 3 |
| 50 μm | 2 min | 706 | 4 | 67 | 13.7 | under 4 |
| 70 μm | 20 min (comparative) | 724 | 11 | 166 | 2.3 | under 6 |
| 70 μm | 2 min | 764 | 4 | 49 | 23 | under 6 |
| 100 μm | 20 min (comparative) | 811 | 11 | 114 | 4.2 | under 7 |
| 100 μm | 2 min | 793 | 4 | 36 | 29 | under 9 |

The CT column agrees with Episode 1's equation. For the 50 μm comparative example, 680 × 11 / (50 − 22) = 267 MPa. The last column of the table shows that shallow strengthening also has a cost. At the same 50 μm, the failure bend radius is under 3 mm for the specimen with an 11 μm compressive layer and under 4 mm for the one with 4 μm. A shallow compressive layer improves drop resistance but reduces the surface compression margin during folding.

The strengthening conditions given in patents are also shorter and lower in temperature than for thick glass. A Corning patent gives an example of 75 μm glass of Gorilla Glass 2 composition immersed in a 430 °C potassium nitrate bath for 30 minutes, and in another example lists a surface compression of about 772 MPa and a compressive layer of 9.6 μm. A Samsung Display patent sets the first strengthening at 350 to 460 °C for 30 minutes to 6 hours and the second for 5 minutes to 2 hours.

## Summing strengthening stress and bending stress

Two stresses overlap on the outer surface of folded UTG: the surface compression −CS left by strengthening and the tension +σ created by folding. If the sum is negative, the surface is still in compression and flaws stay closed. Once the sum turns positive, the surface goes into tension and flaws open. Folding 50 μm glass to a radius of 2 mm produces a bending stress of about 940 MPa, so with surface compression of 700 MPa the surface is left at about 240 MPa tension.

A Schott patent writes this relationship as an empirical formula: the failure bend radius is smaller than thickness (mm) multiplied by 80,000 and divided by surface compression (MPa). The structure, in which radius is proportional to thickness and inversely proportional to surface compression, matches UTI Table 1. For 50 μm and CS of 700 MPa, it is about 5.7 mm. Schott states that this value is for specimens without edge treatment and that the radius becomes smaller with edge treatment.

How dangerous the residual surface tension is can be gauged by flaw size. Folding 30 μm glass to the 200,000-cycle limit radius of 1.3 mm gives a bending stress of about 0.87 GPa. Subtracting a surface compression of 700 MPa leaves about 170 MPa of tension at the surface. Putting the maximum flaw of 400 nm on a fusion glass surface into the Corning patent's equation K = 1.12·σ·√(πa) gives a stress intensity factor of about 0.21 MPa√m (calculated). This equals the fatigue threshold of about 0.2 MPa√m adopted in the same patent. The calculation is consistent with the 200,000-cycle limit converging at a surface strain of about 1.2%.

<div class="sim-embed" data-sim="utg-fold-stress-demo">
  <template data-sim-note>Change glass thickness, fold radius, surface compression and compressive layer depth to see the through-thickness stress and the two fold criteria. Strengthening stress is assumed to fall linearly from −CS at the surface to the compressive layer depth with uniform tension in the middle, calculated as CT = CS·DoL/(t − 2·DoL) (the equation from Episode 1). Bending stress is σ = E/(1−ν²)·(t/2)·(1/R) with E of 72 GPa and ν of 0.2, for glass alone with the neutral plane at the middle of the glass. Criterion 1 is the surface strain of about 1.2% for 95% passing 200,000 cycles, calculated from UTI patent Table 1; criterion 2 is the Schott patent's empirical formula t·80,000/CS (specimens without edge treatment). The frangibility threshold for 30 to 50 μm is not drawn because no public equation exists, and protective and adhesive layers, flaws, humidity and fatigue are not included.</template>
</div>

## Pen drop and puncture resistance

Reducing thickness makes folding easier but weakens resistance to local loads. In a Corning patent, the puncture resistance of glass was about 2.5 kgf at 116 μm and fell to about 0.4 kgf at 25 μm. The specimens were 130 μm glass etched to different thicknesses, so this is the result of reducing thickness alone in the same composition. Another patent from the same company defines a pen drop test using a 0.7 mm tungsten carbide ballpoint pen (5.73 g including the cap). Bare 75 μm glass broke at 4.6 cm, while a specimen with a polymer layer attached on top was undamaged up to 19 cm. The patent explains that the polymer layer absorbs and disperses impact energy so the glass can take loads it could not withstand alone, and that it holds the fragments in place if the glass breaks beyond its design limit.

A KAIST team analyzed pen drop on a 37 μm UTG stack by finite element analysis. Below the UTG (elastic modulus 72 GPa, Poisson's ratio 0.2) they placed a 50 μm adhesive layer and PET, and modeled the pen tip as a rigid body 0.3 mm in diameter. Maximum principal stress arose not at the top surface the pen struck but at the bottom surface of the UTG. From a height of 60 mm it was 5.39 GPa without a reinforcing layer, 4.72 GPa with a reinforcing layer above and 5.73 GPa with one below. When the pen presses, the glass sheet bends locally, and the bottom surface of the bent sheet takes tension. A reinforcing layer below softens the support and increases the bending. The paper compared these stresses with a UTG fracture strength of 4.188 GPa from the literature to determine the maximum pen drop height for each structure.

A Schott patent raised pen drop height by 30% to more than 100% by etching the strengthened glass surface. The test places the glass on 50 μm PE and 50 μm pressure-sensitive adhesive and drops a 4.5 g pen with a 300 μm ball. A 0.05 mm comparative example broke at 13.2 mm, while an example etched for 7 minutes in 0.2% ammonium bifluoride (NH₄HF₂) reached 18.7 mm, about 40% higher. Etching is a process that reduces surface and edge flaws, with the same purpose as the micro-etching in the earlier section.

Pen drop heights cannot be compared directly because test conditions differ by company. Corning uses two tests with different pen weights and ball diameters, while Schott drops a thinner, lighter pen onto a polymer support. The glass bends differently depending on the support and protective layers, and that bending sets the bottom-surface stress.

| Test | Conditions | Example result | Source |
|---|---|---|---|
| Sandpaper ball drop | Glass on steel plate, P180 sandpaper, 4.5 g acrylic ball | 50 μm 1.8–13.7 mm | Schott US11465930B2 |
| Pen drop 1 | BIC pen, 0.7 mm tungsten carbide ball, 5.73 g including cap | 75 μm bare 4.6 cm, polymer layer 19 cm | Corning US10688756B2 |
| Pen drop | 300 μm ball, 4.5 g, 50 μm PE + 50 μm pressure-sensitive adhesive support | 50 μm 13.2 → 18.7 mm (etched) | Schott US12434995B2 |
| Static fold | Plate spacing 10.5 mm, 85 °C and 85% relative humidity, 480 hours | Residual bend 46–48 vs. 57–68 mm | Corning US10688756B2 |
| Cyclic fold | 200,000 cycles, minimum radius for 95% pass | 20–50 μm, 0.8–2.1 mm | UTI US12044822B2 |

<figure class="fig-single">
  <img src="/articles/2026-11-24-utg-window/pen.svg" alt="On the left, a cross-section of a pen pressing on a stack of protective layer, 37-micrometer UTG, adhesive layer and PET; the sheet bends locally and maximum stress is marked at the bottom surface of the UTG. The bars on the right show the maximum principal stress at the UTG bottom surface in a 60-millimeter pen drop: 4.72 gigapascals with a reinforcing layer above, 5.39 with none and 5.73 with one below. The dashed line is the UTG fracture strength of 4.19 gigapascals cited by the paper. Below, puncture resistance is noted as falling from 2.5 kilograms-force at 116 micrometers to 0.4 kilograms-force at 25 micrometers." />
  <figcaption>Under pen impact, maximum principal stress arises at the bottom surface of the UTG (KAIST 2022). Puncture resistance depends strongly on thickness (Corning US9321678B2).</figcaption>
</figure>

## Fatigue, humidity and static fold testing

Glass has no creep, but it does suffer time-dependent damage. A Corning patent treats lifetime with the stress intensity factor at the crack tip, K = Y·σ·√(πa). The fracture toughness K_IC of glass is about 0.7 MPa√m, and the fatigue threshold, below which cracks do not grow even under sustained load, was taken as about 0.2 MPa√m. The maximum flaw on a fusion-formed glass surface was assumed to be 400 nm. BOE states that it sets the long-term safe stress at a stress intensity factor of about 0.3 times the fracture toughness.

The same BOE paper states that cracks mostly start at the glass edges, and that in uncoated UTG, cracks grow faster under cyclic loading due to humidity. A coating keeps moisture from reaching the crack tip. This is why rounding the edges by etching and micro-etching the surface matter as much as strengthening.

Changes over time while held folded are measured by high-temperature, high-humidity static testing. In a Corning patent's static test, the specimen is placed in a C shape between two parallel metal plates and held at 85 °C and 85% relative humidity, then removed and left unconstrained for 1 hour before the residual bend height is measured. After 480 hours at a plate spacing of 10.5 mm, the PI cover comparative examples measured 68 mm and 57 mm, and the stack examples containing 75 μm glass measured 48, 47 and 46 mm. The patent states this is about 18% lower than the 57 mm comparative example. The glass stack also includes PI, adhesive and PET layers, so the residual bend comes mainly from the polymer layers. The crease in Episode 3's CPI grew with time held folded. Adding glass reduces that time dependence.

## Variable-thickness structures and UTG getting thicker again

One way to split the thin-versus-thick trade-off within a single sheet is a variable-thickness structure that thins only the folding section. A Samsung Display patent sets the flat section at 70 to 100 μm and the folding section at 20 to 30 μm, with final surface compression of 650 to 800 MPa in the flat section and 400 to 700 MPa in the folding section. The folding section is formed before strengthening by polishing, thermoforming or photolithographic etching, and after a first strengthening in a 7:3 mixture of sodium nitrate and potassium nitrate, a second strengthening is done in single-salt sodium nitrate. A UTI patent likewise thins a folding section of 20 to 100 μm, 3.0 to 8.0 mm wide, in a 50 to 300 μm cover by wet etching, polishing or laser.

Products are moving thicker. Samsung said the UTG in the Galaxy Z Fold7 is 50% thicker than in the Fold6, citing less visible creasing as the reason. ZDNet Korea reported the Fold6's UTG as 30 μm and that of the Korea- and China-only Fold Special Edition and the Fold7 as 45 μm, consistent with the 50% increase Samsung stated. The same outlet reported in July 2026 that the Galaxy Z Fold8's UTG is around 60 μm, the Z Fold8 Ultra's 45 μm and the Z Flip8's 50 μm. That is a doubling in six years from the 30 μm of the first commercial UTG in 2020. Thicker glass also burdens the hinge. In the BOE analysis, 30, 40 and 50 μm UTG in the same stack and radius showed bending stress in the ratio 1 : 1.33 : 1.66 and restoring force, the force trying to unfold, in the ratio 1 : 2.41 : 4.66. Restoring force grows close to the cube of thickness (1 : 2.37 : 4.63), because the bending stiffness needed to bend a sheet is proportional to the cube of thickness. Bending stress rises in proportion to thickness, to 1.66 times, but the force to hold the folded state becomes 4.66 times. The BOE paper states that UTG thickness and strength keep rising, increasing bending stress.

The advantages of thicker UTG are in creasing and local loads. Samsung cited creasing for the Fold7, and the puncture resistance and pen drop in the earlier section also grow with thickness. Conversely, surface strain at the same radius increases, so raising thickness requires either enlarging the fold radius or leaving only the folding section thin. The variable-thickness structure is the way to meet both requirements together.

<figure class="fig-single">
  <img src="/articles/2026-11-24-utg-window/thickness.svg" alt="On the left, a cross-section of a variable-thickness cover with a flat section of 70 to 100 micrometers and a central folding section of 20 to 30 micrometers; surface compression is 650 to 800 megapascals in the flat section and 400 to 700 in the folding section, and the folding section is formed before ion exchange. The bars on the right show, for the same stack and radius, bending stress ratios of 1, 1.33 and 1.66 and restoring force ratios of 1, 2.41 and 4.66 for UTG of 30, 40 and 50 micrometers." />
  <figcaption>A variable-thickness structure that thins only the folding section (Samsung Display US11711937B2), and bending stress and restoring force by thickness (BOE, SID 2025).</figcaption>
</figure>

## Comparison of UTG design variables

| Variable | Improves when increased | Worsens when increased | Supporting figures |
|---|---|---|---|
| Thickness | Puncture and pen drop, creasing | Limit radius, restoring force | 116→25 μm puncture 2.5→0.4 kgf, restoring force ∝ t³ |
| Compressive layer depth | Bend radius, slightly | Central tension, drop | 50 μm DoL 4→11 μm, drop 13.7→1.8 mm |
| Surface compression | Outer surface compression margin | Central tension | radius < t·80,000/CS |
| Variable folding-section thickness | Flat-section stiffness and fold radius together | Process steps, yield | Flat 70–100, fold 20–30 μm |
| Protective layer, etching | Pen drop, fragment retention | Stack thickness | 4.6→19 cm, etching 30–100% or more |

UTG's limit comes down not to thickness but to a single quantity, surface strain. The 200,000-cycle limit radius is proportional to thickness, and that ratio corresponds to a surface strain of about 1.2%. Strengthening lays surface compression over that strain and delays the point at which the surface turns to tension, but because the central thickness is only tens of μm, the compressive layer must be shallow. The remaining weakness, local loading, is countered with protective layers and thickness, and thickness in turn increases radius and restoring force.

The next episode is the last of Part 3. It looks at how hybrid covers, which stack glass and plastic in one sheet, divide up the trade-offs seen so far.
