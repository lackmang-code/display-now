import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    section: z.enum(['tech-note', 'paper', 'patent', 'issue']),
    reporter: z.enum(['TEKER', 'PEER', 'CLAIM', 'DESK']),
    publishedAt: z.coerce.date(),
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
