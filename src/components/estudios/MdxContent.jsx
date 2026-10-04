import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "./mdx-components";

/**
 * Shiki runs at build time, so highlighting costs nothing on the client: only
 * the resulting spans end up in the HTML. `keepBackground: false` hands the
 * background back to CSS, which is what keeps the code blocks consistent with
 * the rest of the design system.
 */
const options = {
  disableImports: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark-default",
          keepBackground: false,
          defaultLang: "plaintext",
        },
      ],
    ],
  },
};

export default function MdxContent({ source }) {
  return <MDXRemote source={source} options={options} components={mdxComponents} />;
}