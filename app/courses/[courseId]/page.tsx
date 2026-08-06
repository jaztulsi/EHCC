import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { Badge, toneFor } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { CourseLessons } from "@/components/course/CourseLessons";
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
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-emerald-bright"
        >
          <ArrowLeft size={13} /> All courses
        </Link>

        <div className="mt-5 flex items-start gap-5">
          <span className="inline-flex shrink-0 rounded-2xl bg-emerald/10 p-4 text-emerald-bright shadow-glow">
            <Icon name={course.icon} className="h-10 w-10" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={toneFor(course.difficulty)} mono>{course.difficulty}</Badge>
              <Badge tone="navy" mono>{course.topic}</Badge>
              <span className="font-mono text-xs text-muted">
                {course.lessons.length} lessons · ~{totalMin} min
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">{course.title}</h1>
            <p className="mt-1 text-emerald-bright">{course.tagline}</p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-silver">{course.description}</p>

        <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/5 bg-navy-800/40 px-4 py-3 text-sm text-muted">
          <PlayCircle size={16} className="text-emerald-bright" />
          Every lesson: reading, three curated videos, and a quiz you must pass to complete it.
        </div>

        <div className="mt-10">
          <CourseLessons courseId={course.id} lessons={course.lessons} />
        </div>
      </div>
    </section>
  );
}
