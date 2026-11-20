import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GamesHub } from "@/components/games/GamesHub";

export const metadata: Metadata = {
  title: "Games",
  description: "Take a break and learn while you play, four browser games from EHIC: a typing challenge, binary quiz, debugging hunt, and CS trivia.",
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Games · built by the club"
        title={
          <>
            Take a break.
            <br />
            Learn while you play
          </>
        }
        subtitle="Four browser games for your typing, binary, debugging and computer science trivia. Scores save in this browser"
      />

      <section className="relative section">
        <div className="container-x relative">
          <SectionHeader
            align="left"
            eyebrow="Arcade"
            title="Pick your game"
            subtitle="Pick a game to start. Keyboard players can answer with A to D and move on with Enter"
          />
          <div className="mt-10">
            <GamesHub />
          </div>
        </div>
      </section>
    </>
  );
}
