const BASE_URL = "https://portafolio-gorka.vercel.app";

const projects = [
  { slug: "golive-platform", lastmod: "2026-06-06", priority: 0.8 },
  { slug: "jarvis", lastmod: "2026-06-07", priority: 0.7 },
];

export default function sitemap() {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: "2026-06-06",
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];

  const projectPages = projects.map((project) => ({
    url: `${BASE_URL}/proyectos/${project.slug}`,
    lastModified: project.lastmod,
    changeFrequency: "monthly",
    priority: project.priority,
  }));

  return [...staticPages, ...projectPages];
}
