"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell, GameStatus, Scoreboard } from "./GameShell";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";

const SNIPPETS = [
  `const sum = (a, b) => a + b;`,
  `for (let i = 0; i < n; i++) total += i;`,
  `if (user.isAdmin) grantAccess();`,
  `const evens = nums.filter(n => n % 2 === 0);`,
  `function greet(name) { return "hi " + name; }`,
  `array.map(x => x * 2).reduce((a, b) => a + b);`,
  `while (queue.length) process(queue.shift());`,
  `const data = await fetch(url).then(r => r.json());`,
];

const pick = (not?: string) => {
  const pool = SNIPPETS.filter((s) => s !== not);
  return pool[Math.floor(Math.random() * pool.length)];
};

type Score = { wpm: number; acc: number; date: string };
type Result = { wpm: number; acc: number; seconds: number; best: boolean };

export function TypingGame() {
  const [target, setTarget] = useState(() => pick());
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [keys, setKeys] = useState(0); // characters typed, mistakes included
  const [misses, setMisses] = useState(0); // characters that did not match, even if fixed later
  const [result, setResult] = useState<Result | null>(null);
  const [focused, setFocused] = useState(false);
  const [scores, setScores] = useLocalStorage<Score[]>("ehic-typing-scores", []);
  const lastEntry = useRef<Score | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const finished = result !== null;

  useEffect(() => {
    inputRef.current?.focus();
  }, [target]);

  // a running clock while typing, so the time and WPM move
  useEffect(() => {
    if (startTime === null || finished) return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [startTime, finished]);

  const accuracy = keys ? Math.round(((keys - misses) / keys) * 100) : 100;
  const seconds = startTime ? Math.max(0, (now - startTime) / 1000) : 0;
  const liveWpm = seconds >= 1 ? Math.round((typed.length / 5 / seconds) * 60) : null;
  const progress = Math.round((typed.length / target.length) * 100);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (finished) return;
    const start = startTime ?? Date.now();
    if (startTime === null && val.length > 0) {
      setStartTime(start);
      setNow(start);
    }

    // count every new character, so a fixed mistake still costs accuracy
    let k = keys;
    let m = misses;
    if (val.length > typed.length) {
      for (let i = typed.length; i < val.length; i++) {
        k += 1;
        if (val[i] !== target[i]) m += 1;
      }
      setKeys(k);
      setMisses(m);
    }
    setTyped(val);

    if (val === target) {
      const finalElapsed = (Date.now() - start) / 1000;
      const finalWpm = finalElapsed > 0 ? Math.round((target.length / 5 / finalElapsed) * 60) : 0;
      const finalAcc = k ? Math.round(((k - m) / k) * 100) : 100;
      const best = scores.every((s) => finalWpm > s.wpm);
      const entry: Score = { wpm: finalWpm, acc: finalAcc, date: new Date().toLocaleDateString() };
      lastEntry.current = entry;
      setResult({ wpm: finalWpm, acc: finalAcc, seconds: finalElapsed, best });
      setScores((prev) => [...prev, entry].sort((a, b) => b.wpm - a.wpm).slice(0, 5));
      play("stamp");
    }
  }

  function restart() {
    setTarget((t) => pick(t));
    setTyped("");
    setStartTime(null);
    setNow(0);
    setKeys(0);
    setMisses(0);
    setResult(null);
    lastEntry.current = null;
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  // Enter after a finished run deals a new snippet
  useEffect(() => {
    if (!finished) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || e.repeat) return;
      if ((e.target as HTMLElement | null)?.closest("button, a[href]")) return;
      e.preventDefault();
      play("pop");
      restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const prevBest = scores.filter((s) => s !== lastEntry.current)[0];

  return (
    <GameShell
      title="Code Breaker"
      subtitle="Type the line exactly; the clock starts on your first key"
      onRestart={restart}
      shareText={result ? `I typed ${result.wpm} WPM at ${result.acc}% accuracy in EHIC Code Breaker` : undefined}
    >
      <GameStatus
        items={[
          { label: "Time", value: `${(result ? result.seconds : seconds).toFixed(1)} s` },
          { label: "WPM", value: result ? result.wpm : liveWpm ?? "–" },
          { label: "Accuracy", value: `${result ? result.acc : accuracy}%` },
          { label: "Done", value: `${progress}%` },
        ]}
      />

      {/* the snippet: the one dark object on the bench */}
      <div
        className={cn(
          "code-block relative mt-4 cursor-text whitespace-pre-wrap break-words outline outline-2 outline-offset-2 transition-[outline-color] duration-150 !p-5 !text-[16px] !leading-8 sm:!px-6 sm:!text-[18px]",
          focused && !finished ? "outline-accent/60" : "outline-transparent"
        )}
        onClick={() => inputRef.current?.focus()}
        aria-hidden
      >
        {[...target].map((char, i) => {
          const done = i < typed.length;
          const right = done && typed[i] === char;
          const caret = i === typed.length && !finished;
          return (
            <span
              key={i}
              className={cn(
                "rounded-[2px]",
                !done && "text-[#eee8dc]/40",
                right && "text-[#eee8dc]",
                done && !right && "bg-[#e5484d]/35 text-[#ffb4b0]",
                caret && "bg-mat-accent/25 text-[#eee8dc] shadow-[inset_0_-2px_0_rgb(var(--c-mat-accent))]"
              )}
            >
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        value={typed}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={finished}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        className="sr-only"
        aria-label={`Type this code: ${target}`}
      />

      {/* progress along the line */}
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-raised" aria-hidden>
        <div
          className="h-full origin-left bg-ink-3 transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${typed.length / target.length})` }}
        />
      </div>

      {!finished && (
        <p className="mt-4 text-sm text-ink-2" aria-live="polite">
          {!focused ? (
            <>Click the code to start typing</>
          ) : startTime ? (
            <>Mistakes stay red until you fix them with <span className="kbd">Backspace</span></>
          ) : (
            <>Every bracket, space and semicolon counts</>
          )}
        </p>
      )}

      {result && (
        <div className="mt-6">
          <Scoreboard
            label="Run complete"
            items={[
              { label: "Words per minute", value: result.wpm },
              { label: "Accuracy", value: `${result.acc}%` },
              { label: "Time", value: `${result.seconds.toFixed(1)} s` },
            ]}
            note={
              result.best && scores.length > 1
                ? `Your best on this device, ahead of ${prevBest?.wpm ?? 0} WPM`
                : result.best
                  ? "Your first run on this device. Beat it next time"
                  : `Your best on this device is ${scores[0]?.wpm} WPM`
            }
          />
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-2">
            <span className="kbd">Enter</span> new snippet
          </p>
        </div>
      )}

      {scores.length > 0 && (
        <div className="mt-8">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium text-ink">Leaderboard</h3>
            <p className="text-[13px] text-ink-3">Top 5 on this device</p>
          </div>
          <ol className="mt-2 divide-y divide-line border-y border-line">
            {scores.map((s, i) => {
              const mine = s === lastEntry.current;
              return (
                <li key={i} className="grid h-10 grid-cols-[32px_1fr_64px_96px] items-center gap-2 font-mono text-[13px] tabular-nums">
                  <span className="text-ink-3">{i + 1}</span>
                  <span className="flex items-center gap-2 text-ink">
                    {s.wpm} WPM
                    {mine && (
                      <span className="flex items-center gap-1.5 font-sans text-[12px] text-ink-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                        this run
                      </span>
                    )}
                  </span>
                  <span className="text-right text-ink-2">{s.acc}%</span>
                  <span className="text-right text-ink-3">{s.date}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </GameShell>
  );
}
