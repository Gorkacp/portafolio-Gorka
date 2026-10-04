import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, CalendarDays, Clock, RefreshCw, Tag } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import MdxContent from "@/components/estudios/MdxContent";
import TableOfContents from "@/components/estudios/TableOfContents";
import Breadcrumbs from "@/components/estudios/Breadcrumbs";
import CategoryIcon from "@/components/estudios/CategoryIcon";
import JsonLd from "@/components/JsonLd";
import {
  getAllEstudioSlugs,
  getCategoryIds,
  getEstudio,
  getRelatedEstudios,
} from "@/lib/estudios";
import { getCategoryConfig } from "@/data/estudios/categories";
import { buildEstudiosLabels, fill } from "@/lib/estudiosLabels";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  techArticleJsonLd,
} from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { getEstudiosLabels } from "@/lib/clientLabels";
import { getTranslation } from "@/utils/translations";

const INDEX_PATHNAME = "/estudios";

export function generateStaticParams() {
  return getAllEstudioSlugs();
}

/**
 * Without this, any path under /estudios would be rendered on demand and return
 * a 200 even when the article does not exist. `dynamicParams = false` makes
 * unknown slugs a real 404, which is the only correct answer for a page that is
 * meant to be indexed.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const estudio = getEstudio(category, slug);

  if (!estudio) {
    return { title: getTranslation("es", "Estudios.meta_title") };
  }

  const url = absoluteUrl(estudio.href);
  const label = getTranslation("es", `Estudios.categories.${category}.label`);

  return {
    title: `${estudio.title} | ${label}`,
    description: estudio.description,
    keywords: [...estudio.tags, label],
    authors: [{ name: "Gorka Carmona Pino", url: "https://portafolio-gorka.vercel.app" }],
    creator: "Gorka Carmona Pino",
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "es_ES",
      url,
      title: estudio.title,
      description: estudio.description,
      siteName: "Gorka Carmona Pino - Full Stack Developer Portfolio",
      publishedTime: estudio.publishedIso,
      modifiedTime: estudio.updatedIso,
      authors: ["https://portafolio-gorka.vercel.app/#person"],
      section: label,
      tags: estudio.tags,
      images: [
        {
          url: "https://portafolio-gorka.vercel.app/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: estudio.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: estudio.title,
      description: estudio.description,
      images: ["https://portafolio-gorka.vercel.app/opengraph-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export default async function EstudioPage({ params }) {
  const { category, slug } = await params;
  const estudio = getEstudio(category, slug);

  if (!estudio) notFound();

  const categoryIds = getCategoryIds();
  const config = getCategoryConfig(estudio.category);
  const labels = buildEstudiosLabels("es", categoryIds);
  const meta = labels.categoryLabels[estudio.category];
  const categoryLabel = meta?.label ?? estudio.category;
  const related = getRelatedEstudios(estudio);
  // El titulo del indice lo resuelve el servidor: TableOfContents es cliente y no
  // debe importar los locale files. Ojo: getEstudiosLabels() devuelve
  // { es, en, de }, no el objeto de labels, asi que hay que bajar un nivel.
  const tocTitles = Object.fromEntries(
    Object.entries(getEstudiosLabels()).map(([code, labels]) => [code, labels.toc_title])
  );

  const wasUpdated =
    estudio.updatedIso && estudio.publishedIso && estudio.updatedIso !== estudio.publishedIso;

  const crumbs = [
    { name: "Inicio", href: "/" },
    { name: labels.hero_eyebrow, href: INDEX_PATHNAME },
    { name: categoryLabel, href: `${INDEX_PATHNAME}/${estudio.category}` },
    { name: estudio.title },
  ];

  return (
    <>
      <JsonLd
        data={[
          techArticleJsonLd({ estudio, categoryLabel }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <article className="bg-black">
        {/*
          Cabecera. Sin `pt-*` porque `layout.js` ya compensa el header fijo, y
          sin el enlace "volver" porque las migas de pan ya llevan al índice.
        */}
        <header className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div
            className={`absolute top-1/4 left-1/2 w-[36rem] h-96 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-40 hidden md:block`}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 pt-10 pb-12 md:pt-14 md:pb-14">
            <Breadcrumbs items={crumbs} />

            <div className="mt-8 md:mt-10 max-w-4xl">
              <Link
                href={`${INDEX_PATHNAME}/${estudio.category}`}
                className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-5
                  text-xs font-medium border transition-opacity hover:opacity-80
                  ${config.badge}
                `}
              >
                <CategoryIcon name={config.icon} className="w-3.5 h-3.5" />
                {categoryLabel}
              </Link>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                {estudio.title}
              </h1>

              <p className="text-gray-300 text-base md:text-lg mt-5 leading-relaxed">
                {estudio.description}
              </p>

              {/* Metadatos */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7 text-sm text-gray-400">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <time dateTime={estudio.publishedIso}>
                    {formatDate(estudio.published, "es")}
                  </time>
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {fill(labels.reading_time, { minutes: estudio.readingMinutes })}
                </span>

                {wasUpdated && (
                  <span className="inline-flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    {labels.updated_on}{" "}
                    <time dateTime={estudio.updatedIso}>
                      {formatDate(estudio.updated, "es")}
                    </time>
                  </span>
                )}

                <span>{fill(labels.by_author, { author: "Gorka Carmona Pino" })}</span>
              </div>

              {estudio.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-5">
                  {estudio.tags.map((tagName) => (
                    <li
                      key={tagName}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-gray-400"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tagName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* Cuerpo + índice. pt-0 porque la cabecera ya trae su propio pb: antes
            el header cerraba con pb-12 y el cuerpo no tenía pt, o sea el único
            respiro entre cabecera y artículo eran 48px contra los ~208px que
            había arriba. */}
        <div className="w-full px-4 md:px-6 pb-16">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[minmax(0,1fr)_240px] gap-10 lg:gap-16">
            <div className="min-w-0">
              <div className="estudio-prose prose prose-invert max-w-none prose-headings:scroll-mt-24">
                <Suspense
                  fallback={
                    <div className="space-y-4" aria-busy="true">
                      {[100, 92, 96, 70].map((width) => (
                        <div
                          key={width}
                          className="h-4 rounded bg-white/5 animate-pulse"
                          style={{ width: `${width}%` }}
                        />
                      ))}
                    </div>
                  }
                >
                  <MdxContent source={estudio.content} />
                </Suspense>
              </div>

              {/* Relacionados */}
              {related.length > 0 && (
                <section className="mt-14 pt-10 border-t border-white/10">
                  <h2 className="text-xl font-bold text-white mb-6 md:mb-8">
                    {labels.related_title}
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {related.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          group flex flex-col p-5 rounded-2xl
                          bg-gradient-to-br ${item.config.gradient}
                          border ${item.config.border} ${item.config.hoverBorder}
                          transition-all duration-300 hover:-translate-y-1
                        `}
                      >
                        <p className={`text-xs font-medium mb-2 ${item.config.text}`}>
                          {labels.categoryLabels[item.category]?.label}
                        </p>
                        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                          {item.title}
                        </h3>
                        <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-gray-400 group-hover:text-purple-300 transition-colors">
                          {labels.read_more}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <TableOfContents headings={estudio.headings} titles={tocTitles} />
          </div>
        </div>

        <SiteFooter />
      </article>
    </>
  );
}