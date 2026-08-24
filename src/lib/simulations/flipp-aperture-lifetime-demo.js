// 시뮬레이션 — 개구율 하나가 휘도·수명·소비전력을 동시에 움직인다.
// 기사 "FMM을 걷어낸 LG디스플레이 8.5세대 마스크리스 패터닝 FLiPP"의
// "수명 2.4배는 어디서 왔나" 절에서 쓴다.
//
// 모델링 근거와 한계
// - 휘도: 같은 전류밀도에서 발광 면적이 k배가 되면 총 광량도 k배라는 1차 근사다.
//   실제로는 개구부 형상이 바뀌면 마이크로캐비티 조건과 광추출 효율도 함께 달라진다.
// - 수명: 문헌의 경험식 τ ∝ J^(-n)을 썼다. n은 소자 구조와 이동도의 캐리어 농도 의존성에
//   따라 대략 1.5~2.0 범위이고, 업계에서 초기휘도 환산에 흔히 쓰는 값은 1.7~1.8이다.
//   여기서는 "같은 총 휘도를 내되 발광 면적이 k배이므로 전류밀도를 1/k로 낮춘다"는
//   조건에서 수명 배수를 k^n으로 계산한다.
// - 소비전력: 발광 면적이 k배, 전류밀도가 1/k이므로 총 전류는 변하지 않는다. 따라서
//   전력 변화는 전적으로 구동전압 변화다. 전압은 V = V0 + a·sqrt(J/Jref)로 근사했고
//   (공간전하제한전류 m=2 근사) V0 = 1.5 V, 기준 구동전압 4.0 V를 임의로 두었다.
//   이 두 값은 일반적인 OLED의 크기 감각을 따른 것이지 특정 패널의 측정값이 아니다.
//
// 따라서 아래 수치는 세 값이 어떤 관계로 묶여 있는지 보여주는 상대 비교값이며,
// LG디스플레이가 발표한 개구율 55% 향상 / 휘도 1.6배 / 수명 2.4배 / 소비전력 13% 저감을
// 재현하거나 검증하는 값이 아니다. 발표치는 비교용 눈금으로만 그려 두었다.

// 발표된 개구율 향상 배수 (각 사 발표를 그대로 옮긴 값)
const PRESETS = {
  flipp: { label: 'LGD FLiPP', k: 1.55, note: 'FMM 대비 개구율 55% 향상' },
  eleap: { label: 'JDI eLEAP', k: 2.14, note: '개구율 28% → 60%' },
  vip: { label: 'Visionox ViP', k: 2.38, note: '개구율 29% → 69%' },
};

// LG디스플레이 발표치 — 눈금선으로만 쓴다.
// 전력은 "13% 저감"을 효율 배수(1 / 0.87 = 1.15배)로 환산해 세 막대의 방향을 맞췄다.
const ANNOUNCED = { lum: 1.6, life: 2.4, powerEff: 1 / 0.87 };

const V0 = 1.5; // 내장전위 근사 (V)
const VREF = 4.0; // 기준 구동전압 (V)

function luminanceGain(k) {
  return k;
}

function lifetimeGain(k, n) {
  return Math.pow(k, n);
}

// 총 전류 불변, 전압만 변한다 → 전력비 = V(1/k) / V(1)
function powerRatio(k) {
  const a = VREF - V0;
  const v = V0 + a * Math.sqrt(1 / k);
  return v / VREF;
}

export function mount(container, params = {}) {
  const state = {
    k: params.k ?? 1.55,
    n: params.n ?? 1.8,
    preset: params.preset ?? 'flipp',
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">개념도</span>
      <span>개구율을 키우면 휘도·수명·전력이 한꺼번에 따라 움직입니다</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="280" height="276"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-toggle-group" data-in="preset"></div>
        <div class="sim-control">
          <label>개구율 향상 배수 k <span data-out="k"></span>배</label>
          <input type="range" min="1" max="2.5" step="0.01" data-in="k" />
        </div>
        <div class="sim-control">
          <label>수명 가속지수 n <span data-out="n"></span></label>
          <input type="range" min="1.4" max="2.2" step="0.05" data-in="n" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
    <div class="sim-note">
      휘도는 발광 면적에 비례한다는 1차 근사, 수명은 문헌의 경험식 &tau; &prop; J
      의 &minus;n 제곱, 소비전력은 총 전류가 변하지 않고 구동전압만 낮아진다는 가정으로
      계산했습니다. 전압 모델의 내장전위 1.5 V와 기준 구동전압 4.0 V는 OLED의 일반적인
      크기 감각을 따른 임의값입니다. 점선은 LG디스플레이 발표치를 눈금으로 표시한 것이며,
      이 계산이 그 값을 재현하거나 검증하는 것은 아닙니다.
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const kInput = container.querySelector('[data-in="k"]');
  const nInput = container.querySelector('[data-in="n"]');
  const presetWrap = container.querySelector('[data-in="preset"]');
  const kOut = container.querySelector('[data-out="k"]');
  const nOut = container.querySelector('[data-out="n"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  presetWrap.innerHTML = Object.entries(PRESETS)
    .map(([id, p]) => `<button type="button" data-preset="${id}">${p.label}</button>`)
    .join('');

  kInput.value = String(state.k);
  nInput.value = String(state.n);

  // 화소 모식도 — 같은 화소 피치 안에서 발광부 면적만 k배로 넓힌다
  function drawPixel(x, y, w, h, fillRatio, label, sub) {
    ctx.fillStyle = 'rgba(244,243,238,0.10)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(244,243,238,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    // 발광부: 면적비를 유지하며 가운데 정렬
    const side = Math.sqrt(Math.min(1, fillRatio));
    const ew = w * side;
    const eh = h * side;
    const ex = x + (w - ew) / 2;
    const ey = y + (h - eh) / 2;
    const grad = ctx.createLinearGradient(ex, ey, ex + ew, ey + eh);
    grad.addColorStop(0, 'rgba(226,86,120,0.95)');
    grad.addColorStop(0.5, 'rgba(120,200,140,0.95)');
    grad.addColorStop(1, 'rgba(110,150,235,0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(ex, ey, ew, eh);

    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#f4f3ee';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(label, x + w / 2, y + h + 5);
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(244,243,238,0.6)';
    ctx.fillText(sub, x + w / 2, y + h + 19);
  }

  function drawBar(x, w, value, maxValue, color, label, markAt) {
    const top = 150;
    const bottom = 232;
    const span = bottom - top;
    const h = Math.max(0, Math.min(1, value / maxValue)) * span;

    ctx.fillStyle = 'rgba(244,243,238,0.12)';
    ctx.fillRect(x, top, w, span);
    ctx.fillStyle = color;
    ctx.fillRect(x, bottom - h, w, h);

    // 발표치 눈금
    if (markAt != null) {
      const my = bottom - Math.max(0, Math.min(1, markAt / maxValue)) * span;
      ctx.strokeStyle = 'rgba(244,243,238,0.75)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x - 5, my);
      ctx.lineTo(x + w + 5, my);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#f4f3ee';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(label.value, x + w / 2, bottom - h - 4);
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(244,243,238,0.7)';
    ctx.textBaseline = 'top';
    ctx.fillText(label.name, x + w / 2, bottom + 6);
  }

  function draw() {
    const k = state.k;
    const n = state.n;
    kOut.textContent = k.toFixed(2);
    nOut.textContent = n.toFixed(2);

    const lum = luminanceGain(k);
    const life = lifetimeGain(k, n);
    const pw = powerRatio(k);

    readoutOut.textContent =
      `휘도 ${lum.toFixed(2)}배 · 수명 ${life.toFixed(2)}배 · ` +
      `소비전력 ${((1 - pw) * 100).toFixed(1)}% 감소 (총 전류는 변화 없음)`;

    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 기준 개구율 30% — 삼성디스플레이가 밝힌 FMM 방식의 대표값
    const baseAperture = 0.3;
    drawPixel(34, 22, 76, 76, baseAperture, 'FMM', '개구율 30%');
    drawPixel(170, 22, 76, 76, baseAperture * k, 'FMM 없음', `개구율 ${(baseAperture * k * 100).toFixed(0)}%`);

    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(244,243,238,0.55)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('→', 140, 60);

    // 세 막대 모두 "클수록 개선"으로 방향을 맞춘다.
    // 전력은 같은 화면을 내는 데 드는 전력의 역수, 곧 전력 효율 배수로 그린다.
    const maxV = 3.0;
    drawBar(28, 46, lum, maxV, 'rgba(214,120,53,0.95)', { name: '휘도', value: lum.toFixed(2) + '배' }, ANNOUNCED.lum);
    drawBar(117, 46, life, maxV, 'rgba(150,110,200,0.95)', { name: '수명', value: life.toFixed(2) + '배' }, ANNOUNCED.life);
    drawBar(206, 46, 1 / pw, maxV, 'rgba(110,170,190,0.95)', { name: '전력 효율', value: (1 / pw).toFixed(2) + '배' }, ANNOUNCED.powerEff);

    ctx.font = '9px sans-serif';
    ctx.fillStyle = 'rgba(244,243,238,0.45)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('점선 = LG디스플레이 발표치 · 세 막대 모두 클수록 개선', 24, 262);
  }

  kInput.addEventListener('input', () => {
    state.k = parseFloat(kInput.value);
    syncPresetButtons();
    draw();
  });
  nInput.addEventListener('input', () => {
    state.n = parseFloat(nInput.value);
    draw();
  });
  presetWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-preset]');
    if (!btn) return;
    state.preset = btn.dataset.preset;
    state.k = PRESETS[state.preset].k;
    kInput.value = String(state.k);
    syncPresetButtons();
    draw();
  });

  function syncPresetButtons() {
    const match = Object.entries(PRESETS).find(([, p]) => Math.abs(p.k - state.k) < 0.005);
    presetWrap.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('is-active', !!match && b.dataset.preset === match[0]);
    });
  }

  syncPresetButtons();
  draw();
}
