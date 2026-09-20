// 시뮬레이션 — 성숙 노드 한 장(300mm 웨이퍼)에서 구동칩이 몇 개 나오는지 센다.
// 이 기사 「폴더블이 늘수록 구동칩이 더 필요한가」 절에서 말한
// 「칩이 커지면 웨이퍼 한 장에서 나오는 개수가 줄어 같은 캐파로 덜 만든다」를 눈으로 보는 장치다.
//
// 계산은 기하뿐이다
// - 지름 300mm 원 안에 직사각형 다이를 격자로 채우고, 네 꼭짓점이 모두 원 안에 드는 것만 센다.
// - 가장자리 3mm 는 쓰지 않는 것으로 두었다(업계 통상값). 스크라이브 폭은 다이 치수에 포함된 것으로 본다.
// - 노드 전환은 「다이 면적이 얼마나 줄어드는가」 하나로만 표현한다. 가로·세로를 같은 비율로 줄인다.
//
// 공개되지 않은 값은 상수로 박지 않고 슬라이더로 드러냈다
// - 구동칩의 실제 치수는 공개되지 않는다. 길고 가는 막대 모양이라는 것만 알려져 있다.
// - 28나노에서 22나노로 옮길 때 실제 면적이 얼마나 줄었는지도 공개되지 않았다.
// - 월 웨이퍼 투입량도 회사별로 공개되지 않는다.
//
// 그리지 않은 것: 수율, 웨이퍼당 불량, 패키징 캐파. 여기 나오는 값은 전부 「잘라낼 수 있는 최대 개수」다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const W = 440;
const H = 366;

const WAFER_MM = 300;
const EDGE_MM = 3;          // 가장자리 제외 폭

const INK = 'rgba(244,243,238,0.92)';
const DIM = 'rgba(244,243,238,0.58)';
const FAINT = 'rgba(244,243,238,0.30)';
const C_DIE = '#8fb8d8';
const C_DIE2 = '#e0a070';

export function mount(container, params = {}) {
  const state = {
    wmm: params.wmm ?? 4.0,     // 다이 짧은 변(mm)
    hmm: params.hmm ?? 24,      // 다이 긴 변(mm)
    shrink: params.shrink ?? 0.75, // 면적 비율(1 = 그대로)
    wafers: params.wafers ?? 15000,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Geometry only: how many driver ICs fit on one 300 mm wafer.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Die short side &mdash; <span data-out="wmm"></span> mm</label>
          <input type="range" min="10" max="60" step="1" data-in="wmm" />
        </div>
        <div class="sim-control">
          <label>Die long side &mdash; <span data-out="hmm"></span> mm</label>
          <input type="range" min="60" max="300" step="2" data-in="hmm" />
        </div>
        <div class="sim-control">
          <label>Area after a node move &mdash; <span data-out="shrink"></span> of the original</label>
          <input type="range" min="50" max="100" step="1" data-in="shrink" />
        </div>
        <div class="sim-control">
          <label>Wafer starts per month &mdash; <span data-out="wafers"></span></label>
          <input type="range" min="1000" max="30000" step="500" data-in="wafers" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const $ = (s) => container.querySelector(s);
  const inp = {
    wmm: $('[data-in="wmm"]'),
    hmm: $('[data-in="hmm"]'),
    shrink: $('[data-in="shrink"]'),
    wafers: $('[data-in="wafers"]'),
  };
  inp.wmm.value = String(Math.round(state.wmm * 10));
  inp.hmm.value = String(Math.round(state.hmm * 10));
  inp.shrink.value = String(Math.round(state.shrink * 100));
  inp.wafers.value = String(state.wafers);

  const CX = 150, CY = 172, R_PX = 130;
  const scale = R_PX / (WAFER_MM / 2);

  // 원 안에 네 꼭짓점이 모두 드는 다이만 센다
  function layout(dw, dh) {
    const r = WAFER_MM / 2 - EDGE_MM;
    const nx = Math.ceil(WAFER_MM / dw) + 2;
    const ny = Math.ceil(WAFER_MM / dh) + 2;
    const out = [];
    for (let i = -nx; i <= nx; i += 1) {
      for (let j = -ny; j <= ny; j += 1) {
        const x0 = i * dw, y0 = j * dh;
        const x1 = x0 + dw, y1 = y0 + dh;
        const ok = [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]
          .every(([x, y]) => Math.hypot(x, y) <= r);
        if (ok) out.push([x0, y0, dw, dh]);
      }
    }
    return out;
  }

  function draw() {
    state.wmm = Number(inp.wmm.value) / 10;
    state.hmm = Number(inp.hmm.value) / 10;
    state.shrink = Number(inp.shrink.value) / 100;
    state.wafers = Number(inp.wafers.value);

    const k = Math.sqrt(state.shrink);           // 면적 비율 -> 변 비율
    const base = layout(state.wmm, state.hmm);
    const moved = layout(state.wmm * k, state.hmm * k);

    ctx.clearRect(0, 0, W, H);

    // 웨이퍼
    ctx.fillStyle = 'rgba(244,243,238,0.06)';
    ctx.beginPath();
    ctx.arc(CX, CY, R_PX, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(244,243,238,0.45)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.strokeStyle = FAINT;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(CX, CY, (WAFER_MM / 2 - EDGE_MM) * scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 다이 배치: 축소 전은 테두리만, 축소 후는 채움
    ctx.strokeStyle = 'rgba(143,184,216,0.75)';
    ctx.lineWidth = 0.8;
    for (const [x, y, w, h] of base) {
      ctx.strokeRect(CX + x * scale, CY + y * scale, w * scale, h * scale);
    }
    if (state.shrink < 1) {
      ctx.fillStyle = 'rgba(224,160,112,0.42)';
      for (const [x, y, w, h] of moved) {
        ctx.fillRect(CX + x * scale, CY + y * scale, w * scale, h * scale);
      }
    }

    // 오른쪽 수치판
    const px = 300;
    ctx.textAlign = 'left';
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = DIM;
    ctx.fillText('300 mm wafer', px, 60);
    ctx.fillText('edge 3 mm unused', px, 76);

    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.fillStyle = C_DIE;
    ctx.fillText('Before the node move', px, 106);
    ctx.font = '600 17px "IBM Plex Mono", monospace';
    ctx.fillStyle = INK;
    ctx.fillText(base.length.toLocaleString(), px, 128);
    ctx.font = '10.5px "IBM Plex Mono", monospace';
    ctx.fillStyle = DIM;
    ctx.fillText('dies per wafer', px, 144);

    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.fillStyle = C_DIE2;
    ctx.fillText('After the node move', px, 176);
    ctx.font = '600 17px "IBM Plex Mono", monospace';
    ctx.fillStyle = INK;
    ctx.fillText(moved.length.toLocaleString(), px, 198);
    ctx.font = '10.5px "IBM Plex Mono", monospace';
    ctx.fillStyle = DIM;
    const gain = base.length ? Math.round((moved.length / base.length - 1) * 100) : 0;
    ctx.fillText((gain >= 0 ? '+' : '') + gain + '% per wafer', px, 214);

    // 월 환산
    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.fillStyle = FAINT;
    ctx.fillText('At this wafer start rate', px, 246);
    ctx.font = '600 13px "IBM Plex Mono", monospace';
    ctx.fillStyle = DIM;
    const perMonth = (moved.length || base.length) * state.wafers;
    ctx.fillText((perMonth / 1e6).toFixed(1) + ' M chips', px, 266);
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillStyle = FAINT;
    ctx.fillText('per month, before yield', px, 281);

    ctx.textAlign = 'left';
    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.fillStyle = FAINT;
    ctx.fillText('Die size and the real shrink are not disclosed.', 20, 328);
    ctx.fillText('Move the sliders to see the range, not a number.', 20, 346);

    $('[data-out="wmm"]').textContent = state.wmm.toFixed(1);
    $('[data-out="hmm"]').textContent = state.hmm.toFixed(1);
    $('[data-out="shrink"]').textContent = state.shrink.toFixed(2);
    $('[data-out="wafers"]').textContent = state.wafers.toLocaleString();
    $('[data-out="readout"]').innerHTML =
      `Die ${state.wmm.toFixed(1)} &times; ${state.hmm.toFixed(1)} mm &nbsp;&middot;&nbsp; <b>${(moved.length || base.length).toLocaleString()}</b> dies per wafer`;
  }

  Object.values(inp).forEach((el) => el.addEventListener('input', draw));
  draw();
}
