// src/data/glosario/categories.js
//
// Structural + visual config for each glossary group.
//
// Same split as the estudios sections: visual config lives here, translatable
// copy lives in `src/locales/{es,en,de}.json` under `Glosario.categories.<id>`.
//
// A glossary entry is a few lines of prose, not an article, so the groups are
// broader than the estudios ones on purpose.

export const DEFAULT_CATEGORY = "arquitectura";

export const CATEGORY_ORDER = [
  "frontend",
  "css",
  "backend",
  "datos",
  "infra",
  "arquitectura",
  "seguridad",
  "proceso",
];

export const CATEGORY_CONFIG = {
  frontend: {
    icon: "Layout",
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-400/40",
    iconBg: "from-cyan-600/20 to-blue-600/20",
    iconBorder: "border-cyan-500/30",
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  css: {
    icon: "Palette",
    gradient: "from-pink-500/20 to-fuchsia-500/10",
    border: "border-pink-500/20",
    hoverBorder: "hover:border-pink-400/40",
    iconBg: "from-pink-600/20 to-fuchsia-600/20",
    iconBorder: "border-pink-500/30",
    text: "text-pink-400",
    badge: "bg-pink-500/10 text-pink-300 border-pink-500/30",
  },
  backend: {
    icon: "Server",
    gradient: "from-purple-500/20 to-violet-500/10",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/40",
    iconBg: "from-purple-600/20 to-violet-600/20",
    iconBorder: "border-purple-500/30",
    text: "text-purple-400",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
  datos: {
    icon: "Database",
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-400/40",
    iconBg: "from-emerald-600/20 to-teal-600/20",
    iconBorder: "border-emerald-500/30",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  infra: {
    icon: "Container",
    gradient: "from-rose-500/20 to-orange-500/10",
    border: "border-rose-500/20",
    hoverBorder: "hover:border-rose-400/40",
    iconBg: "from-rose-600/20 to-orange-600/20",
    iconBorder: "border-rose-500/30",
    text: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
  arquitectura: {
    icon: "Network",
    gradient: "from-violet-500/20 to-indigo-500/10",
    border: "border-violet-500/20",
    hoverBorder: "hover:border-violet-400/40",
    iconBg: "from-violet-600/20 to-indigo-600/20",
    iconBorder: "border-violet-500/30",
    text: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  },
  seguridad: {
    icon: "ShieldCheck",
    gradient: "from-red-500/20 to-rose-500/10",
    border: "border-red-500/20",
    hoverBorder: "hover:border-red-400/40",
    iconBg: "from-red-600/20 to-rose-600/20",
    iconBorder: "border-red-500/30",
    text: "text-red-400",
    badge: "bg-red-500/10 text-red-300 border-red-500/30",
  },
  proceso: {
    icon: "ClipboardCheck",
    gradient: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-400/40",
    iconBg: "from-amber-600/20 to-yellow-600/20",
    iconBorder: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
};

export function getCategoryConfig(category) {
  return CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG[DEFAULT_CATEGORY];
}