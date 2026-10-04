import es from "@/locales/es.json";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

import { getCategoryIds } from "@/lib/estudios";
import { buildEstudiosLabels } from "@/lib/estudiosLabels";
import { CATEGORY_ORDER } from "@/data/glosario/categories";
import { buildGlosarioClientLabels } from "@/lib/glosarioLabels";

/*
 * SOLO SERVIDOR. Los componentes cliente reciben estos mapas por props y eligen
 * el idioma activo en el navegador.
 *
 * Por que: `src/utils/translations.js` hace `import es/en/de.json` estatico, asi
 * que cualquier componente cliente que lo importe arrastra los tres locale files
 * al bundle. Medido: 85 KB de JSON crudo para pintar ocho etiquetas del menu.
 * Lo que el arbol compartido realmente necesita son tres secciones
 * (Header + Footer + Estudios) por tres idiomas: 9.7 KB.
 *
 * Por que tres idiomas y no uno: el idioma elegido vive en `localStorage`
 * (LanguageContext), o sea que el servidor no lo puede conocer en el primer
 * render. Si solo mandáramos el español, cambiar de idioma exigiría un round-trip
 * al servidor. Mandando los tres, el cambio sigue siendo instantáneo y en
 * cliente, y el HTML inicial (que es español) se sirve igual.
 */

const LOCALES = { es, en, de };

const SECTION = (section) => ({
  es: LOCALES.es[section] ?? {},
  en: LOCALES.en[section] ?? {},
  de: LOCALES.de[section] ?? {},
});

export const headerLabels = SECTION("Header");

export const footerLabels = SECTION("Footer");

let estudiosLabelsCache = null;

/**
 * Los labels de /estudios incluyen `categoryLabels`, que depende de las
 * carpetas bajo `src/content/estudios`. Se calcula una vez por proceso.
 */
export function getEstudiosLabels() {
  if (!estudiosLabelsCache) {
    const categoryIds = getCategoryIds();
    estudiosLabelsCache = {
      es: buildEstudiosLabels("es", categoryIds),
      en: buildEstudiosLabels("en", categoryIds),
      de: buildEstudiosLabels("de", categoryIds),
    };
  }
  return estudiosLabelsCache;
}

let glosarioLabelsCache = null;

/**
 * Los grupos del glosario salen de `CATEGORY_ORDER`, que es un array cerrado: no
 * dependen del disco, así que no hace falta `fs`. Aun así se cachea igual, para
 * que las tres estructuras se construyan una vez por proceso.
 *
 * Ojo: usa `buildGlosarioClientLabels`, no `buildGlosarioLabels`. La isla solo
 * lee siete etiquetas y el nombre de cada grupo; mandar el juego completo por
 * los tres idiomas costaba 44 KB de payload en cada carga de `/glosario`.
 */
export function getGlosarioLabels() {
  if (!glosarioLabelsCache) {
    glosarioLabelsCache = {
      es: buildGlosarioClientLabels("es", CATEGORY_ORDER),
      en: buildGlosarioClientLabels("en", CATEGORY_ORDER),
      de: buildGlosarioClientLabels("de", CATEGORY_ORDER),
    };
  }
  return glosarioLabelsCache;
}