"use client";

import { useState } from "react";
import { Bug, Check, X } from "lucide-react";
import { GameShell } from "./GameShell";
import { DEBUG_CHALLENGES } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DebugGame() {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const challenge = DEBUG_CHALLENGES[round];
  const total = DEBUG_CHALLENGES.length;

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === challenge.answer) setScore((s) => s + 1);
  }

  function next() {
    if (round + 1 >= total) {
      setDone(true);
      return;
    }
    setRound((r) => r + 1);
    setSelected(null);
  }

  function restart() {
    setRound(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  return (
    <GameShell
      title="debug-the-code"
      subtitle="find the bug in each snippet, 10 rounds"
      onRestart={restart}
      shareText={done ? `I caught ${score}/${total} bugs in EHIC Debug the Code! Think you can do better?` : undefined}
    >
      {!done ? (
        <div>
          <div className="mb-3 flex items-center justify-between font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Bug size={13} className="text-emerald" /> Round {round + 1}/{total}
            </span>
            <span>Score {score}</span>
          </div>

          <p className="text-sm text-silver">{challenge.prompt}</p>

          <pre className="mt-3 overflow-x-auto rounded-card border border-bark-line bg-bark p-4 font-mono text-sm leading-relaxed text-emerald-circuit">
            <code>{challenge.code}</code>
          </pre>

          <div className="mt-4 space-y-2">
            {challenge.options.map((opt, i) => {
              const isAnswer = i === challenge.answer;
              const isPicked = i === selected;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-all",
                    selected === null && "border-line hover:border-emerald/40 hover:bg-emerald/5",
                    selected !== null && isAnswer && "border-emerald bg-emerald/10 text-emerald-bright",
                    selected !== null && isPicked && !isAnswer && "border-rose-300 bg-rose-50 text-rose-700",
                    selected !== null && !isAnswer && !isPicked && "border-line opacity-50"
                  )}
                >
                  <span className="font-mono">{opt}</span>
                  {selected !== null && isAnswer && <Check size={16} className="shrink-0 text-emerald" />}
                  {selected !== null && isPicked && !isAnswer && <X size={16} className="shrink-0 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="mt-4 rounded-lg border border-emerald/20 bg-navy-800 p-3">
              <p className="text-sm text-silver">
                <span className="font-semibold text-emerald-bright">Explanation: </span>
                {challenge.explanation}
              </p>
              <button
                onClick={next}
                className="mt-3 rounded-md bg-emerald px-5 py-1.5 text-sm font-semibold text-white hover:bg-emerald-bright"
              >
                {round + 1 >= total ? "See results" : "Next bug →"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p className="font-mono text-sm text-muted">debugging complete</p>
          <p className="my-3 font-mono text-5xl font-bold text-silver">
            {score}<span className="text-muted">/{total}</span>
          </p>
          <p className="font-mono text-sm text-emerald-bright">
            {score === total ? "Bug-free legend! 🐛✨" : score >= total / 2 ? "Solid debugging." : "More reps needed!"}
          </p>
          <button
            onClick={restart}
            className="mt-5 rounded-md bg-emerald px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-bright"
          >
            Play again
          </button>
        </div>
      )}
    </GameShell>
  );
}
