// 입사각에 따라 융선과 골의 대비가 어떻게 달라지는가.
//
// 수직으로 들어온 빛만 보면 대비는 4%p뿐이다. 그런데 각도를 올려 골 쪽 임계각을 넘기면
// 골은 전부 되돌아오고 융선은 거의 통과해, 대비가 100%p 가까이 벌어진다.
// 콜리메이터는 수직 근처만 통과시키므로 이 구간을 통째로 쓰지 못한다.
//
// 근거:
//  - 굴절률 유리 1.51 · 공기 1.000 · 물 1.333 · 피부 1.44
//  - 비편광 프레넬 반사율 R = (Rs + Rp) / 2, 임계각을 넘으면 R = 1
//  - 전반사를 쓰는 고전적 광학 지문 구성과, 임계각을 넘는 빛만 결상부로 보내는 광로 분리
//    구성이 실재한다는 것: Micromachines 2023, 14(6), 1253 Figure 3의 (a)와 (b)
//  - 커버글라스를 도파로로 써서 이 각도를 활용하려는 시도: Synaptics US20190138154A1
//
// 단순화 고지: 매질을 흡수가 없는 균일한 유전체로 놓은 프레넬 계산이다. 피부는 실제로는
// 산란체이고 표면이 거칠어 임계각이 이렇게 칼같이 서지 않는다. 원리를 보여주는 모델이며
// 실측값이 아니다.

const N_GLASS = 1.51;
const N_SKIN = 1.44;
const W = 300;
const H = 210;

const PAD_L = 34;
const PAD_R = 8;
const PAD_T = 14;
const PAD_B = 26;

/** 비편광 프레넬 반사율. n1 매질 안에서 각도 thDeg로 계면에 닿을 때 */
function reflectance(n1, n2, thDeg) {
  const th = (thDeg * Math.PI) / 180;
  const s = (n1 * Math.sin(th)) / n2;
  if (s >= 1) return 1;
  const tt = Math.asin(s);
  const ci = Math.cos(th);
  const ct = Math.cos(tt);
  const rs = ((n1 * ci - n2 * ct) / (n1 * ci + n2 * ct)) ** 2;
  const rp = ((n1 * ct - n2 * ci) / (n1 * ct + n2 * ci)) ** 2;
  return (rs + rp) / 2;
}

function criticalAngle(n1, n2) {
  return n2 >= n1 ? null : (Math.asin(n2 / n1) * 180) / Math.PI;
}

export function mount(container, params = {}) {
  const state = {
    angle: params.angle ?? 20,
    nValley: params.nValley ?? 1.0, // 골에 든 물질의 굴절률
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>대비가 폭발하는 각도는 콜리메이터가 버리는 각도입니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>유리 안에서 계면에 닿는 각도 <span data-out="angle"></span>도</label>
          <input type="range" min="0" max="85" step="1" data-in="angle" />
        </div>
        <div class="sim-control">
          <label>골에 든 물질 <span data-out="medium"></span></label>
          <input type="range" min="100" max="140" step="1" data-in="nv" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      비편광 프레넬 반사율 R = (Rs + Rp)/2로 계산했습니다. 유리 1.51, 피부 1.44로 두고
      골에 든 물질의 굴절률만 공기(1.00)에서 1.40까지 움직입니다. 임계각을 넘으면 반사율을
      1로 둡니다. 회색 띠는 개구비 10짜리 콜리메이터가 통과시키는 각도 범위입니다.
      매질을 흡수가 없는 균일한 유전체로 놓은 계산이라, 산란체이고 표면이 거친 실제 피부에서는
      임계각이 이렇게 칼같이 서지 않습니다. 원리를 보여주는 모델이며 실측값이 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const angleInput = container.querySelector('[data-in="angle"]');
  const nvInput = container.querySelector('[data-in="nv"]');
  const angleOut = container.querySelector('[data-out="angle"]');
  const mediumOut = container.querySelector('[data-out="medium"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  angleInput.value = String(state.angle);
  nvInput.value = String(Math.round(state.nValley * 100));

  const MAX_A = 85;
  const x = (a) => PAD_L + ((W - PAD_L - PAD_R) * a) / MAX_A;
  const y = (r) => PAD_T + (H - PAD_T - PAD_B) * (1 - r);

  function render() {
    const nv = state.nValley;
    const a = state.angle;
    const rV = reflectance(N_GLASS, nv, a);
    const rR = reflectance(N_GLASS, N_SKIN, a);

    ctx.clearRect(0, 0, W, H);

    // 콜리메이터가 통과시키는 각도 띠 (개구비 10 -> 5.71도)
    const collAngle = (Math.atan(1 / 10) * 180) / Math.PI;
    ctx.fillStyle = 'rgba(244,243,238,0.13)';
    ctx.fillRect(x(0), PAD_T, x(collAngle) - x(0), H - PAD_T - PAD_B);

    // 대비 영역 채우기
    ctx.beginPath();
    for (let i = 0; i <= MAX_A; i += 0.5) ctx.lineTo(x(i), y(reflectance(N_GLASS, nv, i)));
    for (let i = MAX_A; i >= 0; i -= 0.5) ctx.lineTo(x(i), y(reflectance(N_GLASS, N_SKIN, i)));
    ctx.closePath();
    ctx.fillStyle = 'rgba(232,146,74,0.22)';
    ctx.fill();

    // 축
    ctx.strokeStyle = 'rgba(244,243,238,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD_L, PAD_T);
    ctx.lineTo(PAD_L, H - PAD_B);
    ctx.lineTo(W - PAD_R, H - PAD_B);
    ctx.stroke();

    ctx.font = '9px sans-serif';
    ctx.fillStyle = 'rgba(244,243,238,0.6)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (const r of [0, 0.5, 1]) ctx.fillText(`${r * 100}%`, PAD_L - 4, y(r));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (const t of [0, 30, 60, 85]) ctx.fillText(`${t}도`, x(t), H - PAD_B + 4);

    // 곡선
    function curve(n2, color, width) {
      ctx.beginPath();
      for (let i = 0; i <= MAX_A; i += 0.5) {
        const px = x(i);
        const py = y(reflectance(N_GLASS, n2, i));
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }
    curve(N_SKIN, 'rgba(120,190,240,0.95)', 1.6); // 융선
    curve(nv, 'rgba(240,170,90,0.95)', 1.8); // 골

    // 임계각 표시
    const cV = criticalAngle(N_GLASS, nv);
    if (cV) {
      ctx.strokeStyle = 'rgba(240,170,90,0.5)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x(cV), PAD_T);
      ctx.lineTo(x(cV), H - PAD_B);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 현재 각도
    ctx.strokeStyle = 'rgba(244,243,238,0.85)';
    ctx.beginPath();
    ctx.moveTo(x(a), PAD_T);
    ctx.lineTo(x(a), H - PAD_B);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '9px sans-serif';
    ctx.fillStyle = 'rgba(240,170,90,0.95)';
    ctx.fillText('골', PAD_L + 5, PAD_T + 1);
    ctx.fillStyle = 'rgba(120,190,240,0.95)';
    ctx.fillText('융선', PAD_L + 22, PAD_T + 1);

    const label =
      nv < 1.02 ? '공기 (마른 손)' : nv < 1.28 ? '옅은 물기' : nv < 1.37 ? '물 (젖은 손)' : '피부에 가까움';
    angleOut.textContent = String(a);
    mediumOut.textContent = `굴절률 ${nv.toFixed(2)} · ${label}`;
    readoutOut.innerHTML =
      `골의 반사율 <b>${(rV * 100).toFixed(2)}%</b>, 융선 <b>${(rR * 100).toFixed(2)}%</b><br>` +
      `이 각도의 대비 <b>${((rV - rR) * 100).toFixed(2)}%p</b><br>` +
      (cV ? `골이 전부 되돌아오기 시작하는 각도 <b>${cV.toFixed(1)}도</b>` : '골에서는 전반사가 생기지 않습니다');
  }

  angleInput.addEventListener('input', () => {
    state.angle = Number(angleInput.value);
    render();
  });
  nvInput.addEventListener('input', () => {
    state.nValley = Number(nvInput.value) / 100;
    render();
  });

  render();
}

export default mount;
