"use client";

import { ExternalLink, Github, Zap, ChevronRight, Code, Eye } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTranslation } from "@/utils/translations";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [techsToShow, setTechsToShow] = useState(6);
  const [language, setLanguage] = useState("es");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Escuchar cambios de idioma
  useEffect(() => {
    setIsMounted(true);
    
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem("language") || "es";
      setLanguage(savedLang);
    };

    handleLanguageChange();
    
    window.addEventListener("languageChange", handleLanguageChange);
    
    const interval = setInterval(handleLanguageChange, 1000);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
      clearInterval(interval);
    };
  }, []);

  // Detectar tamaño de pantalla con más puntos de quiebre
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 480) {
        setTechsToShow(3);
      } else if (width < 640) {
        setTechsToShow(4);
      } else {
        setTechsToShow(6);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Obtener traducciones
  const translations = {
    full_stack_badge: getTranslation(language, "ProjectCard.full_stack_badge"),
    demo_button: getTranslation(language, "ProjectCard.demo_button"),
    code_button: getTranslation(language, "ProjectCard.code_button"),
    view_more_button: getTranslation(language, "ProjectCard.view_more_button"),
    impact_label: getTranslation(language, "ProjectCard.impact_label"),
  };

  if (!project || !isMounted) return null;

  // Función para navegar a la página de detalles CORREGIDA
  const handleViewMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Generar slug del proyecto
    const slug = project.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    // Resetear scroll al principio antes de navegar
    // Esto evita que se mantenga la posición del scroll
    if (typeof window !== 'undefined') {
      // Opción 1: Reset instantáneo
      window.scrollTo(0, 0);
      
      // Opción 2: Con comportamiento smooth
      // window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    
    // Navegar a la página de detalles
    router.push(`/proyectos/${slug}`, { scroll: true }); // scroll: true para reset de Next.js
    
    // Reset adicional como backup
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }, 50);
  };

  return (
    <motion.article
      className="
        flex flex-col h-full
        bg-gradient-to-br from-white/5 to-transparent
        border border-white/10
        rounded-2xl overflow-hidden
        backdrop-blur-sm
        shadow-xl md:shadow-2xl
        transition-all duration-300
        hover:border-purple-500/40
        hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]
        hover:translate-y-[-4px]
        group/card
        mx-auto w-full max-w-sm md:max-w-none
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
    >
      {/* Imagen */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="
            object-cover w-full h-full
            transition-transform duration-500
            group-hover/card:scale-110
          "
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/90 via-black/50 to-transparent
          opacity-70
        " />
        
        {/* Badge Full Stack */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <div className="
            px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg
            bg-gradient-to-r from-blue-500/20 to-purple-500/20
            border border-white/20
            backdrop-blur-md
            flex items-center gap-1.5 sm:gap-2
          ">
            <Code className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
            <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
              {translations.full_stack_badge}
            </span>
          </div>
        </div>

        {/* Título superpuesto */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
          <h3 className="
            text-base sm:text-lg md:text-xl font-bold text-white
            line-clamp-1
          ">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Contenido compacto */}
      <div className="flex flex-col flex-1 gap-3 sm:gap-4 p-4 sm:p-5">
        {/* Descripción */}
        <div className="flex-1">
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Impacto técnico */}
        <div className="
          p-3 rounded-xl
          bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
          border border-white/10
        ">
          <div className="flex items-start gap-2">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[10px] sm:text-xs font-semibold text-yellow-300 mb-0.5">
                {translations.impact_label}
              </div>
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">
                {project.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Tecnologías compactas */}
        <div className="mt-auto pt-2 sm:pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.slice(0, techsToShow).map((tech) => (
              <span
                key={tech}
                className="
                  text-[9px] xs:text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full
                  bg-gradient-to-r from-blue-500/10 to-purple-500/10
                  border border-blue-500/20
                  text-blue-300 font-medium
                  truncate max-w-[70px] xs:max-w-[80px] sm:max-w-none
                "
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > techsToShow && (
              <span className="
                text-[9px] xs:text-[10px] sm:text-[11px] 
                px-2 sm:px-2.5 py-1 sm:py-1.5 
                text-gray-400 whitespace-nowrap
              ">
                +{project.technologies.length - techsToShow}
              </span>
            )}
          </div>
        </div>

        {/* Acciones - BOTONES RESPONSIVE */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-2 sm:pt-3">
          {/* Primera fila para móviles: Demo y Código */}
          <div className="flex gap-2 sm:gap-3 xs:flex-1">
            {/* Botón Demo */}
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-1.5 sm:gap-2
                px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl
                bg-gradient-to-r from-blue-600 to-purple-600
                text-white text-xs sm:text-sm font-semibold
                hover:from-blue-700 hover:to-purple-700
                hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]
                transition-all duration-300
                group/btn
                whitespace-nowrap
                flex-1 xs:flex-none
                min-w-0
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={14} className="sm:size-[16px] flex-shrink-0" />
              <span className="truncate hidden xs:inline">{translations.demo_button}</span>
              <span className="truncate xs:hidden">Demo</span>
              <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover/btn:translate-x-1 transition-transform flex-shrink-0" />
            </motion.a>

            {/* Botón Código */}
            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-1.5 sm:gap-2
                px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl
                bg-white/5 border border-white/20
                text-white text-xs sm:text-sm font-semibold
                hover:bg-white/10 hover:border-white/30
                transition-all duration-300
                whitespace-nowrap
                flex-1 xs:flex-none
                min-w-0
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={14} className="sm:size-[16px] flex-shrink-0" />
              <span className="truncate hidden xs:inline">{translations.code_button}</span>
              <span className="truncate xs:hidden">Code</span>
            </motion.a>
          </div>

          {/* Botón Ver Más - siempre ancho completo en móviles */}
          <motion.button
            onClick={handleViewMore}
            className="
              inline-flex items-center justify-center gap-1.5 sm:gap-2
              px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl
              bg-gradient-to-r from-purple-500/20 to-pink-500/20
              border border-purple-500/30
              text-white text-xs sm:text-sm font-semibold
              hover:from-purple-500/30 hover:to-pink-500/30
              hover:border-purple-500/50
              hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]
              transition-all duration-300
              group/viewmore
              whitespace-nowrap
              w-full xs:w-auto xs:flex-1
              min-w-0
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={14} className="sm:size-[16px] flex-shrink-0" />
            <span className="truncate">{translations.view_more_button || "Ver más"}</span>
            <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover/viewmore:translate-x-1 transition-transform flex-shrink-0" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}