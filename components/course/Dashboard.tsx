"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, LogOut, RotateCcw } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { COURSES, COURSE_COUNT, LESSON_COUNT } from "@/lib/courses";
import { useProfile } from "./useProfile";
import { useProgress } from "./useProgress";

const joinedFmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export function Dashboard() {
  const { profile, signOut, loaded: pLoaded } = useProfile();
  const { courseProgress, totalDone, reset, loaded } = useProgress();
  const [leaving, setLeaving] = useState(false);

  // The rest of the page holds its own copy of the profile, so after signing out (saved in the
  // effect before this one) reload the courses home to show everyone signed out.
  useEffect(() => {
    if (leaving) window.location.assign("/courses");
  }, [leaving]);

  if (!pLoaded || !loaded) {
    return <div className="h-40 rounded-card bg-raised" aria-hidden />;
  }
  if (!profile) return null;

  const withProgress = COURSES.map((c) => ({ course: c, p: courseProgress(c.id) }));
  const inProgress = withProgress.filter((x) => x.p.done > 0 && !x.p.complete);
  const completed = withProgress.filter((x) => x.p.complete);
  const started = withProgress.filter((x) => x.p.done > 0);
  const overall = LESSON_COUNT ? Math.round((totalDone / LESSON_COUNT) * 100) : 0;
  const joined = profile.joined ? joinedFmt.format(new Date(profile.joined)) : null;

  const stats = [
    { label: "Courses started", value: started.length, context: `of ${COURSE_COUNT} courses` },
    { label: "Certificates", value: completed.length, context: completed.length === 1 ? "course finished" : "courses finished" },
    { label: "Lessons available", value: LESSON_COUNT, context: `across ${COURSE_COUNT} courses` },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="page-title">{profile.name}</h1>
          <p className="mt-3 text-[15px] text-ink-2">
            {profile.email}
            {joined && <span className="text-ink-3"> · Profile since {joined}</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm("Reset all lesson progress? Your profile stays.")) reset();
            }}
          >
            <RotateCcw strokeWidth={1.5} aria-hidden /> Reset progress
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              signOut();
              setLeaving(true);
            }}
          >
            <LogOut strokeWidth={1.5} aria-hidden /> Sign out
          </Button>
        </div>
      </div>

      {/* Figures: the one that matters is wide and carries the accent */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="surface col-span-2 p-6">
          <p className="text-[13px] text-ink-2">Lessons completed</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-[40px] font-medium leading-none tracking-title tabular-nums text-ink">{totalDone}</span>
            <span className="text-[15px] tabular-nums text-ink-3">of {LESSON_COUNT}</span>
          </p>
          <div
            className="mt-5 h-1.5 overflow-hidden rounded-full bg-raised"
            role="progressbar"
            aria-label="Lessons completed"
            aria-valuemin={0}
            aria-valuemax={LESSON_COUNT}
            aria-valuenow={totalDone}
          >
            <div className="h-full rounded-full bg-accent" style={{ width: `${overall}%` }} />
          </div>
          <p className="meta mt-2">{overall}% of the curriculum</p>
        </div>
        {stats.map((s) => (
          <div key={s.label} className="surface p-6">
            <p className="text-[13px] text-ink-2">{s.label}</p>
            <p className="mt-2 text-[40px] font-medium leading-none tracking-title tabular-nums text-ink">{s.value}</p>
            <p className="mt-3 text-[13px] text-ink-3">{s.context}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-title text-ink">Continue learning</h2>
        {inProgress.length > 0 ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {inProgress.map(({ course, p }) => {
              const next = course.lessons[p.done] ?? course.lessons[0];
              return (
                <li key={course.id}>
                  <Link
                    href={`/courses/${course.id}/${next.id}`}
                    className="surface card-lift group flex h-full items-center gap-4 p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-raised text-ink-2">
                      <Icon name={course.icon} className="h-[18px] w-[18px]" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[17px] font-medium text-ink">{course.title}</span>
                      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-raised" aria-hidden>
                        <span className="block h-full rounded-full bg-accent" style={{ width: `${p.pct}%` }} />
                      </span>
                      <span className="meta mt-2 block truncate">
                        {p.done} of {p.total} · Next: {next.title}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="shrink-0 text-ink-3 transition-colors group-hover:text-ink"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-card border-2 border-dashed border-ink/40 px-6 py-5">
            <p className="text-[15px] text-ink-2">
              {completed.length > 0 ? "Nothing in progress right now." : "You haven't started a course yet."}
            </p>
            <Button href="/courses/curriculum" variant="outline" size="sm">
              Browse the curriculum
            </Button>
          </div>
        )}
      </section>

      {completed.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-medium tracking-title text-ink">Certificates</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map(({ course }) => (
              <li key={course.id}>
                <Certificate title={course.title} lessons={course.lessons.length} name={profile.name} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

/** A printed slip: paper and ink in both themes, the club's green seal in the corner. */
function Certificate({ title, lessons, name }: { title: string; lessons: number; name: string }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-[rgb(29_27_23/0.14)] bg-[var(--paper)] p-5 text-[var(--ink)] shadow-[var(--shadow-sm)]">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs text-[#6b6458]">EHIC Courses · Certificate</p>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--emerald)] font-mono text-[11px] font-semibold text-[var(--emerald)]"
          aria-hidden
        >
          G-225
        </span>
      </div>
      <p className="mt-2 text-lg font-medium leading-6 tracking-title">{title}</p>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-dashed border-[rgb(29_27_23/0.2)] pt-3">
        <p className="truncate text-sm">{name}</p>
        <p className="shrink-0 font-mono text-xs text-[#6b6458]">
          {lessons} of {lessons} lessons
        </p>
      </div>
    </div>
  );
}
