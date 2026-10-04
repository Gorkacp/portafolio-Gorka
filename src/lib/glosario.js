// src/lib/glosario.js
//
// Lo que las rutas necesitan saber del glosario. En una capa aparte para que
// las rutas no importen directamente del directorio de datos, igual que
// `lib/estudios.js` hace con los artículos.

import {
  ALL_TERMS,
  getAllTermSlugs,
  getTerm,
  getTermCount,
} from "@/data/glosario/terms";
import { searchTerms } from "@/data/glosario/search";
import { CATEGORY_CONFIG, CATEGORY_ORDER, DEFAULT_CATEGORY } from "@/data/glosario/categories";

export const GLOSSARY_PATHNAME = "/glosario";

export function termHref(slug) {
  return `${GLOSSARY_PATHNAME}/${slug}`;
}

export function getAllTerms() {
  return ALL_TERMS;
}

export function getTermBySlug(slug) {
  return getTerm(slug);
}

export function getTermSlugs() {
  return getAllTermSlugs();
}

export function countTerms() {
  return getTermCount();
}

export { searchTerms };

export function getTermGroups() {
  return CATEGORY_ORDER.map((id) => {
    const terms = ALL_TERMS.filter((term) => term.group === id);
    return {
      id,
      config: CATEGORY_CONFIG[id] ?? CATEGORY_CONFIG[DEFAULT_CATEGORY],
      count: terms.length,
    };
  }).filter((group) => group.count > 0);
}

export function getTermsByGroup(group) {
  return ALL_TERMS.filter((term) => term.group === group);
}

/**
 * Buscar el glosario entero es tonto. Casi siempre estás leyendo un artículo y
 * te sale un término que no entendés. Estos son los que aparecen de verdad
 * citados en los artículos, ordenados por los tags del artículo.
 */
export function getTermsRelatedToEstudio(estudio) {
  const needles = [...(estudio?.tags ?? []), estudio?.title ?? ""]
    .join(" ")
    .toLowerCase();

  if (!needles.trim()) return [];

  const hits = ALL_TERMS.filter((term) => {
    const haystack = [term.term, ...term.aliases].join(" ").toLowerCase();
    return needles.includes(haystack);
  });

  return hits
    .map((term) => ({
      term,
      score: (estudio.tags ?? []).filter((tag) =>
        term.aliases.concat(term.term).join(" ").toLowerCase().includes(tag.toLowerCase())
      ).length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.term)
    .slice(0, 4);
}