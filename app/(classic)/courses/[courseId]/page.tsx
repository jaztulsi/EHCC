import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { Badge, toneFor } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { CourseLessons } from "@/components/course/CourseLessons";
import { RequireProfile } from "@/components/course/RequireProfile";
import { COURSES, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return COURSES.map((c) => ({ courseId: c.id }));
}

export function generateMetadata({ params }: { params: { courseId: string } }): Metadata {
  const c = getCourse(params.courseId);
  if (!c) return { title: "Course" };
  return { title: `${c.title} · Courses`, description: c.description };
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = getCourse(params.courseId);
  if (!course) notFound();

  const totalMin = course.lessons.reduce((n, l) => n + l.minutes, 0);

  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <Link
          href="/courses"
          className="eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-ink"
        >
          <ArrowLeft size={13} /> All courses
        </Link>

        <div className="mt-5 flex items-start gap-5">
          <span className="inline-flex shrink-0 rounded-2xl border-[2.5px] border-ink bg-mint p-4 text-ink shadow-hard">
            <Icon name={course.icon} className="h-10 w-10" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={toneFor(course.difficulty)} mono>{course.difficulty}</Badge>
              <Badge tone="navy" mono>{course.topic}</Badge>
              <span className="font-mono text-xs text-ink-2">
                {course.lessons.length} lessons · ~{totalMin} min
              </span>
            </div>
            <h1 className="mt-3 text-4xl leading-[0.95] text-ink md:text-6xl">{course.title}</h1>
            <p className="mt-2 text-lg text-ink-2">{course.tagline}</p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-ink">{course.description}</p>

        <div className="mt-6 flex items-center gap-2 surface px-4 py-3 text-sm text-ink-2">
          <PlayCircle size={18} className="shrink-0 text-ink" />
          Every lesson is a reading, three videos and a quiz you pass to complete it
        </div>

        <div className="mt-10">
          <RequireProfile>
            <CourseLessons courseId={course.id} lessons={course.lessons} />
          </RequireProfile>
        </div>
      </div>
    </section>
  );
}
