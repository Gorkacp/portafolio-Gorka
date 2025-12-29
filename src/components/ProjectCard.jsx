"use client";

import { ExternalLink, Github, Zap, ChevronRight, Code } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [techsToShow, setTechsToShow] = useState(6); // Valor por defecto

  // Detectar tamaño de pantalla solo en el cliente
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setTechsToShow(window.innerWidth < 768 ? 4 : 6);
    };
    
    // Verificar inmediatamente
    checkMobile();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!project) return null;

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
      <div className="relative w-full h-40 md:h-48 overflow-hidden">
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/90 via-black/50 to-transparent
          opacity-70
        " />
        
        {/* Badge Full Stack */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4">
          <div className="
            px-2 md:px-3 py-1 md:py-1.5 rounded-lg
            bg-gradient-to-r from-blue-500/20 to-purple-500/20
            border border-white/20
            backdrop-blur-md
            flex items-center gap-1.5 md:gap-2
          ">
            <Code className="w-3 h-3 text-blue-300" />
            <span className="text-xs md:text-sm font-semibold text-white">
              Full Stack
            </span>
          </div>
        </div>

        {/* Título superpuesto */}
        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
          <h3 className="
            text-lg md:text-xl font-bold text-white
            line-clamp-1
          ">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Contenido compacto */}
      <div className="flex flex-col flex-1 gap-3 md:gap-4 p-4 md:p-5">
        {/* Descripción */}
        <div className="flex-1">
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
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
            <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 md:line-clamp-none">
                {project.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Tecnologías compactas */}
        <div className="mt-auto pt-2 md:pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {project.technologies.slice(0, techsToShow).map((tech) => (
              <span
                key={tech}
                className="
                  text-[9px] md:text-[10px] px-2 md:px-2.5 py-1 md:py-1 rounded-full
                  bg-gradient-to-r from-blue-500/10 to-purple-500/10
                  border border-blue-500/20
                  text-blue-300 font-medium
                  truncate max-w-[80px] md:max-w-none
                "
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > techsToShow && (
              <span className="text-[9px] md:text-[10px] px-2 md:px-2.5 py-1 md:py-1 text-gray-400">
                +{project.technologies.length - techsToShow}
              </span>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-2 md:gap-3 pt-2 md:pt-3">
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2
              px-3 md:px-4 py-2 md:py-2.5 rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600
              text-white text-xs md:text-sm font-semibold
              hover:from-blue-700 hover:to-purple-700
              hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]
              transition-all duration-300
              group/btn
              whitespace-nowrap
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={14} className="md:size-[16px]" />
            <span className="truncate">Demo</span>
            <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover/btn:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2
              px-3 md:px-4 py-2 md:py-2.5 rounded-xl
              bg-white/5 border border-white/20
              text-white text-xs md:text-sm font-semibold
              hover:bg-white/10 hover:border-white/30
              transition-all duration-300
              whitespace-nowrap
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={14} className="md:size-[16px]" />
            <span className="truncate">Código</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}