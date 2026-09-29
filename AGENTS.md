## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project conventions

- **Writing a new article? Read `docs/CONTENT_GUIDE.md` first and start from `src/content/articles/_template.mdx`.**
- Code, comments and docs in English; reader-facing copy and URLs in Spanish (es-AR).
- Content lives in `src/content/` (schemas in `src/content.config.ts`); article URLs are `/{section}/{id}/`.
- Everything configurable (categories, helplines, disclaimer, AdSense, brand) lives in `src/config/site.ts`; never hardcode it in components.
- Single national blog: no provincial editions.
- Tailwind CSS v4: tokens and shared component classes in `src/styles/index.css`; utilities for one-off layout. Light theme only. No client JS unless strictly needed.
- Markdown uses the `unified` processor because the in-article ads rehype plugin needs it.
- Keep ad containers height-reserved (`AdSlot.astro`, `.ad` in `src/styles/index.css`) and never render ads on `sensitive` articles or crisis/legal pages.
- See `README.md` and `docs/STRATEGY.md`.
