// 시뮬레이션 — 1mm² 마이크로LED 어레이에서 나온 빛이 멀티코어 광섬유 다발로 들어가는 장면을
// 3D 로 그리고, 채널 수를 바꿀 때 「많이·느리게」와 「적게·빠르게」가 어떻게 갈리는지를 본다.
//
// 이 그림이 답하는 질문 하나: **왜 마이크로LED 를 400개씩 쓰는가.**
//
// 슬라이더 하나로 소자 쪽과 시스템 쪽이 **함께** 움직인다. 1mm² 에 N 개를 넣으려면
// 피치가 1000/√N (µm) 로 정해지고, 소자 크기도 거기서 따라 나온다(피치의 10% 로 둔다).
// 채널을 늘리면 ① 채널당 요구 속도가 내려가고 ② 소자가 작아진다 — 둘 다 유리한 방향이다.
// 그래서 400채널에서 피치 50µm · 소자 5µm 가 나오는데, 그것이 바로 마이크로LED 의 크기다.
//
// 🔴 배열은 **k×k 정사각**으로만 둔다(2026-10-04 대표 지시). 임의의 N 을 허용하면 마지막 줄이
// 비어 어레이가 어그러진다. 정사각으로 끊자 경계가 또렷해졌다 —
// **19×19(361채널)는 소자에 1.85GHz 를 요구해 안 되고, 20×20(400채널)이 1.67GHz 로 처음 가능해진다.**
// MOSAIC 이 쓴 숫자가 바로 20×20 이다(논문 §3.1 「400 microLEDs in a 20 × 20 grid for 800 Gbps」).
//
// 🔴 **마이크로LED 하나에 코어 하나가 붙는 것이 아니다**(2026-10-04 대표 질문으로 확인·수정).
// 논문 §3.3 원문: 「In principle, we could implement a 1:1 mapping between each fiber core and a
// microLED. In our design, however, given the abundance of available cores, we found it more
// beneficial to map a single microLED onto multiple fiber cores. This approach significantly
// relaxes alignment accuracy requirements.」
// 쓰는 것은 의료 내시경용 **이미징 파이버**이고 **코어가 최대 10,000개**다. 코어가 남아돌기 때문에
// 1:1 로 맞추지 않고 **LED 하나의 빛을 코어 여러 개에 걸쳐 넣는다** — 그러면 정렬 정확도 요구가
// 크게 느슨해져 패키징 비용이 내려간다. 처음엔 1:1 로 그렸고 그것은 틀린 그림이었다.
//
// 🔴 **파이버 안의 빛은 옆에서 보이지 않는다**(2026-10-04 대표 지적). 전반사로 갇혀 있기 때문이고,
// 옆으로 새어 보인다면 그것은 누설이지 정상 동작이 아니다. 그래서 빛을 그리는 구간은
// **LED 에서 파이버 입사면까지의 자유공간뿐**이고, 파이버 몸통은 불투명하게 둔다.
// 처음에는 가닥을 수백 개 그렸는데, 그러면 자유공간 광경로가 **파이버 다발처럼** 읽혔다 —
// 가닥을 걷어내고 하나의 광다발(연속면)로 바꿨다.
//
// 왜 3D 인가. 기판 위에 선 이미터 배열과 광섬유라 실물이 3차원이다.
// 편집규칙 「3D 음영은 대상이 3차원 물체일 때만」에 따른다 — 아래 눈금과 막대는 평면으로 둔다.
//
// 🔴 표지 모드(`cover: true`)는 장면만 크게 보여주고 눈금·전력 막대를 걷어낸다.
// 표지의 첫인상은 거의 전부 정지 PNG 에서 일어나므로(링크 카드·진열대·뉴스레터),
// 그 한 장이 도표가 아니라 **장면**이어야 한다는 대표 지시(2026-10-04)에 따른 것이다.
//
// 모델과 근거 — 지어낸 곡선이 없다.
// - 총 대역폭 800Gbps, 비교 지점 8×100Gbps 와 400×2Gbps 는 MOSAIC 논문의 예시 그대로다.
// - 채널당 속도 → 필요한 소자 대역폭은 NRZ 어림 f₃dB ≈ rate/1.2 로 환산한다.
// - 마이크로LED 상한선 1.8GHz 는 보고된 단일 청색 마이크로LED 변조 대역폭이다.
//   「물리 법칙」이 아니라 **지금까지 보고된 최고치**이고, 화면에도 그렇게 적었다.
// - 피치 = 1000/√N 은 1mm² 정사각 배열의 기하에서 바로 나온다. 소자를 피치의 10% 로 둔 것은
//   가정이고, 400채널에서 5µm 가 되어 공개된 마이크로LED 크기와 맞는다.
// - 전력 막대는 **보고된 두 값만** 쓴다(기존 광링크 케이블당 10W 이상, MOSAIC 3.1~5.3W).
//   중간을 잇는 곡선을 그리지 않는다 — 그 사이는 공개된 값이 없기 때문이다.
// - 빛줄기의 굵기·밝기는 **그림의 표현**이고 측정값이 아니다. 굵은 빔은 채널당 속도가 높다는
//   뜻으로만 읽어야 한다.
//
// 캔버스 안 글자는 전부 영어로 쓴다(2026-09 규칙). 표지 규칙에 따라 원색·13px 굵게·받침을 쓴다.

import { hidpi } from './_hidpi.js';

// 🔴 표지 무대 안쪽 폭 704px, 시뮬 몸통 좌우 여백 40px → 캔버스는 664px 이하.
const LAYOUT = {
  article: { W: 620, H: 500 },
  cover: { W: 620, H: 440 },
};

const TOTAL_GBPS = 800;
const MLED_LIMIT_GHZ = 1.8;
const NRZ = 1.2;

const C_OK = '#1fdc6a';
const C_NO = '#ff8c1a';
const C_REF = '#ff5a4a';
const C_DIM = '#3a8fd8';

export function mount(container, params = {}) {
  const COVER = !!params.cover;
  const { W, H } = LAYOUT[COVER ? 'cover' : 'article'];

  // 슬라이더는 한 변의 개수 k 를 다룬다. 채널 수는 언제나 k² 다.
  const state = { k: params.k ?? (params.n ? Math.round(Math.sqrt(params.n)) : 20) };

  container.innerHTML = `
    <div class="sim-head">Light from 1 mm² of microLEDs, poured into one fiber bundle</div>
    <div class="sim-body">
      <div class="sim-canvas-wrap"><canvas data-c></canvas></div>
      <div class="sim-controls">
        <label>Array size (k × k)
          <input type="range" data-k min="3" max="24" step="1" value="${state.k}">
          <output data-k-o></output>
        </label>
        <div class="sim-readout" data-out></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('[data-c]');
  const ctx = hidpi(canvas, W, H);
  const elK = container.querySelector('[data-k]');
  const outK = container.querySelector('[data-k-o]');
  const out = container.querySelector('[data-out]');

  // 🔴 고지문은 시뮬 코드가 아니라 **원고의 <template data-sim-note>** 가 갖는다.
  // 캔버스 밖 텍스트라 한국어로 쓰며, 여기에 두면 빌드 검사기가 「캔버스 안 글자는 영어」 규칙으로 막는다.

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

  const hexA = (hex, a) => {
    const v = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((v >> 16) & 255) + ',' + ((v >> 8) & 255) + ',' + (v & 255) + ',' + a + ')';
  };

  function draw() {
    const side = state.k;
    const n = side * side;
    const rate = TOTAL_GBPS / n;
    const needGHz = rate / NRZ;
    const ok = needGHz <= MLED_LIMIT_GHZ;
    const pitchUm = 1000 / Math.sqrt(n);
    const mesaUm = pitchUm * 0.1;
    const col = ok ? C_OK : C_NO;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#07080a';
    ctx.fillRect(0, 0, W, H);

    // ── 무대. 아래에서 위로 쌓는다: 마이크로LED 배열 → 렌즈 배열 → 페룰 → 이미징 파이버.
    // 🔴 **광섬유는 LED 에 직접 닿지 않는다.** 렌즈 배열이 퍼지는 빛을 모아 페룰로 넘기고,
    // 페룰이 파이버를 잡아 준다(성대 첨디공 10월호 LightBundle 적층도와 같은 구조).
    // 빛이 자유공간을 길게 나는 것처럼 그렸던 앞 판은 이 결합부가 통째로 빠져 있었다
    // (2026-10-04 대표 지적으로 고침).
    // 파이버는 「다발」이 아니라 **한 가닥**이다 — 논문 §3.3 「a single imaging fiber,
    // as opposed to a bundle of discrete fibers」. 코어 수천 개는 단면 확대로 보여준다.
    const SCENE_H = COVER ? 372 : 330;
    // 왼쪽 라벨이 캔버스 밖으로 잘려 스택을 오른쪽으로 옮겼다(2026-10-04 실측).
    const acx = COVER ? 238 : 226;
    const acy = COVER ? 330 : 292;                 // LED 배열 판
    const ahw = COVER ? 118 : 106, ahd = COVER ? 56 : 50;
    const lensY = acy - (COVER ? 62 : 56);         // 렌즈 배열
    const ferY = lensY - (COVER ? 56 : 50);        // 페룰
    const zx = COVER ? 492 : 480, zy = COVER ? 84 : 80;
    const zr = COVER ? 56 : 51;

    // 아이소메트릭 마름모 꼭짓점
    const dia = (cy2, hw, hd) => ({
      t: [acx, cy2 - hd], r: [acx + hw, cy2], b: [acx, cy2 + hd], l: [acx - hw, cy2],
    });
    const plate = (cy2, hw, hd, fill, stroke) => {
      const d = dia(cy2, hw, hd);
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(d.t[0], d.t[1]); ctx.lineTo(d.r[0], d.r[1]);
      ctx.lineTo(d.b[0], d.b[1]); ctx.lineTo(d.l[0], d.l[1]);
      ctx.closePath(); ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.2; ctx.stroke(); }
      return d;
    };
    // 두 층 사이를 잇는 빛 기둥(앞쪽 두 면)
    const column = (cyA, hwA, hdA, cyB, hwB, hdB, a0, a1) => {
      const A = dia(cyA, hwA, hdA), B = dia(cyB, hwB, hdB);
      const g = ctx.createLinearGradient(acx, cyA, acx, cyB);
      g.addColorStop(0, hexA(col, a0));
      g.addColorStop(1, hexA(col, a1));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(A.l[0], A.l[1]); ctx.lineTo(A.b[0], A.b[1]); ctx.lineTo(A.r[0], A.r[1]);
      ctx.lineTo(B.r[0], B.r[1]); ctx.lineTo(B.b[0], B.b[1]); ctx.lineTo(B.l[0], B.l[1]);
      ctx.closePath(); ctx.fill();
    };

    // ── 표지 전용 스튜디오 배경(2026-10-04 대표 A안). 단색 검정은 「그래픽」으로 읽히고 실물 사진처럼
    // 보이지 않는다. 제품 사진처럼 물체 뒤 은은한 빛 번짐 + 가장자리 어둡게 + 바닥 그림자·반사를 깐다.
    // 계산·구도는 건드리지 않는다. 기사 본문(COVER=false)은 종전 검정 그대로.
    if (COVER) {
      const sx = acx + 70, sy = lensY - 10;
      const spot = ctx.createRadialGradient(sx, sy, 20, sx, sy, Math.max(W, H) * 0.78);
      spot.addColorStop(0, '#2b3038');
      spot.addColorStop(0.35, '#1a1d22');
      spot.addColorStop(0.75, '#0c0e11');
      spot.addColorStop(1, '#060708');
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, W, H);
      // 바닥: 판 아래로 아주 옅은 밝은 띠가 앞쪽으로 깔린다(스튜디오 스윕)
      const floor = ctx.createLinearGradient(0, acy - ahd, 0, H);
      floor.addColorStop(0, 'rgba(255,255,255,0)');
      floor.addColorStop(0.35, 'rgba(200,215,230,0.035)');
      floor.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = floor;
      ctx.fillRect(0, acy - ahd, W, H - (acy - ahd));
      // 접지 그림자: 판 바로 아래 타원
      ctx.save();
      ctx.translate(acx, acy + ahd * 0.55);
      ctx.scale(1, 0.32);
      const sh = ctx.createRadialGradient(0, 0, 10, 0, 0, ahw * 1.55);
      sh.addColorStop(0, 'rgba(0,0,0,0.75)');
      sh.addColorStop(0.6, 'rgba(0,0,0,0.35)');
      sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sh;
      ctx.beginPath(); ctx.arc(0, 0, ahw * 1.55, 0, Math.PI * 2); ctx.fill();
      // 바닥 반사: 발광이 바닥에 번진 옅은 초록
      const rf = ctx.createRadialGradient(0, 0, 10, 0, 0, ahw * 1.9);
      rf.addColorStop(0, hexA(col, 0.16));
      rf.addColorStop(1, hexA(col, 0));
      ctx.fillStyle = rf;
      ctx.beginPath(); ctx.arc(0, 0, ahw * 1.9, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    const bgGlow = ctx.createRadialGradient(acx, lensY, 10, acx, lensY, 300);
    bgGlow.addColorStop(0, hexA(col, 0.1));
    bgGlow.addColorStop(1, hexA(col, 0));
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, W, COVER ? H : SCENE_H); // 표지는 끝까지 — 스튜디오 배경 위에서 경계선이 드러났다

    // ── 이미터·스팟 좌표
    const cores = [], emits = [];
    const step = 1 / side;
    let idx = 0;
    for (let a = 0; a < side && idx < n; a++) {
      for (let b = 0; b < side && idx < n; b++) {
        const u = (a + 0.5) * step - 0.5, v = (b + 0.5) * step - 0.5;
        emits.push([acx + (u - v) * ahw * 0.95, acy + (u + v) * ahd * 0.95]);
        const t = idx + 0.5;
        const rr = Math.sqrt(t / n);
        const ang = t * 2.39996323;
        cores.push([zx + Math.cos(ang) * rr * zr * 0.78, zy + Math.sin(ang) * rr * zr * 0.78]);
        idx++;
      }
    }

    // ── 1. LED 배열 판
    plate(acy, ahw + 10, ahd + 8, 'rgba(15,19,25,0.94)', 'rgba(120,145,170,0.4)');

    // ── 2. 이미터
    const r = Math.max(1.3, Math.min(7, 100 / side));
    const ht = Math.max(1.6, Math.min(8, 112 / side));
    for (const [x, y] of emits.slice().sort((p1, q1) => p1[1] - q1[1])) {
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 0.5, 0, 0, Math.PI);
      ctx.lineTo(x - r, y - ht);
      ctx.ellipse(x, y - ht, r, r * 0.5, 0, Math.PI, 0, true);
      ctx.closePath(); ctx.fill();
      const g = ctx.createRadialGradient(x - r * 0.3, y - ht - r * 0.2, r * 0.08, x, y - ht, r * 1.25);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.38, col);
      g.addColorStop(1, 'rgba(0,0,0,0.42)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.ellipse(x, y - ht, r, r * 0.5, 0, 0, Math.PI * 2); ctx.fill();
    }

    // ── 3. 빛 통로 ①: LED → 렌즈. 🔴 채널 수와 무관하게 늘 같은 형상이다.
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    column(acy, ahw, ahd, lensY, ahw * 0.92, ahd * 0.92, 0.3, 0.24);
    ctx.restore();

    // ── 4. 렌즈 배열 — 퍼지는 빛을 모은다
    const ld = plate(lensY, ahw * 0.92, ahd * 0.92, 'rgba(190,226,242,0.26)', 'rgba(145,195,215,0.85)');
    // 🔴 렌즈는 **육각 밀집(close-packed)**으로 깐다(2026-10-04 대표 지시).
    // 실제 마이크로렌즈 어레이가 충전율을 높이려고 그렇게 배열되고, 정사각 격자보다
    // 빈틈이 적어 「빛을 모은다」는 역할이 그림에서도 분명해진다.
    // 줄마다 반 칸씩 엇갈리고, 줄 간격은 √3/2 배로 좁힌다.
    const LN = 8;
    const V_STEP = 0.866;
    const lr = (ahw * 0.86 / LN) * 0.54;
    for (let b = 0; b < LN; b++) {
      const off = (b % 2) ? 0.5 : 0;
      for (let a = 0; a < LN; a++) {
        const uu = a + 0.5 + off;
        if (uu > LN) continue;
        const u = uu / LN - 0.5;
        const v = ((b + 0.5) / LN - 0.5) * V_STEP;
        const lx = acx + (u - v) * ahw * 0.86, ly = lensY + (u + v) * ahd * 0.86;
        const lg = ctx.createRadialGradient(lx - lr * 0.34, ly - lr * 0.22, lr * 0.08, lx, ly, lr * 1.15);
        lg.addColorStop(0, 'rgba(255,255,255,0.95)');
        lg.addColorStop(0.55, 'rgba(215,240,250,0.5)');
        lg.addColorStop(1, 'rgba(150,205,230,0.14)');
        ctx.fillStyle = lg;
        ctx.beginPath(); ctx.ellipse(lx, ly, lr, lr * 0.52, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(190,230,245,0.3)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    // ── 5. 빛 통로 ②: 렌즈 → 페룰. 모여서 밝아진다.
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    column(lensY, ahw * 0.92, ahd * 0.92, ferY, ahw * 0.44, ahd * 0.44, 0.3, 0.52);
    ctx.restore();

    // ── 6. 페룰 — 파이버를 잡아 준다
    const fhw = ahw * 0.44, fhd = ahd * 0.44, fth = COVER ? 17 : 15;
    const fd = dia(ferY, fhw, fhd);
    ctx.fillStyle = '#20262e';
    ctx.beginPath();
    ctx.moveTo(fd.l[0], fd.l[1]); ctx.lineTo(fd.b[0], fd.b[1]); ctx.lineTo(fd.r[0], fd.r[1]);
    ctx.lineTo(fd.r[0], fd.r[1] + fth); ctx.lineTo(fd.b[0], fd.b[1] + fth); ctx.lineTo(fd.l[0], fd.l[1] + fth);
    ctx.closePath(); ctx.fill();
    const ferTop = ctx.createLinearGradient(fd.l[0], ferY, fd.r[0], ferY);
    ferTop.addColorStop(0, '#7f8c9b');
    ferTop.addColorStop(0.5, '#cfd8e2');
    ferTop.addColorStop(1, '#5d6975');
    plate(ferY, fhw, fhd, ferTop, '#39424d');

    // ── 7. 이미징 파이버 한 가닥 — 페룰에서 오른쪽 위로 빠진다. 몸통은 불투명하다.
    const cPath = (off) => {
      const pth = new Path2D();
      // 🔴 굵고 곧게 그렸더니 광섬유가 아니라 FPC 처럼 보였다(2026-10-04 대표 지적).
      // 가늘게 하고 두 번 휘게 해서 유연한 케이블로 보이게 한다.
      pth.moveTo(acx + off * 0.25, ferY - 4 + off);
      pth.bezierCurveTo(acx + 58, ferY - 54 + off, acx + 148, ferY + 16 + off, W + 16, ferY - 62 + off);
      return pth;
    };
    const tipR = COVER ? 6.5 : 6;
    ctx.save();
    ctx.lineCap = 'butt';
    ctx.strokeStyle = '#161c23'; ctx.lineWidth = tipR * 2 + 4; ctx.stroke(cPath(0));
    ctx.strokeStyle = '#49596b'; ctx.lineWidth = tipR * 2; ctx.stroke(cPath(0));
    ctx.strokeStyle = 'rgba(205,225,245,0.5)'; ctx.lineWidth = tipR * 0.48; ctx.stroke(cPath(-tipR * 0.44));
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = tipR * 0.58; ctx.stroke(cPath(tipR * 0.5));
    ctx.restore();

    // ── 8. 단면 확대
    ctx.save();
    ctx.strokeStyle = 'rgba(150,175,200,0.4)';
    ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(acx + 186, ferY - 12); ctx.lineTo(zx - zr * 0.62, zy + zr * 0.8);
    ctx.moveTo(acx + 194, ferY + 2); ctx.lineTo(zx - zr * 0.99, zy + zr * 0.18);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    const clad = ctx.createRadialGradient(zx - zr * 0.3, zy - zr * 0.3, zr * 0.1, zx, zy, zr);
    clad.addColorStop(0, '#2d3744');
    clad.addColorStop(1, '#0f141a');
    ctx.fillStyle = clad;
    ctx.beginPath(); ctx.arc(zx, zy, zr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(165,190,215,0.75)'; ctx.lineWidth = 2; ctx.stroke();

    // 🔴 코어는 채널 수와 무관하게 늘 같다(이미징 파이버, 최대 10,000개).
    const N_CORE = 1200;
    ctx.fillStyle = 'rgba(140,180,210,0.6)';
    for (let c = 0; c < N_CORE; c++) {
      const t2 = c + 0.5;
      const rr2 = Math.sqrt(t2 / N_CORE);
      const an2 = t2 * 2.39996323;
      ctx.beginPath();
      ctx.arc(zx + Math.cos(an2) * rr2 * zr * 0.9, zy + Math.sin(an2) * rr2 * zr * 0.9, 0.9, 0, Math.PI * 2);
      ctx.fill();
    }
    // 채널 스팟 — 하나가 코어 여러 개를 덮는다. 반투명이라 코어가 비친다.
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const cr = Math.max(2.2, Math.min(9, 58 / side));
    for (const [cx2, cy2] of cores) {
      const cg = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, cr);
      cg.addColorStop(0, 'rgba(255,255,255,0.72)');
      cg.addColorStop(0.3, hexA(col, 0.52));
      cg.addColorStop(1, hexA(col, 0));
      ctx.fillStyle = cg;
      ctx.beginPath(); ctx.arc(cx2, cy2, cr, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // ── 글자
    ctx.font = '700 ' + (COVER ? 17 : 15) + 'px "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f4f4ee';
    ctx.fillText('800 Gbps across ' + side + ' × ' + side + ' = ' + n + ' microLEDs', 20, 28);
    // 표지는 썸네일로 줄어 읽히므로 회색 가는 글씨가 묻힌다 — 13px 굵게·흰 90%(편집규칙 표지 ④, 2026-10-04)
    ctx.font = COVER ? '700 13px "IBM Plex Sans KR", system-ui, sans-serif' : '600 12px "IBM Plex Mono", monospace';
    ctx.fillStyle = COVER ? 'rgba(244,244,238,0.92)' : '#8a8a80';
    ctx.fillText('fewer channels → each beam must run faster', 20, 46);

    label('1 mm² · pitch ' + pitchUm.toFixed(0) + ' µm · mesa ≈ ' + mesaUm.toFixed(1) + ' µm',
      20, 88, mesaUm <= 10 ? C_OK : 'rgba(244,244,238,0.82)', 'left', COVER ? 13 : 12.5);
    // fx + fr + 12 에 두었더니 캔버스 오른쪽으로 잘렸다(2026-10-04 실측). 파이버 위로 올린다.
    // 라벨 셋이 파이버 위에서 겹쳤다(2026-10-04 실측). 위·아래·몸통으로 흩는다.
    // 파이버 위에 두면 도파 라벨과 같은 높이에서 겹친다(2026-10-04 실측). 왼쪽 상단으로 옮긴다.
    label('imaging fiber — one strand, not a bundle', 20, 68,
      'rgba(205,225,245,0.92)', 'left', COVER ? 13 : 12);
    label('ferrule', fd.l[0] - 10, ferY + 4, 'rgba(225,235,245,0.95)', 'right', COVER ? 13 : 12);
    label('lens array', ld.l[0] - 10, lensY + 2, 'rgba(190,226,242,0.95)', 'right', COVER ? 13 : 12);
    label('LED array', acx - ahw - 12, acy + 2, hexA(col, 0.95), 'right', COVER ? 13 : 12);
    label('cross-section · 1,000s of cores', zx, zy - zr - 13, 'rgba(205,225,245,0.92)', 'center', COVER ? 13 : 12);
    label('one LED → many cores', zx, zy + zr + 14, hexA(col, 0.95), 'center', COVER ? 13 : 12);

    const rTxt = rate >= 10 ? rate.toFixed(0) : rate.toFixed(1);
    ctx.font = '700 ' + (COVER ? 34 : 29) + 'px "Noto Serif KR", serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = col;
    ctx.fillText(rTxt + ' Gbps', W - 20, SCENE_H - 46);
    ctx.font = (COVER ? '700 13px' : '600 12.5px') + ' "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.fillStyle = COVER ? 'rgba(244,244,238,0.92)' : 'rgba(244,244,238,0.8)';
    ctx.fillText('per channel', W - 20, SCENE_H - 28);
    label(ok ? 'microLED can do this' : 'needs laser + DSP',
      W - 20, SCENE_H - 7, col, 'right', COVER ? 14 : 13);

    if (COVER) {
      label('the fiber never touches the LEDs — lenses collect the light and hand it to the ferrule',
        20, H - 46, 'rgba(205,225,245,0.92)', 'left', 13);
      label('each beam must reach ' + (needGHz >= 10 ? needGHz.toFixed(0) : needGHz.toFixed(2)) +
        ' GHz   ·   microLED best reported 1.8 GHz', 20, H - 22, col, 'left', 13);
    } else {
      const bx = 20, bw = W - 40, by = SCENE_H + 42, bh = 13;
      const LO = 0.1, HI = 200;
      const pos = (f) => bx + bw * (Math.log10(Math.min(HI, Math.max(LO, f)) / LO) / Math.log10(HI / LO));
      ctx.fillStyle = '#161b22';
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 4); ctx.fill();
      ctx.fillStyle = hexA(C_OK, 0.18);
      ctx.beginPath(); ctx.roundRect(bx, by, pos(MLED_LIMIT_GHZ) - bx, bh, 4); ctx.fill();
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.roundRect(bx, by, Math.max(3, pos(needGHz) - bx), bh, 4); ctx.fill();

      ctx.font = '600 12px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillStyle = '#6a6a62';
      for (const [f, t] of [[0.1, '0.1G'], [1, '1G'], [10, '10G'], [100, '100G']]) {
        const x = pos(f);
        ctx.fillRect(x - 0.5, by + bh, 1, 5);
        ctx.fillText(t, x, by + bh + 7);
      }
      const xl = pos(MLED_LIMIT_GHZ);
      ctx.strokeStyle = C_REF; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(xl, by - 15); ctx.lineTo(xl, by + bh); ctx.stroke();
      ctx.setLineDash([]);
      label('microLED best reported 1.8 GHz', xl, by - 23, C_REF, 'center', 12);
      label('beam must reach ' + (needGHz >= 10 ? needGHz.toFixed(0) : needGHz.toFixed(2)) + ' GHz',
        bx + 6, by + bh + 30, col, 'left', 13.5);

      const py = by + bh + 58;
      ctx.font = '600 12.5px "IBM Plex Sans KR", system-ui, sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(244,244,238,0.7)';
      ctx.fillText('reported link power', 20, py - 13);
      const pw = 180;
      let yy = py + 5;
      for (const [t, v, c, vt] of [
        ['conventional optical', 10, C_DIM, '10 W+'],
        ['MOSAIC microLED', 5.3, C_OK, '3.1~5.3 W'],
      ]) {
        ctx.fillStyle = '#161b22';
        ctx.beginPath(); ctx.roundRect(150, yy - 6, pw, 12, 3); ctx.fill();
        ctx.fillStyle = c;
        ctx.beginPath(); ctx.roundRect(150, yy - 6, pw * (v / 12), 12, 3); ctx.fill();
        ctx.fillStyle = 'rgba(244,244,238,0.86)';
        ctx.textAlign = 'right'; ctx.fillText(t, 142, yy);
        ctx.textAlign = 'left'; ctx.fillStyle = c; ctx.fillText(vt, 150 + pw + 10, yy);
        yy += 21;
      }
    }

    out.innerHTML =
      '<b>' + side + ' × ' + side + ' = ' + n + '</b> channels × <b>' + rTxt + ' Gbps</b> = 800 Gbps' +
      '<br>pitch <b>' + pitchUm.toFixed(0) + ' µm</b> → mesa <b>≈' + mesaUm.toFixed(1) + ' µm</b>' +
      (mesaUm <= 10 ? ' (microLED size)' : ' (too big for a microLED)') +
      '<br>each beam must reach <b>' + (needGHz >= 10 ? needGHz.toFixed(0) : needGHz.toFixed(2)) + ' GHz</b>' +
      ' — ' + (ok ? 'within reported microLED range' : '<b>beyond microLED, laser territory</b>');
    outK.textContent = side + ' × ' + side + ' = ' + n + ' ch';
  }

  elK.addEventListener('input', () => { state.k = +elK.value; draw(); });
  draw();
}
