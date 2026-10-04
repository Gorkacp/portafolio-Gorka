import { getTranslation } from "@/utils/translations";

/*
 * Misma lección que `estudiosLabels.js`: `KEYS` es la lista de claves que el sitio
 * realmente usa. Un `labels.x` que no esté acá devuelve `undefined` y React no
 * pinta nada, sin error. Las `hero_*` faltaban y por eso una ruta salió sin H1.
 */
const KEYS = [
  "hero_eyebrow",
  "hero_title",
  "hero_title_highlight",
  "hero_description",
  "search_placeholder",
  "clear_search",
  "results",
  "all",
  "no_results_title",
  "no_results_body",
  "terms_title",
  "groups_title",
  "what_is",
  "why",
  "when",
  "note",
  "also_known_as",
  "back_title",
  "count_suffix",
  "cta_title",
  "cta_body",
  "cta_button",
  "group_eyebrow",
];

export function buildGlosarioLabels(language, groupIds = [], dict = undefined) {
  const read = dict
    ? (key) => dict[key] ?? key
    : (key) => getTranslation(language, key);

  const labels = { language };

  for (const key of KEYS) {
    labels[key] = read(`Glosario.${key}`);
  }

  labels.groupLabels = Object.fromEntries(
    groupIds.map((id) => [
      id,
      {
        label: read(`Glosario.groups.${id}.label`),
        description: read(`Glosario.groups.${id}.description`),
      },
    ])
  );

  return labels;
}

/**
 * Las etiquetas que la isla de cliente lee DE VERDAD. Son siete, y solo el
 * `label` de cada grupo.
 *
 * Por que existe esto: `TermExplorer` recibe `labelsByLang` y elige el idioma en
 * el navegador, asi que hay que mandar los tres. Mandar el juego completo
 * costaba 44 KB de payload RSC inline, porque incluia `cta_*`, `hero_*`, los
 * titulos de los bloques de detalle y las `description` de los ocho grupos, que
 * se renderizan en el servidor y el cliente nunca vuelve a mirar.
 */
const CLIENT_KEYS = [
  "search_placeholder",
  "clear_search",
  "results",
  "all",
  "no_results_title",
  "no_results_body",
];

export function buildGlosarioClientLabels(language, groupIds = [], dict = undefined) {
  const full = buildGlosarioLabels(language, groupIds, dict);

  const labels = { language };
  for (const key of CLIENT_KEYS) {
    labels[key] = full[key];
  }

  labels.groupLabels = Object.fromEntries(
    groupIds.map((id) => [id, { label: full.groupLabels[id]?.label }])
  );

  return labels;
}