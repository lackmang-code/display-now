// 시뮬레이션 — 결정화유리 안의 나노 결정이 빛을 얼마나 흩뜨리나.
// 왼쪽은 실제 축척으로 확대한 유리 속 결정과, 같은 눈금으로 그린 유리 속 빛의 파장이다.
// 오른쪽은 결정 크기에 따른 haze(두께 0.6mm) 곡선을 파랑·초록·빨강 세 파장으로 그리고,
// Corning Gorilla Glass Ceramic 2 제품 시트의 haze 상한 0.15%(0.6mm)를 기준선으로 둔다.
//
// 모델과 한계
// - 결정을 작은 구로 보고 레일리 산란을 쓴다. 산란 단면적 σ = (128π⁵/3)·r⁶/λm⁴·K², K = (m²−1)/(m²+2),
//   m = 결정 굴절률 / 유리 굴절률, λm = λ/n(유리 속 파장). 감쇠계수 α = N·σ.
// - 결정이 70~99%를 차지하는 조밀한 계라 서로 독립인 산란체로 세면 크게 과대평가된다.
//   두 상이 섞인 매질의 근사로 부피 비율 f 대신 f(1−f)를 쓴다(f→1이면 한 상이 되어 산란이 사라진다).
// - 결정의 복굴절, 결정 크기 분포, 결정끼리의 배열 상관, 표면 반사는 넣지 않았다.
// - haze = 1 − exp(−α·t)로, 흩어진 빛이 모두 haze로 잡힌다고 본다. 측정 haze는 2.5° 밖으로 꺾인 빛만 센다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 460;
const N_GLASS = 1.54;   // Glass Ceramic 2 시트의 굴절률(590 nm)
const T_MM = 0.6;       // 시트가 haze를 적은 두께
const SPEC = 0.15;      // %, 시트의 haze 상한

function haze(d, dn, f, lam) {
  const r = (d / 2) * 1e-9;
  const m = 1 + dn / N_GLASS;
  const K = (m * m - 1) / (m * m + 2);
  const a = f * (1 - f) * 32 * Math.PI ** 4 * r ** 3 * N_GLASS ** 4 / (lam * 1e-9) ** 4 * K * K;
  return 100 * (1 - Math.exp(-a * T_MM * 1e-3));
}

// 시트 상한을 지키는 최대 굴절률 차 (550 nm)
function dnMax(d, f) {
  let lo = 0, hi = 0.2;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (haze(d, mid, f, 550) < SPEC) lo = mid; else hi = mid;
  }
  return lo;
}

const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';
const INK = '#f4f4ef';
const MUTE = '#b9b9b0';
const BG = '#101418';
const BLUE = '#3d8bff';
const GREEN = '#1fdc6a';
const RED = '#ff5a36';
const XTAL = '#b98bff';
const WAVES = [[450, BLUE, 'blue 450 nm'], [550, GREEN, 'green 550 nm'], [650, RED, 'red 650 nm']];

// 결정 배치: 크기·비율이 바뀌어도 흔들리지 않게 고정 난수로 만든다.
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export function mount(container) {
  const state = { d: 150, dn: 0.001, f: 0.8 };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Crystals inside the glass. Small and index-matched stays clear.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Crystal size <span data-out="d"></span> nm</label>
          <input type="range" min="10" max="400" step="5" data-in="d" />
        </div>
        <div class="sim-control">
          <label>Index mismatch, crystal vs glass <span data-out="dn"></span></label>
          <input type="range" min="0" max="0.02" step="0.0005" data-in="dn" />
        </div>
        <div class="sim-control">
          <label>Crystal fraction <span data-out="f"></span> %</label>
          <input type="range" min="0.1" max="0.95" step="0.05" data-in="f" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inputs = [...container.querySelectorAll('[data-in]')];

  function text(s, x, y, color, size, weight, align) {
    ctx.font = `${weight || 600} ${size || 13}px ${FONT}`;
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, x, y);
  }

  function chip(s, x, y, color, align, size) {
    ctx.font = `700 ${size || 13}px ${FONT}`;
    const tw = ctx.measureText(s).width;
    const px = 6, hh = (size || 13) * 0.62 + 3;
    const lx = align === 'right' ? x - tw - px * 2 : align === 'center' ? x - tw / 2 - px : x;
    ctx.fillStyle = 'rgba(8,10,14,0.85)';
    ctx.beginPath(); ctx.roundRect(lx, y - hh, tw + px * 2, hh * 2, 5); ctx.fill();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, lx + px, y + 0.5);
  }

  function draw() {
    const { d, dn, f } = state;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    text('Light scattering by nanocrystals in a 0.6 mm glass-ceramic', 20, 24, INK, 15, 700);
    text('left: true scale, 1.2 μm window   ·   right: haze vs crystal size', 20, 44, MUTE, 12, 500);

    // ── 왼쪽: 1.2 μm 창, 200 px/μm ──
    const wx = 26, wy = 92, ws = 240, ppn = ws / 1200; // px per nm
    const dx = 26, dy = -20;
    // 입체 블록: 윗면·옆면
    ctx.fillStyle = '#8fb9cf';
    ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + dx, wy + dy); ctx.lineTo(wx + ws + dx, wy + dy); ctx.lineTo(wx + ws, wy); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#2a3b47';
    ctx.beginPath(); ctx.moveTo(wx + ws, wy); ctx.lineTo(wx + ws + dx, wy + dy); ctx.lineTo(wx + ws + dx, wy + ws + dy); ctx.lineTo(wx + ws, wy + ws); ctx.closePath(); ctx.fill();
    const gF = ctx.createLinearGradient(0, wy, 0, wy + ws);
    gF.addColorStop(0, '#1d3a4c'); gF.addColorStop(1, '#152a37');
    ctx.fillStyle = gF; ctx.fillRect(wx, wy, ws, ws);

    // 결정: 단면 면적 비율이 f가 되도록 개수를 정하고 겹침은 허용한다
    ctx.save();
    ctx.beginPath(); ctx.rect(wx, wy, ws, ws); ctx.clip();
    const rpx = Math.max((d / 2) * ppn, 1.2);
    const n = Math.min(Math.round((f * ws * ws) / (Math.PI * rpx * rpx)), 4000);
    const rand = rng(11);
    for (let i = 0; i < n; i++) {
      const x = wx + rand() * ws, y = wy + rand() * ws;
      const g = ctx.createRadialGradient(x - rpx * 0.35, y - rpx * 0.35, rpx * 0.1, x, y, rpx);
      const a = Math.min(0.25 + dn * 40, 0.95); // 굴절률 차가 클수록 결정이 또렷이 보인다
      g.addColorStop(0, `rgba(235,220,255,${a})`);
      g.addColorStop(1, `rgba(140,90,230,${a * 0.75})`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, rpx, 0, Math.PI * 2); ctx.fill();
    }
    // 유리 속 빛의 파장: λ/n, 같은 눈금
    for (const [lam, col] of WAVES) {
      const lm = (lam / N_GLASS) * ppn;
      const x0 = wx + ws * (lam === 450 ? 0.25 : lam === 550 ? 0.5 : 0.75);
      ctx.strokeStyle = col; ctx.lineWidth = 2.6;
      ctx.beginPath();
      for (let y = wy; y <= wy + ws; y += 1) {
        const xx = x0 + 9 * Math.sin(((y - wy) / lm) * Math.PI * 2);
        y === wy ? ctx.moveTo(xx, y) : ctx.lineTo(xx, y);
      }
      ctx.stroke();
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(244,244,239,0.9)'; ctx.lineWidth = 1.2;
    ctx.strokeRect(wx, wy, ws, ws);
    ctx.beginPath();
    ctx.moveTo(wx, wy); ctx.lineTo(wx + dx, wy + dy); ctx.lineTo(wx + ws + dx, wy + dy);
    ctx.lineTo(wx + ws + dx, wy + ws + dy); ctx.lineTo(wx + ws, wy + ws);
    ctx.moveTo(wx + ws, wy); ctx.lineTo(wx + ws + dx, wy + dy);
    ctx.stroke();

    // 빛 들어오는 화살표
    ctx.fillStyle = INK;
    ctx.beginPath(); ctx.moveTo(wx + ws / 2, wy - 26); ctx.lineTo(wx + ws / 2 - 7, wy - 38); ctx.lineTo(wx + ws / 2 + 7, wy - 38); ctx.closePath(); ctx.fill();
    chip('light in', wx + ws / 2 + 12, wy - 36, INK, 'left', 12);

    // 축척 막대 500 nm
    const sy = wy + ws + 20;
    ctx.strokeStyle = INK; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(wx, sy); ctx.lineTo(wx + 500 * ppn, sy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wx, sy - 5); ctx.lineTo(wx, sy + 5); ctx.moveTo(wx + 500 * ppn, sy - 5); ctx.lineTo(wx + 500 * ppn, sy + 5); ctx.stroke();
    text('500 nm', wx + 500 * ppn + 8, sy, INK, 12, 700);
    text(`wavelength inside glass = λ / ${N_GLASS}`, wx, sy + 24, MUTE, 12, 500);
    ctx.fillStyle = XTAL; ctx.beginPath(); ctx.arc(wx + 6, sy + 46, 6, 0, Math.PI * 2); ctx.fill();
    text(`crystal ${d} nm`, wx + 18, sy + 46, '#d7c2ff', 12, 700);
    text(`${Math.round(f * 100)}% of volume`, wx + 130, sy + 46, MUTE, 12, 600);

    // ── 오른쪽: haze 대 결정 크기, 로그 세로축 ──
    const gx0 = 362, gx1 = 596, gy0 = 92, gy1 = 352;
    const DMAX = 400;
    const X = (v) => gx0 + (v / DMAX) * (gx1 - gx0);
    const LMIN = -3, LMAX = 2; // 0.001% ~ 100%
    const Y = (h) => gy1 - ((Math.log10(Math.max(h, 1e-3)) - LMIN) / (LMAX - LMIN)) * (gy1 - gy0);

    // 상한 위쪽은 붉게
    ctx.fillStyle = 'rgba(255,90,54,0.10)';
    ctx.fillRect(gx0, gy0, gx1 - gx0, Y(SPEC) - gy0);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    for (let l = LMIN; l <= LMAX; l++) { ctx.beginPath(); ctx.moveTo(gx0, Y(10 ** l)); ctx.lineTo(gx1, Y(10 ** l)); ctx.stroke(); }
    for (const v of [100, 200, 300, 400]) { ctx.beginPath(); ctx.moveTo(X(v), gy0); ctx.lineTo(X(v), gy1); ctx.stroke(); }

    for (const [lam, col] of WAVES) {
      ctx.strokeStyle = col; ctx.lineWidth = lam === 550 ? 3 : 2;
      ctx.beginPath();
      for (let v = 5; v <= DMAX; v += 2) {
        const yy = Y(haze(v, dn, f, lam));
        v === 5 ? ctx.moveTo(X(v), yy) : ctx.lineTo(X(v), yy);
      }
      ctx.stroke();
    }

    // 시트 상한
    ctx.setLineDash([6, 4]); ctx.strokeStyle = INK; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(gx0, Y(SPEC)); ctx.lineTo(gx1, Y(SPEC)); ctx.stroke();
    ctx.setLineDash([]);
    // 곡선은 오른쪽에서 기준선 위로 올라가 있으므로 이름표는 선 아래 오른쪽에 둔다
    chip('Glass Ceramic 2 sheet: haze ≤ 0.15%', gx1, Y(SPEC) + 16, INK, 'right', 12);

    // 지금 점
    const h550 = haze(d, dn, f, 550);
    const ok = h550 <= SPEC;
    ctx.fillStyle = ok ? GREEN : RED;
    ctx.strokeStyle = BG; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(d), Y(h550), 6.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    chip(`${h550 < 0.01 ? h550.toExponential(1) : h550.toFixed(2)}%`, X(d) + (d > 280 ? -12 : 12), Y(h550) + (h550 > 20 ? 18 : -16), ok ? GREEN : '#ffb6a4', d > 280 ? 'right' : 'left', 13);

    // 축
    ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
    for (let l = LMIN; l <= LMAX; l++) text(l >= 0 ? String(10 ** l) : String(10 ** l), gx0 - 6, Y(10 ** l), MUTE, 11, 500, 'right');
    for (const v of [0, 100, 200, 300, 400]) text(String(v), X(v), gy1 + 14, MUTE, 11, 500, 'center');
    text('crystal size, nm', (gx0 + gx1) / 2, gy1 + 32, INK, 12, 600, 'center');
    ctx.save(); ctx.translate(gx0 - 44, (gy0 + gy1) / 2); ctx.rotate(-Math.PI / 2);
    text('haze at 0.6 mm, % (log)', 0, 0, INK, 12, 600, 'center'); ctx.restore();

    // 범례
    let lx = gx0 - 30;
    for (const [, col, name] of WAVES) {
      ctx.fillStyle = col; ctx.fillRect(lx, gy1 + 52, 12, 4);
      text(name, lx + 16, gy1 + 54, col, 12, 600);
      lx += 92;
    }
    text(`index mismatch Δn = ${dn.toFixed(4)}`, gx0 - 30, gy1 + 76, MUTE, 12, 500);
    return { h550, ok };
  }

  function refresh() {
    for (const el of inputs) {
      const k = el.dataset.in;
      el.value = String(state[k]);
      out(k).textContent = k === 'dn' ? state.dn.toFixed(4) : k === 'f' ? String(Math.round(state.f * 100)) : String(state[k]);
    }
    const { h550, ok } = draw();
    const h450 = haze(state.d, state.dn, state.f, 450);
    const lim = dnMax(state.d, state.f);
    out('readout').innerHTML =
      `haze at 550 nm <strong>${h550 < 0.01 ? h550.toExponential(1) : h550.toFixed(2)}%</strong> → ` +
      (ok ? '<strong>within the sheet value</strong>' : '<strong>over the sheet value</strong>') +
      `, blue scatters ${(h450 / Math.max(h550, 1e-12)).toFixed(1)}× more<br>` +
      `at ${state.d} nm the mismatch may be at most <strong>Δn ${lim.toFixed(4)}</strong>`;
  }

  for (const el of inputs) {
    el.addEventListener('input', (e) => {
      state[el.dataset.in] = Number(e.target.value);
      refresh();
    });
  }

  refresh();
}

export default mount;
