import { cn } from "@/lib/utils";

type Tone = "emerald" | "navy" | "amber" | "blue" | "violet" | "rose";

/** A quiet tag. Colour only shows as a small dot, and only where it means something (difficulty). */
const dots: Record<Tone, string | null> = {
  emerald: "bg-accent",
  amber: "bg-[#c9a227]",
  rose: "bg-[#e5603d]",
  blue: null,
  violet: null,
  navy: null,
};

export function Badge({
  children,
  tone = "navy",
  className,
  mono = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  mono?: boolean;
}) {
  const dot = dots[tone];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md border border-line bg-raised/50 px-2 text-xs font-medium text-ink-2",
        mono && "font-mono",
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dot)} aria-hidden />}
      {children}
    </span>
  );
}

/** Difficulty gets a dot: green, marker, coral. Event types stay plain. */
export function toneFor(label: string): Tone {
  switch (label) {
    case "Beginner":
      return "emerald";
    case "Intermediate":
      return "amber";
    case "Advanced":
      return "rose";
    default:
      return "navy";
  }
}
