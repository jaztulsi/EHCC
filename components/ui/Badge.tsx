import { cn } from "@/lib/utils";

type Tone = "emerald" | "navy" | "amber" | "blue" | "violet" | "rose";

const tones: Record<Tone, string> = {
  emerald: "bg-emerald/10 text-emerald-bright border-emerald/30",
  navy: "bg-navy-700/60 text-silver border-white/10",
  amber: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  blue: "bg-sky-400/10 text-sky-300 border-sky-400/30",
  violet: "bg-violet-400/10 text-violet-300 border-violet-400/30",
  rose: "bg-rose-400/10 text-rose-300 border-rose-400/30",
};

export function Badge({
  children,
  tone = "emerald",
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
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        mono && "font-mono",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Map difficulty / event-type strings to a consistent badge tone. */
export function toneFor(label: string): Tone {
  switch (label) {
    case "Beginner":
    case "Hackathon":
      return "emerald";
    case "Intermediate":
    case "Workshop":
      return "blue";
    case "Advanced":
    case "Competition":
      return "rose";
    case "Guest Speaker":
      return "violet";
    case "Social":
      return "amber";
    default:
      return "navy";
  }
}
