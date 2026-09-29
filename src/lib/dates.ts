import { SITE } from '../config/site';

const longDate = new Intl.DateTimeFormat(SITE.locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: SITE.timeZone,
});

const shortDate = new Intl.DateTimeFormat(SITE.locale, {
  day: 'numeric',
  month: 'short',
  timeZone: SITE.timeZone,
});

/** "28 de septiembre de 2026" */
export const formatDate = (d: Date) => longDate.format(d);
/** "28 sept" */
export const formatShortDate = (d: Date) => shortDate.format(d).replace('.', '');
