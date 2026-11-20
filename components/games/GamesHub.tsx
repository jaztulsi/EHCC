"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, Binary, Bug, BrainCircuit, X, Play } from "lucide-react";
import { TypingGame } from "./TypingGame";
import { BinaryGame } from "./BinaryGame";
import { DebugGame } from "./DebugGame";
import { TriviaGame } from "./TriviaGame";

type GameId = "typing" | "binary" | "debug" | "trivia";

const GAMES: {
  id: GameId;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Keyboard;
  color: string;
}[] = [
  { id: "typing", title: "Code Breaker", tagline: "Typing speed", description: "Type real code snippets against the clock. Tracks WPM and accuracy, with a leaderboard saved in this browser.", icon: Keyboard, color: "!bg-mint" },
  { id: "binary", title: "Binary Quiz", tagline: "Number systems", description: "Turn decimal numbers into binary before time runs out. Three difficulty levels.", icon: Binary, color: "!bg-sun" },
  { id: "debug", title: "Debug the Code", tagline: "Bug hunt", description: "Ten broken snippets in Python and JavaScript, one bug each. Spot the fix, then read why.", icon: Bug, color: "!bg-blush" },
  { id: "trivia", title: "CS Trivia", tagline: "Knowledge", description: "Eight questions on computer science history, ideas and hardware, from Ada Lovelace to Big-O.", icon: BrainCircuit, color: "" },
];

function GameComponent({ id }: { id: GameId }) {
  switch (id) {
    case "typing":
      return <TypingGame />;
    case "binary":
      return <BinaryGame />;
    case "debug":
      return <DebugGame />;
    case "trivia":
      return <TriviaGame />;
  }
}

export function GamesHub() {
  const [active, setActive] = useState<GameId | null>(null);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {GAMES.map((g, i) => (
          <button
            type="button"
            key={g.id}
            onClick={() => setActive(g.id)}
            data-sfx="pop"
            className={`group surface card-lift relative flex min-h-[260px] flex-col p-6 text-left ${g.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex rounded-[10px] border-2 border-ink bg-card p-2.5 text-ink">
                <g.icon className="h-6 w-6" strokeWidth={2} aria-hidden />
              </span>
              <span className="rounded-full border-2 border-ink bg-card px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em]">
                {g.tagline}
              </span>
            </div>
            <span className="mt-auto pt-10 font-mono text-xs text-ink/60">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-1 text-[32px] leading-none text-ink">{g.title}</h3>
            <p className="mt-3 text-[15px] leading-6 text-ink/80">{g.description}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 self-start border-b-[3px] border-ink font-display text-base font-bold">
              <Play size={14} className="fill-ink" aria-hidden /> Play
            </span>
          </button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="app fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="my-auto w-full max-w-2xl"
            >
              <div className="mb-3 flex justify-end">
                <button
                  onClick={() => setActive(null)}
                  className="btn btn-secondary btn-sm"
                  aria-label="Close game"
                >
                  <X aria-hidden /> Close <span className="kbd ml-1 hidden sm:inline-flex">Esc</span>
                </button>
              </div>
              <GameComponent id={active} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
