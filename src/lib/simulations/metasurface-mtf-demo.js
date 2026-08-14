// 데모 시뮬레이션 — 메타서피스가 MTF(변조전달함수)를 이상적인 Airy 곡선에 가깝게 되돌리는 과정
// 근거: 2026-08-11 기사 "OLED 픽셀 아래에서 사진을 찍으면" 4절, 그림8(arXiv:2504.17368)의
// "메타서피스 적용 시 이상적 곡선(Airy function)에 근접" 서술을 슬라이더로 조작 가능하게 만든 것.
// Airy 곡선은 실제 회절한계 원형 개구 MTF 공식 MTF(f) = (2/π)[arccos(f) − f√(1−f²)] (정규화
// 공간주파수 f∈[0,1])을 그대로 쓴다. "억제 전" 실측 곡선은 고차 회절 리플이 낀 개략적 근사이며
// 실제 논문 데이터를 재현한 것은 아니다 — 아래 sim-note 고지 참조.

export function mount(container, params = {}) {
  const state = {
    suppressionPct: params.suppressionPct ?? 45,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>메타서피스 억제 강도 → MTF가 Airy 곡선에 얼마나 가까워지는지</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="280" height="190"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>메타서피스 억제 강도 <span data-out="suppression"></span>%</label>
          <input type="range" min="0" max="100" step="5" data-in="suppression" />
        </div>
        <div class="sim-readout" data-out="deviation"></div>
      </div>
    </div>
    <div class="sim-note">
      점선은 회절한계 원형 개구의 이상적 MTF(Airy 함수, MTF(f) = (2/&pi;)[arccos f &minus; f&radic;(1&minus;f&sup2;)])이고,
      실선은 억제 강도에 따라 그 곡선에 가까워지도록 만든 실측 곡선의 개략 근사입니다. 실제 논문
      데이터를 재현한 것이 아니라, "억제할수록 이상적 곡선에 가까워진다"는 정성적 관계만 보여주기
      위한 단순화 모델입니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const suppressionInput = container.querySelector('[data-in="suppression"]');
  const suppressionOut = container.querySelector('[data-out="suppression"]');
  const deviationOut = container.querySelector('[data-out="deviation"]');

  suppressionInput.value = String(state.suppressionPct);

  const margin = { left: 30, right: 10, top: 10, bottom: 22 };
  const plotW = canvas.width - margin.left - margin.right;
  const plotH = canvas.height - margin.top - margin.bottom;

  function airyMTF(f) {
    const c = Math.min(1, Math.max(0, f));
    return (2 / Math.PI) * (Math.acos(c) - c * Math.sqrt(1 - c * c));
  }

  function measuredMTF(f, t) {
    const airy = airyMTF(f);
    const ripple = Math.cos(f * 26) * 0.5 + 0.5;
    const degraded = airy * (0.12 + 0.55 * ripple);
    return degraded + (airy - degraded) * t;
  }

  function px(f) {
    return margin.left + f * plotW;
  }
  function py(v) {
    return margin.top + (1 - Math.min(1, Math.max(0, v))) * plotH;
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
    [0, 0.5, 1].forEach((v) => {
      ctx.fillText(v.toFixed(1), margin.left - 4, py(v));
    });
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    [0, 0.5, 1].forEach((f) => {
      ctx.fillText(f.toFixed(1), px(f), margin.top + plotH + 4);
    });
    ctx.save();
    ctx.translate(8, margin.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MTF', 0, 0);
    ctx.restore();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('공간주파수 (a.u.)', margin.left + plotW / 2, canvas.height - 11);
  }

  function drawCurve(fn, color, dashed) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash(dashed ? [4, 3] : []);
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const f = i / 60;
      const x = px(f);
      const y = py(fn(f));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function draw() {
    const t = state.suppressionPct / 100;
    suppressionOut.textContent = String(state.suppressionPct);

    let sumAbsDiff = 0;
    for (let i = 0; i <= 60; i++) {
      const f = i / 60;
      sumAbsDiff += Math.abs(airyMTF(f) - measuredMTF(f, t));
    }
    const meanDiffPct = (sumAbsDiff / 61) * 100;
    deviationOut.textContent = `Airy 곡선과의 평균 편차 ≈ ${meanDiffPct.toFixed(1)}%p`;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawAxes();
    drawCurve(airyMTF, 'rgba(244,243,238,0.8)', true);
    drawCurve((f) => measuredMTF(f, t), 'rgba(214,120,53,0.95)', false);

    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(244,243,238,0.75)';
    ctx.fillText('Airy function', margin.left + 6, margin.top + 8);
    ctx.fillStyle = 'rgba(214,120,53,1)';
    ctx.fillText('실측 MTF', margin.left + 6, margin.top + 20);
  }

  suppressionInput.addEventListener('input', () => {
    state.suppressionPct = parseFloat(suppressionInput.value);
    draw();
  });

  draw();
}
