import type { Lang } from './articles';

/**
 * 화면에 찍히는 UI 문구.
 *
 * **기사 본문은 여기 오지 않는다.** 본문은 원고(`src/content/articles/`)가 갖고,
 * 여기 있는 것은 템플릿이 그리는 껍데기 — 목차·바이라인·근거 상자·구독 폼 같은 것들이다.
 *
 * 꼭지 이름은 `SECTIONS[key].label` / `.labelEn`이 이미 갖고 있으므로 여기 두지 않는다.
 */
// `sources-sign`의 바이라인 문구는 여기 두지 않는다. 기자명·편집장명이 <b>로 감싸여야 하고
// 그 볼드 스타일이 스코프 선택자(`b[data-astro-cid-…]`)라, 문자열로 만들어 넣으면
// 스코프 속성이 붙지 않아 볼드가 통째로 풀린다. 마크업 구조가 있어야 하는 문구는 템플릿이 갖는다.
export const UI = {
  ko: {
    home: 'DISPLAY NOW 홈',
    issues: '주간호',
    archive: '아카이브',
    topics: '주제별',
    editorial: '편집국',
    subscribe: '구독하기',
    subscribeShort: '구독',
    corrections: '정정 및 제보',
    adInquiry: '광고 문의',
    privacy: '개인정보처리방침',
    terms: '이용약관',

    toc: '목차',
    readingTime: (m: number) => `읽는 시간 ${m}분`,
    minutes: (m: number) => `${m}분`,
    sourceMaterial: '근거 자료',
    sourceCount: (n: number) => `${n}건`,
    seriesKicker: '연재',
    partNo: (n: number) => `${n}부`,
    readingNow: '지금 읽는 글',
    byPrefix: 'by',
    reporterRole: (sectionLabel: string) => `(AI 기자 · ${sectionLabel} 담당)`,
    editorLabel: 'AI 편집장',
    sourcesTitle: '이 기사의 근거',
    // 소급 번역분 고지. 한글판에서는 쓰지 않는다.
    legacyFigureNotice: '',
    singlePaperNote:
      '이 기사는 위 서지정보의 논문 1편을 근거로 작성했습니다. 수치·서술은 모두 원문과 대조했습니다',
    openOriginal: '원문 열기',
    correctionAsk: '이 기사에서 사실과 다른 부분을 발견하셨습니까. 알려주시면 확인하고 바로잡겠습니다.',
    correctionLink: '정정 요청하기 →',
    topicsLabel: '주제',
    topicsAria: '이 기사의 주제',
    seriesClosesWith: (metric: string) => `이어지는 편은 ${metric}(으)로 이 부를 닫습니다. `,
    seriesClosedWith: (metric: string) => `이 부는 ${metric}(으)로 닫혔습니다. `,
    seriesStandalone: '각 편은 따로 읽어도 완결됩니다.',
    moreFrom: (sectionLabel: string, reporter: string) =>
      `${sectionLabel} · ${reporter}의 다른 글 →`,
    ctaHead: '매주 화요일, 그 주의 디스플레이를 한 권으로 보내드립니다',
    ctaSub: '무료 뉴스레터입니다. 언제든 해지할 수 있습니다.',
    emailPlaceholder: '이메일 주소',
    paywallTitle: '여기부터는 구독자 전용입니다',
    paywallBody: '남은 분석은 무료 뉴스레터를 구독하시면 이어서 볼 수 있습니다.',
    paywallCta: '무료로 구독하고 계속 읽기 →',

    footerBlurb:
      '디스플레이 나우는 논문·특허·공시만 근거로 쓰는 디스플레이 산업 전문 온라인 매거진입니다.',
    footerPublisher: '발행 넥스트아이오 · 박원상 (Next I/O 대표 · 성균관대 산학교수)',
    footerEmail: '이메일',
    footerPhone: '전화',
    footerCopy: '© 2026 넥스트아이오(Next IO). 무단전재 및 재배포 금지.',

    langSwitchAria: '언어 전환',

    issueUnit: '호',
    issueIdentity: '100% AI 기자단과 AI 편집장이 제작하는 디스플레이 전문 온라인 매거진',
    coverAlt: (no: string) => `${no} 표지`,
    readFor: (label: string) => `읽기 ${label}`,
    coverHint:
      '이 표지는 시뮬레이션입니다. 값을 바꿔 보십시오. 가정과 한계는 해당 기사 본문에 밝혀 두었습니다.',
    alsoInIssue: (n: number) => `함께 실린 기사 ${n}편`,
    emptyIssue: '이번 호에 수록된 기사가 아직 없습니다.',
    editorNote: '편집장 노트',
    allIssues: '지난 호 전체 보기 →',
    issueListTitle: '지난 호',
    issueListHead: '매주 화요일, 그 주의 디스플레이를 한 권으로 묶습니다',
    issueListEmpty: '창간호를 준비하고 있습니다.',
    coverAltFull: (no: string, headline: string) => `${no} 표지: ${headline}`,
    articleCount: (n: number) => `${n}편 수록`,

    edTitle: '편집국',
    edHero: '100% AI 기자단으로<br />구성된 디스플레이 전문<br />온라인 매거진입니다.',
    edHeroSub: '디스플레이 나우(DISPLAY NOW)는 세상에 없는 새로운 시도입니다. 많은 응원 부탁드립니다.',
    edNewsroom: 'AI 편집국',
    edNewsroomSub: '기자 4인 + 편집장 1인 · 담당 자료와 한계를 함께 밝힙니다',
    edReads: '읽는 것',
    edDoes: '하는 일',
    edLimit: '한계',
    edSeeArticles: (code: string) => `${code}의 기사 보기 →`,
    edConnector: '네 기자의 원고를 모아 편집',
    edDeepleRole: '디플 · AI 편집장',
    edDeepleDesc:
      'TEKER·PEER·CLAIM·DESK 네 기자가 쓴 기사를 모아 문체와 형식을 통일하고, 근거 표기를 검증해 발행 큐로 넘깁니다. 이 편집국 페이지도 DEEPLE이 정리합니다.',
    edDeepleReads: 'TEKER·PEER·CLAIM·DESK 네 기자의 원고',
    edDeepleDoes: '문체·형식 통일 · 근거 표기 검증 · 발행 큐 정리',
    edDeepleLimit: '편집 판단은 여기까지입니다. 발행 여부는 박원상 대표의 기획·검수를 통과해야 확정됩니다.',
    edPipeline: '기사가 나오기까지',
    edPipelineSub: '다섯 단계 · 마지막은 사람',
    edDonts: '우리가 하지 않는 것',
    edOversight: '기획 · 검수',
    edEditorName: '박원상',
    edEditorRole: '기획 · 검수<br />Next I/O 대표 · 성균관대 산학교수',
    edEditorDesc:
      'DEEPLE이 정리한 기사를 기획 방향에 맞춰 마지막으로 확인해야 발행됩니다. AI 기자단으로 전문 매체를 만들 수 있을지 실험하는 중이며, 잘못된 부분이 보이면 알려 주시면 바로 고치겠습니다.',
    edBoard: '문의 게시판에 글 남기기 →',

    /* ── 홈 PC 지면(HomeDesktop.astro) ──────────────────────────
       한글 홈과 영문 홈은 **같은 컴포넌트 한 벌**을 쓴다.
       지면을 두 벌로 두면 한글 쪽을 고칠 때마다 영문 쪽이 조용히 뒤처진다. */
    homeTagline: '100% 전문 AI 기자단으로 구성된 디스플레이 전문 매거진',
    homeIssueLabel: '이번 호',
    homeCoverOpen: '표지 열기 →',
    homeCoverSimNote: ' · 표지는 시뮬레이션입니다',
    homeQuickNav: '꼭지 바로가기',
    homeEditorialLink: '편집국 소개 →',
    homeSectionByline: (n: number, reporter: string) => `${n}편 · by ${reporter} →`,
    homeArchiveBand: '아카이브',
    homeArchiveTitle: '발행한 기사 전체를 제목·기업명으로 검색',
    homeArchiveByline: (n: number) => `전체 ${n}편 · 검색하기 →`,
    homeFeedHead: '전체 글 · 최신순',
    homeFeedLink: (n: number) => `아카이브 전체 ${n}편 →`,
    homePicks: '편집국 추천',
    homeMonth: (m: number) => `${m}월`,
    homeAdLabel: '광고',
    homeAdTagline: '당신의 PC에 AI 직원을<br />복제/이식시켜 드립니다.',
    homeAdContact: '문의: info@nextio.ai.kr',
    homeNlEyebrow: '뉴스레터',
    homeNlTitle: '새 분석이 나오면 메일로 보내드립니다',
    homeNlMore: '관심 꼭지까지 지정해 신청하기 →',
    subProcessing: '처리 중...',
    subDone: '구독 신청 완료했습니다. 감사합니다!',
    subBadEmail: '이메일 주소를 확인해주세요.',
    subError: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },

  en: {
    home: 'DISPLAY NOW home',
    issues: 'Issues',
    archive: 'Archive',
    topics: 'Topics',
    editorial: 'Editorial',
    subscribe: 'Subscribe',
    subscribeShort: 'Subscribe',
    corrections: 'Corrections',
    adInquiry: 'Advertising',
    privacy: 'Privacy',
    terms: 'Terms',

    toc: 'Contents',
    readingTime: (m: number) => `${m} min read`,
    minutes: (m: number) => `${m} min`,
    sourceMaterial: 'Sources',
    sourceCount: (n: number) => `${n}`,
    seriesKicker: 'SERIES',
    partNo: (n: number) => `Part ${n}`,
    readingNow: 'Reading now',
    byPrefix: 'by',
    reporterRole: (sectionLabel: string) => `(AI reporter · ${sectionLabel})`,
    editorLabel: 'AI editor-in-chief',
    sourcesTitle: 'Sources for this article',
    legacyFigureNotice:
      'This article was published before the English edition began, so the labels inside its figures and simulators are in Korean. The caption and the note under each figure are in English.',
    singlePaperNote:
      'This article is based on the single paper cited above. Every figure and statement was checked against the original',
    openOriginal: 'Open the original',
    correctionAsk:
      'Found something in this article that is not accurate? Tell us and we will check it and set it right.',
    correctionLink: 'Request a correction →',
    topicsLabel: 'Topics',
    topicsAria: 'Topics in this article',
    seriesClosesWith: (metric: string) => `A later episode closes this part with ${metric}. `,
    seriesClosedWith: (metric: string) => `This part closed with ${metric}. `,
    seriesStandalone: 'Each episode stands on its own.',
    moreFrom: (sectionLabel: string, reporter: string) => `More ${sectionLabel} from ${reporter} →`,
    ctaHead: 'Every Tuesday, the week in display — as one issue.',
    ctaSub: 'A free newsletter. Unsubscribe any time.',
    emailPlaceholder: 'Email address',
    paywallTitle: 'The rest is for subscribers',
    paywallBody: 'Subscribe to the free newsletter to keep reading this analysis.',
    paywallCta: 'Subscribe free and keep reading →',

    footerBlurb:
      'DISPLAY NOW is a display-industry trade magazine that builds every article on papers, patents and public filings alone.',
    footerPublisher: 'Published by NEXTIO · Wonsang Park (CEO, Next I/O · Industry Professor, SKKU)',
    footerEmail: 'Email',
    footerPhone: 'Phone',
    footerCopy: '© 2026 NEXTIO. All rights reserved.',

    langSwitchAria: 'Switch language',

    issueUnit: '',
    issueIdentity:
      'A display-industry magazine made entirely by AI reporters and an AI editor-in-chief',
    coverAlt: (no: string) => `${no} cover`,
    readFor: (label: string) => `${label} read`,
    coverHint:
      'This cover is a simulation. Try changing the values. Its assumptions and limits are stated in the article itself.',
    alsoInIssue: (n: number) => `${n} more in this issue`,
    emptyIssue: 'No articles in this issue yet.',
    editorNote: "Editor's note",
    allIssues: 'All issues →',
    issueListTitle: 'Issues',
    issueListHead: 'Every Tuesday, the week in display — bound as one issue',
    issueListEmpty: 'The English edition begins with Issue 4.',
    coverAltFull: (no: string, headline: string) => `${no} cover: ${headline}`,
    articleCount: (n: number) => `${n} articles`,

    edTitle: 'Editorial',
    edHero: 'A display trade magazine<br />written entirely by<br />a team of AI reporters.',
    edHeroSub:
      'DISPLAY NOW is an attempt at something that did not exist before. We would be glad of your support.',
    edNewsroom: 'The AI newsroom',
    edNewsroomSub:
      'Four reporters and one editor-in-chief · each states what it reads and where it stops',
    edReads: 'Reads',
    edDoes: 'Does',
    edLimit: 'Limits',
    edSeeArticles: (code: string) => `Articles by ${code} →`,
    edConnector: 'Edits the four reporters into one issue',
    edDeepleRole: 'DEEPLE · AI editor-in-chief',
    edDeepleDesc:
      'Takes what TEKER, PEER, CLAIM and DESK have written, makes the voice and form consistent, verifies how the sources are cited, and moves it to the publishing queue. This editorial page is edited by DEEPLE too.',
    edDeepleReads: 'Copy from TEKER, PEER, CLAIM and DESK',
    edDeepleDoes: 'Voice and form · verification of source citation · publishing queue',
    edDeepleLimit:
      'Editorial judgement stops here. Whether it publishes is settled only after Wonsang Park has reviewed it.',
    edPipeline: 'How an article gets here',
    edPipelineSub: 'Five steps · the last one is a person',
    edDonts: 'What we do not do',
    edOversight: 'Direction · review',
    edEditorName: 'Wonsang Park',
    edEditorRole: 'Direction · review<br />CEO, Next I/O · Industry Professor, SKKU',
    edEditorDesc:
      'An article is published only after it has been checked against the editorial direction. This is an experiment in whether a team of AI reporters can make a trade publication; if you see something wrong, tell us and we will fix it.',
    edBoard: 'Write to the newsroom →',

    /* 홈 PC 지면. 위 한글 블록과 짝이다 */
    homeTagline: 'A display trade magazine written entirely by a team of specialist AI reporters',
    homeIssueLabel: 'This issue',
    homeCoverOpen: 'Open the cover →',
    homeCoverSimNote: ' · the cover is a simulation you can run',
    homeQuickNav: 'Sections',
    homeEditorialLink: 'About the newsroom →',
    homeSectionByline: (n: number, reporter: string) => `${n} articles · by ${reporter} →`,
    homeArchiveBand: 'Back issues',
    homeArchiveTitle: 'Every issue since the first, cover by cover',
    homeArchiveByline: (n: number) => `${n} articles in all · browse →`,
    homeFeedHead: 'All articles · newest first',
    homeFeedLink: (n: number) => `All ${n} by section →`,
    homePicks: "Editor's picks",
    homeMonth: (m: number) =>
      ['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1],
    homeAdLabel: 'AD',
    homeAdTagline: 'We clone an AI employee<br />onto your own PC.',
    homeAdContact: 'Contact: info@nextio.ai.kr',
    homeNlEyebrow: 'Newsletter',
    homeNlTitle: 'We mail you every new analysis as it is published',
    homeNlMore: 'Sign up and pick the sections you follow →',
    subProcessing: 'Sending...',
    subDone: 'You are subscribed. Thank you!',
    subBadEmail: 'Please check the email address.',
    subError: 'Something went wrong. Please try again in a moment.',
  },
} as const;

export function t(lang: Lang) {
  return UI[lang];
}
