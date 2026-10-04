import { getAllEstudios, getCategoryIds } from "@/lib/estudios";
import { getAllTerms, GLOSSARY_PATHNAME } from "@/lib/glosario";
import { SITE_URL } from "@/lib/seo";

const projects = [
  { slug: "golive-platform", lastmod: "2026-06-06", priority: 0.8 },
  { slug: "jarvis", lastmod: "2026-06-07", priority: 0.7 },
];

/**
 * Most recent of a set of `YYYY-MM-DD` strings, or `fallback` when the set is
 * empty. `localeCompare` is correct here because the format sorts
 * lexicographically in chronological order, no timezone parsing involved.
 */
function latestDate(dates, fallback = null) {
  const valid = dates.filter(Boolean);
  if (valid.length === 0) return fallback;
  return valid.reduce((newest, date) => (date > newest ? date : newest));
}

/**
 * Built from the content directory instead of a hand-maintained list. A manual
 * array guarantees a silent gap between what you published and what you told
 * Google about; this cannot drift.
 *
 * No `lastmod` here is the build date. Google reads `lastmod` as a freshness
 * hint to decide what is worth re-crawling, so a sitemap that says "all 193
 * pages changed today" on every deploy teaches it that the field carries no
 * information. Every date below is either stored content metadata or derived
 * from the newest thing the page actually contains.
 */
export default function sitemap() {
  const estudios = getAllEstudios();
  const categoryIds = getCategoryIds();
  const terms = getAllTerms();

  // The home and the two section indexes change whenever the newest thing
  // inside them changes. Deriving it means a content deploy moves those dates
  // and a styling-only deploy does not.
  const latestArticle = latestDate(
    estudios.map((estudio) => estudio.updatedIso ?? estudio.publishedIso),
    "2026-10-04"
  );
  const latestTerm = latestDate(
    terms.map((term) => term.lastReviewed),
    "2026-10-04"
  );

  const staticPages = [
    {
      url: `${SITE_URL}/`,
      lastModified: latestArticle,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/estudios`,
      lastModified: latestArticle,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${GLOSSARY_PATHNAME}`,
      lastModified: latestTerm,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projectPages = projects.map((project) => ({
    url: `${SITE_URL}/proyectos/${project.slug}`,
    lastModified: project.lastmod,
    changeFrequency: "monthly",
    priority: project.priority,
  }));

  const categoryPages = categoryIds.map((category) => ({
    url: `${SITE_URL}/estudios/${category}`,
    // The date of the newest article in that category, not the newest in the
    // whole section: a new post in `datos` does not make `css` look fresh.
    lastModified: latestDate(
      estudios
        .filter((estudio) => estudio.category === category)
        .map((estudio) => estudio.updatedIso ?? estudio.publishedIso),
      latestArticle
    ),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articlePages = estudios.map((estudio) => ({
    url: `${SITE_URL}${estudio.href}`,
    lastModified: estudio.updatedIso ?? estudio.publishedIso,
    changeFrequency: "yearly",
    // Articles almost never change, so the crawl budget should reflect that.
    priority: estudio.featured ? 0.8 : 0.6,
  }));

  // `getAllTerms()` se llama una vez y las 174 entradas salen de ahi. Igual que
  // con los articulos: una lista escrita a mano garantiza un hueco entre lo
  // publicado y lo declarado a Google.
  const glossaryPages = terms.map((term) => ({
    url: `${SITE_URL}${GLOSSARY_PATHNAME}/${term.slug}`,
    // Per term, falling back to its group's `lastReviewed`. Resolved upstream in
    // `terms/index.js` so this file never has to know the fallback rules.
    lastModified: term.lastReviewed ?? latestTerm,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...categoryPages,
    ...articlePages,
    ...glossaryPages,
  ];
}
