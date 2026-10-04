import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Target, Lightbulb, CalendarClock, TriangleAlert } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/estudios/Breadcrumbs";
import CategoryIcon from "@/components/estudios/CategoryIcon";
import JsonLd from "@/components/JsonLd";
import {
  getAllTerms,
  getTermBySlug,
  getTermGroups,
  getTermsByGroup,
  GLOSSARY_PATHNAME,
  termHref,
} from "@/lib/glosario";
import { buildGlosarioLabels } from "@/lib/glosarioLabels";
import { absoluteUrl, breadcrumbJsonLd, definedTermJsonLd } from "@/lib/seo";
import { getTranslation } from "@/utils/translations";

/*
 * Prerenderizado estatico de las 174 entradas. Sin esto la ruta seria dinamica:
 * seria un servidor-rendered on demand, es decir, un render por request para un
 * contenido que no cambia nunca. Con esto el HTML se genera en el build.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTerms().map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return { title: getTranslation("es", "Glosario.meta_title") };
  }

  const title = `${term.term}: ${term.what}`;
  const description = `${term.why} ${term.when}`.slice(0, 158);

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(termHref(term.slug)) },
    openGraph: {
      type: "article",
      locale: "es_ES",
      url: absoluteUrl(termHref(term.slug)),
      title,
      description,
      siteName: "Gorka Carmona Pino - Full Stack Developer Portfolio",
      images: [
        {
          url: "https://portafolio-gorka.vercel.app/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: term.term,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://portafolio-gorka.vercel.app/opengraph-image.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function GlosarioTermPage({ params }) {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) notFound();

  const groupIds = getTermGroups().map((group) => group.id);
  const labels = buildGlosarioLabels("es", groupIds);
  const groupLabel = labels.groupLabels[term.group]?.label ?? term.group;
  const config = term.config ?? null;

  // Mismo grupo, otras entradas. Es el enlazado interno que hace que un
  // visitante que llega de Google siga leyendo en vez de volver al indice.
  const siblings = getTermsByGroup(term.group)
    .filter((candidate) => candidate.slug !== term.slug)
    .slice(0, 12);

  const setUrl = absoluteUrl(GLOSSARY_PATHNAME);

  const blocks = [
    { key: "what_is", label: labels.what_is, body: term.what, Icon: Lightbulb },
    { key: "why", label: labels.why, body: term.why, Icon: Target },
    { key: "when", label: labels.when, body: term.when, Icon: CalendarClock },
  ];

  return (
    <>
      <JsonLd
        data={[
          definedTermJsonLd({
            term,
            termUrl: termHref(term.slug),
            groupName: groupLabel,
            setUrl,
            setName: getTranslation("es", "Glosario.meta_title"),
          }),
          breadcrumbJsonLd([
            { name: "Inicio", href: "/" },
            { name: labels.hero_eyebrow, href: GLOSSARY_PATHNAME },
            { name: term.term, href: termHref(term.slug) },
          ]),
        ]}
      />

      <div className="bg-black">
        <section className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl hidden md:block" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 pt-10 pb-12 md:pt-14 md:pb-14">
            <Breadcrumbs
              items={[
                { name: "Inicio", href: "/" },
                { name: labels.hero_eyebrow, href: GLOSSARY_PATHNAME },
                { name: term.term },
              ]}
            />

            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs text-gray-500">
                <CategoryIcon name={config?.icon ?? "Code2"} className="w-3.5 h-3.5" />
                {labels.group_eyebrow}: {groupLabel}
              </span>
            </div>

            <h1 className="mt-4 font-mono text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {term.term}
            </h1>

            {term.aliases.length > 0 && (
              <p className="mt-4 text-sm text-gray-500">
                <span className="text-gray-400">{labels.also_known_as}:</span>{" "}
                {term.aliases.join(" · ")}
              </p>
            )}

          </div>
        </section>

        <section className="w-full px-4 md:px-6 pb-14 md:pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {blocks.map(({ key, label, body, Icon }) => (
                <div
                  key={key}
                  className={`
                    flex gap-4 p-5 rounded-2xl
                    bg-gradient-to-br ${config?.gradient ?? "from-white/5 to-white/[0.02]"}
                    border ${config?.border ?? "border-white/10"}
                  `}
                >
                  <div
                    className={`
                      shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                      bg-gradient-to-br ${config?.iconBg ?? "from-white/10 to-white/5"}
                      border ${config?.iconBorder ?? "border-white/10"}
                    `}
                  >
                    <Icon className={`w-4 h-4 ${config?.text ?? "text-gray-300"}`} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-1.5">
                      {label}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}

              {term.note && (
                <div className="flex gap-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20">
                    <TriangleAlert className="w-4 h-4 text-amber-400" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-300 mb-1.5">
                      {labels.note}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">{term.note}</p>
                  </div>
                </div>
              )}
            </div>

            <Link
              href={GLOSSARY_PATHNAME}
              className="
                mt-10 inline-flex items-center gap-2 text-sm text-gray-400
                hover:text-white transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50
              "
            >
              <ArrowLeft className="w-4 h-4" />
              {labels.back_title}
            </Link>
          </div>
        </section>

        {siblings.length > 0 && (
          <section className="w-full py-14 md:py-20 px-4 md:px-6 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
                {groupLabel}
              </h2>

              <div className="flex flex-wrap gap-2.5">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={termHref(sibling.slug)}
                    className={`
                      inline-flex px-3.5 py-2 rounded-xl font-mono text-sm
                      bg-white/[0.02] border border-white/10 text-gray-400
                      hover:text-white hover:bg-white/5 transition-colors
                    `}
                  >
                    {sibling.term}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <SiteFooter />
      </div>
    </>
  );
}