// 시뮬레이션(표지용 3D판) — 같은 판 세 장을 단단한 점착층과 무른 점착층으로 붙여 접으면 무엇이 달라지나.
// 클레임의 adhesive-neutral-plane-demo 와 같은 계산을 쓴다. solve 를 그 파일에서 가져오므로 숫자는 한 곳에서만 나온다.
//
// 이 파일이 더한 것은 그림뿐이다.
// - 접힌 단면을 폴딩축 방향으로 밀어 실제 판처럼 보이게 했다(사선 투영). 앞면이 절단면이다.
// - 중립면은 판 내부에 있으므로 절단면 위의 선으로만 그린다(2026-11-09 대표 지적). 1개와 3개의 차이가 표지의 주제다.
// - 판 끝의 계단(어긋남)은 윗면에서 보인다.
//
// 모델과 한계는 원본 주석과 같다(부분 합성보, 선형 탄성, 크리프·온도 곡선·들뜸·피로 없음).
// 층 두께와 끝 어긋남은 보이도록 키웠다. 폴딩축 방향으로는 변형이 같다고 둔다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';
import { solve } from './adhesive-neutral-plane-demo.js';

const W = 620;
const H = 460;
const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';
const INK = '#f4f4ef';
const BG = '#101418';
const ADH = [255, 166, 0];
const NP = '#00c853';
const STEEL = [240, 241, 236]; // 변형 0의 색. 양끝 파랑·빨강과 뚜렷이 갈리도록 흰색 쪽으로 둔다
const HOT = [240, 40, 30];
const COLD = [20, 95, 255];
const EM_PCT = 6.5;
const G_STIFF = 10000;
const R_MM = 3;
const T_UM = 25;
const PLATE_UM = 100;

const DX = 66;
const DY = -42;
const DN = Math.hypot(DX, DY);

const PRESETS = [
  { key: 'a', label: 'Example 1, 25 °C: 64 kPa', G: 64 },
  { key: 'b', label: 'Example 1, −20 °C: 88 kPa', G: 88 },
  { key: 'c', label: 'Comparative 2, 25 °C: 84 kPa', G: 84 },
  { key: 'd', label: 'Comparative 2, −20 °C: 4,053 kPa', G: 4053 },
];
const GMIN = 10;
const GMAX = 10000;
const s2G = (v) => GMIN * (GMAX / GMIN) ** (v / 1000);
const G2s = (g) => Math.round((1000 * Math.log10(g / GMIN)) / Math.log10(GMAX / GMIN));

function heat(e) {
  const a = Math.min(1, Math.abs(e) / EM_PCT);
  const c = e > 0 ? HOT : COLD;
  return STEEL.map((v, i) => v + (c[i] - v) * a);
}
const css = (c, f = 1) => `rgb(${c.map((v) => Math.round(Math.min(255, v * f))).join(',')})`;

// 접힌 곡선. 가운데 바닥을 고정하고 양쪽이 올라온다. o 는 바깥쪽(+) 거리(px).
function curve(cx, by, Rpx, th, o, tail, extra) {
  const Lpx = Math.PI * Rpx;
  const half = th / 2;
  const R = th > 1e-3 ? Lpx / th : 1e9;
  const n = 30;
  const out = [];
  const at = (a) => [cx + (R + o) * Math.sin(a), by - R * (1 - Math.cos(a)) + o * Math.cos(a)];
  for (let i = 0; i <= n; i++) {
    const u = -1 + (2 * i) / n;
    const p = th > 1e-3 ? at(u * half) : [cx + (u * Lpx) / 2, by + o];
    out.push({ x: p[0], y: p[1], u, arc: true });
  }
  const first = out[0];
  const last = out[n];
  const dirR = [Math.cos(half), -Math.sin(half)];
  const dirL = [-Math.cos(half), -Math.sin(half)];
  const len = tail + extra;
  const steps = 3;
  const left = [];
  const right = [];
  for (let k = steps; k >= 1; k--) left.push({ x: first.x + (dirL[0] * len * k) / steps, y: first.y + (dirL[1] * len * k) / steps, u: -1, arc: false });
  for (let k = 1; k <= steps; k++) right.push({ x: last.x + (dirR[0] * len * k) / steps, y: last.y + (dirR[1] * len * k) / steps, u: 1, arc: false });
  return [...left, ...out, ...right];
}

function pill(ctx, s, x, y, col = INK, size = 13, align = 'center') {
  ctx.font = `700 ${size}px ${FONT}`;
  const w = ctx.measureText(s).width;
  const pad = 6;
  const h = size + 9;
  const left = align === 'left' ? x : align === 'right' ? x - w - pad * 2 : x - w / 2 - pad;
  ctx.fillStyle = 'rgba(8,11,14,.82)';
  ctx.beginPath();
  ctx.roundRect(left, y - h / 2, w + pad * 2, h, 5);
  ctx.fill();
  ctx.fillStyle = col;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(s, left + pad, y + 1);
}

export function mount(container, params = {}) {
  const state = { g: G2s(Number(params.G) || 64), th: Number(params.th) || 180, preset: params.G ? '' : 'a' };
  let playing = false;
  let raf = 0;
  let t0 = 0;
  let visible = true;

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Same three layers, folded: one neutral plane or three.</span>
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
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>`;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inputs = [...container.querySelectorAll('[data-in]')];
  const pbtns = [...container.querySelectorAll('[data-p]')];
  const play = container.querySelector('[data-play]');

  function quad(pts, fill) {
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = fill;
    ctx.lineWidth = 0.8;
    ctx.fill();
    ctx.stroke();
  }

  function drawStack(cx, by, r, th) {
    const Rpx = 62;
    const PX = 0.16;
    const tail = 66;
    const hp = PLATE_UM * PX;
    const tp = Math.max(3.4, T_UM * PX);
    const pitch = hp + tp;
    const kap = (th / Math.PI) * r.fin;
    const stag = Math.min(20, r.slip * 0.12) * (th / Math.PI);
    const faces = [];
    const front = [];
    const tips = [];

    // 층을 안쪽부터 바깥쪽 순서로 훑는다. kind: 판(i) 또는 점착층
    const layers = [
      { off: -pitch, half: hp / 2, i: -1, dt: stag },
      { off: -pitch / 2, half: tp / 2, adh: true, dt: stag / 2 },
      { off: 0, half: hp / 2, i: 0, dt: 0 },
      { off: pitch / 2, half: tp / 2, adh: true, dt: -stag / 2 },
      { off: pitch, half: hp / 2, i: 1, dt: -stag },
    ];

    const strainAt = (l, zf, q) => (q.arc ? kap * (zf * r.h + l.i * r.etaAt(q.u) * r.d) * 100 : 0);

    for (const l of layers) {
      const inner = curve(cx, by, Rpx, th, l.off - l.half, tail, l.dt);
      const outer = curve(cx, by, Rpx, th, l.off + l.half, tail, l.dt);
      for (let m = 0; m < inner.length - 1; m++) {
        for (const [c, sign, zf] of [[outer, 1, 0.5], [inner, -1, -0.5]]) {
          const a = c[m];
          const b = c[m + 1];
          const ia = inner[m];
          const oa = outer[m];
          let nx = (oa.x - ia.x) * sign;
          let ny = (oa.y - ia.y) * sign;
          const nl = Math.hypot(nx, ny) || 1;
          nx /= nl;
          ny /= nl;
          if (nx * DX + ny * DY <= 0) continue;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const base = l.adh ? ADH : heat(strainAt(l, zf, { arc: a.arc && b.arc, u: (a.u + b.u) / 2 }));
          const lit = 0.8 + 0.28 * Math.max(0, nx * -0.35 + ny * -0.94);
          faces.push({ key: (mx * DX + my * DY) / DN, pts: [[a.x, a.y], [b.x, b.y], [b.x + DX, b.y + DY], [a.x + DX, a.y + DY]], fill: css(base, lit) });
        }
      }
      // 판 끝면
      for (const m of [0, inner.length - 1]) {
        const ia = inner[m];
        const oa = outer[m];
        const other = inner[m === 0 ? 1 : m - 1];
        let nx = ia.x - other.x;
        let ny = ia.y - other.y;
        const nl = Math.hypot(nx, ny) || 1;
        nx /= nl;
        ny /= nl;
        if (nx * DX + ny * DY <= 0) continue;
        const mx = (ia.x + oa.x) / 2;
        const my = (ia.y + oa.y) / 2;
        faces.push({ key: (mx * DX + my * DY) / DN + 0.5, pts: [[ia.x, ia.y], [oa.x, oa.y], [oa.x + DX, oa.y + DY], [ia.x + DX, ia.y + DY]], fill: css(l.adh ? ADH : STEEL, 1) });
      }
      if (l.adh) tips.push([(inner[0].x + outer[0].x) / 2, (inner[0].y + outer[0].y) / 2]);
      front.push({ l, inner, outer });
    }

    faces.sort((a, b) => a.key - b.key);
    for (const f of faces) quad(f.pts, f.fill);

    // 절단면(가장 앞)
    const SUB = 6;
    for (const { l, inner, outer } of front) {
      if (l.adh) {
        for (let m = 0; m < inner.length - 1; m++) {
          quad([[inner[m].x, inner[m].y], [inner[m + 1].x, inner[m + 1].y], [outer[m + 1].x, outer[m + 1].y], [outer[m].x, outer[m].y]], css(ADH));
        }
        continue;
      }
      for (let j = 0; j < SUB; j++) {
        const f0 = j / SUB;
        const f1 = (j + 1) / SUB;
        const zf = (f0 + f1) / 2 - 0.5;
        for (let m = 0; m < inner.length - 1; m++) {
          const P = (q, f) => [inner[q].x + (outer[q].x - inner[q].x) * f, inner[q].y + (outer[q].y - inner[q].y) * f];
          const u = (inner[m].u + inner[m + 1].u) / 2;
          quad([P(m, f0), P(m + 1, f0), P(m + 1, f1), P(m, f1)], css(heat(strainAt(l, zf, { arc: inner[m].arc && inner[m + 1].arc, u }))));
        }
      }
    }

    // 중립면: 내부의 면이라 절단면에 선으로만 드러난다
    if (th > 0.05) {
      for (const l of layers) {
        if (l.adh) continue;
        const n = 30;
        let run = [];
        const flush = () => {
          if (run.length > 1) {
            ctx.strokeStyle = NP;
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            run.forEach((p, k) => (k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
            ctx.stroke();
          }
          run = [];
        };
        for (let m = 0; m <= n; m++) {
          const u = -1 + (2 * m) / n;
          const z0 = -l.i * r.etaAt(u) * r.d;
          if (Math.abs(z0) < r.h / 2) {
            const c = curve(cx, by, Rpx, th, l.off + (z0 / r.h) * hp, tail, 0);
            run.push([c[m + 3].x, c[m + 3].y]);
          } else flush();
        }
        flush();
      }
    }
    return tips;
  }

  function draw() {
    const G = s2G(state.g);
    const th = (state.th * Math.PI) / 180;
    const left = solve(G_STIFF, R_MM, T_UM);
    const right = solve(G, R_MM, T_UM);
    const f = th / Math.PI;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    // 펴지면 가로로 길어지므로 카메라를 조금 물러나게 해서 두 적층이 잘리지 않게 한다
    const zoom = 0.72 + 0.28 * f * f;
    const by = 306 - (1 - f) * 56;
    const place = (px, cx, r) => {
      ctx.save();
      ctx.translate(px, by);
      ctx.scale(zoom, zoom);
      ctx.translate(-px, -by);
      const tips = drawStack(cx, by, r, th);
      ctx.restore();
      // 점착층 두 겹의 왼쪽 끝을 가리키는 라벨. 글자는 확대·축소하지 않는다
      const T = tips.map((q) => [px + (q[0] - px) * zoom, by + (q[1] - by) * zoom]);
      const lx = Math.max(48, Math.min(W - 48, (T[0][0] + T[1][0]) / 2));
      const ly = Math.min(T[0][1], T[1][1]) - 32 - (1 - f) * 54;
      ctx.strokeStyle = css(ADH);
      ctx.lineWidth = 1.8;
      for (const q of T) {
        ctx.beginPath();
        ctx.moveTo(lx, ly + 8);
        ctx.lineTo(q[0], q[1]);
        ctx.stroke();
      }
      pill(ctx, 'Adhesive', lx, ly, css(ADH), 15);
    };
    place(166, 132, left);
    place(476, 442, right);

    const label = (cx, r, name) => {
      pill(ctx, name, cx, 26, INK, 15);
      pill(ctx, r.planes === 1 ? '1 neutral plane' : `${r.planes} neutral planes`, cx, 58, NP, 20);
      const peak = f * r.fin * (r.h / 2 + r.eta * r.d) * 100;
      pill(ctx, `Peak layer strain ±${peak.toFixed(1)}%`, cx, 388, INK, 17);
    };
    label(166, left, 'Stiff adhesive, 10,000 kPa');
    label(476, right, `Adhesive ${G >= 100 ? Math.round(G).toLocaleString('en-US') : Math.round(G)} kPa`);

    // 범례(평면)
    const lx = W / 2 - 110;
    const ly = H - 30;
    const g = ctx.createLinearGradient(lx, 0, lx + 220, 0);
    g.addColorStop(0, css(COLD));
    g.addColorStop(0.5, css(STEEL));
    g.addColorStop(1, css(HOT));
    ctx.fillStyle = g;
    ctx.fillRect(lx, ly, 220, 9);
    ctx.font = `700 13px ${FONT}`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText('Compressed', lx - 8, ly + 5);
    ctx.textAlign = 'left';
    ctx.fillText('Stretched', lx + 228, ly + 5);
    ctx.textAlign = 'center';
    ctx.fillText('Schematic: layer thickness and end slip enlarged', W / 2, ly - 12);
    ctx.fillText('No strain', W / 2, ly + 20);
    return { left, right };
  }

  function refresh() {
    const G = s2G(state.g);
    for (const el of inputs) {
      const k = el.dataset.in;
      el.value = String(state[k]);
      out(k).textContent = k === 'g' ? (G >= 100 ? Math.round(G).toLocaleString('en-US') : G.toFixed(0)) : String(Math.round(state.th));
    }
    for (const b of pbtns) b.setAttribute('aria-pressed', String(b.dataset.p === state.preset));
    const { left, right } = draw();
    const pk = (r) => (r.fin * (r.h / 2 + r.eta * r.d) * 100).toFixed(1);
    out('readout').innerHTML =
      `Fully folded, the outer layer strains <strong>±${pk(left)}%</strong> with the stiff adhesive and <strong>±${pk(right)}%</strong> with this one. ` +
      `In this model the stack splits into three neutral planes below about <strong>${Math.round(right.Gcrit).toLocaleString('en-US')} kPa</strong>.`;
  }

  // 표지 첫 장면이 완전히 접힌 상태가 되도록 접힌 채 머무는 구간부터 시작한다
  const FOLD = 2400;
  const HOLD = 2200;
  const CYCLE = 2 * (FOLD + HOLD);
  const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);
  function tick(ts) {
    if (!playing) return;
    if (visible) {
      if (!t0) t0 = ts;
      const p = (ts - t0) % CYCLE;
      let k = 1;
      if (p < HOLD) k = 1;
      else if (p < HOLD + FOLD) k = 1 - ease((p - HOLD) / FOLD);
      else if (p < 2 * HOLD + FOLD) k = 0;
      else k = ease((p - 2 * HOLD - FOLD) / FOLD);
      state.th = 180 * k;
      refresh();
    }
    raf = requestAnimationFrame(tick);
  }
  function setPlay(on) {
    playing = on;
    t0 = 0;
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
      if (k === 'th') setPlay(false);
      else state.preset = '';
      refresh();
    });
  }
  for (const b of pbtns) {
    b.addEventListener('click', () => { const p = PRESETS.find((q) => q.key === b.dataset.p); state.g = G2s(p.G); state.preset = p.key; refresh(); });
  }
  refresh();
  const still = navigator.webdriver || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (params.autoplay !== false && !still) setPlay(true);
}

export default mount;
