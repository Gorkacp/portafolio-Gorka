"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("ES");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Sobre mí", href: "#about" },
    { name: "Capacidades", href: "#capabilities" }, // ← NUEVA SECCIÓN
    { name: "Proyectos", href: "#projects" },
    { name: "Certificaciones", href: "#certifications" },
    { name: "Contacto", href: "#contact" },
  ];

  const languages = [
    { code: "ES", label: "Español", flag: "🇪🇸" },
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "DE", label: "Deutsch", flag: "🇩🇪" },
  ];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll suave
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // ajustar altura del header
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-black"
      }`}
    >
      <div className="w-full flex items-center justify-between py-5 pr-8">

        {/* Logo */}
        <Link href="#home" onClick={(e) => handleSmoothScroll(e, "#home")} className="pl-6">
          <span className="flex flex-col leading-none">
            <span className="text-3xl sm:text-4xl font-extrabold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-text">
              Gorka
            </span>
            <span className="text-xl sm:text-2xl font-medium font-poppins text-white">
              Carmona Pino
            </span>
          </span>
        </Link>

        {/* Menú desktop */}
        <div className="hidden md:flex items-center gap-8">

          {/* Links */}
          <nav className="flex gap-8 font-poppins">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="relative group"
              >
                <span className="text-lg font-medium tracking-wide text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500">
                  {item.name}
                </span>
                <span className="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </nav>

          {/* Selector de idioma */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <span className="text-xl">{languages.find((l) => l.code === language).flag}</span>
              <span className="text-white font-medium">{languages.find((l) => l.code === language).label}</span>
              <HiChevronDown className={`text-white transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                {languages
                  .filter((l) => l.code !== language)
                  .map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setDropdownOpen(false);
                      }}
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

        {/* Menú móvil */}
        <div className="md:hidden flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <span className="text-lg">{languages.find((l) => l.code === language).flag}</span>
              <HiChevronDown className={`text-white transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                {languages
                  .filter((l) => l.code !== language)
                  .map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 w-full text-white hover:bg-gray-700 transition"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          <button onClick={toggleMenu} className="text-white hover:scale-110 transition">
            {isOpen ? <HiX size={32} /> : <HiMenu size={32} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <nav className="md:hidden bg-black px-8 py-10 flex flex-col gap-6 font-poppins">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-2xl font-medium text-white transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}