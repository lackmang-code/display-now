import { getAllArticles, type Article } from './articles';

/**
 * 주간 호(號) 메타데이터.
 *
 * 발행일은 매주 화요일이고, 한 호에 담기는 기사는 "직전 화요일 ~ 그 주 월요일"에
 * 발행된 기사 전체다. 기자가 프론트매터에 아무것도 적지 않아도 자동으로 편성된다.
 * 편집상 다르게 묶어야 하면 slugs로 직접 지정한다.
 */
export interface IssueMeta {
  no: number;
  /** 발행일(화요일). 'YYYY-MM-DD' */
  publishedAt: string;
  /** 표지 헤드라인. 그 주 가장 센 기사에서 뽑는다 */
  headline: string;
  /** 표지 부제 */
  deck?: string;
  /** 편집장 노트. 이번 호를 어떻게 읽으면 되는지 3~5문장 */
  note?: string;
  /**
   * 표지에 올릴 시뮬레이션 id (`src/lib/simulations/<id>.js`).
   *
   * 이 매체의 표지는 그림이 아니라 **동작하는 시뮬레이션**이다. 종이 잡지가 할 수 없는
   * 것을 표지에서 먼저 보여준다는 뜻이고, 테커가 매주 시뮬레이터를 한 종 이상 만들기
   * 때문에 표지는 별도 제작 없이 매주 저절로 바뀐다.
   */
  coverSim?: string;
  /** 표지 시뮬레이션에 넘길 초기값 */
  coverSimParams?: Record<string, unknown>;
  /** 시뮬레이션이 없는 주에만 쓰는 표지 이미지. 비우면 헤드 기사의 첫 이미지 */
  coverImage?: string;
  /** 표지를 대표할 기사. 비우면 수록 기사 중 첫 번째 */
  headSlug?: string;
  /** 표지에 쓴 자료의 출처 (원발행사·특허번호 등) */
  coverCredit?: string;
  /** 자동 편성 대신 수록 기사를 직접 지정할 때만 사용 */
  slugs?: string[];
}

export const ISSUES: IssueMeta[] = [
  {
    no: 1,
    publishedAt: '2026-08-25',
    headline: '발광층을 하나 덜어냈더니 색이 더 넓어졌다',
    deck: 'OLED는 10년 넘게 층을 쌓는 쪽으로만 갔습니다. LG디스플레이가 보급형에서 방향을 거꾸로 돌린 주간입니다.',
    coverSim: 'woled-stack-spectrum-demo',
    // 헤드 기사를 명시한다. 지정하지 않으면 수록 기사 중 첫 번째가 잡혀
    // 헤드라인 기사가 커버라인에도 중복으로 뜬다.
    headSlug: '2026-08-18-lgd-2stack-woled',
    note: '창간호입니다. 네 명의 AI 기자가 각자의 자리에서 한 주를 훑었습니다. 데스크는 LG디스플레이가 스택을 줄이고도 색재현율을 올린 발표를 특허 도면으로 확인했고, 클레임은 만료된 청색 인광 특허 뒤에서 방어선이 어디로 옮겨갔는지 추적했습니다. 테커는 화면 아래로 내려가지 못한 마지막 센서인 페이스 ID를 다뤘습니다. 취재는 하지 않습니다. 공개된 논문·특허·공시만 근거로 삼고, 모든 기사 끝에 그 목록을 싣습니다.',
    // coverImage: 표지 확정 전까지 비워 둔다. 비어 있으면 활자 표지로 렌더링된다.
  },
];

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function shift(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d + days);
  return ymd(dt);
}

/** 수록 범위: 직전 화요일 ~ 그 주 월요일 (발행일 하루 전까지) */
export function issueRange(issue: IssueMeta): { from: string; to: string } {
  return { from: shift(issue.publishedAt, -7), to: shift(issue.publishedAt, -1) };
}

export async function articlesOfIssue(issue: IssueMeta): Promise<Article[]> {
  const all = await getAllArticles();
  if (issue.slugs?.length) {
    return issue.slugs.map((s) => all.find((a) => a.slug === s)).filter((a): a is Article => Boolean(a));
  }
  const { from, to } = issueRange(issue);
  return all.filter((a) => {
    const key = ymd(a.data.publishedAt);
    return key >= from && key <= to;
  });
}

export function getIssues(): IssueMeta[] {
  return [...ISSUES].sort((a, b) => b.no - a.no);
}

export function getIssue(no: number): IssueMeta | undefined {
  return ISSUES.find((i) => i.no === no);
}

export function issueHref(issue: IssueMeta): string {
  return `/issue/${issue.no}`;
}

export function issueNumberLabel(issue: IssueMeta): string {
  return `제${issue.no}호`;
}

export function issueDateLabel(issue: IssueMeta): string {
  return issue.publishedAt.replace(/-/g, '.');
}

export function issueRangeLabel(issue: IssueMeta): string {
  const { from, to } = issueRange(issue);
  const fmt = (s: string) => s.slice(5).replace('-', '.');
  return `${fmt(from)} ~ ${fmt(to)} 발행분`;
}
