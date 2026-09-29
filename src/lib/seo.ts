import { SITE } from '../config/site';
import { articleUrl, authorUrl, type Article, type Author } from './content';

export const absUrl = (path: string) => new URL(path, SITE.url).href;

type JsonLd = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationLd(): JsonLd {
  return {
    '@type': 'Organization',
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
    ethicsPolicy: absUrl('/politica-editorial/#principios'),
    actionableFeedbackPolicy: absUrl('/contacto/'),
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

export function personLd(author: Author): JsonLd {
  const { data } = author;
  const url = absUrl(authorUrl(author.id));
  return {
    '@type': 'Person',
    '@id': `${url}#person`,
    name: data.name,
    jobTitle: data.role,
    description: data.bio,
    url,
    ...(data.credentials && { hasCredential: data.credentials }),
    ...(data.photo && { image: absUrl(data.photo.src) }),
    sameAs: Object.values(data.social).filter(Boolean),
    worksFor: { '@id': ORG_ID },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

/** Breadcrumb trail that always starts at the home page. */
export const crumbs = (...items: Crumb[]): Crumb[] => [{ name: 'Inicio', href: '/' }, ...items];

export function breadcrumbLd(items: Crumb[]): JsonLd {
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

/** Listing pages (sections, topics, editions): CollectionPage + ItemList of its articles. */
export function collectionLd(args: { name: string; description: string; path: string; articles: Article[] }): JsonLd {
  const url = absUrl(args.path);
  return {
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: SITE.locale,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: args.articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absUrl(articleUrl(a)),
        name: a.data.title,
      })),
    },
  };
}

export function profilePageLd(author: Author, path: string): JsonLd {
  return {
    '@type': 'ProfilePage',
    url: absUrl(path),
    inLanguage: SITE.locale,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: personLd(author),
  };
}

export function articleLd(args: {
  article: Article;
  author: Author;
  reviewer?: Author;
  images: string[];
  sectionName: string;
  words: number;
}): JsonLd {
  const { article, author, reviewer, images, sectionName, words } = args;
  const { data } = article;
  const url = absUrl(articleUrl(article));
  return {
    // News pieces are NewsArticle; guides, opinion and interviews are blog posts.
    '@type': data.type === 'news' ? 'NewsArticle' : 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: data.title,
    description: data.description,
    image: images,
    thumbnailUrl: images[0],
    datePublished: data.publishedAt.toISOString(),
    dateModified: (data.updatedAt ?? data.publishedAt).toISOString(),
    inLanguage: SITE.locale,
    articleSection: sectionName,
    keywords: data.tags.join(', '),
    wordCount: words,
    isAccessibleForFree: true,
    author: [personLd(author)],
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    ...(reviewer && {
      reviewedBy: personLd(reviewer),
      ...(data.reviewedAt && { lastReviewed: data.reviewedAt.toISOString() }),
    }),
  };
}

/** Wraps nodes in a single @graph that always includes Organization and WebSite. */
export function graph(...nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': [organizationLd(), websiteLd(), ...nodes] };
}
