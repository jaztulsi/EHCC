"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Badge, toneFor } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COURSES, COURSE_COUNT, LESSON_COUNT } from "@/lib/courses";
import { useProfile } from "./useProfile";
import { SignUpCard } from "./SignUpCard";
import { Dashboard } from "./Dashboard";

const STEPS = [
  {
    title: "Read, then watch",
    text: "Every lesson opens with a short write-up, then three videos picked to go with it.",
  },
  {
    title: "Pass the quiz",
    text: "Three questions close each lesson. Get all of them right and the lesson is marked complete.",
  },
  {
    title: "Earn certificates",
    text: "Finish every lesson in a course and its certificate shows up on your dashboard.",
  },
];

/** The cutting mat: a faint grid printed on the deep green. */
const MAT_GRID: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(var(--mat-line) 1px, transparent 1px), linear-gradient(90deg, var(--mat-line) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
  backgroundPosition: "-1px -1px",
};

/** Inline `code` for the preview. */
function inline(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="font-mono text-[0.92em] text-ink">
        {part}
      </code>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/** A real lesson from the catalog, drawn as it looks mid-way through. */
function LessonPreview() {
  const course = COURSES[0];
  const lesson = course.lessons[0];
  const question = lesson.quiz[0];

  return (
    <div className="band-dark rounded-panel border-[2.5px] border-ink shadow-hard-md p-4 sm:p-8 lg:p-10" style={MAT_GRID}>
      <div
        role="img"
        aria-label={`Preview of the lesson ${lesson.title} from ${course.title}: a reading, three videos and a quiz`}
        className="overflow-hidden surface text-left shadow-hard-lg"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
          <span className="meta truncate">
            {course.title} · Lesson 1 of {course.lessons.length}
          </span>
          <span className="meta shrink-0">{lesson.minutes} min</span>
        </div>

        <div className="p-5">
          <p className="text-xl font-medium tracking-title text-ink">{lesson.title}</p>
          <p className="mt-1 text-sm text-ink-2">{lesson.summary}</p>

          <ol className="mt-4 grid grid-cols-3 gap-2 text-[13px]">
            <li className="flex h-8 items-center gap-2 rounded-[10px] bg-raised px-3 text-ink-2">
              <Check size={16} strokeWidth={1.5} className="shrink-0 text-positive" aria-hidden /> Read
            </li>
            <li className="flex h-8 items-center gap-2 rounded-[10px] bg-raised px-3 text-ink-2">
              <Check size={16} strokeWidth={1.5} className="shrink-0 text-positive" aria-hidden /> 3 videos
            </li>
            <li className="flex h-8 items-center gap-2 rounded-[10px] border border-ink/20 px-3 font-medium text-ink">
              <span className="font-mono text-xs text-ink-3">3</span> Quiz
            </li>
          </ol>

          <pre className="code-block mt-4">
            <span className="text-[#8b8478]">&gt;&gt;&gt;</span> {'"2" + "2"'}
            {"\n"}
            {"'22'"}
            {"\n"}
            <span className="text-[#8b8478]">&gt;&gt;&gt;</span> 2 + 2
            {"\n"}4
          </pre>

          <div className="mt-5 hidden sm:block">
            <p className="text-sm font-medium text-ink">
              <span className="meta mr-2">1</span>
              {inline(question.q)}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {question.options.map((opt, i) => {
                const chosen = i === question.answer;
                return (
                  <div
                    key={opt}
                    className={
                      chosen
                        ? "flex h-10 items-center gap-3 rounded-[10px] border border-accent bg-accent/5 px-3 text-sm text-ink"
                        : "flex h-10 items-center gap-3 rounded-[10px] border border-line px-3 text-sm text-ink-2"
                    }
                  >
                    <span
                      className={
                        chosen
                          ? "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent"
                          : "h-4 w-4 shrink-0 rounded-full border border-ink/25"
                      }
                    >
                      {chosen && <span className="h-2 w-2 rounded-full bg-accent" />}
                    </span>
                    {inline(opt)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-line px-5 py-3">
          <span className="meta shrink-0">Course</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
            <div className="h-full w-1/2 rounded-full bg-accent" />
          </div>
          <span className="meta shrink-0">1 of {course.lessons.length}</span>
        </div>
      </div>
    </div>
  );
}

export function CoursesHome() {
  const { profile, loaded } = useProfile();

  if (loaded && profile) {
    // Signed in: the dashboard is the home tab.
    return <Dashboard />;
  }

  const starters = COURSES.slice(0, 6);
  const facts = [
    { value: COURSE_COUNT, label: "Courses" },
    { value: LESSON_COUNT, label: "Lessons" },
    { value: 3, label: "Videos per lesson" },
  ];

  return (
    <div className="space-y-20 md:space-y-28">
      {/* Hero */}
      <section className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="eyebrow">EHIC Courses</p>
          <h1 className="page-title max-w-xl">Learn to build, one lesson at a time</h1>
          <p className="page-lede max-w-xl">
            {COURSE_COUNT} short courses written by club members, from your first Python variable to putting a
            site online. Each lesson is a reading, three videos and a quiz. Free, and your progress stays in this
            browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#signup" size="lg">
              Create a free profile <ArrowRight strokeWidth={1.5} aria-hidden />
            </Button>
            <Button href="/courses/curriculum" variant="outline" size="lg">
              Browse the curriculum
            </Button>
          </div>
          <dl className="mt-12 flex gap-10 border-t border-line pt-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[13px] text-ink-2">{f.label}</dt>
                <dd className="mt-1 text-[28px] font-medium leading-none tracking-title tabular-nums text-ink">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <LessonPreview />
      </section>

      {/* How a course works */}
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 max-w-sm text-[28px] font-medium leading-[1.15] tracking-title text-ink md:text-[32px]">
            Read it, watch it, then show you know it
          </h2>
        </div>
        <ol className="border-b border-line">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-line py-6 sm:grid-cols-[40px_minmax(0,200px)_minmax(0,1fr)] sm:gap-x-6"
            >
              <span className="meta pt-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[17px] font-medium leading-6 text-ink">{s.title}</h3>
              <p className="col-start-2 text-[15px] leading-6 text-ink-2 sm:col-start-3">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* First courses */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 className="mt-4 text-[28px] font-medium leading-[1.15] tracking-title text-ink md:text-[32px]">
              The foundations
            </h2>
          </div>
          <Link
            href="/courses/curriculum"
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-ink-2 transition-colors hover:text-ink"
          >
            All {COURSE_COUNT} courses <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-line overflow-hidden surface">
          {starters.map((c) => (
            <li key={c.id}>
              <Link
                href={`/courses/${c.id}`}
                className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-raised/50 sm:px-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-raised text-ink-2">
                  <Icon name={c.icon} className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-medium text-ink">{c.title}</span>
                  <span className="mt-0.5 block truncate text-sm text-ink-2">{c.description}</span>
                </span>
                <span className="meta hidden w-28 shrink-0 md:block">{c.topic}</span>
                <span className="meta hidden w-20 shrink-0 md:block">
                  {c.lessons.length} {c.lessons.length === 1 ? "lesson" : "lessons"}
                </span>
                <span className="hidden w-32 shrink-0 sm:block">
                  <Badge tone={toneFor(c.difficulty)}>{c.difficulty}</Badge>
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-ink-3 transition-colors group-hover:text-ink"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Sign up */}
      <section id="signup" className="scroll-mt-32">
        <SignUpCard />
      </section>
    </div>
  );
}
