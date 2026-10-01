# Imperare Sibi: business and editorial strategy

A single, national mental-health blog.

> *Imperare sibi maximum imperium est*: "To rule oneself is the greatest rule" (Seneca).

## 1. Vision

Become Argentina's reference mental-health blog: rigorous, humane and accessible writing, with verifiable sources, for readers anywhere in the country. The blog is anonymous: it publishes as a brand, with no named authors, reviewers or team.

## 2. Problem and opportunity

- Demand for information on anxiety, depression, sleep, grief and relationships keeps growing, but Spanish-language (Rioplatense) supply is fragmented: private-practice blogs, scattered pieces in general newspapers, and content translated from the US that ignores the Argentine health system (obras sociales, prepagas, public hospitals, National Mental Health Law 26.657).
- There is no specialised, digital-native publication that speaks to the **whole country**: most coverage is written from and for Greater Buenos Aires.
- Google treats health as **YMYL** (*Your Money or Your Life*) and rewards sites that demonstrate **E-E-A-T** (experience, expertise, authoritativeness, trust). Named authors and professional review are the usual way to show it. This blog is anonymous by decision, so it has to earn trust the other ways: primary sources linked for every claim, a public editorial and corrections policy, visible update dates, and a conservative scope (general information, never individual clinical advice).

## 3. Positioning

| Axis | Imperare Sibi |
| --- | --- |
| Tone | Calm, close, no sensationalism or needless jargon |
| Rigour | Unsigned articles built on linked primary sources (WHO/OPS, Ministerio de Salud, laws, peer-reviewed studies), with visible publication and update dates |
| National focus | Argentine health system, resources available across the country, Rioplatense voice |
| Ethics | WHO guidelines for suicide coverage, ads always labelled and excluded from sensitive content, public corrections policy |

**Moat**: national scope + sourcing discipline + an evergreen archive that compounds SEO authority.

## 4. Audiences

1. **General public (25–55)**: wants to understand what is happening to them and what to do. Main entry point: Google.
2. **Families**: children, teenagers, older adults, carers.
3. **Young people (16–24)**: social-first; short formats that lead back to the site.
4. **Health professionals**: regulation, research, interviews.
5. **Companies / HR**: workplace wellbeing, burnout, leave.

## 5. Content pillars

| Pillar | Type | SEO / business goal |
| --- | --- | --- |
| Evergreen guides ("What is anxiety", "Seeing a psychologist through your obra social") | `guide` | Long-term organic traffic and the highest ad RPM; updated, not rewritten |
| News (public policy, studies, health system) | `news` | Google News / Discover, publishing cadence |
| Editorial reflections | `opinion` | Shareability; the blog voice (unsigned) |
| Help resources (national) | fixed page | Public service, trust, institutional backlinks (never monetised) |

Launch sections: **Ansiedad**, **Depresión**, **Vínculos**, **Infancias y adolescencias**, **Políticas públicas**, **Bienestar**.

## 6. SEO strategy

- **One stable URL per article**: `/{section}/{slug}/`, no date, so a guide can be updated for years without losing rankings.
- Static HTML per article, CSS inlined, no JavaScript by default: Core Web Vitals in the green (Lighthouse 99–100 on mobile at launch).
- Structured data: `BlogPosting`/`NewsArticle` with the organisation as `author`; `BreadcrumbList`; `CollectionPage` + `ItemList` on listings; `Organization` with editorial policies.
- `/llms.txt` and clean, well-structured HTML so AI assistants and AI search can cite the site.
- Mandatory photo (≥1200px) per article: required for Google Discover and large image previews; 1200×630 social crop generated automatically.
- Sitemap with `lastmod`, **Google News sitemap** (last 48h) and RSS. Thin pages are `noindex` and left out of the sitemap.
- Topic clusters: pillar guides link to satellite pieces and back (tags, section blocks, "Seguí leyendo").
- Scheduled refresh of the evergreen archive (`updatedAt` → `dateModified`).

## 7. Business model

**Primary revenue: Google AdSense from day one**, run within strict limits so ads never undermine trust or performance:

- Placements: in-article units (after the 2nd paragraph, then every ~400 words, max 3), one desktop rail unit, one horizontal unit on the front page and section fronts, plus anchor/vignette via Auto ads. Research on ad density shows 3–5 units per page outperforms heavier layouts on RPM.
- Every container reserves its height, so ads cause no layout shift (CLS ~0).
- **No ads** on articles about suicide or self-harm (`sensitive`), crisis resources or legal pages. This is both an ethical line and AdSense policy hygiene for health content.
- AdSense requirements covered: original content, privacy and cookie policy, terms, about and contact pages, `ads.txt`; consent via Google's CMP (Privacy & messaging).
- Growth lever: evergreen guides attract high-intent health queries with strong CPMs; the editorial calendar should prioritise them.

**Stage 2 (months 6–12): directory**
- National directory of professionals and centres by speciality (online and in-person).
- Freemium: free basic listing, paid featured listing (monthly subscription).
- Recurring revenue less dependent on traffic.

**Stage 3 (year 2): diversification**
- Newsletter sponsorships.
- Sponsored content, **always labelled** (obras sociales, prepagas, wellbeing apps, universities), never in sensitive coverage.
- B2B workplace-wellbeing programmes: content + workshops for companies.
- Online courses and workshops (psychoeducation, mindfulness, parenting).
- Evaluate a premium ad network (Ezoic, Mediavine-type) once traffic qualifies.

## 8. One editorial team, national reach

- A single blog with one editorial line and one domain: all authority concentrates on the same URLs.
- Content is written for readers anywhere in Argentina: national helplines, rights that apply across the country (Law 26.657), and resources available in every province (public hospitals, primary-care centres, obras sociales and prepagas).

## 9. Ethics, legal and safety

- Permanent helpline bar (check that numbers are current periodically).
- Disclaimer: the information does not replace a professional consultation.
- WHO suicide-reporting guidelines: no methods, no romanticising, always include resources.
- Law 26.657 (Mental Health) and Law 25.326 (Personal Data Protection) for the newsletter, directory and ad cookies.
- Published editorial, corrections and advertising policies.

## 10. KPIs

| Area | Metric |
| --- | --- |
| Audience | Organic sessions, share of Google News / Discover traffic |
| Monetisation | Page RPM, viewability, ad revenue per article type |
| Quality | % of claims with a linked primary source (target 100%), average age of the last update on guides |
| Technical | Core Web Vitals in the green, indexed vs published articles |
| Community | Newsletter subscribers, open rate |

## 11. Technical roadmap

1. ✅ Astro + Tailwind base: front page, categories, articles, archive, topics, technical SEO, `llms.txt`, AdSense-ready slots, content guide for LLM-assisted writing.
2. Newsletter provider (Buttondown / Brevo) + form.
3. Static search (Pagefind).
4. Editorial panel (Keystatic or a headless CMS) once there are non-technical writers.
5. Professionals directory (on-demand rendering on Vercel).
6. Analytics-driven "Most read" rail.
