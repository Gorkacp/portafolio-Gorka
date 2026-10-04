import fs from "node:fs";
import path from "node:path";
import { evaluate } from "../node_modules/next-mdx-remote-client/dist/rsc/evaluate.js";
import { renderToStaticMarkup } from "react-dom/server";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

const base = path.join(process.cwd(), "src/content/estudios");
const files = [];
for (const dir of fs.readdirSync(base)) {
  const full = path.join(base, dir);
  if (fs.statSync(full).isDirectory()) {
    for (const f of fs.readdirSync(full)) {
      if (f.endsWith(".mdx")) files.push(path.join(full, f));
    }
  }
}

const warnings = [];
const originalError = console.error;
console.error = (...args) => {
  warnings.push(args.map(String).join(" ").split("\n")[0]);
};

// Stubs: enough to render the article body without importing JSX from the app.
const createElement = (await import("react")).createElement;
const callouts = Object.fromEntries(
  ["Nota", "Aviso", "Idea"].map((name) => [name, ({ children }) => createElement("div", null, children)])
);

const options = {
  disableImports: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark-default", keepBackground: false, defaultLang: "plaintext" }],
    ],
  },
};

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  try {
    const { content, error } = await evaluate({ source, options, components: callouts });
    if (error) throw error;
    renderToStaticMarkup(content);
  } catch (error) {
    originalError("FAILED", path.basename(file), error.message);
  }
}

console.error = originalError;

originalError("NODE_ENV:", process.env.NODE_ENV);
const jsxRuntimeSource = fs.readFileSync("node_modules/react/jsx-runtime.js", "utf8");
originalError("jsx-runtime ->", "node_modules/react/jsx-runtime.js");
originalError("dev runtime:", /jsx-dev-runtime/.test(jsxRuntimeSource) ? "yes" : "NO (prod)");

const keyWarnings = warnings.filter((w) => w.includes('unique "key" prop'));
const other = warnings.filter((w) => !w.includes('unique "key" prop'));

originalError("files rendered:", files.length);
originalError("key warnings:", keyWarnings.length);
originalError("other warnings:", other.length);
for (const w of new Set(other)) originalError("  OTHER:", w.slice(0, 200));
