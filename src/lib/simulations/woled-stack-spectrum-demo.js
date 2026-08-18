// 시뮬레이션 — WOLED 백색 스펙트럼이 컬러필터를 통과할 때 무엇이 남는가.
// 기사 "발광층을 하나 덜어냈더니 색이 더 넓어졌다" 5절 "두 층인데 색이 더 넓어진 이유"의
// 메커니즘을 직접 계산해 보여준다.
//
// 모델링 근거와 한계
// - 3스택 구조(청-황녹-청)와 신규 2스택 구조(청 + 적·녹 분리)의 발광층 구성은
//   전자신문·The Elec 보도 및 등록특허 US12,108,618(LG Display)의 스택 구성을 따랐다.
// - 각 발광층의 스펙트럼은 가우시안 근사이며, 중심파장·반치폭은 일반적인 OLED 발광재료의
//   대표값을 쓴 것이지 LG디스플레이가 공개한 실제 소재의 측정값이 아니다.
// - 두 구조의 백색 총 발광량을 같게 정규화한 뒤 스펙트럼 "모양"만 비교한다. 스택 수 차이에서
//   오는 절대 휘도 차이는 이 그래프에 반영되어 있지 않다.
// - 컬러필터는 가우시안 대역통과로 근사했다. 실제 안료 필터의 투과 곡선은 비대칭이다.
// 따라서 아래 수치는 메커니즘을 보여주는 상대 비교값이며, 발표된 BT.2020 82.5% / 76.5%를
// 재현하거나 검증하는 값이 아니다.

const LAMBDA_MIN = 380;
const LAMBDA_MAX = 720;
const STEP = 2;

// 발광층 가우시안: [중심파장, 표준편차, 상대세기]
const EML = {
  blue: [460, 22, 1],
  yellowGreen: [555, 47, 1], // 3스택의 황녹 단일층 — 넓고 뭉툭하다
  green: [528, 24, 1],
  red: [620, 26, 1],
};

// 컬러필터 중심파장 (대역폭은 슬라이더로 조절)
const FILTER_CENTER = { r: 620, g: 530, b: 460 };

function gauss(wl, [mu, sigma, amp]) {
  return amp * Math.exp(-((wl - mu) ** 2) / (2 * sigma * sigma));
}

// 구조별 백색 스펙트럼 (정규화 전)
function rawWhite(wl, arch) {
  if (arch === 'stack3') {
    // 청색 발광층 2개 + 황녹 1개
    return 2 * gauss(wl, EML.blue) + 1.7 * gauss(wl, EML.yellowGreen);
  }
  // 신규 2스택 — 청색 1개 + (적·녹이 한 스택 안에)
  return 1.6 * gauss(wl, EML.blue) + 1.0 * gauss(wl, EML.green) + 1.0 * gauss(wl, EML.red);
}

function integrate(fn) {
  let sum = 0;
  for (let wl = LAMBDA_MIN; wl <= LAMBDA_MAX; wl += STEP) sum += fn(wl) * STEP;
  return sum;
}

// 두 구조의 총 발광량을 같게 맞춘다 — 모양만 비교하기 위해서다
const NORM = {
  stack3: 1 / integrate((wl) => rawWhite(wl, 'stack3')),
  stack2: 1 / integrate((wl) => rawWhite(wl, 'stack2')),
};

function white(wl, arch) {
  return rawWhite(wl, arch) * NORM[arch];
}

function filterT(wl, channel, fwhm) {
  const sigma = fwhm / 2.3548;
  return Math.exp(-((wl - FILTER_CENTER[channel]) ** 2) / (2 * sigma * sigma));
}

// 채널별 통과 광량(백색 전체 대비 %)과 통과광의 중심파장(nm)
function channelStats(arch, channel, fwhm) {
  let energy = 0;
  let weighted = 0;
  for (let wl = LAMBDA_MIN; wl <= LAMBDA_MAX; wl += STEP) {
    const v = white(wl, arch) * filterT(wl, channel, fwhm) * STEP;
    energy += v;
    weighted += v * wl;
  }
  return {
    passPct: energy * 100,
    centroid: energy > 0 ? weighted / energy : 0,
  };
}

export function mount(container, params = {}) {
  const state = {
    arch: params.arch ?? 'stack2',
    fwhm: params.filterFwhmNm ?? 90,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>황녹 한 층을 적·녹으로 쪼개면 컬러필터 뒤에 무엇이 남는가</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="300" height="210"></canvas>
        <div class="sim-legend">
          <span>실선 = 선택한 구조</span>
          <span>점선 = 비교 구조</span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>발광 스택 구조</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-arch="stack3" aria-pressed="false">3스택 (청·황녹·청)</button>
            <button type="button" class="sim-toggle-btn" data-arch="stack2" aria-pressed="true">2스택 (청·적+녹)</button>
          </div>
        </div>
        <div class="sim-control">
          <label>컬러필터 대역폭 <span data-out="fwhm"></span>nm</label>
          <input type="range" min="40" max="120" step="5" data-in="fwhm" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      발광층의 스펙트럼은 일반적인 OLED 발광재료의 대표값을 쓴 가우시안 근사이며, LG디스플레이가
      공개한 실제 소재의 측정값이 아닙니다. 두 구조의 백색 총 발광량은 같게 맞춘 뒤 스펙트럼
      모양만 비교했으므로, 스택 수에서 오는 절대 휘도 차이는 반영되어 있지 않습니다. 스택 구성은
      등록특허 US12,108,618의 구조를 따랐습니다. 따라서 아래 수치는 메커니즘을 보여주는 상대
      비교값이지, 발표된 BT.2020 82.5%·76.5%를 재현하거나 검증하는 값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const fwhmInput = container.querySelector('[data-in="fwhm"]');
  const fwhmOut = container.querySelector('[data-out="fwhm"]');
  const readoutOut = container.querySelector('[data-out="readout"]');
  const archButtons = Array.from(container.querySelectorAll('.sim-toggle-btn'));

  fwhmInput.value = String(state.fwhm);
  archButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.arch === state.arch)));

  const margin = { left: 30, right: 10, top: 12, bottom: 24 };
  const plotW = canvas.width - margin.left - margin.right;
  const plotH = canvas.height - margin.top - margin.bottom;

  // y축 스케일 — 두 구조 중 최대값 기준으로 고정해 토글해도 축이 흔들리지 않게 한다
  let peak = 0;
  for (let wl = LAMBDA_MIN; wl <= LAMBDA_MAX; wl += STEP) {
    peak = Math.max(peak, white(wl, 'stack3'), white(wl, 'stack2'));
  }

  function px(wl) {
    return margin.left + ((wl - LAMBDA_MIN) / (LAMBDA_MAX - LAMBDA_MIN)) * plotW;
  }
  function py(v) {
    return margin.top + (1 - Math.min(1, v / peak)) * plotH;
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
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    [400, 500, 600, 700].forEach((wl) => ctx.fillText(String(wl), px(wl), margin.top + plotH + 4));
    ctx.fillText('파장(nm)', margin.left + plotW / 2, canvas.height - 12);

    ctx.save();
    ctx.translate(9, margin.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('발광 세기', 0, 0);
    ctx.restore();
  }

  function drawSpectrum(arch, dashed) {
    ctx.strokeStyle = dashed ? 'rgba(244,243,238,0.32)' : 'rgba(244,243,238,0.95)';
    ctx.lineWidth = dashed ? 1 : 1.6;
    ctx.setLineDash(dashed ? [3, 3] : []);
    ctx.beginPath();
    for (let wl = LAMBDA_MIN; wl <= LAMBDA_MAX; wl += STEP) {
      const x = px(wl);
      const y = py(white(wl, arch));
      if (wl === LAMBDA_MIN) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 필터를 통과해 실제로 살아남는 몫을 색으로 채운다
  function drawPassBand(arch, channel, rgb) {
    ctx.fillStyle = rgb;
    ctx.beginPath();
    ctx.moveTo(px(LAMBDA_MIN), py(0));
    for (let wl = LAMBDA_MIN; wl <= LAMBDA_MAX; wl += STEP) {
      ctx.lineTo(px(wl), py(white(wl, arch) * filterT(wl, channel, state.fwhm)));
    }
    ctx.lineTo(px(LAMBDA_MAX), py(0));
    ctx.closePath();
    ctx.fill();
  }

  function draw() {
    const other = state.arch === 'stack3' ? 'stack2' : 'stack3';
    fwhmOut.textContent = String(state.fwhm);

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPassBand(state.arch, 'b', 'rgba(91,110,168,0.55)');
    drawPassBand(state.arch, 'g', 'rgba(111,144,112,0.55)');
    drawPassBand(state.arch, 'r', 'rgba(168,106,99,0.55)');

    drawAxes();
    drawSpectrum(other, true);
    drawSpectrum(state.arch, false);

    const r = channelStats(state.arch, 'r', state.fwhm);
    const g = channelStats(state.arch, 'g', state.fwhm);
    const rO = channelStats(other, 'r', state.fwhm);

    readoutOut.innerHTML =
      `적색 채널 — 통과 광량 ${r.passPct.toFixed(1)}% · 중심파장 ${r.centroid.toFixed(0)}nm<br>` +
      `녹색 채널 — 통과 광량 ${g.passPct.toFixed(1)}% · 중심파장 ${g.centroid.toFixed(0)}nm<br>` +
      `<span style="opacity:.65">비교 구조의 적색 중심파장 ${rO.centroid.toFixed(0)}nm</span>`;
  }

  fwhmInput.addEventListener('input', () => {
    state.fwhm = parseFloat(fwhmInput.value);
    draw();
  });
  archButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.arch = btn.dataset.arch;
      archButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      draw();
    });
  });

  draw();
}
