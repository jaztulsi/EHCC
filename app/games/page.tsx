import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GamesHub } from "@/components/games/GamesHub";
import { CircuitBackground } from "@/components/effects/CircuitBackground";

export const metadata: Metadata = {
  title: "Games",
  description: "Take a break and learn while you play — four browser games from EHCC: a typing challenge, binary quiz, debugging hunt, and CS trivia.",
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        eyebrow="games"
        title={
          <>
            Take a break. <span className="text-gradient">Learn while you play.</span>
          </>
        }
        subtitle="Four browser games built by the club — sharpen your typing, your number sense, your debugging eye, and your CS knowledge. Scores save locally."
      />

      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader
            align="left"
            eyebrow="arcade"
            title="Pick your game"
            subtitle="Click any card to launch it. Green terminal aesthetic included, no quarters required."
          />
          <div className="mt-10">
            <GamesHub />
          </div>
        </div>
      </section>
    </>
  );
}
