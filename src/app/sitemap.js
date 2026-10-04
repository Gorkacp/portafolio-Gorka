import { getAllEstudios, getCategoryIds } from "@/lib/estudios";
import { getAllTerms, GLOSSARY_PATHNAME } from "@/lib/glosario";
import { SITE_URL } from "@/lib/seo";

const projects = [
  { slug: "golive-platform", lastmod: "2026-06-06", priority: 0.8 },
  { slug: "jarvis", lastmod: "2026-06-07", priority: 0.7 },
];

/**
 * Built from the content directory instead of a hand-maintained list. A manual
 * array guarantees a silent gap between what you published and what you told
 * Google about; this cannot drift.
 */
export default function sitemap() {
  const estudios = getAllEstudios();
  const categoryIds = getCategoryIds();
  const now = new Date().toISOString().slice(0, 10);

  const staticPages = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/estudios`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${GLOSSARY_PATHNAME}`,
      lastModified: now,
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
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articlePages = estudios.map((estudio) => ({
    url: `${SITE_URL}${estudio.href}`,
    lastModified: estudio.updatedIso ?? now,
    changeFrequency: "yearly",
    // Articles almost never change, so the crawl budget should reflect that.
    priority: estudio.featured ? 0.8 : 0.6,
  }));

  // `getAllTerms()` se llama una vez y las 174 entradas salen de ahi. Igual que
  // con los articulos: una lista escrita a mano garantiza un hueco entre lo
  // publicado y lo declarado a Google.
  const glossaryPages = getAllTerms().map((term) => ({
    url: `${SITE_URL}${GLOSSARY_PATHNAME}/${term.slug}`,
    lastModified: now,
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