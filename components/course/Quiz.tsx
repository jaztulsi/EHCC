"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/courses";
import { useProgress } from "./useProgress";

/** Inline `code` renderer (no markdown lib). */
function inline(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-navy-950 px-1 py-0.5 font-mono text-[0.85em] text-emerald-bright">
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
    if (questions.every((q, i) => answers[i] === q.answer)) complete(courseId, lessonId);
  }
  function retry() {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="rounded-2xl border border-emerald/20 bg-navy-800/50 p-6 md:p-8">
      <div className="flex items-center gap-2">
        <Trophy size={18} className="text-emerald-bright" />
        <h3 className="text-xl font-bold text-white">Quiz</h3>
        {already && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald/15 px-3 py-1 text-xs font-semibold text-emerald-bright">
            <CheckCircle2 size={13} /> Completed
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">Answer all questions correctly to complete this lesson.</p>

      <div className="mt-6 space-y-6">
        {questions.map((question, qi) => (
          <div key={qi}>
            <p className="font-medium text-silver">
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
                      "flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-default",
                      !submitted && chosen && "border-emerald bg-emerald/10 text-emerald-bright",
                      !submitted && !chosen && "border-white/10 text-silver hover:border-emerald/40",
                      showState && isCorrect && "border-emerald bg-emerald/15 text-emerald-bright",
                      submitted && chosen && !isCorrect && "border-red-500/50 bg-red-500/10 text-red-300",
                      submitted && !chosen && !isCorrect && "border-white/10 text-muted"
                    )}
                  >
                    <span className="flex-1">{inline(opt)}</span>
                    {showState && isCorrect && <CheckCircle2 size={16} className="shrink-0 text-emerald" />}
                    {submitted && chosen && !isCorrect && <XCircle size={16} className="shrink-0 text-red-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Result / actions */}
      <div className="mt-6 border-t border-white/5 pt-6">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={!allAnswered}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-emerald-bright disabled:opacity-50"
          >
            Submit quiz
          </button>
        ) : passed ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-emerald/15 px-5 py-3 font-semibold text-emerald-bright">
              <CheckCircle2 size={18} /> Passed {correct}/{questions.length} — lesson complete!
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-5 py-3 font-semibold text-red-300">
              <XCircle size={18} /> {correct}/{questions.length} correct — review and try again
            </span>
            <button
              onClick={retry}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-4 py-2 text-sm text-silver transition-colors hover:border-emerald/40 hover:text-emerald-bright"
            >
              <RotateCcw size={14} /> Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
