import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedHero } from "@/components/home/AnimatedHero";
import { ManifestoScene } from "@/components/home/ManifestoScene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCounter } from "@/components/ui/StatCounter";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FlipCard } from "@/components/cards/FlipCard";
import { EventCard } from "@/components/cards/EventCard";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { STATS, WHAT_WE_DO, EVENTS, CLUB } from "@/lib/data";

export default function HomePage() {
  const upcomingEvents = EVENTS.filter((e) => e.upcoming).slice(0, 3);

  return (
    <>
      <AnimatedHero />

      {/* Stats bar */}
      <section className="section pt-12 md:pt-16">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <StatCounter stat={stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll narrative — Think · Build · Elevate */}
      <ManifestoScene />

      {/* What We Do — flip cards */}
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow="act 01 — think"
            title="More than a club — a launchpad"
            subtitle="Hover any card to see what each part of EHCC looks like in practice."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_DO.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <FlipCard
                  front={
                    <>
                      <span className="inline-flex w-fit rounded-lg bg-emerald/10 p-3 text-emerald-bright">
                        <Icon name={item.icon} className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted">{item.blurb}</p>
                      <span className="mt-auto font-mono text-xs text-emerald/60">{"// hover to expand"}</span>
                    </>
                  }
                  back={
                    <>
                      <h3 className="text-lg font-semibold text-emerald-bright">{item.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">{item.detail}</p>
                    </>
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              align="left"
              eyebrow="act 03 — elevate"
              title="Upcoming events"
              subtitle="Hackathons, workshops, and guest talks. Show up, build something, meet your people."
            />
            <Button href="/events" variant="ghost" size="sm" className="shrink-0">
              Full calendar <ArrowRight size={16} />
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.1}>
                <EventCard event={e} featured={e.featured} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission pull-quote */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <figure className="relative overflow-hidden rounded-2xl border border-emerald/20 bg-navy-800/60 p-8 md:p-14">
              <CircuitBackground animate={false} />
              <div className="relative flex gap-5">
                <span className="w-1 shrink-0 rounded-full bg-emerald shadow-glow" />
                <blockquote className="text-2xl font-semibold leading-snug text-white md:text-3xl">
                  Not just a club you attend — a club that{" "}
                  <span className="text-gradient">builds things</span>, competes, and creates{" "}
                  <span className="text-gradient">real opportunities</span>.
                </blockquote>
              </div>
              <figcaption className="relative mt-6 pl-6 font-mono text-sm text-emerald">
                — The {CLUB.shortName} mission
              </figcaption>
            </figure>
          </Reveal>

          {/* Final CTA */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-gradient-to-b from-navy-800/60 to-navy-900 p-10 text-center">
              <h3 className="text-2xl font-bold text-white md:text-3xl">Ready to build something real?</h3>
              <p className="max-w-md text-muted">
                Join {CLUB.shortName} and start shipping. No experience required — just curiosity.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Button href="/join" size="lg">
                  Join the Club <ArrowRight size={18} />
                </Button>
                <Button href="/learn" size="lg" variant="outline">
                  Start Learning
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
