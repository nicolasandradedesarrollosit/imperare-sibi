/**
 * Central site configuration. Everything that varies between editions, sections or
 * branding lives here: components and pages read from this file and never hardcode it.
 * User-facing strings are Spanish (es-AR); identifiers are English.
 */

export const SITE = {
  name: 'Imperare Sibi',
  tagline: 'Información sobre salud mental en Argentina, con fuentes verificables.',
  description:
    'Blog de salud mental para toda la Argentina: guías claras y novedades con fuentes verificables. Ansiedad, depresión, vínculos, sueño y más.',
  url: 'https://www.imperaresibi.com',
  locale: 'es-AR',
  ogLocale: 'es_AR',
  timeZone: 'America/Argentina/Buenos_Aires',
  defaultOgImage: '/og-default.png',
  logo: '/brand/logo.svg',
  logoPng: '/brand/icon-512.png',
  foundingDate: '2026',
  /** Generic mailbox on the site's own domain. The blog is anonymous: never a personal address. */
  email: 'contacto@imperaresibi.com',
  /** Health disclaimer shown in the footer of every page and at the end of every article. */
  disclaimer:
    'Este sitio contiene contenido de divulgación general. No constituye asesoramiento profesional, diagnóstico ni tratamiento psicológico. Si estás pasando por un momento difícil o una crisis, buscá ayuda de un profesional matriculado.',
  /** Newsletter provider endpoint (Buttondown, Brevo…). Empty = form disabled. */
  newsletterAction: '',
  /** Articles per page on section and topic listings. */
  pageSize: 12,
} as const;

/**
 * Google AdSense. Leave `client` empty until the account is approved: no ad code is
 * emitted in production (dev shows dashed placeholders to review the layout).
 * Slot ids come from AdSense → Ads → By ad unit.
 */
export const ADSENSE = {
  client: 'ca-pub-7493753362093860',
  slots: {
    inArticle: '',
    rail: '',
    horizontal: '',
  },
  /** Max in-article units per article, and min words between them. */
  inArticleMax: 3,
  inArticleEveryWords: 400,
  /**
   * Page kinds that may carry ads (see PageKind in src/lib/ads.ts). Crisis resources,
   * legal and institutional pages, errors and restricted articles
   * (sensitive, noindex, draft) never do.
   */
  pageKinds: ['home', 'listing', 'article'],
} as const;

export const SECTIONS = [
  {
    slug: 'ansiedad',
    name: 'Ansiedad',
    description:
      'Qué es la ansiedad, cómo se manifiesta y qué tratamientos existen. Guías y notas claras, con fuentes verificables.',
  },
  {
    slug: 'depresion',
    name: 'Depresión',
    description:
      'Información confiable sobre depresión: síntomas, diagnóstico, tratamientos y cómo acompañar a alguien que la atraviesa.',
  },
  {
    slug: 'vinculos',
    name: 'Vínculos',
    description:
      'Pareja, familia, amistades y trabajo: cómo los vínculos impactan en nuestra salud mental y qué hacer para cuidarlos, con guías claras.',
  },
  {
    slug: 'infancias-y-adolescencias',
    name: 'Infancias y adolescencias',
    description:
      'Salud mental de niñas, niños y adolescentes: crianza, escuela, redes sociales y señales de alerta, con guías claras para familias.',
  },
  {
    slug: 'politicas-publicas',
    name: 'Políticas públicas',
    description:
      'Ley de Salud Mental, obras sociales, prepagas y sistema público: actualidad y análisis sobre el acceso a la salud mental en Argentina.',
  },
  {
    slug: 'bienestar',
    name: 'Bienestar',
    description:
      'Sueño, hábitos, estrés y autocuidado: herramientas simples y basadas en evidencia para sentirte mejor en el día a día.',
  },
] as const;

export type Section = (typeof SECTIONS)[number];
export type SectionSlug = Section['slug'];
export const SECTION_SLUGS = SECTIONS.map((s) => s.slug) as [SectionSlug, ...SectionSlug[]];

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export const ARTICLE_TYPES = ['news', 'guide', 'interview', 'opinion'] as const;
export type ArticleType = (typeof ARTICLE_TYPES)[number];
export const TYPE_LABEL: Record<ArticleType, string> = {
  news: 'Noticia',
  guide: 'Guía',
  interview: 'Entrevista',
  opinion: 'Opinión',
};

/**
 * Crisis helplines. IMPORTANT: verify they are current before every launch/review.
 * `tel` holds digits only; use the derived `href` for links.
 */
const HELPLINE_DATA = [
  {
    name: 'Centro de Asistencia al Suicida',
    number: '135',
    tel: '135',
    detail: 'Gratuita desde CABA y Gran Buenos Aires, las 24 horas',
    kind: 'line',
  },
  {
    name: 'Centro de Asistencia al Suicida (todo el país)',
    number: '0800 345 1435',
    tel: '08003451435',
    detail: 'Gratuita desde cualquier lugar del país, las 24 horas',
    kind: 'line',
  },
  {
    name: 'Emergencias',
    number: '107 / 911',
    tel: '911',
    detail: 'Si hay riesgo inmediato para vos o para otra persona',
    kind: 'emergency',
  },
] as const;

export const HELPLINES = HELPLINE_DATA.map((line) => ({ ...line, href: `tel:${line.tel}` }));
export type Helpline = (typeof HELPLINES)[number];
export const HELPLINE_LINES = HELPLINES.filter((l) => l.kind === 'line');
export const EMERGENCY = HELPLINES.find((l) => l.kind === 'emergency')!;

export const INSTITUTIONAL_NAV = [
  { href: '/notas/', label: 'Todas las notas' },
  { href: '/temas/', label: 'Temas' },
  { href: '/sobre-nosotros/', label: 'Sobre nosotros' },
  { href: '/politica-editorial/', label: 'Política editorial' },
  { href: '/contacto/', label: 'Contacto' },
] as const;

export const LEGAL_NAV = [
  { href: '/privacidad/', label: 'Privacidad y cookies' },
  { href: '/terminos/', label: 'Términos de uso' },
] as const;
