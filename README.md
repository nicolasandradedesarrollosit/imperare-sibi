# Imperare Sibi

Mental-health blog for readers across Argentina. Static site built with [Astro](https://astro.build) and Tailwind CSS, optimised for SEO and AdSense.

The reader-facing site is in Spanish (es-AR). Code, comments and documentation are in English.

- Business and editorial strategy: [`docs/STRATEGY.md`](docs/STRATEGY.md)
- **Writing a new article (humans and LLMs): [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md)** + template `src/content/articles/_template.mdx`
- **After an article is live, and the SEO roadmap: [`docs/PUBLISHING.md`](docs/PUBLISHING.md)**

## Development

```sh
npm install
npm run dev      # http://localhost:4321 (ad slots render as dashed placeholders)
npm run check    # type check
npm run build    # astro build + search index (Pagefind) + IndexNow ping on production deploys
npm run preview
```

Requires Node 22.12+. Fonts are fetched from Fontsource at build time (Astro Fonts API).

## Publishing an article

Follow [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md). In short:

1. Add a landscape photo (**≥1200px wide**) to `src/content/articles/img/`.
2. Copy `src/content/articles/_template.mdx` to `src/content/articles/<slug>.mdx` (the file name is the URL: `/{section}/{slug}/`) and fill in the frontmatter; the build fails on missing or invalid fields.
3. Write the body in Markdown/MDX with `##` subheadings (3 or more generate the "En esta nota" index).
4. `npm run check && npm run build`, then commit and push to `main`; Vercel deploys. Sitemap, Google News sitemap, RSS, `llms.txt`, social images and JSON-LD regenerate automatically.

5. Run the post-publication checklist in [`docs/PUBLISHING.md`](docs/PUBLISHING.md).

**The blog is anonymous.** There are no authors, reviewers, team bios or social profiles: articles carry only a date, and structured data names the organisation as author. Do not add people back.

## AdSense

The publisher id is set; ad units stay off until their slot ids are filled in:

1. Set `ADSENSE.client` (`ca-pub-` + 16 digits) and the slot ids in `src/config/site.ts`. The build fails on a malformed client or slot id; a placement whose slot is empty is simply not rendered.
2. Deploy. That enables the AdSense script, the ad units and `/ads.txt`.
3. In the AdSense dashboard: enable Auto ads **only** for anchor and vignette formats (in-page placements are manual), and set up the consent message under *Privacy & messaging*.

Eligibility is decided in one place, `src/lib/ads.ts`: every page passes its `page` kind to `BaseLayout` (`home`, `listing`, `article`, `restricted-article`, `institutional`, `legal`, `crisis`, `error`) and only the kinds listed in `ADSENSE.pageKinds` load AdSense. Articles that are `sensitive`, `noindex` or `draft` become `restricted-article` (no script, no slots, no in-article units).

Placements (each container reserves its height up front to keep CLS at ~0):

| Page | Units |
| --- | --- |
| Front page | 1 horizontal after the featured story |
| Category, archive | 1 horizontal after the lead story |
| Article | in-article units (after the 2nd paragraph, then every ~400 words, max 3; inserted by `src/lib/rehype-in-article-ads.ts`), 1 in the right-margin rail on wide screens (≥88rem), 1 at the end |
| Never | `sensitive` articles, `/ayuda/`, legal and institutional pages, 404 |

## Architecture

```
src/
  config/site.ts          # brand, categories, helplines, disclaimer, AdSense: single source of truth
  content.config.ts       # collection schemas (frontmatter validation)
  content/                # articles (.mdx + img/, _template.mdx)
  styles/index.css        # Tailwind v4: @theme tokens + shared component classes
  layouts/
    BaseLayout.astro      # <head> (SEO, fonts, JSON-LD, AdSense script), masthead, footer
    ArticleLayout.astro   # article page: composes the article/* components
    ListingLayout.astro   # categories, archive and topics: header + listing + pagination + CollectionPage
    PageLayout.astro      # institutional and legal pages
  components/
    ui/                   # generic building blocks: Logo, SectionHeading
    layout/               # Header (centered masthead, live date, category nav), Footer
    seo/                  # meta tags, Open Graph, JSON-LD
    article/              # ArticleCard (featured | stack | row | wide | text), ArticleHeader, ArticleFigure,
                          # TableOfContents, ReadMore, Byline (dateline), TagLinks, Breadcrumbs
    home/                 # EssentialGuides, CategoryGrid, NewsletterStrip
    page/                 # PageHeader, ArticleListing, Pagination
    help/                 # HelplineBar, HelpBox
    ads/AdSlot.astro      # reserved-height ad containers
  lib/
    content.ts            # queries: getArticles, related, readMore, collectTags, URL builders…
    seo.ts                # JSON-LD builders and the crumbs() breadcrumb helper
    ads.ts                # AdSense policy (page kinds, article eligibility, config validation) + <ins> markup
    images.ts             # social/schema image crops
    dates.ts              # es-AR date formatting
    rehype-in-article-ads.ts
  pages/                  # routes; folder names are URLs, so they stay in Spanish
    [seccion]/[...page].astro   # paginated category page
    [seccion]/[slug].astro      # one static HTML file per article
    notas/ temas/               # archive, topic index + topic pages
    ayuda.astro                 # crisis resources (never monetised)
    buscar.astro                # on-site search (Pagefind UI; index built by scripts/build-search.mjs)
    rss.xml.ts  news-sitemap.xml.ts  robots.txt.ts  ads.txt.ts  llms.txt.ts
public/brand/             # logo and mark (regenerate PNGs with scripts/generate-brand-assets.mjs)
public/<key>.txt          # IndexNow ownership key (must match KEY in scripts/indexnow.mjs)
scripts/                  # build-search.mjs (Pagefind index), indexnow.mjs (notify Bing on deploy)
```

**Styling**: Tailwind CSS v4. Design tokens (colours, fonts, widths, type scale) live in `@theme` in `src/styles/index.css`, together with the component classes reused across pages (`.wrap`, `.heading`, `.kicker`, `.meta`, `.link`, `.link-accent`, `.chip`, `.card*`, `.ruled`, `.stacked`, `.btn`, `.ad*`, `.prose`). One-off layout uses Tailwind utilities in the markup. IBM Plex Sans throughout, black on white with a single navy accent; light theme only.

**Live date**: the masthead date is filled in by a tiny inline script in the browser, because a static build would otherwise freeze it on deploy day.

**SEO**: every article is a standalone static HTML file with its own title, description, canonical, Open Graph image (1200×630 crop of the article photo) and JSON-LD (`BlogPosting` or `NewsArticle` with the organisation as `author`, and 16:9, 4:3 and 1:1 images). Listing pages carry `CollectionPage` + `ItemList`. Topic pages with fewer than 3 articles are `noindex` and excluded from the sitemap, which includes `lastmod`. `/llms.txt` gives AI assistants a Markdown map of the site. CSS is inlined, fonts are static subsets with only above-the-fold faces preloaded, and the only JavaScript is the date script, the search box on `/buscar/` and AdSense. Guides carry a `faq` block rendered as "Preguntas frecuentes" with `FAQPage` markup, and `WebSite` declares a `SearchAction` pointing at `/buscar/`.

## Operations

- The canonical host is `https://www.imperaresibi.com` (`SITE.url`); the apex redirects to it on Vercel. Every canonical, sitemap and feed URL derives from that value.
- `SITE.email` must be a generic mailbox on the site domain, never a personal address.
- Verify the helplines in `HELPLINES` periodically.
- Pending set-up and the recurring SEO routine: [`docs/PUBLISHING.md`](docs/PUBLISHING.md).
