# Imperare Sibi — Estrategia de negocio y editorial

> *Imperare sibi maximum imperium est* — "Gobernarse a uno mismo es el mayor de los gobiernos" (Séneca).

## 1. Visión

Ser el medio de referencia en salud mental de Argentina: información rigurosa, humana y accesible, revisada por profesionales, con presencia en cada provincia.

## 2. Problema y oportunidad

- La demanda de información sobre ansiedad, depresión, sueño, duelo y vínculos crece año a año, pero la oferta en español rioplatense está fragmentada: blogs de consultorios, notas sueltas en diarios generalistas y contenido traducido de EE.UU. que no refleja el sistema de salud argentino (obras sociales, prepagas, hospitales públicos, Ley Nacional de Salud Mental 26.657).
- No existe un medio nativo digital, especializado y **federal**: casi toda la cobertura está centrada en AMBA.
- Google trata la salud como tema **YMYL** (*Your Money or Your Life*): premia a los sitios que demuestran **E-E-A-T** (experiencia, pericia, autoridad y confiabilidad). Un medio con autores identificados y revisión profesional sistemática tiene una ventaja estructural frente a blogs genéricos.

## 3. Posicionamiento

| Eje | Imperare Sibi |
| --- | --- |
| Tono | Sereno, cercano, sin sensacionalismo ni jerga innecesaria |
| Rigor | Toda nota de salud tiene autor identificado y **revisión de un profesional matriculado** (psicología / psiquiatría), con fecha de revisión visible |
| Localía | Sistema de salud argentino, recursos por provincia, voz rioplatense |
| Ética | Pautas OMS para cobertura de suicidio, publicidad siempre etiquetada, política de correcciones pública |

**Foso competitivo**: red de profesionales revisores + cobertura federal + archivo evergreen que acumula autoridad SEO.

## 4. Audiencias

1. **Público general (25–55)**: busca entender qué le pasa y qué hacer. Entrada principal vía Google.
2. **Familias**: infancias, adolescencias, adultos mayores, cuidadores.
3. **Jóvenes (16–24)**: consumo en redes; foco en formatos cortos que derivan al sitio.
4. **Profesionales de la salud**: actualidad regulatoria, investigación, entrevistas.
5. **Empresas / RR.HH.**: bienestar laboral, burnout, licencias.

## 5. Pilares de contenido

| Pilar | Tipo | Objetivo SEO / negocio |
| --- | --- | --- |
| Guías evergreen ("Qué es la ansiedad", "Cómo acceder a un psicólogo por obra social") | `guia` | Tráfico orgánico de largo plazo; se actualizan, no se reescriben |
| Actualidad (políticas públicas, estudios, sistema de salud) | `noticia` | Google News / Discover, frecuencia de publicación |
| Entrevistas a especialistas | `entrevista` | Autoridad, backlinks, red de profesionales |
| Opinión y testimonios | `opinion` | Comunidad, compartibilidad |
| Recursos de ayuda por provincia | página fija | Utilidad pública, confianza, enlaces entrantes institucionales |

Secciones iniciales: **Ansiedad**, **Depresión**, **Vínculos**, **Infancias y adolescencias**, **Políticas públicas**, **Bienestar**.

## 6. Estrategia SEO (resumen)

- **Una URL estable por nota**: `/{seccion}/{slug}/`, sin fecha, para que una guía pueda actualizarse durante años sin perder posicionamiento.
- HTML estático por nota (Astro), cero JavaScript por defecto → Core Web Vitals en verde.
- Datos estructurados: `NewsArticle` con `author` y `reviewedBy`, `BreadcrumbList`, `Organization`, `Person` para cada autor.
- Sitemap general + **sitemap de Google News** (últimas 48 h) + RSS.
- Clusters temáticos: cada guía pilar enlaza a sus notas satélite y viceversa (enlazado interno por tags y sección).
- Páginas de autor completas (bio, matrícula, redes) — señal de E-E-A-T.
- Actualización programada del archivo evergreen (`actualizado` en el frontmatter → `dateModified`).

## 7. Modelo de negocio (por etapas)

**Etapa 1 — Audiencia (meses 0–6)**
- Newsletter semanal como activo propio (no depender de Google ni redes).
- Sin publicidad programática: protege la confianza y la performance.
- Meta: 60+ guías evergreen, 3–5 notas de actualidad por semana.

**Etapa 2 — Directorio (meses 6–12)**
- Directorio de profesionales y centros por provincia y especialidad.
- Freemium: ficha básica gratis, ficha destacada paga (suscripción mensual).
- Encaja con la expansión federal y genera ingresos recurrentes.

**Etapa 3 — Diversificación (año 2)**
- Contenido patrocinado **siempre etiquetado** (obras sociales, prepagas, apps de bienestar, universidades).
- Programas B2B de bienestar laboral: contenidos + talleres para empresas.
- Cursos y talleres online (psicoeducación, mindfulness, crianza).
- Publicidad programática selectiva, **excluida** de notas sobre suicidio, autolesiones y crisis.

## 8. Expansión como cadena nacional

- **Un solo dominio, ediciones por provincia** (`/edicion/cordoba/`, `/edicion/mendoza/`…). Concentra la autoridad SEO; los subdominios la dividen.
- Cada nota puede tener una `provincia`; la edición provincial agrega noticias locales, recursos de ayuda locales y el directorio de esa provincia.
- Por cada edición: un editor/a o corresponsal local + profesionales revisores de la zona.
- Orden sugerido: AMBA → Córdoba → Santa Fe (Rosario) → Mendoza → Tucumán → resto del NOA/NEA/Patagonia.
- Técnicamente, las ediciones, secciones y líneas de ayuda viven en configuración (`src/config/site.ts`) y colecciones de contenido: sumar una provincia no requiere tocar componentes.

## 9. Ética, legal y seguridad

- Barra de ayuda permanente con líneas de crisis (verificar vigencia periódicamente).
- Disclaimer: "La información de este sitio no reemplaza la consulta con un profesional".
- Pautas OMS para cobertura de suicidio: no detallar métodos, no romantizar, siempre incluir recursos.
- Ley 26.657 (Salud Mental) y Ley 25.326 (Protección de Datos Personales) para el newsletter y el directorio.
- Política editorial, de correcciones y de publicidad publicadas.

## 10. KPIs

| Área | Métrica |
| --- | --- |
| Audiencia | Sesiones orgánicas, % tráfico de Google News / Discover |
| Calidad | % de notas con revisión profesional (meta 100% en salud), antigüedad media de revisión |
| Técnica | Core Web Vitals en verde, notas indexadas / publicadas |
| Comunidad | Suscriptores al newsletter, tasa de apertura |
| Negocio | Fichas pagas en el directorio, ingresos B2B, CPM de patrocinios |
| Federal | Provincias con edición activa, notas locales por semana |

## 11. Roadmap técnico

1. ✅ Base Astro: home, secciones, notas, autores, tags, ediciones, SEO técnico.
2. Newsletter (Buttondown / Brevo) + formulario.
3. Búsqueda estática (Pagefind).
4. Panel editorial (Keystatic o CMS headless) cuando haya redactores no técnicos.
5. Directorio de profesionales (render on-demand en Vercel).
6. Imágenes OG dinámicas por nota.
