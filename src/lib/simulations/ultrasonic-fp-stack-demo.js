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
//
// 수식:
//  전송선 변환  Zin = Z*(ZL + iZ tan kd)/(Z + iZL tan kd),  k = 2*pi*f/c
//  경계 투과    T = 1 - |(Zin - Z_glass)/(Zin + Z_glass)|^2
//  왕복         T_round = T^2 (무손실 층 가정)
//
// 단순화 고지: 수직입사 평면파이고 층의 흡수는 넣지 않았다. 실제 필름과 접착층에는
// 감쇠가 있어 고주파에서 이 곡선보다 낮게 나온다. 원리를 보여주는 모델이며 실측값이 아니다.

const Z_GLASS = 13.44;
const Z_SKIN = 1.5;

const FILMS = {
  none: { label: '없음', z: 0, c: 0 },
  pet: { label: 'PET 필름', z: 3.0, c: 2540 },
  tempered: { label: '강화유리 필름', z: 13.44, c: 6000 },
  silicone: { label: '실리콘 필름', z: 1.04, c: 1027 },
};
const Z_AIR = 0.00043;
const C_AIR = 344;

const W = 300;
const H = 210;

/* 복소수 헬퍼 */
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cdiv = (a, b) => {
  const d = b[0] * b[0] + b[1] * b[1];
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
};

/** layers: [[Z, c, d_m], ...] 유리에서 먼 쪽이 뒤. 손가락(ZL)에서부터 앞으로 변환한다 */
function inputImpedance(zLoad, layers, f) {
  let zi = [zLoad, 0];
  for (let i = layers.length - 1; i >= 0; i--) {
    const [z, c, d] = layers[i];
    const t = Math.tan((2 * Math.PI * f * d) / c);
    const numr = [zi[0], zi[1] + z * t]; // zi + i*z*t
    const den = [z - zi[1] * t, zi[0] * t]; // z + i*zi*t
    zi = cmul([z, 0], cdiv(numr, den));
  }
  return zi;
}

function oneWay(layers, f) {
  const zin = inputImpedance(Z_SKIN, layers, f);
  const g = cdiv([zin[0] - Z_GLASS, zin[1]], [zin[0] + Z_GLASS, zin[1]]);
  return 1 - (g[0] * g[0] + g[1] * g[1]);
}

export function mount(container, params = {}) {
  const state = {
    film: params.film ?? 'tempered',
    filmUm: params.filmUm ?? 300,
    gapNm: params.gapNm ?? 0,
    freqMHz: params.freqMHz ?? 10,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">계산</span>
      <span>강화유리 필름을 완전히 밀착시켜 보고, 공기를 100나노미터만 넣어 보십시오</span>
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
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      층마다 전송선 변환 Zin = Z(Z<sub>L</sub> + iZ&thinsp;tan&thinsp;kd)/(Z + iZ<sub>L</sub>&thinsp;tan&thinsp;kd)를
      적용해 커버글라스에서 본 입력 임피던스를 구하고, 편도 투과율 T = 1 - |&Gamma;|&sup2;로
      계산했습니다. 왕복은 나갈 때와 돌아올 때 두 번 지나므로 T&sup2;입니다. 임피던스[MRayl]는
      소다석회유리 13.44, PET 3.00, 실리콘고무 1.04, 공기 0.00043, 조직 1.5이고 음속[m/s]은
      각각 6000, 2540, 1027, 344, 1540입니다(Onda Corporation 음향물성표, 조직값은
      Micromachines 2023 리뷰). 층의 흡수는 넣지 않았으므로 실제 필름은 고주파에서 이 곡선보다
      낮게 나옵니다. 수직입사 평면파를 가정했습니다. 원리를 보여주기 위한 단순화 모델이며
      실측값이 아닙니다.
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

  thkIn.value = String(state.filmUm);
  gapIn.value = String(state.gapNm);
  freqIn.value = String(state.freqMHz);

  function stack() {
    const out = [];
    const f = FILMS[state.film];
    if (state.film !== 'none') out.push([f.z, f.c, state.filmUm * 1e-6]);
    if (state.gapNm > 0) out.push([Z_AIR, C_AIR, state.gapNm * 1e-9]);
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
    thkIn.disabled = state.film === 'none';
  }

  filmBtns.forEach((b) =>
    b.addEventListener('click', () => {
      state.film = b.dataset.film;
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
