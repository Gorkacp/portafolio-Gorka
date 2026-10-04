import Link from "next/link";
import CodeBlock from "./CodeBlock";
import { Nota, Aviso, Idea } from "./callouts";

function isInternal(href) {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

/**
 * Markdown tables have no intrinsic width limit, and nothing upstream scrolls
 * them. Left bare, a four-column table on a 375px screen makes the *whole page*
 * scroll sideways, which drags the fixed header out of alignment. The wrapper
 * turns that into a scroll region scoped to the table.
 *
 * `prose` puts vertical margins on the table itself, which would double up with
 * the wrapper, hence `my-0` on the inner element.
 */
function ScrollableTable({ children, ...props }) {
  return (
    <div className="-mx-4 md:mx-0 my-8 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="my-0" {...props}>
        {children}
      </table>
    </div>
  );
}

/**
 * MDX renders plain HTML tags by default. Remapping the ones that need it keeps
 * the markup semantic (`<a>` for links, `<pre>` for code) while letting the
 * article author stay in pure markdown.
 */
export const mdxComponents = {
  a: ({ href = "", children, ...props }) =>
    isInternal(href) ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  pre: CodeBlock,
  table: ScrollableTable,
  Nota,
  Aviso,
  Idea,
};