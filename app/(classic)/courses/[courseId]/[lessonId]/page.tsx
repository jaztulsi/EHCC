import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, PlayCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Quiz } from "@/components/course/Quiz";
import { RequireProfile } from "@/components/course/RequireProfile";
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
            className="rounded bg-raised px-1.5 py-0.5 font-mono text-[0.88em] text-ink"
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
        <div className="eyebrow flex flex-wrap items-center gap-2">
          <Link href="/courses" className="transition-colors hover:text-accent">
            Courses
          </Link>
          <span>/</span>
          <Link href={`/courses/${course.id}`} className="transition-colors hover:text-accent">
            {course.title}
          </Link>
        </div>

        <h1 className="mt-4 text-4xl leading-[0.95] text-ink md:text-6xl">{lesson.title}</h1>
        <div className="mt-3 flex items-center gap-3">
          <Badge tone="navy" mono>
            <Clock size={12} className="mr-1 inline" /> {lesson.minutes} min
          </Badge>
          <p className="text-ink-2">{lesson.summary}</p>
        </div>

        <RequireProfile>
        {/* Reading */}
        <div className="mt-8">
          <div className="eyebrow mb-4 flex items-center gap-2 !text-ink">
            <BookOpen size={16} /> Read
          </div>
          <div className="surface space-y-4 p-6 text-[17px] leading-[1.7] text-ink md:p-8">
            {lesson.reading.map((p, i) => (
              <p key={i}>
                <Inline text={p} />
              </p>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="mt-10">
          <div className="eyebrow mb-4 flex items-center gap-2 !text-ink">
            <PlayCircle size={16} /> Watch
          </div>
          <div className="grid gap-3">
            {lesson.videos.map((vid, i) => (
              <a
                key={i}
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 surface p-4 card-lift"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun font-mono text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{vid.title}</p>
                  <p className="text-sm text-ink-2">{vid.channel}</p>
                </div>
                <PlayCircle size={22} className="shrink-0 text-ink-2 transition-colors group-hover:text-accent" />
              </a>
            ))}
          </div>
        </div>

        {/* Quiz */}
        <div className="mt-10">
          <Quiz courseId={course.id} lessonId={lesson.id} questions={lesson.quiz} />
        </div>
        </RequireProfile>

        {/* Prev / next */}
        <div className="mt-12 flex items-center justify-between gap-4 border-t-2 border-ink/15 pt-8">
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
