import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
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
