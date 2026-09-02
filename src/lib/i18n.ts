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
  },

  en: {
    home: 'DISPLAY NOW home',
    issues: 'Issues',
    archive: 'Archive',
    topics: 'Topics',
    editorial: 'Editorial',
    subscribe: 'Subscribe',
    subscribeShort: 'Subscribe',
    corrections: 'Corrections & tips',
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
  },
} as const;

export function t(lang: Lang) {
  return UI[lang];
}
