import type { ConceptCard } from "@/lib/types";

/** A single concept explainer. Term, one-liner, then the full explanation. */
export function ConceptFlipCard({ concept }: { concept: ConceptCard }) {
  return (
    <article className="card-lift flex h-full flex-col surface p-6">
      <h3 className="text-base font-semibold text-silver">{concept.term}</h3>
      <p className="mt-1.5 text-sm text-muted">{concept.short}</p>
      <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-muted">
        {concept.detail}
      </p>
    </article>
  );
}
