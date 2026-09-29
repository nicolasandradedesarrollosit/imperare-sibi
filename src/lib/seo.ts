import { SITE } from '../config/site';
import type { Articulo, Autor } from './content';
import { articuloUrl, autorUrl } from './content';

export const absUrl = (path: string) => new URL(path, SITE.url).href;

type JsonLd = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationLd(): JsonLd {
  return {
    '@type': ['NewsMediaOrganization', 'Organization'],
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: absUrl(SITE.logoPng), width: 512, height: 512 },
    foundingDate: SITE.foundingDate,
    email: SITE.email,
    areaServed: { '@type': 'Country', name: 'Argentina' },
    sameAs: Object.values(SITE.social),
    publishingPrinciples: absUrl('/politica-editorial/'),
    correctionsPolicy: absUrl('/politica-editorial/#correcciones'),
  };
}

export function websiteLd(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: { '@id': ORG_ID },
  };
}

export function personLd(autor: Autor): JsonLd {
  const { data } = autor;
  return {
    '@type': 'Person',
    '@id': `${absUrl(autorUrl(autor.id))}#person`,
    name: data.nombre,
    jobTitle: data.rol,
    description: data.bio,
    url: absUrl(autorUrl(autor.id)),
    ...(data.credenciales && { hasCredential: data.credenciales }),
    ...(data.foto && { image: absUrl(data.foto.src) }),
    sameAs: Object.values(data.redes).filter(Boolean),
    worksFor: { '@id': ORG_ID },
  };
}

export function breadcrumbLd(items: { name: string; href: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.href),
    })),
  };
}

export function articleLd(args: {
  articulo: Articulo;
  autor: Autor;
  revisor?: Autor;
  imageUrl: string;
  seccionNombre: string;
  palabras: number;
}): JsonLd {
  const { articulo, autor, revisor, imageUrl, seccionNombre, palabras } = args;
  const { data } = articulo;
  const url = absUrl(articuloUrl(articulo));
  return {
    '@type': data.tipo === 'noticia' ? 'NewsArticle' : 'Article',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: data.title,
    description: data.description,
    image: [imageUrl],
    datePublished: data.publicado.toISOString(),
    dateModified: (data.actualizado ?? data.publicado).toISOString(),
    inLanguage: SITE.locale,
    articleSection: seccionNombre,
    keywords: data.tags.join(', '),
    wordCount: palabras,
    isAccessibleForFree: true,
    author: [personLd(autor)],
    publisher: { '@id': ORG_ID },
    ...(revisor && {
      reviewedBy: personLd(revisor),
      ...(data.revisadoEl && { lastReviewed: data.revisadoEl.toISOString() }),
    }),
    ...(data.provincia && { contentLocation: { '@type': 'Place', name: data.provincia } }),
  };
}

/** Envuelve nodos en un @graph con Organization y WebSite siempre presentes. */
export function graph(...nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': [organizationLd(), websiteLd(), ...nodes] };
}
