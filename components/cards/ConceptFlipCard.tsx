import { RotateCw } from "lucide-react";
import { FlipCard } from "./FlipCard";
import type { ConceptCard } from "@/lib/types";

export function ConceptFlipCard({ concept }: { concept: ConceptCard }) {
  return (
    <FlipCard
      height="h-52"
      front={
        <>
          <p className="font-mono text-xs text-emerald/70">{"// concept"}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{concept.term}</h3>
          <p className="mt-2 flex-1 text-sm text-muted">{concept.short}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-xs text-emerald">
            <RotateCw size={12} /> Flip to learn more
          </span>
        </>
      }
      back={
        <>
          <h3 className="text-base font-semibold text-emerald-bright">{concept.term}</h3>
          <p className="mt-2 flex-1 overflow-auto text-sm leading-relaxed text-silver">{concept.detail}</p>
        </>
      }
    />
  );
}
