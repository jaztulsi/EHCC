import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { CoursePlatform } from "@/components/course/CoursePlatform";
import { COURSE_COUNT, LESSON_COUNT } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "The EHCC learning platform — 20 student-built courses with reading, videos, and quizzes. Sign up to track progress, resume lessons, and earn certificates.",
};

const STATS = [
  { value: String(COURSE_COUNT), label: "Courses" },
  { value: String(LESSON_COUNT), label: "Lessons" },
  { value: "3", label: "Videos / Lesson" },
  { value: "Free", label: "Always" },
];

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="ehcc academy"
        title={
          <>
            Learn to <span className="text-gradient">build</span>.
          </>
        }
        subtitle="20 courses across Python, the web, data, AI, and more — each lesson pairs reading with three videos and a quiz you have to pass. Track everything from your student dashboard."
      />

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/5 bg-navy-800/50 p-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono text-3xl font-bold text-emerald-bright">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <CoursePlatform />
        </div>
      </section>
    </>
  );
}
