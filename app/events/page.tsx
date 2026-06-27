import type { Metadata } from "next";
import { Calendar, MapPin, Clock, Mic } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EventsBrowser } from "@/components/events/EventsBrowser";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { EVENTS, SPEAKERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Hackathons, workshops, guest speakers, and competitions hosted by the EHS Hacking & Coding Club.",
};

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function EventsPage() {
  const featured = EVENTS.find((e) => e.featured);
  const date = featured ? new Date(featured.date + "T00:00:00") : null;

  return (
    <>
      <PageHero
        eyebrow="events"
        title={
          <>
            Show up. <span className="text-gradient">Build something.</span>
          </>
        }
        subtitle="From all-day hackathons to focused workshops and industry guest talks — there's always something happening at EHCC."
      />

      {/* Featured event banner */}
      {featured && date && (
        <section className="px-4 pt-12 sm:px-6 lg:px-8">
          <div className="container-x">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-emerald/30 bg-navy-800 p-8 shadow-glow md:p-10">
                <CircuitBackground animate={false} />
                <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-xl">
                    <Badge tone="emerald" className="mb-3">Featured · {featured.type}</Badge>
                    <h2 className="text-2xl font-bold text-white md:text-3xl">{featured.title}</h2>
                    <p className="mt-2 text-muted">{featured.description}</p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-silver">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={15} className="text-emerald" />
                        {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </span>
                      {featured.time && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={15} className="text-emerald" /> {featured.time}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={15} className="text-emerald" /> {featured.location}
                      </span>
                    </div>
                  </div>
                  <Button href="/join" size="lg" className="shrink-0">
                    RSVP / Join
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Browser with tab filter */}
      <section className="section pt-12">
        <div className="container-x">
          <SectionHeader align="left" eyebrow="calendar" title="All events" />
          <div className="mt-8">
            <EventsBrowser events={EVENTS} />
          </div>
        </div>
      </section>

      {/* Guest speaker spotlight */}
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow="guest speakers"
            title="Learn from the pros"
            subtitle="Engineers, founders, and researchers who've been where you want to go."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {SPEAKERS.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <div className="group flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-glow">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-navy-700 font-mono font-bold text-white ring-2 ring-violet-400/30">
                      {initials(s.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{s.name}</h3>
                      <p className="text-xs text-muted">{s.role} · {s.company}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-navy-900/60 p-3">
                    <Mic size={15} className="mt-0.5 shrink-0 text-violet-300" />
                    <p className="text-sm text-silver">{s.topic}</p>
                  </div>
                  <p className="mt-3 font-mono text-xs text-muted">
                    {new Date(s.date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
