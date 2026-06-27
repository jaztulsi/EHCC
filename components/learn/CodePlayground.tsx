"use client";

import { useState } from "react";
import { Play, RotateCcw, Terminal } from "lucide-react";

interface Snippet {
  label: string;
  code: string;
}

// Pre-filled beginner JavaScript examples users can edit and run in-browser.
const SNIPPETS: Snippet[] = [
  {
    label: "Hello, World",
    code: `// Welcome to the EHCC playground!
// Edit this code and hit Run.
const club = "EHCC";
console.log("Hello from " + club + " 👋");
console.log("// Think. // Build. // Elevate.");`,
  },
  {
    label: "FizzBuzz",
    code: `// A classic. Print 1-15 with a twist.
for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`,
  },
  {
    label: "Array magic",
    code: `// Functional array methods
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter((n) => n % 2 === 0);
const doubled = evens.map((n) => n * 2);
const sum = doubled.reduce((a, b) => a + b, 0);

console.log("evens:", evens);
console.log("doubled:", doubled);
console.log("sum:", sum);`,
  },
  {
    label: "Fibonacci",
    code: `// Recursion in action
function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
for (let i = 0; i < 10; i++) {
  console.log("fib(" + i + ") =", fib(i));
}`,
  },
];

type LogLine = { type: "log" | "error"; text: string };

export function CodePlayground() {
  const [active, setActive] = useState(0);
  const [code, setCode] = useState(SNIPPETS[0].code);
  const [output, setOutput] = useState<LogLine[]>([]);
  const [hasRun, setHasRun] = useState(false);

  function selectSnippet(i: number) {
    setActive(i);
    setCode(SNIPPETS[i].code);
    setOutput([]);
    setHasRun(false);
  }

  function reset() {
    setCode(SNIPPETS[active].code);
    setOutput([]);
    setHasRun(false);
  }

  function run() {
    const logs: LogLine[] = [];
    const format = (args: unknown[]) =>
      args
        .map((a) => {
          if (typeof a === "string") return a;
          try {
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(" ");

    const sandboxConsole = {
      log: (...args: unknown[]) => logs.push({ type: "log", text: format(args) }),
      error: (...args: unknown[]) => logs.push({ type: "error", text: format(args) }),
      warn: (...args: unknown[]) => logs.push({ type: "log", text: format(args) }),
      info: (...args: unknown[]) => logs.push({ type: "log", text: format(args) }),
    };

    try {
      // Run user code with an injected console. Time-box infinite loops loosely
      // by relying on the JS engine; this is a learning sandbox, not production.
      // eslint-disable-next-line no-new-func
      const fn = new Function("console", `"use strict";\n${code}`);
      fn(sandboxConsole);
      if (logs.length === 0) logs.push({ type: "log", text: "// ran successfully (no output)" });
    } catch (err) {
      logs.push({ type: "error", text: String(err) });
    }
    setOutput(logs);
    setHasRun(true);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-900">
      {/* Snippet tabs */}
      <div className="flex flex-wrap gap-1 border-b border-white/5 bg-navy-800/60 p-2">
        {SNIPPETS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => selectSnippet(i)}
            className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
              active === i ? "bg-emerald/15 text-emerald-bright" : "text-muted hover:text-silver"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2">
        {/* Editor */}
        <div className="relative border-b border-white/5 md:border-b-0 md:border-r">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 font-mono text-xs text-muted">
            <span>playground.js</span>
            <span className="text-emerald/60">javascript</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="h-72 w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-emerald-bright outline-none"
            aria-label="Code editor"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2 font-mono text-xs text-muted">
            <Terminal size={13} className="text-emerald/70" /> output
          </div>
          <div className="h-72 overflow-auto p-4 font-mono text-sm">
            {!hasRun && <p className="text-muted">{"// press Run to execute your code"}</p>}
            {output.map((line, i) => (
              <p key={i} className={line.type === "error" ? "text-rose-400" : "text-silver"}>
                <span className="select-none text-emerald/50">{"> "}</span>
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 border-t border-white/5 bg-navy-800/60 p-3">
        <button
          onClick={run}
          className="btn-shimmer inline-flex items-center gap-1.5 rounded-md bg-emerald px-4 py-1.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-emerald-bright"
        >
          <Play size={14} className="fill-navy-950" /> Run
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-4 py-1.5 text-sm text-silver transition-colors hover:border-emerald/40 hover:text-emerald-bright"
        >
          <RotateCcw size={14} /> Reset
        </button>
        <span className="ml-auto font-mono text-xs text-muted">runs in your browser</span>
      </div>
    </div>
  );
}
