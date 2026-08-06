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
      <div className="rounded-2xl border border-emerald/20 bg-navy-800/60 p-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm text-emerald">{"// course.progress"}</p>
          {p.complete && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/15 px-3 py-1 text-xs font-semibold text-emerald-bright">
              <Award size={13} /> Certificate earned
            </span>
          )}
        </div>
        <p className="mt-1 text-xl font-bold text-white">
          {loaded ? p.done : 0} of {p.total} lessons complete
        </p>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-navy-950">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-deep via-emerald to-emerald-bright transition-all duration-500"
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
                className="group flex items-center gap-4 rounded-xl border border-white/5 bg-navy-800/50 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-glow"
              >
                {done ? (
                  <CheckCircle2 size={22} className="shrink-0 text-emerald" />
                ) : (
                  <Circle size={22} className="shrink-0 text-muted/50" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-white">
                    <span className="font-mono text-sm text-emerald">{i + 1}.</span> {l.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{l.summary}</p>
                </div>
                <span className="hidden items-center gap-1 font-mono text-xs text-muted sm:inline-flex">
                  <Clock size={12} /> {l.minutes}m
                </span>
                <ArrowRight size={16} className="text-muted transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
