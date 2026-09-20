// 시뮬레이션 — 반사방지 다층막을 직접 설계하고, 그 위에 기름이 앉으면 무엇이 무너지는지 본다.
//
// 모델과 한계
// - 수직입사 전달행렬(특성행렬)로 반사율 스펙트럼을 계산한다. 분산과 흡수는 넣지 않았다.
// - 굴절률은 SiO2 1.46, Nb2O5 2.30, 유리 1.52, 기름 1.47 로 고정한다.
//   Nb2O5 는 스퍼터 막 기준 2.26~2.30 범위로 보고되는데 위쪽 값을 썼다.
// - 명소시 반사율 Y 는 CIE V(λ) 와 D65 를 10nm 간격으로 곱해 가중평균한 값이다.
// - 기름은 매끈하고 두꺼운 막으로 본다. 두꺼우니 간섭하지 않고(비간섭), 공기/기름 계면
//   반사와 「기름 안에서 본 반사방지막」 반사를 다중반사로 합친다. 실제 지문은 흩어진
//   방울이라 산란이 더해지므로 이 값은 정반사 성분만이다.
// - 추정해서 넣은 상수는 없다. 위 굴절률은 전부 출처가 있는 값이고, 나머지는 표준표다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const LAYOUT = {
  article: { W: 440, H: 330 },
  cover: { W: 440, H: 330 },
};

const N_SIO2 = 1.46;
const N_NB2O5 = 2.3;
const N_GLASS = 1.52;
const N_OIL = 1.47;

const WL = [];
for (let w = 400; w <= 700; w += 10) WL.push(w);
const V = [0.0004, 0.0012, 0.004, 0.0116, 0.023, 0.038, 0.06, 0.091, 0.139, 0.208, 0.323, 0.503, 0.71, 0.862, 0.954, 0.995, 0.995, 0.952, 0.87, 0.757, 0.631, 0.503, 0.381, 0.265, 0.175, 0.107, 0.061, 0.032, 0.017, 0.0082, 0.0041];
const D65 = [82.75, 91.49, 93.43, 86.68, 104.86, 117.01, 117.81, 114.86, 115.92, 108.81, 109.35, 107.8, 104.79, 107.69, 104.41, 104.05, 100.0, 96.33, 95.79, 88.69, 90.01, 89.6, 87.7, 83.29, 83.7, 80.03, 80.21, 82.28, 78.28, 69.72, 71.61];
const WSUM = V.reduce((a, v, i) => a + v * D65[i], 0);

// 반사율(0~1). n0: 입사 매질, layers: 입사쪽부터 [n, d_nm]
function reflect(n0, layers, lam) {
  // 2x2 복소행렬을 실수 쌍으로 푼다: 특성행렬은 [[a, ib],[ic, d]] 꼴을 유지한다.
  let m11r = 1, m11i = 0, m12r = 0, m12i = 0, m21r = 0, m21i = 0, m22r = 1, m22i = 0;
  for (const [n, d] of layers) {
    const p = (2 * Math.PI * n * d) / lam;
    const c = Math.cos(p), s = Math.sin(p);
    // L = [[c, i s/n], [i n s, c]]
    const a11r = m11r * c - m12i * n * s, a11i = m11i * c + m12r * n * s;
    const a12r = -m11i * (s / n) + m12r * c, a12i = m11r * (s / n) + m12i * c;
    const a21r = m21r * c - m22i * n * s, a21i = m21i * c + m22r * n * s;
    const a22r = -m21i * (s / n) + m22r * c, a22i = m21r * (s / n) + m22i * c;
    m11r = a11r; m11i = a11i; m12r = a12r; m12i = a12i;
    m21r = a21r; m21i = a21i; m22r = a22r; m22i = a22i;
  }
  // [B, C] = M · [1, ns]
  const ns = N_GLASS;
  const Br = m11r + m12r * ns, Bi = m11i + m12i * ns;
  const Cr = m21r + m22r * ns, Ci = m21i + m22i * ns;
  const numR = n0 * Br - Cr, numI = n0 * Bi - Ci;
  const denR = n0 * Br + Cr, denI = n0 * Bi + Ci;
  return (numR * numR + numI * numI) / (denR * denR + denI * denI);
}

function spectrum(n0, layers) {
  return WL.map((w) => reflect(n0, layers, w));
}

// 두꺼운 기름층: 공기/기름 계면과 기름 속 스택을 비간섭으로 합친다
function underOil(layers) {
  const r1 = ((1 - N_OIL) / (1 + N_OIL)) ** 2;
  return spectrum(N_OIL, layers).map((r2) => r1 + ((1 - r1) ** 2 * r2) / (1 - r1 * r2));
}

function lumY(spec) {
  return spec.reduce((a, r, i) => a + r * V[i] * D65[i], 0) / WSUM;
}

const PRESETS = {
  ar4: { t1: 86, t2: 108, t3: 32, t4: 12 },
  single: { t1: 94, t2: 0, t3: 0, t4: 0 },
  bare: { t1: 0, t2: 0, t3: 0, t4: 0 },
};

export function mount(container, params = {}) {
  const L = LAYOUT[params.cover ? 'cover' : 'article'];
  const { W, H } = L;

  const state = {
    ...PRESETS.ar4,
    ...(params.preset && PRESETS[params.preset] ? PRESETS[params.preset] : {}),
    medium: params.medium ?? 'air',
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Design a four-layer AR stack, then let oil replace the air above it</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Start from</label>
          <div class="sim-toggle-group" data-in="preset">
            <button type="button" class="sim-toggle-btn" data-val="ar4" aria-pressed="true">4-layer AR</button>
            <button type="button" class="sim-toggle-btn" data-val="single" aria-pressed="false">1 layer</button>
            <button type="button" class="sim-toggle-btn" data-val="bare" aria-pressed="false">Bare</button>
          </div>
        </div>
        <div class="sim-control">
          <label>SiO<sub>2</sub> top <span data-out="t1"></span> nm</label>
          <input type="range" min="0" max="150" step="1" data-in="t1" />
        </div>
        <div class="sim-control">
          <label>Nb<sub>2</sub>O<sub>5</sub> <span data-out="t2"></span> nm</label>
          <input type="range" min="0" max="160" step="1" data-in="t2" />
        </div>
        <div class="sim-control">
          <label>SiO<sub>2</sub> <span data-out="t3"></span> nm</label>
          <input type="range" min="0" max="80" step="1" data-in="t3" />
        </div>
        <div class="sim-control">
          <label>Nb<sub>2</sub>O<sub>5</sub> bottom <span data-out="t4"></span> nm</label>
          <input type="range" min="0" max="40" step="1" data-in="t4" />
        </div>
        <div class="sim-control">
          <label>Above the coating</label>
          <div class="sim-toggle-group" data-in="medium">
            <button type="button" class="sim-toggle-btn" data-val="air" aria-pressed="true">Air</button>
            <button type="button" class="sim-toggle-btn" data-val="oil" aria-pressed="false">Oil smudge</button>
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
  const presetBtns = [...container.querySelectorAll('[data-in="preset"] button')];
  const mediumBtns = [...container.querySelectorAll('[data-in="medium"] button')];

  const PLOT = { l: 46, r: 14, t: 34, b: H - 60 };
  // 세로축 상한은 그리는 곡선에 맞춰 고른다. 고정 8% 로 두었더니 기름 곡선의 빨강 끝(9.8%)이
  // 잘려 평평하게 보였다. 슬라이더로는 60% 대 반사판도 만들 수 있어 고정값으로는 못 담는다.
  // 맨유리 점선이 늘 기준으로 남도록 하한은 5% 로 둔다.
  const STEPS = [5, 8, 10, 12, 15, 20, 30, 40, 60, 80, 100];
  let YMAX = 5;
  const fx = (w) => PLOT.l + ((w - 400) / 300) * (W - PLOT.l - PLOT.r);
  const fy = (r) => PLOT.b - (Math.min(r, YMAX) / YMAX) * (PLOT.b - PLOT.t);

  function syncInputs() {
    ['t1', 't2', 't3', 't4'].forEach((k) => {
      inp(k).value = String(state[k]);
      out(k).textContent = String(state[k]);
    });
    mediumBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === state.medium)));
  }

  function layers() {
    // 공기쪽부터. 두께 0 인 층은 계산에 영향이 없다.
    return [
      [N_SIO2, state.t1],
      [N_NB2O5, state.t2],
      [N_SIO2, state.t3],
      [N_NB2O5, state.t4],
    ].filter(([, d]) => d > 0);
  }

  function curve(spec, color, width, dash) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash || []);
    ctx.beginPath();
    spec.forEach((r, i) => {
      const x = fx(WL[i]), y = fy(r * 100);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function draw(clean, oily) {
    const shown = state.medium === 'oil' ? clean.concat(oily) : clean;
    const peak = Math.max(...shown) * 100 * 1.04;
    YMAX = STEPS.find((v) => v >= peak) || 100;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    // 눈 감도
    ctx.fillStyle = 'rgba(216,180,90,0.10)';
    ctx.beginPath();
    ctx.moveTo(fx(400), PLOT.b);
    V.forEach((v, i) => ctx.lineTo(fx(WL[i]), PLOT.b - v * (PLOT.b - PLOT.t) * 0.35));
    ctx.lineTo(fx(700), PLOT.b);
    ctx.closePath();
    ctx.fill();

    ctx.font = '11px ui-monospace, monospace';
    ctx.textBaseline = 'middle';
    [0, 0.25, 0.5, 0.75, 1].map((k) => +(YMAX * k).toFixed(2)).forEach((v) => {
      ctx.strokeStyle = 'rgba(244,243,238,0.10)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PLOT.l, fy(v));
      ctx.lineTo(W - PLOT.r, fy(v));
      ctx.stroke();
      ctx.fillStyle = 'rgba(162,162,168,0.85)';
      ctx.textAlign = 'right';
      ctx.fillText(`${v}%`, PLOT.l - 6, fy(v));
    });
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    [400, 500, 600, 700].forEach((w) => ctx.fillText(String(w), fx(w), PLOT.b + 15));
    ctx.fillText('wavelength nm', (PLOT.l + W - PLOT.r) / 2, PLOT.b + 31);

    // 맨유리 기준선
    const bare = reflect(1, [], 550) * 100;
    ctx.strokeStyle = 'rgba(236,236,237,0.35)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(PLOT.l, fy(bare));
    ctx.lineTo(W - PLOT.r, fy(bare));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(236,236,237,0.55)';
    ctx.textAlign = 'right';
    ctx.fillText('bare glass', W - PLOT.r - 4, fy(bare) - 5);

    if (state.medium === 'oil') {
      curve(clean, 'rgba(111,159,224,0.35)', 1.5, [3, 3]);
      curve(oily, '#d97a3c', 2.4);
    } else {
      curve(clean, '#6f9fe0', 2.4);
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(236,236,237,0.95)';
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.fillText(state.medium === 'oil' ? 'under a smooth oil film' : 'clean, in air', PLOT.l, 20);

    // 층 막대: 맨 아래 띠에 실제 두께 비례
    const total = state.t1 + state.t2 + state.t3 + state.t4;
    const barY = H - 16, barX = PLOT.l, barW = W - PLOT.l - PLOT.r;
    ctx.fillStyle = 'rgba(244,243,238,0.08)';
    ctx.fillRect(barX, barY, barW, 8);
    if (total > 0) {
      let x = barX;
      [[state.t1, '#cfd8e0'], [state.t2, '#6f9fe0'], [state.t3, '#cfd8e0'], [state.t4, '#6f9fe0']].forEach(([d, col]) => {
        const w = (d / 400) * barW;
        ctx.fillStyle = col;
        ctx.fillRect(x, barY, w, 8);
        x += w;
      });
    }
    ctx.fillStyle = 'rgba(162,162,168,0.85)';
    ctx.font = '11px ui-monospace, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`stack ${total} nm`, W - PLOT.r, barY - 4);
  }

  function refresh() {
    syncInputs();
    const Ls = layers();
    const clean = spectrum(1, Ls);
    const oily = underOil(Ls);
    const yc = lumY(clean) * 100;
    const yo = lumY(oily) * 100;
    draw(clean, oily);
    const ratio = yo / yc;
    out('readout').innerHTML =
      `clean Y <strong>${yc.toFixed(2)}%</strong><br>` +
      `under oil Y <strong>${yo.toFixed(2)}%</strong><br>` +
      `smudge / clean <strong>${ratio < 10 ? ratio.toFixed(1) : Math.round(ratio)}x</strong><br>` +
      'bare glass Y 4.26%';
  }

  ['t1', 't2', 't3', 't4'].forEach((k) => {
    inp(k).addEventListener('input', (e) => {
      state[k] = Number(e.target.value);
      presetBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      refresh();
    });
  });
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      Object.assign(state, PRESETS[btn.dataset.val]);
      presetBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      refresh();
    });
  });
  mediumBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.medium = btn.dataset.val;
      refresh();
    });
  });

  refresh();
}

export default mount;
