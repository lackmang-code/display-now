// 회절 유령점 데모 — 패널의 규칙적 격자가 도트 하나를 여러 개로 복제하면
// "이 점이 어느 점인가"라는 대응(correspondence)이 무너진다.
// 기사 "UPS3: FaceID" 3절에 삽입.
//
// 모델:
//   1차 회절각      sinθ₁ = λ / d          (λ = 940nm, d = 패널 격자 피치)
//   유령점 변위      Δ = z · tanθ₁          (z = 300mm 고정)
//   도트 간격        s = sqrt(A / N),  A = 2z·tan(27°) × 2z·tan(22°)
//   대응 실패 판정    어떤 진짜 점의 반경 r 안에 다른 점의 유령점이 들어오면 그 점은 실패
//
// 두 슬라이더는 각각 하나의 물리량만 담당한다.
//   - 도트 개수 N   → 점 밀도와 점당 출력을 바꾼다(유령점 위치는 그대로)
//   - 격자 피치 d   → 유령점이 얼마나 멀리 떨어지는지만 바꾼다(점 배치는 그대로)
//
// 매칭 허용반경 r은 도트 간격이 아니라 카메라가 점 하나의 위치를 특정할 수 있는 정밀도로
// 정해지므로 0.6mm 고정값으로 둔다. 이 값이 밀도와 함께 움직이면 도트 수를 줄여도 실패율이
// 변하지 않아 물리를 잘못 반영하게 된다.

const WAVELENGTH_MM = 0.00094; // 940 nm
const DISTANCE_MM = 300;
const FOV_H_DEG = 54;
const FOV_V_DEG = 44;
const MATCH_TOL_MM = 0.6;
const WIN_W_MM = 22;
const WIN_H_MM = 17.6;
const PX_PER_MM = 300 / WIN_W_MM;

function makeRandom(seed) {
  let s = seed >>> 0;
  return function random() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function mount(container, params = {}) {
  const state = {
    dotCount: params.dotCount ?? 32000,
    pitchUm: params.pitchUm ?? 55,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>점을 줄일수록 유령점과 헷갈리는 점이 줄어듭니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="300" height="240"></canvas>
        <div class="sim-legend">
          <span>· 흰 점 = 진짜(0차)</span>
          <span>· 옅은 점 = 유령(±1차)</span>
          <span>· 주황 점 = 대응 실패</span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>도트 개수 <span data-out="dots"></span> 개</label>
          <input type="range" min="2500" max="32000" step="500" data-in="dots" />
        </div>
        <div class="sim-control">
          <label>패널 격자 피치 <span data-out="pitch"></span> &micro;m</label>
          <input type="range" min="25" max="100" step="5" data-in="pitch" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      단일 주기 격자의 1차 회절(sin&theta;&#8321;=&lambda;/d)만 반영하고, 유령점은 상하좌우 &plusmn;1차
      네 개만 그린 단순화 모델입니다. 실제 패널은 2차원 비주기 배열이라 유령점 분포가 더 복잡하고,
      고차 회절과 밝기 차이도 함께 나타납니다. 매칭 허용반경은 0.6mm로 고정 가정했으며,
      표시되는 실패율은 균질 배치에서의 기대값이라 캔버스의 주황 점 개수와는 조금씩 다릅니다.
      원리를 보여주기 위한 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const dotsInput = container.querySelector('[data-in="dots"]');
  const pitchInput = container.querySelector('[data-in="pitch"]');
  const dotsOut = container.querySelector('[data-out="dots"]');
  const pitchOut = container.querySelector('[data-out="pitch"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  dotsInput.value = String(state.dotCount);
  pitchInput.value = String(state.pitchUm);

  const totalAreaMm2 =
    2 * DISTANCE_MM * Math.tan((FOV_H_DEG * Math.PI) / 360) *
    2 * DISTANCE_MM * Math.tan((FOV_V_DEG * Math.PI) / 360);

  function draw() {
    const n = state.dotCount;
    const pitchMm = state.pitchUm / 1000;
    dotsOut.textContent = n.toLocaleString('en-US');
    pitchOut.textContent = String(state.pitchUm);

    const sinTheta = Math.min(0.999, WAVELENGTH_MM / pitchMm);
    const thetaDeg = (Math.asin(sinTheta) * 180) / Math.PI;
    const ghostMm = DISTANCE_MM * Math.tan(Math.asin(sinTheta));
    const spacingMm = Math.sqrt(totalAreaMm2 / n);
    const densityPerMm2 = n / totalAreaMm2;
    const powerRatio = 32000 / n;

    // 창 밖 점의 유령점도 창 안으로 들어오므로 여유를 두고 생성한다.
    const margin = ghostMm + MATCH_TOL_MM + 1;
    const genW = WIN_W_MM + margin * 2;
    const genH = WIN_H_MM + margin * 2;
    const genCount = Math.min(6000, Math.round(densityPerMm2 * genW * genH));

    const rand = makeRandom(20260818);
    const dots = new Array(genCount);
    for (let i = 0; i < genCount; i++) {
      dots[i] = { x: rand() * genW - margin, y: rand() * genH - margin };
    }

    // 유령점을 격자 해시에 넣어 근접 검사를 빠르게 한다.
    const cell = MATCH_TOL_MM;
    const buckets = new Map();
    const offsets = [
      [ghostMm, 0], [-ghostMm, 0], [0, ghostMm], [0, -ghostMm],
    ];
    for (let i = 0; i < genCount; i++) {
      for (let k = 0; k < 4; k++) {
        const gx = dots[i].x + offsets[k][0];
        const gy = dots[i].y + offsets[k][1];
        const key = Math.floor(gx / cell) + ',' + Math.floor(gy / cell);
        let arr = buckets.get(key);
        if (!arr) { arr = []; buckets.set(key, arr); }
        arr.push({ x: gx, y: gy, owner: i });
      }
    }

    const tol2 = MATCH_TOL_MM * MATCH_TOL_MM;
    let visible = 0;
    let failed = 0;
    for (let i = 0; i < genCount; i++) {
      const d = dots[i];
      const inWindow = d.x >= 0 && d.x <= WIN_W_MM && d.y >= 0 && d.y <= WIN_H_MM;
      if (!inWindow) { d.fail = false; continue; }
      visible++;
      let bad = false;
      const cx = Math.floor(d.x / cell);
      const cy = Math.floor(d.y / cell);
      for (let ox = -1; ox <= 1 && !bad; ox++) {
        for (let oy = -1; oy <= 1 && !bad; oy++) {
          const arr = buckets.get((cx + ox) + ',' + (cy + oy));
          if (!arr) continue;
          for (let j = 0; j < arr.length; j++) {
            if (arr[j].owner === i) continue;
            const dx = arr[j].x - d.x;
            const dy = arr[j].y - d.y;
            if (dx * dx + dy * dy <= tol2) { bad = true; break; }
          }
        }
      }
      d.fail = bad;
      if (bad) failed++;
    }

    // 화면에 보이는 창은 표본이 적어(성긴 조건에서 십여 개) 실패율이 흔들린다.
    // 점 배치가 균질 포아송 과정이므로 기대값을 닫힌 형태로 계산해 표시한다.
    //   유령점 밀도 = 4 × 도트 밀도, 반경 r 안에 하나 이상 들어올 확률 = 1 − exp(−λπr²)
    // 캔버스의 주황 점(실제 표본)은 이 기대값 주변에서 변동한다.
    const ghostDensity = 4 * densityPerMm2;
    const failPct = (1 - Math.exp(-ghostDensity * Math.PI * MATCH_TOL_MM * MATCH_TOL_MM)) * 100;
    void visible;
    void failed;

    readoutOut.textContent =
      `유령점 변위 ${ghostMm.toFixed(2)}mm(θ₁ ${thetaDeg.toFixed(2)}°) · ` +
      `도트 간격 ${spacingMm.toFixed(2)}mm · 대응 실패 ${failPct.toFixed(0)}% · ` +
      `점당 출력 ×${powerRatio.toFixed(1)}`;

    // ---- 그리기 ----
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const rBase = Math.min(3.2, 1.1 + Math.sqrt(powerRatio) * 0.42);

    // 유령점 먼저(뒤에 깔린다). 진짜 점과 형태로 구분되도록 속 빈 원으로 그린다.
    ctx.strokeStyle = 'rgba(244,243,238,0.34)';
    ctx.lineWidth = 1;
    for (let i = 0; i < genCount; i++) {
      for (let k = 0; k < 4; k++) {
        const gx = (dots[i].x + offsets[k][0]) * PX_PER_MM;
        const gy = (dots[i].y + offsets[k][1]) * PX_PER_MM;
        if (gx < -4 || gy < -4 || gx > canvas.width + 4 || gy > canvas.height + 4) continue;
        ctx.beginPath();
        ctx.arc(gx, gy, rBase * 0.95, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // 진짜 점
    for (let i = 0; i < genCount; i++) {
      const d = dots[i];
      const px = d.x * PX_PER_MM;
      const py = d.y * PX_PER_MM;
      if (px < -4 || py < -4 || px > canvas.width + 4 || py > canvas.height + 4) continue;
      ctx.fillStyle = d.fail ? 'rgba(224,132,62,0.98)' : 'rgba(244,243,238,0.92)';
      ctx.beginPath();
      ctx.arc(px, py, rBase, 0, Math.PI * 2);
      ctx.fill();
    }

  }

  dotsInput.addEventListener('input', () => {
    state.dotCount = parseInt(dotsInput.value, 10);
    draw();
  });
  pitchInput.addEventListener('input', () => {
    state.pitchUm = parseFloat(pitchInput.value);
    draw();
  });

  draw();
}
