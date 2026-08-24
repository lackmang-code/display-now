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
  /**
   * **이 호를 정의하는 주간의 월요일.** 'YYYY-MM-DD' (필수에 준함)
   *
   * 제1호 2026-08-10, 제2호 2026-08-17 … 매주 7일씩 이어진다.
   * 기사 프론트매터의 `collectWeekStart`가 이 값과 같으면 그 호에 실린다.
   * **발행일은 호 편성에 쓰지 않는다.** 늦게 내보내도, 늦게 보강해도 내용이 바뀌지 않는다.
   * 발행일에서 역산하는 방식(발행일 -7 ~ -1 같은)은 쓰지 않는다.
   */
  weekStart: string;
  /** 자동 편성 대신 수록 기사를 직접 지정할 때만 사용 */
  slugs?: string[];
}

/**
 * 표지와 호 페이지에 **발행일을 표기할지** 여부.
 *
 * 인터넷신문으로 정식 등록하기 전까지는 표기하지 않는다.
 * 인력이 부족해 화요일을 놓치면 소급 발행하는데, 그때 발행일을 박아 두면
 * 실제와 어긋나 보인다. 대신 **자료수집기간**을 표시한다. 그 값은 고정이라
 * 언제 내보내도 참이다.
 *
 * 정식 직원이 생기고 정기간행물 등록이 끝나면 true로 바꾼다.
 */
export const SHOW_PUBLISH_DATE = false;

export const ISSUES: IssueMeta[] = [
  {
    no: 2,
    publishedAt: '2026-08-25',
    weekStart: '2026-08-17',
    // 헤드 기사 제목을 그대로 쓴다. 아래 수록 기사 목록에도 같은 제목이 나오므로,
    // 표지에만 다른 문장을 만들면 같은 기사를 두 가지 이름으로 부르게 된다.
    // 헤드 기사 제목이 이미 후크를 쥐고 있으면 표지 문구를 따로 지을 이유가 없다
    // (제1호는 헤드가 데스크라 제목이 기술명 중심이었고, 그래서 표지 문구가 따로 필요했다).
    headline: '광학식 지문센서는 지문을 보지 않는다',
    deck: '센서가 읽는 것은 융선이 유리에 닿아 생기는 반사율 차이 4.07 %p입니다. 그래서 진짜 약한 곳은 젖은 손이 아니라 마른 손입니다.',
    // 표지 시뮬레이터는 헤드라인이 말하는 것을 그려야 한다. 지면에서 시뮬레이터 바로 아래에
    // 헤드라인이 붙기 때문이다(cover-stage 다음이 cover-bottom의 h1).
    //
    // 이번 주 여섯 개 가운데 실제 이미지를 그리는 것은 이것뿐이고(putImageData),
    // 나머지는 막대·선 그래프라 썸네일에서 죽는다. 개구비를 올리면 지문이 또렷해지면서
    // 동시에 어두워지는 것이 설명 없이 보인다. 헤드라인의 "4배와 15배"가 바로 그 교환이다.
    coverSim: 'optical-fp-collimator-demo',
    headSlug: '2026-08-25-optical-fingerprint-collimator',
    // 수록과 순서를 손으로 지정한다. 자동(파일명 순)으로 두면 표지 커버라인 네 자리에
    // 논문 브리핑이 올라오고 심층기사가 밀린다. 브리핑은 주간 훑기라 표지 자리를
    // 심층기사에 내주는 것이 맞다. 헤드 다음부터가 커버라인 순서다.
    slugs: [
      '2026-08-25-optical-fingerprint-collimator',
      '2026-08-25-lgd-flipp-fmmless-patterning',
      '2026-08-25-gen86-oled-deposition-patents',
      '2026-08-25-germanium-exciplex-host-mrtadf',
      '2026-08-25-skku-deep-learning-carrier-kinetics',
      '2026-08-25-paper-week3-brief',
    ],
    note: '테커가 화면 아래 지문센서를 뜯었습니다. 센서가 읽는 것은 지문이 아니라 융선이 유리에 닿아 생기는 반사율 차이 4.07 %p, 그 유리 반사 지도입니다. 100 가운데 4를 가지고 그림을 그리는 셈인데, 결상 렌즈를 세울 두께마저 없어 작은 구멍으로 각도를 잘라야 합니다. 구멍을 좁혀 4배 또렷해지는 동안 들어오는 빛은 15배 줄어듭니다. 한편 증착 공정은 두 갈래로 갈라졌습니다. 데스크는 LG디스플레이가 금속 마스크를 걷어내고 내놓은 휘도·수명·소비전력 세 수치가 실은 개구율 1.55배 하나에서 유도된다는 것을 확인했고, 클레임은 정반대편에서 8.6세대 유리를 감당하려는 증착·마스크 특허 아홉 건을 읽었습니다. 한쪽은 마스크를 없애는 길이고 한쪽은 더 크고 정밀하게 만드는 길입니다. 피어는 호스트 분자의 규소를 게르마늄으로 바꾼 논문과, 업계가 기본 절차로 쓰는 캐리어 수명 측정이 유일한 답을 주지 않는다는 논문을 골랐습니다. 공개된 논문·특허·공시만 근거로 삼는다는 원칙은 이번 호도 같습니다.',
  },
  {
    no: 1,
    publishedAt: '2026-08-18',
    weekStart: '2026-08-10',
    headline: '발광층을 하나 덜어냈더니 색이 더 넓어졌다',
    deck: 'OLED는 10년 넘게 층을 쌓는 쪽으로만 갔습니다. LG디스플레이가 보급형에서 방향을 거꾸로 돌린 주간입니다.',
    coverSim: 'woled-stack-spectrum-demo',
    // 헤드 기사를 명시한다. 지정하지 않으면 수록 기사 중 첫 번째가 잡혀
    // 헤드라인 기사가 커버라인에도 중복으로 뜬다.
    headSlug: '2026-08-18-lgd-2stack-woled',
    note: '창간호입니다. 네 명의 AI 기자가 각자의 자리에서 한 주를 훑었습니다. 데스크는 LG디스플레이가 스택을 줄이고도 색재현율을 올린 발표를 특허 도면으로 확인했고, 클레임은 만료된 청색 인광 특허 뒤에서 방어선이 어디로 옮겨갔는지 추적했습니다. 테커는 화면 아래로 내려가지 못한 마지막 센서인 페이스 ID를 다뤘습니다. 취재는 하지 않습니다. 공개된 논문·특허·공시만 근거로 삼고, 모든 기사 끝에 그 목록을 싣습니다.',
  },
];

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * 그 호가 다룬 **취재 주간**: 직전 주 월요일 ~ 일요일.
 *
 * 기자들은 월요일에서 일요일까지 한 주를 수집해 **그 다음 주 화요일에 기사를 발행한다.**
 * (예: PEER의 8월 18일자 브리핑은 8월 10일~16일 공개분을 다룬다)
 *
 * 주의: 이것은 **표시용 라벨**이지 수록 기사를 고르는 기준이 아니다.
 * 기사를 고르는 기준은 `articlesOfIssue`의 발행일 일치다.
 * 둘을 같은 축으로 착각해 이 범위로 기사를 걸렀다가 한 편도 잡히지 않은 적이 있다.
 */
export function issueRange(issue: IssueMeta): { from: string; to: string } {
  if (!issue.weekStart) {
    throw new Error(`제${issue.no}호에 weekStart(주간 월요일)가 없습니다. 발행일에서 역산하지 않습니다.`);
  }
  const [wy, wm, wd] = issue.weekStart.split('-').map(Number);
  const start = new Date(wy, wm - 1, wd);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return { from: ymd(start), to: ymd(end) };
}

/**
 * 앞 호에 이미 실린 기사 slug 모음.
 * 수록을 손으로 지정한 호가 있으면 그 기사가 다음 호의 자동 범위에도 걸린다.
 * 같은 기사가 두 호에 실리는 것을 막는다.
 */
function slugsInEarlierIssues(issue: IssueMeta): Set<string> {
  const taken = new Set<string>();
  for (const other of ISSUES) {
    if (other.no >= issue.no) continue;
    for (const s of other.slugs ?? []) taken.add(s);
  }
  return taken;
}

export async function articlesOfIssue(issue: IssueMeta): Promise<Article[]> {
  const all = await getAllArticles();
  if (issue.slugs?.length) {
    return issue.slugs.map((s) => all.find((a) => a.slug === s)).filter((a): a is Article => Boolean(a));
  }
  const taken = slugsInEarlierIssues(issue);
  return all.filter((a) => !taken.has(a.slug) && a.data.collectWeekStart === issue.weekStart);
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

/** 자료수집기간 라벨. 호의 주간이 곧 수집 주간이다 */
export function collectRangeLabel(issue: IssueMeta): string {
  const [y, m, d] = issue.weekStart.split('-').map(Number);
  const start = new Date(y, m - 1, d);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const fmt = (dt: Date) => `${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
  return `${fmt(start)} ~ ${fmt(end)} 자료수집`;
}

export function issueRangeLabel(issue: IssueMeta): string {
  const { from, to } = issueRange(issue);
  const fmt = (s: string) => s.slice(5).replace('-', '.');
  return `${fmt(from)} ~ ${fmt(to)} 발행분`;
}
