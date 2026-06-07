"use client";

import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Terminal, Server, Database, Globe, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderTextWithHTML = (text) => {
    return { __html: text };
  };

  const translations = {
    section_title: getTranslation(language, "Projects.section_title"),
    main_title: getTranslation(language, "Projects.main_title"),
    main_title_highlight: getTranslation(language, "Projects.main_title_highlight"),
    subtitle: getTranslation(language, "Projects.subtitle"),
    subtitle_highlight: getTranslation(language, "Projects.subtitle_highlight"),
    description: getTranslation(language, "Projects.description"),
    architecture_title: getTranslation(language, "Projects.architecture_title"),
    frontend_title: getTranslation(language, "Projects.frontend_title"),
    backend_title: getTranslation(language, "Projects.backend_title"),
    database_title: getTranslation(language, "Projects.database_title"),
    deployment_title: getTranslation(language, "Projects.deployment_title"),
    cta_title: getTranslation(language, "Projects.cta_title"),
    cta_description: getTranslation(language, "Projects.cta_description"),
    cta_button: getTranslation(language, "Projects.cta_button"),
    projects: getTranslation(language, "Projects.projects"),
  };

  const rawProjects = Array.isArray(translations.projects) ? translations.projects : [];

  const projectConfigs = {
    1: {
      demoUrl: "https://golive-hu5d.onrender.com",
      codeUrl: "https://github.com/Gorkacp/GoLive",
      imageUrl: "/img/GoLive.png",
    },
    2: {
      demoUrl: "",
      codeUrl: "https://github.com/Gorkacp/JARVIS",
      imageUrl: "/img/Jarvis.svg",
    }
  };

  const projects = rawProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    technologies: Array.isArray(p.technologies) ? p.technologies : [],
    demoUrl: projectConfigs[p.id]?.demoUrl || "",
    codeUrl: projectConfigs[p.id]?.codeUrl || "",
    imageUrl: projectConfigs[p.id]?.imageUrl || "",
    impact: p.impact || "",
    status: p.status || "completed",
    architecture: p.architecture || {
      frontend: "",
      backend: "",
      database: "",
      deployment: ""
    }
  }));

  const activeProject = projects[activeIndex] || projects[0];

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const architectureCards = [
    {
      title: translations.frontend_title,
      description: activeProject.architecture?.frontend || "",
      gradient: "from-blue-900/20 to-blue-950/10",
      border: "border-blue-500/20",
      hoverBorder: "hover:border-blue-400/30",
      iconBg: "from-blue-600/20 to-cyan-600/20",
      iconBorder: "border-blue-500/30",
      icon: <Terminal className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" />,
      delay: 0.1
    },
    {
      title: translations.backend_title,
      description: activeProject.architecture?.backend || "",
      gradient: "from-purple-900/20 to-purple-950/10",
      border: "border-purple-500/20",
      hoverBorder: "hover:border-purple-400/30",
      iconBg: "from-purple-600/20 to-pink-600/20",
      iconBorder: "border-purple-500/30",
      icon: <Server className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" />,
      delay: 0.2
    },
    {
      title: translations.database_title,
      description: activeProject.architecture?.database || "",
      gradient: "from-green-900/20 to-green-950/10",
      border: "border-green-500/20",
      hoverBorder: "hover:border-green-400/30",
      iconBg: "from-green-600/20 to-emerald-600/20",
      iconBorder: "border-green-500/30",
      icon: <Database className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" />,
      delay: 0.3
    },
    {
      title: translations.deployment_title,
      description: activeProject.architecture?.deployment || "",
      gradient: "from-orange-900/20 to-orange-950/10",
      border: "border-orange-500/20",
      hoverBorder: "hover:border-orange-400/30",
      iconBg: "from-orange-600/20 to-yellow-600/20",
      iconBorder: "border-orange-500/30",
      icon: <Globe className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-400" />,
      delay: 0.4
    }
  ];

  return (
    <section
      id="projects"
      className="
        relative w-full py-20 md:py-32 px-4 md:px-6 font-poppins
        bg-gradient-to-b from-black via-gray-950 to-gray-900
        text-white overflow-hidden
      "
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-900/5 rounded-full blur-3xl hidden md:block" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl hidden md:block" />

      <div className="max-w-[1400px] mx-auto relative z-10">

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

        {/* Carrusel en móvil */}
        {isMobile && (
          <div className="mb-8">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={activeProject} />
                </motion.div>
              </AnimatePresence>

              {projects.length > 1 && (
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={goToPrev}
                    className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
                    aria-label="Proyecto anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`transition-all duration-300 ${
                          index === activeIndex
                            ? "w-6 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            : "w-2 h-2 bg-white/20 rounded-full hover:bg-white/40"
                        }`}
                        aria-label={`Proyecto ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={goToNext}
                    className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
                    aria-label="Proyecto siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className={`${isMobile ? 'col-span-full' : 'lg:col-span-2'} space-y-8`}>
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white px-2">
                {translations.architecture_title}
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {architectureCards.map((card, index) => (
                  <motion.div
                    key={`${activeProject.id}-${index}`}
                    className={`
                      col-span-1
                      p-4 sm:p-5 md:p-6 rounded-xl
                      bg-gradient-to-br ${card.gradient}
                      border ${card.border} ${card.hoverBorder} transition-all duration-300
                      h-full flex flex-col
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: card.delay }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className={`
                        w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg
                        bg-gradient-to-br ${card.iconBg}
                        border ${card.iconBorder}
                        flex items-center justify-center flex-shrink-0
                      `}>
                        {card.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
                          {card.title}
                        </h4>
                      </div>
                    </div>
                    <p 
                      className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1"
                      dangerouslySetInnerHTML={renderTextWithHTML(card.description)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

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

          {/* Carrusel de proyectos - Solo en desktop */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={activeProject} />
                  </motion.div>
                </AnimatePresence>

                {/* Controles del carrusel */}
                {projects.length > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button
                      onClick={goToPrev}
                      className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
                      aria-label="Proyecto anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      {projects.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`transition-all duration-300 ${
                            index === activeIndex
                              ? "w-6 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                              : "w-2 h-2 bg-white/20 rounded-full hover:bg-white/40"
                          }`}
                          aria-label={`Proyecto ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={goToNext}
                      className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
                      aria-label="Proyecto siguiente"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </section>
  );
}
