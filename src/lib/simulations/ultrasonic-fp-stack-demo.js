// 화면보호필름은 왜 어떤 것은 되고 어떤 것은 안 되는가 — 다층 음향 투과.
//
// 커버글라스와 손가락 사이에 층이 끼면 경계가 늘어난다. 그런데 층의 두께가 파장과 같은
// 자릿수라 층 안에서 오간 반사가 서로 간섭한다. 그래서 결과가 두께에 따라 크게 달라진다.
// 사분파장 두께에서는 오히려 투과가 좋아지고(정합층), 반파장 두께에서는 층이 없는 것과
// 같아진다. 반면 공기층은 두께와 무관하게 거의 전부를 되돌려보낸다.
//
// 근거:
//  - 사분파장 정합층의 최적 임피던스가 두 매질의 기하평균이라는 것:
//    Sensors 2020, 20(14), 4051 "the matching layer has an acoustic impedance Z_M, which is
//    the geometric mean of the acoustic impedance of the two media"
//  - 반파장·사분파장·(n+1)λ/4 등 정합 구성의 분류: 같은 리뷰 2장
//  - 언더디스플레이에서는 초음파가 OLED 여러 층을 통과해야 하고 그 과정에서 임피던스
//    부정합에 의한 투과 손실이 생긴다: Measurement 237 (2024) 115239
//  - 초음파가 유리·알루미늄·스테인리스·사파이어·플라스틱을 통과한다는 것,
//    1마이크로미터 두께 Al2O3 보호층은 음의 전달에 거의 영향이 없다는 것:
//    Micromachines 2023, 14(6), 1253
//  - 임피던스[MRayl]: 소다석회유리 13.44, PET(마일라) 3.00, 실리콘고무 1.04,
//    공기 0.00043, 조직 1.5. 음속[m/s]: 6000 · 2540 · 1027 · 344 · 1540
//    (Onda Corporation, Tables of Acoustic Properties of Materials)
//  - 감쇠[dB/cm/MHz]: 같은 표의 dB/cm 값을 측정 주파수로 나눈 것. PET는 표에 감쇠가
//    실려 있지 않아 같은 계열인 PETG 6763(20.0 dB/cm @5MHz)을 대신 썼다. 실리콘고무는
//    Dow Silastic GP45(23.4 @4MHz), 유리는 표에 감쇠 열이 비어 있어 0.02로 두었다.
//    공기층은 두께가 나노미터라 감쇠가 붙을 거리가 못 되므로 0으로 둔다
//
// 수식 (전달행렬):
//  층 하나  [A B; C D] = [cos kd, i Z sin kd; i sin(kd)/Z, cos kd]
//  복소 파수 k = 2*pi*f/c - i*alpha  (alpha[Np/m] = alpha[dB/cm/MHz] * f[MHz] * 11.5129)
//  압력 투과 t = 2 / (A + B/Z_skin + C*Z_glass + D*Z_glass/Z_skin)
//  세기 투과 T = |t|^2 * Z_glass/Z_skin,  왕복 T_round = T^2
//
//  흡수를 끄면(alpha=0) 이 식은 종전의 Zin 변환 결과와 소수점 아래까지 일치한다.
//  기사 본문의 무손실 표(36.1 / 46.4 / 85.3 / 1.07)가 그대로 재현된다.
//
// 단순화 고지: 수직입사 평면파다. 원리를 보여주는 모델이며 실측값이 아니다.

const Z_GLASS = 13.44;
const Z_SKIN = 1.5;

const FILMS = {
  none: { label: '없음', z: 0, c: 0, a: 0 },
  pet: { label: 'PET 필름', z: 3.0, c: 2540, a: 4.0 },
  tempered: { label: '강화유리 필름', z: 13.44, c: 6000, a: 0.02 },
  silicone: { label: '실리콘 필름', z: 1.04, c: 1027, a: 5.85 },
};
const Z_AIR = 0.00043;
const C_AIR = 344;

const W = 300;
const H = 210;

/* 복소수 헬퍼 */
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const cscale = (a, s) => [a[0] * s, a[1] * s];
const cdiv = (a, b) => {
  const d = b[0] * b[0] + b[1] * b[1];
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
};
const ccos = (t) => [Math.cos(t[0]) * Math.cosh(t[1]), -Math.sin(t[0]) * Math.sinh(t[1])];
const csin = (t) => [Math.sin(t[0]) * Math.cosh(t[1]), Math.cos(t[0]) * Math.sinh(t[1])];

/** layers: [[Z, c, d_m, alpha_dB_cm_MHz], ...] 유리에서 먼 쪽이 뒤 */
function oneWay(layers, f) {
  // 단위행렬에서 시작해 층을 차례로 곱한다
  let A = [1, 0];
  let B = [0, 0];
  let C = [0, 0];
  let D = [1, 0];
  for (const [z, c, d, alpha] of layers) {
    const th = [(2 * Math.PI * f * d) / c, -(alpha || 0) * (f / 1e6) * 11.5129 * d];
    const co = ccos(th);
    const si = csin(th);
    const a2 = co;
    const b2 = cmul([0, z], si);
    const c2 = cdiv(cmul([0, 1], si), [z, 0]);
    const d2 = co;
    const nA = cadd(cmul(A, a2), cmul(B, c2));
    const nB = cadd(cmul(A, b2), cmul(B, d2));
    const nC = cadd(cmul(C, a2), cmul(D, c2));
    const nD = cadd(cmul(C, b2), cmul(D, d2));
    A = nA;
    B = nB;
    C = nC;
    D = nD;
  }
  const den = cadd(
    cadd(A, cscale(B, 1 / Z_SKIN)),
    cadd(cscale(C, Z_GLASS), cscale(D, Z_GLASS / Z_SKIN))
  );
  const t = cdiv([2, 0], den);
  return (t[0] * t[0] + t[1] * t[1]) * (Z_GLASS / Z_SKIN);
}

export function mount(container, params = {}) {
  const state = {
    film: params.film ?? 'tempered',
    filmUm: params.filmUm ?? 300,
    gapNm: params.gapNm ?? 0,
    freqMHz: params.freqMHz ?? 10,
    loss: params.loss ?? false,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">계산</span>
      <span>강화유리를 완전히 밀착시켜 보고 공기를 100나노미터만 넣어 보십시오. PET 300µm에서는 흡수를 반영해 보십시오</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
        <div class="sim-legend">
          <span>세로축 편도 투과율 · 가로축 주파수</span>
        </div>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>화면 위에 얹은 것</label>
          <div class="sim-toggle-group" role="group">
            <button type="button" class="sim-toggle-btn" data-film="none">없음</button>
            <button type="button" class="sim-toggle-btn" data-film="pet">PET</button>
            <button type="button" class="sim-toggle-btn" data-film="tempered">강화유리</button>
            <button type="button" class="sim-toggle-btn" data-film="silicone">실리콘</button>
          </div>
        </div>
        <div class="sim-control">
          <label>필름 두께 <span data-out="thk"></span></label>
          <input type="range" min="10" max="400" step="5" data-in="thk" />
        </div>
        <div class="sim-control">
          <label>필름 밑에 남은 공기 <span data-out="gap"></span></label>
          <input type="range" min="0" max="1000" step="10" data-in="gap" />
        </div>
        <div class="sim-control">
          <label>주파수 <span data-out="freq"></span> MHz</label>
          <input type="range" min="2" max="40" step="1" data-in="freq" />
        </div>
        <div class="sim-control">
          <label>층 안에서의 흡수</label>
          <div class="sim-toggle-group" role="group">
            <button type="button" class="sim-toggle-btn" data-loss="off">무시 (무손실 상한)</button>
            <button type="button" class="sim-toggle-btn" data-loss="on">반영</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      층마다 전달행렬 [cos&thinsp;kd, iZ&thinsp;sin&thinsp;kd; i&thinsp;sin&thinsp;kd/Z, cos&thinsp;kd]를
      곱해 압력 투과 t = 2/(A + B/Z<sub>피부</sub> + C&thinsp;Z<sub>유리</sub> +
      D&thinsp;Z<sub>유리</sub>/Z<sub>피부</sub>)를 구하고, 편도 세기 투과율
      T = |t|&sup2;&thinsp;Z<sub>유리</sub>/Z<sub>피부</sub>로 계산했습니다. 왕복은 나갈 때와
      돌아올 때 두 번 지나므로 T&sup2;입니다. 임피던스[MRayl]는 소다석회유리 13.44, PET 3.00,
      실리콘고무 1.04, 공기 0.00043, 조직 1.5이고 음속[m/s]은 각각 6000, 2540, 1027, 344,
      1540입니다(Onda Corporation 음향물성표, 조직값은 Micromachines 2023 리뷰).
      흡수를 반영하면 파수를 복소수로 두어 k = 2&pi;f/c - i&alpha;로 계산합니다. 감쇠
      &alpha;[dB/cm/MHz]는 같은 표의 dB/cm 값을 측정 주파수로 나눈 것으로 PET 4.0(표에 PET
      감쇠가 없어 같은 계열 PETG 6763의 20.0 dB/cm @5MHz를 대신 씀), 실리콘고무 5.85(Dow
      Silastic GP45, 23.4 @4MHz), 강화유리 0.02(표에 감쇠 열이 비어 있어 그 정도로 둠)입니다.
      공기층은 두께가 나노미터라 흡수가 붙을 거리가 못 되어 0으로 둡니다. 수직입사 평면파를
      가정한 단순화 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const thkIn = container.querySelector('[data-in="thk"]');
  const gapIn = container.querySelector('[data-in="gap"]');
  const freqIn = container.querySelector('[data-in="freq"]');
  const thkOut = container.querySelector('[data-out="thk"]');
  const gapOut = container.querySelector('[data-out="gap"]');
  const freqOut = container.querySelector('[data-out="freq"]');
  const readout = container.querySelector('[data-out="readout"]');
  const filmBtns = [...container.querySelectorAll('[data-film]')];
  const lossBtns = [...container.querySelectorAll('[data-loss]')];

  thkIn.value = String(state.filmUm);
  gapIn.value = String(state.gapNm);
  freqIn.value = String(state.freqMHz);

  function stack() {
    const out = [];
    const f = FILMS[state.film];
    if (state.film !== 'none') {
      out.push([f.z, f.c, state.filmUm * 1e-6, state.loss ? f.a : 0]);
    }
    // 공기층은 두께가 나노미터라 흡수가 붙을 거리가 못 된다
    if (state.gapNm > 0) out.push([Z_AIR, C_AIR, state.gapNm * 1e-9, 0]);
    return out;
  }

  function render() {
    const st = stack();
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    const PAD_L = 34;
    const PAD_R = 8;
    const PAD_T = 14;
    const PLOT_H = 132;
    const plotW = W - PAD_L - PAD_R;

    // 눈금
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
    for (let f = 10; f <= 40; f += 10) {
      const x = PAD_L + ((f - 2) / 38) * plotW;
      ctx.fillText(String(f), x - 6, PAD_T + PLOT_H + 14);
    }

    // 흡수를 반영했을 때는 무손실 곡선을 옅게 함께 그려 차이를 보여준다
    if (state.loss && st.length) {
      const lossless = st.map(([z, c, d]) => [z, c, d, 0]);
      ctx.strokeStyle = 'rgba(230,225,215,0.28)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= plotW; i++) {
        const fMHz = 2 + (i / plotW) * 38;
        const t = oneWay(lossless, fMHz * 1e6);
        const y = PAD_T + PLOT_H - Math.min(1, Math.max(0, t)) * PLOT_H;
        if (i === 0) ctx.moveTo(PAD_L + i, y);
        else ctx.lineTo(PAD_L + i, y);
      }
      ctx.stroke();
    }

    // 곡선
    ctx.strokeStyle = '#e08a3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= plotW; i++) {
      const fMHz = 2 + (i / plotW) * 38;
      const t = oneWay(st, fMHz * 1e6);
      const x = PAD_L + i;
      const y = PAD_T + PLOT_H - Math.min(1, Math.max(0, t)) * PLOT_H;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 필름 없이 직접 접촉했을 때의 기준선
    const base = oneWay([], state.freqMHz * 1e6);
    const yBase = PAD_T + PLOT_H - base * PLOT_H;
    ctx.strokeStyle = 'rgba(230,225,215,0.35)';
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(PAD_L, yBase + 0.5);
    ctx.lineTo(W - PAD_R, yBase + 0.5);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(230,225,215,0.55)';
    ctx.fillText('직접 접촉', W - PAD_R - 54, yBase - 5);

    // 현재 주파수 표시
    const tNow = oneWay(st, state.freqMHz * 1e6);
    const xNow = PAD_L + ((state.freqMHz - 2) / 38) * plotW;
    const yNow = PAD_T + PLOT_H - Math.min(1, Math.max(0, tNow)) * PLOT_H;
    ctx.strokeStyle = 'rgba(224,138,60,0.5)';
    ctx.beginPath();
    ctx.moveTo(xNow + 0.5, PAD_T);
    ctx.lineTo(xNow + 0.5, PAD_T + PLOT_H);
    ctx.stroke();
    ctx.fillStyle = '#e08a3c';
    ctx.fillRect(xNow - 3, yNow - 3, 6, 6);

    ctx.fillStyle = 'rgba(230,225,215,0.75)';
    ctx.fillText('편도 투과율 %', 6, PAD_T - 3);

    // 층 단면
    const yStack = PAD_T + PLOT_H + 26;
    const hStack = 30;
    let x = PAD_L;
    const segs = [
      ['커버글라스', 46, 'rgba(120,150,175,0.75)'],
      ...(state.film !== 'none'
        ? [[FILMS[state.film].label, Math.max(20, Math.min(70, state.filmUm / 6)), 'rgba(200,175,120,0.75)']]
        : []),
      ...(state.gapNm > 0 ? [['공기', 16, 'rgba(235,90,70,0.9)']] : []),
      ['손가락', 60, 'rgba(215,165,145,0.8)'],
    ];
    const totalW = segs.reduce((s, v) => s + v[1], 0);
    const scale = (W - PAD_L - PAD_R) / totalW;
    ctx.font = '11px "IBM Plex Mono", monospace';
    for (const [label, w, color] of segs) {
      const ww = w * scale;
      ctx.fillStyle = color;
      ctx.fillRect(x, yStack, ww, hStack);
      ctx.fillStyle = 'rgba(15,15,12,0.92)';
      if (ww > 30) ctx.fillText(label, x + 4, yStack + 19);
      x += ww;
    }

    // 라벨
    thkOut.textContent = state.film === 'none' ? '해당 없음' : `${state.filmUm}µm`;
    gapOut.textContent = state.gapNm === 0 ? '없음 (완전 밀착)' : `${state.gapNm}nm`;
    freqOut.textContent = String(state.freqMHz);

    const round = tNow * tNow;
    const f = FILMS[state.film];
    const quarter = state.film === 'none' ? null : (f.c / (state.freqMHz * 1e6) / 4) * 1e6;
    const ideal = Math.sqrt(Z_GLASS * Z_SKIN);

    let verdict;
    if (round < 0.001) verdict = '신호가 손가락에 닿지 못합니다';
    else if (round < base * base * 0.5) verdict = '직접 접촉보다 나빠졌습니다';
    else if (round > base * base * 1.2) verdict = '오히려 정합층 노릇을 합니다';
    else verdict = '직접 접촉과 큰 차이가 없습니다';

    readout.innerHTML =
      `편도 투과 <b>${tNow < 0.01 ? (tNow * 100).toExponential(2) : (tNow * 100).toFixed(1)}%</b><br>` +
      `왕복 투과 <b>${round < 0.01 ? (round * 100).toExponential(2) : (round * 100).toFixed(1)}%</b> ` +
      `(직접 접촉 ${(base * base * 100).toFixed(1)}%)<br>` +
      (quarter
        ? `이 재질의 사분파장 두께 <b>${quarter.toFixed(0)}&micro;m</b><br>`
        : '') +
      `정합에 가장 좋은 임피던스 <b>${ideal.toFixed(2)} MRayl</b><br>` +
      `<span>${verdict}</span>`;
  }

  function syncFilm() {
    filmBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.film === state.film)));
    lossBtns.forEach((b) =>
      b.setAttribute('aria-pressed', String((b.dataset.loss === 'on') === state.loss))
    );
    thkIn.disabled = state.film === 'none';
  }

  filmBtns.forEach((b) =>
    b.addEventListener('click', () => {
      state.film = b.dataset.film;
      syncFilm();
      render();
    })
  );
  lossBtns.forEach((b) =>
    b.addEventListener('click', () => {
      state.loss = b.dataset.loss === 'on';
      syncFilm();
      render();
    })
  );
  thkIn.addEventListener('input', () => {
    state.filmUm = Number(thkIn.value);
    render();
  });
  gapIn.addEventListener('input', () => {
    state.gapNm = Number(gapIn.value);
    render();
  });
  freqIn.addEventListener('input', () => {
    state.freqMHz = Number(freqIn.value);
    render();
  });

  syncFilm();
  render();
}

export default mount;
