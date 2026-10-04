import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

export default function EstudiosNotFound() {
  return (
    <div className="bg-black">
      <section className="relative w-full px-4 md:px-6 py-14 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl hidden md:block" />

        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <FileQuestion className="w-12 h-12 mx-auto text-gray-600 mb-6" />

          <p className="text-sm font-medium tracking-widest uppercase text-purple-400 mb-4">
            404
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Este artículo no existe
          </h1>

          <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
            Puede que lo hayas movido, que el nombre haya cambiado o que la dirección
            tenga un error de tipeo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/estudios"
              className="
                inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                bg-gradient-to-r from-purple-600 to-blue-600
                text-white font-semibold text-base
                hover:from-purple-700 hover:to-blue-700
                transition-all duration-300 w-full sm:w-auto
              "
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a los estudios
            </Link>

            <Link
              href="/"
              className="
                inline-flex items-center justify-center px-6 py-3.5 rounded-xl
                border border-white/10 bg-white/5
                text-white font-medium text-base
                hover:bg-white/10 transition-all duration-300 w-full sm:w-auto
              "
            >
              Ir a la home
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}