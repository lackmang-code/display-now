import { getAllArticles, baseSlug, type Article, type Lang } from './articles';

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

  /**
   * 영문판 표지 문구. **번역이 아니라 다시 쓴다.**
   *
   * 편성(`slugs`·`weekStart`)은 한글로 한 번만 정의하고, 영문 호는 짝이 있는 기사만
   * 끌어온다 — 편성을 두 벌 관리하면 반드시 어긋난다.
   * 비워 두면 영문 호 페이지를 만들지 않는다.
   */
  headlineEn?: string;
  deckEn?: string;
  noteEn?: string;
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
    no: 3,
    publishedAt: '2026-09-01',
    weekStart: '2026-08-24',
    // 헤드를 데스크로 잡았다. 테커 6편(초음파 지문센서)이 이번 호에서 가장 무겁지만,
    // 제2호 헤드가 테커 광학식 지문센서였고 표지도 지문 이미지였다.
    // 3호까지 지문으로 가면 두 호가 진열대에서 같은 잡지로 보인다(대표 지적).
    // 표지 그림만 바꿔도 헤드라인이 2연속 "지문센서"라 헤드째 옮겼다.
    // 제1호 데스크 → 제2호 테커 → 제3호 데스크로 리듬도 맞는다.
    //
    // 데스크 제목은 기술명 중심이라(꼭지 규칙) 표지 문구를 따로 짓는다. 제1호와 같은 경우다.
    headline: 'e스포츠 패널을 두고 560Hz OLED와 1,100Hz LCD가 맞붙었다',
    deck: '이번 주 게임스컴의 화제는 세계 최초 1,100Hz 게이밍 모니터였습니다. 560Hz OLED와 1,100Hz LCD, 움직이는 표적이 더 또렷하게 보이는 쪽은 어디일까요.',
    coverSim: 'esports-persistence-blur-demo',
    // 표지는 선명한 상태로 잡는다(2026-08-31 대표 지시). 잡지 표지가 흐려 보이면 안 된다.
    // 실측으로 세 조합을 비교했다.
    //   120Hz·2000px/s  조준선이 뭉개져 정체를 잃고 썸네일에서 회색 덩어리
    //   240Hz·1000px/s  기사 본문 기본값. 흐림폭 4.17픽셀이 조준선에 그대로 낀다
    //   560Hz·250px/s   격자 모서리와 눈금이 살아난다. 이것을 쓴다
    // BFI를 켜면 선명도는 같은데 지속시간이 절반이라 화면이 어두워진다. 표지에서는 손해다.
    // 560Hz는 헤드라인이 가리키는 펜타 탠덤 패널의 주사율이기도 하다.
    coverSimParams: { rateIdx: 7, speed: 250, panel: 'qdoled', bfi: false },
    headSlug: '2026-09-01-esports-245-panel-tandem',
    // 헤드 기사는 커버라인에서 빠진다(headSlug를 지워도 slugs[0]이 헤드가 되므로 같다).
    // 그래서 표지 문구에 기사를 알아볼 단어를 넣어야 한다. 표지 문구와 기사 제목이
    // 다른데 단서까지 없으면 눌러 들어간 독자가 같은 기사인 줄 모른다(2026-08-31).
    // 헤드 다음부터가 커버라인 순서다. 브리핑은 주간 훑기라 맨 뒤에 둔다.
    slugs: [
      '2026-09-01-esports-245-panel-tandem',
      '2026-09-01-ultrasonic-fingerprint-impedance',
      '2026-09-01-nano-led-patents',
      '2026-09-01-isosorbide-oca-foldable',
      '2026-09-01-stretchable-oled-nanocrack',
      '2026-09-01-paper-week4-brief',
    ],
    note: '이번 호는 접착제를 두 방향에서 봅니다. 피어가 고른 UNIST 논문은 폴더블 접착제가 물러야 한다고 말합니다. 저장탄성률 0.029메가파스칼, 단단하면 접힘 응력이 네댓 배로 뜁니다. 그런데 같은 주 테커가 뜯은 초음파 지문센서에서는 정반대입니다. 무른 접착층은 종탄성계수가 유리의 34분의 1이라, 20마이크로미터 한 겹이 소리의 투과를 9퍼센트까지 떨어뜨립니다. 폴더블은 물러야 하고 지문센서는 단단해야 합니다. 화면에서 가장 얇은 층 하나에 서로 반대인 요구가 걸려 있습니다. 데스크는 게임스컴에서 나온 24.5인치 e스포츠 패널을 다뤘습니다. 화면이 다 커지는 동안 이것만 작아지고 성겨졌는데, 제조사가 앞세운 응답속도 0.03밀리초는 계조 간 전이시간이지 동체가 또렷한 정도를 재는 값이 아닙니다. 흐림폭으로 환산하니 주사율이 절반인 패널이 앞섰습니다. 클레임은 나노 LED 특허 열두 건에서 두 계보를 갈라 읽었습니다. 눕히는 쪽과 세워 키우는 쪽 모두 대학에서 나왔고 양쪽 모두에서 특허가 삼성으로 넘어갔는데, 정작 양산 라인을 세우고 있는 곳은 팔지 않은 쪽입니다. 공개된 논문·특허·공시만 근거로 삼는다는 원칙은 이번 호도 같습니다.',
  },
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

export async function articlesOfIssue(issue: IssueMeta, lang: Lang = 'ko'): Promise<Article[]> {
  const all = await getAllArticles('ko');
  const ko = issue.slugs?.length
    ? issue.slugs.map((s) => all.find((a) => a.slug === s)).filter((a): a is Article => Boolean(a))
    : (() => {
        const taken = slugsInEarlierIssues(issue);
        return all.filter((a) => !taken.has(a.slug) && a.data.collectWeekStart === issue.weekStart);
      })();

  if (lang === 'ko') return ko;

  // 영문 호는 **한글 편성 순서를 그대로 따르되 짝이 있는 기사만** 싣는다.
  // 편성은 한글 쪽에서 한 번만 정의된다. 아직 번역되지 않은 편은 조용히 빠진다.
  const en = await getAllArticles('en');
  const byBase = new Map(en.map((a) => [baseSlug(a), a]));
  return ko.map((a) => byBase.get(a.slug)).filter((a): a is Article => Boolean(a));
}

/** 영문 표지 문구가 채워진 호만. 영문 호 페이지는 이것만 만든다 */
export function getIssuesEn(): IssueMeta[] {
  return getIssues().filter((i) => Boolean(i.headlineEn));
}

/**
 * **발행일이 지난 호만** 최신순으로 돌려준다. 홈·호 목록·내비가 이걸 쓴다.
 *
 * 표지 카드 세 장을 찍으려면 발행 전에 이 파일에 다음 호를 적어 넣어야 하는데,
 * 걸러 두지 않으면 **적어 넣는 순간 홈이 그 호로 넘어간다.** 홈이 최신 호를
 * 따라가게 되면서(2026-08-25 지면 개편) 생긴 조건이다. 종전에는 홈이 기사 목록이라
 * `getPublishedArticles()`의 게이팅만으로 충분했다.
 *
 * 걸러지지 않는 것 — 의도한 것이다.
 *   `/issue/N` 페이지 · 표지 카드 · og 카드는 `ISSUES`를 직접 쓴다.
 *   발행 전에 그 주소로 들어가 표지를 캡처해야 하기 때문이다.
 *
 * ⚠️ 정적 사이트라 발행일이 됐다고 저절로 나타나지 않는다. 판단은 빌드할 때 한 번뿐이다.
 *    **발행일 당일에 push하거나 재배포해야** 목록에 올라온다.
 */
export function getIssues(): IssueMeta[] {
  return getAllIssues().filter((i) => i.publishedAt <= todayKst());
}

/** 발행일과 무관하게 전부. 페이지 생성·표지 캡처처럼 미리 만들어야 하는 곳에서 쓴다 */
export function getAllIssues(): IssueMeta[] {
  return [...ISSUES].sort((a, b) => b.no - a.no);
}

/** 한국 날짜 'YYYY-MM-DD'. 기사 게이팅(getPublishedArticles)과 같은 기준을 쓴다 */
function todayKst(): string {
  const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
  return new Date(Date.now() + KST_OFFSET_MS).toISOString().slice(0, 10);
}

export function getIssue(no: number): IssueMeta | undefined {
  return ISSUES.find((i) => i.no === no);
}

export function issueHref(issue: IssueMeta, lang: Lang = 'ko'): string {
  return lang === 'en' ? `/en/issue/${issue.no}` : `/issue/${issue.no}`;
}

export function issueNumberLabel(issue: IssueMeta, lang: Lang = 'ko'): string {
  return lang === 'en' ? `Issue ${issue.no}` : `제${issue.no}호`;
}

export function issueDateLabel(issue: IssueMeta): string {
  return issue.publishedAt.replace(/-/g, '.');
}

/** 자료수집기간 라벨. 호의 주간이 곧 수집 주간이다 */
export function collectRangeLabel(issue: IssueMeta, lang: Lang = 'ko'): string {
  const [y, m, d] = issue.weekStart.split('-').map(Number);
  const start = new Date(y, m - 1, d);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const fmt = (dt: Date) => `${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
  return lang === 'en'
    ? `Collected ${fmt(start)} – ${fmt(end)}`
    : `${fmt(start)} ~ ${fmt(end)} 자료수집`;
}

export function issueRangeLabel(issue: IssueMeta, lang: Lang = 'ko'): string {
  const { from, to } = issueRange(issue);
  const fmt = (s: string) => s.slice(5).replace('-', '.');
  return lang === 'en'
    ? `Published ${fmt(from)} – ${fmt(to)}`
    : `${fmt(from)} ~ ${fmt(to)} 발행분`;
}
