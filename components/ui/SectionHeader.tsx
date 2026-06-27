import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  /** Small mono eyebrow label, rendered with a // prefix. */
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Consistent section heading: mono eyebrow + bold title + optional subtitle. */
export function SectionHeader({ eyebrow, title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-sm font-medium text-emerald">
          <span className="text-emerald/60">//</span> {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>}
    </Reveal>
  );
}
