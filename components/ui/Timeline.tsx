import { Reveal } from "./Reveal";
import type { Milestone } from "@/lib/types";

/** Vertical timeline with glowing nodes, used for achievements & history. */
export function Timeline({ items }: { items: Milestone[] }) {
  return (
    <ol className="relative ml-3 border-l border-emerald/20">
      {items.map((m, i) => (
        <Reveal as="li" key={m.title} delay={i * 0.08} from="right" className="relative ml-6 pb-10 last:pb-0">
          {/* Node */}
          <span className="absolute -left-[1.92rem] top-1 flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute h-3.5 w-3.5 animate-pulse-glow rounded-full bg-emerald/30" />
            <span className="h-2 w-2 rounded-full bg-emerald shadow-glow" />
          </span>
          <p className="font-mono text-xs font-medium text-emerald">{m.date}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{m.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{m.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
