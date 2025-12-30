"use client";

import { 
  Search, Shield, Zap, Users, BarChart, Smartphone, 
  Globe, Lock, Cpu, Eye, Palette, TrendingUp,
  CheckCircle, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTranslation } from "@/utils/translations";

export default function Capabilities() {
  const [expandedCard, setExpandedCard] = useState(null);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Inicializar
    handleResize();
    
    // Agregar event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para renderizar texto con HTML
  const renderTextWithHTML = (text) => {
    return { __html: text };
  };

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Obtener traducciones
  const translations = {
    section_title: getTranslation(language, "Capabilities.section_title"),
    main_title: getTranslation(language, "Capabilities.main_title"),
    main_title_highlight: getTranslation(language, "Capabilities.main_title_highlight"),
    subtitle: getTranslation(language, "Capabilities.subtitle"),
    stats_uptime: getTranslation(language, "Capabilities.stats_uptime"),
    stats_uptime_short: getTranslation(language, "Capabilities.stats_uptime_short"),
    stats_speed: getTranslation(language, "Capabilities.stats_speed"),
    stats_speed_short: getTranslation(language, "Capabilities.stats_speed_short"),
    stats_accessibility: getTranslation(language, "Capabilities.stats_accessibility"),
    stats_accessibility_short: getTranslation(language, "Capabilities.stats_accessibility_short"),
    stats_security: getTranslation(language, "Capabilities.stats_security"),
    stats_security_short: getTranslation(language, "Capabilities.stats_security_short"),
    specialized_badge: getTranslation(language, "Capabilities.specialized_badge"),
    capabilities: getTranslation(language, "Capabilities.capabilities"),
  };

  // Datos de iconos y gradientes (estos no cambian con el idioma)
  const capabilitiesConfig = [
    {
      icon: Search,
      gradient: "from-cyan-500 to-blue-600",
      iconColor: "text-cyan-400"
    },
    {
      icon: Shield,
      gradient: "from-emerald-500 to-green-600",
      iconColor: "text-emerald-400"
    },
    {
      icon: Zap,
      gradient: "from-amber-500 to-orange-600",
      iconColor: "text-amber-400"
    },
    {
      icon: Users,
      gradient: "from-purple-500 to-pink-600",
      iconColor: "text-purple-400"
    },
    {
      icon: BarChart,
      gradient: "from-indigo-500 to-blue-700",
      iconColor: "text-indigo-400"
    },
    {
      icon: Globe,
      gradient: "from-teal-500 to-cyan-600",
      iconColor: "text-teal-400"
    }
  ];

  // Datos de estadísticas
  const statsData = [
    { 
      value: "99.9%", 
      label: translations.stats_uptime, 
      shortLabel: translations.stats_uptime_short,
      icon: Shield, 
      color: "text-emerald-400",
      size: "text-lg md:text-2xl lg:text-3xl"
    },
    { 
      value: "<1s", 
      label: translations.stats_speed, 
      shortLabel: translations.stats_speed_short,
      icon: Zap, 
      color: "text-amber-400",
      size: "text-lg md:text-2xl lg:text-3xl"
    },
    { 
      value: "100%", 
      label: translations.stats_accessibility, 
      shortLabel: translations.stats_accessibility_short,
      icon: Users, 
      color: "text-purple-400",
      size: "text-lg md:text-2xl lg:text-3xl"
    },
    { 
      value: "A+", 
      label: translations.stats_security, 
      shortLabel: translations.stats_security_short,
      icon: Lock, 
      color: "text-cyan-400",
      size: "text-lg md:text-2xl lg:text-3xl"
    },
  ];

  // Cargar capacidades desde traducciones
  let capabilitiesData = [];
  try {
    // Asegurarse de que las capacidades sean un array
    capabilitiesData = Array.isArray(translations.capabilities) 
      ? translations.capabilities 
      : JSON.parse(translations.capabilities || '[]');
    
    // Combinar con configuraciones estáticas (iconos, gradientes, colores)
    capabilitiesData = capabilitiesData.map((capability, index) => ({
      ...capability,
      ...capabilitiesConfig[index % capabilitiesConfig.length]
    }));
  } catch (error) {
    console.error("Error loading capabilities:", error);
    capabilitiesData = [];
  }

  // Loading (evita SSR issues)
  if (!isMounted) {
    return (
      <section
        id="capabilities"
        className="
          relative w-full py-12 md:py-20 lg:py-32 px-4 sm:px-6 font-poppins
          bg-gradient-to-b from-gray-900 via-black to-black
          text-white overflow-hidden
        "
      >
        <div className="h-96"></div>
      </section>
    );
  }

  return (
    <section
      id="capabilities"
      className="
        relative w-full py-12 md:py-20 lg:py-32 px-4 sm:px-6 font-poppins
        bg-gradient-to-b from-gray-900 via-black to-black
        text-white overflow-hidden
      "
    >
      {/* Separador superior */}
      <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Fondo decorativo - móvil más pequeño */}
      <div className="absolute top-20 -left-20 w-64 h-64 md:w-96 md:h-96 bg-purple-900/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-cyan-900/5 rounded-full blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              inline-block uppercase tracking-widest text-xs md:text-sm 
              text-purple-400 font-medium mb-2 md:mb-3
            "
          >
            {translations.section_title}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              text-xl sm:text-2xl md:text-3xl lg:text-4xl 
              font-bold leading-tight mb-3 md:mb-4 px-2
            "
          >
            {translations.main_title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              {translations.main_title_highlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              max-w-3xl mx-auto text-gray-300 
              text-xs sm:text-sm md:text-base
              leading-relaxed px-2
            "
            dangerouslySetInnerHTML={renderTextWithHTML(translations.subtitle)}
          />
        </div>

        {/* Métricas principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="
            grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 
            mb-8 md:mb-12 lg:mb-16 max-w-3xl mx-auto
          "
        >
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="
                p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl
                bg-gradient-to-br from-white/5 to-transparent
                border border-white/10
                hover:border-white/20 hover:bg-white/10
                transition-all duration-300
                flex flex-col items-center justify-center
                group
              "
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                <div className={`${stat.size} font-bold text-white`}>
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 font-medium uppercase tracking-wider text-center">
                  <span className="hidden sm:inline">{stat.label}</span>
                  <span className="sm:hidden">{stat.shortLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Grid de capacidades */}
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6">
          {capabilitiesData.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              onClick={() => isMobile && toggleCard(index)}
              className="
                group relative overflow-hidden
                p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl
                bg-gradient-to-br from-white/[0.03] to-transparent
                border border-white/10
                hover:border-white/20 cursor-pointer
                hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                transition-all duration-300
              "
            >
              {/* Fondo de gradiente sutil */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${capability.gradient} 
                opacity-0 group-hover:opacity-5 transition-opacity duration-500
                blur-xl
              `} />

              {/* Icono y título */}
              <div className="relative flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl
                  bg-gradient-to-br from-white/10 to-white/5
                  border border-white/10
                  flex items-center justify-center flex-shrink-0
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <capability.icon className={`w-5 h-5 md:w-6 md:h-6 ${capability.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-white mb-1 truncate">
                    <span className="md:hidden">{capability.shortTitle}</span>
                    <span className="hidden md:inline">{capability.title}</span>
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-2">
                    {isMobile ? capability.shortDesc : capability.description}
                  </p>
                </div>
                
                {/* Flecha para móvil (solo visible en móvil) */}
                {isMobile && (
                  <div className="flex-shrink-0">
                    <svg 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                        expandedCard === index ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Lista de características */}
              <div className={`
                overflow-hidden transition-all duration-300
                ${isMobile 
                  ? (expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0') 
                  : 'max-h-96 opacity-100'
                }
              `}>
                <ul className="relative space-y-2 md:space-y-3">
                  {capability.features && capability.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Badge de especialización - solo en desktop */}
              <div className="
                absolute top-3 right-3
                px-2 py-0.5 rounded-full text-[10px] md:text-xs
                bg-gradient-to-r from-white/10 to-white/5
                border border-white/10
                text-gray-300 font-medium
                hidden md:block opacity-0 md:group-hover:opacity-100 
                transition-opacity duration-300
              ">
                {translations.specialized_badge}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Separador inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </section>
  );
}