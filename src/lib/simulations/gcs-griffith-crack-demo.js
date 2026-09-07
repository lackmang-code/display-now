// 시뮬레이션 — 유리 기판이 깨지는 것을 막을 때, 유리 종류를 바꾸는 것과 흠집을 줄이는 것
// 가운데 어느 쪽이 실제로 효과가 있는지를 눈으로 보게 하는 장치다. 이 기사 「재료를 바꿔도
// 안 되는 이유」 절의 논지를 그대로 옮겼다.
//
// 모델과 한계
// - 그리피스/어윈 파괴역학의 임계응력 식 sigma_c = KIC / (Y * sqrt(c)) 하나만 쓴다.
//   IEEE EPS 「Glass Core Substrate」(AGC, 2025) 본문이 인용한 것과 같은 형태다.
// - Y = 2.0 으로 고정했다. 표면 반타원 균열의 표준 형상계수 1.12*sqrt(pi) = 1.99 를 반올림한
//   값이며, 균열 형상에 따라 달라진다.
// - 파괴인성 KIC 세 값(0.68 / 0.75 / 0.82 MPa m^0.5)은 일반 유리의 대표 범위를 벌려 놓은
//   것이다. 같은 문서가 "일반 유리 재료 간 파괴인성 차이는 약 +-10% 뿐"이라고 적은 것을
//   재현하려는 값이고, 특정 제품의 실측 데이터가 아니다.
// - 이론강도 5~6 GPa 와 실사용 강도 50~100 MPa 대역은 같은 문서의 서술을 눈금으로 옮긴 것이다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

const GLASSES = {
  low: { label: '0.68', kic: 0.68, color: '#8fa9c9' },
  mid: { label: '0.75', kic: 0.75, color: '#c9a86a' },
  high: { label: '0.82', kic: 0.82, color: '#8fb59a' },
};

const Y_FACTOR = 2.0;

// 축 범위 (로그)
const CX_MIN = 0.01;   // um
const CX_MAX = 200;    // um
const SY_MIN = 10;     // MPa
const SY_MAX = 10000;  // MPa

export function mount(container, params = {}) {
  const state = {
    crack: params.crack ?? 10,
    glass: params.glass ?? 'mid',
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Change the glass and the curve barely moves. Change the flaw and it collapses.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="440" height="366"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Fracture toughness K<sub>IC</sub> (MPa&#183;m<sup>0.5</sup>)</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-glass="low" aria-pressed="false">0.68</button>
            <button type="button" class="sim-toggle-btn" data-glass="mid" aria-pressed="true">0.75</button>
            <button type="button" class="sim-toggle-btn" data-glass="high" aria-pressed="false">0.82</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Surface crack size c &mdash; <span data-out="c"></span> &micro;m</label>
          <input type="range" min="0" max="100" step="1" data-in="c" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const cInput = container.querySelector('[data-in="c"]');
  const cOut = container.querySelector('[data-out="c"]');
  const readout = container.querySelector('[data-out="readout"]');
  const btns = Array.from(container.querySelectorAll('[data-glass]'));

  const DIM = 'rgba(244,243,238,0.55)';
  const FAINT = 'rgba(244,243,238,0.30)';
  const LINE = 'rgba(244,243,238,0.20)';

  const X0 = 58, X1 = 420, Y0 = 44, Y1 = 258;

  // 슬라이더 0..100 을 로그 스케일 c 로 옮긴다
  const sliderToC = (v) =>
    CX_MIN * Math.pow(CX_MAX / CX_MIN, v / 100);
  const cToSlider = (c) =>
    (100 * Math.log(c / CX_MIN)) / Math.log(CX_MAX / CX_MIN);

  const fx = (c) =>
    X0 + ((Math.log10(c) - Math.log10(CX_MIN)) /
      (Math.log10(CX_MAX) - Math.log10(CX_MIN))) * (X1 - X0);
  const fy = (s) =>
    Y1 - ((Math.log10(s) - Math.log10(SY_MIN)) /
      (Math.log10(SY_MAX) - Math.log10(SY_MIN))) * (Y1 - Y0);

  const sigma = (kic, cUm) => kic / (Y_FACTOR * Math.sqrt(cUm * 1e-6));

  cInput.value = String(Math.round(cToSlider(state.crack)));

  function band(yTop, yBot, fill) {
    ctx.fillStyle = fill;
    ctx.fillRect(X0, yTop, X1 - X0, yBot - yTop);
  }

  function drawCurve(kic, color, active) {
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 240; i += 1) {
      const c = CX_MIN * Math.pow(CX_MAX / CX_MIN, i / 240);
      const s = sigma(kic, c);
      if (s > SY_MAX || s < SY_MIN) { started = false; continue; }
      const x = fx(c), y = fy(s);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = active ? 2.4 : 1.1;
    ctx.globalAlpha = active ? 1 : 0.45;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function draw() {
    const c = sliderToC(Number(cInput.value));
    state.crack = c;
    const g = GLASSES[state.glass];
    const s = sigma(g.kic, c);

    cOut.textContent = c < 1 ? c.toFixed(2) : c < 10 ? c.toFixed(1) : Math.round(c);

    ctx.clearRect(0, 0, 440, 366);

    // 강도 대역
    band(fy(6000), fy(5000), 'rgba(143,181,154,0.14)');
    band(fy(100), fy(50), 'rgba(194,112,90,0.16)');

    // 격자
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    for (const s2 of [10, 100, 1000, 10000]) {
      ctx.beginPath();
      ctx.moveTo(X0, fy(s2));
      ctx.lineTo(X1, fy(s2));
      ctx.stroke();
    }
    for (const c2 of [0.01, 0.1, 1, 10, 100]) {
      ctx.beginPath();
      ctx.moveTo(fx(c2), Y0);
      ctx.lineTo(fx(c2), Y1);
      ctx.stroke();
    }

    // 축
    ctx.strokeStyle = 'rgba(244,243,238,0.45)';
    ctx.beginPath();
    ctx.moveTo(X0, Y0);
    ctx.lineTo(X0, Y1);
    ctx.lineTo(X1, Y1);
    ctx.stroke();

    // 곡선 세 개
    for (const key of ['low', 'mid', 'high']) {
      drawCurve(GLASSES[key].kic, GLASSES[key].color, key === state.glass);
    }

    // 현재 지점
    const px = fx(c), py = fy(Math.max(SY_MIN, Math.min(SY_MAX, s)));
    ctx.strokeStyle = 'rgba(244,243,238,0.35)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(px, Y1);
    ctx.lineTo(px, py);
    ctx.lineTo(X0, py);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = g.color;
    ctx.beginPath();
    ctx.arc(px, py, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // 눈금 글자
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillStyle = DIM;
    ctx.textAlign = 'right';
    for (const [s2, lab] of [[10, '10'], [100, '100'], [1000, '1k'], [10000, '10k']]) {
      ctx.fillText(lab, X0 - 7, fy(s2) + 3.5);
    }
    ctx.textAlign = 'center';
    for (const [c2, lab] of [[0.01, '0.01'], [0.1, '0.1'], [1, '1'], [10, '10'], [100, '100']]) {
      ctx.fillText(lab, fx(c2), Y1 + 15);
    }

    // 축 이름
    ctx.fillStyle = DIM;
    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Surface crack size c (µm)', (X0 + X1) / 2, Y1 + 32);
    ctx.save();
    ctx.translate(15, (Y0 + Y1) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Critical stress (MPa)', 0, 0);
    ctx.restore();

    // 대역 이름
    ctx.textAlign = 'left';
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'rgba(143,181,154,0.85)';
    ctx.fillText('Theoretical strength  5-6 GPa', X0 + 8, fy(6000) - 5);
    ctx.fillStyle = 'rgba(214,150,128,0.9)';
    ctx.fillText('Real glass in service  50-100 MPa', X0 + 8, fy(100) - 5);

    // 읽음값
    const shown = s >= 1000 ? (s / 1000).toFixed(2) + ' GPa' : Math.round(s) + ' MPa';
    readout.innerHTML =
      `Critical stress <b>${shown}</b> &nbsp;&middot;&nbsp; K<sub>IC</sub> ${g.kic} &nbsp;&middot;&nbsp; c ${
        c < 1 ? c.toFixed(2) : c < 10 ? c.toFixed(1) : Math.round(c)
      } &micro;m`;

    // 세 유리의 차이를 숫자로
    const sLow = sigma(GLASSES.low.kic, c);
    const sHigh = sigma(GLASSES.high.kic, c);
    const spread = ((sHigh - sLow) / sLow) * 100;
    ctx.textAlign = 'left';
    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.fillStyle = FAINT;
    ctx.fillText(
      `Toughest glass beats weakest by ${spread.toFixed(0)}%`,
      X0, Y1 + 56,
    );
    ctx.fillStyle = DIM;
    ctx.fillText(
      `A 10x deeper flaw costs ${(100 - 100 / Math.sqrt(10)).toFixed(0)}% of the strength`,
      X0, Y1 + 74,
    );
  }

  cInput.addEventListener('input', draw);
  btns.forEach((b) => {
    b.addEventListener('click', () => {
      state.glass = b.dataset.glass;
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      draw();
    });
  });

  draw();
}
