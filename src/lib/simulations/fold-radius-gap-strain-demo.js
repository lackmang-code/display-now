// 시뮬레이션 — 접히는 화면은 반지름 R로 굽는다. R이 작을수록 화면 바깥면이 많이 늘어나고(변형률 ≈ t / 2R), 펼친 뒤 주름이 깊다.
// 주름은 R이 정한다 — R이 같으면 U자든 물방울이든 주름도 같다.
// 물방울 힌지가 바꾸는 것은 접었을 때 두 쪽 사이의 틈이다. U자는 틈 2R이 남아 접은 두께가 몸체 두 장 + 2R,
// 물방울은 굽는 고리를 몸체 안에 넣어 두 쪽을 붙이므로 접은 두께가 몸체 두 장 그대로다.
// 왼쪽은 접히는 폰을 입체로 본 그림(펼치면 화면 앞면, 닫힐수록 옆 단면 쪽으로 돈다), 오른쪽은 R에 따른 접은 두께 그래프다.
//
// 모델과 한계
// - 몸체 한쪽 두께는 갤럭시 Z 폴드8의 펼친 두께 4.5 mm로 고정한다(삼성 공식 사양, 2026-07). 접은 공식 두께는 9.7 mm다.
// - U자 접힘의 틈 = 2R이고 두 쪽이 나란하다고 둔다(실제 U자형 폰은 힌지 쪽이 벌어진 쐐기 모양이다). 화면 두께는 무시한다.
// - 물방울은 두 쪽이 닿게 닫히고, 고리(지름 2R)가 접힌 몸체(4.5 × 2 mm) 안에 들어가야 한다고만 둔다. 목과 고리 모양의 세부는 넣지 않았다.
// - 변형률 ε = t / (2R + t)는 얇은 층 하나의 바깥면 값이다. 주름 깊이는 이 값에 비례하게 그린 그림이며 실측이 아니다.
// - 두께 슬라이더 범위 25~125 μm는 코닝 EP3099642(2014 우선)가 청구한 유리 두께 범위다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 460;

// 폴더블 연재 색표(Claim/폴더블연재_그림_색표.md)
const PANEL = '#e0559a';     // 패널 자홍(#be185d)을 어두운 바탕용으로 밝힌 값
const OK = '#1fdc6a';
const WARN = '#ffb020';
const BAD = '#ff5a5a';
const INK = '#f4f4ef';
const MUTE = '#b9b9b0';
const BG = '#101418';
const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';

const RMIN = 0.5, RMAX = 6;    // mm

const strain = (tUm, rMm) => (tUm / 1000) / (2 * rMm + tUm / 1000) * 100; // %

export function mount(container, params = {}) {
  const state = {
    mode: params.mode === 'drop' ? 'drop' : 'u',
    r: Number(params.r ?? 3),
    t: Number(params.t ?? 50),
    body: 4.5,   // 몸체 한쪽 두께(mm) — 갤럭시 Z 폴드8 펼친 두께
    fold: Number(params.fold ?? 100),
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>The bend radius sets the crease, whichever hinge you use. What the water-drop hinge changes is the gap: a U-fold leaves 2R between the halves, so the closed phone is thicker. Read the other way: at the same closed thickness, the water-drop can use a larger R, and a larger R leaves a shallower crease.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Fold shape</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-m="u">U-fold (gap)</button>
            <button type="button" class="sim-toggle-btn" data-m="drop">Water-drop</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Fold <span data-out="fold"></span> % (0 = open flat, 100 = closed)</label>
          <input type="range" min="0" max="100" step="1" data-in="fold" />
          <div class="sim-toggle-group"><button type="button" class="sim-toggle-btn" data-play>▶ Play animation: fold, then open</button></div>
        </div>
        <div class="sim-control">
          <label>Bend radius R <span data-out="r"></span> mm</label>
          <input type="range" min="${RMIN}" max="${RMAX}" step="0.1" data-in="r" />
        </div>
        <div class="sim-control">
          <label>Layer thickness t <span data-out="t"></span> μm (Corning claim 25–125)</label>
          <input type="range" min="25" max="125" step="5" data-in="t" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inputs = [...container.querySelectorAll('[data-in]')];
  const mbtns = [...container.querySelectorAll('[data-m]')];

  function text(s, x, y, color, size, weight, align) {
    ctx.font = `${weight || 600} ${size || 13}px ${FONT}`;
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, x, y);
  }

  // 선·면 위 글자는 어두운 받침을 깐다.
  function chip(s, x, y, color, align, size) {
    ctx.font = `700 ${size || 13}px ${FONT}`;
    const tw = ctx.measureText(s).width;
    const px = 6, hh = (size || 13) * 0.62 + 3;
    const lx = align === 'right' ? x - tw - px * 2 : align === 'center' ? x - tw / 2 - px : x;
    ctx.fillStyle = 'rgba(8,10,14,0.82)';
    ctx.beginPath(); ctx.roundRect(lx, y - hh, tw + px * 2, hh * 2, 5); ctx.fill();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, lx + px, y + 0.5);
  }

  // ── 3D: 옆면(x,y)을 화면 폭 z 방향으로 밀어낸 입체를 정사영으로 본다 ──
  // 화면은 선이 아니라 면이다 — 펼쳤을 땐 화면 앞면을 거의 정면에서, 닫힐수록 옆으로 돌아 접힌 단면을 본다.
  // 면마다 법선으로 음영을 주고, 보는 쪽을 향한 면만 먼 것부터 칠한다.
  const DEPTH = 170;
  const LIGHT = (() => { const v = [-0.35, -0.8, -0.55]; const n = Math.hypot(...v); return v.map((a) => a / n); })();
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const CAM = { c: [0, 0, -1], R: [1, 0, 0], U: [0, -1, 0], ox: 0, oy: 0 };
  function setCam(f) {
    const al = (24 + 42 * f) * Math.PI / 180, be = 16 * Math.PI / 180;    // 화면 법선에서 옆으로 돈 각 · 내려다보는 각
    const c = [Math.cos(be) * Math.cos(al), -Math.sin(be), -Math.cos(be) * Math.sin(al)];   // 장면 → 눈
    const l = Math.hypot(c[0], c[2]), R = [-c[2] / l, 0, c[0] / l];
    let U = [R[1] * c[2] - R[2] * c[1], R[2] * c[0] - R[0] * c[2], R[0] * c[1] - R[1] * c[0]];
    if (U[1] > 0) U = U.map((v) => -v);
    Object.assign(CAM, { c, R, U });
  }
  const P2 = (x, y, z) => [CAM.ox + dot([x, y, z], CAM.R), CAM.oy - dot([x, y, z], CAM.U)];
  const far = (x, y, z) => -dot([x, y, z], CAM.c);                 // 클수록 멀다(먼저 칠한다)
  const facing = (nx, ny, nz) => dot([nx, ny, nz], CAM.c) > 0;     // 보는 쪽을 향하는가
  const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
  function shade(rgb, n, alpha = 1, gloss = 0) {
    const d = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);
    const f = 0.32 + 0.78 * d, sp = gloss * Math.pow(d, 12) * 255;
    const c = rgb.map((v) => Math.min(255, Math.round(v * f + sp)));
    return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
  }
  // 표시면은 스스로 빛난다 — 기울기와 상관없이 밝게. 좁은 반사광 하나만 법선을 따라 움직여 굽은 곳·주름을 띠로 드러낸다
  const GLINT = (() => { const v = [1, -0.36, 0]; const n = Math.hypot(...v); return v.map((a) => a / n); })();
  function glow(rgb, n) {
    const f = 0.8 + 0.25 * Math.max(0, dot(n, CAM.c)), sp = 150 * Math.pow(Math.max(0, dot(n, GLINT)), 200);
    const c = rgb.map((v) => Math.min(255, Math.round(v * f + sp)));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }
  // 표시면에 띄운 바탕화면과 앱 아이콘 — 접히는 것이 선이 아니라 '화면'이라는 게 보이게. u = 힌지에서 잰 호 길이(mm), w = 폭 0..1
  function wallpaper(u, w, uMax) {
    const t = 0.5 + u / (2 * uMax);
    let c = mix([52, 30, 104], [214, 80, 148], t);
    c = mix(c, [255, 168, 96], Math.max(0, w - 0.5) * t);
    const cu = (Math.abs(u) - 1.2) / 4.4, cw = (w * 4) % 1;
    if (Math.abs(u) > 1.2 && Math.abs(u) < uMax - 1 && cu % 1 < 0.55 && cw > 0.22 && cw < 0.78) c = mix(c, [244, 240, 250], 0.42);
    return c;
  }
  // 화면 띠: 중심선 P(표시면) → 몸체 쪽으로 tS 두께. 표시면은 칸으로 나눠 바탕화면을 칠하고, 굽은 만큼 달아오른 색을 얹는다.
  // 법선은 실제 꺾인 선에서 다시 구한다 — 펼친 뒤 남은 주름이 면 위에 빛 번짐으로 드러난다.
  function screenFaces(F, P, tS, uMax) {
    const D = DEPTH, NC = 16, base = hexRgb(PANEL), back = mix(hexRgb(PANEL), [40, 20, 40], 0.35), heat = hexRgb('#ffe066');
    const B = P.map((p) => [p.x - p.nx * tS, p.y - p.ny * tS]);
    const idx = [0];
    for (let i = 1; i < P.length; i++) {
      const a = P[idx[idx.length - 1]], b = P[i];
      if (i === P.length - 1 || Math.abs(b.u - a.u) >= 0.33 || Math.abs(b.ang - a.ang) >= 0.14) idx.push(i);
    }
    for (let m = 0; m < idx.length - 1; m++) {
      const i = idx[m], j = idx[m + 1], a = P[i], b = P[j];
      let nx = b.y - a.y, ny = -(b.x - a.x); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
      if (nx * (a.nx + b.nx) + ny * (a.ny + b.ny) < 0) { nx = -nx; ny = -ny; }
      const n = [nx, ny, 0];
      let k = 0; for (let q = i; q <= j; q++) k = Math.max(k, P[q].k); k = Math.min(1, k);
      if (facing(...n)) for (let c = 0; c < NC; c++) {
        const z0 = D * c / NC, z1 = D * (c + 1) / NC;
        const col = mix(wallpaper((a.u + b.u) / 2, (c + 0.5) / NC, uMax), heat, 0.8 * k);
        F.push({ pts: [[a.x, a.y, z0], [b.x, b.y, z0], [b.x, b.y, z1], [a.x, a.y, z1]], key: far((a.x + b.x) / 2, (a.y + b.y) / 2, (z0 + z1) / 2), fill: glow(col, n), seam: true });
      }
      const bn = n.map((v) => -v);
      const bq = [[B[i][0], B[i][1], 0], [B[j][0], B[j][1], 0], [B[j][0], B[j][1], D], [B[i][0], B[i][1], D]];
      if (facing(...bn)) F.push({ pts: bq, key: far((B[i][0] + B[j][0]) / 2, (B[i][1] + B[j][1]) / 2, D / 2), fill: shade(back, bn), seam: true });
    }
    // 앞 단면(z=0): 띠 두께가 보이는 면. 굽은 곳은 노랗게
    const cap = P.map((p) => [p.x, p.y, 0]).concat(B.slice().reverse().map(([x, y]) => [x, y, 0]));
    F.push({ pts: cap, key: -1e6 + 1, fill: shade(base, [0, 0, -1]), edge: 'rgba(255,214,240,0.9)' });
    for (let i = 0; i < P.length - 1; i++) {
      const k = Math.min(1, Math.max(P[i].k, P[i + 1].k)); if (k < 0.02) continue;
      F.push({ pts: [[P[i].x, P[i].y, 0], [P[i + 1].x, P[i + 1].y, 0], [B[i + 1][0], B[i + 1][1], 0], [B[i][0], B[i][1], 0]], key: -1e6 + 2, fill: `rgba(255,224,102,${(0.85 * k).toFixed(3)})` });
    }
  }
  function paint(F) {
    F.sort((a, b) => b.key - a.key);
    for (const f of F) {
      const q = f.pts.map((p) => P2(...p));
      ctx.beginPath(); ctx.moveTo(...q[0]); for (const p of q.slice(1)) ctx.lineTo(...p); ctx.closePath();
      ctx.fillStyle = f.fill; ctx.fill();
      if (f.seam) { ctx.strokeStyle = f.fill; ctx.lineWidth = 0.7; ctx.stroke(); }   // 이웃 칸 사이 머리카락 틈을 메운다
      if (f.edge) {
        ctx.strokeStyle = f.edge; ctx.lineWidth = 1;
        if (f.segs) { ctx.beginPath(); for (const [i, j] of f.segs) { ctx.moveTo(...q[i]); ctx.lineTo(...q[j]); } }   // 나눈 칸은 바깥 테두리만 긋는다
        ctx.stroke();
      }
    }
  }
  // 접히는 화면 중심선(mm): 힌지 가운데에서 오른쪽 반을 적분하고 왼쪽은 거울. f = 접힘(0 펼침 · 1 닫힘)
  // U자: 반원 하나(닫히면 틈 2R) · 물방울: 큰 고리(R) + 반대로 굽는 목(r2), 닫히면 두 쪽이 거의 닿는다
  const DROP_A = 50 * Math.PI / 180, GAP0 = 0.9, ARM = 13;   // 목 각도 · 닫힌 화면 사이(mm) · 물방울의 팔 길이(mm)
  function segsFor(mode, f, R) {
    f = Math.max(1e-4, f);
    if (mode === 'u') { const L = Math.PI * R / 2; return [[L, f * (Math.PI / 2) / L]]; }
    const r2 = Math.max(0.3, (R * Math.cos(DROP_A) - GAP0 / 2) / (1 - Math.cos(DROP_A)));
    const L1 = R * (Math.PI / 2 + DROP_A), L2 = r2 * DROP_A;
    return [[L1, f * (Math.PI / 2 + DROP_A) / L1], [L2, -f * DROP_A / L2]];
  }
  function halfPath(segs, arm) {
    const out = []; let x = 0, y = 0, a = 0, arc = 0; const ds = 0.08;
    out.push({ x, y, a, k: segs[0][1], arc });
    for (const [L, k] of segs) { const n = Math.ceil(L / ds), h = L / n; for (let i = 0; i < n; i++) { const am = a + k * h / 2; x += Math.cos(am) * h; y += Math.sin(am) * h; a += k * h; arc += h; out.push({ x, y, a, k, arc }); } }
    const bendEnd = out.length - 1;
    const n = 40, h = arm / n; for (let i = 0; i < n; i++) { x += Math.cos(a) * h; y += Math.sin(a) * h; arc += h; out.push({ x, y, a, k: 0, arc }); }
    return { pts: out, bendEnd };
  }
  const bendHalfLen = (mode, R) => segsFor(mode, 1, R).reduce((s, [L]) => s + L, 0);
  // 옆면 다각형 하나를 깊이 방향으로 밀어낸 기둥(회전한 몸체·덮개용)
  function prismFaces(F, poly, rgb, alpha = 1, edge = 'rgba(244,244,239,0.28)', under = -1) {   // under = 화면 뒤에 붙은 변 번호, 늘 화면 밑에 칠한다
    const D = DEPTH, cx0 = poly.reduce((a, p) => a + p[0], 0) / poly.length, cy0 = poly.reduce((a, p) => a + p[1], 0) / poly.length;
    F.push({ pts: poly.map(([x, y]) => [x, y, 0]), key: far(cx0, cy0, 0), fill: shade(rgb, [0, 0, -1], alpha, 0.25), edge });
    for (let i = 0; i < poly.length; i++) {
      const [x1, y1] = poly[i], [x2, y2] = poly[(i + 1) % poly.length];
      let nx = y2 - y1, ny = -(x2 - x1); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
      if (nx * ((x1 + x2) / 2 - cx0) + ny * ((y1 + y2) / 2 - cy0) < 0) { nx = -nx; ny = -ny; }
      if (!facing(nx, ny, 0)) continue;
      // 옆면도 화면처럼 폭(z) 방향으로 잘게 나눈다 — 큰 면 하나를 가운데 한 점으로 줄 세우면 화면 칸보다 앞에 칠해져 몸체가 화면 위로 삐져나온다
      const fill = shade(rgb, [nx, ny, 0], alpha, 0.25), NZ = 16;
      for (let c = 0; c < NZ; c++) {
        const z0 = D * c / NZ, z1 = D * (c + 1) / NZ;
        const segs = [[1, 2], [3, 0]]; if (c === 0) segs.push([0, 1]); if (c === NZ - 1) segs.push([2, 3]);
        F.push({ pts: [[x1, y1, z0], [x2, y2, z0], [x2, y2, z1], [x1, y1, z1]], key: i === under ? 1e6 : far((x1 + x2) / 2, (y1 + y2) / 2, (z0 + z1) / 2), fill, edge, segs });
      }
    }
  }

  function draw(e, gapMm, fits) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    text('Same bend, different closed thickness', 20, 24, INK, 15, 700);
    text(`${state.mode === 'u' ? 'U-fold' : 'Water-drop fold'}  ·  R ${state.r.toFixed(1)} mm  ·  t ${state.t} μm  ·  fold ${state.fold} %`, 20, 44, MUTE, 12, 500);

    // ── 왼쪽: 접히는 폰(입체). 굽은 곳은 늘어난 만큼 노랗게 ──
    const f = state.fold / 100;
    setCam(f);
    // 화면 한쪽 길이(mm)는 두 방식이 같다 — 물방울이 힌지 안으로 더 끌어들인 만큼 U자는 곧은 팔이 길다. 화면 크기가 방식에 따라 바뀌면 안 된다
    const halfMm = ARM + bendHalfLen('drop', state.r), arm = halfMm - bendHalfLen(state.mode, state.r);
    const s = 140 / halfMm;   // 1 mm = s px, 화면 한쪽은 늘 140 px
    const tS = 5, bodyPx = state.body * s;
    const x0 = 34 + tS + bodyPx, yMid = 250;
    const { pts, bendEnd } = halfPath(segsFor(state.mode, f, state.r), arm);
    // 펼친 뒤 남는 주름 — 닫혔을 때의 변형률에 비례(그림용). R이 같으면 두 방식이 같다
    const eClosed = strain(state.t, state.r);
    const opened = f < 0.35 ? 1 - f / 0.35 : 0;              // 거의 다 펼쳤을 때만 남은 자국이 드러난다
    const dentPx = 3.4 * eClosed * opened, dentW = Math.max(1.4, state.r * 0.9);
    const ridge = Math.min(1, eClosed / 1.6) * opened;
    const toCanvas = (p, side) => {
      const nx = -Math.sin(p.a) * side, ny = Math.cos(p.a), g = Math.exp(-Math.pow(p.arc / dentW, 2)), d = dentPx * g;
      const xm = p.x * side - nx * d / s, ym = p.y - ny * d / s;
      const heatLocal = p.k ? Math.min(1, strain(state.t, 1 / Math.abs(p.k)) / 1.6) : 0;
      return { x: x0 + ym * s, y: yMid + xm * s, nx: ny, ny: nx, u: p.arc * side, ang: p.a * side, k: Math.max(heatLocal, ridge * g) };
    };
    const right = pts.map((p) => toCanvas(p, 1)), leftHalf = pts.map((p) => toCanvas(p, -1));
    const P = leftHalf.slice(1).reverse().concat(right), mid = leftHalf.length - 1;
    const F = [], BODY_A = 0.34, BODY_E = 'rgba(214,226,240,0.55)';   // 몸체는 반투명 — 안의 화면 층이 한 장으로 비친다
    // 몸체: 팔(곧은 구간) 뒤에 붙은 판
    const armBody = (half) => {
      const a = half[bendEnd], b = half[half.length - 1];
      const L = Math.hypot(b.x - a.x, b.y - a.y) || 1, dx = (b.x - a.x) / L, dy = (b.y - a.y) / L;
      const q0 = [a.x - a.nx * tS, a.y - a.ny * tS], q1 = [q0[0] + dx * L, q0[1] + dy * L];
      prismFaces(F, [q0, q1, [q1[0] - a.nx * bodyPx, q1[1] - a.ny * bodyPx], [q0[0] - a.nx * bodyPx, q0[1] - a.ny * bodyPx]], hexRgb('#8193aa'), BODY_A, BODY_E, 0);
      return { a, b, out: [q1[0] - a.nx * bodyPx, q1[1] - a.ny * bodyPx] };   // out = 팔 끝 바깥 모서리(두께 치수선용)
    };
    const armR = armBody(right), armL = armBody(leftHalf);
    screenFaces(F, P, tS, pts[pts.length - 1].arc);
    if (state.mode === 'drop' && f > 0.05) {   // 힌지 덮개 — 닫힐수록 드러난다, 반투명
      const bend = P.filter((_, i) => i >= mid - bendEnd && i <= mid + bendEnd);
      const xs = bend.map((p) => p.x), ys = bend.map((p) => p.y);
      const k3 = Math.pow(f, 3);
      prismFaces(F, [[Math.min(...xs) - 8, Math.min(...ys) - tS - 4], [Math.max(...xs) + 2, Math.min(...ys) - tS - 4], [Math.max(...xs) + 2, Math.max(...ys) + tS + 4], [Math.min(...xs) - 8, Math.max(...ys) + tS + 4]],
        hexRgb('#8aa0b8'), 0.2 * k3, `rgba(200,220,255,${(0.45 * k3).toFixed(2)})`);
    }
    // 왼쪽 칸(20~350 × 62~416) 가운데에 오도록 옮긴다. 닫힐수록 오른쪽에 틈 표시가 붙으니 조금 왼쪽으로
    CAM.ox = 0; CAM.oy = 0;
    let bx0 = 1e9, bx1 = -1e9, by0 = 1e9, by1 = -1e9;
    for (const fc of F) for (const p of fc.pts) { const [X, Y] = P2(...p); bx0 = Math.min(bx0, X); bx1 = Math.max(bx1, X); by0 = Math.min(by0, Y); by1 = Math.max(by1, Y); }
    CAM.ox = 180 - 55 * f - (bx0 + bx1) / 2; CAM.oy = 240 - (by0 + by1) / 2;
    paint(F);
    if (f > 0.97) {   // 닫혔을 때: 틈과 접은 두께 치수
      const qa = P2(armL.b.x, armL.b.y, 0), qb = P2(armR.b.x, armR.b.y, 0), xg = Math.max(qa[0], qb[0]) + 12, ym = (qa[1] + qb[1]) / 2;
      if (state.mode === 'u') {
        ctx.strokeStyle = WARN; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(xg, qa[1]); ctx.lineTo(xg, qb[1]); ctx.moveTo(xg - 5, qa[1]); ctx.lineTo(xg + 5, qa[1]); ctx.moveTo(xg - 5, qb[1]); ctx.lineTo(xg + 5, qb[1]); ctx.stroke();
        chip(`gap ${gapMm.toFixed(1)} mm`, xg + 10, ym, WARN, 'left', 12);
      } else chip('gap 0', xg + 10, ym, OK, 'left', 12);
      const oa = P2(armL.out[0], armL.out[1], DEPTH), ob = P2(armR.out[0], armR.out[1], DEPTH), xt = Math.max(oa[0], ob[0]) + 14;
      ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(xt, oa[1]); ctx.lineTo(xt, ob[1]); ctx.moveTo(xt - 5, oa[1]); ctx.lineTo(xt + 5, oa[1]); ctx.moveTo(xt - 5, ob[1]); ctx.lineTo(xt + 5, ob[1]); ctx.stroke();
      chip(`closed ${(2 * state.body + gapMm).toFixed(1)} mm`, xt + 6, Math.min(oa[1], ob[1]) - 16, INK, 'right', 13);
    }
    if (dentPx > 1.2) {
      const [cx, cy] = P2(P[mid].x, P[mid].y, DEPTH * 0.5);   // 화면 위 주름 한가운데에서 위로 끌어 올려 단다
      ctx.strokeStyle = '#ffe066'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx, cy - 4); ctx.lineTo(cx, cy - 58); ctx.stroke();
      chip('crease left behind', cx, cy - 66, '#ffe066', 'center', 12);
    }
    text('yellow = stretched · crease depth illustrative, same R = same crease', 34, 430, '#ffe066', 12, 600);
    text(`3D view · 1 mm = ${s.toFixed(1)} px across the fold · layer thickness exaggerated`, 34, 448, MUTE, 11, 500);

    // ── 오른쪽: R vs 접은 두께. 물방울은 몸체 두 장에서 평평, U자는 2R만큼 올라간다 ──
    const RFIT = state.body - 0.25, T0 = 2 * state.body, TMAX = 22;
    const gx0 = 376, gx1 = 598, gy0 = 360, gy1 = 92;
    const X = (r) => gx0 + ((r - RMIN) / (RMAX - RMIN)) * (gx1 - gx0);
    const Y = (v) => gy0 - (Math.min(v, TMAX) / TMAX) * (gy0 - gy1);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    for (let r = 1; r <= RMAX; r++) { ctx.beginPath(); ctx.moveTo(X(r), gy1); ctx.lineTo(X(r), gy0); ctx.stroke(); }
    for (let v = 5; v <= TMAX; v += 5) { ctx.beginPath(); ctx.moveTo(gx0, Y(v)); ctx.lineTo(gx1, Y(v)); ctx.stroke(); }
    // 두 선 사이(= 틈 2R) 칠하기
    ctx.fillStyle = 'rgba(255,176,32,0.12)';
    ctx.beginPath(); ctx.moveTo(X(RMIN), Y(T0)); ctx.lineTo(X(RMAX), Y(T0)); ctx.lineTo(X(RMAX), Y(T0 + 2 * RMAX)); ctx.lineTo(X(RMIN), Y(T0 + 2 * RMIN)); ctx.closePath(); ctx.fill();
    // U자 선
    ctx.strokeStyle = state.mode === 'u' ? WARN : 'rgba(255,176,32,0.6)'; ctx.lineWidth = state.mode === 'u' ? 3 : 2;
    ctx.beginPath(); ctx.moveTo(X(RMIN), Y(T0 + 2 * RMIN)); ctx.lineTo(X(RMAX), Y(T0 + 2 * RMAX)); ctx.stroke();
    chip('U-fold: body + 2R gap', X(1.2), Y(T0 + 2 * 3.6) - 6, WARN, 'left', 11);
    // 물방울 선 — 고리가 몸체에 들어가는 R까지
    ctx.strokeStyle = state.mode === 'drop' ? OK : 'rgba(31,220,106,0.6)'; ctx.lineWidth = state.mode === 'drop' ? 3 : 2;
    ctx.beginPath(); ctx.moveTo(X(RMIN), Y(T0)); ctx.lineTo(X(RFIT), Y(T0)); ctx.stroke();
    ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(RFIT), Y(T0)); ctx.lineTo(X(RMAX), Y(T0)); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = OK; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(RFIT), Y(T0) - 6); ctx.lineTo(X(RFIT), Y(T0) + 6); ctx.stroke();
    chip('water-drop: body only', X(1.2), Y(T0) + 16, OK, 'left', 11);
    text('loop fills body', X(RFIT) - 4, Y(T0) + 30, OK, 10, 600, 'center');
    // 지금 R: 세로 점선과 두 점, 그 사이 간격 = 틈
    const px = X(state.r), yu = Y(T0 + 2 * state.r), yd = Y(T0);
    ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(244,244,239,0.5)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(px, gy0); ctx.lineTo(px, yu); ctx.stroke(); ctx.setLineDash([]);
    for (const [y, c, on] of [[yu, WARN, state.mode === 'u'], [yd, OK, state.mode === 'drop']]) {
      ctx.fillStyle = on ? c : BG; ctx.strokeStyle = c; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(px, y, on ? 6 : 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    chip(`+${(2 * state.r).toFixed(1)} mm`, px + 10, (yu + yd) / 2, WARN, 'left', 12);
    // 축
    ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(gx0, gy1 - 4); ctx.lineTo(gx0, gy0); ctx.lineTo(gx1 + 4, gy0); ctx.stroke();
    for (let r = 1; r <= RMAX; r++) text(String(r), X(r), gy0 + 14, MUTE, 11, 500, 'center');
    for (let v = 0; v <= TMAX; v += 5) text(`${v}`, gx0 - 8, Y(v), MUTE, 11, 500, 'right');
    text('bend radius R, mm', (gx0 + gx1) / 2, gy0 + 32, INK, 12, 600, 'center');
    ctx.save();
    ctx.translate(gx0 - 32, (gy0 + gy1) / 2); ctx.rotate(-Math.PI / 2);
    text('closed thickness, mm', 0, 0, INK, 12, 600, 'center');
    ctx.restore();
  }

  function refresh() {
    for (const el of inputs) {
      const k = el.dataset.in;
      el.value = String(state[k]);
      out(k).textContent = k === 'r' ? state.r.toFixed(1) : String(state[k]);
    }
    for (const b of mbtns) b.setAttribute('aria-pressed', String(b.dataset.m === state.mode));
    const e = strain(state.t, state.r);
    const gapMm = state.mode === 'u' ? 2 * state.r : 0;
    const fits = state.mode === 'u' || 2 * state.r <= 2 * state.body - 0.5;
    draw(e, gapMm, fits);
    const crease = ` Screen strain ${e.toFixed(2)} % at this R; a smaller R leaves a deeper crease, on either hinge.`;
    out('readout').innerHTML = (state.mode === 'u'
      ? `closed thickness <strong>${(2 * state.body + gapMm).toFixed(1)} mm</strong> = two ${state.body} mm halves + a <strong>${gapMm.toFixed(1)} mm</strong> gap (2R). A thinner fold means a smaller R.`
      : (fits
        ? `closed thickness <strong>${(2 * state.body).toFixed(1)} mm</strong> = two ${state.body} mm halves, <strong>no gap</strong>. The ${(2 * state.r).toFixed(1)} mm loop sits inside the folded body. A U-fold at the same R would be ${(2 * state.body + 2 * state.r).toFixed(1)} mm.`
        : `the ${(2 * state.r).toFixed(1)} mm loop <strong>does not fit</strong> inside a ${(2 * state.body).toFixed(0)} mm folded body. Pick a smaller R.`)) + crease;
  }

  // 접었다 펴기: 닫힌 상태로 접은 뒤 천천히 편다 — 펴진 화면에 주름이 남는 순간을 본다
  let anim = 0;
  function play() {
    cancelAnimationFrame(anim);
    const from = state.fold, t0 = performance.now(), T1 = (100 - from) * 14, HOLD = 500, T2 = 1900;
    const step = (now) => {
      const t = now - t0;
      if (t < T1) state.fold = Math.round(from + (100 - from) * (t / T1));
      else if (t < T1 + HOLD) state.fold = 100;
      else if (t < T1 + HOLD + T2) { const u = (t - T1 - HOLD) / T2; state.fold = Math.round(100 * (1 - u * u * (3 - 2 * u))); }
      else { state.fold = 0; refresh(); return; }
      refresh(); anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }
  container.querySelector('[data-play]').addEventListener('click', play);

  for (const el of inputs) {
    el.addEventListener('input', (ev) => { cancelAnimationFrame(anim); state[el.dataset.in] = Number(ev.target.value); refresh(); });
  }
  for (const b of mbtns) {
    b.addEventListener('click', () => { state.mode = b.dataset.m; refresh(); });
  }

  refresh();
}

export default mount;
