import fs from "node:fs";
import { compile } from "../node_modules/next-mdx-remote-client/dist/lib/compile.js";
import { runSync } from "../node_modules/next-mdx-remote-client/dist/lib/run.js";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const source = fs
  .readFileSync("src/content/estudios/frontend/keys-y-reconciliacion.mdx", "utf8")
  .replace(/^---[\s\S]*?---/, "");

const { compiledSource } = await compile(
  { value: source },
  {
    disableImports: true,
    mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
  }
);

const code = String(compiledSource);
const i = code.indexOf("_components.ol");
console.log(code.slice(Math.max(0, i - 200), i + 1200));
console.log("\n--- uses jsxDEV:", code.includes("jsxDEV"), "| uses jsxs:", code.includes("_jsxs("));
