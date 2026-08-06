import type { Metadata } from "next";
import { GamesHub } from "@/components/games/GamesHub";

export const metadata: Metadata = {
  title: "Practice",
  description: "Sharpen your skills with EHCC Academy practice games — typing, binary, debugging, and CS trivia.",
};

export default function PracticePage() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <p className="font-mono text-sm text-emerald">{"// practice"}</p>
          <h1 className="mt-1 text-3xl font-bold text-white md:text-4xl">Practice arcade</h1>
          <p className="mt-2 max-w-xl text-muted">
            Reinforce what you learn with quick games — code typing, binary conversion, debugging, and
            CS trivia. Your typing scores save to this browser.
          </p>
        </div>
        <GamesHub />
      </div>
    </section>
  );
}
