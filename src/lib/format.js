const LOCALES = { es: "es-ES", en: "en-GB", de: "de-DE" };

/**
 * `Intl` needs the active locale, and the active locale lives in a client
 * context, so dates are formatted in the browser. SEO metadata uses the ISO day
 * strings from the loader instead and never touches this.
 */
export function formatDate(value, language = "es") {
  if (!value) return "";

  const locale = LOCALES[language] ?? LOCALES.es;
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatReadingTime(minutes, template) {
  return template.replace("{minutes}", String(minutes));
}