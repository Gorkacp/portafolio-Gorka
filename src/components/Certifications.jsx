"use client";

import { useState, useMemo } from "react";
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
  Cpu,
  Database
} from "lucide-react";
import Image from "next/image";

export default function Certifications() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

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

  // Calcular categorías únicas dinámicamente para que los filtros sean exactos
  const categories = useMemo(() => {
    // Obtener todas las categorías únicas de las certificaciones
    const uniqueCategories = [...new Set(certifications.map(cert => cert.category))];
    
    // Mapear categorías a iconos y etiquetas
    const categoryMap = {
      all: { label: "Todas", icon: <Award className="w-4 h-4" />, color: "text-gray-300" },
      frontend: { label: "Frontend", icon: <Code2 className="w-4 h-4" />, color: "text-purple-400" },
      backend: { label: "Backend", icon: <Server className="w-4 h-4" />, color: "text-blue-400" },
      devops: { label: "DevOps", icon: <Terminal className="w-4 h-4" />, color: "text-green-400" },
      cloud: { label: "Cloud", icon: <Cloud className="w-4 h-4" />, color: "text-orange-400" },
      programming: { label: "Programación", icon: <Cpu className="w-4 h-4" />, color: "text-pink-400" },
      database: { label: "Database", icon: <Database className="w-4 h-4" />, color: "text-yellow-400" },
      ai: { label: "Inteligencia Artificial", icon: <Cpu className="w-4 h-4" />, color: "text-indigo-400" },
      tools: { label: "Herramientas", icon: <Terminal className="w-4 h-4" />, color: "text-cyan-400" },
    };

    // Crear array de categorías para los filtros
    const categoryItems = [
      { id: "all", ...categoryMap.all }
    ];

    // Añadir solo las categorías que realmente existen en las certificaciones
    uniqueCategories.forEach(category => {
      if (categoryMap[category]) {
        categoryItems.push({
          id: category,
          ...categoryMap[category]
        });
      }
    });

    return categoryItems;
  }, [certifications]);

  // Función para obtener contador por categoría
  const getCategoryCount = useMemo(() => 
    categories.reduce((acc, cat) => {
      if (cat.id === "all") {
        acc["all"] = certifications.length;
      } else {
        acc[cat.id] = certifications.filter(c => c.category === cat.id).length;
      }
      return acc;
    }, {})
  , [categories, certifications]);

  const filteredCerts = useMemo(() => 
    certifications.filter(cert => {
      const matchesFilter = filter === "all" || cert.category === filter;
      const matchesSearch = cert.name.toLowerCase().includes(search.toLowerCase()) ||
                           cert.organization.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    })
  , [certifications, filter, search]);

  const visibleCerts = useMemo(() => 
    filteredCerts.slice(0, visibleCount)
  , [filteredCerts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredCerts.length));
  };

  const handleClearFilters = () => {
    setFilter("all");
    setSearch("");
    setVisibleCount(6);
  };

  const getCategoryBadge = (category) => {
    const categoryConfig = categories.find(c => c.id === category);
    if (!categoryConfig) {
      return { color: "bg-gray-500/10 text-gray-400 border-gray-500/20", icon: <Award className="w-3 h-3" />, label: category };
    }

    switch(category) {
      case "frontend":
        return { color: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
      case "backend":
        return { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
      case "devops":
        return { color: "bg-green-500/10 text-green-400 border-green-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
      case "cloud":
        return { color: "bg-orange-500/10 text-orange-400 border-orange-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
      case "programming":
        return { color: "bg-pink-500/10 text-pink-400 border-pink-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
      case "database":
        return { color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
      case "ai":
        return { color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
      case "tools":
        return { color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
      default:
        return { color: "bg-gray-500/10 text-gray-400 border-gray-500/20", icon: categoryConfig.icon, label: categoryConfig.label };
    }
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

  // Componente para manejar errores de imagen - CORREGIDO CON object-cover
  const CertImage = ({ cert, className }) => {
    const [imgError, setImgError] = useState(false);
    
    return (
      <Image
        src={imgError ? cert.defaultLogo : cert.logo}
        alt={cert.name}
        fill
        className={`rounded-lg ${className} object-cover`}
        sizes="56px"
        onError={() => setImgError(true)}
      />
    );
  };

  return (
    <section
      id="certifications"
      className="
        relative w-full py-32 px-6 font-poppins
        bg-gradient-to-b from-gray-900 via-black to-black
        text-white overflow-hidden
      "
    >
      {/* Separador superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300 tracking-widest">
              CERTIFICACIONES PROFESIONALES
            </span>
          </div>

          <h2 className="
            text-4xl sm:text-5xl font-bold leading-tight mb-6
            bg-gradient-to-r from-white via-purple-100 to-blue-100
            bg-clip-text text-transparent
          ">
            Certificaciones
            <span className="block text-3xl sm:text-4xl mt-4 text-gray-300 font-normal">
              Validación de Conocimiento
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Colección completa de certificaciones que validan mi experiencia técnica 
            y compromiso con el aprendizaje continuo en desarrollo de software.
          </p>
        </motion.div>

        {/* Sistema de filtros - Corregido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Barra de búsqueda */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar certificación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full pl-12 pr-4 py-3 rounded-lg text-sm
                bg-white/5 border border-white/10
                text-white placeholder-gray-500
                focus:outline-none focus:border-purple-500/50 focus:bg-white/10
                transition-all
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

          {/* Filtros corregidos - Solo mostrar categorías que existen */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Filtrar por categoría:</span>
              <span className="text-xs text-gray-500">
                ({certifications.length} certificaciones en total)
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-3 py-2 rounded-lg text-xs font-medium
                    flex items-center gap-2 transition-all
                    ${filter === cat.id
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30"
                      : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                    }
                  `}
                >
                  <span className={`${cat.color}`}>
                    {cat.icon}
                  </span>
                  {cat.label}
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-black/50 min-w-[1.5rem] text-center">
                    {getCategoryCount[cat.id] || 0}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Info de filtros activos */}
          {(filter !== "all" || search) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="
                mt-4 p-3 rounded-lg
                bg-white/5 border border-white/10
                flex items-center justify-between
              "
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                <span className="text-sm text-gray-300">
                  {filteredCerts.length} {filteredCerts.length === 1 ? 'certificación' : 'certificaciones'} encontrada{filteredCerts.length !== 1 ? 's' : ''}
                </span>
                {(filter !== "all" || search) && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {filter !== "all" && (
                      <span className="flex items-center gap-1">
                        {categories.find(c => c.id === filter)?.icon}
                        {categories.find(c => c.id === filter)?.label}
                      </span>
                    )}
                    {search && (
                      <>
                        {filter !== "all" && <span>•</span>}
                        <span>{search}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <button
                onClick={handleClearFilters}
                className="
                  text-xs text-gray-400 hover:text-white
                  transition-colors px-2 py-1 rounded hover:bg-white/5
                "
              >
                Limpiar filtros
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Grid de certificaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleCerts.map((cert, index) => {
            const categoryBadge = getCategoryBadge(cert.category);
            const levelBadge = getLevelBadge(cert.level);
            
            return (
              <motion.div
                key={`${cert.name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="
                    relative h-full p-6 rounded-xl
                    bg-gradient-to-br from-white/5 to-white/[0.02]
                    border border-white/10
                    hover:border-purple-500/30
                    transition-all duration-300
                    flex flex-col
                ">

                  {/* Efecto de brillo sutil */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Header con logo - CORREGIDO CON object-cover */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative w-16 h-16">
                      {/* Fondo para logos con transparencia */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-lg" />
                      <CertImage 
                        cert={cert}
                        className=""
                      />
                    </div>
                    
                    {/* Nivel */}
                    <span className={`px-2 py-1 text-xs rounded ${levelBadge.color}`}>
                      {levelBadge.label}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all">
                    {cert.name}
                  </h3>

                  {/* Organización */}
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">{cert.organization}</span>
                  </div>

                  {/* Separador */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-3" />

                  {/* Metadatos */}
                  <div className="flex flex-col gap-3 mb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{cert.date}</span>
                      </div>
                      
                      {/* Horas de certificación */}
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{cert.hours}h</span>
                      </div>
                    </div>

                    {/* Categoría */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full border flex items-center gap-1 ${categoryBadge.color}`}>
                        {categoryBadge.icon}
                        {categoryBadge.label}
                      </span>
                    </div>
                  </div>

                  {/* Botón con enlace funcional */}
                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-auto w-full px-4 py-3 rounded-lg text-sm font-medium
                      bg-gradient-to-r from-purple-500/20 to-blue-500/20
                      border border-white/10
                      text-white
                      hover:border-purple-500/50
                      hover:from-purple-500/30 hover:to-blue-500/30
                      transition-all duration-300
                      flex items-center justify-center gap-2
                      group/btn
                    "
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver Credencial
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>

                  {/* Efecto de borde inferior */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-purple-500/30 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Botón Ver Más */}
        {visibleCount < filteredCerts.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <button
              onClick={handleLoadMore}
              className="
                px-6 py-3 rounded-lg text-sm font-medium
                bg-white/5 border border-white/10
                text-white
                hover:bg-white/10 hover:border-white/20
                transition-all duration-300
                flex items-center gap-2 mx-auto group
              "
            >
              Ver más certificaciones
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Mostrando {visibleCount} de {filteredCerts.length} certificaciones
              <span className="block text-xs text-gray-600 mt-1">
                ({filteredCerts.length - visibleCount} certificaciones restantes)
              </span>
            </p>
          </motion.div>
        )}

        {/* Estado vacío */}
        {filteredCerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="
              w-20 h-20 mx-auto mb-6 rounded-full
              bg-white/5 border border-white/10
              flex items-center justify-center
            ">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              No se encontraron certificaciones
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {search 
                ? `No hay resultados para "${search}". Prueba con otros términos.`
                : `No hay certificaciones en la categoría seleccionada.`
              }
            </p>
            <button
              onClick={handleClearFilters}
              className="
                px-6 py-2 rounded-lg
                bg-gradient-to-r from-purple-500/20 to-blue-500/20
                border border-purple-500/30
                text-white hover:border-purple-500/50
                transition-all
              "
            >
              Mostrar todas las certificaciones
            </button>
          </motion.div>
        )}

        {/* Footer con estadísticas */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              <span className="text-gray-400">Total de certificaciones: </span>
              <span className="text-white font-medium">{certifications.length}</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="text-gray-500">
                <span className="text-gray-400">Plataforma: </span>
                <span className="text-gray-300">OpenWebinars</span>
              </div>
              <span className="hidden sm:inline text-gray-600">•</span>
              <div className="text-gray-500">
                <span className="text-gray-400">Actualizado: </span>
                <span className="text-gray-300">julio 2025</span>
              </div>
            </div>
          </div>
          
          {/* Resumen de categorías */}
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            {categories
              .filter(cat => cat.id !== "all")
              .map(cat => (
                <div key={cat.id} className="flex items-center gap-1 text-gray-500">
                  <span className={cat.color}>{cat.icon}</span>
                  <span>{cat.label}:</span>
                  <span className="text-gray-300">{getCategoryCount[cat.id] || 0}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}