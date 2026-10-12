// 시뮬레이션 — BOE 의 사업 다섯 갈래를 「매출 규모 × 성장률」 평면에 찍고,
// 2025년 연간과 2026년 상반기를 오가며 어디가 크고 어디가 빠른지를 본다.
//
// 이 그림이 답하는 질문 하나: **공정이 실제로 건너간 사업은 어디에 있는가.**
//
// 가로축은 매출 규모(로그), 세로축은 전년 대비 성장률이다. 로그를 쓰는 까닭은
// 디스플레이 1,664억 위안과 센서 5.87억 위안을 한 화면에 놓아야 하기 때문이고,
// **그 자릿수 차이 자체가 이 그림이 보여주려는 것**이다.
//
// 🔴 수치는 전부 공시 원문 그대로이고 추정·보정이 없다.
// - 2025년 연간: BOE 2025 Annual Report(영문) 제품군별 매출표
// - 2026년 상반기: 京东方 2026 半年度报告(중문) 영업수입 구성표
// 원 단위는 위안이며 화면에는 억 위안으로 적는다. 증감률도 공시가 적은 값을 그대로 쓴다.
//
// 왜 3D 가 아닌가. 대상이 숫자 두 개로 이루어진 좌표라 3차원 물체가 아니다.
// 편집규칙 「3D 음영은 대상이 3차원 물체일 때만」에 따라 평면으로 그린다.
//
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const LAYOUT = {
  article: { W: 620, H: 440 },
  cover: { W: 620, H: 440 },
};

// 공시 원문 수치 (매출 억 위안, 성장률 %)
const DATA = {
  '2025': [
    { k: 'display', label: 'Display Devices', rev: 1664.17, g: 0.86, share: 81.34 },
    { k: 'iot', label: 'IoT Innovation', rev: 389.49, g: 15.14, share: 19.04 },
    { k: 'mled', label: 'MLED', rev: 93.16, g: 9.81, share: 4.55 },
    { k: 'med', label: 'Smart Medicine', rev: 19.02, g: 3.40, share: 0.93 },
    { k: 'sensor', label: 'Sensor', rev: 5.87, g: 52.00, share: 0.29 },
  ],
  '2026H1': [
    { k: 'display', label: 'Display Devices', rev: 817.55, g: -3.20, share: 79.27 },
    { k: 'iot', label: 'IoT Innovation', rev: 190.00, g: 5.75, share: 18.42 },
    { k: 'mled', label: 'MLED', rev: 64.06, g: 47.37, share: 6.21 },
    { k: 'med', label: 'Smart Medicine', rev: 9.57, g: 4.32, share: 0.93 },
    { k: 'sensor', label: 'Sensor', rev: 4.21, g: 88.21, share: 0.41 },
  ],
};

const COLOR = {
  display: '#8a8a80',
  iot: '#3a8fd8',
  mled: '#c9a8e8',
  med: '#b0905a',
  sensor: '#1fdc6a',
};

export function mount(container, params = {}) {
  const COVER = !!params.cover;
  const { W, H } = LAYOUT[COVER ? 'cover' : 'article'];
  const state = { period: params.period === '2025' ? '2025' : '2026H1' };

  container.innerHTML = `
    <div class="sim-head">BOE by segment — how big, how fast</div>
    <div class="sim-body">
      <div class="sim-canvas-wrap"><canvas data-c></canvas></div>
      <div class="sim-controls">
        <div class="sim-toggle-group">
          <label><input type="radio" name="boe-period" value="2025"> FY2025</label>
          <label><input type="radio" name="boe-period" value="2026H1"> H1 2026</label>
        </div>
        <div class="sim-readout" data-out></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('[data-c]');
  const ctx = hidpi(canvas, W, H);
  const out = container.querySelector('[data-out]');
  const radios = [...container.querySelectorAll('input[name="boe-period"]')];
  radios.forEach(r => { r.checked = (r.value === state.period); });

  function label(text, x, y, color, align, size) {
    const s = size || 13;
    ctx.font = '700 ' + s + 'px "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(text).width;
    const px = 5, hh = s * 0.74;
    const lx = align === 'right' ? x - tw - px : align === 'center' ? x - tw / 2 - px : x - px;
    ctx.fillStyle = 'rgba(8,10,12,0.72)';
    ctx.beginPath(); ctx.roundRect(lx, y - hh, tw + px * 2, hh * 2, 4); ctx.fill();
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  function draw() {
    const rows = DATA[state.period];
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    ctx.font = '700 15px "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f4f4ee';
    ctx.fillText(state.period === '2025' ? 'FY2025, as filed' : 'H1 2026, as filed', 20, 26);
    ctx.font = '600 12px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#8a8a80';
    ctx.fillText('x: revenue (log, 100M CNY)   y: year-on-year growth', 20, 44);

    // 플롯 영역
    const L = 58, R = W - 24, T = 66, B = H - 74;
    const LO = 3, HI = 2600;                       // 억 위안
    const gLo = -12, gHi = 100;                    // %
    const px = (v) => L + (R - L) * (Math.log10(v / LO) / Math.log10(HI / LO));
    const py = (g) => B - (B - T) * ((g - gLo) / (gHi - gLo));

    // 0% 선
    ctx.strokeStyle = 'rgba(200,210,220,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(L, py(0)); ctx.lineTo(R, py(0)); ctx.stroke();
    ctx.font = '600 11.5px "IBM Plex Mono", monospace';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#6a6a62';
    ctx.fillText('0%', L - 8, py(0));

    // y 눈금
    for (const g of [25, 50, 75, 100]) {
      ctx.strokeStyle = 'rgba(200,210,220,0.12)';
      ctx.beginPath(); ctx.moveTo(L, py(g)); ctx.lineTo(R, py(g)); ctx.stroke();
      ctx.fillStyle = '#6a6a62';
      ctx.textAlign = 'right';
      ctx.fillText(g + '%', L - 8, py(g));
    }
    // x 눈금
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (const v of [5, 20, 100, 500, 2000]) {
      ctx.strokeStyle = 'rgba(200,210,220,0.12)';
      ctx.beginPath(); ctx.moveTo(px(v), T); ctx.lineTo(px(v), B); ctx.stroke();
      ctx.fillStyle = '#6a6a62';
      ctx.fillText(String(v), px(v), B + 7);
    }
    ctx.fillStyle = '#8a8a80';
    ctx.font = '600 11.5px "IBM Plex Mono", monospace';
    ctx.fillText('100M CNY', px(2000), B + 24);

    // 점
    const sorted = rows.slice().sort((a, b) => b.rev - a.rev);
    for (const d of sorted) {
      const x = px(d.rev), y = py(d.g);
      const r = Math.max(7, Math.min(26, Math.sqrt(d.share) * 6));
      const c = COLOR[d.k];
      const gl = ctx.createRadialGradient(x, y, 0, x, y, r * 1.9);
      gl.addColorStop(0, c + '66');
      gl.addColorStop(1, c + '00');
      ctx.fillStyle = gl;
      ctx.beginPath(); ctx.arc(x, y, r * 1.9, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = c;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1.4; ctx.stroke();
    }
    // 라벨 — 0% 선 근처에서 셋이 뭉쳐 겹쳤다(2026-10-09 실측).
    // 점이 다섯뿐이라 사업마다 방향을 고정해 둔다. 위·아래·좌·우로 흩는다.
    // 🔴 side 는 「점의 어느 쪽에 두는가」이고, 그때 글자 정렬은 반대가 되어야 한다.
    // side 를 그대로 align 으로 넘겼더니 오른쪽에 둔 글자가 왼쪽으로 뻗어 점을 덮었다(실측).
    const PLACE = {
      sensor: { side: 'right', dy: 0 },
      // dy 가 음수면 점 위, 양수면 점 아래에 둔다.
      // 디스플레이를 아래에 두면 x축 눈금과, 스마트의공을 왼쪽에 두면 y축 눈금과 겹친다.
      mled: { side: 'center', dy: -1 },
      iot: { side: 'center', dy: -1 },
      display: { side: 'center', dy: -1 },
      med: { side: 'center', dy: 1 },
    };
    for (const d of sorted) {
      const x = px(d.rev), y = py(d.g);
      const r = Math.max(7, Math.min(26, Math.sqrt(d.share) * 6));
      const pl = PLACE[d.k];
      const val = d.rev.toFixed(d.rev < 100 ? 2 : 0) + '  ·  ' + (d.g > 0 ? '+' : '') + d.g.toFixed(2) + '%';
      if (pl.side === 'center') {
        const y0 = pl.dy < 0 ? y - r - 30 : y + r + 14;
        label(d.label, x, y0, COLOR[d.k], 'center', 12.5);
        label(val, x, y0 + 17, 'rgba(244,244,238,0.74)', 'center', 11.5);
      } else {
        const lx = pl.side === 'right' ? x + r + 8 : x - r - 8;
        const al = pl.side === 'right' ? 'left' : 'right';
        label(d.label, lx, y, COLOR[d.k], al, 12.5);
        label(val, lx, y + 17, 'rgba(244,244,238,0.74)', al, 11.5);
      }
    }

    // 사분면 설명은 왼쪽 위 하나만 둔다 — 오른쪽 안내는 디스플레이 점과 겹쳤다(실측).
    label('small but fast', L + 10, T + 14, 'rgba(244,244,238,0.6)', 'left', 11.5);

    const sensor = rows.find(d => d.k === 'sensor');
    const four = rows.filter(d => d.k !== 'display').reduce((a, d) => a + d.share, 0);
    out.innerHTML =
      'four new tracks = <b>' + four.toFixed(2) + '%</b> of revenue' +
      ' · of that, IoT Innovation alone is <b>' + rows.find(d => d.k === 'iot').share.toFixed(2) + '%</b>' +
      '<br>Sensor — the one running on display process lines — is <b>' + sensor.share.toFixed(2) + '%</b>' +
      ' and grew <b>' + (sensor.g > 0 ? '+' : '') + sensor.g.toFixed(2) + '%</b>';
  }

  radios.forEach(r => r.addEventListener('change', () => {
    if (r.checked) { state.period = r.value; draw(); }
  }));
  draw();
}
