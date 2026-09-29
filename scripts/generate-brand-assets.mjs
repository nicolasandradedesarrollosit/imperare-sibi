// Generates the brand PNG/ICO files from the SVG mark.
// Usage: node scripts/generate-brand-assets.mjs
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const pub = new URL('../public/', import.meta.url);
const mark = await readFile(new URL('brand/mark.svg', pub));

const paper = '#faf7f2';

async function icon(size, file, padding = 0.08) {
  const inner = Math.round(size * (1 - padding * 2));
  const glyph = await sharp(mark, { density: 1200 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: paper } })
    .composite([{ input: glyph, gravity: 'center' }])
    .png()
    .toFile(new URL(file, pub).pathname);
}

await icon(180, 'apple-touch-icon.png');
await icon(192, 'brand/icon-192.png');
await icon(512, 'brand/icon-512.png');
await icon(512, 'brand/icon-maskable-512.png', 0.24);

// favicon.ico wrapping a 32px PNG (a valid ICO container).
const png32 = await sharp(mark, { density: 600 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(new URL('favicon.ico', pub), Buffer.concat([header, png32]));

// Default Open Graph image (1200x630).
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${paper}"/>
  <rect x="0" y="0" width="1200" height="10" fill="#5b7f6b"/>
  <g transform="translate(96 175) scale(4.3)">
    <circle cx="32" cy="32" r="30" fill="#1f2421"/>
    <path d="M21 19v26" fill="none" stroke="#faf7f2" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M45 22c-2-2.8-4.8-4.2-7.9-4.2-4.3 0-7.3 2.6-7.3 6.1 0 8.3 15.7 5.7 15.7 14.4 0 4.4-3.7 7.5-8.5 7.5-3.6 0-6.7-1.6-8.6-4.6" fill="none" stroke="#9cc0aa" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="400" y="290" font-family="Georgia, 'Times New Roman', serif" font-size="92" font-weight="700" fill="#1f2421">Imperare <tspan fill="#3f5e4d" font-style="italic" font-weight="400">Sibi</tspan></text>
  <text x="402" y="360" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#3d4540">Salud mental en Argentina,</text>
  <text x="402" y="404" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#3d4540">con rigor y cercanía.</text>
  <text x="96" y="560" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="3" fill="#626a65">IMPERARESIBI.COM.AR</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(new URL('og-default.png', pub).pathname);

console.log('Brand assets generated.');
