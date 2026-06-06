"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  language: "es",
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("language");
        if (["es", "en", "de"].includes(saved)) return saved;
      }
    } catch {}
    return "es";
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLang) => {
    localStorage.setItem("language", newLang);
    document.documentElement.lang = newLang;
    setLanguageState(newLang);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: newLang }));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
