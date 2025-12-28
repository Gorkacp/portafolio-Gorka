"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Code2, Server, Database, Send, ExternalLink, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const socialLinks = [
    { 
      name: "GitHub", 
      href: "https://github.com/Gorkacp", 
      icon: <Github size={20} />,
      color: "hover:text-purple-400",
      bgColor: "hover:from-purple-500/20 hover:to-purple-600/20"
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com/in/gorka-carmona-pino", 
      icon: <Linkedin size={20} />,
      color: "hover:text-blue-400",
      bgColor: "hover:from-blue-500/20 hover:to-blue-600/20"
    },
  ];

  const techStack = [
    { name: "Vue.js", icon: <Code2 className="w-4 h-4" />, color: "text-green-400" },
    { name: "Nuxt 3", icon: <Sparkles className="w-4 h-4" />, color: "text-green-300" },
    { name: "React", icon: <Code2 className="w-4 h-4" />, color: "text-blue-400" },
    { name: "Node.js", icon: <Server className="w-4 h-4" />, color: "text-green-500" },
    { name: "Spring Boot", icon: <Server className="w-4 h-4" />, color: "text-green-600" },
    { name: "MongoDB", icon: <Database className="w-4 h-4" />, color: "text-green-700" },
  ];

  const quickLinks = [
    { name: "Inicio", href: "#home", icon: <ArrowUp className="w-3 h-3 rotate-45" /> },
    { name: "Sobre mí", href: "#about", icon: <Code2 className="w-3 h-3" /> },
    { name: "Proyectos", href: "#projects", icon: <Database className="w-3 h-3" /> },
    { name: "Habilidades", href: "#skills", icon: <Server className="w-3 h-3" /> },
    { name: "Contacto", href: "#contact", icon: <Send className="w-3 h-3" /> },
  ];

  // Evitar animaciones en el primer render
  useEffect(() => {
    setIsMounted(true);
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
    handleScroll(); // Llamar inicialmente
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

  // Estilos mejorados para un look más profesional
  const containerClasses = `
    bg-gradient-to-b from-gray-950 via-black to-gray-950
    text-gray-300 font-sans 
    relative overflow-hidden
    border-t border-white/5
  `;

  return (
    <footer className={containerClasses}>
      {/* Background effects sutiles */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/[0.02] via-transparent to-blue-500/[0.02]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Barra de progreso discreta */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-900">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={false}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Gorka Carmona
                </h3>
                <p className="text-gray-400 text-base">
                  Desarrollador Full Stack
                </p>
              </div>
              
              <div className="pt-2">
                <h4 className="text-white text-sm uppercase tracking-wider mb-4 text-gray-400 font-medium">
                  Contacto Directo
                </h4>
                <a 
                  href="mailto:gorkacarmonapino@gmail.com"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'mailto:gorkacarmonapino@gmail.com';
                  }}
                  className="
                    inline-flex items-center gap-3 px-4 py-3
                    bg-white/[0.02] border border-white/10 rounded-lg
                    hover:border-purple-500/50 hover:bg-white/[0.04]
                    transition-all duration-200
                    group/email
                    w-full
                  "
                >
                  <div className="
                    w-10 h-10 rounded-lg
                    bg-gradient-to-br from-purple-500/10 to-blue-500/10
                    border border-white/10
                    flex items-center justify-center
                    group-hover/email:border-purple-500/30
                    transition-colors duration-200
                  ">
                    <Mail className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xs text-gray-500">Email profesional</p>
                    <p className="text-white text-sm font-medium group-hover/email:text-purple-300 transition-colors">
                      gorkacarmonapino@gmail.com
                    </p>
                  </div>
                  <ArrowUp className="
                    w-4 h-4 text-gray-600 rotate-45
                    group-hover/email:text-purple-400 
                    group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5
                    transition-all duration-200
                  " />
                </a>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-white text-sm uppercase tracking-wider mb-4 text-gray-400 font-medium">
                Stack Tecnológico
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={tech.name}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5
                      bg-white/5 border border-white/10
                      rounded-lg text-sm text-gray-300
                      hover:border-purple-500/30 hover:bg-white/10
                      transition-all duration-200
                      ${tech.color}
                    `}
                  >
                    {tech.icon}
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-6">
            <div>
              <h4 className="text-white text-lg font-semibold mb-6 tracking-tight">
                Navegación
              </h4>
              <div className="space-y-1">
                {quickLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="
                        flex items-center justify-between
                        text-gray-400 hover:text-white
                        py-3 px-3 rounded-lg
                        hover:bg-white/[0.02]
                        transition-all duration-200
                        group/link
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div className="
                          w-8 h-8 rounded-lg
                          bg-white/[0.02] border border-white/10
                          flex items-center justify-center
                          group-hover/link:border-purple-500/30
                          transition-colors duration-200
                        ">
                          {link.icon}
                        </div>
                        <span className="font-medium text-sm">{link.name}</span>
                      </div>
                      <ArrowUp className="
                        w-3 h-3 text-gray-600 rotate-45
                        group-hover/link:text-purple-400
                        group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5
                        transition-all duration-200
                      " />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA & Social */}
          <div className="lg:col-span-5 lg:col-start-9 space-y-8">
            {/* CTA Card */}
            <div className="
              p-6 rounded-xl
              bg-white/[0.02] border border-white/10
              relative overflow-hidden
            ">
              <div className="relative">
                <h4 className="text-white text-lg font-semibold mb-3 tracking-tight flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  ¿Listo para colaborar?
                </h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Disponible para proyectos desafiantes, consultoría técnica y 
                  oportunidades de colaboración estratégica.
                </p>
                <Link
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                  className="
                    inline-flex items-center gap-2 px-5 py-2.5
                    bg-gradient-to-r from-purple-600 to-blue-600
                    text-white font-medium text-sm rounded-lg
                    hover:from-purple-700 hover:to-blue-700
                    transition-all duration-200
                    group/cta
                  "
                >
                  <span>Iniciar conversación</span>
                  <ArrowUp className="
                    w-3 h-3 rotate-45
                    group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5
                    transition-transform duration-200
                  " />
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white text-sm uppercase tracking-wider mb-4 text-gray-400 font-medium">
                Conectemos profesionalmente
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-3 rounded-lg
                      bg-white/[0.02] border border-white/10
                      hover:border-purple-500/30
                      transition-all duration-200
                      group/social
                      ${link.bgColor}
                      ${link.color}
                    `}
                    aria-label={link.name}
                  >
                    <div className="flex items-center gap-3">
                      <div className="
                        w-9 h-9 rounded-lg
                        bg-white/[0.05] border border-white/10
                        flex items-center justify-center
                        group-hover/social:scale-105 transition-transform duration-200
                      ">
                        {link.icon}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{link.name}</div>
                        <div className="text-sm font-medium text-gray-300">Perfil</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="
          h-px w-full 
          bg-gradient-to-r from-transparent via-white/5 to-transparent
          mb-8
        " />

        {/* Bottom section */}
        <div className="
          flex flex-col md:flex-row md:items-center 
          justify-between gap-6
        ">
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">
              &copy; {year} Gorka Carmona. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-500">
              Desarrollado con Next.js 14, Tailwind CSS y Framer Motion
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="/privacy" 
              className="text-gray-400 hover:text-white text-xs transition-colors"
            >
              Privacidad
            </a>
            <a 
              href="/terms" 
              className="text-gray-400 hover:text-white text-xs transition-colors"
            >
              Términos
            </a>
            <div className="text-gray-500 text-xs px-2 py-1 bg-white/5 rounded border border-white/10">
              v2.0
            </div>
          </div>
        </div>

        {/* Back to top button mejorado */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="
                fixed bottom-6 right-6 p-3
                bg-gradient-to-r from-gray-800 to-gray-900
                text-white rounded-full
                hover:from-gray-700 hover:to-gray-800
                transition-all duration-200
                z-50
                group/scroll-top
                border border-white/10
                shadow-lg
              "
              aria-label="Volver arriba"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4 group-hover/scroll-top:-translate-y-0.5 transition-transform duration-200" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}