// src/data/glosario/terms/index.js
//
// Un único punto de entrada para el glosario. Los ocho archivos de arriba se
// mantienen separados porque 174 entradas en un solo archivo son imposibles de
// revisar; esta es la costura que el resto del código ve.

import { frontend } from "./frontend";
import { css } from "./css";
import { backend } from "./backend";
import { datos } from "./datos";
import { infra } from "./infra";
import { arquitectura } from "./arquitectura";
import { seguridad } from "./seguridad";
import { proceso } from "./proceso";
import { CATEGORY_CONFIG, DEFAULT_CATEGORY } from "../categories";

/**
 * La clave ES el id del grupo. No hace falta un segundo mapa que traduzca
 * id -> lista: ese segundo mapa fue el bug. `Object.entries(GROUPS)` da
 * `[id, entradas]`, que es justo lo que necesita el `flatMap`.
 */
const GROUPS = {
  frontend,
  css,
  backend,
  datos,
  infra,
  arquitectura,
  seguridad,
  proceso,
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Lista plana. Cada entrada lleva su grupo resuelto, su slug garantizado y la
 * config visual del grupo.
 *
 * La config se adjunta aqui y no en cada entrada: son 174 objetos y el color de
 * un grupo no es propiedad de un término. Si mañana cambia la paleta del grupo
 * frontend, cambia en un solo archivo.
 */
export const ALL_TERMS = Object.entries(GROUPS).flatMap(([group, entries]) => {
  const config = CATEGORY_CONFIG[group] ?? CATEGORY_CONFIG[DEFAULT_CATEGORY];

  return entries.map((entry) => ({
    ...entry,
    group,
    config,
    slug: entry.slug ?? slugify(entry.term),
    aliases: entry.aliases ?? [],
  }));
});

/**
 * Índice por slug. Se construye una vez por proceso: el módulo se evalúa una
 * única vez y todas las rutas leen el mismo Map, no lo recalculan.
 */
const BY_SLUG = new Map(ALL_TERMS.map((term) => [term.slug, term]));

export function getTerm(slug) {
  return BY_SLUG.get(slug) ?? null;
}

export function getAllTermSlugs() {
  return ALL_TERMS.map((term) => term.slug);
}

export function getTermCount() {
  return ALL_TERMS.length;
}
