// 시뮬레이션 — 강화한 UTG를 반경 R로 접을 때 두께 방향 응력과 접힘 한계를 함께 본다.
// 왼쪽은 깊이 축의 응력 그래프(강화 응력, 접힌 뒤 합산 응력), 오른쪽은 두 기준과의 비교다.
//
// 모델과 한계
// - 강화 응력은 선형(삼각형) 모형이다. 표면 −CS에서 깊이 DoL까지 직선으로 0이 되고, 가운데는 일정한 인장 CT다.
//   힘의 균형에서 CT = CS·DoL / (t − 2·DoL)이 나온다(1편의 식, Corning US8415013B2 식 1).
//   쇼트 US11465930B2의 표 값(50 μm, CS 680, DoL 11 → CT 267)이 이 식과 맞는다.
// - 굽힘 응력은 σb = E/(1−ν²)·(t/2)·(1/R)이고(Corning US9321678B2 식 1), E 72 GPa, ν 0.2(KAIST 2022 표 1).
//   중립면은 유리 가운데로 두고 단독 유리로 계산한다. 보호층·접착층이 있으면 중립면이 옮겨 가 값이 달라진다.
// - 바깥 겉면의 합산 응력은 −CS + σb다. 양수면 겉면이 인장이다.
// - 기준 1: 20만 회 접힘 95% 통과 겉면 변형률 약 1.2%(UTI US12044822B2 표 1의 다섯 줄이 1.14~1.23%).
//   변형률은 ε = t/(2R + t)로 계산한다. 이 값은 그 특허의 시편 조건에서 나온 것이고 강화 조건이 표에 없다.
// - 기준 2: 쇼트 특허의 경험식, 파괴 굽힘 반경 < t·80,000/CS(t mm, CS MPa). 모서리를 처리하지 않은 시편 기준이다.
// - 30~50 μm에서 파쇄성(자기파괴) CT 문턱은 공개된 식이 없어 그리지 않는다. 삼성디스플레이 US11673829B2에서
//   50 μm 유리가 CT 604 MPa를 잰 뒤 더 강화하자 스스로 깨졌다는 사례만 프리셋으로 넣었다.
// - 흠·습도·피로·펜 충격은 넣지 않았다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 440;
const E = 72000; // MPa
const NU = 0.2;
const STRAIN_LIMIT = 1.2; // %

const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';
const INK = '#f4f4ef';
const MUTE = '#b9b9b0';
const BG = '#101418';
const COMP = '#4f8cff';
const TENS = '#ff5a36';
const OK = '#1fdc6a';

const PRESETS = [
  { key: 's2', label: 'Schott 50 μm, 2 min (DoL 4)', t: 50, R: 2, cs: 706, dol: 4 },
  { key: 's20', label: 'Schott 50 μm, 20 min (DoL 11)', t: 50, R: 2, cs: 680, dol: 11 },
  { key: 'sd', label: 'Samsung 50 μm, 60 min (CT 604)', t: 50, R: 2, cs: 680, dol: 16 },
  { key: 'c75', label: 'Corning 75 μm, 200k folds', t: 75, R: 3.3, cs: 775, dol: 10 },
];

const ctOf = ({ t, cs, dol }) => (cs * dol) / Math.max(t - 2 * dol, 1);
const bendOf = ({ t, R }) => ((E / (1 - NU * NU)) * (t / 2 / 1000)) / R;
const strainOf = ({ t, R }) => (100 * t) / (2 * R * 1000 + t);

export function mount(container) {
  const state = { t: 50, R: 2, cs: 706, dol: 4, preset: 's2' };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Fold a strengthened ultra-thin glass and read the stress through it.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>From patents</label>
          <div class="sim-toggle-group" data-presets>
            ${PRESETS.map((p) => `<button type="button" class="sim-toggle-btn" data-p="${p.key}">${p.label}</button>`).join('')}
          </div>
        </div>
        <div class="sim-control">
          <label>Glass thickness <span data-out="t"></span> μm</label>
          <input type="range" min="20" max="100" step="1" data-in="t" />
        </div>
        <div class="sim-control">
          <label>Fold radius <span data-out="R"></span> mm</label>
          <input type="range" min="0.5" max="5" step="0.1" data-in="R" />
        </div>
        <div class="sim-control">
          <label>Surface compression CS <span data-out="cs"></span> MPa</label>
          <input type="range" min="300" max="1000" step="10" data-in="cs" />
        </div>
        <div class="sim-control">
          <label>Depth of layer DoL <span data-out="dol"></span> μm</label>
          <input type="range" min="1" max="20" step="1" data-in="dol" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inputs = [...container.querySelectorAll('[data-in]')];
  const pbtns = [...container.querySelectorAll('[data-p]')];

  function text(s, x, y, color, size, weight, align) {
    ctx.font = `${weight || 500} ${size || 13}px ${FONT}`;
    ctx.fillStyle = color || INK;
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(s, x, y);
  }

  function solve() {
    const s = { ...state, dol: Math.min(state.dol, Math.floor((state.t - 2) / 2)) };
    const ct = ctOf(s);
    const sb = bendOf(s);
    const res = (d) => { const dd = Math.min(d, s.t - d); return dd < s.dol ? -s.cs * (1 - dd / s.dol) : ct; };
    const N = 600;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const d = (i / N) * s.t;
      pts.push({ d, b: res(d), v: res(d) + sb * (1 - (2 * d) / s.t) });
    }
    const outer = -s.cs + sb;
    const maxT = Math.max(...pts.map((p) => p.v));
    const eps = strainOf(s);
    const rSchott = ((s.t / 1000) * 80000) / s.cs;
    return { s, ct, sb, pts, outer, maxT, eps, rSchott };
  }

  function draw(r) {
    const { t } = r.s;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
    text('Stress through the glass, folded', 20, 24, INK, 15, 700);
    text('top = outer face of the fold', 20, 44, MUTE, 12, 500);

    // 왼쪽: 응력-깊이 그래프
    const y0 = 80, y1 = 360, gx0 = 40, gx1 = 330;
    const Y = (d) => y0 + (d / t) * (y1 - y0);
    const smin = -1200, smax = 1600;
    const X = (v) => gx0 + ((Math.max(Math.min(v, smax), smin) - smin) / (smax - smin)) * (gx1 - gx0);
    ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(255,255,255,0.10)';
    for (const v of [-1000, -500, 0, 500, 1000, 1500]) {
      ctx.beginPath(); ctx.moveTo(X(v), y0); ctx.lineTo(X(v), y1); ctx.stroke();
      text(String(v), X(v), y1 + 14, MUTE, 11, 500, 'center');
    }
    ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(X(0), y0); ctx.lineTo(X(0), y1); ctx.stroke();
    text('stress, MPa (+ tension)', gx1, y1 + 32, INK, 12, 600, 'right');
    text('outer', gx0 - 6, y0, TENS, 12, 700, 'right');
    text('inner', gx0 - 6, y1, COMP, 12, 700, 'right');
    ctx.strokeStyle = MUTE; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); r.pts.forEach((p, i) => { if (i) ctx.lineTo(X(p.b), Y(p.d)); else ctx.moveTo(X(p.b), Y(p.d)); }); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = r.outer > 0 ? TENS : COMP; ctx.lineWidth = 3;
    ctx.beginPath(); r.pts.forEach((p, i) => { if (i) ctx.lineTo(X(p.v), Y(p.d)); else ctx.moveTo(X(p.v), Y(p.d)); }); ctx.stroke();
    ctx.fillStyle = r.outer > 0 ? TENS : COMP; ctx.beginPath(); ctx.arc(X(r.outer), y0, 6, 0, Math.PI * 2); ctx.fill();
    text(`${Math.round(r.outer)}`, X(r.outer) + (r.outer > 1300 ? -10 : 10), y0 - 2, r.outer > 0 ? TENS : COMP, 13, 700, r.outer > 1300 ? 'right' : 'left');
    text('dashed: flat, after ion exchange', gx0, 66, MUTE, 11, 500);

    // 오른쪽: 두 기준
    const bx = 360, bw = 230;
    const bar = (y, label, val, max, lim, unit, good) => {
      text(label, bx, y - 18, INK, 13, 700);
      ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(bx, y, bw, 16);
      ctx.fillStyle = good ? OK : TENS; ctx.fillRect(bx, y, Math.min(val / max, 1) * bw, 16);
      const lx = bx + Math.min(lim / max, 1) * bw;
      ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, y - 5); ctx.lineTo(lx, y + 21); ctx.stroke();
      text(`${val.toFixed(2)} ${unit}`, bx, y + 32, good ? OK : TENS, 13, 700);
      text(`limit ${lim.toFixed(2)}`, bx + bw, y + 32, MUTE, 12, 500, 'right');
    };
    bar(110, 'Surface strain vs 200k folds', r.eps, 2.5, STRAIN_LIMIT, '%', r.eps <= STRAIN_LIMIT);
    text('UTI table 1, 95 % pass', bx, 160, MUTE, 11, 500);
    bar(220, 'Radius vs Schott t·80,000/CS', r.s.R, 5, r.rSchott, 'mm', r.s.R >= r.rSchott);
    text('larger than the line = no break', bx, 270, MUTE, 11, 500);
    text(`bending ±${Math.round(r.sb)} MPa`, bx, 318, INK, 13, 700);
    text(`core tension CT ${Math.round(r.ct)} MPa`, bx, 340, r.ct > 300 ? TENS : INK, 13, 700);
    text(`peak tension ${Math.round(r.maxT)} MPa`, bx, 362, r.maxT > 0 ? TENS : INK, 13, 700);
    text(`t ${t} μm · R ${r.s.R.toFixed(1)} mm · CS ${r.s.cs} · DoL ${r.s.dol}`, 20, 410, MUTE, 12, 600);
  }

  function refresh() {
    for (const el of inputs) {
      const k = el.dataset.in;
      el.value = String(state[k]);
      out(k).textContent = k === 'R' ? state.R.toFixed(1) : String(state[k]);
    }
    for (const b of pbtns) b.setAttribute('aria-pressed', String(b.dataset.p === state.preset));
    const r = solve();
    draw(r);
    out('readout').innerHTML =
      `outer face <strong>${Math.round(r.outer)}</strong> MPa (${r.outer > 0 ? 'tension' : 'compression'}) · CT <strong>${Math.round(r.ct)}</strong> MPa<br>` +
      `strain <strong>${r.eps.toFixed(2)}</strong>% (200k limit ≈ ${STRAIN_LIMIT}%) · Schott radius line <strong>${r.rSchott.toFixed(2)}</strong> mm` +
      (r.s.dol !== state.dol ? '<br>DoL capped below half the thickness' : '');
  }

  for (const el of inputs) {
    el.addEventListener('input', (e) => { state[el.dataset.in] = Number(e.target.value); state.preset = ''; refresh(); });
  }
  for (const b of pbtns) {
    b.addEventListener('click', () => { const p = PRESETS.find((q) => q.key === b.dataset.p); Object.assign(state, { t: p.t, R: p.R, cs: p.cs, dol: p.dol, preset: p.key }); refresh(); });
  }
  refresh();
}

export default mount;
