import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import CategoryIcon from "./CategoryIcon";
import { formatDate } from "@/lib/format";

export default function EstudioCard({ estudio, labels }) {
  const { config } = estudio;

  return (
    <Link
      href={estudio.href}
      className={`
        group relative flex flex-col h-full
        p-5 md:p-6 rounded-2xl
        bg-gradient-to-br ${config.gradient}
        border ${config.border} ${config.hoverBorder}
        transition-all duration-300
        hover:-translate-y-1
        focus-visible:-translate-y-1
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50
      `}
    >
      {/* Cabecera: sección + fecha */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span
          className={`
            inline-flex items-center gap-2
            px-3 py-1.5 rounded-lg
            text-xs font-medium
            border ${config.badge}
          `}
        >
          <CategoryIcon name={config.icon} className="w-3.5 h-3.5" />
          {labels.categoryLabels[estudio.category]?.label ?? estudio.category}
        </span>

        <time
          dateTime={estudio.publishedIso}
          className="text-xs text-gray-400 whitespace-nowrap"
        >
          {formatDate(estudio.published, labels.language)}
        </time>
      </div>

      {/* Título */}
      <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-2 transition-colors duration-300 group-hover:text-purple-200">
        {estudio.title}
      </h3>

      {/* Descripción */}
      <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-5 flex-1">
        {estudio.description}
      </p>

      {/* Tags */}
      {estudio.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-5">
          {estudio.tags.map((tagName) => (
            <li
              key={tagName}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-gray-400"
            >
              <Tag className="w-2.5 h-2.5" />
              {tagName}
            </li>
          ))}
        </ul>
      )}

      {/* Pie: tiempo de lectura + CTA */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          {labels.reading_time.replace("{minutes}", String(estudio.readingMinutes))}
        </span>

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-300">
          {labels.read_more}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}