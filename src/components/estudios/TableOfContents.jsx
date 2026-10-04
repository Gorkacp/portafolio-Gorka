"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";

/**
 * Scroll-spy for the article outline. It watches the headings themselves rather
 * than scroll position so the active item always matches what is on screen,
 * including at the very bottom of a short article.
 *
 * `titles` son los tres idiomas del encabezado, resueltos en el servidor. Antes
 * este componente llamaba a `getTranslation`, y con eso arrastraba los tres
 * locale files al bundle del cliente de todas las paginas de articulos para
 * pintar una sola palabra.
 */
export default function TableOfContents({ headings, titles }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }

        // First heading that is on screen wins, in document order.
        const nextActive = headings.find((heading) => visible.get(heading.id));
        if (nextActive) setActiveId(nextActive.id);
      },
      // A band near the top of the viewport: a heading counts as "current" once
      // it reaches the upper third, not the exact middle of the screen.
      { rootMargin: "-80px 0px -66% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={titles?.es ?? "Table of contents"} className="hidden lg:block">
      <div className="sticky top-28">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
          <ListTree className="w-4 h-4" />
          {titles?.es}
        </p>

        <ul className="space-y-1 border-l border-white/10">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;

            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`
                    block py-1.5 -ml-px border-l-2
                    text-sm leading-snug transition-all duration-200
                    ${
                      heading.depth === 3 ? "pl-7" : "pl-4"
                    }
                    ${
                      isActive
                        ? "border-purple-500 text-white font-medium"
                        : "border-transparent text-gray-500 hover:text-gray-300 hover:border-white/20"
                    }
                  `}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}