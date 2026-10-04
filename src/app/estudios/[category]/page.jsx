import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import EstudioCard from "@/components/estudios/EstudioCard";
import CategoryIcon from "@/components/estudios/CategoryIcon";
import Breadcrumbs from "@/components/estudios/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import {
  getAllEstudioSlugs,
  getCategoryIds,
  getEstudiosByCategory,
} from "@/lib/estudios";
import { getCategoryConfig } from "@/data/estudios/categories";
import { buildEstudiosLabels } from "@/lib/estudiosLabels";
import { absoluteUrl, breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";
import { getTranslation } from "@/utils/translations";

const INDEX_PATHNAME = "/estudios";

/**
 * Category pages are real, crawlable routes with their own metadata, not just a
 * client-side filter state on the index. That is what lets each section rank on
 * its own terms and gives the crawler a second path into every article.
 */
export function generateStaticParams() {
  return getCategoryIds().map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { category } = await params;
  const config = getCategoryConfig(category);
  const categoryIds = getCategoryIds();

  if (!categoryIds.includes(category)) {
    return { title: getTranslation("es", "Estudios.meta_title") };
  }

  const label = getTranslation("es", `Estudios.categories.${category}.label`);
  const description = getTranslation("es", `Estudios.categories.${category}.description`);
  const url = absoluteUrl(`${INDEX_PATHNAME}/${category}`);

  return {
    title: `${label} | ${getTranslation("es", "Estudios.meta_title")}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url,
      title: label,
      description,
      siteName: "Gorka Carmona Pino - Full Stack Developer Portfolio",
      images: [
        {
          url: "https://portafolio-gorka.vercel.app/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: `${label} - Estudios técnicos de Gorka Carmona Pino`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: label,
      description,
      images: ["https://portafolio-gorka.vercel.app/opengraph-image.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const categoryIds = getCategoryIds();
  if (!categoryIds.includes(category)) notFound();

  const config = getCategoryConfig(category);
  const estudios = getEstudiosByCategory(category);
  const labels = buildEstudiosLabels("es", categoryIds);
  const meta = labels.categoryLabels[category];

  const cardLabels = {
    ...labels,
    language: "es",
  };

  return (
    <>
      <JsonLd
        data={[
          collectionJsonLd({
            pathname: `${INDEX_PATHNAME}/${category}`,
            name: meta?.label ?? category,
            description: meta?.description ?? "",
            items: estudios,
          }),
          breadcrumbJsonLd([
            { name: "Inicio", href: "/" },
            { name: labels.hero_eyebrow, href: INDEX_PATHNAME },
            { name: meta?.label ?? category },
          ]),
        ]}
      />

      <div className="bg-black">
        {/*
          Cabecera y grilla en un solo `<section>`: al estar en dos secciones
          distintas, el `pb-28` de la cabecera más el `pt-*` de la siguiente
          sumaban ~150px de vacío entre el texto y las tarjetas.
          `layout.js` ya compensa el header fijo.
        */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div
            className={`absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl hidden md:block`}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 pt-10 pb-14 md:pt-14 md:pb-20">
            <Breadcrumbs
              items={[
                { name: "Inicio", href: "/" },
                { name: labels.hero_eyebrow, href: INDEX_PATHNAME },
                { name: meta?.label ?? category },
              ]}
            />

            <div className="mt-8 md:mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`
                    inline-flex items-center gap-2 uppercase tracking-widest
                    text-xs md:text-sm font-medium
                    px-3 py-1.5 rounded-lg border ${config.badge}
                  `}
                >
                  <CategoryIcon name={config.icon} className="w-4 h-4" />
                  {labels.category_eyebrow}
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

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {meta?.label ?? category}
              </h1>

              <p className="text-gray-300 text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
                {meta?.description}
              </p>
            </div>

            {estudios.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-10 md:mt-12">
                {estudios.map((estudio) => (
                  <EstudioCard
                    key={estudio.href}
                    estudio={estudio}
                    labels={cardLabels}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-10 md:mt-12 py-16 px-6 rounded-2xl text-center text-gray-500 border border-dashed border-white/10">
                {labels.empty_category}
              </p>
            )}
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}