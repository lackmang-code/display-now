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

if (problems.length) {
  console.error(`\n원고 검사 실패 (${problems.length}건)\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('');
  process.exit(1);
}

console.log('원고 검사 통과');
