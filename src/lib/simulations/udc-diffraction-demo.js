// 데모 시뮬레이션 — UDC(언더디스플레이 카메라) 회절이 만드는 세 가지 화질 저하
// 개념도(정성적 시각화)이며 축척이 맞는 물리 시뮬레이션이 아니다. 세 효과를 서로 다른
// 파라미터로 나눠 배정해 슬라이더 하나를 움직이면 해당 효과만 뚜렷이 바뀌도록 설계했다.
// - 흐림(Blur): 틈 폭 → 회절각 θ ≈ λ/a 가 커질수록 중심 글로우가 커진다 (물리 그대로)
// - 헤일로(Halo): 스펙트럼 폭 → 광원에 섞인 파장 범위가 넓을수록 파장별 회절각 차이가
//   커져 색 테두리(링)가 넓게 벌어진다. 0이면 단색광이라 색 분리가 없다는 뜻으로 링이 사라진다.
// - 플레어(Flare): 격자 규칙도 → 픽셀 개구가 규칙적으로 반복될수록(격자성이 높을수록) 특정
//   방향으로 정렬된 회절 차수(별모양 줄무늬)가 또렷해진다. 0이면 불규칙 배열이라 줄무늬가 없다.
// 근거: 2026-08-11 기사 "OLED 픽셀 아래에서 사진을 찍으면" 2절
// ("규칙적으로 반복되는 좁은 틈을 통과한 파동은 사방으로 퍼지고 서로 간섭하며 무늬를 만듭니다")
// 실제 UDC 격자는 다중 개구·이중 패턴 구조라 이보다 복잡하다 — 아래 sim-note 고지 참조.

export function mount(container, params = {}) {
  const state = {
    apertureUm: params.apertureUm ?? 3,
    wavelengthNm: params.wavelengthNm ?? 550,
    spectralWidthNm: params.spectralWidthNm ?? 90,
    gridRegularityPct: params.gridRegularityPct ?? 70,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>슬라이더 각각이 흐림·헤일로·플레어 중 하나만 바꿉니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="220" height="220"></canvas>
        <div class="sim-legend">
          <span>● 흐림</span>
          <span>◌ 헤일로</span>
          <span>✦ 플레어</span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>틈 폭 <span data-out="aperture"></span> &micro;m (흐림)</label>
          <input type="range" min="1" max="8" step="0.1" data-in="aperture" />
        </div>
        <div class="sim-control">
          <label>스펙트럼 폭 <span data-out="spectral"></span> nm (헤일로)</label>
          <input type="range" min="0" max="200" step="10" data-in="spectral" />
        </div>
        <div class="sim-control">
          <label>격자 규칙도 <span data-out="grid"></span>% (플레어)</label>
          <input type="range" min="0" max="100" step="5" data-in="grid" />
        </div>
        <div class="sim-control">
          <label>중심 파장 <span data-out="wavelength"></span> nm (색조)</label>
          <input type="range" min="450" max="650" step="5" data-in="wavelength" />
        </div>
        <div class="sim-readout" data-out="theta"></div>
      </div>
    </div>
    <div class="sim-note">
      단일 틈 회절의 1차 근사(&theta; &asymp; &lambda;/a)에서 출발한 개념도입니다. 실측 축척이
      아니며, 헤일로·플레어는 각각 "스펙트럼 폭"·"격자 규칙도"라는 별도 파라미터로 과장해
      표현해 세 효과를 눈으로 구분하기 쉽게 만들었습니다. 실제 UDC 격자는 다중 개구·이중 패턴
      구조라 회절 양상이 더 복잡합니다. 원리를 보여주기 위한 단순화 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const apertureInput = container.querySelector('[data-in="aperture"]');
  const wavelengthInput = container.querySelector('[data-in="wavelength"]');
  const spectralInput = container.querySelector('[data-in="spectral"]');
  const gridInput = container.querySelector('[data-in="grid"]');
  const apertureOut = container.querySelector('[data-out="aperture"]');
  const wavelengthOut = container.querySelector('[data-out="wavelength"]');
  const spectralOut = container.querySelector('[data-out="spectral"]');
  const gridOut = container.querySelector('[data-out="grid"]');
  const thetaOut = container.querySelector('[data-out="theta"]');

  apertureInput.value = String(state.apertureUm);
  wavelengthInput.value = String(state.wavelengthNm);
  spectralInput.value = String(state.spectralWidthNm);
  gridInput.value = String(state.gridRegularityPct);

  // 헤일로 링 6개의 상대 순번(파장이 짧을수록 안쪽, 길수록 바깥쪽) — 실제 파장값이 아니라
  // "짧은 파장이 회절각이 작다"는 사실만 순서로 반영한다.
  const HALO_RING_COLORS_NM = [450, 480, 510, 550, 590, 630];

  function wavelengthToColor(nm, alpha = 1) {
    // 가시광 파장 → 대략적 RGB. 표시용 근사이며 색채학적으로 정밀하지 않음.
    let rgb;
    if (nm < 490) rgb = [80, 140, 255];
    else if (nm < 560) rgb = [90, 210, 120];
    else if (nm < 600) rgb = [230, 210, 70];
    else rgb = [235, 110, 80];
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
  }

  function label(text, x, y) {
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(13,13,10,0.85)';
    ctx.strokeText(text, x, y);
    ctx.fillStyle = '#f4f3ee';
    ctx.fillText(text, x, y);
  }

  function draw() {
    const a = state.apertureUm;
    const thetaMrad = ((state.wavelengthNm / 1000) / a) * 1000;

    apertureOut.textContent = a.toFixed(1);
    wavelengthOut.textContent = String(state.wavelengthNm);
    spectralOut.textContent = String(state.spectralWidthNm);
    gridOut.textContent = String(state.gridRegularityPct);
    thetaOut.textContent = `회절각 θ ≈ ${thetaMrad.toFixed(1)} mrad (흐림 크기를 결정)`;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const color = wavelengthToColor(state.wavelengthNm);

    // 흐림 반경 — 틈 폭(aperture)만으로 결정
    const radius = Math.max(6, Math.min(canvas.width * 0.4, thetaMrad * 0.22));

    // 플레어 — 격자 규칙도가 0이면 사실상 사라지고, 100%면 길고 또렷한 8방향 줄무늬가 된다.
    // 실제 렌즈 플레어처럼 중심은 두껍고 끝으로 갈수록 가늘어지는 쐐기 모양 + 알파 그라디언트로 그린다.
    const gridT = state.gridRegularityPct / 100;
    const flareLen = canvas.width * 0.42 * gridT;
    const flareBaseHalfWidth = 1.5 + 3.5 * gridT;
    const flareBaseAlpha = 0.35 + 0.5 * gridT;
    if (gridT > 0.02) {
      for (let k = 0; k < 8; k++) {
        const ang = (Math.PI / 4) * k;
        const dx = Math.cos(ang);
        const dy = Math.sin(ang);
        const px = -dy;
        const py = dx;
        const tipX = cx + dx * flareLen;
        const tipY = cy + dy * flareLen;

        const grad = ctx.createLinearGradient(cx, cy, tipX, tipY);
        grad.addColorStop(0, `rgba(244,243,238,${flareBaseAlpha})`);
        grad.addColorStop(1, 'rgba(244,243,238,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(cx + px * flareBaseHalfWidth, cy + py * flareBaseHalfWidth);
        ctx.lineTo(tipX, tipY);
        ctx.lineTo(cx - px * flareBaseHalfWidth, cy - py * flareBaseHalfWidth);
        ctx.closePath();
        ctx.fill();
      }
    }

    // 헤일로 — 스펙트럼 폭이 0이면 링이 흐림 반경에 겹쳐 사라지고, 커질수록 6개 링이 밖으로 벌어진다.
    const ringStepPx = state.spectralWidthNm * 0.05;
    let outerRingR = 0;
    if (ringStepPx > 0.5) {
      HALO_RING_COLORS_NM.forEach((nm, j) => {
        const r = Math.min(canvas.width * 0.47, radius + (j + 1) * ringStepPx);
        ctx.strokeStyle = wavelengthToColor(nm, 0.8);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        outerRingR = Math.max(outerRingR, r);
      });
    }

    // 흐림 — 중심 글로우
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f4f3ee';
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fill();

    // 캔버스 위 이름표 — 각 효과를 직접 가리켜 구분을 돕는다. 값이 0에 가까워 해당 효과가
    // 안 보일 때는 이름표도 함께 생략한다.
    label('흐림', cx, cy + Math.max(16, radius * 0.5));
    if (outerRingR > radius + 1) {
      const haloAng = (Math.PI / 8) * 3; // 67.5°, 플레어 줄기와 겹치지 않는 방향
      label('헤일로', cx + Math.cos(haloAng) * outerRingR, cy + Math.sin(haloAng) * outerRingR);
    }
    if (flareLen > radius) {
      const flareAng = (Math.PI / 4) * 3; // 135°, 실제 그려진 플레어 줄 위
      label('플레어', cx + Math.cos(flareAng) * flareLen * 0.85, cy + Math.sin(flareAng) * flareLen * 0.85);
    }
  }

  apertureInput.addEventListener('input', () => {
    state.apertureUm = parseFloat(apertureInput.value);
    draw();
  });
  wavelengthInput.addEventListener('input', () => {
    state.wavelengthNm = parseFloat(wavelengthInput.value);
    draw();
  });
  spectralInput.addEventListener('input', () => {
    state.spectralWidthNm = parseFloat(spectralInput.value);
    draw();
  });
  gridInput.addEventListener('input', () => {
    state.gridRegularityPct = parseFloat(gridInput.value);
    draw();
  });

  draw();
}
