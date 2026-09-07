// 시뮬레이션 — 유리 기판의 강점인 대면적이 그대로 수율의 적이 된다는 것을 보여준다.
// 이 기사 「수율 40%가 실제로 뜻하는 것」 절의 계산을 손으로 만져 보게 하는 장치다.
//
// 모델과 한계
// - 비아 하나하나의 불량이 서로 독립이라고 본 가장 단순한 이항 모형이다.
//   패키지 수율 Y = (1 - f)^N, N = 비아 밀도 x 패키지 면적.
// - 실제 공정에서는 결함이 특정 구역에 몰려 생기는 경향이 있어(클러스터링) 같은 평균
//   불량률에서도 실제 수율은 이 모델보다 높게 나오는 것이 보통이다. 반대로 도금 불량처럼
//   한 배치가 통째로 어긋나는 유형은 이 모델보다 나쁘게 나온다. 절대값을 맞히려는 계산이
//   아니라, 면적이 늘 때 수율이 지수로 꺾인다는 관계를 보여주려는 것이다.
// - 비아 밀도 225 / 1,024 / 3,000 개per cm2는 앱솔릭스 등록특허 US11437308B2가 적은
//   실시 범위(단위면적 1cm x 1cm 당 100~3,000개, 실시예 225개와 1,024개)에서 가져왔다.
// - 40% 선은 욜그룹이 집계한 현재 유리 인터포저 수율, 70% 선은 같은 곳 개리 후앙 부사장이
//   말한 비용 효율 확보선이다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

const DENSITIES = {
  d225: { label: '225', v: 225, color: '#8fb59a' },
  d1024: { label: '1,024', v: 1024, color: '#c9a86a' },
  d3000: { label: '3,000', v: 3000, color: '#c2705a' },
};

const AREA_MIN = 1;    // cm2
const AREA_MAX = 100;  // cm2
const REF_AREA = 25;   // 50mm x 50mm

export function mount(container, params = {}) {
  const state = {
    ppm: params.ppm ?? 36,
    density: params.density ?? 'd1024',
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Large area is the whole point of glass. It is also what kills the yield.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="440" height="366"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Via density (per cm&sup2;)</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-den="d225" aria-pressed="false">225</button>
            <button type="button" class="sim-toggle-btn" data-den="d1024" aria-pressed="true">1,024</button>
            <button type="button" class="sim-toggle-btn" data-den="d3000" aria-pressed="false">3,000</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Per-via defect rate &mdash; <span data-out="ppm"></span> ppm</label>
          <input type="range" min="1" max="200" step="1" data-in="ppm" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const ppmInput = container.querySelector('[data-in="ppm"]');
  const ppmOut = container.querySelector('[data-out="ppm"]');
  const readout = container.querySelector('[data-out="readout"]');
  const btns = Array.from(container.querySelectorAll('[data-den]'));

  ppmInput.value = String(state.ppm);

  const DIM = 'rgba(244,243,238,0.55)';
  const FAINT = 'rgba(244,243,238,0.32)';
  const LINE = 'rgba(244,243,238,0.20)';

  const X0 = 54, X1 = 420, Y0 = 40, Y1 = 250;

  const fx = (a) => X0 + ((a - AREA_MIN) / (AREA_MAX - AREA_MIN)) * (X1 - X0);
  const fy = (y) => Y1 - y * (Y1 - Y0);

  const yieldAt = (area, dens, ppm) =>
    Math.exp(-(ppm * 1e-6) * dens * area);

  function drawCurve(dens, color, active) {
    ctx.beginPath();
    for (let i = 0; i <= 200; i += 1) {
      const a = AREA_MIN + ((AREA_MAX - AREA_MIN) * i) / 200;
      const y = yieldAt(a, dens, state.ppm);
      const x = fx(a), yy = fy(y);
      if (i === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = active ? 2.4 : 1.1;
    ctx.globalAlpha = active ? 1 : 0.4;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function draw() {
    state.ppm = Number(ppmInput.value);
    ppmOut.textContent = state.ppm;
    const d = DENSITIES[state.density];

    ctx.clearRect(0, 0, 440, 366);

    // 기준 대역
    ctx.fillStyle = 'rgba(194,112,90,0.13)';
    ctx.fillRect(X0, fy(0.70), X1 - X0, fy(0.40) - fy(0.70));

    // 격자
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    for (const y of [0, 0.2, 0.4, 0.6, 0.8, 1.0]) {
      ctx.beginPath(); ctx.moveTo(X0, fy(y)); ctx.lineTo(X1, fy(y)); ctx.stroke();
    }
    for (const a of [1, 25, 50, 75, 100]) {
      ctx.beginPath(); ctx.moveTo(fx(a), Y0); ctx.lineTo(fx(a), Y1); ctx.stroke();
    }

    // 40 / 70 선
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = 'rgba(214,150,128,0.75)';
    ctx.beginPath(); ctx.moveTo(X0, fy(0.40)); ctx.lineTo(X1, fy(0.40)); ctx.stroke();
    ctx.strokeStyle = 'rgba(143,181,154,0.75)';
    ctx.beginPath(); ctx.moveTo(X0, fy(0.70)); ctx.lineTo(X1, fy(0.70)); ctx.stroke();
    ctx.setLineDash([]);

    // 축
    ctx.strokeStyle = 'rgba(244,243,238,0.45)';
    ctx.beginPath();
    ctx.moveTo(X0, Y0); ctx.lineTo(X0, Y1); ctx.lineTo(X1, Y1);
    ctx.stroke();

    for (const key of ['d225', 'd1024', 'd3000']) {
      drawCurve(DENSITIES[key].v, DENSITIES[key].color, key === state.density);
    }

    // 25 cm2 지점
    const yRef = yieldAt(REF_AREA, d.v, state.ppm);
    const px = fx(REF_AREA), py = fy(yRef);
    ctx.strokeStyle = 'rgba(244,243,238,0.35)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(px, Y1); ctx.lineTo(px, py); ctx.lineTo(X0, py);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = d.color;
    ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();

    // 눈금
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillStyle = DIM;
    ctx.textAlign = 'right';
    for (const y of [0, 0.2, 0.4, 0.6, 0.8, 1.0]) {
      ctx.fillText(Math.round(y * 100) + '%', X0 - 7, fy(y) + 3.5);
    }
    ctx.textAlign = 'center';
    for (const a of [1, 25, 50, 75, 100]) {
      ctx.fillText(String(a), fx(a), Y1 + 15);
    }

    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.fillText('Package area (cm²)', (X0 + X1) / 2, Y1 + 32);
    ctx.save();
    ctx.translate(14, (Y0 + Y1) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Package yield', 0, 0);
    ctx.restore();

    // 기준선 이름
    ctx.textAlign = 'left';
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'rgba(143,181,154,0.9)';
    ctx.fillText('70%  cost-effective line', X0 + 8, fy(0.70) - 5);
    ctx.fillStyle = 'rgba(214,150,128,0.9)';
    ctx.fillText('40%  where the industry is now', X0 + 8, fy(0.40) - 5);

    // 25cm2 라벨
    ctx.fillStyle = FAINT;
    ctx.fillText('50 x 50 mm', px + 6, Y1 - 6);

    const n = Math.round(d.v * REF_AREA);
    readout.innerHTML =
      `A 25 cm&sup2; package holds <b>${n.toLocaleString('en-US')}</b> vias &rarr; yield <b>${(yRef * 100).toFixed(1)}%</b>`;

    // 아래 두 줄 해설
    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.fillStyle = DIM;
    ctx.fillText(
      `${n.toLocaleString('en-US')} vias at ${state.ppm} ppm  ->  ${(yRef * 100).toFixed(1)}% yield`,
      X0, Y1 + 56,
    );
    const y100 = yieldAt(100, d.v, state.ppm);
    ctx.fillStyle = FAINT;
    ctx.fillText(
      `Four times the area drops it to ${(y100 * 100).toFixed(1)}%`,
      X0, Y1 + 74,
    );
  }

  ppmInput.addEventListener('input', draw);
  btns.forEach((b) => {
    b.addEventListener('click', () => {
      state.density = b.dataset.den;
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      draw();
    });
  });

  draw();
}
