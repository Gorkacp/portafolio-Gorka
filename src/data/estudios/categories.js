// src/data/estudios/categories.js
//
// Structural + visual config for each studies section.
//
// Translatable copy (labels, descriptions) is NOT here. It lives in
// src/locales/{es,en,de}.json under `Estudios.categories.<id>` so it keeps
// flowing through the existing getTranslation() pipeline like every other
// section of the site.
//
// Adding a section = create the folder + add an entry below + add the copy to
// the three locale files. Folders without an entry here are ignored on purpose:
// a section with no accent theme is a bug, not a valid state.

export const DEFAULT_CATEGORY = "arquitectura";

export const CATEGORY_ORDER = [
  "javascript",
  "frontend",
  "backend",
  "datos",
  "arquitectura",
  "devops",
];

export const CATEGORY_CONFIG = {
  javascript: {
    icon: "Code2",
    accent: "amber",
    gradient: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-400/40",
    iconBg: "from-amber-600/20 to-orange-600/20",
    iconBorder: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  frontend: {
    icon: "Layout",
    accent: "cyan",
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-400/40",
    iconBg: "from-cyan-600/20 to-blue-600/20",
    iconBorder: "border-cyan-500/30",
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  backend: {
    icon: "Server",
    accent: "purple",
    gradient: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/40",
    iconBg: "from-purple-600/20 to-pink-600/20",
    iconBorder: "border-purple-500/30",
    text: "text-purple-400",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
  datos: {
    icon: "Database",
    accent: "emerald",
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-400/40",
    iconBg: "from-emerald-600/20 to-teal-600/20",
    iconBorder: "border-emerald-500/30",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  arquitectura: {
    icon: "Network",
    accent: "violet",
    gradient: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    hoverBorder: "hover:border-violet-400/40",
    iconBg: "from-violet-600/20 to-purple-600/20",
    iconBorder: "border-violet-500/30",
    text: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  },
  devops: {
    icon: "Container",
    accent: "rose",
    gradient: "from-rose-500/20 to-pink-500/10",
    border: "border-rose-500/20",
    hoverBorder: "hover:border-rose-400/40",
    iconBg: "from-rose-600/20 to-pink-600/20",
    iconBorder: "border-rose-500/30",
    text: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
};

export function getCategoryConfig(category) {
  return CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG[DEFAULT_CATEGORY];
}