import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ARTICLE_TYPES, SECTION_SLUGS } from './config/site';

/**
 * Articles. The entry id (file name) is the URL slug: /{section}/{id}/.
 * Migrating to a headless CMS only requires swapping the `loader`.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(110),
      /** Shorter <title> for search results when the headline is long. */
      seoTitle: z.string().max(60).optional(),
      /** Standfirst. Also used as meta description (aim for 120–160 characters). */
      description: z.string().min(70).max(160),
      section: z.enum(SECTION_SLUGS),
      type: z.enum(ARTICLE_TYPES).default('news'),
      tags: z.array(z.string()).default([]),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      /** Required, at least 1200px wide (Google Discover, social cards); enforced in ArticleLayout. */
      image: image(),
      imageAlt: z.string().min(10),
      imageCredit: z.string().optional(),
      /**
       * Questions and answers rendered at the end of the article and exposed as FAQPage
       * structured data. Plain text only; answers must restate what the article says.
       */
      faq: z
        .array(z.object({ question: z.string().min(10), answer: z.string().min(40).max(600) }))
        .max(6)
        .default([]),
      featured: z.boolean().default(false),
      /** Suicide/self-harm coverage: helplines go first and no ads are served. */
      sensitive: z.boolean().default(false),
      /** External canonical URL when the piece is syndicated from another outlet. */
      canonical: z.url().optional(),
      noindex: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
