import type { Article, Lang } from './articles';

/**
 * 연재(심층분석) 등록부.
 *
 * 이 매체의 기술노트는 낱개 해설이 아니라 **부(部) 단위 연재**로 간다.
 * 한 부는 4~6편이고, 마지막 편에서 그 부의 모든 편을 **하나의 물리량**으로 묶어 닫는다.
 * 1부가 그렇게 끝났다. 네 센서가 겪는 서로 다른 문제를 프레넬 수 하나로 정렬한 대목이
 * 사후에 종결부 역할을 했고, 그 구조를 규칙으로 굳힌 것이 이 등록부다.
 *
 * 편 번호는 **제목에 넣지 않는다.** 제목에 "센서 1 / 2 / 3"을 달았더니 목록과 검색에서
 * 후크가 통째로 죽었다. 연재 표기는 이 파일이 만들어내는 키커와 네비게이션이 담당한다.
 *
 * **각 편은 단독으로 완결된다.** 주간 발행이라 독자는 아무 편으로나 들어온다.
 * "앞 편을 읽어야 이해되는 글"은 신규 독자를 돌려보낸다. 부는 묶음 라벨이지 전제조건이 아니다.
 */

export interface SeriesPart {
  part: number;
  /** 부 제목. 「」 없이 적는다 */
  title: string;
  /** 이 부가 무엇을 관통하는지 한 줄 */
  deck: string;
  /** 이 부를 닫는 물리량·개념. 마지막 편이 여기로 수렴한다 */
  closesWith?: string;
  status: 'ongoing' | 'done' | 'planned';

  /* 🔴 영문판이 쓰는 세 필드. **UI 문구가 아니라 데이터라서 i18n 사전이 못 덮는다.**
     2026-09-05 영문 34편을 배포하고 라이브를 확인하니 키커에 「화면 아래로 1부 · 1편」이
     한글로 박혀 있었다. 원고 대조 검사기는 원고(md)만 보므로 이 자리를 못 잡는다 —
     **원고 밖에서 화면에 찍히는 글자는 검사기 사각지대다.**
     비워 두면 한글이 그대로 나오므로 부를 새로 만들 때 함께 채운다. */
  titleEn?: string;
  deckEn?: string;
  closesWithEn?: string;
}

export interface SeriesMeta {
  id: string;
  /** 연재 이름 */
  title: string;
  reporter: 'TEKER' | 'PEER' | 'CLAIM' | 'DESK';
  parts: SeriesPart[];
}

export const SERIES: Record<string, SeriesMeta> = {
  'teker-deep': {
    id: 'teker-deep',
    title: '테커 심층연재',
    reporter: 'TEKER',
    parts: [
      {
        part: 1,
        title: '화면 아래로',
        deck: '센서를 화면 밑으로 넣는 일이 왜 센서마다 다른 문제가 되는가',
        closesWith: '프레넬 수',
        titleEn: 'Under the Screen',
        deckEn: 'Why putting a sensor under the screen becomes a different problem for each sensor',
        closesWithEn: 'the Fresnel number',
        status: 'done',
      },
      {
        part: 2,
        title: '표면처리기술',
        deck: '커버윈도우 최외곽 네 가지 코팅의 소재와 공정, 그리고 규격',
        closesWith: '표면 거칠기',
        titleEn: 'Surface Treatment',
        deckEn: 'The materials, processes and specifications of the four outermost coatings on a cover window',
        closesWithEn: 'surface roughness',
        status: 'ongoing',
      },
      {
        part: 3,
        title: '크게 만드는 일',
        deck: '큰 화면과 작은 화소를 같은 장비로 만들 수 없는 이유',
        closesWith: '치수와 정밀도의 충돌',
        titleEn: 'Making It Large',
        deckEn: 'Why a large screen and small pixels cannot be made on the same equipment',
        closesWithEn: 'the collision of dimension and precision',
        status: 'planned',
      },
    ],
  },
};

export function seriesOf(a: Article): SeriesMeta | undefined {
  const id = a.data.series?.id;
  return id ? SERIES[id] : undefined;
}

export function partOf(a: Article): SeriesPart | undefined {
  const s = seriesOf(a);
  if (!s || !a.data.series) return undefined;
  return s.parts.find((p) => p.part === a.data.series!.part);
}

/** 같은 부에 속한 편들을 편 번호 순으로 돌려준다 */
export function episodesOfPart(all: Article[], id: string, part: number): Article[] {
  return all
    .filter((a) => a.data.series?.id === id && a.data.series.part === part)
    .sort((x, y) => (x.data.series!.episode ?? 0) - (y.data.series!.episode ?? 0));
}

/**
 * 기사 제목 위에 붙는 키커 문구.
 *
 * 예: `연재 · 화면 아래로 1부 4편`
 * 그 부가 몇 편으로 끝날지는 발행 전에는 확정할 수 없으므로 총 편수를 적지 않는다.
 * 총 편수를 적었다가 계획이 바뀌면 지난 기사가 전부 거짓말이 된다.
 */
export function seriesKicker(a: Article, lang: Lang = 'ko'): string | undefined {
  const s = seriesOf(a);
  const p = partOf(a);
  if (!s || !p || !a.data.series) return undefined;
  const { part, episode } = a.data.series;
  return lang === 'en'
    ? `${partTitle(p, 'en')} · Part ${part}, Episode ${episode}`
    : `${p.title} ${part}부 · ${episode}편`;
}

/* 부 제목·덱·닫는 물리량을 언어에 맞춰 고른다.
   영문이 비어 있으면 한글로 떨어진다 — 빈 칸을 내보내는 것보다 낫다. */
export function partTitle(p: SeriesPart, lang: Lang = 'ko'): string {
  return lang === 'en' ? (p.titleEn ?? p.title) : p.title;
}
export function partDeck(p: SeriesPart, lang: Lang = 'ko'): string {
  return lang === 'en' ? (p.deckEn ?? p.deck) : p.deck;
}
export function partClosesWith(p: SeriesPart, lang: Lang = 'ko'): string | undefined {
  return lang === 'en' ? (p.closesWithEn ?? p.closesWith) : p.closesWith;
}

/** 연재 중 아직 안 끝난 부가 있으면 그 부를 돌려준다 (홈·아카이브 안내용) */
export function ongoingPart(id: string): SeriesPart | undefined {
  return SERIES[id]?.parts.find((p) => p.status === 'ongoing');
}
