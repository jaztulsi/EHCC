import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  /** The label that sits on the ruler above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, align = "left", className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>}
      <h2 className="mt-4 text-[32px] font-medium leading-[1.12] tracking-display sm:text-[40px]">{title}</h2>
      {subtitle && <p className="mt-4 text-[17px] leading-[1.6] text-ink-2">{subtitle}</p>}
    </Reveal>
  );
}
