import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Approach } from "@/components/home/Approach";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCounter } from "@/components/ui/StatCounter";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { EventCard } from "@/components/cards/EventCard";
import { STATS, WHAT_WE_DO, EVENTS, AWARDS, CLUB } from "@/lib/data";

export default function HomePage() {
  const upcoming = EVENTS.filter((e) => e.upcoming);
  const [lead, ...rest] = upcoming;

  return (
    <>
      <Hero />

      {/* Stats. White tiles floating on the tinted canvas. */}
      <section className="section border-b border-line py-14 md:py-16">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06} zoom>
                <StatCounter stat={stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="band-warm section border-b border-line">
        <div className="container-x">
          <SectionHeader
            eyebrow="What we do"
            title="Three branches, one club"
            subtitle="Each branch runs its own projects and meetings, and members are welcome in all of them."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_DO.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.08} zoom>
                <article className="surface card-lift group flex h-full flex-col p-7">
                  <span className="inline-flex w-fit rounded-card bg-emerald/[0.08] p-3 text-emerald transition-transform duration-500 ease-apple group-hover:scale-110">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-title text-silver">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.blurb}</p>
                  <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach, on the deep band */}
      <Approach />

      {/* Recognition */}
      <section className="band-cool section border-b border-line">
        <div className="container-x">
          <SectionHeader
            eyebrow="Recognition"
            title="What our members have earned"
            subtitle="Results from the competitions and hackathons our teams have entered."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {AWARDS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} zoom>
                <div className="surface card-lift group flex h-full items-start gap-5 p-7">
                  <span className="inline-flex shrink-0 rounded-card bg-clay/[0.09] p-3.5 text-clay transition-transform duration-500 ease-apple group-hover:-rotate-6">
                    <Icon name={a.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-clay">
                      {a.place}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-title text-silver">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{a.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Events. One featured card, then the rest in a grid. */}
      <section className="section border-b border-line">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              align="left"
              eyebrow="Calendar"
              title="What is coming up"
              subtitle="Hackathons, workshops, and guest talks, open to every member."
              className="max-w-xl"
            />
            <Reveal delay={0.1}>
              <Button href="/events" variant="outline" size="sm" className="shrink-0">
                Full calendar <ArrowRight size={15} />
              </Button>
            </Reveal>
          </div>

          {lead && (
            <Reveal className="mt-12" zoom>
              <EventCard event={lead} featured />
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.slice(0, 3).map((e, i) => (
                <Reveal key={e.id} delay={i * 0.08} zoom>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mission and closing call to action */}
      <section className="section">
        <div className="container-x">
          <Reveal from="none">
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="text-2xl font-semibold leading-[1.28] tracking-display text-silver md:text-[2.1rem]">
                Not just a club you attend, but a club that builds things, competes, and creates
                real opportunities.
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-muted">
                The {CLUB.shortName} mission
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08} zoom>
            <div className="band-dark mt-16 overflow-hidden rounded-panel px-8 py-14 text-center md:px-14 md:py-16">
              <h3 className="text-3xl font-semibold tracking-display md:text-4xl">
                Ready to build something real?
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-bark-muted">
                Join {CLUB.shortName} and start shipping. No experience required, just curiosity.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href="/join" size="lg" className="bg-emerald-circuit text-bark hover:bg-white">
                  Join the club <ArrowRight size={17} />
                </Button>
                <Button
                  href="/learn"
                  size="lg"
                  variant="outline"
                  className="border-bark-line bg-white/5 text-bark-ink hover:border-bark-muted hover:bg-white/10"
                >
                  Start learning
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
