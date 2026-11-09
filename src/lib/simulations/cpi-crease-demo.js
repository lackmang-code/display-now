// 시뮬레이션 — CPI 필름을 접어 두었다가 펼치면 자국이 얼마나, 언제까지 남나.
// 왼쪽 위는 막대에 감긴 필름(접힌 상태)과 겉면 변형률, 왼쪽 아래는 펼친 뒤의 필름 옆모습이다.
// 오른쪽은 펼친 뒤 남은 잔류 변형률의 비율을 시간(로그 눈금)에 따라 그린다.
//
// 모델과 한계
// - 겉면 변형률 ε = t / (2R + t) (Choi 외 2021, 식 1). t는 필름 두께, R은 접힘 반경이다.
//   논문은 필름이 막대에서 조금 뜨는 것을 보정한 반경을 쓴다. 지름 2mm 막대의 14,944 με(약 1.5%)에 맞춰
//   첫 프리셋의 반경을 1.4mm로 둔다.
// - 잔류 변형이 남지 않는 임계 변형률은 약 0.4%(4,000 με)로 둔다. 같은 논문이 코오롱 CPI(실측 42 μm)를
//   막대에 감아 두는 시험에서 간접적으로 유추한 값이다(반경 약 5 mm).
// - 펼친 뒤 남은 비율 ε(t)/ε₀ = 1 − 0.23·log t (같은 논문 식 4, t는 분). 펼친 뒤 1분을 기준(100%)으로 한다.
//   0이 되는 시점(약 15일)은 이 직선을 연장한 값이고 논문이 잰 범위(1,000분)를 넘는다.
// - 처음 남는 잔류 변형의 크기는 변형률과 접어 둔 시간에 따라 커지지만, 그 값을 읽을 표가 없어 넣지 않았다.
//   펼친 필름의 굽은 정도는 남은 비율만 보여 주는 모식이다.
// - 온도·습도, 하드코트·접착층의 영향은 넣지 않았다. 반복해 접는 것은 다루지 않는다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 460;
const LIMIT = 0.4; // %

const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';
const INK = '#f4f4ef';
const MUTE = '#b9b9b0';
const BG = '#101418';
const OK = '#1fdc6a';
const BAD = '#ff5a36';
const FILM = '#ffd166';

const strain = (t, R) => (100 * t) / (2 * R * 1000 + t); // %
const remain = (min) => Math.max(0, 1 - 0.23 * Math.log10(Math.max(min, 1)));

const PRESETS = [
  { key: 'choi', label: 'Choi 2021: 42 μm, 2 mm rod (≈1.5%)', t: 42, R: 1.4 },
  { key: 'skc', label: 'SKC test: 50 μm, R 2 mm', t: 50, R: 2 },
  { key: 'safe', label: '42 μm at R 5 mm', t: 42, R: 5 },
];

// 시간 슬라이더 0~1000 → 1분 ~ 30일 (로그)
const T_MAX_MIN = 30 * 24 * 60;
const sliderToMin = (v) => 10 ** ((v / 1000) * Math.log10(T_MAX_MIN));
const minToSlider = (m) => Math.round((1000 * Math.log10(m)) / Math.log10(T_MAX_MIN));
function fmtTime(m) {
  if (m < 60) return `${Math.round(m)} min`;
  if (m < 60 * 24) return `${(m / 60).toFixed(m < 600 ? 1 : 0)} h`;
  return `${(m / 1440).toFixed(m < 14400 ? 1 : 0)} days`;
}

export function mount(container) {
  const state = { t: 42, R: 1, tl: minToSlider(60), preset: 'choi' };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Fold a CPI film, open it, and watch the crease relax.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>From the sources</label>
          <div class="sim-toggle-group" data-presets>
            ${PRESETS.map((p) => `<button type="button" class="sim-toggle-btn" data-p="${p.key}">${p.label}</button>`).join('')}
          </div>
        </div>
        <div class="sim-control">
          <label>Film thickness <span data-out="t"></span> μm</label>
          <input type="range" min="20" max="100" step="1" data-in="t" />
        </div>
        <div class="sim-control">
          <label>Fold radius <span data-out="R"></span> mm</label>
          <input type="range" min="0.5" max="8" step="0.1" data-in="R" />
        </div>
        <div class="sim-control">
          <label>Time since unfolding <span data-out="tl"></span></label>
          <input type="range" min="0" max="1000" step="1" data-in="tl" />
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

  function draw(eps, f, mins) {
    const { t, R } = state;
    const over = eps > LIMIT;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
    text('Folding strain and crease recovery of a CPI film', 20, 24, INK, 15, 700);
    text('top left: folded on a rod · bottom left: opened · right: what remains over time', 20, 44, MUTE, 12, 500);

    // ── 왼쪽 위: 금속 막대 옆모습과 그 위를 감은 필름 한 장, 반경을 화면 크기로 키운다
    const cx = 150, cy = 150;
    const rpx = 16 + Math.min(R, 8) * 7;           // 막대 반경 (모식, 반경에 비례)
    const tpx = Math.max(3, t / 10);                // 필름 두께 (과장)
    const g = ctx.createLinearGradient(cx - rpx, 0, cx + rpx, 0);
    g.addColorStop(0, '#5b6472'); g.addColorStop(0.45, '#c9d1dc'); g.addColorStop(1, '#4a525e');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, rpx, 0, Math.PI * 2); ctx.fill();
    // 필름: 위쪽 반원을 감싸고 양쪽으로 늘어진다(접힌 U자)
    ctx.strokeStyle = FILM; ctx.lineWidth = tpx; ctx.lineCap = 'butt';
    ctx.beginPath();
    ctx.moveTo(cx - rpx - tpx / 2, cy + 90);
    ctx.lineTo(cx - rpx - tpx / 2, cy);
    ctx.arc(cx, cy, rpx + tpx / 2, Math.PI, 0);
    ctx.lineTo(cx + rpx + tpx / 2, cy + 90);
    ctx.stroke();
    text('rod', cx, cy + 4, '#151a22', 12, 700, 'center');
    text('CPI film', cx + rpx + tpx + 8, cy + 72, FILM, 12, 600, 'left');
    // 겉면 변형률 표시
    chip(`outer surface ${eps.toFixed(2)}%`, cx + rpx + 22, cy - rpx * 0.9, over ? BAD : OK, 'left', 13);
    chip(`R ${R.toFixed(1)} mm · t ${t} μm`, cx, cy + 111, INK, 'center', 12);

    // ── 왼쪽 아래: 펼친 필름 옆모습 (남은 비율만큼 꺾인 모식)
    const by = 352, half = 110;
    const ang = over ? f * 0.9 : 0; // rad, 모식
    ctx.strokeStyle = FILM; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - half * Math.cos(ang), by - half * Math.sin(ang));
    ctx.lineTo(cx, by);
    ctx.lineTo(cx + half * Math.cos(ang), by - half * Math.sin(ang));
    ctx.stroke();
    ctx.strokeStyle = 'rgba(244,244,239,0.25)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(cx - half, by); ctx.lineTo(cx + half, by); ctx.stroke(); ctx.setLineDash([]);
    chip(over ? `opened ${fmtTime(mins)} ago: ${Math.round(f * 100)}% of the crease left` : 'below 0.4%: opens flat',
      cx, by + 30, over ? (f > 0.05 ? BAD : OK) : OK, 'center', 12);
    text('shape is schematic', cx, by + 54, MUTE, 11, 500, 'center');

    // ── 오른쪽: 남은 비율 대 시간
    const gx0 = 350, gx1 = 600, gy0 = 96, gy1 = 300;
    const L0 = 0, L1 = Math.log10(T_MAX_MIN);
    const X = (m) => gx0 + ((Math.log10(m) - L0) / (L1 - L0)) * (gx1 - gx0);
    const Y = (v) => gy1 - v * (gy1 - gy0);
    // 논문이 잰 범위와 연장 범위
    ctx.fillStyle = 'rgba(61,139,255,0.10)';
    ctx.fillRect(X(1), gy0, X(1000) - X(1), gy1 - gy0);
    text('measured to 1,000 min', (X(1) + X(1000)) / 2, gy0 - 10, '#9cc6ff', 11, 600, 'center');
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    for (const v of [0.25, 0.5, 0.75, 1]) { ctx.beginPath(); ctx.moveTo(gx0, Y(v)); ctx.lineTo(gx1, Y(v)); ctx.stroke(); }
    const marks = [[1, '1 min'], [60, '1 h'], [1440, '1 day'], [10080, '1 wk']];
    for (const [m, lab] of marks) {
      ctx.beginPath(); ctx.moveTo(X(m), gy0); ctx.lineTo(X(m), gy1); ctx.stroke();
      text(lab, X(m), gy1 + 14, MUTE, 11, 500, 'center');
    }
    // 곡선: 측정 범위는 실선, 연장은 점선
    ctx.strokeStyle = INK; ctx.lineWidth = 2.5;
    for (const [a, b, dash] of [[1, 1000, []], [1000, T_MAX_MIN, [5, 4]]]) {
      ctx.setLineDash(dash);
      ctx.beginPath();
      for (let k = 0; k <= 80; k++) {
        const m = a * (b / a) ** (k / 80);
        const yy = Y(remain(m));
        k === 0 ? ctx.moveTo(X(m), yy) : ctx.lineTo(X(m), yy);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
    const fNow = remain(mins);
    ctx.fillStyle = over ? BAD : MUTE;
    ctx.strokeStyle = BG; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(mins), Y(fNow), 6.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    chip(`${Math.round(fNow * 100)}%`, X(mins) + (mins > 3000 ? -10 : 10), Y(fNow) - 16, over ? '#ffb6a4' : MUTE, mins > 3000 ? 'right' : 'left', 13);
    ctx.strokeStyle = INK; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(gx0, gy0 - 2); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
    for (const v of [0, 0.5, 1]) text(`${v * 100}%`, gx0 - 6, Y(v), MUTE, 11, 500, 'right');
    text('time since unfolding (log)', (gx0 + gx1) / 2, gy1 + 32, INK, 12, 600, 'center');
    text('residual strain left', gx0, gy0 - 28, INK, 12, 600);

    // 변형률 막대: 0.4% 한계와 비교
    const sx0 = 350, sx1 = 600, sy = 382;
    const SX = (v) => sx0 + (Math.min(v, 4) / 4) * (sx1 - sx0);
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(sx0, sy - 9, sx1 - sx0, 18);
    ctx.fillStyle = over ? BAD : OK; ctx.fillRect(sx0, sy - 9, SX(eps) - sx0, 18);
    ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(SX(LIMIT), sy - 16); ctx.lineTo(SX(LIMIT), sy + 16); ctx.stroke(); ctx.setLineDash([]);
    text('no-crease limit 0.4%', SX(LIMIT) + 4, sy - 24, INK, 11, 700);
    for (const v of [0, 1, 2, 3, 4]) text(`${v}%`, SX(v), sy + 24, MUTE, 11, 500, 'center');
    text('outer-surface strain', sx0, sy + 44, INK, 12, 600);
    if (eps > 4) text('▶', sx1 + 6, sy, BAD, 12, 700);
  }

  function refresh() {
    for (const el of inputs) {
      const k = el.dataset.in;
      el.value = String(state[k]);
      out(k).textContent = k === 'tl' ? fmtTime(sliderToMin(state.tl)) : k === 'R' ? state.R.toFixed(1) : String(state[k]);
    }
    for (const b of pbtns) b.setAttribute('aria-pressed', String(b.dataset.p === state.preset));
    const eps = strain(state.t, state.R);
    const mins = sliderToMin(state.tl);
    const f = remain(mins);
    draw(eps, f, mins);
    out('readout').innerHTML =
      `outer-surface strain <strong>${eps.toFixed(2)}%</strong>, ${(eps / LIMIT).toFixed(1)}× the 0.4% limit<br>` +
      (eps > LIMIT
        ? `held folded, it creeps. ${fmtTime(mins)} after opening, <strong>${Math.round(f * 100)}%</strong> of the residual strain is still there`
        : '<strong>below the limit</strong>: the film springs back flat after a long hold');
  }

  for (const el of inputs) {
    el.addEventListener('input', (e) => { state[el.dataset.in] = Number(e.target.value); if (el.dataset.in !== 'tl') state.preset = ''; refresh(); });
  }
  for (const b of pbtns) {
    b.addEventListener('click', () => { const p = PRESETS.find((q) => q.key === b.dataset.p); Object.assign(state, { t: p.t, R: p.R, preset: p.key }); refresh(); });
  }
  refresh();
}

export default mount;
