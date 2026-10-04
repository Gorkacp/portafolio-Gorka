import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 hover:text-purple-300 transition-colors duration-200"
                >
                  {index === 0 && <Home className="w-3 h-3" />}
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-gray-300 font-medium" : undefined}
                >
                  {item.name}
                </span>
              )}

              {!isLast && <ChevronRight className="w-3 h-3 text-gray-700" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}