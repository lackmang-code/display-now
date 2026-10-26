// 시뮬레이션 — 이온교환으로 양쪽 표면에 압축을 넣으면 두께 한가운데에 같은 넓이만큼 인장이 생긴다.
// 왼쪽은 유리 판의 입체 단면, 오른쪽은 같은 깊이 축을 공유하는 응력 분포다.
// 표면 압축(CS)·압축층 깊이(DOL)·두께를 바꾸며 중앙 인장(CT)과 파쇄성 문턱을 비교하고,
// 표면에서 시작한 흠의 끝이 압축 안에 있는지 인장 안에 있는지 본다.
//
// 모델과 한계
// - 응력 분포는 표면 FSM 측정이 가정하는 선형(삼각형) 근사다. 압축은 표면 CS에서 깊이 DOL까지 직선으로 0이 되고,
//   그 안쪽은 균일한 인장 CT다. 힘의 평형에서 CT = CS·DOL / (t − 2·DOL)가 나온다(Corning US8415013B2 식 1).
// - 파쇄성 문턱은 같은 특허의 식 3, CT ≤ −38.7·ln(t) + 48.2 (MPa, t는 mm)이다. 칼륨 이온교환 알루미노실리케이트
//   판에서 얻은 경험식이라 리튬 유리의 포물선형 분포에는 그대로 맞지 않는다(원고 고지문에 적는다).
// - 프리셋 두 개는 Gross·Price·Glaesemann(2013)의 0.7mm 실측값(소다라임 536MPa/14μm, 알루미노실리케이트 753MPa/45μm)이다.
// - 굽힘·충격이 더하는 응력, 응력 완화, 흠의 모양에 따른 응력 집중은 넣지 않았다. 흠은 「끝이 어느 응력 안에 있나」만 본다.
// - 인장 쪽 가로 눈금은 압축 쪽보다 크게 키웠다. 같은 눈금이면 인장 띠가 몇 픽셀로 사라진다. 그래프 아래에 배율을 적는다.
// 캔버스 안 글자는 전부 영어로 쓴다.

import { hidpi } from './_hidpi.js';

const W = 620;
const H = 460;

const ct = (cs, dol, tmm) => (cs * dol) / (tmm * 1000 - 2 * dol); // MPa, dol·t in μm
const ctLimit = (tmm) => -38.7 * Math.log(tmm) + 48.2; // MPa

const PRESETS = [
  { key: 'sl', label: 'Soda-lime 0.7 mm', t: 0.7, cs: 536, dol: 14 },
  { key: 'as', label: 'Aluminosilicate 0.7 mm', t: 0.7, cs: 753, dol: 45 },
];

const FONT = '"IBM Plex Sans KR", system-ui, sans-serif';
const COMP = '#3d8bff';
const TENS = '#ff5a36';
const OK = '#1fdc6a';
const INK = '#f4f4ef';
const MUTE = '#b9b9b0';
const BG = '#101418';

export function mount(container) {
  const state = { t: 0.7, cs: 753, dol: 45, flaw: 60, preset: 'as' };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Push compression into both faces. The middle pays it back in tension.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Measured glass, Gross et al. 2013</label>
          <div class="sim-toggle-group" data-presets>
            ${PRESETS.map((p) => `<button type="button" class="sim-toggle-btn" data-p="${p.key}">${p.label}</button>`).join('')}
          </div>
        </div>
        <div class="sim-control">
          <label>Glass thickness <span data-out="t"></span> mm</label>
          <input type="range" min="0.3" max="1.1" step="0.05" data-in="t" />
        </div>
        <div class="sim-control">
          <label>Surface compression CS <span data-out="cs"></span> MPa</label>
          <input type="range" min="300" max="1000" step="10" data-in="cs" />
        </div>
        <div class="sim-control">
          <label>Depth of layer DOL <span data-out="dol"></span> μm</label>
          <input type="range" min="5" max="120" step="1" data-in="dol" />
        </div>
        <div class="sim-control">
          <label>Surface flaw depth <span data-out="flaw"></span> μm</label>
          <input type="range" min="5" max="150" step="1" data-in="flaw" />
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

  // 선·면 위 글자는 어두운 받침을 깐다.
  function chip(s, x, y, color, align, size) {
    ctx.font = `700 ${size || 13}px ${FONT}`;
    const tw = ctx.measureText(s).width;
    const px = 6, hh = (size || 13) * 0.62 + 3;
    const lx = align === 'right' ? x - tw - px * 2 : align === 'center' ? x - tw / 2 - px : x;
    ctx.fillStyle = 'rgba(8,10,14,0.82)';
    ctx.beginPath(); ctx.roundRect(lx, y - hh, tw + px * 2, hh * 2, 5); ctx.fill();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, lx + px, y + 0.5);
  }

  function draw(ctv, lim, dolEff) {
    const { t, cs, flaw } = state;
    const tum = t * 1000;
    const tipInTension = flaw > dolEff;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    text('Stress through the thickness of a strengthened cover glass', 20, 24, INK, 15, 700);
    text(`t = ${t.toFixed(2)} mm   ·   depth runs top to bottom in both panels`, 20, 44, MUTE, 12, 500);

    // 깊이 축: 두 패널이 공유한다.
    const yTop = 112, yBot = 392;
    const Y = (z) => yTop + (z / tum) * (yBot - yTop);

    // ── 왼쪽: 유리 판 입체 단면 ──
    const fx0 = 34, fx1 = 238, dx = 34, dy = -26;
    const yC1 = Y(dolEff), yC2 = Y(tum - dolEff);

    // 윗면 (빛을 받는 유리)
    const gTop = ctx.createLinearGradient(fx0, yTop + dy, fx1 + dx, yTop);
    gTop.addColorStop(0, '#cfe6f2');
    gTop.addColorStop(1, '#8fb9cf');
    ctx.fillStyle = gTop;
    ctx.beginPath();
    ctx.moveTo(fx0, yTop); ctx.lineTo(fx0 + dx, yTop + dy); ctx.lineTo(fx1 + dx, yTop + dy); ctx.lineTo(fx1, yTop);
    ctx.closePath(); ctx.fill();
    // 오른쪽 옆면
    const gSide = ctx.createLinearGradient(fx1, 0, fx1 + dx, 0);
    gSide.addColorStop(0, '#3c5566');
    gSide.addColorStop(1, '#2a3b47');
    ctx.fillStyle = gSide;
    ctx.beginPath();
    ctx.moveTo(fx1, yTop); ctx.lineTo(fx1 + dx, yTop + dy); ctx.lineTo(fx1 + dx, yBot + dy); ctx.lineTo(fx1, yBot);
    ctx.closePath(); ctx.fill();
    // 옆면에도 압축층 띠를 이어 그린다
    ctx.fillStyle = 'rgba(61,139,255,0.55)';
    for (const [a, b] of [[yTop, yC1], [yC2, yBot]]) {
      ctx.beginPath();
      ctx.moveTo(fx1, a); ctx.lineTo(fx1 + dx, a + dy); ctx.lineTo(fx1 + dx, b + dy); ctx.lineTo(fx1, b);
      ctx.closePath(); ctx.fill();
    }

    // 앞 단면: 가운데 인장, 위아래 압축
    const gMid = ctx.createLinearGradient(0, yC1, 0, yC2);
    gMid.addColorStop(0, 'rgba(255,90,54,0.55)');
    gMid.addColorStop(0.5, 'rgba(255,90,54,0.32)');
    gMid.addColorStop(1, 'rgba(255,90,54,0.55)');
    ctx.fillStyle = gMid;
    ctx.fillRect(fx0, yC1, fx1 - fx0, yC2 - yC1);
    for (const [a, b, top] of [[yTop, yC1, true], [yC2, yBot, false]]) {
      const g = ctx.createLinearGradient(0, a, 0, b);
      g.addColorStop(0, top ? '#5aa2ff' : '#2f6fd6');
      g.addColorStop(1, top ? '#2f6fd6' : '#5aa2ff');
      ctx.fillStyle = g;
      ctx.fillRect(fx0, a, fx1 - fx0, b - a);
    }
    ctx.strokeStyle = 'rgba(244,244,239,0.9)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(fx0, yTop, fx1 - fx0, yBot - yTop);
    ctx.beginPath();
    ctx.moveTo(fx0, yTop); ctx.lineTo(fx0 + dx, yTop + dy); ctx.lineTo(fx1 + dx, yTop + dy);
    ctx.lineTo(fx1 + dx, yBot + dy); ctx.lineTo(fx1, yBot);
    ctx.moveTo(fx1, yTop); ctx.lineTo(fx1 + dx, yTop + dy);
    ctx.stroke();

    // 굽힘 화살표: 윗면을 양옆으로 당긴다
    ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineWidth = 2;
    for (const [x, d] of [[fx0 - 4, -1], [fx1 + dx + 4, 1]]) {
      const yy = d < 0 ? yTop - 2 : yTop + dy - 2;
      ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + d * 18, yy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + d * 24, yy); ctx.lineTo(x + d * 16, yy - 5); ctx.lineTo(x + d * 16, yy + 5); ctx.closePath(); ctx.fill();
    }
    text('bending pulls the top face', (fx0 + fx1 + dx) / 2, 68, INK, 12, 600, 'center');

    // 흠: 윗면에서 내려가는 쐐기
    const flawZ = Math.min(flaw, tum);
    const cx = fx0 + 70, tipY = Y(flawZ);
    ctx.fillStyle = '#0b0e12';
    ctx.beginPath(); ctx.moveTo(cx - 7, yTop); ctx.lineTo(cx, tipY); ctx.lineTo(cx + 7, yTop); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = tipInTension ? TENS : OK;
    ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = tipInTension ? TENS : OK;
    ctx.beginPath(); ctx.arc(cx, tipY, 4.5, 0, Math.PI * 2); ctx.fill();

    chip('central tension', (fx0 + fx1) / 2, (yC1 + yC2) / 2, '#ffb6a4', 'center', 12);
    chip(tipInTension ? 'flaw tip: in tension' : 'flaw tip: held shut', cx + 12, Math.max(tipY + 16, yC1 + 16), tipInTension ? TENS : OK, 'left', 12);

    // ── 오른쪽: 응력 분포 ──
    const x0 = 444;               // 0 MPa
    const cW = 140, tW = 140;     // 압축 1000 MPa 폭, 인장 125 MPa 폭 → 인장 눈금이 8배
    const CMAX = 1000, TMAX = 125;
    const XC = (s) => x0 - (s / CMAX) * cW;
    const XT = (s) => x0 + (Math.min(s, TMAX) / TMAX) * tW;

    // 격자
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    for (const s of [250, 500, 750, 1000]) { ctx.beginPath(); ctx.moveTo(XC(s), yTop); ctx.lineTo(XC(s), yBot); ctx.stroke(); }
    for (const s of [30, 60, 90, 120]) { ctx.beginPath(); ctx.moveTo(XT(s), yTop); ctx.lineTo(XT(s), yBot); ctx.stroke(); }

    // 압축 삼각형 (위·아래)
    for (const [za, zb] of [[0, dolEff], [tum, tum - dolEff]]) {
      const g = ctx.createLinearGradient(XC(cs), 0, x0, 0);
      g.addColorStop(0, 'rgba(61,139,255,0.95)');
      g.addColorStop(1, 'rgba(61,139,255,0.45)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(x0, Y(za)); ctx.lineTo(XC(cs), Y(za)); ctx.lineTo(x0, Y(zb)); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = COMP; ctx.lineWidth = 2; ctx.stroke();
    }
    // 인장 사각형
    const over = ctv > lim;
    ctx.fillStyle = over ? 'rgba(255,90,54,0.85)' : 'rgba(255,90,54,0.55)';
    ctx.fillRect(x0, Y(dolEff), XT(ctv) - x0, Y(tum - dolEff) - Y(dolEff));
    ctx.strokeStyle = TENS; ctx.lineWidth = 2;
    ctx.strokeRect(x0, Y(dolEff), XT(ctv) - x0, Y(tum - dolEff) - Y(dolEff));
    if (ctv > TMAX) text('▶ off scale', XT(TMAX) - 4, (yTop + yBot) / 2 + 22, INK, 11, 700, 'right');

    // 파쇄성 문턱 (세로 점선)
    ctx.setLineDash([6, 4]); ctx.strokeStyle = INK; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(XT(lim), yTop - 4); ctx.lineTo(XT(lim), yBot); ctx.stroke();
    ctx.setLineDash([]);
    chip(`frangibility limit ${lim.toFixed(0)}`, Math.min(XT(lim), W - 64), yTop - 16, INK, 'center', 12);

    // 0축
    ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x0, yTop - 6); ctx.lineTo(x0, yBot + 4); ctx.stroke();

    chip(`CS ${cs}`, XC(cs) - 2, yTop - 14, '#9cc6ff', 'right', 12);
    chip(`CT ${ctv.toFixed(0)}`, x0 + 6, (yTop + yBot) / 2, over ? '#ffd0c4' : '#ffb6a4', 'left', 13);

    // 흠 끝 깊이를 오른쪽 그래프까지 잇는다
    ctx.setLineDash([3, 3]); ctx.strokeStyle = tipInTension ? TENS : OK; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(cx + 6, tipY); ctx.lineTo(XT(TMAX), tipY); ctx.stroke();
    ctx.setLineDash([]);

    // 가로 눈금
    const ay = yBot + 16;
    for (const s of [1000, 500, 0]) text(String(s), XC(s), ay, MUTE, 11, 500, 'center');
    for (const s of [60, 120]) text(String(s), XT(s), ay, MUTE, 11, 500, 'center');
    text('compression, MPa', (XC(CMAX) + x0) / 2, ay + 18, '#9cc6ff', 12, 600, 'center');
    text('tension, MPa (8× zoom)', x0 + tW / 2, ay + 18, '#ffb6a4', 12, 600, 'center');
    // 범례: 압축층은 실제 비율로 얇아 단면 안에 이름표를 달지 않는다
    ctx.fillStyle = COMP; ctx.fillRect(fx0, ay - 5, 12, 10);
    text('compression layer', fx0 + 18, ay, '#9cc6ff', 12, 600);
    ctx.fillStyle = TENS; ctx.fillRect(fx0 + 142, ay - 5, 12, 10);
    text('tension', fx0 + 160, ay, '#ffb6a4', 12, 600);
    text('cross-section drawn to the same depth scale', fx0, ay + 18, MUTE, 11, 500);
  }

  function refresh() {
    for (const el of inputs) {
      const k = el.dataset.in;
      el.value = String(state[k]);
      out(k).textContent = k === 't' ? state.t.toFixed(2) : String(state[k]);
    }
    for (const b of pbtns) b.setAttribute('aria-pressed', String(b.dataset.p === state.preset));
    const tum = state.t * 1000;
    const dolEff = Math.min(state.dol, tum / 2 - 1);
    const ctv = ct(state.cs, dolEff, state.t);
    const lim = ctLimit(state.t);
    draw(ctv, lim, dolEff);
    const tip = state.flaw > dolEff
      ? '<strong>flaw tip in tension</strong>: bending can open it'
      : '<strong>flaw tip in compression</strong>: bending must first cancel CS';
    out('readout').innerHTML =
      `central tension <strong>${ctv.toFixed(0)} MPa</strong> vs limit <strong>${lim.toFixed(0)} MPa</strong>` +
      (ctv > lim ? ' → <strong>frangible risk</strong>' : ` → margin ${(lim - ctv).toFixed(0)} MPa`) + '<br>' + tip;
  }

  for (const el of inputs) {
    el.addEventListener('input', (e) => {
      state[el.dataset.in] = Number(e.target.value);
      state.preset = '';
      refresh();
    });
  }
  for (const b of pbtns) {
    b.addEventListener('click', () => {
      const p = PRESETS.find((q) => q.key === b.dataset.p);
      Object.assign(state, { t: p.t, cs: p.cs, dol: p.dol, preset: p.key });
      refresh();
    });
  }

  refresh();
}

export default mount;
