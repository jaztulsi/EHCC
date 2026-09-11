import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  /** Small pill label above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Consistent section heading: pill label, display title, optional lede. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-4 text-3xl font-semibold tracking-display text-silver sm:text-[2.5rem] sm:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{subtitle}</p>
      )}
    </Reveal>
  );
}
