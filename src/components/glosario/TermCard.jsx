import Link from "next/link";
import CategoryIcon from "@/components/estudios/CategoryIcon";

/**
 * Una entrada del glosario en la lista. Es un link a su propia página porque
 * cada término tiene detalle (aliases, cuándo lo usarías) que no cabe en una
 * tarjeta.
 */
export default function TermCard({ term, groupLabel }) {
  const config = term.config ?? {};

  return (
    <Link
      href={`/glosario/${term.slug}`}
      className={`
        group flex flex-col h-full p-5 rounded-2xl
        bg-gradient-to-br ${config.gradient ?? "from-white/5 to-white/[0.02]"}
        border ${config.border ?? "border-white/10"}
        ${config.hoverBorder ?? "hover:border-white/25"}
        transition-all duration-300 hover:-translate-y-1
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50
      `}
    >
      {groupLabel && (
        <p className={`text-xs font-medium mb-2 ${config.text ?? "text-gray-400"}`}>
          {groupLabel}
        </p>
      )}

      <h3 className="font-mono text-base font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
        {term.term}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed flex-1">{term.what}</p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-500">
        <CategoryIcon name={config.icon ?? "Code2"} className="w-3.5 h-3.5" />
        {config.label ?? null}
      </span>
    </Link>
  );
}