import { ADSENSE } from '../config/site';

/**
 * AdSense policy and markup, shared by BaseLayout, <AdSlot> and the in-article
 * rehype plugin. Every "may this page / unit show an ad?" decision lives here.
 */

export type AdPlacement = 'horizontal' | 'rail' | 'in-article';

/**
 * - live:        real AdSense units (client and slot id configured)
 * - placeholder: dashed boxes with the reserved height, to review layouts in dev
 * - off:         nothing is rendered
 */
export type AdsMode = 'live' | 'placeholder' | 'off';

/**
 * What a page is, from the ads point of view. Pages declare their kind and the
 * policy in ADSENSE.pageKinds decides; no page hardcodes a boolean.
 */
export type PageKind =
  | 'home'
  | 'listing'
  | 'article'
  /** Sensitive, noindex or draft article: never monetised. */
  | 'restricted-article'
  | 'institutional'
  | 'legal'
  | 'crisis'
  | 'error';

export const AD_LABEL = 'Publicidad';

const SLOT_BY_PLACEMENT: Record<AdPlacement, string> = {
  'in-article': ADSENSE.slots.inArticle,
  rail: ADSENSE.slots.rail,
  horizontal: ADSENSE.slots.horizontal,
};

export const adsenseConfigured = ADSENSE.client.length > 0;

/**
 * Fails the build on a malformed AdSense config instead of shipping broken units.
 * An empty client is valid (ads not set up yet); so is an empty slot (that
 * placement is simply not rendered).
 */
export function assertAdsenseConfig(): void {
  if (!adsenseConfigured) return;
  if (!/^ca-pub-\d{16}$/.test(ADSENSE.client)) {
    throw new Error(`ADSENSE.client must look like "ca-pub-" + 16 digits, got "${ADSENSE.client}".`);
  }
  for (const [placement, slot] of Object.entries(SLOT_BY_PLACEMENT)) {
    if (slot && !/^\d+$/.test(slot)) {
      throw new Error(`ADSENSE slot for "${placement}" must be numeric, got "${slot}".`);
    }
  }
}

/** Whether a page of this kind may load AdSense at all. */
export const pageAllowsAds = (kind: PageKind): boolean =>
  (ADSENSE.pageKinds as readonly PageKind[]).includes(kind);

/** Article frontmatter fields that restrict monetisation. */
interface ArticleAdFlags {
  sensitive?: unknown;
  noindex?: unknown;
  draft?: unknown;
}

/**
 * Sensitive coverage (suicide, self-harm), pages kept out of the index and drafts
 * never carry ads. Takes plain frontmatter so the rehype plugin can use it too.
 */
export const articleAllowsAds = (fm: ArticleAdFlags): boolean => !fm.sensitive && !fm.noindex && !fm.draft;

export const articlePageKind = (fm: ArticleAdFlags): PageKind =>
  articleAllowsAds(fm) ? 'article' : 'restricted-article';

/**
 * Rendering mode of one ad unit. Live units need both the client and that
 * placement's slot id; dev shows placeholders so layouts can be reviewed.
 */
export function resolveAdsMode(isDev: boolean, placement?: AdPlacement): AdsMode {
  if (adsenseConfigured) return !placement || SLOT_BY_PLACEMENT[placement] ? 'live' : 'off';
  return isDev ? 'placeholder' : 'off';
}

/** Attributes of the <ins class="adsbygoogle"> element for a placement. */
export function adUnitAttributes(placement: AdPlacement): Record<string, string> {
  const base = { 'data-ad-client': ADSENSE.client, 'data-ad-slot': SLOT_BY_PLACEMENT[placement] };
  switch (placement) {
    case 'in-article':
      return {
        ...base,
        style: 'display:block;text-align:center',
        'data-ad-layout': 'in-article',
        'data-ad-format': 'fluid',
      };
    case 'rail':
      return { ...base, style: 'display:block', 'data-ad-format': 'vertical', 'data-full-width-responsive': 'true' };
    case 'horizontal':
      return { ...base, style: 'display:block', 'data-ad-format': 'horizontal', 'data-full-width-responsive': 'true' };
  }
}
