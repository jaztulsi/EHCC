import {
  Atom,
  BarChart3,
  Binary,
  Bot,
  BrainCircuit,
  Code2,
  Database,
  FileCode2,
  Gamepad2,
  GitBranch,
  Globe,
  GraduationCap,
  Medal,
  Megaphone,
  MessageSquare,
  Mic,
  Network,
  Plug,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

// Registry mapping the icon-name strings stored in lib/data.ts to components.
const registry: Record<string, LucideIcon> = {
  Atom,
  BarChart3,
  Binary,
  Bot,
  BrainCircuit,
  Code2,
  Database,
  FileCode2,
  Gamepad2,
  GitBranch,
  Globe,
  GraduationCap,
  Medal,
  Megaphone,
  MessageSquare,
  Mic,
  Network,
  Plug,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  Users,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? Code2;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
