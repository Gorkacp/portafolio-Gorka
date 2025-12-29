"use client";

import {
  Code2,
  Layers,
  Database,
  Server,
} from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="
        relative w-full min-h-[auto] lg:min-h-screen py-20 sm:py-24 md:py-32 px-4 sm:px-6 font-poppins
        bg-gradient-to-b from-gray-900 via-black to-black
        text-white
        flex items-center
      "
    >
      {/* Separador superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">

        {/* Texto */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          <span className="uppercase tracking-widest text-xs sm:text-sm text-purple-400">
            Sobre mí
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Desarrollador{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Full Stack
            </span>{" "}
            orientado a productos digitales
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Soy <span className="text-white font-medium">Gorka Carmona</span>,
            desarrollador <strong>Full-Stack Web</strong> con una fuerte
            especialización en <strong>Frontend</strong> y experiencia sólida en
            <strong> Backend</strong>, enfocado en crear aplicaciones web modernas,
            escalables y optimizadas para SEO y rendimiento.
          </p>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Trabajo principalmente con <strong>Vue.js y Nuxt 3</strong>,
            aprovechando SSR, metadatos dinámicos y buenas prácticas para mejorar
            la experiencia de usuario y la visibilidad en buscadores. También
            tengo experiencia con <strong>React</strong>, <strong>Node.js</strong>,
            <strong>PHP</strong> y <strong>Laravel</strong>, así como en el
            desarrollo de <strong>APIs REST</strong>.
          </p>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            He finalizado proyectos full-stack que combinan
            <strong> Nuxt 3</strong>, <strong>Spring Boot</strong> y
            <strong> MongoDB Atlas</strong>, integrando un frontend avanzado con
            un backend robusto y bases de datos escalables.
          </p>
        </div>

        {/* Bloques técnicos */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">

          {/* Frontend */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              <h3 className="text-lg sm:text-xl font-semibold">
                Frontend
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                "Vue.js",
                "Nuxt 3",
                "React",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "Sass",
                "SEO & Metadatos",
              ].map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm
                    bg-white/5 border border-white/10
                    text-gray-300
                    hover:bg-white/10 transition duration-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Server className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-semibold">
                Backend
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                "Node.js",
                "Java",
                "Spring Boot",
                "PHP",
                "Laravel",
                "REST APIs",
              ].map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm
                    bg-white/5 border border-white/10
                    text-gray-300
                    hover:bg-white/10 transition duration-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Databases & Tools */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
              <h3 className="text-lg sm:text-xl font-semibold">
                Bases de datos & herramientas
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                "MySQL",
                "Oracle",
                "MongoDB",
                "Docker",
                "Git",
                "GitHub",
              ].map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm
                    bg-white/5 border border-white/10
                    text-gray-300
                    hover:bg-white/10 transition duration-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}