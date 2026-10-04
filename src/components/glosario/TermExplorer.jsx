"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import TermCard from "./TermCard";
import CategoryIcon from "@/components/estudios/CategoryIcon";
// Ojo el origen del import: `searchTerms` vive en `data/glosario/search.js`, no
// en `terms/index.js`. Importarlo desde el indice arrastraba los ocho archivos
// de terminos al bundle del cliente y los 174 terminos viajaban dos veces.
import { searchTerms } from "@/data/glosario/search";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Isla de cliente: filtros, buscador y listado.
 *
 * Igual que `CategoryFilter`, este componente NO importa nada de
 * `@/utils/translations` ni los locale files. Los labels llegan ya resueltos
 * desde el servidor en `labelsByLang`, porque importar los JSON aquí metía los
 * tres idiomas en el bundle del cliente.
 *
 * Los términos sí viajan enteros: son tres frases de texto y vienen del mismo
 * módulo de datos que usa el servidor, así que no hay payload duplicado.
 */
export default function TermExplorer({ terms, groups, labelsByLang }) {
  const [activeGroup, setActiveGroup] = useState("all");
  const [query, setQuery] = useState("");
  const { language } = useLanguage();

  const labels = labelsByLang?.[language] ?? labelsByLang?.es ?? {};

  // La config vive en `groups`, no en cada término: mandarla 174 veces por el
  // payload RSC son 174 copias de la misma paleta. Se resuelve acá, una vez.
  const configByGroup = useMemo(
    () => Object.fromEntries(groups.map((group) => [group.id, group.config])),
    [groups]
  );

  const visible = useMemo(() => {
    const byGroup =
      activeGroup === "all"
        ? terms
        : terms.filter((term) => term.group === activeGroup);

    return searchTerms(byGroup, query).map((term) => ({
      ...term,
      config: configByGroup[term.group],
    }));
  }, [terms, activeGroup, query, configByGroup]);

  const pills = [
    { id: "all", label: labels.all, icon: null, config: null, count: terms.length },
    ...groups.map((group) => ({
      id: group.id,
      label: labels.groupLabels?.[group.id]?.label ?? group.id,
      icon: group.config.icon,
      config: group.config,
      count: group.count,
    })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6 md:mb-8">
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {pills.map((pill) => {
            const isActive = pill.id === activeGroup;

            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActiveGroup(pill.id)}
                aria-pressed={isActive}
                className={`
                  inline-flex items-center gap-2
                  px-3.5 py-2 rounded-xl
                  text-sm font-medium
                  border transition-all duration-300
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50
                  ${
                    isActive
                      ? pill.config
                        ? `bg-gradient-to-r ${pill.config.gradient} ${pill.config.border} text-white`
                        : "bg-white/10 border-white/20 text-white"
                      : "bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {pill.icon && <CategoryIcon name={pill.icon} className="w-4 h-4" />}
                {pill.label}
                <span className={`text-xs ${isActive ? "text-white/70" : "text-gray-600"}`}>
                  {pill.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72 xl:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.search_placeholder}
            aria-label={labels.search_placeholder}
            className="
              w-full pl-11 pr-11 py-2.5 rounded-xl
              bg-white/[0.02] border border-white/10
              text-white text-sm
              placeholder:text-gray-600
              focus:outline-none focus:border-purple-500/40
              transition-colors duration-300
            "
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={labels.clear_search}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <p className="sr-only" role="status">
            {labels.results.replace("{count}", String(visible.length))}
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {visible.map((term) => (
              <TermCard
                key={term.slug}
                term={term}
                groupLabel={labels.groupLabels?.[term.group]?.label}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="py-16 px-6 rounded-2xl text-center border border-dashed border-white/10 bg-white/[0.01]">
          <p className="text-gray-400 mb-2">{labels.no_results_title}</p>
          <p className="text-gray-600 text-sm">{labels.no_results_body}</p>
        </div>
      )}
    </div>
  );
}