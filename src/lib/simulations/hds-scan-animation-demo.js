// 시뮬레이션 — 게이트 스캔이 화면을 훑고 지나가는 것과, 그것을 가능하게 하는 배선 구조를
// 함께 보여준다. 이 기사 「화면을 둘로 나누면 숫자가 뒤집힙니다」 절의 그림이다.
//
// 타이밍 값은 전부 나눗셈이다
// - 한 줄에 주어지는 시간 = 1 / 주사율 / (2,160 / 분할수)
// - 화소 데이터율 = 3,840 x 2,160 x RGB x 10bit x 주사율. 화면에 뿌리는 총량은 분할과
//   무관하게 같다. 달라지는 것은 소스 채널 하나가 감당해야 하는 속도다.
// - 수직 블랭킹 구간을 빼지 않았다. 실제 패널은 한 줄 시간이 10% 안팎 짧다.
//
// 배선 구조는 추론이다
// - LG디스플레이는 HDS 의 구동 구조를 공개하지 않았다.
// - 여기 그린 「소스 IC 는 한쪽에만 두고, 패널 안 MUX 로 한 채널이 여러 가닥을 시분할 구동」은
//   원가 관점에서 가장 그럴듯한 구성이다. 소스 IC 를 상하 양쪽에 다는 방식도 기술적으로는
//   가능하지만 드라이버 수와 COF 가 늘어 원가가 오르므로, 새 기술로 상을 받을 구성으로 보기
//   어렵다.
// - 회사 발표문이 「패널 내 구동회로 설계」와 「데이터 전송 속도 2배」를 함께 적은 것이 이
//   구성과 맞물린다. 채널 수를 늘리지 않고 채널당 속도를 올려 쓰는 것이 곧 MUX 구동이다.
//   다만 맞물린다는 것이 확인되었다는 뜻은 아니다.
// - MUX 를 몇 대 몇으로 걸었는지는 알 수 없다. 둘로 나누는 것이 가장 단순하지만 넷 이상으로
//   걸어 채널 수까지 줄이는 구성도 흔하므로, 그림에서는 비율을 특정하지 않았다.
// - 하부 담당 배선은 MUX 에서 화면 아래끝까지 끊기지 않은 한 가닥이다. 상반부를 지나가되
//   그 구간의 화소에는 물지 않는다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

const LINES = 2160;
const PW = 3840, PH_PX = 2160, SUB = 3, BIT = 10;
const SLOW = 400;
const REF_US = (1 / 144) / LINES * 1e6;   // 144Hz 한 구역 = 3.215us
const DATA_SHOWN = 10;
const DATA_TOTAL = PW * SUB;              // 4K RGB 데이터 라인 수

// 확인된 것은 「8K 패널은 소스·게이트 양쪽 모두 듀얼 스캔이 필요하다」까지다.
// 4분할 이상은 근거를 찾지 못했고 기술명 자체가 Double 이라 선택지에서 뺐다.
const SPLITS = { s1: { v: 1 }, s2: { v: 2 } };

const C_TOP = '#8fc4ea';    // 상부 담당 계통
const C_BOT = '#d8b46a';    // 하부 담당 계통

export function mount(container, params = {}) {
  const state = { hz: params.hz ?? 165, split: params.split ?? 's2', playing: true };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>One source IC, two data lines per column. The panel splits them.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="440" height="366"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Scan regions driven at once</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-split="s1" aria-pressed="false">1</button>
            <button type="button" class="sim-toggle-btn" data-split="s2" aria-pressed="true">2</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Refresh rate &mdash; <span data-out="hz"></span> Hz</label>
          <input type="range" min="60" max="240" step="1" data-in="hz" />
        </div>
        <div class="sim-control">
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-play aria-pressed="true">Pause</button>
          </div>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const hzInput = container.querySelector('[data-in="hz"]');
  const hzOut = container.querySelector('[data-out="hz"]');
  const readout = container.querySelector('[data-out="readout"]');
  const splitBtns = Array.from(container.querySelectorAll('[data-split]'));
  const playBtn = container.querySelector('[data-play]');
  hzInput.value = String(state.hz);

  const W = 440, H = 366;
  const DIM = 'rgba(244,243,238,0.55)';
  const FAINT = 'rgba(244,243,238,0.30)';

  // 레이아웃 — 좌우에 GIP 자리, 위에 소스 IC 와 MUX 자리
  const GIP_W = 11;
  const GX_L = 56, PX0 = GX_L + GIP_W + 4;
  const PX1 = 362, GX_R = PX1 + 4;
  const SRC_Y = 54, SRC_H = 12;
  const MUX_Y = 70, MUX_H = 9;
  const PY0 = 90, PY1 = 244;
  const PWID = PX1 - PX0, PHT = PY1 - PY0;
  const CY = (PY0 + PY1) / 2;

  const lineUs = (hz, split) => (1 / hz) / (LINES / split) * 1e6;
  const panelGbps = (hz) => (PW * PH_PX * SUB * BIT * hz) / 1e9;

  let raf = null, phase = 0, last = null;

  const reduce = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) state.playing = false;

  function vline(x, y1, y2, color, width, dash) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(x, y1); ctx.lineTo(x, y2);
    ctx.stroke();
    if (dash) ctx.setLineDash([]);
  }

  function draw() {
    const n = SPLITS[state.split].v;
    const us = lineUs(state.hz, n);
    const rate = panelGbps(state.hz);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#08090c';
    ctx.fillRect(0, 0, W, H);

    // ── 소스 IC — 어느 경우든 한쪽에만 둔다
    ctx.fillStyle = 'rgba(143,196,234,0.9)';
    ctx.fillRect(PX0, SRC_Y, PWID, SRC_H);
    ctx.fillStyle = 'rgba(10,12,16,0.92)';
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SOURCE IC  ·  one side only', PX0 + PWID / 2, SRC_Y + SRC_H - 3);

    // ── MUX — 분할 구동일 때만 패널 안에 들어간다
    if (n > 1) {
      ctx.fillStyle = 'rgba(176,139,208,0.85)';
      ctx.fillRect(PX0, MUX_Y, PWID, MUX_H);
      ctx.fillStyle = 'rgba(10,12,16,0.92)';
      ctx.font = '8px "IBM Plex Mono", monospace';
      ctx.fillText('MUX in panel  ·  one channel feeds more than one line', PX0 + PWID / 2, MUX_Y + MUX_H - 1.5);
    }

    // ── 화소 영역 바탕
    ctx.fillStyle = 'rgba(120,140,160,0.12)';
    ctx.fillRect(PX0, PY0, PWID, PHT);

    // ── 데이터 배선
    const gap = PWID / (DATA_SHOWN + 1);
    for (let i = 1; i <= DATA_SHOWN; i += 1) {
      const x = PX0 + gap * i;
      if (n === 1) {
        vline(x, SRC_Y + SRC_H, PY1, 'rgba(143,196,234,0.5)', 1);
      } else {
        vline(x, SRC_Y + SRC_H, MUX_Y, 'rgba(143,196,234,0.5)', 1);
        // 상부 담당 — 상반부 화소를 물고 중앙에서 끝난다
        vline(x - 2.5, MUX_Y + MUX_H, CY - 3, C_TOP, 1.3);
        // 하부 담당 — MUX 에서 아래끝까지 끊기지 않은 한 가닥이다.
        // 상반부에서는 화소에 물지 않고 지나가기만 한다.
        vline(x + 2.5, MUX_Y + MUX_H, PY1, C_BOT, 1.3);
      }
    }

    // ── GIP — 좌우 양쪽. 분할이면 상하로 잘려 각자 자기 구역만 맡는다
    function gipBar(x) {
      if (n === 1) {
        ctx.fillStyle = 'rgba(143,196,234,0.5)';
        ctx.fillRect(x, PY0, GIP_W, PHT);
      } else {
        ctx.fillStyle = 'rgba(143,196,234,0.6)';
        ctx.fillRect(x, PY0, GIP_W, PHT / 2 - 2);
        ctx.fillStyle = 'rgba(216,180,106,0.6)';
        ctx.fillRect(x, CY + 2, GIP_W, PHT / 2 - 2);
      }
      ctx.strokeStyle = 'rgba(244,243,238,0.25)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, PY0, GIP_W, PHT);
    }
    gipBar(GX_L);
    gipBar(GX_R);

    ctx.save();
    ctx.translate(GX_L - 5, CY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = FAINT;
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(n === 1 ? 'GIP' : 'GIP split', 0, 0);
    ctx.restore();

    // ── 스캔
    const regionH = PHT / n;
    for (let g = 0; g < n; g += 1) {
      const top = PY0 + g * regionH;
      const scanY = top + phase * regionH;
      const tint = n === 1 ? C_TOP : (g === 0 ? C_TOP : C_BOT);

      const grad = ctx.createLinearGradient(0, top, 0, scanY || top + 1);
      grad.addColorStop(0, 'rgba(150,190,220,0.10)');
      grad.addColorStop(1, 'rgba(190,225,245,0.32)');
      ctx.fillStyle = grad;
      ctx.fillRect(PX0, top, PWID, Math.max(0, scanY - top));

      ctx.save();
      ctx.shadowColor = tint;
      ctx.shadowBlur = 12;
      ctx.strokeStyle = tint;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(PX0, scanY); ctx.lineTo(PX1, scanY);
      ctx.stroke();
      ctx.restore();

      if (g > 0) {
        ctx.strokeStyle = 'rgba(244,243,238,0.30)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(PX0, top); ctx.lineTo(PX1, top);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = FAINT;
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${Math.round(LINES / n).toLocaleString('en-US')} lines`, PX0 + 5, top + 12);
    }

    ctx.strokeStyle = 'rgba(244,243,238,0.4)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(PX0, PY0, PWID, PHT);

    // ── 위 라벨
    ctx.fillStyle = DIM;
    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`4K panel · ${LINES.toLocaleString('en-US')} gate lines`, GX_L, 28);
    ctx.textAlign = 'right';
    ctx.fillStyle = state.playing ? 'rgba(143,181,154,0.9)' : FAINT;
    ctx.fillText(state.playing ? `slowed ${SLOW}×` : 'paused', GX_R + GIP_W, 28);

    ctx.textAlign = 'left';
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = FAINT;
    ctx.fillText(
      n === 1
        ? `one data line per column · ${DATA_SHOWN} of ${DATA_TOTAL.toLocaleString('en-US')} shown`
        : `two data lines per column · ${DATA_SHOWN} of ${DATA_TOTAL.toLocaleString('en-US')} columns shown`,
      GX_L, 42);

    // ── 아래 수치
    ctx.font = '12px "IBM Plex Mono", monospace';
    ctx.fillStyle = n === 1 ? C_TOP : C_BOT;
    ctx.fillText(`${us.toFixed(3)} µs per gate line`, GX_L, PY1 + 26);

    ctx.font = '11px "IBM Plex Sans KR", sans-serif';
    ctx.fillStyle = DIM;
    const ratio = us / REF_US;
    ctx.fillText(
      `${ratio.toFixed(2)}× the 144 Hz single-region budget (${REF_US.toFixed(3)} µs)`,
      GX_L, PY1 + 45,
    );
    ctx.fillStyle = FAINT;
    ctx.fillText(
      n === 1
        ? `Panel data ${rate.toFixed(1)} Gbps · each channel drives one line`
        : `Panel data ${rate.toFixed(1)} Gbps · one channel now feeds more than one line`,
      GX_L, PY1 + 63,
    );

    readout.innerHTML =
      `<b>${us.toFixed(3)} µs</b> per line &nbsp;&middot;&nbsp; ` +
      `<b>${ratio.toFixed(2)}×</b> the 144 Hz baseline &nbsp;&middot;&nbsp; ` +
      (n === 1
        ? 'source channel rate <b>1×</b>'
        : 'source channel rate <b>2×</b> — same IC, same channel count');
  }

  function step(ts) {
    if (last === null) last = ts;
    const dt = (ts - last) / 1000;
    last = ts;
    phase += dt / SLOW / (1 / state.hz);
    if (phase >= 1) phase -= Math.floor(phase);
    draw();
    raf = requestAnimationFrame(step);
  }
  function play() {
    if (raf !== null) return;
    state.playing = true;
    playBtn.textContent = 'Pause';
    playBtn.setAttribute('aria-pressed', 'true');
    last = null;
    raf = requestAnimationFrame(step);
  }
  function pause() {
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    state.playing = false;
    playBtn.textContent = 'Play';
    playBtn.setAttribute('aria-pressed', 'false');
    draw();
  }

  hzInput.addEventListener('input', () => {
    state.hz = Number(hzInput.value);
    hzOut.textContent = state.hz;
    draw();
  });
  splitBtns.forEach((b) => {
    b.addEventListener('click', () => {
      state.split = b.dataset.split;
      splitBtns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      draw();
    });
  });
  playBtn.addEventListener('click', () => (state.playing ? pause() : play()));

  hzOut.textContent = state.hz;
  draw();

  let wanted = state.playing;
  playBtn.addEventListener('click', () => { wanted = state.playing; });
  if (state.playing) play();
  else { playBtn.textContent = 'Play'; playBtn.setAttribute('aria-pressed', 'false'); }

  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { if (wanted && raf === null) play(); }
        else if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
      }
    }, { threshold: 0 });
    io.observe(container);
  }
}
