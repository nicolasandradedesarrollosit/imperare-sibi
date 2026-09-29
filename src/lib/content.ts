import { getCollection, type CollectionEntry } from 'astro:content';

export type Articulo = CollectionEntry<'articulos'>;
export type Autor = CollectionEntry<'autores'>;

const isPublished = (a: Articulo) => import.meta.env.DEV || !a.data.draft;

const byDateDesc = (a: Articulo, b: Articulo) => b.data.publicado.valueOf() - a.data.publicado.valueOf();

/** Todas las notas publicadas, de la más nueva a la más vieja. */
export async function getArticulos(): Promise<Articulo[]> {
  const all = await getCollection('articulos', isPublished);
  return all.sort(byDateDesc);
}

export function articuloUrl(a: Articulo): string {
  return `/${a.data.seccion}/${a.id}/`;
}

export function autorUrl(id: string): string {
  return `/autores/${id}/`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function tagUrl(tag: string): string {
  return `/tags/${slugify(tag)}/`;
}

export function porSeccion(articulos: Articulo[], seccion: string): Articulo[] {
  return articulos.filter((a) => a.data.seccion === seccion);
}

export function porProvincia(articulos: Articulo[], provincia: string): Articulo[] {
  return articulos.filter((a) => a.data.provincia === provincia);
}

/**
 * Notas relacionadas: puntúa por tags compartidos y misma sección.
 * Refuerza el enlazado interno (clusters temáticos para SEO).
 */
export function relacionadas(actual: Articulo, articulos: Articulo[], limite = 3): Articulo[] {
  const tags = new Set(actual.data.tags.map(slugify));
  return articulos
    .filter((a) => a.id !== actual.id)
    .map((a) => {
      const compartidos = a.data.tags.filter((t) => tags.has(slugify(t))).length;
      const score = compartidos * 2 + (a.data.seccion === actual.data.seccion ? 1 : 0);
      return { a, score };
    })
    .filter(({ score }) => score > 0)
    .sort((x, y) => y.score - x.score || byDateDesc(x.a, y.a))
    .slice(0, limite)
    .map(({ a }) => a);
}

/** Tiempo estimado de lectura en minutos (≈200 palabras/min). */
export function tiempoLectura(body: string | undefined): number {
  const palabras = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}
