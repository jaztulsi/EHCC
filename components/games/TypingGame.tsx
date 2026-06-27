"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Trophy } from "lucide-react";
import { GameShell } from "./GameShell";
import { useLocalStorage } from "@/lib/useLocalStorage";

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

type Score = { wpm: number; acc: number; date: string };

export function TypingGame() {
  const snippet = useMemo(() => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)], []);
  const [target, setTarget] = useState(snippet);
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [scores, setScores] = useLocalStorage<Score[]>("ehcc-typing-scores", []);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [target]);

  const elapsed = startTime && finished ? (Date.now() - startTime) / 1000 : 0;
  const correctChars = [...typed].filter((c, i) => c === target[i]).length;
  const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;
  const wpm = elapsed > 0 ? Math.round((target.length / 5 / elapsed) * 60) : 0;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (finished) return;
    if (startTime === null && val.length > 0) setStartTime(Date.now());
    setTyped(val);
    if (val === target) {
      setFinished(true);
      const finalElapsed = (Date.now() - (startTime ?? Date.now())) / 1000;
      const finalWpm = finalElapsed > 0 ? Math.round((target.length / 5 / finalElapsed) * 60) : 0;
      const finalAcc = Math.round((([...val].filter((c, i) => c === target[i]).length) / val.length) * 100);
      const entry: Score = { wpm: finalWpm, acc: finalAcc, date: new Date().toLocaleDateString() };
      setScores((prev) => [...prev, entry].sort((a, b) => b.wpm - a.wpm).slice(0, 5));
    }
  }

  function restart() {
    setTarget(SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]);
    setTyped("");
    setStartTime(null);
    setFinished(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <GameShell
      title="code-breaker"
      subtitle="type the snippet as fast and accurately as you can"
      onRestart={restart}
      shareText={finished ? `I hit ${wpm} WPM at ${accuracy}% accuracy on EHCC Code Breaker! Can you beat me?` : undefined}
    >
      {/* Snippet with per-character highlighting */}
      <div
        className="cursor-text rounded-lg border border-white/10 bg-navy-950 p-4 font-mono text-base leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {[...target].map((char, i) => {
          let cls = "text-muted";
          if (i < typed.length) cls = typed[i] === char ? "text-emerald-bright" : "bg-rose-500/30 text-rose-300";
          else if (i === typed.length) cls = "bg-emerald/30 text-white";
          return (
            <span key={i} className={cls}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        value={typed}
        onChange={onChange}
        disabled={finished}
        spellCheck={false}
        autoComplete="off"
        className="sr-only"
        aria-label="Type the code snippet here"
      />

      {/* Live stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat label="WPM" value={finished ? wpm : startTime ? "…" : "0"} />
        <Stat label="Accuracy" value={`${accuracy}%`} />
        <Stat label="Progress" value={`${Math.round((typed.length / target.length) * 100)}%`} />
      </div>

      {!finished && (
        <p className="mt-3 text-center font-mono text-xs text-muted">
          {startTime ? "// keep going…" : "// start typing to begin the timer"}
        </p>
      )}

      {finished && (
        <div className="mt-4 rounded-lg border border-emerald/30 bg-emerald/5 p-4 text-center">
          <p className="font-mono text-sm text-emerald-bright">
            ✓ Done — {wpm} WPM at {accuracy}% accuracy
          </p>
        </div>
      )}

      {/* Leaderboard */}
      {scores.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 flex items-center gap-1.5 font-mono text-xs text-muted">
            <Trophy size={13} className="text-emerald" /> local leaderboard
          </p>
          <ol className="space-y-1">
            {scores.map((s, i) => (
              <li key={i} className="flex items-center justify-between rounded-md bg-navy-800/60 px-3 py-1.5 font-mono text-xs">
                <span className="text-emerald">#{i + 1}</span>
                <span className="text-white">{s.wpm} WPM</span>
                <span className="text-muted">{s.acc}%</span>
                <span className="text-muted">{s.date}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </GameShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/5 bg-navy-800/60 p-3 text-center">
      <p className="font-mono text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
