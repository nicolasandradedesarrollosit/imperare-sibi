# Imperare Sibi

Medio digital de salud mental en Argentina. Sitio estático con [Astro](https://astro.build), optimizado para SEO y preparado para crecer como cadena nacional con ediciones provinciales.

- Estrategia de negocio y editorial: [`docs/ESTRATEGIA.md`](docs/ESTRATEGIA.md)

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # chequeo de tipos
npm run build    # genera dist/ y .vercel/output
npm run preview
```

Requiere Node 22.12 o superior.

## Publicar una nota

1. Crear `src/content/articulos/<slug>.mdx`. El nombre del archivo es la URL: `/{seccion}/{slug}/`.
2. Completar el frontmatter (el build falla si falta algo o si un valor es inválido):

```yaml
---
title: 'Titular de la nota (máx. 110 caracteres)'
seoTitle: 'Título corto para Google (opcional, máx. 65)'
description: 'Bajada: 120–160 caracteres. Se usa como meta description.'
seccion: ansiedad # ansiedad | depresion | vinculos | infancias-y-adolescencias | politicas-publicas | bienestar
tipo: guia # noticia | guia | entrevista | opinion
tags: ['Ansiedad', 'Tratamiento']
provincia: cordoba # opcional: la nota también aparece en /edicion/cordoba/
autor: lucia-fernandez # id de src/content/autores/
revisor: ana-quiroga # profesional que revisó la nota (recomendado en notas de salud)
revisadoEl: 2026-09-25
publicado: 2026-09-28T09:00:00-03:00
actualizado: 2026-10-10 # opcional: se publica como dateModified
imagen: ./img/foto.jpg # opcional, ruta relativa; Astro la optimiza a AVIF
imagenAlt: 'Descripción de la imagen'
destacado: true # opcional: candidata a la nota principal de la home
sensible: true # opcional: suicidio/autolesiones, muestra recursos de ayuda arriba
draft: true # opcional: no se publica en producción
---
```

3. Escribir el cuerpo en Markdown/MDX. Usá subtítulos `##`: con 3 o más se genera el índice "En esta nota".
4. Commit + push a `main` y Vercel despliega. El sitemap, el sitemap de Google News, el RSS y el JSON-LD se regeneran solos.

Autores: un JSON por persona en `src/content/autores/` (nombre, rol, bio, credenciales, redes). Las páginas de autor son clave para el E-E-A-T.

> Las notas y los autores incluidos son **de ejemplo**. Reemplazalos por contenido real antes del lanzamiento.

## Arquitectura

```
src/
  config/site.ts          # marca, secciones, provincias/ediciones, líneas de ayuda: fuente única de verdad
  content.config.ts       # schemas de colecciones (validación del frontmatter)
  content/                # notas (.mdx) y autores (.json)
  layouts/                # BaseLayout (SEO + header/footer), ArticleLayout, PageLayout
  components/
    seo/                  # meta tags, Open Graph, JSON-LD
    layout/               # Header, Footer, CrisisBar, Logo
    article/              # tarjetas, byline, revisión profesional, tags, relacionadas
    home/                 # bloques de la portada
  lib/                    # queries de contenido, builders de JSON-LD, fechas
  pages/
    index.astro
    [seccion]/[...page].astro   # portada de sección paginada
    [seccion]/[slug].astro      # un HTML estático por nota
    autores/  tags/  edicion/   # páginas de autor, tema y edición provincial
    rss.xml.ts  news-sitemap.xml.ts  robots.txt.ts
public/brand/             # logo, isotipo e íconos (regenerar PNG con scripts/generate-brand-assets.mjs)
```

**SEO**: cada nota se genera como un HTML estático independiente, con title, description, canonical, Open Graph, `NewsArticle`/`Article` + `BreadcrumbList` en JSON-LD, autor y revisor (`reviewedBy`). No se envía JavaScript por defecto. Las páginas con poco contenido (tags con menos de 3 notas, ediciones sin notas locales) van con `noindex` y quedan fuera del sitemap.

**Sumar una provincia**: poner `activa: true` en `PROVINCIAS` (`src/config/site.ts`) y cargar notas con `provincia: <slug>`.

## Pendientes antes del lanzamiento

- Confirmar el dominio en `astro.config.mjs` (`site`) y en `src/config/site.ts`.
- Verificar la vigencia de las líneas de ayuda en `LINEAS_AYUDA`.
- Configurar el proveedor de newsletter (`SITE.newsletterAction`).
- Reemplazar el contenido de ejemplo y cargar las matrículas reales de los revisores.
- Dar de alta el sitio en Google Search Console y en Google News Publisher Center.
