// 데모 시뮬레이션 — 파인메탈마스크를 장력만으로 버티게 했을 때의 자중 처짐과,
// 그 처짐이 만드는 마스크-기판 간극이 비스듬한 증착 빔과 만나 섀도우로 바뀌는 관계.
//
// 근거가 되는 등록특허 세 건(2026-08-25 기사 3절):
//   오럼머티리얼 KR102854300B1 - 마스크 장력을 제어한다
//   템스코 KR102595560B1        - 8세대급 마스크는 나눠 만들어 4방향으로 당긴다
//   야스 KR101699168B1          - 섀도우를 일으키는 비스듬한 빔을 차단판으로 자른다
//
// 모델: 굽힘강성을 무시한 1차원 인장 스트립. 중앙 처짐 d = w L^2 / (8T),
//       w = (인바밀도 8100 kg/m^3) x (두께 25um) x g, T = (인장응력) x (두께).
//       섀도우 폭 s = d x tan(입사각). 마스크가 자기력으로 기판에 끌어붙는 효과는
//       넣지 않았다. 즉 이 값은 "자석 없이 프레임 장력만으로 버틸 때"의 상한이다.
//       실제 장비는 자기 척킹으로 이 간극을 훨씬 줄인다.

const RHO_INVAR = 8100; // kg/m^3
const G = 9.81;
const THICK_UM = 25; // 마스크 두께 고정값
const SUBPIXEL_UM = 33.9; // 250ppi 기준 RGB 서브픽셀 폭 (25.4mm / 250 / 3)

// 캔버스 배경이 #0d0d0a 다(sim.css). 어두운 바탕에서 읽히는 값으로 잡는다.
const INK = '#f4f3ee';
const MUTE = '#a4a49a';
const LINE = '#55554d';
const GREEN = '#7fc79a';
const GREEN_L = '#2f4a3a';
const WARN = '#e58b72';

export function mount(container, params = {}) {
  const state = {
    spanMm: params.spanMm ?? 1310,
    tensionMPa: params.tensionMPa ?? 20,
    beamDeg: params.beamDeg ?? 20,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>지지 간격을 줄이면 처짐이 제곱으로 줄어듭니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="260" height="212"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>지지 간격(마스크 한 조각의 폭) <span data-out="span"></span>mm</label>
          <input type="range" min="50" max="1310" step="10" data-in="span" />
        </div>
        <div class="sim-control">
          <label>인장 응력 <span data-out="tension"></span>MPa</label>
          <input type="range" min="5" max="60" step="1" data-in="tension" />
        </div>
        <div class="sim-control">
          <label>증착 빔 최대 입사각 <span data-out="beam"></span>도</label>
          <input type="range" min="0" max="30" step="1" data-in="beam" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      굽힘강성을 무시한 1차원 인장 스트립 모델입니다. 중앙 처짐 = wL&sup2;/8T,
      w는 인바(밀도 8100kg/m&sup3;) 두께 25&micro;m의 자중, T는 인장응력&times;두께입니다.
      <b>마스크가 자기력으로 기판에 끌어붙는 효과는 넣지 않았습니다.</b> 따라서 이 값은
      자석 없이 프레임 장력만으로 버틸 때의 상한이고, 실제 장비는 자기 척킹으로 간극을
      훨씬 줄입니다. 그림의 처짐 깊이는 값의 범위가 세 자릿수라 로그 척도로 과장했습니다.
      옆에 적힌 수치가 계산값입니다. 원리를 보여주기 위한 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  function calc() {
    const tM = THICK_UM * 1e-6;
    const w = RHO_INVAR * tM * G; // N/m^2
    const T = state.tensionMPa * 1e6 * tM; // N/m
    const L = state.spanMm / 1000;
    const sagUm = (w * L * L) / (8 * T) * 1e6;
    const shadowUm = sagUm * Math.tan((state.beamDeg * Math.PI) / 180);
    return { sagUm, shadowUm, pct: (shadowUm / SUBPIXEL_UM) * 100 };
  }

  function draw() {
    const { sagUm, shadowUm, pct } = calc();
    ctx.clearRect(0, 0, 260, 212);

    // ── 위: 단면. 프레임 사이에 마스크가 처지고 그 위에 기판이 있다
    const x0 = 26;
    const x1 = 234;
    const yBase = 40;
    // 로그 척도 매핑: 0.5um ~ 2000um 을 0 ~ 46px 로
    const depth = Math.max(0, Math.min(46, (Math.log10(Math.max(sagUm, 0.3)) + 0.5) * 15));

    ctx.strokeStyle = INK;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x0 - 8, yBase - 14);
    ctx.lineTo(x1 + 8, yBase - 14);
    ctx.stroke();
    ctx.fillStyle = MUTE;
    ctx.font = '9px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('기판', x0 - 8, yBase - 18);

    // 프레임(양 끝 지지)
    ctx.fillStyle = '#7a7a72';
    ctx.fillRect(x0 - 12, yBase - 4, 12, 16);
    ctx.fillRect(x1, yBase - 4, 12, 16);

    // 처진 마스크
    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const u = i / 40;
      const x = x0 + (x1 - x0) * u;
      const y = yBase + depth * 4 * u * (1 - u);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 간극 표시
    const mid = (x0 + x1) / 2;
    ctx.strokeStyle = depth > 30 ? WARN : MUTE;
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(mid, yBase - 14);
    ctx.lineTo(mid, yBase + depth);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = depth > 30 ? WARN : INK;
    ctx.font = '10px ui-monospace, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(fmt(sagUm) + 'μm', mid + 5, yBase + depth / 2 + 2);

    ctx.fillStyle = MUTE;
    ctx.font = '9px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('지지 간격 ' + state.spanMm + 'mm', mid, yBase + 62);

    // ── 아래: 구멍 하나를 확대해 섀도우를 본다
    const gy = 118;
    ctx.strokeStyle = LINE;
    ctx.beginPath();
    ctx.moveTo(10, gy - 8);
    ctx.lineTo(250, gy - 8);
    ctx.stroke();
    ctx.fillStyle = MUTE;
    ctx.font = '9px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('마스크 구멍 확대', 10, gy + 4);

    const holeY = gy + 20;
    const holeL = 96;
    const holeR = 164;
    const subY = holeY + 44;

    // 마스크 단면(구멍 양쪽 벽)
    ctx.fillStyle = '#6f6f68';
    ctx.fillRect(40, holeY, holeL - 40, 9);
    ctx.fillRect(holeR, holeY, 80, 9);

    // 기판면
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, subY);
    ctx.lineTo(230, subY);
    ctx.stroke();

    // 서브픽셀 기준 폭 (33.9um 를 68px 로 잡는다)
    const pxPerUm = 68 / SUBPIXEL_UM;
    ctx.fillStyle = GREEN_L;
    ctx.fillRect(holeL, subY - 7, 68, 7);
    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 1;
    ctx.strokeRect(holeL, subY - 7, 68, 7);

    // 섀도우 폭
    const shPx = Math.min(84, shadowUm * pxPerUm);
    if (shPx > 0.6) {
      ctx.fillStyle = pct > 30 ? WARN : '#e3c05a';
      ctx.globalAlpha = 0.55;
      ctx.fillRect(holeL + 68, subY - 7, shPx, 7);
      ctx.globalAlpha = 1;
    }

    // 빔 화살표
    const rad = (state.beamDeg * Math.PI) / 180;
    ctx.strokeStyle = MUTE;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    const bx = holeR - 4;
    ctx.moveTo(bx - Math.tan(rad) * 34, subY - 42);
    ctx.lineTo(bx, subY - 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx, subY - 8);
    ctx.lineTo(bx - 4, subY - 13);
    ctx.lineTo(bx + 3, subY - 14);
    ctx.closePath();
    ctx.fillStyle = MUTE;
    ctx.fill();

    ctx.font = '9px ui-monospace, monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = MUTE;
    ctx.fillText(state.beamDeg + '도', bx + 6, subY - 24);
    ctx.textAlign = 'center';
    ctx.fillStyle = GREEN;
    ctx.fillText('서브픽셀 33.9μm', holeL + 34, subY + 14);
    if (shPx > 0.6) {
      ctx.fillStyle = pct > 30 ? WARN : '#e3c05a';
      ctx.textAlign = 'left';
      ctx.fillText('섀도우 ' + fmt(shadowUm) + 'μm', holeL + 72, subY + 26);
    }
  }

  function fmt(v) {
    if (v >= 100) return v.toFixed(0);
    if (v >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }

  function render() {
    container.querySelector('[data-out="span"]').textContent = state.spanMm;
    container.querySelector('[data-out="tension"]').textContent = state.tensionMPa;
    container.querySelector('[data-out="beam"]').textContent = state.beamDeg;
    const { sagUm, shadowUm, pct } = calc();
    const verdict =
      pct > 100
        ? '서브픽셀보다 넓다. 이 폭으로는 패터닝이 성립하지 않는다'
        : pct > 30
          ? '서브픽셀의 3분의 1을 넘는다. 마진이 거의 없다'
          : '서브픽셀 안에서 감당되는 범위';
    container.querySelector('[data-out="readout"]').innerHTML =
      '중앙 처짐 <b>' + fmt(sagUm) + '&micro;m</b><br />' +
      '섀도우 폭 <b>' + fmt(shadowUm) + '&micro;m</b> ' +
      '(250ppi 서브픽셀의 ' + fmt(pct) + '%)<br />' +
      '<span style="color:' + (pct > 30 ? WARN : MUTE) + '">' + verdict + '</span>';
    draw();
  }

  container.querySelector('[data-in="span"]').value = state.spanMm;
  container.querySelector('[data-in="tension"]').value = state.tensionMPa;
  container.querySelector('[data-in="beam"]').value = state.beamDeg;

  container.querySelector('[data-in="span"]').addEventListener('input', (e) => {
    state.spanMm = Number(e.target.value);
    render();
  });
  container.querySelector('[data-in="tension"]').addEventListener('input', (e) => {
    state.tensionMPa = Number(e.target.value);
    render();
  });
  container.querySelector('[data-in="beam"]').addEventListener('input', (e) => {
    state.beamDeg = Number(e.target.value);
    render();
  });

  render();
}

export default mount;
