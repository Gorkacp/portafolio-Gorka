"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function ProjectCard() {
  return (
    <article
      className="
        flex flex-col
        w-full max-w-[350px] 
        bg-white/5 border border-white/10
        rounded-2xl overflow-hidden
        backdrop-blur-md
        shadow-lg
        transition-transform duration-300
        hover:scale-[1.02] hover:shadow-2xl
      "
    >
      {/* Imagen tipo Hero completa sin huecos */}
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[180px] xl:h-[200px] 2xl:h-[220px]">
        <Image
          src="/img/GoLive.png"
          alt="GoLive Platform"
          fill
          className="object-cover w-full h-full"
          priority
        />
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-3 px-4 pb-4 sm:px-5 sm:pb-5">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          GoLive
        </h3>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Plataforma <strong>Full Stack</strong> para la gestión y venta de
          entradas de eventos musicales, con pagos reales, tickets QR y panel
          administrativo con métricas en tiempo real.
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 pt-2">
          {["Nuxt 3", "Vue 3", "Spring Boot", "MongoDB", "JWT", "Docker", "PWA"].map(
            (tech) => (
              <span
                key={tech}
                className="
                  text-[11px] sm:text-xs px-2.5 py-1
                  rounded-full bg-white/5 border border-white/10
                  text-gray-300 font-medium
                "
              >
                {tech}
              </span>
            )
          )}
        </div>

        {/* Acciones */}
        <div className="flex gap-3 pt-4">
          <a
            href="https://golive-hu5d.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              text-white text-sm font-medium
              transition-transform duration-200 hover:scale-105
            "
          >
            <ExternalLink size={16} />
            Demo
          </a>

          <a
            href="https://github.com/Gorkacp"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              border border-white/20
              text-white text-sm font-medium
              transition-colors duration-200 hover:bg-white/10
            "
          >
            <Github size={16} />
            Código
          </a>
        </div>
      </div>
    </article>
  );
}
