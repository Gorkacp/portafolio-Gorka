import { getTranslation } from "@/utils/translations";

/*
 * Las claves que el sitio usa. Si un `labels.x` no está en esta lista,
 * `buildEstudiosLabels` devuelve `undefined` y React no pinta absolutamente
 * nada, sin aviso y sin error. Las `hero_*` faltaban y por eso `/estudios` salía sin
 * H1, sin subtítulo y con la miga de pan vacía.
 */
const KEYS = [
  "hero_eyebrow",
  "hero_title",
  "hero_title_highlight",
  "hero_description",
  "read_more",
  "reading_time",
  "search_placeholder",
  "clear_search",
  "results",
  "all",
  "no_results_title",
  "no_results_body",
  "toc_title",
  "related_title",
  "updated_on",
  "published_on",
  "reading_time_label",
  "by_author",
  "cta_title",
  "cta_body",
  "cta_button",
  "category_eyebrow",
  "empty_category",
  "count_suffix",
  "sections_title",
  "articles_title",
];

/**
 * Same labels, two consumers: server components render them for the initial HTML
 * (crawlers and the language the visitor has not chosen yet), client components
 * rebuild them when the visitor switches language. Building them in one place is
 * what keeps the two from drifting apart.
 *
 * `CategoryFilter` la ejecuta en el navegador, asi que tiene que leer SOLO el
 * idioma activo. Por eso entra por `dict` y no por `getTranslation`: importar
 * la funcion arrastraba los tres locale files completos (107 KB de JSON) al
 * bundle del cliente para poder pintar unas pocas etiquetas.
 */
export function buildEstudiosLabels(language, categoryIds = [], dict = undefined) {
  const read = dict
    ? (key) => dict[key] ?? key
    : (key) => getTranslation(language, key);

  const labels = { language };

  for (const key of KEYS) {
    labels[key] = read(`Estudios.${key}`);
  }

  labels.categoryLabels = Object.fromEntries(
    categoryIds.map((id) => [
      id,
      {
        label: read(`Estudios.categories.${id}.label`),
        description: read(`Estudios.categories.${id}.description`),
      },
    ])
  );

  return labels;
}

export function fill(template, values) {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, String(value)),
    template
  );
}