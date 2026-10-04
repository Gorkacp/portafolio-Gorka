"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import EstudioCard from "./EstudioCard";
import CategoryIcon from "./CategoryIcon";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Este componente corre en el navegador, asi que no importa NADA de
 * `@/utils/translations` ni de `@/lib/estudiosLabels`: ambos llegan hasta
 * `@/locales/*.json` por import estatico y metian los tres archivos de idioma
 * (85 KB de JSON) mas el dataset de certificaciones en el bundle del cliente, en
 * todas las rutas.
 *
 * `labelsByLang` lo calcula el servidor (`@/lib/clientLabels`) con los labels ya
 * resueltos para los tres idiomas. El visitante elige con el selector de
 * idioma, asi que el cambio es instantaneo y sin round-trip.
 */
export default function CategoryFilter({ estudios, categories, labelsByLang }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const { language } = useLanguage();

  const labels = labelsByLang?.[language] ?? labelsByLang?.es ?? {};

  const normalizedQuery = query.trim().toLowerCase();

  const visible = useMemo(() => {
    return estudios.filter((estudio) => {
      if (activeCategory !== "all" && estudio.category !== activeCategory) {
        return false;
      }

      if (!normalizedQuery) return true;

      const haystack = [estudio.title, estudio.description, ...estudio.tags]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [estudios, activeCategory, normalizedQuery]);

  const pills = [
    { id: "all", label: labels.all, icon: null, config: null, count: estudios.length },
    ...categories.map((category) => ({
      id: category.id,
      label: labels.categoryLabels[category.id]?.label ?? category.id,
      icon: category.config.icon,
      config: category.config,
      count: category.count,
    })),
  ];

  return (
    <div>
      {/*
        Filtros y buscador en una sola fila a partir de lg. Apilados en mobile,
        en línea en escritorio, que es donde se estaba desperdiciando el ancho.
      */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6 md:mb-8">
        {/* Filtros por sección */}
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {pills.map((pill) => {
            const isActive = pill.id === activeCategory;

            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActiveCategory(pill.id)}
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

        {/* Buscador */}
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

      {/* Resultados */}
      {visible.length > 0 ? (
        <>
          <p className="sr-only" role="status">
            {labels.results.replace("{count}", String(visible.length))}
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {visible.map((estudio) => (
              <EstudioCard key={estudio.href} estudio={estudio} labels={labels} />
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