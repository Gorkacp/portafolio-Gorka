"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, ExternalLink, Code2, Send, FileCode, User, FolderKanban } from "lucide-react";
import { useState, useEffect } from "react";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useLanguage();

  // Obtener traducciones
  const translations = {
    title: getTranslation(language, "Footer.title"),
    contact_title: getTranslation(language, "Footer.contact_title"),
    contact_title_highlight: getTranslation(language, "Footer.contact_title_highlight"),
    navigation_title: getTranslation(language, "Footer.navigation_title"),
    navigation_title_highlight: getTranslation(language, "Footer.navigation_title_highlight"),
    connect_title: getTranslation(language, "Footer.connect_title"),
    connect_title_highlight: getTranslation(language, "Footer.connect_title_highlight"),
    quick_links: getTranslation(language, "Footer.quick_links"),
    social: getTranslation(language, "Footer.social"),
    copyright: getTranslation(language, "Footer.copyright"),
    built_with: getTranslation(language, "Footer.built_with"),
    and: getTranslation(language, "Footer.and"),
    links: getTranslation(language, "Footer.links"),
    version: getTranslation(language, "Footer.version"),
    back_to_top: getTranslation(language, "Footer.back_to_top"),
  };

  // Cargar quick links desde traducciones
  const quickLinks = () => {
    try {
      const links = Array.isArray(translations.quick_links) 
        ? translations.quick_links 
        : JSON.parse(translations.quick_links || '[]');
      
      const icons = [
        <ArrowUp key="home" className="w-4 h-4 rotate-45" />,
        <User key="about" className="w-4 h-4" />,
        <FolderKanban key="projects" className="w-4 h-4" />,
        <FileCode key="certifications" className="w-4 h-4" />,
        <Send key="contact" className="w-4 h-4" />
      ];
      
      return links.map((link, index) => ({
        ...link,
        icon: icons[index] || <ArrowUp className="w-4 h-4 rotate-45" />
      }));
    } catch (error) {
      console.error("Error loading quick links:", error);
      return [
        { name: "Inicio", href: "#home", icon: <ArrowUp className="w-4 h-4 rotate-45" /> },
        { name: "Sobre mí", href: "#about", icon: <User className="w-4 h-4" /> },
        { name: "Proyectos", href: "#projects", icon: <FolderKanban className="w-4 h-4" /> },
        { name: "Certificaciones", href: "#certifications", icon: <FileCode className="w-4 h-4" /> },
        { name: "Contacto", href: "#contact", icon: <Send className="w-4 h-4" /> },
      ];
    }
  };

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Controlar progreso de scroll y mostrar botón
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll suave
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading (evita SSR issues)
  return (
    <footer className="
      relative w-full py-8 md:py-16 px-4 md:px-6 font-poppins
      bg-gradient-to-b from-gray-900 via-black to-black
      text-white overflow-hidden
      border-t border-white/10
    ">
      {/* Separador superior */}
      <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      {/* Efectos de fondo sutiles */}
      <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-purple-900/5 rounded-full blur-3xl" />
      <div className="absolute top-10 right-1/4 w-48 h-48 bg-blue-900/5 rounded-full blur-3xl" />

      {/* Barra de progreso */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-900">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={false}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Contenido principal - Más compacto en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-8 md:mb-16">
          
          {/* Columna 1: Brand y contacto */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <h3 className="text-xl md:text-3xl font-bold leading-tight">
                Gorka{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Carmona
                </span>
              </h3>
              <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">
                <span className="text-white font-medium">{translations.title || "Desarrollador Full Stack"}</span> 
              </p>
            </div>

            {/* Email - Simple y directo */}
            <div className="pt-1 md:pt-2">
              <div className="mb-2 md:mb-4">
                <h4 className="text-lg md:text-2xl font-bold text-white">
                  {translations.contact_title || "Contacto"}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    {translations.contact_title_highlight || "Directo"}
                  </span>
                </h4>
              </div>
              <a 
                href={`mailto:${translations.social?.email || 'gorkacarmonapino@gmail.com'}`}
                className="
                  text-white font-medium text-xs md:text-base
                  hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400 hover:bg-clip-text
                  transition-all duration-300
                  flex items-center gap-1 group/email
                  break-words
                "
              >
                <Mail className="w-3 h-3 md:w-4 md:h-4 text-purple-400 mr-1 md:mr-2 flex-shrink-0" />
                <span className="truncate">{translations.social?.email || "gorkacarmonapino@gmail.com"}</span>
                <ExternalLink className="
                  w-3 h-3 text-gray-500 ml-1 flex-shrink-0
                  group-hover/email:text-purple-400
                  group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5
                  transition-all duration-300
                " />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación rápida */}
          <div className="space-y-3 md:space-y-4">
            <div className="mb-2 md:mb-4">
              <h4 className="text-lg md:text-2xl font-bold text-white">
                {translations.navigation_title || "Navegación"}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {translations.navigation_title_highlight || "Rápida"}
                </span>
              </h4>
            </div>
            
            <div className="space-y-0.5 md:space-y-1">
              {quickLinks().map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="
                    flex items-center justify-between
                    text-gray-400 hover:text-white
                    py-1.5 md:py-2 px-1.5 md:px-2 rounded-lg
                    hover:bg-white/[0.02]
                    transition-all duration-200
                    group/link
                  "
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="
                      w-7 h-7 md:w-8 md:h-8 rounded-lg
                      bg-gradient-to-br from-purple-600/20 to-blue-600/20
                      border border-purple-500/30
                      flex items-center justify-center flex-shrink-0
                      group-hover/link:border-purple-500/50
                      group-hover/link:from-purple-600/30 group-hover/link:to-blue-600/30
                      transition-all duration-200
                    ">
                      <span className="text-purple-400">
                        {link.icon}
                      </span>
                    </div>
                    <span className="font-medium text-xs md:text-base">{link.name}</span>
                  </div>
                  <ArrowUp className="
                    w-3 h-3 text-gray-600 rotate-45 flex-shrink-0
                    group-hover/link:text-purple-400
                    group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5
                    transition-all duration-200
                  " />
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 3: Social links */}
          <div className="space-y-3 md:space-y-4">
            <div className="mb-2 md:mb-4">
              <h4 className="text-lg md:text-2xl font-bold text-white">
                {translations.connect_title || "Conecta"}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  {translations.connect_title_highlight || "Conmigo"}
                </span>
              </h4>
            </div>
            
            <div className={`${isMobile ? 'flex gap-2' : 'space-y-3'}`}>
              <motion.a
                href="https://github.com/Gorkacp"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${isMobile ? 'flex-1 min-w-0' : 'flex items-center justify-between'}
                  p-2 md:p-3 rounded-lg
                  text-gray-400 hover:text-white
                  hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20
                  border border-transparent hover:border-purple-500/30
                  transition-all duration-300
                  group/github
                `}
                aria-label="GitHub"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`flex ${isMobile ? 'flex-col items-center gap-1' : 'items-center gap-3'}`}>
                  <div className="
                    w-8 h-8 md:w-10 md:h-10 rounded-lg
                    bg-gradient-to-br from-purple-600/20 to-blue-600/20
                    border border-purple-500/30
                    flex items-center justify-center flex-shrink-0
                    group-hover/github:border-purple-500/50
                    group-hover/github:from-purple-600/30 group-hover/github:to-blue-600/30
                    transition-all duration-300
                  ">
                    <Github className="w-4 h-4 md:w-5 md:h-5 text-purple-400 group-hover/github:text-purple-300 transition-colors" />
                  </div>
                  <div className={`${isMobile ? 'text-center' : ''}`}>
                    <div className="text-xs text-gray-500">{translations.social?.github_label || "GitHub"}</div>
                    <div className="text-xs md:text-base font-medium text-white">
                      {translations.social?.github_subtitle || "Proyectos"}
                    </div>
                  </div>
                </div>
                {!isMobile && (
                  <ExternalLink className="
                    w-3 h-3 text-gray-500 flex-shrink-0
                    group-hover/github:text-purple-400
                    group-hover/github:translate-x-0.5 group-hover/github:-translate-y-0.5
                    transition-all duration-300
                  " />
                )}
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/gorka-carmona-pino-803902294/"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${isMobile ? 'flex-1 min-w-0' : 'flex items-center justify-between'}
                  p-2 md:p-3 rounded-lg
                  text-gray-400 hover:text-white
                  hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20
                  border border-transparent hover:border-blue-500/30
                  transition-all duration-300
                  group/linkedin
                `}
                aria-label="LinkedIn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`flex ${isMobile ? 'flex-col items-center gap-1' : 'items-center gap-3'}`}>
                  <div className="
                    w-8 h-8 md:w-10 md:h-10 rounded-lg
                    bg-gradient-to-br from-blue-600/20 to-cyan-600/20
                    border border-blue-500/30
                    flex items-center justify-center flex-shrink-0
                    group-hover/linkedin:border-blue-500/50
                    group-hover/linkedin:from-blue-600/30 group-hover/linkedin:to-cyan-600/30
                    transition-all duration-300
                  ">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-blue-400 group-hover/linkedin:text-blue-300 transition-colors" />
                  </div>
                  <div className={`${isMobile ? 'text-center' : ''}`}>
                    <div className="text-xs text-gray-500">{translations.social?.linkedin_label || "LinkedIn"}</div>
                    <div className="text-xs md:text-base font-medium text-white">
                      {translations.social?.linkedin_subtitle || "Conectar"}
                    </div>
                  </div>
                </div>
                {!isMobile && (
                  <ExternalLink className="
                    w-3 h-3 text-gray-500 flex-shrink-0
                    group-hover/linkedin:text-blue-400
                    group-hover/linkedin:translate-x-0.5 group-hover/linkedin:-translate-y-0.5
                    transition-all duration-300
                  " />
                )}
              </motion.a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4 md:mb-8" />

        {/* Bottom section - Más compacto en móvil */}
        <div className="
          flex flex-col md:flex-row items-center
          justify-between gap-3 md:gap-6
          text-center md:text-left
        ">
          <div className="space-y-1">
            <p className="text-gray-400 text-xs md:text-base">
              &copy; {year} Gorka Carmona.
              <span className="text-white font-medium"> {translations.copyright || "Todos los derechos reservados."}</span>
            </p>
            <p className="text-xs text-gray-500">
              {translations.built_with || "Desarrollado con"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Next.js 14
              </span>
              ,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Tailwind CSS
              </span>
              {" "}{translations.and || "y"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Framer Motion
              </span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6">
            <a 
              href="/privacy" 
              className="
                text-xs text-gray-400 
                hover:text-white transition-colors duration-300
                px-2 py-1 rounded
                hover:bg-white/5
              "
            >
              {translations.links?.privacy || "Privacidad"}
            </a>
            <a 
              href="/terms" 
              className="
                text-xs text-gray-400 
                hover:text-white transition-colors duration-300
                px-2 py-1 rounded
                hover:bg-white/5
              "
            >
              {translations.links?.terms || "Términos"}
            </a>
            <div className="
              text-xs px-2 py-1 rounded-lg
              bg-gradient-to-r from-purple-600/20 to-blue-600/20
              border border-purple-500/30
              text-gray-300
            ">
              {translations.version || "v2.0"}
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button - MODIFICADO PARA MÓVIL */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className={`
              fixed ${isMobile ? 'bottom-6 right-6 p-4' : 'bottom-6 right-6 p-3'}
              rounded-lg
              bg-gradient-to-r from-purple-600/30 to-blue-600/30
              border border-purple-500/50
              text-white
              shadow-[0_0_15px_rgba(139,92,246,0.2)]
              transition-all duration-300
              z-50
              group/scroll-top
              hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]
              hover:from-purple-600/40 hover:to-blue-600/40
              hover:border-purple-500/70
              ${isMobile ? 'active:scale-95' : ''}
            `}
            aria-label={translations.back_to_top || "Volver arriba"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className={`
              ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} 
              group-hover/scroll-top:-translate-y-0.5 transition-transform duration-300
            `} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}