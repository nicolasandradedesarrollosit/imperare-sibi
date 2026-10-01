import { SITE } from '../config/site';
import { articleUrl, type Article } from './content';

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
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/buscar/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Questions and answers shown at the end of an article (frontmatter `faq`). */
export function faqLd(article: Article): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${absUrl(articleUrl(article))}#faq`,
    mainEntity: article.data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
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

export function articleLd(args: {
  article: Article;
  images: string[];
  sectionName: string;
  words: number;
}): JsonLd {
  const { article, images, sectionName, words } = args;
  const { data } = article;
  const url = absUrl(articleUrl(article));
  return {
    // News pieces are NewsArticle; everything else is a blog post.
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
    // The blog is anonymous: the organisation signs every piece, never a person.
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/** Wraps nodes in a single @graph that always includes Organization and WebSite. */
export function graph(...nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': [organizationLd(), websiteLd(), ...nodes] };
}
