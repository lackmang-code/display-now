// 데모 시뮬레이션 — behind-OLED ALS가 겪는 크로스토크(화소 자체 발광 잡음)를 블랭킹
// 동기화 정밀도와 열지도(heat map) 보정 강도 두 변수로 얼마나 걷어낼 수 있는지 보여준다.
// 근거: 2026-08-14 기사 3절 "화소 자신의 빛과 싸우다". 특허 US12498264(디스플레이-ALS
// 크로스토크 보정, 히트맵+emission mask)의 2단계 구조(동기화 → 보정)를 그대로 따랐다.
// 단순화: 오차(%)는 두 변수에 대한 임의의 감쇠 함수이며 실측 SNR·정확도 수치가 아니다 —
// 아래 sim-note 고지 참조.

export function mount(container, params = {}) {
  const state = {
    syncErrorPct: params.syncErrorPct ?? 40,
    correctionPct: params.correctionPct ?? 50,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>동기화 오차와 보정 강도가 측정 오차를 어떻게 바꾸는지</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="240" height="200"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>블랭킹 동기화 오차 <span data-out="sync"></span>%</label>
          <input type="range" min="0" max="100" step="5" data-in="sync" />
        </div>
        <div class="sim-control">
          <label>열지도 보정 강도 <span data-out="correction"></span>%</label>
          <input type="range" min="0" max="100" step="5" data-in="correction" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      측정 오차(%)는 동기화 오차·보정 강도에 대한 정성적 감쇠 함수로 계산한 단순화 모델이며
      실측 SNR·정확도 수치가 아닙니다. 보정이 강해져도 오차가 완전히 0이 되지 않는 것은
      "열지도 보정도 완벽하지 않다"는 사실만 반영한 것입니다. 원리를 보여주기 위한 모델입니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const syncInput = container.querySelector('[data-in="sync"]');
  const correctionInput = container.querySelector('[data-in="correction"]');
  const syncOut = container.querySelector('[data-out="sync"]');
  const correctionOut = container.querySelector('[data-out="correction"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  syncInput.value = String(state.syncErrorPct);
  correctionInput.value = String(state.correctionPct);

  function drawBar(x, w, pct, color, label) {
    const plotBottom = 160;
    const plotTop = 20;
    const h = ((plotBottom - plotTop) * Math.min(100, Math.max(0, pct))) / 100;
    ctx.fillStyle = 'rgba(244,243,238,0.15)';
    ctx.fillRect(x, plotTop, w, plotBottom - plotTop);
    ctx.fillStyle = color;
    ctx.fillRect(x, plotBottom - h, w, h);

    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#f4f3ee';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(pct.toFixed(0) + '%', x + w / 2, plotBottom - h - 4);
    ctx.textBaseline = 'top';
    ctx.fillText(label, x + w / 2, plotBottom + 6);
  }

  function draw() {
    const sync = state.syncErrorPct;
    const corr = state.correctionPct / 100;
    syncOut.textContent = String(sync);
    correctionOut.textContent = String(state.correctionPct);

    const rawErrorPct = sync * 0.8;
    const correctedErrorPct = rawErrorPct * (1 - corr * 0.9);

    readoutOut.textContent = `보정 전 오차 ≈ ${rawErrorPct.toFixed(1)}% · 보정 후 오차 ≈ ${correctedErrorPct.toFixed(1)}%`;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBar(30, 60, rawErrorPct, 'rgba(244,243,238,0.9)', '보정 전');
    drawBar(150, 60, correctedErrorPct, 'rgba(214,120,53,0.95)', '보정 후');
  }

  syncInput.addEventListener('input', () => {
    state.syncErrorPct = parseFloat(syncInput.value);
    draw();
  });
  correctionInput.addEventListener('input', () => {
    state.correctionPct = parseFloat(correctionInput.value);
    draw();
  });

  draw();
}
