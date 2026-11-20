"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/courses";
import { play } from "@/lib/sound";
import { useProgress } from "./useProgress";

/** Inline `code` renderer (no markdown lib). */
function inline(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-raised px-1 py-0.5 font-mono text-[0.88em] text-ink">
        {part}
      </code>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function Quiz({
  courseId,
  lessonId,
  questions,
}: {
  courseId: string;
  lessonId: string;
  questions: QuizQuestion[];
}) {
  const { isDone, complete, loaded } = useProgress();
  const already = loaded && isDone(courseId, lessonId);

  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const correct = questions.filter((q, i) => answers[i] === q.answer).length;
  const passed = correct === questions.length;
  const allAnswered = answers.every((a) => a !== null);

  function submit() {
    setSubmitted(true);
    const ok = questions.every((q, i) => answers[i] === q.answer);
    play(ok ? "success" : "error");
    if (ok) complete(courseId, lessonId);
  }
  function retry() {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="surface p-6 md:p-8">
      <div className="flex items-center gap-2">
        <Trophy size={20} className="text-ink" />
        <h3 className="text-xl font-bold text-ink">Quiz</h3>
        {already && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink">
            <CheckCircle2 size={13} /> Completed
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-ink-2">Get every question right to complete this lesson</p>

      <div className="mt-6 space-y-6">
        {questions.map((question, qi) => (
          <div key={qi}>
            <p className="font-medium text-ink">
              {qi + 1}. {inline(question.q)}
            </p>
            <div className="mt-3 grid gap-2">
              {question.options.map((opt, oi) => {
                const chosen = answers[qi] === oi;
                const isCorrect = oi === question.answer;
                const showState = submitted && (chosen || isCorrect);
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                    className={cn(
                      "opt flex items-center gap-3 rounded-[10px] px-4 py-3 text-left text-[15px] disabled:cursor-default",
                      !submitted && chosen && "!bg-mint",
                      showState && isCorrect && "!bg-mint",
                      submitted && chosen && !isCorrect && "!bg-blush",
                      submitted && !chosen && !isCorrect && "text-ink-2 opacity-55 !shadow-none"
                    )}
                  >
                    <span className="flex-1">{inline(opt)}</span>
                    {showState && isCorrect && <CheckCircle2 size={18} className="shrink-0 text-accent" />}
                    {submitted && chosen && !isCorrect && <XCircle size={18} className="shrink-0 text-negative" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Result / actions */}
      <div className="mt-6 border-t border-line pt-6">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={!allAnswered}
            data-sfx="none"
            className="btn btn-primary"
          >
            Submit quiz
          </button>
        ) : passed ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-[10px] border-[2.5px] border-ink bg-mint px-5 py-3 font-display font-bold text-ink shadow-hard">
              <CheckCircle2 size={18} /> Passed {correct} of {questions.length} · lesson complete
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-[10px] border-[2.5px] border-ink bg-blush px-5 py-3 font-display font-bold text-ink shadow-hard">
              <XCircle size={18} /> {correct} of {questions.length} right · review and try again
            </span>
            <button
              onClick={retry}
              className="btn btn-secondary btn-sm"
            >
              <RotateCcw size={14} /> Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
