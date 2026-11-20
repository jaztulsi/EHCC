"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Check, X } from "lucide-react";
import { GameShell, GameStatus, Scoreboard, useShake } from "./GameShell";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";

type Difficulty = "Easy" | "Medium" | "Hard";
const LEVELS: Difficulty[] = ["Easy", "Medium", "Hard"];
const RANGES: Record<Difficulty, number> = { Easy: 15, Medium: 63, Hard: 255 };
const BITS: Record<Difficulty, number> = { Easy: 4, Medium: 6, Hard: 8 }; // enough switches for the largest number
const TIME_PER_ROUND: Record<Difficulty, number> = { Easy: 15, Medium: 12, Hard: 10 };
const TOTAL_ROUNDS = 8;
const PAUSE = 900; // ms the answer stays up before the next round

type Round = { n: number; given: string; ok: boolean; spent: number; timedOut: boolean };

function randomFor(diff: Difficulty) {
  return Math.floor(Math.random() * RANGES[diff]) + 1;
}

const zeros = (n: number) => "0".repeat(n);

export function BinaryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [phase, setPhase] = useState<"setup" | "play" | "done">("setup");
  const [round, setRound] = useState(0);
  const [target, setTarget] = useState(0);
  const [bits, setBits] = useState(zeros(4));
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [log, setLog] = useState<Round[]>([]);

  const roundRef = useRef(0);
  const locked = useRef(false);
  const startedAt = useRef(0);
  const pending = useRef<ReturnType<typeof setTimeout>>();
  const shake = useShake();
  const live = useRef({ bits, target });
  live.current = { bits, target };
  const drain = useAnimationControls();

  useEffect(() => () => clearTimeout(pending.current), []);

  const nextRound = useCallback((diff: Difficulty) => {
    setTarget(randomFor(diff));
    setBits(zeros(BITS[diff]));
    setTime(TIME_PER_ROUND[diff]);
    setFeedback(null);
    locked.current = false;
    startedAt.current = Date.now();
  }, []);

  function start(diff: Difficulty) {
    clearTimeout(pending.current);
    setDifficulty(diff);
    setScore(0);
    setLog([]);
    roundRef.current = 1;
    setRound(1);
    setPhase("play");
    nextRound(diff);
  }

  const advance = useCallback(() => {
    if (roundRef.current >= TOTAL_ROUNDS) {
      setPhase("done");
      return;
    }
    roundRef.current += 1;
    setRound(roundRef.current);
    nextRound(difficulty);
  }, [difficulty, nextRound]);

  const submit = useCallback(() => {
    if (locked.current || phase !== "play") return;
    locked.current = true;
    const correct = parseInt(bits, 2) === target;
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
    setLog((l) => [...l, { n: target, given: bits, ok: correct, spent: (Date.now() - startedAt.current) / 1000, timedOut: false }]);
    play(correct ? "success" : "error");
    pending.current = setTimeout(advance, PAUSE);
  }, [bits, target, phase, advance]);

  // countdown
  useEffect(() => {
    if (phase !== "play" || feedback) return;
    if (time <= 0) {
      locked.current = true;
      setFeedback("timeout");
      const { bits: given, target: n } = live.current;
      setLog((l) => [...l, { n, given, ok: false, spent: TIME_PER_ROUND[difficulty], timedOut: true }]);
      play("error");
      pending.current = setTimeout(advance, PAUSE);
      return;
    }
    const t = setTimeout(() => setTime((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [time, phase, feedback, advance, difficulty]);

  // the timer bar drains smoothly over the round and stops where it is when the answer is in
  useEffect(() => {
    if (phase !== "play") return;
    if (feedback) {
      drain.stop();
      return;
    }
    drain.set({ scaleX: 1 });
    void drain.start({ scaleX: 0, transition: { duration: TIME_PER_ROUND[difficulty], ease: "linear" } });
  }, [round, phase, feedback, difficulty, drain]);

  useEffect(() => {
    if (phase === "done") play("stamp");
  }, [phase]);

  function toggle(i: number) {
    if (feedback) return;
    setBits((b) => b.slice(0, i) + (b[i] === "1" ? "0" : "1") + b.slice(i + 1));
  }

  // typing works too: 0 and 1 shift in from the right, Backspace shifts back out, Enter checks
  useEffect(() => {
    if (phase !== "play" || feedback) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const onButton = !!(e.target as HTMLElement | null)?.closest("button, a[href]");
      if (e.key === "0" || e.key === "1") {
        e.preventDefault();
        setBits((b) => (b + e.key).slice(1));
      } else if (e.key === "Backspace") {
        e.preventDefault();
        setBits((b) => ("0" + b).slice(0, -1));
      } else if (e.key === "Enter" && !onButton && !e.repeat) {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, feedback, submit]);

  const restart = () => {
    clearTimeout(pending.current);
    setPhase("setup");
  };

  const width = BITS[difficulty];
  const answer = target.toString(2);
  const low = time <= 3 && phase === "play" && !feedback;
  const avg = log.length ? log.reduce((a, r) => a + r.spent, 0) / log.length : 0;
  const next = LEVELS[LEVELS.indexOf(difficulty) + 1];

  return (
    <GameShell
      title="Binary Quiz"
      subtitle="Turn each decimal number into binary before the timer runs out"
      onRestart={phase !== "setup" ? restart : undefined}
      shareText={phase === "done" ? `I scored ${score}/${TOTAL_ROUNDS} on EHIC Binary Quiz (${difficulty})` : undefined}
    >
      {phase === "setup" && (
        <div>
          <p className="text-sm text-ink-2">Pick a level. Every game is {TOTAL_ROUNDS} rounds</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {LEVELS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => start(d)}
                data-sfx="pop"
                className="rounded-card border border-line bg-surface p-4 text-left shadow-[var(--shadow-sm)] transition-[background-color,border-color] duration-150 hover:border-[color:var(--line-strong)] hover:bg-raised"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-medium text-ink">{d}</span>
                  <span className="flex gap-0.5" aria-hidden>
                    {Array.from({ length: BITS[d] }, (_, i) => (
                      <span key={i} className="h-3 w-2 rounded-[2px] border border-[color:var(--line-strong)]" />
                    ))}
                  </span>
                </span>
                <span className="mt-4 block font-mono text-[13px] tabular-nums text-ink-2">
                  1 to {RANGES[d]} · {BITS[d]} bits
                </span>
                <span className="mt-1 block text-[13px] text-ink-3">{TIME_PER_ROUND[d]} seconds a round</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "play" && (
        <div>
          <GameStatus
            items={[
              { label: "Round", value: `${round}/${TOTAL_ROUNDS}` },
              { label: "Score", value: score },
              { label: "Level", value: difficulty },
              { label: "Time", value: `${Math.max(time, 0)} s`, tone: low ? "negative" : undefined },
            ]}
          />
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-raised" aria-hidden>
            <motion.div
              animate={drain}
              initial={{ scaleX: 1 }}
              className={cn("h-full origin-left transition-colors duration-150", low ? "bg-negative" : "bg-accent")}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-ink-2">Convert to binary</p>
            <p className="mt-2 font-mono text-[64px] font-medium leading-none tabular-nums text-ink sm:text-[80px]">{target}</p>
          </div>

          <motion.div
            key={round}
            {...shake(feedback === "wrong" || feedback === "timeout")}
            role="group"
            aria-label="Your answer in binary, one switch per bit"
            className="mt-8 flex justify-center gap-1.5 sm:gap-2"
          >
            {[...bits].map((b, i) => {
              const on = b === "1";
              const place = 2 ** (width - 1 - i);
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    data-bit
                    data-sfx={on ? "off" : "on"}
                    aria-pressed={on}
                    aria-label={`Bit worth ${place}`}
                    disabled={!!feedback}
                    onClick={() => toggle(i)}
                    className={cn(
                      "relative grid h-14 w-9 place-items-center rounded-[10px] border font-mono text-[22px] tabular-nums transition-[transform,box-shadow,background-color,border-color,color] duration-100 disabled:cursor-default sm:h-16 sm:w-12 sm:text-[26px]",
                      on
                        ? "translate-y-[3px] bg-raised text-ink shadow-none"
                        : "bg-surface text-ink-3 shadow-[0_3px_0_var(--line-strong)] hover:bg-raised",
                      !feedback && "border-[color:var(--line-strong)]",
                      feedback === "correct" && "border-positive/70 text-positive",
                      feedback && feedback !== "correct" && "border-negative/60"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full transition-colors duration-100",
                        on ? "bg-accent" : "bg-ink/15"
                      )}
                    />
                    {b}
                  </button>
                  <span className="font-mono text-[11px] tabular-nums text-ink-3" aria-hidden>
                    {place}
                  </span>
                </div>
              );
            })}
          </motion.div>

          <div className="mt-6 flex min-h-[72px] flex-col items-center justify-start gap-3 text-center" aria-live="polite">
            {!feedback ? (
              <>
                <button type="button" onClick={submit} data-sfx="none" className="btn btn-primary">
                  Check
                </button>
                <p className="hidden items-center gap-1.5 text-[13px] text-ink-3 sm:flex">
                  Type <span className="kbd">0</span> <span className="kbd">1</span> or flip the switches, then <span className="kbd">Enter</span>
                </p>
              </>
            ) : (
              <p className={cn("pt-2 text-[15px] font-medium", feedback === "correct" ? "text-positive" : "text-negative")}>
                {feedback === "correct" ? "Correct" : feedback === "timeout" ? "Time’s up" : "Not quite"}
                <span className="font-normal text-ink-2">
                  {" "}
                  · {target} is <span className="font-mono tabular-nums text-ink">{answer}</span>
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div>
          <Scoreboard
            label={`${difficulty} · numbers 1 to ${RANGES[difficulty]}`}
            items={[
              { label: "Correct", value: `${score}/${TOTAL_ROUNDS}` },
              { label: "Level", value: difficulty },
              { label: "Average", value: `${avg.toFixed(1)} s` },
            ]}
            note={
              score === TOTAL_ROUNDS
                ? next
                  ? `All ${TOTAL_ROUNDS} correct on ${difficulty}. ${next} goes up to ${RANGES[next]}`
                  : `All ${TOTAL_ROUNDS} correct on Hard, every number up to 255`
                : `${score} of ${TOTAL_ROUNDS} correct on ${difficulty}`
            }
          />

          <h3 className="mt-6 text-sm font-medium text-ink">Rounds</h3>
          <ol className="mt-2 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
            {log.map((r, i) => (
              <li key={i} className="flex h-10 items-center gap-3 border-b border-line font-mono text-[13px] tabular-nums">
                <span className="w-5 text-ink-3">{i + 1}</span>
                <span className="w-9 text-right text-ink">{r.n}</span>
                <span className="text-ink-2">{r.n.toString(2).padStart(width, "0")}</span>
                <span className="ml-auto flex items-center gap-1.5 font-sans text-[12px] text-ink-3">
                  {!r.ok && (r.timedOut ? "time" : <span className="font-mono line-through">{r.given}</span>)}
                  {r.ok ? (
                    <Check size={16} strokeWidth={1.5} className="text-positive" aria-label="Correct" />
                  ) : (
                    <X size={16} strokeWidth={1.5} className="text-negative" aria-label="Wrong" />
                  )}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => start(difficulty)} data-sfx="pop" className="btn btn-primary">
              Play {difficulty} again
            </button>
            <button type="button" onClick={restart} className="btn btn-secondary">
              Change level
            </button>
          </div>
        </div>
      )}
    </GameShell>
  );
}
