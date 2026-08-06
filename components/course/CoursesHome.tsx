"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, PlayCircle, Trophy, Sparkles } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Badge, toneFor } from "@/components/ui/Badge";
import { COURSES, COURSE_COUNT, LESSON_COUNT } from "@/lib/courses";
import { useProfile } from "./useProfile";
import { SignUpCard } from "./SignUpCard";
import { Dashboard } from "./Dashboard";

const FEATURES = [
  { icon: BookOpen, title: "Read, then do", text: "Every lesson pairs a clear write-up with three curated videos so it clicks." },
  { icon: PlayCircle, title: "Learn by quiz", text: "Pass a short quiz to complete each lesson — no passive watching." },
  { icon: Trophy, title: "Earn certificates", text: "Finish every lesson in a course to earn a certificate on your dashboard." },
];

export function CoursesHome() {
  const { profile, loaded } = useProfile();

  if (loaded && profile) {
    // Signed in → show the dashboard right on the home tab.
    return <Dashboard />;
  }

  const featured = COURSES.slice(0, 6);

  return (
    <div className="space-y-14">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-800/50 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald-bright">
            <Sparkles size={12} /> EHCC Academy
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Learn to <span className="text-gradient">build</span>, one lesson at a time.
          </h1>
          <p className="mt-4 text-lg text-muted">
            {COURSE_COUNT} student-built courses across Python, the web, data, AI, and more — reading,
            videos, and quizzes, with a dashboard that tracks everything. Free forever.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#signup"
              className="btn-shimmer inline-flex items-center gap-2 rounded-lg bg-emerald px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-emerald-bright"
            >
              Create free profile <ArrowRight size={17} />
            </a>
            <Link
              href="/courses/curriculum"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald/40 px-6 py-3 font-semibold text-emerald-bright transition-colors hover:bg-emerald/10"
            >
              Browse curriculum
            </Link>
          </div>
          <div className="mt-8 flex gap-8">
            <div>
              <p className="font-mono text-3xl font-bold text-emerald-bright">{COURSE_COUNT}</p>
              <p className="text-sm text-muted">Courses</p>
            </div>
            <div>
              <p className="font-mono text-3xl font-bold text-emerald-bright">{LESSON_COUNT}</p>
              <p className="text-sm text-muted">Lessons</p>
            </div>
            <div>
              <p className="font-mono text-3xl font-bold text-emerald-bright">3</p>
              <p className="text-sm text-muted">Videos / lesson</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid gap-5 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-xl border border-white/5 bg-navy-800/50 p-6">
            <span className="inline-flex rounded-lg bg-emerald/10 p-3 text-emerald-bright">
              <f.icon className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
          </div>
        ))}
      </div>

      {/* Featured courses */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Popular courses</h2>
          <Link
            href="/courses/curriculum"
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-bright hover:underline"
          >
            View all {COURSE_COUNT} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.id}`}
              className="group flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex rounded-xl bg-emerald/10 p-3 text-emerald-bright">
                  <Icon name={c.icon} className="h-7 w-7" />
                </span>
                <Badge tone={toneFor(c.difficulty)} mono>{c.difficulty}</Badge>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">{c.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-emerald/70 transition-colors group-hover:text-emerald-bright">
                View course <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Sign up */}
      <div id="signup" className="scroll-mt-24">
        <SignUpCard />
      </div>
    </div>
  );
}
