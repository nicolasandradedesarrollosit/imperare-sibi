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

const time = new Intl.DateTimeFormat(SITE.locale, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: SITE.timeZone,
});

const weekday = new Intl.DateTimeFormat(SITE.locale, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: SITE.timeZone,
});

/** "28 de septiembre de 2026" */
export const formatDate = (d: Date) => longDate.format(d);
/** "28 sept" */
export const formatShortDate = (d: Date) => shortDate.format(d).replace('.', '');
/** "09:00" */
export const formatTime = (d: Date) => time.format(d);
/** "Martes, 29 de septiembre de 2026" */
export const formatToday = (d: Date) => {
  const s = weekday.format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const DAY = 24 * 60 * 60 * 1000;

/**
 * Relative label for listings: time for today's stories, short date otherwise.
 * Evaluated at build time, so "today" means the deploy date.
 */
export function formatListingDate(d: Date, now = new Date()) {
  return now.valueOf() - d.valueOf() < DAY && time.format(d) !== '00:00' ? formatTime(d) : formatShortDate(d);
}
