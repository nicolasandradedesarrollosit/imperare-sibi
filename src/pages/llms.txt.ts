import type { APIRoute } from 'astro';
import { getSection, INSTITUTIONAL_NAV, SECTIONS, SITE } from '../config/site';
import { articleUrl, getArticles, sectionUrl } from '../lib/content';
import { absUrl } from '../lib/seo';

/**
 * llms.txt (https://llmstxt.org): a plain-Markdown map of the site for AI assistants
 * and AI search engines: what the site is, its categories and its articles.
 */
export const GET: APIRoute = async () => {
  const articles = (await getArticles()).filter((a) => !a.data.noindex);
  const guides = articles.filter((a) => a.data.type === 'guide');
  const others = articles.filter((a) => a.data.type !== 'guide');
  const line = (title: string, url: string, desc: string) => `- [${title}](${absUrl(url)}): ${desc}`;

  const body = `# ${SITE.name}

> ${SITE.description}

Contenido en español (Argentina) para lectores de todo el país. Las notas sobre salud son revisadas por profesionales matriculados; la información es de divulgación y no reemplaza la consulta profesional. Si alguien está en crisis: Centro de Asistencia al Suicida 135 (CABA y GBA) o 0800 345 1435 (todo el país); emergencias 911.

## Categorías

${SECTIONS.map((s) => line(s.name, sectionUrl(s.slug), s.description)).join('\n')}

## Guías

${guides.map((a) => line(a.data.title, articleUrl(a), a.data.description)).join('\n')}

## Otras notas

${others.map((a) => line(a.data.title, articleUrl(a), `${getSection(a.data.section)?.name}. ${a.data.description}`)).join('\n')}

## Sobre el sitio

${INSTITUTIONAL_NAV.map((l) => `- [${l.label}](${absUrl(l.href)})`).join('\n')}
- [Dónde pedir ayuda](${absUrl('/ayuda/')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
