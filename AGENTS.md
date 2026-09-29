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

## Proyecto

- Contenido en `src/content/` (Content Collections, schemas en `src/content.config.ts`); URLs de notas `/{seccion}/{id}/`.
- Todo lo configurable (secciones, provincias, líneas de ayuda, marca) vive en `src/config/site.ts`; no hardcodear en componentes.
- CSS propio con tokens en `src/styles/tokens.css` (sin Tailwind). Cero JS por defecto.
- Ver `README.md` y `docs/ESTRATEGIA.md`.
