import { cn } from "@/lib/utils";

type Tone = "emerald" | "navy" | "amber" | "blue" | "violet" | "rose";

/** Light-canvas tones: pale tint, mid border, dark readable label. */
const tones: Record<Tone, string> = {
  emerald: "bg-emerald/[0.08] text-emerald border-emerald/25",
  navy: "bg-navy-700 text-muted border-line",
  amber: "bg-clay/[0.09] text-clay border-clay/25",
  blue: "bg-lagoon/[0.09] text-lagoon border-lagoon/25",
  violet: "bg-iris/[0.09] text-iris border-iris/25",
  rose: "bg-clay/[0.09] text-clay border-clay/25",
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
