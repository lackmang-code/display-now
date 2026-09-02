// 기사 원고 검사. npm run build 앞단에서 돈다.
//
// 사람 기억에 맡기면 반드시 어긋나는 것만 여기서 막는다.
// 규칙을 문서에만 적어 두면 새 기자는 모르고, 아는 기자도 잊는다.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/articles';
const ASSET_DIR = 'public/articles';

// 기사 그림은 webp만 커밋한다(2026-08-23 확정). png는 한 번 커밋되면 히스토리에서 못 지운다.
// 규칙이 정해지기 전에 발행된 기사까지 막으면 지금 빌드가 통째로 서므로,
// 제2호(2026-08-25) 이후 슬러그만 검사한다. 규칙 적용 시점과 정확히 같다.
const WEBP_RULE_FROM = '2026-08-25';
const RASTER = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tif', '.tiff'];
const ESC = String.fromCharCode(92) + '~';
const EM_DASH = '—';

const problems = [];

function frontmatterEnd(lines) {
  if (lines[0]?.trim() !== '---') return 0;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') return i;
  }
  return 0;
}

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const lines = readFileSync(join(DIR, file), 'utf8').split('\n');
  const start = frontmatterEnd(lines) + 1;

  let fenced = false;
  let inHtml = false;
  let para = [];
  let paraStart = 0;

  const flush = () => {
    if (!para.length) return;
    // 인라인 코드는 렌더링에서 제외되므로 검사에서 뺀다
    const text = para.join('\n').replace(/`[^`]*`/g, '');

    // 물결표 하나는 그냥 물결표로 찍힌다(astro.config.mjs에서 singleTilde를 껐다).
    // 물결표 둘은 여전히 취소선이 된다. 이 매체는 본문에 취소선을 쓰지 않는다.
    if (/~~/.test(text)) {
      problems.push(`${file}:${paraStart}  물결표 두 개(~~)는 취소선이 됩니다. 범위는 물결표 하나로 쓰십시오.`);
    }
    // 이스케이프는 이제 필요 없다. 남아 있으면 백슬래시가 화면에 노출될 수 있다
    if (text.includes(ESC)) {
      problems.push(`${file}:${paraStart}  물결표 이스케이프가 남아 있습니다. 그냥 ~ 로 쓰십시오.`);
    }
    para = [];
  };

  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const st = line.trim();

    if (st.startsWith('```')) {
      fenced = !fenced;
      flush();
      continue;
    }
    if (fenced) continue;

    if (!inHtml && /^\s{0,3}<\/?[A-Za-z][A-Za-z0-9-]*/.test(line)) inHtml = true;
    else if (inHtml && st === '') inHtml = false;

    if (inHtml) {
      // 원시 HTML 안에서는 백슬래시가 화면에 그대로 보인다
      if (line.includes(ESC)) {
        problems.push(`${file}:${i + 1}  HTML 블록 안의 이스케이프는 백슬래시가 그대로 보입니다.`);
      }
      continue;
    }

    if (line.includes(EM_DASH)) {
      problems.push(`${file}:${i + 1}  본문에 em dash(${EM_DASH})가 있습니다. 쉼표나 마침표로 바꾸십시오.`);
    }

    if (st === '') flush();
    else {
      if (!para.length) paraStart = i + 1;
      para.push(line);
    }
  }
  flush();
}

// 그림 파일 형식 검사 — 표지 카드(public/issues, public/og)는 캡처물이라 png를 유지하므로
// public/articles 아래만 본다. 직접 그린 도표의 svg는 허용한다.
if (existsSync(ASSET_DIR)) {
  for (const slug of readdirSync(ASSET_DIR)) {
    const dir = join(ASSET_DIR, slug);
    if (!statSync(dir).isDirectory()) continue;
    if (slug.slice(0, 10) < WEBP_RULE_FROM) continue;

    for (const f of readdirSync(dir)) {
      const ext = f.slice(f.lastIndexOf('.')).toLowerCase();
      if (RASTER.includes(ext)) {
        problems.push(
          `${slug}/${f}  기사 그림은 webp만 커밋합니다. ` +
            `Image.open(src).convert("RGB").save(dst, "WEBP", quality=90, method=6)`,
        );
      }
    }
  }
}

// 원고가 로컬 png·jpg를 참조하고 있는지도 본다. 파일을 지우고 경로만 남는 경우를 잡는다.
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  if (file.slice(0, 10) < WEBP_RULE_FROM) continue;
  const body = readFileSync(join(DIR, file), 'utf8');
  for (const m of body.matchAll(/\/articles\/[^\s")']+\.(png|jpg|jpeg|gif)/gi)) {
    problems.push(`${file}  본문이 ${m[0]} 를 참조합니다. webp로 바꾸십시오.`);
  }
}

// ── 시각자료가 하나도 없는 기사를 찾는다 ────────────────────────────────
//
// "기사마다 데이터 시각화 최소 1점"은 이미 정해진 규칙인데, 편집 검수에서 이 항목을
// 눈으로 보지 않아 제2호 피어 기사 세 편이 그림 0장으로 나갔다(2026-08-25 대표가 발견).
// 읽는 시간·제목·수치는 검수했으면서 "그림이 있는가"는 검사 목록에 아예 없었다.
//
// 막지는 않고 경고만 한다. 브리핑처럼 그림 없이 나가는 것이 맞는 글도 있고,
// 빌드를 세우면 발행이 막혀 오히려 급하게 아무 그림이나 넣게 된다.
// 발행 전에 눈에 띄게 하는 것이 목적이다.
const noFigure = [];
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  if (file.slice(0, 10) < WEBP_RULE_FROM) continue;
  const src = readFileSync(join(DIR, file), 'utf8');
  const lines = src.split('\n');
  const body = lines.slice(frontmatterEnd(lines) + 1).join('\n');
  const hasImg = /!\[[^\]]*\]\([^)]+\)/.test(body) || /<img[^>]+src=/i.test(body);
  const hasSvg = /<svg[\s>]/i.test(body);
  const hasSim = /data-sim=/.test(body);
  // 시뮬레이터가 있어도 그림이 0장이면 경고한다(2026-08-31 개정).
  // 종전 조건은 `!hasImg && !hasSim`이라 시뮬레이터 하나만 있으면 통과했다.
  // 제3호 데스크 기사가 시뮬 1종·그림 0장으로 그 구멍을 그대로 빠져나갔다.
  // 제2호 보강 때도 "시뮬만 있는 기사"를 대상에 넣었으면서 검사기는 안 잡고 있었다.
  if (!hasImg && !hasSvg) noFigure.push(file.replace(/\.md$/, '') + (hasSim ? '  (시뮬레이터만 있음)' : ''));
}
if (noFigure.length) {
  console.warn(`\n⚠ 시각자료가 없는 기사 ${noFigure.length}건 — 그림이나 시뮬레이터를 넣었는지 확인하십시오`);
  for (const s of noFigure) console.warn('  ' + s);
  console.warn('');
}

// ── 새로 그리는 그림의 글자는 영어다 (2026-09-02 확정 · 제4호부터) ─────────
//
// 논문 관례 그대로다. 한국어 학술지 논문도 Figure 안의 축·범례·이름표는 영어다.
// 기준은 길이가 아니라 위치 — 캔버스 프레임 안이냐 밖이냐다.
//
// 문서에만 적어 두면 안 지켜진다. 규칙을 넣은 날 이미 떠 있던 기자 세션은 그 파일을
// 읽지 않는다. CLAUDE.md 는 세션이 시작할 때만 읽히기 때문이다. 그래서 여기서 막는다.
//
// 소급하지 않는다. 아래 목록은 규칙 확정 당시 이미 있던 것들이라 면제한다.
// **새로 만드는 것만 검사한다. 목록에 추가해서 검사를 피하지 말 것.**
const SIM_DIR = 'src/lib/simulations';
const GRANDFATHERED_SIMS = new Set([
  'als-white-balance-demo',
  'bpdl-bm-spectrum-demo',
  'crosstalk-heatmap-demo',
  'esports-persistence-blur-demo',
  'faceid-ghost-dot-demo',
  'faceid-triangulation-demo',
  'fingerprint-far-frr-demo',
  'flipp-aperture-lifetime-demo',
  'fmm-tension-sag-demo',
  'metasurface-mtf-demo',
  'nanoled-count-polarity-demo',
  'nanoled-dep-window-demo',
  'optical-fp-angle-contrast-demo',
  'optical-fp-collimator-demo',
  'proximity-transmittance-demo',
  'trpl-plqy-degeneracy-demo',
  'udc-diffraction-demo',
  'ultrasonic-fp-bondline-demo',
  'ultrasonic-fp-impedance-demo',
  'ultrasonic-fp-stack-demo',
  'ultrasonic-fp-timegate-demo',
  'upc-interference-demo',
  'ups-fresnel-map-demo',
  'woled-stack-spectrum-demo',
]);
const GRANDFATHERED_SVGS = new Set([
  '2026-07-30-hiaa-big-hole/2026-07-26-hiaa-vs-kod-compare.svg',
  '2026-08-13-flex-titanium-fold8/2026-08-13-flex-titanium-timeline.svg',
  '2026-08-13-lgd-margin-defense-chart.svg',
  '2026-08-18-blue-phosphorescent-oled-patents/2026-08-18-blue-phosphorescent-oled-patents-fig2.svg',
  '2026-08-18-lgd-2stack-woled/2026-08-20-woled-stack-compare.svg',
  '2026-08-25-paper-week3-brief/microled-size-effect-reversal.svg',
  '2026-08-25-skku-deep-learning-carrier-kinetics/r2-by-learning-input.svg',
  '2026-08-25-skku-deep-learning-carrier-kinetics/recombination-paths.svg',
  '2026-09-01-esports-245-panel-tandem/blurred-edge-width.svg',
  '2026-09-01-esports-245-panel-tandem/tandem-stack-compare.svg',
]);

const HANGUL = /[가-힣]/;

// 주석은 한글 그대로 둔다. 화면에 찍히는 문자열만 본다.
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .split('\n')
    .map((l) => (/^\s*\/\//.test(l) ? '' : l.replace(/\s\/\/.*$/, '')))
    .join('\n');
}

if (existsSync(SIM_DIR)) {
  for (const f of readdirSync(SIM_DIR)) {
    if (!f.endsWith('.js') || f === 'index.js') continue;
    const id = f.slice(0, -3);
    if (GRANDFATHERED_SIMS.has(id)) continue;
    const hits = stripComments(readFileSync(join(SIM_DIR, f), 'utf8'))
      .split('\n')
      .map((l, i) => [i + 1, l])
      .filter(([, l]) => HANGUL.test(l));
    if (hits.length) {
      problems.push(
        `${f} — 시뮬레이터 화면 문자열에 한글 ${hits.length}줄. 캔버스 안은 영어로 씁니다\n` +
        hits.slice(0, 4).map(([n, l]) => `      ${n}행  ${l.trim().slice(0, 76)}`).join('\n') +
        (hits.length > 4 ? `\n      … 외 ${hits.length - 4}줄` : '') +
        `\n      고지문은 원고에 <template data-sim-note> 로 넣습니다`);
    }
  }
}

function walkSvg(dir, rel) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) walkSvg(join(dir, e.name), r);
    else if (e.name.endsWith('.svg') && !GRANDFATHERED_SVGS.has(r)) {
      const texts = (readFileSync(join(dir, e.name), 'utf8').match(/<text[^>]*>[\s\S]*?<\/text>/g) || [])
        .filter((t) => HANGUL.test(t));
      if (texts.length) {
        problems.push(
          `${r} — 직접 그린 도판의 글자에 한글 ${texts.length}곳. 도판 안은 영어로 씁니다\n` +
          '      ' + texts.slice(0, 3).map((t) => t.replace(/<[^>]+>/g, ' ').trim().slice(0, 38)).join(' · '));
      }
    }
  }
}
walkSvg(ASSET_DIR, '');

if (problems.length) {
  console.error(`\n원고 검사 실패 (${problems.length}건)\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('');
  process.exit(1);
}

console.log('원고 검사 통과');
