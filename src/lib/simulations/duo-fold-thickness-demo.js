// 시뮬레이션 — 아이폰 듀오가 갤럭시 Z폴드8 계열보다 두꺼운 이유를 후보별로 지워 보는 장치다.
// 이 기사 「아이폰 듀오는 왜 갤럭시 Z폴드8 울트라보다 두꺼운가」 절의 논지를 그대로 옮겼다.
//
// 수치는 전부 공개 사양이고 계산은 뺄셈뿐이다
// - 아이폰 듀오: 펼침 5.2mm · 접힘 11.3mm (Apple 공식 사양)
// - 갤럭시 Z폴드8 울트라: 펼침 4.1mm · 접힘 8.9mm · 듀얼 배터리 5,000mAh (AppleInsider 비교)
// - 갤럭시 Z폴드8: 펼침 4.5mm · 접힘 9.7mm · IP48 (시사저널e 비교)
// - 「틈」 = 접힘 두께 − 펼침 두께 × 2. 힌지 부위와 회사별 측정 기준 차이가 모두 이 안에 섞인
//   나머지 값이지, 실제로 비어 있는 공간의 치수가 아니다.
//
// 그리지 않은 것
// - 판 한 장 안에서 무엇이 몇 mm 를 차지하는지는 공개되지 않았다. 그래서 판은 한 덩어리로 그렸다.
// - 배터리 용량과 방수 밀봉이 두께를 얼마나 더하는지는 어느 자료에도 없다. 두 후보는 끝까지
//   「?」로 남긴다. 비율을 지어내면 창작이 된다.
// - 폭(가로 길이)은 비율과 무관하다. 두께 방향만 실제 비율이다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const W = 440;
const H = 350;

const DUO = { name: 'iPhone Duo', open: 5.2, closed: 11.3, dual: true };
const RIVALS = {
  ultra: { name: 'Z Fold8 Ultra', open: 4.1, closed: 8.9, dual: true, ip: null },
  fold8: { name: 'Z Fold8', open: 4.5, closed: 9.7, dual: null, ip: 'IP48' },
};

const INK = 'rgba(244,243,238,0.92)';
const DIM = 'rgba(244,243,238,0.58)';
const FAINT = 'rgba(244,243,238,0.32)';
const LINE = 'rgba(244,243,238,0.20)';
const C_DUO = '#8fb8d8';
const C_RIVAL = '#b7b2a6';
const C_HALF = '#d9a36a';
const C_GAP = 'rgba(244,243,238,0.40)';
const C_OUT = '#8fb59a';

export function mount(container, params = {}) {
  const state = {
    rival: params.rival ?? 'ultra',
    pen: params.pen ?? false,
    count: params.count ?? false,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Folded thickness to scale. Rule out what the specs can rule out.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Compare iPhone Duo with</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-rival="ultra" aria-pressed="false">Z Fold8 Ultra</button>
            <button type="button" class="sim-toggle-btn" data-rival="fold8" aria-pressed="false">Z Fold8</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Rule out a suspect</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-suspect="pen" aria-pressed="false">Pen</button>
            <button type="button" class="sim-toggle-btn" data-suspect="count" aria-pressed="false">Battery count</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const readout = container.querySelector('[data-out="readout"]');
  const rivalBtns = Array.from(container.querySelectorAll('[data-rival]'));
  const suspectBtns = Array.from(container.querySelectorAll('[data-suspect]'));

  const S = 17;        // px per mm, 두께 방향만
  const BASE = 236;    // 세 기둥의 바닥선
  const COL_W = 104;
  const COLS = [30, 168, 306];

  const f1 = (v) => v.toFixed(1);

  function slab(x, yBottom, mm, fill, label) {
    const h = mm * S;
    ctx.fillStyle = fill;
    ctx.fillRect(x, yBottom - h, COL_W, h);
    if (label && h >= 11) {
      ctx.fillStyle = 'rgba(20,20,16,0.85)';
      ctx.font = '600 10.5px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + COL_W / 2, yBottom - h / 2 + 3.5);
    }
    return yBottom - h;
  }

  function gapBand(x, yBottom, mm, label) {
    const h = mm * S;
    ctx.strokeStyle = C_GAP;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(x + 0.5, yBottom - h + 0.5, COL_W - 1, Math.max(1, h - 1));
    ctx.setLineDash([]);
    if (label) {
      ctx.fillStyle = DIM;
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + COL_W / 2, yBottom - h / 2 + 3.5);
    }
    return yBottom - h;
  }

  function column(x, dev, color) {
    const gap = dev.closed - dev.open * 2;
    let y = BASE;
    y = slab(x, y, dev.open, color, f1(dev.open) + ' mm');
    y = gapBand(x, y, gap, 'gap ' + f1(gap));
    y = slab(x, y, dev.open, color, f1(dev.open) + ' mm');
    ctx.fillStyle = INK;
    ctx.font = '600 11.5px "IBM Plex Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(dev.name, x + COL_W / 2, y - 20);
    ctx.fillStyle = DIM;
    ctx.font = '10.5px "IBM Plex Mono", monospace';
    ctx.fillText(f1(dev.closed) + ' mm folded', x + COL_W / 2, y - 7);
  }

  function draw() {
    const r = RIVALS[state.rival];
    const dHalf = DUO.open - r.open;
    const dGap = (DUO.closed - DUO.open * 2) - (r.closed - r.open * 2);
    const dAll = DUO.closed - r.closed;
    const pct = Math.round((dAll / r.closed) * 100);

    ctx.clearRect(0, 0, W, H);

    // 바닥선
    ctx.strokeStyle = LINE;
    ctx.beginPath();
    ctx.moveTo(20, BASE + 0.5);
    ctx.lineTo(W - 20, BASE + 0.5);
    ctx.stroke();

    column(COLS[0], DUO, C_DUO);
    column(COLS[1], r, C_RIVAL);

    // 차이 기둥: 판 + 틈 + 판
    let y = BASE;
    y = slab(COLS[2], y, dHalf, C_HALF, '+' + f1(dHalf));
    y = gapBand(COLS[2], y, dGap, '');
    y = slab(COLS[2], y, dHalf, C_HALF, '+' + f1(dHalf));
    ctx.fillStyle = INK;
    ctx.font = '600 11.5px "IBM Plex Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Difference', COLS[2] + COL_W / 2, y - 20);
    ctx.fillStyle = C_HALF;
    ctx.font = '10.5px "IBM Plex Mono", monospace';
    ctx.fillText('+' + f1(dAll) + ' mm (+' + pct + '%)', COLS[2] + COL_W / 2, y - 7);

    // 차이의 내역
    ctx.textAlign = 'center';
    ctx.fillStyle = DIM;
    ctx.font = '10.5px "IBM Plex Mono", monospace';
    ctx.fillText(
      'halves ' + f1(dHalf * 2) + ' + gap ' + f1(dGap),
      COLS[2] + COL_W / 2, BASE + 15,
    );
    ctx.fillStyle = FAINT;
    ctx.fillText('thickness to scale', COLS[0] + COL_W / 2, BASE + 15);
    ctx.fillText('width not to scale', COLS[1] + COL_W / 2, BASE + 15);

    // 후보 목록
    const rows = [
      {
        name: 'Pen',
        out: state.pen,
        yes: 'ruled out: no digitizer layer',
        no: 'press "Pen" to test',
      },
      {
        name: 'Battery count',
        out: state.count && r.dual === true,
        yes: 'ruled out: both use two batteries',
        no: state.count && r.dual !== true
          ? 'cannot rule out: ' + r.name + ' count not confirmed'
          : 'press "Battery count" to test',
      },
      {
        name: 'Battery capacity',
        out: false,
        no: '? Apple has not disclosed mAh',
      },
      {
        name: 'Sealing (IP68)',
        out: false,
        no: r.ip ? '? ' + r.name + ' is ' + r.ip + ', mm cost unknown' : '? ' + r.name + ' rating not confirmed',
      },
    ];

    let ry = BASE + 42;
    ctx.textAlign = 'left';
    for (const row of rows) {
      const isQ = row.name === 'Battery capacity' || row.name.startsWith('Sealing');
      ctx.font = '600 11px "IBM Plex Sans KR", sans-serif';
      ctx.fillStyle = row.out ? FAINT : isQ ? C_HALF : INK;
      ctx.fillText(row.name, 30, ry);
      if (row.out) {
        const w = ctx.measureText(row.name).width;
        ctx.strokeStyle = FAINT;
        ctx.beginPath();
        ctx.moveTo(28, ry - 4);
        ctx.lineTo(32 + w, ry - 4);
        ctx.stroke();
      }
      ctx.font = '10.5px "IBM Plex Mono", monospace';
      ctx.fillStyle = row.out ? C_OUT : DIM;
      ctx.fillText(row.out ? row.yes : row.no, 150, ry);
      ry += 18;
    }

    const cleared = state.pen && state.count && r.dual === true;
    readout.innerHTML = cleared
      ? `Still unassigned: <b>+${f1(dHalf)} mm per half</b> &middot; capacity or sealing, not decidable from specs`
      : `Duo vs ${r.name}: <b>+${f1(dAll)} mm folded</b> &middot; +${f1(dHalf)} per half, +${f1(dGap)} gap`;
  }

  function sync() {
    rivalBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.rival === state.rival)));
    suspectBtns.forEach((b) => b.setAttribute('aria-pressed', String(!!state[b.dataset.suspect])));
    draw();
  }

  rivalBtns.forEach((b) => b.addEventListener('click', () => { state.rival = b.dataset.rival; sync(); }));
  suspectBtns.forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.suspect;
    state[k] = !state[k];
    sync();
  }));

  sync();
}
