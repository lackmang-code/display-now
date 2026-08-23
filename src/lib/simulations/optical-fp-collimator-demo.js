// 언더디스플레이 광학 지문센서의 콜리메이터 교환관계.
//
// 화면이 조명이고 렌즈가 없으므로, 상을 맺으려면 개구로 빛의 입사각을 잘라내야 한다.
// 개구비(깊이 나누기 폭)를 키우면 수광각이 좁아져 화소 하나가 보는 면적이 줄고(선명),
// 동시에 받는 빛이 줄어 잡음이 커진다(어두움). 한 손잡이가 두 지표를 반대로 움직인다.
//
// 근거:
//  - 개구의 깊이 대 폭 비율이 콜리메이터 설계 변수라는 것: Micromachines 2023, 14(6), 1253
//    "the depth-to-width ratio of the micro-collimation aperture can be chosen freely to
//     achieve adequate collimation without allowing an excessive amount of stray light"
//  - 각도를 제한해야 상이 맺히고 그 대가로 두께가 필요하다: Synaptics US10169630B2
//  - 융선 폭 100~400um, 골 폭 75~200um: 같은 리뷰 4장
//  - 지문의 특징에 땀구멍이 포함된다는 것도 같은 리뷰 2.5장의 서술이다
//  - 마른 손가락이 커버층에 규칙적이고 일정하게 접촉하지 않아 광학식이 약해진다는 것:
//    같은 리뷰 4장
//  - 유리(1.51)/공기(1.000)/피부(1.44)/물(1.333) 굴절률로 계산한 수직입사 프레넬 반사율
//
// 수식:
//  최대 수광각    theta = atan(1 / 개구비)
//  블러 지름      d = 2 * h * tan(theta),  h = 커버 두께(기본 0.6mm)
//  상대 수광량    L = sin(theta)^2         (입체각 근사)
//  샷잡음         sigma = k / sqrt(L)      k는 눈에 보이게 맞춘 표시용 계수
//
// 단순화 고지: 잡음 계수와 땀구멍의 크기·간격, 마른 손의 접촉 패치 크기는 실측 통계가
// 아니라 화면에서 형태가 보이도록 잡은 표시용 값이다. 피부는 산란체라 실제 신호에는
// 후방산란이 더해지는데 여기서는 수직입사 반사율만 쓴다. 원리를 보여주는 모델이다.

const N_GLASS = 1.51;
const N_AIR = 1.0;
const N_SKIN = 1.44;
const N_WATER = 1.333;

const W = 300;
const H = 210;
const UM_PER_PX = 12; // 보이는 범위 약 3.6mm x 2.5mm

function fresnel(n1, n2) {
  return ((n2 - n1) / (n2 + n1)) ** 2;
}

const R_AIR = fresnel(N_GLASS, N_AIR);
const R_SKIN = fresnel(N_GLASS, N_SKIN);
const R_WATER = fresnel(N_GLASS, N_WATER);

/** 결정론적 해시 잡음 (0~1) */
function hash2(ix, iy) {
  let h = ix * 374761393 + iy * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

/** 격자 보간 잡음. cell은 픽셀 단위 격자 크기 */
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
    aspect: params.aspect ?? 10,
    contact: params.contact ?? 55, // 0 마름 · 55 보통 · 100 젖음
    coverUm: params.coverUm ?? 600,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>개구를 좁힐수록 땀구멍까지 보이고 동시에 자글자글해집니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>콜리메이터 개구비 (깊이 나누기 폭) <span data-out="ar"></span></label>
          <input type="range" min="2" max="30" step="1" data-in="ar" />
        </div>
        <div class="sim-control">
          <label>손가락 접촉 상태 <span data-out="contactLabel"></span></label>
          <input type="range" min="0" max="100" step="5" data-in="contact" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      최대 수광각 &theta; = atan(1/개구비), 화소 하나가 보는 지름 = 2&times;커버두께&times;tan&theta;,
      상대 수광량 = sin&sup2;&theta;로 계산했습니다. 커버 두께는 0.6mm로 고정했고, 보이는 범위는
      가로 3.6mm입니다. 융선과 골의 반사율은 유리 1.51, 공기 1.000, 피부 1.44, 물 1.333의
      굴절률로 구한 수직입사 프레넬 값입니다. 융선 위에 줄지어 찍힌 점은 땀구멍이고, 그 자리는
      피부가 유리에 닿지 않아 골과 같은 계면이 됩니다. 마른 손에서는 융선이 유리에서 미세하게
      떠서 실제로 맞닿는 면적 비율이 전체적으로 낮아지고, 융선의 실효 반사율이 피부값과
      공기값 사이로 옮겨갑니다. 땀구멍의 크기와 간격, 접촉 면적 비율의 범위, 잡음의 세기는
      실측 통계가 아니라 화면에서 경향이 보이도록 잡은 표시용 값입니다. 피부는 산란체라 실제 신호에는
      후방산란이 더해집니다. 원리를 보여주는 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const arInput = container.querySelector('[data-in="ar"]');
  const contactInput = container.querySelector('[data-in="contact"]');
  const arOut = container.querySelector('[data-out="ar"]');
  const contactOut = container.querySelector('[data-out="contactLabel"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  arInput.value = String(state.aspect);
  contactInput.value = String(state.contact);

  // 지문 융선, 땀구멍, 접촉 패치를 한 번만 만들어 재사용한다
  const ridge = new Float32Array(W * H); // 1 융선 · 0 골
  const pore = new Float32Array(W * H); // 1 땀구멍
  const patch = new Float32Array(W * H); // 접촉이 잘 되는 정도 0~1

  {
    const cx = W * 0.46;
    const cy = H * 0.56;
    const periodPx = 200 / UM_PER_PX; // 융선 한 주기 약 200um
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = y * W + x;
        const dx = (x - cx) / 1.3;
        const dy = y - cy;
        const r = Math.sqrt(dx * dx + dy * dy);
        const a = Math.atan2(dy, dx);

        // 소용돌이에 저주파 왜곡을 얹어 융선 폭과 방향을 불규칙하게 만든다
        const warp =
          14 * (valueNoise(x, y, 62) - 0.5) +
          6 * (valueNoise(x + 400, y + 130, 26) - 0.5);
        const phase =
          (r + 9 * Math.sin(a * 2.0) + 5 * Math.sin(a * 3.0 + 1.1) + warp) / periodPx;

        const v = 0.5 + 0.5 * Math.cos(phase * 2 * Math.PI);
        ridge[i] = v;

        // 접촉이 잘 되는 정도. 저주파 덩어리로 얼룩진다
        patch[i] =
          0.62 * valueNoise(x, y, 46) +
          0.38 * valueNoise(x + 900, y + 700, 19);
      }
    }

    // 땀구멍은 융선 마루 한가운데를 따라 드문드문 찍힌다.
    // 지름은 약 60마이크로미터로 잡았다.
    const PORE_R = 2.6;
    const SEED_P = 0.012;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (ridge[y * W + x] < 0.9) continue;
        if (hash2(x + 5000, y + 9000) > SEED_P) continue;
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

  // 고정 시드 정규잡음
  const noiseSeed = new Float32Array(W * H);
  {
    let s = 12345;
    for (let i = 0; i < noiseSeed.length; i++) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const u1 = ((s >>> 8) % 10000) / 10000 + 1e-6;
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const u2 = ((s >>> 8) % 10000) / 10000;
      noiseSeed[i] = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    }
  }

  /** 가로세로 분리 박스 블러 */
  function boxBlur(src, radius) {
    if (radius < 1) return src;
    const tmp = new Float32Array(W * H);
    const out = new Float32Array(W * H);
    const win = radius * 2 + 1;
    for (let y = 0; y < H; y++) {
      let acc = 0;
      for (let k = -radius; k <= radius; k++) acc += src[y * W + Math.min(W - 1, Math.max(0, k))];
      for (let x = 0; x < W; x++) {
        tmp[y * W + x] = acc / win;
        acc += src[y * W + Math.min(W - 1, x + radius + 1)] - src[y * W + Math.max(0, x - radius)];
      }
    }
    for (let x = 0; x < W; x++) {
      let acc = 0;
      for (let k = -radius; k <= radius; k++) acc += tmp[Math.min(H - 1, Math.max(0, k)) * W + x];
      for (let y = 0; y < H; y++) {
        out[y * W + x] = acc / win;
        acc +=
          tmp[Math.min(H - 1, y + radius + 1) * W + x] - tmp[Math.max(0, y - radius) * W + x];
      }
    }
    return out;
  }

  function render() {
    const AR = state.aspect;
    const theta = Math.atan(1 / AR);
    const blurUm = 2 * state.coverUm * Math.tan(theta);
    const lum = Math.sin(theta) ** 2;

    const c = state.contact;
    // 마른 손은 각질이 굳어 융선이 유리에서 미세하게 뜬다. 융선이 덩어리째 사라지는 것이
    // 아니라 실제로 맞닿는 면적 비율이 전체적으로 낮아진다.
    const dryness = c < 55 ? (55 - c) / 55 : 0;
    const flooded = c > 55 ? (c - 55) / 45 : 0;
    const contactFrac = 0.95 - dryness * 0.87; // 0.95에서 0.08까지

    const rValleyBase = R_AIR * (1 - flooded) + R_WATER * flooded;

    const src = new Float32Array(W * H);
    for (let i = 0; i < src.length; i++) {
      const t = ridge[i];
      // 접촉 면적 비율에 완만한 공간 변동만 얹는다
      const f = pore[i] > 0.5 ? 0 : contactFrac * (0.9 + 0.2 * patch[i]);
      const rRidgeHere = f * R_SKIN + (1 - f) * rValleyBase;
      src[i] = rRidgeHere * t + rValleyBase * (1 - t);
    }
    const rRidgeAvg = contactFrac * R_SKIN + (1 - contactFrac) * rValleyBase;
    const contrast = rValleyBase - rRidgeAvg;

    const radiusPx = Math.max(0, Math.round(blurUm / 2 / UM_PER_PX));
    const blurred = boxBlur(src, radiusPx);

    const sigma = 0.055 / Math.sqrt(lum / 0.0099);
    const img = ctx.createImageData(W, H);
    const mid = (R_AIR + R_SKIN) / 2;
    const span = (R_AIR - R_SKIN) * 0.62;
    for (let i = 0; i < W * H; i++) {
      let v = (blurred[i] - mid) / span + 0.5;
      v += noiseSeed[i] * sigma;
      v = Math.min(1, Math.max(0, v));
      const g = Math.round(24 + v * 210);
      img.data[i * 4] = g;
      img.data[i * 4 + 1] = g;
      img.data[i * 4 + 2] = Math.round(g * 0.97);
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);

    arOut.textContent = String(AR);
    contactOut.textContent = c < 30 ? '마름' : c <= 60 ? '보통' : '젖음';
    readoutOut.innerHTML =
      `최대 수광각 <b>${((theta * 180) / Math.PI).toFixed(2)}도</b><br>` +
      `화소 하나가 보는 지름 <b>${blurUm.toFixed(0)}&micro;m</b> (융선 한 줄이 약 200&micro;m)<br>` +
      `상대 수광량 <b>${(lum * 100).toFixed(2)}%</b><br>` +
      `융선이 실제로 맞닿은 면적 <b>${(contactFrac * 100).toFixed(0)}%</b><br>` +
      `융선과 골의 실효 반사율 차이 <b>${(contrast * 100).toFixed(2)}%p</b>` +
      (contrast < 0.012 ? ' · 무늬는 남아 있지만 특징을 뽑기 어려운 수준입니다' : '');
  }

  arInput.addEventListener('input', () => {
    state.aspect = Number(arInput.value);
    render();
  });
  contactInput.addEventListener('input', () => {
    state.contact = Number(contactInput.value);
    render();
  });

  render();
}

export default mount;
