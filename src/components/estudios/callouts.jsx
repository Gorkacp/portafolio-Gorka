import { Lightbulb, TriangleAlert, Quote } from "lucide-react";

const BASE =
  "my-6 flex gap-3 rounded-xl border p-4 md:p-5 text-sm md:text-base leading-relaxed";

const VARIANTS = {
  nota: {
    shell: "border-purple-500/25 bg-purple-500/[0.07]",
    icon: "text-purple-400",
    Icon: Lightbulb,
    label: "Nota",
  },
  aviso: {
    shell: "border-amber-500/25 bg-amber-500/[0.07]",
    icon: "text-amber-400",
    Icon: TriangleAlert,
    label: "Ojo con esto",
  },
  idea: {
    shell: "border-cyan-500/25 bg-cyan-500/[0.07]",
    icon: "text-cyan-400",
    Icon: Quote,
    label: "En otras palabras",
  },
};

function Callout({ kind = "nota", title, children }) {
  const { shell, icon, Icon, label } = VARIANTS[kind] ?? VARIANTS.nota;

  return (
    <aside className={`${BASE} ${shell}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${icon}`} />
      <div className="min-w-0">
        <p className={`font-semibold mb-1 ${icon}`}>{title ?? label}</p>
        <div className="text-gray-300">{children}</div>
      </div>
    </aside>
  );
}

export const Nota = (props) => <Callout {...props} kind="nota" />;
export const Aviso = (props) => <Callout {...props} kind="aviso" />;
export const Idea = (props) => <Callout {...props} kind="idea" />;