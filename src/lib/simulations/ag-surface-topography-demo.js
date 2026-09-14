// 시뮬레이션 — AG 표면의 높이(Ra)와 간격(Rsm)은 따로 움직이는 손잡이다.
// 그리고 그 간격이 화소 피치와 어디서 만나는지를 평면도에서 본다.
//
// 모델과 한계
// - 표면은 값잡음(value noise) 3옥타브로 생성한 가상의 면이다. 실측 지형이 아니다.
//   기본 셀 크기를 Rsm 에 맞추고, 생성한 뒤 실제 Ra 를 계산해 목표 Ra 로 정규화한다.
//   그래서 슬라이더에 적힌 두 값이 화면에 그려진 면의 실제 Ra·Rsm 이다.
// - 메시는 72 x 72 정점. 뒤에서 앞으로 그리는 화가 알고리즘이고 은면 제거는 하지 않는다.
// - 셰이딩은 인접 정점으로 구한 법선과 광원 벡터의 내적(램버트)에 약한 스페큘러를
//   더한 것이다. 광학 계산이 아니라 형태를 읽히게 하는 음영이다.
// - 높이는 가로 대비 약 27배 과장했다. 과장하지 않으면 Ra 0.2µm 는 420µm 폭 안에서
//   보이지 않는다. 처음에는 56배로 잡았는데 대표가 「변화가 너무 과장되어 부자연스럽다」고
//   지적해 절반 아래로 내렸다. 슬라이더 범위도 0.02~0.25µm 로 좁혔다.
//   평면도(Top view)에는 과장이 없다 — 화소 격자와의 관계는 평면 관계라
//   그쪽이 스파클을 읽는 정확한 그림이다.
// - 외부 라이브러리를 쓰지 않는다. Canvas 2D 만 쓴다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

// 프로토타입을 가로 1120px 기준으로 잡아 두었다. 본문 캔버스는 그보다 작으므로
// 같은 투영식을 쓰고 마지막에 K 배만 한다. 가로와 높이가 같은 비율로 줄어
// 과장 배율(약 56배)이 유지된다.
const VW = 1120;

const LAYOUT = {
  article: { W: 440, H: 320 },
  cover: { W: 440, H: 320 },
};

const N = 72; // 한 변의 정점 수
const FIELD = 420; // 화면에 담는 실제 폭 (µm)

export function mount(container, params = {}) {
  const L = LAYOUT[params.cover ? 'cover' : 'article'];
  const { W, H } = L;
  const K = W / VW;

  const state = {
    ra: params.ra ?? 0.18,
    rsm: params.rsm ?? 60,
    pix: params.pix ?? 63,
    rot: params.rot ?? 34,
    mode: params.mode ?? 'height',
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Height and pitch are separate knobs, and only pitch meets the pixel grid</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Ra roughness height <span data-out="ra"></span> &micro;m</label>
          <input type="range" min="0.02" max="0.25" step="0.01" data-in="ra" />
        </div>
        <div class="sim-control">
          <label>Rsm texture pitch <span data-out="rsm"></span> &micro;m</label>
          <input type="range" min="20" max="140" step="2" data-in="rsm" />
        </div>
        <div class="sim-control">
          <label>Pixel pitch <span data-out="pix"></span> &micro;m (<span data-out="ppi"></span> ppi)</label>
          <input type="range" min="30" max="180" step="1" data-in="pix" />
        </div>
        <div class="sim-control">
          <label>View angle <span data-out="rot"></span>&deg;</label>
          <input type="range" min="0" max="90" step="1" data-in="rot" />
        </div>
        <div class="sim-control">
          <label>View</label>
          <div class="sim-toggle-group" data-in="mode">
            <button type="button" class="sim-toggle-btn" data-val="height" aria-pressed="true">3D surface</button>
            <button type="button" class="sim-toggle-btn" data-val="top" aria-pressed="false">Top + pixels</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inp = (k) => container.querySelector(`[data-in="${k}"]`);
  const modeBtns = [...container.querySelectorAll('[data-in="mode"] button')];

  inp('ra').value = String(state.ra);
  inp('rsm').value = String(state.rsm);
  inp('pix').value = String(state.pix);
  inp('rot').value = String(state.rot);

  const heights = new Float32Array(N * N);

  // ---------- value noise ----------
  function hash(x, y, s) {
    let n = x * 374761393 + y * 668265263 + s * 1442695040;
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) >>> 0) / 4294967295;
  }
  const smooth = (t) => t * t * (3 - 2 * t);
  function vnoise(x, y, s) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const a = hash(xi, yi, s);
    const b = hash(xi + 1, yi, s);
    const c = hash(xi, yi + 1, s);
    const d = hash(xi + 1, yi + 1, s);
    const u = smooth(xf);
    const v = smooth(yf);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  }

  function buildSurface() {
    const cells = FIELD / state.rsm; // 화면 폭 안에 들어가는 주기 개수
    let sum = 0;
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const u = (i / (N - 1)) * cells;
        const v = (j / (N - 1)) * cells;
        let h = vnoise(u, v, 1) + vnoise(u * 2.1, v * 2.1, 2) * 0.42 + vnoise(u * 4.3, v * 4.3, 3) * 0.18;
        h /= 1.6;
        heights[j * N + i] = h;
        sum += h;
      }
    }
    const mean = sum / (N * N);
    let dev = 0;
    for (let k = 0; k < N * N; k++) {
      heights[k] -= mean;
      dev += Math.abs(heights[k]);
    }
    dev /= N * N; // 지금의 Ra (임의 단위)
    const scale = state.ra / dev; // 목표 Ra 로 정규화
    for (let k = 0; k < N * N; k++) heights[k] *= scale;
  }

  function project(i, j, h) {
    const rot = (state.rot * Math.PI) / 180;
    const x = (i / (N - 1) - 0.5) * FIELD;
    const y = (j / (N - 1) - 0.5) * FIELD;
    const zExag = 50; // µm -> px, 높이 과장
    const sx = (x - y) * 0.86;
    const sy = (x + y) * 0.62 * Math.sin(rot) - h * zExag;
    return [W * 0.5 + sx * 1.42 * K, H * 0.54 + sy * 1.42 * K];
  }

  function heightColor(t) {
    const u = Math.max(0, Math.min(1, (t + 1) / 2));
    const stops = [
      [22, 32, 58],
      [30, 86, 110],
      [58, 140, 120],
      [176, 170, 92],
      [226, 196, 140],
    ];
    const f = u * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(f));
    const g = f - i;
    const a = stops[i];
    const b = stops[i + 1];
    return [a[0] + (b[0] - a[0]) * g, a[1] + (b[1] - a[1]) * g, a[2] + (b[2] - a[2]) * g];
  }

  const fs = (n) => Math.max(11, Math.round(n * K * 1.25));

  function drawTopView() {
    const top = 38;
    const size = Math.min(W - 20, H - top - 10);
    const ox = (W - size) / 2;
    const oy = top + (H - top - 10 - size) / 2;
    const cell = size / (N - 1);
    const maxAbs = Math.max(1e-6, state.ra * 3);

    for (let j = 0; j < N - 1; j++) {
      for (let i = 0; i < N - 1; i++) {
        const h =
          (heights[j * N + i] + heights[j * N + i + 1] + heights[(j + 1) * N + i] + heights[(j + 1) * N + i + 1]) / 4;
        const dx = heights[j * N + i + 1] - heights[j * N + i];
        const c = heightColor(h / maxAbs);
        const sh = 0.78 + Math.max(-0.34, Math.min(0.34, -dx * 26));
        ctx.fillStyle = `rgb(${Math.min(255, c[0] * sh) | 0},${Math.min(255, c[1] * sh) | 0},${Math.min(255, c[2] * sh) | 0})`;
        ctx.fillRect(ox + i * cell, oy + j * cell, cell + 1, cell + 1);
      }
    }

    const step = (state.pix / FIELD) * size;
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = ox; x <= ox + size + 0.5; x += step) {
      ctx.moveTo(x, oy);
      ctx.lineTo(x, oy + size);
    }
    for (let y = oy; y <= oy + size + 0.5; y += step) {
      ctx.moveTo(ox, y);
      ctx.lineTo(ox + size, y);
    }
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,214,110,1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(ox + step * 2, oy + step * 2, step, step);
    ctx.font = `${fs(20)}px ui-monospace, monospace`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const tag = `one pixel ${state.pix} µm`;
    const tw = ctx.measureText(tag).width;
    const ty = Math.max(fs(20) + 2, oy + step * 2 - 6);
    ctx.fillStyle = 'rgba(13,13,10,0.78)';
    ctx.fillRect(ox + step * 2 - 3, ty - fs(20), tw + 6, fs(20) + 4);
    ctx.fillStyle = 'rgba(255,214,110,1)';
    ctx.fillText(tag, ox + step * 2, ty);

    ctx.strokeStyle = 'rgba(236,236,237,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(ox, oy, size, size);
  }

  function draw() {
    buildSurface();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    if (state.mode === 'top') {
      drawTopView();
    } else {
      const maxAbs = Math.max(1e-6, state.ra * 3);
      const light = [-0.42, -0.62, 0.66];

      for (let j = 0; j < N - 1; j++) {
        for (let i = 0; i < N - 1; i++) {
          const h00 = heights[j * N + i];
          const h10 = heights[j * N + i + 1];
          const h01 = heights[(j + 1) * N + i];
          const h11 = heights[(j + 1) * N + i + 1];
          const p00 = project(i, j, h00);
          const p10 = project(i + 1, j, h10);
          const p11 = project(i + 1, j + 1, h11);
          const p01 = project(i, j + 1, h01);

          const sp = FIELD / (N - 1);
          let nx = -(h10 - h00) / sp;
          let ny = -(h01 - h00) / sp;
          let nz = 1;
          const len = Math.hypot(nx, ny, nz);
          nx /= len;
          ny /= len;
          nz /= len;
          const lam = Math.max(0.12, nx * light[0] + ny * light[1] + nz * light[2]);
          const spec = Math.pow(Math.max(0, lam), 18) * 0.55;

          const c = heightColor((h00 + h10 + h01 + h11) / 4 / maxAbs);
          const r = Math.min(255, c[0] * (0.42 + lam * 0.95) + spec * 255);
          const g = Math.min(255, c[1] * (0.42 + lam * 0.95) + spec * 255);
          const b = Math.min(255, c[2] * (0.42 + lam * 0.95) + spec * 255);

          ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
          ctx.beginPath();
          ctx.moveTo(p00[0], p00[1]);
          ctx.lineTo(p10[0], p10[1]);
          ctx.lineTo(p11[0], p11[1]);
          ctx.lineTo(p01[0], p01[1]);
          ctx.closePath();
          ctx.fill();
        }
      }

      // 축척 막대 100µm
      const px = (100 / FIELD) * (N - 1);
      const a = project(2, N - 3, -state.ra * 4.2);
      const b2 = project(2 + px, N - 3, -state.ra * 4.2);
      ctx.strokeStyle = 'rgba(236,236,237,0.75)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b2[0], b2[1]);
      ctx.stroke();
      ctx.fillStyle = 'rgba(236,236,237,0.8)';
      ctx.font = `${fs(20)}px ui-monospace, monospace`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('100 µm', a[0], a[1] - 5);
    }

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = `${fs(22)}px ui-monospace, monospace`;
    ctx.fillStyle = 'rgba(236,236,237,0.92)';
    ctx.fillText(`Ra ${state.ra.toFixed(2)} µm   Rsm ${state.rsm} µm`, Math.round(12 * K * 2.2), Math.round(10 * K * 2.2));
    ctx.font = `${fs(18)}px ui-monospace, monospace`;
    ctx.fillStyle = 'rgba(162,162,168,0.85)';
    ctx.fillText(
      state.mode === 'top' ? `top view   ${FIELD} µm field` : `surface topography   ${FIELD} µm field`,
      Math.round(12 * K * 2.2),
      Math.round(24 * K * 2.2),
    );
  }

  function refresh() {
    out('ra').textContent = state.ra.toFixed(2);
    out('rsm').textContent = String(state.rsm);
    out('pix').textContent = String(state.pix);
    out('rot').textContent = String(state.rot);
    out('ppi').textContent = String(Math.round(25400 / state.pix));

    const ratio = state.rsm / state.pix;
    let verdict;
    if (ratio > 1.6) verdict = 'texture coarser than the pixel';
    else if (ratio > 0.8) verdict = 'texture and pixel on the same scale';
    else verdict = 'texture finer than the pixel';
    out('readout').innerHTML =
      `Rsm / pixel pitch = <strong>${ratio.toFixed(2)}</strong><br>${verdict}` +
      '<br>AGC range &middot; VRD 100-120, LST 50-60 &micro;m';
    draw();
  }

  inp('ra').addEventListener('input', (e) => {
    state.ra = Number(e.target.value);
    refresh();
  });
  inp('rsm').addEventListener('input', (e) => {
    state.rsm = Number(e.target.value);
    refresh();
  });
  inp('pix').addEventListener('input', (e) => {
    state.pix = Number(e.target.value);
    refresh();
  });
  inp('rot').addEventListener('input', (e) => {
    state.rot = Number(e.target.value);
    refresh();
  });
  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.mode = btn.dataset.val;
      modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      refresh();
    });
  });

  refresh();
}

export default mount;
