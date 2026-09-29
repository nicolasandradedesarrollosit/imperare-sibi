import { ADSENSE } from '../config/site';

/**
 * AdSense helpers shared by <AdSlot> and the in-article rehype plugin, so the ad
 * markup is defined in one place.
 */

export type AdPlacement = 'horizontal' | 'rail' | 'in-article';

/**
 * - live:        real AdSense units (client id configured)
 * - placeholder: dashed boxes with the reserved height, to review layouts in dev
 * - off:         nothing is rendered (production builds without AdSense)
 */
export type AdsMode = 'live' | 'placeholder' | 'off';

export const resolveAdsMode = (isDev: boolean): AdsMode =>
  ADSENSE.client ? 'live' : isDev ? 'placeholder' : 'off';

export const AD_LABEL = 'Publicidad';

/** Attributes of the <ins class="adsbygoogle"> element for a placement. */
export function adUnitAttributes(placement: AdPlacement): Record<string, string> {
  const base = { 'data-ad-client': ADSENSE.client };
  switch (placement) {
    case 'in-article':
      return {
        ...base,
        style: 'display:block;text-align:center',
        'data-ad-layout': 'in-article',
        'data-ad-format': 'fluid',
        'data-ad-slot': ADSENSE.slots.inArticle,
      };
    case 'rail':
      return {
        ...base,
        style: 'display:block',
        'data-ad-format': 'vertical',
        'data-full-width-responsive': 'true',
        'data-ad-slot': ADSENSE.slots.rail,
      };
    case 'horizontal':
      return {
        ...base,
        style: 'display:block',
        'data-ad-format': 'horizontal',
        'data-full-width-responsive': 'true',
        'data-ad-slot': ADSENSE.slots.horizontal,
      };
  }
}
