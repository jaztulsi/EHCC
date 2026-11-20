import { cn } from "@/lib/utils";

type Tone = "emerald" | "navy" | "amber" | "blue" | "violet" | "rose";

/** The homepage chip: mono caps in an ink outline. Difficulty gets the homepage colours: mint, sun, coral pink. */
const fills: Record<Tone, string> = {
  emerald: "bg-mint",
  amber: "bg-sun",
  rose: "bg-blush",
  blue: "bg-card",
  violet: "bg-card",
  navy: "bg-card",
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
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-full border-2 border-ink px-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink",
        fills[tone],
        mono && "font-mono",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Difficulty: Beginner mint, Intermediate sun, Advanced coral pink. */
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
