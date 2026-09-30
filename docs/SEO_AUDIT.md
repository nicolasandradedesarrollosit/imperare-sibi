# SEO audit — 30 September 2026

Scope: the static build (`npm run build`, 58 HTML pages) after adding the first batch of 10 `news` pieces. Every page in `dist/` was checked with a throwaway script (not committed) plus manual review of sitemaps, feeds and structured data.

## Summary

The technical base is solid: every indexable page has a unique title and description, a canonical, one H1, valid JSON-LD, Open Graph images and `lang="es-AR"`. There are no broken internal links. The audit found three real issues, all fixed in `fix(seo): …` (commit `5c2a546`). The pending items are editorial or off-site.

| Area | Status |
| --- | --- |
| Titles (≤60 chars, unique) | ✅ after fix |
| Meta descriptions (70–160, unique) | ✅ after fix (the 404 page is `noindex`, so its short description doesn't matter) |
| Canonical, robots, `lang` | ✅ |
| One H1 per page, no skipped heading levels | ✅ |
| Image `alt` | ✅ Hero images have descriptive alt text. Card thumbnails use an empty `alt` on purpose, because the linked headline next to them already names the story. |
| JSON-LD | ✅ `NewsArticle` for news, `BlogPosting` for guides; headline, 3 image ratios, dates, author, publisher, `reviewedBy` when set |
| Internal links | ✅ 0 broken; every news piece links to 2–4 guides or related news plus `/ayuda/` |
| XML sitemap | ✅ 48 URLs; `noindex` pages (thin topic pages, 404) excluded; `lastmod` from the rendered HTML |
| Google News sitemap | ✅ after fix |
| RSS, `llms.txt` | ✅ include the new pieces |
| Performance | ✅ CSS inlined (0 render-blocking stylesheets); AVIF/WebP with `srcset`; ~68 KB HTML per article |

## Findings and fixes

### 1. Google News sitemap listed evergreen guides (fixed)

`/news-sitemap.xml` included every article published in the last 48 hours, whatever its type. Google News expects only news, and guides such as *Ley de Salud Mental: qué derechos tenés* do not belong there. The sitemap now filters on `type: news` (`src/pages/news-sitemap.xml.ts`). Guides are still in the regular sitemap.

### 2. Topic pages shared their `<title>` with sections (fixed)

`/ansiedad/` and `/temas/ansiedad/` were both titled "Ansiedad: guías y notas". The same was true of Depresión and Vínculos. That is duplicate-title cannibalisation between two different listings. Topic pages are now titled "{Tema}: todas las notas del tema" (`src/pages/temas/[tag].astro`). Their description also no longer claims that every piece was reviewed by licensed professionals, which is not true for news.

### 3. Paginated archive pages duplicated page 1's description (fixed)

`/notas/2/` had the same meta description as `/notas/`. `ListingLayout.astro` now prefixes "Página N de M." on pages after the first. This applies to the archive, sections and topics alike.

## Recommendations (not done)

**Editorial / E-E-A-T**

- **Professional review of the news.** The 10 news pieces have no `reviewer`. The content guide requires review for health content, so a licensed reviewer should read them before promotion, especially the suicide-prevention pieces (`sensitive: true`) and the ones with practical advice (debts and sleep, older adults, betting). Add `reviewer` and `reviewedAt` only after the review actually happens.
- **Real author profiles.** `ana-quiroga` and `lucia-fernandez` are still sample profiles ("Perfil de ejemplo", licence "a completar"). For YMYL content, replace them with real people, real licence numbers and `sameAs` links before launch.
- **News cadence.** Google News and Discover reward regular publishing. Aim for at least 3–5 news pieces a week. Every figure must link to its primary source, as in this batch.
- **Topic threshold.** "Prevención del suicidio" (2 pieces) and "Sueño", "Soledad", "Crianza" are still `noindex` (fewer than 3 articles). One more piece each would turn them into indexable topic hubs.

**Technical**

- Two news heroes (`football-stadium-night`, `buenos-aires-historic-centre`) weigh ~200 KB as 1400w WebP. That is acceptable, because mobile gets the 640w variant, but lowering the hero quality in `ArticleFigure.astro` would help desktop LCP.
- `/temas/` ("Temas | Imperare Sibi", 21 chars) and `/contacto/` have short titles. "Temas de salud mental" would add a keyword. `src/pages/temas/index.astro` had uncommitted redesign work at audit time, so it was left untouched.

**Off-site (pending)**

- Verify the domain in Google Search Console and submit `sitemap-index.xml` and `news-sitemap.xml`.
- Register the publication in Google News Publisher Center.
- Check the News pieces with the Rich Results Test once deployed.

## How to re-run

```sh
npm run build
# then inspect dist/: titles, descriptions, canonicals, H1s, JSON-LD and internal links
```
