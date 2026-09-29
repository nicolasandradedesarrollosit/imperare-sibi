/**
 * Central site configuration. Everything that varies between editions, sections or
 * branding lives here: components and pages read from this file and never hardcode it.
 * User-facing strings are Spanish (es-AR); identifiers are English.
 */

export const SITE = {
  name: 'Imperare Sibi',
  tagline: 'Salud mental en Argentina, con rigor y cercanía.',
  description:
    'Medio especializado en salud mental en Argentina: guías, noticias y entrevistas revisadas por profesionales. Ansiedad, depresión, vínculos, infancias y políticas públicas.',
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
    description: 'Pareja, familia, amistades y trabajo: cómo los vínculos impactan en nuestra salud mental.',
  },
  {
    slug: 'infancias-y-adolescencias',
    name: 'Infancias y adolescencias',
    color: '#7a5200',
    description:
      'Salud mental de niñas, niños y adolescentes: crianza, escuela, redes sociales y señales de alerta.',
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
    description: 'Sueño, hábitos, estrés y autocuidado: herramientas basadas en evidencia para el día a día.',
  },
] as const;

export type Section = (typeof SECTIONS)[number];
export type SectionSlug = Section['slug'];
export const SECTION_SLUGS = SECTIONS.map((s) => s.slug) as [SectionSlug, ...SectionSlug[]];

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

/**
 * Provincial editions. `active: true` generates /edicion/{slug}/.
 * Adding a province to the network = activate it here and tag articles with `province`.
 */
export const PROVINCES = [
  { slug: 'caba', name: 'Ciudad de Buenos Aires', region: 'AMBA', active: true },
  { slug: 'buenos-aires', name: 'Buenos Aires', region: 'AMBA', active: true },
  { slug: 'cordoba', name: 'Córdoba', region: 'Centro', active: true },
  { slug: 'santa-fe', name: 'Santa Fe', region: 'Centro', active: true },
  { slug: 'entre-rios', name: 'Entre Ríos', region: 'Centro', active: false },
  { slug: 'la-pampa', name: 'La Pampa', region: 'Centro', active: false },
  { slug: 'mendoza', name: 'Mendoza', region: 'Cuyo', active: true },
  { slug: 'san-juan', name: 'San Juan', region: 'Cuyo', active: false },
  { slug: 'san-luis', name: 'San Luis', region: 'Cuyo', active: false },
  { slug: 'tucuman', name: 'Tucumán', region: 'NOA', active: false },
  { slug: 'salta', name: 'Salta', region: 'NOA', active: false },
  { slug: 'jujuy', name: 'Jujuy', region: 'NOA', active: false },
  { slug: 'catamarca', name: 'Catamarca', region: 'NOA', active: false },
  { slug: 'la-rioja', name: 'La Rioja', region: 'NOA', active: false },
  { slug: 'santiago-del-estero', name: 'Santiago del Estero', region: 'NOA', active: false },
  { slug: 'misiones', name: 'Misiones', region: 'NEA', active: false },
  { slug: 'corrientes', name: 'Corrientes', region: 'NEA', active: false },
  { slug: 'chaco', name: 'Chaco', region: 'NEA', active: false },
  { slug: 'formosa', name: 'Formosa', region: 'NEA', active: false },
  { slug: 'neuquen', name: 'Neuquén', region: 'Patagonia', active: false },
  { slug: 'rio-negro', name: 'Río Negro', region: 'Patagonia', active: false },
  { slug: 'chubut', name: 'Chubut', region: 'Patagonia', active: false },
  { slug: 'santa-cruz', name: 'Santa Cruz', region: 'Patagonia', active: false },
  { slug: 'tierra-del-fuego', name: 'Tierra del Fuego', region: 'Patagonia', active: false },
] as const;

export type Province = (typeof PROVINCES)[number];
export type ProvinceSlug = Province['slug'];
export const PROVINCE_SLUGS = PROVINCES.map((p) => p.slug) as [ProvinceSlug, ...ProvinceSlug[]];
export const ACTIVE_PROVINCES = PROVINCES.filter((p) => p.active);

export function getProvince(slug: string): Province | undefined {
  return PROVINCES.find((p) => p.slug === slug);
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
 * `tel` is used in the href (digits only).
 */
export const HELPLINES = [
  {
    name: 'Centro de Asistencia al Suicida',
    number: '135',
    tel: '135',
    detail: 'Gratuita desde CABA y Gran Buenos Aires',
  },
  {
    name: 'Centro de Asistencia al Suicida (todo el país)',
    number: '0800 345 1435',
    tel: '08003451435',
    detail: 'Gratuita desde cualquier provincia',
  },
  {
    name: 'Emergencias',
    number: '107 / 911',
    tel: '911',
    detail: 'Si hay riesgo inmediato',
  },
] as const;

export const INSTITUTIONAL_NAV = [
  { href: '/sobre-nosotros/', label: 'Sobre nosotros' },
  { href: '/politica-editorial/', label: 'Política editorial' },
  { href: '/ayuda/', label: 'Pedir ayuda' },
  { href: '/contacto/', label: 'Contacto' },
] as const;

export const LEGAL_NAV = [
  { href: '/privacidad/', label: 'Privacidad y cookies' },
  { href: '/terminos/', label: 'Términos de uso' },
] as const;
