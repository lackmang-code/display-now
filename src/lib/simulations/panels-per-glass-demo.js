// 시뮬레이션 — 유리원장 한 장에서 패널을 몇 장 떠낼 수 있는지를, 패널 사이에 비우는
// 여유만 바꿔 가며 직접 세어 보는 것.
//
// 이 그림이 답하는 질문 하나:
//   **면취효율 75% → 93%라는 격차는 무엇이 만들어 내는가.**
//
// 결과: 같은 유리(8.6세대 2620x2290), 같은 패널(23.5인치 16:10)에서
//   여유 0~10mm  -> 35장, 93.4%   (LG디스플레이가 말한 "93% 이상")
//   여유 12~16mm -> 30장, 80.1%
//   여유 18mm 이상 -> 28장, 74.7%  (LG디스플레이가 말한 "약 75%")
// 즉 격차를 만드는 변수는 원장을 자르는지 여부가 아니라 **패널 사이에 비우는 여유**다.
// 그 여유가 바로 FMM 이 마스크 인장과 섀도 때문에 요구하던 여백이다.
//
// 🔴 이 값은 기요틴 절단을 가정한 2단 배치의 최댓값이고, 실제 패널 설계의 면취표가 아니다.
//    회사가 종횡비와 여유를 밝히지 않았으므로, 이 그림은 발표치를 검증하는 것이 아니라
//    **그 숫자가 어느 가정에서 나오는지를 좁히는 것**이다.
//
// 화면에 찍히는 문자열은 전부 영어다. 고지문은 원고의 <template data-sim-note> 에 있다.

import { hidpi } from './_hidpi.js';

const LAYOUT = {
  article: { W: 300, H: 300 },
  cover: { W: 300, H: 300 },
};

// 8.6세대 풀 원장 (mm). 긴 변을 가로로 눕힌다.
const GW = 2620;
const GH = 2290;
const MOTHER = GW * GH;

const AR = {
  '16:10': [16, 10],
  '16:9': [16, 9],
};

const INK = '#f4f3ee';
const MUTE = '#a4a49a';
const LINE = '#55554d';
const GREEN = '#7fc79a';
const GREEN_D = '#2f4a3a';
const WARN = '#e58b72';
const WARN_D = '#4a2f26';

function panelSize(diagIn, aw, ah) {
  const d = diagIn * 25.4;
  const k = Math.hypot(aw, ah);
  return [(d * aw) / k, (d * ah) / k];
}

// 기요틴 2단 배치의 최댓값. 셀 크기에 여유를 포함하고, 그린 패널은 셀에서 여유를 뺀 것.
function pack(gw, gh, pw, ph, m) {
  let best = { n: -1 };
  const opts = [
    [pw + m, ph + m],
    [ph + m, pw + m],
  ];
  for (const [a, b] of opts) {
    const nc = Math.floor(gw / a);
    const nr = Math.floor(gh / b);
    const base = nc * nr;
    const rw = gw - nc * a;
    const bh = gh - nr * b;
    for (const [c, d] of opts) {
      const scR = Math.floor(rw / c);
      const srR = Math.floor(gh / d);
      if (base + scR * srR > best.n) {
        best = { n: base + scR * srR, a, b, nc, nr, c, d, sc: scR, sr: srR, ox: nc * a, oy: 0 };
      }
      const scB = Math.floor(gw / c);
      const srB = Math.floor(bh / d);
      if (base + scB * srB > best.n) {
        best = { n: base + scB * srB, a, b, nc, nr, c, d, sc: scB, sr: srB, ox: 0, oy: nr * b };
      }
    }
  }
  return best;
}

export function mount(container, params = {}) {
  const COVER = !!params.cover;
  const { W, H } = LAYOUT[COVER ? 'cover' : 'article'];
  const state = {
    ar: params.ar === '16:9' ? '16:9' : '16:10',
    marginMm: params.marginMm ?? 4,
    diagIn: params.diagIn ?? 23.5,
  };

  container.innerHTML = `
    <div class="sim-head">What makes the 75 to 93 percent gap</div>
    <div class="sim-body">
      <div class="sim-canvas-wrap"><canvas data-c></canvas></div>
      <div class="sim-controls">
        <div class="sim-toggle-group">
          <label><input type="radio" name="ppg-ar" value="16:10"> 16:10</label>
          <label><input type="radio" name="ppg-ar" value="16:9"> 16:9</label>
        </div>
        <div class="sim-control">
          <label>Gap between panels <span data-out="margin"></span> mm</label>
          <input type="range" min="0" max="30" step="1" data-in="margin" />
        </div>
        <div class="sim-control">
          <label>Panel diagonal <span data-out="diag"></span> in</label>
          <input type="range" min="13" max="34" step="0.5" data-in="diag" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('[data-c]');
  const ctx = hidpi(canvas, W, H);

  function calc() {
    const [aw, ah] = AR[state.ar];
    const [pw, ph] = panelSize(state.diagIn, aw, ah);
    const lay = pack(GW, GH, pw, ph, state.marginMm);
    const eff = (lay.n * pw * ph) / MOTHER * 100;
    return { pw, ph, lay, eff };
  }

  function draw() {
    const { pw, ph, lay, eff } = calc();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    const pad = 20;
    const topY = 46;
    const s = Math.min((W - pad * 2) / GW, (H - topY - 76) / GH);
    const ox = pad;
    const oy = topY;

    ctx.font = '12px "IBM Plex Mono", monospace';
    ctx.fillStyle = MUTE;
    ctx.fillText('Gen 8.6 full glass  2620 x 2290 mm', ox, topY - 22);
    ctx.fillText(
      state.diagIn.toFixed(1) + ' in ' + state.ar + '  ' +
        pw.toFixed(0) + ' x ' + ph.toFixed(0) + ' mm',
      ox,
      topY - 7
    );

    // 원장
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1.2;
    ctx.strokeRect(ox, oy, GW * s, GH * s);

    const hot = eff >= 90;
    ctx.fillStyle = hot ? GREEN_D : WARN_D;
    ctx.strokeStyle = hot ? GREEN : WARN;
    ctx.lineWidth = 0.8;

    const m = state.marginMm;
    // 기본 격자
    for (let c = 0; c < lay.nc; c++) {
      for (let r = 0; r < lay.nr; r++) {
        const x = ox + (c * lay.a) * s;
        const y = oy + (r * lay.b) * s;
        const w = (lay.a - m) * s;
        const h = (lay.b - m) * s;
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
      }
    }
    // 남은 띠
    for (let c = 0; c < lay.sc; c++) {
      for (let r = 0; r < lay.sr; r++) {
        const x = ox + (lay.ox + c * lay.c) * s;
        const y = oy + (lay.oy + r * lay.d) * s;
        const w = (lay.c - m) * s;
        const h = (lay.d - m) * s;
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
      }
    }

    // 발표치 두 선
    const barY = oy + GH * s + 26;
    const barX = ox;
    const barW = GW * s;
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, 12);
    const fill = Math.max(0, Math.min(1, (eff - 60) / 40)); // 60~100% 구간
    ctx.fillStyle = hot ? GREEN : WARN;
    ctx.fillRect(barX, barY, barW * fill, 12);
    [['75', 75], ['93', 93]].forEach(([lab, v]) => {
      const x = barX + barW * ((v - 60) / 40);
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x, barY - 4);
      ctx.lineTo(x, barY + 16);
      ctx.stroke();
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.fillStyle = MUTE;
      ctx.textAlign = 'center';
      ctx.fillText(lab, x, barY + 29);
      ctx.textAlign = 'left';
    });
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = LINE;
    ctx.fillText('stated figures', barX, barY - 8);
  }

  function render() {
    const { lay, eff } = calc();
    container.querySelector('[data-out="margin"]').textContent = state.marginMm;
    container.querySelector('[data-out="diag"]').textContent = state.diagIn.toFixed(1);

    let verdict;
    if (eff >= 93) verdict = 'matches the stated 93 percent';
    else if (eff <= 76 && eff >= 73) verdict = 'matches the stated 75 percent';
    else verdict = 'between the two stated figures';

    container.querySelector('[data-out="readout"]').innerHTML =
      'Panels per glass <b>' + lay.n + '</b><br />' +
      'Panel area over glass area <b>' + eff.toFixed(1) + '%</b><br />' +
      '<span style="color:' + (eff >= 90 ? GREEN : MUTE) + '">' + verdict + '</span>';
    draw();
  }

  [...container.querySelectorAll('input[name="ppg-ar"]')].forEach((r) => {
    r.checked = r.value === state.ar;
    r.addEventListener('change', () => {
      state.ar = r.value;
      render();
    });
  });

  const mIn = container.querySelector('[data-in="margin"]');
  const dIn = container.querySelector('[data-in="diag"]');
  mIn.value = state.marginMm;
  dIn.value = state.diagIn;
  mIn.addEventListener('input', (e) => {
    state.marginMm = Number(e.target.value);
    render();
  });
  dIn.addEventListener('input', (e) => {
    state.diagIn = Number(e.target.value);
    render();
  });

  render();
}

export default mount;
