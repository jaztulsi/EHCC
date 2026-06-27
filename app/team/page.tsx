import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { LEADERSHIP, OFFICER_BOARD, BRANCH_LEADERSHIP, ELECTIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the students who run the Emerald Hacking & Coding Club — our founders and the officer structure across every branch.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="our team"
        title={
          <>
            The people who <span className="text-gradient">make it real</span>.
          </>
        }
        subtitle="EHCC is built by students, for students. Meet the crew turning curiosity into code."
      />

      {/* Leadership */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="leadership"
            title="Founders & leads"
            subtitle="The team that started it all and keeps it running."
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

      {/* Officer structure */}
      <section className="relative section pt-0">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow="officer structure"
            title="How the club is organized"
            subtitle="An elected board oversees the club, with dedicated leadership for each of the three branches."
          />

          {/* Main board */}
          <h3 className="mt-12 text-center text-xl font-semibold text-white">Main Board</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICER_BOARD.map((o, i) => (
              <Reveal key={o.position} delay={(i % 4) * 0.06}>
                <div className="flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow">
                  <h4 className="text-lg font-semibold text-emerald-bright">{o.position}</h4>
                  {o.count > 1 && (
                    <div className="mt-2 flex justify-center">
                      <Badge tone="navy" mono>{o.count} positions</Badge>
                    </div>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-muted">{o.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Branch leadership */}
          <h3 className="mt-14 text-center text-xl font-semibold text-white">Branch Leadership</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCH_LEADERSHIP.map((b, i) => (
              <Reveal key={b.branch} delay={(i % 3) * 0.08}>
                <div className="flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow">
                  <h4 className="text-lg font-semibold text-emerald-bright">{b.branch}</h4>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {b.positions.map((p) => (
                      <Badge key={p} tone="navy" mono>{p}</Badge>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{b.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Elections */}
          <Reveal>
            <div className="mt-12 grid gap-6 rounded-2xl border border-white/5 bg-navy-800/40 p-8 text-center sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-emerald-bright">When</p>
                <p className="mt-1 text-muted">{ELECTIONS.when}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-bright">Eligibility</p>
                <p className="mt-1 text-muted">{ELECTIONS.eligibility}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-bright">Requirements</p>
                <p className="mt-1 text-muted">{ELECTIONS.requirements}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald/20 bg-navy-800/60 p-10 text-center">
              <p className="font-mono text-sm text-emerald">{"// the roster is open"}</p>
              <h3 className="text-2xl font-bold text-white md:text-3xl">Want your name here?</h3>
              <p className="max-w-md text-muted">
                We&apos;re always looking for builders, hackers, designers, and the curious. Come join the team.
              </p>
              <Button href="/join" size="lg" className="mt-2">
                Join the team <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
