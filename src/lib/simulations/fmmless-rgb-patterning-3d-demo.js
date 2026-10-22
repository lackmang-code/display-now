// 시뮬레이션 — FMM 없이 R·G·B 화소를 차례로 그리는 리프트오프 두 갈래와 오버행 갈래를 3D 단면으로 한 단계씩 넘긴다.
// 클레임 「FMM리스 OLED 패터닝 특허 분석」(2026-10-20) 2장 끝에 임베드.
//
// 이 그림이 답하는 질문 하나: **리프트오프에서 상부전극은 색마다 올리나, 세 색 뒤에 올리나.**
//
// 모델과 근거 — 단계는 전부 명세서에 적힌 것만 쓴다(지어낸 단계 금지).
// - 리프트오프 A(색마다 상부전극): Orthogonal US10468637B2 FIG. 3A~3K. 기판에는 처음부터 「electrode-separating dielectric 203」이
//   있고, 명세서는 그것이 「흔히 하부전극 가장자리 위로 조금 올라온다(그림에는 안 그림)」고 적었다 → PDL 로 그린다.
//   색마다 「언더컷 리프트오프 구조 → 유기층·상부전극 증착 → 리프트오프」, 끝에 공통 상부전극(FIG. 3K).
// - 🔴 PDL 은 하부전극 바로 다음, 모든 단계에 처음부터 있다. 음극은 PDL·유기층 위에만 얹혀 하부전극과 닿아 보이면 안 된다
//   (2026-10-19 대표 · 성대첨디공 11월호 모식도와 같은 원칙). FIG. 10B(셋째 색 뒤 유전막) 순서로 그렸다가 「PDL 을 제일 마지막에
//   올리네」 지적으로 걷었다.
// - 리프트오프 B(유기층만 색마다): LG디스플레이 KR20230099873A FIG. 4~19. 아래 buildLiftoffLG 주석.
// - 전면 식각(SEL) 갈래는 2026-10-14 대표 지시로 뺐다. 오버행(AMAT)은 2026-10-19 대표 지시로 다시 넣었다(buildOverhangAMAT).
// - 🔴 두께·폭은 비례가 아니다. 보이게 키웠다. 고지문은 원고 <template data-sim-note> 가 갖는다.
//
// 왜 3D 인가. 화소 띠는 실물이 3차원 적층이고, 단면을 띠 방향으로 뽑아 내야 「줄무늬로 그려진다」가 보인다
// (편집규칙 「3D 음영은 대상이 3차원 물체일 때만」). 캔버스 안 글자는 전부 영어 · 원색 · 13px 굵게 · 받침.

import { hidpi } from './_hidpi.js';

// 🔴 표지 무대 안쪽 폭 704px, 시뮬 몸통 좌우 여백 40px → 캔버스는 664px 이하.
const LAYOUT = {
  article: { W: 620, H: 470 },
  cover: { W: 620, H: 440 },
};

const MAT = {
  sub: { c: '#2b313a', name: 'Backplane' },
  anode: { c: '#7d8896', name: 'Bottom electrode' },
  bank: { c: '#a0784f', name: 'Pixel-defining layer (PDL)' },
  fluoro: { c: '#f5c542', name: 'Fluorinated lift-off layer' },
  resist: { c: '#ff8c1a', name: 'Resist' },
  R: { c: '#ff3b3b', name: 'Red organic' },
  G: { c: '#2bff6a', name: 'Green organic' },
  B: { c: '#3b7bff', name: 'Blue organic' },
  metal: { c: '#f4f6f8', name: 'Top electrode / cathode' },
  encap: { c: '#4fb8ff', name: 'Encapsulation' },
  ovl: { c: '#c89b3c', name: 'Overhang lower layer (402A) · conductor' },
  ovu: { c: '#e2ccff', name: 'Overhang upper layer (402B)' },
  ink: { c: '#f3e7a1', name: 'Inkjet layer (118)' },
  glob: { c: '#9be7ff', name: 'Global passivation (120)' },
};

const COLS = ['R', 'G', 'B'];
const CNAME = { R: 'red', G: 'green', B: 'blue' };
const CENTER = [50, 150, 250];        // 화소 중심(단면 x, 임의 단위)
const XL = -10, XR = 310;             // 단면 좌우 끝

// ── 기하 도구 ──────────────────────────────────────────
const rect = (x0, x1, z0, z1) => [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];
// 패널 끝의 둑은 단면 밖으로 나가지 않게 자른다
const clampX = (pts) => pts.map(([x, z]) => [Math.min(XR, Math.max(XL, x)), z]).filter((p, i, a) => i === 0 || p[0] !== a[i - 1][0] || p[1] !== a[i - 1][1]);

function area(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, z1] = pts[i], [x2, z2] = pts[(i + 1) % pts.length];
    a += x1 * z2 - x2 * z1;
  }
  return a / 2;
}

// 세로선 x 가 다각형을 지나는 가장 높은 z
function topOf(pts, x) {
  let best = -Infinity;
  for (let i = 0; i < pts.length; i++) {
    const [x1, z1] = pts[i], [x2, z2] = pts[(i + 1) % pts.length];
    if ((x1 <= x && x <= x2) || (x2 <= x && x <= x1)) {
      const z = x1 === x2 ? Math.max(z1, z2) : z1 + ((x - x1) / (x2 - x1)) * (z2 - z1);
      if (z > best) best = z;
    }
  }
  return best;
}

// 공정 상태: 물체 목록. 단계마다 사본을 떠서 쌓는다.
function makeWorld() {
  const objs = [];
  let seq = 0;
  const w = {
    objs,
    add(mat, pts, tag) {
      const o = { id: 'o' + seq++, mat, pts: area(pts) < 0 ? pts.slice().reverse() : pts, tag: tag || '' };
      objs.push(o);
      return o;
    },
    remove(pred) {
      for (let i = objs.length - 1; i >= 0; i--) if (pred(objs[i])) objs.splice(i, 1);
    },
    top(x) {
      let best = 0;
      for (const o of objs) { const z = topOf(o.pts, x); if (z > best) best = z; }
      return best;
    },
    // 지금 표면을 따라 두께 t 로 덮는 막(x0..x1). 표면 높이는 호출 시점에 고정된다.
    conformal(mat, x0, x1, t, tag, prof) {
      const p = prof || w.profile();
      const lo = [], hi = [];
      const th = typeof t === 'function' ? t : () => t;   // 두께를 함수로 주면 가장자리를 얇게 줄일 수 있다
      for (let x = x0; x <= x1 + 1e-9; x += 1) { const z = p(x); lo.push([x, z]); hi.push([x, z + th(x)]); }
      return w.add(mat, lo.concat(hi.reverse()), tag);
    },
    profile() {
      const xs = {};
      for (let x = Math.floor(XL); x <= XR; x++) xs[x] = w.top(x);
      return (x) => xs[Math.round(x)] ?? 0;
    },
    snap() { return objs.map((o) => ({ id: o.id, mat: o.mat, pts: o.pts, tag: o.tag })); },
  };
  return w;
}

// PDL(뱅크)은 하부전극 바로 다음에 올려 전극 가장자리를 덮는다 — 전극 끝(c±30) 위로 6 만큼 걸친다
function addPDL(w) {
  for (const xb of [0, 100, 200, 300]) w.add('bank', clampX([[xb - 20, 0], [xb + 20, 0], [xb + 20, 3], [xb + 26, 3], [xb + 14, 9], [xb - 14, 9], [xb - 26, 3], [xb - 20, 3]]));
}

// ── 세 갈래의 공정 단계 ──────────────────────────────
function buildLiftoff() {
  const w = makeWorld(), steps = [];
  const push = (cap, src, extra) => steps.push({ objs: w.snap(), cap, src, ...extra });
  w.add('sub', rect(XL, XR, -14, 0));
  for (const c of CENTER) w.add('anode', rect(c - 30, c + 30, 0, 3));
  addPDL(w);
  push('Bottom electrodes, then the PDL over their edges (electrode-separating dielectric 203)', 'FIG. 3A', { tags: [[100, 'PDL', 'bank'], [CENTER[1] - 20, 'Bottom electrode', 'anode']] });
  const figs = [['3B', '3C', '3D'], ['3E', '3F', '3G'], ['3H', '3I', '3J']];
  COLS.forEach((col, k) => {
    const c = CENTER[k];
    const prof = w.profile();
    // 불소계 층(아래)은 구멍이 넓고, 레지스트(위)는 좁다 → 언더컷
    const lo = (x0, x1) => { const a = []; for (let x = x0; x <= x1; x++) a.push([x, prof(x)]); return a.concat([[x1, 26], [x0, 26]]); };
    // 구멍은 PDL 개구(하부전극이 드러난 바닥) 폭에 맞춘다
    w.add('fluoro', lo(XL, c - 34), 'lo');
    w.add('fluoro', lo(c + 34, XR), 'lo');
    w.add('resist', rect(XL, c - 27, 26, 32), 'lo');
    w.add('resist', rect(c + 27, XR, 26, 32), 'lo');
    push('Lift-off structure opens the ' + CNAME[col] + ' electrode · undercut below the resist', 'FIG. ' + figs[k][0], { protect: k ? 'earlier colours sit under the new lift-off structure' : '' });
    // 증착: 구멍 안(레지스트 가장자리가 그림자를 만든다)과 구조 위
    // 🔴 가장자리는 증착 그림자로 얇아진다 — 끝을 수직으로 자르면 공통 전극이 그 턱을 타고 넘어
    // 화소마다 돌기가 솟는다(2026-10-19 대표 「돌기가 있는 것처럼 되어 현실성 없다」). 끝 10 만큼 0으로 줄인다.
    const edge = (x, t) => t * Math.min(1, Math.max(0, Math.min(x - (c - 27), (c + 27) - x)) / 10);
    w.conformal(col, c - 27, c + 27, (x) => edge(x, 6), 'stack', prof);
    w.conformal('metal', c - 27, c + 27, (x) => edge(x, 2), 'stack', (x) => prof(x) + edge(x, 6));
    for (const [a, b] of [[XL, c - 27], [c + 27, XR]]) w.add(col, rect(a, b, 32, 38), 'lo');
    // 🔴 유기층과 상부전극은 반드시 별도 스텝(2026-10-19 대표 지시). 같은 FIG. 3C 이지만 증착은 두 번이다
    const stackMetal = w.objs.filter((o) => o.mat === 'metal' && o.tag === 'stack').pop();
    w.remove((o) => o === stackMetal);
    push('Organic layers evaporated over everything · inside the opening and on top of the structure', 'FIG. ' + figs[k][1]);
    w.add('metal', stackMetal.pts, 'stack');
    for (const [a, b] of [[XL, c - 27], [c + 27, XR]]) w.add('metal', rect(a, b, 38, 40), 'lo');
    push('Top electrode evaporated over the organic layers', 'FIG. ' + figs[k][1]);
    w.remove((o) => o.tag === 'lo');
    push('Lift-off in fluorinated solvent · the structure leaves with what sits on it', 'FIG. ' + figs[k][2], { float: true });
  });
  w.conformal('metal', XL, XR, 2);
  push('Common top electrode joins the three stacks · the PDL covers the bottom-electrode edges', 'FIG. 3K', { tags: [[CENTER[0] - 10, 'Top electrode', 'metal'], [100, 'PDL', 'bank'], [CENTER[2] - 20, 'Bottom electrode', 'anode']], note: 'Encapsulation: not shown in FIG. 3' });
  return { key: 'liftoff', short: 'Orthogonal', name: 'Lift-off, electrode each colour', elec: 'Top electrode: each colour, joined at the end', src: 'Orthogonal US10468637B2', steps };
}

// 리프트오프 B — 유기층만 색마다, 상부전극(음극)·봉지는 세 색 뒤에.
// LG디스플레이 KR20230099873A FIG. 4~19: 보호층(불소계)+포토레지스트 → 레지스트 열기 → 불소계 용매로 보호층을 파 언더컷
// → 유기 발광층(구멍 안 서브픽셀 패턴은 언더컷 밑 뱅크 윗면까지 번지며 가장자리가 얇아진다, FIG. 10)
// → 전면 리프트오프. 셋째 색은 공보 [0096] 「도 17에서 도시한 바와 같이」 — 레지스트·언더컷·증착이 모두 도 17(영문 번역본은 도면 번호가 빠져 있다). 끝에 공통 음극(190, FIG. 19)과 봉지(197).
function buildLiftoffLG() {
  const w = makeWorld(), steps = [];
  const push = (cap, src, extra) => steps.push({ objs: w.snap(), cap, src, ...extra });
  w.add('sub', rect(XL, XR, -14, 0));
  for (const c of CENTER) w.add('anode', rect(c - 30, c + 30, 0, 3));
  addPDL(w);
  push('Bottom electrodes, then the PDL (bank) over their edges', 'FIG. 4', { tags: [[100, 'Bank (PDL)', 'bank'], [CENTER[1] - 20, 'Bottom electrode', 'anode']] });
  const figs = [['5·6', '7', '9', '11'], ['12·13', '14', '15', '16'], ['17', '17', '17', '18']];
  COLS.forEach((col, k) => {
    const c = CENTER[k];
    const prof = w.profile();
    const fill = (x0, x1, top) => { const a = []; for (let x = x0; x <= x1; x++) a.push([x, prof(x)]); return a.concat([[x1, top], [x0, top]]); };
    // 1) 보호층·레지스트를 깔고 레지스트에 구멍
    w.add('fluoro', fill(XL, XR, 20), 'lo');
    w.add('resist', rect(XL, c - 34, 20, 26), 'lo');
    w.add('resist', rect(c + 34, XR, 20, 26), 'lo');
    push('Fluorinated protective layer and resist · resist opened over the ' + CNAME[col] + ' pixel', 'FIG. ' + figs[k][0], { protect: k ? 'earlier colours sit under the new protective layer' : '' });
    // 2) 불소계 용매로 보호층을 넓게 파 언더컷
    w.remove((o) => o.mat === 'fluoro' && o.tag === 'lo');
    w.add('fluoro', fill(XL, c - 44, 20), 'lo');
    w.add('fluoro', fill(c + 44, XR, 20), 'lo');
    push('Fluorine-based solvent eats the protective layer under the resist → undercut', 'FIG. ' + figs[k][1]);
    // 3) 유기 발광층: 구멍 안은 두껍고, 언더컷 밑 뱅크 윗면으로 갈수록 얇다(FIG. 10). 레지스트 위에도 쌓인다
    // 🔴 뱅크 경사를 오르는 만큼 얇아져 윗면이 거의 평평하게 이어지고 뱅크 윗면 초입에서 0이 된다.
    // 종전(끝 0.6 두께로 뱅크 윗면까지)은 뱅크 위에 턱이 남아 봉지막까지 뿔처럼 솟았다(2026-10-19 대표 지적).
    const th = (x) => { const d = Math.abs(x - c); return d <= 28 ? 5 : Math.max(0, 5 * (38 - d) / 10); };
    const lo2 = [], hi2 = [];
    for (let x = c - 38; x <= c + 38; x++) { lo2.push([x, prof(x)]); hi2.push([x, prof(x) + th(x)]); }
    w.add(col, lo2.concat(hi2.reverse()), 'pat');
    w.add(col, rect(XL, c - 34, 26, 31), 'lo');
    w.add(col, rect(c + 34, XR, 26, 31), 'lo');
    push('Organic emission layer evaporated · the pattern spreads onto the bank under the undercut, thinning at the edge', 'FIG. ' + figs[k][2]);
    // 4) 전면 리프트오프 — 음극은 아직 없다
    w.remove((o) => o.tag === 'lo');
    push('Full lift-off in fluorine-based solvent · only the organic pattern stays, no cathode yet', 'FIG. ' + figs[k][3], { float: true });
  });
  w.conformal('metal', XL, XR, 2);
  push('Common cathode over all three patterns · the bank covers the bottom-electrode edges', 'FIG. 19', { tags: [[CENTER[0] - 10, 'Cathode', 'metal'], [100, 'Bank (PDL)', 'bank'], [CENTER[2] - 20, 'Bottom electrode', 'anode']] });
  // 봉지막은 아래 굴곡을 메우고 윗면은 평탄하게 끝난다(2026-10-19 대표 「봉지는 마지막이 평탄화」).
  const pe = w.profile();
  let zTop = 0;
  for (let x = XL; x <= XR; x++) zTop = Math.max(zTop, pe(x));
  w.conformal('encap', XL, XR, (x) => zTop + 5 - pe(x), '', pe);
  push('Encapsulation over the cathode', 'FIG. 19 (197)', { tags: [[CENTER[0] - 20, 'Encapsulation', 'encap'], [CENTER[1] + 10, 'Cathode', 'metal'], [200, 'Bank (PDL)', 'bank']] });
  return { key: 'liftoff-lg', short: 'LG Display', name: 'Lift-off, organic only', elec: 'Cathode, then encapsulation, after all three colours', src: 'LG Display KR20230099873A', steps };
}

// 오버행(식각) — AMAT US20220077257A1 FIG. 4C~4N. 2026-10-19 대표 지시로 추가(「시뮬레이션에 오버행을 넣어야겠다」).
// 오버행 재료층(아래 402A·위 402B)을 전면에 깔고 그 색 자리만 열면, 아래층이 위층보다 안쪽으로 파여 처마(오버행 110)가 된다(FIG. 4C).
// 그 색 유기물 → 음극 → 국소 봉지(116)를 따로 증착한다. 유기물은 처마 밑에서 멈추고, 음극은 더 들어가 처마 아랫부분에 닿는다
// (공개본 청구항 1의 증착 각도). 국소 봉지는 처마 밑으로 들어가 옆벽을 따라 오른다([0034]). 그 화소에 레지스트를 두고
// 바깥 막을 식각한다(FIG. 4F). 둘째 색은 레지스트(412)가 첫 화소를 덮은 채 둘째 자리를 연다(FIG. 4H). 처마는 끝까지 남는다.
// 🔴 유기물·음극·봉지는 반드시 별도 스텝(2026-10-19 대표 지시).
// 🔴 처마 아랫부분은 도체로 그린다(2026-10-20 대표 「오버행 하단이 금속이어야 탑전극과 연결된다」). AMAT [0024] 1·2 구성.
//    3·4 구성(아래층 절연 + 그 밑 보조 음극)은 sim-note 에만 밝힌다.
const BANKS = [0, 100, 200, 300];
// 화소 자리 바닥: 하부전극 위(±24) → PDL 경사(±24~36) → PDL 윗면(±36~42, 처마 밑)
const floorZ = (c, x) => { const d = Math.abs(x - c); return d <= 24 ? 3 : d <= 36 ? 3 + (d - 24) * 0.5 : 9; };
function buildOverhangAMAT() {
  const w = makeWorld(), steps = [];
  const push = (cap, src, extra) => steps.push({ objs: w.snap(), cap, src, ...extra });
  w.add('sub', rect(XL, XR, -14, 0));
  for (const c of CENTER) w.add('anode', rect(c - 30, c + 30, 0, 3));
  addPDL(w);
  push('Bottom electrodes, then the PDL over their edges', 'US20220077257A1', { tags: [[100, 'PDL', 'bank'], [CENTER[1] - 20, 'Bottom electrode', 'anode']] });
  // 처마 몸체(PDL 위) + 아직 열지 않은 자리를 메운 같은 재료층
  for (const xb of BANKS) {
    w.add('ovl', clampX(rect(xb - 8, xb + 8, 9, 15)), 'T');
    w.add('ovu', clampX(rect(xb - 14, xb + 14, 15, 18)), 'T');
  }
  CENTER.forEach((c, k) => {
    const lo = []; for (let x = c - 42; x <= c + 42; x++) lo.push([x, floorZ(c, x)]);
    w.add('ovl', lo.concat([[c + 42, 15], [c - 42, 15]]), 'fill' + k);
    w.add('ovu', rect(c - 36, c + 36, 15, 18), 'fill' + k);
  });
  push('Overhang layers (lower 402A, upper 402B) laid over everything', 'FIG. 4A', { tags: [[100, 'Overhang layers', 'ovu'], [CENTER[1] - 20, 'Bottom electrode', 'anode']] });
  // 🔴 레지스트 패터닝과 처마층 식각은 별도 스텝이다(2026-10-22 대표 지적 「7~10단계가 특허에 있는 내용이 맞아?」).
  //    첫 색: FIG. 4B(레지스트 406 패터닝) → FIG. 4C(operation 303, 처마층 식각). 둘째 색: FIG. 4H(레지스트 412) →
  //    operation 308(처마층 식각, 도면 없음). 4D·4J 에는 레지스트가 없다 — 증착 전에 걷힌 것으로 그린다.
  const figs = [['4B', '4C', '4D', '4D', '4D', '4E', '4F'], ['4H', 'operation 308 (no drawing)', '4J', '4J', '4J', '4L', '4N'], ['4 (repeated)', '4 (repeated)', '4 (repeated)', '4 (repeated)', '4 (repeated)', '4 (repeated)', '4 (repeated)']];
  COLS.forEach((col, k) => {
    const c = CENTER[k];
    // 1) 레지스트를 깔고 그 색 자리만 연다 — 처마층은 아직 그대로다(FIG. 4B · 4H).
    //    둘째 색부터는 새 레지스트(412)가 위층과 끝난 화소를 덮는다. 첫 레지스트 408 은 4F 에서 이미 걷혔다.
    const pr0 = w.profile();
    w.conformal('resist', XL, c - 36, (x) => Math.max(0, 24 - pr0(x)), 'res', pr0);
    w.conformal('resist', c + 36, XR, (x) => Math.max(0, 24 - pr0(x)), 'res', pr0);
    // 끝난 화소의 처마 밑 틈도 레지스트가 메운다(FIG. 4H — 412 가 우물을 116 위까지 채운다, 2026-10-22 대표 「비는 것도 이상해」).
    //    위에서 내려다본 표면만 따르는 conformal 은 처마 밑에 들어가지 못하므로 따로 채운다.
    for (let j = 0; j < k; j++) w.add('resist', rect(CENTER[j] - 42, CENTER[j] + 42, 12.5, 15), 'res');
    push((k ? 'New resist covers the finished pixel · ' : 'Resist laid and ') + 'opened over the ' + CNAME[col] + ' pixel · the overhang layers are still whole', 'FIG. ' + figs[k][0],
      k ? { protect: 'the finished pixel sits under the new resist' } : { tags: [[c, 'Resist opening', 'resist']] });
    // 2) 열린 자리의 처마층을 깎는다 — 위층은 건식, 아래층은 습식으로 더 파여 처마가 된다(operation 303 · 308).
    //    FIG. 4C 에는 레지스트 406 이 이미 없다 — 깎은 뒤 걷힌 상태로 그린다.
    w.remove((o) => o.tag === 'fill' + k || o.tag === 'res');
    push('Overhang layers etched through the opening, resist stripped · the lower layer is cut back under the upper → overhang', (figs[k][1].startsWith('operation') ? '' : 'FIG. ') + figs[k][1],
      k ? {} : { tags: [[c + 50, 'Overhang', 'ovu'], [c, 'Opened pixel', 'anode']] });
    // 2) 유기물: 처마 밑에서 멈춘다(가장자리 3 만큼 얇아짐)
    // 🔴 유기물은 얇고 윗면이 평평하게(2026-10-19 대표 「RGB 양옆 날개 때문에 위층도 이상해 보인다」).
    //    윗면 높이 ZT 까지만 채워 PDL 경사 초입에서 끝난다 — 가장자리는 PDL 위(청구항 1 「OLED edge over the PDL」)
    const ZT = 6.5;
    // 단 청구항 1: 유기물은 처마 밑으로 들어가 PDL 위에서 끝난다(기둥 c±42 에는 닿지 않음) — 바닥은 평평, 경사·처마 밑은 얇은 막(클레임 검수 2026-10-20)
    const oth = (x) => { const d = Math.abs(x - c); return d >= 39 ? 0 : Math.min(Math.max(1.2, ZT - floorZ(c, x)), (39 - d) * 1.2); };
    const lo = [], hi = [];
    for (let x = c - 39; x <= c + 39; x++) { lo.push([x, floorZ(c, x)]); hi.push([x, floorZ(c, x) + oth(x)]); }
    w.add(col, lo.concat(hi.reverse()), 'stack');
    w.conformal(col, XL, c - 36, 2, 'lo');
    w.conformal(col, c + 36, XR, 2, 'lo');
    push(CNAME[col][0].toUpperCase() + CNAME[col].slice(1) + ' organic evaporated · the overhang shadow stops it under the overhang, short of the stem', 'FIG. ' + figs[k][2]);
    // 3) 음극: 유기물 가장자리를 넘어 처마 아랫부분 옆벽에 닿는다
    const ct = (x) => floorZ(c, x) + oth(x);
    const mlo = [], mhi = [];
    for (let x = c - 42; x <= c + 42; x++) { mlo.push([x, ct(x)]); mhi.push([x, ct(x) + 1.5]); }
    w.add('metal', mlo.concat(mhi.reverse()), 'stack');
    w.conformal('metal', XL, c - 36, 1.5, 'lo');
    w.conformal('metal', c + 36, XR, 1.5, 'lo');
    push('Cathode evaporated at a wider angle · it reaches past the organic edge and touches the overhang', 'FIG. ' + figs[k][3], { tags: [[c + 41, 'Cathode meets conductor', 'metal']] });
    // 4) 국소 봉지: 음극 위, 처마 밑으로 들어가 옆벽을 따라 오른다
    const et = (x) => ct(x) + 1.5;
    const e = [];
    for (let x = c - 42; x <= c + 42; x++) e.push([x, et(x)]);
    e.push([c + 42, 15], [c + 36, 15], [c + 36, 18], [c + 34, 18]);
    for (let x = c + 34; x >= c - 34; x--) e.push([x, et(x) + 2]);
    e.push([c - 34, 18], [c - 36, 18], [c - 36, 15], [c - 42, 15]);
    const enc = w.add('encap', e, 'stack');
    w.conformal('encap', XL, c - 36, 2, 'lo');
    w.conformal('encap', c + 36, XR, 2, 'lo');
    push('Local encapsulation laid · it goes in under the overhang and up its sidewall', 'FIG. ' + figs[k][4], { tags: [[c + 35, 'Local encapsulation', 'encap']] });
    // 5) 그 화소에 레지스트 → 바깥 막 식각
    const pr = w.profile();
    w.conformal('resist', c - 34, c + 34, (x) => Math.max(0, 24 - pr(x)), 'res', pr);
    push('Resist in the ' + CNAME[col] + ' pixel well', 'FIG. ' + figs[k][5]);
    w.remove((o) => o.tag === 'lo' || o.tag === 'res');
    // 🔴 식각 뒤 봉지는 처마 밑 우물 안에만 남는다 — 처마 옆벽·윗면은 드러난다(FIG. 4F, 2026-10-22 대표 지적).
    //    처마 아래면(15)보다 낮은 평평한 윗면(ZF)까지만 남기고, 옆벽을 타고 오르던 부분은 걷는다.
    const ZF = 12.5;
    const ef = [];
    for (let x = c - 42; x <= c + 42; x++) ef.push([x, et(x)]);
    for (let x = c + 42; x >= c - 42; x--) ef.push([x, Math.max(ZF, et(x) + 1)]);
    w.remove((o) => o === enc);
    w.add('encap', ef, 'stack');
    push('Etch removes the layers outside the ' + CNAME[col] + ' pixel, then the resist · what stays sits in the well under the overhang', 'FIG. ' + figs[k][6], { float: false });
  });
  // 마무리(구조 설명, FIG. 1A): 처마·국소 봉지 위를 아크릴 잉크젯 층(118)이 메워 평탄하게 하고, 그 위에 전체 보호층(120).
  // 2026-10-19 대표 「모노머로 평탄화하고 2차 CVD를 해야 완성된 모습」. 명세서 순서는 116 → 118(may) → 120.
  // 120 의 증착법은 명세서가 증발 증착도 가능하다고 적어 CVD 로 단정하지 않는다.
  const pi = w.profile();
  let zi = 0;
  for (let x = XL; x <= XR; x++) zi = Math.max(zi, pi(x));
  w.conformal('ink', XL, XR, (x) => zi + 4 - pi(x), '', pi);
  push('Inkjet layer between the overhangs and local encapsulation and the global passivation', 'FIG. 1A (structure, 118)', { tags: [[100, 'Overhang stays', 'ovu'], [CENTER[1] + 20, 'Inkjet layer', 'ink']] });
  w.conformal('glob', XL, XR, 3);
  push('Global passivation over the inkjet layer', 'FIG. 1A (structure, 120)', { tags: [[100, 'Overhang stays', 'ovu'], [CENTER[1] + 20, 'Local encapsulation', 'encap'], [200, 'Cathodes joined via conductor', 'ovl']] });
  return { key: 'overhang-amat', short: 'AMAT (overhang)', name: 'Overhang, organic · cathode · seal each colour', elec: 'Cathode each colour, touching the overhang that stays', src: 'AMAT US20220077257A1', steps };
}

const ROUTES = [buildLiftoff(), buildLiftoffLG(), buildOverhangAMAT()];

export function mount(container, params = {}) {
  const COVER = !!params.cover;
  const { W, H } = LAYOUT[COVER ? 'cover' : 'article'];
  const state = {
    r: Math.max(0, ROUTES.findIndex((x) => x.key === (params.route || 'liftoff'))),
    s: 0,
  };
  const R0 = ROUTES[state.r];
  state.s = Math.min(R0.steps.length - 1, params.step != null ? +params.step : R0.steps.length - 1);

  container.innerHTML = `
    <div class="sim-head">Patterning R, G and B without a fine metal mask — lift-off and overhang routes, step by step</div>
    <div class="sim-body">
      <div class="sim-canvas-wrap"><canvas data-c></canvas></div>
      <div class="sim-controls">
        <div class="sim-control">
          <label>Route (patent)</label>
          <div class="sim-toggle-group" data-r>
            ${ROUTES.map((r, k) => `<button type="button" class="sim-toggle-btn" data-val="${k}" aria-pressed="${k === state.r}">${r.short}</button>`).join('')}
          </div>
        </div>
        <div class="sim-control">
          <label>Step <span data-sl></span></label>
          <input type="range" min="0" max="1" step="1" value="0" data-s />
        </div>
        <div class="sim-control">
          <div class="sim-toggle-group">
            <button type="button" class="sim-toggle-btn" data-prev>Back</button>
            <button type="button" class="sim-toggle-btn" data-play aria-pressed="false">Play</button>
            <button type="button" class="sim-toggle-btn" data-next>Next</button>
          </div>
        </div>
        <div class="sim-readout" data-out></div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('[data-c]');
  const ctx = hidpi(canvas, W, H);
  const rbtns = Array.from(container.querySelectorAll('[data-r] .sim-toggle-btn'));
  const slider = container.querySelector('[data-s]');
  const sl = container.querySelector('[data-sl]');
  const out = container.querySelector('[data-out]');
  const playBtn = container.querySelector('[data-play]');

  // ── 투영: 단면 (x, z) 를 띠 방향 y 로 뽑는다. 뒤로 갈수록 오른쪽 위.
  const SXU = 1.62, SZ = COVER ? 4.0 : 3.6, DEPTH = 150, DX = 0.52, DY = 0.45;
  const OX = (W - (XR - XL) * SXU - DEPTH * DX) / 2 - XL * SXU;
  const OY = COVER ? 290 : 316;   // 표지는 설명 줄이 없어 그림을 위로 올려 가운데에 둔다
  const P = (x, y, z) => [OX + x * SXU + y * DX, OY - z * SZ - y * DY];

  const shade = (hex, f) => {
    const v = parseInt(hex.slice(1), 16);
    let r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
    if (f >= 0) { r += (255 - r) * f; g += (255 - g) * f; b += (255 - b) * f; } else { r *= 1 + f; g *= 1 + f; b *= 1 + f; }
    return 'rgb(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ')';
  };

  function label(text, x, y, color, align, size) {
    const s = size || 13;
    ctx.font = '700 ' + s + 'px "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(text).width;
    const px = 6, hh = s * 0.74;
    const lx = align === 'right' ? x - tw - px : align === 'center' ? x - tw / 2 - px : x - px;
    ctx.fillStyle = 'rgba(8,10,12,0.78)';
    ctx.beginPath(); ctx.roundRect(lx, y - hh, tw + px * 2, hh * 2, 5); ctx.fill();
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  // 글자를 폭 안에서 줄바꿈
  function wrap(text, maxW) {
    const words = text.split(' '), lines = [];
    let cur = '';
    for (const wd of words) {
      const t = cur ? cur + ' ' + wd : wd;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = wd; } else cur = t;
    }
    if (cur) lines.push(cur);
    return lines;
  }

  // 물체 하나: dz(위로 띄움)·alpha 를 받아 그린다. 면은 화가 순서용으로 따로 모은다.
  function faces(o, dz, alpha, list) {
    const base = MAT[o.mat].c;
    const pts = o.pts.map(([x, z]) => [x, z + dz]);
    for (let i = 0; i < pts.length; i++) {
      const [x1, z1] = pts[i], [x2, z2] = pts[(i + 1) % pts.length];
      const dx = x2 - x1, dzz = z2 - z1, len = Math.hypot(dx, dzz);
      if (len < 1e-6) continue;
      const nx = dzz / len, nz = -dx / len;      // 반시계 다각형의 바깥 법선
      if (nx * 0.5 + nz <= 0.02) continue;        // 보는 쪽(오른쪽 위)을 향하지 않으면 생략
      const f = nz > 0.5 ? 0.28 * nz : -0.32 * (1 - nz);
      const fill = shade(base, f);
      // 긴 변(기판 윗면 등)은 잘게 나눠 칸마다 앞뒤를 정한다 — 통째로 두면 위에 놓인 전극을 덮는다
      const n = Math.max(1, Math.ceil(len / 6));
      for (let k = 0; k < n; k++) {
        const ax = x1 + (dx * k) / n, az = z1 + (dzz * k) / n, bx = x1 + (dx * (k + 1)) / n, bz = z1 + (dzz * (k + 1)) / n;
        list.push({ key: (ax + bx) * 0.5 * 0.3 + (az + bz) * 0.5 + (o.mat === 'sub' ? -0.5 : 0), alpha, fill, q: [[ax, az], [bx, bz]] });
      }
    }
  }

  function drawFront(o, dz, alpha) {
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    o.pts.forEach(([x, z], n) => { const [sx, sy] = P(x, 0, z + dz); n ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy); });
    ctx.closePath();
    ctx.fillStyle = shade(MAT[o.mat].c, -0.12);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  const anim = { from: null, t: 1, raf: 0, float: false };

  function sceneObjs() {
    const step = ROUTES[state.r].steps[state.s];
    const now = step.objs;
    if (!anim.from || anim.t >= 1) return now.map((o) => ({ o, dz: 0, a: 1 }));
    const e = 1 - Math.pow(1 - anim.t, 3);
    const ids = new Set(now.map((o) => o.id));
    const was = new Set(anim.from.map((o) => o.id));
    const list = now.map((o) => (was.has(o.id) ? { o, dz: 0, a: 1 } : { o, dz: 14 * (1 - e), a: e }));
    for (const o of anim.from) if (!ids.has(o.id)) list.push({ o, dz: anim.float ? 40 * e : 0, a: 1 - e });
    return list;
  }

  function draw() {
    const route = ROUTES[state.r];
    const step = route.steps[state.s];
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#1a1e24'); bg.addColorStop(1, '#0d0f12');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const objs = sceneObjs();
    const list = [];
    for (const { o, dz, a } of objs) faces(o, dz, a, list);
    list.sort((p, q) => p.key - q.key);
    for (const f of list) {
      const [[x1, z1], [x2, z2]] = f.q;
      const a0 = P(x1, 0, z1), b0 = P(x2, 0, z2), b1 = P(x2, DEPTH, z2), a1 = P(x1, DEPTH, z1);
      ctx.globalAlpha = f.alpha;
      ctx.beginPath(); ctx.moveTo(a0[0], a0[1]); ctx.lineTo(b0[0], b0[1]); ctx.lineTo(b1[0], b1[1]); ctx.lineTo(a1[0], a1[1]); ctx.closePath();
      ctx.fillStyle = f.fill; ctx.fill();
      ctx.strokeStyle = f.fill; ctx.lineWidth = 0.6; ctx.stroke();
    }
    ctx.globalAlpha = 1;
    for (const { o, dz, a } of objs) drawFront(o, dz, a);

    // 화소 띠의 발광 표시: 완성된 유기층 앞면 위로 은은한 빛
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const { o, a } of objs) {
      if (!COLS.includes(o.mat) || o.tag === 'top' || o.tag === 'lo' || o.tag === 'film') continue;
      const xs = o.pts.map((p) => p[0]), zs = o.pts.map((p) => p[1]);
      const xm = (Math.min(...xs) + Math.max(...xs)) / 2, zm = Math.max(...zs);
      const [sx, sy] = P(xm, 0, zm);
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 46);
      g.addColorStop(0, shade(MAT[o.mat].c, 0).replace('rgb', 'rgba').replace(')', ',' + 0.28 * a + ')'));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 46, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // ── 글자
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.font = '700 ' + (COVER ? 18 : 15) + 'px "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.fillStyle = '#f4f4ee';
    ctx.fillText(COVER ? 'R, G, B without a fine metal mask' : route.name + ' · ' + route.src, 20, 28);
    ctx.font = (COVER ? '700 13px' : '600 12px') + ' "IBM Plex Sans KR", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(244,244,238,0.9)';
    // 표지는 도면 번호를 빼야 한 줄에 들어간다(2026-10-20 AMAT 표지에서 잘림)
    ctx.fillText(COVER ? route.name + ' · ' + route.src : 'Step ' + (state.s + 1) + ' of ' + route.steps.length + ' · ' + step.src, 20, 47);


    // 단계 설명(그림 위 받침 상자)
    ctx.font = '700 ' + (COVER ? 15 : 14) + 'px "IBM Plex Sans KR", system-ui, sans-serif';
    const lines = wrap(step.cap, W - 60);
    const ly0 = 72;
    // 표지는 글자를 최소로 — 단계 설명은 본문 시뮬이 맡는다(제9호 「표지 글자 너무 많다」 원칙)
    if (!COVER) lines.forEach((t, n) => label(t, 22, ly0 + n * 24, '#ffffff', 'left', 14));
    // 상부전극을 언제 올리나 — 이 갈래를 가르는 기준(설명 아래 노란 꼬리표)
    if (!COVER) label(route.elec, 22, ly0 + lines.length * 24, '#ffe08a', 'left', 12.5);

    if (step.protect && !COVER) label(step.protect, W - 20, OY + 34, '#ffe08a', 'right', 13);
    if (step.note && !COVER) label(step.note, W - 20, OY + 34, '#ffe08a', 'right', 13);

    // 층 이름표: [x, 글자, 재료] — 그 x 에서 그 재료 앞면의 가운데 높이를 가리킨다. 지시선은 위로
    if (step.tags && !COVER && (!anim.from || anim.t >= 1)) {
      const span = (x, mat) => {
        let hi = -Infinity, lo = Infinity;
        for (const o of step.objs) {
          if (o.mat !== mat) continue;
          const t = topOf(o.pts, x); if (t === -Infinity) continue;
          hi = Math.max(hi, t);
          for (let i = 0; i < o.pts.length; i++) {      // 같은 세로선의 아래 경계
            const [x1, z1] = o.pts[i], [x2, z2] = o.pts[(i + 1) % o.pts.length];
            if ((x1 <= x && x <= x2) || (x2 <= x && x <= x1)) lo = Math.min(lo, x1 === x2 ? Math.min(z1, z2) : z1 + ((x - x1) / (x2 - x1)) * (z2 - z1));
          }
        }
        return hi === -Infinity ? 0 : (hi + lo) / 2;
      };
      step.tags.forEach(([x, text, mat], n) => {
        const z = span(x, mat);
        const [sx, sy] = P(x, 0, z);
        const ty = OY - 140 - n * 26;
        ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, ty + 9); ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(sx, sy, 2.4, 0, Math.PI * 2); ctx.fill();
        label(text, sx, ty, '#ffffff', 'center', 13);
      });
    }

    // 범례: 이 단계에 있는 재료만
    if (!COVER) {
      const used = [];
      for (const { o } of objs) if (!used.includes(o.mat) && o.mat !== 'sub') used.push(o.mat);
      ctx.font = '600 12px "IBM Plex Sans KR", system-ui, sans-serif';
      // 줄 수를 먼저 세고 아래에서부터 쌓는다 — 넘치면 고지문과 겹쳤다
      let rows = 1, run = 20;
      for (const m of used) { const tw = ctx.measureText(MAT[m].name).width + 28; if (run + tw > W - 10) { rows++; run = 20; } run += tw; }
      let lx = 20, ly = H - 30 - (rows - 1) * 20;
      for (const m of used) {
        const t = MAT[m].name, tw = ctx.measureText(t).width + 28;
        if (lx + tw > W - 10) { lx = 20; ly += 20; }
        ctx.fillStyle = MAT[m].c; ctx.fillRect(lx, ly - 9, 12, 10);
        ctx.fillStyle = 'rgba(244,244,238,0.85)'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
        ctx.fillText(t, lx + 16, ly);
        lx += tw;
      }
      ctx.fillStyle = 'rgba(244,244,238,0.55)';
      ctx.font = '600 11.5px "IBM Plex Sans KR", system-ui, sans-serif';
      ctx.fillText('Thickness and width not to scale', 20, H - 8);
    }

    sl.textContent = (state.s + 1) + ' / ' + route.steps.length;
    out.innerHTML = '<b>' + route.name + '</b> · ' + route.src + ' · ' + step.src + '<br>' + route.elec +
      '<br>' + step.cap + (step.protect ? '<br><b>' + step.protect + '</b>' : '');
  }

  function go(r, s, animate) {
    const prev = ROUTES[state.r].steps[state.s].objs;
    const changedRoute = r !== state.r;
    state.r = r; state.s = s;
    const route = ROUTES[r];
    slider.max = String(route.steps.length - 1);
    slider.value = String(s);
    cancelAnimationFrame(anim.raf);
    if (animate && !changedRoute) {
      anim.from = prev; anim.t = 0; anim.float = !!route.steps[s].float;
      const t0 = performance.now();
      const tick = (now) => { anim.t = Math.min(1, (now - t0) / 650); draw(); if (anim.t < 1) anim.raf = requestAnimationFrame(tick); };
      anim.raf = requestAnimationFrame(tick);
    } else { anim.from = null; anim.t = 1; draw(); }
  }

  let timer = 0;
  const stop = () => { clearInterval(timer); timer = 0; playBtn.setAttribute('aria-pressed', 'false'); playBtn.textContent = 'Play'; };
  playBtn.addEventListener('click', () => {
    if (timer) return stop();
    const n = ROUTES[state.r].steps.length;
    if (state.s >= n - 1) go(state.r, 0, false);
    playBtn.setAttribute('aria-pressed', 'true'); playBtn.textContent = 'Pause';
    timer = setInterval(() => {
      const m = ROUTES[state.r].steps.length;
      if (state.s >= m - 1) return stop();
      go(state.r, state.s + 1, true);
    }, 1500);
  });
  container.querySelector('[data-prev]').addEventListener('click', () => { stop(); if (state.s > 0) go(state.r, state.s - 1, false); });
  container.querySelector('[data-next]').addEventListener('click', () => { stop(); if (state.s < ROUTES[state.r].steps.length - 1) go(state.r, state.s + 1, true); });
  slider.addEventListener('input', () => { stop(); go(state.r, +slider.value, false); });
  rbtns.forEach((btn) => btn.addEventListener('click', () => {
    stop();
    rbtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const r = +btn.dataset.val;
    go(r, ROUTES[r].steps.length - 1, false);
  }));

  go(state.r, state.s, false);
}
