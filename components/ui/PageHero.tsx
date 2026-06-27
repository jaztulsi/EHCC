import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Standard inner-page hero with circuit backdrop and mono eyebrow. */
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
    <section className={cn("relative overflow-hidden border-b border-white/5", className)}>
      <CircuitBackground />
      <div className="container-x relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-4 font-mono text-sm text-emerald">
            <span className="text-emerald/60">//</span> {eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
