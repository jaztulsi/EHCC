import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, PlayCircle, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MarkComplete } from "@/components/course/MarkComplete";
import { ALL_LESSONS, getLesson } from "@/lib/course";

export function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ lessonId: l.id }));
}

export function generateMetadata({ params }: { params: { lessonId: string } }): Metadata {
  const found = getLesson(params.lessonId);
  if (!found) return { title: "Lesson" };
  return { title: `${found.lesson.title} · Courses`, description: found.lesson.summary };
}

/** Render inline `code` spans inside a paragraph without a markdown lib. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="rounded bg-navy-950 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-bright">
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const found = getLesson(params.lessonId);
  if (!found) notFound();
  const { lesson, prev, next } = found;

  return (
    <article className="section">
      <div className="container-x max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <Link href="/courses" className="transition-colors hover:text-emerald-bright">
            Courses
          </Link>
          <span>/</span>
          <span className="text-emerald">Unit {lesson.unitNum} · {lesson.unitTitle}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">{lesson.title}</h1>
        <div className="mt-3 flex items-center gap-3">
          <Badge tone="navy" mono>
            <Clock size={12} className="mr-1 inline" /> {lesson.minutes} min
          </Badge>
          <p className="text-muted">{lesson.summary}</p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-4 leading-relaxed text-silver">
          {lesson.content.map((p, i) => (
            <p key={i}>
              <Inline text={p} />
            </p>
          ))}
        </div>

        {/* Code example */}
        {lesson.code && (
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-navy-950">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2 font-mono text-xs text-muted">
              <Terminal size={13} /> example
            </div>
            <pre className="px-4 py-4 font-mono text-sm text-silver">
              <code>{lesson.code}</code>
            </pre>
          </div>
        )}

        {/* Video source */}
        {lesson.video && (
          <a
            href={lesson.video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-4 rounded-xl border border-white/10 bg-navy-800/50 p-4 transition-all hover:border-emerald/40 hover:shadow-glow"
          >
            <PlayCircle size={32} className="shrink-0 text-emerald-bright" />
            <div className="min-w-0">
              <p className="font-mono text-xs text-emerald">{"// watch"}</p>
              <p className="truncate font-semibold text-white">{lesson.video.title}</p>
              <p className="text-sm text-muted">{lesson.video.channel}</p>
            </div>
            <ArrowRight size={18} className="ml-auto shrink-0 text-muted" />
          </a>
        )}

        {/* Practice link */}
        <div className="mt-6 rounded-xl border border-white/5 bg-navy-800/40 p-4 text-sm text-muted">
          Want to experiment? Try ideas in the{" "}
          <Link href="/learn" className="text-emerald-bright underline-offset-2 hover:underline">
            in-browser code playground
          </Link>
          .
        </div>

        {/* Complete + nav */}
        <div className="mt-10 border-t border-white/5 pt-8">
          <MarkComplete lessonId={lesson.id} />
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          {prev ? (
            <Button href={`/courses/${prev.id}`} variant="ghost" size="sm">
              <ArrowLeft size={16} /> {prev.title}
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button href={`/courses/${next.id}`} size="sm">
              {next.title} <ArrowRight size={16} />
            </Button>
          ) : (
            <Button href="/courses" size="sm">
              Back to curriculum <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
