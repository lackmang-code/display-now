// 시뮬레이션 — 화면 아래 카메라(UDC) 위 화소 배열 세 갈래를 3D 로 비교한다.
// 클레임 「아이폰 18 Pro UDC 화소 구조 특허 분석」(2026-10-13) 의 그림 3 을 움직이는 장면으로 옮긴 것이다.
//
// 이 그림이 답하는 질문 하나: **빛길을 가장 넓게 내는 구조가 왜 양산 구조가 아닌가.**
//
// 슬라이더는 시간 순서로 간다 — 1세대(덜어 내기) → 2세대(회로를 밖으로, 투명 배선) → 1.5세대(다시 덜어 내기).
// 「갔다가 돌아왔다」는 원고의 줄거리가 슬라이더를 끝까지 밀면 그대로 보인다.
//
// 모델과 근거 — 지어낸 수치가 없다.
// - 1세대 「넷 중 하나만 남기고 키운다」는 원고 그림 3 의 작도를 따른다(밀도는 출원마다 다르다).
// - 2세대 「회로를 원 밖으로, 투명 배선(ITO)으로 잇는다」는 톈마 2019 · LG디스플레이 2019 명세서.
//   「마스크 최대 4장 추가」는 삼성디스플레이 2021 출원이 스스로 적은 값이다.
// - 1.5세대 「한 줄 걸러 비우고, 회로는 남은 줄에 띠로 몬다」는 애플 EP4193388B1 그림 6·9.
//   🔴 이 배열은 애플 청구항 1 이 아니라 **명세서·도면**에 있다(원고 7.1). 그래서 「first claimed」라 쓰지 않고 「earliest」라 쓴다.
//   「카메라 위 화소 밀도 절반」은 9to5Mac 이 전한 애플 확인이다.
// - 🔴 **투과율 % 는 쓰지 않는다.** 원고에 측정값이 없다. 그래서 빛줄기도 세 세대가 같은 개수·밝기다
//   (빛의 양을 비교하는 그림으로 읽히지 않게). 고지문은 원고 <template data-sim-note> 가 갖는다.
// - 크기와 간격은 비례가 아니다(원고 그림 3 과 같다). 화소를 보이게 키웠다.
// - 빛은 적외선이라 눈에 보이지 않는다. 빨강으로 그린 것은 표현이다.
//
// 왜 3D 인가. 패널과 그 아래 카메라 모듈이 실물 3차원 적층이다(편집규칙 「3D 음영은 대상이 3차원 물체일 때만」).
// 🔴 표지 모드(`cover: true`)는 장면만 크게, 스튜디오 배경을 깐다(제8호 대표 A안과 같은 방식).
// 캔버스 안 글자는 전부 영어 · 원색 · 13px 굵게 · 받침(편집규칙 표지 ④).

import { hidpi } from './_hidpi.js';

// 🔴 표지 무대 안쪽 폭 704px, 시뮬 몸통 좌우 여백 40px → 캔버스는 664px 이하.
const LAYOUT = {
  article: { W: 620, H: 510 },
  cover: { W: 620, H: 440 },
};

const C_OK = '#1fdc6a';
const C_NO = '#ff8c1a';
const C_IR = '#ff4d5e';
const C_GOLD = '#f5b83d';
const SUB = [
  // [du, dv, 반폭(셀 단위), 색] — 빨강·초록·파랑 셋을 한 칸에
  [-0.22, -0.2, 0.15, '#ff3b3b'],
  [0.22, -0.2, 0.15, '#2bff6a'],
  [0.0, 0.24, 0.17, '#3b7bff'],
];

// 세대 정의. 순서는 시간 순 — 슬라이더 0 → 1 → 2.
const GENS = [
  {
    key: 'g1', name: '1st gen · thin out', short: '1st gen',
    pixels: 'sparse (1 in 4 here)', circuits: 'stay + metal lines', masks: '+0',
    first: 'Sony 2009 claim',
    line: 'remove pixels over the camera — the ones left are enlarged to last',
    big: '+0', bigCol: C_OK, bigSub: 'extra masks', tag: 'circuits left over the camera still block light', tagCol: 'rgba(225,235,245,0.95)',
  },
  {
    key: 'g2', name: '2nd gen · circuits out', short: '2nd gen',
    pixels: 'full density', circuits: 'moved outside, linked by ITO wires', masks: 'up to +4',
    first: 'Tianma 2019 claim',
    line: 'keep every pixel, move circuits out — transparent wires carry the signal',
    big: '+4', bigCol: C_NO, bigSub: 'extra masks (up to)', tag: 'widest light path, costly process',
  },
  {
    key: 'g15', name: '1.5 gen · every other row', short: '1.5 gen',
    pixels: '1 in 2 (Apple: half)', circuits: 'stay, packed in a strip', masks: '+0',
    first: 'Apple 2018 spec · 2020 drawing',
    line: 'every other pixel row removed — circuits stay, no extra layers',
    big: '+0', bigCol: C_OK, bigSub: 'extra masks', tag: 'what iPhone 18 Pro shipped',
  },
];

export function mount(container, params = {}) {
  const COVER = !!params.cover;
  const { W, H } = LAYOUT[COVER ? 'cover' : 'article'];
  const startKey = params.gen || 'g15';
  const state = { g: Math.max(0, GENS.findIndex((x) => x.key === startKey)) };

  container.innerHTML = `
    <div class="sim-head">Pixels over an under-display camera — three ways to open a light path</div>
    <div class="sim-body">
      <div class="sim-canvas-wrap"><canvas data-c></canvas></div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Generation (in time order)</label>
          <div class="sim-toggle-group" data-g>
            ${GENS.map((g, k) => `<button type="button" class="sim-toggle-btn" data-val="${k}" aria-pressed="${k === state.g}">${g.short}</button>`).join('')}
          </div>
        </div>
        <div class="sim-readout" data-out></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('[data-c]');
  const ctx = hidpi(canvas, W, H);
  // 세 갈래는 연속값이 아니라 셋 중 하나라 슬라이더 대신 세 칸 단추(사이트 공용 .sim-toggle-group)를 쓴다.
  // 슬라이더는 칸 이름이 없어 어느 쪽이 1세대인지 밀어 보기 전엔 몰랐다(2026-10-12 대표 지적).
  const btns = Array.from(container.querySelectorAll('[data-g] .sim-toggle-btn'));
  const out = container.querySelector('[data-out]');

  const hexA = (hex, a) => {
    const v = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((v >> 16) & 255) + ',' + ((v >> 8) & 255) + ',' + (v & 255) + ',' + a + ')';
  };

  function label(text, x, y, color, align, size) {
    const s = size || 13;
    ctx.font = '700 ' + s + 'px "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(text).width;
    const px = 6, hh = s * 0.74;
    const lx = align === 'right' ? x - tw - px : align === 'center' ? x - tw / 2 - px : x - px;
    ctx.fillStyle = 'rgba(8,10,12,0.72)';
    ctx.beginPath(); ctx.roundRect(lx, y - hh, tw + px * 2, hh * 2, 5); ctx.fill();
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  // ── 무대 기하. 패널 평면 좌표 (u, v) ∈ [-0.5, 0.5] 을 아이소메트릭으로 투영한다.
  // 🔴 첫 판은 18칸·창 반지름 0.2 였는데 썸네일에서 「한 줄 걸러 비운」 무늬가 안 읽혔다(2026-10-12 실측).
  // 칸을 줄이고 창을 키워 무늬가 표지 크기에서 보이게 했다. 비례가 아니라는 고지는 그대로다.
  const N = 14;                        // 한 변 화소 칸 수
  const CELL = 1 / N;
  const SX = 250, SY = 112;
  // 표지는 라벨을 걷어내 가운데(310)에 둔다(대표 지적 「그림이 우측으로 가 있다」). 본문용은 왼쪽 라벨 자리 때문에 오른쪽.
  const CX = COVER ? 310 : 360, CY = COVER ? 184 : 165;
  const THK = 10;                      // 패널 두께(그림)
  const UC = 0.12, VC = 0.12, RC = 0.27; // 카메라 창 중심·반지름(패널 좌표)
  const DROP = 134;                    // 패널에서 카메라 렌즈 윗면까지(화면 y)
  const P = (u, v) => [CX + (u - v) * SX, CY + (u + v) * SY];
  const [WX, WY] = P(UC, VC);          // 카메라 창 중심(화면)
  const WRX = RC * SX * Math.SQRT2, WRY = RC * SY * Math.SQRT2;
  const LX = WX, LY = WY + DROP;       // 렌즈 윗면 중심
  const LRX = 50, LRY = 23, BARREL = 34;

  const inWin = (u, v) => (u - UC) ** 2 + (v - VC) ** 2 <= RC * RC;

  // 패널 좌표의 작은 정사각(반폭 e) → 화면의 마름모
  function quad(u, v, eu, ev) {
    const a = P(u - eu, v - ev), b = P(u + eu, v - ev), c = P(u + eu, v + ev), d = P(u - eu, v + ev);
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]);
    ctx.closePath();
  }

  function subpixel(u, v, e, color, scale, alpha) {
    const s = e * CELL * scale;
    const [x, y] = P(u, v);
    // 발광 번짐
    const r = s * SX * 2.6;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, hexA(color, 0.38 * alpha));
    g.addColorStop(1, hexA(color, 0));
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(x, y, r, r * SY / SX, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    // 몸체
    quad(u, v, s, s);
    const body = ctx.createLinearGradient(x - s * SX, y - s * SY, x + s * SX, y + s * SY);
    body.addColorStop(0, '#ffffff');
    body.addColorStop(0.35, color);
    body.addColorStop(1, hexA(color, 0.75));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = body;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // 세대별로 「그 칸에 무엇이 있나」를 정한다.
  // 반환: { px: 화소 그림 여부, big: 키움 배율, circ: 회로 자리 여부, open: 빛이 지나는 자리 목록 }
  function cellModel(gi, i, j, u, v) {
    if (!inWin(u, v)) return { px: true, scale: 1, circ: false, open: [] };
    if (gi === 0) {
      const keep = i % 2 === 0 && j % 2 === 0;
      if (keep) return { px: true, scale: 1.45, circ: true, open: [] };
      // 🔴 1세대도 배선은 창을 지나간다 — 남긴 화소의 행(가로)·열(세로) 금속선(2026-10-12 대표 지적).
      // 배선이 지나는 칸은 빛길을 선 양옆으로 비킨다.
      if (i % 2 === 0) return { px: false, open: [[u - CELL * 0.32, v], [u + CELL * 0.32, v]] };
      if (j % 2 === 0) return { px: false, open: [[u, v - CELL * 0.32], [u, v + CELL * 0.32]] };
      return { px: false, open: [[u, v]] };
    }
    if (gi === 1) {
      // 화소는 남고 회로는 없다 — 화소 사이 틈이 전부 빛길이다
      return { px: true, scale: 1, circ: false, glass: true,
        open: [[u - CELL * 0.32, v + CELL * 0.32], [u + CELL * 0.32, v + CELL * 0.32], [u + CELL * 0.36, v - CELL * 0.1]] };
    }
    // 1.5세대: j(가로 줄) 한 줄 걸러 비운다. 남은 줄은 엇갈려 놓이고 회로는 띠로 몬다.
    const keep = j % 2 === 0;
    return keep ? { px: true, scale: 1.12, circ: false, zig: (i % 2 ? 0.12 : -0.12), open: [] }
      : { px: false, circ: false, open: [[u - CELL * 0.25, v], [u + CELL * 0.25, v]] };
  }

  function draw() {
    const gi = state.g;
    const G = GENS[gi];
    ctx.clearRect(0, 0, W, H);

    // ── 배경
    if (COVER) {
      const spot = ctx.createRadialGradient(WX + 20, WY + 30, 20, WX, WY, Math.max(W, H) * 0.8);
      spot.addColorStop(0, '#2b3038');
      spot.addColorStop(0.35, '#1a1d22');
      spot.addColorStop(0.75, '#0c0e11');
      spot.addColorStop(1, '#060708');
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, W, H);
      const floor = ctx.createLinearGradient(0, LY, 0, H);
      floor.addColorStop(0, 'rgba(255,255,255,0)');
      floor.addColorStop(0.4, 'rgba(200,215,230,0.035)');
      floor.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = floor;
      ctx.fillRect(0, LY, W, H - LY);
      // 카메라 접지 그림자 + 적외선 바닥 반사
      ctx.save();
      ctx.translate(LX, LY + BARREL + LRY * 0.6);
      ctx.scale(1, 0.34);
      const sh = ctx.createRadialGradient(0, 0, 8, 0, 0, LRX * 2.3);
      sh.addColorStop(0, 'rgba(0,0,0,0.75)');
      sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sh;
      ctx.beginPath(); ctx.arc(0, 0, LRX * 2.3, 0, Math.PI * 2); ctx.fill();
      const rf = ctx.createRadialGradient(0, 0, 8, 0, 0, LRX * 3);
      rf.addColorStop(0, hexA(C_IR, 0.12));
      rf.addColorStop(1, hexA(C_IR, 0));
      ctx.fillStyle = rf;
      ctx.beginPath(); ctx.arc(0, 0, LRX * 3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else {
      ctx.fillStyle = '#07080a';
      ctx.fillRect(0, 0, W, H);
    }

    // ── 칸 모델을 먼저 다 계산한다(빛길 개수가 빛줄기 밝기를 정한다)
    const cells = [];
    const opens = [];
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const u = (i + 0.5) * CELL - 0.5, v = (j + 0.5) * CELL - 0.5;
        const m = cellModel(gi, i, j, u, v);
        cells.push({ i, j, u, v, m });
        for (const o of m.open) if (inWin(o[0], o[1])) opens.push(o);
      }
    }

    // ── 1. 카메라 모듈(가장 아래)
    // 경통
    const bar = ctx.createLinearGradient(LX - LRX, 0, LX + LRX, 0);
    bar.addColorStop(0, '#15191f');
    bar.addColorStop(0.45, '#4a5562');
    bar.addColorStop(0.6, '#2a313a');
    bar.addColorStop(1, '#0e1115');
    ctx.fillStyle = bar;
    ctx.beginPath();
    ctx.moveTo(LX - LRX, LY);
    ctx.lineTo(LX - LRX, LY + BARREL);
    ctx.ellipse(LX, LY + BARREL, LRX, LRY, 0, Math.PI, 0, true);
    ctx.lineTo(LX + LRX, LY);
    ctx.closePath(); ctx.fill();
    // 윗면 테
    ctx.fillStyle = '#20262e';
    ctx.beginPath(); ctx.ellipse(LX, LY, LRX, LRY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(160,180,200,0.55)'; ctx.lineWidth = 1.2; ctx.stroke();
    // 렌즈 유리
    const lg = ctx.createRadialGradient(LX - 10, LY - 6, 2, LX, LY, LRX * 0.78);
    lg.addColorStop(0, 'rgba(255,255,255,0.85)');
    lg.addColorStop(0.25, 'rgba(120,90,140,0.9)');
    lg.addColorStop(0.7, 'rgba(40,24,52,0.95)');
    lg.addColorStop(1, 'rgba(10,8,16,1)');
    ctx.fillStyle = lg;
    ctx.beginPath(); ctx.ellipse(LX, LY, LRX * 0.74, LRY * 0.74, 0, 0, Math.PI * 2); ctx.fill();

    // ── 2. 빛줄기: 카메라 창 → 렌즈
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    // 🔴 빛줄기는 세대와 무관하게 같은 개수·같은 자리로 그린다(2026-10-12 대표 지시).
    // 세대마다 개수가 달라 「빛의 양」으로 읽혔는데, 원고에 투과율 측정값이 없어 그 비교는 근거가 없다.
    // 세대 차이는 창 안의 구조(화소·배선·회로)로만 보여 준다.
    const RAYS = [];
    const NRAY = 44;
    for (let k = 0; k < NRAY; k++) {
      const t2 = k + 0.5, rr = Math.sqrt(t2 / NRAY) * RC * 0.9, an = t2 * 2.39996323;
      RAYS.push([UC + Math.cos(an) * rr, VC + Math.sin(an) * rr]);
    }
    for (const [u, v] of RAYS) {
      const [x0, y0] = P(u, v);
      const tx = LX + (u - UC - (v - VC)) * SX * 0.42;
      const ty = LY + ((u - UC) + (v - VC)) * SY * 0.42;
      const g = ctx.createLinearGradient(x0, y0, tx, ty);
      g.addColorStop(0, hexA(C_IR, 0.16));
      g.addColorStop(0.45, hexA(C_IR, 0.34));
      g.addColorStop(1, hexA(C_IR, 0.14));
      ctx.strokeStyle = g;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(tx, ty); ctx.stroke();
    }
    // 렌즈에 맺힌 빛 — 세대와 무관하게 같다
    const lit = 0.6;
    const lgl = ctx.createRadialGradient(LX, LY, 0, LX, LY, LRX * 1.1);
    lgl.addColorStop(0, hexA(C_IR, 0.25 + 0.55 * lit));
    lgl.addColorStop(1, hexA(C_IR, 0));
    ctx.fillStyle = lgl;
    ctx.beginPath(); ctx.ellipse(LX, LY, LRX * 1.1, LRY * 1.1, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // ── 3. 패널 판: 옆면 둘 → 윗면(카메라 창은 뚫어 유리로)
    const t = P(-0.5, -0.5), r = P(0.5, -0.5), b = P(0.5, 0.5), l = P(-0.5, 0.5);
    ctx.fillStyle = '#1b2129';
    ctx.beginPath();
    ctx.moveTo(l[0], l[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(b[0], b[1] + THK); ctx.lineTo(l[0], l[1] + THK);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#11161c';
    ctx.beginPath();
    ctx.moveTo(b[0], b[1]); ctx.lineTo(r[0], r[1]); ctx.lineTo(r[0], r[1] + THK); ctx.lineTo(b[0], b[1] + THK);
    ctx.closePath(); ctx.fill();
    // 윗면 — 창 자리는 evenodd 로 비운다
    const top = ctx.createLinearGradient(l[0], t[1], r[0], b[1]);
    top.addColorStop(0, '#161b22');
    top.addColorStop(0.5, '#0d1116');
    top.addColorStop(1, '#090c10');
    ctx.fillStyle = top;
    ctx.beginPath();
    ctx.moveTo(t[0], t[1]); ctx.lineTo(r[0], r[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(l[0], l[1]); ctx.closePath();
    ctx.ellipse(WX, WY, WRX, WRY, 0, 0, Math.PI * 2);
    ctx.fill('evenodd');
    // 창 유리(반투명) — 아래 빛줄기가 비친다
    ctx.fillStyle = 'rgba(120,150,180,0.16)';
    ctx.beginPath(); ctx.ellipse(WX, WY, WRX, WRY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(150,175,205,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(t[0], t[1]); ctx.lineTo(r[0], r[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(l[0], l[1]); ctx.closePath();
    ctx.stroke();

    // ── 3½. 불투명 금속 배선(1세대 · 1.5세대). 2세대만 투명 배선(ITO)이라 여기서 빠진다.
    // 🔴 첫 판은 1세대에 배선이 없어 「회로를 뺀」 2세대처럼 읽혔다(2026-10-12 대표 지적).
    // 1.5세대 세로선은 애플 EP4193388B1 그림 9 의 신호선(82)이 비운 줄(72)을 가로지르는 그대로다.
    const chord = (fixed, alongU) => {
      const d = alongU ? fixed - VC : fixed - UC;
      if (Math.abs(d) >= RC) return null;
      const h = Math.sqrt(RC * RC - d * d);
      return alongU ? [P(UC - h, fixed), P(UC + h, fixed)] : [P(fixed, VC - h), P(fixed, VC + h)];
    };
    // 굵기: 1세대는 굵게(대표 지시 — 덜어 내도 배선 격자가 빛을 가린다는 것이 1세대의 한계다),
    // 1.5세대는 가늘게(iFixit 40배 사진에서 빈 줄을 가로지르는 선이 가늘다. 실물은 두 가닥씩이나 그림은 한 가닥으로 단순화).
    const metalLine = (seg, wide) => {
      if (!seg) return;
      ctx.lineCap = 'butt';
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = wide ? 6 : 2.2;
      ctx.beginPath(); ctx.moveTo(seg[0][0], seg[0][1]); ctx.lineTo(seg[1][0], seg[1][1]); ctx.stroke();
      const g = ctx.createLinearGradient(seg[0][0], seg[0][1], seg[1][0], seg[1][1]);
      // 🔴 가는 선을 구릿빛으로 했더니 적외선 빛줄기(빨강)와 같은 색으로 읽혔다(2026-10-12 대표 지적) → 은회색
      g.addColorStop(0, wide ? '#8c97a4' : '#9aa6b4');
      g.addColorStop(0.5, wide ? '#d3dbe4' : '#e3e9f0');
      g.addColorStop(1, wide ? '#7d8895' : '#8e9aa8');
      ctx.strokeStyle = g; ctx.lineWidth = wide ? 4 : 1.1;
      ctx.beginPath(); ctx.moveTo(seg[0][0], seg[0][1]); ctx.lineTo(seg[1][0], seg[1][1]); ctx.stroke();
    };
    if (gi === 0) {
      for (let k = 0; k < N; k += 2) {
        const c0 = (k + 0.5) * CELL - 0.5;
        metalLine(chord(c0, true), true);   // 행 배선(가로)
        metalLine(chord(c0, false), true);  // 열 배선(세로)
      }
    } else if (gi === 2) {
      // 세로 신호선 — 칸마다 가는 한 가닥(대표 지시로 두 가닥 → 한 가닥으로 단순화)
      for (let k = 0; k < N; k++) metalLine(chord((k + 0.5) * CELL - 0.5, false), false);
    }

    // ── 4. 창 안의 비(非)발광 구조: 회로·띠·투명 배선
    if (gi === 0) {
      for (const c of cells) {
        if (!c.m.circ) continue;
        quad(c.u + CELL * 0.0, c.v + CELL * 0.42, CELL * 0.4, CELL * 0.1);
        ctx.fillStyle = C_GOLD; ctx.fill();
      }
    } else if (gi === 1) {
      // 2세대 배선·고리는 화소 위에 그린다(아래 5½단계) — 화소에 가려 안 보였다(2026-10-12 실측)
    } else {
      // 1.5세대: 남은 줄마다 회로 띠(애플 그림 9 의 74행)
      for (let j = 0; j < N; j += 2) {
        const v = (j + 0.5) * CELL - 0.5 + CELL * 0.05;
        const dv = Math.abs(v - VC);
        if (dv >= RC) continue;
        const half = Math.sqrt(RC * RC - dv * dv);
        const a = P(UC - half, v - CELL * 0.08), b2 = P(UC + half, v - CELL * 0.08);
        const c2 = P(UC + half, v + CELL * 0.08), d = P(UC - half, v + CELL * 0.08);
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]); ctx.lineTo(b2[0], b2[1]); ctx.lineTo(c2[0], c2[1]); ctx.lineTo(d[0], d[1]);
        ctx.closePath();
        ctx.fillStyle = hexA(C_GOLD, 0.92); ctx.fill();
      }
    }

    // ── 5. 화소
    for (const c of cells) {
      if (!c.m.px) continue;
      const inside = inWin(c.u, c.v);
      const alpha = inside && c.m.glass ? 0.7 : 1;
      const zig = (c.m.zig || 0) * CELL;
      for (const [du, dv, e, col] of SUB) {
        subpixel(c.u + du * CELL, c.v + dv * CELL + zig, e, col, c.m.scale || 1, alpha);
      }
    }

    // ── 5½. 2세대: 원 밖 회로 고리(투명 배선은 그리지 않는다)
    if (gi === 1) {
      // 🔴 투명 배선(ITO)은 그리지 않는다(2026-10-12 대표 지시) — 실제로 안 보이는 것이 2세대의 요점이다.
      // 「회로는 원 밖 가장자리에 있다」만 금색 고리로 보여 준다.
      const ring = [];
      const NR = 30;
      for (let k = 0; k < NR; k++) {
        const a = (k / NR) * Math.PI * 2;
        ring.push([UC + Math.cos(a) * (RC + CELL * 0.75), VC + Math.sin(a) * (RC + CELL * 0.75)]);
      }
      for (const [ru, rv] of ring) { quad(ru, rv, CELL * 0.26, CELL * 0.26); ctx.fillStyle = C_GOLD; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 0.8; ctx.stroke(); }
    }

    // ── 6. 열린 자리의 적외선 반짝임(빛이 들어가는 곳)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const [u, v] of opens) {
      const [x, y] = P(u, v);
      const g = ctx.createRadialGradient(x, y, 0, x, y, 4);
      g.addColorStop(0, hexA(C_IR, 0.6));
      g.addColorStop(1, hexA(C_IR, 0));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.ellipse(x, y, 4, 2.4, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // 창 테두리(점선)
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.ellipse(WX, WY, WRX, WRY, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    // ── 7. 글자
    ctx.font = '700 ' + (COVER ? 17 : 15) + 'px "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f4f4ee';
    // 🔴 제목에 「iPhone 18 Pro」를 붙이는 것은 1.5세대일 때뿐이다(2026-10-12 대표 질문으로 고침).
    // 고정해 두었더니 1·2세대 화면에서도 아이폰이 그 구조를 썼던 것처럼 읽혔다.
    // 애플은 1세대를 **특허로만**(2018-04 청구항 1) 냈고 제품은 아이폰 18 Pro(1.5세대)가 처음이다.
    ctx.fillText(gi === 2 ? 'iPhone 18 Pro · Face ID camera under the screen'
      : 'Camera under an OLED screen · how the industry tried it', 20, 28);
    ctx.font = COVER ? '700 13px "IBM Plex Sans KR", system-ui, sans-serif' : '600 12px "IBM Plex Mono", monospace';
    ctx.fillStyle = COVER ? 'rgba(244,244,238,0.92)' : '#8a8a80';
    ctx.fillText(G.name, 20, 46);

    const sz = COVER ? 13 : 12;
    // 🔴 표지는 글자를 줄인다(2026-10-12 대표 지적 「표지인데 글자가 너무 많다」).
    // 표지에 남기는 것은 제목·세대명·카메라·큰 숫자와 한 줄 태그뿐 — 설명 라벨과 아래 두 줄은 기사 본문용에만 둔다.
    if (!COVER) {
      label('OLED panel', l[0] - 10, l[1] + 4, 'rgba(225,235,245,0.95)', 'right', sz);
      label('camera window', WX + WRX + 12, WY - WRY * 0.35, 'rgba(255,255,255,0.95)', 'left', sz);
    }
    label(gi === 2 ? 'IR camera (Face ID)' : 'camera', LX - LRX - 12, LY + BARREL * 0.55, hexA(C_IR, 0.98), 'right', sz);
    // 회로 라벨은 창 바로 아래(패널 앞쪽 위)에 둔다 — 떨어뜨려 두니 무엇을 가리키는지 안 읽혔다
    const cy2 = WY + WRY + 20;
    if (!COVER) {
    if (gi === 0) label('gold = circuits · metal lines still cross the window', WX - 20, cy2, C_GOLD, 'center', sz);
    if (gi === 1) label('gold ring = circuits pushed to the edge · wires inside are transparent', WX - 20, cy2, C_GOLD, 'center', sz);
    if (gi === 2) label('gold = circuit strip · thin signal lines cross the empty rows', WX - 20, cy2, C_GOLD, 'center', sz);
    }

    // 오른쪽 큰 숫자: 추가 마스크
    const sceneB = COVER ? 392 : 372;
    ctx.font = '700 ' + (COVER ? 36 : 30) + 'px "Noto Serif KR", serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = G.bigCol;
    ctx.fillText(G.big, W - 20, sceneB - 44);
    ctx.font = (COVER ? '700 13px' : '600 12.5px') + ' "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.fillStyle = COVER ? 'rgba(244,244,238,0.92)' : 'rgba(244,244,238,0.8)';
    ctx.fillText(G.bigSub, W - 20, sceneB - 26);
    label(G.tag, W - 20, sceneB - 5, G.tagCol || G.bigCol, 'right', COVER ? 14 : 13);

    if (COVER) {
      // 표지 아래 두 줄은 걷어냈다 — 내용은 기사 본문용 비교표와 오른쪽 읽기 칸에 있다
    } else {
      // 세 갈래 비교표 — 지금 세대를 밝힌다
      const ty0 = sceneB + 30;
      const colX = [20, 200, 340, 480];
      ctx.font = '600 12px "IBM Plex Sans KR", system-ui, sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(244,244,238,0.6)';
      ['', 'pixels over camera', 'circuits', 'extra masks'].forEach((h, k) => ctx.fillText(h, colX[k], ty0));
      GENS.forEach((g, k) => {
        const y = ty0 + 24 + k * 24;
        const on = k === gi;
        if (on) {
          ctx.fillStyle = 'rgba(255,255,255,0.07)';
          ctx.beginPath(); ctx.roundRect(12, y - 11, W - 24, 22, 5); ctx.fill();
        }
        ctx.font = (on ? '700' : '600') + ' 12px "IBM Plex Sans KR", system-ui, sans-serif';
        ctx.fillStyle = on ? '#f4f4ee' : 'rgba(244,244,238,0.55)';
        ctx.fillText(g.short, colX[0], y);
        ctx.fillText(g.pixels, colX[1], y);
        ctx.fillText(g.circuits.replace(', linked by ITO wires', ' + ITO'), colX[2], y);
        ctx.fillStyle = on ? g.bigCol : hexA(g.bigCol, 0.55);
        ctx.fillText(g.masks, colX[3], y);
      });
    }

    out.innerHTML =
      '<b>' + G.name + '</b>' +
      '<br>pixels over camera: <b>' + G.pixels + '</b>' +
      '<br>pixel circuits: <b>' + G.circuits + '</b>' +
      '<br>extra masks: <b>' + G.masks + '</b>' +
      '<br>earliest in patents: ' + G.first;
  }

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.g = +btn.dataset.val;
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      draw();
    });
  });
  draw();
}
