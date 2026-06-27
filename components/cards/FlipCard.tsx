"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A 3D flip card. Flips on hover (desktop) and on tap/click (touch + a11y).
 * Front and back are passed as nodes so it can power "What We Do" and concepts.
 */
export function FlipCard({
  front,
  back,
  className,
  height = "h-56",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  height?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={cn("group [perspective:1200px]", height, className)}>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className={cn(
          "relative h-full w-full rounded-xl text-left transition-transform duration-500 [transform-style:preserve-3d]",
          "outline-none focus-visible:ring-2 focus-visible:ring-emerald/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
          "group-hover:[transform:rotateY(180deg)]",
          "motion-reduce:transition-none",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col rounded-xl border border-white/5 bg-navy-800/60 p-6 [backface-visibility:hidden]">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col rounded-xl border border-emerald/30 bg-navy-800 p-6 shadow-glow [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </button>
    </div>
  );
}
