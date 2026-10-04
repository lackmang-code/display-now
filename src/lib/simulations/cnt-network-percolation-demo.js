// 시뮬레이션 — 필름 위에 CNT를 무작위로 뿌리고, 양 끝 전극을 잇는 연결 경로가 생기는지 매번 직접 계산한다.
// 같은 양의 CNT라도 분산이 덜 돼 덩어리(응집체)로 뭉치면, 덩어리 안에서만 엉키고 덩어리 사이가 비어 연결이 끊기는 것을 본다.
//
// 모델과 한계
// - 2차원 막대 퍼콜레이션이다. 튜브 길이 L, 정사각 필름 한 변 6L. 튜브 방향은 균일 무작위.
// - 튜브 하나하나는 길이 L 그대로다(굵어지지 않는다). 응집은 튜브 k 개가 한 덩어리 중심 둘레 반지름 r 안에
//   무작위 각도로 엉켜 놓이는 것으로 본다(덩어리 중심은 균일 무작위). k=1 이면 완전 분산이다. k 와 r 은 손잡이로 꺼낸다.
// - 튜브끼리 교차하면 연결, 왼쪽·오른쪽 가장자리에 걸치면 그쪽 전극에 연결된다. 합집합-찾기(union-find)로
//   두 전극이 한 덩어리에 들어가는지 판정한다. 결과를 미리 정한 곡선으로 그리지 않는다.
// - 기준선: 무한히 큰 2차원 막대계의 연결 문턱 밀도는 약 5.637/L² 다(Li & Zhang, Phys. Rev. E 80, 040104, 2009).
//   유한한 필름에서는 문턱 근처에서 연결이 확률적으로 갈리므로, 같은 조건을 무작위 배치 20번 돌려 몇 번 이어지는지 함께 보인다.
// - 면저항(Ω/□) 절댓값은 내지 않는다. CNT 사이 접촉저항, 금속성·반도체성 비율 같은 모르는 값을 지어내야 하기 때문이다.
// - 투명도는 계산하지 않는다. 같은 양을 쓰면 빛을 먹는 양도 같다는 점만 화면에 적는다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 420;
const SIDE = 6; // 필름 한 변 = 6L
const NC = 5.637 * SIDE * SIDE; // 무한계 문턱의 막대 수(같은 면적 기준) ≈ 203
const TRIALS = 20;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function layout(n, rnd, k = 1, r = 0.15) {
  const st = new Float64Array(n * 4);
  let ccx = 0, ccy = 0;
  for (let i = 0; i < n; i++) {
    if (i % k === 0) { ccx = rnd() * SIDE; ccy = rnd() * SIDE; }
    let cx = ccx, cy = ccy;
    if (k > 1) {
      const a = rnd() * 2 * Math.PI, d = r * Math.sqrt(rnd());
      cx = Math.min(SIDE, Math.max(0, ccx + d * Math.cos(a)));
      cy = Math.min(SIDE, Math.max(0, ccy + d * Math.sin(a)));
    }
    const th = rnd() * Math.PI;
    const dx = Math.cos(th) * 0.5, dy = Math.sin(th) * 0.5;
    st[i * 4] = cx - dx; st[i * 4 + 1] = cy - dy; st[i * 4 + 2] = cx + dx; st[i * 4 + 3] = cy + dy;
  }
  return st;
}

function cross(ax, ay, bx, by, cx, cy) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}

function intersects(s, i, j) {
  const a1x = s[i * 4], a1y = s[i * 4 + 1], a2x = s[i * 4 + 2], a2y = s[i * 4 + 3];
  const b1x = s[j * 4], b1y = s[j * 4 + 1], b2x = s[j * 4 + 2], b2y = s[j * 4 + 3];
  if (Math.max(a1x, a2x) < Math.min(b1x, b2x) || Math.max(b1x, b2x) < Math.min(a1x, a2x)) return false;
  if (Math.max(a1y, a2y) < Math.min(b1y, b2y) || Math.max(b1y, b2y) < Math.min(a1y, a2y)) return false;
  const d1 = cross(a1x, a1y, a2x, a2y, b1x, b1y), d2 = cross(a1x, a1y, a2x, a2y, b2x, b2y);
  const d3 = cross(b1x, b1y, b2x, b2y, a1x, a1y), d4 = cross(b1x, b1y, b2x, b2y, a2x, a2y);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

// 연결 판정. 막대 n 개 + 왼쪽 전극(n) + 오른쪽 전극(n+1)
function solve(st, n) {
  const p = new Int32Array(n + 2);
  for (let i = 0; i < n + 2; i++) p[i] = i;
  const find = (x) => { while (p[x] !== x) { p[x] = p[p[x]]; x = p[x]; } return x; };
  const join = (a, b) => { a = find(a); b = find(b); if (a !== b) p[a] = b; };
  // 공간 격자로 후보만 비교
  const G = SIDE, cell = new Map();
  for (let i = 0; i < n; i++) {
    const x0 = Math.floor(Math.min(st[i * 4], st[i * 4 + 2])), x1 = Math.floor(Math.max(st[i * 4], st[i * 4 + 2]));
    const y0 = Math.floor(Math.min(st[i * 4 + 1], st[i * 4 + 3])), y1 = Math.floor(Math.max(st[i * 4 + 1], st[i * 4 + 3]));
    for (let gx = x0; gx <= x1; gx++) for (let gy = y0; gy <= y1; gy++) {
      const k = gx * 64 + gy;
      if (!cell.has(k)) cell.set(k, []);
      cell.get(k).push(i);
    }
    if (Math.min(st[i * 4], st[i * 4 + 2]) <= 0) join(i, n);
    if (Math.max(st[i * 4], st[i * 4 + 2]) >= G) join(i, n + 1);
  }
  for (const list of cell.values()) {
    for (let a = 0; a < list.length; a++) for (let b = a + 1; b < list.length; b++) {
      if (find(list[a]) !== find(list[b]) && intersects(st, list[a], list[b])) join(list[a], list[b]);
    }
  }
  const spans = find(n) === find(n + 1);
  const inPath = new Uint8Array(n);
  let count = 0;
  if (spans) {
    const root = find(n);
    for (let i = 0; i < n; i++) if (find(i) === root) { inPath[i] = 1; count++; }
  }
  return { spans, inPath, count };
}

const PRESETS = {
  dispersed: { amount: 2.0, clump: 1, radius: 0.15 },
  aggregated: { amount: 2.0, clump: 10, radius: 0.15 },
};

export function mount(container, params = {}) {
  const state = {
    ...PRESETS.dispersed,
    ...(params.preset && PRESETS[params.preset] ? PRESETS[params.preset] : {}),
    seed: 7,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Same amount of CNT, two ways to spread it: does a path still connect the electrodes?</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Start from</label>
          <div class="sim-toggle-group" data-in="preset">
            <button type="button" class="sim-toggle-btn" data-val="dispersed" aria-pressed="true">Well dispersed</button>
            <button type="button" class="sim-toggle-btn" data-val="aggregated" aria-pressed="false">Aggregated</button>
          </div>
        </div>
        <div class="sim-control">
          <label>CNT amount <span data-out="amount"></span>x threshold</label>
          <input type="range" min="0.5" max="8" step="0.1" data-in="amount" />
        </div>
        <div class="sim-control">
          <label>Tubes per clump <span data-out="clump"></span></label>
          <input type="range" min="1" max="20" step="1" data-in="clump" />
        </div>
        <div class="sim-control">
          <label>Clump radius <span data-out="radius"></span> x tube length</label>
          <input type="range" min="0.05" max="0.5" step="0.05" data-in="radius" />
        </div>
        <div class="sim-control">
          <button type="button" class="sim-toggle-btn" data-in="reroll">New random layout</button>
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

  // 비스듬히 본 필름: 필름 좌표 (u,v) ∈ [0,6]² → 화면
  const K = 64, OX = 60, OY = 30, SH = 0.3, SQ = 0.55;
  const sx = (u, v) => OX + u * K + v * K * SH;
  const sy = (u, v) => OY + v * K * SQ + 70 - u * 0;

  function label(text, x, y, color, align) {
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    const w = ctx.measureText(text).width;
    const bx = align === 'right' ? x - w - 6 : align === 'center' ? x - w / 2 - 6 : x - 6;
    ctx.fillStyle = 'rgba(8,8,10,0.72)';
    ctx.fillRect(bx, y - 10, w + 12, 20);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  function draw(st, n, res, clump) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);
    // 필름 판(두께 있는 슬래브)
    const c00 = [sx(0, 0), sy(0, 0)], c60 = [sx(SIDE, 0), sy(SIDE, 0)], c66 = [sx(SIDE, SIDE), sy(SIDE, SIDE)], c06 = [sx(0, SIDE), sy(0, SIDE)];
    const T = 14;
    ctx.fillStyle = '#26303a';
    ctx.beginPath();
    ctx.moveTo(c06[0], c06[1]); ctx.lineTo(c66[0], c66[1]); ctx.lineTo(c66[0], c66[1] + T); ctx.lineTo(c06[0], c06[1] + T); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1d252d';
    ctx.beginPath();
    ctx.moveTo(c60[0], c60[1]); ctx.lineTo(c66[0], c66[1]); ctx.lineTo(c66[0], c66[1] + T); ctx.lineTo(c60[0], c60[1] + T); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e9eef2';
    ctx.globalAlpha = 0.09;
    ctx.beginPath();
    ctx.moveTo(c00[0], c00[1]); ctx.lineTo(c60[0], c60[1]); ctx.lineTo(c66[0], c66[1]); ctx.lineTo(c06[0], c06[1]); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
    // 전극
    const elec = (u, color) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(sx(u, 0), sy(u, 0)); ctx.lineTo(sx(u, SIDE), sy(u, SIDE)); ctx.stroke();
    };
    elec(0, res.spans ? '#1fdc6a' : '#8a8f96');
    elec(SIDE, res.spans ? '#1fdc6a' : '#8a8f96');
    // 막대: 연결 경로 밖 → 안 순서로
    // 튜브는 모두 같은 굵기의 가는 선이다. 응집하면 덩어리 안에서 엉킨 공처럼 보이고 덩어리 사이가 빈다.
    ctx.lineCap = 'round';
    for (const pass of [0, 1]) {
      for (let i = 0; i < n; i++) {
        if (res.inPath[i] !== pass) continue;
        const u1 = Math.max(0, Math.min(SIDE, st[i * 4])), v1 = Math.max(0, Math.min(SIDE, st[i * 4 + 1]));
        const u2 = Math.max(0, Math.min(SIDE, st[i * 4 + 2])), v2 = Math.max(0, Math.min(SIDE, st[i * 4 + 3]));
        ctx.strokeStyle = pass ? '#1fdc6a' : 'rgba(170,190,210,0.7)';
        ctx.lineWidth = pass ? 1.6 : 1.2;
        ctx.beginPath(); ctx.moveTo(sx(u1, v1), sy(u1, v1)); ctx.lineTo(sx(u2, v2), sy(u2, v2)); ctx.stroke();
      }
    }
    label('electrode', sx(0, 0) - 4, sy(0, 0) - 18, '#ffffff', 'center');
    label('electrode', sx(SIDE, 0) + 4, sy(SIDE, 0) - 18, '#ffffff', 'center');
    label(res.spans ? 'CONNECTED' : 'NO PATH', 20, 24, res.spans ? '#1fdc6a' : '#ff8c1a');
    label(clump > 1 ? `${n} tubes in ${Math.ceil(n / clump)} clumps` : `${n} tubes, dispersed`, 20, H - 22, '#ffffff');
  }

  function refresh() {
    inp('amount').value = String(state.amount);
    inp('clump').value = String(state.clump);
    inp('radius').value = String(state.radius);
    out('amount').textContent = state.amount.toFixed(1);
    out('clump').textContent = String(state.clump);
    out('radius').textContent = state.radius.toFixed(2);
    const tubes = Math.round(state.amount * NC);
    const n = Math.max(1, tubes);
    const st = layout(n, mulberry32(state.seed), state.clump, state.radius);
    const res = solve(st, n);
    draw(st, n, res, state.clump);
    let ok = 0;
    for (let t = 0; t < TRIALS; t++) if (solve(layout(n, mulberry32(1000 + t * 7919 + state.seed), state.clump, state.radius), n).spans) ok++;
    const rel = n / NC;
    out('readout').innerHTML =
      `CNT used <strong>${tubes}</strong> tubes = ${rel.toFixed(2)}x the dispersed threshold<br>` +
      (state.clump > 1 ? `grouped in <strong>${Math.ceil(n / state.clump)}</strong> clumps of ${state.clump}<br>` : 'every tube placed on its own<br>') +
      `connected in <strong>${ok} of ${TRIALS}</strong> random layouts<br>` +
      (res.spans ? `this layout: path uses ${res.count} tubes` : 'this layout: no path');
  }

  inp('amount').addEventListener('input', (e) => { state.amount = Number(e.target.value); presetBtns.forEach((b) => b.setAttribute('aria-pressed', 'false')); refresh(); });
  inp('radius').addEventListener('input', (e) => { state.radius = Number(e.target.value); presetBtns.forEach((b) => b.setAttribute('aria-pressed', 'false')); refresh(); });
  inp('clump').addEventListener('input', (e) => { state.clump = Number(e.target.value); presetBtns.forEach((b) => b.setAttribute('aria-pressed', 'false')); refresh(); });
  inp('reroll').addEventListener('click', () => { state.seed = (state.seed * 48271) % 2147483647; refresh(); });
  presetBtns.forEach((btn) => btn.addEventListener('click', () => {
    Object.assign(state, PRESETS[btn.dataset.val]);
    presetBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    refresh();
  }));

  refresh();
}

export default mount;
