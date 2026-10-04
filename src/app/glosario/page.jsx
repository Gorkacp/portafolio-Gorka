import Link from "next/link";
import { BookMarked, Send } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import TermExplorer from "@/components/glosario/TermExplorer";
import CategoryIcon from "@/components/estudios/CategoryIcon";
import Breadcrumbs from "@/components/estudios/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getAllTerms, getTermGroups, GLOSSARY_PATHNAME, termHref } from "@/lib/glosario";
import { buildGlosarioLabels } from "@/lib/glosarioLabels";
import { absoluteUrl, breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";
import { getGlosarioLabels } from "@/lib/clientLabels";
import { getTranslation } from "@/utils/translations";

export const metadata = {
  title: getTranslation("es", "Glosario.meta_title"),
  description: getTranslation("es", "Glosario.meta_description"),
  alternates: {
    canonical: absoluteUrl(GLOSSARY_PATHNAME),
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: absoluteUrl(GLOSSARY_PATHNAME),
    title: getTranslation("es", "Glosario.meta_title"),
    description: getTranslation("es", "Glosario.meta_description"),
    siteName: "Gorka Carmona Pino - Full Stack Developer Portfolio",
    images: [
      {
        url: "https://portafolio-gorka.vercel.app/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Glosario técnico de Gorka Carmona Pino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getTranslation("es", "Glosario.meta_title"),
    description: getTranslation("es", "Glosario.meta_description"),
    images: ["https://portafolio-gorka.vercel.app/opengraph-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function GlosarioPage() {
  const terms = getAllTerms();
  const groups = getTermGroups();
  const labels = buildGlosarioLabels("es", groups.map((group) => group.id));
  // Los tres idiomas se calculan en el servidor: si el explorador del cliente
  // importara los locales, entrarian los tres JSON en el bundle.
  const glosarioLabels = getGlosarioLabels();

  // Vista de tarjeta: cuatro campos de los ocho. Ver el comentario del JSX.
  const cards = terms.map((term) => ({
    slug: term.slug,
    term: term.term,
    what: term.what,
    group: term.group,
    aliases: term.aliases,
  }));

  return (
    <>
      <JsonLd
        data={[
          collectionJsonLd({
            pathname: GLOSSARY_PATHNAME,
            name: getTranslation("es", "Glosario.meta_title"),
            description: getTranslation("es", "Glosario.meta_description"),
            // El helper generico espera `{ href, title }` porque fue escrito para
            // los articulos. Los terminos usan `slug` y `term`, asi que se
            // adaptan aqui en vez de deformar el helper.
            items: terms.map((term) => ({
              href: termHref(term.slug),
              title: term.term,
            })),
          }),
          breadcrumbJsonLd([
            { name: "Inicio", href: "/" },
            { name: labels.hero_eyebrow, href: GLOSSARY_PATHNAME },
          ]),
        ]}
      />

      <div className="bg-black">
        {/*
          Cabecera. Sin `pt-*`: el header fijo ya esta compensado en layout.js.
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

            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 uppercase tracking-widest text-xs md:text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-medium">
                <BookMarked className="w-4 h-4" />
                {labels.hero_eyebrow}
              </span>

              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs text-gray-400 bg-white/5 border border-white/10">
                {terms.length} {labels.count_suffix}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {labels.hero_title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {labels.hero_title_highlight}
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
              {labels.hero_description}
            </p>
          </div>
        </section>

        {/* Grupos */}
        <section className="w-full px-4 md:px-6 pb-14 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
              {labels.groups_title}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-14 md:mb-16">
              {groups.map((group) => {
                const meta = labels.groupLabels[group.id];

                return (
                  <div
                    key={group.id}
                    className={`
                      flex flex-col p-5 rounded-2xl
                      bg-gradient-to-br ${group.config.gradient}
                      border ${group.config.border}
                    `}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-xl mb-4 flex items-center justify-center
                        bg-gradient-to-br ${group.config.iconBg}
                        border ${group.config.iconBorder}
                      `}
                    >
                      <CategoryIcon
                        name={group.config.icon}
                        className={`w-5 h-5 ${group.config.text}`}
                      />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {meta?.label ?? group.id}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed flex-1">
                      {meta?.description}
                    </p>

                    <span className="mt-4 text-xs text-gray-500">
                      {group.count} {labels.count_suffix}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Filtro + listado */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
              {labels.terms_title}
            </h2>

            {/* Solo viaja al navegador lo que la tarjeta y el buscador usan.
                Mandar la entrada completa (why, when, note, aliases) costaba
                170 KB de payload RSC inline para pintar una línea por término.
                `aliases` se queda porque escribir "usememo" tiene que encontrar
                useMemo; `why`, `when` y `note` no se usan en cliente. */}
            <TermExplorer
              terms={cards}
              groups={groups}
              labelsByLang={glosarioLabels}
            />
          </div>
        </section>

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