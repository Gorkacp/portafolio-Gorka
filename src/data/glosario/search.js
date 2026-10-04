// src/data/glosario/search.js
//
// Aislada a proposito. La funcion de busqueda la usa la isla de cliente, y si
// viviera en `terms/index.js` el import arrastraria los ocho archivos de
// terminos al bundle del navegador: los 174 terminosviajarian dos veces, una
// como props serializados en el payload RSC y otra como modulo de JS. Medido:
// 18.4 KB de chunk que no contenian una sola linea util para el buscador.
//
// Este modulo no importa nada. Si alguna vez necesita importar, la aislacion
// dejo de servir y hay que mover la busqueda al servidor.

/**
 * Coincide por término, alias y por el texto de qué es / para qué sirve.
 *
 * `filter(Boolean)` no es cosmetico: la vista de tarjeta que viaja al
 * navegador no lleva `why`, y sin esto la cadena buscada contendria el literal
 * "undefined" y devolveria terminos que no tienen nada que ver.
 */
export function searchTerms(entries, query) {
  const q = query.trim().toLowerCase();
  if (!q) return entries;

  return entries.filter((term) =>
    [term.term, ...(term.aliases ?? []), term.what, term.why]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
