// Builds the Pagefind search index from the rendered site (run after `astro build`).
// Only pages that carry `data-pagefind-body` (articles) are indexed. The index is
// written to both output folders: dist/ (astro preview) and .vercel/output/static/
// (what Vercel serves), because the adapter has already copied the site by now.
import { existsSync } from 'node:fs';
import * as pagefind from 'pagefind';

const OUTPUTS = ['dist', '.vercel/output/static'].filter((dir) => existsSync(dir));

const { index, errors } = await pagefind.createIndex();
if (!index) throw new Error(`Pagefind could not start: ${errors.join('; ')}`);

const { page_count: pages } = await index.addDirectory({ path: 'dist' });
for (const dir of OUTPUTS) {
  await index.writeFiles({ outputPath: `${dir}/pagefind` });
}
await pagefind.close();

console.log(`[search] scanned ${pages} pages into ${OUTPUTS.map((d) => `${d}/pagefind`).join(', ')}`);
