"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, Calendar, MapPin, Building,
  CheckCircle, GraduationCap, Sparkles,
  ChevronDown
} from "lucide-react";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const experiences = [
  {
    id: "sipay",
    type: "work",
    periodo: "may. 2026 - Actualidad",
    titulo: "DevOps Junior Engineer | Junior Frontend Developer",
    empresa: "Sipay",
    logo: "/img/logoSipay.png",
    ubicacion: "Granada, Andalucía, España",
    modalidad: "Teletrabajo",
    descripcion: [],
    tecnologias: [],
    color: "from-blue-600 to-cyan-600",
    borderColor: "border-l-blue-500",
    bgGradient: "from-blue-900/10 to-transparent"
  },
  {
    id: "wegow-junior",
    type: "work",
    periodo: "ene. 2026 - may. 2026 · 5 meses",
    titulo: "Junior Frontend Developer",
    empresa: "Wegow",
    logo: "/img/logoWegow.png",
    ubicacion: "Granada, Andalucía, España",
    modalidad: "Presencial",
    descripcion: [
      "Desarrollo y evolución del frontend de Wegow, tanto en la plataforma principal como en el backoffice, utilizando Vue 3 y Nuxt 3 en un entorno de producción.",
      "Participación en la mejora continua del producto mediante el desarrollo de nuevas funcionalidades orientadas a rendimiento, SEO técnico y optimización del renderizado (SSR), contribuyendo a una experiencia de usuario más rápida y eficiente."
    ],
    responsabilidades: [
      "Desarrollo de nuevas funcionalidades en el frontend con foco en rendimiento, escalabilidad y SEO (SSR con Nuxt 3)",
      "Mantenimiento y refactorización del código existente, mejorando su calidad, estructura y mantenibilidad",
      "Diseño y desarrollo de herramientas internas para el backoffice, optimizando procesos operativos del equipo",
      "Implementación de tests end-to-end con Playwright, reforzando la estabilidad y fiabilidad del producto en producción"
    ],
    tecnologias: ["Vue 3", "Nuxt 3", "JavaScript", "TypeScript", "Tailwind CSS", "Playwright", "Git", "Docker", "Responsive Design", "SSR", "SEO Técnico", "Frameworks JS"],
    color: "from-purple-600 to-pink-600",
    borderColor: "border-l-purple-500",
    bgGradient: "from-purple-900/10 to-transparent"
  },
  {
    id: "wegow-intern",
    type: "education",
    periodo: "oct. 2025 - dic. 2025 · 3 meses",
    titulo: "Becario Frontend Developer",
    empresa: "Wegow",
    logo: "/img/logoWegow.png",
    ubicacion: "Granada, Andalucía, España",
    modalidad: "Presencial",
    descripcion: [
      "Participación en la modernización y evolución técnica de la plataforma mediante la migración de Vue.js a Nuxt 3, mejorando escalabilidad, rendimiento y arquitectura del frontend.",
      "Desarrollo de interfaces modernas con Vue 3, Nuxt 3 y Tailwind CSS, implementando componentes reutilizables y manteniendo consistencia visual en toda la aplicación.",
      "Evolución de la aplicación hacia una Progressive Web App (PWA), mejorando accesibilidad, rendimiento en dispositivos móviles y comportamiento offline."
    ],
    responsabilidades: [
      "Migración de Vue.js a Nuxt 3 para mejorar SSR y rendimiento",
      "Desarrollo de interfaces con Vue 3, Nuxt 3 y Tailwind CSS",
      "Implementación de funcionalidades PWA ( Progressive Web App )",
      "Desarrollo de herramientas internas para el backoffice",
      "Creación de entornos reproducibles con Docker",
      "Participación en flujos Git con pull requests y code reviews"
    ],
    tecnologias: ["Vue 3", "Nuxt 3", "JavaScript", "Tailwind CSS", "PWA", "Docker", "Git", "Responsive Design"],
    color: "from-green-600 to-emerald-600",
    borderColor: "border-l-green-500",
    bgGradient: "from-green-900/10 to-transparent"
  }
];

function TimelineDot({ logo, alt }) {
  if (logo) {
    return (
      <div className="absolute left-0 top-0 w-9 h-9 md:w-16 md:h-16 md:-translate-x-1/2 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-purple-500/20 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] z-10 overflow-hidden">
        <div className="relative w-5 h-5 md:w-[38px] md:h-[38px]">
          <Image src={logo} alt={alt} fill className="object-contain" />
        </div>
      </div>
    );
  }
  return (
    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 z-10">
      <div className="w-2.5 h-2.5 rounded-full bg-white" />
    </div>
  );
}

function MobileCard({ exp, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-30px" }}
      className="relative pl-12 md:pl-16"
    >
      <TimelineDot logo={exp.logo} alt={exp.empresa} />

      <div className={`rounded-xl bg-gradient-to-br ${exp.bgGradient} border border-white/10 ${exp.borderColor} border-l-4 overflow-hidden`}>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className={`px-2.5 py-0.5 rounded-full bg-gradient-to-r ${exp.color} text-white text-xs font-medium`}>
              {exp.type === "education" ? "Prácticas" : "Jornada Completa"}
            </span>
            {exp.id === "sipay" && (
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-medium">
                Actualidad
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold leading-snug mb-3">
            {exp.titulo}
          </h3>

          <div className="space-y-1.5 mb-3 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              <span>{exp.periodo}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>{exp.ubicacion} · {exp.modalidad}</span>
            </div>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            {open ? "Ver menos" : "Ver más"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
            {exp.descripcion.length > 0 && (
              <div className="space-y-2">
                {exp.descripcion.map((text, i) => (
                  <p key={i} className="text-gray-300 text-xs leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
            )}

            {exp.responsabilidades && exp.responsabilidades.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-purple-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Responsabilidades clave
                </h4>
                <div className="space-y-1">
                  {exp.responsabilidades.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 p-1.5 rounded-lg bg-white/5">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-xs leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {exp.tecnologias.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {exp.tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full text-[11px] bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DesktopCard({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative pl-20"
    >
      <TimelineDot logo={exp.logo} alt={exp.empresa} />

      <div className={`p-7 rounded-2xl bg-gradient-to-br ${exp.bgGradient} border border-white/10 hover:border-purple-500/30 transition-all duration-300 ${exp.borderColor} border-l-4`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${exp.color} text-white text-xs font-medium`}>
                {exp.type === "education" ? "Prácticas" : "Jornada Completa"}
              </div>
              {exp.id === "sipay" && (
                <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-medium">
                  Actualidad
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mt-2">
              {exp.titulo}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>{exp.ubicacion}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            <span>{exp.periodo}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>{exp.modalidad}</span>
          </div>
        </div>

        {exp.descripcion.length > 0 && (
          <div className="space-y-3 mb-4">
            {exp.descripcion.map((text, i) => (
              <p key={i} className="text-gray-300 text-base leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        )}

        {exp.responsabilidades && exp.responsabilidades.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-purple-300 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Responsabilidades clave
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {exp.responsabilidades.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {exp.tecnologias.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {exp.tecnologias.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300 hover:border-purple-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { language } = useLanguage();

  const translations = {
    section_title: getTranslation(language, "Experience.section_title"),
    title_part1: getTranslation(language, "Experience.title_part1"),
    title_highlight: getTranslation(language, "Experience.title_highlight"),
    description: getTranslation(language, "Experience.description"),
  };

  return (
    <section
      id="experience"
      className="relative w-full py-20 md:py-32 px-4 md:px-6 font-poppins bg-gradient-to-b from-gray-900 via-black to-black text-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-900/5 rounded-full blur-3xl hidden md:block" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl hidden md:block" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300 tracking-wider uppercase">
              {translations.section_title}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            {translations.title_part1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {translations.title_highlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg mt-4 max-w-2xl mx-auto"
          >
            {translations.description}
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent" />

          {/* Mobile layout */}
          <div className="space-y-6 md:hidden">
            {experiences.map((exp, index) => (
              <MobileCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block space-y-16">
            {experiences.map((exp, index) => (
              <DesktopCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
