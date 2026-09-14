// 시뮬레이션 — 디스플레이 아래 티타늄판이 EMR 펜 신호는 죽이고 정전식 펜 신호는 건드리지
// 않는 이유를 단면의 장(field) 선으로 보여준다. 이 기사 「티타늄을 넣은 폴더블에서 애플은
// 어떻게 펜을 살렸나」 절의 그림 2를 움직이게 한 것이다.
//
// 근거
// - 삼성전자 US12260058B2: 디지타이저는 디스플레이 바로 아래, 금속판은 그 아래.
//   "와전류가 만든 자기장이 전자펜 자기장과 반대 방향으로 생겨 펜 자기장 세기가 줄고
//   좌표가 왜곡될 수 있다."
// - 3M US7916501: 디지타이저와 나란한 근처 도체에 와전류가 유도되면 펜에 전력을 보내는
//   자기장이 약해진다.
//
// 모델 (교과서 영상법 두 개. 맞춘 상수 없음)
// - EMR: 펜 코일을 수직 자기 쌍극자로 둔다. 판을 이상 도체로 보면 판 표면에서 수직 자기장이
//   0 이 되어야 하므로, 판 아래 거울 위치에 방향이 반대인 쌍극자가 생긴 것과 같다.
//   실제 티타늄은 이상 도체가 아니므로 거울상의 세기를 k(0~1)로 두고 슬라이더로 드러냈다.
//   k 의 실제 값은 판 두께·재질·펜 주파수에 달려 있고 공개되지 않았다.
// - 디지타이저 바로 아래(축 위) 수직 자기장 비율 = 1 - k * (h / (h + 2d))^3.
//   h 는 펜 코일~디지타이저 거리, d 는 디지타이저~판 거리. 거리는 h 를 1 로 둔 배수다.
// - EMR 은 센서가 펜에 전력을 보내고(송신) 펜이 되돌려 보낸 신호를 듣는다(수신). 상호유도는
//   가역이므로 왕복 신호는 위 비율의 제곱으로 줄어든다.
// - 정전식: 펜 끝을 점전하로, OLED 음극을 접지된 도체 평면으로 둔다. 도체 평면 아래로는
//   전기장이 들어가지 않으므로 그 아래 티타늄판의 유무·거리와 무관하다.
// - 그리지 않은 것: 디지타이저 코일 자체의 인덕턴스 변화, 판의 슬릿·자성 차폐 시트 같은
//   대책(위 특허들이 제시), OLED 음극의 와전류. 음극은 나노미터 두께의 얇은 막이라 EMR
//   주파수에서 와전류가 작다고 보고 EMR 모델에서 뺐다.
// - 층 두께와 간격은 개념도 비율이며 실제 치수가 아니다.
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙).

import { hidpi } from './_hidpi.js';

const W = 440;
const H = 366;
const S = 100;          // px per 거리 단위(= 펜 코일~디지타이저 거리)
const CX = 220;
const Z0 = 150;         // z = 0 (디스플레이 스택 바닥 = 디지타이저 위치)의 y

const Z_TOP = 0.70;     // 커버 윗면 = 펜 끝
const Z_BOT = 0.08;     // 디스플레이 스택 아랫면
const ZC = 1.0;         // EMR 펜 코일 중심
const Z_TOUCH = 0.45;   // 정전식 터치 센서
const Z_CATH = 0.30;    // OLED 음극
const PLATE_T = 0.14;   // 판 두께(그림용)

// 🔴 표지는 원색에 가깝게 쓴다(2026-09-14 대표 지시). 흙빛 주황·연두·58% 흰 글씨는
// 표지로 줄이면 전부 흐려져 사라졌다. 글자는 흰색을 깎지 않는다.
const INK = '#ffffff';
const DIM = 'rgba(255,255,255,0.90)';
const FAINT = 'rgba(255,255,255,0.66)';
const C_EMR = '#ff8c1a';
const C_CAP = '#1fdc6a';
const C_TI = '#b8bcc0';

const X = (x) => CX + x * S;
const Y = (z) => Z0 - z * S;

export function mount(container, params = {}) {
  // 🔴 표지 구도(cover)는 글자 크기만 바꾼다(2026-09-14). 본문용 13px 는 표지 무대에서
  // 폰 폭(캔버스 294px)으로 줄면 9px 가 되어 대표가 「글자가 안 보인다」고 짚었다.
  // 캔버스 크기·좌표·장 계산은 본문과 같다.
  const COVER = !!params.cover;
  const FS = COVER ? 18 : 13;       // 그림 안 이름표
  const FS_PLATE = COVER ? 13 : 12; // 판 위 글자 — 판 두께(14px)를 넘으면 윗부분이 잘린다
  const FS_BAR = COVER ? 16 : 13;   // 막대 설명
  const BAR_H = COVER ? 14 : 10;
  const BAR_GAP = COVER ? 50 : 36;
  const state = {
    mode: params.mode ?? 'emr',
    plate: params.plate ?? true,
    d: params.d ?? 0.15,
    k: params.k ?? 1,
  };

  container.innerHTML = `
    <div class="sim-head">
      <span class="sim-tag">Model</span>
      <span>Same titanium plate. One pen loses its signal, the other never sees the plate.</span>
    </div>
    <div class="sim-body">
      <div class="sim-canvas-wrap">
        <canvas width="${W}" height="${H}"></canvas>
      </div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Pen type</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-mode="emr" aria-pressed="false">EMR</button>
            <button type="button" class="sim-toggle-btn" data-mode="cap" aria-pressed="false">Capacitive</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Titanium plate</label>
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-plate="1" aria-pressed="false">In</button>
            <button type="button" class="sim-toggle-btn" data-plate="0" aria-pressed="false">Out</button>
          </div>
        </div>
        <div class="sim-control">
          <label>Plate gap below the sensor &mdash; <span data-out="d"></span> &times; pen distance <span data-out="dnote"></span></label>
          <input type="range" min="8" max="100" step="1" data-in="d" />
        </div>
        <div class="sim-control">
          <label>Eddy-current strength k &mdash; <span data-out="k"></span> (1 = ideal conductor) <span data-out="knote"></span></label>
          <input type="range" min="0" max="100" step="1" data-in="k" />
        </div>
        <div class="sim-readout" data-out="readout"></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = hidpi(canvas, W, H);
  const $ = (s) => container.querySelector(s);
  const modeBtns = Array.from(container.querySelectorAll('[data-mode]'));
  const plateBtns = Array.from(container.querySelectorAll('[data-plate]'));
  const dIn = $('[data-in="d"]');
  const kIn = $('[data-in="k"]');
  dIn.value = String(Math.round(state.d * 100));
  kIn.value = String(Math.round(state.k * 100));

  // ── 장 계산 ──
  // 점전하(q, 위치 z0) + 음극에 대한 영상전하
  function eField(x, z) {
    const zq = Z_TOP + 0.02;
    const zi = 2 * Z_CATH - zq;
    const f = (q, z0) => {
      const dz = z - z0;
      const r3 = Math.pow(x * x + dz * dz, 1.5);
      return [(q * x) / r3, (q * dz) / r3];
    };
    const a = f(1, zq), b = f(-1, zi);
    return [a[0] + b[0], a[1] + b[1]];
  }

  function trace(field, x, z, stop, color, alpha) {
    const h = 0.012;
    ctx.beginPath();
    ctx.moveTo(X(x), Y(z));
    for (let i = 0; i < 1400; i += 1) {
      let [fx, fz] = field(x, z);
      let n = Math.hypot(fx, fz) || 1;
      const mx = x + (fx / n) * h * 0.5, mz = z + (fz / n) * h * 0.5;
      [fx, fz] = field(mx, mz);
      n = Math.hypot(fx, fz) || 1;
      x += (fx / n) * h;
      z += (fz / n) * h;
      ctx.lineTo(X(x), Y(z));
      if (stop(x, z, i)) break;
    }
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // ── 그리기 ──
  // 그림 안 글자는 13px 굵게. 10.5px 는 기사 지면에서도 흐리고 표지로 줄이면 읽히지 않았다.
  function label(text, x, y, color, align = 'left', font = `600 ${FS}px "IBM Plex Mono", monospace`) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
  }

  // 선 위에 올라가는 글자는 어두운 받침을 깐다. 같은 색 선 위에서는 글자가 묻혔다
  // (「Digitizer」 주황 글자가 주황 자기력선에 사라짐, 2026-09-14 원색 전환 시안).
  function pillLabel(text, x, y, color, align = 'left') {
    ctx.font = `600 ${FS}px "IBM Plex Mono", monospace`;
    const w = ctx.measureText(text).width;
    const bx = align === 'right' ? x - w - 5 : x - 5;
    ctx.fillStyle = 'rgba(10,10,8,0.82)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(bx, y - FS, w + 10, FS + 5, 3);
    else ctx.rect(bx, y - FS, w + 10, FS + 5);
    ctx.fill();
    label(text, x, y, color, align);
  }

  // ── 표지 고급화 (2026-09-14) ──
  // 층 판과 펜을 실물처럼 그린다. 판·펜은 실제로 입체인 물체라 광택과 음영을 넣어도
  // 정직하다(편집규칙 「표지 시뮬레이터」 ②). 🔴 장 계산(psi·eField·signal)과
  // 모든 좌표·두께는 한 줄도 바꾸지 않았다 — 바뀐 것은 칠하는 방식뿐이다.
  // 캔버스 크기도 그대로라 표지 무대 폭을 넘지 않는다(같은 절 ③).

  function drawStack() {
    // 디스플레이 스택
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fillRect(12, Y(Z_TOP), W - 24, Y(Z_BOT) - Y(Z_TOP));
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 1;
    ctx.strokeRect(12.5, Y(Z_TOP) + 0.5, W - 25, Y(Z_BOT) - Y(Z_TOP));
    // 커버 유리 윗면: 가는 반사 띠
    const gGlass = ctx.createLinearGradient(0, Y(Z_TOP), 0, Y(Z_TOP) + 6);
    gGlass.addColorStop(0, 'rgba(255,255,250,0.30)');
    gGlass.addColorStop(1, 'rgba(255,255,250,0)');
    ctx.fillStyle = gGlass;
    ctx.fillRect(13, Y(Z_TOP) + 1, W - 26, 6);
    pillLabel('Display stack', 18, Y(Z_TOP) + 15, INK);

    if (state.mode === 'emr') {
      ctx.fillStyle = C_EMR;
      ctx.fillRect(12, Y(0.035), W - 24, 5);
      ctx.fillStyle = 'rgba(255,230,205,0.45)';
      ctx.fillRect(12, Y(0.035), W - 24, 1);
      pillLabel('Digitizer', 18, Y(0.035) - 5, C_EMR);
    } else {
      ctx.fillStyle = C_CAP;
      for (let x = 20; x < W - 20; x += 22) ctx.fillRect(x, Y(Z_TOUCH) - 2, 14, 4);
      pillLabel('Touch sensor', W - 18, Y(Z_TOUCH) - 6, C_CAP, 'right');
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fillRect(12, Y(Z_CATH) - 1.5, W - 24, 3);
      pillLabel('OLED cathode: a conductor already', W - 18, Y(Z_CATH) + 15, INK, 'right');
    }

    if (state.plate) {
      const yT = Y(-state.d);
      const hT = PLATE_T * S;
      // 금속 판 단면: 위가 밝고 아래가 어두운 세로 음영 + 윗모서리 반사선
      const gTi = ctx.createLinearGradient(0, yT, 0, yT + hT);
      gTi.addColorStop(0, '#eef0f2');
      gTi.addColorStop(0.5, C_TI);
      gTi.addColorStop(1, '#8e9296');
      ctx.fillStyle = gTi;
      ctx.fillRect(12, yT, W - 24, hT);
      ctx.fillStyle = 'rgba(255,255,250,0.55)';
      ctx.fillRect(12, yT, W - 24, 1);
      ctx.fillStyle = 'rgba(0,0,0,0.30)';
      ctx.fillRect(12, yT + hT - 1, W - 24, 1);
      label('Titanium plate', 18, yT + PLATE_T * S - 3.5, 'rgba(20,20,16,0.85)', 'left',
        `700 ${FS_PLATE}px "IBM Plex Sans KR", sans-serif`);
      if (state.mode === 'emr' && state.k > 0) {
        // 와전류 표시: 점(나오는 방향)과 가위표(들어가는 방향)
        const yc = yT + (PLATE_T * S) / 2;
        const a = 0.35 + 0.6 * state.k;
        for (const [sx, sym] of [[-0.7, 'dot'], [0.7, 'x']]) {
          const px = X(sx);
          ctx.strokeStyle = `rgba(20,20,16,${a})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(px, yc, 3.6, 0, Math.PI * 2);
          ctx.stroke();
          if (sym === 'dot') {
            ctx.fillStyle = `rgba(20,20,16,${a})`;
            ctx.beginPath(); ctx.arc(px, yc, 1.2, 0, Math.PI * 2); ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(px - 2.2, yc - 2.2); ctx.lineTo(px + 2.2, yc + 2.2);
            ctx.moveTo(px + 2.2, yc - 2.2); ctx.lineTo(px - 2.2, yc + 2.2);
            ctx.stroke();
          }
        }
        label('eddy currents', X(0.7) + 9, yT + PLATE_T * S - 3.5, 'rgba(20,20,16,0.8)', 'left',
          `600 ${FS_PLATE}px "IBM Plex Mono", monospace`);
      } else if (state.mode === 'cap') {
        label('no field reaches here', W - 18, yT + PLATE_T * S - 3.5, 'rgba(20,20,16,0.8)', 'right',
          `600 ${FS_PLATE}px "IBM Plex Mono", monospace`);
      }
    }

    drawPen();
  }

  // 펜: 반투명 원통으로 그려 안의 코일과 그 코일에서 나오는 자기력선이 비쳐 보이게 한다.
  // 불투명하게 칠하면 쌍극자 중심을 가려 이 그림이 보여주려는 것이 사라진다.
  function drawPen() {
    const px = X(0);
    const tipY = Y(Z_TOP);
    const color = state.mode === 'emr' ? C_EMR : C_CAP;
    // 몸통은 캔버스 위로 뚫고 나가게 둔다. 짧게 끊어 둥근 머리를 그리면 필기구가 아니라
    // 시험관처럼 읽혔다(2026-09-14 첫 시안). 긴 펜을 가까이서 찍은 구도가 펜으로 읽힌다.
    const bw = 10;                 // 몸통 반폭
    const yTop = -4;               // 몸통 윗끝: 캔버스 밖
    const yBody = Y(Z_TOP + 0.22); // 몸통 끝 = 원추 시작 (코일 바로 아래)
    const yCone = Y(Z_TOP + 0.05); // 원추 끝 = 펜촉 시작
    const nw = 3.2;                // 펜촉 반폭

    // 펜촉이 유리에 닿는 자리의 옅은 빛
    const glow = ctx.createRadialGradient(px, tipY, 0, px, tipY, 16);
    glow.addColorStop(0, state.mode === 'emr' ? 'rgba(255,140,26,0.50)' : 'rgba(31,220,106,0.50)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(px - 16, tipY - 16, 32, 32);

    // 펜 뒤 어두운 층. 선을 굵고 진하게 바꾼 뒤 펜 윤곽이 선에 묻혔다.
    // 완전히 가리지 않고 반만 눌러, 코일로 모이는 선은 여전히 비쳐 보이게 둔다.
    ctx.fillStyle = 'rgba(10,10,8,0.50)';
    ctx.beginPath();
    ctx.moveTo(px - bw, yTop);
    ctx.lineTo(px - bw, yBody);
    ctx.lineTo(px - nw, yCone);
    ctx.lineTo(px + nw, yCone);
    ctx.lineTo(px + bw, yBody);
    ctx.lineTo(px + bw, yTop);
    ctx.closePath();
    ctx.fill();

    // 몸통: 가로 음영(왼쪽 반사, 오른쪽 그늘)
    const gBody = ctx.createLinearGradient(px - bw, 0, px + bw, 0);
    gBody.addColorStop(0, 'rgba(160,160,150,0.20)');
    gBody.addColorStop(0.22, 'rgba(255,255,250,0.42)');
    gBody.addColorStop(0.40, 'rgba(255,255,250,0.12)');
    gBody.addColorStop(0.78, 'rgba(255,255,250,0.06)');
    gBody.addColorStop(1, 'rgba(90,90,82,0.26)');
    ctx.fillStyle = gBody;
    ctx.fillRect(px - bw, yTop, bw * 2, yBody - yTop);

    // 원추
    const gCone = ctx.createLinearGradient(px - bw, 0, px + bw, 0);
    gCone.addColorStop(0, 'rgba(160,160,150,0.30)');
    gCone.addColorStop(0.28, 'rgba(255,255,250,0.38)');
    gCone.addColorStop(1, 'rgba(90,90,82,0.34)');
    ctx.fillStyle = gCone;
    ctx.beginPath();
    ctx.moveTo(px - bw, yBody);
    ctx.lineTo(px - nw, yCone);
    ctx.lineTo(px + nw, yCone);
    ctx.lineTo(px + bw, yBody);
    ctx.closePath();
    ctx.fill();

    // 윤곽선
    ctx.strokeStyle = 'rgba(255,255,255,0.92)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(px - bw + 0.5, yTop);
    ctx.lineTo(px - bw + 0.5, yBody);
    ctx.lineTo(px - nw, yCone);
    ctx.moveTo(px + bw - 0.5, yTop);
    ctx.lineTo(px + bw - 0.5, yBody);
    ctx.lineTo(px + nw, yCone);
    ctx.stroke();

    // 정반사 하이라이트 한 줄
    const gSpec = ctx.createLinearGradient(0, 0, 0, yBody);
    gSpec.addColorStop(0, 'rgba(255,255,250,0.50)');
    gSpec.addColorStop(1, 'rgba(255,255,250,0.10)');
    ctx.fillStyle = gSpec;
    ctx.fillRect(px - bw * 0.52, 0, 1.6, yBody);

    // 모드 색 띠: 어느 방식의 펜인지 색으로 이어 준다
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(px - bw + 1, yBody - 6, bw * 2 - 2, 2.5);
    ctx.globalAlpha = 1;

    // 펜촉
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(px - nw, yCone);
    ctx.lineTo(px, tipY);
    ctx.lineTo(px + nw, yCone);
    ctx.closePath();
    ctx.fill();

    if (state.mode === 'emr') {
      // 페라이트 코어
      ctx.fillStyle = 'rgba(70,70,64,0.80)';
      ctx.fillRect(px - 2, Y(ZC + 0.17), 4, Y(ZC - 0.17) - Y(ZC + 0.17));
      // 코일: 뒤쪽 반은 흐리게, 앞쪽 반은 진하게 그려 감긴 방향이 입체로 보이게
      ctx.lineWidth = 1.2;
      for (let i = -2; i <= 2; i += 1) {
        const cy = Y(ZC) + i * 4;
        ctx.strokeStyle = 'rgba(255,140,26,0.45)';
        ctx.beginPath();
        ctx.ellipse(px, cy, 8.5, 2, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.ellipse(px, cy, 8.5, 2, 0, 0, Math.PI);
        ctx.stroke();
      }
      pillLabel('pen coil', px + bw + 10, Y(ZC) + 4.5, color);
    } else {
      pillLabel('driven tip', px + bw + 9, tipY - 4, color);
    }
  }

  // 축대칭 자기장의 자속 함수(Stokes stream function). 등고선이 곧 자기력선이고,
  // 같은 간격의 값으로 그리면 선의 촘촘함이 자속 밀도가 된다.
  // 쌍극자 하나: psi = m r^2 / R^3. 거울상은 모멘트 -k 이므로 그대로 뺀다.
  function psi(x, z) {
    const r2 = x * x;
    let v = r2 / Math.pow(r2 + (z - ZC) * (z - ZC), 1.5);
    if (state.plate && state.k > 0) {
      const zi = -2 * state.d - ZC;
      v -= (state.k * r2) / Math.pow(r2 + (z - zi) * (z - zi), 1.5);
    }
    return v;
  }

  function drawEmrLines() {
    const DX = 0.02;
    const x0 = -2.2, x1 = 2.2;
    const z0 = state.plate ? -state.d : -1.12;
    const z1 = 1.55;
    const nx = Math.round((x1 - x0) / DX);
    const nz = Math.ceil((z1 - z0) / DX);
    const g = new Float64Array((nx + 1) * (nz + 1));
    for (let j = 0; j <= nz; j += 1) {
      for (let i = 0; i <= nx; i += 1) {
        g[j * (nx + 1) + i] = psi(x0 + i * DX, z0 + j * DX);
      }
    }
    ctx.strokeStyle = C_EMR;
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    const LEVELS = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95];
    for (const c of LEVELS) {
      for (let j = 0; j < nz; j += 1) {
        for (let i = 0; i < nx; i += 1) {
          const a = g[j * (nx + 1) + i], b = g[j * (nx + 1) + i + 1];
          const d = g[(j + 1) * (nx + 1) + i], e = g[(j + 1) * (nx + 1) + i + 1];
          const pts = [];
          const edge = (va, vb, xa, za, xb, zb) => {
            if ((va - c) * (vb - c) < 0) {
              const t = (c - va) / (vb - va);
              pts.push([xa + t * (xb - xa), za + t * (zb - za)]);
            }
          };
          const xa = x0 + i * DX, za = z0 + j * DX;
          edge(a, b, xa, za, xa + DX, za);
          edge(b, e, xa + DX, za, xa + DX, za + DX);
          edge(e, d, xa + DX, za + DX, xa, za + DX);
          edge(d, a, xa, za + DX, xa, za);
          if (pts.length >= 2) {
            ctx.moveTo(X(pts[0][0]), Y(pts[0][1]));
            ctx.lineTo(X(pts[1][0]), Y(pts[1][1]));
            if (pts.length === 4) {
              ctx.moveTo(X(pts[2][0]), Y(pts[2][1]));
              ctx.lineTo(X(pts[3][0]), Y(pts[3][1]));
            }
          }
        }
      }
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawCapLines() {
    const zq = Z_TOP + 0.02;
    for (let deg = -172; deg <= -8; deg += 12) {
      const a = (deg * Math.PI) / 180;
      trace(eField, 0.02 * Math.cos(a), zq + 0.02 * Math.sin(a),
        (x, z) => z <= Z_CATH || Math.abs(x) > 2.3 || z > 1.6, C_CAP, 1);
    }
  }

  function signal() {
    if (state.mode === 'cap' || !state.plate) return { one: 1, trip: 1 };
    const one = 1 - state.k * Math.pow(ZC / (ZC + 2 * state.d), 3);
    return { one, trip: one * one };
  }

  function bar(y, frac, text, color) {
    const x0 = 18, w = W - 36;
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fillRect(x0, y, w, BAR_H);
    ctx.fillStyle = color;
    ctx.fillRect(x0, y, w * Math.max(0, frac), BAR_H);
    const f = `600 ${FS_BAR}px "IBM Plex Mono", monospace`;
    label(text, x0, y - 6, DIM, 'left', f);
    label(Math.round(frac * 100) + '%', x0 + w, y - 6, INK, 'right', f);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, Y(-1.12)); ctx.clip();
    if (state.mode === 'emr') drawEmrLines();
    else drawCapLines();
    ctx.restore();
    drawStack();

    const s = signal();
    const color = state.mode === 'emr' ? C_EMR : C_CAP;
    // 표지는 막대를 아래로 붙여 글자가 커진 만큼 자리를 낸다
    const y1 = COVER ? H - 14 - BAR_H - BAR_GAP : Y(-1.30) + 8;
    const noteFont = `600 ${FS_BAR}px "IBM Plex Mono", monospace`;
    if (state.mode === 'emr') {
      bar(y1, s.one, 'Field at the digitizer, vs. no plate', color);
      bar(y1 + BAR_GAP, s.trip, 'Pen signal after the round trip', color);
    } else {
      // 표지 16px 에서는 본문 문구가 막대 폭(404px)을 넘어 % 와 겹친다
      bar(y1, s.one, COVER ? 'Signal at touch sensor vs. no plate' : 'Pen signal at the touch sensor, vs. no plate', color);
      label('The cathode above the plate', 18, y1 + (COVER ? 40 : 32), FAINT, 'left', noteFont);
      label('already ends every field line.', 18, y1 + (COVER ? 60 : 50), FAINT, 'left', noteFont);
    }

    $('[data-out="d"]').textContent = state.d.toFixed(2);
    $('[data-out="k"]').textContent = state.k.toFixed(2);
    $('[data-out="readout"]').innerHTML = state.mode === 'emr'
      ? (state.plate
        ? `EMR &middot; round-trip signal <b>${Math.round(s.trip * 100)}%</b> of no-plate`
        : 'EMR &middot; no plate, full signal')
      : 'Capacitive &middot; signal <b>100%</b>, plate in or out';
  }

  // 결과에 영향이 없는 슬라이더는 잠그고 이유를 적는다.
  // k 는 EMR 에 판이 있을 때만, 거리는 판이 있을 때만 의미가 있다.
  function lockSliders() {
    const kOn = state.mode === 'emr' && state.plate;
    const dOn = state.plate;
    kIn.disabled = !kOn;
    dIn.disabled = !dOn;
    kIn.closest('.sim-control').style.opacity = kOn ? '' : '0.45';
    dIn.closest('.sim-control').style.opacity = dOn ? '' : '0.45';
    $('[data-out="knote"]').textContent = !state.plate
      ? '· no plate'
      : state.mode === 'cap' ? '· no effect: the field never reaches the plate' : '';
    $('[data-out="dnote"]').textContent = !state.plate ? '· no plate' : '';
  }

  function sync() {
    modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));
    plateBtns.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.plate === '1') === state.plate)));
    lockSliders();
    draw();
  }

  modeBtns.forEach((b) => b.addEventListener('click', () => { state.mode = b.dataset.mode; sync(); }));
  plateBtns.forEach((b) => b.addEventListener('click', () => { state.plate = b.dataset.plate === '1'; sync(); }));
  dIn.addEventListener('input', () => { state.d = Number(dIn.value) / 100; draw(); });
  kIn.addEventListener('input', () => { state.k = Number(kIn.value) / 100; draw(); });

  sync();
  // 캔버스 글자는 웹 글꼴이 늦게 오면 대체 글꼴로 박힌 채 남는다(2026-09-14 표지 캡처에서 확인).
  // 글꼴 로드가 끝나면 한 번 더 그린다.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => draw());
}
