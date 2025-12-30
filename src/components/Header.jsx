"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { getTranslation } from "@/utils/translations";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("es");
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  /* Inicializar idioma en cliente */
  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem("language");
    const validLangs = ["es", "en", "de"];
    const langToUse = validLangs.includes(savedLang) ? savedLang : "es";
    setLanguage(langToUse);
    localStorage.setItem("language", langToUse);
    document.documentElement.lang = langToUse;
  }, []);

  /* Cambiar idioma */
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    document.documentElement.lang = newLang;
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

  /* Scroll suave */
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  /* Loading (evita SSR issues) */
  if (!isMounted) {
    return <header className="fixed top-0 left-0 w-full z-50 bg-black h-[80px]" />;
  }

  const menuItems = [
    { name: getTranslation(language, "Header.home"), href: "#home" },
    { name: getTranslation(language, "Header.about"), href: "#about" },
    { name: getTranslation(language, "Header.capabilities"), href: "#capabilities" },
    { name: getTranslation(language, "Header.projects"), href: "#projects" },
    { name: getTranslation(language, "Header.certifications"), href: "#certifications" },
    { name: getTranslation(language, "Header.contact"), href: "#contact" },
  ];

  const languages = [
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];

  const currentLanguage =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-black"
      }`}
    >
      <div className="flex items-center justify-between py-5 pr-8">
        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="pl-6"
        >
          <span className="flex flex-col leading-none">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Gorka
            </span>
            <span className="text-xl sm:text-2xl font-medium text-white">
              Carmona Pino
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-white font-medium hover:text-blue-400 transition"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Selector de idioma desktop */}
          <div className="relative" ref={desktopRef}>
            <button
              onClick={() => setDesktopDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              {/* Bandera + texto */}
              <span className="text-xl">{currentLanguage.flag}</span>
              <span className="text-white font-medium">{currentLanguage.label}</span>
              <HiChevronDown
                className={`text-white transition ${desktopDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {desktopDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                {languages
                  .filter((l) => l.code !== language)
                  .map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center gap-2 px-4 py-2 w-full text-white hover:bg-gray-700 transition"
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          {/* Selector de idioma móvil */}
          <div className="relative" ref={mobileRef}>
            <button
              onClick={() => setMobileDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <span className="text-xl">{currentLanguage.flag}</span>
              <HiChevronDown
                className={`text-white transition ${mobileDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg overflow-hidden shadow-lg z-50">
                {languages
                  .filter((l) => l.code !== language)
                  .map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center gap-2 px-4 py-2 w-full text-white hover:bg-gray-700 transition"
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Botón menú */}
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <HiX size={32} /> : <HiMenu size={32} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <nav className="md:hidden bg-black px-8 py-10 flex flex-col gap-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-2xl text-white"
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
