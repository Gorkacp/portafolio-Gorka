"use client";

import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Rocket, Terminal, Server, Database, Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  
  const projects = [
    {
      id: 1,
      title: "GoLive Platform",
      description: "Plataforma Full Stack para gestión y venta de entradas de eventos musicales con sistema de pagos real, validación QR y dashboard administrativo.",
      technologies: ["Nuxt 3", "Vue 3", "TypeScript", "Spring Boot", "Java 17", "MongoDB", "JWT", "Docker"],
      demoUrl: "https://golive-hu5d.onrender.com",
      codeUrl: "https://github.com/Gorkacp/GoLive",
      imageUrl: "/img/GoLive.png",
      impact: "Proyecto de fin de grado demostrando dominio completo del desarrollo Full Stack con arquitectura escalable."
    }
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            Proyecto Destacado
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Desarrollo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Full Stack
            </span>{" "}
            <span className="block text-xl sm:text-2xl md:text-3xl mt-3 md:mt-4 font-normal">
              con tecnologías{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                modernas
              </span>
            </span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg mt-4 md:mt-6 leading-relaxed">
            Una <strong className="text-white">solución completa</strong> que integra frontend, backend, 
            base de datos y despliegue. Demostración práctica de habilidades técnicas aplicadas a 
            un <strong className="text-white">proyecto real</strong> con arquitectura escalable.
          </p>
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
                Arquitectura Técnica
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
                        Frontend
                      </h4>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1">
                    <strong className="text-white">Nuxt 3 + Vue 3 + TypeScript</strong> con SSR, PWA y Tailwind CSS.
                  </p>
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
                        Backend
                      </h4>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1">
                    <strong className="text-white">Spring Boot + Java 17</strong> con REST API, JWT y optimización.
                  </p>
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
                        Base de Datos
                      </h4>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1">
                    <strong className="text-white">MongoDB</strong> NoSQL con modelo flexible y consultas optimizadas.
                  </p>
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
                        Despliegue
                      </h4>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1">
                    <strong className="text-white">Docker + Render</strong> con configuración de producción lista.
                  </p>
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
                ¿Necesitas una solución similar?
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-6">
                Puedo desarrollar aplicaciones completas adaptadas a tus necesidades,
                con las mejores prácticas y tecnologías modernas.
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
                Hablar sobre tu proyecto
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