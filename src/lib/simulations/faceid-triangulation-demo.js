// 구조광 삼각측량 데모 — 깊이가 연속적으로 변하는 물체(구) 위에서
// 점 패턴이 어떻게 휘는가. 밀린 양이 곧 그 지점의 깊이다.
// 기사 "UPS3: FaceID" 2절(2단계 — 3만 개의 점으로 깊이를 만든다)에 삽입.
//
// 모델:
//   구면 돌출량   Δz(r) = h × sqrt(1 − (r/R)²)      (중심에서 멀어질수록 낮아진다)
//   시차          Δx(r) = b × Δz(r) / z             (기준선 b, 기준면 거리 z)
//   투사 면적     A = W × H,  W = 2z·tan(FOV_h/2),  H = 2z·tan(FOV_v/2)
//   도트 간격     s = sqrt(A / N)
// 두 슬라이더는 각각 하나의 물리량만 담당한다.
//   - 구 돌출 높이 h → 패턴이 휘는 정도(깊이 대비)
//   - 기준면 거리 z  → 전체 시차 배율과 도트 간격
//
// 가정값(본문에도 명시): 기준선 b = 25mm(모듈 실측치가 공개돼 있지 않아 노치 폭을 근거로
// 가정), 도트 수 N = 32,000, 투사 화각 54°×44°.

const BASELINE_MM = 25;
const DOT_COUNT = 32000;
const FOV_H_DEG = 54;
const FOV_V_DEG = 44;

export function mount(container, params = {}) {
  const state = {
    distanceMm: params.distanceMm ?? 300,
    heightMm: params.heightMm ?? 25,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>구 위의 점은 높이에 따라 저마다 다르게 밀립니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="300" height="330"></canvas>
        <div class="sim-legend">
          <span>· 흰 점 = 평면 위(안 밀림)</span>
          <span>· 주황 점 = 구 위(밀림)</span>
          <span>· 아래 띠 = 중앙 가로줄의 간격 비교</span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>구 돌출 높이 <span data-out="height"></span> mm</label>
          <input type="range" min="0" max="60" step="1" data-in="height" />
        </div>
        <div class="sim-control">
          <label>기준면까지 거리 <span data-out="dist"></span> mm</label>
          <input type="range" min="250" max="500" step="10" data-in="dist" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      기준선 b = 25mm, 도트 3만 개, 화각 54&deg;&times;44&deg;를 가정하고 구면 돌출
      &Delta;z = h&radic;(1&minus;(r/R)&sup2;)에 대해 시차 &Delta;x = b&Delta;z/z 로 계산한 단순화 모델입니다.
      애플은 모듈 내부 치수를 공개하지 않아 기준선은 노치 폭을 근거로 한 가정값이며, 실제
      페이스ID는 렌즈 왜곡 보정과 기기별 캘리브레이션을 함께 씁니다. 화면의 점은 보기 좋도록
      실제보다 성기게 그렸고 변위도 같은 기준(도트 간격의 몇 배)으로 그렸습니다 &mdash;
      즉 그림의 변위/간격 비율은 실제와 같고, 리드아웃 수치도 실제 계산값입니다.
      원리를 보여주기 위한 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const heightInput = container.querySelector('[data-in="height"]');
  const distInput = container.querySelector('[data-in="dist"]');
  const heightOut = container.querySelector('[data-out="height"]');
  const distOut = container.querySelector('[data-out="dist"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  heightInput.value = String(state.heightMm);
  distInput.value = String(state.distanceMm);

  // 표시 프레임(화면 좌표). 구는 캔버스 중앙에 놓는다.
  const cx = 150;
  const cy = 128;
  const sphereR = 88; // px
  // 구의 실제 반지름(물리) — 화면 축척과 맞추기 위한 표시용 환산값
  const SPHERE_R_MM = 45;
  const pxPerMm = sphereR / SPHERE_R_MM;

  function draw() {
    const z = state.distanceMm;
    const h = state.heightMm;
    heightOut.textContent = String(h);
    distOut.textContent = String(z);

    const widthMm = 2 * z * Math.tan((FOV_H_DEG * Math.PI) / 360);
    const heightFovMm = 2 * z * Math.tan((FOV_V_DEG * Math.PI) / 360);
    const spacingMm = Math.sqrt((widthMm * heightFovMm) / DOT_COUNT);
    const centerDisparityMm = (BASELINE_MM * h) / z;
    const ratio = spacingMm > 0 ? centerDisparityMm / spacingMm : 0;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 구 윤곽 — 깊이가 연속적으로 변하는 영역임을 표시
    ctx.strokeStyle = 'rgba(224,132,62,0.42)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
    ctx.stroke();

    // 등고선 — 깊이가 여러 단으로 변한다는 것을 눈에 보이게 한다
    ctx.strokeStyle = 'rgba(224,132,62,0.16)';
    for (let k = 1; k <= 3; k++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (sphereR * k) / 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 도트 격자 (위쪽 2D 영역만 사용. 아래는 1D 간격 비교 띠)
    const stepPx = 11;
    const gridBottom = 236;
    for (let py = 14; py <= gridBottom; py += stepPx) {
      for (let px = 14; px <= canvas.width - 14; px += stepPx) {
        const dx = px - cx;
        const dy = py - cy;
        const rPx = Math.sqrt(dx * dx + dy * dy);

        let dzMm = 0;
        if (rPx < sphereR) {
          const norm = rPx / sphereR;
          dzMm = h * Math.sqrt(Math.max(0, 1 - norm * norm));
        }

        if (dzMm <= 0.01) {
          ctx.fillStyle = 'rgba(244,243,238,0.72)';
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // 화면에서는 점을 실제보다 성기게 그린다. 변위도 같은 기준으로 —
        // "도트 간격의 몇 배로 밀렸는가" — 그려야 비율이 실제와 일치한다.
        const localDisparityMm = (BASELINE_MM * dzMm) / z;
        const shiftPx = (localDisparityMm / spacingMm) * stepPx;

        // 밀린 자리만 그린다. 원래 격자를 함께 겹쳐 그리면 두 격자가 간섭해
        // 무늬(무아레)가 생기고, 정작 봐야 할 "간격 변화"가 가려진다.
        ctx.fillStyle = 'rgba(224,132,62,0.92)';
        ctx.beginPath();
        ctx.arc(px + shiftPx, py, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ── 1D 간격 비교 띠 ───────────────────────────────────────────────
    // 시차 자체는 높이에 비례하지만, 이웃 점 사이 "간격"은 높이의 기울기에 비례한다.
    // 구 중심은 가장 많이 밀리면서도 간격은 그대로이고, 가장자리는 덜 밀리면서 간격이
    // 가장 많이 변한다. 중앙 가로줄을 뽑아 원래 간격과 밀린 뒤 간격을 나란히 보인다.
    const stripY0 = 268; // 원래 간격
    const stripY1 = 312; // 밀린 뒤 간격
    ctx.strokeStyle = 'rgba(244,243,238,0.14)';
    ctx.beginPath();
    ctx.moveTo(0, 246);
    ctx.lineTo(canvas.width, 246);
    ctx.stroke();

    const origXs = [];
    const shiftedXs = [];
    for (let px = 14; px <= canvas.width - 14; px += stepPx) {
      const dxm = px - cx;
      const rPx = Math.abs(dxm);
      let dzMm = 0;
      if (rPx < sphereR) {
        const norm = rPx / sphereR;
        dzMm = h * Math.sqrt(Math.max(0, 1 - norm * norm));
      }
      const localDisparityMm = (BASELINE_MM * dzMm) / z;
      origXs.push(px);
      shiftedXs.push(px + (localDisparityMm / spacingMm) * stepPx);
    }

    // 간격 변화율 계산 (그려진 것과 동일한 표본)
    let maxExpand = 0;
    let maxCompress = 0;
    for (let i = 0; i < shiftedXs.length - 1; i++) {
      const gap = shiftedXs[i + 1] - shiftedXs[i];
      const rel = (gap - stepPx) / stepPx;
      if (rel > maxExpand) maxExpand = rel;
      if (rel < maxCompress) maxCompress = rel;
    }

    for (let i = 0; i < origXs.length; i++) {
      ctx.fillStyle = 'rgba(244,243,238,0.85)';
      ctx.beginPath();
      ctx.arc(origXs[i], stripY0, 2.1, 0, Math.PI * 2);
      ctx.fill();

      const onSphere = Math.abs(origXs[i] - cx) < sphereR && h > 0;
      ctx.fillStyle = onSphere ? 'rgba(224,132,62,1)' : 'rgba(244,243,238,0.85)';
      ctx.beginPath();
      ctx.arc(shiftedXs[i], stripY1, 2.1, 0, Math.PI * 2);
      ctx.fill();
    }

    // 구가 걸치는 구간 표시 — 간격이 변하는 범위가 어디인지 눈으로 잡히게 한다
    if (h > 0) {
      ctx.strokeStyle = 'rgba(224,132,62,0.3)';
      ctx.beginPath();
      ctx.moveTo(cx - sphereR, stripY1 + 9);
      ctx.lineTo(cx + sphereR, stripY1 + 9);
      ctx.stroke();
    }

    ctx.font = '11px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(244,243,238,0.72)';
    ctx.fillText('원래 — 등간격', 8, stripY0 - 15);
    ctx.fillStyle = 'rgba(224,132,62,0.95)';
    ctx.fillText('밀린 뒤 — 왼쪽 벌어짐 / 오른쪽 좁아짐', 8, stripY1 - 15);

    // 라벨 — 도트와 겹치지 않도록 배경 박스와 함께
    ctx.font = '11px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const label = `구 돌출 ${h}mm`;
    const w = ctx.measureText(label).width;
    ctx.fillStyle = 'rgba(13,13,10,0.9)';
    ctx.fillRect(8, 10, w + 10, 18);
    ctx.fillStyle = 'rgba(224,132,62,0.95)';
    ctx.fillText(label, 13, 19);

    readoutOut.textContent =
      `도트 간격 ${spacingMm.toFixed(2)}mm · 중심 시차 ${centerDisparityMm.toFixed(2)}mm ` +
      `(간격의 ${ratio.toFixed(2)}배) · 간격 변화 최대 ` +
      `+${(maxExpand * 100).toFixed(0)}% / ${(maxCompress * 100).toFixed(0)}%`;
  }

  heightInput.addEventListener('input', () => {
    state.heightMm = parseFloat(heightInput.value);
    draw();
  });
  distInput.addEventListener('input', () => {
    state.distanceMm = parseFloat(distInput.value);
    draw();
  });

  draw();
}
