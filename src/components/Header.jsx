"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  };

  /* Cerrar dropdown al click fuera */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopRef.current && !desktopRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Detectar scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll suave - solo en página principal */
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    
    // Si estamos en otra página, ir a la principal primero
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // Ya estamos en la página principal
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
    setIsOpen(false);
  };

  /* Función para volver al inicio */
  const handleLogoClick = (e) => {
    if (pathname === "/") {
      // Si ya estamos en home, hacer scroll al inicio
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Si estamos en otra página, navegar al home
      e.preventDefault();
      router.push("/");
      window.scrollTo(0, 0);
    }
    setIsOpen(false);
  };

  /* Loading (evita SSR issues) */
  const menuItems = [
    { name: getTranslation(language, "Header.home"), href: "#home" },
    { name: getTranslation(language, "Header.about"), href: "#about" },
    { name: getTranslation(language, "Header.capabilities"), href: "#capabilities" },
    { name: getTranslation(language, "Header.experience"), href: "#experience" },
    { name: getTranslation(language, "Header.projects"), href: "#projects" },
    { name: getTranslation(language, "Header.certifications"), href: "#certifications" },
    { name: getTranslation(language, "Header.contact"), href: "#contact" },
  ];

  const flags = {
    es: (
      <svg className="w-5 h-5 rounded-sm flex-shrink-0" viewBox="0 0 500 500">
        <rect width="500" height="500" fill="#c60b1e"/>
        <rect y="125" width="500" height="250" fill="#ffc400"/>
        <circle cx="250" cy="250" r="60" fill="#c60b1e"/>
      </svg>
    ),
    en: (
      <svg className="w-5 h-5 rounded-sm flex-shrink-0" viewBox="0 0 60 30">
        <clipPath id="uk"><path d="M0 0v30h60V0z"/></clipPath>
        <path d="M0 0v30h60V0z" fill="#012169"/>
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
        <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk)" stroke="#c8102e" strokeWidth="4"/>
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6"/>
      </svg>
    ),
    de: (
      <svg className="w-5 h-5 rounded-sm flex-shrink-0" viewBox="0 0 5 3">
        <rect width="5" height="3" fill="#000"/>
        <rect y="1" width="5" height="1" fill="#d00"/>
        <rect y="2" width="5" height="1" fill="#ffce00"/>
      </svg>
    ),
  };

  const languages = [
    { code: "es", label: "Español", flag: flags.es },
    { code: "en", label: "English", flag: flags.en },
    { code: "de", label: "Deutsch", flag: flags.de },
  ];

  const currentLanguage =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/95 backdrop-blur-lg shadow-lg border-b border-white/5" 
          : "bg-black"
      }`}
    >
      <div className="flex items-center justify-between py-5 px-6 md:px-8">
        {/* Logo - Esquina izquierda */}
        <button
          onClick={handleLogoClick}
          className="group relative focus:outline-none"
        >
          <div className="flex flex-col leading-none transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Gorka
            </span>
            <span className="text-lg sm:text-xl font-medium text-white">
              Carmona Pino
            </span>
          </div>
          <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300"></div>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-12">
          <nav className="flex items-center gap-8">
            {menuItems.map((item, index) => {
              // No mostrar "Inicio" si ya estamos en home
              if (item.href === "#home" && pathname === "/") return null;
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="relative group"
                >
                  <span className="text-base font-medium tracking-wide text-white/90 hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              );
            })}
          </nav>

          {/* Selector de idioma desktop */}
          <div className="relative" ref={desktopRef}>
            <button
              onClick={() => setDesktopDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              {currentLanguage.flag}
              <span className="text-white font-medium text-sm">
                {currentLanguage.label}
              </span>
              <ChevronDown
                className={`text-white/60 transition-transform duration-300 ${desktopDropdownOpen ? "rotate-180" : ""}`}
                size={18}
              />
            </button>

            {desktopDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-900/95 backdrop-blur-lg rounded-lg overflow-hidden shadow-xl border border-white/10">
                {languages
                  .filter((l) => l.code !== language)
                  .map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center gap-3 px-4 py-3 w-full text-white hover:bg-white/10 transition-all duration-200"
                    >
                      {lang.flag}
                      <span className="font-medium text-sm">{lang.label}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          {/* Selector de idioma móvil */}
          <div className="relative" ref={mobileRef}>
            <button
              onClick={() => setMobileDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
            >
              {currentLanguage.flag}
              <ChevronDown
                className={`text-white transition ${mobileDropdownOpen ? "rotate-180" : ""}`}
                size={16}
              />
            </button>

            {mobileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-900/95 backdrop-blur-lg rounded-lg overflow-hidden shadow-xl border border-white/10 z-50">
                {languages
                  .filter((l) => l.code !== language)
                  .map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center gap-2 px-3 py-2.5 w-full text-white hover:bg-white/10 transition"
                    >
                      {lang.flag}
                      <span className="text-sm">{lang.label}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <button 
            onClick={toggleMenu}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10"
          >
            {isOpen ? (
              <X size={22} className="text-white" />
            ) : (
              <Menu size={22} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <nav className="flex flex-col py-6">
            {menuItems.map((item) => {
              // No mostrar "Inicio" si ya estamos en home
              if (item.href === "#home" && pathname === "/") return null;
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="px-8 py-4 text-lg text-white hover:text-blue-300 transition-colors duration-300 border-b border-white/5 last:border-b-0"
                >
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}