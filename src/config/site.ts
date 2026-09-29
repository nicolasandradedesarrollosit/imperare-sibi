/**
 * Central site configuration. Everything that varies between editions, sections or
 * branding lives here: components and pages read from this file and never hardcode it.
 * User-facing strings are Spanish (es-AR); identifiers are English.
 */

export const SITE = {
  name: 'Imperare Sibi',
  tagline: 'Salud mental en Argentina, con rigor y cercanía.',
  description:
    'Blog de salud mental para toda la Argentina: guías claras, experiencias y novedades revisadas por profesionales. Ansiedad, depresión, vínculos, sueño y más.',
  url: 'https://imperaresibi.com.ar',
  locale: 'es-AR',
  ogLocale: 'es_AR',
  timeZone: 'America/Argentina/Buenos_Aires',
  defaultOgImage: '/og-default.png',
  logo: '/brand/logo.svg',
  logoPng: '/brand/icon-512.png',
  foundingDate: '2026',
  email: 'redaccion@imperaresibi.com.ar',
  social: {
    instagram: 'https://www.instagram.com/imperaresibi',
    x: 'https://x.com/imperaresibi',
    linkedin: 'https://www.linkedin.com/company/imperaresibi',
  },
  twitterHandle: '@imperaresibi',
  /** Health disclaimer shown in the footer of every page and at the end of every article. */
  disclaimer:
    'Este sitio contiene experiencias personales y contenido de divulgación general. No constituye asesoramiento profesional, diagnóstico ni tratamiento psicológico. Si estás pasando por un momento difícil o una crisis, buscá ayuda de un profesional matriculado.',
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
  client: '', // e.g. 'ca-pub-1234567890123456'
  slots: {
    inArticle: '',
    rail: '',
    horizontal: '',
  },
  /** Max in-article units per article, and min words between them. */
  inArticleMax: 3,
  inArticleEveryWords: 400,
} as const;

export const adsEnabled = ADSENSE.client.length > 0;

export const SECTIONS = [
  {
    slug: 'ansiedad',
    name: 'Ansiedad',
    color: '#2f5d46',
    description:
      'Qué es la ansiedad, cómo se manifiesta y qué tratamientos existen. Guías y notas revisadas por profesionales de la salud mental.',
  },
  {
    slug: 'depresion',
    name: 'Depresión',
    color: '#34467a',
    description:
      'Información confiable sobre depresión: síntomas, diagnóstico, tratamientos y cómo acompañar a alguien que la atraviesa.',
  },
  {
    slug: 'vinculos',
    name: 'Vínculos',
    color: '#9c3f22',
    description:
      'Pareja, familia, amistades y trabajo: cómo los vínculos impactan en nuestra salud mental y qué hacer para cuidarlos, con guías revisadas.',
  },
  {
    slug: 'infancias-y-adolescencias',
    name: 'Infancias y adolescencias',
    color: '#7a5200',
    description:
      'Salud mental de niñas, niños y adolescentes: crianza, escuela, redes sociales y señales de alerta, con guías para familias revisadas por profesionales.',
  },
  {
    slug: 'politicas-publicas',
    name: 'Políticas públicas',
    color: '#6a2c5a',
    description:
      'Ley de Salud Mental, obras sociales, prepagas y sistema público: actualidad y análisis sobre el acceso a la salud mental en Argentina.',
  },
  {
    slug: 'bienestar',
    name: 'Bienestar',
    color: '#1c6269',
    description:
      'Sueño, hábitos, estrés y autocuidado: herramientas simples y basadas en evidencia para sentirte mejor en el día a día, revisadas por profesionales.',
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
