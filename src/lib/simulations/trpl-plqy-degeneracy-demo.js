// 시간분해 광발광(TrPL)의 다중해 문제 데모.
//
// 계수를 바꿔도 TrPL 감쇠곡선은 거의 그대로인데 광발광 양자수율(PLQY) 곡선은
// 뚜렷하게 갈라진다는 것을 독자가 직접 확인하는 시뮬레이터다.
// 근거: 2026-08-25 기사 "양자수율을 더해 가른 캐리어 수명 분석의 다중해" 2절.
//
// 계산은 논문(Nat. Commun. 2026, DOI 10.1038/s41467-026-77052-8)의 속도방정식을
// 그대로 푼다. 임의로 만든 근사식이 아니다.
//
//   dne/dt = -γeh·ne·nh - γec·ne·(NT-nT) + γee·nT - γAug·ne·nh·(ne+nh)
//   dnT/dt =  γec·ne·(NT-nT) - γhc·(nT·ne + nT²) - γee·nT
//   nh = ne + nT           (전하 중성)
//   TrPL(t) = ne·nh / (ne0·nh0)
//   PLQY(G) = γeh·ne·nh / (γeh·ne·nh + γhc·nT·nh + γAug·ne·nh·(ne+nh))   [정상상태]
//
// 다만 논문이 보충자료에만 실은 계수(γec, γhc)와 Case 1·2의 구체적 조합은 공개
// 본문에 없다. 그래서 γeh와 NT는 논문 본문의 실측값(2.7×10⁻¹¹ cm³/s, 7.3×10¹⁵ cm⁻³)을
// 쓰고, γec·γhc는 PLQY가 논문 그림과 같은 형태로 나타나는 값을 골라 고정했다.
// 슬라이더로 움직이는 세 계수의 범위는 논문 Fig. 2의 범위와 같다.
// 절대값을 읽는 도구가 아니라 두 곡선이 갈리는 방식을 보는 도구다.

const GEH = 2.7e-11; // cm3/s  직접(이분자) 재결합
const GEC = 3.0e-10; // cm3/s  전자 포획   (본문 미공개 · 고정)
const GHC = 1.0e-10; // cm3/s  정공 포획   (본문 미공개 · 고정)
const N0 = 3e16; // cm-3   초기 광생성 캐리어 밀도
const TMAX = 2000e-9; // s      획득 시간 창 2μs (논문 권고)
const NT_STEPS = 300;
const SUB = 6;

const BASE = { NT: 7.3e15, gee: 1e5, gaug: 1e-28 };

/** 속도방정식 우변. */
function deriv(ne, nT, p) {
  const nh = ne + nT;
  const dne =
    -GEH * ne * nh - GEC * ne * (p.NT - nT) + p.gee * nT - p.gaug * ne * nh * (ne + nh);
  const dnT = GEC * ne * (p.NT - nT) - GHC * (nT * ne + nT * nT) - p.gee * nT;
  return [dne, dnT];
}

/** TrPL 감쇠곡선. 4차 룽게-쿠타. */
function trpl(p) {
  const dt = TMAX / NT_STEPS;
  const h = dt / SUB;
  let ne = N0;
  let nT = 0;
  const I0 = ne * ne;
  const out = new Float64Array(NT_STEPS + 1);
  for (let i = 0; i <= NT_STEPS; i++) {
    out[i] = (ne * (ne + nT)) / I0;
    for (let s = 0; s < SUB; s++) {
      const k1 = deriv(ne, nT, p);
      const k2 = deriv(ne + (h / 2) * k1[0], nT + (h / 2) * k1[1], p);
      const k3 = deriv(ne + (h / 2) * k2[0], nT + (h / 2) * k2[1], p);
      const k4 = deriv(ne + h * k3[0], nT + h * k3[1], p);
      ne += (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
      nT += (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      if (ne < 0) ne = 0;
      if (nT < 0) nT = 0;
      if (nT > p.NT) nT = p.NT;
    }
  }
  return out;
}

/** 정상상태에서 채워진 트랩 밀도. dnT/dt = 0 을 nT에 대해 푼 이차방정식의 양근. */
function trappedSteady(ne, p) {
  const b = GHC * ne + p.gee + GEC * ne;
  return (-b + Math.sqrt(b * b + 4 * GHC * GEC * ne * p.NT)) / (2 * GHC);
}

/** 주어진 전자밀도에서의 총 재결합률 = 정상상태 생성률. */
function generationOf(ne, p) {
  const nT = trappedSteady(ne, p);
  const nh = ne + nT;
  return GEH * ne * nh + GHC * nT * nh + p.gaug * ne * nh * (ne + nh);
}

/** 생성률 G에서의 PLQY. G에 대해 단조증가하므로 기하 이분법으로 ne를 찾는다. */
function plqyAt(G, p) {
  let lo = 1e6;
  let hi = 1e21;
  for (let i = 0; i < 60; i++) {
    const mid = Math.sqrt(lo * hi);
    if (generationOf(mid, p) < G) lo = mid;
    else hi = mid;
  }
  const ne = Math.sqrt(lo * hi);
  const nT = trappedSteady(ne, p);
  const nh = ne + nT;
  const rad = GEH * ne * nh;
  return rad / (rad + GHC * nT * nh + p.gaug * ne * nh * (ne + nh));
}

const G_LO = 19;
const G_HI = 23;
const G_N = 34;
function plqyCurve(p) {
  const out = new Float64Array(G_N);
  for (let i = 0; i < G_N; i++) {
    out[i] = plqyAt(Math.pow(10, G_LO + ((G_HI - G_LO) * i) / (G_N - 1)), p);
  }
  return out;
}

export function mount(container, params = {}) {
  const state = {
    ntE15: params.ntE15 ?? 7.3,
    geeExp: params.geeExp ?? 5,
    gaugExp: params.gaugExp ?? -28,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">논문 모델</span>
      <span>계수를 움직여 보세요. 왼쪽은 거의 그대로인데 오른쪽은 갈라집니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="600" height="250"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>트랩 밀도 N<sub>T</sub> <span data-out="nt"></span> &times;10<sup>15</sup> cm<sup>-3</sup></label>
          <input type="range" min="1" max="20" step="0.1" data-in="nt" />
        </div>
        <div class="sim-control">
          <label>전자 방출 &gamma;<sub>ee</sub> 10<sup><span data-out="gee"></span></sup> s<sup>-1</sup></label>
          <input type="range" min="4" max="6" step="0.05" data-in="gee" />
        </div>
        <div class="sim-control">
          <label>오제 재결합 &gamma;<sub>Aug</sub> 10<sup><span data-out="gaug"></span></sup> cm<sup>6</sup>/s</label>
          <input type="range" min="-29" max="-27" step="0.05" data-in="gaug" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
        <button type="button" data-in="reset" class="sim-btn">기준값으로</button>
      </div>
    </div>
    <div class="sim-note">
      논문의 속도방정식을 그대로 풀어 그린 곡선입니다. 직접 재결합 계수와 트랩 밀도의
      기준값은 논문 본문의 실측값(2.7&times;10<sup>-11</sup> cm<sup>3</sup>/s,
      7.3&times;10<sup>15</sup> cm<sup>-3</sup>)이고, 슬라이더 세 개의 범위도 논문 Fig. 2와
      같습니다. 다만 전자 포획과 정공 포획 계수는 논문이 보충자료에만 실어 공개 본문에서
      확인할 수 없었으므로, 양자수율 곡선이 논문 그림과 같은 형태로 나타나는 값으로
      고정했습니다. <b>계수의 절대값을 읽는 도구가 아니라, 두 측정이 어떻게 다르게
      반응하는지를 보는 도구입니다.</b>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const ntIn = container.querySelector('[data-in="nt"]');
  const geeIn = container.querySelector('[data-in="gee"]');
  const gaugIn = container.querySelector('[data-in="gaug"]');
  const resetBtn = container.querySelector('[data-in="reset"]');
  const ntOut = container.querySelector('[data-out="nt"]');
  const geeOut = container.querySelector('[data-out="gee"]');
  const gaugOut = container.querySelector('[data-out="gaug"]');
  const readout = container.querySelector('[data-out="readout"]');

  const baseTr = trpl(BASE);
  const baseQy = plqyCurve(BASE);

  const INK = '#f4f3ee';
  const DIM = 'rgba(244,243,238,0.30)';
  const REF = 'rgba(244,243,238,0.45)';
  const CUR = '#5b8ff9';

  const PAD_L = 44;
  const PAD_R = 14;
  const PAD_T = 26;
  const PAD_B = 34;
  const GAP = 30;
  const panelW = (600 - PAD_L * 2 - PAD_R - GAP) / 2;
  const plotH = 250 - PAD_T - PAD_B;

  function axes(x0, title, xlabel, ylabel) {
    ctx.strokeStyle = DIM;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, PAD_T);
    ctx.lineTo(x0, PAD_T + plotH);
    ctx.lineTo(x0 + panelW, PAD_T + plotH);
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(title, x0, PAD_T - 8);
    ctx.font = '10px sans-serif';
    ctx.fillStyle = DIM;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(xlabel, x0 + panelW, PAD_T + plotH + 6);
    ctx.textAlign = 'left';
    ctx.fillText(ylabel, x0 - 38, PAD_T - 2);
  }

  // 왼쪽: TrPL (y 로그 1e-3 ~ 1)
  function trplY(v) {
    const lo = -3;
    const t = (Math.log10(Math.max(v, 1e-3)) - lo) / (0 - lo);
    return PAD_T + plotH - t * plotH;
  }
  function drawTrpl(x0, data, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = x0 + (panelW * i) / (data.length - 1);
      const y = trplY(data[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // 오른쪽: PLQY (y 선형 0 ~ 0.8)
  const QMAX = 0.8;
  function qyY(v) {
    return PAD_T + plotH - (Math.min(v, QMAX) / QMAX) * plotH;
  }
  function drawQy(x0, data, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = x0 + (panelW * i) / (data.length - 1);
      const y = qyY(data[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function render() {
    const p = {
      NT: state.ntE15 * 1e15,
      gee: Math.pow(10, state.geeExp),
      gaug: Math.pow(10, state.gaugExp),
    };
    const tr = trpl(p);
    const qy = plqyCurve(p);

    ctx.clearRect(0, 0, 600, 250);

    const xA = PAD_L;
    const xB = PAD_L * 2 + panelW + GAP;

    axes(xA, '시간분해 광발광', '2μs', '1');
    axes(xB, '광발광 양자수율', 'G 10²³', '0.8');

    drawTrpl(xA, baseTr, REF, 3);
    drawTrpl(xA, tr, CUR, 1.6);
    drawQy(xB, baseQy, REF, 3);
    drawQy(xB, qy, CUR, 1.6);

    // 범례
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const ly = PAD_T + 8;
    let lx = xB + panelW - 96;
    ctx.strokeStyle = REF;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx + 16, ly);
    ctx.stroke();
    ctx.fillStyle = DIM;
    ctx.fillText('기준값', lx + 21, ly);
    lx += 52;
    ctx.strokeStyle = CUR;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx + 16, ly);
    ctx.stroke();
    ctx.fillStyle = CUR;
    ctx.fillText('현재', lx + 21, ly);

    // 두 곡선의 최대 차이
    let dT = 0;
    for (let i = 0; i < tr.length; i++) {
      if (baseTr[i] < 1e-3) continue;
      dT = Math.max(dT, Math.abs(tr[i] - baseTr[i]));
    }
    let dQ = 0;
    for (let i = 0; i < qy.length; i++) dQ = Math.max(dQ, Math.abs(qy[i] - baseQy[i]));

    const ratio = dT > 1e-6 ? dQ / dT : Infinity;
    readout.innerHTML =
      `기준 곡선과의 최대 차이<br>` +
      `시간분해 광발광 <b>${(dT * 100).toFixed(2)}%p</b><br>` +
      `광발광 양자수율 <b style="color:${CUR}">${(dQ * 100).toFixed(1)}%p</b>` +
      (Number.isFinite(ratio) && ratio > 1.5
        ? `<br><span style="opacity:.75">양자수율 쪽이 ${ratio.toFixed(0)}배 더 크게 갈립니다</span>`
        : '');

    ntOut.textContent = state.ntE15.toFixed(1);
    geeOut.textContent = state.geeExp.toFixed(2);
    gaugOut.textContent = state.gaugExp.toFixed(2);
  }

  ntIn.value = String(state.ntE15);
  geeIn.value = String(state.geeExp);
  gaugIn.value = String(state.gaugExp);

  ntIn.addEventListener('input', () => {
    state.ntE15 = Number(ntIn.value);
    render();
  });
  geeIn.addEventListener('input', () => {
    state.geeExp = Number(geeIn.value);
    render();
  });
  gaugIn.addEventListener('input', () => {
    state.gaugExp = Number(gaugIn.value);
    render();
  });
  resetBtn.addEventListener('click', () => {
    state.ntE15 = 7.3;
    state.geeExp = 5;
    state.gaugExp = -28;
    ntIn.value = '7.3';
    geeIn.value = '5';
    gaugIn.value = '-28';
    render();
  });

  render();
}

export default mount;
