// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { existsSync, readFileSync } from 'node:fs';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';

import { ADSENSE, SITE } from './src/config/site.ts';
import { assertAdsenseConfig, resolveAdsMode } from './src/lib/ads.ts';
import rehypeInArticleAds from './src/lib/rehype-in-article-ads.ts';

import tailwindcss from '@tailwindcss/vite';

assertAdsenseConfig();
const inArticleAdsMode = resolveAdsMode(process.argv.includes('dev'), 'in-article');

/**
 * Reads a page already rendered to dist/. The sitemap integration runs after the
 * build, so we can derive indexability and lastmod from the final HTML.
 * @param {string} page absolute page URL
 */
function renderedHtml(page) {
  const file = `./dist${new URL(page).pathname}index.html`;
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
}

/** @param {string} page */
const isIndexable = (page) => !/<meta name="robots" content="noindex/.test(renderedHtml(page));

/** @param {string} page */
function lastModified(page) {
  const html = renderedHtml(page);
  const match =
    html.match(/property="article:modified_time" content="([^"]+)"/) ??
    html.match(/property="article:published_time" content="([^"]+)"/);
  return match?.[1];
}

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  output: 'static',
  adapter: vercel(),

  image: {
    // Optimised at build time with sharp (static output); AVIF/WebP with real srcsets.
    responsiveStyles: false,
  },

  markdown: {
    // unified (remark/rehype) instead of the default Sätteri processor, which
    // does not run rehype plugins. MDX inherits this processor.
    processor: unified({
      rehypePlugins: [
        [
          rehypeInArticleAds,
          { mode: inArticleAdsMode, max: ADSENSE.inArticleMax, everyWords: ADSENSE.inArticleEveryWords },
        ],
      ],
    }),
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      // Static weights: the variable build (with optical-size axis) is ~140 KB per file.
      weights: [400, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Libre Franklin',
      cssVariable: '--font-franklin',
      weights: [400, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Arial', 'sans-serif'],
    },
  ],

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404') && isIndexable(page),
      serialize: (item) => {
        const lastmod = lastModified(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],

  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },

  // ~18 KB of CSS in total: inlining it removes render-blocking requests (faster FCP/LCP).
  build: { inlineStylesheets: 'always' },

  vite: {
    plugins: [tailwindcss()]
  }
});