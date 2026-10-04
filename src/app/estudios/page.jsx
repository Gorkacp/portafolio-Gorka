import Link from "next/link";
import { BookOpen, Send } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import CategoryFilter from "@/components/estudios/CategoryFilter";
import CategoryIcon from "@/components/estudios/CategoryIcon";
import Breadcrumbs from "@/components/estudios/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getAllEstudios, getCategoryIds } from "@/lib/estudios";
import { getCategoryConfig } from "@/data/estudios/categories";
import { buildEstudiosLabels } from "@/lib/estudiosLabels";
import { absoluteUrl, breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";
import { getEstudiosLabels } from "@/lib/clientLabels";
import { getTranslation } from "@/utils/translations";

const PATHNAME = "/estudios";

// `layout.js` declares the home page as the canonical URL for every route that
// does not override it. This route has its own identity, so it must say so
// explicitly or search engines will treat the whole section as duplicate
// content of the home page.
export const metadata = {
  title: getTranslation("es", "Estudios.meta_title"),
  description: getTranslation("es", "Estudios.meta_description"),
  alternates: {
    canonical: absoluteUrl(PATHNAME),
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: absoluteUrl(PATHNAME),
    title: getTranslation("es", "Estudios.meta_title"),
    description: getTranslation("es", "Estudios.meta_description"),
    siteName: "Gorka Carmona Pino - Full Stack Developer Portfolio",
    images: [
      {
        url: "https://portafolio-gorka.vercel.app/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Estudios técnicos de Gorka Carmona Pino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getTranslation("es", "Estudios.meta_title"),
    description: getTranslation("es", "Estudios.meta_description"),
    images: ["https://portafolio-gorka.vercel.app/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EstudiosPage() {
  const categoryIds = getCategoryIds();
  const estudios = getAllEstudios();
  const labels = buildEstudiosLabels("es", categoryIds);
  // Los tres idiomas se calculan en el servidor para que el filtro del cliente
  // no tenga que importar los locale files.
  const estudiosLabels = getEstudiosLabels();

  const categories = categoryIds.map((id) => ({
    id,
    config: getCategoryConfig(id),
    count: estudios.filter((estudio) => estudio.category === id).length,
  }));

  const featured = estudios.filter((estudio) => estudio.featured).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          collectionJsonLd({
            pathname: PATHNAME,
            name: getTranslation("es", "Estudios.meta_title"),
            description: getTranslation("es", "Estudios.meta_description"),
            items: estudios,
          }),
          breadcrumbJsonLd([
            { name: "Inicio", href: "/" },
            { name: labels.hero_eyebrow, href: PATHNAME },
          ]),
        ]}
      />

      <div className="bg-black">
        {/*
          Cabecera. Sin `pt-*`: el header fijo ya está compensado en layout.js.
          El enlace "volver a la home" se eliminó porque las migas de pan ya
          cumplen esa función y tener las dos apiladas era redundante.
        */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl hidden md:block" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 pt-10 pb-12 md:pt-14 md:pb-14">
            <Breadcrumbs
              items={[
                { name: "Inicio", href: "/" },
                { name: labels.hero_eyebrow },
              ]}
            />

            {/* Sobretítulo + recuento en la misma línea: el "8 artículos" suelto
                abajo, separado 24px y con 128px de vacío detrás, era el hueco
                que másomataba. */}
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 uppercase tracking-widest text-xs md:text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-medium">
                <BookOpen className="w-4 h-4" />
                {labels.hero_eyebrow}
              </span>

              <span
                className="
                  inline-flex items-center rounded-full
                  px-3 py-1 text-xs text-gray-400
                  bg-white/5 border border-white/10
                "
              >
                {estudios.length} {labels.count_suffix}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {labels.hero_title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {labels.hero_title_highlight}
              </span>
            </h1>

            {/* max-w-2xl: a ~90 caracteres por línea el texto se vuelve difícil
                de leer, y estirado a 1400px dejaba medio contenedor vacío. */}
            <p className="text-gray-300 text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
              {labels.hero_description}
            </p>
          </div>
        </section>

        {/* Secciones */}
        <section className="w-full px-4 md:px-6 pb-14 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            {/* Antes la grilla arrancaba sola, sin ningún título que la anclara. */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
              {labels.sections_title}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-14 md:mb-16">
              {categories.map((category) => {
                const meta = labels.categoryLabels[category.id];

                return (
                  <Link
                    key={category.id}
                    href={`${PATHNAME}/${category.id}`}
                    className={`
                      group flex flex-col p-5 rounded-2xl
                      bg-gradient-to-br ${category.config.gradient}
                      border ${category.config.border} ${category.config.hoverBorder}
                      transition-all duration-300 hover:-translate-y-1
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50
                    `}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-xl mb-4 flex items-center justify-center
                        bg-gradient-to-br ${category.config.iconBg}
                        border ${category.config.iconBorder}
                      `}
                    >
                      <CategoryIcon
                        name={category.config.icon}
                        className={`w-5 h-5 ${category.config.text}`}
                      />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {meta?.label ?? category.id}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed flex-1">
                      {meta?.description}
                    </p>

                    <span className="mt-4 text-xs text-gray-500">
                      {category.count} {labels.count_suffix}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Filtro + listado */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
              {labels.articles_title}
            </h2>

            <CategoryFilter
              estudios={estudios}
              categories={categories}
              labelsByLang={estudiosLabels}
            />
          </div>
        </section>

        {/* Destacados */}
        {featured.length > 0 && (
          <section className="w-full py-14 md:py-20 px-4 md:px-6 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
                {labels.related_title}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {featured.map((estudio) => (
                  <Link
                    key={estudio.href}
                    href={estudio.href}
                    className={`
                      group p-5 rounded-2xl
                      bg-gradient-to-br ${estudio.config.gradient}
                      border ${estudio.config.border} ${estudio.config.hoverBorder}
                      transition-all duration-300 hover:-translate-y-1
                    `}
                  >
                    <p
                      className={`text-xs font-medium mb-2 ${estudio.config.text}`}
                    >
                      {labels.categoryLabels[estudio.category]?.label}
                    </p>
                    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {estudio.title}
                    </h3>
                    <p className="text-sm text-gray-400">{estudio.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="w-full py-14 md:py-20 px-4 md:px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {labels.cta_title}
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              {labels.cta_body}
            </p>
            <Link
              href="/#contact"
              className="
                inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl
                bg-gradient-to-r from-purple-600 to-blue-600
                text-white font-semibold
                hover:from-purple-700 hover:to-blue-700
                hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]
                transition-all duration-300
              "
            >
              <Send className="w-4 h-4" />
              {labels.cta_button}
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}