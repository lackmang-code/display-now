// 시뮬레이션 — 마모가 진행될 때 정적 접촉각과 접촉각 히스테리시스가 서로 다른 속도로
// 움직인다는 것을 보여준다. 이 기사 6절과 7절의 논지를 손으로 만져 보게 하는 장치다.
//
// 모델과 한계
// - 온전한 CF3 구역의 잔존 분율을 f = exp(-N / tau)로 둔다. tau는 제품별 상수이며,
//   다이킨 기술자료의 스틸울 내마모 값(UD509 24,000회, DSX 6,000회, 모두 물 접촉각
//   100도 유지 기준)에서 판정선을 대략 재현하도록 역산한 값이다. 실측 감쇠 곡선이 아니다.
// - 정적 접촉각은 캐시(Cassie) 혼합식 cos(theta) = f*cos(theta_CF3) + (1-f)*cos(theta_bare)로
//   계산한다. theta_CF3 = 116도, theta_bare = 25도로 두었다. theta_bare를 맨유리(10도 미만)가
//   아니라 25도로 둔 것은 실란 머리가 표면에 남는다는 7절의 서술을 반영한 것이며,
//   문헌에서 가져온 값이 아니다.
// - 히스테리시스는 표면이 불균일할수록 커진다는 정성적 관계만 넣었다(H = H0 + dH*sqrt(1-f)).
//   실측 곡선이 아니다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

// tau는 판정선(물 접촉각 100도)을 실측 회수에서 정확히 통과하도록 역산한 값이다.
// 판정선에서의 잔존 분율 f = 0.8031이므로 tau = -N / ln(f).
// A: 24,000회(Optool UD509) -> 109,472   B: 6,000회(Optool DSX) -> 27,368
const PRODUCTS = {
  A: { label: 'Coating A', pass: 24000, tau: 109472, color: '#7fb08a' },
  B: { label: 'Coating B', pass: 6000, tau: 27368, color: '#d89a6a' },
};

const TH_CF3 = 116;
const TH_BARE = 25;
const H0 = 6;
const DH = 44;
const PASS_LINE = 100;

export function mount(container, params = {}) {
  const state = { cycles: params.cycles ?? 4000 };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Static angle holds up. Hysteresis moves first.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="440" height="366"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Steel wool cycles <span data-out="n"></span></label>
          <input type="range" min="0" max="30000" step="250" data-in="n" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const nInput = container.querySelector('[data-in="n"]');
  const nOut = container.querySelector('[data-out="n"]');
  const readout = container.querySelector('[data-out="readout"]');
  nInput.value = String(state.cycles);

  const INK = '#f4f3ee';
  const DIM = 'rgba(244,243,238,0.55)';
  const LINE = 'rgba(244,243,238,0.20)';

  const X0 = 56, X1 = 412, Y0 = 40, Y1 = 232;
  const NMAX = 30000;

  const fx = (n) => X0 + (n / NMAX) * (X1 - X0);
  const fy = (deg) => Y1 - (deg / 130) * (Y1 - Y0);

  function frac(n, tau) {
    return Math.exp(-n / tau);
  }
  function staticAngle(f) {
    const c =
      f * Math.cos((TH_CF3 * Math.PI) / 180) +
      (1 - f) * Math.cos((TH_BARE * Math.PI) / 180);
    return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
  }
  function hysteresis(f) {
    return H0 + DH * Math.sqrt(Math.max(0, 1 - f));
  }

  function drawCurve(tau, color, dashed) {
    ctx.beginPath();
    for (let n = 0; n <= NMAX; n += 250) {
      const y = fy(staticAngle(frac(n, tau)));
      if (n === 0) ctx.moveTo(fx(n), y);
      else ctx.lineTo(fx(n), y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.stroke();

    ctx.beginPath();
    for (let n = 0; n <= NMAX; n += 250) {
      const y = fy(hysteresis(frac(n, tau)));
      if (n === 0) ctx.moveTo(fx(n), y);
      else ctx.lineTo(fx(n), y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function draw() {
    const n = state.cycles;
    nOut.textContent = n.toLocaleString('en-US');
    ctx.clearRect(0, 0, 440, 366);

    // axes
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(X0, Y0);
    ctx.lineTo(X0, Y1);
    ctx.lineTo(X1, Y1);
    ctx.stroke();

    ctx.font = '12px sans-serif';
    ctx.fillStyle = DIM;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (const deg of [0, 40, 80, 120]) {
      ctx.fillText(String(deg), X0 - 8, fy(deg));
      ctx.beginPath();
      ctx.moveTo(X0, fy(deg));
      ctx.lineTo(X0 - 4, fy(deg));
      ctx.stroke();
    }
    ctx.save();
    ctx.translate(18, (Y0 + Y1) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('degrees', 0, 0);
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (const v of [0, 10000, 20000, 30000]) {
      ctx.fillText(v === 0 ? '0' : v / 1000 + 'k', fx(v), Y1 + 8);
    }
    ctx.fillText('steel wool cycles', (X0 + X1) / 2, Y1 + 26);

    // pass line
    ctx.strokeStyle = 'rgba(216,154,106,0.5)';
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(X0, fy(PASS_LINE));
    ctx.lineTo(X1, fy(PASS_LINE));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'rgba(216,154,106,0.9)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('pass line 100°', X1, fy(PASS_LINE) - 5);

    drawCurve(PRODUCTS.A.tau, PRODUCTS.A.color);
    drawCurve(PRODUCTS.B.tau, PRODUCTS.B.color);

    // 판정선을 지나는 지점 (제조사 실측 회수와 일치)
    ctx.font = '12px sans-serif';
    ctx.textBaseline = 'top';
    for (const key of ['A', 'B']) {
      const p = PRODUCTS[key];
      const x = fx(p.pass);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(x, fy(PASS_LINE));
      ctx.lineTo(x, Y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = p.color;
      ctx.textAlign = key === 'B' ? 'left' : 'center';
      ctx.fillText((p.pass / 1000) + 'k', x + (key === 'B' ? 4 : 0), fy(PASS_LINE) + 6);
    }

    // cursor
    ctx.strokeStyle = 'rgba(244,243,238,0.45)';
    ctx.beginPath();
    ctx.moveTo(fx(n), Y0);
    ctx.lineTo(fx(n), Y1);
    ctx.stroke();

    for (const key of ['A', 'B']) {
      const p = PRODUCTS[key];
      const f = frac(n, p.tau);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(fx(n), fy(staticAngle(f)), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(fx(n), fy(hysteresis(f)), 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // legend
    ctx.font = '13px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    let ly = 292;
    for (const key of ['A', 'B']) {
      const p = PRODUCTS[key];
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(24, ly);
      ctx.lineTo(48, ly);
      ctx.stroke();
      ctx.fillStyle = INK;
      ctx.fillText(p.label + '  (' + (p.pass / 1000) + 'k)', 54, ly);

      const f = frac(n, p.tau);
      ctx.fillStyle = DIM;
      ctx.fillText(
        'static ' + staticAngle(f).toFixed(0) + '°   hysteresis ' + hysteresis(f).toFixed(0) + '°',
        176,
        ly
      );
      ly += 24;
    }

    ctx.strokeStyle = DIM;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(24, 350);
    ctx.lineTo(48, 350);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = DIM;
    ctx.font = '12.5px sans-serif';
    ctx.fillText('dashed: contact angle hysteresis', 54, 350);

    const fA = frac(n, PRODUCTS.A.tau);
    const fB = frac(n, PRODUCTS.B.tau);
    readout.innerHTML =
      'At <b>' + n.toLocaleString('en-US') + '</b> cycles &middot; ' +
      'A keeps <b>' + staticAngle(fA).toFixed(0) + '°</b>, B keeps <b>' +
      staticAngle(fB).toFixed(0) + '°</b> &middot; ' +
      'hysteresis <b>' + hysteresis(fA).toFixed(0) + '°</b> vs <b>' +
      hysteresis(fB).toFixed(0) + '°</b>';
  }

  nInput.addEventListener('input', () => {
    state.cycles = Number(nInput.value);
    draw();
  });

  draw();
}

export default mount;
