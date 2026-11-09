// 시뮬레이션 — 다중 중립면이 있을 때와 없을 때, 폴더블 적층이 접히는 동작을 나란히 비교한다.
// 왼쪽은 단단한 점착층(중립면 1개), 오른쪽은 고른 점착층. 펼친 상태에서 접히는 과정을 재생하며
// 판마다 변형률 색, 중립면(점선), 층 끝의 어긋남, 접힘 중앙의 두께 방향 변형률을 보여 준다.
//
// 모델과 한계
// - 같은 판 세 장(두께 h, 탄성률 E)과 같은 점착층 두 겹(두께 t, 전단 탄성률 G)의 부분 합성보(partial interaction).
// - 접힘 구간 길이 L = π(R + 전체두께/2)를 고정하고, 접힌 각 θ에서 곡률 κ = θ/L. 구간 밖은 평평한 판이 이어진다고 둔다.
// - 바깥 판의 축력 N은 N'' − α²N = −α²N∞ (접힘 구간), α² = (G/t)/(E·h), N∞ = E·h·κ·d, d = h + t.
//   경계에서 N, N'이 이어지게 풀면 N(x)/N∞ = η(x) = 1 − exp(−αL/2)·cosh(αx).
// - 판 안의 변형률 ε = κ·(z + i·η·d), i = −1, 0, +1. 접힘 중앙에서 η < h/(2d)이면 세 판 안에 모두 ε = 0인 면이 있어 중립면이 3개다.
// - 접힘 경계의 미끄러짐 s = κ·d·(1 − exp(−αL))/(2α), 점착층 전단 변형률 γ = s/t. 선형 탄성 계산이므로 큰 값은 규모만 읽는다.
// - E = 4 GPa, h = 100 μm는 KR20190030912A가 적은 범위(1~8 GPa, 30~400 μm) 안에서 고른 값이다.
// - 저장 탄성률을 그대로 G로 쓴다. 시간 의존(크리프)·온도 곡선·들뜸·피로는 넣지 않았고, 합격·불합격을 판정하지 않는다.
// - 그림의 층 두께와 끝 어긋남은 보이도록 키웠다. 버튼의 값은 동우화인켐 KR101579710B1 표 1(25℃, -20℃).
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 500;
const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';
const INK = '#f4f4ef';
const MUTE = '#b9b9b0';
const BG = '#101418';
const ADH = '#ffd166';
const OK = '#1fdc6a';
const ZERO = [246, 246, 240];  // 변형률 0 = 흰색. 필름 자체의 색을 따로 두지 않는다(회색이면 압축·인장의 가운데와 구분되지 않는다)
const NP_LINE = '#0b0e12';      // 중립면 점선은 흰 바탕 위에서 보이도록 검게
const E = 4e9;      // Pa
const H_UM = 100;   // μm
const EM = 7;       // 색·그래프 눈금 ± %
const G_STIFF = 10000; // kPa, 왼쪽 비교 기준

const PRESETS = [
  { key: 'a', label: 'Example 1, 25 °C: 64 kPa', G: 64 },
  { key: 'b', label: 'Example 1, −20 °C: 88 kPa', G: 88 },
  { key: 'c', label: 'Comparative 2, 25 °C: 84 kPa', G: 84 },
  { key: 'd', label: 'Comparative 2, −20 °C: 4,053 kPa', G: 4053 },
];

const GMIN = 10, GMAX = 10000;
const s2G = (v) => GMIN * (GMAX / GMIN) ** (v / 1000);
const G2s = (g) => Math.round((1000 * Math.log10(g / GMIN)) / Math.log10(GMAX / GMIN));

export function solve(Gk, Rmm, tum) {
  const h = H_UM * 1e-6, t = tum * 1e-6, d = h + t, tot = 3 * h + 2 * t;
  const Rn = Rmm * 1e-3 + tot / 2, L = Math.PI * Rn;
  const k = (Gk * 1e3) / t, al = Math.sqrt(k / (E * h));
  const eta0 = 1 - Math.exp((-al * L) / 2);
  const crit = h / (2 * d);
  const Gcrit = (((-Math.log(1 - crit) * 2) / L) ** 2 * E * h * t) / 1e3;
  const etaAt = (u) => 1 - Math.exp((-al * L) / 2) * Math.cosh(al * u * (L / 2)); // u: −1 ~ 1
  const fin = 1 / Rn;                                  // 180° 접었을 때의 곡률
  const slip = (fin * d * (1 - Math.exp(-al * L))) / (2 * al);
  return { h, t, d, tot, Rn, L, eta: eta0, etaAt, crit, Gcrit, planes: eta0 < crit ? 3 : 1, fin, slip: slip * 1e6, gam: (slip / t) * 100 };
}

function heat(e) {
  const a = Math.min(1, Math.abs(e) / EM);
  const c1 = e > 0 ? [229, 62, 36] : [29, 92, 235];
  const m = ZERO.map((v, i) => Math.round(v + (c1[i] - v) * a));
  return `rgb(${m[0]},${m[1]},${m[2]})`;
}

export function mount(container) {
  const state = { g: G2s(64), R: 3, t: 25, th: 180, preset: 'a' };
  let playing = false, raf = 0, t0 = 0, visible = true;

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Fold both stacks: without and with multiple neutral planes.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <button type="button" class="sim-toggle-btn" data-play aria-pressed="false">Play folding</button>
        </div>
        <div class="sim-control">
          <label>Fold angle <span data-out="th"></span>°</label>
          <input type="range" min="0" max="180" step="1" data-in="th" />
        </div>
        <div class="sim-control">
          <label>Right stack, from the patent table</label>
          <div class="sim-toggle-group" data-presets style="flex-wrap:wrap">
            ${PRESETS.map((p) => `<button type="button" class="sim-toggle-btn" style="flex:1 1 140px;min-width:0" data-p="${p.key}">${p.label}</button>`).join('')}
          </div>
        </div>
        <div class="sim-control">
          <label>Right stack adhesive modulus <span data-out="g"></span> kPa</label>
          <input type="range" min="0" max="1000" step="1" data-in="g" />
        </div>
        <div class="sim-control">
          <label>Fold radius (inner) <span data-out="R"></span> mm</label>
          <input type="range" min="1.5" max="5" step="0.1" data-in="R" />
        </div>
        <div class="sim-control">
          <label>Adhesive thickness <span data-out="t"></span> μm</label>
          <input type="range" min="10" max="100" step="1" data-in="t" />
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
  const play = container.querySelector('[data-play]');

  function text(s, x, y, color, size, weight, align) {
    ctx.font = `${weight || 600} ${size || 13}px ${FONT}`;
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, x, y);
  }

  // 화면 좌표의 접힌 중심선. 가운데 바닥을 고정하고 양쪽이 위로 올라온다. o는 바깥쪽(+) 오프셋 px.
  function path(cx, by, Rpx, th, o, tail, tailL, tailR) {
    const Lpx = Math.PI * Rpx, half = th / 2;
    const R = th > 1e-3 ? Lpx / th : 1e9;
    const pt = (a) => [cx + R * Math.sin(a) + o * Math.sin(a), by - R * (1 - Math.cos(a)) + o * Math.cos(a)];
    const seg = [];
    const n = 28;
    for (let i = 0; i <= n; i++) {
      const u = -1 + (2 * i) / n;
      const a = th > 1e-3 ? u * half : 0;
      const p = th > 1e-3 ? pt(a) : [cx + (u * Lpx) / 2, by + o];
      seg.push({ x: p[0], y: p[1], u });
    }
    const dirR = [Math.cos(half), -Math.sin(half)], dirL = [-Math.cos(half), -Math.sin(half)];
    const a0 = seg[0], a1 = seg[n];
    return { seg, tl: [a0.x, a0.y, a0.x + dirL[0] * (tail + tailL), a0.y + dirL[1] * (tail + tailL)], tr: [a1.x, a1.y, a1.x + dirR[0] * (tail + tailR), a1.y + dirR[1] * (tail + tailR)] };
  }

  function drawStack(cx, r, th) {
    const by = 226, Rpx = 30 + 6 * state.R, PX = 0.11, tail = 52;
    const hp = H_UM * PX, tp = Math.max(2.4, r.t * 1e6 * PX), pitch = hp + tp;
    const kap = (th / Math.PI) * r.fin;                 // 1/m
    const stag = Math.min(14, r.slip * 0.08) * (th / Math.PI);
    const N = 5, lanes = [-1, 0, 1];
    ctx.lineCap = 'butt';
    lanes.forEach((i) => {
      const off = i * pitch;
      const dt = -i * stag;
      for (let j = 0; j < N; j++) {
        const zf = (j + 0.5) / N - 0.5;
        const P = path(cx, by, Rpx, th, off + zf * hp, tail, dt, dt);
        const w = hp / N + 0.7;
        ctx.strokeStyle = `rgb(${ZERO.join(',')})`; ctx.lineWidth = w;
        for (const q of [P.tl, P.tr]) { ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(q[2], q[3]); ctx.stroke(); }
        for (let m = 0; m < P.seg.length - 1; m++) {
          const a = P.seg[m], b = P.seg[m + 1], um = (a.u + b.u) / 2;
          const e = kap * (zf * r.h + i * r.etaAt(um) * r.d) * 100;
          ctx.strokeStyle = heat(e); ctx.lineWidth = w;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x + (b.x - a.x) * 0.15, b.y + (b.y - a.y) * 0.15); ctx.stroke();
        }
      }
      // 중립면
      if (th > 0.02) {
        ctx.strokeStyle = NP_LINE; ctx.lineWidth = 1.6; ctx.setLineDash([4, 3]); ctx.beginPath();
        let on = false;
        const n = 28;
        for (let m = 0; m <= n; m++) {
          const u = -1 + (2 * m) / n, z0 = -i * r.etaAt(u) * r.d;
          if (Math.abs(z0) < r.h / 2) {
            const p = path(cx, by, Rpx, th, off + (z0 / r.h) * hp, tail, 0, 0).seg[m];
            on ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); on = true;
          } else on = false;
        }
        ctx.stroke(); ctx.setLineDash([]);
      }
    });
    // 점착층
    [-0.5, 0.5].forEach((f) => {
      const off = f * pitch, dt = -f * stag;
      const P = path(cx, by, Rpx, th, off, tail, dt, dt);
      ctx.strokeStyle = ADH; ctx.lineWidth = tp; ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.moveTo(P.tl[2], P.tl[3]); ctx.lineTo(P.tl[0], P.tl[1]);
      P.seg.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(P.tr[2], P.tr[3]); ctx.stroke(); ctx.globalAlpha = 1;
    });
  }

  function drawGraph(x0, x1, r, th) {
    const y0 = 262, y1 = 366;
    const kap = (th / Math.PI) * r.fin;
    const sx = (x1 - x0) / r.tot, X = (u) => x0 + u * sx;
    const c = (y0 + y1) / 2, sy = (y1 - y0) / 2 / EM, Y = (e) => c - e * sy;
    ctx.fillStyle = 'rgba(255,209,102,0.22)';
    for (const k of [1, 2]) ctx.fillRect(X(k * r.h + (k - 1) * r.t), y0, r.t * sx, y1 - y0);
    ctx.strokeStyle = 'rgba(255,255,255,0.09)'; ctx.lineWidth = 1;
    for (const v of [-6, 6]) { ctx.beginPath(); ctx.moveTo(x0, Y(v)); ctx.lineTo(x1, Y(v)); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(x1, Y(0)); ctx.stroke();
    for (const v of [-6, 0, 6]) text(`${v > 0 ? '+' : ''}${v}`.replace('-', '−'), x0 - 6, Y(v), MUTE, 11, 500, 'right');
    ctx.strokeStyle = INK; ctx.lineWidth = 3.2; ctx.lineCap = 'round';
    [-1, 0, 1].forEach((i, idx) => {
      const u0 = idx * (r.h + r.t), u1 = u0 + r.h;
      const a = kap * (-r.h / 2 + i * r.eta * r.d) * 100, b = kap * (r.h / 2 + i * r.eta * r.d) * 100;
      ctx.beginPath(); ctx.moveTo(X(u0), Y(a)); ctx.lineTo(X(u1), Y(b)); ctx.stroke();
    });
    text('inner → outer surface', (x0 + x1) / 2, y1 + 14, MUTE, 11, 500, 'center');
  }

  function fmtShear(v) { return v >= 1000 ? Math.round(v / 100) * 100 : Math.round(v); }

  function panel(cx, x0, x1, r, name, th) {
    const f = th / Math.PI;
    text(name, cx, 62, INK, 13, 700, 'center');
    text(r.planes === 1 ? '1 neutral plane' : `${r.planes} neutral planes`, cx, 82, r.planes > 1 ? OK : MUTE, 13, 700, 'center');
    drawStack(cx, r, th);
    drawGraph(x0, x1, r, th);
    const peak = f * r.fin * (r.h / 2 + r.eta * r.d) * 100;
    const y = 408;
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath(); ctx.roundRect(cx - 142, y - 18, 138, 76, 8); ctx.fill();
    ctx.beginPath(); ctx.roundRect(cx + 4, y - 18, 138, 76, 8); ctx.fill();
    text(`±${peak.toFixed(1)} %`, cx - 73, y + 8, INK, 21, 700, 'center');
    text('peak layer strain', cx - 73, y + 40, MUTE, 12, 500, 'center');
    text(`${fmtShear(r.gam * f)} %`, cx + 73, y + 8, ADH, 21, 700, 'center');
    text('adhesive shear', cx + 73, y + 40, MUTE, 12, 500, 'center');
  }

  function draw() {
    const G = s2G(state.g), th = (state.th * Math.PI) / 180;
    const left = solve(G_STIFF, state.R, state.t), right = solve(G, state.R, state.t);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
    text('Folding the same three layers', 20, 26, INK, 15, 700);
    text(`fold angle ${Math.round(state.th)}°`, W - 20, 26, ADH, 14, 700, 'right');
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W / 2, 48); ctx.lineTo(W / 2, H - 16); ctx.stroke();
    panel(155, 44, 288, left, 'Stiff adhesive, 10,000 kPa', th);
    panel(465, 354, 598, right, `Adhesive ${G >= 100 ? Math.round(G).toLocaleString('en-US') : Math.round(G)} kPa`, th);
    // 범례: 파랑 압축 · 흰색 0 · 빨강 인장 · 점선 중립면
    const lx = 190, lw = 150, ly = 482;
    const gr = ctx.createLinearGradient(lx, 0, lx + lw, 0);
    gr.addColorStop(0, heat(-EM)); gr.addColorStop(0.5, heat(0)); gr.addColorStop(1, heat(EM));
    ctx.fillStyle = gr; ctx.fillRect(lx, ly - 6, lw, 12);
    text('compression', lx - 8, ly, MUTE, 12, 500, 'right');
    text('no strain', lx + lw / 2, ly - 0.5, '#20262e', 10, 700, 'center');
    text('tension', lx + lw + 8, ly, MUTE, 12, 500);
    ctx.strokeStyle = INK; ctx.lineWidth = 1.6; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(lx + lw + 66, ly); ctx.lineTo(lx + lw + 96, ly); ctx.stroke(); ctx.setLineDash([]);
    text('neutral plane', lx + lw + 102, ly, MUTE, 12, 500);
    return { left, right };
  }

  function refresh() {
    const G = s2G(state.g);
    for (const el of inputs) {
      const k = el.dataset.in;
      el.value = String(state[k]);
      out(k).textContent = k === 'g' ? (G >= 100 ? Math.round(G).toLocaleString('en-US') : G.toFixed(0)) : k === 'R' ? state.R.toFixed(1) : k === 'th' ? String(Math.round(state.th)) : String(state[k]);
    }
    for (const b of pbtns) b.setAttribute('aria-pressed', String(b.dataset.p === state.preset));
    const { left, right } = draw();
    const pk = (r) => (r.fin * (r.h / 2 + r.eta * r.d) * 100).toFixed(1);
    out('readout').innerHTML =
      `Fully folded, the outer layer strains <strong>±${pk(left)}%</strong> with the stiff adhesive and <strong>±${pk(right)}%</strong> with this one. ` +
      `In this model the stack splits into three neutral planes below about <strong>${Math.round(right.Gcrit).toLocaleString('en-US')} kPa</strong>.`;
  }

  const FOLD = 2200, HOLD = 700, CYCLE = 2 * (FOLD + HOLD);
  const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);
  function tick(ts) {
    if (!playing) return;
    if (visible) {
      if (!t0) t0 = ts;
      const p = (ts - t0) % CYCLE;
      let f;
      if (p < FOLD) f = ease(p / FOLD);
      else if (p < FOLD + HOLD) f = 1;
      else if (p < 2 * FOLD + HOLD) f = 1 - ease((p - FOLD - HOLD) / FOLD);
      else f = 0;
      state.th = 180 * f;
      refresh();
    }
    raf = requestAnimationFrame(tick);
  }
  function setPlay(on) {
    playing = on; t0 = 0;
    play.setAttribute('aria-pressed', String(on));
    play.textContent = on ? 'Stop' : 'Play folding';
    cancelAnimationFrame(raf);
    if (on) raf = requestAnimationFrame(tick);
  }
  play.addEventListener('click', () => setPlay(!playing));
  if ('IntersectionObserver' in window) new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(canvas);

  for (const el of inputs) {
    el.addEventListener('input', (e) => {
      const k = el.dataset.in;
      state[k] = Number(e.target.value);
      if (k === 'th') setPlay(false); else if (k === 'g') state.preset = '';
      refresh();
    });
  }
  for (const b of pbtns) {
    b.addEventListener('click', () => { const p = PRESETS.find((q) => q.key === b.dataset.p); state.g = G2s(p.G); state.preset = p.key; refresh(); });
  }
  refresh();
}

export default mount;
