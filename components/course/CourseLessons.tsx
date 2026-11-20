"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock, ArrowRight, Award } from "lucide-react";
import type { Lesson } from "@/lib/courses";
import { useProgress } from "./useProgress";

export function CourseLessons({ courseId, lessons }: { courseId: string; lessons: Lesson[] }) {
  const { isDone, courseProgress, loaded } = useProgress();
  const p = courseProgress(courseId);

  return (
    <div>
      {/* Progress */}
      <div className="surface p-6">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Your progress</p>
          {p.complete && (
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink">
              <Award size={13} /> Certificate earned
            </span>
          )}
        </div>
        <p className="mt-1 text-xl font-bold text-ink">
          {loaded ? p.done : 0} of {p.total} lessons complete
        </p>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full border-2 border-ink bg-card">
          <div
            className="h-full rounded-full bg-emerald transition-[width] duration-500"
            style={{ width: `${loaded ? p.pct : 0}%` }}
          />
        </div>
      </div>

      {/* Lessons */}
      <ol className="mt-6 space-y-3">
        {lessons.map((l, i) => {
          const done = loaded && isDone(courseId, l.id);
          return (
            <li key={l.id}>
              <Link
                href={`/courses/${courseId}/${l.id}`}
                className="group flex items-center gap-4 surface p-4 card-lift"
              >
                {done ? (
                  <CheckCircle2 size={24} className="shrink-0 text-accent" />
                ) : (
                  <Circle size={22} className="shrink-0 text-ink-3" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-ink">
                    <span className="font-mono text-sm text-ink-3">{String(i + 1).padStart(2, "0")}</span> {l.title}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-2">{l.summary}</p>
                </div>
                <span className="hidden items-center gap-1 font-mono text-xs text-ink-2 sm:inline-flex">
                  <Clock size={12} /> {l.minutes}m
                </span>
                <ArrowRight size={16} className="text-ink-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
