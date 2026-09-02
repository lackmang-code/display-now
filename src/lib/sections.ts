export type SectionKey = 'tech-note' | 'paper' | 'patent' | 'issue';

export interface SectionMeta {
  key: SectionKey;
  label: string;
  labelEn: string;
  reporter: 'TEKER' | 'PEER' | 'CLAIM' | 'DESK';
  hue: number;
  chroma: number;
  blurb: string;
}

export const SECTIONS: Record<SectionKey, SectionMeta> = {
  'tech-note': {
    key: 'tech-note',
    label: '기술노트',
    labelEn: 'TECH NOTE',
    reporter: 'TEKER',
    hue: 40,
    chroma: 0.11,
    blurb: '공정·소재·장비의 원리를 계산 가능한 수준까지 풀어 정리합니다. 이 매체에서 가장 긴 글이 모이는 꼭지입니다.',
  },
  paper: {
    key: 'paper',
    label: '논문',
    labelEn: 'PAPER',
    reporter: 'PEER',
    hue: 255,
    chroma: 0.11,
    blurb: '산업으로 넘어올 논문만 매달 한 편씩 고릅니다. 측정 조건과 산업 표준의 차이를 환산해 함께 싣습니다.',
  },
  patent: {
    key: 'patent',
    label: '특허',
    labelEn: 'PATENT',
    reporter: 'CLAIM',
    hue: 150,
    chroma: 0.1,
    blurb: '등록 특허를 청구항 단위로 분류해 각 사의 로드맵을 역추적합니다.',
  },
  issue: {
    key: 'issue',
    label: '이슈',
    labelEn: 'ISSUE NOW',
    reporter: 'DESK',
    hue: 315,
    chroma: 0.12,
    blurb: '이번 주 업계에서 실제로 움직인 일만 골라 정리합니다. 학회·공시에서 언급량이 급변한 기술도 여기서 다룹니다.',
  },
};

export const SECTION_ORDER: SectionKey[] = ['tech-note', 'paper', 'patent', 'issue'];

export function sectionColor(key: SectionKey, lightness = 0.45): string {
  const s = SECTIONS[key];
  return `oklch(${lightness} ${s.chroma} ${s.hue})`;
}

export interface ReporterMeta {
  code: 'TEKER' | 'PEER' | 'CLAIM' | 'DESK';
  nameKo: string;
  section: SectionKey;
  role: string;
  reads: string;
  does: string;
  limit: string;
  /** 영문 편집국용. 번역이 아니라 같은 뜻을 영어로 다시 쓴 것이다 */
  roleEn: string;
  readsEn: string;
  doesEn: string;
  limitEn: string;
}

export const REPORTERS: Record<'TEKER' | 'PEER' | 'CLAIM' | 'DESK', ReporterMeta> = {
  TEKER: {
    code: 'TEKER',
    nameKo: '테커',
    section: 'tech-note',
    role: '공정·소재·장비의 원리를 계산 가능한 수준까지 풀어 씁니다. 조건이 다른 수치를 같은 축으로 환산하는 일이 이 기자의 핵심입니다.',
    reads: '학회 발표자료, 논문 본문, 장비사 기술문서',
    does: '단위 환산 · 조건 통일 · 방식별 비교표 작성',
    limit: '양산 라인의 실제 조건은 공개되지 않습니다. 논문 조건과 다를 수 있다는 점을 본문에 밝힙니다.',
    roleEn: 'Works the physics of process, materials and equipment down to where you can compute it. The core of this desk is putting numbers measured under different conditions onto the same axis.',
    readsEn: 'Conference presentations, full papers, equipment vendor technical notes',
    doesEn: 'Unit conversion · condition normalisation · method-by-method comparison tables',
    limitEn: 'Real production-line conditions are not published. Where lab conditions may differ, the article says so.',
  },
  PEER: {
    code: 'PEER',
    nameKo: '피어',
    section: 'paper',
    role: '매달 발표되는 수백 편에서 산업으로 넘어올 한 편을 고릅니다. 측정 조건이 산업 표준과 다르면 환산해 다시 싣습니다.',
    reads: 'SCIE 저널, 프리프린트, 학회 프로시딩',
    does: '초록 선별 · 측정 조건 검증 · 산업 함의 정리',
    limit: '구독 저널은 원문 접근이 막힐 수 있습니다. 그 경우 초록·공개 자료만으로 썼다고 표기합니다.',
    roleEn: 'Picks the one paper a month, out of hundreds, that is likely to cross into industry. Where the measurement conditions differ from industry practice, it converts them and reports both.',
    readsEn: 'SCIE journals, preprints, conference proceedings',
    doesEn: 'Abstract screening · verification of measurement conditions · what it means for industry',
    limitEn: 'Subscription journals can be closed to us. When that happens, the article states that it was written from the abstract and open material only.',
  },
  CLAIM: {
    code: 'CLAIM',
    nameKo: '클레임',
    section: 'patent',
    role: '등록 특허를 청구항 단위로 분류해 각 사의 로드맵을 역추적합니다. 건수가 아니라 분포의 쏠림을 봅니다.',
    reads: 'KIPRIS · USPTO · CNIPA · JPO 등록 공보',
    does: '독립항 분류 · 시계열 분포 비교 · 검색 조건 공개',
    limit: '특허는 출원 후 18개월 뒤 공개됩니다. 현재 라인 상태와 시차가 있고, 침해 여부는 판단하지 않습니다.',
    roleEn:
      "Sorts granted patents claim by claim to reconstruct each company's roadmap backwards. It reads the skew in the distribution, not the headcount of filings.",
    readsEn: 'KIPRIS · USPTO · CNIPA · JPO grant gazettes',
    doesEn: 'Independent-claim classification · time-series distribution · search terms published',
    limitEn: 'Patents publish 18 months after filing. There is a lag against the current line, and we do not judge infringement.',
  },
  DESK: {
    code: 'DESK',
    nameKo: '데스크',
    section: 'issue',
    role: '이번 주 업계에서 실제로 움직인 일만 골라 정리합니다. 공시와 발표를 전주 대비로 비교해 변화가 생긴 지점을 짚습니다.',
    reads: '각 사 공시·IR 자료, 학회 프로그램, 정부 발표',
    does: '전주 대비 변화 추적 · 수치 교차 확인 · 표 정리',
    limit: '"왜 그랬는가"는 확인 없이 단정하지 않습니다. 해석이 필요한 대목은 편집 단계에서 문장을 조정합니다.',
    roleEn: 'Takes only what actually moved in the industry this week. It compares filings and announcements against the week before and points at where something changed.',
    readsEn: 'Company disclosures and IR decks, conference programmes, government announcements',
    doesEn: 'Week-on-week change tracking · cross-checking figures · tabulation',
    limitEn: 'It does not assert "why" without confirmation. Passages that need interpretation are adjusted at the editing stage.',
  },
};

export function formatByline(
  reporter: keyof typeof REPORTERS,
  date: Date,
  lang: 'ko' | 'en' = 'ko',
): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const role = lang === 'en' ? 'AI reporter' : 'AI 기자';
  return `by ${reporter} (${role}) · ${mm}.${dd}`;
}
