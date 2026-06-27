import {
  BarChart3,
  BrainCircuit,
  Code2,
  FileCode2,
  GitBranch,
  Globe,
  GraduationCap,
  Medal,
  Megaphone,
  Mic,
  Network,
  Rocket,
  ShieldCheck,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

// Registry mapping the icon-name strings stored in lib/data.ts to components.
const registry: Record<string, LucideIcon> = {
  BarChart3,
  BrainCircuit,
  Code2,
  FileCode2,
  GitBranch,
  Globe,
  GraduationCap,
  Medal,
  Megaphone,
  Mic,
  Network,
  Rocket,
  ShieldCheck,
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
