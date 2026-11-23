---
title: "Glass-Ceramic and Sapphire Cover Windows"
searchTitle: "Glass-ceramic and sapphire cover windows: lithium disilicate, nanocrystals and transparency, fracture toughness, hardness, refractive index and reflection, Ceramic Shield"
summary: "Glass-ceramic grows crystals under 150 nm inside glass, raising fracture toughness from 0.82 to 1.15 MPa·m^0.5, but hardness stays near glass at 6.5 GPa. Sapphire is over three times harder at 22.5 GPa, yet cannot be ion-exchanged and reflects 7.7% per surface."
section: tech-note
reporter: TEKER
lang: en
translationOf: 2026-11-03-glass-ceramic-sapphire
publishedAt: 2026-11-03
collectWeekStart: '2026-10-26'
readingMinutes: 8
tags: [cover window, glass-ceramic, sapphire, Ceramic Shield, fracture toughness, nanocrystals, ion exchange]
series:
  id: teker-deep
  part: 3
  episode: 2
featured: false
sources:
  - type: patent
    title: "US12071364B2 Glass ceramic articles having improved properties and methods for making the same (Corning, priority date 2018-07-16)"
    url: "https://patents.google.com/patent/US12071364"
  - type: patent
    title: "US11634360B2 Chemically strengthened lithium disilicate-petalite glass-ceramics (Corning, priority date 2018-11-13)"
    url: "https://patents.google.com/patent/US11634360"
  - type: patent
    title: "EP1390312A1 Transparent gallate glass-ceramics (Corning, priority date 2001-05-03)"
    url: "https://patents.google.com/patent/EP1390312"
  - type: patent
    title: "US9718249B2 Laminated aluminum oxide cover component (Apple, priority date 2012-11-16)"
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
    title: "NIST Ceramic Data Portal, Fracture toughness of sapphire (Iwasa & Ueno 1981 and others)"
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
Episode 1 ended with two problems left by chemically strengthened glass. One is that ion exchange does not
raise hardness, so scratches remain as they are. The other is that there are limits to how compression can be
introduced, so the next step must be raising the toughness of the material itself. This episode looks at two
materials, in the same flat cell of the glass row on the map, that each tried to answer one of those problems.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/window-map.svg" alt="Cover window map. Columns are flat, curved, folding and large automotive; rows are glass and plastic, with each material's applications noted. The glass flat cell holds strengthened glass (phones, tablets, laptops), glass-ceramic (phone fronts, watches) and sapphire (watches, lens covers). Glass curved is 3D thermoformed glass (curved phones, wearables), folding is UTG (foldable phones), and automotive is cold-formed glass (vehicle dashboards). The plastic row holds PMMA and PC (industrial displays), molded PC (automotive cover lenses), CPI (the first foldables in 2019) and PC and PMMA (automotive displays, HUDs). Glass-ceramic and sapphire, covered in this episode, are highlighted." />
  <figcaption>Part 3 map. This episode covers glass-ceramic and sapphire in the flat cell of the glass row.</figcaption>
</figure>

Glass-ceramic is a material in which small crystals are grown inside glass; sapphire is a single crystal from
the start. Both use crystals, but they gain different things. Glass-ceramic became tougher, and sapphire is
hard. This episode looks in numbers at where that difference comes from and what it costs.

## What changes when crystals are grown inside glass

**What growing crystals gained was toughness and stiffness, not hardness.** The Gorilla Glass Ceramic 2
product sheet Corning released in May 2025 lists fracture toughness at 1.15 MPa·m^0.5. The same company's
aluminosilicate glass Victus 2 is 0.82. That is 1.4 times higher.

Young's modulus also rose from 79 to 103 GPa, a factor of 1.3. Hardness, however, barely changed. The two
sheets use different scales, so they cannot be compared directly, but after strengthening Victus 2 is Vickers
670 and Glass Ceramic 2 is Knoop 660 kgf/mm², both near 6.5 GPa.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/properties.svg" alt="Five rows of bars comparing the properties of Victus 2 glass, Glass Ceramic 2 and sapphire. Fracture toughness is 0.82, 1.15, and 2.4 to 4.5 MPa·m^0.5 depending on crystal plane. Hardness is 6.6 (Vickers), 6.5 (Knoop) and 22.5 GPa (Vickers). Young's modulus is 79, 103 and 470 GPa. Density is 2.41, 2.48 and 3.97 g/cm³. Single-surface reflection calculated from refractive index is 4.3, 4.5 and 7.7%." />
  <figcaption>Glass-ceramic became tougher and stiffer, but hardness stays where glass is. Sapphire is hard, heavy and more reflective.</figcaption>
</figure>

Corning patent applications show the same range. An application with a 2018 priority date lists fracture
toughness of 1.0 to 2.0 MPa·m^0.5 and Young's modulus of 95 to 110 GPa as embodiments. Another application
from the same period measured 1.32 by double cantilever beam testing and 1.1 MPa·m^0.5 by chevron
notch testing.

The crystals are a phase distinct from the glass. The 2018 application specifies more than 20 wt% each of two
crystals, lithium disilicate and petalite, with the remaining glass at 5 to 30 wt%. Another application cites a
range in which crystals make up 70 to 99%. It is closer to a little glass left between crystals than to
crystals mixed into glass.

The rise in toughness connects to the compression budget of Episode 1. The same application lists embodiments
with a maximum central tension of more than 90 MPa. Applying the frangibility threshold equation for glass
from Episode 1, the threshold for a 0.75 mm plate is 59 MPa. The range includes tension on the side where glass
would shatter.

Apple introduced this material in 2020 on the iPhone 12 Pro under the name Ceramic Shield. Apple said that
adding nanoceramic crystals greatly increased toughness and that drop performance was 4 times better than the
previous iPhone generation. It said nothing about hardness or scratches at the time.

## Ceramming heat treatment and ion exchange

The crystals are grown after the plate is fully formed. Molten glass is formed into a plate, and that plate is
heated twice. Announcing its 2021 investment in Corning, Apple described this as a "high-temperature
crystallization step that creates nanocrystals within the glass matrix."

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/ceramming.svg" alt="Ceramming heat treatment schematic. At top are three glass plates: the first is glass with no crystals, the second has small nuclei like dots, and the third has crystals of 150 nanometers or less filling 70 to 99 percent of the plate. The temperature graph below shows nucleation at 550 to 650 degrees, crystal growth at 680 to 800 degrees, then cooling at about 4 degrees per minute to about 450 degrees followed by quenching." />
  <figcaption>Nuclei are seeded at low temperature and grown at high temperature (ranges from Corning US12071364B2).</figcaption>
</figure>

Corning's 2018 application specifies nucleation at 550 to 650℃ for 1 minute to 6 hours and crystal growth at
680 to 800℃ for 1 minute to 4 hours. The plate is then cooled slowly at about 4℃ per minute to about 450℃ and
quenched.

Ion exchange is still performed after the crystals are grown. Lithium and sodium in the residual glass and in
the crystals become the ions to be exchanged. An example in the lithium disilicate-petalite application from
the same year immersed the plate at 500℃ for 16 hours in a bath of 80% potassium nitrate and 20% sodium nitrate
with 0.1% lithium nitrate added.

The depth of compression given in this application is 80 to 300 micrometers, about 0.18 to 0.25 times the
thickness. In the same direction as the lithium glass of Episode 1, which reached 90 micrometers at a
thickness of 0.5 mm, the range extends deeper.

## Why is it transparent if it contains crystals?

**Because the crystals are much smaller than the wavelength of light, and the refractive indices of crystal and
glass are nearly equal.** Either alone is not enough. Corning's 2001 application for transparent glass-ceramics
states this condition, citing a 1969 paper by Beall and Duke.

If the refractive index difference between crystal and glass is large, the crystals must be smaller than 50 nm
to be transparent, and reducing them to 10 nm is better. If both the index difference and the crystal
birefringence are small, crystals larger than 50 nm can also be transparent. Corning's 2018 application setting
crystal size at 150 nm or less takes this second route.

The Glass Ceramic 2 sheet lists the refractive index of both the interior and the compressive layer as 1.54. At
0.6 mm thickness, haze is 0.15% or less, and transmittance is 90% or more above 500 nm and 88% or more from 400
to 500 nm. Slightly less passes at the blue end.

The simulation below treats the crystals as small spheres and calculates haze from Rayleigh scattering. In this
model, if crystals occupy 80% of the volume at a size of 150 nm, the index difference between crystal and glass
must be held within about 0.001 to meet the sheet's 0.15%. Reducing the crystals to 50 nm widens the tolerance
fivefold to about 0.005.

<div class="sim-embed" data-sim="gc-haze-demo">
  <template data-sim-note>Change crystal size, refractive index difference and crystal fraction to see whether the haze of a 0.6mm glass-ceramic exceeds the Corning sheet value of 0.15%. The crystals are treated as equal-sized spheres and attenuation is calculated from the Rayleigh scattering cross section. Because this is a dense system in which crystals occupy 70 to 99%, the two-phase mixing approximation f(1−f) is used instead of the volume fraction f, and crystal birefringence, size distribution, spatial correlation and surface reflection are not included. All scattered light is counted as haze. Actual haze measurement counts only light deflected beyond 2.5°, so this value is larger. The reference line is the haze upper limit (0.6mm, 0.15%) from the Corning Gorilla Glass Ceramic 2 product sheet. The actual index difference between crystal and glass is not disclosed, so no preset is provided.</template>
</div>

That blue light scatters more follows from the same equation. Rayleigh scattering is inversely proportional to
the fourth power of wavelength, so 450 nm scatters about 2.2 times more than 550 nm. This matches the direction
of the sheet's lower transmittance floor at the blue end, 2 percentage points lower.

Drop numbers are hard to rank across sheets. The Glass Ceramic 2 sheet states that a 0.6 mm plate survived a 1 m
drop onto 80-grit sandpaper, while competing lithium aluminosilicates usually broke at 0.5 m or less. Yet the
Victus 2 sheet seen in Episode 1 also lists 1 m on 80-grit sandpaper.

In January 2025 Samsung used Corning's glass-ceramic Gorilla Armor 2 on the Galaxy S25 Ultra, stating that it
survived a 2.2 m drop onto a surface simulating concrete while other glass-ceramics broke at 1 m. All of these
are in-house tests under conditions set by the companies.

## Why did sapphire stay in watches?

**Sapphire is the hardest and toughest of the three, but it cannot be given compression by ion exchange, and it
is heavier and more reflective.** Sapphire is single-crystal aluminum oxide. Kyocera's data list a purity of
99.99% or more and a Vickers hardness of 22.5 GPa, more than three times harder than the 6.5 GPa of strengthened
glass.

Its toughness is also high in numbers. In measurements compiled in data from the US National Institute of
Standards and Technology (NIST), the fracture toughness of sapphire is 2.4 to 4.5 MPa·m^0.5 depending on the
crystal plane along which the crack runs. That is roughly two to four times that of Glass Ceramic 2.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/flaw-strength.svg" alt="Graph of fracture stress versus surface flaw depth (10 to 200 micrometers, log scale). Stress is fracture toughness divided by 1.12 times the square root of pi a. Sapphire is a band between fracture toughness 2.4 and 4.5, Glass Ceramic 2 is 1.15 and Victus 2 is 0.82. At a 50 micrometer flaw they are 171, 82 and 58 megapascals. A note says glass and glass-ceramic add ion-exchange compression on top of this, but sapphire has no alkali ions to exchange." />
  <figcaption>On toughness alone, sapphire is highest. Glass and glass-ceramic add ion-exchange compression on top.</figcaption>
</figure>

When the surface has a flaw of depth a, the stress the material can withstand is roughly the toughness divided
by a value proportional to √(πa). For a 50 micrometer flaw, sapphire withstands 171 MPa even at the low end of
its toughness, Glass Ceramic 2 82 MPa and Victus 2 58 MPa.

But glass and glass-ceramic add ion-exchange compression on top of this. If the flaw tip lies within the
compressive layer, tensile force must first cancel that compression. The lithium glass in Episode 1 kept
compression down to a depth of 90 micrometers. Sapphire has no alkali ions to exchange.

In a 2013 company article, Corning wrote that after similar abrasion, breaking Gorilla Glass took about three
times more force than sapphire. Test conditions were not disclosed, and it is a company claim about a competing
material. The same article stated that sapphire is 67% heavier by volume. Comparing Kyocera's density of 3.97
with Victus 2's 2.41 confirms the number.

It also loses on light. The refractive index of sapphire is about 1.77, higher than glass, so without coating
each surface reflects 7.7%. Glass Ceramic 2 reflects 4.5%. With both surfaces combined, that is 14.3% versus
8.6%, a difference of about 6 percentage points.

<figure class="fig-single">
  <img src="/articles/2026-11-03-glass-ceramic-sapphire/reflection.svg" alt="Comparison of reflection from two plates at normal incidence. Glass Ceramic 2 with a refractive index of 1.54 reflects 4.5 percent at the front surface and 4.1 percent at the back, 8.6 percent for both surfaces, with 91.4 percent transmitted. Sapphire with a refractive index of 1.77 reflects 7.7 percent at the front and 6.6 percent at the back, 14.3 percent in total, with 85.7 percent transmitted." />
  <figcaption>The higher the refractive index, the greater the surface reflection. Without coating, both surfaces combined differ by about 6 percentage points.</figcaption>
</figure>

That is the same magnitude as Corning's 2013 statement that sapphire transmits about 6 percentage points less
light. A sapphire cover needs the anti-reflection coatings seen in the Part 2 AR episode even more than glass
does.

Manufacturing differs as well. Glass is melted and drawn into sheets, but sapphire must be grown as a crystal
boule, then sliced and polished. The same Corning article claimed that sapphire takes more than 4,000 times
longer to make than glass and that processing a cover costs more than ten times the price of Gorilla Glass.

There were attempts aimed at mass production. In May 2014 sapphire furnace maker GT Advanced Technologies
announced a furnace that grows a 165 kg boule in one run, a boule 40% larger than the previous model.

The company ran a sapphire plant in Mesa, Arizona, on prepayments from Apple. According to a March 2015
filing, it received 439 million dollars of the 578 million dollars in prepayments it could have received.

Of the 2,138 tools in Mesa, 2,036 were tied up in the settlement with Apple, and about 3,500 boules remained.
The sapphire operations in Mesa and Salem entered wind-down.

So sapphire remained on small surfaces. According to Apple's specification pages, Apple Watch Ultra 4 uses a
flat sapphire front, and Series 12 uses sapphire only on its titanium and ceramic cases. The aluminum case of
the same Series 12 uses Ceramic Shield 2.

| Material | Where it is used now (per company announcements) |
|---|---|
| Glass-ceramic | Ceramic Shield from iPhone 12 Pro onward, Gorilla Armor 2 on Galaxy S25 Ultra, Apple Watch Series 12 aluminum |
| Sapphire | Apple Watch Ultra 4, Apple Watch Series 12 titanium and ceramic |

In a 2012 application, Apple filed a cover made by bonding several sapphire layers with different crystal
orientations. The aim is to stack mechanical properties that differ by orientation. The directionality of a
single crystal is both a design variable and a problem.

## What remains from the glass-ceramic and sapphire cell

Reduced to the numbers in this cell, glass-ceramic raised fracture toughness from 0.82 to 1.15 MPa·m^0.5 while
keeping a refractive index of 1.54 and haze of 0.15%. Sapphire resists scratches with a hardness of 22.5 GPa
but has no ion-exchange compression and reflects 14.3% from two surfaces.

Of the two problems from Episode 1, glass-ceramic solved toughness, while scratching ultimately passed in this
cell not to a material but to a coating. Apple stated that on the iPhone 17's Ceramic Shield 2 in 2025 its own
coating design raised scratch resistance 3 times. Samsung's Gorilla Armor 2 likewise promoted scratch
resistance together with anti-reflection.

The next episode leaves the glass row for the plastic row. In the same flat cell, it looks at what PMMA and PC
give up in exchange for not breaking, and why the hard coats seen in Part 2 started there.
