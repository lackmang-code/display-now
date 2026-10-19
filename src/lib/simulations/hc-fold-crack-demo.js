// 시뮬레이션 — 폴리이미드 30μm 위 하드코트를 막대에 감아 접을 때, 하드코트 겉면이 얼마나 늘어나는지와
// 그 두께의 막이 견디는 한계를 매번 계산해 금이 가는지 보인다.
//
// 모델과 한계
// - 두 층 보(폴리이미드 + 하드코트)의 중립면 위치를 탄성률 가중 평균으로 구하고, 반경 R 막대에 감았을 때
//   하드코트 겉면 변형률 = (겉면까지의 거리) / (R + 막대에서 중립면까지의 거리)로 계산한다.
//   두 탄성률은 같은 6GPa로 두었다.
// - 당겨지는 취성 막의 채널 균열 한계는 Hutchinson·Suo(1992)의 G = Zσ²h/Ē에서 ε_c ∝ 1/√h 형태가 나온다.
//   상수 K = 2.77%·√μm는 BenQ US11326072B2 표 2(HC 2/3/6/13/14/17/25μm → 바깥 접힘 R 1/2/2/3/3/4/5mm)의
//   일곱 줄을 모두 맞추는 범위(2.74~2.81) 가운데 값이다.
// - 하드코트가 안쪽에 오는 접힘은 압축이라 균열 판정을 하지 않는다(BenQ 표에서 일곱 두께 모두 R1 통과).
// - 반복 피로, 계면 박리, 온습도, 재료마다 다른 파괴 인성은 넣지 않았다.
// - 연필경도는 모델 결과가 아니라 같은 표의 실측값을 가까운 두께에서 옮긴 참고값이다.
// 2026-10-17 3D(사투영 음영) 판을 만들어 봤으나 대표가 「2D 버전이 더 이해하기 쉽다」고 해 되돌렸다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 400;
const T_PI = 30; // μm
const K = 2.77; // %·√μm
const BENQ = [[2, '6H', 1], [3, '6H', 2], [6, '6H', 2], [13, '7H', 3], [14, '8H', 3], [17, '8H', 4], [25, '9H', 5]];

function surfaceStrain(h, Rmm, outside) {
  // 막대에서부터 층 순서: outside면 PI → HC, inside면 HC → PI
  const zc = outside
    ? (T_PI * T_PI / 2 + h * (T_PI + h / 2)) / (T_PI + h)
    : (h * h / 2 + T_PI * (h + T_PI / 2)) / (T_PI + h);
  const y = outside ? T_PI + h - zc : zc; // HC 겉면(바깥) 또는 HC 안쪽 면까지 거리
  return (y / (Rmm * 1000 + zc)) * 100; // %
}

const limit = (h) => K / Math.sqrt(h);

function nearestBenq(h) {
  let best = BENQ[0];
  for (const r of BENQ) if (Math.abs(r[0] - h) < Math.abs(best[0] - h)) best = r;
  return best;
}

export function mount(container) {
  const state = { h: 25, R: 3, outside: true };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Fold a hard-coated film around a rod. Does the coat crack?</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Hard coat thickness <span data-out="h"></span> μm</label>
          <input type="range" min="2" max="30" step="1" data-in="h" />
        </div>
        <div class="sim-control">
          <label>Fold radius</label>
          <div class="sim-toggle-group" data-in="R">
            ${[1, 2, 3, 4, 5].map((r) => `<button type="button" class="sim-toggle-btn" data-val="${r}">${r} mm</button>`).join('')}
          </div>
        </div>
        <div class="sim-control">
          <label>Hard coat faces</label>
          <div class="sim-toggle-group" data-in="side">
            <button type="button" class="sim-toggle-btn" data-val="out">Outside</button>
            <button type="button" class="sim-toggle-btn" data-val="in">Inside</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inp = container.querySelector('[data-in="h"]');
  const rBtns = [...container.querySelectorAll('[data-in="R"] button')];
  const sBtns = [...container.querySelectorAll('[data-in="side"] button')];

  function label(text, x, y, color, align) {
    ctx.font = 'bold 14px ui-monospace, monospace';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  function draw(eps, lim, cracked) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    // 왼쪽: 접힌 필름(반경은 화면용으로 키우되 순서는 유지)
    const cx = 175, cy = 215;
    const rodR = 22 + state.R * 14;
    const tPI = 26, tHC = 4 + state.h * 0.8;
    ctx.fillStyle = '#2a2a26';
    ctx.beginPath(); ctx.arc(cx, cy, rodR - 2, 0, Math.PI * 2); ctx.fill();
    const layers = state.outside
      ? [['pi', rodR, rodR + tPI], ['hc', rodR + tPI, rodR + tPI + tHC]]
      : [['hc', rodR, rodR + tHC], ['pi', rodR + tHC, rodR + tHC + tPI]];
    const hcCol = cracked ? '#ff6b4a' : '#1fdc6a';
    for (const [k, r0, r1] of layers) {
      ctx.fillStyle = k === 'pi' ? '#c9a34a' : hcCol;
      ctx.beginPath();
      ctx.arc(cx, cy, r1, Math.PI * 0.5, Math.PI * 1.5, false);
      ctx.arc(cx, cy, r0, Math.PI * 1.5, Math.PI * 0.5, true);
      ctx.closePath(); ctx.fill();
      // 다리
      ctx.fillRect(cx, cy - r1, 120, r1 - r0);
      ctx.fillRect(cx, cy + r0, 120, r1 - r0);
    }
    if (cracked) {
      const rOut = layers.find((l) => l[0] === 'hc')[2];
      ctx.strokeStyle = '#0d0d0a'; ctx.lineWidth = 2;
      for (let a = 0.62; a < 1.4; a += 0.11) {
        const th = Math.PI * a;
        ctx.beginPath();
        ctx.moveTo(cx + rOut * Math.cos(th), cy + rOut * Math.sin(th) * -1 + 0);
        ctx.lineTo(cx + (rOut - tHC) * Math.cos(th), cy - (rOut - tHC) * Math.sin(th));
        ctx.stroke();
      }
    }
    label(`R ${state.R} mm`, cx, cy, '#ffffff', 'center');
    label('hard coat', 330, 60, hcCol);
    label('polyimide 30 μm', 330, 84, '#c9a34a');
    label('rod and film not to scale', 30, 380, '#8a8a80');

    // 오른쪽: 변형률 막대 두 개
    const bx = 330, bw = 260, by1 = 160, by2 = 250, max = 4;
    const sx = (v) => bx + Math.min(v, max) / max * bw;
    label(state.outside ? 'coat stretched by' : 'coat squeezed by', bx, by1 - 18, '#ffffff');
    ctx.fillStyle = state.outside ? (cracked ? '#ff6b4a' : '#1fdc6a') : '#6fa8ff';
    ctx.fillRect(bx, by1, sx(eps) - bx, 22);
    label(`${eps.toFixed(2)} %`, Math.min(sx(eps) + 8, W - 70), by1 + 11, '#ffffff');
    label(`crack limit for ${state.h} μm`, bx, by2 - 18, '#ffffff');
    ctx.fillStyle = '#8a8a80';
    ctx.fillRect(bx, by2, sx(lim) - bx, 22);
    label(`${lim.toFixed(2)} %`, Math.min(sx(lim) + 8, W - 70), by2 + 11, '#ffffff');
    label(state.outside ? (cracked ? 'CRACKS' : 'holds') : 'compression: no crack', bx, 320, state.outside ? hcCol : '#6fa8ff');
  }

  function refresh() {
    inp.value = String(state.h);
    out('h').textContent = String(state.h);
    rBtns.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.val) === state.R)));
    sBtns.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.val === 'out') === state.outside)));
    const eps = surfaceStrain(state.h, state.R, state.outside);
    const lim = limit(state.h);
    const cracked = state.outside && eps > lim;
    draw(eps, lim, cracked);
    let minR = null;
    for (const r of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) if (surfaceStrain(state.h, r, true) <= lim) { minR = r; break; }
    const b = nearestBenq(state.h);
    out('readout').innerHTML =
      `coat outside: smallest safe radius <strong>${minR ? minR + ' mm' : '&gt; 10 mm'}</strong> (model)<br>` +
      `nearest BenQ row, ${b[0]} μm: <strong>R ${b[2]} mm</strong>, pencil ${b[1]} (750 g)<br>` +
      `coat inside: every BenQ thickness passed R 1 mm`;
  }

  inp.addEventListener('input', (e) => { state.h = Number(e.target.value); refresh(); });
  rBtns.forEach((b) => b.addEventListener('click', () => { state.R = Number(b.dataset.val); refresh(); }));
  sBtns.forEach((b) => b.addEventListener('click', () => { state.outside = b.dataset.val === 'out'; refresh(); }));

  refresh();
}

export default mount;
