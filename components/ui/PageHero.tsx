import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Inner-page header: the label on its ruler, the title, an optional lede. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("page-head", className)}>
      <div className="page-head-in">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-lede">{subtitle}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
