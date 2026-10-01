# Content guide: writing a new article

This is the brief for anyone (human or LLM) who writes an article for Imperare Sibi. Follow it step by step. The site is a Spanish-language (Argentina) mental-health blog for readers anywhere in the country; articles are MDX files validated at build time.

If you are an LLM: read this whole file before writing, copy `src/content/articles/_template.mdx`, and finish only when `npm run check && npm run build` pass.

---

## 1. Workflow

1. **Pick the topic and search intent.** Write down the main query a reader would type into Google (e.g. `qué es un ataque de pánico`, `psicólogo por obra social`). One article = one main intent. Check `src/content/articles/` so you don't duplicate an existing piece; if one exists, update it instead (set `updatedAt`).
2. **Research.** Use authoritative sources only: WHO/OPS, Argentina's Ministerio de Salud, Ley 26.657 and its regulations, Superintendencia de Servicios de Salud, peer-reviewed literature, professional associations. Keep the URLs; you will cite 1–2 of them in the text.
3. **Get a photo.** See [§6](#6-images).
4. **Create the file** `src/content/articles/<slug>.mdx` from the template. The file name is the URL slug.
5. **Write** following [§3](#3-voice-and-style) and [§4](#4-structure-by-type).
6. **Run the SEO checklist** ([§5](#5-seo-checklist)) and the safety checklist ([§7](#7-safety-and-ethics)).
7. **Validate**: `npm run check && npm run build`. Fix every error. Optionally `npm run dev` and open the article.
8. **Publish and follow up**: remove `draft`, push to `main`, then run the post-publication checklist in [`PUBLISHING.md`](PUBLISHING.md).

## 2. Frontmatter reference

```yaml
---
title: 'Ataque de pánico: qué es, cómo reconocerlo y qué hacer en el momento'
seoTitle: 'Ataque de pánico: qué es y qué hacer' # optional
description: 'Un ataque de pánico puede sentirse como una emergencia, pero pasa. Cómo distinguirlo, qué ayuda mientras ocurre y cuándo consultar.'
section: ansiedad
type: guide
tags: ['Ansiedad', 'Pánico', 'Síntomas']
publishedAt: 2026-09-23T11:00:00-03:00
updatedAt: 2026-10-10 # optional
image: ./img/man-head-hands.jpg
imageAlt: 'Un hombre sentado en un sillón se cubre la cara con las manos'
imageCredit: 'Foto: Nik Shuliahin / Unsplash'
featured: false # optional
sensitive: false # optional
draft: false # optional
---
```

| Field | Required | Rules |
| --- | --- | --- |
| `title` | yes | ≤110 chars. Headline (H1). Contains the main keyword, ideally at the start. Sentence case, no clickbait, no final period. |
| `seoTitle` | no | ≤60 chars. Use it when `title` is longer than ~60 so Google does not truncate it. The site appends ` \| Imperare Sibi`. |
| `description` | yes | 70–160 chars (aim 140–160). Standfirst and meta description. Says what the reader gets; includes the keyword naturally. |
| `section` | yes | One of `ansiedad`, `depresion`, `vinculos`, `infancias-y-adolescencias`, `politicas-publicas`, `bienestar`. |
| `type` | yes | `guide` (evergreen explainer), `news` (time-bound), `opinion` (unsigned editorial reflection). `interview` exists in the schema but is not used: the blog names no people. |
| `tags` | yes | 2–4 tags, Title Case in Spanish. **Reuse existing tags** (see `/temas/` or grep the articles) so topic pages grow; create a new tag only for a genuinely new theme. |
| `publishedAt` | yes | ISO date-time with Argentina offset: `2026-10-01T09:00:00-03:00`. |
| `updatedAt` | no | Set it whenever you materially update an article (it becomes `dateModified`). |
| `image` | yes | Relative path `./img/<file>.jpg`, landscape, **≥1200px wide** (the build fails otherwise). |
| `imageAlt` | yes | ≥10 chars. Literal description of the photo in Spanish; also shown as the caption. |
| `imageCredit` | yes in practice | `'Foto: <Author> / Unsplash'`. |
| `featured` | no | `true` makes it a candidate for the front-page lead. Only one or two at a time. |
| `sensitive` | no | `true` for suicide, self-harm or crisis-focused pieces: helplines appear first and **no ads are shown**. |
| `draft` | no | `true` keeps it out of production builds. |

## 3. Voice and style

- **Language**: Spanish from Argentina, with *voseo* (`podés`, `tenés`, `consultá`). Neutral, inclusive wording where it reads naturally ("personas", "quien consulta"); avoid "@" or "x" endings.
- **Tone**: calm, warm and precise. Explain without lecturing. Never alarmist, never minimising. No sensational verbs ("devastador", "epidemia") unless quoted from a source.
- **Audience**: an adult reader anywhere in Argentina with no clinical training. Define every technical term the first time it appears.
- **Scope**: national. Refer to resources available across the country (public hospitals, centros de atención primaria, obras sociales/prepagas, national helplines). Do not centre one city.
- **Stigma-free language**: "persona con depresión", not "depresivo"; "murió por suicidio", never "cometió suicidio"; no "loco", "esquizo", "bipolar" as adjectives.
- **Sentences**: short to medium, one idea per paragraph (2–4 sentences). Paragraphs are rendered book-style (indented), so do not add blank-line tricks or manual indentation.
- **Formatting**: `##` for main sections, `###` sparingly. Bulleted lists for symptoms, steps or options. **Bold** only for the key phrase of a list item. No emojis, no H1 in the body (the title is the H1), no images inside the body unless essential.

## 4. Structure by type

**Guide** (`type: guide`, 900–1,500 words): the backbone of the site and of search traffic.
1. Opening paragraph (no heading): answer the main question in 2–3 sentences, with the keyword.
2. 4–7 `##` sections phrased as the questions people search: "Qué es…", "Cómo se manifiesta", "Cuándo es un problema", "Qué ayuda", "Cómo acompañar", "Cuándo consultar".
3. A `##` near the end about when and where to seek professional help.
4. Close by linking to `/ayuda/` or a related guide.

**News** (`type: news`, 400–800 words): what happened, why it matters for readers' mental health or access to care, what changes for them, source link. Use only verifiable, dated facts.

**Opinion** (`type: opinion`, 600–1,000 words): an unsigned editorial reflection in the first person plural ("nos enseñaron…"); clearly a point of view; no personal anecdotes that could identify the writer; no clinical advice; end with a pointer to professional help.

Every article: a `##` roughly every 150–300 words, so readers can scan it and the in-article ads have natural breakpoints (the ad plugin only inserts ads between paragraphs or before a heading).

## 5. SEO checklist

- [ ] One main keyword, present in: `title` (preferably first words), `description`, the slug, the first paragraph and at least one `##`.
- [ ] Slug: lowercase, hyphens, no accents or stop-word padding, ≤6 words (`ataque-de-panico-que-hacer`).
- [ ] `seoTitle` ≤60 chars when `title` is longer.
- [ ] `description` 140–160 chars, unique, no quotes that repeat the title verbatim.
- [ ] `##` headings use the phrasing of real searches (related questions, synonyms): "síntomas de…", "cómo ayudar a…", "diferencia entre… y…".
- [ ] 2–4 internal links to other articles or to `/ayuda/`, with descriptive anchor text (never "hacé clic acá"). Use root-relative URLs: `/ansiedad/que-es-la-ansiedad/`.
- [ ] 1–2 outbound links to authoritative sources (WHO, Ministerio de Salud, the law text).
- [ ] 2–4 tags reused from existing ones.
- [ ] Image ≥1200px, descriptive `imageAlt`.
- [ ] If you update an old article, set `updatedAt` and keep the same slug (never rename published slugs).

Everything else (canonical, Open Graph image, JSON-LD, sitemap, RSS, `llms.txt`) is generated automatically.

## 6. Images

1. Search Unsplash (free licence, **not** "Unsplash+"/Getty items). Prefer real, calm, non-stereotyped scenes: no people clutching their heads in despair for every topic, no stock-photo "therapist with clipboard" unless relevant, no identifiable minors in distressing situations.
2. Download a landscape version at 1600–1800px: `https://unsplash.com/photos/<id>/download?w=1800`.
3. Optimise and save it into `src/content/articles/img/`, with an English kebab-case name describing the scene:
   ```sh
   node -e "require('sharp')('in.jpg').resize(1600).jpeg({quality:80,mozjpeg:true}).toFile('src/content/articles/img/woman-reading-park.jpg')"
   ```
4. Set `imageAlt` (what the photo shows, in Spanish) and `imageCredit: 'Foto: <Name> / Unsplash'`.

## 7. Safety and ethics

These rules are not negotiable.

- **The blog is anonymous.** No bylines, no reviewer names, no team bios, no personal social accounts or personal email addresses, anywhere on the site or in structured data. Articles are signed by the organisation (`Organization` in JSON-LD). Never claim a review or credential that did not happen ("revisado por profesionales", licence numbers). The only people named are public figures or institutions quoted from a linked source, and photographers in `imageCredit`.
- **Never invent** statistics, studies, quotes, people, testimonies, case stories, institutions, phone numbers or laws. If you cannot verify a fact, leave it out.
- **No individual clinical advice**: no diagnoses, no medication names with doses, no "stop/start your treatment". Explain options in general terms and refer to professionals.
- **Suicide and self-harm** (follow WHO media guidelines): set `sensitive: true`; never describe methods, locations or means; do not present suicide as a solution or explain it by a single cause; avoid the word "exitoso"; include hope and recovery; the helplines box is added automatically.
- **Minors**: no identifiable details; focus on adults who care for them.
- **Always close** health content with a clear path to professional help (a `##` about when to consult, plus a link to `/ayuda/` or a related guide).
- **Disclaimers** are rendered by the layout; do not add your own.
- **Helpline numbers** live in `src/config/site.ts` (`HELPLINES`). Do not hardcode other numbers in articles without verifying them against an official source.

## 8. Before you finish

```sh
npm run check   # types and frontmatter schema
npm run build   # full site build; fails on missing fields or small images
```

Then report: the file you created, the main keyword, and the internal and external links you added. After it is live, follow [`PUBLISHING.md`](PUBLISHING.md).
