// 데모 시뮬레이션 — 근접 센서 신호가 왕복 투과율 T²에 비례해 줄어드는 관계와,
// 차광층(BML) 차폐 비율을 높일수록 T1 보호는 늘지만 IR 투과율이 함께 줄어드는
// 트레이드오프를 보여준다.
// 근거: 2026-08-14 기사 "화면에 손이 가까워지면" 2~3절.
// 단순화: T_eff = T_base × (1 − shieldRatio × 0.9), 신호 = T_eff².
// 계수 0.9는 "차광층이 100%여도 픽셀 개구부 틈으로 최소한의 IR은 남는다"는 정성적
// 사실만 반영한 임의값이며 실측 비율이 아니다 — 아래 sim-note 고지 참조.

export function mount(container, params = {}) {
  const state = {
    baseTransmittancePct: params.baseTransmittancePct ?? 6,
    shieldRatioPct: params.shieldRatioPct ?? 40,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>차광 비율을 올리면 T1은 보호되지만 신호는 줄어듭니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="240" height="200"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>패널 IR 개구 투과율 T <span data-out="base"></span>%</label>
          <input type="range" min="3" max="10" step="0.5" data-in="base" />
        </div>
        <div class="sim-control">
          <label>차광층(BML) 차폐 비율 <span data-out="shield"></span>%</label>
          <input type="range" min="0" max="100" step="5" data-in="shield" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      T_eff = T &times; (1 &minus; 차폐비율&times;0.9), 신호 = T_eff&sup2; 로 계산한 단순화
      모델입니다. 계수 0.9는 "차광층이 100%여도 픽셀 개구부로 최소한의 IR은 남는다"는
      정성적 사실만 반영한 임의값이며, 실제 차광 효율이나 픽셀 레이아웃을 반영한 수치가
      아닙니다. 원리를 보여주기 위한 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const baseInput = container.querySelector('[data-in="base"]');
  const shieldInput = container.querySelector('[data-in="shield"]');
  const baseOut = container.querySelector('[data-out="base"]');
  const shieldOut = container.querySelector('[data-out="shield"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  baseInput.value = String(state.baseTransmittancePct);
  shieldInput.value = String(state.shieldRatioPct);

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
    const base = state.baseTransmittancePct;
    const shield = state.shieldRatioPct / 100;
    baseOut.textContent = base.toFixed(1);
    shieldOut.textContent = String(state.shieldRatioPct);

    const tEff = base * (1 - shield * 0.9);
    const signalPctOfBase = Math.pow(tEff / base, 2) * 100;
    const roundTripSignalPct = Math.pow(tEff / 100, 2) * 100;

    readoutOut.textContent = `T_eff ≈ ${tEff.toFixed(2)}% · 왕복 신호(T²) ≈ ${roundTripSignalPct.toFixed(3)}% · T1 보호율 ${state.shieldRatioPct}%`;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBar(30, 60, state.shieldRatioPct, 'rgba(244,243,238,0.9)', 'T1 보호율');
    drawBar(150, 60, signalPctOfBase, 'rgba(214,120,53,0.95)', '신호 유지율');
  }

  baseInput.addEventListener('input', () => {
    state.baseTransmittancePct = parseFloat(baseInput.value);
    draw();
  });
  shieldInput.addEventListener('input', () => {
    state.shieldRatioPct = parseFloat(shieldInput.value);
    draw();
  });

  draw();
}
