// 시뮬레이션 — 12인치 웨이퍼 위에서 마스크와 기판의 열팽창 차이가 만드는 정렬 오차를,
// 마스크 재질·온도차·화소밀도를 바꿔 가며 서브픽셀 폭과 직접 견줘 보는 것.
//
// 이 그림이 답하는 질문 하나:
//   **RGB 올레도스에서 정렬을 0.1마이크로미터로 묶으라는 요구가 무엇을 뜻하는가.**
//
// 모델: 중심에서 맞춘 두 판이 함께 식거나 데워질 때의 반경 방향 상대 변위.
//   delta = R x |alpha_mask - alpha_Si| x dT,  R = 웨이퍼 반경.
//   서브픽셀 폭 w = 25400 / PPI / 3 (RGB 셋이 가로로 나란하다고 본 것).
//
// 열팽창계수(상온, ppm/K): 인바 Fe-36Ni 1.2 · 실리콘 2.6 · SUS304 17.3.
//   마스크가 실리콘이면 차가 0이 되어 온도를 아무리 흔들어도 어긋나지 않는다.
//   이것이 이매진 dPd 가 금속 마스크를 버리고 실리콘 스텐실로 간 자리다.
//
// 기준선 두 개:
//   0.1um  — 양산이 요구한다고 보도된 값(ZDNet 2026-08-07, 업계 서술이고 1차 자료가 아니다)
//   1.0um  — 캐논토키가 SID 2026 에서 12인치에 보인 값(데모이고 생산 장비가 아니다)
//
// 🔴 한계: 중심 정렬을 가정한 반경 기준이다. 한쪽 끝에서 맞추면 같은 조건에서 두 배가 된다.
//    실제 장비는 국소 보정·온도 제어로 이 값을 줄이므로, 이 그림은 장비 성능을 재는 것이
//    아니라 **왜 온도를 묶어야 하는지**를 좁히는 것이다. 균일한 온도 변화만 보고 기울기나
//    국소 편차는 넣지 않았다.
//
// 화면에 찍히는 문자열은 전부 영어다. 고지문은 원고의 <template data-sim-note> 에 있다.

import { hidpi } from './_hidpi.js';

const LAYOUT = {
  article: { W: 300, H: 300 },
  cover: { W: 300, H: 300 },
};

const ALPHA_SI = 2.6; // ppm/K

const MASKS = {
  invar: { label: 'Invar Fe-36Ni', alpha: 1.2 },
  silicon: { label: 'Silicon stencil', alpha: 2.6 },
  sus: { label: 'SUS 304', alpha: 17.3 },
};

// RGB 를 직접 패터닝한 실측 사례만 쓴다.
//   2645 — eMagin 직접 패턴(SID 2016). 화소 피치 9.6um, 서브픽셀 3.2 x 9.6um
//   3200 — 캐논토키 12인치 데모(SID 2026)
// 🔴 애플 비전프로의 3391PPI 는 백색 OLED 에 컬러필터를 얹는 방식이라
//    서브픽셀을 마스크로 그리지 않는다. 여기에 넣으면 범주가 섞이므로 뺐다.
const PPI_STEPS = [2645, 3200];

const INK = '#f4f3ee';
const MUTE = '#a4a49a';
const LINE = '#55554d';
const GREEN = '#7fc79a';
const GREEN_D = '#2f4a3a';
const WARN = '#e58b72';
const WARN_D = '#4a2f26';

const SUB = ['#e06c5a', '#7fc79a', '#6f9ddb']; // R G B

export function mount(container, params = {}) {
  const COVER = !!params.cover;
  const { W, H } = LAYOUT[COVER ? 'cover' : 'article'];
  const state = {
    mask: MASKS[params.mask] ? params.mask : 'invar',
    dT: params.dT ?? 1,
    ppi: PPI_STEPS.includes(params.ppi) ? params.ppi : 3200,
    // 🔴 「12인치」·「8인치」는 관례 호칭이고 실제 지름은 300mm·200mm다
    //    (12 x 25.4 = 304.8 이 아니다). 그래서 mm 로 직접 잡는다.
    diaMm: params.diaMm === 200 ? 200 : 300,
  };

  container.innerHTML = `
    <div class="sim-head">Thermal overlay budget on a silicon wafer</div>
    <div class="sim-body">
      <div class="sim-canvas-wrap"><canvas data-c></canvas></div>
      <div class="sim-controls">
        <div class="sim-toggle-group">
          <label><input type="radio" name="oto-mask" value="invar"> Invar</label>
          <label><input type="radio" name="oto-mask" value="silicon"> Silicon</label>
          <label><input type="radio" name="oto-mask" value="sus"> SUS 304</label>
        </div>
        <div class="sim-toggle-group">
          <label><input type="radio" name="oto-dia" value="300"> 300 mm</label>
          <label><input type="radio" name="oto-dia" value="200"> 200 mm</label>
        </div>
        <div class="sim-control">
          <label>Temperature swing <span data-out="dt"></span> K</label>
          <input type="range" min="0" max="5" step="0.1" data-in="dt" />
        </div>
        <div class="sim-toggle-group">
          <label><input type="radio" name="oto-ppi" value="2645"> 2645 PPI</label>
          <label><input type="radio" name="oto-ppi" value="3200"> 3200 PPI</label>
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('[data-c]');
  const ctx = hidpi(canvas, W, H);

  function calc() {
    const m = MASKS[state.mask];
    const dAlpha = Math.abs(m.alpha - ALPHA_SI); // ppm/K
    const radiusUm = (state.diaMm * 1000) / 2;
    const delta = radiusUm * dAlpha * 1e-6 * state.dT; // um
    const sub = 25400 / state.ppi / 3; // um
    const ratio = (delta / sub) * 100;
    // 0.1um 예산을 지키는 온도 한계
    const dtLimit = dAlpha > 0 ? 0.1 / (radiusUm * dAlpha * 1e-6) : Infinity;
    return { m, dAlpha, delta, sub, ratio, dtLimit };
  }

  function draw() {
    const { delta, sub, ratio } = calc();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0a';
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    const ok = delta <= 0.1;
    const mid = delta <= 1.0;
    const tone = ok ? GREEN : mid ? INK : WARN;
    const toneD = ok ? GREEN_D : mid ? LINE : WARN_D;

    // 위: 웨이퍼 원과 가장자리에서 재는 자리
    const cx = 62;
    const cy = 68;
    const r = 44;
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    // 노치
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy + r);
    ctx.lineTo(cx + 6, cy + r);
    ctx.stroke();
    // 반경 화살
    ctx.strokeStyle = tone;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r, cy);
    ctx.stroke();
    ctx.fillStyle = tone;
    ctx.beginPath();
    ctx.arc(cx + r, cy, 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = MUTE;
    ctx.textAlign = 'center';
    ctx.fillText('R', cx + r / 2, cy - 6);
    ctx.fillText(state.diaMm + ' mm wafer', cx, cy + r + 16);
    ctx.textAlign = 'left';

    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = MUTE;
    ctx.fillText('centre aligned', 118, 34);
    ctx.fillText('edge shifts by', 118, 48);
    ctx.font = '17px "IBM Plex Mono", monospace';
    ctx.fillStyle = tone;
    ctx.fillText(delta.toFixed(3) + ' um', 118, 70);
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = MUTE;
    ctx.fillText(MASKS[state.mask].label, 118, 88);
    ctx.fillText('vs silicon ' + ALPHA_SI.toFixed(1) + ' ppm/K', 118, 102);

    // 아래: 서브픽셀 셋과 밀린 마스크 구멍
    const gy = 150;
    const gh = 54;
    const scale = Math.min(26, 196 / (sub * 3)); // px per um, 화면에 맞춘 것
    const sw = sub * scale;
    const gx = 26;

    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = MUTE;
    ctx.fillText('subpixel ' + sub.toFixed(2) + ' um at ' + state.ppi + ' PPI', gx, gy - 10);

    // 기판 쪽 서브픽셀 세 칸
    for (let i = 0; i < 3; i++) {
      const x = gx + i * sw;
      ctx.fillStyle = SUB[i];
      ctx.globalAlpha = 0.28;
      ctx.fillRect(x, gy, sw, gh);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = SUB[i];
      ctx.lineWidth = 0.9;
      ctx.strokeRect(x, gy, sw, gh);
    }

    // 마스크 구멍: delta 만큼 오른쪽으로 밀렸다.
    // 서브픽셀 1.6칸을 넘으면 캔버스를 벗어나므로 거기서 끊고 그 사실을 적는다.
    const shiftRaw = delta * scale;
    const shiftMax = sw * 1.6;
    const clipped = shiftRaw > shiftMax;
    const shift = Math.min(shiftRaw, shiftMax);
    for (let i = 0; i < 3; i++) {
      const x = gx + i * sw + shift;
      ctx.strokeStyle = tone;
      ctx.lineWidth = 1.6;
      ctx.setLineDash([3, 2]);
      ctx.strokeRect(x, gy - 7, sw, gh + 14);
      ctx.setLineDash([]);
    }
    ctx.font = '11px "IBM Plex Mono", monospace';
    ctx.fillStyle = tone;
    ctx.fillText('mask apertures' + (clipped ? ' (cut off here)' : ''), gx, gy + gh + 20);
    ctx.fillStyle = MUTE;
    ctx.fillText('shift is ' + ratio.toFixed(1) + '% of one subpixel', gx, gy + gh + 34);

    // 맨 아래: 두 기준선 막대 (로그 눈금, 0.01~10um)
    const bx = 26;
    const by = 262;
    const bw = W - 52;
    const lo = Math.log10(0.01);
    const hi = Math.log10(10);
    const pos = (v) => bx + bw * ((Math.log10(Math.max(v, 0.01)) - lo) / (hi - lo));
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, 10);
    ctx.fillStyle = toneD;
    ctx.fillRect(bx, by, Math.max(0, pos(delta) - bx), 10);
    [['0.1', 0.1], ['1', 1.0]].forEach(([lab, v]) => {
      const x = pos(v);
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(x, by - 4);
      ctx.lineTo(x, by + 14);
      ctx.stroke();
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.fillStyle = MUTE;
      ctx.textAlign = 'center';
      ctx.fillText(lab, x, by + 25);
      ctx.textAlign = 'left';
    });
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillStyle = LINE;
    ctx.fillText('reported need', bx, by - 7);
    ctx.textAlign = 'right';
    ctx.fillText('SID 2026 demo', bx + bw, by - 7);
    ctx.textAlign = 'left';
  }

  function render() {
    const { delta, ratio, dtLimit, dAlpha } = calc();
    container.querySelector('[data-out="dt"]').textContent = state.dT.toFixed(1);

    let verdict;
    if (dAlpha === 0) verdict = 'same material, nothing to drift';
    else if (delta <= 0.1) verdict = 'inside the reported production need';
    else if (delta <= 1.0) verdict = 'inside the demo figure, past the need';
    else verdict = 'past both figures';

    const limitText =
      dAlpha === 0
        ? 'no limit'
        : dtLimit.toFixed(2) + ' K';

    container.querySelector('[data-out="readout"]').innerHTML =
      'Edge overlay error <b>' + delta.toFixed(3) + ' um</b><br />' +
      'Share of one subpixel <b>' + ratio.toFixed(1) + '%</b><br />' +
      'Swing allowed for 0.1 um <b>' + limitText + '</b><br />' +
      '<span style="color:' + (delta <= 0.1 ? GREEN : delta <= 1.0 ? MUTE : WARN) + '">' +
      verdict + '</span>';
    draw();
  }

  [...container.querySelectorAll('input[name="oto-mask"]')].forEach((rb) => {
    rb.checked = rb.value === state.mask;
    rb.addEventListener('change', () => {
      state.mask = rb.value;
      render();
    });
  });
  [...container.querySelectorAll('input[name="oto-dia"]')].forEach((rb) => {
    rb.checked = Number(rb.value) === state.diaMm;
    rb.addEventListener('change', () => {
      state.diaMm = Number(rb.value);
      render();
    });
  });

  [...container.querySelectorAll('input[name="oto-ppi"]')].forEach((rb) => {
    rb.checked = Number(rb.value) === state.ppi;
    rb.addEventListener('change', () => {
      state.ppi = Number(rb.value);
      render();
    });
  });

  const dtIn = container.querySelector('[data-in="dt"]');
  dtIn.value = state.dT;
  dtIn.addEventListener('input', (e) => {
    state.dT = Number(e.target.value);
    render();
  });

  render();
}

export default mount;
