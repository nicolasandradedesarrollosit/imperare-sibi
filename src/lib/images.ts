import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { SITE } from '../config/site';

const abs = (path: string) => new URL(path, SITE.url).href;

async function crop(src: ImageMetadata, width: number, height: number) {
  const img = await getImage({ src, width, height, fit: 'cover', position: 'center', format: 'jpg', quality: 80 });
  return abs(img.src);
}

/** 1200×630 social card cropped from the article photo. */
export async function ogImage(src: ImageMetadata) {
  return { url: await crop(src, 1200, 630), width: 1200, height: 630 };
}

/**
 * The three aspect ratios Google recommends for Article structured data
 * (16:9, 4:3, 1:1), each at least 1200px wide.
 */
export async function schemaImages(src: ImageMetadata) {
  return Promise.all([crop(src, 1200, 675), crop(src, 1200, 900), crop(src, 1200, 1200)]);
}
