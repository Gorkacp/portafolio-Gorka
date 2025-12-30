"use client";

import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Rocket, Terminal, Server, Database, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { getTranslation } from "@/utils/translations";

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);
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

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Función para renderizar texto con HTML
  const renderTextWithHTML = (text) => {
    return { __html: text };
  };

  // Obtener traducciones
  const translations = {
    section_title: getTranslation(language, "Projects.section_title"),
    main_title: getTranslation(language, "Projects.main_title"),
    main_title_highlight: getTranslation(language, "Projects.main_title_highlight"),
    subtitle: getTranslation(language, "Projects.subtitle"),
    subtitle_highlight: getTranslation(language, "Projects.subtitle_highlight"),
    description: getTranslation(language, "Projects.description"),
    architecture_title: getTranslation(language, "Projects.architecture_title"),
    frontend_title: getTranslation(language, "Projects.frontend_title"),
    frontend_description: getTranslation(language, "Projects.frontend_description"),
    backend_title: getTranslation(language, "Projects.backend_title"),
    backend_description: getTranslation(language, "Projects.backend_description"),
    database_title: getTranslation(language, "Projects.database_title"),
    database_description: getTranslation(language, "Projects.database_description"),
    deployment_title: getTranslation(language, "Projects.deployment_title"),
    deployment_description: getTranslation(language, "Projects.deployment_description"),
    cta_title: getTranslation(language, "Projects.cta_title"),
    cta_description: getTranslation(language, "Projects.cta_description"),
    cta_button: getTranslation(language, "Projects.cta_button"),
    project: getTranslation(language, "Projects.project"),
  };

  // Cargar proyecto desde traducciones
  const projectData = {
    id: 1,
    title: translations.project?.title || "GoLive Platform",
    description: translations.project?.description || "",
    technologies: Array.isArray(translations.project?.technologies) 
      ? translations.project.technologies 
      : JSON.parse(translations.project?.technologies || '[]'),
    demoUrl: "https://golive-hu5d.onrender.com",
    codeUrl: "https://github.com/Gorkacp/GoLive",
    imageUrl: "/img/GoLive.png",
    impact: translations.project?.impact || ""
  };

  const projects = [projectData];

  // Loading (evita SSR issues)
  if (!isMounted) {
    return (
      <section
        id="projects"
        className="
          relative w-full py-20 md:py-32 px-4 md:px-6 font-poppins
          bg-gradient-to-b from-black via-gray-950 to-gray-900
          text-white overflow-hidden
        "
      >
        <div className="h-96"></div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="
        relative w-full py-20 md:py-32 px-4 md:px-6 font-poppins
        bg-gradient-to-b from-black via-gray-950 to-gray-900
        text-white overflow-hidden
      "
    >
      {/* Efectos de fondo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-900/5 rounded-full blur-3xl hidden md:block" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl hidden md:block" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header simplificado */}
        <div className="max-w-3xl mb-12 md:mb-16 px-2">
          <span className="
            uppercase tracking-widest text-xs md:text-sm 
            text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400
            font-medium block mb-2
          ">
            {translations.section_title}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {translations.main_title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              {translations.main_title_highlight}
            </span>{" "}
            <span className="block text-xl sm:text-2xl md:text-3xl mt-3 md:mt-4 font-normal">
              {translations.subtitle}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {translations.subtitle_highlight}
              </span>
            </span>
          </h2>

          <p 
            className="text-gray-300 text-base md:text-lg mt-4 md:mt-6 leading-relaxed"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.description)}
          />
        </div>

        {/* En móviles: Proyecto primero */}
        {isMobile && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={projects[0]} />
            </motion.div>
          </div>
        )}

        {/* Layout: Explicación + Proyecto */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Explicación técnica simplificada */}
          <div className={`${isMobile ? 'col-span-full' : 'lg:col-span-2'} space-y-8`}>
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white px-2">
                {translations.architecture_title}
              </h3>
              
              {/* GRID 2x2 EN MÓVILES - CORREGIDO */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Frontend - COLUMNA IZQUIERDA */}
                <motion.div 
                  className="
                    col-span-1
                    p-4 sm:p-5 md:p-6 rounded-xl
                    bg-gradient-to-br from-blue-900/20 to-blue-950/10
                    border border-blue-500/20
                    hover:border-blue-400/30 transition-all duration-300
                    h-full flex flex-col
                  "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="
                      w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg
                      bg-gradient-to-br from-blue-600/20 to-cyan-600/20
                      border border-blue-500/30
                      flex items-center justify-center flex-shrink-0
                    ">
                      <Terminal className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
                        {translations.frontend_title}
                      </h4>
                    </div>
                  </div>
                  <p 
                    className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1"
                    dangerouslySetInnerHTML={renderTextWithHTML(translations.frontend_description)}
                  />
                </motion.div>

                {/* Backend - COLUMNA DERECHA */}
                <motion.div 
                  className="
                    col-span-1
                    p-4 sm:p-5 md:p-6 rounded-xl
                    bg-gradient-to-br from-purple-900/20 to-purple-950/10
                    border border-purple-500/20
                    hover:border-purple-400/30 transition-all duration-300
                    h-full flex flex-col
                  "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="
                      w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg
                      bg-gradient-to-br from-purple-600/20 to-pink-600/20
                      border border-purple-500/30
                      flex items-center justify-center flex-shrink-0
                    ">
                      <Server className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
                        {translations.backend_title}
                      </h4>
                    </div>
                  </div>
                  <p 
                    className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1"
                    dangerouslySetInnerHTML={renderTextWithHTML(translations.backend_description)}
                  />
                </motion.div>

                {/* Base de Datos - COLUMNA IZQUIERDA (fila 2) */}
                <motion.div 
                  className="
                    col-span-1
                    p-4 sm:p-5 md:p-6 rounded-xl
                    bg-gradient-to-br from-green-900/20 to-green-950/10
                    border border-green-500/20
                    hover:border-green-400/30 transition-all duration-300
                    h-full flex flex-col
                  "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="
                      w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg
                      bg-gradient-to-br from-green-600/20 to-emerald-600/20
                      border border-green-500/30
                      flex items-center justify-center flex-shrink-0
                    ">
                      <Database className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
                        {translations.database_title}
                      </h4>
                    </div>
                  </div>
                  <p 
                    className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1"
                    dangerouslySetInnerHTML={renderTextWithHTML(translations.database_description)}
                  />
                </motion.div>

                {/* Despliegue - COLUMNA DERECHA (fila 2) */}
                <motion.div 
                  className="
                    col-span-1
                    p-4 sm:p-5 md:p-6 rounded-xl
                    bg-gradient-to-br from-orange-900/20 to-orange-950/10
                    border border-orange-500/20
                    hover:border-orange-400/30 transition-all duration-300
                    h-full flex flex-col
                  "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="
                      w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg
                      bg-gradient-to-br from-orange-600/20 to-yellow-600/20
                      border border-orange-500/30
                      flex items-center justify-center flex-shrink-0
                    ">
                      <Globe className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
                        {translations.deployment_title}
                      </h4>
                    </div>
                  </div>
                  <p 
                    className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1"
                    dangerouslySetInnerHTML={renderTextWithHTML(translations.deployment_description)}
                  />
                </motion.div>
              </div>
            </div>

            {/* CTA simplificado */}
            <motion.div 
              className="
                p-5 md:p-6 rounded-2xl
                bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/10
                border border-white/10
                backdrop-blur-sm
              "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                {translations.cta_title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-6">
                {translations.cta_description}
              </p>
              <a
                href="#contact"
                className="
                  inline-flex items-center justify-center gap-3 px-5 md:px-6 py-3 rounded-xl
                  bg-gradient-to-r from-purple-600 to-blue-600
                  text-white font-semibold text-sm md:text-base
                  hover:from-purple-700 hover:to-blue-700
                  hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]
                  transition-all duration-300
                  w-full sm:w-auto
                "
              >
                <Rocket className="w-4 h-4 md:w-5 md:h-5" />
                {translations.cta_button}
              </a>
            </motion.div>
          </div>

          {/* Proyecto a la derecha - Solo en desktop */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="sticky top-24"
              >
                <ProjectCard project={projects[0]} />
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Separador inferior */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </section>
  );
}