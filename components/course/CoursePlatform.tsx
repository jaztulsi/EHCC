"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  LogOut,
  Search,
  Award,
  Flame,
  RotateCcw,
} from "lucide-react";
import { Badge, toneFor } from "@/components/ui/Badge";
import { COURSES, TOPICS, COURSE_COUNT, LESSON_COUNT } from "@/lib/courses";
import { cn } from "@/lib/utils";
import { useProfile } from "./useProfile";
import { useProgress } from "./useProgress";

export function CoursePlatform() {
  const { profile, signIn, signOut, loaded: pLoaded } = useProfile();
  const { courseProgress, totalDone, reset, loaded } = useProgress();

  if (!pLoaded || !loaded) {
    return <div className="h-40 animate-pulse rounded-2xl border border-white/5 bg-navy-800/40" />;
  }

  return (
    <div className="space-y-14">
      {profile ? (
        <Dashboard
          name={profile.name}
          onSignOut={signOut}
          onReset={reset}
          courseProgress={courseProgress}
          totalDone={totalDone}
        />
      ) : (
        <SignUp onSignIn={signIn} />
      )}

      <Catalog courseProgress={courseProgress} signedIn={!!profile} />
    </div>
  );
}

/* ----------------------------- Sign up / in ----------------------------- */
function SignUp({ onSignIn }: { onSignIn: (name: string, email: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email);

  return (
    <div className="rounded-2xl border border-emerald/20 bg-navy-800/60 p-6 md:p-8">
      <div className="flex items-center gap-2">
        <GraduationCap className="text-emerald-bright" size={22} />
        <h2 className="text-2xl font-bold text-white">Create your student profile</h2>
      </div>
      <p className="mt-2 max-w-lg text-muted">
        Sign up to track your progress, resume where you left off, and earn certificates. It&apos;s free — your
        profile is saved to this browser (no password).
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onSignIn(name, email);
        }}
        className="mt-6 grid gap-4 sm:grid-cols-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputCls}
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@school.edu"
          className={inputCls}
          required
        />
        <button
          type="submit"
          disabled={!valid}
          className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-lg bg-emerald px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-emerald-bright disabled:opacity-50 sm:col-span-2"
        >
          Start learning <ArrowRight size={17} />
        </button>
      </form>
      <p className="mt-3 font-mono text-xs text-muted">
        {"// profile + progress are stored in your browser only"}
      </p>
    </div>
  );
}

/* ------------------------------ Dashboard ------------------------------ */
function Dashboard({
  name,
  onSignOut,
  onReset,
  courseProgress,
  totalDone,
}: {
  name: string;
  onSignOut: () => void;
  onReset: () => void;
  courseProgress: (id: string) => { done: number; total: number; pct: number; complete: boolean };
  totalDone: number;
}) {
  const withProgress = COURSES.map((c) => ({ course: c, p: courseProgress(c.id) }));
  const inProgress = withProgress.filter((x) => x.p.done > 0 && !x.p.complete);
  const completed = withProgress.filter((x) => x.p.complete);
  const started = withProgress.filter((x) => x.p.done > 0);

  const stats = [
    { icon: BookOpen, value: started.length, label: "Courses Started" },
    { icon: CheckCircle2, value: totalDone, label: "Lessons Completed" },
    { icon: Award, value: completed.length, label: "Certificates Earned" },
    { icon: Flame, value: `${LESSON_COUNT}`, label: "Lessons Available" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-emerald">{"// student.dashboard"}</p>
          <h2 className="mt-1 text-3xl font-bold text-white">Welcome back, {name} 👋</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-sm text-silver transition-colors hover:border-emerald/40 hover:text-emerald-bright"
          >
            <RotateCcw size={14} /> Reset progress
          </button>
          <button
            onClick={onSignOut}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-sm text-silver transition-colors hover:border-white/25"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/5 bg-navy-800/50 p-5 text-center">
            <s.icon className="mx-auto h-6 w-6 text-emerald-bright" strokeWidth={1.8} />
            <p className="mt-2 font-mono text-3xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Continue learning */}
      {inProgress.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-white">Continue learning</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {inProgress.map(({ course, p }) => {
              const next = course.lessons.find(
                (_l, i) => i >= p.done
              ) ?? course.lessons[0];
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}/${next.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-navy-800/50 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-glow"
                >
                  <span className="text-3xl">{course.icon}</span>
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
      )}

      {/* Certificates */}
      {completed.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-white">Certificates</h3>
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

/* ------------------------------- Catalog ------------------------------- */
function Catalog({
  courseProgress,
  signedIn,
}: {
  courseProgress: (id: string) => { done: number; total: number; pct: number; complete: boolean };
  signedIn: boolean;
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>("All");

  const filtered = COURSES.filter((c) => {
    const matchesTopic = topic === "All" || c.topic === topic;
    const matchesQuery =
      !query ||
      (c.title + " " + c.description + " " + c.topic).toLowerCase().includes(query.toLowerCase());
    return matchesTopic && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">
          Course catalog <span className="font-mono text-base text-muted">({COURSE_COUNT})</span>
        </h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses…"
            className={cn(inputCls, "w-56 pl-9")}
          />
        </div>
      </div>

      {/* Topic filter */}
      <div className="mt-5 flex flex-wrap gap-2">
        {["All", ...TOPICS].map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              topic === t
                ? "border-emerald bg-emerald/10 text-emerald-bright"
                : "border-white/10 text-muted hover:border-white/25"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const p = courseProgress(c.id);
          return (
            <Link
              key={c.id}
              href={`/courses/${c.id}`}
              className="group flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{c.icon}</span>
                <Badge tone={toneFor(c.difficulty)} mono>
                  {c.difficulty}
                </Badge>
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-xl font-bold text-white">
                {c.title}
                {p.complete && <CheckCircle2 size={16} className="text-emerald" />}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>

              <div className="mt-4 flex items-center gap-3">
                <Badge tone="navy" mono>{c.topic}</Badge>
                <span className="font-mono text-xs text-muted">{c.lessons.length} lessons</span>
              </div>

              {signedIn && p.done > 0 && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy-950">
                  <div className="h-full rounded-full bg-emerald" style={{ width: `${p.pct}%` }} />
                </div>
              )}
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-emerald/70 transition-colors group-hover:text-emerald-bright">
                {p.done > 0 ? "Continue" : "Start course"} <ArrowRight size={13} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const inputCls =
  "rounded-lg border border-white/10 bg-navy-950 px-4 py-2.5 text-sm text-silver outline-none transition-colors placeholder:text-muted/60 focus:border-emerald/50";
