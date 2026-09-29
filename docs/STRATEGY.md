# Imperare Sibi: business and editorial strategy

> *Imperare sibi maximum imperium est*: "To rule oneself is the greatest rule" (Seneca).

## 1. Vision

Become Argentina's reference outlet for mental health: rigorous, humane and accessible information, reviewed by licensed professionals, with a presence in every province.

## 2. Problem and opportunity

- Demand for information on anxiety, depression, sleep, grief and relationships keeps growing, but Spanish-language (Rioplatense) supply is fragmented: private-practice blogs, scattered pieces in general newspapers, and content translated from the US that ignores the Argentine health system (obras sociales, prepagas, public hospitals, National Mental Health Law 26.657).
- There is no digital-native, specialised **federal** outlet: coverage is concentrated in Greater Buenos Aires.
- Google treats health as **YMYL** (*Your Money or Your Life*) and rewards sites that demonstrate **E-E-A-T** (experience, expertise, authoritativeness, trust). An outlet with named authors and systematic professional review has a structural advantage over generic blogs.

## 3. Positioning

| Axis | Imperare Sibi |
| --- | --- |
| Tone | Calm, close, no sensationalism or needless jargon |
| Rigour | Every health article has a named author and **review by a licensed professional** (psychology/psychiatry), with a visible review date |
| Local focus | Argentine health system, resources per province, Rioplatense voice |
| Ethics | WHO guidelines for suicide coverage, ads always labelled and excluded from sensitive content, public corrections policy |

**Moat**: a network of professional reviewers + federal coverage + an evergreen archive that compounds SEO authority.

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
| Interviews with specialists | `interview` | Authority, backlinks, professional network |
| Opinion and personal stories | `opinion` | Community, shareability |
| Help resources per province | fixed page | Public service, trust, institutional backlinks (never monetised) |

Launch sections: **Ansiedad**, **Depresión**, **Vínculos**, **Infancias y adolescencias**, **Políticas públicas**, **Bienestar**.

## 6. SEO strategy

- **One stable URL per article**: `/{section}/{slug}/`, no date, so a guide can be updated for years without losing rankings.
- Static HTML per article, CSS inlined, no JavaScript by default: Core Web Vitals in the green (Lighthouse 99–100 on mobile at launch).
- Structured data: `NewsArticle`/`Article` with `author`, `reviewedBy` and `lastReviewed`; `BreadcrumbList`; `CollectionPage` + `ItemList` on listings; `ProfilePage` for authors; `NewsMediaOrganization` with editorial policies.
- Mandatory photo (≥1200px) per article: required for Google Discover and large image previews; 1200×630 social crop generated automatically.
- Sitemap with `lastmod`, **Google News sitemap** (last 48h) and RSS. Thin pages are `noindex` and left out of the sitemap.
- Topic clusters: pillar guides link to satellite pieces and back (tags, section blocks, "Seguí leyendo").
- Complete author pages (bio, licence, links): an E-E-A-T signal.
- Scheduled refresh of the evergreen archive (`updatedAt` → `dateModified`).

## 7. Business model

**Primary revenue: Google AdSense from day one**, run within strict limits so ads never undermine trust or performance:

- Placements: in-article units (after the 2nd paragraph, then every ~400 words, max 3), one desktop rail unit, one horizontal unit on the front page and section fronts, plus anchor/vignette via Auto ads. Research on ad density shows 3–5 units per page outperforms heavier layouts on RPM.
- Every container reserves its height, so ads cause no layout shift (CLS ~0).
- **No ads** on articles about suicide or self-harm (`sensitive`), crisis resources, legal pages or author pages. This is both an ethical line and AdSense policy hygiene for health content.
- AdSense requirements covered: original content, privacy and cookie policy, terms, about and contact pages, `ads.txt`; consent via Google's CMP (Privacy & messaging).
- Growth lever: evergreen guides attract high-intent health queries with strong CPMs; the editorial calendar should prioritise them.

**Stage 2 (months 6–12): directory**
- Directory of professionals and centres by province and speciality.
- Freemium: free basic listing, paid featured listing (monthly subscription).
- Fits the federal expansion and adds recurring revenue less dependent on traffic.

**Stage 3 (year 2): diversification**
- Newsletter sponsorships.
- Sponsored content, **always labelled** (obras sociales, prepagas, wellbeing apps, universities), never in sensitive coverage.
- B2B workplace-wellbeing programmes: content + workshops for companies.
- Online courses and workshops (psychoeducation, mindfulness, parenting).
- Evaluate a premium ad network (Ezoic, Mediavine-type) once traffic qualifies.

## 8. Expanding into a national network

- **One domain, provincial editions** (`/edicion/cordoba/`, `/edicion/mendoza/`…). This concentrates SEO authority; subdomains would split it.
- Each article can carry a `province`; the edition page aggregates local stories, local helplines and (later) the local directory. Editions stay `noindex` until they have their own stories.
- Per edition: a local editor/correspondent plus reviewing professionals from the area.
- Suggested rollout: AMBA → Córdoba → Santa Fe (Rosario) → Mendoza → Tucumán → rest of NOA/NEA/Patagonia.
- Technically, editions, sections and helplines live in configuration (`src/config/site.ts`) and content collections: adding a province requires no component changes.

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
| Quality | % of health articles professionally reviewed (target 100%), average review age |
| Technical | Core Web Vitals in the green, indexed vs published articles |
| Community | Newsletter subscribers, open rate |
| Federal | Provinces with an active edition, local stories per week |

## 11. Technical roadmap

1. ✅ Astro base: front page, sections, articles, authors, topics, editions, technical SEO, AdSense-ready slots.
2. Newsletter provider (Buttondown / Brevo) + form.
3. Static search (Pagefind).
4. Editorial panel (Keystatic or a headless CMS) once there are non-technical writers.
5. Professionals directory (on-demand rendering on Vercel).
6. Analytics-driven "Most read" rail.
