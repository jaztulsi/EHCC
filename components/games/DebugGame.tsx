"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { GameShell, GameStatus, InlineCode, LETTERS, Scoreboard, useEnterKey, useOptionKeys, useShake } from "./GameShell";
import { DEBUG_CHALLENGES } from "@/lib/data";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";

const LANG: Record<string, string> = { python: "Python", javascript: "JavaScript" };
const langName = (l: string) => LANG[l] ?? l;

/** The fix is stored first in the data; shuffle the order shown so it isn't always A. */
function order(n: number) {
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

export function DebugGame() {
  const [run, setRun] = useState(0);
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const shake = useShake();

  const challenge = DEBUG_CHALLENGES[round];
  const total = DEBUG_CHALLENGES.length;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shown = useMemo(() => order(challenge.options.length), [round, run]);

  function choose(i: number) {
    if (selected !== null || done) return;
    const right = i === challenge.answer;
    setSelected(i);
    setResults((r) => [...r, right]);
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
    setRun((r) => r + 1);
    setRound(0);
    setSelected(null);
    setScore(0);
    setResults([]);
    setDone(false);
  }

  useOptionKeys(shown.length, (k) => choose(shown[k]), !done && selected === null);
  useEnterKey(() => (done ? (play("pop"), restart()) : next()), done || selected !== null);

  const byLang = (lang: string) => {
    const idx = DEBUG_CHALLENGES.map((c, i) => (c.language === lang ? i : -1)).filter((i) => i >= 0);
    return `${idx.filter((i) => results[i]).length}/${idx.length}`;
  };
  const missed = DEBUG_CHALLENGES.map((c, i) => ({ c, i })).filter(({ i }) => results[i] === false);
  const right = selected !== null && selected === challenge.answer;
  const lines = challenge.code.split("\n");

  return (
    <GameShell
      title="Debug the Code"
      subtitle={`Find the bug in each snippet, ${total} in a row`}
      onRestart={restart}
      shareText={done ? `I found ${score}/${total} bugs in EHIC Debug the Code` : undefined}
    >
      {!done ? (
        <div>
          <GameStatus
            items={[
              { label: "Snippet", value: `${round + 1}/${total}` },
              { label: "Found", value: score },
              { label: "Language", value: langName(challenge.language) },
            ]}
          />

          <p className="mt-5 text-[17px] leading-7 text-ink">{challenge.prompt}</p>

          {/* code, with line numbers like an editor */}
          <pre className="code-block mt-4 !px-0 !py-4" aria-label={`${langName(challenge.language)} code`}>
            <code className="grid">
              {lines.map((line, i) => (
                <span key={i} className="grid grid-cols-[40px_1fr] pr-5">
                  <span className="select-none pr-4 text-right text-[#eee8dc]/35" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="whitespace-pre">{line || " "}</span>
                </span>
              ))}
            </code>
          </pre>

          <div className="mt-4 grid gap-2" role="group" aria-label="Choose the fix">
            {shown.map((oi, k) => {
              const opt = challenge.options[oi];
              const isAnswer = oi === challenge.answer;
              const isPicked = oi === selected;
              const revealed = selected !== null;
              return (
                <motion.button
                  key={`${round}-${oi}`}
                  type="button"
                  data-sfx="none"
                  onClick={() => choose(oi)}
                  disabled={revealed}
                  {...shake(isPicked && !isAnswer)}
                  className={cn(
                    "flex w-full items-center gap-3 opt rounded-[10px] px-3 py-3 text-left text-[15px] leading-6",
                    !revealed && "",
                    revealed && isAnswer && "!bg-mint text-ink",
                    revealed && isPicked && !isAnswer && "!bg-blush text-ink",
                    revealed && !isAnswer && !isPicked && "text-ink-2 opacity-55 !shadow-none"
                  )}
                >
                  <span className="kbd shrink-0" aria-hidden>
                    {LETTERS[k]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <InlineCode text={opt} />
                  </span>
                  {revealed && isAnswer && <Check size={18} strokeWidth={1.5} className="shrink-0 text-positive" aria-label="The fix" />}
                  {revealed && isPicked && !isAnswer && <X size={18} strokeWidth={1.5} className="shrink-0 text-negative" aria-label="Your pick" />}
                </motion.button>
              );
            })}
          </div>

          <div aria-live="polite">
            {selected !== null && (
              <div className="mt-4 surface p-4">
                <p className={cn("text-[15px] font-medium", right ? "text-positive" : "text-negative")}>{right ? "Correct" : "Not quite"}</p>
                <p className="mt-1 text-[15px] leading-6 text-ink-2">
                  <InlineCode text={challenge.explanation} />
                </p>
              </div>
            )}
          </div>

          {selected !== null ? (
            <div className="mt-4 flex items-center gap-3">
              <button type="button" onClick={next} data-sfx={round + 1 >= total ? "none" : undefined} className="btn btn-primary">
                {round + 1 >= total ? "See results" : "Next snippet"}
                <ArrowRight strokeWidth={1.5} />
              </button>
              <span className="hidden items-center gap-1.5 text-[13px] text-ink-3 sm:flex">
                or <span className="kbd">Enter</span>
              </span>
            </div>
          ) : (
            <p className="mt-4 hidden items-center gap-1.5 text-[13px] text-ink-3 sm:flex">
              Press <span className="kbd">A</span> to <span className="kbd">D</span> to answer
            </p>
          )}
        </div>
      ) : (
        <div>
          <Scoreboard
            label={`${total} snippets · Python and JavaScript`}
            items={[
              { label: "Bugs found", value: `${score}/${total}` },
              { label: "Python", value: byLang("python") },
              { label: "JavaScript", value: byLang("javascript") },
            ]}
            note={score === total ? `All ${total} found, the trick one included` : `${score} of ${total} found`}
          />

          {missed.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-medium text-ink">Worth another look</h3>
              <ul className="mt-2 divide-y divide-line border-y border-line">
                {missed.map(({ c, i }) => (
                  <li key={i} className="grid grid-cols-[32px_1fr] gap-2 py-3 text-sm leading-6">
                    <span className="font-mono text-[13px] tabular-nums text-ink-3">{i + 1}</span>
                    <span>
                      <span className="text-ink-2">{c.prompt}</span>
                      <span className="mt-1 block text-ink">
                        <InlineCode text={c.options[c.answer]} />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={restart} data-sfx="pop" className="btn btn-primary">
              Play again
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
