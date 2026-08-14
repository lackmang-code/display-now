// 데모 시뮬레이션 — ALS가 주변광의 밝기·색온도(CCT)를 읽어 화면 밝기·화이트밸런스를
// 자동으로 맞추는 동작을 눈으로 보여준다. 왼쪽은 주변광 스와치, 오른쪽은 화면 목업이며
// 둘 다 실시간으로 같은 방향(따뜻한 빛→화면도 따뜻하게, 밝은 빛→화면도 밝게)으로 반응한다.
// 근거: 2026-08-14 기사 1절 "RGB 채널의 비율로 색온도(CCT)를 읽어 화이트밸런스를 자동
// 조정한다"는 서술을 직접 시각화.
// 단순화: 색온도→RGB 변환은 Tanner Helland의 근사식(정성적 색감용, 정밀 색채측정 아님)을
// 쓰고, 화면의 밝기·색온도 반응 범위는 실제 트루톤 계열 제품의 대략적 작동폭을 참고한
// 임의값이며 특정 제품의 실측 캘리브레이션 곡선이 아니다 — 아래 sim-note 고지 참조.

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function kelvinToRGB(kelvin) {
  const temp = kelvin / 100;
  let r, g, b;

  if (temp <= 66) {
    r = 255;
  } else {
    r = clamp(329.698727446 * Math.pow(temp - 60, -0.1332047592), 0, 255);
  }

  if (temp <= 66) {
    g = clamp(99.4708025861 * Math.log(temp) - 161.1195681661, 0, 255);
  } else {
    g = clamp(288.1221695283 * Math.pow(temp - 60, -0.0755148492), 0, 255);
  }

  if (temp >= 66) {
    b = 255;
  } else if (temp <= 19) {
    b = 0;
  } else {
    b = clamp(138.5177312231 * Math.log(temp - 10) - 305.0447927307, 0, 255);
  }

  return { r, g, b };
}

function scaleRGB(rgb, factor) {
  return {
    r: clamp(Math.round(rgb.r * factor), 0, 255),
    g: clamp(Math.round(rgb.g * factor), 0, 255),
    b: clamp(Math.round(rgb.b * factor), 0, 255),
  };
}

function lightenRGB(rgb, amount) {
  return {
    r: clamp(Math.round(rgb.r + (255 - rgb.r) * amount), 0, 255),
    g: clamp(Math.round(rgb.g + (255 - rgb.g) * amount), 0, 255),
    b: clamp(Math.round(rgb.b + (255 - rgb.b) * amount), 0, 255),
  };
}

function rgbCss(rgb) {
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}

export function mount(container, params = {}) {
  const state = {
    ambientIntensityPct: params.ambientIntensityPct ?? 55,
    ambientTempK: params.ambientTempK ?? 4500,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>주변광의 밝기·색을 바꾸면 화면이 따라서 반응합니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="260" height="190"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>주변 밝기 <span data-out="intensity"></span>%</label>
          <input type="range" min="5" max="100" step="5" data-in="intensity" />
        </div>
        <div class="sim-control">
          <label>광원 색온도 <span data-out="temp"></span>K</label>
          <input type="range" min="2700" max="9000" step="100" data-in="temp" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      색온도→RGB 변환은 Tanner Helland 근사식을 쓴 정성적 색감 표현이며 정밀 색채측정값이
      아닙니다. 화면의 밝기·색온도 반응 범위(밝기 25~100%, 색온도 3500~7500K)는 실제
      제품의 대략적 작동폭을 참고한 임의값이고, 특정 기기의 실측 캘리브레이션 곡선이
      아닙니다. 원리를 보여주기 위한 모델입니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const intensityInput = container.querySelector('[data-in="intensity"]');
  const tempInput = container.querySelector('[data-in="temp"]');
  const intensityOut = container.querySelector('[data-out="intensity"]');
  const tempOut = container.querySelector('[data-out="temp"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  intensityInput.value = String(state.ambientIntensityPct);
  tempInput.value = String(state.ambientTempK);

  function draw() {
    const intensityPct = state.ambientIntensityPct;
    const ambientTempK = state.ambientTempK;
    intensityOut.textContent = String(intensityPct);
    tempOut.textContent = String(ambientTempK);

    // 주변광: 밝기 슬라이더를 색의 명도 배율로 직접 반영(15~100%)
    const ambientFactor = 0.15 + (intensityPct / 100) * 0.85;
    const ambientRGB = scaleRGB(kelvinToRGB(ambientTempK), ambientFactor);

    // 화면: 밝기는 25~100%로 자동 조정(완전히 꺼지진 않음), 색온도는 같은 방향으로
    // 3500~7500K 범위 안에서 매칭(전구색 주변광→화면도 따뜻하게, 푸른 주변광→화면도 차갑게)
    const screenBrightnessFactor = 0.25 + (intensityPct / 100) * 0.75;
    const screenTempK = 3500 + ((ambientTempK - 2700) / (9000 - 2700)) * (7500 - 3500);
    const screenRGB = scaleRGB(kelvinToRGB(screenTempK), screenBrightnessFactor);

    readoutOut.textContent = `주변광 ${ambientTempK}K · ${intensityPct}% → 화면 밝기 ${Math.round(screenBrightnessFactor * 100)}% · 색온도 ${Math.round(screenTempK)}K로 자동조정`;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#f4f3ee';
    ctx.textAlign = 'center';

    // 주변광 패널
    const ax = 20, ay = 34, aw = 90, ah = 110;
    ctx.textBaseline = 'bottom';
    ctx.fillText('주변광', ax + aw / 2, ay - 8);
    ctx.fillStyle = rgbCss(ambientRGB);
    ctx.fillRect(ax, ay, aw, ah);
    ctx.strokeStyle = 'rgba(244,243,238,0.3)';
    ctx.strokeRect(ax, ay, aw, ah);

    // 화면 패널 — 상태바 + 아이콘 3개로 "화면"임을 표시
    const sx = 150, sy = 34, sw = 90, sh = 110;
    ctx.fillStyle = '#f4f3ee';
    ctx.textBaseline = 'bottom';
    ctx.fillText('화면', sx + sw / 2, sy - 8);
    ctx.fillStyle = rgbCss(screenRGB);
    ctx.fillRect(sx, sy, sw, sh);
    ctx.fillStyle = rgbCss(scaleRGB(screenRGB, 0.6));
    ctx.fillRect(sx, sy, sw, 10);
    const iconY = sy + 24;
    ctx.fillStyle = rgbCss(lightenRGB(screenRGB, 0.35));
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(sx + 12 + i * 26, iconY, 16, 16);
    }
    ctx.strokeStyle = 'rgba(244,243,238,0.3)';
    ctx.strokeRect(sx, sy, sw, sh);

    ctx.textBaseline = 'top';
    ctx.fillStyle = '#f4f3ee';
    ctx.fillText(`${ambientTempK}K`, ax + aw / 2, ay + ah + 8);
    ctx.fillText(`${Math.round(screenTempK)}K`, sx + sw / 2, sy + sh + 8);
  }

  intensityInput.addEventListener('input', () => {
    state.ambientIntensityPct = parseFloat(intensityInput.value);
    draw();
  });
  tempInput.addEventListener('input', () => {
    state.ambientTempK = parseFloat(tempInput.value);
    draw();
  });

  draw();
}
