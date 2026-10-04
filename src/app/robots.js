import { SITE_URL } from "@/lib/seo";

/**
 * Replaces the static `public/robots.txt`. A file in `public/` and a metadata
 * route cannot coexist: the static one silently wins and this route becomes dead
 * code, so the old file was removed.
 */
export default function robots() {
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "Claude-Web",
    "Bingbot",
    "DuckDuckBot",
    "Brave-Search",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}