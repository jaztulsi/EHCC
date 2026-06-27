"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { RoadmapPath } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Interactive roadmap: pick a path, then click any node to expand its detail.
 * Nodes are connected with arrows; the active node glows.
 */
export function LearningRoadmap({ paths }: { paths: RoadmapPath[] }) {
  const [pathIdx, setPathIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const path = paths[pathIdx];
  const step = path.steps[stepIdx];

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800/50 p-6 md:p-8">
      {/* Path selector */}
      <div className="flex flex-wrap gap-2">
        {paths.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setPathIdx(i);
              setStepIdx(0);
            }}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
              pathIdx === i
                ? "border-emerald/50 bg-emerald/10 text-emerald-bright shadow-glow"
                : "border-white/10 text-muted hover:border-white/20 hover:text-silver"
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted">{path.goal}</p>

      {/* Node flow */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {path.steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <button
              onClick={() => setStepIdx(i)}
              className={cn(
                "group relative flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all",
                stepIdx === i
                  ? "border-emerald bg-emerald/15 shadow-glow"
                  : "border-white/10 bg-navy-900/60 hover:border-emerald/40"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold",
                  stepIdx === i ? "bg-emerald text-navy-950" : "bg-navy-700 text-muted group-hover:text-silver"
                )}
              >
                {i + 1}
              </span>
              <span className={cn("text-xs font-medium", stepIdx === i ? "text-emerald-bright" : "text-silver")}>
                {s.label}
              </span>
            </button>
            {i < path.steps.length - 1 && <ChevronRight size={16} className="shrink-0 text-emerald/40" />}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${pathIdx}-${stepIdx}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-xl border border-emerald/20 bg-navy-900/60 p-5"
        >
          <p className="font-mono text-xs text-emerald">
            Step {stepIdx + 1} of {path.steps.length}
          </p>
          <h4 className="mt-1 text-lg font-semibold text-white">{step.label}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.detail}</p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
              disabled={stepIdx === 0}
              className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-silver transition-colors hover:border-emerald/40 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setStepIdx((i) => Math.min(path.steps.length - 1, i + 1))}
              disabled={stepIdx === path.steps.length - 1}
              className="rounded-md bg-emerald/15 px-3 py-1.5 text-xs font-medium text-emerald-bright transition-colors hover:bg-emerald/25 disabled:opacity-40"
            >
              Next step
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
