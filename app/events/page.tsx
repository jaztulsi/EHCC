import type { Metadata } from "next";
import { Calendar, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { EventsBrowser } from "@/components/events/EventsBrowser";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { EVENTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Hackathons, workshops, guest speakers, and competitions hosted by the EHS Hacking & Coding Club.",
};

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
          <Reveal className="mt-12">
            <ComingSoon
              title="Speakers announcing soon"
              note="We're lining up engineers, founders, and researchers for the guest-speaker series. Check back for the lineup."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
