import {
  Code2,
  Layout,
  Server,
  Database,
  Network,
  Container,
  Palette,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

/**
 * Icons are stored as strings in the category config so that file stays a plain
 * data module. This is the single place where a name becomes a component.
 */
const ICONS = {
  Code2,
  Layout,
  Server,
  Database,
  Network,
  Container,
  Palette,
  ShieldCheck,
  ClipboardCheck,
};

export default function CategoryIcon({ name, className = "w-5 h-5" }) {
  const Icon = ICONS[name] ?? Code2;
  return <Icon className={className} />;
}