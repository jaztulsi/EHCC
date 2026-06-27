import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { WorkshopCard } from "@/components/cards/WorkshopCard";
import { ConceptFlipCard } from "@/components/cards/ConceptFlipCard";
import { CodePlayground } from "@/components/learn/CodePlayground";
import { LearningRoadmap } from "@/components/learn/LearningRoadmap";
import { ResourceLibrary } from "@/components/learn/ResourceLibrary";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { WORKSHOPS, CONCEPTS, ROADMAPS, RESOURCES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Learn",
  description: "Workshops, an in-browser code playground, learning roadmaps, a resource library, and concept explainers — everything you need to start coding with EHCC.",
};

export default function LearnPage() {
  return (
    <>
      <PageHero
        eyebrow="learn"
        title={
          <>
            Start where you are. <span className="text-gradient">Go further.</span>
          </>
        }
        subtitle="Workshops, interactive code, roadmaps, and curated resources — built to take you from zero to shipping."
      />

      {/* Workshops */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="workshop series"
            title="Hands-on workshops"
            subtitle="Structured, beginner-friendly tracks across every branch of the club."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORKSHOPS.map((w, i) => (
              <Reveal key={w.id} delay={(i % 3) * 0.08}>
                <WorkshopCard workshop={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Code playground */}
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow="code playground"
            title="Write code, right now"
            subtitle="A real JavaScript sandbox running in your browser. Pick an example, edit it, and hit Run."
          />
          <Reveal className="mt-12">
            <CodePlayground />
          </Reveal>
        </div>
      </section>

      {/* Roadmaps */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="roadmaps"
            title="Pick a path, follow the map"
            subtitle="Click any step to see exactly what to learn and in what order."
          />
          <Reveal className="mt-12">
            <LearningRoadmap paths={ROADMAPS} />
          </Reveal>
        </div>
      </section>

      {/* Resource library */}
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow="resource library"
            title="The good stuff, curated"
            subtitle="Hand-picked tutorials, docs, videos, and tools. Filter by topic."
          />
          <Reveal className="mt-12">
            <ResourceLibrary resources={RESOURCES} />
          </Reveal>
        </div>
      </section>

      {/* Concept explainers */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="concept explainers"
            title="Big ideas, flipped open"
            subtitle="Hover or tap any card to demystify a core CS concept."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONCEPTS.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 0.06}>
                <ConceptFlipCard concept={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
