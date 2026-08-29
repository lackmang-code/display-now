// 나노로드 LED를 전기장으로 눕혀 정렬할 때, 그 정렬이 성립하는 (주파수, 전압)의 창.
//
// 근거가 되는 등록특허 세 건:
//   US11685154B2 (삼성디스플레이) - 교류 ±10~50V, 10kHz~1MHz
//   US10361246B2 (PSI 출원 → 2018-09-07 삼성디스플레이 양도) - 50kHz~1GHz,
//                 "50kHz 미만이면 전압 범위를 만족해도 장착되는 소자 수가 줄어든다"
//   US9935241B2  (PSI 출원 → 삼성디스플레이 양도) - 자기조립용 "용매" 자체가 발명
//
// 모델: 창의 세 벽이 서로 다른 물리에서 나온다.
//   왼쪽(저주파)  전극 이중층이 장을 차폐하고 교류 전기삼투 유동이 로드를 쓸어간다.
//                 차폐 임계 f_c = sigma*2*lambda_D / (2*pi*eps_m*g), 안정선은 그 10배.
//   위(고전압)    용매의 절연파괴. E = Vpp/2g 가 파괴전계를 넘으면 정렬이 아니라 방전이다.
//   아래(저전압)  유전영동 정렬에너지가 열운동 kT와 같아지는 선.
// 단순화: 로드는 도전성 회전타원체(sigma_p >> sigma_m)로 두어 저주파 극한의 감극계수만
//        썼고, 로드끼리의 쌍극자 상호작용(사슬 형성)과 표면 부착은 넣지 않았다.
//        명세서의 50kHz는 실험값이고, 이 모델의 왼쪽 벽은 그것을 설명해 보려는 근사다.

const EPS0 = 8.854e-12;
const KB = 1.380649e-23;
const TEMP = 298;
const EPS_R = 20; // 케톤계 용매
const D_ION = 1e-9; // 이온 확산계수 m^2/s
const E_BD = 2.0e7; // 용매 절연파괴 전계 V/m
const ROD_D = 0.6e-6; // 로드 지름 600nm 고정 (US10910512B2 는 100nm~5um 범위)
const GAP = 3e-6; // 전극 간격 고정

const INK = '#f4f3ee';
const MUTE = '#a4a49a';
const LINE = '#55554d';
const GREEN = '#7fc79a';
const GREEN_D = '#2f4a3a';
const GOLD = '#e3c05a';
const GOLD_D = '#b8923c';
const WARN = '#e58b72';

const F_MIN = 1e3;
const F_MAX = 1e7;
const V_MAX = 150;

export function mount(container, params = {}) {
  const state = {
    freqKHz: params.freqKHz ?? 100,
    vppV: params.vppV ?? 60,
    sigmaExp: params.sigmaExp ?? -4, // log10(S/m)
    rodUm: params.rodUm ?? 4,
  };

  container.innerHTML = [
    '<div class="sim-head">',
    '  <span class="sim-tag">개념도</span>',
    '  <span>정렬을 막는 것은 전압이 아니라 주파수입니다</span>',
    '</div>',
    '<div class="sim-body">',
    '  <div class="sim-canvas-wrap">',
    '    <canvas width="336" height="306"></canvas>',
    '    <div class="sim-legend">',
    '      <span style="color:' + GREEN + '">■ 정렬 창</span>',
    '      <span style="color:' + GOLD + '">▫ 특허 청구 범위</span>',
    '      <span style="color:' + WARN + '">● 현재 조건</span>',
    '    </div>',
    '  </div>',
    '  <div class="sim-controls">',
    '    <div class="sim-control">',
    '      <label>정렬 주파수 <span data-out="freq"></span></label>',
    '      <input type="range" min="0" max="100" step="1" data-in="freq" />',
    '    </div>',
    '    <div class="sim-control">',
    '      <label>정렬 전압(peak to peak) <span data-out="vpp"></span>V</label>',
    '      <input type="range" min="10" max="150" step="2" data-in="vpp" />',
    '    </div>',
    '    <div class="sim-control">',
    '      <label>용매 전도도 <span data-out="sigma"></span></label>',
    '      <input type="range" min="-60" max="-20" step="1" data-in="sigma" />',
    '    </div>',
    '    <div class="sim-control">',
    '      <label>나노로드 길이 <span data-out="rod"></span>&micro;m</label>',
    '      <input type="range" min="10" max="100" step="1" data-in="rod" />',
    '    </div>',
    '    <div class="sim-readout" data-out="readout"></div>',
    '  </div>',
    '</div>',
    '<div class="sim-note">',
    '  전극 간격은 3&micro;m, 로드 지름은 600nm로 고정했습니다. 창의 세 벽은 각각 다른 물리에서',
    '  나옵니다. <b>왼쪽 벽</b>은 전극 이중층의 차폐와 교류 전기삼투 유동(차폐 임계주파수의',
    '  10배를 안정선으로 잡음), <b>위 벽</b>은 용매의 절연파괴(2&times;10<sup>7</sup>V/m 가정),',
    '  <b>아래 벽</b>은 유전영동 정렬에너지가 열운동 kT와 같아지는 선입니다. 그 아래 벽은 이',
    '  크기의 로드에서는 1V에 한참 못 미쳐 화면에 들어오지 않습니다 &mdash;',
    '  <b>열운동은 애초에 상대가 되지 않는다</b>는 뜻이고, 그래서 실제로 남는 벽은 왼쪽',
    '  하나뿐입니다. 아래 그림에서 주파수를 내렸을 때 변하는 것이 기울기가 아니라',
    '  <b>자리를 채운 개수</b>인 것도 그래서입니다 &mdash; 명세서가 적은 것도',
    '  "50kHz 미만이면 장착되는 소자 수가 줄어든다"이지 각도가 흐트러진다가 아닙니다.',
    '  포획력이 E&sup2;에 비례한다고 보고 유효 전계의 제곱으로 개수를 깎았습니다.',
    '  로드끼리 사슬을 이루는 상호작용과 표면 부착은 넣지 않았습니다.',
    '  명세서의 50kHz는 실험값이고 왼쪽 벽은 그 값을 설명해 보려는 근사입니다.',
    '  원리를 보여주기 위한 모델이며 실측값이 아닙니다.',
    '</div>',
  ].join('\n');

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const sliderToFreq = (v) => F_MIN * Math.pow(F_MAX / F_MIN, v / 100);
  const freqToSlider = (f) => (100 * Math.log(f / F_MIN)) / Math.log(F_MAX / F_MIN);

  // 장축비 a인 편장 회전타원체의 장축 방향 감극계수(정확식).
  // 근사식 (ln2a − 1)/a² 는 a가 3보다 작을 때 비단조로 어긋난다.
  function depolarPar(a) {
    if (a <= 1.0001) return 1 / 3;
    const e = Math.sqrt(1 - 1 / (a * a));
    return ((1 - e * e) / (e * e * e)) * (0.5 * Math.log((1 + e) / (1 - e)) - e);
  }

  function physics(freqHz, vppV, sigma, rodUm) {
    const epsM = EPS_R * EPS0;
    const L = rodUm * 1e-6;
    const a = L / ROD_D;
    const nPar = depolarPar(a);
    const nPerp = (1 - nPar) / 2;
    const dK = 1 / nPar - 1 / nPerp; // 도전성 극한의 정렬 이방성
    const vol = Math.PI * Math.pow(ROD_D / 2, 2) * L;
    const lD = Math.sqrt((epsM * D_ION) / sigma);
    const fc = (sigma * 2 * lD) / (2 * Math.PI * epsM * GAP);
    const shield = freqHz / Math.sqrt(freqHz * freqHz + fc * fc);
    const eAmp = (vppV / (2 * GAP)) * shield;
    const eRms = eAmp / Math.SQRT2;
    const lambda = (epsM * vol * dK * eRms * eRms) / (2 * KB * TEMP);
    return { fc, shield, eAmp, lambda, dK, a, vol };
  }

  // P(theta) ∝ exp(L cos²θ) sinθ 에서 S = <(3cos²θ − 1)/2>
  function orderS(lam) {
    if (lam > 400) return 1;
    let num = 0;
    let den = 0;
    const N = 300;
    for (let i = 0; i <= N; i++) {
      const u = i / N;
      const w = Math.exp(lam * (u * u - 1));
      num += u * u * w;
      den += w;
    }
    return (3 * (num / den) - 1) / 2;
  }

  function calc() {
    const sigma = Math.pow(10, state.sigmaExp);
    const freqHz = state.freqKHz * 1000;
    const p = physics(freqHz, state.vppV, sigma, state.rodUm);
    const S = orderS(p.lambda);
    const fWall = 10 * p.fc;
    const vWall = 2 * E_BD * GAP;
    const inside = freqHz >= fWall && state.vppV <= vWall;
    const vTherm = state.vppV / Math.sqrt(Math.max(p.lambda, 1e-30));
    // 유전영동 포획력은 E²에 비례한다. 차폐로 유효 전계가 깎이면
    // 그 제곱만큼 붙잡히는 개수가 준다 — 명세서가 말한 "장착 개수 감소"다.
    const mounted = Math.max(0, Math.round(12 * p.shield * p.shield));
    return { ...p, sigma, freqHz, S, fWall, vWall, inside, vTherm, mounted };
  }

  const PX = { x0: 44, y0: 16, x1: 322, y1: 176 };
  const fx = (f) => PX.x0 + (Math.log(f / F_MIN) / Math.log(F_MAX / F_MIN)) * (PX.x1 - PX.x0);
  const vy = (v) => PX.y1 - (v / V_MAX) * (PX.y1 - PX.y0);

  function mulberry32(seed) {
    let t = seed;
    return function () {
      t += 0x6d2b79f5;
      let r = t;
      r = Math.imul(r ^ (r >>> 15), r | 1);
      r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function fmtHz(f) {
    if (f >= 1e6) return (f / 1e6).toFixed(f >= 1e7 ? 0 : 2) + 'MHz';
    if (f >= 1e3) return (f / 1e3).toFixed(f >= 1e5 ? 0 : 1) + 'kHz';
    if (f >= 1) return f.toFixed(0) + 'Hz';
    return f.toExponential(1) + 'Hz';
  }

  function draw() {
    const c = calc();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 336, 306);

    const wx = Math.max(PX.x0, Math.min(PX.x1, fx(Math.max(c.fWall, F_MIN))));
    const wy = Math.max(PX.y0, Math.min(PX.y1, vy(c.vWall)));

    ctx.fillStyle = GREEN_D;
    ctx.globalAlpha = 0.55;
    ctx.fillRect(wx, wy, PX.x1 - wx, PX.y1 - wy);
    ctx.globalAlpha = 1;

    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PX.x0, PX.y0);
    ctx.lineTo(PX.x0, PX.y1);
    ctx.lineTo(PX.x1, PX.y1);
    ctx.stroke();

    ctx.font = '10px ui-monospace, monospace';
    ctx.fillStyle = MUTE;
    ctx.textAlign = 'center';
    const ticks = [[1e3, '1k'], [1e4, '10k'], [1e5, '100k'], [1e6, '1M'], [1e7, '10M']];
    for (const t of ticks) {
      const x = fx(t[0]);
      ctx.beginPath();
      ctx.moveTo(x, PX.y1);
      ctx.lineTo(x, PX.y1 + 3);
      ctx.stroke();
      ctx.fillText(t[1], x, PX.y1 + 14);
    }
    ctx.textAlign = 'right';
    for (const v of [0, 50, 100, 150]) {
      const y = vy(v);
      ctx.beginPath();
      ctx.moveTo(PX.x0 - 3, y);
      ctx.lineTo(PX.x0, y);
      ctx.stroke();
      ctx.fillText(String(v), PX.x0 - 6, y + 3.5);
    }
    ctx.textAlign = 'right';
    ctx.fillText('Hz', PX.x1, PX.y1 + 26);
    ctx.textAlign = 'left';
    ctx.fillText('Vpp', 8, PX.y0 + 4);

    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 1.5;
    if (wx > PX.x0 && wx < PX.x1) {
      ctx.beginPath();
      ctx.moveTo(wx, PX.y1);
      ctx.lineTo(wx, Math.max(wy, PX.y0));
      ctx.stroke();
    }
    if (wy > PX.y0 && wy < PX.y1) {
      ctx.beginPath();
      ctx.moveTo(Math.max(wx, PX.x0), wy);
      ctx.lineTo(PX.x1, wy);
      ctx.stroke();
    }
    ctx.fillStyle = GREEN;
    ctx.font = '10px system-ui, sans-serif';
    if (wx > PX.x0 + 4 && wx < PX.x1 - 66) {
      ctx.textAlign = 'left';
      ctx.fillText('이중층 차폐', wx + 4, PX.y0 + 11);
    }
    if (wy > PX.y0 + 10) {
      ctx.textAlign = 'right';
      ctx.fillText('절연파괴', PX.x1 - 4, wy - 5);
    }

    // 특허 청구 범위. 라벨은 사각형 바깥에 두어 서로 겹치지 않게 한다
    ctx.setLineDash([3, 2]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = GOLD;
    ctx.strokeRect(fx(1e4), vy(100), fx(1e6) - fx(1e4), vy(20) - vy(100));
    ctx.strokeStyle = GOLD_D;
    ctx.strokeRect(fx(5e4), vy(60), fx(1e7) - fx(5e4), vy(0) - vy(60));
    ctx.setLineDash([]);
    ctx.font = '9.5px ui-monospace, monospace';
    ctx.fillStyle = GOLD;
    ctx.textAlign = 'left';
    ctx.fillText('US11685154  10k~1M · ±10~50V', fx(1e4), vy(100) - 4);
    ctx.fillStyle = GOLD_D;
    ctx.textAlign = 'right';
    ctx.fillText('US10361246  50k~1G', PX.x1 - 2, PX.y1 - 5);

    const cx = Math.max(PX.x0, Math.min(PX.x1, fx(c.freqHz)));
    const cy = vy(state.vppV);
    ctx.fillStyle = c.inside ? INK : WARN;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = c.inside ? INK : WARN;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 7.5, 0, Math.PI * 2);
    ctx.stroke();

    // 아래: 그 조건에서 로드가 실제로 어떻게 눕는가
    const by = 214;
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, by - 24);
    ctx.lineTo(328, by - 24);
    ctx.stroke();
    ctx.fillStyle = MUTE;
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('전극 사이에 앉은 로드', 8, by - 11);

    ctx.fillStyle = '#6f6f68';
    ctx.fillRect(20, by + 6, 296, 7);
    ctx.fillRect(20, by + 62, 296, 7);
    ctx.fillStyle = MUTE;
    ctx.font = '9.5px ui-monospace, monospace';
    ctx.textAlign = 'left';
    ctx.fillText('제1 전극', 20, by + 3);
    ctx.fillText('제2 전극', 20, by + 80);

    // 명세서가 말한 것은 "각도가 흐트러진다"가 아니라 "장착되는 소자 수가 줄어든다"이다.
    // 그래서 여기서 변하는 것은 기울기가 아니라 자리를 채운 개수다.
    const cosSq = (2 * c.S + 1) / 3;
    const spread = Math.acos(Math.sqrt(Math.min(1, Math.max(0, cosSq))));
    const rng = mulberry32(7);
    for (let i = 0; i < 12; i++) {
      const rx = 34 + i * 24.5;
      const ry = by + 38;
      const half = 22;
      if (i >= c.mounted) {
        // 비어 있는 자리
        ctx.strokeStyle = '#3a3a34';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(rx, ry - half);
        ctx.lineTo(rx, ry + half);
        ctx.stroke();
        ctx.setLineDash([]);
        continue;
      }
      const th = (rng() - 0.5) * 2 * spread * 1.7;
      const dx = Math.sin(th) * half;
      const dy = Math.cos(th) * half;
      ctx.strokeStyle = c.inside ? GREEN : WARN;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(rx - dx, ry - dy);
      ctx.lineTo(rx + dx, ry + dy);
      ctx.stroke();
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(rx - dx, ry - dy, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.font = '9.5px ui-monospace, monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = c.mounted < 12 ? WARN : GREEN;
    ctx.fillText('12개 중 ' + c.mounted + '개 — 기울기 아닌 개수가 준다', 316, by + 80);
  }

  function render() {
    const c = calc();
    container.querySelector('[data-out="freq"]').textContent = fmtHz(c.freqHz);
    container.querySelector('[data-out="vpp"]').textContent = String(state.vppV);
    container.querySelector('[data-out="sigma"]').textContent =
      '10^' + state.sigmaExp.toFixed(1) + ' S/m';
    container.querySelector('[data-out="rod"]').textContent = state.rodUm.toFixed(1);

    const verdict =
      state.vppV > c.vWall
        ? '절연파괴 영역이다. 정렬이 아니라 방전이 일어난다'
        : !c.inside
          ? '차폐·유동 영역이다. 전압을 올려도 장이 용액 안에 걸리지 않는다'
          : '정렬 창 안이다';
    container.querySelector('[data-out="readout"]').innerHTML =
      '차폐 임계 <b>' + fmtHz(c.fc) + '</b> → 안정선 <b>' + fmtHz(c.fWall) + '</b><br />' +
      '유효 전계 ' + (c.shield * 100).toFixed(1) + '% → 장착 <b>' + c.mounted + '/12개</b><br />' +
      '정렬차수 S = ' + c.S.toFixed(3) + ' <span style="color:' + MUTE + '">(각도는 늘 맞는다)</span><br />' +
      '열운동과 비기는 전압 <b>' + c.vTherm.toPrecision(2) + 'V</b><br />' +
      '<span style="color:' + (c.inside ? MUTE : WARN) + '">' + verdict + '</span>';
    draw();
  }

  const fEl = container.querySelector('[data-in="freq"]');
  const vEl = container.querySelector('[data-in="vpp"]');
  const sEl = container.querySelector('[data-in="sigma"]');
  const rEl = container.querySelector('[data-in="rod"]');
  fEl.value = String(freqToSlider(state.freqKHz * 1000));
  vEl.value = String(state.vppV);
  sEl.value = String(state.sigmaExp * 10);
  rEl.value = String(state.rodUm * 10);

  fEl.addEventListener('input', (e) => {
    state.freqKHz = sliderToFreq(Number(e.target.value)) / 1000;
    render();
  });
  vEl.addEventListener('input', (e) => {
    state.vppV = Number(e.target.value);
    render();
  });
  sEl.addEventListener('input', (e) => {
    state.sigmaExp = Number(e.target.value) / 10;
    render();
  });
  rEl.addEventListener('input', (e) => {
    state.rodUm = Number(e.target.value) / 10;
    render();
  });

  render();
}

export default mount;
