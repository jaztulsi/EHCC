import type { Metadata } from "next";
import { GraduationCap, Users2, Rocket } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Timeline } from "@/components/ui/Timeline";
import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { BRANCHES, LEADERSHIP, ACHIEVEMENTS, CLUB } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: `The story of ${CLUB.name} — a student-run community at ${CLUB.school} built around three branches: Hackathon, Data Science, and AI Principles / Programming.`,
};

const storyStats = [
  { icon: Rocket, label: "Founded", value: CLUB.founded },
  { icon: Users2, label: "Founders", value: "5 students" },
  { icon: GraduationCap, label: "Specialized branches", value: "3 branches" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="about us"
        title={
          <>
            We build, compete, <span className="text-gradient">and elevate</span>.
          </>
        }
        subtitle={`${CLUB.name} is a collaborative, inclusive community at ${CLUB.school} where the curious become creators — across our Hackathon, Data Science, and AI Principles / Programming branches.`}
      />

      {/* Story */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="right">
            <p className="font-mono text-sm text-emerald">{"// our story"}</p>
            <h2 className="mt-3 text-3xl font-bold text-white">From an idea to a movement</h2>
            <div className="mt-5 space-y-4 text-muted">
              <p>
                EHCC was founded in {CLUB.founded} by five students who were tired of waiting for
                permission to build. They wanted a place where coding wasn&apos;t just a class — it was a
                craft, a competition, and a community.
              </p>
              <p>
                We organized the club into{" "}
                <span className="text-emerald-bright">three specialized branches</span> — Hackathon,
                Data Science, and AI Principles / Programming — so every member can focus on what excites them,
                or explore all three.
              </p>
              <p>
                We meet every Wednesday and Thursday during Access Period in{" "}
                <span className="text-emerald-bright">{CLUB.meetingRoom}</span>. We&apos;re a young club
                with big plans — and we&apos;re just getting started.
              </p>
            </div>
          </Reveal>

          <Reveal from="left">
            <div className="grid gap-4">
              {storyStats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-navy-800/50 p-5 transition-colors hover:border-emerald/30"
                >
                  <span className="inline-flex rounded-lg bg-emerald/10 p-3 text-emerald-bright">
                    <s.icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-sm text-muted">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Branches */}
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow="our branches"
            title="Three branches, one club"
            subtitle="Specialize in what excites you — or explore them all."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((b, i) => (
              <Reveal key={b.id} delay={(i % 3) * 0.08}>
                <div className="group flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex rounded-lg bg-emerald/10 p-2.5 text-emerald-bright transition-colors group-hover:bg-emerald/20">
                      <Icon name={b.icon} className="h-5 w-5" />
                    </span>
                    <Badge tone="emerald" mono>branch</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-emerald-bright">
                    {b.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="leadership"
            title="The team behind EHCC"
            subtitle="Founded and led by students who build what they teach."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 0.08}>
                <TeamMemberCard member={m} large />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements timeline */}
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative max-w-3xl">
          <SectionHeader
            align="left"
            eyebrow="milestones"
            title="How far we've come"
            subtitle="A young club with a fast start."
          />
          <div className="mt-12">
            <Timeline items={ACHIEVEMENTS} />
          </div>
        </div>
      </section>
    </>
  );
}
