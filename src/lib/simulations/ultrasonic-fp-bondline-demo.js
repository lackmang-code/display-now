// 유리 아래 접착층 한 겹 — 두께와 임피던스가 투과를 어떻게 가르는가.
//
// 커버글라스와 센서를 붙이는 접착층은 양쪽이 모두 "단단한" 재료다. 유리(13.44 MRayl)를
// 맞출 수 있는 고분자가 없으므로 정합으로는 풀리지 않는다. 남는 방법은 둘뿐이다.
// 파장에 비해 없는 것처럼 얇게 만들거나, 입자를 도핑해 밀도를 올려 임피던스를 끌어올리거나.
// 사분파장 두께 근처가 최악이고 거기서 편도 투과가 한 자릿수까지 떨어진다.
//
// 근거:
//  - 접착제(560)로 플래튼과 센서 시스템을 붙인다는 것, 고임피던스 층을 "hard",
//    저임피던스 층을 "soft" 재료라고 명세서가 직접 정의한다는 것,
//    다기능 필름(차광층·차폐층·접착층·응력 완충층)이 음향 경로 안에 있고 접착층은
//    감압 접착제(PSA)나 에폭시, 스페이서는 PET이라는 것: US10891458B2
//  - 같은 특허가 그 층에 붙인 사양: 두께 약 15~25µm, 음속 약 1500~4000m/s,
//    감쇠 약 25dB/cm 이하, 역할 가운데 하나가 "고임피던스 층과 저임피던스 층 사이의
//    정합층"
//  - 에폭시에 입자를 도핑해 밀도를 바꾸면 음속이 일정한 한 임피던스가 밀도에 따라
//    바뀐다는 것: 같은 특허. 이 모듈의 도핑 슬라이더가 그 서술을 그대로 옮긴 것이다
//  - 첫 번째 취득 시간창 5~50ns: US11017251B2
//  - 임피던스[MRayl]·음속[m/s]: 소다석회유리 13.44 / 6000, 폴리우레탄계 1.56 / 1500,
//    PVB 접합필름 2.61 / 2350, 아크릴 3.27 / 2750
//    (Onda Corporation, Tables of Acoustic Properties of Materials)
//
// 수식:
//  전송선 변환  Zin = Z*(ZL + iZ tan kd)/(Z + iZL tan kd),  k = 2*pi*f/c
//  경계 투과    T = 1 - |(Zin - Z_glass)/(Zin + Z_glass)|^2
//  층 안 왕복   t = 2d/c
//
// 단순화 고지: 수직입사 평면파이고 층의 흡수는 넣지 않았다. 층 양쪽을 모두 유리로 두었다
// (실제로는 한쪽이 센서 기판이다). 원리를 보여주는 모델이며 실측값이 아니다.

const Z_HARD = 13.44; // 커버글라스이자 센서 기판 쪽
const GATE_LO = 5; // 첫 취득 시간창 하한 [ns]
const GATE_HI = 50; // 상한 [ns]

const BASES = {
  pu: { label: '폴리우레탄계', z: 1.56, c: 1500 },
  pvb: { label: 'PVB', z: 2.61, c: 2350 },
  acrylic: { label: '아크릴', z: 3.27, c: 2750 },
};

const W = 300;
const H = 210;
const D_MAX = 60; // 가로축 두께 상한 [µm]

const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cdiv = (a, b) => {
  const d = b[0] * b[0] + b[1] * b[1];
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
};

/** 층 하나짜리 편도 투과율. z[MRayl], c[m/s], d[m], f[Hz] */
function oneWay(z, c, d, f) {
  const t = Math.tan((2 * Math.PI * f * d) / c);
  // Zin = z * (ZL + i z t) / (z + i ZL t), 여기서 ZL은 반대쪽 유리다
  const zi = cmul([z, 0], cdiv([Z_HARD, z * t], [z, Z_HARD * t]));
  const g = cdiv([zi[0] - Z_HARD, zi[1]], [zi[0] + Z_HARD, zi[1]]);
  return 1 - (g[0] * g[0] + g[1] * g[1]);
}

export function mount(container, params = {}) {
  const state = {
    base: params.base ?? 'pu',
    doping: params.doping ?? 1,
    dUm: params.dUm ?? 20,
    freqMHz: params.freqMHz ?? 10,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">계산</span>
      <span>두께를 3마이크로미터까지 내려 보고, 두께를 20에 둔 채 도핑만 올려 보십시오</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
        <div class="sim-legend">
          <span>세로축 편도 투과율 · 가로축 접착층 두께</span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>접착층 재료</label>
          <div class="sim-toggle-group" role="group">
            <button type="button" class="sim-toggle-btn" data-base="pu">폴리우레탄계</button>
            <button type="button" class="sim-toggle-btn" data-base="pvb">PVB</button>
            <button type="button" class="sim-toggle-btn" data-base="acrylic">아크릴</button>
          </div>
        </div>
        <div class="sim-control">
          <label>입자 도핑 <span data-out="dop"></span></label>
          <input type="range" min="100" max="220" step="5" data-in="dop" />
        </div>
        <div class="sim-control">
          <label>접착층 두께 <span data-out="thk"></span></label>
          <input type="range" min="1" max="${D_MAX}" step="1" data-in="thk" />
        </div>
        <div class="sim-control">
          <label>주파수 <span data-out="freq"></span> MHz</label>
          <input type="range" min="2" max="40" step="1" data-in="freq" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      층마다 전송선 변환 Zin = Z(Z<sub>L</sub> + iZ&thinsp;tan&thinsp;kd)/(Z + iZ<sub>L</sub>&thinsp;tan&thinsp;kd)를
      적용해 편도 투과율 T = 1 - |&Gamma;|&sup2;로 계산했습니다. 층의 양쪽을 모두 커버글라스
      13.44 MRayl로 두었습니다(실제로는 한쪽이 센서 기판입니다). 도핑 슬라이더는 음속이
      일정한 채 밀도만 올라가 임피던스가 그만큼 커지는 경우로, 에폭시에 입자를 도핑해 밀도를
      바꾼다는 US10891458B2의 서술을 그대로 옮긴 것입니다. 같은 특허가 이 층에 적은 사양은
      두께 15~25&micro;m, 음속 1,500~4,000m/s, 감쇠 25dB/cm 이하입니다. 시간창 5~50ns는
      US11017251B2입니다. 재료값은 Onda Corporation 음향물성표를 따랐습니다. 층의 흡수는
      넣지 않았으므로 이 곡선은 무손실 상한입니다. 수직입사 평면파를 가정한 단순화 모델이며
      실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const dopIn = container.querySelector('[data-in="dop"]');
  const thkIn = container.querySelector('[data-in="thk"]');
  const freqIn = container.querySelector('[data-in="freq"]');
  const dopOut = container.querySelector('[data-out="dop"]');
  const thkOut = container.querySelector('[data-out="thk"]');
  const freqOut = container.querySelector('[data-out="freq"]');
  const readout = container.querySelector('[data-out="readout"]');
  const baseBtns = [...container.querySelectorAll('[data-base]')];

  dopIn.value = String(Math.round(state.doping * 100));
  thkIn.value = String(state.dUm);
  freqIn.value = String(state.freqMHz);

  const zNow = () => BASES[state.base].z * state.doping;

  /** 아주 작은 값만 지수 표기로 떨어뜨린다. 0.83%가 8.30e-1%로 보이면 읽히지 않는다 */
  const pct = (v) => {
    const p = v * 100;
    if (p >= 10) return p.toFixed(1) + '%';
    if (p >= 0.1) return p.toFixed(2) + '%';
    return p.toExponential(2) + '%';
  };

  function render() {
    const z = zNow();
    const c = BASES[state.base].c;
    const f = state.freqMHz * 1e6;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    const PAD_L = 34;
    const PAD_R = 8;
    const PAD_T = 14;
    const PLOT_H = 132;
    const plotW = W - PAD_L - PAD_R;

    ctx.strokeStyle = 'rgba(230,225,215,0.16)';
    ctx.lineWidth = 1;
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'rgba(230,225,215,0.55)';
    for (let p = 0; p <= 100; p += 25) {
      const y = PAD_T + PLOT_H - (p / 100) * PLOT_H;
      ctx.beginPath();
      ctx.moveTo(PAD_L, y + 0.5);
      ctx.lineTo(W - PAD_R, y + 0.5);
      ctx.stroke();
      ctx.fillText(String(p), 6, y + 4);
    }
    for (let d = 20; d <= D_MAX; d += 20) {
      const x = PAD_L + (d / D_MAX) * plotW;
      ctx.fillText(String(d), x - 6, PAD_T + PLOT_H + 14);
    }

    // 도핑 전 곡선 (비교용)
    const zBase = BASES[state.base].z;
    if (state.doping > 1.001) {
      ctx.strokeStyle = 'rgba(230,225,215,0.28)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= plotW; i++) {
        const dUm = (i / plotW) * D_MAX;
        const t = oneWay(zBase, c, dUm * 1e-6, f);
        const y = PAD_T + PLOT_H - Math.min(1, Math.max(0, t)) * PLOT_H;
        if (i === 0) ctx.moveTo(PAD_L + i, y);
        else ctx.lineTo(PAD_L + i, y);
      }
      ctx.stroke();
    }

    // 현재 곡선
    ctx.strokeStyle = '#e08a3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= plotW; i++) {
      const dUm = (i / plotW) * D_MAX;
      const t = oneWay(z, c, dUm * 1e-6, f);
      const y = PAD_T + PLOT_H - Math.min(1, Math.max(0, t)) * PLOT_H;
      if (i === 0) ctx.moveTo(PAD_L + i, y);
      else ctx.lineTo(PAD_L + i, y);
    }
    ctx.stroke();

    // 특허가 적은 두께 구간 15~25µm
    const xA = PAD_L + (15 / D_MAX) * plotW;
    const xB = PAD_L + (25 / D_MAX) * plotW;
    ctx.fillStyle = 'rgba(230,225,215,0.07)';
    ctx.fillRect(xA, PAD_T, xB - xA, PLOT_H);
    ctx.fillStyle = 'rgba(230,225,215,0.5)';
    ctx.fillText('특허 15~25', xA + 2, PAD_T + 11);

    // 현재 두께 표시
    const tNow = oneWay(z, c, state.dUm * 1e-6, f);
    const xNow = PAD_L + (state.dUm / D_MAX) * plotW;
    const yNow = PAD_T + PLOT_H - Math.min(1, Math.max(0, tNow)) * PLOT_H;
    ctx.strokeStyle = 'rgba(224,138,60,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xNow + 0.5, PAD_T);
    ctx.lineTo(xNow + 0.5, PAD_T + PLOT_H);
    ctx.stroke();
    ctx.fillStyle = '#e08a3c';
    ctx.fillRect(xNow - 3, yNow - 3, 6, 6);

    // 층 단면
    const yStack = PAD_T + PLOT_H + 26;
    const hStack = 30;
    let x = PAD_L;
    const segs = [
      ['커버글라스', 52, 'rgba(120,150,175,0.75)'],
      ['접착층', Math.max(14, Math.min(56, state.dUm * 1.4)), 'rgba(200,175,120,0.75)'],
      ['센서', 52, 'rgba(150,140,170,0.8)'],
    ];
    const totalW = segs.reduce((s, v) => s + v[1], 0);
    const scale = (W - PAD_L - PAD_R) / totalW;
    for (const [label, w, color] of segs) {
      const ww = w * scale;
      ctx.fillStyle = color;
      ctx.fillRect(x, yStack, ww, hStack);
      ctx.fillStyle = 'rgba(15,15,12,0.92)';
      if (ww > 34) ctx.fillText(label, x + 4, yStack + 19);
      x += ww;
    }

    // 라벨
    dopOut.textContent =
      state.doping <= 1.001 ? '없음 (기본 배합)' : `밀도 ${state.doping.toFixed(2)}배`;
    thkOut.textContent = `${state.dUm}µm`;
    freqOut.textContent = String(state.freqMHz);

    const round = tNow * tNow;
    const quarter = ((c / f) * 1e6) / 4;
    const echoNs = ((2 * state.dUm * 1e-6) / c) * 1e9;
    const inGate = echoNs >= GATE_LO && echoNs <= GATE_HI;

    let verdict;
    if (tNow < 0.2) verdict = '접착층에서 대부분 되돌아갑니다';
    else if (tNow < 0.6) verdict = '절반 넘게 잃고 있습니다';
    else if (tNow < 0.9) verdict = '쓸 만하지만 손해가 남습니다';
    else verdict = '소리가 이 층을 거의 보지 못합니다';

    readout.innerHTML =
      `임피던스 <b>${z.toFixed(2)} MRayl</b> (유리 13.44)<br>` +
      `편도 투과 <b>${pct(tNow)}</b> · ` +
      `왕복 <b>${pct(round)}</b><br>` +
      `사분파장 두께 <b>${quarter.toFixed(1)}µm</b> (여기가 최악)<br>` +
      `층 안 왕복 <b>${echoNs.toFixed(0)}ns</b> · ` +
      `첫 시간창 ${GATE_LO}~${GATE_HI}ns ${inGate ? '<b>안</b>' : '밖'}<br>` +
      `<span>${verdict}</span>`;
  }

  function syncBase() {
    baseBtns.forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.base === state.base))
    );
  }

  baseBtns.forEach((b) =>
    b.addEventListener('click', () => {
      state.base = b.dataset.base;
      syncBase();
      render();
    })
  );
  dopIn.addEventListener('input', () => {
    state.doping = Number(dopIn.value) / 100;
    render();
  });
  thkIn.addEventListener('input', () => {
    state.dUm = Number(thkIn.value);
    render();
  });
  freqIn.addEventListener('input', () => {
    state.freqMHz = Number(freqIn.value);
    render();
  });

  syncBase();
  render();
}

export default mount;
