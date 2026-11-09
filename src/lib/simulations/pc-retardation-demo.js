// 시뮬레이션 — 편광 선글라스로 PC 앞판을 낀 LCD를 볼 때 무엇이 보이나.
// 왼쪽은 LCD·PC 앞판·선글라스를 띄워 놓은 입체 적층, 오른쪽 위는 선글라스 너머로 보이는 흰 화면,
// 오른쪽 아래는 파장별 투과율이다. PC 판의 위상차(리타데이션)와 판 안의 고르지 않음을 바꿔 본다.
//
// 모델과 한계
// - LCD에서 나온 빛은 직선 편광이고, 선글라스의 투과축은 그와 직교한다고 본다(가장 어두운 경우).
// - PC 판은 광축이 편광과 45°인 균일한 위상판으로 본다. 직교 편광 사이 투과율 T(λ) = sin²(π·Γ/λ).
// - 판 안의 고르지 않음은 매끈한 무늬로 Γ ± P-V/2 범위에서 흔든다. US9817262B2가 보통 PC 시트의
//   위상차를 1,000~3,000nm, 면내 고르지 않음(P-V)을 200~500nm로 적었다.
// - 색은 CIE 1931 등색함수의 해석적 근사(Wyman·Sloan·Shirley 2013)와 등에너지 백색으로 계산하고 sRGB로 바꾼다.
//   LCD 백라이트의 실제 스펙트럼, 선글라스의 편광도, 비스듬히 볼 때의 위상차 변화는 넣지 않았다.
// - 밝기는 선글라스 없이 본 흰 화면을 100%로 한 값이다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 460;

const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';
const INK = '#f4f4ef';
const MUTE = '#b9b9b0';
const BG = '#101418';
const OK = '#1fdc6a';
const BAD = '#ff5a36';
const PCC = '#ffb020';

const PRESETS = [
  { key: 'plain', label: 'Ordinary PC sheet 2,000 nm', g: 2000 },
  { key: 'ex2', label: 'MGC Example 2: 3,500 nm', g: 3500 },
  { key: 'ex7', label: 'MGC Example 7: 6,500 nm', g: 6500 },
];

// CIE 1931 등색함수 근사
function lobe(x, m, s1, s2) { const s = x < m ? s1 : s2; return Math.exp(-0.5 * ((x - m) / s) ** 2); }
function cmf(l) {
  return [
    1.056 * lobe(l, 599.8, 37.9, 31.0) + 0.362 * lobe(l, 442.0, 16.0, 26.7) - 0.065 * lobe(l, 501.1, 20.4, 26.2),
    0.821 * lobe(l, 568.8, 46.9, 40.5) + 0.286 * lobe(l, 530.9, 16.3, 31.1),
    1.217 * lobe(l, 437.0, 11.8, 36.0) + 0.681 * lobe(l, 459.0, 26.0, 13.8),
  ];
}
const LAMS = [];
for (let l = 400; l <= 700; l += 4) LAMS.push(l);
const CMF = LAMS.map(cmf);
const Y0 = CMF.reduce((a, c) => a + c[1], 0);

const T = (g, l) => Math.sin((Math.PI * g) / l) ** 2;

// 위상차 하나에 대한 XYZ (흰 화면 Y = 1)
function seen(g) {
  let X = 0, Y = 0, Z = 0;
  LAMS.forEach((l, i) => { const t = T(g, l); X += t * CMF[i][0]; Y += t * CMF[i][1]; Z += t * CMF[i][2]; });
  return [X / Y0, Y / Y0, Z / Y0];
}
function toRGB([X, Y, Z]) {
  const lin = [3.2406 * X - 1.5372 * Y - 0.4986 * Z, -0.9689 * X + 1.8758 * Y + 0.0415 * Z, 0.0557 * X - 0.204 * Y + 1.057 * Z];
  return lin.map((v) => {
    const c = Math.min(Math.max(v, 0), 1);
    return Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055));
  });
}
function chroma([X, Y, Z]) {
  const s = X + Y + Z;
  return s > 1e-6 ? Math.hypot(X / s - 1 / 3, Y / s - 1 / 3) : 0.47;
}
// 파장을 화면 색으로 (그래프 채움용)
function lamRGB(l) {
  const c = toRGB(cmf(l).map((v) => v * 0.9));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
// 판 안의 매끈한 무늬, −1 ~ 1
const noise = (u, v) => 0.5 * Math.sin(5.1 * u + 1.3) * Math.cos(3.7 * v + 0.4) + 0.3 * Math.sin(9.3 * u - 7.1 * v + 2.1) + 0.2 * Math.cos(13.7 * v + 4.9 * u);

export function mount(container) {
  const state = { g: 2000, pv: 500, preset: 'plain' };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>A white LCD seen through polarized sunglasses, with a PC front plate in between.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>From the patents (US9817262B2, US10710291B2)</label>
          <div class="sim-toggle-group" data-presets>
            ${PRESETS.map((p) => `<button type="button" class="sim-toggle-btn" data-p="${p.key}">${p.label}</button>`).join('')}
          </div>
        </div>
        <div class="sim-control">
          <label>PC plate retardation <span data-out="g"></span> nm</label>
          <input type="range" min="0" max="15000" step="100" data-in="g" />
        </div>
        <div class="sim-control">
          <label>Unevenness across the plate, P-V <span data-out="pv"></span> nm</label>
          <input type="range" min="0" max="600" step="25" data-in="pv" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inputs = [...container.querySelectorAll('[data-in]')];
  const pbtns = [...container.querySelectorAll('[data-p]')];

  function text(s, x, y, color, size, weight, align) {
    ctx.font = `${weight || 600} ${size || 13}px ${FONT}`;
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, x, y);
  }
  function chip(s, x, y, color, align, size) {
    ctx.font = `700 ${size || 13}px ${FONT}`;
    const tw = ctx.measureText(s).width;
    const px = 6, hh = (size || 13) * 0.62 + 3;
    const lx = align === 'right' ? x - tw - px * 2 : align === 'center' ? x - tw / 2 - px : x;
    ctx.fillStyle = 'rgba(8,10,14,0.85)';
    ctx.beginPath(); ctx.roundRect(lx, y - hh, tw + px * 2, hh * 2, 5); ctx.fill();
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, lx + px, y + 0.5);
  }
  // 비스듬한 판: 윗면 평행사변형 + 두께
  function plate(x, y, w, d, th, top, side, edge) {
    const dx = d * 0.9, dy = -d * 0.5;
    ctx.fillStyle = side;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w + dx, y + dy); ctx.lineTo(x + w + dx, y + dy + th); ctx.lineTo(x + w, y + th); ctx.lineTo(x, y + th); ctx.closePath(); ctx.fill();
    ctx.fillStyle = top;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx, y + dy); ctx.lineTo(x + w + dx, y + dy); ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = edge; ctx.lineWidth = 1.2; ctx.stroke();
    return { cx: x + w / 2 + dx / 2, cy: y + dy / 2 };
  }
  function polArrow(cx, cy, ang, col) {
    // 판 위에 놓인 편광 방향: 화면 좌표에서 기울여 그린다
    const r = 34, ex = Math.cos(ang) * r, ey = Math.sin(ang) * r * 0.5;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx - ex, cy - ey); ctx.lineTo(cx + ex, cy + ey); ctx.stroke();
    for (const s of [1, -1]) {
      const tx = cx + s * ex, ty = cy + s * ey, a = Math.atan2(s * ey, s * ex);
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx - 9 * Math.cos(a - 0.45), ty - 9 * Math.sin(a - 0.45)); ctx.lineTo(tx - 9 * Math.cos(a + 0.45), ty - 9 * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
    }
  }

  function draw() {
    const { g, pv } = state;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
    text('Polarized sunglasses vs a PC front plate', 20, 24, INK, 15, 700);
    text('LCD light is polarized; the sunglasses pass only the crossed direction', 20, 44, MUTE, 12, 500);

    // ── 왼쪽: 띄워 놓은 적층 (아래 LCD → PC → 선글라스 → 눈)
    const px0 = 24, pw = 140, pd = 64;
    const sun = plate(px0, 130, pw, pd, 6, 'rgba(70,80,96,0.85)', '#2a3038', '#9aa3b2');
    polArrow(sun.cx, sun.cy, Math.PI / 2 + 0.35, '#cfd6e0');
    chip('sunglasses: passes ↕', px0, 156, '#cfd6e0', 'left', 12);
    const pc = plate(px0, 240, pw, pd, 12, 'rgba(255,176,32,0.55)', '#8a5d10', PCC);
    polArrow(pc.cx, pc.cy, 0.35 + Math.PI / 4, PCC);
    chip(`PC plate: Γ ${g.toLocaleString('en-US')} nm, axis 45°`, px0, 272, PCC, 'left', 12);
    const lcd = plate(px0, 350, pw, pd, 18, '#e9eef3', '#3b4450', '#ffffff');
    polArrow(lcd.cx, lcd.cy, 0.35, '#3d8bff');
    chip('LCD: white, polarized ↔', px0, 388, '#9cc6ff', 'left', 12);
    // 빛 경로
    ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(244,244,239,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(lcd.cx, lcd.cy); ctx.lineTo(sun.cx, sun.cy - 40); ctx.stroke();
    ctx.setLineDash([]);
    // 눈
    const ex = sun.cx, ey = sun.cy - 52;
    ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(ex, ey, 16, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = BG; ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2); ctx.fill();

    // ── 오른쪽 위: 선글라스 너머 흰 화면
    const sx = 300, sy = 72, sw = 300, sh = 116, nx = 60, ny = 24;
    let lmin = 1, lmax = 0, cmax = 0;
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const gg = Math.max(g + (pv / 2) * noise(i / nx, j / ny), 0);
        const xyz = seen(gg);
        lmin = Math.min(lmin, xyz[1]); lmax = Math.max(lmax, xyz[1]); cmax = Math.max(cmax, chroma(xyz));
        const c = toRGB(xyz);
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.fillRect(sx + (i * sw) / nx, sy + (j * sh) / ny, sw / nx + 0.6, sh / ny + 0.6);
      }
    }
    ctx.strokeStyle = '#596372'; ctx.lineWidth = 6; ctx.strokeRect(sx - 3, sy - 3, sw + 6, sh + 6);
    chip('white screen, seen through sunglasses', sx + sw / 2, sy + sh + 18, INK, 'center', 12);

    // ── 오른쪽 아래: 파장별 투과율, 고르지 않은 범위를 띠로
    const gx0 = 336, gx1 = 600, gy0 = 262, gy1 = 380;
    const X = (l) => gx0 + ((l - 400) / 300) * (gx1 - gx0);
    const Yp = (t) => gy1 - t * (gy1 - gy0);
    for (let l = 400; l < 700; l += 2) {
      ctx.fillStyle = lamRGB(l + 1);
      ctx.globalAlpha = 0.55;
      ctx.fillRect(X(l), Yp(T(g, l + 1)), X(l + 2) - X(l) + 0.5, gy1 - Yp(T(g, l + 1)));
    }
    ctx.globalAlpha = 1;
    if (pv > 0) {
      ctx.strokeStyle = 'rgba(244,244,239,0.35)'; ctx.lineWidth = 1.2;
      for (const dg of [-pv / 2, pv / 2]) {
        ctx.beginPath();
        for (let l = 400; l <= 700; l += 1) { const y = Yp(T(Math.max(g + dg, 0), l)); l === 400 ? ctx.moveTo(X(l), y) : ctx.lineTo(X(l), y); }
        ctx.stroke();
      }
    }
    ctx.strokeStyle = INK; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let l = 400; l <= 700; l += 1) { const y = Yp(T(g, l)); l === 400 ? ctx.moveTo(X(l), y) : ctx.lineTo(X(l), y); }
    ctx.stroke();
    ctx.strokeStyle = INK; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(gx0, gy0 - 4); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
    for (const t of [0, 0.5, 1]) text(`${t * 100}%`, gx0 - 6, Yp(t), MUTE, 11, 500, 'right');
    for (const l of [400, 500, 600, 700]) text(String(l), X(l), gy1 + 13, MUTE, 11, 500, 'center');
    text('wavelength, nm', (gx0 + gx1) / 2, gy1 + 30, INK, 12, 600, 'center');
    text('transmission', gx0, gy0 - 16, INK, 12, 600);
    if (pv > 0) text(`thin lines: Γ ± ${pv / 2} nm`, gx1, gy0 - 16, MUTE, 11, 500, 'right');

    // MGC 범위 표시
    const inWin = g >= 3000 && g < 15000;
    chip(inWin ? 'inside MGC window 3,000–15,000 nm' : g < 3000 ? 'below MGC lower limit 3,000 nm' : 'at or above MGC upper limit 15,000 nm',
      sx + sw / 2, 442, inWin ? OK : BAD, 'center', 12);
    return { lmin, lmax, cmax, inWin };
  }

  function refresh() {
    for (const el of inputs) { const k = el.dataset.in; el.value = String(state[k]); out(k).textContent = state[k].toLocaleString('en-US'); }
    for (const b of pbtns) b.setAttribute('aria-pressed', String(b.dataset.p === state.preset));
    const { lmin, lmax, cmax } = draw();
    const even = lmax - lmin < 0.05 && cmax < 0.04;
    out('readout').innerHTML =
      `brightness through sunglasses <strong>${Math.round(lmin * 100)}–${Math.round(lmax * 100)}%</strong> of the bare screen<br>` +
      (state.g === 0 ? '<strong>no retardation: the screen goes black</strong>'
        : even ? '<strong>even and nearly white</strong>: the ripples in T(λ) average out'
          : '<strong>uneven, tinted patches</strong>: small changes in Γ shift the colour');
  }

  for (const el of inputs) {
    el.addEventListener('input', (e) => { state[el.dataset.in] = Number(e.target.value); state.preset = ''; refresh(); });
  }
  for (const b of pbtns) {
    b.addEventListener('click', () => { const p = PRESETS.find((q) => q.key === b.dataset.p); Object.assign(state, { g: p.g, preset: p.key }); refresh(); });
  }
  refresh();
}

export default mount;
