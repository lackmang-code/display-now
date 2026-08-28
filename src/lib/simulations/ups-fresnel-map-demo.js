// 화면 아래 센서를 프레넬 수 하나의 축 위에 세운다 — 1부를 닫는 그림.
//
// 이 연재 4편이 언더패널 센서들을 프레넬 수로 정렬했다. 거리가 가까울수록 값이 커져
// 빛이 그저 가려지거나 통과하고(기하광학), 멀어질수록 0으로 수렴해 회절로 퍼진다.
// 지문센서는 손가락이 유리에 닿아 있으니 축의 맨 오른쪽 끝이었다.
//
// 그런데 같은 손가락을 소리로 읽으면 위치가 반대편으로 간다. 거리는 그대로인데 파장이
// 천 배 커지기 때문이다. 10MHz 초음파의 유리 속 파장은 600마이크로미터로, 융선 한 주기
// 500마이크로미터보다 오히려 길다. 그래서 초음파식만 회절 영역에서 동작하고, 스택 두께가
// 곧 대비의 상한이 된다. 축을 결정한 것은 거리가 아니라 파장이었다.
//
// 근거:
//  - 프레넬 수로 언더패널 센서를 정렬한 축과 다른 네 센서의 값: 이 연재 4편이 인용한
//    Optics Express 2025 중산대 논문. 표의 값은 그 편에서 정리한 그대로 옮겼다
//  - 유리 음속 6000m/s(소다석회): Onda Corporation, Tables of Acoustic Properties of Materials
//  - 융선 폭 100~400마이크로미터, 골 폭 75~200마이크로미터: Micromachines 2023, 14(6), 1253
//  - 33MHz 소자에서 측정된 측방 분해능 112.48마이크로미터: Measurement 237 (2024) 115239
//
// 수식:
//  프레넬 수   N = a^2 / (lambda * L),  a는 융선 반주기 250um, L은 전파 거리
//  회절 번짐   w = sqrt(lambda * L)
//
// 단순화 고지: 프레넬 수는 정의에 따라 상수배가 달라진다. 여기서는 4편과 같은 형태를 쓰되
// 두 지문센서를 같은 식으로 계산해 서로 비교할 수 있게 했다. 다른 네 센서의 값은 4편 표에서
// 옮긴 어림값이라 슬라이더와 함께 움직이지 않는다. 번짐은 회절의 규모를 보여주는 어림이고
// 실제 결상에는 빔포밍과 시간창이 함께 작용한다. 원리를 보여주는 모델이며 실측값이 아니다.

const RIDGE_HALF_UM = 250; // 융선 반주기
const RIDGE_PERIOD_UM = 500;
const C_GLASS = 6000; // m/s
const LAMBDA_LIGHT_NM = 550;

const W = 300;
const H = 278;
const AX_Y = 58;
const AX_L = 16;
const AX_R = W - 12;
const PATCH_W = 131;
const PATCH_H = 108;
const PATCH_Y = 158;
const PATCH_GAP = 10;
const UM_PER_PX = 14;

// 4편 표에서 옮긴 어림값
const FIXED = [
  { n: 0.02, label: '페이스ID' },
  { n: 0.06, label: '카메라' },
  { n: 1, label: '근접센서' },
  { n: 10, label: '조도센서' },
];

const logMin = Math.log10(0.01);
const logMax = Math.log10(1000);
const xOf = (n) =>
  AX_L +
  ((Math.log10(Math.min(1000, Math.max(0.01, n))) - logMin) / (logMax - logMin)) * (AX_R - AX_L);

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
    freqMHz: params.freqMHz ?? 10,
    stackUm: params.stackUm ?? 700,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>같은 손가락, 같은 유리인데 두 방식이 축의 양 끝에 앉습니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>초음파 주파수 <span data-out="freq"></span> MHz</label>
          <input type="range" min="2" max="40" step="1" data-in="freq" />
        </div>
        <div class="sim-control">
          <label>센서까지의 스택 두께 <span data-out="stack"></span></label>
          <input type="range" min="300" max="1500" step="50" data-in="stack" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      프레넬 수 N = a&sup2;/(&lambda;L)로 계산했습니다. a는 융선 반주기 250&micro;m,
      L은 센서까지의 전파 거리입니다. 빛은 550nm, 소리는 유리 속 음속 6000m/s로 파장을 구했고,
      아래 두 그림은 회절 번짐 &radic;(&lambda;L)만큼 흐린 지문입니다. 프레넬 수는 정의에 따라
      상수배가 달라지므로 절대값보다 두 방식의 자릿수 차이를 보십시오. 다른 네 센서의 값은
      이 연재 4편 표에서 옮긴 어림값이라 슬라이더와 함께 움직이지 않습니다. 실제 결상에는
      빔포밍과 시간창이 함께 작용하므로 초음파 쪽 실물은 이 그림보다 낫습니다.
      원리를 보여주기 위한 단순화 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const freqIn = container.querySelector('[data-in="freq"]');
  const stackIn = container.querySelector('[data-in="stack"]');
  const freqOut = container.querySelector('[data-out="freq"]');
  const stackOut = container.querySelector('[data-out="stack"]');
  const readout = container.querySelector('[data-out="readout"]');
  freqIn.value = String(state.freqMHz);
  stackIn.value = String(state.stackUm);

  // 지문 조각 (평행 융선에 완만한 굴곡)
  const base = new Float32Array(PATCH_W * PATCH_H);
  for (let y = 0; y < PATCH_H; y++) {
    for (let x = 0; x < PATCH_W; x++) {
      const warp = 10 * (valueNoise(x, y, 54) - 0.5) + 4 * (valueNoise(x + 300, y + 90, 21) - 0.5);
      const phase = (y + 10 * Math.sin(x / 26) + warp) / (RIDGE_PERIOD_UM / UM_PER_PX);
      base[y * PATCH_W + x] = 0.5 + 0.5 * Math.cos(phase * 2 * Math.PI);
    }
  }

  function blur(src, radius) {
    if (radius < 1) return src;
    const tmp = new Float32Array(PATCH_W * PATCH_H);
    const out = new Float32Array(PATCH_W * PATCH_H);
    const win = radius * 2 + 1;
    for (let y = 0; y < PATCH_H; y++) {
      for (let x = 0; x < PATCH_W; x++) {
        let a = 0;
        for (let k = -radius; k <= radius; k++)
          a += src[y * PATCH_W + Math.min(PATCH_W - 1, Math.max(0, x + k))];
        tmp[y * PATCH_W + x] = a / win;
      }
    }
    for (let x = 0; x < PATCH_W; x++) {
      for (let y = 0; y < PATCH_H; y++) {
        let a = 0;
        for (let k = -radius; k <= radius; k++)
          a += tmp[Math.min(PATCH_H - 1, Math.max(0, y + k)) * PATCH_W + x];
        out[y * PATCH_W + x] = a / win;
      }
    }
    return out;
  }

  function drawPatch(x0, data, title, sub) {
    const img = ctx.createImageData(PATCH_W, PATCH_H);
    let lo = 1;
    let hi = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] < lo) lo = data[i];
      if (data[i] > hi) hi = data[i];
    }
    for (let i = 0; i < data.length; i++) {
      // 대비는 유지하지 않는다. 번짐이 대비를 깎는 것 자체가 결과다
      const v = Math.min(1, Math.max(0, data[i]));
      const g = Math.round(26 + v * 206);
      img.data[i * 4] = g;
      img.data[i * 4 + 1] = g;
      img.data[i * 4 + 2] = Math.round(g * 0.95);
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, x0, PATCH_Y);
    ctx.strokeStyle = 'rgba(230,225,215,0.25)';
    ctx.strokeRect(x0 + 0.5, PATCH_Y + 0.5, PATCH_W - 1, PATCH_H - 1);
    ctx.font = '12px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'rgba(230,225,215,0.9)';
    ctx.fillText(title, x0, PATCH_Y - 18);
    ctx.fillStyle = 'rgba(230,225,215,0.55)';
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillText(sub, x0, PATCH_Y - 5);
    void lo;
    void hi;
  }

  function render() {
    const L = state.stackUm * 1e-6;
    const lamLight = LAMBDA_LIGHT_NM * 1e-9;
    const lamSound = C_GLASS / (state.freqMHz * 1e6);
    const a = RIDGE_HALF_UM * 1e-6;
    const nLight = (a * a) / (lamLight * L);
    const nSound = (a * a) / (lamSound * L);
    const wLight = Math.sqrt(lamLight * L) * 1e6;
    const wSound = Math.sqrt(lamSound * L) * 1e6;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    const mono = (px) => `${px}px "IBM Plex Mono", monospace`;
    const center = (t, x) => {
      const w = ctx.measureText(t).width;
      return Math.min(W - 4 - w, Math.max(4, x - w / 2));
    };

    ctx.font = mono(12);
    ctx.fillStyle = 'rgba(230,225,215,0.75)';
    ctx.fillText('프레넬 수', AX_L, 14);

    // 두 지문센서 (축 위, 라벨 두 줄 교차)
    ctx.font = mono(11);
    const marks = [
      { n: nLight, label: '광학 지문', color: '#6ea8d8', row: 0 },
      { n: nSound, label: '초음파 지문', color: '#e08a3c', row: 1 },
    ];
    marks.forEach((m) => {
      const x = xOf(m.n);
      const ly = 30 + m.row * 14;
      ctx.strokeStyle = m.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 0.5, ly + 3);
      ctx.lineTo(x + 0.5, AX_Y - 12);
      ctx.stroke();
      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.moveTo(x, AX_Y - 3);
      ctx.lineTo(x - 5, AX_Y - 12);
      ctx.lineTo(x + 5, AX_Y - 12);
      ctx.closePath();
      ctx.fill();
      ctx.fillText(m.label, center(m.label, x), ly);
    });

    // 축
    ctx.strokeStyle = 'rgba(230,225,215,0.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(AX_L, AX_Y + 0.5);
    ctx.lineTo(AX_R, AX_Y + 0.5);
    ctx.stroke();

    // 4편 표에서 옮긴 네 센서 (축 아래, 라벨 두 줄 교차)
    FIXED.forEach((f, i) => {
      const x = xOf(f.n);
      ctx.fillStyle = 'rgba(230,225,215,0.55)';
      ctx.fillRect(x - 2, AX_Y - 1, 4, 4);
      ctx.fillText(f.label, center(f.label, x), AX_Y + 15 + (i % 2) * 13);
    });

    // 눈금
    ctx.fillStyle = 'rgba(230,225,215,0.4)';
    ctx.strokeStyle = 'rgba(230,225,215,0.3)';
    [0.01, 0.1, 1, 10, 100, 1000].forEach((t) => {
      const x = xOf(t);
      ctx.beginPath();
      ctx.moveTo(x + 0.5, AX_Y + 1);
      ctx.lineTo(x + 0.5, AX_Y + 5);
      ctx.stroke();
      const s2 = String(t);
      ctx.fillText(s2, center(s2, x), AX_Y + 46);
    });

    // 영역 이름
    ctx.fillStyle = 'rgba(230,225,215,0.42)';
    ctx.fillText('회절', AX_L, AX_Y + 62);
    const geo = '기하광학';
    ctx.fillText(geo, AX_R - ctx.measureText(geo).width, AX_Y + 62);

    // 번짐 적용한 지문 두 장
    const rLight = Math.round(wLight / 2 / UM_PER_PX);
    const rSound = Math.round(wSound / 2 / UM_PER_PX);
    drawPatch(AX_L, blur(base, rLight), '빛 550nm', `번짐 ${wLight.toFixed(0)}µm`);
    drawPatch(
      AX_L + PATCH_W + PATCH_GAP,
      blur(base, rSound),
      `소리 ${state.freqMHz}MHz`,
      `번짐 ${wSound.toFixed(0)}µm`
    );

    freqOut.textContent = String(state.freqMHz);
    stackOut.textContent = `${(state.stackUm / 1000).toFixed(2)}mm`;
    readout.innerHTML =
      `유리 속 파장 <b>${(lamSound * 1e6).toFixed(0)}&micro;m</b> (빛은 0.55&micro;m)<br>` +
      `프레넬 수 광학 <b>${nLight.toFixed(0)}</b> · 초음파 <b>${nSound.toFixed(2)}</b><br>` +
      `회절 번짐 광학 <b>${wLight.toFixed(0)}&micro;m</b> · 초음파 <b>${wSound.toFixed(0)}&micro;m</b><br>` +
      `융선 한 주기 500&micro;m 대비 <b>${((wSound / RIDGE_PERIOD_UM) * 100).toFixed(0)}%</b><br>` +
      `<span>${
        wSound < RIDGE_PERIOD_UM * 0.5
          ? '융선 주기보다 번짐이 작아 무늬가 남습니다'
          : '번짐이 융선 주기에 육박해 대비가 깎입니다'
      }</span>`;
  }

  freqIn.addEventListener('input', () => {
    state.freqMHz = Number(freqIn.value);
    render();
  });
  stackIn.addEventListener('input', () => {
    state.stackUm = Number(stackIn.value);
    render();
  });

  render();
}

export default mount;
