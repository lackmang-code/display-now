// 시뮬레이션 — 청색 OLED와 양자점 색변환층 사이가 멀어지면 왜 색이 섞이는가.
// 비스듬히 나간 청색이 제 화소의 양자점 창이 아니라 옆 화소의 창에 떨어지는 비율을 본다.
//
// 모델과 한계
// - 단면 한 장(2차원)으로 계산한다. 화소는 한 방향으로만 반복된다.
// - OLED 개구와 위쪽 양자점 창의 폭을 같게 둔다. 둘 다 부화소 간격 x 개구율이다.
// - 발광은 램버시안으로 둔다. 2차원 단면에서 각도별 세기는 cos(theta)에 비례한다.
// - 굴절·전반사·흡수를 넣지 않았다. 사이 층의 굴절률을 모르는 채 넣으면 그 값이 곧
//   추정 상수가 되기 때문이다. 실제로는 굴절률 차이로 큰 각도가 잘려 옆으로 가는 빛이 줄어든다.
//   그래서 이 그림의 비율은 절대값이 아니라 「거리 나누기 간격」에 따라 어떻게 움직이는가를 본다.
// - 창 밖에 떨어진 빛은 격벽·차광층이 받는다고 셈한다.
// - 숨은 추정 상수는 없다. 세 값(거리·간격·개구율)은 전부 손잡이다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const LAYOUT = {
  article: { W: 440, H: 330 },
  cover: { W: 440, H: 330 },
};

const N_X = 60; // 개구 안 출발점 표본 수
const N_T = 720; // 각도 표본 수
const T_MAX = (89.5 * Math.PI) / 180;

function landing(gap, pitch, aperture) {
  const e = aperture * pitch; // 개구 폭 = 창 폭
  let own = 0;
  let nb = 0;
  let blk = 0;
  let tot = 0;
  for (let i = 0; i < N_X; i++) {
    const x0 = -e / 2 + (e * (i + 0.5)) / N_X;
    for (let j = 0; j < N_T; j++) {
      const t = -T_MAX + (2 * T_MAX * (j + 0.5)) / N_T;
      const w = Math.cos(t);
      tot += w;
      const x = x0 + gap * Math.tan(t);
      const k = Math.round(x / pitch);
      if (Math.abs(x - k * pitch) <= e / 2) {
        if (k === 0) own += w;
        else nb += w;
      } else blk += w;
    }
  }
  return { own: own / tot, nb: nb / tot, blk: blk / tot };
}

export function mount(container, params = {}) {
  const L = LAYOUT[params.cover ? 'cover' : 'article'];
  const { W, H } = L;

  const state = {
    gap: params.gap ?? 10,
    pitch: params.pitch ?? 120,
    ap: params.ap ?? 60,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Blue light leaves the OLED at every angle. Where does it land on the quantum dot layer?</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Gap to dot layer <span data-out="gap"></span> &micro;m</label>
          <input type="range" min="0" max="60" step="0.5" data-in="gap" />
        </div>
        <div class="sim-control">
          <label>Subpixel pitch <span data-out="pitch"></span> &micro;m</label>
          <input type="range" min="40" max="200" step="1" data-in="pitch" />
        </div>
        <div class="sim-control">
          <label>Aperture <span data-out="ap"></span>%</label>
          <input type="range" min="30" max="90" step="1" data-in="ap" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inp = (k) => container.querySelector(`[data-in="${k}"]`);
  inp('gap').value = String(state.gap);
  inp('pitch').value = String(state.pitch);
  inp('ap').value = String(state.ap);

  const COL = {
    bg: '#0d0d0a',
    ink: 'rgba(236,236,237,0.92)',
    dim: 'rgba(162,162,168,0.85)',
    blue: '#5b8cff',
    own: '#6fd08c',
    nb: '#f06a5a',
    blk: 'rgba(150,150,150,0.55)',
    bank: '#3b3b38',
  };

  function draw(res) {
    const p = state.pitch;
    const g = state.gap;
    const a = state.ap / 100;
    const e = a * p;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    // 가로는 부화소 세 개가 들어가게 잡는다. 같은 배율로 높이를 그리면 실제 비율(거리 10 대 간격 120)에서
    // 사이가 몇 픽셀짜리 띠가 되어 광선이 보이지 않는다(2026-09-14 확인). 그래서 높이만 정수배로 키우고
    // 그 배율을 캔버스에 적는다. 착지 위치는 확대 전 실제 기하로 계산한 값이라 틀리지 않는다.
    const left = 20;
    const right = W - 20;
    const baseY = 206;
    const s = (right - left) / (3 * p);
    const drawnTarget = 120;
    const k = g <= 0 ? 1 : Math.max(1, Math.min(40, Math.round(drawnTarget / (g * s))));
    const cx = (left + right) / 2;
    const X = (um) => cx + um * s;
    const topY = baseY - g * s * k;

    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.fillStyle = COL.ink;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('cross section, one pixel row', left, 22);
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = k > 1 ? '#e0b45a' : COL.dim;
    ctx.fillText(k > 1 ? `height drawn x${k}, landing points to scale` : 'drawn to scale', left, 38);

    // 위쪽: 양자점 창과 격벽
    ctx.save();
    ctx.beginPath();
    ctx.rect(left, 0, right - left, H);
    ctx.clip();
    // 가운데 = 녹색 양자점, 오른쪽 = 투과(청색), 왼쪽 = 적색 양자점 순으로 반복
    const tint = ['rgba(111,208,140,0.6)', 'rgba(91,140,255,0.35)', 'rgba(240,106,90,0.55)'];
    for (let k = -3; k <= 3; k++) {
      const c = k * p;
      ctx.fillStyle = COL.bank;
      ctx.fillRect(X(c + e / 2), topY - 12, (p - e) * s, 12);
      ctx.fillStyle = tint[((k % 3) + 3) % 3];
      ctx.fillRect(X(c - e / 2), topY - 12, e * s, 12);
    }
    // 아래쪽: OLED 개구
    for (let k = -3; k <= 3; k++) {
      const c = k * p;
      ctx.fillStyle = k === 0 ? COL.blue : 'rgba(91,140,255,0.35)';
      ctx.fillRect(X(c - e / 2), baseY, e * s, 7);
    }
    ctx.fillStyle = 'rgba(236,236,237,0.10)';
    ctx.fillRect(left, baseY + 7, right - left, 6);

    // 광선: 가운데 개구에서 나간 빛의 표본
    const starts = [-e / 3, 0, e / 3];
    for (const x0 of starts) {
      for (let d = -80; d <= 80; d += 8) {
        const t = (d * Math.PI) / 180;
        const x = x0 + g * Math.tan(t);
        const k = Math.round(x / p);
        const inside = Math.abs(x - k * p) <= e / 2;
        const color = inside ? (k === 0 ? COL.own : COL.nb) : COL.blk;
        ctx.globalAlpha = 0.25 + 0.6 * Math.cos(t);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(X(x0), baseY);
        ctx.lineTo(X(x), topY);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // 이름표
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = COL.dim;
    ctx.textAlign = 'right';
    ctx.fillText('quantum dot windows + banks', right, Math.max(52, topY - 18));
    ctx.fillText('blue OLED openings', right, baseY + 26);

    // 결과 막대
    const by = 262;
    const bw = right - left;
    let x = left;
    [
      [res.own, COL.own],
      [res.nb, COL.nb],
      [res.blk, COL.blk],
    ].forEach(([v, c]) => {
      ctx.fillStyle = c;
      ctx.fillRect(x, by, v * bw, 16);
      x += v * bw;
    });
    ctx.strokeStyle = 'rgba(236,236,237,0.25)';
    ctx.strokeRect(left + 0.5, by + 0.5, bw - 1, 15);
    ctx.textAlign = 'left';
    ctx.fillStyle = COL.own;
    ctx.fillText(`own ${(res.own * 100).toFixed(1)}%`, left, by + 34);
    ctx.fillStyle = COL.nb;
    ctx.textAlign = 'center';
    ctx.fillText(`neighbor ${(res.nb * 100).toFixed(1)}%`, (left + right) / 2, by + 34);
    ctx.fillStyle = 'rgba(190,190,190,0.9)';
    ctx.textAlign = 'right';
    ctx.fillText(`bank ${(res.blk * 100).toFixed(1)}%`, right, by + 34);
    ctx.fillStyle = COL.dim;
    ctx.textAlign = 'left';
    ctx.fillText('where the blue from the center opening lands', left, by - 8);
  }

  function refresh() {
    const res = landing(state.gap, state.pitch, state.ap / 100);
    out('gap').textContent = state.gap.toFixed(1);
    out('pitch').textContent = String(state.pitch);
    out('ap').textContent = String(state.ap);
    const reach = res.own + res.nb;
    const wrong = reach > 0 ? (res.nb / reach) * 100 : 0;
    out('readout').innerHTML =
      `gap / pitch <strong>${(state.gap / state.pitch).toFixed(2)}</strong><br>` +
      `of the blue that reaches a dot window, <strong>${wrong.toFixed(1)}%</strong> lands in the wrong color<br>` +
      `caught by banks <strong>${(res.blk * 100).toFixed(1)}%</strong><br>` +
      'geometry only &middot; no refraction';
    draw(res);
  }

  ['gap', 'pitch', 'ap'].forEach((k) =>
    inp(k).addEventListener('input', (ev) => {
      state[k] = Number(ev.target.value);
      refresh();
    }),
  );

  refresh();
}

export default mount;
