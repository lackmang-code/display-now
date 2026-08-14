// 데모 시뮬레이션 — BPDL/BM 소재의 파장별 투과율 스펙트럼. 가시광은 차단하면서
// 940nm 근적외선만 통과시키는 이중특성 소재가 실제로 존재한다는 것을 스펙트럼
// 곡선으로 보여준다.
// 근거: 2026-08-14 기사 4절 "가시광은 차단·IR만 통과시키는 BPDL/BM 소재의 모순적 요구".
// 이중특성 소재의 스펙트럼 수치(가시광 400~800nm에서 투과율 ≤1%, 근적외선 800~1100nm에서
// ≥80%)는 특허 US20160200912A1(디스플레이용 차광 안료 조성물)의 수치를 그대로 따른다.
// 기존 소재(카본블랙 계열)는 두 대역을 구분하지 못하고 균일하게 낮은 투과율을 보인다는
// 사실만 반영했고, 곡선의 정확한 기울기·전이 파장은 근사치다 — 아래 sim-note 고지 참조.

export function mount(container, params = {}) {
  const state = {
    material: params.material ?? 'dual',
    coveragePct: params.coveragePct ?? 50,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>소재를 바꾸면 가시광·IR 투과 스펙트럼이 어떻게 달라지는지</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap"><canvas width="280" height="190"></canvas></div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>BM 소재</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-material="conventional" aria-pressed="false">기존(카본블랙계)</button>
            <button type="button" class="sim-toggle-btn" data-material="dual" aria-pressed="true">이중특성(페릴렌계)</button>
          </div>
        </div>
        <div class="sim-control">
          <label>BM 두께/커버리지 <span data-out="coverage"></span>%</label>
          <input type="range" min="0" max="100" step="5" data-in="coverage" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      이중특성 소재의 스펙트럼(가시광 400~800nm ≤1%, 근적외선 800~1100nm ≥80%)은 특허
      US20160200912A1의 수치를 따랐습니다. 기존 소재는 두 대역을 구분하지 못하고 균일하게
      낮은 투과율을 보인다는 사실만 반영한 근사 곡선입니다. 두께/커버리지를 올리면 두 소재
      모두 전체적으로 더 어두워지지만, 이중특성 소재만 940nm 근처의 높은 투과율을 유지합니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const coverageInput = container.querySelector('[data-in="coverage"]');
  const coverageOut = container.querySelector('[data-out="coverage"]');
  const readoutOut = container.querySelector('[data-out="readout"]');
  const materialButtons = Array.from(container.querySelectorAll('.sim-toggle-btn'));

  coverageInput.value = String(state.coveragePct);

  const margin = { left: 32, right: 10, top: 10, bottom: 22 };
  const plotW = canvas.width - margin.left - margin.right;
  const plotH = canvas.height - margin.top - margin.bottom;
  const WL_MIN = 400;
  const WL_MAX = 1100;

  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  function baseTransmittance(wl, material) {
    if (material === 'conventional') {
      return 2; // 카본블랙계 — 가시광·IR 구분 없이 균일하게 낮음(근사)
    }
    const t = sigmoid((wl - 800) / 18);
    return 1 + (80 - 1) * t;
  }

  function transmittance(wl, material, coveragePct) {
    const t0 = baseTransmittance(wl, material);
    const atten = Math.exp((-coveragePct / 100) * 1.5);
    return Math.max(0, Math.min(100, t0 * atten));
  }

  function px(wl) {
    return margin.left + ((wl - WL_MIN) / (WL_MAX - WL_MIN)) * plotW;
  }
  function py(v) {
    return margin.top + (1 - Math.min(100, Math.max(0, v)) / 100) * plotH;
  }

  function drawAxes() {
    ctx.strokeStyle = 'rgba(244,243,238,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + plotH);
    ctx.lineTo(margin.left + plotW, margin.top + plotH);
    ctx.stroke();

    ctx.font = '9px sans-serif';
    ctx.fillStyle = 'rgba(244,243,238,0.55)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    [0, 50, 100].forEach((v) => ctx.fillText(String(v), margin.left - 4, py(v)));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    [400, 750, 1100].forEach((wl) => ctx.fillText(String(wl), px(wl), margin.top + plotH + 4));
    ctx.save();
    ctx.translate(9, margin.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('투과율(%)', 0, 0);
    ctx.restore();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('파장(nm)', margin.left + plotW / 2, canvas.height - 11);
  }

  function draw() {
    const cov = state.coveragePct;
    coverageOut.textContent = String(cov);

    const visibleT = transmittance(550, state.material, cov);
    const irT = transmittance(940, state.material, cov);
    readoutOut.textContent = `가시광(550nm) 투과율 ≈ ${visibleT.toFixed(1)}% · IR(940nm) 투과율 ≈ ${irT.toFixed(1)}%`;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 가시광 대역 음영
    ctx.fillStyle = 'rgba(120,150,255,0.08)';
    ctx.fillRect(px(400), margin.top, px(780) - px(400), plotH);

    // 940nm 센서 파장 표시선
    ctx.strokeStyle = 'rgba(214,120,53,0.7)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(px(940), margin.top);
    ctx.lineTo(px(940), margin.top + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    drawAxes();

    ctx.strokeStyle = 'rgba(244,243,238,0.9)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let wl = WL_MIN; wl <= WL_MAX; wl += 5) {
      const y = py(transmittance(wl, state.material, cov));
      const x = px(wl);
      if (wl === WL_MIN) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.font = '9px sans-serif';
    ctx.fillStyle = 'rgba(120,150,255,0.85)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('가시광', px(400) + 4, margin.top + 4);
    ctx.fillStyle = 'rgba(214,120,53,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('940nm', px(940), margin.top + 4);
  }

  coverageInput.addEventListener('input', () => {
    state.coveragePct = parseFloat(coverageInput.value);
    draw();
  });
  materialButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.material = btn.dataset.material;
      materialButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      draw();
    });
  });

  draw();
}
