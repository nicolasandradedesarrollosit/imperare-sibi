/**
 * Rehype plugin that inserts AdSense in-article units into article bodies:
 * the first after the 2nd paragraph, then roughly every `everyWords` words.
 * Units only go between two paragraphs or before a subheading, never as the
 * last block, and never in articles flagged `sensitive`.
 *
 * `mode` comes from resolveAdsMode() (see ./ads.ts).
 */

import { AD_LABEL, adUnitAttributes, type AdsMode } from './ads';

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

interface Options {
  mode: AdsMode;
  max?: number;
  everyWords?: number;
}

interface VFileLike {
  data?: { astro?: { frontmatter?: Record<string, unknown> } };
}

const textOf = (node: HastNode): string =>
  node.type === 'text' ? (node.value ?? '') : (node.children ?? []).map(textOf).join(' ');

const words = (node: HastNode) => textOf(node).split(/\s+/).filter(Boolean).length;

const text = (value: string): HastNode => ({ type: 'text', value });

/** Same markup as <AdSlot placement="in-article">, built as a hast tree. */
function adNode(mode: AdsMode): HastNode {
  const unit: HastNode =
    mode === 'live'
      ? { type: 'element', tagName: 'ins', properties: { className: ['adsbygoogle'], ...adUnitAttributes('in-article') }, children: [] }
      : { type: 'element', tagName: 'div', properties: { className: ['ad__placeholder'] }, children: [text('Anuncio · in-article')] };

  return {
    type: 'element',
    // A plain container, not a landmark: several ads per page would repeat the same landmark.
    tagName: 'div',
    properties: { className: ['ad', 'ad--in-article'] },
    children: [{ type: 'element', tagName: 'span', properties: { className: ['ad__label'] }, children: [text(AD_LABEL)] }, unit],
  };
}

export default function rehypeInArticleAds(opts: Options) {
  const max = opts.max ?? 3;
  const everyWords = opts.everyWords ?? 400;

  return (tree: HastNode, file: VFileLike) => {
    if (opts.mode === 'off') return;
    if (file.data?.astro?.frontmatter?.sensitive) return;

    const children = tree.children ?? [];
    const out: HastNode[] = [];
    let paragraphs = 0;
    let sinceLast = 0;
    let inserted = 0;

    children.forEach((node, i) => {
      out.push(node);
      if (node.type !== 'element') return;
      sinceLast += words(node);
      if (node.tagName !== 'p') return;
      paragraphs++;

      const nextBlock = children.slice(i + 1).find((n) => n.type === 'element');
      // Only break the text between two paragraphs or before a subheading: never
      // between a paragraph and the list it introduces, nor at the very end.
      const goodBreak =
        nextBlock !== undefined &&
        ['p', 'h2', 'h3'].includes(nextBlock.tagName ?? '') &&
        !textOf(node).trim().endsWith(':');
      const due = inserted === 0 ? paragraphs >= 2 : sinceLast >= everyWords;

      if (due && goodBreak && inserted < max) {
        out.push(adNode(opts.mode));
        inserted++;
        sinceLast = 0;
      }
    });

    tree.children = out;
  };
}
