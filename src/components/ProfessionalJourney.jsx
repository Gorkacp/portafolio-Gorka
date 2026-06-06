"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Zap, 
  Layers,
  Globe, 
  Shield,
  Calendar,
  MapPin,
  Building,
  Code,
  Sparkles,
  MessageSquare,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function ProfessionalJourney() {
  const experiencias = [
    {
      periodo: "2023 - Presente",
      titulo: "Arquitecto de Soluciones Full Stack",
      empresa: "Consultoría Técnica Avanzada",
      ubicacion: "Remoto · España",
      nivel: "Senior",
      icono: <Cpu className="w-5 h-5 text-blue-500" />,
      descripcion: "Arquitecturas empresariales escalables con foco en performance, SEO y experiencia de usuario. Especializado en microservicios y optimización de aplicaciones de alta concurrencia.",
      tecnologias: ["Nuxt 3", "Vue.js", "Spring Boot", "Microservicios", "MongoDB", "Docker", "TypeScript", "AWS", "CI/CD"],
      metricas: ["95+ Core Web Vitals", "+65% LCP", "FID < 100ms", "SEO 100/100"],
      color: "border-l-blue-500"
    },
    {
      periodo: "2025",
      titulo: "Ingeniero Frontend Senior",
      empresa: "Wegow · Scale-up",
      logo: "/img/logoWegow.png",
      ubicacion: "Granada, España",
      nivel: "Senior",
      icono: <Zap className="w-5 h-5 text-purple-500" />,
      descripcion: "Liderazgo técnico en migración de plataforma con miles de usuarios concurrentes. Implementación de sistemas de diseño y arquitecturas modernas.",
      tecnologias: ["Nuxt 3", "Vue.js", "Design System", "Storybook", "Tailwind", "Testing", "Git Flow", "CI/CD"],
      metricas: ["+35% Performance", "-60% Dev Time", "SSR Implementado", "UX Optimizado"],
      color: "border-l-purple-500"
    }
  ];

  return (
    <section
      id="experience"
      className="
        relative w-full py-16 md:py-24 px-4 md:px-6
        bg-gradient-to-b from-gray-950 to-black
        text-white overflow-hidden
      "
    >
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header minimalista */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-6">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300 tracking-wider">
              EXPERIENCIA SENIOR
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            <span className="text-white">Arquitecturas </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
              Full Stack
            </span>
            <span className="text-white"> de Alto Impacto</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Soluciones técnicas escalables con enfoque en performance, mantenibilidad y resultados medibles.
          </p>
        </div>

        {/* Grid de experiencias compacto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {experiencias.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                relative rounded-xl overflow-hidden
                bg-gradient-to-br from-gray-900/50 to-gray-900/30
                border border-gray-800
                hover:border-gray-700
                transition-all duration-500
                group
                ${exp.color}
                border-l-4
              `}
            >
              <div className="p-6">
                {/* Header de experiencia */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-gray-800/70 transition-colors">
                      {exp.icono}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">
                        {exp.titulo}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {exp.nivel}
                        </span>
                        <span className="text-xs text-gray-400">{exp.periodo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empresa y ubicación */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    {exp.logo ? (
                      <Image src={exp.logo} alt={exp.empresa} width={32} height={32} className="rounded-md flex-shrink-0" />
                    ) : (
                      <Building className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.ubicacion}</span>
                  </div>
                </div>

                {/* Descripción concisa */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {exp.descripcion}
                </p>

                {/* Métricas destacadas */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {exp.metricas.map((metrica, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-gray-300">{metrica}</span>
                    </div>
                  ))}
                </div>

                {/* Tecnologías en badges pequeños */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.tecnologias.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded border border-gray-700/50 hover:bg-gray-800 hover:border-gray-600 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA profesional y elegante */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="
            relative rounded-2xl overflow-hidden
            bg-gradient-to-br from-gray-900 to-gray-900/90
            border border-gray-800
            p-8 md:p-10
            group
            hover:border-gray-700
            transition-all duration-500
          ">
            {/* Efectos sutiles de fondo */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">COLABORACIÓN</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  ¿Proyecto que requiera <span className="text-blue-300">expertise técnico</span> senior?
                </h2>

                <p className="text-gray-400 text-base mb-8 leading-relaxed max-w-md mx-auto">
                  Conversemos sobre cómo desarrollar soluciones escalables que impulsen su negocio.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="#contact"
                    className="
                      inline-flex items-center justify-center gap-3
                      px-6 py-3 rounded-lg
                      bg-gradient-to-r from-blue-600 to-blue-500
                      text-white font-medium text-sm
                      hover:shadow-lg hover:shadow-blue-500/25
                      transition-all duration-300
                      group/btn
                      min-w-[200px]
                    "
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contactar para consultoría</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="#projects"
                    className="
                      inline-flex items-center justify-center
                      px-6 py-3 rounded-lg
                      bg-gray-800/50 backdrop-blur-sm
                      text-gray-300 font-medium text-sm
                      hover:bg-gray-800 hover:text-white
                      border border-gray-700 hover:border-gray-600
                      transition-all duration-300
                      min-w-[160px]
                    "
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver proyectos
                  </motion.a>
                </div>

                {/* Info adicional sutil */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="text-sm">
                      <div className="text-white font-medium mb-1">Respuesta en 24h</div>
                      <div className="text-gray-400 text-xs">Comunicación prioritaria</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-white font-medium mb-1">Sin compromiso</div>
                      <div className="text-gray-400 text-xs">Análisis técnico inicial</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-white font-medium mb-1">Enfoque personalizado</div>
                      <div className="text-gray-400 text-xs">Solución a medida</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}