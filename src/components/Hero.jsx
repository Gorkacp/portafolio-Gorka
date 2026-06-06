"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight, Eye, Rocket, Award, Clock, TrendingUp } from "lucide-react";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const Particles = dynamic(() => import("react-tsparticles").then(mod => mod.default), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const particlesInit = async (engine) => {
    const { loadSlim } = await import("tsparticles-slim");
    await loadSlim(engine);
    setParticlesLoaded(true);
  };

  const particleOptions = {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: isDesktop,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: {
          distance: 40,
          duration: 0.3,
        },
        push: {
          quantity: 2,
        },
      },
    },
    particles: {
      color: {
        value: ["#3b82f6", "#8b5cf6", "#06b6d4"],
      },
      links: {
        color: "#ffffff",
        distance: 70,
        enable: isDesktop,
        opacity: 0.04,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: isDesktop ? 0.2 : 0.12,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: isDesktop ? 500 : 350,
        },
        value: isDesktop ? 20 : 12,
      },
      opacity: {
        value: {
          min: 0.02,
          max: 0.08,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: 0.5,
          max: 1.2,
        },
      },
    },
    detectRetina: true,
  };

  // Función para renderizar texto con HTML (para strong tags)
  const renderTextWithHTML = (text) => {
    return { __html: text };
  };

  // Función de scroll suave
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Obtener traducciones
  const translations = {
    badge: getTranslation(language, "Hero.badge"),
    title_part1: getTranslation(language, "Hero.title_part1"),
    title_highlight1: getTranslation(language, "Hero.title_highlight1"),
    title_part2: getTranslation(language, "Hero.title_part2"),
    title_highlight2: getTranslation(language, "Hero.title_highlight2"),
    subtitle: getTranslation(language, "Hero.subtitle"),
    stats_experience: getTranslation(language, "Hero.stats_experience"),
    stats_experience_value: getTranslation(language, "Hero.stats_experience_value"),
    stats_certificates: getTranslation(language, "Hero.stats_certificates"),
    stats_certificates_value: getTranslation(language, "Hero.stats_certificates_value"),
    stats_results: getTranslation(language, "Hero.stats_results"),
    stats_results_value: getTranslation(language, "Hero.stats_results_value"),
    primary_button: getTranslation(language, "Hero.primary_button"),
    secondary_button: getTranslation(language, "Hero.secondary_button"),
    footer_text: getTranslation(language, "Hero.footer_text"),
  };
  return (
    <section className="relative w-full min-h-screen flex items-start justify-center overflow-hidden font-poppins bg-gradient-to-b from-black via-gray-900 to-black pt-12 sm:pt-16 md:pt-10 lg:pt-8">
      
      {/* Partículas */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="absolute inset-0 -z-10"
      />

      {/* Gradientes de fondo */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 -left-16 sm:-left-20 md:-left-24 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] bg-gradient-to-r from-purple-500/4 to-blue-500/2 rounded-full blur-xl sm:blur-2xl" />
        <div className="absolute -bottom-1/4 -right-16 sm:-right-20 md:-right-24 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] bg-gradient-to-l from-blue-500/4 to-cyan-500/2 rounded-full blur-xl sm:blur-2xl" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]" />

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-16 md:pt-20 lg:pt-24 pb-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3 sm:mb-5 md:mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-pink-500/8 border border-blue-500/15 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-300 tracking-wide whitespace-nowrap">
              {translations.badge}
            </span>
          </div>
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-3 sm:mb-5 md:mb-6"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug sm:leading-tight md:leading-tight text-center">
            {translations.title_part1}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {translations.title_highlight1}
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
            </span>{" "}
            <br className="hidden sm:block" />
            {translations.title_part2}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {translations.title_highlight2}
            </span>
          </h1>
        </motion.div>

        {/* Subtítulo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 sm:mb-6 md:mb-7 max-w-2xl md:max-w-3xl mx-auto"
        >
          <p 
            className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-center px-3"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.subtitle)}
          />
        </motion.div>


        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4 sm:mb-6 md:mb-7"
        >
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            {[
              { 
                label: translations.stats_experience, 
                value: translations.stats_experience_value, 
                icon: <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />,
              },
              { 
                label: translations.stats_certificates, 
                value: translations.stats_certificates_value, 
                icon: <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />,
              },
              { 
                label: translations.stats_results, 
                value: translations.stats_results_value, 
                icon: <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="p-3 sm:p-3.5 md:p-4 rounded-lg bg-gradient-to-b from-white/5 to-transparent border border-white/8 backdrop-blur-sm hover:border-blue-500/15 transition-all duration-250"
              >
                <div className="flex flex-col items-center gap-1.5 sm:gap-2 mb-1.5">
                  {stat.icon}
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-300 text-center leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-4 sm:mb-6 md:mb-7"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            {/* Botón primario */}
            <motion.button
              onClick={(e) => handleSmoothScroll(e, "#projects")}
              className="
                group/btn relative w-full px-5 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 rounded-lg
                bg-gradient-to-r from-purple-600 to-blue-600
                border border-purple-500/40
                text-white font-semibold text-sm sm:text-base
                hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]
                hover:brightness-110
                transition-all duration-250
                flex items-center justify-center gap-2 sm:gap-2.5
                overflow-hidden
                cursor-pointer
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/8 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-600" />
              <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex-shrink-0" />
              <span className="whitespace-nowrap">{translations.primary_button}</span>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 group-hover/btn:translate-x-0.5 transition-transform duration-250" />
            </motion.button>

            {/* Botón secundario */}
            <motion.button
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="
                group/contact relative w-full px-5 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 rounded-lg
                bg-gradient-to-br from-white/8 to-white/4
                border border-white/15
                text-white font-semibold text-sm sm:text-base
                hover:border-blue-500/40
                hover:bg-white/8
                hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]
                transition-all duration-250
                flex items-center justify-center gap-2 sm:gap-2.5
                backdrop-blur-sm
                cursor-pointer
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Rocket className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-400 flex-shrink-0" />
              <span className="whitespace-nowrap">{translations.secondary_button}</span>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 group-hover/contact:translate-x-0.5 transition-transform duration-250" />
            </motion.button>
          </div>
        </motion.div>

        {/* Texto final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="max-w-md sm:max-w-lg md:max-w-xl mx-auto px-3"
        >
          <p 
            className="text-gray-400 text-xs sm:text-sm md:text-base text-center leading-relaxed"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.footer_text)}
          />
        </motion.div>
      </div>
    </section>
  );
}