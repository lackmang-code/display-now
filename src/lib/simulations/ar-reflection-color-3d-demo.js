// 시뮬레이션 — 천장 LED 조명 아래 놓인 휴대폰 커버유리를 비스듬히 보고, 코팅마다 반사가 어떤 색·밝기로
// 보이는지 픽셀마다 계산해 그린다. 지문 하나를 얹어 반사를 깊게 지운 코팅일수록 지문이 떠오르는 것을 본다.
//
// 모델과 한계
// - 반사율은 경사입사 전달행렬(s·p 편광 평균)로 0.5도 간격 표를 만들어 쓴다. 분산과 흡수는 넣지 않았다.
// - 적층은 본문 그림과 같은 공개 실시예다. LR 은 n 1.35 한 층(550nm 의 1/4 파장), 습식 3층은 후지필름
//   US8691351 청구 범위 가운데값, 스퍼터 10층은 AGC US11137521 실시예 1 이다. 기재는 1.52.
// - 색은 반사율 스펙트럼에 D65 를 곱해 CIE 1931 등색함수로 XYZ 를 구하고 sRGB 로 바꾼다.
//   400~700nm 10nm 간격이며, 흰 반사판(R=1)이 정확히 흰색이 되도록 채널을 정규화했다.
// - 🔴 밝기는 모든 코팅에 같은 배율(×20)을 곱했다. 곱하지 않으면 맨유리 4% 반사가 거의 검게 보여
//   코팅끼리 비교가 안 된다. 배율은 그림 안에 적어 둔다. 채도는 건드리지 않는다.
//   한 채널이 넘치면 세 채널을 같은 비율로 줄여 색상을 지킨다.
// - 기름은 매끈하고 두꺼운 막으로 본다(본문 표와 같은 가정). 공기/기름 계면과 「기름 속에서 본 적층」을
//   편광별로 비간섭 다중반사로 합친다. 실제 지문은 방울이라 산란이 더해지므로 정반사 성분만이다.
// - 지문 융선은 0.5mm 간격이다. 화면 한 픽셀이 융선 간격에 가까워지면 줄무늬 대비를 줄여
//   계단 무늬(앨리어싱)를 막는다. 덮인 비율의 평균은 그대로 둔다.
// - 장면 상수(천장 높이 2m, 300mm 정사각 LED 패널 바둑판, 패널 둘레 번짐, 천장 나머지 밝기 5%, 카메라 거리 33cm)는
//   반사가 보이도록 고른 무대 설정이고 물리 주장이 아니다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙). 표지 규칙에 따라 원색·13px 굵게·받침을 쓴다.

import { hidpi } from './_hidpi.js';

// 🔴 표지 무대 안쪽 폭 704px, 시뮬 몸통 좌우 여백 40px → 캔버스 664px 이하.
const LAYOUT = {
  article: { W: 620, H: 420 },
  cover: { W: 620, H: 420 },
};

const N_GLASS = 1.52;
const N_OIL = 1.47;
const N_H = 2.3;
const N_L = 1.46;

const COATINGS = {
  bare: { name: 'Bare glass', layers: [] },
  lr: { name: 'LR, one layer n 1.35', layers: [[1.35, 550 / (4 * 1.35)]] },
  wet3: { name: 'Wet coat, three layers', layers: [[1.345, 90], [1.72, 110], [1.62, 60]] },
  sput10: {
    name: 'Sputter, ten layers',
    // 공기쪽부터. 특허 목록은 유리쪽부터 Nb2O5 14 / SiO2 32 / ... / SiO2 100 이다.
    layers: [[N_L, 100], [N_H, 37], [N_L, 33], [N_H, 25], [N_L, 230], [N_H, 18], [N_L, 35], [N_H, 130], [N_L, 32], [N_H, 14]],
  },
};

const WL = [];
for (let w = 400; w <= 700; w += 10) WL.push(w);
const D65 = [82.75, 91.49, 93.43, 86.68, 104.86, 117.01, 117.81, 114.86, 115.92, 108.81, 109.35, 107.8, 104.79, 107.69, 104.41, 104.05, 100.0, 96.33, 95.79, 88.69, 90.01, 89.6, 87.7, 83.29, 83.7, 80.03, 80.21, 82.28, 78.28, 69.72, 71.61];
const XB = [0.01431, 0.04351, 0.13438, 0.2839, 0.34828, 0.3362, 0.2908, 0.19536, 0.09564, 0.03201, 0.0049, 0.0093, 0.06327, 0.1655, 0.2904, 0.43345, 0.5945, 0.7621, 0.9163, 1.0263, 1.0622, 1.0026, 0.85445, 0.6424, 0.4479, 0.2835, 0.1649, 0.0874, 0.04677, 0.0227, 0.01136];
const YB = [0.0004, 0.0012, 0.004, 0.0116, 0.023, 0.038, 0.06, 0.091, 0.139, 0.208, 0.323, 0.503, 0.71, 0.862, 0.954, 0.995, 0.995, 0.952, 0.87, 0.757, 0.631, 0.503, 0.381, 0.265, 0.175, 0.107, 0.061, 0.032, 0.017, 0.0082, 0.0041];
const ZB = [0.06785, 0.2074, 0.6456, 1.3856, 1.74706, 1.77211, 1.6692, 1.28764, 0.81295, 0.46518, 0.272, 0.1582, 0.07825, 0.04216, 0.0203, 0.00875, 0.0039, 0.0021, 0.00165, 0.0011, 0.0008, 0.00034, 0.00019, 0.00005, 0.00002, 0, 0, 0, 0, 0, 0];
const YSUM = YB.reduce((a, v, i) => a + v * D65[i], 0);

function xyzToLin(X, Y, Z) {
  return [
    3.2406 * X - 1.5372 * Y - 0.4986 * Z,
    -0.9689 * X + 1.8758 * Y + 0.0415 * Z,
    0.0557 * X - 0.204 * Y + 1.057 * Z,
  ];
}
// 흰 반사판이 (1,1,1) 이 되게 하는 채널 보정
const WHITE = (() => {
  let X = 0, Y = 0, Z = 0;
  WL.forEach((_, i) => { X += D65[i] * XB[i]; Y += D65[i] * YB[i]; Z += D65[i] * ZB[i]; });
  return xyzToLin(X / YSUM, Y / YSUM, Z / YSUM);
})();

// 경사입사 반사율 (한 편광). n0 입사매질, st0 = sin(입사각), layers 입사쪽부터 [n, d]
function stackR(n0, st0, layers, nsub, lam, pol) {
  const s0 = n0 * st0;
  const cosIn = (n) => Math.sqrt(Math.max(0, 1 - (s0 / n) * (s0 / n)));
  const eta = (n) => (pol === 's' ? n * cosIn(n) : n / cosIn(n));
  let m11r = 1, m11i = 0, m12r = 0, m12i = 0, m21r = 0, m21i = 0, m22r = 1, m22i = 0;
  for (const [n, d] of layers) {
    const p = (2 * Math.PI * n * d * cosIn(n)) / lam;
    const c = Math.cos(p), sn = Math.sin(p), e = eta(n);
    const a11r = m11r * c - m12i * e * sn, a11i = m11i * c + m12r * e * sn;
    const a12r = -m11i * (sn / e) + m12r * c, a12i = m11r * (sn / e) + m12i * c;
    const a21r = m21r * c - m22i * e * sn, a21i = m21i * c + m22r * e * sn;
    const a22r = -m21i * (sn / e) + m22r * c, a22i = m21r * (sn / e) + m22i * c;
    m11r = a11r; m11i = a11i; m12r = a12r; m12i = a12i;
    m21r = a21r; m21i = a21i; m22r = a22r; m22i = a22i;
  }
  const es = eta(nsub), e0 = eta(n0);
  const Br = m11r + m12r * es, Bi = m11i + m12i * es;
  const Cr = m21r + m22r * es, Ci = m21i + m22i * es;
  const nr = e0 * Br - Cr, ni = e0 * Bi - Ci;
  const dr = e0 * Br + Cr, di = e0 * Bi + Ci;
  return (nr * nr + ni * ni) / (dr * dr + di * di);
}

// 0.5도 간격 표: 깨끗할 때와 기름 아래의 선형 RGB 와 명소시 반사율 Y
const STEP = 0.5;
const NA = 180; // 0 ~ 89.5도
function buildLUT(layers) {
  const lut = { clean: new Float32Array(NA * 3), oil: new Float32Array(NA * 3), yc: new Float32Array(NA), yo: new Float32Array(NA) };
  for (let k = 0; k < NA; k++) {
    const th = (k * STEP * Math.PI) / 180;
    const st = Math.sin(th), sto = st / N_OIL;
    let Xc = 0, Yc = 0, Zc = 0, Xo = 0, Yo = 0, Zo = 0;
    WL.forEach((lam, i) => {
      let rc = 0, ro = 0;
      for (const pol of ['s', 'p']) {
        rc += 0.5 * stackR(1, st, layers, N_GLASS, lam, pol);
        const r1 = stackR(1, st, [], N_OIL, lam, pol);
        const r2 = stackR(N_OIL, sto, layers, N_GLASS, lam, pol);
        ro += 0.5 * (r1 + ((1 - r1) * (1 - r1) * r2) / (1 - r1 * r2));
      }
      const w = D65[i] / YSUM;
      Xc += rc * w * XB[i]; Yc += rc * w * YB[i]; Zc += rc * w * ZB[i];
      Xo += ro * w * XB[i]; Yo += ro * w * YB[i]; Zo += ro * w * ZB[i];
    });
    const c = xyzToLin(Xc, Yc, Zc), o = xyzToLin(Xo, Yo, Zo);
    for (let j = 0; j < 3; j++) {
      lut.clean[k * 3 + j] = Math.max(0, c[j] / WHITE[j]);
      lut.oil[k * 3 + j] = Math.max(0, o[j] / WHITE[j]);
    }
    lut.yc[k] = Yc * 100;
    lut.yo[k] = Yo * 100;
  }
  return lut;
}

const EXPOSURE = 20;
const CAM_D = 330; // mm
const CEIL = 2000; // 책상 위 천장 높이
// 천장 LED 패널: 한 변 300mm 정사각형, 가로 500mm·세로 600mm 간격 바둑판
const PANEL_HALF = 150;
const PANEL_SX = 500;
const PANEL_SY = 600;
const PANEL_X0 = 250; // 패널 열은 x = 0, ±500 에 선다
const PANEL_Y0 = 300;
const GLOW = 0.1; // 패널 둘레 천장이 받는 빛
const GLOW_R = 70; // mm
const ROOM = 0.05;
const RIDGE = 0.5; // mm

const lut8 = new Uint8Array(4097);
for (let i = 0; i <= 4096; i++) {
  const v = i / 4096;
  lut8[i] = Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055));
}
const toByte = (v) => lut8[Math.min(4096, Math.max(0, (v * 4096) | 0))];

function roundRectInside(x, y, hw, hh, r) {
  const qx = Math.abs(x) - (hw - r), qy = Math.abs(y) - (hh - r);
  if (qx <= 0 || qy <= 0) return Math.abs(x) <= hw && Math.abs(y) <= hh;
  return qx * qx + qy * qy <= r * r;
}

export function mount(container, params = {}) {
  const L = LAYOUT[params.cover ? 'cover' : 'article'];
  const { W, H } = L;
  const SW = 404; // 장면 폭
  const F = 790; // 초점거리(논리 px)

  const state = {
    coating: COATINGS[params.coating] ? params.coating : 'sput10',
    view: params.view ?? 35,
    print: params.print ?? true,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>A cover glass under ceiling lights: reflection color and a fingerprint, computed per pixel</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Coating</label>
          <div class="sim-toggle-group" data-in="coating">
            <button type="button" class="sim-toggle-btn" data-val="bare">Bare</button>
            <button type="button" class="sim-toggle-btn" data-val="lr">LR 1 layer</button>
            <button type="button" class="sim-toggle-btn" data-val="wet3">Wet 3 layers</button>
            <button type="button" class="sim-toggle-btn" data-val="sput10">Sputter 10 layers</button>
          </div>
        </div>
        <div class="sim-control">
          <label>View tilt from straight above <span data-out="view"></span>&deg;</label>
          <input type="range" min="0" max="70" step="1" data-in="view" />
        </div>
        <div class="sim-control">
          <label>Fingerprint</label>
          <div class="sim-toggle-group" data-in="print">
            <button type="button" class="sim-toggle-btn" data-val="on">On</button>
            <button type="button" class="sim-toggle-btn" data-val="off">Off</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inp = (k) => container.querySelector(`[data-in="${k}"]`);
  const coatBtns = [...container.querySelectorAll('[data-in="coating"] button')];
  const printBtns = [...container.querySelectorAll('[data-in="print"] button')];

  const luts = {};
  const getLUT = (k) => (luts[k] ||= buildLUT(COATINGS[k].layers));

  function label(text, x, y, color, align) {
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    const w = ctx.measureText(text).width;
    const bx = align === 'right' ? x - w - 6 : align === 'center' ? x - w / 2 - 6 : x - 6;
    ctx.fillStyle = 'rgba(8,8,10,0.72)';
    const r = 5, bw = w + 12, bh = 20, by = y - 10;
    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
    ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
    ctx.arcTo(bx, by + bh, bx, by, r);
    ctx.arcTo(bx, by, bx + bw, by, r);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  // 지문: 유리 좌표(mm) 에서 덮인 비율 0~1
  const FP = { x: -9, y: -20, a: 8.5, b: 11.5, rot: (20 * Math.PI) / 180 };
  const fpc = Math.cos(FP.rot), fps = Math.sin(FP.rot);
  function coverage(x, y, footMM) {
    const dx = x - FP.x, dy = y - FP.y;
    const u = dx * fpc + dy * fps, v = -dx * fps + dy * fpc;
    const rr = Math.sqrt((u / FP.a) ** 2 + (v / FP.b) ** 2);
    if (rr >= 1) return 0;
    const env = rr < 0.78 ? 1 : 1 - (rr - 0.78) / 0.22;
    const phase = (2 * Math.PI * rr * FP.b) / RIDGE + 1.3 * Math.min(1, rr * 3) * Math.sin(2 * Math.atan2(v, u));
    const contrast = Math.max(0, Math.min(1, 1.6 - (2 * footMM) / RIDGE));
    return env * (0.5 + 0.5 * contrast * Math.sin(phase));
  }

  function render() {
    const lut = getLUT(state.coating);
    const phi = (state.view * Math.PI) / 180;
    const camY = -CAM_D * Math.sin(phi), camZ = CAM_D * Math.cos(phi);
    const fy = Math.sin(phi), fz = -Math.cos(phi); // 앞
    const uy = Math.cos(phi), uz = Math.sin(phi); // 위 (오른쪽은 +x)
    const pw = canvas.width, ph = canvas.height, dpr = pw / W;
    const img = ctx.createImageData(pw, ph);
    const px = img.data;
    const sw = Math.round(SW * dpr);
    const cx = SW / 2, cy = H / 2 - 4;
    let thMin = 90, thMax = 0;

    for (let j = 0; j < ph; j++) {
      const sy = cy - (j + 0.5) / dpr;
      for (let i = 0; i < pw; i++) {
        const o = (j * pw + i) * 4;
        px[o + 3] = 255;
        if (i >= sw) { px[o] = 13; px[o + 1] = 13; px[o + 2] = 10; continue; }
        const sx = (i + 0.5) / dpr - cx;
        const dx = sx, dy = fy * F + uy * sy, dz = fz * F + uz * sy;
        if (dz >= 0) { px[o] = 20; px[o + 1] = 19; px[o + 2] = 18; continue; }
        const t = -camZ / dz;
        const hx = dx * t, hy = camY + dy * t;
        if (!roundRectInside(hx, hy, 37, 76, 10)) {
          // 책상
          const vig = Math.max(0.55, 1 - Math.hypot(hx, hy) / 420);
          px[o] = 46 * vig; px[o + 1] = 41 * vig; px[o + 2] = 36 * vig;
          continue;
        }
        if (!roundRectInside(hx, hy, 34.5, 73.5, 8)) { px[o] = 16; px[o + 1] = 16; px[o + 2] = 18; continue; }
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const cosT = -dz / len;
        const thDeg = (Math.acos(cosT) * 180) / Math.PI;
        if (thDeg < thMin) thMin = thDeg;
        if (thDeg > thMax) thMax = thDeg;
        const k = Math.min(NA - 1, Math.round(thDeg / STEP)) * 3;
        // 반사 광선이 천장에서 닿는 자리
        const s = CEIL / -dz;
        const qx = hx + dx * s, qy = hy + dy * s;
        const gx0 = ((((qx - PANEL_X0) % PANEL_SX) + PANEL_SX) % PANEL_SX) - PANEL_SX / 2;
        const gy0 = ((((qy - PANEL_Y0) % PANEL_SY) + PANEL_SY) % PANEL_SY) - PANEL_SY / 2;
        const ex = Math.abs(gx0) - PANEL_HALF, ey = Math.abs(gy0) - PANEL_HALF;
        const edge = Math.max(ex, ey);
        const core = edge <= -5 ? 1 : edge >= 5 ? 0 : 0.5 - edge / 10;
        const outside = Math.hypot(Math.max(ex, 0), Math.max(ey, 0));
        const lamp = core + (1 - core) * GLOW * Math.exp(-outside / GLOW_R);
        const Lsrc = EXPOSURE * (ROOM + (1 - ROOM) * lamp);
        let c = 0;
        if (state.print) {
          const foot = (t * len) / (F * dpr) / Math.max(0.2, cosT);
          c = coverage(hx, hy, foot);
        }
        let r = lut.clean[k] + c * (lut.oil[k] - lut.clean[k]);
        let g = lut.clean[k + 1] + c * (lut.oil[k + 1] - lut.clean[k + 1]);
        let b = lut.clean[k + 2] + c * (lut.oil[k + 2] - lut.clean[k + 2]);
        r *= Lsrc; g *= Lsrc; b *= Lsrc;
        const mx = Math.max(r, g, b);
        if (mx > 1) { r /= mx; g /= mx; b /= mx; }
        px[o] = toByte(r); px[o + 1] = toByte(g); px[o + 2] = toByte(b);
      }
    }
    ctx.putImageData(img, 0, 0);

    // 장면 라벨
    label(COATINGS[state.coating].name, 12, 20, '#ffffff');
    label(`brightness x${EXPOSURE}, same for all`, 12, H - 18, 'rgba(236,236,237,0.9)');
    if (state.print) {
      const vy = FP.y - camY, vz = -camZ;
      const zc = vy * fy + vz * fz;
      if (zc > 0) {
        const sxp = cx + (F * FP.x) / zc;
        const syp = cy - (F * (vy * uy + vz * uz)) / zc;
        label('fingerprint', Math.max(110, sxp - 34), Math.min(H - 48, syp), '#ff8c1a', 'right');
      }
    }

    drawChart(lut, thMin, thMax);
    return { thMin, thMax, lut };
  }

  function drawChart(lut, thMin, thMax) {
    const P = { l: SW + 44, r: W - 12, t: 52, b: H - 62 };
    const LMIN = Math.log10(0.05), LMAX = Math.log10(40), AMAX = 75;
    const gx = (a) => P.l + (Math.min(a, AMAX) / AMAX) * (P.r - P.l);
    const gy = (y) => P.b - ((Math.log10(Math.max(0.05, Math.min(40, y))) - LMIN) / (LMAX - LMIN)) * (P.b - P.t);

    label('Y vs angle', SW + 14, 20, '#ffffff');
    if (thMax > thMin) {
      ctx.fillStyle = 'rgba(236,236,237,0.10)';
      ctx.fillRect(gx(thMin), P.t, gx(thMax) - gx(thMin), P.b - P.t);
    }
    ctx.font = '11px ui-monospace, monospace';
    ctx.textBaseline = 'middle';
    [0.1, 1, 10].forEach((v) => {
      ctx.strokeStyle = 'rgba(244,243,238,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(P.l, gy(v));
      ctx.lineTo(P.r, gy(v));
      ctx.stroke();
      ctx.fillStyle = 'rgba(190,190,196,0.9)';
      ctx.textAlign = 'right';
      ctx.fillText(`${v}%`, P.l - 5, gy(v));
    });
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    [0, 30, 60].forEach((a) => ctx.fillText(`${a}°`, gx(a), P.b + 15));
    ctx.fillText('angle on glass', (P.l + P.r) / 2, P.b + 30);

    const bare = getLUT('bare');
    const line = (arr, color, width, dash) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash || []);
      ctx.beginPath();
      for (let k = 0; k <= AMAX / STEP; k++) {
        const x = gx(k * STEP), y = gy(arr[k]);
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };
    line(bare.yc, 'rgba(236,236,237,0.45)', 1.2, [4, 3]);
    if (state.print) line(lut.yo, '#ff8c1a', 2.6);
    line(lut.yc, '#2fa8ff', 2.6);

    label('clean', SW + 20, H - 18, '#2fa8ff');
    if (state.print) label('under oil', SW + 96, H - 18, '#ff8c1a');
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = 'rgba(236,236,237,0.6)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('bare', P.r, gy(bare.yc[0]) - 5);
    ctx.textAlign = 'left';
    ctx.fillText('log scale', P.l + 2, P.t - 8);
  }

  function refresh() {
    inp('view').value = String(state.view);
    out('view').textContent = String(state.view);
    coatBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.val === state.coating)));
    printBtns.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.val === 'on') === state.print)));
    const { thMin, thMax, lut } = render();
    const mid = Math.min(NA - 1, Math.round((thMin + thMax) / 2 / STEP));
    const yc = lut.yc[mid], yo = lut.yo[mid];
    const f = (v) => (v < 1 ? v.toFixed(2) : v.toFixed(1));
    const ratio = yo / yc;
    out('readout').innerHTML =
      `glass seen at <strong>${Math.round(thMin)}–${Math.round(thMax)}°</strong><br>` +
      `at ${Math.round((thMin + thMax) / 2)}°: clean Y <strong>${f(yc)}%</strong>` +
      (state.print ? `, under oil <strong>${f(yo)}%</strong> (${ratio < 10 ? ratio.toFixed(1) : Math.round(ratio)}x)` : '') +
      '<br>oil drawn as a smooth film; real prints also scatter';
  }

  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      refresh();
    });
  };

  inp('view').addEventListener('input', (e) => {
    state.view = Number(e.target.value);
    schedule();
  });
  coatBtns.forEach((btn) => btn.addEventListener('click', () => { state.coating = btn.dataset.val; schedule(); }));
  printBtns.forEach((btn) => btn.addEventListener('click', () => { state.print = btn.dataset.val === 'on'; schedule(); }));

  refresh();
}

export default mount;
