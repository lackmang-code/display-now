// 시뮬레이션 — 인화인듐(InP) 양자점은 크기에 따라 색이 달라지고, 크기가 섞이면 색 순도가 떨어진다.
// 제6호 나노코 편(합성 특허 소송) 2.1절.
//
// 근거 (전부 한 논문에서 가져온다, CC-BY 4.0)
//   Almeida, van der Poll, Evers, Szoboszlai, Vonk, Rabouw, Houtepen,
//   "Size-Dependent Optical Properties of InP Colloidal Quantum Dots", Nano Lett. 23, 8697 (2023),
//   doi:10.1021/acs.nanolett.3c02630
// - 크기 곡선(그림 1b): E1s = 1.33 + 9.128 L^-0.684   (E1s 는 첫 흡수 봉우리 eV, L 은 사면체 모서리 길이 Å)
//   이 논문의 입자는 사면체(피라미드) 모양이라 크기를 모서리 길이로 쓴다. 그림은 읽기 쉽게 구로 그린다.
//   곡선의 자료 범위는 모서리 약 1.5~5.6 nm(흡수 약 450~650 nm)라 슬라이더도 그 안에 둔다.
// - 입자 하나의 발광 폭(본문): 단일 입자 반치폭 약 60 meV(적색)·80 meV(녹색).
//
// 가정 (sim-note 에 그대로 밝힌다)
// ① 색과 봉우리 위치는 「첫 흡수 봉우리」다. 실제 발광은 이보다 조금 긴 파장에 나오지만
//   크기별 차이 값이 논문 본문에 없어 넣지 않았다.
// ② 입자 하나의 폭은 녹색(530 nm) 80 meV와 적색(650 nm) 60 meV 사이를 에너지에 대해 선형으로 잇고,
//   그 밖은 끝값으로 둔다.
// ③ 모서리 길이 분포는 종 모양(평균의 ±2σ 안)으로 둔다.
// 추정 상수는 없다. 봉우리가 넓어지는 정도는 크기 곡선의 기울기에서 나온다.
// 입자는 3차원 물체라 구면 음영을 넣고, 발광 곡선은 그래프라 광택을 넣지 않는다(편집규칙 표지 ②).
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const LAYOUT = {
  article: { W: 440, H: 330 },
  cover: { W: 440, H: 330 },
};

const COLS = 8;
const ROWS = 4;
const L_MIN = 1.5; // nm, 크기 곡선 자료 범위
const L_MAX = 5.6;
const N_SPEC = 3000;

// 논문 그림 1b 의 모서리 길이 곡선. L 은 nm 로 받아 Å 로 바꾼다
const e1s = (Lnm) => 1.33 + 9.128 * Math.pow(Lnm * 10, -0.684);
const nmOf = (eV) => 1239.84 / eV;

// 단일 입자 반치폭(meV): 녹색 530 nm 80, 적색 650 nm 60 사이를 에너지에 대해 선형으로
function singleFwhm(eV) {
  const g = 1239.84 / 530;
  const r = 1239.84 / 650;
  const t = Math.max(0, Math.min(1, (eV - r) / (g - r)));
  return 60 + 20 * t;
}

// 파장(nm) → 표시 색. 가시광 근사식(Bruton).
function waveRGB(l) {
  let r = 0, g = 0, b = 0;
  if (l < 440) { r = -(l - 440) / 60; b = 1; }
  else if (l < 490) { g = (l - 440) / 50; b = 1; }
  else if (l < 510) { g = 1; b = -(l - 510) / 20; }
  else if (l < 580) { r = (l - 510) / 70; g = 1; }
  else if (l < 645) { r = 1; g = -(l - 645) / 65; }
  else { r = 1; }
  const k = (v) => Math.round(255 * Math.pow(Math.max(0, Math.min(1, v)), 0.8));
  return [k(r), k(g), k(b)];
}

// 같은 그림이 매번 나오도록 씨앗을 고정한 난수
function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
function gauss2(r) {
  let z;
  do {
    const u = r() || 1e-9;
    const v = r();
    z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  } while (Math.abs(z) > 2);
  return z;
}

export function mount(container, params = {}) {
  const cover = !!params.cover;
  const L = LAYOUT[cover ? 'cover' : 'article'];
  const { W, H } = L;

  const rd = seeded(20260922);
  const dots = [];
  for (let j = 0; j < ROWS; j++)
    for (let i = 0; i < COLS; i++) dots.push({ i, j, z: gauss2(rd), jx: rd() - 0.5, jy: rd() - 0.5, rot: rd() });
  const rs = seeded(7);
  const specZ = Array.from({ length: N_SPEC }, () => gauss2(rs));

  const state = {
    edge: params.edge ?? 2.5, // nm
    spread: params.spread ?? 0, // σ / 평균
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>InP quantum dots: the edge length sets the color, and mixed sizes blur it</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Dot edge length <span data-out="edge"></span> nm</label>
          <input type="range" min="${L_MIN}" max="${L_MAX}" step="0.05" data-in="edge" />
        </div>
        <div class="sim-control">
          <label>Size spread &plusmn;<span data-out="spread"></span>% (1&sigma;)</label>
          <input type="range" min="0" max="15" step="0.5" data-in="spread" />
        </div>
        <div class="sim-control">
          <label>Jump to</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-edge="1.5">Blue</button>
            <button type="button" class="sim-toggle-btn" data-edge="2.5">Green</button>
            <button type="button" class="sim-toggle-btn" data-edge="5.6">Red</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inp = (k) => container.querySelector(`[data-in="${k}"]`);

  const BG = '#07070a';
  const FIELD_H = 184;

  // 🔴 표지 모드 — 폰에서 표지 카드는 실효 폭이 3분의 1로 줄어 본문 크기 글자가 읽히지 않는다.
  // 제5호 pen-titanium-field-demo 와 같은 방식으로 표지일 때만 글자·선을 키운다(편집규칙 표지 ④).
  const FS_TAG = cover ? 18 : 13;   // 라벨
  const FS_AXIS = cover ? 16 : 12;  // 축 눈금
  const LW = cover ? 2 : 1;         // 축·테두리 선

  function tag(text, x, y, align = 'left') {
    ctx.font = `bold ${FS_TAG}px ui-monospace, monospace`;
    const w = ctx.measureText(text).width;
    const bx = align === 'right' ? x - w - 4 : align === 'center' ? x - w / 2 - 4 : x - 4;
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.beginPath();
    ctx.roundRect(bx, y - FS_TAG, w + 8, FS_TAG + 5, 4);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
  }

  const shade = (c, f) => c.map((v) => Math.max(0, Math.min(255, Math.round(v * f))));
  const lift = (c, a) => c.map((v) => Math.min(255, Math.round(v + (255 - v) * a)));
  const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    const cellW = W / COLS;
    const cellH = FIELD_H / ROWS;
    const pxPerNm = (Math.min(cellW, cellH) * 0.85) / L_MAX;

    for (const d of dots) {
      const Lnm = Math.max(1.0, state.edge * (1 + state.spread * d.z));
      const lam = nmOf(e1s(Lnm));
      const col = waveRGB(lam);
      const cx = (d.i + 0.5 + d.jx * 0.2) * cellW;
      const cy = 24 + (d.j + 0.5 + d.jy * 0.1) * cellH;
      // 실제 입자는 사면체지만(논문), 크기와 색을 읽기 쉽게 구로 그린다(2026-09-17 대표 선택).
      // 구의 지름을 모서리 길이에 비례하게 둔다.
      const rad = (Lnm * pxPerNm) / 2;
      // 빛무리는 크기와 상관없이 같은 두께(GLOW px)로 얇게 두른다.
      // 2026-09-19 대표 지적: 입자 크기에 비례시켰더니(지름의 약 2배) 큰 입자일수록 빛무리가 커져
      // 크기 차이가 실제보다 과장되고 경계가 번져 보였다.
      const GLOW = 4;
      const halo = ctx.createRadialGradient(cx, cy, rad, cx, cy, rad + GLOW);
      halo.addColorStop(0, rgb(col, 0.35));
      halo.addColorStop(1, rgb(col, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, rad + GLOW, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createRadialGradient(cx - rad * 0.35, cy - rad * 0.4, rad * 0.1, cx, cy, rad);
      body.addColorStop(0, rgb(lift(col, 0.45)));
      body.addColorStop(0.45, rgb(col));
      body.addColorStop(1, rgb(shade(col, 0.62)));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
      // 가장자리를 또렷하게: 어두운 배경에 묻히지 않도록 얇은 테를 긋는다
      ctx.strokeStyle = rgb(col, 0.9);
      ctx.lineWidth = LW;
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath();
      ctx.ellipse(cx - rad * 0.38, cy - rad * 0.42, rad * 0.22, rad * 0.14, -0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // 봉우리: 표본마다 단일 입자 폭의 가우스를 에너지에서 더하고 파장 축에 그린다
    const x0 = 18;
    const x1 = W - 18;
    const base = H - 30;
    const top = FIELD_H + 42;
    const LAM0 = 420;
    const LAM1 = 690;
    const N = 540;
    const spec = new Array(N).fill(0);
    const lamAt = (k) => LAM0 + (k / (N - 1)) * (LAM1 - LAM0);
    for (const z of specZ) {
      const Lnm = Math.max(1.0, state.edge * (1 + state.spread * z));
      const E = e1s(Lnm);
      const sig = singleFwhm(E) / 1000 / 2.3548;
      for (let k = 0; k < N; k++) {
        const t = (1239.84 / lamAt(k) - E) / sig;
        spec[k] += Math.exp(-0.5 * t * t);
      }
    }
    const ref = N_SPEC;
    for (let k = 0; k < N - 1; k++) {
      const xa = x0 + (k / (N - 1)) * (x1 - x0);
      const xb = x0 + ((k + 1) / (N - 1)) * (x1 - x0);
      const hgt = Math.min(1, spec[k] / ref) * (base - top);
      ctx.fillStyle = rgb(waveRGB(lamAt(k)), 0.92);
      ctx.fillRect(xa, base - hgt, xb - xa + 0.6, hgt);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = LW;
    ctx.beginPath();
    ctx.moveTo(x0, base + 0.5);
    ctx.lineTo(x1, base + 0.5);
    ctx.stroke();
    ctx.font = `bold ${FS_AXIS}px ui-monospace, monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.textAlign = 'center';
    for (const t of [450, 530, 650]) {
      const x = x0 + ((t - LAM0) / (LAM1 - LAM0)) * (x1 - x0);
      ctx.fillRect(x - 0.5, base, LW, cover ? 6 : 4);
      ctx.fillText(String(t), x, base + FS_AXIS + 4);
    }
    ctx.textAlign = 'right';
    ctx.fillText('nm', x1, base + FS_AXIS + 4);
    tag(cover ? 'emission' : 'band-edge peak', x0 + 4, top - 8);
    tag(cover ? `InP ${state.edge.toFixed(1)} nm` : `InP, edge ${state.edge.toFixed(2)} nm`, W - 8, cover ? 24 : 20, 'right');

    // 반치폭(meV): 에너지 축에서 다시 센다
    const E0 = e1s(state.edge);
    let peak = 0;
    let kp = 0;
    spec.forEach((v, k) => {
      if (v > peak) { peak = v; kp = k; }
    });
    let kl = kp;
    let kr = kp;
    while (kl > 0 && spec[kl] > peak / 2) kl--;
    while (kr < N - 1 && spec[kr] > peak / 2) kr++;
    // 반값을 지나는 자리를 격자 사이에서 선형 보간한다
    const cross = (k0, k1) => {
      const f = (peak / 2 - spec[k0]) / (spec[k1] - spec[k0] || 1);
      return lamAt(k0) + f * (lamAt(k1) - lamAt(k0));
    };
    const lamL = kl < kp ? cross(kl, kl + 1) : lamAt(kl);
    const lamR = kr > kp ? cross(kr, kr - 1) : lamAt(kr);
    const fw = (1239.84 / lamL - 1239.84 / lamR) * 1000;
    return { E0, fw };
  }

  function refresh() {
    out('edge').textContent = state.edge.toFixed(2);
    out('spread').textContent = String(Math.round(state.spread * 1000) / 10);
    inp('edge').value = String(state.edge);
    inp('spread').value = String(state.spread * 100);
    container.querySelectorAll('[data-edge]').forEach((b) =>
      b.setAttribute('aria-pressed', String(Math.abs(Number(b.getAttribute('data-edge')) - state.edge) < 0.01)),
    );
    const { E0, fw } = draw();
    out('readout').innerHTML =
      `first absorption peak <strong>${Math.round(nmOf(E0))} nm</strong> (${E0.toFixed(2)} eV)<br>` +
      // 같은 부피의 구로 본 지름: V = L^3/(6√2) = πd^3/6 → d = L·(1/(√2·π))^(1/3) ≈ 0.608 L
      `equal-volume sphere <strong>${(state.edge * Math.cbrt(1 / (Math.SQRT2 * Math.PI))).toFixed(1)} nm</strong> across (core only)<br>` +
      `peak width <strong>${Math.round(fw)} meV</strong> (one dot: ${Math.round(singleFwhm(E0))} meV)<br>` +
      'size curve and single-dot width: Almeida et al., Nano Lett. 2023';
  }

  inp('edge').addEventListener('input', (ev) => {
    state.edge = Number(ev.target.value);
    refresh();
  });
  inp('spread').addEventListener('input', (ev) => {
    state.spread = Number(ev.target.value) / 100;
    refresh();
  });
  container.querySelectorAll('[data-edge]').forEach((b) =>
    b.addEventListener('click', () => {
      state.edge = Number(b.getAttribute('data-edge'));
      refresh();
    }),
  );

  refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => refresh());
}

export default mount;
