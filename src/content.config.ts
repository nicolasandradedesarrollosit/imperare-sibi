import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROVINCIA_SLUGS, SECCION_SLUGS, TIPOS_NOTA } from './config/site';

/**
 * Notas. El id (nombre del archivo) es el slug de la URL: /{seccion}/{id}/.
 * Para migrar a un CMS headless alcanza con reemplazar el `loader`.
 */
const articulos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/articulos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(110),
      /** Título alternativo para <title> si el titular es muy largo. */
      seoTitle: z.string().max(65).optional(),
      /** Bajada. Se usa también como meta description (ideal 120–160 caracteres). */
      description: z.string().min(50).max(200),
      seccion: z.enum(SECCION_SLUGS),
      tipo: z.enum(TIPOS_NOTA).default('noticia'),
      tags: z.array(z.string()).default([]),
      provincia: z.enum(PROVINCIA_SLUGS).optional(),
      autor: reference('autores'),
      /** Profesional que revisó el contenido (E-E-A-T para temas de salud). */
      revisor: reference('autores').optional(),
      revisadoEl: z.coerce.date().optional(),
      publicado: z.coerce.date(),
      actualizado: z.coerce.date().optional(),
      imagen: image().optional(),
      imagenAlt: z.string().optional(),
      imagenCredito: z.string().optional(),
      destacado: z.boolean().default(false),
      /** Notas sobre suicidio/autolesiones: refuerza recursos de ayuda y excluye publicidad. */
      sensible: z.boolean().default(false),
      /** URL canónica externa si la nota se republica desde otro medio. */
      canonical: z.url().optional(),
      noindex: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const autores = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/autores' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      rol: z.string(),
      bio: z.string(),
      /** Profesión y matrícula (ej. "Lic. en Psicología — M.N. 12345"). */
      credenciales: z.string().optional(),
      foto: image().optional(),
      provincia: z.enum(PROVINCIA_SLUGS).optional(),
      redes: z
        .object({
          x: z.url().optional(),
          instagram: z.url().optional(),
          linkedin: z.url().optional(),
          web: z.url().optional(),
        })
        .default({}),
    }),
});

export const collections = { articulos, autores };
