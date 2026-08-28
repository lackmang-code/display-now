// 초음파 지문센서의 대비는 어디서 오는가 — 음향 임피던스와 빛의 굴절률을 나란히 놓는다.
//
// 융선은 커버글라스에 닿고 골에는 공기가 남는다. 소리로 읽으면 그 차이가 반사율 36%p로
// 벌어지고, 빛으로 읽으면 4%p다. 소리 쪽이 아홉 배 크다.
//
// 그런데 같은 이유로 소리는 융선 밑에 남은 얇은 공기층에 훨씬 약하다. 유리와 공기의 음향
// 임피던스 비가 3만 배가 넘어서, 수십 나노미터 두께의 틈만 있어도 융선이 골처럼 보인다.
// 빛에게는 같은 두께가 파장보다 훨씬 얇아 거의 없는 것과 같다. 마른 손에서 초음파식이
// 유독 약해지는 이유가 여기에 있다.
//
// 근거:
//  - 골(공기) 430 Rayl, 융선(인체 조직) 약 1.5 MRayl:
//    Micromachines 2023, 14(6), 1253, 5장
//  - 융선에서 반사 진폭이 줄어든다(임피던스가 올라간다)는 방향:
//    Qualcomm US10438040B2 "the indications of increased acoustic impedance in fingerprint
//    ridge areas may include decreased reflection amplitudes"
//  - 소다석회유리 13.4 MRayl(밀도 2.24, 음속 6000m/s), 물 1.494 MRayl(25도),
//    공기 음속 344m/s: Onda Corporation, Tables of Acoustic Properties of Materials
//  - 굴절률 유리 1.51 · 공기 1.000 · 피부 1.44 · 물 1.333은 이 연재 5편과 같은 값
//
// 수식:
//  두 매질    R = ((Z2-Z1)/(Z2+Z1))^2,  빛은 Z 대신 굴절률 n
//  얇은 층    전송선 변환 Zin = Z*(ZL + iZ tan kd)/(Z + iZL tan kd), k = 2*pi*f/c
//             (빛은 k = 2*pi*n/lambda)
//
// 단순화 고지: 수직입사만 본다. 실제 접촉은 균일한 층이 아니라 얼룩덜룩한 패치라
// 신호는 면적 평균으로 나타난다. 잡음 세기는 이상적 대비의 2%로 잡은 표시용 값이다.

const F_HZ = 10e6; // 10 MHz
const LAMBDA_NM = 550;

// 음향: [임피던스 MRayl, 음속 m/s]
const AC = {
  glass: [13.44, 6000],
  air: [0.00043, 344],
  water: [1.494, 1497],
  skin: [1.5, 1540],
};
// 광학: 굴절률
const OP = { glass: 1.51, air: 1.0, water: 1.333, skin: 1.44 };

const W = 300;
const H = 210;
const UM_PER_PX = 12;

function fresnel(a, b) {
  return ((b - a) / (b + a)) ** 2;
}

/** 얇은 층 하나를 사이에 둔 수직입사 투과 전력비. z는 임피던스(또는 굴절률) */
function reflectThroughGap(zFront, zGap, zBack, kd) {
  if (kd <= 0) return fresnel(zFront, zBack);
  const t = Math.tan(kd);
  // Zin = zGap * (zBack + i*zGap*t) / (zGap + i*zBack*t)
  const numRe = zGap * zBack;
  const numIm = zGap * zGap * t;
  const denRe = zGap;
  const denIm = zBack * t;
  const d2 = denRe * denRe + denIm * denIm;
  const zRe = (numRe * denRe + numIm * denIm) / d2;
  const zIm = (numIm * denRe - numRe * denIm) / d2;
  // R = |(Zin - zFront)/(Zin + zFront)|^2
  const aRe = zRe - zFront;
  const bRe = zRe + zFront;
  return (aRe * aRe + zIm * zIm) / (bRe * bRe + zIm * zIm);
}

function hash2(ix, iy) {
  let h = ix * 374761393 + iy * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

function valueNoise(x, y, cell) {
  const gx = x / cell;
  const gy = y / cell;
  const ix = Math.floor(gx);
  const iy = Math.floor(gy);
  const fx = gx - ix;
  const fy = gy - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
}

export function mount(container, params = {}) {
  const state = {
    mode: params.mode ?? 'sound', // 'sound' | 'light'
    gapNm: params.gapNm ?? 0, // 융선 밑에 남은 공기층 두께
    flood: params.flood ?? 0, // 골이 물로 찬 비율 %
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>융선 밑 공기층을 40나노미터만 남겨 보십시오</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
        <div class="sim-legend">
          <span>밝을수록 반사가 강한 자리</span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>무엇으로 읽는가</label>
          <div class="sim-toggle-group" role="group">
            <button type="button" class="sim-toggle-btn" data-mode="sound">소리 10MHz</button>
            <button type="button" class="sim-toggle-btn" data-mode="light">빛 550nm</button>
          </div>
        </div>
        <div class="sim-control">
          <label>융선 밑에 남은 공기층 <span data-out="gap"></span></label>
          <input type="range" min="0" max="400" step="10" data-in="gap" />
        </div>
        <div class="sim-control">
          <label>골이 물로 찬 비율 <span data-out="flood"></span>%</label>
          <input type="range" min="0" max="100" step="5" data-in="flood" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      수직입사 반사율 R = ((Z&#8322;-Z&#8321;)/(Z&#8322;+Z&#8321;))&sup2;로 계산했습니다. 빛은 같은 식에 임피던스 대신
      굴절률을 넣습니다. 융선 밑 공기층은 층 하나짜리 전송선 변환으로 두께를 반영했고,
      소리는 10MHz, 빛은 550nm 기준입니다. 음향 임피던스는 유리 13.4, 물 1.494, 조직 1.5,
      공기 0.00043 MRayl이고 굴절률은 유리 1.51, 물 1.333, 피부 1.44, 공기 1.000입니다.
      융선 위에 흩어진 밝은 점은 땀구멍입니다. 그 자리는 피부가 유리에 닿지 않아 골과 같은
      계면이 됩니다. 화면의 밝기 범위는 각 방식이 마른 손에서 얻는 이상적인 대비에 맞춰
      고정했고, 잡음은 그 대비의 2%로 잡은 표시용 값입니다. 땀구멍의 크기와 간격도 실측
      통계가 아니라 형태가 보이도록 잡은 표시용 값입니다. 실제 접촉은 균일한 층이 아니라 얼룩덜룩한 패치여서
      신호는 면적 평균으로 나타나고, 피부는 산란체라 후방산란이 더해집니다. 원리를 보여주기
      위한 단순화 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const gapIn = container.querySelector('[data-in="gap"]');
  const floodIn = container.querySelector('[data-in="flood"]');
  const gapOut = container.querySelector('[data-out="gap"]');
  const floodOut = container.querySelector('[data-out="flood"]');
  const readout = container.querySelector('[data-out="readout"]');
  const modeBtns = [...container.querySelectorAll('[data-mode]')];

  gapIn.value = String(state.gapNm);
  floodIn.value = String(state.flood);

  // 지문 무늬 · 땀구멍 · 접촉 얼룩
  const ridge = new Float32Array(W * H);
  const pore = new Float32Array(W * H);
  const patch = new Float32Array(W * H);
  {
    const cx = W * 0.46;
    const cy = H * 0.56;
    const periodPx = 200 / UM_PER_PX;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = y * W + x;
        const dx = (x - cx) / 1.3;
        const dy = y - cy;
        const r = Math.sqrt(dx * dx + dy * dy);
        const a = Math.atan2(dy, dx);
        const warp =
          14 * (valueNoise(x, y, 62) - 0.5) + 6 * (valueNoise(x + 400, y + 130, 26) - 0.5);
        const phase = (r + 9 * Math.sin(a * 2.0) + 5 * Math.sin(a * 3.0 + 1.1) + warp) / periodPx;
        ridge[i] = 0.5 + 0.5 * Math.cos(phase * 2 * Math.PI);
        patch[i] = 0.62 * valueNoise(x, y, 46) + 0.38 * valueNoise(x + 900, y + 700, 19);
      }
    }
    const PORE_R = 2.6;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (ridge[y * W + x] < 0.9) continue;
        if (hash2(x + 5000, y + 9000) > 0.007) continue;
        for (let dy = -3; dy <= 3; dy++) {
          for (let dx = -3; dx <= 3; dx++) {
            if (dx * dx + dy * dy > PORE_R * PORE_R) continue;
            const px = x + dx;
            const py = y + dy;
            if (px < 0 || py < 0 || px >= W || py >= H) continue;
            pore[py * W + px] = 1;
          }
        }
      }
    }
  }

  const noiseSeed = new Float32Array(W * H);
  {
    let s = 20260901;
    for (let i = 0; i < noiseSeed.length; i++) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const u1 = ((s >>> 8) % 10000) / 10000 + 1e-6;
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const u2 = ((s >>> 8) % 10000) / 10000;
      noiseSeed[i] = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    }
  }

  /** 현재 모드의 반사율 묶음 */
  function reflectances() {
    const sound = state.mode === 'sound';
    const z = sound ? AC : null;
    const front = sound ? AC.glass[0] : OP.glass;
    const zAir = sound ? AC.air[0] : OP.air;
    const zSkin = sound ? AC.skin[0] : OP.skin;
    const zWater = sound ? AC.water[0] : OP.water;

    // 융선 밑 공기층의 위상 두께
    const d = state.gapNm * 1e-9;
    const kd = sound
      ? (2 * Math.PI * F_HZ * d) / AC.air[1]
      : (2 * Math.PI * OP.air * d) / (LAMBDA_NM * 1e-9);

    const rRidge = reflectThroughGap(front, zAir, zSkin, kd);
    const rValleyDry = fresnel(front, zAir);
    const rValleyWet = fresnel(front, zWater);
    const f = state.flood / 100;
    const rValley = rValleyDry * (1 - f) + rValleyWet * f;
    const ideal = Math.abs(fresnel(front, zAir) - fresnel(front, zSkin));
    return { rRidge, rValley, rValleyDry, ideal, sound, z };
  }

  function render() {
    const { rRidge, rValley, ideal, sound } = reflectances();
    const contrast = rValley - rRidge;
    const sigma = 0.02 * ideal;

    // 땀구멍과 접촉 얼룩. 땀구멍 자리는 피부가 닿지 않아 골과 같은 계면이 된다.
    const img = ctx.createImageData(W, H);
    const mid = (rValley + rRidge) / 2;
    const span = ideal * 1.30;
    for (let i = 0; i < W * H; i++) {
      const t = ridge[i];
      const rr = pore[i] > 0.5 ? rValley : rRidge * (0.97 + 0.06 * patch[i]);
      const val = rr * t + rValley * (1 - t);
      let v = (val - mid) / span + 0.5 + noiseSeed[i] * (sigma / span);
      v = Math.min(1, Math.max(0, v));
      const g = Math.round(22 + v * 212);
      img.data[i * 4] = g;
      img.data[i * 4 + 1] = g;
      img.data[i * 4 + 2] = Math.round(g * (sound ? 0.93 : 0.99));
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);

    ctx.font = '12px "IBM Plex Mono", monospace';
    const label = sound ? '소리로 본 지문' : '빛으로 본 지문';
    const lw = ctx.measureText(label).width;
    ctx.fillStyle = 'rgba(13,13,10,0.82)';
    ctx.fillRect(0, 0, lw + 20, 28);
    ctx.fillStyle = 'rgba(235,230,220,0.95)';
    ctx.fillText(label, 10, 19);

    gapOut.textContent = state.gapNm === 0 ? '없음 (완전 밀착)' : `${state.gapNm}nm`;
    floodOut.textContent = String(state.flood);

    const ratio = rRidge > 0 ? rValley / rRidge : Infinity;
    const rel = contrast / ideal;
    let verdict;
    if (rel > 0.5) verdict = '무늬가 또렷합니다';
    else if (rel > 0.15) verdict = '무늬는 남았지만 흐려집니다';
    else if (rel > 0.03) verdict = '특징점을 뽑기 어려운 수준입니다';
    else verdict = '융선과 골이 구별되지 않습니다';

    readout.innerHTML =
      `융선 자리 반사율 <b>${(rRidge * 100).toFixed(rRidge > 0.01 ? 2 : 4)}%</b><br>` +
      `골 자리 반사율 <b>${(rValley * 100).toFixed(rValley > 0.01 ? 2 : 4)}%</b><br>` +
      `대비 <b>${(contrast * 100).toFixed(Math.abs(contrast) > 0.01 ? 2 : 4)}%p</b> ` +
      `(마른 손 완전밀착 대비 ${(rel * 100).toFixed(1)}%)<br>` +
      `골 나누기 융선 <b>${ratio > 100 ? '100배 이상' : ratio.toFixed(2) + '배'}</b><br>` +
      `<span>${verdict}</span>`;
  }

  function syncMode() {
    modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));
  }

  modeBtns.forEach((b) =>
    b.addEventListener('click', () => {
      state.mode = b.dataset.mode;
      syncMode();
      render();
    })
  );
  gapIn.addEventListener('input', () => {
    state.gapNm = Number(gapIn.value);
    render();
  });
  floodIn.addEventListener('input', () => {
    state.flood = Number(floodIn.value);
    render();
  });

  syncMode();
  render();
}

export default mount;
