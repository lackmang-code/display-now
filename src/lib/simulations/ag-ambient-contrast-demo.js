// 시뮬레이션 — AG는 명암비의 평균을 올리지 않는다. 최악을 없앤다.
// 조명이 맺힌 각도에서 화면이 못 읽히는 구간이 생기는지 아닌지를 본다.
//
// 모델과 한계
// - 실효 명암비는 CR(t) = (Lw + r(t)) / (Lb + r(t)) 로 둔다. r 은 표면이 되돌려
//   눈으로 오는 빛이고, 흰 화면과 검은 화면 모두에 같은 값이 더해진다.
// - 표면 반사율은 AG 유무와 무관하게 4.2%로 같게 둔다. AG 는 총량을 바꾸지 않고
//   각도 분포만 바꾸는 기술이라 그 점이 이 그림의 전제다.
// - 반사 로브는 가우시안으로 두고 폭은 조명 자체의 각크기와 표면 산란을 제곱합으로
//   합친다. 에너지가 보존되도록 피크를 폭에 반비례시켰다.
// - 광택도에서 표면 산란 폭으로 가는 환산 sigma = (150 - gloss) * 0.32 는 AGC 제품표의
//   광택도 범위가 넓은 로브에서 좁은 로브까지 고르게 덮도록 맞춘 것이다.
//   문헌에서 가져온 관계식이 아니다.
// - 패널은 하나만 둔다. 흰 화면 500 nit, 검은 화면 0.5 nit. 검은 화면 밝기를 OLED 수준
//   (0.0005 nit)으로 바꿔도 최악 명암비가 10% 안쪽에서만 움직인다 — 주변광 반사가
//   분모를 지배하기 때문이다. 그래서 패널 종류를 고르는 손잡이를 두지 않았다.
// - 읽기 한계 3:1 은 통상 쓰이는 기준선이고 이 모델에서 계산한 값이 아니다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const LAYOUT = {
  article: { W: 440, H: 330 },
  cover: { W: 440, H: 330 },
};

const R_SURF = 0.042; // 유리 앞면 반사율 — AG 여부와 무관
const SIG_LAMP = 3.0; // 형광등 자체의 각크기 (deg)
const SIG_BARE = 0.4; // 맨유리 표면 산란
const SPEC = -25; // 정반사 방향 (조명이 +25도에 있을 때)
const ROOM_LUX = 350; // 실내 확산 조도
const CR_MIN = 3; // 읽기 한계
const LW = 500; // 흰 화면 (nit)
const LB = 0.5; // 검은 화면 (nit)
const TMIN = -60;
const TMAX = 60;
const CRMAX = 3000;

const sigmaAG = (g) => Math.max(0.5, (150 - g) * 0.32);

export function mount(container, params = {}) {
  const L = LAYOUT[params.cover ? 'cover' : 'article'];
  const { W, H } = L;

  const state = {
    gloss: params.gloss ?? 70,
    lamp: params.lamp ?? 12000,
    view: params.view ?? -25,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Same reflectance, different spread: what AG removes is the unreadable angle</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>AG gloss 60&deg; <span data-out="gloss"></span> G.U.</label>
          <input type="range" min="40" max="140" step="1" data-in="gloss" />
        </div>
        <div class="sim-control">
          <label>Lamp luminance <span data-out="lamp"></span></label>
          <input type="range" min="2000" max="40000" step="500" data-in="lamp" />
        </div>
        <div class="sim-control">
          <label>Viewing angle <span data-out="view"></span>&deg;</label>
          <input type="range" min="-60" max="60" step="1" data-in="view" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const out = (k) => container.querySelector(`[data-out="${k}"]`);
  const inp = (k) => container.querySelector(`[data-in="${k}"]`);

  inp('gloss').value = String(state.gloss);
  inp('lamp').value = String(state.lamp);
  inp('view').value = String(state.view);

  function reflect(theta, sigSurf) {
    const sig = Math.hypot(SIG_LAMP, sigSurf);
    const peak = state.lamp * R_SURF * (SIG_LAMP / sig); // 총 에너지 보존
    const d = theta - SPEC;
    return peak * Math.exp(-(d * d) / (2 * sig * sig));
  }
  function ambient(sigSurf) {
    const extra = 1 + Math.min(1.4, sigSurf / 28);
    return ((ROOM_LUX * R_SURF) / Math.PI) * extra;
  }
  function CR(theta, sigSurf) {
    const r = reflect(theta, sigSurf) + ambient(sigSurf);
    return (LW + r) / (LB + r);
  }
  function worst(sigSurf) {
    let m = 1e9;
    for (let t = TMIN; t <= TMAX; t += 0.25) m = Math.min(m, CR(t, sigSurf));
    return m;
  }
  function badWidth(sigSurf) {
    let n = 0;
    for (let t = TMIN; t <= TMAX; t += 0.25) if (CR(t, sigSurf) < CR_MIN) n++;
    return n * 0.25;
  }

  const PLOT = { l: 50, r: 12, t: 30, b: H - 96 };
  const fx = (t) => PLOT.l + ((t - TMIN) / (TMAX - TMIN)) * (W - PLOT.l - PLOT.r);
  const fy = (c) => {
    const u = Math.log10(Math.max(1, Math.min(CRMAX, c))) / Math.log10(CRMAX);
    return PLOT.b - u * (PLOT.b - PLOT.t);
  };

  function draw() {
    const sigAG = sigmaAG(state.gloss);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);

    // 격자와 눈금
    ctx.font = '11px ui-monospace, monospace';
    ctx.textBaseline = 'middle';
    [1, 3, 10, 100, 1000].forEach((c) => {
      ctx.strokeStyle = 'rgba(244,243,238,0.10)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PLOT.l, fy(c));
      ctx.lineTo(W - PLOT.r, fy(c));
      ctx.stroke();
      ctx.fillStyle = 'rgba(162,162,168,0.8)';
      ctx.textAlign = 'right';
      ctx.fillText(`${c}:1`, PLOT.l - 6, fy(c));
    });

    // 읽기 한계
    ctx.strokeStyle = 'rgba(224,101,90,0.85)';
    ctx.setLineDash([5, 3]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(PLOT.l, fy(CR_MIN));
    ctx.lineTo(W - PLOT.r, fy(CR_MIN));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(224,101,90,0.95)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('readable limit 3:1', W - PLOT.r - 4, fy(CR_MIN) - 5);

    // 정반사 방향
    ctx.strokeStyle = 'rgba(216,180,90,0.45)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(fx(SPEC), PLOT.t);
    ctx.lineTo(fx(SPEC), PLOT.b);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(216,180,90,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('specular', fx(SPEC), PLOT.t + 13);

    // 곡선
    function curve(sig, color, width) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      for (let t = TMIN; t <= TMAX; t += 0.2) {
        const x = fx(t);
        const y = fy(CR(t, sig));
        if (t === TMIN) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    curve(SIG_BARE, 'rgba(236,236,237,0.55)', 1.5);
    curve(sigAG, '#d97a3c', 2);

    // 축
    ctx.strokeStyle = 'rgba(244,243,238,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PLOT.l, PLOT.b);
    ctx.lineTo(W - PLOT.r, PLOT.b);
    ctx.moveTo(PLOT.l, PLOT.t);
    ctx.lineTo(PLOT.l, PLOT.b);
    ctx.stroke();
    ctx.fillStyle = 'rgba(162,162,168,0.85)';
    ctx.textAlign = 'center';
    [-60, -40, -20, 0, 20, 40, 60].forEach((t) => ctx.fillText(`${t}°`, fx(t), PLOT.b + 13));
    ctx.fillText('viewing angle', (PLOT.l + W - PLOT.r) / 2, PLOT.b + 27);

    // 커서
    ctx.strokeStyle = 'rgba(244,243,238,0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(fx(state.view), PLOT.t);
    ctx.lineTo(fx(state.view), PLOT.b);
    ctx.stroke();
    [
      [CR(state.view, SIG_BARE), 'rgba(236,236,237,0.9)'],
      [CR(state.view, sigAG), '#d97a3c'],
    ].forEach(([c, color]) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(fx(state.view), fy(c), 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 못 읽는 각도 띠
    function badBand(sig, y, h, color) {
      let x0 = null;
      ctx.fillStyle = color;
      for (let t = TMIN; t <= TMAX; t += 0.25) {
        const bad = CR(t, sig) < CR_MIN;
        if (bad && x0 === null) x0 = t;
        if ((!bad || t >= TMAX) && x0 !== null) {
          ctx.fillRect(fx(x0), y, Math.max(2, fx(t) - fx(x0)), h);
          x0 = null;
        }
      }
    }
    ctx.fillStyle = 'rgba(162,162,168,0.75)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('ANGLES WHERE THE SCREEN CANNOT BE READ', PLOT.l, PLOT.b + 42);

    ctx.strokeStyle = 'rgba(236,236,237,0.16)';
    ctx.lineWidth = 1;
    ctx.strokeRect(PLOT.l + 0.5, PLOT.b + 48.5, W - PLOT.l - PLOT.r - 1, 15);
    ctx.strokeRect(PLOT.l + 0.5, PLOT.b + 69.5, W - PLOT.l - PLOT.r - 1, 15);
    badBand(SIG_BARE, PLOT.b + 49, 14, 'rgba(236,236,237,0.55)');
    badBand(sigAG, PLOT.b + 70, 14, 'rgba(217,122,60,0.95)');

    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(236,236,237,0.7)';
    ctx.fillText('bare glass', PLOT.l + 5, PLOT.b + 56);
    ctx.fillStyle = 'rgba(217,122,60,1)';
    ctx.fillText(`AG ${state.gloss}`, PLOT.l + 5, PLOT.b + 77);

    // 제목
    ctx.fillStyle = 'rgba(236,236,237,0.95)';
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('effective contrast ratio under a ceiling lamp', PLOT.l, 17);
  }

  function refresh() {
    const sigAG = sigmaAG(state.gloss);
    out('gloss').textContent = String(state.gloss);
    out('lamp').textContent = `${(state.lamp / 1000).toFixed(1)}k`;
    out('view').textContent = String(state.view);

    const cb = CR(state.view, SIG_BARE);
    const ca = CR(state.view, sigAG);
    out('readout').innerHTML =
      `at ${state.view}&deg; &middot; bare <strong>${cb.toFixed(1)}:1</strong>, AG <strong>${ca.toFixed(1)}:1</strong><br>` +
      `worst &middot; bare <strong>${worst(SIG_BARE).toFixed(1)}:1</strong>, AG <strong>${worst(sigAG).toFixed(1)}:1</strong><br>` +
      `unreadable &middot; bare <strong>${badWidth(SIG_BARE).toFixed(0)}&deg;</strong>, AG <strong>${badWidth(sigAG).toFixed(0)}&deg;</strong><br>` +
      'lamp at +25&deg; &middot; surface reflectance 4.2% for both';
    draw();
  }

  inp('gloss').addEventListener('input', (e) => {
    state.gloss = Number(e.target.value);
    refresh();
  });
  inp('lamp').addEventListener('input', (e) => {
    state.lamp = Number(e.target.value);
    refresh();
  });
  inp('view').addEventListener('input', (e) => {
    state.view = Number(e.target.value);
    refresh();
  });

  refresh();
}

export default mount;
