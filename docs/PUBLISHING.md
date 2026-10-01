# After publishing: checklist and SEO routine

What to do once an article is live, the recurring SEO work, and the SEO additions still worth making. Writing the article itself is covered in [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md).

Scope: search visibility only. No analytics, monitoring or observability tooling is part of this routine; the only data sources are the free consoles of the search engines themselves.

Site facts used below:

- Canonical host: `https://www.imperaresibi.com` (the apex redirects to it).
- Sitemaps: `/sitemap-index.xml` (everything indexable) and `/news-sitemap.xml` (`type: news` from the last 48 hours).
- Feeds: `/rss.xml`, `/llms.txt`.
- Publishing = pushing to `main`. Vercel builds and deploys; sitemaps, feeds, social images and JSON-LD regenerate on every build.

---

## 1. Right after the deploy (10 minutes)

Do this for every new article, in order.

1. **Open the live URL** (`https://www.imperaresibi.com/{section}/{slug}/`) on a phone and on desktop. Check the headline, the photo, the table of contents and that every link in the body works.
2. **Confirm it is anonymous.** No name under the headline, only the date and reading time. If a name appears anywhere other than the photo credit or a quoted public source, fix it before anything else.
3. **Check the listings.** The article should appear on the front page or its section page, in `/notas/`, and on its topic pages (`/temas/...`).
4. **Check the sitemap.** Open `/sitemap-index.xml` and find the URL in `sitemap-0.xml`. For `type: news`, also find it in `/news-sitemap.xml`. If it is missing, the article is probably still `draft: true` or `noindex: true`.
5. **Request indexing in Google Search Console.** URL Inspection → paste the URL → *Request indexing*. There is a daily quota of roughly ten requests, so use it for new articles and materially updated ones, not for every page.
6. **Validate the structured data** the first time you use a new article type or change a layout: paste the URL into the [Rich Results Test](https://search.google.com/test/rich-results). It should detect one `Article` item and one `Breadcrumbs` item with no errors.
7. **Check the social preview** when you plan to share it: paste the URL into a WhatsApp chat with yourself, or into [opengraph.xyz](https://www.opengraph.xyz/). It should show the 1200×630 crop of the article photo, the title and the standfirst.
8. **Add inbound links.** A new article with no internal links pointing at it is slow to be crawled and ranks poorly. Edit two or three older, related articles and link to the new one with descriptive anchor text. Set `updatedAt` on an older article only if you also changed its substance.

## 2. Within the first week

- **Search Console → URL Inspection** on the article: confirm "URL is on Google". If it says *Discovered – currently not indexed* or *Crawled – currently not indexed* after a week, the usual causes are too few internal links, content too thin, or too close to an existing article. Add links, expand the piece, or merge it into the older one.
- **Search Console → Performance**, filtered to the page: look at the queries it shows for. If the queries are not the keyword you wrote for, adjust `seoTitle` and `description` towards what people actually search, and add an `##` section answering the strongest unexpected query.
- **Topic pages.** A topic becomes indexable at three articles (`MIN_ARTICLES_TO_INDEX_TAG` in `src/lib/content.ts`). If the new article took a tag to three, check that `/temas/<tag>/` is now in the sitemap.

## 3. Monthly routine (30–45 minutes)

Everything here is in Search Console.

| Report | What to look for | What to do |
| --- | --- | --- |
| **Pages** (Indexing) | Growth in *Not indexed*; the reasons listed | *Not found (404)*: fix the internal link or add a redirect in `vercel.json`. *Duplicate without user-selected canonical*: two articles compete, merge them. *Crawled – currently not indexed*: improve or merge. |
| **Sitemaps** | Both sitemaps read as *Success*, with a recent read date | Resubmit if the status is an error. |
| **Performance → Queries** | Queries at position 8–20 with many impressions | These are the cheapest wins: strengthen the article that ranks (clearer answer in the first paragraph, a section matching the query, more internal links). |
| **Performance → Pages** | Pages with many impressions and click-through under ~1% | Rewrite `seoTitle` and `description`: put the keyword first and say what the reader gets. |
| **Performance → Pages** | Articles whose clicks fell for two months in a row | Refresh: update figures and sources, set `updatedAt`. |
| **Core Web Vitals / HTTPS** | Any URL not *Good* | Usually a heavy hero image; re-export it per the content guide. |
| **Manual actions / Security** | Should be empty | Act immediately if not. |
| **Links** | New external sites linking in; top linked pages | Note which kinds of article attract links and write more of them. |

Also once a month:

- **Refresh two or three evergreen guides.** Update data, check that every outbound link still resolves, set `updatedAt`. Never change a published slug: the URL is what holds the ranking.
- **Check the helplines** in `src/config/site.ts` against the official sources.
- **Read the AdSense policy centre** for any page-level restriction. Sensitive articles already carry no ads; a flag on a normal article usually means it should be marked `sensitive: true`.

## 4. Rules that protect rankings

- **Never rename or delete a published URL.** If an article must go, add a permanent redirect to the closest article in `vercel.json` (`redirects`).
- **One article per search intent.** Before writing, search the existing articles. Two pieces on the same query split the ranking between them.
- **Keep the news cadence regular.** A few news pieces every week does more for Google News and Discover than a burst followed by silence.
- **Every figure links to its primary source.** For an anonymous health site this is the main trust signal, for readers and for search engines.
- **Do not publish thin pages.** Under ~400 words for news or ~900 for a guide, expand it or fold it into another article.
- **Do not add claims of professional review, credentials or authorship.** See the anonymity rule in the content guide.

## 5. One-time set-up

Done:

- [x] Google AdSense publisher id (`ADSENSE.client`) and `/ads.txt`.
- [x] Google Search Console domain property for `imperaresibi.com` (DNS CNAME in Cloudflare).

Still to do, roughly in order of value:

- [ ] **Submit both sitemaps in Search Console**: Sitemaps → add `https://www.imperaresibi.com/sitemap-index.xml` and `https://www.imperaresibi.com/news-sitemap.xml`.
- [ ] **Create the contact mailbox.** `SITE.email` is `contacto@imperaresibi.com`. In Cloudflare: Email → Email Routing → route `contacto@` to a private inbox. The address is published on the contact, privacy and terms pages, and AdSense expects a working contact. To stay anonymous, reply from an account that does not show a personal name or address.
- [ ] **Bing Webmaster Tools.** Sign in at bing.com/webmasters and use *Import from Google Search Console*: it copies the verification and the sitemaps in one step. Bing's index also feeds DuckDuckGo, Yahoo and the search used by ChatGPT and Copilot, so it is worth the five minutes.
- [ ] **Google News Publisher Center.** Create the publication at publishercenter.google.com with the site URL, the logo (`public/brand/`) and the sections mapped to the section URLs. It is not required to appear in Google News, but it controls how the publication is named and presented there.
- [ ] **AdSense slot ids.** Create the three units (in-article, rail, horizontal) and fill `ADSENSE.slots` in `src/config/site.ts`. Until then only Auto ads can serve.
- [ ] **AdSense consent message.** Privacy & messaging → create the consent message, so ads comply for visitors from regions that require it.

## 6. SEO additions worth making

Ranked by expected return. None of them needs analytics or monitoring.

1. **IndexNow.** A key file in `public/` plus one request on deploy tells Bing, Yandex and the engines that share their index about new and updated URLs within minutes, instead of waiting for a crawl. Google does not use it, so the manual *Request indexing* step in §1 stays.
2. **FAQ sections on guides, with `FAQPage` markup.** End each guide with three to five short questions and answers taken from Search Console queries and Google's "People also ask". Google rarely shows FAQ rich results any more, but the question-and-answer format is what AI answers and featured snippets quote.
3. **Static search (Pagefind).** On-site search keeps readers on the site and lets the `WebSite` schema declare a `SearchAction`.
4. **More articles per topic.** Several topics sit below the three-article threshold and are `noindex`. One more piece each ("Prevención del suicidio", "Sueño", "Soledad", "Crianza") turns them into indexable hub pages.
5. **Backlinks.** The biggest lever left, and it cannot be automated. The assets most likely to earn links are the help-resources page (`/ayuda/`) and the practical guides on rights and coverage: universities, schools, NGOs, municipal sites and local media link to pages like these when asked. Outreach must go out from the generic mailbox, never a personal one.
6. **Newsletter.** `SITE.newsletterAction` is empty, so the form is off. A provider (Buttondown, Brevo) gives returning traffic that does not depend on Google.
7. **A brand profile on one social network**, only if it can be run under the blog's name with no personal account attached. Then list it in `Organization.sameAs` in `src/lib/seo.ts`. It is a minor signal; skip it if it puts the anonymity at risk.

Not worth doing: `meta keywords`, submitting to link directories, buying links, AMP, or generating many near-identical pages for keyword variants.

## 7. Keeping the blog anonymous

The site itself names no one. These are the places outside the page content where an identity can still leak:

- **The Git repository.** Commit history carries the committer's name and email, and the repository lives under a personal GitHub account. If it is public, anyone can connect the blog to that account. Keep the repository private.
- **The AdSense publisher id.** It appears in `/ads.txt` and in the page source. Using the same id on another site that does identify its owner links the two.
- **Email.** Replies sent from a personal inbox reveal it, even when the message arrived through the routed address.
- **Domain registration.** Keep WHOIS privacy on at the registrar.
- **Image metadata.** Photos you take yourself can carry EXIF data (device, location). The build re-encodes images, which normally drops it, but use stock photos or strip the metadata first.
- **Outreach and social accounts.** Anything done on behalf of the blog must come from accounts created for it.

One cost to be aware of: health content is the category where search engines weigh author identity and credentials most, and an anonymous site gives that up. Sourcing discipline, the editorial policy and regular updates are what compensate for it.
