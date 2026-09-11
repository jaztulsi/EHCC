import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Standard inner-page hero: pill label, display title, optional lede. */
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
    <section className={cn("hero-wash border-b border-line", className)}>
      <div className="container-x px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.06] tracking-display text-silver sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
