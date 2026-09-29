// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { existsSync, readFileSync } from 'node:fs';

/**
 * Excluye del sitemap las páginas marcadas como noindex (tags con poco contenido,
 * ediciones sin notas locales, 404). Se evalúa sobre el HTML ya generado.
 * @param {string} page
 */
function isIndexable(page) {
  const file = `./dist${new URL(page).pathname}index.html`;
  if (!existsSync(file)) return true;
  return !/<meta name="robots" content="noindex/.test(readFileSync(file, 'utf8'));
}

// https://astro.build/config
export default defineConfig({
  site: 'https://imperaresibi.com.ar',
  trailingSlash: 'always',
  output: 'static',
  adapter: vercel({ imageService: true }),
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-AR' } },
      filter: (page) => !page.includes('/404') && isIndexable(page),
    }),
  ],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
});
