# Imperare Sibi

Digital news outlet about mental health in Argentina. Static site built with [Astro](https://astro.build), optimised for SEO and AdSense, and structured to grow into a national network of provincial editions.

The reader-facing site is in Spanish (es-AR). Code, comments and documentation are in English.

- Business and editorial strategy: [`docs/STRATEGY.md`](docs/STRATEGY.md)

## Development

```sh
npm install
npm run dev      # http://localhost:4321 (ad slots render as dashed placeholders)
npm run check    # type check
npm run build    # outputs dist/ and .vercel/output
npm run preview
```

Requires Node 22.12+. Fonts are fetched from Fontsource at build time (Astro Fonts API).

## Publishing an article

1. Add the photo to `src/content/articles/img/` (landscape, **at least 1200px wide**; the build fails otherwise).
2. Create `src/content/articles/<slug>.mdx`. The file name becomes the URL: `/{section}/{slug}/`.
3. Fill in the frontmatter. The build fails if a field is missing or invalid:

```yaml
---
title: 'Headline (max 110 characters)'
seoTitle: 'Shorter title for Google (optional, max 60)'
description: 'Standfirst, 70–160 characters. Also the meta description.'
section: ansiedad # ansiedad | depresion | vinculos | infancias-y-adolescencias | politicas-publicas | bienestar
type: guide # news | guide | interview | opinion
tags: ['Ansiedad', 'Tratamiento']
province: cordoba # optional: also listed on /edicion/cordoba/
author: lucia-fernandez # id from src/content/authors/
reviewer: ana-quiroga # health professional who reviewed it (strongly recommended)
reviewedAt: 2026-09-25
publishedAt: 2026-09-28T09:00:00-03:00
updatedAt: 2026-10-10 # optional: published as dateModified
image: ./img/photo.jpg
imageAlt: 'Description of the photo (also used as caption)'
imageCredit: 'Foto: Name / Unsplash'
featured: true # optional: candidate for the front-page lead
sensitive: true # optional: suicide/self-harm. Helplines go first, no ads at all
draft: true # optional: not published in production
---
```

4. Write the body in Markdown/MDX. Use `##` subheadings; with 3 or more, the "En esta nota" table of contents is generated.
5. Commit and push to `main`; Vercel deploys. Sitemap, Google News sitemap, RSS, social images and JSON-LD regenerate automatically.

Authors are one JSON file each in `src/content/authors/` (name, role, bio, credentials, social links). Author pages matter for E-E-A-T.

> The bundled articles and author profiles are **samples**. Replace them before launch.

## AdSense

Everything is wired but inactive until an account is approved:

1. Set `ADSENSE.client` (`ca-pub-…`) and the three slot ids in `src/config/site.ts`.
2. Deploy. That enables the AdSense script, the ad units and `/ads.txt`.
3. In the AdSense dashboard: enable Auto ads **only** for anchor and vignette formats (in-page placements are manual), and set up the consent message under *Privacy & messaging*.

Placements (each container reserves its height up front to keep CLS at ~0):

| Page | Units |
| --- | --- |
| Front page | 1 horizontal after the lead, 1 between section blocks |
| Section | 1 horizontal after the lead story |
| Article | in-article units (after the 2nd paragraph, then every ~400 words, max 3; inserted by `src/lib/rehype-in-article-ads.ts`), 1 in the desktop rail, 1 at the end |
| Never | `sensitive` articles, `/ayuda/`, legal pages, author pages, 404 |

## Architecture

```
src/
  config/site.ts          # brand, sections, provinces/editions, helplines, AdSense: single source of truth
  content.config.ts       # collection schemas (frontmatter validation)
  content/                # articles (.mdx + img/) and authors (.json)
  layouts/                # BaseLayout (SEO, masthead, footer, ads script), ArticleLayout, PageLayout
  components/
    seo/                  # meta tags, Open Graph, JSON-LD
    layout/               # HelplineBar, Header (masthead + section nav), Footer, Logo
    article/              # ArticleCard (lead | stack | row | wide | text), byline, reviewer, tags, help box
    home/                 # FrontPage, LatestRail, EssentialGuides, SectionBlock, SectionColumn, NewsletterStrip, EditionsIndex
    ads/AdSlot.astro      # reserved-height ad containers
  lib/                    # content queries, JSON-LD builders, image crops, dates, rehype ads plugin
  pages/                  # routes; folder names are URLs, so they stay in Spanish
    [seccion]/[...page].astro   # paginated section front
    [seccion]/[slug].astro      # one static HTML file per article
    autores/ temas/ edicion/    # author, topic and provincial edition pages
    rss.xml.ts  news-sitemap.xml.ts  robots.txt.ts  ads.txt.ts
public/brand/             # logo and mark (regenerate PNGs with scripts/generate-brand-assets.mjs)
```

**Design**: newspaper grid with hairline column rules (`.ruled`), per-section colour on kickers and rules, Newsreader for headlines and body, Libre Franklin for UI. Light theme only. Home blocks adapt to how many stories each section has, so there are never half-empty blocks.

**SEO**: every article is a standalone static HTML file with its own title, description, canonical, Open Graph image (1200×630 crop of the article photo) and JSON-LD (`NewsArticle`/`Article` with `author`, `reviewedBy`, `lastReviewed`, and 16:9, 4:3 and 1:1 images). Listing pages carry `CollectionPage` + `ItemList`, author pages `ProfilePage`. Thin pages (topics with fewer than 3 articles, editions without local stories) are `noindex` and excluded from the sitemap, which includes `lastmod`. CSS is inlined, fonts are static subsets with only above-the-fold faces preloaded, and there is no JavaScript besides a tiny menu script (and AdSense once enabled).

**Adding a province**: set `active: true` in `PROVINCES` (`src/config/site.ts`) and tag articles with `province: <slug>`.

## Before launch

- Confirm the domain in `astro.config.mjs` (`site`) and `src/config/site.ts`.
- Verify the helplines in `HELPLINES` are current.
- Configure the newsletter provider (`SITE.newsletterAction`).
- Replace the sample content and add reviewers' real licence numbers.
- Register in Google Search Console and Google News Publisher Center; apply for AdSense.
