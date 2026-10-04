import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { CATEGORY_CONFIG, DEFAULT_CATEGORY } from "@/data/estudios/categories";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "estudios");
const EXTENSIONS = new Set([".mdx", ".md"]);

// Spanish technical prose sits around 200 wpm. Slightly conservative so the
// estimate never under-promises on dense, code-heavy articles.
const WORDS_PER_MINUTE = 200;

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

export function estudioHref(category, slug) {
  return `/estudios/${category}/${slug}`;
}

/**
 * Strips frontmatter, MDX import/export blocks and fenced code before counting
 * words. Counting raw MDX inflates the number with code tokens, which makes the
 * "x min de lectura" label lie.
 */
function extractReadableText(source) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`\n]*`/g, " ")
    .replace(/^\s*(import|export)\s.+$/gm, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_[\]()~-]/g, " ");
}

function countWords(source) {
  const text = extractReadableText(source).trim();
  return text ? text.split(/\s+/).length : 0;
}

/**
 * Headings are collected here, at build time, instead of via a remark plugin:
 * the table of contents must be serializable to pass from a server component
 * to a client one, and `vfile.data` is not.
 *
 * Ids MUST match what `rehype-slug` generates downstream, otherwise the anchor
 * links in the TOC point at nothing. Both use `github-slugger`, so they agree.
 */
function extractHeadings(source) {
  const slugger = new GithubSlugger();
  const headings = [];
  const inFence = { open: false };

  for (const line of source.split("\n")) {
    const fence = line.match(/^\s*(```|~~~)/);
    if (fence) {
      inFence.open = !inFence.open;
      continue;
    }
    if (inFence.open) continue;

    const heading = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!heading) continue;

    const depth = heading[1].length;
    const text = heading[2].replace(/`/g, "").trim();

    headings.push({ depth, text, id: slugger.slug(text) });
  }

  return headings;
}

function normalizeDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toIsoDay(value) {
  if (!value) return null;
  return value.toISOString().slice(0, 10);
}

function readEstudioFile(category, fileName) {
  const absolutePath = path.join(CONTENT_DIR, category, fileName);
  const raw = fs.readFileSync(absolutePath, "utf8");
  const { data, content } = matter(raw);
  const slug = fileName.replace(/\.mdx?$/, "");

  const published = normalizeDate(data.published ?? data.date);
  const updated = normalizeDate(data.updated) ?? published;

  if (!data.title) {
    throw new Error(
      `[estudios] Falta "title" en el frontmatter de ${toPosix(
        path.relative(CONTENT_DIR, absolutePath)
      )}`
    );
  }

  return {
    slug,
    category,
    href: estudioHref(category, slug),
    title: String(data.title),
    description: data.description ? String(data.description) : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    lang: data.lang ? String(data.lang) : "es",
    published,
    updated,
    publishedIso: toIsoDay(published),
    updatedIso: toIsoDay(updated),
    related: Array.isArray(data.related) ? data.related.map(String) : [],
    content,
    headings: extractHeadings(content),
    wordCount: countWords(content),
    readingMinutes: Math.max(1, Math.round(countWords(content) / WORDS_PER_MINUTE)),
    config: CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG[DEFAULT_CATEGORY],
  };
}

/** Drops the body so listing pages never ship the whole article to the client. */
function toSummary(estudio) {
  const { content, headings, ...summary } = estudio;
  return summary;
}

export function getCategoryIds() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((id) => Boolean(CATEGORY_CONFIG[id]))
    .sort();
}

function getFileNames(category) {
  const categoryDir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(categoryDir)) return [];
  return fs
    .readdirSync(categoryDir)
    .filter((fileName) => EXTENSIONS.has(path.extname(fileName)))
    .sort();
}

export function getEstudioSlugs(category) {
  return getFileNames(category).map((fileName) => ({
    category,
    slug: fileName.replace(/\.mdx?$/, ""),
  }));
}

export function getAllEstudioSlugs() {
  return getCategoryIds().flatMap((category) => getEstudioSlugs(category));
}

export function getEstudio(category, slug) {
  const categoryDir = path.join(CONTENT_DIR, category);
  const fileName = getFileNames(category).find(
    (candidate) => candidate.replace(/\.mdx?$/, "") === slug
  );

  if (!fileName) return null;

  const estudio = readEstudioFile(category, fileName);
  return estudio.draft ? null : estudio;
}

/** Newest first. Drafts never reach a listing. */
export function getAllEstudios({ includeDrafts = false } = {}) {
  return getCategoryIds()
    .flatMap((category) =>
      getFileNames(category).map((fileName) => readEstudioFile(category, fileName))
    )
    .filter((estudio) => includeDrafts || !estudio.draft)
    .sort((a, b) => {
      const byDate = (b.published?.getTime() ?? 0) - (a.published?.getTime() ?? 0);
      return byDate !== 0 ? byDate : a.title.localeCompare(b.title);
    })
    .map(toSummary);
}

export function getEstudiosByCategory(category, options) {
  return getAllEstudios(options).filter((estudio) => estudio.category === category);
}

/**
 * Related links drive internal linking, which is what makes topic clusters
 * crawlable. Order of preference: explicit `related` frontmatter first, then
 * tag overlap, then anything else in the same section.
 */
export function getRelatedEstudios(estudio, limit = 3) {
  const all = getAllEstudios();
  const relatedSlugs = new Set(estudio.related);

  const explicit = [];
  const byTag = [];
  const byCategory = [];

  for (const candidate of all) {
    if (candidate.href === estudio.href) continue;

    if (relatedSlugs.has(candidate.slug) || relatedSlugs.has(candidate.href)) {
      explicit.push(candidate);
      continue;
    }

    const sharedTags = candidate.tags.filter((tag) => estudio.tags.includes(tag));
    if (sharedTags.length > 0) {
      byTag.push({ candidate, score: sharedTags.length });
      continue;
    }

    if (candidate.category === estudio.category) byCategory.push(candidate);
  }

  byTag.sort((a, b) => b.score - a.score);

  return [...explicit, ...byTag.map((entry) => entry.candidate), ...byCategory].slice(
    0,
    limit
  );
}