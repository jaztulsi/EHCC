"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "./useProgress";

export function MarkComplete({ lessonId }: { lessonId: string }) {
  const { has, toggle, loaded } = useProgress();
  const done = has(lessonId);
  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={() => toggle(lessonId)}
        disabled={!loaded}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors disabled:opacity-50",
          done
            ? "border border-emerald/40 bg-emerald/15 text-emerald-bright"
            : "bg-emerald text-navy-950 hover:bg-emerald-bright hover:shadow-glow-md"
        )}
      >
        {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
        {done ? "Completed" : "Mark as Complete"}
      </button>
      <p className="font-mono text-xs text-muted">
        {"// only mark complete if you genuinely understand it — progress saves to this browser"}
      </p>
    </div>
  );
}
