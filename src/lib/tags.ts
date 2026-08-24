import type { Article } from './articles';

/**
 * **주제 태그 등록부.**
 *
 * 기자가 프론트매터에 적는 `tags`는 그 기사에서 실제로 다룬 것을 자유롭게 적은 값이다.
 * 28편에 116개가 쌓였고 그중 107개가 한 번씩만 쓰였다. 자유 태그는 기사를 설명하는 데는
 * 좋지만 목록 페이지의 근거로는 쓸 수 없다. 기사 한 편짜리 페이지가 100개 생기면
 * 검색엔진이 저품질로 판정한다.
 *
 * 그래서 **원본 태그를 고치지 않고** 여기서 주제로 묶는다. 기자 파일은 그대로 두고
 * 별칭(alias)만 이 표에 등록하면 된다. 새 태그가 생겨도 기사가 깨지지 않는다.
 * 등록되지 않은 태그는 기사 안에서만 표시되고 주제 페이지를 만들지 않는다.
 *
 * **페이지는 기사 2편 이상인 주제만 생성한다**({@link MIN_ARTICLES}). 한 편짜리 주제도
 * 등록부에는 미리 적어 둔다. 두 번째 기사가 나오는 순간 페이지가 저절로 열린다.
 */
export interface Topic {
  /** URL 경로. `/tag/<slug>` */
  slug: string;
  /** 화면에 찍히는 이름 */
  label: string;
  /**
   * 주제 페이지 맨 위에 싣는 설명. **목록만 있는 페이지를 만들지 않기 위한 것이다.**
   * 링크만 늘어놓은 페이지는 검색엔진이 걸러낸다. 기사를 안 읽은 사람이 이 문단만 읽어도
   * 그 주제가 무엇인지 알 수 있어야 한다.
   */
  blurb: string;
  /** 이 주제로 묶을 원본 태그들. 대소문자와 공백은 무시하고 맞춘다 */
  aliases: string[];
}

/** 주제 페이지를 만들 최소 기사 수 */
export const MIN_ARTICLES = 2;

export const TOPICS: Topic[] = [
  {
    slug: 'oled',
    label: 'OLED',
    blurb:
      '유기물에 전류를 흘려 스스로 빛을 내는 표시 소자입니다. 백라이트가 없어 검은색을 완전히 끌 수 있고, 얇은 층을 여러 겹 쌓아 만들기 때문에 발광 재료와 증착 공정, 봉지 기술이 화질과 수명을 함께 좌우합니다.',
    aliases: ['OLED', 'OLED재료', 'OLED원가', 'IT OLED'],
  },
  {
    slug: 'oxide-tft',
    label: '산화물 반도체 TFT',
    blurb:
      '인듐·갈륨·아연 산화물(IGZO)을 채널로 쓰는 박막트랜지스터입니다. 비정질 실리콘보다 전자 이동도가 높고 꺼졌을 때 새는 전류가 적어 고해상도 패널과 저주파 구동에 쓰입니다. 최근에는 디스플레이 백플레인을 넘어 메모리 소자로도 검토되고 있습니다.',
    aliases: ['IGZO', 'IGZO TFT', '산화물 반도체', 'ALD', '레이저 어닐링', '이온주입', '수직 RRAM', '커패시터리스 D램'],
  },
  {
    slug: 'under-display-sensor',
    label: '언더디스플레이 센서',
    blurb:
      '지문·조도·근접·얼굴인식 센서를 화면 아래로 옮기는 기술입니다. 테두리와 구멍을 없앨 수 있는 대신 센서가 받는 빛이 패널을 한 번 통과해야 합니다. 투과율 손실과 화면 자신이 내는 빛의 간섭을 어떻게 다루느냐가 센서마다 다른 문제가 됩니다.',
    aliases: [
      '언더디스플레이',
      '언더패널센서',
      '지문센서',
      '광학식',
      '콜리메이터',
      '프레넬반사',
      '근접센서',
      'ALS',
      '조도센서',
      '크로스토크',
      'FaceID',
      '구조광',
      '3D센싱',
    ],
  },
  {
    slug: 'under-display-camera',
    label: '언더디스플레이 카메라',
    blurb:
      '카메라를 화면 아래에 두는 기술입니다. 화소와 배선이 만드는 규칙적인 격자가 회절격자처럼 작용해 빛이 번집니다. 그래서 그 자리의 화소 배치를 바꾸거나 메타표면을 넣고, 찍은 뒤 복원 알고리즘으로 되돌리는 방식을 함께 씁니다.',
    aliases: ['UDC', 'UPC', '언더패널카메라', '메타서피스', '회절'],
  },
  {
    slug: 'foldable',
    label: '폴더블 디스플레이',
    blurb:
      '접히는 화면을 만들기 위한 초박막유리(UTG)와 힌지 구조, 백플레이트 소재를 다룹니다. 수십만 번 접어도 주름과 파손이 남지 않아야 해서 소재 물성과 기구 설계가 한꺼번에 걸립니다.',
    aliases: ['폴더블OLED', '폴더블유리', '폴더블힌지', 'UTG', '갤럭시Z폴드8', '플렉스티타늄', '백플레이트'],
  },
  {
    slug: 'oled-deposition',
    label: 'OLED 증착·패터닝',
    blurb:
      '유기물을 기판에 올려 화소를 그리는 공정입니다. 파인메탈마스크(FMM)를 쓰는 방식은 기판이 커질수록 마스크가 처지는 문제가 커집니다. 8.6세대 전환과 마스크를 아예 쓰지 않는 패터닝 방식이 함께 검토되는 배경입니다.',
    aliases: [
      '8.6세대',
      '8.5세대',
      '증착장비',
      '파인메탈마스크',
      'FMM',
      '정전척',
      '마스크리스패터닝',
      'FLiPP',
      '오사거널',
      '개구율',
      '캐논토키',
      '선익시스템',
      '야스',
      '알박',
      '파인원',
    ],
  },
  {
    slug: 'emitter-material',
    label: 'OLED 발광재료',
    blurb:
      '빛을 내는 유기 분자입니다. 적색과 녹색은 인광 재료가 상용화됐지만 청색은 수명 때문에 아직 형광에 머물러 있습니다. 청색 인광과 TADF 계열이 오래 남은 과제인 이유입니다.',
    aliases: ['청색인광', 'PHOLED', 'TADF', 'MR-TADF', '엑시플렉스', '역계간전이', '게르마늄', '효율 저하', '유니버설디스플레이', '큐럭스'],
  },
  {
    slug: 'perovskite',
    label: '페로브스카이트 발광소자',
    blurb:
      '용액 공정으로 만들 수 있고 색 순도가 높아 차세대 발광층 후보로 연구됩니다. 다만 수분과 열에 약해 봉지 기술과 수명 확보가 상용화의 관문으로 남아 있습니다.',
    aliases: ['페로브스카이트', '페로브스카이트 LED', '자가치유 고분자', '봉지', '웨어러블 디스플레이', '시간분해 광발광', '광발광 양자수율', '캐리어 재결합'],
  },
  {
    slug: 'micro-led',
    label: 'Micro-LED',
    blurb:
      '무기 LED를 화소 크기로 잘라 배열하는 방식입니다. 밝기와 수명이 뛰어나지만 수백만 개를 옮겨 붙이는 전사 공정의 수율이 과제로 남아 있습니다.',
    aliases: ['Micro-LED', '플로팅게이트 메모리', '비휘발성 디스플레이'],
  },
  {
    slug: 'tandem-oled',
    label: '탠덤 OLED',
    blurb:
      '발광 유닛을 전하생성층으로 이어 수직으로 쌓는 구조입니다. 같은 전류로 더 밝게 낼 수 있어 휘도와 수명이 함께 올라가지만, 층이 늘어난 만큼 공정 부담과 원가도 같이 커집니다.',
    aliases: ['탠덤OLED', '2스택탠덤', 'WOLED'],
  },
  {
    slug: 'neuromorphic',
    label: '뉴로모픽·유연 소자',
    blurb:
      '감지와 기억, 연산을 한 소자 안에서 처리하려는 시도입니다. 디스플레이 백플레인에 쓰이던 박막트랜지스터 구조를 그대로 가져다 쓰는 경우가 많아 소재와 공정이 겹칩니다.',
    aliases: ['뉴로모픽', 'OTFT', '유연전자소자', '이종유전체'],
  },
  {
    slug: 'automotive-display',
    label: '차량용 디스플레이',
    blurb:
      '차 안으로 들어간 화면입니다. 터치만으로 조작하는 구조가 안전성 평가에서 감점을 받으면서, 화면 위에 물리 조작감을 되돌리려는 시도가 이어지고 있습니다.',
    aliases: ['차량용디스플레이', 'HIAA', 'EuroNCAP', 'KnobOnDisplay'],
  },
  {
    slug: 'privacy-display',
    label: '프라이버시 디스플레이',
    blurb:
      '정면에서는 보이고 옆에서는 보이지 않게 시야각을 좁히는 기술입니다. 필름을 덧대는 대신 패널 안에서 전환할 수 있게 만드는 것이 관건입니다.',
    aliases: ['프라이버시디스플레이', 'FMP', '갤럭시S27'],
  },
  {
    slug: 'display-patent',
    label: '디스플레이 특허',
    blurb:
      '등록 특허와 소송 기록에서 각 회사가 어디에 울타리를 쳤는지 읽습니다. 공개된 특허 문헌만 근거로 삼고, 청구항과 실시예에 적힌 수치를 그대로 인용합니다.',
    aliases: ['특허소송', '레이턴컴퓨팅', '레노버', '코닝', 'Schott', '도우인시스'],
  },
  {
    slug: 'samsung-display',
    label: '삼성디스플레이',
    blurb: '삼성디스플레이가 주인공이거나 비중 있게 등장하는 기사입니다. 공시와 특허, 논문 등 공개된 자료만 근거로 삼습니다.',
    aliases: ['삼성디스플레이'],
  },
  {
    slug: 'lg-display',
    label: 'LG디스플레이',
    blurb: 'LG디스플레이가 주인공이거나 비중 있게 등장하는 기사입니다. 공시와 특허, 논문 등 공개된 자료만 근거로 삼습니다.',
    aliases: ['LG디스플레이'],
  },
  {
    slug: 'boe',
    label: 'BOE',
    blurb: 'BOE가 주인공이거나 비중 있게 등장하는 기사입니다. 공시와 특허, 논문 등 공개된 자료만 근거로 삼습니다.',
    aliases: ['BOE'],
  },
  {
    slug: 'samsung-electronics',
    label: '삼성전자',
    blurb: '삼성전자가 주인공이거나 비중 있게 등장하는 기사입니다. 세트 업체 관점에서 패널 채택과 특허 분쟁을 다룹니다.',
    aliases: ['삼성전자'],
  },
];

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '');
}

const ALIAS_TO_SLUG = new Map<string, string>();
for (const t of TOPICS) {
  for (const a of t.aliases) ALIAS_TO_SLUG.set(norm(a), t.slug);
}

export const TOPIC_BY_SLUG = new Map(TOPICS.map((t) => [t.slug, t]));

/** 이 기사가 속한 주제들. 등록부 순서를 지킨다 */
export function topicsOf(a: Article): Topic[] {
  const hit = new Set<string>();
  for (const raw of a.data.tags) {
    const slug = ALIAS_TO_SLUG.get(norm(raw));
    if (slug) hit.add(slug);
  }
  return TOPICS.filter((t) => hit.has(t.slug));
}

/** 주제별 기사 묶음. 기사가 {@link MIN_ARTICLES}편 미만인 주제는 빠진다 */
export function topicIndex(articles: Article[]): Array<{ topic: Topic; articles: Article[] }> {
  return TOPICS.map((topic) => ({
    topic,
    articles: articles.filter((a) => topicsOf(a).some((t) => t.slug === topic.slug)),
  })).filter((g) => g.articles.length >= MIN_ARTICLES);
}
