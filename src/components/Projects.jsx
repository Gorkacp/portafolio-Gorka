"use client";

import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="
        relative w-full py-32 px-6 font-poppins
        bg-gradient-to-b from-black via-gray-950 to-gray-900
        text-white
      "
    >
      {/* Separador superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-[1400px] mx-auto flex flex-col gap-14">

        {/* Header */}
        <div className="max-w-3xl">
          <span className="uppercase tracking-widest text-sm text-purple-400">
            Proyectos
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            Trabajo seleccionado
          </h2>

          <p className="text-gray-400 text-lg mt-4 leading-relaxed">
            Una selección de proyectos <strong>Full Stack</strong> y
            <strong> Frontend</strong> desarrollados con foco en rendimiento,
            escalabilidad y buenas prácticas.
          </p>
        </div>

        {/* Grid de proyectos */}
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          <ProjectCard />
        </div>
      </div>
    </section>
  );
}
