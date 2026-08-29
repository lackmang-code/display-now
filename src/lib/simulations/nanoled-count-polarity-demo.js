// 나노로드 LED를 잉크로 뿌려 정렬할 때 화소마다 몇 개가 앉는지, 그중 몇 개가
// 제대로 된 방향으로 앉는지가 그대로 휘도 산포가 된다.
//
// 근거가 되는 등록특허:
//   US10361246B2 (PSI 출원 → 2018-09-07 삼성디스플레이 양도)
//     청구항이 "제1 반도체가 제1 전극에 접촉하는 소자의 개수가 전체의 60% 이상"을
//     한정한다. 전기장은 로드를 눕히기는 해도 어느 끝이 어느 전극에 닿을지는
//     정하지 못한다. 대칭 파형이면 50:50이고, 비대칭 조립전압으로 60%까지 끌어올린다.
//   US11685154B2 (삼성디스플레이)
//     잉크젯 장치 청구항에 "스테이지 위 각 dipole의 위치를 측정하는 제3 센싱부"가 있다.
//     정렬 결과를 소자 하나 단위로 세어야 했다는 뜻이다.
//   US10910512B2 (PSI 출원 → 삼성디스플레이 양도) - 로드 길이 100nm~10um, 지름 100nm~5um
//
// 모델: 화소에 앉는 개수 N은 평균 λ의 푸아송 분포를 따른다고 본다(묽은 잉크에서
//       독립적으로 도착하는 입자). 그중 극성이 맞는 것만 켜지므로 유효 개수는
//       푸아송 씨닝에 의해 다시 평균 λp의 푸아송 분포다. 화소 휘도는 유효 개수에
//       비례한다고 두었다. 따라서 휘도 변동계수 CV = 1/sqrt(λp).
// 단순화: 로드마다 밝기가 같다고 보았고(실제로는 개체차가 더해져 산포가 커진다),
//        전극 근처에 몰리는 위치 상관과 이미 앉은 로드가 다음 로드를 막는 효과는
//        넣지 않았다. 즉 이 CV는 실제보다 낙관적인 하한이다.

const ROD_L_UM = 4.0; // 로드 길이
const ROD_D_UM = 0.6; // 로드 지름
const MURA_CV = 0.03; // 육안으로 무라가 보이기 시작하는 휘도 변동계수

const INK = '#f4f3ee';
const MUTE = '#a4a49a';
const LINE = '#55554d';
const GREEN = '#7fc79a';
const GOLD = '#e3c05a';
const WARN = '#e58b72';

const COLS = 24;
const ROWS = 10;

export function mount(container, params = {}) {
  const state = {
    lambda: params.lambda ?? 120,
    polarity: params.polarity ?? 60,
    pitchUm: params.pitchUm ?? 125,
  };

  container.innerHTML = [
    '<div class="sim-head">',
    '  <span class="sim-tag">개념도</span>',
    '  <span>정렬된 개수가 흩어지면 그대로 휘도가 흩어집니다</span>',
    '</div>',
    '<div class="sim-body">',
    '  <div class="sim-canvas-wrap">',
    '    <canvas width="336" height="306"></canvas>',
    '    <div class="sim-legend">',
    '      <span style="color:' + GREEN + '">■ 화소 240개</span>',
    '      <span style="color:' + GOLD + '">│ 무라 한계 3%</span>',
    '      <span style="color:' + WARN + '">■ 꺼진 화소</span>',
    '    </div>',
    '  </div>',
    '  <div class="sim-controls">',
    '    <div class="sim-control">',
    '      <label>화소당 뿌린 로드 <span data-out="lam"></span>개</label>',
    '      <input type="range" min="0" max="100" step="1" data-in="lam" />',
    '    </div>',
    '    <div class="sim-control">',
    '      <label>극성이 맞는 비율 <span data-out="pol"></span>%</label>',
    '      <input type="range" min="50" max="100" step="1" data-in="pol" />',
    '    </div>',
    '    <div class="sim-control">',
    '      <label>서브픽셀 짧은 변 <span data-out="pitch"></span>&micro;m</label>',
    '      <input type="range" min="10" max="200" step="1" data-in="pitch" />',
    '    </div>',
    '    <div class="sim-readout" data-out="readout"></div>',
    '  </div>',
    '</div>',
    '<div class="sim-note">',
    '  화소에 앉는 개수를 평균 &lambda;의 푸아송 분포로 두었습니다. 극성이 맞는 것만 켜지므로',
    '  유효 개수는 다시 평균 &lambda;p의 푸아송이 되고, 휘도 변동계수는',
    '  <b>CV = 1/&radic;(&lambda;p)</b>입니다. 극성 60%는 US10361246B2 청구항이 한정한 값이고,',
    '  대칭 파형이면 50%입니다. 면적은 로드 하나가 4&micro;m&times;0.6&micro;m 자리를 차지한다고',
    '  보고 서브픽셀을 3:1로 잡아 계산했습니다.',
    '  <b>로드마다 밝기가 같다고 보았고, 위치 상관과 이미 앉은 로드가 다음 로드를 막는 효과는',
    '  넣지 않았습니다.</b> 그래서 이 CV는 실제보다 낙관적인 하한입니다.',
    '  원리를 보여주기 위한 모델이며 실측값이 아닙니다.',
    '</div>',
  ].join('\n');

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const sliderToLam = (v) => 5 * Math.pow(5000 / 5, v / 100);
  const lamToSlider = (l) => (100 * Math.log(l / 5)) / Math.log(5000 / 5);

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

  function poisson(mu, rng) {
    if (mu > 30) {
      // 정규 근사 (박스-뮐러)
      const u1 = Math.max(rng(), 1e-12);
      const u2 = rng();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      return Math.max(0, Math.round(mu + Math.sqrt(mu) * z));
    }
    const lim = Math.exp(-mu);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= rng();
    } while (p > lim);
    return k - 1;
  }

  function calc() {
    const p = state.polarity / 100;
    const mu = state.lambda * p;
    const cv = mu > 0 ? 1 / Math.sqrt(mu) : 1;
    const dark = Math.exp(-mu);
    const needUm2 = state.lambda * ROD_L_UM * ROD_D_UM;
    const haveUm2 = state.pitchUm * state.pitchUm * 3;
    const fill = needUm2 / haveUm2;
    // 무라 한계를 만족하는 데 필요한 뿌림 개수
    const lamNeed = 1 / (MURA_CV * MURA_CV) / p;
    return { p, mu, cv, dark, needUm2, haveUm2, fill, lamNeed };
  }

  function draw() {
    const c = calc();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 336, 306);

    // ── 위: 화소 격자
    ctx.fillStyle = MUTE;
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('화소 ' + COLS * ROWS + '개의 휘도', 12, 12);
    ctx.textAlign = 'right';
    ctx.fillStyle = c.cv > MURA_CV ? WARN : GREEN;
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillText('CV ' + (c.cv * 100).toFixed(1) + '%', 324, 12);

    const rng = mulberry32(20260901);
    const cell = 13;
    const gx = 12;
    const gy = 22;
    const counts = [];
    for (let i = 0; i < COLS * ROWS; i++) counts.push(poisson(c.mu, rng));

    for (let i = 0; i < counts.length; i++) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const n = counts[i];
      const rel = c.mu > 0 ? n / c.mu : 0;
      const x = gx + col * cell;
      const y = gy + row * cell;
      if (n === 0) {
        ctx.fillStyle = WARN;
        ctx.fillRect(x, y, cell - 1.5, cell - 1.5);
        continue;
      }
      // 평균을 밝기 0.62로 두고 상대 휘도를 그대로 밝기로
      const lum = Math.max(0.06, Math.min(1, rel * 0.62));
      const g = Math.round(60 + lum * 150);
      ctx.fillStyle = 'rgb(' + Math.round(g * 0.62) + ',' + g + ',' + Math.round(g * 0.74) + ')';
      ctx.fillRect(x, y, cell - 1.5, cell - 1.5);
    }

    // ── 아래: 유효 개수 분포
    const hx0 = 44;
    const hx1 = 324;
    const hy0 = 190;
    const hy1 = 282;
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(hx0, hy0 - 10);
    ctx.lineTo(hx0, hy1);
    ctx.lineTo(hx1, hy1);
    ctx.stroke();

    ctx.fillStyle = MUTE;
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('화소당 켜진 로드 수', 12, 178);

    // 히스토그램
    const lo = Math.max(0, c.mu - 4 * Math.sqrt(Math.max(c.mu, 1)));
    const hi = c.mu + 4 * Math.sqrt(Math.max(c.mu, 1)) + 2;
    const bins = 28;
    const hist = new Array(bins).fill(0);
    for (const n of counts) {
      const b = Math.floor(((n - lo) / (hi - lo)) * bins);
      if (b >= 0 && b < bins) hist[b]++;
    }
    const maxH = Math.max(1, ...hist);
    const bw = (hx1 - hx0) / bins;
    for (let b = 0; b < bins; b++) {
      const h = (hist[b] / maxH) * (hy1 - hy0);
      ctx.fillStyle = GREEN;
      ctx.globalAlpha = 0.75;
      ctx.fillRect(hx0 + b * bw + 0.6, hy1 - h, bw - 1.2, h);
      ctx.globalAlpha = 1;
    }

    // 평균선과 3% 밴드
    const xOf = (n) => hx0 + ((n - lo) / (hi - lo)) * (hx1 - hx0);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xOf(c.mu), hy0 - 10);
    ctx.lineTo(xOf(c.mu), hy1);
    ctx.stroke();

    ctx.strokeStyle = GOLD;
    ctx.setLineDash([3, 2]);
    for (const s of [-1, 1]) {
      const x = xOf(c.mu * (1 + s * MURA_CV));
      if (x > hx0 && x < hx1) {
        ctx.beginPath();
        ctx.moveTo(x, hy0 - 10);
        ctx.lineTo(x, hy1);
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);

    ctx.fillStyle = MUTE;
    ctx.font = '9.5px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(lo) + '', hx0, hy1 + 13);
    ctx.fillText(Math.round(hi) + '', hx1, hy1 + 13);
    ctx.fillStyle = INK;
    ctx.fillText('평균 ' + c.mu.toFixed(c.mu < 10 ? 1 : 0), xOf(c.mu), hy0 - 14);
  }

  function fmtPpm(x) {
    const ppm = x * 1e6;
    if (ppm >= 1e5) return (x * 100).toFixed(1) + '%';
    if (ppm >= 1) return ppm.toFixed(0) + 'ppm';
    if (ppm >= 1e-3) return ppm.toExponential(1) + 'ppm';
    return '0에 가까움';
  }

  function render() {
    const c = calc();
    container.querySelector('[data-out="lam"]').textContent = String(Math.round(state.lambda));
    container.querySelector('[data-out="pol"]').textContent = String(state.polarity);
    container.querySelector('[data-out="pitch"]').textContent = String(state.pitchUm);

    const verdict =
      c.fill > 1
        ? '로드가 서브픽셀 면적에 들어가지 않는다'
        : c.cv > MURA_CV
          ? '휘도 산포가 무라 한계를 넘는다'
          : '무라 한계 안이다';
    container.querySelector('[data-out="readout"]').innerHTML =
      '켜지는 로드 <b>' + c.mu.toFixed(c.mu < 10 ? 1 : 0) + '개</b> · ' +
      '휘도 CV <b>' + (c.cv * 100).toFixed(1) + '%</b><br />' +
      '꺼진 화소 ' + fmtPpm(c.dark) + '<br />' +
      '3%를 맞추려면 <b>' + Math.ceil(c.lamNeed) + '개</b>를 뿌려야 한다<br />' +
      '면적 점유 <b>' + (c.fill * 100).toFixed(1) + '%</b>' +
      ' <span style="color:' + MUTE + '">(65인치 4K 125, 모바일 20)</span><br />' +
      '<span style="color:' + (c.fill > 1 || c.cv > MURA_CV ? WARN : MUTE) + '">' + verdict + '</span>';
    draw();
  }

  const lEl = container.querySelector('[data-in="lam"]');
  const pEl = container.querySelector('[data-in="pol"]');
  const qEl = container.querySelector('[data-in="pitch"]');
  lEl.value = String(lamToSlider(state.lambda));
  pEl.value = String(state.polarity);
  qEl.value = String(state.pitchUm);

  lEl.addEventListener('input', (e) => {
    state.lambda = sliderToLam(Number(e.target.value));
    render();
  });
  pEl.addEventListener('input', (e) => {
    state.polarity = Number(e.target.value);
    render();
  });
  qEl.addEventListener('input', (e) => {
    state.pitchUm = Number(e.target.value);
    render();
  });

  render();
}

export default mount;
