/**
 * DISPLAY NOW 책 — 기사를 바탕으로 엮은 단행본. 홈 세 축(매거진·TV·책) 중 「책」.
 *
 * - 값(정가·발행일·ISBN)의 원본은 단행본팀 `핸드북_<책>/발행값.json`이다. 여기는 그 사본이니
 *   단행본팀이 값을 바꾸면 여기도 고친다
 * - **판매 링크는 판매가 실제로 열린 뒤에만 넣는다.** 비어 있으면 「N월 N일 출간」만 보인다
 * - 발행(출판사 명의)은 넥스트아이오다. DISPLAY NOW는 지은이(편집부) 이름이다
 */
export interface BookLink {
  label: string;
  href: string;
}

export interface Book {
  /** 주소 `/books#<slug>` */
  slug: string;
  title: string;
  author: string;
  /** 발행일 YYYY-MM-DD */
  date: string;
  /** `public/` 기준 경로 */
  cover: string;
  /** 표지 픽셀 크기(레이아웃 밀림 방지) */
  coverW: number;
  coverH: number;
  /** 종이책 정가(원) */
  pricePaper?: number;
  /** 전자책 정가(원) */
  priceEbook?: number;
  pages?: number;
  /** 한 줄 소개(/books) */
  lead: string;
  /** 책 소개 문단(/books) */
  about: string[];
  /** 판매처. 판매가 열린 곳만 */
  links: BookLink[];
}

export const BOOKS: Book[] = [
  {
    slug: 'sensor-tech-1',
    title: '디스플레이 센서기술 I',
    author: 'DISPLAY NOW 편집부 지음 · 박원상 기획·편집·감수',
    date: '2026-11-26',
    cover: '/books/sensor-tech-1.webp',
    coverW: 480,
    coverH: 711,
    pricePaper: 16000,
    priceEbook: 11000,
    pages: 202,
    lead: '매일 손끝과 얼굴로 여는 스마트폰, 그 센서는 지금 화면 아래에 있습니다',
    about: [
      '손가락을 대면 잠금이 풀리고, 귀에 대면 화면이 꺼지고, 어두운 방에 들어서면 화면이 알아서 어두워집니다. 이 일을 하는 센서들은 한때 화면 테두리에 나란히 있었습니다. 테두리가 사라진 지금, 그 센서들은 모두 디스플레이 패널 아래로 들어갔습니다.',
      '자리를 옮긴 값은 작지 않았습니다. 패널을 지나며 빛은 크게 줄고, 촘촘한 화소는 사진을 흐리게 하며, 카메라 위 화면에는 미세하게 다른 원이 비칩니다. 업계는 화소 배치를 바꾸고, 빛을 고르고, 빛 대신 소리를 쓰며 이 문제를 하나씩 풀어 왔습니다.',
      '이 책은 화면 아래로 옮겨 간 다섯 센서가 무엇을 잃었고 그것을 어떻게 되찾아 왔는지 한 장씩 보여 줍니다. 책을 덮고 나면, 매일 보던 화면이 다르게 보일 것입니다.',
    ],
    links: [
      { label: '교보문고 종이책', href: 'https://product.kyobobook.co.kr/detail/S000222029805' },
      { label: '교보문고 전자책', href: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000013849277' },
    ],
  },
  {
    slug: 'surface-treatment',
    title: '디스플레이 표면처리기술',
    author: 'DISPLAY NOW 편집부 지음 · 박원상 기획·편집·감수',
    date: '2026-11-06',
    cover: '/books/surface-treatment.webp',
    coverW: 480,
    coverH: 711,
    pricePaper: 16000,
    priceEbook: 11000,
    pages: 208,
    lead: '화면 맨 바깥의 일곱 막 — 지문방지부터 접히는 화면의 하드코트까지',
    about: [
      '스마트폰, 모니터, TV, 자동차 화면의 맨 바깥 면에는 눈에 보이지 않는 막이 여러 겹 올라가 있다. 지문방지(AF), 눈부심방지(AG), 반사방지·저반사(AR·LR), 모스아이, 대전방지(AS), 하드코트(HC), 그리고 접히는 화면의 하드코트다.',
      '일곱 막을 한 장씩 다룬다. 각 장은 일상 장면에서 출발해 원리와 수치로 내려간다. 그림 71장과 도표 9장, 시뮬레이션 장면 여덟 가지로 막 안에서 일어나는 일을 눈으로 따라갈 수 있게 했다.',
      '공개된 특허, 논문, 제조사 기술자료만 근거로 삼았고, 근거 213건을 모두 실었다. 본문과 그림은 AI가 쓰고, 사람이 기획하고 편집·감수했다.',
    ],
    links: [
      { label: '교보문고 종이책', href: 'https://product.kyobobook.co.kr/detail/S000221882563' },
      { label: '교보문고 전자책', href: 'https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000013787461' },
    ],
  },
];

export const won = (n: number) => `${n.toLocaleString('ko-KR')}원`;

/** '2026-11-06' → '11월 6일' */
export const bookDateLabel = (d: string) => {
  const [, m, day] = d.split('-').map(Number);
  return `${m}월 ${day}일`;
};
