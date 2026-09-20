// 시뮬레이션 — 평균 크기에서 뽑은 분자식과, 모든 분자가 같은 분자식은 어떻게 다른가.
// 나노코 무효심판(IPR2021-00183~00186)에서 삼성이 낸 선행문헌(Banin)의 금 클러스터는
// "Au101(PPh3)21Cl5"라는 식을 달고 있었다. 심판원은 이 식이 Hutchison(=Weare 외, JACS 2000)이
// 평균 입경 1.5 nm에서 금 원자 수를 추정해 얻은 평균 식이라고 보았다.
//
// 모델과 한계
// - 원문에서 가져온 값은 둘이다: 평균 지름 1.5 nm에서 금 원자 약 101개(Hutchison 추정),
//   크기 1.5 nm ±0.4 nm(결정문 186 p19에 인용된 Cossairt 증언, "약 1.1~1.9 nm").
// - 가정 둘: ① 원자 수는 지름의 세제곱에 비례(밀도 일정)
//             ② 지름은 종 모양 분포. ±값을 범위로 읽고 표준편차를 그 절반으로 둔다. 범위 밖은 버리고 다시 뽑는다.
// - 추정 상수는 없다. 손잡이는 크기 퍼짐 하나다.
// - 실제 금 클러스터는 특정 원자 수에 몰리는 경향이 있어 연속 분포가 아니다.
//   이 그림은 「평균에서 뽑은 식이 개별 입자의 식은 아닐 수 있다」는 셈만 보인다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const LAYOUT = {
  article: { W: 440, H: 330 },
  cover: { W: 440, H: 330 },
};

const N = 2000;
const D0 = 1.5; // nm, Hutchison 평균 입경
const A0 = 101; // 그 입경에서 추정한 금 원자 수
const BIN = 5;
const MAXA = 240;

// 같은 그림이 매번 나오도록 씨앗을 고정한 난수
function makeZ() {
  let s = 12345 >>> 0;
  const r = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const z = [];
  while (z.length < N) {
    const u = r() || 1e-9;
    const v = r();
    const g = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    if (Math.abs(g) <= 2) z.push(g);
  }
  return z;
}

export function mount(container, params = {}) {
  const L = LAYOUT[params.cover ? 'cover' : 'article'];
  const { W, H } = L;
  const Z = makeZ();
  const state = { spread: params.spread ?? 0.4 };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>A formula taken from the average size, or one formula shared by every molecule?</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Size spread &plusmn;<span data-out="spread"></span> nm</label>
          <input type="range" min="0" max="0.4" step="0.01" data-in="spread" />
        </div>
        <div class="sim-control">
          <label>Jump to</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-set="0" aria-pressed="false">Identical &plusmn;0</button>
            <button type="button" class="sim-toggle-btn" data-set="0.4" aria-pressed="true">Gold &plusmn;0.4 nm</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inp = container.querySelector('[data-in="spread"]');
  inp.value = String(state.spread);

  const COL = {
    bg: '#0d0d0a',
    ink: 'rgba(236,236,237,0.92)',
    dim: 'rgba(162,162,168,0.85)',
    bar: '#e0a35a',
    hit: '#5b8cff',
    axis: 'rgba(236,236,237,0.35)',
  };

  function atoms(spread) {
    return Z.map((z) => Math.round(A0 * Math.pow((D0 + (spread / 2) * z) / D0, 3)));
  }

  function draw(a) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    const left = 34;
    const right = W - 16;
    const top = 76;
    const base = H - 62;

    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.fillStyle = COL.ink;
    ctx.textAlign = 'left';
    ctx.fillText('gold atoms per particle, 2,000 particles', left - 18, 22);
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = COL.dim;
    ctx.fillText('mean diameter 1.5 nm, atoms scale with diameter cubed', left - 18, 40);

    const nb = Math.ceil(MAXA / BIN);
    const bins = new Array(nb).fill(0);
    a.forEach((n) => {
      bins[Math.min(nb - 1, Math.floor(n / BIN))]++;
    });
    const peak = Math.max(...bins, 1);
    const bw = (right - left) / nb;
    const X = (n) => left + (n / MAXA) * (right - left);

    bins.forEach((c, i) => {
      const h = ((base - top) * c) / peak;
      const hit = i * BIN <= A0 && A0 < (i + 1) * BIN;
      ctx.fillStyle = hit ? COL.hit : COL.bar;
      ctx.fillRect(left + i * bw + 0.5, base - h, Math.max(1, bw - 1), h);
    });

    ctx.strokeStyle = COL.axis;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(left, base + 0.5);
    ctx.lineTo(right, base + 0.5);
    ctx.stroke();

    ctx.fillStyle = COL.dim;
    ctx.textAlign = 'center';
    for (let t = 0; t <= 200; t += 50) ctx.fillText(String(t), X(t), base + 15);
    ctx.textAlign = 'right';
    ctx.fillText('atoms', right, base + 30);

    const xm = X(A0);
    ctx.strokeStyle = COL.ink;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(xm, top - 14);
    ctx.lineTo(xm, base);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.textAlign = 'left';
    ctx.fillStyle = COL.ink;
    ctx.font = 'bold 12px ui-monospace, monospace';
    ctx.fillText('Au101', xm + 6, top - 6);
    ctx.font = '11px ui-monospace, monospace';

    ctx.fillStyle = COL.hit;
    ctx.fillText('blue bar = 100 to 104 atoms', left - 18, H - 12);
  }

  function refresh() {
    const a = atoms(state.spread);
    const exact = a.filter((n) => n === A0).length / N;
    const sorted = [...a].sort((x, y) => x - y);
    const lo = sorted[Math.floor(N * 0.025)];
    const hi = sorted[Math.floor(N * 0.975)];
    out('spread').textContent = state.spread.toFixed(2);
    container.querySelectorAll('[data-set]').forEach((b) =>
      b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-set')) === state.spread)),
    );
    out('readout').innerHTML =
      'formula from the average size <strong>Au101</strong><br>' +
      `particles with exactly 101 atoms <strong>${(exact * 100).toFixed(1)}%</strong><br>` +
      `middle 95% of particles <strong>${lo} to ${hi}</strong> atoms<br>` +
      'counting model &middot; not measured';
    draw(a);
  }

  inp.addEventListener('input', (ev) => {
    state.spread = Number(ev.target.value);
    refresh();
  });
  container.querySelectorAll('[data-set]').forEach((b) =>
    b.addEventListener('click', () => {
      state.spread = Number(b.getAttribute('data-set'));
      inp.value = String(state.spread);
      refresh();
    }),
  );

  refresh();
}

export default mount;
