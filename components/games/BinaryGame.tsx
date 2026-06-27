"use client";

import { useEffect, useState, useCallback } from "react";
import { GameShell } from "./GameShell";
import { cn } from "@/lib/utils";

type Difficulty = "Easy" | "Medium" | "Hard";
const RANGES: Record<Difficulty, number> = { Easy: 15, Medium: 63, Hard: 255 };
const TIME_PER_ROUND: Record<Difficulty, number> = { Easy: 15, Medium: 12, Hard: 10 };
const TOTAL_ROUNDS = 8;

function randomFor(diff: Difficulty) {
  return Math.floor(Math.random() * RANGES[diff]) + 1;
}

export function BinaryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [phase, setPhase] = useState<"setup" | "play" | "done">("setup");
  const [round, setRound] = useState(0);
  const [target, setTarget] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const nextRound = useCallback(
    (diff: Difficulty) => {
      setTarget(randomFor(diff));
      setInput("");
      setTime(TIME_PER_ROUND[diff]);
      setFeedback(null);
    },
    []
  );

  function start(diff: Difficulty) {
    setDifficulty(diff);
    setScore(0);
    setRound(1);
    setPhase("play");
    nextRound(diff);
  }

  const advance = useCallback(() => {
    setRound((r) => {
      if (r >= TOTAL_ROUNDS) {
        setPhase("done");
        return r;
      }
      nextRound(difficulty);
      return r + 1;
    });
  }, [difficulty, nextRound]);

  function submit() {
    if (feedback) return;
    const correct = parseInt(input || "x", 2) === target;
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
    setTimeout(advance, 900);
  }

  // Countdown timer
  useEffect(() => {
    if (phase !== "play" || feedback) return;
    if (time <= 0) {
      setFeedback("wrong");
      setTimeout(advance, 900);
      return;
    }
    const t = setTimeout(() => setTime((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [time, phase, feedback, advance]);

  const restart = () => setPhase("setup");

  return (
    <GameShell
      title="binary-quiz"
      subtitle="convert the decimal number into binary before the timer runs out"
      onRestart={phase !== "setup" ? restart : undefined}
      shareText={phase === "done" ? `I scored ${score}/${TOTAL_ROUNDS} on EHCC Binary Quiz (${difficulty})! Try it.` : undefined}
    >
      {phase === "setup" && (
        <div className="text-center">
          <p className="mb-4 font-mono text-sm text-muted">Choose a difficulty:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(RANGES) as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => start(d)}
                className="rounded-lg border border-emerald/30 bg-emerald/5 px-5 py-3 text-sm font-medium text-emerald-bright transition-all hover:bg-emerald/15 hover:shadow-glow"
              >
                {d}
                <span className="mt-1 block font-mono text-[10px] text-muted">0–{RANGES[d]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "play" && (
        <div className="text-center">
          <div className="mb-4 flex items-center justify-between font-mono text-xs text-muted">
            <span>Round {round}/{TOTAL_ROUNDS}</span>
            <span>Score {score}</span>
            <span className={cn(time <= 3 && "text-rose-400")}>⏱ {time}s</span>
          </div>

          <p className="font-mono text-sm text-muted">Convert to binary:</p>
          <p className="my-3 font-mono text-6xl font-bold text-white">{target}</p>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/[^01]/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            disabled={!!feedback}
            autoFocus
            placeholder="e.g. 1010"
            className={cn(
              "mx-auto block w-48 rounded-lg border bg-navy-950 px-4 py-3 text-center font-mono text-2xl tracking-widest text-emerald-bright outline-none transition-colors",
              feedback === "correct" && "border-emerald",
              feedback === "wrong" && "border-rose-500",
              !feedback && "border-white/15 focus:border-emerald/50"
            )}
          />

          {feedback === "correct" && <p className="mt-3 font-mono text-sm text-emerald-bright">✓ Correct!</p>}
          {feedback === "wrong" && (
            <p className="mt-3 font-mono text-sm text-rose-400">
              ✗ {target} = {target.toString(2)}
            </p>
          )}

          {!feedback && (
            <button
              onClick={submit}
              className="btn-shimmer mt-4 rounded-md bg-emerald px-6 py-2 text-sm font-semibold text-navy-950 hover:bg-emerald-bright"
            >
              Submit
            </button>
          )}
        </div>
      )}

      {phase === "done" && (
        <div className="text-center">
          <p className="font-mono text-sm text-muted">{difficulty} complete</p>
          <p className="my-3 font-mono text-5xl font-bold text-white">
            {score}<span className="text-muted">/{TOTAL_ROUNDS}</span>
          </p>
          <p className="font-mono text-sm text-emerald-bright">
            {score === TOTAL_ROUNDS ? "Flawless! 🏆" : score >= TOTAL_ROUNDS / 2 ? "Nicely done." : "Keep practicing!"}
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
