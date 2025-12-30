"use client";

import { useState, useEffect } from "react";
import {
  Code2,
  Layers,
  Database,
  Server,
} from "lucide-react";
import { getTranslation } from "@/utils/translations";

export default function About() {
  const [language, setLanguage] = useState("es");
  const [isMounted, setIsMounted] = useState(false);

  // Escuchar cambios de idioma
  useEffect(() => {
    setIsMounted(true);
    
    // Función para manejar cambios de idioma
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem("language") || "es";
      setLanguage(savedLang);
    };

    // Establecer idioma inicial
    handleLanguageChange();
    
    // Escuchar cambios de idioma desde el Header
    window.addEventListener("languageChange", handleLanguageChange);
    
    // También verificar periódicamente
    const interval = setInterval(handleLanguageChange, 1000);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
      clearInterval(interval);
    };
  }, []);

  // Función para renderizar texto con HTML
  const renderTextWithHTML = (text) => {
    return { __html: text };
  };

  // Obtener traducciones
  const translations = {
    title: getTranslation(language, "About.title"),
    subtitle: getTranslation(language, "About.subtitle"),
    paragraph1: getTranslation(language, "About.paragraph1"),
    paragraph2: getTranslation(language, "About.paragraph2"),
    paragraph3: getTranslation(language, "About.paragraph3"),
    frontend_title: getTranslation(language, "About.frontend_title"),
    frontend_tech: getTranslation(language, "About.frontend_tech"),
    backend_title: getTranslation(language, "About.backend_title"),
    backend_tech: getTranslation(language, "About.backend_tech"),
    databases_title: getTranslation(language, "About.databases_title"),
    databases_tech: getTranslation(language, "About.databases_tech"),
  };

  // Loading (evita SSR issues)
  if (!isMounted) {
    return (
      <section
        id="about"
        className="
          relative w-full min-h-[auto] lg:min-h-screen py-20 sm:py-24 md:py-32 px-4 sm:px-6 font-poppins
          bg-gradient-to-b from-gray-900 via-black to-black
          text-white
          flex items-center
        "
      >
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="h-64"></div>
        </div>
      </section>
    );
  }

  // Asegurar que las tecnologías sean arrays
  const frontendTechs = Array.isArray(translations.frontend_tech) 
    ? translations.frontend_tech 
    : JSON.parse(translations.frontend_tech || '[]');
  
  const backendTechs = Array.isArray(translations.backend_tech)
    ? translations.backend_tech
    : JSON.parse(translations.backend_tech || '[]');
  
  const databasesTechs = Array.isArray(translations.databases_tech)
    ? translations.databases_tech
    : JSON.parse(translations.databases_tech || '[]');

  return (
    <section
      id="about"
      className="
        relative w-full min-h-[auto] lg:min-h-screen py-20 sm:py-24 md:py-32 px-4 sm:px-6 font-poppins
        bg-gradient-to-b from-gray-900 via-black to-black
        text-white
        flex items-center
      "
    >
      {/* Separador superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">

        {/* Texto */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          <span className="uppercase tracking-widest text-xs sm:text-sm text-purple-400">
            {translations.title}
          </span>

          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.subtitle)}
          />

          <p 
            className="text-gray-300 text-base sm:text-lg leading-relaxed"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.paragraph1)}
          />

          <p 
            className="text-gray-400 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.paragraph2)}
          />

          <p 
            className="text-gray-400 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.paragraph3)}
          />
        </div>

        {/* Bloques técnicos */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">

          {/* Frontend */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              <h3 className="text-lg sm:text-xl font-semibold">
                {translations.frontend_title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {frontendTechs.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm
                    bg-white/5 border border-white/10
                    text-gray-300
                    hover:bg-white/10 transition duration-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Server className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-semibold">
                {translations.backend_title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {backendTechs.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm
                    bg-white/5 border border-white/10
                    text-gray-300
                    hover:bg-white/10 transition duration-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Databases & Tools */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
              <h3 className="text-lg sm:text-xl font-semibold">
                {translations.databases_title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {databasesTechs.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm
                    bg-white/5 border border-white/10
                    text-gray-300
                    hover:bg-white/10 transition duration-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}