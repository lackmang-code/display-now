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
    no: 4,
    publishedAt: '2026-09-08',
    weekStart: '2026-08-31',
    // 🔴 헤드를 테커로 잡았다 (2026-09-08 대표 확정).
    // 종전에는 클레임이었는데, 표지 시뮬이 테커 것이라 표지의 큰 제목과 그 밑 그림이
    // 서로 다른 기사를 가리켰다. 제1~3호는 전부 표지 시뮬 = 헤드 기사였고 제4호만
    // 어긋나 있었다. 클레임 기사에는 시뮬도 외부 이미지도 없어 표지를 맡길 수 없다.
    // 발견의 세기만 보면 28건을 전수로 훑은 클레임이 더 세다 — 헤드는 다음 기회로 미룬다.
    // 표지 문구는 기사 제목이 연재 표기(`표면처리기술 AF(Anti-Fingerprint)`)라 따로 짓는다.
    // 약어 풀이 `AF(Anti-Fingerprint)`는 대표 지시로 표지 문구에 반드시 넣는다(그것만 20자).
    headline: 'AF(Anti-Fingerprint) 코팅이 지문을 지우는 원리',
    deck: '손끝에서 옮겨 붙는 기름의 양은 코팅이 있으나 없으나 같습니다. 달라지는 것은 그 기름이 앉는 모양입니다. 표면의 임계표면장력을 6mN/m까지 낮추면 맨유리에서 접촉각 10도 미만으로 눕던 기름이 65도로 서고, 미끄럼각이 6도라 판을 조금만 기울여도 굴러 내립니다.',
    // 표지 시뮬은 테커 편 것을 쓴다. 시뮬 파이프라인은 전 기자 공용이고, 이번 호에서
    // 시뮬이 있는 편이 테커뿐이다. 두 개 중 젖음/가시성 쪽을 골랐다 —
    // 마모 편은 각도 대 사이클 그래프라 썸네일 크기에서 선이 뭉개진다.
    // 액적이 방울로 뭉치는 그림은 작게 줄여도 무엇인지 알아본다.
    // gammaC 6은 CF3 표면(가장 낮은 임계표면장력)이라 방울이 가장 동그랗게 선다.
    coverSim: 'af-wetting-visibility-demo',
    coverSimParams: { gammaC: 6, liquid: 'hexadecane' },
    // 🔴 slugs를 박지 않는다. 박으면 그 목록이 편성을 고정해,
    // 뒤늦게 들어온 기사가 호에서 조용히 빠진다.
    // 수집 주간(월~일)이 닫히기 전에 편성을 확정하려다 실제로 그럴 뻔했다(2026-09-05).
    // 비워 두면 collectWeekStart === weekStart 인 기사를 자동으로 전부 묶는다.
    headSlug: '2026-09-08-af-anti-fingerprint',
    // 영문 호. 표지 문구가 비어 있으면 영문 호 페이지를 아예 만들지 않으므로
    // 세 줄이 함께 있어야 한다. 수록은 짝이 있는 기사만 자동으로 걸린다.
    headlineEn: 'How an AF (Anti-Fingerprint) coating clears a fingerprint',
    deckEn: 'The amount of oil a fingertip leaves behind is the same with or without the coating. What changes is the shape it settles into. Drop the surface critical tension to 6 mN/m and oil that lay flat on bare glass below a 10 degree contact angle stands up at 65, and with a sliding angle of 6 degrees it rolls off the moment the panel is tilted.',
  },
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
    // 🔴 표지 조건을 바꿨다 (2026-09-08). 종전 560Hz·250px/s 는 번짐이 0.45px 라
    // 이 시뮬이 보여주려는 것(주사율·응답속도가 잔상을 가른다)이 화면에 아무것도
    // 나타나지 않았다. 뿌옇게 보이던 것은 번짐이 아니라 300px 그림을 3배로 늘린 흐림이었다.
    // 240Hz·1000px/s 면 번짐이 4.2px 다. 가는 막대는 뭉개지고 굵은 막대와 표적은 남아
    // 「무엇을 재는 그림인지」가 보이면서 잔상도 드러난다. 12.5px(120Hz·1500)는
    // 전부 회색으로 뭉개져 그림이 사라졌다.
    // 기사 결론이 「주사율이 절반인 패널이 더 또렷했다」이므로 번짐이 보이는 조건이 맞다.
    coverSimParams: { rateIdx: 3, speed: 1000, panel: 'qdoled', bfi: false },
    headSlug: '2026-09-01-esports-245-panel-tandem',
    headlineEn: 'A 560Hz OLED and an 1,100Hz LCD met over an esports panel',
    deckEn: 'The talk of Gamescom this week was the world’s first 1,100Hz gaming monitor. Between a 560Hz OLED and an 1,100Hz LCD, which one shows a moving target more sharply?',
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
    headlineEn: 'The optical fingerprint sensor never sees your fingerprint',
    deckEn: 'What the sensor reads is the 4.07 %p of reflectance difference a ridge makes by touching glass. Which is why its real weak point is not a wet hand but a dry one.',
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
    headlineEn: 'They took one emitting layer out and the colour got wider',
    deckEn: 'OLED has spent more than 10 years going one way, adding layers. This is the week LG Display turned the other way in a mainstream panel.',
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
        // 🔴 편성 키는 `publishedAt`이지 `collectWeekStart`가 아니다.
        //
        // 수집 주간이 소재를 정하는 꼭지(데스크·피어)와 그렇지 않은 꼭지(테커·클레임)가
        // 있다. 테커·클레임은 몇 주 전에 써 두고 편집장이 호에 배분한다.
        // 그런데 편성 키가 collectWeekStart면 배분하려고 발행일을 옮겨도 호가 따라오지
        // 않는다. 옮기려면 「언제 수집했나」라는 사실을 고쳐야 하고, 그건 왜곡이다.
        //
        // 더 나쁜 것은 조용히 사라지는 것이다 — 발행일만 다음 호로 옮기면 이전 호에는
        // 남고 다음 호에는 안 뜬다. 두 호 사이에서 기사가 없어진다.
        //
        // 발행일을 바꾸면 그 호로 간다. 그것이 편집장의 배분 수단이다.
        const taken = slugsInEarlierIssues(issue);
        return all.filter(
          (a) =>
            !taken.has(a.slug) &&
            a.data.publishedAt.toISOString().slice(0, 10) === issue.publishedAt,
        );
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

/** 영문 호 **페이지 생성**용. 목록에는 `getIssuesEn()` 을 쓴다.
 *
 * 한글 호 페이지는 `ISSUES` 전체로 만든다 — 표지 3장을 발행 전에 찍어야 하기 때문이다.
 * 영문만 발행분으로 걸러 두면 **발행 전에 영문 호를 검수할 수 없다.** 2026-09-05
 * 제4호(영문판 첫 호)에서 실제로 페이지가 생기지 않아 걸렸다. 목록은 양쪽 다
 * 발행분만 보여주므로 미리 만들어도 독자에게 노출되지 않는다. */
export function getAllIssuesEn(): IssueMeta[] {
  return getAllIssues().filter((i) => Boolean(i.headlineEn));
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
