// 기사 원고 검사. npm run build 앞단에서 돈다.
//
// 왜 필요한가: 마크다운은 한 문단에 물결표가 둘 있으면 그 사이를 취소선으로
// 렌더링한다. "7월 20일~26일" 같은 범위 표기를 쓰다 보면 본문 한복판에
// 가로줄이 그어진 채 발행된다. 실제로 14곳에서 그렇게 나갔다.
// 사람이 매번 눈으로 잡을 수 없으므로 빌드에서 막는다.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/articles';
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
    const text = para.join('\n');
    // 인라인 코드는 렌더링에서 제외되므로 세지 않는다
    const stripped = text.replace(/`[^`]*`/g, '');
    const tildes = (stripped.match(/(?<!\\)~/g) || []).length;
    if (tildes >= 2) {
      problems.push(
        `${file}:${paraStart}  한 문단에 물결표 ${tildes}개. 그 사이가 취소선(가로줄)으로 렌더링됩니다. \\~ 로 이스케이프하십시오.`
      );
    }
    para = [];
  };

  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const st = line.trim();

    if (st.startsWith('```') || st.startsWith('~~~')) {
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
        problems.push(`${file}:${i + 1}  HTML 블록 안의 \\~ 는 화면에 백슬래시가 그대로 보입니다. ~ 로 되돌리십시오.`);
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

if (problems.length) {
  console.error(`\n원고 검사 실패 (${problems.length}건)\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('');
  process.exit(1);
}

console.log('원고 검사 통과');
