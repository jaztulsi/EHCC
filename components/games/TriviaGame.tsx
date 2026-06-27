"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, BrainCircuit } from "lucide-react";
import { GameShell } from "./GameShell";
import { TRIVIA } from "@/lib/data";
import { cn } from "@/lib/utils";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function TriviaGame() {
  // Shuffle a fresh subset of questions per mount/restart.
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => shuffle(TRIVIA).slice(0, 8), [seed]);

  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[round];
  const total = questions.length;

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
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
    setSeed((s) => s + 1);
    setRound(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  const pct = Math.round((score / total) * 100);

  return (
    <GameShell
      title="cs-trivia"
      subtitle="test your computer-science knowledge — 8 questions"
      onRestart={restart}
      shareText={done ? `I scored ${score}/${total} (${pct}%) on EHCC CS Trivia! Your turn.` : undefined}
    >
      {!done ? (
        <div>
          <div className="mb-3 flex items-center justify-between font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <BrainCircuit size={13} className="text-emerald" /> Q{round + 1}/{total}
            </span>
            <span className="rounded-full bg-emerald/10 px-2 py-0.5 text-emerald-bright">{q.category}</span>
          </div>

          {/* Progress bar */}
          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-navy-800">
            <motion.div
              className="h-full bg-emerald"
              initial={false}
              animate={{ width: `${((round + (selected !== null ? 1 : 0)) / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <h3 className="text-lg font-semibold text-white">{q.question}</h3>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, i) => {
              const isAnswer = i === q.answer;
              const isPicked = i === selected;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all",
                    selected === null && "border-white/10 hover:border-emerald/40 hover:bg-emerald/5",
                    selected !== null && isAnswer && "border-emerald bg-emerald/10 text-emerald-bright",
                    selected !== null && isPicked && !isAnswer && "border-rose-500 bg-rose-500/10 text-rose-300",
                    selected !== null && !isAnswer && !isPicked && "border-white/5 opacity-50"
                  )}
                >
                  <span>{opt}</span>
                  {selected !== null && isAnswer && <Check size={16} className="shrink-0 text-emerald" />}
                  {selected !== null && isPicked && !isAnswer && <X size={16} className="shrink-0 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <button
              onClick={next}
              className="btn-shimmer mt-4 rounded-md bg-emerald px-5 py-2 text-sm font-semibold text-navy-950 hover:bg-emerald-bright"
            >
              {round + 1 >= total ? "Reveal score" : "Next question →"}
            </button>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p className="font-mono text-sm text-muted">trivia complete</p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="my-3 font-mono text-6xl font-bold text-gradient"
          >
            {pct}%
          </motion.p>
          <p className="font-mono text-sm text-white">
            {score}/{total} correct
          </p>
          <p className="mt-2 font-mono text-sm text-emerald-bright">
            {pct === 100 ? "Perfect score! 🧠" : pct >= 60 ? "Sharp mind." : "Brush up and retry!"}
          </p>
          <button
            onClick={restart}
            className="btn-shimmer mt-5 rounded-md bg-emerald px-6 py-2 text-sm font-semibold text-navy-950 hover:bg-emerald-bright"
          >
            Play again
          </button>
        </div>
      )}
    </GameShell>
  );
}
