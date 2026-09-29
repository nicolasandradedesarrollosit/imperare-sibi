const fechaLarga = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Argentina/Buenos_Aires',
});

const fechaCorta = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'short',
  timeZone: 'America/Argentina/Buenos_Aires',
});

export const formatFecha = (d: Date) => fechaLarga.format(d);
export const formatFechaCorta = (d: Date) => fechaCorta.format(d).replace('.', '');
export const isoFecha = (d: Date) => d.toISOString();
