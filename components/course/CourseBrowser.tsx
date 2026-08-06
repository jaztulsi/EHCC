"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Lock, RotateCcw, ArrowRight } from "lucide-react";
import { Badge, toneFor } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { UNITS, LESSON_COUNT } from "@/lib/course";
import { cn } from "@/lib/utils";
import { useProgress } from "./useProgress";

export function CourseBrowser() {
  const { done, has, reset, loaded } = useProgress();
  const completed = loaded ? done.length : 0;
  const pct = LESSON_COUNT ? Math.round((completed / LESSON_COUNT) * 100) : 0;

  return (
    <div>
      {/* Progress dashboard */}
      <div className="rounded-2xl border border-emerald/20 bg-navy-800/60 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-emerald">{"// your.progress"}</p>
            <h3 className="mt-1 text-2xl font-bold text-white">
              {completed} of {LESSON_COUNT} lessons complete
            </h3>
          </div>
          {completed > 0 && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-sm text-silver transition-colors hover:border-emerald/40 hover:text-emerald-bright"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
        </div>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-navy-950">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-deep via-emerald to-emerald-bright transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 font-mono text-xs text-muted">{pct}% · {LESSON_COUNT} lessons live and growing</p>
      </div>

      {/* Units grid */}
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {UNITS.map((u, i) => {
          const soon = u.lessons.length === 0;
          const unitDone = u.lessons.length > 0 && u.lessons.every((l) => has(l.id));
          return (
            <Reveal key={u.id} delay={(i % 3) * 0.06}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border bg-navy-800/50 p-6 transition-all duration-300",
                  soon
                    ? "border-white/5 opacity-70"
                    : "border-white/5 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald">Unit {u.num}</span>
                  <Badge tone={toneFor(u.difficulty)} mono>
                    {u.difficulty}
                  </Badge>
                </div>
                <h3 className="mt-2 flex items-center gap-2 text-xl font-bold text-white">
                  {u.title}
                  {unitDone && <CheckCircle2 size={16} className="text-emerald" />}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{u.summary}</p>

                {soon ? (
                  <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                    <Lock size={13} /> Coming soon
                  </p>
                ) : (
                  <ul className="mt-4 space-y-1.5">
                    {u.lessons.map((l) => (
                      <li key={l.id}>
                        <Link
                          href={`/courses/${l.id}`}
                          className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-silver transition-colors hover:bg-navy-950/60 hover:text-emerald-bright"
                        >
                          {has(l.id) ? (
                            <CheckCircle2 size={15} className="shrink-0 text-emerald" />
                          ) : (
                            <Circle size={15} className="shrink-0 text-muted/50" />
                          )}
                          <span className="flex-1">{l.title}</span>
                          <ArrowRight
                            size={14}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
