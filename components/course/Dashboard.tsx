"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  LogOut,
  Award,
  Flame,
  RotateCcw,
} from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { COURSES, LESSON_COUNT } from "@/lib/courses";
import { useProfile } from "./useProfile";
import { useProgress } from "./useProgress";

export function Dashboard() {
  const { profile, signOut, loaded: pLoaded } = useProfile();
  const { courseProgress, totalDone, reset, loaded } = useProgress();

  if (!pLoaded || !loaded) {
    return <div className="h-40 animate-pulse rounded-2xl border border-white/5 bg-navy-800/40" />;
  }
  if (!profile) return null;

  const withProgress = COURSES.map((c) => ({ course: c, p: courseProgress(c.id) }));
  const inProgress = withProgress.filter((x) => x.p.done > 0 && !x.p.complete);
  const completed = withProgress.filter((x) => x.p.complete);
  const started = withProgress.filter((x) => x.p.done > 0);

  const stats = [
    { icon: BookOpen, value: started.length, label: "Courses Started" },
    { icon: CheckCircle2, value: totalDone, label: "Lessons Completed" },
    { icon: Award, value: completed.length, label: "Certificates" },
    { icon: Flame, value: LESSON_COUNT, label: "Lessons Available" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-emerald">{"// student.dashboard"}</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Welcome back, {profile.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-sm text-silver transition-colors hover:border-emerald/40 hover:text-emerald-bright"
          >
            <RotateCcw size={14} /> Reset progress
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-sm text-silver transition-colors hover:border-white/25"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/5 bg-navy-800/50 p-5 text-center">
            <s.icon className="mx-auto h-6 w-6 text-emerald-bright" strokeWidth={1.8} />
            <p className="mt-2 font-mono text-3xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {inProgress.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white">Continue learning</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {inProgress.map(({ course, p }) => {
              const next = course.lessons.find((_l, i) => i >= p.done) ?? course.lessons[0];
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}/${next.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-navy-800/50 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-glow"
                >
                  <span className="inline-flex shrink-0 rounded-lg bg-emerald/10 p-3 text-emerald-bright">
                    <Icon name={course.icon} className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{course.title}</p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-navy-950">
                      <div className="h-full rounded-full bg-emerald" style={{ width: `${p.pct}%` }} />
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {p.done}/{p.total} · next: {next.title}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-muted transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/5 bg-navy-800/40 p-6 text-center">
          <p className="text-muted">You haven&apos;t started a course yet.</p>
          <Link
            href="/courses/curriculum"
            className="mt-3 inline-flex items-center gap-1.5 font-semibold text-emerald-bright hover:underline"
          >
            Browse the curriculum <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {completed.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white">Certificates</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {completed.map(({ course }) => (
              <div
                key={course.id}
                className="inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-4 py-2 text-sm font-semibold text-emerald-bright shadow-glow"
              >
                <Award size={15} /> {course.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
