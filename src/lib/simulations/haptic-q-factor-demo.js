// 시뮬레이션 — 「얼마나 눌린 진동인가」를 한 숫자로 나타낸 Q값이 실제로 무엇을 바꾸는지 본다.
// 이 기사 「이 소송의 승부처는 Q값이었습니다」 절의 그림이다.
//
// 모델 — 2차 진동계(질량-스프링-댐퍼) 교과서 식 두 개뿐이다
// - 주파수 응답: |H(f)| = 1 / sqrt( (1-r^2)^2 + (r/Q)^2 ),  r = f / f0
// - 임펄스 뒤 여운: x(t) = exp(-w0 t / (2Q)) * cos(wd t),  wd = w0 sqrt(1 - 1/(4Q^2))
//   Q <= 0.5 이면 진동하지 않고 지수적으로만 줄어든다(임계·과감쇠).
// - 추정한 상수는 없다. f0 와 Q 는 슬라이더이고, 그 둘로 모든 곡선이 정해진다.
//
// 기사에 나온 수치와의 연결
// - 판결문 각주: Q = 0.5 임계감쇠, 0.5 초과 부족감쇠, 미만 과감쇠(양측 합의).
// - 1심이 그은 선: Q < 1.5 여야 침해. 항소심이 그 선을 지웠다.
// - 특허 명세서가 든 대역: 촉각 재현 15~120Hz, 청구항이 말한 공진 저감 40~200Hz.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const W = 440;
const H = 366;

const FMIN = 10, FMAX = 500;     // 주파수 축(로그)
const INK = 'rgba(244,243,238,0.92)';
const DIM = 'rgba(244,243,238,0.58)';
const FAINT = 'rgba(244,243,238,0.30)';
const LINE = 'rgba(244,243,238,0.18)';
const C_NOW = '#e0a070';
const C_REF = '#8fb8d8';
const C_BAND = 'rgba(143,184,216,0.16)';

export function mount(container, params = {}) {
  // 🔴 표지 모드 — 표지 카드는 실효 폭이 좁아 본문 크기 글자·58% 흰 글씨가 안 보인다.
  // 다른 표지 시뮬(pen-titanium-field-demo 등)과 같은 방식으로 표지일 때만 글자를 키우고
  // 흐린 글자의 불투명도를 90% 이상으로 올린다. 캔버스 크기·좌표·계산은 그대로 둔다.
  const COVER = !!params.cover;
  const DIM = COVER ? 'rgba(244,243,238,0.92)' : 'rgba(244,243,238,0.58)';
  const FAINT = COVER ? 'rgba(244,243,238,0.75)' : 'rgba(244,243,238,0.30)';
  const FS_TICK = COVER ? 15 : 10;
  const FS_LABEL = COVER ? 16 : 11;
  const FS_STATUS = COVER ? 17 : 11.5;
  const LW_MAIN = COVER ? 3.2 : 2.2;
  const LW_REF = COVER ? 1.8 : 1.2;

  const state = {
    q: params.q ?? 2.2,
    f0: params.f0 ?? 130,
    ref: params.ref ?? true,   // Q = 0.5 곡선 겹쳐 보기
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>One number decides whether a tap rings on, or stops when told.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Q factor &mdash; <span data-out="q"></span></label>
          <input type="range" min="20" max="500" step="5" data-in="q" />
        </div>
        <div class="sim-control">
          <label>Resonance f<sub>0</sub> &mdash; <span data-out="f0"></span> Hz</label>
          <input type="range" min="40" max="200" step="1" data-in="f0" />
        </div>
        <div class="sim-control">
          <label>Reference curve</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-ref="1" aria-pressed="false">Q = 0.5 shown</button>
            <button type="button" class="sim-toggle-btn" data-ref="0" aria-pressed="false">hidden</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const $ = (s) => container.querySelector(s);
  const qIn = $('[data-in="q"]');
  const f0In = $('[data-in="f0"]');
  const refBtns = Array.from(container.querySelectorAll('[data-ref]'));
  qIn.value = String(Math.round(state.q * 100));
  f0In.value = String(state.f0);

  const X0 = 52, X1 = 418, Y0 = 30, Y1 = 176;   // 주파수 응답 영역
  const T0 = 214, T1 = 300;                      // 여운 영역

  const fx = (f) => X0 + ((Math.log10(f) - Math.log10(FMIN)) /
    (Math.log10(FMAX) - Math.log10(FMIN))) * (X1 - X0);
  const fy = (g) => {                            // 0 ~ 4배 사이를 로그로
    const v = Math.max(0.05, Math.min(6, g));
    return Y1 - ((Math.log10(v) + 1.3) / (Math.log10(6) + 1.3)) * (Y1 - Y0);
  };

  function magnitude(f, f0, q) {
    const r = f / f0;
    return 1 / Math.sqrt(Math.pow(1 - r * r, 2) + Math.pow(r / q, 2));
  }

  function ring(t, f0, q) {
    const w0 = 2 * Math.PI * f0;
    const env = Math.exp((-w0 * t) / (2 * q));
    if (q <= 0.5) return env;
    const wd = w0 * Math.sqrt(1 - 1 / (4 * q * q));
    return env * Math.cos(wd * t);
  }

  function curve(q, f0, color, width, alpha) {
    ctx.beginPath();
    for (let x = X0; x <= X1; x += 1) {
      const f = Math.pow(10, Math.log10(FMIN) +
        ((x - X0) / (X1 - X0)) * (Math.log10(FMAX) - Math.log10(FMIN)));
      const y = fy(magnitude(f, f0, q));
      if (x === X0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.globalAlpha = alpha;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function draw() {
    state.q = Number(qIn.value) / 100;
    state.f0 = Number(f0In.value);

    ctx.clearRect(0, 0, W, H);

    // 40~200Hz 띠
    ctx.fillStyle = C_BAND;
    ctx.fillRect(fx(40), Y0, fx(200) - fx(40), Y1 - Y0);
    ctx.font = `${FS_TICK}px "IBM Plex Mono", monospace`;
    ctx.fillStyle = DIM;
    ctx.textAlign = 'center';
    ctx.fillText('40 - 200 Hz, the claimed range', (fx(40) + fx(200)) / 2, Y0 + 12);

    // 격자
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    for (const f of [10, 20, 50, 100, 200, 500]) {
      ctx.beginPath(); ctx.moveTo(fx(f), Y0); ctx.lineTo(fx(f), Y1); ctx.stroke();
    }
    for (const g of [0.1, 1, 4]) {
      ctx.beginPath(); ctx.moveTo(X0, fy(g)); ctx.lineTo(X1, fy(g)); ctx.stroke();
    }

    // 곡선
    if (state.ref) curve(0.5, state.f0, C_REF, LW_REF, 0.75);
    curve(state.q, state.f0, C_NOW, LW_MAIN, 1);

    // 축
    ctx.strokeStyle = 'rgba(244,243,238,0.45)';
    ctx.beginPath();
    ctx.moveTo(X0, Y0); ctx.lineTo(X0, Y1); ctx.lineTo(X1, Y1);
    ctx.stroke();

    ctx.fillStyle = DIM;
    ctx.font = `${FS_TICK}px "IBM Plex Mono", monospace`;
    ctx.textAlign = 'center';
    for (const f of [10, 50, 100, 200, 500]) ctx.fillText(String(f), fx(f), Y1 + 14);
    ctx.textAlign = 'right';
    for (const [g, lab] of [[0.1, '0.1'], [1, '1'], [4, '4']]) ctx.fillText(lab, X0 - 6, fy(g) + 3.5);

    // 🔴 표지 모드에서는 축 이름("Frequency (Hz)"·"Response")을 뺀다. 글자를 키우면
    // 이 자리가 바로 아래 "after one tap"과 같은 줄(원래도 206~208px로 6px 차이뿐이었다)에
    // 겹친다. 축 이름은 읽는 방법이지 발견이 아니라 표지에서는 없어도 된다 — 눈금·곡선·
    // "Q=…" 상태 문구가 핵심을 담는다.
    if (!COVER) {
      ctx.font = `${FS_LABEL}px "IBM Plex Sans KR", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('Frequency (Hz)', (X0 + X1) / 2, Y1 + 32);
      ctx.save();
      ctx.translate(14, (Y0 + Y1) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Response', 0, 0);
      ctx.restore();
    }

    // 여운
    ctx.textAlign = 'left';
    ctx.font = `${FS_TICK}px "IBM Plex Mono", monospace`;
    ctx.fillStyle = DIM;
    ctx.fillText('after one tap', X0, T0 - 8);

    const mid = (T0 + T1) / 2;
    ctx.strokeStyle = LINE;
    ctx.beginPath(); ctx.moveTo(X0, mid); ctx.lineTo(X1, mid); ctx.stroke();

    const dur = 0.08;   // 80 ms 창
    ctx.beginPath();
    for (let x = X0; x <= X1; x += 1) {
      const t = ((x - X0) / (X1 - X0)) * dur;
      const y = mid - ring(t, state.f0, state.q) * ((T1 - T0) / 2 - 4);
      if (x === X0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = C_NOW;
    ctx.lineWidth = COVER ? 2.4 : 1.6;
    ctx.stroke();

    // 여운이 10% 아래로 떨어지는 시점
    const tSettle = (2 * state.q * Math.log(10)) / (2 * Math.PI * state.f0);
    if (tSettle < dur) {
      const xs = X0 + (tSettle / dur) * (X1 - X0);
      ctx.strokeStyle = FAINT;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(xs, T0 - 4); ctx.lineTo(xs, T1 + 4); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = FAINT;
      ctx.font = `${FS_TICK}px "IBM Plex Mono", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText((tSettle * 1000).toFixed(1) + ' ms to 10 %', xs + 5, T0 + 6);
    }
    ctx.textAlign = 'right';
    ctx.fillStyle = FAINT;
    ctx.fillText('80 ms', X1, T1 + 14);

    // 상태 문구
    const label = Math.abs(state.q - 0.5) < 0.005 ? 'critically damped' : state.q < 0.5 ? 'overdamped' : 'underdamped';
    const peak = state.q > 0.707
      ? magnitude(state.f0 * Math.sqrt(1 - 1 / (2 * state.q * state.q)), state.f0, state.q)
      : 1;

    ctx.textAlign = 'left';
    ctx.font = `600 ${FS_STATUS}px "IBM Plex Sans KR", sans-serif`;
    ctx.fillStyle = state.q < 1.5 ? C_REF : C_NOW;
    ctx.fillText('Q = ' + state.q.toFixed(2) + '  ' + label, X0, 330);
    ctx.font = `${FS_LABEL}px "IBM Plex Sans KR", sans-serif`;
    ctx.fillStyle = FAINT;
    ctx.fillText('the line the district court drew was Q = 1.5', X0, 348);

    $('[data-out="q"]').textContent = state.q.toFixed(2);
    $('[data-out="f0"]').textContent = state.f0;
    $('[data-out="readout"]').innerHTML =
      `Peak <b>${peak.toFixed(2)}&times;</b> flat response &nbsp;&middot;&nbsp; ${(tSettle * 1000).toFixed(1)} ms to fall to 10 % &nbsp;&middot;&nbsp; ${label}`;
  }

  function sync() {
    refBtns.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.ref === '1') === state.ref)));
    draw();
  }

  refBtns.forEach((b) => b.addEventListener('click', () => { state.ref = b.dataset.ref === '1'; sync(); }));
  qIn.addEventListener('input', draw);
  f0In.addEventListener('input', draw);
  sync();
}
