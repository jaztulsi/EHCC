import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, PlayCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Quiz } from "@/components/course/Quiz";
import { ALL_LESSON_PARAMS, getLesson } from "@/lib/courses";

export function generateStaticParams() {
  return ALL_LESSON_PARAMS;
}

export function generateMetadata({
  params,
}: {
  params: { courseId: string; lessonId: string };
}): Metadata {
  const found = getLesson(params.courseId, params.lessonId);
  if (!found) return { title: "Lesson" };
  return { title: `${found.lesson.title} · ${found.course.title}`, description: found.lesson.summary };
}

/** Inline `code` renderer. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded bg-navy-950 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-bright"
          >
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function LessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const found = getLesson(params.courseId, params.lessonId);
  if (!found) notFound();
  const { course, lesson, prev, next } = found;

  return (
    <article className="section">
      <div className="container-x max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <Link href="/courses" className="transition-colors hover:text-emerald-bright">
            Courses
          </Link>
          <span>/</span>
          <Link href={`/courses/${course.id}`} className="transition-colors hover:text-emerald-bright">
            {course.icon} {course.title}
          </Link>
        </div>

        <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">{lesson.title}</h1>
        <div className="mt-3 flex items-center gap-3">
          <Badge tone="navy" mono>
            <Clock size={12} className="mr-1 inline" /> {lesson.minutes} min
          </Badge>
          <p className="text-muted">{lesson.summary}</p>
        </div>

        {/* Reading */}
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-emerald">
            <BookOpen size={15} /> {"// read"}
          </div>
          <div className="space-y-4 leading-relaxed text-silver">
            {lesson.reading.map((p, i) => (
              <p key={i}>
                <Inline text={p} />
              </p>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="mt-10">
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-emerald">
            <PlayCircle size={15} /> {"// watch — 3 sources"}
          </div>
          <div className="grid gap-3">
            {lesson.videos.map((vid, i) => (
              <a
                key={i}
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-navy-800/50 p-4 transition-all hover:border-emerald/40 hover:shadow-glow"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald/10 font-mono text-sm font-bold text-emerald-bright">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{vid.title}</p>
                  <p className="text-sm text-muted">{vid.channel}</p>
                </div>
                <PlayCircle size={22} className="shrink-0 text-muted transition-colors group-hover:text-emerald-bright" />
              </a>
            ))}
          </div>
        </div>

        {/* Quiz */}
        <div className="mt-10">
          <Quiz courseId={course.id} lessonId={lesson.id} questions={lesson.quiz} />
        </div>

        {/* Prev / next */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/5 pt-8">
          {prev ? (
            <Button href={`/courses/${course.id}/${prev.id}`} variant="ghost" size="sm">
              <ArrowLeft size={16} /> {prev.title}
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button href={`/courses/${course.id}/${next.id}`} size="sm">
              {next.title} <ArrowRight size={16} />
            </Button>
          ) : (
            <Button href={`/courses/${course.id}`} size="sm">
              Back to course <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
