// 언제 볼 것인가 — 초음파 지문센서의 시간 지연과 시간창.
//
// 초음파식은 되돌아온 파형을 통째로 받지 않는다. 쏜 뒤 정해진 시간이 지나서(시간 지연),
// 정해진 동안만(시간창) 열어 둔다. 그 창을 어디에 두느냐로 같은 센서가 표면의 지문을 볼
// 수도 있고 피부 속을 볼 수도 있다. 광학식이 개구로 각도를 잘라낸 자리에서 초음파식은
// 시간을 자른다.
//
// 이 시뮬레이터는 커버글라스를 왕복하는 에코들을 시간축에 세우고, 창을 옮겨 무엇이 잡히는지
// 보여준다. 압전재료를 PZT로 바꾸면 울림이 길어져 에코들이 서로 겹치는 것도 볼 수 있다.
//
// 근거:
//  - 취득 시간 지연 10~20,000ns, 표면 지문용 시간창 5~50ns, 표피 아래용 50~20,000ns.
//    시간 지연은 플래튼 표면에서 반사돼 돌아올 예상 시간에 맞춘다는 것:
//    US11017251B2 (Qualcomm, Ultrasonic imaging devices and methods)
//  - 첫 번째 지연·창은 지문 특징에, 두 번째 지연·창은 표피 아래 특징에 대응한다는 것:
//    같은 특허
//  - 진피 구간을 최고점 이후 0~7.5마이크로초로 특정: US10410034B2 (Qualcomm)
//  - 위조물은 표면은 흉내내도 표피 아래 신호가 없다는 것: US10444335B2 (Qualcomm)
//  - PVDF의 기계적 품질계수 Q = 10 (Onda Corporation 음향물성표).
//    PZT 계열은 Q가 높아 울림이 길다
//  - 임피던스[MRayl] 소다석회유리 13.44 · 조직 1.5 · 공기 0.00043,
//    음속[m/s] 유리 6000 · 조직 1540 (Onda 음향물성표, 조직값은 Micromachines 2023 리뷰)
//
// 모델: 에코 도착 시각은 왕복 거리를 음속으로 나눠 구하고, 진폭은 경계의 진폭 반사계수를
// 거듭제곱해 얻는다. 포락선은 exp(-(pi*f*u/Q)^2)로 두어 Q가 낮을수록 짧게 그친다.
//
// 단순화 고지: 수직입사 평면파이며 매질의 흡수와 회절 확산을 넣지 않았다. 표피 두께는
// 400마이크로미터로 고정했고 표피와 진피 경계의 진폭 반사계수는 0.06으로 두었다(연조직
// 사이의 임피던스 차가 작다는 일반적 범위). 배킹층의 흡수를 반영해 센서 쪽 되반사는 0.15로 두었다. 판정에 쓰는
// 에코별 기여도는 간섭 항을 빼고 계산했다. 원리를 보여주는 모델이며 실측값이 아니다.

const C_GLASS = 6000;
const Z_GLASS = 13.44;
const Z_TISSUE = 1.5;
const C_TISSUE = 1540;
const Z_AIR = 0.00043;

const EPI_UM = 400;
const R_DERMIS = 0.06;
const R_BACK = 0.15;
const T_MAX = 2000;

const MATERIALS = {
  pvdf: { label: 'PVDF', q: 10 },
  pzt: { label: 'PZT', q: 80 },
};

const R_RIDGE = Math.abs((Z_TISSUE - Z_GLASS) / (Z_TISSUE + Z_GLASS));
const R_VALLEY = Math.abs((Z_AIR - Z_GLASS) / (Z_AIR + Z_GLASS));

const W = 300;
const H = 226;

const PAD_L = 30;
const PAD_R = 8;
const PAD_T = 26;
const PLOT_H = 116;

/** 융선 또는 골 아래에서 되돌아오는 에코 목록 */
function echoes(stackUm, isRidge) {
  const t1 = ((2 * stackUm * 1e-6) / C_GLASS) * 1e9;
  const r = isRidge ? R_RIDGE : R_VALLEY;
  const list = [];
  for (let k = 1; k <= 3; k++) {
    list.push({
      t: k * t1,
      a: Math.pow(r, k) * Math.pow(R_BACK, k - 1),
      kind: k === 1 ? 'surface' : 'reverb',
      label: k === 1 ? '표면' : '울림' + k,
    });
  }
  if (isRidge) {
    list.push({
      t: t1 + ((2 * EPI_UM * 1e-6) / C_TISSUE) * 1e9,
      a: (1 - R_RIDGE * R_RIDGE) * R_DERMIS,
      kind: 'dermis',
      label: '진피',
    });
  }
  return list;
}

const envAt = (e, t, f, q) => {
  const u = (t - e.t) * 1e-9;
  return e.a * Math.exp(-Math.pow((Math.PI * f * u) / q, 2));
};

function envelope(list, t, f, q) {
  let s = 0;
  for (const e of list) s += envAt(e, t, f, q);
  return s;
}

function signal(list, t, f, q) {
  let s = 0;
  for (const e of list) s += envAt(e, t, f, q) * Math.cos(2 * Math.PI * f * (t - e.t) * 1e-9);
  return s;
}

/** 창 안에서 받은 에너지 */
function energy(list, f, q, d, w) {
  const N = 360;
  let sum = 0;
  for (let i = 0; i < N; i++) {
    const s = signal(list, d + ((i + 0.5) * w) / N, f, q);
    sum += s * s;
  }
  return sum / N;
}

/** 에코 하나가 창 안에 넣은 몫 (간섭 무시) */
function share(e, f, q, d, w) {
  const N = 180;
  let sum = 0;
  for (let i = 0; i < N; i++) {
    const v = envAt(e, d + ((i + 0.5) * w) / N, f, q);
    sum += v * v;
  }
  return sum / N;
}

export function mount(container, params = {}) {
  const state = {
    delayNs: params.delayNs ?? 233,
    windowNs: params.windowNs ?? 50,
    freqMHz: params.freqMHz ?? 20,
    stackUm: params.stackUm ?? 700,
    material: params.material ?? 'pvdf',
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">계산</span>
      <span>지연을 표면 에코에 맞춘 뒤, 압전재료를 PZT로 바꿔 보십시오</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
        <div class="sim-legend">
          <span>가로축 시간 ns · 세로축 받은 신호</span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>압전재료</label>
          <div class="sim-toggle-group" role="group">
            <button type="button" class="sim-toggle-btn" data-mat="pvdf">PVDF Q 10</button>
            <button type="button" class="sim-toggle-btn" data-mat="pzt">PZT Q 80</button>
          </div>
        </div>
        <div class="sim-control">
          <label>언제부터 볼까 <span data-out="delay"></span></label>
          <input type="range" min="0" max="1400" step="1" data-in="delay" />
        </div>
        <div class="sim-control">
          <label>얼마 동안 볼까 <span data-out="win"></span></label>
          <input type="range" min="5" max="800" step="5" data-in="win" />
        </div>
        <div class="sim-control">
          <label>주파수 <span data-out="freq"></span> MHz</label>
          <input type="range" min="5" max="30" step="1" data-in="freq" />
        </div>
        <div class="sim-control">
          <label>커버 두께 <span data-out="stack"></span></label>
          <input type="range" min="300" max="1200" step="10" data-in="stack" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      에코 도착 시각은 왕복 거리를 음속으로 나눠 구했고, 진폭은 경계의 진폭 반사계수를
      거듭제곱했습니다. 포락선은 exp(-(&pi;fu/Q)&sup2;)로 두어 Q가 낮을수록 울림이 짧게
      그칩니다. 시간 지연 10~20,000ns와 표면용 시간창 5~50ns는 US11017251B2(퀄컴)에
      명시된 범위이고, 진피 구간을 최고점 이후 0~7.5&micro;s로 보는 것은 US10410034B2입니다.
      임피던스[MRayl]는 유리 13.44 · 조직 1.5 · 공기 0.00043, 음속[m/s]은 유리 6000 ·
      조직 1540입니다(Onda 음향물성표, 조직값은 Micromachines 2023 리뷰). 표피 두께는
      400&micro;m, 표피·진피 경계 반사계수는 0.06, 배킹층의 흡수를 반영한 센서 쪽 되반사는
      0.15로 두었습니다.
      흡수와 회절 확산은 넣지 않았습니다. 원리를 보여주기 위한 단순화 모델이며 실측값이
      아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const inputs = {
    delay: container.querySelector('[data-in="delay"]'),
    win: container.querySelector('[data-in="win"]'),
    freq: container.querySelector('[data-in="freq"]'),
    stack: container.querySelector('[data-in="stack"]'),
  };
  const outs = {
    delay: container.querySelector('[data-out="delay"]'),
    win: container.querySelector('[data-out="win"]'),
    freq: container.querySelector('[data-out="freq"]'),
    stack: container.querySelector('[data-out="stack"]'),
  };
  const readout = container.querySelector('[data-out="readout"]');
  const matBtns = [...container.querySelectorAll('[data-mat]')];

  inputs.delay.value = String(state.delayNs);
  inputs.win.value = String(state.windowNs);
  inputs.freq.value = String(state.freqMHz);
  inputs.stack.value = String(state.stackUm);

  const xAt = (t) => PAD_L + (t / T_MAX) * (W - PAD_L - PAD_R);

  function render() {
    const f = state.freqMHz * 1e6;
    const q = MATERIALS[state.material].q;
    const ridge = echoes(state.stackUm, true);
    const valley = echoes(state.stackUm, false);
    const d = state.delayNs;
    const w = state.windowNs;

    // 세로축은 자동으로 맞춘다. Q가 높으면 에코들이 겹쳐 합이 1을 넘기 때문에
    // 고정 축에 두면 봉우리가 잘려 네모난 덩어리로 보인다.
    let peak = 0;
    for (let px = 0; px <= W - PAD_L - PAD_R; px++) {
      const t = (px / (W - PAD_L - PAD_R)) * T_MAX;
      peak = Math.max(peak, envelope(ridge, t, f, q), envelope(valley, t, f, q));
    }
    const yMax = Math.max(1.05, peak * 1.06);
    const yAt = (v) => PAD_T + PLOT_H - Math.min(1, Math.max(0, v / yMax)) * PLOT_H;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(230,225,215,0.14)';
    ctx.lineWidth = 1;
    ctx.font = '11px "IBM Plex Mono", monospace';
    for (let v = 0; v <= yMax; v += yMax / 3) {
      const y = yAt(v);
      ctx.beginPath();
      ctx.moveTo(PAD_L, y + 0.5);
      ctx.lineTo(W - PAD_R, y + 0.5);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(230,225,215,0.55)';
    for (let t = 0; t <= T_MAX; t += 500) {
      ctx.fillText(String(t), xAt(t) - (t === 0 ? 2 : 12), PAD_T + PLOT_H + 14);
    }

    // 위쪽 띠 — 범례와 세로축 상한
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#e08a3c';
    ctx.fillRect(2, 7, 9, 3);
    ctx.fillText('융선', 14, 12);
    ctx.fillStyle = 'rgba(150,180,205,0.95)';
    ctx.fillRect(48, 7, 9, 3);
    ctx.fillText('골', 60, 12);
    ctx.fillStyle = 'rgba(230,225,215,0.5)';
    ctx.fillText('세로축 최대 ' + yMax.toFixed(2), W - 128, 12);

    const xw0 = xAt(Math.min(d, T_MAX));
    const xw1 = xAt(Math.min(d + w, T_MAX));
    const wPix = Math.max(3, xw1 - xw0);
    ctx.fillStyle = 'rgba(224,138,60,0.2)';
    ctx.fillRect(xw0, PAD_T, wPix, PLOT_H);
    ctx.strokeStyle = 'rgba(224,138,60,0.85)';
    ctx.strokeRect(xw0 + 0.5, PAD_T + 0.5, wPix, PLOT_H);
    // 창 위치를 가리키는 표식
    ctx.fillStyle = '#e08a3c';
    ctx.beginPath();
    ctx.moveTo(xw0 + wPix / 2, PAD_T - 1);
    ctx.lineTo(xw0 + wPix / 2 - 4, PAD_T - 7);
    ctx.lineTo(xw0 + wPix / 2 + 4, PAD_T - 7);
    ctx.closePath();
    ctx.fill();

    ctx.setLineDash([2, 3]);
    ctx.font = '10px "IBM Plex Mono", monospace';
    let alt = 0;
    for (const e of [...ridge].sort((a, b) => a.t - b.t)) {
      if (e.t > T_MAX) continue;
      const x = xAt(e.t);
      ctx.strokeStyle = 'rgba(230,225,215,0.3)';
      ctx.beginPath();
      ctx.moveTo(x + 0.5, PAD_T);
      ctx.lineTo(x + 0.5, PAD_T + PLOT_H);
      ctx.stroke();
      ctx.fillStyle = 'rgba(230,225,215,0.55)';
      ctx.fillText(e.label, x + 2, PAD_T + 10 + (alt % 2) * 12);
      alt++;
    }
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(224,138,60,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let px = 0; px <= W - PAD_L - PAD_R; px++) {
      const t = (px / (W - PAD_L - PAD_R)) * T_MAX;
      const y = yAt(Math.abs(signal(ridge, t, f, q)));
      if (px === 0) ctx.moveTo(PAD_L + px, y);
      else ctx.lineTo(PAD_L + px, y);
    }
    ctx.stroke();

    for (const [list, color, width] of [
      [valley, 'rgba(150,180,205,0.95)', 1.6],
      [ridge, '#e08a3c', 2],
    ]) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      for (let px = 0; px <= W - PAD_L - PAD_R; px++) {
        const t = (px / (W - PAD_L - PAD_R)) * T_MAX;
        const y = yAt(envelope(list, t, f, q));
        if (px === 0) ctx.moveTo(PAD_L + px, y);
        else ctx.lineTo(PAD_L + px, y);
      }
      ctx.stroke();
    }

    const eR = energy(ridge, f, q, d, w);
    const eV = energy(valley, f, q, d, w);
    const norm = (v) => Math.min(1, Math.sqrt(Math.max(0, v)) / 0.75);
    const ySw = PAD_T + PLOT_H + 44;
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'rgba(230,225,215,0.7)';
    ctx.fillText('창 안에서 화소가 받는 밝기', PAD_L, ySw - 8);
    let sx = PAD_L;
    for (const [label, v] of [
      ['융선', norm(eR)],
      ['골', norm(eV)],
    ]) {
      const g = Math.round(20 + v * 215);
      ctx.fillStyle = `rgb(${g},${g},${g})`;
      ctx.fillRect(sx, ySw, 42, 34);
      ctx.strokeStyle = 'rgba(230,225,215,0.3)';
      ctx.strokeRect(sx + 0.5, ySw + 0.5, 42, 34);
      ctx.fillStyle = 'rgba(230,225,215,0.7)';
      ctx.fillText(label, sx + 48, ySw + 22);
      sx += 90;
    }

    const total = ridge.reduce((s, e) => s + share(e, f, q, d, w), 0);
    const byKind = { surface: 0, reverb: 0, dermis: 0 };
    for (const e of ridge) byKind[e.kind] += share(e, f, q, d, w);
    const frac = (k) => (total > 0 ? byKind[k] / total : 0);

    const contrast = eR + eV > 0 ? Math.abs(eR - eV) / (eR + eV) : 0;
    const t1 = ((2 * state.stackUm * 1e-6) / C_GLASS) * 1e9;
    const tD = t1 + ((2 * EPI_UM * 1e-6) / C_TISSUE) * 1e9;
    const period = 1000 / state.freqMHz;

    // 펄스가 길면 깊이를 갈라낼 수 없다. 울리는 시간 tau는 대략 Q/f이고,
    // 그동안 소리가 진행한 거리의 절반이 구분 가능한 깊이가 된다.
    const tau = (q / f) * 1e9;
    const dzUm = ((C_TISSUE * tau * 1e-9) / 2) * 1e6;
    const sep = tD - t1;

    let verdict;
    if (total < 1e-9) verdict = '창이 비어 있습니다. 아무 신호도 잡히지 않습니다';
    else if (tau > sep)
      verdict = '펄스가 너무 길어 표면과 진피가 시간축에서 겹칩니다';
    else if (frac('dermis') > 0.5) verdict = '표피 아래를 봅니다. 위조 판별이 여기서 나옵니다';
    else if (frac('surface') > 0.7) verdict = '표면의 지문을 봅니다';
    else if (frac('reverb') > 0.5) verdict = '앞선 에코의 울림을 보고 있습니다';
    else verdict = '표면과 울림이 섞였습니다. 무늬가 흐려집니다';

    outs.delay.textContent = `${d}ns`;
    outs.win.textContent = `${w}ns (한 주기 ${period.toFixed(0)}ns)`;
    outs.freq.textContent = String(state.freqMHz);
    outs.stack.textContent = `${state.stackUm}µm`;

    readout.innerHTML =
      `표면 에코 도착 <b>${t1.toFixed(0)}ns</b> · 진피 에코 <b>${tD.toFixed(0)}ns</b><br>` +
      `창 안 융선 대 골 <b>${contrast > 0.001 ? (contrast * 100).toFixed(1) : (contrast * 100).toExponential(1)}%</b> 차이<br>` +
      `창 폭이 한 주기의 <b>${(w / period).toFixed(1)}배</b><br>` +
      `울리는 시간 <b>${tau.toFixed(0)}ns</b> → 갈라낼 수 있는 깊이 <b>${dzUm.toFixed(0)}µm</b> ` +
      `(표면과 진피 사이 ${sep.toFixed(0)}ns)<br>` +
      `<span>${verdict}</span>`;
  }

  function syncMat() {
    matBtns.forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.mat === state.material))
    );
  }

  matBtns.forEach((b) =>
    b.addEventListener('click', () => {
      state.material = b.dataset.mat;
      syncMat();
      render();
    })
  );
  inputs.delay.addEventListener('input', () => {
    state.delayNs = Number(inputs.delay.value);
    render();
  });
  inputs.win.addEventListener('input', () => {
    state.windowNs = Number(inputs.win.value);
    render();
  });
  inputs.freq.addEventListener('input', () => {
    state.freqMHz = Number(inputs.freq.value);
    render();
  });
  inputs.stack.addEventListener('input', () => {
    state.stackUm = Number(inputs.stack.value);
    render();
  });

  syncMat();
  render();
}

export default mount;
