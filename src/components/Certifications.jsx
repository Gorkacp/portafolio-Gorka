"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Calendar, 
  Building, 
  Filter, 
  Search, 
  ChevronDown, 
  ExternalLink,
  Code2,
  Server,
  Terminal,
  Cloud,
  Database,
  Zap,
  Check,
  Rocket,
  Layers,
  Eye,
  EyeOff,
  FileCode,
  Box,
  Cpu
} from "lucide-react";
import Image from "next/image";

export default function Certifications() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setVisibleCount(3);
      } else {
        setVisibleCount(6);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const certifications = useMemo(() => [
    {
      name: "Introducción a Docker",
      organization: "OpenWebinars",
      date: "jul. 2025",
      logo: "/certifications/docker.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/rwef",
      category: "devops",
      hours: 8,
      level: "beginner",
    },
    {
      name: "Certificación Python PCEP",
      organization: "OpenWebinars",
      date: "jun. 2025",
      logo: "/certifications/python.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/w9Ia",
      category: "programming",
      hours: 40,
      level: "certified",
    },
    {
      name: "Curso AWS para desarrolladores",
      organization: "OpenWebinars",
      date: "jun. 2025",
      logo: "/certifications/aws.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/kIvS",
      category: "cloud",
      hours: 25,
      level: "intermediate",
    },
    {
      name: "Curso Jenkins: Escalando con Workers",
      organization: "OpenWebinars",
      date: "jun. 2025",
      logo: "/certifications/jenkins.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/7PVe",
      category: "devops",
      hours: 12,
      level: "intermediate",
    },
    {
      name: "Curso de Maven",
      organization: "OpenWebinars",
      date: "jun. 2025",
      logo: "/certifications/maven.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/mU8t",
      category: "tools",
      hours: 6,
      level: "beginner",
    },
    {
      name: "Curso MongoDB: Creación y gestión de NoSQL",
      organization: "OpenWebinars",
      date: "jun. 2025",
      logo: "/certifications/mongodb.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/bTZY",
      category: "database",
      hours: 15,
      level: "intermediate",
    },
    {
      name: "Desarrollo Web con Spring Boot",
      organization: "OpenWebinars",
      date: "jun. 2025",
      logo: "/certifications/springboot.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/Hrzv",
      category: "backend",
      hours: 35,
      level: "advanced",
    },
    {
      name: "Fundamentos de Angular",
      organization: "OpenWebinars",
      date: "jun. 2025",
      logo: "/certifications/angular.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/mJsB",
      category: "frontend",
      hours: 30,
      level: "intermediate",
    },
    {
      name: "TypeScript",
      organization: "OpenWebinars",
      date: "jun. 2025",
      logo: "/certifications/typescript.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/OPiJ",
      category: "programming",
      hours: 20,
      level: "intermediate",
    },
    {
      name: "JavaScript: Web API, Componentes y Testing",
      organization: "OpenWebinars",
      date: "mar. 2025",
      logo: "/certifications/javascript.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/LdJF",
      category: "frontend",
      hours: 45,
      level: "advanced",
    },
    {
      name: "Curso de Sass",
      organization: "OpenWebinars",
      date: "feb. 2025",
      logo: "/certifications/sass.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/L641",
      category: "frontend",
      hours: 10,
      level: "intermediate",
    },
    {
      name: "Fundamentos de React",
      organization: "OpenWebinars",
      date: "feb. 2025",
      logo: "/certifications/react.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/yfTz",
      category: "frontend",
      hours: 6,
      level: "intermediate",
    },
    {
      name: "Desarrollo Web Moderno con Laravel",
      organization: "OpenWebinars",
      date: "ene. 2025",
      logo: "/certifications/laravel.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/hytb",
      category: "backend",
      hours: 50,
      level: "advanced",
    },
    {
      name: "Dominando ChatGPT con la API de OpenAI",
      organization: "OpenWebinars",
      date: "oct. 2024",
      logo: "/certifications/openai.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/xUjK",
      category: "ai",
      hours: 5,
      level: "intermediate",
    },
    {
      name: "Fundamentos de JavaScript",
      organization: "OpenWebinars",
      date: "oct. 2024",
      logo: "/certifications/javascript.png",
      defaultLogo: "/img/logo1.png",
      link: "https://openwebinars.net/cert/qvuq",
      category: "programming",
      hours: 8,
      level: "beginner",
    },
  ], []);

  // CATEGORÍAS CONSOLIDADAS CORREGIDAS (sin solapamientos)
  const categories = useMemo(() => [
    { 
      id: "all", 
      label: "Todas", 
      icon: <Award className="w-4 h-4" />, 
      color: "text-gray-300",
      count: 15
    },
    { 
      id: "fullstack", 
      label: "Full Stack", 
      icon: <FileCode className="w-4 h-4" />, 
      color: "text-purple-400",
      count: certifications.filter(cert => ["frontend", "backend", "programming"].includes(cert.category)).length
    },
    { 
      id: "devops", 
      label: "DevOps", 
      icon: <Terminal className="w-4 h-4" />, 
      color: "text-blue-400",
      count: certifications.filter(cert => cert.category === "devops").length
    },
    { 
      id: "cloud", 
      label: "Cloud", 
      icon: <Cloud className="w-4 h-4" />, 
      color: "text-orange-400",
      count: certifications.filter(cert => cert.category === "cloud").length
    },
    { 
      id: "database", 
      label: "DB", 
      icon: <Database className="w-4 h-4" />, 
      color: "text-green-400",
      count: certifications.filter(cert => cert.category === "database").length
    },
    { 
      id: "ai", 
      label: "AI", 
      icon: <Cpu className="w-4 h-4" />, 
      color: "text-pink-400",
      count: certifications.filter(cert => cert.category === "ai").length
    }
  ], [certifications]);

  // Filtrar certificaciones
  const filteredCerts = useMemo(() => 
    certifications.filter(cert => {
      const matchesSearch = cert.name.toLowerCase().includes(search.toLowerCase()) ||
                           cert.organization.toLowerCase().includes(search.toLowerCase());
      
      if (filter === "all") return matchesSearch;
      if (filter === "fullstack") return matchesSearch && ["frontend", "backend", "programming"].includes(cert.category);
      if (filter === "devops") return matchesSearch && cert.category === "devops";
      if (filter === "cloud") return matchesSearch && cert.category === "cloud";
      if (filter === "database") return matchesSearch && cert.category === "database";
      if (filter === "ai") return matchesSearch && cert.category === "ai";
      
      return matchesSearch;
    })
  , [certifications, filter, search]);

  const visibleCerts = useMemo(() => 
    filteredCerts.slice(0, visibleCount)
  , [filteredCerts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + (isMobile ? 3 : 6), filteredCerts.length));
  };

  const handleShowLess = () => {
    setVisibleCount(isMobile ? 3 : 6);
  };

  const handleClearFilters = () => {
    setFilter("all");
    setSearch("");
    setVisibleCount(isMobile ? 3 : 6);
  };

  const getCategoryBadge = (category) => {
    const categoryMap = {
      "frontend": { color: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: <Code2 className="w-3 h-3" />, label: "Frontend" },
      "backend": { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: <Server className="w-3 h-3" />, label: "Backend" },
      "devops": { color: "bg-green-500/10 text-green-400 border-green-500/20", icon: <Terminal className="w-3 h-3" />, label: "DevOps" },
      "cloud": { color: "bg-orange-500/10 text-orange-400 border-orange-500/20", icon: <Cloud className="w-3 h-3" />, label: "Cloud" },
      "programming": { color: "bg-pink-500/10 text-pink-400 border-pink-500/20", icon: <Cpu className="w-3 h-3" />, label: "Programación" },
      "database": { color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: <Database className="w-3 h-3" />, label: "Database" },
      "ai": { color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", icon: <Cpu className="w-3 h-3" />, label: "AI" },
      "tools": { color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", icon: <Box className="w-3 h-3" />, label: "Tools" },
    };
    
    return categoryMap[category] || { 
      color: "bg-gray-500/10 text-gray-400 border-gray-500/20", 
      icon: <Award className="w-3 h-3" />, 
      label: category 
    };
  };

  const getLevelBadge = (level) => {
    switch(level) {
      case "beginner":
        return { label: "Principiante", color: "bg-green-500/10 text-green-400" };
      case "intermediate":
        return { label: "Intermedio", color: "bg-blue-500/10 text-blue-400" };
      case "advanced":
        return { label: "Avanzado", color: "bg-purple-500/10 text-purple-400" };
      case "certified":
        return { label: "Certificado", color: "bg-yellow-500/10 text-yellow-400" };
      default:
        return { label: level, color: "bg-gray-500/10 text-gray-400" };
    }
  };

  const CertImage = ({ cert, className }) => {
    const [imgError, setImgError] = useState(false);
    
    return (
      <div className="relative w-full h-full">
        <Image
          src={imgError ? cert.defaultLogo : cert.logo}
          alt={cert.name}
          fill
          className={`rounded-lg ${className} object-cover`}
          sizes="64px"
          onError={() => setImgError(true)}
        />
      </div>
    );
  };

  return (
    <section
      id="certifications"
      className="
        relative w-full py-20 md:py-32 px-4 md:px-6 font-poppins
        bg-gradient-to-b from-gray-900 via-black to-black
        text-white overflow-hidden
      "
    >
      {/* Separador superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      
      {/* Efectos de fondo */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-900/5 rounded-full blur-3xl hidden md:block" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl hidden md:block" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-12 md:mb-16"
        >
          <span className="
            uppercase tracking-widest text-xs md:text-sm 
            text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400
            font-medium block mb-3
          ">
            Validación Técnica
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Certificaciones{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              profesionales
            </span>{" "}
            <span className="block text-xl sm:text-2xl md:text-3xl mt-3 md:mt-4 font-normal">
              que respaldan mi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                expertise técnico
              </span>
            </span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg mt-4 md:mt-6 leading-relaxed">
            <span className="text-white font-medium">15 certificaciones</span> que validan conocimientos en 
            <span className="text-white font-medium"> tecnologías modernas</span>, desde desarrollo Full Stack 
            y backend hasta DevOps e inteligencia artificial. Cada certificación demuestra 
            <span className="text-white font-medium"> compromiso con el aprendizaje continuo</span>.
          </p>

          {/* Stats rápidas - Más pequeño solo en móvil */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8 ${isMobile ? 'scale-95' : ''}`}>
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${isMobile ? 'p-2' : 'md:p-4'}`}>
              <div className="flex items-center gap-2 md:gap-3">
                <Layers className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4 md:w-5 md:h-5'} text-blue-400`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold text-white`}>15</div>
                  <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-400 uppercase tracking-wider`}>Certificados</div>
                </div>
              </div>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${isMobile ? 'p-2' : 'md:p-4'}`}>
              <div className="flex items-center gap-2 md:gap-3">
                <Zap className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4 md:w-5 md:h-5'} text-yellow-400`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold text-white`}>5</div>
                  <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-400 uppercase tracking-wider`}>Áreas</div>
                </div>
              </div>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${isMobile ? 'p-2' : 'md:p-4'}`}>
              <div className="flex items-center gap-2 md:gap-3">
                <Check className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4 md:w-5 md:h-5'} text-green-400`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold text-white`}>316h</div>
                  <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-400 uppercase tracking-wider`}>Horas totales</div>
                </div>
              </div>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${isMobile ? 'p-2' : 'md:p-4'}`}>
              <div className="flex items-center gap-2 md:gap-3">
                <Rocket className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4 md:w-5 md:h-5'} text-purple-400`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-bold text-white`}>2025</div>
                  <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-400 uppercase tracking-wider`}>Actualizado</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sistema de filtros optimizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          {/* Barra de búsqueda y controles */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar certificación..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full pl-12 pr-4 py-3 rounded-xl text-sm md:text-base
                  bg-white/5 border border-white/10
                  text-white placeholder-gray-500
                  focus:outline-none focus:border-purple-500/50 focus:bg-white/10
                  transition-all duration-300
                  hover:border-white/20
                "
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="
                    absolute right-3 top-1/2 transform -translate-y-1/2
                    text-gray-500 hover:text-white transition-colors
                  "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {(filter !== "all" || search) && (
              <button
                onClick={handleClearFilters}
                className="
                  px-4 py-3 rounded-xl text-sm md:text-base font-medium
                  bg-white/5 border border-white/10
                  text-gray-300 hover:text-white hover:bg-white/10
                  transition-all duration-300
                  flex items-center justify-center gap-2 whitespace-nowrap
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpiar filtros
              </button>
            )}
          </div>

          {/* FILTROS PROFESIONALES - Diseño horizontal en móvil */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Filtrar por área:</span>
            </div>
            
            {/* Grid de filtros responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    ${isMobile ? 'px-2 py-2' : 'px-3 py-2.5'} rounded-xl text-xs font-medium
                    flex items-center justify-between gap-2
                    transition-all duration-300 ${isMobile ? 'min-h-[40px]' : 'min-h-[50px]'}
                    ${filter === cat.id
                      ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30 shadow-lg"
                      : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20"
                    }
                  `}
                >
                  {/* Diseño horizontal para móvil */}
                  {isMobile ? (
                    <>
                      <div className="flex items-center gap-2 flex-1">
                        <span className={cat.color}>
                          {React.cloneElement(cat.icon, { className: 'w-3 h-3' })}
                        </span>
                        <span className="text-left text-xs truncate">
                          {cat.label}
                        </span>
                      </div>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-black/50">
                        {cat.count}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-1.5 w-full">
                        <span className={cat.color}>
                          {cat.icon}
                        </span>
                        <span className="text-center text-xs sm:text-sm">
                          {cat.label}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-black/50">
                          {cat.count}
                        </span>
                      </div>
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Resultados del filtro */}
          {filteredCerts.length > 0 && (filter !== "all" || search) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="
                mt-4 p-3 md:p-4 rounded-xl
                bg-gradient-to-br from-blue-900/10 to-purple-900/10
                border border-white/10
              "
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm text-gray-300">
                      <span className="text-white font-medium">{filteredCerts.length}</span> certificaciones encontradas
                    </span>
                    {(filter !== "all" || search) && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {filter !== "all" && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5">
                            {categories.find(c => c.id === filter)?.icon}
                            {categories.find(c => c.id === filter)?.label}
                          </span>
                        )}
                        {search && (
                          <span className="px-2 py-1 rounded-full bg-white/5">
                            "{search}"
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 sm:text-right">
                  Mostrando {Math.min(visibleCount, filteredCerts.length)} de {filteredCerts.length}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Grid de certificaciones responsive */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} mb-8`}>
          {visibleCerts.map((cert, index) => {
            const categoryBadge = getCategoryBadge(cert.category);
            const levelBadge = getLevelBadge(cert.level);
            
            return (
              <motion.div
                key={`${cert.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="
                    relative h-full p-4 md:p-5 rounded-xl
                    bg-gradient-to-br from-white/5 to-white/[0.02]
                    border border-white/10
                    hover:border-purple-500/30
                    transition-all duration-300
                    flex flex-col
                ">
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-lg" />
                      <CertImage cert={cert} className="" />
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 ml-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${levelBadge.color}`}>
                        {levelBadge.label}
                      </span>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{cert.hours}h</span>
                      </div>
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                    {cert.name}
                  </h3>

                  {/* Organización */}
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <Building className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-sm">{cert.organization}</span>
                  </div>

                  {/* Categoría */}
                  <div className="mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full border flex items-center gap-1.5 ${categoryBadge.color}`}>
                      {categoryBadge.icon}
                      <span className="truncate">{categoryBadge.label}</span>
                    </span>
                  </div>

                  {/* Separador */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                  {/* Fecha */}
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-sm">Obtenida: {cert.date}</span>
                  </div>

                  {/* Botón con enlace */}
                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-auto w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium
                      bg-gradient-to-r from-purple-600/20 to-blue-600/20
                      border border-white/10
                      text-white
                      hover:border-purple-500/50
                      hover:from-purple-600/30 hover:to-blue-600/30
                      hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
                      transition-all duration-300
                      flex items-center justify-center gap-2
                      group/btn
                    "
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver Credencial
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controles de paginación */}
        {filteredCerts.length > (isMobile ? 3 : 6) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            {visibleCount < filteredCerts.length ? (
              <button
                onClick={handleLoadMore}
                className="
                  px-5 md:px-6 py-3 rounded-xl text-sm md:text-base font-medium
                  bg-gradient-to-r from-purple-600/20 to-blue-600/20
                  border border-white/10
                  text-white
                  hover:border-purple-500/50
                  hover:from-purple-600/30 hover:to-blue-600/30
                  hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
                  transition-all duration-300
                  flex items-center gap-2 mx-auto group
                "
              >
                <Eye className="w-4 h-4" />
                Ver más certificaciones
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="
                  px-5 md:px-6 py-3 rounded-xl text-sm md:text-base font-medium
                  bg-white/5 border border-white/10
                  text-white
                  hover:bg-white/10 hover:border-white/20
                  transition-all duration-300
                  flex items-center gap-2 mx-auto group
                "
              >
                <EyeOff className="w-4 h-4" />
                Ver menos
                <ChevronDown className="w-4 h-4 rotate-180 group-hover:translate-y-1 transition-transform" />
              </button>
            )}
            
            <p className="text-gray-500 text-xs md:text-sm mt-2">
              Mostrando {Math.min(visibleCount, filteredCerts.length)} de {filteredCerts.length} certificaciones
            </p>
          </motion.div>
        )}

        {/* Estado vacío */}
        {filteredCerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 md:py-16"
          >
            <div className="
              w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full
              bg-gradient-to-br from-white/5 to-white/[0.02]
              border border-white/10
              flex items-center justify-center
            ">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-gray-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
              No se encontraron certificaciones
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto px-4 text-sm md:text-base">
              {search 
                ? `No hay resultados para "${search}". Prueba con otros términos o elimina los filtros.`
                : `No hay certificaciones en el área seleccionada. Prueba con otra categoría.`
              }
            </p>
            <button
              onClick={handleClearFilters}
              className="
                px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-sm md:text-base
                bg-gradient-to-r from-purple-600/20 to-blue-600/20
                border border-purple-500/30
                text-white hover:border-purple-500/50
                hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
                transition-all duration-300
                flex items-center gap-2 mx-auto
              "
            >
              <Award className="w-4 h-4" />
              Mostrar todas las certificaciones
            </button>
          </motion.div>
        )}

        {/* Footer mejorado para móvil */}
        <div className="mt-12 pt-6 md:pt-8 border-t border-white/10">
          <div className="flex flex-col gap-4">
            {/* Primera línea - Totales */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="text-sm flex flex-wrap items-center gap-1">
                <span className="text-gray-400">Total de certificaciones:</span>
                <span className="text-white font-medium">15</span>
                <span className="text-gray-500 hidden sm:inline">•</span>
                <span className="text-gray-400 sm:ml-2">Horas totales:</span>
                <span className="text-white font-medium">316h</span>
              </div>
              
              <div className="text-sm text-gray-500 flex flex-wrap items-center gap-1">
                <span className="text-gray-400">Plataforma:</span>
                <span className="text-gray-300">OpenWebinars</span>
                <span className="text-gray-500 hidden sm:inline">•</span>
                <span className="text-gray-400 sm:ml-2">Actualizado:</span>
                <span className="text-gray-300">julio 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separador inferior */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </section>
  );
}