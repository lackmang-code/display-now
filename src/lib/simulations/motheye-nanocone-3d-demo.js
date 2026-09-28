// 시뮬레이션 — 모스아이 나노 돌기를 실제 비율 그대로 3D 로 그리고,
// 높이마다 수지와 공기가 얼마씩 섞이는지(평균 굴절률 경사)를 형상에서 곧바로 계산한다.
// 기름이 돌기 사이를 채우면 그 경사가 어떻게 사라지는지를 본다.
//
// 모델과 한계
// - 돌기는 육각 배열이다. 한 돌기의 높이 함수는 원뿔 / 포물면 / 사인(코사인 종) 셋 중 하나이고,
//   밑면 반지름은 피치의 절반에 「밑면 채움」 배율을 곱한다. 이웃 돌기와 겹치는 자리는 더 높은 쪽을 쓴다.
// - 높이별 수지 비율은 표본점 가운데 그 높이보다 높은 점의 비율로 셈한다. 형상만으로 정해지는 값이다.
// - 오른쪽 곡선의 평균 굴절률은 수지 비율로 수지(1.52)와 틈(공기 1.00 또는 기름 1.47)을 선형으로 섞어 그린다.
// - 반사율은 같은 수지 비율 곡선을 80층으로 잘라 0차 유효매질로 계산한다.
//   TE 는 유전율의 평행 평균 f·εr + (1-f)·εg, TM 은 직렬 평균 1/(f/εr + (1-f)/εg) 이고
//   수직입사 전달행렬로 두 편광의 반사율을 각각 구해 평균한 뒤 CIE V(λ)·D65 로 명소시 반사율 Y 를 낸다.
//   맞추기 위한 조정 상수는 없다. 이 모델을 정한 뒤에 제품과 비교했다.
// 🔴 경위(2026-09-17). 처음에는 굴절률 곡선을 5차식으로 「가정」해 높이 200nm 에서 1.3% 가 나왔고,
//   MOSMITE 실측 0.1~0.2% 와 맞지 않아 반사율을 뺐다. 형상에서 곡선을 직접 뽑자 포물면·밑면 맞닿음에서
//   0.13% 가 나왔다. 틀린 것은 모델 전체가 아니라 임의로 둔 곡선 모양이었다. 원뿔이면 0.69% 다.
// - 기름은 채운 높이 아래 틈만 1.47 로 바꾼다. 기름 위에 따로 얹힌 두꺼운 막은 넣지 않았다.
// - 회절 판정은 「피치 × 기재 굴절률 1.5 보다 짧은 파장에서 회절이 생긴다」는 근사로 한다.
// - 높이는 과장하지 않았다. 가로와 세로가 같은 척도다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙). 표지 규칙에 따라 원색·13px 굵게·받침을 쓴다.

import { hidpi } from './_hidpi.js';

// 🔴 표지 무대 안쪽 폭은 704px 이고 시뮬 몸통 좌우 여백이 40px 이라 캔버스는 664px 이하여야 한다.
// 620px 로 두면 본문(678px 칸, 안쪽 638px)과 표지 모두 넘치지 않는다. 슬라이더는 flex 로 아래로 내려간다.
const LAYOUT = {
  article: { W: 620, H: 420, N: 110 },
  cover: { W: 620, H: 420, N: 168 },
};

const N_RESIN = 1.52;
const N_AIR = 1.0;
const N_OIL = 1.47;

const PRESETS = {
  mosmite: { pitch: 100, height: 200, shape: 'parabolic', base: 1.0 },
  pmma: { pitch: 290, height: 350, shape: 'sine', base: 1.0 },
};

const WL = [];
for (let w = 400; w <= 700; w += 10) WL.push(w);
const V = [0.0004, 0.0012, 0.004, 0.0116, 0.023, 0.038, 0.06, 0.091, 0.139, 0.208, 0.323, 0.503, 0.71, 0.862, 0.954, 0.995, 0.995, 0.952, 0.87, 0.757, 0.631, 0.503, 0.381, 0.265, 0.175, 0.107, 0.061, 0.032, 0.017, 0.0082, 0.0041];
const D65 = [82.75, 91.49, 93.43, 86.68, 104.86, 117.01, 117.81, 114.86, 115.92, 108.81, 109.35, 107.8, 104.79, 107.69, 104.41, 104.05, 100.0, 96.33, 95.79, 88.69, 90.01, 89.6, 87.7, 83.29, 83.7, 80.03, 80.21, 82.28, 78.28, 69.72, 71.61];
const WSUM = V.reduce((a, v, i) => a + v * D65[i], 0);

// 실수 굴절률 층들(공기쪽부터)의 수직입사 반사율. 기판은 수지.
function stackR(ns, d, lam) {
  let m11r = 1, m11i = 0, m12r = 0, m12i = 0, m21r = 0, m21i = 0, m22r = 1, m22i = 0;
  for (const n of ns) {
    const p = (2 * Math.PI * n * d) / lam;
    const c = Math.cos(p), sn = Math.sin(p);
    const a11r = m11r * c - m12i * n * sn, a11i = m11i * c + m12r * n * sn;
    const a12r = -m11i * (sn / n) + m12r * c, a12i = m11r * (sn / n) + m12i * c;
    const a21r = m21r * c - m22i * n * sn, a21i = m21i * c + m22r * n * sn;
    const a22r = -m21i * (sn / n) + m22r * c, a22i = m21r * (sn / n) + m22i * c;
    m11r = a11r; m11i = a11i; m12r = a12r; m12i = a12i;
    m21r = a21r; m21i = a21i; m22r = a22r; m22i = a22i;
  }
  const nsub = N_RESIN;
  const Br = m11r + m12r * nsub, Bi = m11i + m12i * nsub;
  const Cr = m21r + m22r * nsub, Ci = m21i + m22i * nsub;
  const nr = Br - Cr, ni = Bi - Ci, dr = Br + Cr, di = Bi + Ci;
  return (nr * nr + ni * ni) / (dr * dr + di * di);
}

// 한 돌기의 높이 함수: r 은 돌기 중심에서의 거리, R 은 밑면 반지름. 0..1 을 돌려준다.
function profile(shape, r, R) {
  if (r >= R) return 0;
  const u = r / R;
  if (shape === 'cone') return 1 - u;
  if (shape === 'parabolic') return 1 - u * u;
  return 0.5 * (1 + Math.cos(Math.PI * u)); // sine
}

export function mount(container, params = {}) {
  const COVER = !!params.cover;
  const L = LAYOUT[COVER ? 'cover' : 'article'];
  const { W, H, N } = L;

  const state = {
    ...PRESETS.mosmite,
    ...(params.preset && PRESETS[params.preset] ? PRESETS[params.preset] : {}),
    oil: params.oil ?? 0,
    view: params.view ?? 32,
  };

  // 🔴 캔버스가 620px로 다른 시뮬(대개 440px)보다 훨씬 넓어, 본문 폭(760px) 안에서는
  // 컨트롤이 캔버스 옆에 못 붙고 전부 캔버스 아래로 한 줄씩 쌓인다(sim.css 공용 레이아웃).
  // 컨트롤이 7개라 세로로 아주 길어지고, 슬라이더를 움직이는 동안 캔버스가 화면 밖으로
  // 밀려나 변화가 안 보이는 문제가 생겼다(2026-09-28 대표 지적). 캔버스 크기는 그대로 두고
  // 컨트롤만 2열 그리드로 접어 세로 길이를 절반 가까이 줄인다 — 이 시뮬에만 적용된다.
  container.innerHTML = `
    <style>
      .sim-controls.motheye-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 18px; }
      .sim-controls.motheye-grid .sim-readout { grid-column: 1 / -1; }
      @media (max-width: 480px) { .sim-controls.motheye-grid { grid-template-columns: 1fr; } }
    </style>
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Moth-eye at true scale: the cones become a gradual mix of air and resin</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls motheye-grid">
        <div class="sim-control">
          <label>Start from</label>
          <div class="sim-toggle-group" data-in="preset">
            <button type="button" class="sim-toggle-btn" data-val="mosmite" aria-pressed="true">100/200 nm</button>
            <button type="button" class="sim-toggle-btn" data-val="pmma" aria-pressed="false">290/350 nm mold</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Pitch <span data-out="pitch"></span> nm</label>
          <input type="range" min="60" max="400" step="5" data-in="pitch" />
        </div>
        <div class="sim-control">
          <label>Height <span data-out="height"></span> nm</label>
          <input type="range" min="40" max="400" step="5" data-in="height" />
        </div>
        <div class="sim-control">
          <label>Base fill <span data-out="base"></span>x half-pitch</label>
          <input type="range" min="0.8" max="1.2" step="0.01" data-in="base" />
        </div>
        <div class="sim-control">
          <label>Cone shape</label>
          <div class="sim-toggle-group" data-in="shape">
            <button type="button" class="sim-toggle-btn" data-val="cone" aria-pressed="false">Cone</button>
            <button type="button" class="sim-toggle-btn" data-val="parabolic" aria-pressed="true">Parabolic</button>
            <button type="button" class="sim-toggle-btn" data-val="sine" aria-pressed="false">Sine</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Oil filling the gaps <span data-out="oil"></span>%</label>
          <input type="range" min="0" max="100" step="1" data-in="oil" />
        </div>
        <div class="sim-control">
          <label>View angle <span data-out="view"></span>&deg;</label>
          <input type="range" min="0" max="80" step="1" data-in="view" />
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
  const shapeBtns = [...container.querySelectorAll('[data-in="shape"] button')];

  const heights = new Float32Array(N * N);
  const sorted = new Float32Array(N * N);
  const PERIODS = 5.5; // 화면에 담는 피치 수 (척도는 피치에 따라 바뀐다)

  function build() {
    const p = state.pitch, Hn = state.height, R = (p / 2) * state.base;
    const F = PERIODS * p;
    const rowH = (p * Math.sqrt(3)) / 2;
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const x = (i / (N - 1) - 0.5) * F;
        const y = (j / (N - 1) - 0.5) * F;
        const jj = Math.round(y / rowH);
        let best = 0;
        for (let dj = -1; dj <= 1; dj++) {
          const row = jj + dj;
          const off = ((row % 2) + 2) % 2 === 1 ? p / 2 : 0;
          const ii = Math.round((x - off) / p);
          for (let di = -1; di <= 1; di++) {
            const cx = (ii + di) * p + off, cy = row * rowH;
            const v = profile(state.shape, Math.hypot(x - cx, y - cy), R);
            if (v > best) best = v;
          }
        }
        heights[j * N + i] = best * Hn;
      }
    }
    sorted.set(heights);
    sorted.sort();
  }

  // 높이 z 에서 수지가 차지하는 비율
  function resinFraction(z) {
    // sorted 에서 z 이상인 개수
    let lo = 0, hi = sorted.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sorted[mid] < z) lo = mid + 1;
      else hi = mid;
    }
    return (sorted.length - lo) / sorted.length;
  }

  // 형상에서 뽑은 수지 비율 곡선으로 명소시 반사율 Y(%) 를 예측한다
  const LAYERS = 80;
  function predictY() {
    const Hn = state.height, oilZ = (state.oil / 100) * Hn, d = Hn / LAYERS;
    const er = N_RESIN * N_RESIN;
    const nTE = [], nTM = [];
    for (let k = LAYERS - 1; k >= 0; k--) {
      const z = ((k + 0.5) / LAYERS) * Hn; // 공기쪽(위)부터 쌓는다
      const f = resinFraction(z);
      const ng = z < oilZ ? N_OIL : N_AIR;
      const eg = ng * ng;
      nTE.push(Math.sqrt(f * er + (1 - f) * eg));
      nTM.push(Math.sqrt(1 / (f / er + (1 - f) / eg)));
    }
    let acc = 0;
    WL.forEach((lam, i) => {
      const r = 0.5 * (stackR(nTE, d, lam) + stackR(nTM, d, lam));
      acc += r * V[i] * D65[i];
    });
    return (acc / WSUM) * 100;
  }
  let lastY = 0;

  // ---------- 그리기 ----------
  const PLOT3D = { x0: 0, x1: 430 };
  const PANEL = { x0: 448, x1: W - 14, t: 70, b: H - 58 };

  function label(text, x, y, color, align) {
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    const w = ctx.measureText(text).width;
    const bx = align === 'right' ? x - w - 6 : align === 'center' ? x - w / 2 - 6 : x - 6;
    ctx.fillStyle = 'rgba(8,8,10,0.72)';
    const r = 5, bw = w + 12, bh = 20, by = y - 10;
    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
    ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
    ctx.arcTo(bx, by + bh, bx, by, r);
    ctx.arcTo(bx, by, bx + bw, by, r);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  function draw3D() {
    const p = state.pitch, Hn = state.height;
    const F = PERIODS * p;
    const oilZ = (state.oil / 100) * Hn;
    const elev = ((90 - state.view) * Math.PI) / 180; // 0: 옆에서, 90: 위에서
    const az = (28 * Math.PI) / 180;
    const ca = Math.cos(az), sa = Math.sin(az);
    const S = (PLOT3D.x1 - PLOT3D.x0 - 30) / (F * 1.414);
    const cx = (PLOT3D.x0 + PLOT3D.x1) / 2;
    const cy = H * 0.56;
    const sinE = Math.sin(elev), cosE = Math.cos(elev);

    const proj = (x, y, z) => {
      const xr = x * ca - y * sa;
      const yr = x * sa + y * ca;
      return [cx + xr * S, cy + yr * S * cosE - z * S * sinE, yr];
    };

    const light = [-0.45, -0.55, 0.7];
    const ll = Math.hypot(...light);
    light[0] /= ll; light[1] /= ll; light[2] /= ll;

    const quads = [];
    const sp = F / (N - 1);
    for (let j = 0; j < N - 1; j++) {
      for (let i = 0; i < N - 1; i++) {
        const k00 = j * N + i, k10 = k00 + 1, k01 = k00 + N, k11 = k01 + 1;
        const h00 = heights[k00], h10 = heights[k10], h01 = heights[k01], h11 = heights[k11];
        const hm = (h00 + h10 + h01 + h11) / 4;
        const isOil = oilZ > 0 && hm < oilZ;
        const z00 = Math.max(h00, oilZ), z10 = Math.max(h10, oilZ), z01 = Math.max(h01, oilZ), z11 = Math.max(h11, oilZ);
        const x0 = (i / (N - 1) - 0.5) * F, x1 = ((i + 1) / (N - 1) - 0.5) * F;
        const y0 = (j / (N - 1) - 0.5) * F, y1 = ((j + 1) / (N - 1) - 0.5) * F;
        const a = proj(x0, y0, z00), b = proj(x1, y0, z10), c = proj(x1, y1, z11), d = proj(x0, y1, z01);
        // 법선
        let nx = -((z10 + z11) - (z00 + z01)) / (2 * sp);
        let ny = -((z01 + z11) - (z00 + z10)) / (2 * sp);
        let nz = 1;
        const nl = Math.hypot(nx, ny, nz);
        nx /= nl; ny /= nl; nz /= nl;
        const lam = Math.max(0, nx * light[0] + ny * light[1] + nz * light[2]);
        // 반사 하이라이트 (보는 쪽은 위)
        const hx = light[0], hy = light[1] - 0.6, hz = light[2] + 1;
        const hl = Math.hypot(hx, hy, hz);
        const spec = Math.pow(Math.max(0, (nx * hx + ny * hy + nz * hz) / hl), isOil ? 60 : 28);
        const mx = (a[0] + b[0] + c[0] + d[0]) / 4, my = (a[1] + b[1] + c[1] + d[1]) / 4;
        const grow = (v) => {
          const dx = v[0] - mx, dy = v[1] - my, dl = Math.hypot(dx, dy) || 1;
          return [v[0] + (dx / dl) * 0.4, v[1] + (dy / dl) * 0.4];
        };
        quads.push({ depth: (a[2] + c[2]) / 2, a: grow(a), b: grow(b), c: grow(c), d: grow(d), lam, spec, t: hm / Hn, isOil });
      }
    }
    quads.sort((q1, q2) => q1.depth - q2.depth);

    for (const q of quads) {
      let r, g, bl;
      if (q.isOil) {
        // 기름: 원색 주황
        const s = 0.55 + 0.45 * q.lam;
        r = 255 * s; g = 140 * s; bl = 26 * s;
        r += q.spec * 200; g += q.spec * 190; bl += q.spec * 160;
      } else {
        // 수지: 뿌리 쪽 짙은 주황 → 끝 쪽 밝은 노랑(2026-09-28 대표 지시 — 청색 계열이 표지에서
        // 잘 안 보여 원색 주황·노랑으로 바꿨다. 명암 계산은 그대로, 색상만 바꿨다).
        // 🔴 표지는 그중에서도 더 강렬하게(같은 날 추가 지시) — 파란기를 완전히 빼고
        // 채도를 올린다. 본문(article)은 처음 바꾼 색 그대로 둔다.
        const t = q.t;
        const base = COVER
          ? [225 + 30 * t, 90 + 130 * t, 0 + 10 * t]
          : [200 + 55 * t, 110 + 90 * t, 15 + 15 * t];
        const s = 0.4 + 0.75 * q.lam;
        const specR = COVER ? 245 : 235, specG = COVER ? 235 : 225, specB = COVER ? 90 : 140;
        r = base[0] * s + q.spec * specR;
        g = base[1] * s + q.spec * specG;
        bl = base[2] * s + q.spec * specB;
      }
      ctx.fillStyle = `rgb(${Math.min(255, r) | 0},${Math.min(255, g) | 0},${Math.min(255, bl) | 0})`;
      ctx.beginPath();
      ctx.moveTo(q.a[0], q.a[1]);
      ctx.lineTo(q.b[0], q.b[1]);
      ctx.lineTo(q.c[0], q.c[1]);
      ctx.lineTo(q.d[0], q.d[1]);
      ctx.closePath();
      ctx.fill();
    }

    // 앞쪽 두 면(y 최대 줄, x 최대 열)에 기판 단면 벽을 세운다. 가장 가까운 면이라 마지막에 그린다.
    const T = Hn * 0.28;
    const wall = (pts, shade) => {
      ctx.beginPath();
      pts.forEach((pt, k) => (k === 0 ? ctx.moveTo(pt[0], pt[1]) : ctx.lineTo(pt[0], pt[1])));
      ctx.closePath();
      const top = Math.min(...pts.map((pt) => pt[1]));
      const bot = Math.max(...pts.map((pt) => pt[1]));
      const gr = ctx.createLinearGradient(0, top, 0, bot);
      // 표지는 더 강렬하게 — 하이라이트는 순수 노랑에 가깝게, 그림자는 붉은기를 남긴다
      if (COVER) {
        gr.addColorStop(0, `rgba(${255 * shade | 0},${225 * shade | 0},${30 * shade | 0},1)`);
        gr.addColorStop(1, `rgba(${140 * shade | 0},${35 * shade | 0},${0 * shade | 0},1)`);
      } else {
        gr.addColorStop(0, `rgba(${255 * shade | 0},${200 * shade | 0},${70 * shade | 0},1)`);
        gr.addColorStop(1, `rgba(${110 * shade | 0},${55 * shade | 0},${10 * shade | 0},1)`);
      }
      ctx.fillStyle = gr;
      ctx.fill();
    };
    {
      const pts = [];
      for (let i = 0; i < N; i++) {
        const x = (i / (N - 1) - 0.5) * F, y = F / 2;
        pts.push(proj(x, y, Math.max(heights[(N - 1) * N + i], oilZ)));
      }
      pts.push(proj(F / 2, F / 2, -T), proj(-F / 2, F / 2, -T));
      wall(pts, 0.78);
    }
    {
      const pts = [];
      for (let j = 0; j < N; j++) {
        const x = F / 2, y = (j / (N - 1) - 0.5) * F;
        pts.push(proj(x, y, Math.max(heights[j * N + N - 1], oilZ)));
      }
      pts.push(proj(F / 2, F / 2, -T), proj(F / 2, -F / 2, -T));
      wall(pts, 0.6);
    }
    if (oilZ > 0) {
      // 단면 벽에서 기름이 찬 높이를 주황 띠로 보여 준다
      ctx.strokeStyle = 'rgba(255,140,26,0.95)';
      ctx.lineWidth = 2;
      const e1 = proj(-F / 2, F / 2, oilZ), e2 = proj(F / 2, F / 2, oilZ), e3 = proj(F / 2, -F / 2, oilZ);
      ctx.beginPath();
      ctx.moveTo(e1[0], e1[1]);
      ctx.lineTo(e2[0], e2[1]);
      ctx.lineTo(e3[0], e3[1]);
      ctx.stroke();
    }

    // 척도 막대: 100nm (피치가 크면 200nm)
    const bar = p > 220 ? 200 : 100;
    const p1 = proj(-F / 2, F / 2 + p * 0.5, -T), p2 = proj(-F / 2 + bar, F / 2 + p * 0.5, -T);
    ctx.strokeStyle = 'rgba(255,255,255,0.92)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
    label(`${bar} nm`, (p1[0] + p2[0]) / 2, Math.max(p1[1], p2[1]) + 18, '#ffffff', 'center');
  }

  function drawPanel() {
    const { x0, x1, t, b } = PANEL;
    const nMin = 0.98, nMax = 1.56;
    const fxn = (n) => x0 + ((n - nMin) / (nMax - nMin)) * (x1 - x0);
    const Hn = state.height;
    const fyz = (z) => b - (z / Hn) * (b - t);
    const oilZ = (state.oil / 100) * Hn;

    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(x0 - 6, t - 8, x1 - x0 + 12, b - t + 16);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, t);
    ctx.lineTo(x0, b);
    ctx.lineTo(x1, b);
    ctx.stroke();

    [N_AIR, N_OIL, N_RESIN].forEach((n) => {
      ctx.strokeStyle = 'rgba(255,255,255,0.16)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(fxn(n), t);
      ctx.lineTo(fxn(n), b);
      ctx.stroke();
      ctx.setLineDash([]);
    });
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('1.0', fxn(1.0), b + 6);
    ctx.fillText('1.52', fxn(N_RESIN) - 6, b + 6);
    ctx.fillText('index', (x0 + x1) / 2, b + 24);

    // 굴절률 경사 곡선
    const steps = 80;
    let path = [];
    for (let s = 0; s <= steps; s++) {
      const z = (s / steps) * Hn;
      const f = resinFraction(z === 0 ? 1e-6 : z);
      const gap = z < oilZ ? N_OIL : N_AIR;
      path.push([fxn(f * N_RESIN + (1 - f) * gap), fyz(z)]);
    }
    // 돌기 위 공기
    ctx.strokeStyle = state.oil > 0 ? '#ff8c1a' : '#1fdc6a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    path.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();

    label('air 1.00', fxn(1.22), t + 6, '#ffffff', 'left');
    // 🔴 곡선은 바닥 근처에서 수지 쪽(오른쪽)으로 꺾여 x1,b(오른쪽 아래 모서리)에서 끝난다.
    // "resin" 라벨을 거기 두면 곡선 끝점·"1.52" 눈금과 겹치고(2026-09-28 대표 지적),
    // 위쪽(t+6)으로 옮기면 이번엔 "air 1.00" 라벨과 겹친다(둘 다 오른쪽으로 뻗는 글자라
    // 한 줄에서 마주친다 — 실측). 곡선이 지나지 않는 세로 중간, 수지 점선 위에 둔다.
    label('resin', x1 - 2, (t + b) / 2, '#ffffff', 'right');
    label(state.oil > 0 ? 'with oil' : 'graded', x0 + 6, t - 26, state.oil > 0 ? '#ff8c1a' : '#1fdc6a', 'left');
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0b0f18');
    g.addColorStop(1, '#050608');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    draw3D();
    drawPanel();

    label(`pitch ${state.pitch} nm  ·  height ${state.height} nm  ·  true scale`, 14, 22, '#ffffff', 'left');
    const yTxt = lastY < 1 ? lastY.toFixed(2) : lastY.toFixed(1);
    label(`predicted reflectance Y ${yTxt}%`, 14, 50, state.oil > 0 ? '#ff8c1a' : '#1fdc6a', 'left');
  }

  function refresh() {
    out('pitch').textContent = String(state.pitch);
    out('height').textContent = String(state.height);
    out('base').textContent = state.base.toFixed(2);
    out('oil').textContent = String(state.oil);
    out('view').textContent = String(state.view);
    inp('pitch').value = String(state.pitch);
    inp('height').value = String(state.height);
    inp('base').value = String(state.base);
    inp('oil').value = String(state.oil);
    inp('view').value = String(state.view);
    shapeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === state.shape)));

    build();
    lastY = predictY();
    draw();

    const aspect = state.height / state.pitch;
    const baseFill = resinFraction(1e-6) * 100;
    const diffLimit = Math.round(state.pitch * 1.5);
    const diffText = diffLimit < 380
      ? `no diffraction in visible (limit ${diffLimit} nm)`
      : `diffracts below ${diffLimit} nm`;
    out('readout').innerHTML =
      `predicted Y <strong>${lastY < 1 ? lastY.toFixed(2) : lastY.toFixed(1)}%</strong> (flat resin 4.26%)<br>` +
      `aspect ratio <strong>${aspect.toFixed(1)}</strong><br>` +
      `resin at base <strong>${baseFill.toFixed(0)}%</strong><br>` +
      `${diffText}<br>` +
      (state.oil > 0 ? `gaps below ${state.oil}% height hold oil 1.47` : 'gaps hold air 1.00');
  }

  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      refresh();
    });
  };

  ['pitch', 'height', 'base', 'oil', 'view'].forEach((k) => {
    inp(k).addEventListener('input', (e) => {
      state[k] = Number(e.target.value);
      if (k !== 'oil' && k !== 'view') presetBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      schedule();
    });
  });
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      Object.assign(state, PRESETS[btn.dataset.val]);
      presetBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      schedule();
    });
  });
  shapeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.shape = btn.dataset.val;
      presetBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      schedule();
    });
  });

  refresh();
}

export default mount;
