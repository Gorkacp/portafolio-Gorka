"use client";

import Particles from "react-tsparticles";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-32 overflow-hidden font-poppins bg-gradient-to-b from-black via-gray-900 to-black">
      
      {/* Partículas animadas */}
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          particles: {
            color: { value: ["#3b82f6", "#8b5cf6", "#f472b6"] },
            links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.1, width: 1 },
            collisions: { enable: false },
            move: { direction: "none", enable: true, outModes: "bounce", random: true, speed: 1 },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Figuras de fondo animadas */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-4xl">
        <span className="text-sm tracking-widest uppercase text-gray-400 animate-fade-in">
          Desarrollador Web Frontend
        </span>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight animate-slide-up">
          Construyo experiencias web{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-text">
            modernas
          </span>
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed animate-slide-up delay-150">
          Diseño y desarrollo interfaces rápidas, accesibles y escalables,
          centradas en el usuario y en el detalle visual.
        </p>

        {/* Botones profesionales */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-slide-up delay-300">
          <a
            href="#projects"
            className="
              px-8 py-4 rounded-full
              bg-gray-800/70 border border-gradient-to-r from-blue-400 via-purple-500 to-pink-500
              text-white font-medium
              shadow-md
              transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:bg-gray-700/80
            "
          >
            Ver proyectos
          </a>

          <a
            href="#contact"
            className="
              px-8 py-4 rounded-full
              bg-gray-800/70 border border-gradient-to-r from-blue-400 via-purple-500 to-pink-500
              text-white font-medium
              shadow-md
              transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:bg-gray-700/80
            "
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
}
