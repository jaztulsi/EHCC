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
}[] = [
  { id: "typing", title: "Code Breaker", tagline: "Typing Speed", description: "Race the clock typing real code snippets. Track your WPM, accuracy, and climb the local leaderboard.", icon: Keyboard },
  { id: "binary", title: "Binary Quiz", tagline: "Number Systems", description: "Convert decimal numbers to binary against the clock. Three difficulty levels — how high can you score?", icon: Binary },
  { id: "debug", title: "Debug the Code", tagline: "Bug Hunt", description: "Ten broken snippets, one bug each. Spot the fix before the explanation drops. Pure debugging reps.", icon: Bug },
  { id: "trivia", title: "CS Trivia", tagline: "Knowledge", description: "From Ada Lovelace to Big-O. Eight questions on CS history, concepts, and algorithms with an animated reveal.", icon: BrainCircuit },
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
      <div className="grid gap-5 sm:grid-cols-2">
        {GAMES.map((g, i) => (
          <motion.button
            key={g.id}
            onClick={() => setActive(g.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-800/50 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 hover:shadow-glow-md"
          >
            {/* scanline shimmer */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.04)_50%,transparent_50%)] bg-[length:100%_4px] opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-center justify-between">
              <span className="inline-flex rounded-lg bg-emerald/10 p-3 text-emerald-bright transition-colors group-hover:bg-emerald/20">
                <g.icon className="h-6 w-6" />
              </span>
              <span className="font-mono text-xs text-muted">{g.tagline}</span>
            </div>
            <h3 className="relative mt-4 text-xl font-bold text-white transition-colors group-hover:text-emerald-bright">
              {g.title}
            </h3>
            <p className="relative mt-2 flex-1 text-sm text-muted">{g.description}</p>
            <span className="relative mt-4 inline-flex items-center gap-1.5 font-mono text-sm font-medium text-emerald">
              <Play size={14} className="fill-emerald" /> play now
            </span>
          </motion.button>
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
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy-950/85 p-4 backdrop-blur-sm sm:p-8"
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
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-navy-800 px-3 py-1.5 text-sm text-silver transition-colors hover:border-emerald/40 hover:text-emerald-bright"
                  aria-label="Close game"
                >
                  <X size={15} /> Close
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
