// UPC(언더패널 카메라) 회절 간섭 시뮬레이터.
//
// 같은 폴더의 udc-diffraction-demo가 흐림·헤일로·플레어를 각각 별도 슬라이더로 배정한
// 정성적 개념도인 것과 달리, 이 모듈은 개구 배열에서 나온 파동을 실제로 중첩해
// 원거리장(Fraunhofer) 강도를 계산한다. 그래서 색 번짐과 별모양 줄무늬를 따로 만들어
// 넣지 않는다. 피치와 배열만 바꾸면 간섭의 결과로 저절로 나타난다.
//
// 계산 모델
//   원거리장 진폭 = (개구 하나의 푸리에 변환) x (개구 중심 배열의 푸리에 변환)
//   정사각 개구 폭 a        ->  sinc(a·u)
//   개구 중심 x_i           ->  F(u) = Σ_i exp(i2π·u·x_i)
//   공간주파수 u = sinθ / λ
//
// u가 파장에 반비례하므로, 같은 회절 차수라도 파장이 길수록 바깥으로 벌어진다.
// 파장을 여러 개 계산해 합치면 색 분산(무지개 테두리)이 가정 없이 재현된다.
//
// 행 좌표와 열 좌표를 서로 독립으로 두어 2차원 계산을 1차원 두 번으로 분리했다.
// 덕분에 슬라이더를 끄는 동안에도 매 프레임 다시 계산할 수 있다.
// 완전한 2차원 무작위 배열은 이 방식으로 표현되지 않는다. 아래 고지를 참조할 것.

const N_APERTURE = 11; // 한 축당 개구 개수. 늘리면 차수가 날카로워지고 계산량이 는다
const SIN_THETA_MAX = Math.sin((4 * Math.PI) / 180); // 화면 가장자리가 4도
const SIZE = 220; // 회절 패턴 캔버스 한 변
const ARRAY_SIZE = 104; // 개구 배열 미리보기 캔버스 한 변

// 가시광 대표 파장과 대략적인 RGB 가중치. 정확한 CIE 등색함수 대신 눈에 보이는 색상
// 순서와 상대 밝기만 맞춘 근사다.
const SPECTRUM = [
  { nm: 440, rgb: [0.30, 0.10, 1.00] },
  { nm: 480, rgb: [0.05, 0.55, 0.90] },
  { nm: 520, rgb: [0.10, 1.00, 0.35] },
  { nm: 560, rgb: [0.65, 0.95, 0.05] },
  { nm: 600, rgb: [1.00, 0.60, 0.02] },
  { nm: 640, rgb: [1.00, 0.20, 0.05] },
];
const MONO = [{ nm: 540, rgb: [0.35, 1.0, 0.45] }];

function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function sinc(x) {
  if (Math.abs(x) < 1e-9) return 1;
  const px = Math.PI * x;
  return Math.sin(px) / px;
}

/** 개구 중심 좌표를 만든다. jitter는 피치 대비 비율(0~1). */
function apertureCenters(pitchUm, jitter, seed) {
  const rand = mulberry32(seed);
  const out = new Float64Array(N_APERTURE);
  const half = (N_APERTURE - 1) / 2;
  for (let i = 0; i < N_APERTURE; i++) {
    out[i] = (i - half) * pitchUm + (rand() - 0.5) * jitter * pitchUm;
  }
  return out;
}

/** 한 축의 강도 분포. |sinc(a·u)|^2 · |Σ exp(i2π·u·x)|^2 */
function axisIntensity(sinTheta, lambdaUm, centers, apertureUm) {
  const n = sinTheta.length;
  const out = new Float64Array(n);
  for (let k = 0; k < n; k++) {
    const u = sinTheta[k] / lambdaUm;
    let re = 0;
    let im = 0;
    for (let i = 0; i < centers.length; i++) {
      const phase = 2 * Math.PI * u * centers[i];
      re += Math.cos(phase);
      im += Math.sin(phase);
    }
    const envelope = sinc(apertureUm * u);
    out[k] = envelope * envelope * (re * re + im * im);
  }
  return out;
}

export function mount(container, params = {}) {
  const state = {
    pitchUm: params.pitchUm ?? 40,
    fillPct: params.fillPct ?? 25,
    jitterPct: params.jitterPct ?? 0,
    exposure: params.exposure ?? 3,
    white: params.white ?? true,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">물리 계산</span>
      <span>개구 배열의 파동을 중첩해 회절 무늬를 직접 계산합니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${SIZE}" height="${SIZE}" data-c="pattern"></canvas>
        <div class="sim-legend">
          <span>가장자리가 4도</span>
          <span data-out="order"></span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-toggle-group" role="group">
          <button type="button" class="sim-toggle-btn" data-mode="white">백색광</button>
          <button type="button" class="sim-toggle-btn" data-mode="mono">단색광 540nm</button>
        </div>
        <div class="sim-control">
          <label>개구 피치 <span data-out="pitch"></span> &micro;m</label>
          <input type="range" min="20" max="80" step="2" data-in="pitch" />
        </div>
        <div class="sim-control">
          <label>개구율 <span data-out="fill"></span> %</label>
          <input type="range" min="4" max="60" step="1" data-in="fill" />
        </div>
        <div class="sim-control">
          <label>배열 흐트러짐 <span data-out="jitter"></span> %</label>
          <input type="range" min="0" max="100" step="5" data-in="jitter" />
        </div>
        <div class="sim-control">
          <label>노출 <span data-out="exposure"></span></label>
          <input type="range" min="1" max="5" step="0.1" data-in="exposure" />
        </div>
        <div class="sim-canvas-wrap">
          <canvas width="${ARRAY_SIZE}" height="${ARRAY_SIZE}" data-c="array"></canvas>
          <div class="sim-legend"><span>실제 개구 배열</span></div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      프라운호퍼 회절식을 그대로 계산합니다. 개구 하나의 푸리에 변환에 개구 배열의 푸리에
      변환을 곱해 원거리장 강도를 구하고, 파장 여섯 개를 따로 계산해 합쳤습니다. 색 번짐과
      별모양 줄무늬를 따로 넣지 않았는데도 나타나는 것은 그것이 간섭의 결과이기 때문입니다.
      다만 계산을 가볍게 하려고 개구를 한 축당 ${N_APERTURE}개로 줄였고, 행 좌표와 열 좌표를
      독립으로 두어 2차원을 1차원 두 번으로 분리했습니다. 그래서 완전한 2차원 무작위 배열은
      표현되지 않습니다. 실제 패널의 투과 영역은 다중 개구에 이중 피치 구조라 무늬가 더
      복잡합니다. 원리를 보여주는 모델이며 특정 제품의 실측값이 아닙니다.
    </div>
  `;

  const patternCanvas = container.querySelector('[data-c="pattern"]');
  const arrayCanvas = container.querySelector('[data-c="array"]');
  const pctx = patternCanvas.getContext('2d');
  const actx = arrayCanvas.getContext('2d');
  const image = pctx.createImageData(SIZE, SIZE);

  const inputs = {
    pitch: container.querySelector('[data-in="pitch"]'),
    fill: container.querySelector('[data-in="fill"]'),
    jitter: container.querySelector('[data-in="jitter"]'),
    exposure: container.querySelector('[data-in="exposure"]'),
  };
  const outs = {
    pitch: container.querySelector('[data-out="pitch"]'),
    fill: container.querySelector('[data-out="fill"]'),
    jitter: container.querySelector('[data-out="jitter"]'),
    exposure: container.querySelector('[data-out="exposure"]'),
    order: container.querySelector('[data-out="order"]'),
    readout: container.querySelector('[data-out="readout"]'),
  };
  const modeButtons = container.querySelectorAll('[data-mode]');

  // 화면 좌표에 대응하는 sinθ 격자. 파장과 무관하므로 한 번만 만든다.
  const sinTheta = new Float64Array(SIZE);
  for (let i = 0; i < SIZE; i++) {
    sinTheta[i] = ((i / (SIZE - 1)) * 2 - 1) * SIN_THETA_MAX;
  }

  function drawArray(pitchUm, apertureUm, jitter) {
    actx.fillStyle = '#0d0d0a';
    actx.fillRect(0, 0, ARRAY_SIZE, ARRAY_SIZE);

    // 미리보기에는 5x5만 그린다. 배열 규칙성과 개구 크기를 눈으로 보는 것이 목적이다.
    const shown = 5;
    const scale = ARRAY_SIZE / (shown * pitchUm);
    const cx = apertureCenters(pitchUm, jitter, 7);
    const cy = apertureCenters(pitchUm, jitter, 99);
    const half = (N_APERTURE - 1) / 2;
    const side = Math.max(1, apertureUm * scale);

    actx.fillStyle = '#d8d3c4';
    for (let i = 0; i < N_APERTURE; i++) {
      for (let j = 0; j < N_APERTURE; j++) {
        if (Math.abs(i - half) > (shown - 1) / 2) continue;
        if (Math.abs(j - half) > (shown - 1) / 2) continue;
        const px = ARRAY_SIZE / 2 + cx[i] * scale - side / 2;
        const py = ARRAY_SIZE / 2 + cy[j] * scale - side / 2;
        actx.fillRect(px, py, side, side);
      }
    }
  }

  function draw() {
    const pitchUm = state.pitchUm;
    const apertureUm = pitchUm * Math.sqrt(state.fillPct / 100);
    const jitter = state.jitterPct / 100;
    const bands = state.white ? SPECTRUM : MONO;

    const centersX = apertureCenters(pitchUm, jitter, 7);
    const centersY = apertureCenters(pitchUm, jitter, 99);

    const r = new Float64Array(SIZE * SIZE);
    const g = new Float64Array(SIZE * SIZE);
    const b = new Float64Array(SIZE * SIZE);
    let peak = 0;

    for (const band of bands) {
      const lambdaUm = band.nm / 1000;
      const ix = axisIntensity(sinTheta, lambdaUm, centersX, apertureUm);
      const iy = axisIntensity(sinTheta, lambdaUm, centersY, apertureUm);
      const [wr, wg, wb] = band.rgb;
      for (let y = 0; y < SIZE; y++) {
        const iyv = iy[y];
        if (iyv === 0) continue;
        const row = y * SIZE;
        for (let x = 0; x < SIZE; x++) {
          const v = ix[x] * iyv;
          const idx = row + x;
          r[idx] += v * wr;
          g[idx] += v * wg;
          b[idx] += v * wb;
          if (v > peak) peak = v;
        }
      }
    }

    // 0차 정점이 워낙 밝아 선형으로 그리면 나머지가 전부 검게 죽는다. 로그로 압축한다.
    const gain = Math.pow(10, state.exposure);
    const norm = 1 / Math.log(1 + gain);
    const scale = peak > 0 ? 1 / peak : 0;
    const data = image.data;
    for (let i = 0; i < SIZE * SIZE; i++) {
      const p = i * 4;
      data[p] = 255 * Math.log(1 + gain * Math.min(1, r[i] * scale)) * norm;
      data[p + 1] = 255 * Math.log(1 + gain * Math.min(1, g[i] * scale)) * norm;
      data[p + 2] = 255 * Math.log(1 + gain * Math.min(1, b[i] * scale)) * norm;
      data[p + 3] = 255;
    }
    pctx.putImageData(image, 0, 0);

    drawArray(pitchUm, apertureUm, jitter);

    // 1차 회절 차수가 나타나는 각도. sinθ = λ/p
    const theta1 = (Math.asin(Math.min(1, 0.55 / pitchUm)) * 180) / Math.PI;
    outs.order.textContent = `1차 차수 ${theta1.toFixed(2)}도`;
    outs.readout.textContent =
      `개구 폭 ${apertureUm.toFixed(1)}µm · 투과 ${state.fillPct}% · ` +
      (state.jitterPct === 0 ? '규칙 배열' : `흐트러짐 ${state.jitterPct}%`);
  }

  function syncLabels() {
    outs.pitch.textContent = state.pitchUm;
    outs.fill.textContent = state.fillPct;
    outs.jitter.textContent = state.jitterPct;
    outs.exposure.textContent = state.exposure.toFixed(1);
    modeButtons.forEach((btn) => {
      const on = (btn.dataset.mode === 'white') === state.white;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  inputs.pitch.value = state.pitchUm;
  inputs.fill.value = state.fillPct;
  inputs.jitter.value = state.jitterPct;
  inputs.exposure.value = state.exposure;

  inputs.pitch.addEventListener('input', () => {
    state.pitchUm = parseFloat(inputs.pitch.value);
    syncLabels();
    draw();
  });
  inputs.fill.addEventListener('input', () => {
    state.fillPct = parseFloat(inputs.fill.value);
    syncLabels();
    draw();
  });
  inputs.jitter.addEventListener('input', () => {
    state.jitterPct = parseFloat(inputs.jitter.value);
    syncLabels();
    draw();
  });
  inputs.exposure.addEventListener('input', () => {
    state.exposure = parseFloat(inputs.exposure.value);
    syncLabels();
    draw();
  });
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.white = btn.dataset.mode === 'white';
      syncLabels();
      draw();
    });
  });

  syncLabels();
  draw();
}
