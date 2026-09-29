// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

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
      filter: (page) => !page.includes('/404'),
    }),
  ],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
});
