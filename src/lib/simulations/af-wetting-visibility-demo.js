// 시뮬레이션 — 표면의 임계표면장력을 낮추면 같은 양의 액체가 어떤 모양으로 앉는가,
// 그리고 그때 눈에 얼마나 보이는가.
//
// 모델과 한계
// - 접촉각은 지스먼(Zisman) 선형 근사 cos(theta) = 1 - k(gamma_L - gamma_c)를 쓴다.
//   계수 k는 액체별로 다르게 두었고(물 0.0195, n-헥사데칸 0.0300), 다이킨 Optool
//   기술자료의 실측 접촉각(물 109~116도, n-헥사데칸 65~68도)이 CF3 표면 근방에서
//   대략 재현되도록 맞춘 값이다. 문헌에서 가져온 상수가 아니다.
// - 액적 모양은 부피가 일정한 구면 캡으로 계산한다. 접촉각이 작아지면 접촉 반경이
//   커지는 관계만 정확하고, 중력에 의한 눌림은 넣지 않았다.
// - 가시성 띠는 접촉 반경을 두 액체 공통 기준으로 환산한 상대 지표이며 광학 계산이 아니다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

const LIQUIDS = {
  hexadecane: { label: 'n-Hexadecane (oil)', short: 'n-Hexadecane', gamma: 27.5, k: 0.03, color: '#c8a55e' },
  water: { label: 'Water', short: 'Water', gamma: 72.8, k: 0.0195, color: '#6f9fd8' },
};

const W = 440;
const H = 336;
const BASE_Y = 176;
const CX = 220;
const SCALE = 48;
const STRIP_Y = 262;

export function mount(container, params = {}) {
  const state = {
    gammaC: params.gammaC ?? 6,
    liquid: params.liquid ?? 'hexadecane',
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Lower the surface energy and the same drop changes shape, not amount</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Surface critical tension &gamma;c <span data-out="gc"></span> mN/m</label>
          <input type="range" min="6" max="40" step="0.5" data-in="gc" />
        </div>
        <div class="sim-control">
          <label>Test liquid</label>
          <div class="sim-toggle-group" data-in="liq">
            <button type="button" class="sim-toggle-btn" data-val="hexadecane" aria-pressed="true">n-Hexadecane 27.5</button>
            <button type="button" class="sim-toggle-btn" data-val="water" aria-pressed="false">Water 72.8</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const gcInput = container.querySelector('[data-in="gc"]');
  const gcOut = container.querySelector('[data-out="gc"]');
  const readout = container.querySelector('[data-out="readout"]');
  const toggleBtns = [...container.querySelectorAll('[data-in="liq"] button')];

  gcInput.value = String(state.gammaC);

  const INK = '#f4f3ee';
  const DIM = 'rgba(244,243,238,0.58)';
  const FAINT = 'rgba(244,243,238,0.30)';

  function contactAngle(gammaC, liq) {
    const c = 1 - liq.k * (liq.gamma - gammaC);
    return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
  }

  // 부피가 같은 구면 캡의 접촉 반경과 높이 (상대값)
  function capGeometry(thetaDeg) {
    const t = Math.max(5, thetaDeg) * (Math.PI / 180);
    const cos = Math.cos(t);
    const shape = (1 - cos) * (1 - cos) * (2 + cos);
    const R = Math.cbrt(3 / (Math.PI * shape));
    return { R, a: R * Math.sin(t), h: R * (1 - cos), t };
  }

  function draw() {
    const liq = LIQUIDS[state.liquid];
    const theta = contactAngle(state.gammaC, liq);
    const g = capGeometry(theta);
    const aPx = Math.min(184, g.a * SCALE);
    const hPx = g.h * SCALE;

    gcOut.textContent = state.gammaC.toFixed(1);
    ctx.clearRect(0, 0, W, H);

    // ---- header labels ----
    ctx.font = 'bold 17px sans-serif';
    ctx.fillStyle = liq.color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const wetting = theta < 1;
    ctx.fillText(wetting ? 'θ ≈ 0°' : 'θ = ' + theta.toFixed(0) + '°', 22, 16);
    ctx.font = '13px sans-serif';
    ctx.fillStyle = DIM;
    ctx.fillText(wetting ? liq.label + '  ·  complete wetting' : liq.label, 22, 40);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = FAINT;
    ctx.textAlign = 'right';
    ctx.fillText('CF3 = 6    CF2 = 17    CH3 = 22-24', W - 22, 16);

    // ---- surface ----
    ctx.fillStyle = 'rgba(244,243,238,0.10)';
    ctx.fillRect(22, BASE_Y, W - 44, 18);
    ctx.strokeStyle = FAINT;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(22, BASE_Y + 0.5);
    ctx.lineTo(W - 22, BASE_Y + 0.5);
    ctx.stroke();
    ctx.font = '12px sans-serif';
    ctx.fillStyle = DIM;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('SURFACE', 28, BASE_Y + 9);

    // ---- drop ----
    // 구면 캡: 접촉각 t에서 구 중심은 표면보다 R*cos(t)만큼 아래에 있다.
    // t < 90도면 중심이 표면 아래라 캡이 납작하고, t > 90도면 중심이 위로 올라와
    // 접촉선보다 배가 부른 모양이 된다. 캡 높이는 언제나 R(1 - cos t)이다.
    const R = aPx / Math.sin(g.t);
    const yc = BASE_Y + R * Math.cos(g.t);
    ctx.save();
    ctx.beginPath();
    ctx.rect(22, 56, W - 44, BASE_Y - 56);
    ctx.clip();
    ctx.beginPath();
    ctx.arc(CX, yc, R, 0, Math.PI * 2);
    ctx.fillStyle = liq.color;
    ctx.globalAlpha = 0.82;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = liq.color;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();

    // ---- contact angle, drawn at the three-phase contact line ----
    const px = CX - aPx;
    const tanLen = Math.min(54, 22 + hPx * 0.9);
    ctx.strokeStyle = liq.color;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(px, BASE_Y);
    ctx.lineTo(px + tanLen * Math.cos(g.t), BASE_Y - tanLen * Math.sin(g.t));
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(px, BASE_Y, 22, -g.t, 0);
    ctx.strokeStyle = liq.color;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // height marker
    ctx.strokeStyle = FAINT;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const mx = Math.min(CX + aPx + 12, W - 34);
    ctx.moveTo(mx, BASE_Y);
    ctx.lineTo(mx, BASE_Y - hPx);
    ctx.moveTo(mx - 4, BASE_Y - hPx);
    ctx.lineTo(mx + 4, BASE_Y - hPx);
    ctx.stroke();

    // ---- contact width bracket ----
    const by = BASE_Y + 30;
    ctx.strokeStyle = DIM;
    ctx.beginPath();
    ctx.moveTo(CX - aPx, by);
    ctx.lineTo(CX + aPx, by);
    ctx.moveTo(CX - aPx, by - 5);
    ctx.lineTo(CX - aPx, by + 5);
    ctx.moveTo(CX + aPx, by - 5);
    ctx.lineTo(CX + aPx, by + 5);
    ctx.stroke();
    ctx.font = '13px sans-serif';
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('contact width', CX, by + 8);

    // ---- how it looks ----
    ctx.font = '12px sans-serif';
    ctx.fillStyle = DIM;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText('HOW IT LOOKS ON A DARK SCREEN', 22, STRIP_Y - 8);

    ctx.fillStyle = '#101012';
    ctx.fillRect(22, STRIP_Y, W - 44, 48);
    ctx.strokeStyle = FAINT;
    ctx.strokeRect(22.5, STRIP_Y + 0.5, W - 45, 47);

    // 손가락이 다섯 번 닿았다고 두고, 각 자국이 접촉 반경만큼 퍼진다.
    // 자국이 커져 이웃과 겹치면 저절로 하나의 얼룩으로 이어진다.
    const SPACING = 58;
    const marks = [-3, -2, -1, 0, 1, 2, 3].map((i) => i * SPACING);
    const dys = [-5, 4, -3, 5, -4, 3, -5];
    const rx = Math.max(4, aPx * 0.34);
    const ry = Math.min(rx * 0.82, 17);
    const cy = STRIP_Y + 24;

    ctx.save();
    ctx.beginPath();
    ctx.rect(23, STRIP_Y + 1, W - 46, 46);
    ctx.clip();
    // 자국을 하나씩 칠하면 겹친 자리만 알파가 누적돼 얼룩덜룩해진다.
    // 모든 타원을 한 경로에 모아 한 번만 채워 겹쳐도 색이 균일하게 한다.
    ctx.fillStyle = 'rgba(196,196,186,0.42)';
    ctx.beginPath();
    marks.forEach((mx2, i) => {
      ctx.moveTo(CX + mx2 + rx, cy + dys[i]);
      ctx.ellipse(CX + mx2, cy + dys[i], rx, ry, 0, 0, Math.PI * 2);
    });
    ctx.fill();
    ctx.restore();

    const merged = 2 * rx >= SPACING;
    ctx.font = '12px sans-serif';
    ctx.fillStyle = merged ? 'rgba(216,154,106,0.95)' : DIM;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(
      merged ? 'marks merge into one haze' : 'separate marks, easily wiped',
      W - 22,
      STRIP_Y - 8
    );

    const refA = capGeometry(contactAngle(6, liq)).a;
    const areaRel = (g.a / refA) * (g.a / refA);
    readout.innerHTML =
      (theta < 1
        ? 'Complete wetting &middot; contact area <b>'
        : 'Contact angle <b>' + theta.toFixed(0) + '°</b> &middot; contact area <b>') +
      areaRel.toFixed(1) + '&times;</b> vs a CF3 surface';
  }

  gcInput.addEventListener('input', () => {
    state.gammaC = Number(gcInput.value);
    draw();
  });
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.liquid = btn.dataset.val;
      toggleBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      draw();
    });
  });

  draw();
}

export default mount;
