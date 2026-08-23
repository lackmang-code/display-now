// 판정 문턱 하나가 오인식률과 미인식률을 반대로 움직인다.
//
// 지문 인증은 등록된 특징과 방금 읽은 특징이 얼마나 닮았는지를 점수로 내고, 그 점수가
// 문턱을 넘으면 잠금을 푼다. 남의 손가락이 우연히 높은 점수를 받으면 오인식(FAR),
// 본인 손가락이 낮은 점수를 받으면 미인식(FRR)이다. 문턱을 올리면 앞이 줄고 뒤가 늘어난다.
//
// 두 분포가 얼마나 떨어져 있는지를 분리도라 부른다. 분리도가 충분하지 않으면
// 문턱을 어디에 둬도 두 요건을 동시에 만족할 수 없다.
//
// 근거:
//  - 안드로이드 생체인식 클래스 3 요건 FAR 1/50,000, FRR 10%:
//    Android Open Source Project 「Measure biometric unlock security」
//  - 문턱과 두 오류율의 관계는 통계의 정의 그 자체다
//
// 단순화 고지: 두 점수 분포를 표준편차가 같은 정규분포로 놓았다. 실제 정합 점수 분포는
// 정규분포가 아니고 알고리즘마다 다르다. 또 이 모델은 앞 절의 대비나 번짐 같은 광학 성능을
// 분리도로 환산하지 않는다. 그 환산에는 근거가 없기 때문에 넣지 않았다.
// 문턱과 두 오류율 사이의 관계만 보여주는 모델이며 실측값이 아니다.

const W = 300;
const H = 210;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 16;
const PAD_B = 30;

const FAR_REQ = 1 / 50000;
const FRR_REQ = 0.1;

/** Abramowitz & Stegun 7.1.26 근사 */
function erf(x) {
  const s = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const t = 1 / (1 + p * ax);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return s * y;
}
const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
const pdf = (z) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);

export function mount(container, params = {}) {
  const state = {
    threshold: params.threshold ?? 4.11,
    sep: params.sep ?? 5.39,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>분리도가 모자라면 문턱을 어디에 둬도 둘 다 만족할 수 없습니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>판정 문턱 <span data-out="th"></span></label>
          <input type="range" min="200" max="700" step="5" data-in="th" />
        </div>
        <div class="sim-control">
          <label>두 분포의 분리도 <span data-out="sep"></span></label>
          <input type="range" min="250" max="800" step="5" data-in="sep" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      남의 손가락 점수와 본인 손가락 점수를 표준편차가 같은 정규분포로 놓고, 문턱보다 높은
      남의 점수 비율을 오인식률, 문턱보다 낮은 본인 점수 비율을 미인식률로 계산했습니다.
      실제 정합 점수 분포는 정규분포가 아니고 알고리즘마다 다릅니다. 또 이 모델은 앞 절에서
      계산한 대비나 번짐을 분리도로 환산하지 않습니다. 그 환산에는 근거가 없어 넣지 않았습니다.
      문턱과 두 오류율 사이의 관계만 보여주는 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const thInput = container.querySelector('[data-in="th"]');
  const sepInput = container.querySelector('[data-in="sep"]');
  const thOut = container.querySelector('[data-out="th"]');
  const sepOut = container.querySelector('[data-out="sep"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  thInput.value = String(Math.round(state.threshold * 100));
  sepInput.value = String(Math.round(state.sep * 100));

  const X0 = -3.2;
  const X1 = 11.5;
  const x = (v) => PAD_L + ((W - PAD_L - PAD_R) * (v - X0)) / (X1 - X0);
  const PEAK = pdf(0);
  const y = (v) => PAD_T + (H - PAD_T - PAD_B) * (1 - v / PEAK);

  function fillCurve(mu, from, to, color) {
    ctx.beginPath();
    ctx.moveTo(x(from), y(0));
    for (let v = from; v <= to; v += 0.05) ctx.lineTo(x(v), y(pdf(v - mu)));
    ctx.lineTo(x(to), y(0));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function strokeCurve(mu, color) {
    ctx.beginPath();
    for (let v = X0; v <= X1; v += 0.05) {
      const px = x(v);
      const py = y(pdf(v - mu));
      v === X0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }

  function render() {
    const t = state.threshold;
    const d = state.sep;
    const far = 1 - Phi(t);
    const frr = Phi(t - d);
    const pass = far <= FAR_REQ && frr <= FRR_REQ;

    ctx.clearRect(0, 0, W, H);

    // 오류가 되는 꼬리를 채운다
    fillCurve(0, t, X1, 'rgba(232,120,90,0.45)'); // 남인데 통과 (오인식)
    fillCurve(d, X0, t, 'rgba(120,190,240,0.35)'); // 본인인데 거부 (미인식)

    strokeCurve(0, 'rgba(232,146,110,0.95)');
    strokeCurve(d, 'rgba(120,190,240,0.95)');

    // 기준선
    ctx.strokeStyle = 'rgba(244,243,238,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD_L, y(0));
    ctx.lineTo(W - PAD_R, y(0));
    ctx.stroke();

    // 문턱
    ctx.strokeStyle = pass ? 'rgba(150,220,150,0.95)' : 'rgba(244,243,238,0.9)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x(t), PAD_T - 4);
    ctx.lineTo(x(t), y(0));
    ctx.stroke();

    ctx.font = '9px sans-serif';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(232,146,110,0.95)';
    ctx.fillText('남의 손가락', x(0) - 22, y(PEAK) - 12);
    ctx.fillStyle = 'rgba(120,190,240,0.95)';
    ctx.fillText('본인 손가락', x(d) - 22, y(PEAK) - 12);
    ctx.fillStyle = 'rgba(244,243,238,0.75)';
    ctx.textAlign = 'center';
    ctx.fillText('문턱', x(t), H - PAD_B + 6);
    ctx.textAlign = 'left';
    ctx.fillText('닮은 정도 →', PAD_L + 2, H - PAD_B + 6);

    thOut.textContent = t.toFixed(2);
    sepOut.textContent = d.toFixed(2);

    const farTxt = far < 1e-9 ? '거의 0' : `1/${Math.round(1 / far).toLocaleString('ko-KR')}`;
    readoutOut.innerHTML =
      `오인식률 <b>${farTxt}</b> (요건 1/50,000)<br>` +
      `미인식률 <b>${(frr * 100).toFixed(2)}%</b> (요건 10% 이하)<br>` +
      `<b style="color:${pass ? '#9ad39a' : '#e8785a'}">클래스 3 ${pass ? '충족' : '미달'}</b>` +
      (d < 5.39 ? ' · 분리도 5.39 아래에서는 어떤 문턱으로도 충족할 수 없습니다' : '');
  }

  thInput.addEventListener('input', () => {
    state.threshold = Number(thInput.value) / 100;
    render();
  });
  sepInput.addEventListener('input', () => {
    state.sep = Number(sepInput.value) / 100;
    render();
  });

  render();
}

export default mount;
