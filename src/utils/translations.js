import es from "@/locales/es.json";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

const translations = {
  es,
  en,
  de,
};

export function getTranslation(lang, key) {
  const keys = key.split(".");
  let value = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
