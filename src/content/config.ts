import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    /**
     * **검색엔진에 보내는 제목.** 비워 두면 `title`을 그대로 쓴다.
     *
     * 화면에 찍히는 제목(h1·목록·표지)은 언제나 `title`이다. 이 값은 `<title>` 태그에만
     * 들어간다. 즉 **후크 제목 규칙을 그대로 지키면서 검색어를 따로 잡기 위한 칸**이다.
     *
     * 테커의 제목은 독자가 폰을 보며 실제로 떠올린 질문이라("통화할 때 화면은 어떻게 저절로
     * 꺼질까") 사람에게는 잘 열리지만, 정작 그 기술을 찾는 사람이 검색창에 치는 말("근접센서
     * 원리")은 한 글자도 들어 있지 않다. 실제로 구글에서 이 분야 검색은 "IGZO TFT 원리",
     * "탠덤 OLED 구조"처럼 **용어 더하기 원리·구조** 형태이고, 그 자리를 8년 된 개인 블로그가
     * 차지하고 있다(2026-08-24 확인). 이길 수 있는 자리인데 제목이 문을 닫고 있었다.
     *
     * 그래서 **화면 제목과 검색 제목을 두 층으로 나눈다.** 후크는 사이트와 SNS에서 살고,
     * 검색은 기술용어로 잡는다. 본문이 실제로 다룬 내용이어야 하며, 본문에 없는 말을 넣지
     * 않는다. 그 순간 낚시가 되고 검색엔진도 사람도 한 번 속고 다시 오지 않는다.
     *
     * 쓰는 법: **용어를 문장 맨 앞에 두고, 그 기사가 그 용어의 무엇을 다뤘는지 잇는다.**
     * 약어는 풀어 쓰되 약어도 함께 남긴다(둘 다 검색되기 때문이다).
     * 40자 안팎. 뒤에 " | DISPLAY NOW"가 자동으로 붙는다.
     */
    searchTitle: z.string().optional(),
    summary: z.string(),
    section: z.enum(['tech-note', 'paper', 'patent', 'issue']),
    reporter: z.enum(['TEKER', 'PEER', 'CLAIM', 'DESK']),
    publishedAt: z.coerce.date(),
    /**
     * **자료수집 주간의 월요일.** 'YYYY-MM-DD'
     *
     * 이 값 하나가 기사를 호(號)에 배정한다. 전 기자가 모든 기사에 적는다.
     * 제1호 2026-08-10, 제2호 2026-08-17 … 매주 7일씩 이어진다.
     *
     * 피어·데스크는 실제로 자료를 모은 주간을, 테커·클레임은 함께 실릴 호의 주간을 적는다.
     * **발행일은 호 편성에 쓰지 않는다.** 늦게 써서 보강해도 원래 호에 그대로 들어가고,
     * 소급 발행해도 표지의 자료수집기간이 바뀌지 않아 거짓이 되지 않는다.
     */
    collectWeekStart: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'collectWeekStart는 YYYY-MM-DD 형식의 월요일이어야 합니다')
      .optional(),
    /**
     * **연재 정보.** 심층분석을 부(部) 단위로 묶을 때만 적는다.
     *
     * 낱개 기사는 비워 둔다. `id`는 `src/lib/series.ts`의 연재 등록부에 있는 값이어야 하고,
     * `part`는 몇 부인지, `episode`는 그 부 안에서 몇 편째인지다.
     *
     * **편 번호는 제목에 넣지 않는다.** 제목에 "센서 1 / 2 / 3"을 달았더니 검색과 목록에서
     * 후크가 통째로 죽었다(2026-08-22 확인). 연재 표기는 제목 위 키커와 기사 끝 연재
     * 네비게이션이 담당하고, 제목은 그 편만의 반전을 갖는다.
     */
    series: z
      .object({
        id: z.string(),
        part: z.number().int().positive(),
        episode: z.number().int().positive(),
      })
      .optional(),
    readingMinutes: z.number(),
    tags: z.array(z.string()).default([]),
    sources: z
      .array(
        z.object({
          type: z.enum(['paper', 'patent', 'disclosure', 'article']),
          title: z.string(),
          url: z.string().optional(),
          number: z.string().optional(),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    paywallAfter: z.number().default(0),
    lang: z.enum(['ko', 'en']).default('ko'),
    translationOf: z.string().nullable().default(null),
  }),
});

export const collections = { articles };
