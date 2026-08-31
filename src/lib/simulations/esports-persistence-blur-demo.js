// e스포츠 패널의 모션 블러 — 응답속도가 아니라 픽셀이 켜져 있는 시간이 결정한다.
//
// 눈이 움직이는 표적을 매끄럽게 따라가는 동안(smooth pursuit) 화면의 픽셀은 한 프레임
// 내내 같은 자리에 머문다. 그래서 정지한 상이 망막 위에서 옆으로 문질러진다. 이것이
// 샘플앤홀드 블러이고, 화면을 아무리 빨리 바꿔도 프레임이 길면 남는다.
//
// 근거:
//  - 지속시간 1ms가 초당 1000픽셀 이동에서 1픽셀 블러를 만든다는 관계를 그대로 재현한다.
//    아래 식에 넣으면 정확히 1px이 나온다.
//  - 응답속도·주사율 수치는 제조사 공식 발표값이다.
//    · 삼성디스플레이 QD-OLED 0.03ms GtG (게임스컴 2026 발표)
//    · LG디스플레이 탠덤 WOLED 0.02ms GtG (ASUS ROG Ace 사양)
//    · 삼성전자 오디세이 G6 Fast IPS 1ms, HD 1,100Hz / QHD 600Hz
//      (Samsung Global Newsroom, 2026-08-27)
//    · 구형 TN LCD 4ms는 비교용 대표값이다
//
// 수식:
//  프레임 길이      Tf = 1 / 주사율
//  픽셀 지속시간    Tp = Tf x 듀티        (검은 프레임 삽입이면 듀티 < 1)
//  지속시간 블러    Bp = 속도 x Tp
//  응답속도 블러    Br = 속도 x Tr
//  총 블러          B  = Bp + Br
//
// 정직성 고지 — 이 모델은 이상적인 샘플앤홀드와 완벽한 시선 추종을 가정한다. 실제
// 패널의 GtG는 계조 조합마다 다르고 보통 10~90% 구간으로 정의되므로, 응답속도 몫을
// 폭에 그대로 더하는 것은 근사다. 두 항의 크기 비교(수백 Hz를 넘어가면 1ms급 응답이
// 더 이상 무시되지 않고, 0.03ms급은 계속 무시된다)는 이 근사와 무관하게 성립하지만,
// 두 패널의 우열이 갈리는 정확한 지점은 GtG를 어떻게 정의하느냐에 따라 달라진다.
// 발표된 제품의 실측 잔상량을 재현하거나 검증하는 값이 아니다.

const W = 300;
const H = 210;

const RATES = [60, 120, 165, 240, 360, 480, 540, 560, 600, 680, 720, 1000, 1100];

const PANELS = {
  qdoled: { label: 'QD-OLED', tr: 0.03 },
  woled: { label: '탠덤 WOLED', tr: 0.02 },
  ips: { label: 'Fast IPS', tr: 1.0 },
  tn: { label: '구형 TN', tr: 4.0 },
};

/** 표적 장면을 만든다. 세로 막대 묶음 + 조준 표적 + 눈금 잔줄 */
function buildScene() {
  const src = new Float32Array(W * H);
  const bars = (x0, x1, y0, y1, pitch) => {
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        src[y * W + x] = Math.floor(x / pitch) % 2 === 0 ? 1 : 0.06;
      }
    }
  };
  // 위쪽 — 굵기가 다른 세로 막대 네 묶음. 가는 것부터 먼저 뭉개진다
  bars(14, 82, 16, 62, 8);
  bars(90, 158, 16, 62, 4);
  bars(166, 234, 16, 62, 2);
  bars(242, 288, 16, 62, 1);

  // 가운데 — 조준 표적
  const cx = 150;
  const cy = 122;
  const r = 30;
  for (let y = cy - r - 2; y <= cy + r + 2; y++) {
    for (let x = cx - r - 2; x <= cx + r + 2; x++) {
      if (x < 0 || x >= W || y < 0 || y >= H) continue;
      const d = Math.hypot(x - cx, y - cy);
      if (d > r - 2 && d < r) src[y * W + x] = 1;
      else if (d < r - 3) src[y * W + x] = 0.16;
    }
  }
  for (let x = cx - r + 6; x <= cx + r - 6; x++) src[cy * W + x] = 1;
  for (let y = cy - r + 6; y <= cy + r - 6; y++) src[y * W + cx] = 1;

  // 아래쪽 — 눈금 잔줄
  for (let x = 14; x < 288; x += 6) {
    for (let y = 172; y < 190; y++) src[y * W + x] = 1;
    if ((x - 14) % 30 === 0) for (let y = 166; y < 196; y++) src[y * W + x] = 1;
  }
  return src;
}

/** 가로 박스 평균(지속시간) 뒤에 한쪽으로 끌리는 1차 지연 꼬리(응답속도)를 얹는다 */
function smear(src, boxPx, tailPx) {
  const a = new Float32Array(W * H);
  const rad = boxPx / 2;
  const r0 = Math.floor(rad);
  const frac = rad - r0;
  for (let y = 0; y < H; y++) {
    const row = y * W;
    for (let x = 0; x < W; x++) {
      let sum = 0;
      let wsum = 0;
      for (let k = -r0; k <= r0; k++) {
        const xx = Math.min(W - 1, Math.max(0, x + k));
        sum += src[row + xx];
        wsum += 1;
      }
      if (frac > 0) {
        const xl = Math.min(W - 1, Math.max(0, x - r0 - 1));
        const xr = Math.min(W - 1, Math.max(0, x + r0 + 1));
        sum += frac * (src[row + xl] + src[row + xr]);
        wsum += 2 * frac;
      }
      a[row + x] = sum / wsum;
    }
  }
  if (tailPx < 0.05) return a;
  const b = new Float32Array(W * H);
  const k = Math.exp(-1 / tailPx);
  for (let y = 0; y < H; y++) {
    const row = y * W;
    let acc = a[row];
    for (let x = 0; x < W; x++) {
      acc = a[row + x] + k * (acc - a[row + x]);
      b[row + x] = acc;
    }
  }
  return b;
}

export function mount(container, params = {}) {
  const state = {
    rateIdx: params.rateIdx ?? RATES.indexOf(240),
    speed: params.speed ?? 1000,
    panel: params.panel ?? 'qdoled',
    bfi: params.bfi ?? false,
  };
  if (state.rateIdx < 0) state.rateIdx = 3;

  const panelButtons = Object.entries(PANELS)
    .map(([k, v]) => '<button type="button" data-val="' + k + '">' + v.label + ' ' + v.tr + 'ms</button>')
    .join('');

  container.innerHTML = [
    '<div class="sim-head">',
    '  <span class="sim-tag">개념도</span>',
    '  <span>눈이 표적을 따라갈 때 망막에 맺히는 상입니다</span>',
    '</div>',
    '<div class="sim-body">',
    '  <div class="sim-canvas-wrap">',
    '    <canvas width="' + W + '" height="' + H + '"></canvas>',
    '  </div>',
    '  <div class="sim-controls">',
    '    <div class="sim-control">',
    '      <label>주사율 <span data-out="rate"></span></label>',
    '      <input type="range" min="0" max="' + (RATES.length - 1) + '" step="1" data-in="rate" />',
    '    </div>',
    '    <div class="sim-control">',
    '      <label>표적이 지나가는 속도 <span data-out="speed"></span></label>',
    '      <input type="range" min="250" max="4000" step="50" data-in="speed" />',
    '    </div>',
    '    <div class="sim-control">',
    '      <label>패널 GtG (응답속도)</label>',
    '      <div class="sim-toggle-group" data-in="panel">' + panelButtons + '</div>',
    '    </div>',
    '    <div class="sim-control">',
    '      <label>검은 프레임 삽입(BFI)</label>',
    '      <div class="sim-toggle-group" data-in="bfi">',
    '        <button type="button" data-val="off">끔</button>',
    '        <button type="button" data-val="on">켬 · 듀티 50%</button>',
    '      </div>',
    '    </div>',
    '    <div class="sim-readout" data-out="readout"></div>',
    '  </div>',
    '</div>',
    '<div class="sim-note">',
    '  프레임 길이 = 1/주사율, 픽셀 지속시간 = 프레임 길이 &times; 듀티, 흐림폭(BEW) =',
    '  표적 속도 &times; (지속시간 + GtG)로 계산했습니다. 흐림폭은 물체 윤곽에서 휘도가 10%에서',
    '  90%로 오르는 구간의 픽셀 수로 정의된 계측 지표이고, 이를 시간으로 환산한 것이 MPRT입니다.',
    '  지속시간 1ms가 초당 1,000픽셀 이동에서 흐림폭 1픽셀을 만드는 관계를 그대로 씁니다.',
    '  GtG는 제조사 공식 발표값입니다 &mdash; QD-OLED 0.03ms와 탠덤 WOLED 0.02ms는 게임스컴 2026',
    '  발표 사양, Fast IPS 1ms는 오디세이 G6 사양이고, 구형 TN 4ms는 비교용 대표값입니다.',
    '  <b>이상적인 샘플앤홀드와 완벽한 시선 추종을 가정한 모델입니다.</b> 실제 GtG는 계조 조합마다',
    '  다르고 보통 10~90% 구간으로 정의되므로 GtG 몫을 폭에 그대로 더하는 것은 근사입니다.',
    '  수백 Hz를 넘어서면 1ms급 응답이 더 이상 무시되지 않고 0.03ms급은 계속 무시된다는 크기',
    '  비교는 이 근사와 무관하게 성립하지만, 두 패널의 우열이 갈리는 정확한 지점은 GtG 정의에',
    '  따라 달라집니다. 발표된 제품의 실측 잔상량을 재현하거나 검증하는 값이 아닙니다.',
    '</div>',
  ].join('\n');

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const rateInput = container.querySelector('[data-in="rate"]');
  const speedInput = container.querySelector('[data-in="speed"]');
  const panelGroup = container.querySelector('[data-in="panel"]');
  const bfiGroup = container.querySelector('[data-in="bfi"]');
  const rateOut = container.querySelector('[data-out="rate"]');
  const speedOut = container.querySelector('[data-out="speed"]');
  const readoutOut = container.querySelector('[data-out="readout"]');

  rateInput.value = String(state.rateIdx);
  speedInput.value = String(state.speed);

  const scene = buildScene();

  function syncToggles() {
    panelGroup.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('is-on', b.dataset.val === state.panel);
    });
    bfiGroup.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('is-on', b.dataset.val === (state.bfi ? 'on' : 'off'));
    });
  }

  function render() {
    const rate = RATES[state.rateIdx];
    const panel = PANELS[state.panel];
    const duty = state.bfi ? 0.5 : 1;
    const tf = 1000 / rate; // 프레임 길이 ms
    const tp = tf * duty; // 픽셀 지속시간 ms
    const v = state.speed / 1000; // px per ms
    const bp = v * tp;
    const br = v * panel.tr;
    const total = bp + br;

    const out = smear(scene, Math.max(1, bp), br);

    const gain = state.bfi ? 0.5 : 1;
    const img = ctx.createImageData(W, H);
    for (let i = 0; i < W * H; i++) {
      const g = Math.round(13 + Math.min(1, out[i]) * 226 * gain);
      img.data[i * 4] = g;
      img.data[i * 4 + 1] = g;
      img.data[i * 4 + 2] = Math.round(g * 0.96 + 4);
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);

    rateOut.textContent = rate + 'Hz';
    speedOut.textContent = state.speed + ' px/s';

    const share = total > 0 ? (br / total) * 100 : 0;
    let verdict = '';
    if (panel.tr >= tf) {
      verdict =
        ' · <b>GtG가 프레임 길이보다 깁니다.</b> 픽셀이 다음 프레임 전에 목표 계조에 닿지 못합니다';
    } else if (share < 3) {
      verdict = ' · 흐림폭의 거의 전부가 지속시간 몫입니다. GtG를 더 줄여도 달라지지 않습니다';
    } else if (share > 25) {
      verdict = ' · GtG가 더 이상 무시할 수 없는 몫을 차지합니다';
    }

    readoutOut.innerHTML =
      '프레임 길이 <b>' + tf.toFixed(2) + 'ms</b>' +
      (state.bfi ? ' · 픽셀 지속시간 <b>' + tp.toFixed(2) + 'ms</b>' : '') +
      '<br>흐림폭(BEW) <b>' + total.toFixed(2) + 'px</b> (지속시간 ' + bp.toFixed(2) +
      ' + GtG ' + br.toFixed(2) + ')' +
      '<br>GtG가 차지하는 몫 <b>' + share.toFixed(1) + '%</b>' + verdict +
      (state.bfi ? '<br>대신 밝기는 절반으로 떨어집니다' : '');
  }

  rateInput.addEventListener('input', () => {
    state.rateIdx = Number(rateInput.value);
    render();
  });
  speedInput.addEventListener('input', () => {
    state.speed = Number(speedInput.value);
    render();
  });
  panelGroup.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    state.panel = b.dataset.val;
    syncToggles();
    render();
  });
  bfiGroup.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    state.bfi = b.dataset.val === 'on';
    syncToggles();
    render();
  });

  syncToggles();
  render();
}

export default mount;
