// 시뮬레이션 — 강화유리를 상온에서 휘면 두 면의 압축과 중심 인장이 어떻게 달라지나.
// 왼쪽은 굽은 유리 단면과 압축층, 오른쪽은 같은 깊이 축의 응력 그래프다.
//
// 모델과 한계
// - 굽힘 응력 σb = E/(1−ν²)·(t/2)·(1/R). E 76.3GPa, ν 0.211(Corning US12139435B2의 값과 맞는다).
//   1.1mm·R350 = 125MPa, 0.7mm·R250 = 112MPa가 특허 문장과 일치한다.
// - 강화 응력은 두 모형이다. 오차함수형은 CS와 DOC에서 폭을 정한다. 포물선형은 중심 CT와 DOC에서
//   포물선을 정하고, 표면 스파이크의 폭을 두께 방향 힘의 균형으로 정한다.
// - 굽힘은 강화 응력에 깊이 방향 직선으로 더한다. 판 전체가 한 반경으로 휜다고 본다.
// - 비교예 3(1.1mm, R350)의 CT 149, 볼록면 DOC 26, 오목면 DOC 388은 거의 그대로 나오고,
//   실시예 2의 CT는 약 90MPa로 특허의 99MPa보다 낮다. 차이는 프리셋 옆에 특허 값을 적어 보인다.
// - 접착제·프레임·흠의 영향은 넣지 않았다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 430;
const E = 76300;
const NU = 0.211;

const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';
const INK = '#f4f4ef';
const MUTE = '#b9b9b0';
const BG = '#101418';
const COMP = '#4f8cff';
const TENS = '#ff5a36';
const GLASS = '#a9d2e4';

const PRESETS = [
  { key: 'ex2', label: 'Example 2: 1.1 mm, parabolic, R350', t: 1100, R: 350, prof: 'para', cs: 1030, doc: 165, ct: 55,
    patent: 'patent: CT 99, DOC 27 / 377 μm' },
  { key: 'cmp3', label: 'Comparative 3: 1.1 mm, erf, R350', t: 1100, R: 350, prof: 'erf', cs: 1030, doc: 37, ct: 37,
    patent: 'patent: CT 149, DOC 26 / 388 μm' },
];

const erfc = (x) => {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807
    + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
};

// 깊이 d(μm, 가까운 면에서)의 강화 응력. 인장 +, 압축 −
function makeProfile({ t, prof, cs, doc, ct }) {
  if (prof === 'erf') {
    // erfc(doc/w) = ct/(cs+ct) 인 w를 이분법으로 찾는다
    const target = ct / (cs + ct);
    let lo = 0.01, hi = 5;
    for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (erfc(m) > target) lo = m; else hi = m; }
    const w = doc / ((lo + hi) / 2);
    return (x) => { const d = Math.min(x, t - x); return ct - (cs + ct) * erfc(d / w); };
  }
  const u0 = 1 - (2 * doc) / t;
  const b = 1 / (u0 * u0);
  const sp = cs + ct * (1 - b);
  const area = ct * (1 - b / 3) * (t / 2);
  const w = Math.max(area * Math.sqrt(Math.PI) / sp, 1);
  return (x) => { const d = Math.min(x, t - x); const u = 1 - (2 * d) / t; return ct * (1 - b * u * u) - sp * erfc(d / w); };
}

const bendStress = (t, R) => ((E / (1 - NU * NU)) * (t / 2 / 1000)) / R;

export function mount(container) {
  const state = { t: 1100, R: 350, prof: 'para', cs: 1030, doc: 165, ct: 55, preset: 'ex2' };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Bend a strengthened glass sheet at room temperature and read both faces.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>From Corning US12139435B2</label>
          <div class="sim-toggle-group" data-presets>
            ${PRESETS.map((p) => `<button type="button" class="sim-toggle-btn" data-p="${p.key}">${p.label}</button>`).join('')}
          </div>
        </div>
        <div class="sim-control">
          <label>Glass thickness <span data-out="t"></span> mm</label>
          <input type="range" min="400" max="2000" step="50" data-in="t" />
        </div>
        <div class="sim-control">
          <label>Bend radius <span data-out="R"></span> mm</label>
          <input type="range" min="50" max="2000" step="10" data-in="R" />
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
    const { t, R } = state;
    const base = makeProfile(state);
    const sb = bendStress(t, R);
    const N = 1400;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const d = (i / N) * t;
      pts.push({ d, b: base(d), v: base(d) + sb * (1 - (2 * d) / t) });
    }
    const csConvex = -pts[0].v;
    const csConcave = -pts[N].v;
    let docConvex = 0;
    for (let i = 1; i <= N; i++) { if (pts[i].v >= 0) { docConvex = pts[i].d; break; } }
    let docConcave = 0;
    for (let i = N - 1; i >= 0; i--) { if (pts[i].v >= 0) { docConcave = t - pts[i].d; break; } }
    const ct = Math.max(...pts.map((p) => p.v));
    return { pts, sb, csConvex, csConcave, docConvex, docConcave, ct };
  }

  function draw(r) {
    const { t, R } = state;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
    text('Stress through the glass after cold bending', 20, 24, INK, 15, 700);
    text('left: glass section · right: same depth axis', 20, 44, MUTE, 12, 500);

    const y0 = 84, y1 = 372;
    const Y = (d) => y0 + (d / t) * (y1 - y0);

    // 왼쪽: 유리 단면
    const bx = 62, bw = 104;
    ctx.fillStyle = GLASS; ctx.fillRect(bx, y0, bw, y1 - y0);
    ctx.fillStyle = TENS; ctx.globalAlpha = 0.35; ctx.fillRect(bx, y0, bw, y1 - y0); ctx.globalAlpha = 1;
    ctx.fillStyle = COMP;
    ctx.fillRect(bx, y0, bw, Math.max(Y(r.docConvex) - y0, 2));
    ctx.fillRect(bx, Y(t - r.docConcave), bw, y1 - Y(t - r.docConcave));
    text('convex', bx + bw / 2, y0 - 14, TENS, 13, 700, 'center');
    text('concave', bx + bw / 2, y1 + 14, COMP, 13, 700, 'center');
    text(`${Math.round(r.docConvex)} μm`, bx + bw + 8, Y(r.docConvex) + 8, COMP, 13, 700);
    text(`${Math.round(r.docConcave)} μm`, bx + bw + 8, Y(t - r.docConcave / 2), COMP, 13, 700);
    text('tension', bx + bw / 2, (Y(r.docConvex) + Y(t - r.docConcave)) / 2, '#101418', 13, 700, 'center');

    // 오른쪽: 응력 그래프
    const gx0 = 270, gx1 = 600;
    const smin = -1400, smax = 500;
    const X = (s) => gx0 + ((s - smin) / (smax - smin)) * (gx1 - gx0);
    ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(255,255,255,0.10)';
    for (const s of [-1200, -800, -400, 0, 400]) {
      ctx.beginPath(); ctx.moveTo(X(s), y0); ctx.lineTo(X(s), y1); ctx.stroke();
      text(String(s), X(s), y1 + 14, MUTE, 11, 500, 'center');
    }
    ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(X(0), y0); ctx.lineTo(X(0), y1); ctx.stroke();
    text('stress, MPa', gx1, y1 + 32, INK, 12, 600, 'right');
    // 굽히기 전
    ctx.strokeStyle = MUTE; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); r.pts.forEach((p, i) => { const x = X(Math.max(p.b, smin)); if (i) ctx.lineTo(x, Y(p.d)); else ctx.moveTo(x, Y(p.d)); }); ctx.stroke();
    ctx.setLineDash([]);
    // 굽힌 뒤
    ctx.strokeStyle = COMP; ctx.lineWidth = 3;
    ctx.beginPath(); r.pts.forEach((p, i) => { const x = X(Math.max(Math.min(p.v, smax), smin)); if (i) ctx.lineTo(x, Y(p.d)); else ctx.moveTo(x, Y(p.d)); }); ctx.stroke();
    text('dashed: before bending', gx0, y0 - 14, MUTE, 12, 500);
    const peak = r.pts.reduce((a, p) => (p.v > a.v ? p : a), r.pts[0]);
    ctx.fillStyle = TENS; ctx.beginPath(); ctx.arc(X(Math.min(peak.v, smax)), Y(peak.d), 6, 0, Math.PI * 2); ctx.fill();
    text(`CT ${Math.round(r.ct)}`, X(Math.min(peak.v, smax)) - 10, Y(peak.d), TENS, 13, 700, 'right');
    text(`bending ±${Math.round(r.sb)} MPa`, 20, 410, r.sb > state.cs ? TENS : INK, 13, 700);
    text(`R ${R} mm · t ${(t / 1000).toFixed(2)} mm`, 190, 410, MUTE, 13, 600);
  }

  function refresh() {
    for (const el of inputs) {
      const k = el.dataset.in;
      el.value = String(state[k]);
      out(k).textContent = k === 't' ? (state.t / 1000).toFixed(2) : String(state.R);
    }
    for (const b of pbtns) b.setAttribute('aria-pressed', String(b.dataset.p === state.preset));
    const r = solve();
    draw(r);
    const p = PRESETS.find((q) => q.key === state.preset);
    const fail = r.csConvex <= 0;
    out('readout').innerHTML =
      `convex CS <strong>${Math.round(r.csConvex)}</strong> · concave CS <strong>${Math.round(r.csConcave)}</strong> MPa<br>` +
      `DOC <strong>${Math.round(r.docConvex)} / ${Math.round(r.docConcave)}</strong> μm · CT <strong>${Math.round(r.ct)}</strong> MPa` +
      (p ? `<br>${p.patent}` : '') +
      (fail ? '<br><strong>bending exceeds surface compression: the convex face is in tension</strong>' : '');
  }

  for (const el of inputs) {
    el.addEventListener('input', (e) => { state[el.dataset.in] = Number(e.target.value); state.preset = ''; refresh(); });
  }
  for (const b of pbtns) {
    b.addEventListener('click', () => { const p = PRESETS.find((q) => q.key === b.dataset.p); Object.assign(state, { t: p.t, R: p.R, prof: p.prof, cs: p.cs, doc: p.doc, ct: p.ct, preset: p.key }); refresh(); });
  }
  refresh();
}

export default mount;
