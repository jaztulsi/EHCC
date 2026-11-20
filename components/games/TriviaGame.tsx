"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { GameShell, GameStatus, LETTERS, Scoreboard, useEnterKey, useOptionKeys, useShake } from "./GameShell";
import { TRIVIA } from "@/lib/data";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";

const PER_GAME = 8;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TriviaGame() {
  // a fresh set of questions per mount and per restart
  const [seed, setSeed] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => shuffle(TRIVIA).slice(0, PER_GAME), [seed]);

  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [picks, setPicks] = useState<number[]>([]);
  const shake = useShake();
  const reduce = useReducedMotion();

  const q = questions[round];
  const total = questions.length;

  function choose(i: number) {
    if (selected !== null || done) return;
    const right = i === q.answer;
    setSelected(i);
    setPicks((p) => [...p, i]);
    if (right) setScore((s) => s + 1);
    play(right ? "success" : "error");
  }

  function next() {
    if (selected === null) return;
    if (round + 1 >= total) {
      setDone(true);
      play("stamp");
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
    setPicks([]);
    setDone(false);
  }

  useOptionKeys(q.options.length, choose, !done && selected === null);
  useEnterKey(() => (done ? (play("pop"), restart()) : next()), done || selected !== null);

  const pct = Math.round((score / total) * 100);
  const right = selected !== null && selected === q.answer;
  const answered = round + (selected !== null ? 1 : 0);
  const missed = questions.map((qq, i) => ({ qq, i })).filter(({ qq, i }) => picks[i] !== undefined && picks[i] !== qq.answer);

  return (
    <GameShell
      title="CS Trivia"
      subtitle={`${total} questions on computer science history, ideas and hardware`}
      onRestart={restart}
      shareText={done ? `I scored ${score}/${total} (${pct}%) on EHIC CS Trivia` : undefined}
    >
      {!done ? (
        <div>
          <GameStatus
            items={[
              { label: "Question", value: `${round + 1}/${total}` },
              { label: "Score", value: score },
              { label: "Topic", value: q.category },
            ]}
          />
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-raised" aria-hidden>
            <motion.div
              className="h-full origin-left bg-accent"
              initial={false}
              animate={{ scaleX: answered / total }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <h3 className="mt-6 text-[20px] font-medium leading-[1.35] text-ink">{q.question}</h3>

          <div className="mt-5 grid gap-2 sm:grid-cols-2" role="group" aria-label="Answers">
            {q.options.map((opt, i) => {
              const isAnswer = i === q.answer;
              const isPicked = i === selected;
              const revealed = selected !== null;
              return (
                <motion.button
                  key={`${seed}-${round}-${i}`}
                  type="button"
                  data-sfx="none"
                  onClick={() => choose(i)}
                  disabled={revealed}
                  {...shake(isPicked && !isAnswer)}
                  className={cn(
                    "flex min-h-[52px] items-center gap-3 opt rounded-[10px] px-3 py-2.5 text-left text-[15px] leading-6",
                    !revealed && "",
                    revealed && isAnswer && "!bg-mint text-ink",
                    revealed && isPicked && !isAnswer && "!bg-blush text-ink",
                    revealed && !isAnswer && !isPicked && "text-ink-2 opacity-55 !shadow-none"
                  )}
                >
                  <span className="kbd shrink-0" aria-hidden>
                    {LETTERS[i]}
                  </span>
                  <span className="min-w-0 flex-1">{opt}</span>
                  {revealed && isAnswer && <Check size={18} strokeWidth={1.5} className="shrink-0 text-positive" aria-label="Right answer" />}
                  {revealed && isPicked && !isAnswer && <X size={18} strokeWidth={1.5} className="shrink-0 text-negative" aria-label="Your pick" />}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5 flex min-h-[44px] flex-wrap items-center gap-x-4 gap-y-3">
            <p aria-live="polite" className="text-[15px]">
              {selected !== null &&
                (right ? (
                  <span className="font-medium text-positive">Correct</span>
                ) : (
                  <>
                    <span className="font-medium text-negative">Not quite</span>
                    <span className="text-ink-2"> · the answer is {q.options[q.answer]}</span>
                  </>
                ))}
            </p>
            {selected !== null ? (
              <div className="flex items-center gap-3 sm:ml-auto">
                <button type="button" onClick={next} data-sfx={round + 1 >= total ? "none" : undefined} className="btn btn-primary">
                  {round + 1 >= total ? "See score" : "Next question"}
                  <ArrowRight strokeWidth={1.5} />
                </button>
                <span className="hidden items-center gap-1.5 text-[13px] text-ink-3 sm:flex">
                  or <span className="kbd">Enter</span>
                </span>
              </div>
            ) : (
              <p className="hidden items-center gap-1.5 text-[13px] text-ink-3 sm:flex">
                Press <span className="kbd">A</span> to <span className="kbd">D</span> to answer
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Scoreboard
            label={`${total} questions from a set of ${TRIVIA.length}`}
            items={[
              { label: "Score", value: `${pct}%` },
              { label: "Correct", value: `${score}/${total}` },
            ]}
            note={score === total ? `All ${total} correct` : `${score} of ${total} correct. Restart for a different set`}
          />

          {missed.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-medium text-ink">Answers you missed</h3>
              <ul className="mt-2 divide-y divide-line border-y border-line">
                {missed.map(({ qq, i }) => (
                  <li key={i} className="grid grid-cols-[32px_1fr] gap-2 py-3 text-sm leading-6">
                    <span className="font-mono text-[13px] tabular-nums text-ink-3">{i + 1}</span>
                    <span>
                      <span className="text-ink-2">{qq.question}</span>
                      <span className="mt-0.5 block text-ink">{qq.options[qq.answer]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={restart} data-sfx="pop" className="btn btn-primary">
              Play a new set
            </button>
            <span className="hidden items-center gap-1.5 text-[13px] text-ink-3 sm:flex">
              or <span className="kbd">Enter</span>
            </span>
          </div>
        </div>
      )}
    </GameShell>
  );
}
