import type { Metadata } from "next";
import { GamesHub } from "@/components/games/GamesHub";

export const metadata: Metadata = {
  title: "Practice",
  description: "Sharpen your skills with EHIC practice games: typing, binary, debugging, and CS trivia.",
};

export default function PracticePage() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <p className="eyebrow">Practice</p>
          <h1 className="page-title !text-[clamp(40px,6vw,72px)]">Practice arcade</h1>
          <p className="page-lede">
            Quick games to lock in what you learn: code typing, binary, debugging and CS trivia. Typing scores save to this browser
          </p>
        </div>
        <GamesHub />
      </div>
    </section>
  );
}
