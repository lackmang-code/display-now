---
title: "Perovskite LED Lifetime Extended by Sub-Bandgap Driving Voltage"
searchTitle: "Perovskite LED lifetime: fluorinated self-assembled monolayer F-2PACz, 1,350-hour T50 at 1,000 nits, sub-bandgap 2.1 V driving voltage, ion migration suppression and flexible active-matrix prototype"
summary: "Measured without extrapolation, this green perovskite LED ran 1,350 hours at 1,000 nits. A fluorinated monolayer under the hole transport layer cut driving voltage to a sub-bandgap 2.1 volts, where ion migration stalls."
section: paper
reporter: PEER
lang: en
translationOf: 2026-11-10-perovskite-led-sub-bandgap-lifetime
publishedAt: 2026-11-10
collectWeekStart: '2026-11-02'
readingMinutes: 5
tags: [perovskite LED, lifetime, self-assembled monolayer, ion migration, active matrix]
sources:
  - type: paper
    title: "Addressing the 1000-h/1000-nit stability challenge in perovskite LEDs"
    url: "https://doi.org/10.1038/s41467-026-79298-8"
---

Perovskite light-emitting devices offer clean color and high efficiency. The green device in this paper has an emission peak at 528 nanometers, a full width at half maximum of about 17 nanometers and color coordinates of (0.17, 0.78), covering more than 97 percent of the Rec.2020 color gamut.

The problem has always been lifetime. But what this paper takes aim at is less lifetime itself than the way lifetime gets reported.

## Extrapolated lifetime and measured lifetime

The abstract makes the point in its first paragraph. Measured half-lives (T50) of visible-light perovskite devices have mostly stayed below 1,000 hours however the brightness is set, while reported extrapolated lifetimes run far longer.

Extrapolation works like this. Run the device briefly at high luminance, measure the half-life, and convert it to a lifetime at low luminance using an acceleration factor. A figure of tens of thousands of hours can come out without anyone actually running the device for 1,000 hours.

The catch is that the acceleration factor differs by materials system and by voltage range. The paper derived it directly. For the control device (2PACz), n was 2.12 above 4 volts but fell to 1.62 below 3 volts. Even within a single device, the conversion factor shifts with voltage range. Converting a value measured at high luminance as it stands can only inflate the number.

This device was not converted. It actually ran for 1,350 hours from an initial luminance of 1,000 candelas per square meter. The paper states that this is the longest lifetime measured without extrapolation in a visible-light perovskite device.

<figure class="fig-single">
  <img src="/articles/2026-11-10-perovskite-led-sub-bandgap-lifetime/fig1-device-performance.webp" alt="Overview of device structure and performance: panels showing the layer stack, electrostatic potential maps of the two molecules, current density, voltage and luminance curves, driving voltage by luminance, efficiency curves, and lifetime curves at several initial luminances" />
  <figcaption>Figure 1. Device structure and performance. In (e), the driving voltage at 1,000 candelas per square meter splits into 2.6 volts and 2.1 volts. The vertical dashed line in (h) marks 1,350 hours. <span class="src">Nature Communications (2026) Fig. 1, CC BY 4.0</span></figcaption>
</figure>

## Driving voltage pushed below the bandgap

The tool is a fluorinated self-assembled monolayer. Its formal name is F-2PACz, a phosphonic acid with fluorine attached at the 3 and 6 positions of the carbazole core. It was inserted between nickel oxide and the polymer hole transport layer (PF8Cz).

Fluorination increases the molecule's dipole moment, which gives more leverage over the work function. By the paper's measurements, the valence band maximum of nickel oxide moved down from minus 5.21 electronvolts to minus 5.64 electronvolts. As a result, the energy offset to the highest occupied molecular orbital of the polymer hole transport layer shrank from 0.34 electronvolts to minus 0.09 electronvolts. The barrier effectively disappeared.

<figure class="fig-single">
  <img src="/articles/2026-11-10-perovskite-led-sub-bandgap-lifetime/fig2-interface-xps.webp" alt="Interface electronic structure analysis: panels of nickel and oxygen X-ray photoelectron spectra, contact angle, contact potential difference measured by Kelvin probe force microscopy, and energy levels from ultraviolet photoelectron spectroscopy" />
  <figcaption>Figure 2. Interface electronic structure. The contact potential difference is minus 0.32 volts for the untreated film, minus 0.44 volts for 2PACz and 0.0 volts for F-2PACz. <span class="src">Nature Communications (2026) Fig. 2, CC BY 4.0</span></figcaption>
</figure>

With the barrier gone, charge injection became nearly ohmic. The current density-voltage curve turns linear and barely shifts with temperature. The same luminance now comes at a lower voltage.

In numbers, 2.6 volts became 2.1 volts at 1,000 candelas per square meter. At 1 candela per square meter the figure is 1.8 volts.

## Why 2.1 volts matters

Expressed as a voltage, the bandgap of the perovskite is around 2.3 volts. A drive of 2.1 volts sits below that.

The point the paper makes is that ion migration is suppressed in this regime. Ions in the perovskite lattice move along the electric field. When they reach the interfaces with the electrodes or transport layers, chemical reactions follow, and that is one of the main degradation pathways.

<figure class="fig-single">
  <img src="/articles/2026-11-10-perovskite-led-sub-bandgap-lifetime/fig3-low-voltage.webp" alt="Behavior at low voltage: panels of capacitance-voltage curves, electrically excited transient absorption, the voltage difference with and without the emissive layer, heat flux and infrared thermography" />
  <figcaption>Figure 3. Behavior at low voltage. Below 1.5 volts, the capacitance of the F-2PACz device rises faster and peaks at a lower voltage. <span class="src">Nature Communications (2026) Fig. 3, CC BY 4.0</span></figcaption>
</figure>

Whether the ions really moved less was checked in two ways.

The first is mobile ion concentration, extracted from the transient discharge current. In the control device it rose after aging from 3.6×10¹⁶ to 1.3×10¹⁷ per cubic centimeter, while in the F-2PACz device it went from 2.9×10¹⁶ to 4.3×10¹⁶. The increase is far smaller.

The second is the actual position of the ions. Time-of-flight secondary ion mass spectrometry compared the depth profiles of cesium, formamidinium and bromine before and after aging. In the F-2PACz device aged at 1,000 candelas per square meter (2.1 volts), migration of cesium and formamidinium was negligible. In the control device, which reached the same luminance at 2.6 volts, the two ions spread into both the electron transport layer and the hole transport layer.

<figure class="fig-single">
  <img src="/articles/2026-11-10-perovskite-led-sub-bandgap-lifetime/fig4-aging-ion.webp" alt="Aging mechanism analysis: panels of emission intensity decay and voltage rise, trap-filled limit voltage of hole-only devices, mobile ion concentration from transient charging and discharging, secondary ion mass spectrometry depth profiles, and photon counts over the lifetime" />
  <figcaption>Figure 4. Aging mechanism. The voltage of the control device rises quickly during operation, while that of the F-2PACz device barely changes. Panels (g, h) show the depth profiles of cesium and formamidinium. <span class="src">Nature Communications (2026) Fig. 4, CC BY 4.0</span></figcaption>
</figure>

## Total light emitted over the lifetime

The paper counts one more quantity separately: the total number of photons a device emits up to T50.

This metric looks at lifetime and efficiency together. A device that lasts but stays dim is of no use, and neither is one that is bright but dies quickly. The paper writes that this value rises sharply as the driving voltage drops below the bandgap. That means the relationship between total photons and driving voltage is not linear, and also that aging behavior can differ even at the same voltage.

Efficiency itself is also high. Peak energy conversion efficiency is 28.0 percent (at 1.9 volts) and peak external quantum efficiency is 24.5 percent, against 19.9 percent for the control. At 1,000 candelas per square meter, energy conversion efficiency is still 26.6 percent, which the paper reports as the highest value among green perovskite devices. Maximum luminance reaches 4.3×10⁵ candelas per square meter, and from 10 to 200,000 candelas per square meter the device holds external quantum efficiency above 17 percent and energy conversion efficiency above 10 percent.

## Flexible active-matrix prototype

The team built an active-matrix device by placing a commercial flexible thin-film transistor array on a PET substrate. The panel measures 17×17 square millimeters.

<figure class="fig-single">
  <img src="/articles/2026-11-10-perovskite-led-sub-bandgap-lifetime/fig5-flexible-display.webp" alt="Flexible active-matrix prototype: photographs of the panel flat and bent, and a set of icons displayed by the panel" />
  <figcaption>Figure 5. Flexible active-matrix prototype. The panel measures 17×17 square millimeters. <span class="src">Nature Communications (2026) Fig. 5, CC BY 4.0</span></figcaption>
</figure>

A device running at low voltage draws less power and generates less heat. That matters especially on flexible substrates, which are sensitive to heat. It is also why the paper separately measured operating temperature with infrared thermography.

## The distance to industry

A lifetime of 1,350 hours is not yet a panel-grade figure. What display makers typically require is thousands to tens of thousands of hours on an LT95 basis, whereas this paper's 1,350 hours is T50, the point at which luminance falls by half. Measured to LT95, the same device would give a far shorter value. The two cannot be compared without accounting for the difference in criteria.

Lifetime shortens steeply as luminance rises. The values published alongside show the slope: 1,350 hours at 1,000, 321 hours at 2,000, 45 hours at 6,000 and 18 hours at 10,000 candelas per square meter. High-brightness applications would need improvement of a different order.

This is a result for green alone. Red and blue have different compositions and fail in different places. The paper says only that F-2PACz helped raise efficiency in devices with wider bandgaps, and it does not report lifetimes for those colors.

Still, it aims at the right place. It links with numbers the chain from lower voltage to less ion motion to longer life. And by publishing the result without conversion, it exposes the gap between extrapolated and measured lifetime. After this paper, the standard for reading stability reports on perovskite light-emitting devices moves up a notch.
