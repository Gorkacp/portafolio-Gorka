"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * The copy button needs the literal code as a string, but by the time `pre`
 * reaches us shiki has already turned it into nested spans. `rehype-pretty-code`
 * keeps the newlines as real text nodes between `[data-line]` elements, so a
 * plain recursive text walk preserves them as-is.
 */
function extractText(node) {
  if (node === null || node === undefined || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node.props?.children !== undefined) return extractText(node.props.children);
  return "";
}

export default function CodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false);

  const language = props["data-language"] || props["data-rehype-pretty-code-title"];
  const code = extractText(children).replace(/\n+$/, "");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable (insecure context, permissions). Leaving the
      // label untouched is better than faking a success state.
    }
  }

  return (
    <div className="group/code relative">
      {language && (
        <span className="absolute right-14 top-3 z-10 font-mono text-[11px] uppercase tracking-wider text-gray-500 pointer-events-none">
          {language}
        </span>
      )}

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copiado" : "Copiar código"}
        // Hover-only reveal is a desktop affordance. Touch devices never fire
        // hover, so the button has to be permanently visible below `md`.
        className="
          absolute right-3 top-2.5 z-10
          p-2 rounded-lg
          bg-white/5 hover:bg-white/10
          border border-white/10
          text-gray-400 hover:text-white
          opacity-100 md:opacity-0
          md:group-hover/code:opacity-100
          md:focus-visible:opacity-100
          transition-all duration-200
        "
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>

      <pre
        {...props}
        className="rounded-xl bg-black/40 border border-white/10 p-4 md:p-5 overflow-x-auto"
      >
        {children}
      </pre>
    </div>
  );
}