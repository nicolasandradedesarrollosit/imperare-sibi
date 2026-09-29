/**
 * Configuración central del sitio. Todo lo que cambia entre ediciones, secciones o
 * marca vive acá: los componentes y páginas leen de este archivo, nunca hardcodean.
 */

export const SITE = {
  name: 'Imperare Sibi',
  tagline: 'Salud mental en Argentina, con rigor y cercanía.',
  description:
    'Medio especializado en salud mental en Argentina: guías, noticias y entrevistas revisadas por profesionales. Ansiedad, depresión, vínculos, infancias y políticas públicas.',
  url: 'https://imperaresibi.com.ar',
  locale: 'es-AR',
  lang: 'es',
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
  /** Cantidad de notas por página en portadas de sección. */
  pageSize: 12,
} as const;

export const SECCIONES = [
  {
    slug: 'ansiedad',
    nombre: 'Ansiedad',
    descripcion:
      'Qué es la ansiedad, cómo se manifiesta y qué tratamientos existen. Guías y notas revisadas por profesionales de la salud mental.',
  },
  {
    slug: 'depresion',
    nombre: 'Depresión',
    descripcion:
      'Información confiable sobre depresión: síntomas, diagnóstico, tratamientos y cómo acompañar a alguien que la atraviesa.',
  },
  {
    slug: 'vinculos',
    nombre: 'Vínculos',
    descripcion: 'Pareja, familia, amistades y trabajo: cómo los vínculos impactan en nuestra salud mental.',
  },
  {
    slug: 'infancias-y-adolescencias',
    nombre: 'Infancias y adolescencias',
    descripcion:
      'Salud mental de niñas, niños y adolescentes: crianza, escuela, redes sociales y señales de alerta.',
  },
  {
    slug: 'politicas-publicas',
    nombre: 'Políticas públicas',
    descripcion:
      'Ley de Salud Mental, obras sociales, prepagas y sistema público: actualidad y análisis sobre el acceso a la salud mental en Argentina.',
  },
  {
    slug: 'bienestar',
    nombre: 'Bienestar',
    descripcion: 'Sueño, hábitos, estrés y autocuidado: herramientas basadas en evidencia para el día a día.',
  },
] as const;

export type SeccionSlug = (typeof SECCIONES)[number]['slug'];
export const SECCION_SLUGS = SECCIONES.map((s) => s.slug) as [SeccionSlug, ...SeccionSlug[]];

export function getSeccion(slug: string) {
  return SECCIONES.find((s) => s.slug === slug);
}

/**
 * Ediciones provinciales. `activa: true` genera la página /edicion/{slug}/.
 * Sumar una provincia a la cadena = activarla acá y cargar contenido con `provincia`.
 */
export const PROVINCIAS = [
  { slug: 'caba', nombre: 'Ciudad de Buenos Aires', region: 'AMBA', activa: true },
  { slug: 'buenos-aires', nombre: 'Buenos Aires', region: 'AMBA', activa: true },
  { slug: 'cordoba', nombre: 'Córdoba', region: 'Centro', activa: true },
  { slug: 'santa-fe', nombre: 'Santa Fe', region: 'Centro', activa: true },
  { slug: 'mendoza', nombre: 'Mendoza', region: 'Cuyo', activa: true },
  { slug: 'entre-rios', nombre: 'Entre Ríos', region: 'Centro', activa: false },
  { slug: 'la-pampa', nombre: 'La Pampa', region: 'Centro', activa: false },
  { slug: 'san-juan', nombre: 'San Juan', region: 'Cuyo', activa: false },
  { slug: 'san-luis', nombre: 'San Luis', region: 'Cuyo', activa: false },
  { slug: 'tucuman', nombre: 'Tucumán', region: 'NOA', activa: false },
  { slug: 'salta', nombre: 'Salta', region: 'NOA', activa: false },
  { slug: 'jujuy', nombre: 'Jujuy', region: 'NOA', activa: false },
  { slug: 'catamarca', nombre: 'Catamarca', region: 'NOA', activa: false },
  { slug: 'la-rioja', nombre: 'La Rioja', region: 'NOA', activa: false },
  { slug: 'santiago-del-estero', nombre: 'Santiago del Estero', region: 'NOA', activa: false },
  { slug: 'misiones', nombre: 'Misiones', region: 'NEA', activa: false },
  { slug: 'corrientes', nombre: 'Corrientes', region: 'NEA', activa: false },
  { slug: 'chaco', nombre: 'Chaco', region: 'NEA', activa: false },
  { slug: 'formosa', nombre: 'Formosa', region: 'NEA', activa: false },
  { slug: 'neuquen', nombre: 'Neuquén', region: 'Patagonia', activa: false },
  { slug: 'rio-negro', nombre: 'Río Negro', region: 'Patagonia', activa: false },
  { slug: 'chubut', nombre: 'Chubut', region: 'Patagonia', activa: false },
  { slug: 'santa-cruz', nombre: 'Santa Cruz', region: 'Patagonia', activa: false },
  { slug: 'tierra-del-fuego', nombre: 'Tierra del Fuego', region: 'Patagonia', activa: false },
] as const;

export type ProvinciaSlug = (typeof PROVINCIAS)[number]['slug'];
export const PROVINCIA_SLUGS = PROVINCIAS.map((p) => p.slug) as [ProvinciaSlug, ...ProvinciaSlug[]];

export function getProvincia(slug: string) {
  return PROVINCIAS.find((p) => p.slug === slug);
}

export const TIPOS_NOTA = ['noticia', 'guia', 'entrevista', 'opinion'] as const;
export type TipoNota = (typeof TIPOS_NOTA)[number];
export const TIPO_LABEL: Record<TipoNota, string> = {
  noticia: 'Noticia',
  guia: 'Guía',
  entrevista: 'Entrevista',
  opinion: 'Opinión',
};

/**
 * Líneas de ayuda. IMPORTANTE: verificar vigencia periódicamente antes de publicar.
 * `tel` se usa en el href (solo dígitos).
 */
export const LINEAS_AYUDA = [
  {
    nombre: 'Centro de Asistencia al Suicida',
    numero: '135',
    tel: '135',
    detalle: 'Gratuita desde CABA y Gran Buenos Aires',
  },
  {
    nombre: 'Centro de Asistencia al Suicida (todo el país)',
    numero: '0800 345 1435',
    tel: '08003451435',
    detalle: 'Gratuita desde cualquier provincia',
  },
  {
    nombre: 'Emergencias',
    numero: '107 / 911',
    tel: '911',
    detalle: 'Si hay riesgo inmediato',
  },
] as const;

export const NAV_INSTITUCIONAL = [
  { href: '/sobre-nosotros/', label: 'Sobre nosotros' },
  { href: '/politica-editorial/', label: 'Política editorial' },
  { href: '/ayuda/', label: 'Pedir ayuda' },
  { href: '/contacto/', label: 'Contacto' },
] as const;
