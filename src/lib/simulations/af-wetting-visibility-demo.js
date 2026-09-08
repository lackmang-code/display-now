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

import { hidpi } from './_hidpi.js';

const LIQUIDS = {
  hexadecane: {
    label: 'n-Hexadecane (oil)', short: 'n-Hexadecane', gamma: 27.5, k: 0.03,
    color: '#f0b23c', lit: '#ffd77a', shade: '#b87d1e',
  },
  water: {
    label: 'Water', short: 'Water', gamma: 72.8, k: 0.0195,
    color: '#5fa8ee', lit: '#a9d4ff', shade: '#2f6ea8',
  },
};

// 기사 본문 구도(기본)와 표지 구도(cover)를 나눈다.
//
// 🔴 왜 나누는가 (2026-09-08).
// 이 캔버스는 본문 678px 폭에서 옆에 슬라이더를 두고 읽히도록 만든 것이다.
// 그대로 표지에 올리면 808px 무대 안에 440px 로 작게 들어가고, 안쪽 여백까지 커서
// **그림의 절반이 빈 공간**이 된다. 표지는 이 매체의 얼굴이라 구도를 따로 잡는다.
//
// 표지 구도에서 바꾸는 것은 **크기와 자리**뿐이다. 그리는 내용과 물리는 같다.
// ⚠ 표지에서 캔버스를 키우는 것은 2026-09-08 에 시도했다가 되돌렸다.
// 무대(808px) 안쪽 폭이 704px 인데 760px 로 잡아 **그림이 오른쪽으로 넘쳤다.**
// 시뮬 몸통이 [캔버스 | 슬라이더] 가로 배치라 캔버스만 키우면 자리가 모자란다.
// 키우려면 슬라이더를 아래로 내리는 레이아웃 변경이 함께 가야 한다.
// 지금은 **크기를 건드리지 않고 해상도와 음영만** 올린다 — 그 둘이 실제 성과였다.
const LAYOUT = {
  article: { W: 440, H: 336, BASE_Y: 176, SCALE: 48, STRIP_Y: 262, PAD: 22, FS: 1 },
  cover:   { W: 440, H: 336, BASE_Y: 176, SCALE: 48, STRIP_Y: 262, PAD: 22, FS: 1 },
};

export function mount(container, params = {}) {
  const L = LAYOUT[params.cover ? 'cover' : 'article'];
  const { W, H, BASE_Y, SCALE, STRIP_Y, PAD, FS } = L;
  const CX = Math.round(W / 2);
  const fs = (n) => Math.round(n * FS);

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
  const ctx = hidpi(canvas, W, H);
  const gcInput = container.querySelector('[data-in="gc"]');
  const gcOut = container.querySelector('[data-out="gc"]');
  const readout = container.querySelector('[data-out="readout"]');
  const toggleBtns = [...container.querySelectorAll('[data-in="liq"] button')];

  gcInput.value = String(state.gammaC);

  const INK = '#f4f3ee';
  const DIM = 'rgba(244,243,238,0.72)';
  const FAINT = 'rgba(244,243,238,0.42)';

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
    const aPx = Math.min(W / 2 - PAD - 30, g.a * SCALE);
    const hPx = g.h * SCALE;

    gcOut.textContent = state.gammaC.toFixed(1);
    ctx.clearRect(0, 0, W, H);

    // ---- header labels ----
    ctx.font = `bold ${fs(17)}px sans-serif`;
    ctx.fillStyle = liq.color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const wetting = theta < 1;
    ctx.fillText(wetting ? 'θ ≈ 0°' : 'θ = ' + theta.toFixed(0) + '°', PAD, Math.round(16 * FS));
    ctx.font = `${fs(13)}px sans-serif`;
    ctx.fillStyle = DIM;
    ctx.fillText(wetting ? liq.label + '  ·  complete wetting' : liq.label, PAD, Math.round(40 * FS));

    ctx.font = `${fs(13)}px sans-serif`;
    ctx.fillStyle = FAINT;
    ctx.textAlign = 'right';
    ctx.fillText('CF3 = 6    CF2 = 17    CH3 = 22-24', W - PAD, Math.round(16 * FS));

    // ---- surface ----
    ctx.fillStyle = 'rgba(244,243,238,0.16)';
    ctx.fillRect(PAD, BASE_Y, W - PAD * 2, Math.round(18 * FS));
    ctx.strokeStyle = FAINT;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, BASE_Y + 0.5);
    ctx.lineTo(W - PAD, BASE_Y + 0.5);
    ctx.stroke();
    ctx.font = `${fs(12)}px sans-serif`;
    ctx.fillStyle = DIM;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('SURFACE', PAD + 6, BASE_Y + Math.round(9 * FS));

    // ---- drop ----
    // 구면 캡: 접촉각 t에서 구 중심은 표면보다 R*cos(t)만큼 아래에 있다.
    // t < 90도면 중심이 표면 아래라 캡이 납작하고, t > 90도면 중심이 위로 올라와
    // 접촉선보다 배가 부른 모양이 된다. 캡 높이는 언제나 R(1 - cos t)이다.
    const R = aPx / Math.sin(g.t);
    const yc = BASE_Y + R * Math.cos(g.t);
    ctx.save();
    ctx.beginPath();
    ctx.rect(PAD, Math.round(56 * FS), W - PAD * 2, BASE_Y - Math.round(56 * FS));
    ctx.clip();
    // Shading only. The geometry above is the spherical cap; nothing here changes it.
    // A droplet is a three-dimensional body, so it is lit as one: a sphere gradient with
    // the light up and to the left, one specular highlight, a rim on the shaded side,
    // and a soft contact shadow where it meets the surface.
    const LX = CX - R * 0.42;
    const LY = yc - R * 0.55;

    ctx.beginPath();
    ctx.arc(CX, yc, R, 0, Math.PI * 2);
    const body = ctx.createRadialGradient(LX, LY, R * 0.06, CX, yc, R * 1.05);
    body.addColorStop(0, liq.lit);
    body.addColorStop(0.42, liq.color);
    body.addColorStop(1, liq.shade);
    ctx.fillStyle = body;
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(CX, yc, R, 0, Math.PI * 2);
    ctx.clip();

    const rim = ctx.createLinearGradient(CX + R * 0.4, yc, CX + R, yc + R * 0.3);
    rim.addColorStop(0, 'rgba(255,255,255,0)');
    rim.addColorStop(1, 'rgba(255,255,255,0.26)');
    ctx.fillStyle = rim;
    ctx.fillRect(CX - R, yc - R, R * 2, R * 2);

    ctx.beginPath();
    ctx.ellipse(LX, LY, R * 0.26, R * 0.16, -0.5, 0, Math.PI * 2);
    const spec = ctx.createRadialGradient(LX, LY, 0, LX, LY, R * 0.26);
    spec.addColorStop(0, 'rgba(255,255,255,0.82)');
    spec.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = spec;
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(CX, yc, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = Math.max(1, 1.1 * FS);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.rect(PAD, BASE_Y, W - PAD * 2, Math.round(18 * FS));
    ctx.clip();
    const shW = aPx * 1.5;
    const sh = ctx.createLinearGradient(CX - shW, 0, CX + shW, 0);
    sh.addColorStop(0, 'rgba(0,0,0,0)');
    sh.addColorStop(0.5, 'rgba(0,0,0,0.5)');
    sh.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sh;
    ctx.fillRect(CX - shW, BASE_Y, shW * 2, Math.round(18 * FS));
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
    const mx = Math.min(CX + aPx + 12, W - PAD - 12);
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
    ctx.font = `${fs(13)}px sans-serif`;
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('contact width', CX, by + 8);

    // ---- how it looks ----
    ctx.font = `${fs(12)}px sans-serif`;
    ctx.fillStyle = DIM;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText('HOW IT LOOKS ON A DARK SCREEN', PAD, STRIP_Y - 8);

    ctx.fillStyle = '#101012';
    ctx.fillRect(PAD, STRIP_Y, W - PAD * 2, Math.round(48 * FS));
    ctx.strokeStyle = FAINT;
    ctx.strokeRect(PAD + 0.5, STRIP_Y + 0.5, W - PAD * 2 - 1, Math.round(48 * FS) - 1);

    // 손가락이 다섯 번 닿았다고 두고, 각 자국이 접촉 반경만큼 퍼진다.
    // 자국이 커져 이웃과 겹치면 저절로 하나의 얼룩으로 이어진다.
    const SPACING = Math.round(58 * FS);
    const marks = [-3, -2, -1, 0, 1, 2, 3].map((i) => i * SPACING);
    const dys = [-5, 4, -3, 5, -4, 3, -5];
    const rx = Math.max(4, aPx * 0.34);
    const ry = Math.min(rx * 0.82, Math.round(17 * FS));
    const cy = STRIP_Y + Math.round(24 * FS);

    ctx.save();
    ctx.beginPath();
    ctx.rect(PAD + 1, STRIP_Y + 1, W - PAD * 2 - 2, Math.round(48 * FS) - 2);
    ctx.clip();
    // 자국을 하나씩 칠하면 겹친 자리만 알파가 누적돼 얼룩덜룩해진다.
    // 모든 타원을 한 경로에 모아 한 번만 채워 겹쳐도 색이 균일하게 한다.
    ctx.fillStyle = 'rgba(214,212,198,0.60)';
    ctx.beginPath();
    marks.forEach((mx2, i) => {
      ctx.moveTo(CX + mx2 + rx, cy + dys[i]);
      ctx.ellipse(CX + mx2, cy + dys[i], rx, ry, 0, 0, Math.PI * 2);
    });
    ctx.fill();
    ctx.restore();

    const merged = 2 * rx >= SPACING;
    ctx.font = `${fs(12)}px sans-serif`;
    ctx.fillStyle = merged ? '#f0b23c' : DIM;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(
      merged ? 'marks merge into one haze' : 'separate marks, easily wiped',
      W - PAD,
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
