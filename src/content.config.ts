import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ARTICLE_TYPES, PROVINCE_SLUGS, SECTION_SLUGS } from './config/site';

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
      province: z.enum(PROVINCE_SLUGS).optional(),
      author: reference('authors'),
      /** Health professional who reviewed the piece (E-E-A-T for health topics). */
      reviewer: reference('authors').optional(),
      reviewedAt: z.coerce.date().optional(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      /** Required, at least 1200px wide (Google Discover, social cards); enforced in ArticleLayout. */
      image: image(),
      imageAlt: z.string().min(10),
      imageCredit: z.string().optional(),
      featured: z.boolean().default(false),
      /** Suicide/self-harm coverage: helplines go first and no ads are served. */
      sensitive: z.boolean().default(false),
      /** External canonical URL when the piece is syndicated from another outlet. */
      canonical: z.url().optional(),
      noindex: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const authors = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      /** Profession and licence (e.g. "Lic. en Psicología — M.N. 12345"). */
      credentials: z.string().optional(),
      photo: image().optional(),
      province: z.enum(PROVINCE_SLUGS).optional(),
      social: z
        .object({
          x: z.url().optional(),
          instagram: z.url().optional(),
          linkedin: z.url().optional(),
          web: z.url().optional(),
        })
        .default({}),
    }),
});

export const collections = { articles, authors };
