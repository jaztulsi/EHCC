import type { Metadata } from "next";
import { Trophy, GraduationCap, Users, CheckCircle2, Calendar, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/join/FaqAccordion";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { FAQS, CLUB } from "@/lib/data";

export const metadata: Metadata = {
  title: "Join",
  description: "Join the Emerald Hacking & Coding Club. Pick a branch — Hackathon, Data Science, or AI Principles / Programming — and start building. All skill levels welcome.",
};

const VALUE_PROPS = [
  { icon: Trophy, title: "Compete", text: "Take part in hackathons, AI build challenges, and monthly data science challenges — friendly competition that pushes everyone forward." },
  { icon: GraduationCap, title: "Learn", text: "Three specialized branches plus guest speakers and hands-on sessions. Go from curious to building, fast." },
  { icon: Users, title: "Belong", text: "A collaborative, inclusive community that meets every Wednesday and Thursday during Access Period in Room F-105." },
];

const REQUIREMENTS = [
  "Be an Emerald High School student",
  "Maintain good academic standing",
  "Maintain good behavioral standing",
  "Agree to uphold school policies",
  "Contribute positively to the club",
];

const STEPS = [
  { step: 1, title: "Fill Out the Form", text: "Complete our membership form with your interests and experience." },
  { step: 2, title: "Attend a Meeting", text: `Join us during Access Period on Wednesday or Thursday in ${CLUB.meetingRoom}.` },
  { step: 3, title: "Choose Your Branch", text: "Pick Hackathon, Data Science, or AI Principles / Programming — or explore all three." },
  { step: 4, title: "Start Building", text: "Jump into projects, challenges, and club activities with your branch." },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="join us"
        title={
          <>
            Build something <span className="text-gradient">real</span>.
          </>
        }
        subtitle="Whether you've never written a line of code or you're already shipping projects — there's a place for you at EHCC."
      />

      {/* Primary CTA — official form */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="container-x flex justify-center">
          <Button href={CLUB.joinFormUrl} external size="lg">
            Apply Now — Membership Form <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* Value props */}
      <section className="section">
        <div className="container-x grid gap-5 md:grid-cols-3">
          {VALUE_PROPS.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:border-emerald/30 hover:shadow-glow">
                <span className="inline-flex w-fit rounded-lg bg-emerald/10 p-3 text-emerald-bright">
                  <v.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-xl font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Requirements + how to join */}
      <section className="relative section pt-0">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative grid gap-12 lg:grid-cols-2">
          <Reveal from="right">
            <p className="font-mono text-sm text-emerald">{"// membership requirements"}</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Who can join</h2>
            <ul className="mt-6 space-y-3">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="flex items-center gap-3 text-muted">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal from="left">
            <p className="font-mono text-sm text-emerald">{"// how to join"}</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Four steps</h2>
            <div className="mt-6 space-y-4">
              {STEPS.map((s) => (
                <div
                  key={s.step}
                  className="flex gap-4 rounded-xl border border-white/5 bg-navy-800/50 p-4 transition-colors hover:border-emerald/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald/10 font-mono font-bold text-emerald-bright">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{s.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Meeting info */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-6 rounded-2xl border border-emerald/20 bg-navy-800/60 p-8 text-center sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <Calendar className="mb-2 h-7 w-7 text-emerald-bright" strokeWidth={1.8} />
                <p className="text-sm font-semibold text-emerald-bright">When</p>
                <p className="mt-1 text-white">{CLUB.meetingDays}</p>
                <p className="text-sm text-muted">{CLUB.meetingTime}</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="mb-2 h-7 w-7 text-emerald-bright" strokeWidth={1.8} />
                <p className="text-sm font-semibold text-emerald-bright">Where</p>
                <p className="mt-1 text-white">{CLUB.meetingRoom}</p>
                <p className="text-sm text-muted">{CLUB.school}</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="mb-2 h-7 w-7 text-emerald-bright" strokeWidth={1.8} />
                <p className="text-sm font-semibold text-emerald-bright">Who</p>
                <p className="mt-1 text-white">All EHS Students</p>
                <p className="text-sm text-muted">All skill levels welcome</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Membership form CTA */}
      <section className="relative section pt-0">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative max-w-2xl">
          <Reveal>
            <div className="rounded-2xl border border-emerald/20 bg-navy-800/60 p-8 text-center md:p-10">
              <p className="font-mono text-sm text-emerald">{"// ready when you are"}</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Fill out the membership form</h2>
              <p className="mx-auto mt-3 max-w-md text-muted">
                One short Google Form — your name, grade, and the branch you want to explore. We&apos;ll
                welcome you at the next meeting in {CLUB.meetingRoom}.
              </p>
              <Button href={CLUB.joinFormUrl} external size="lg" className="mt-6">
                Open the Membership Form <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x max-w-2xl">
          <SectionHeader eyebrow="questions" title="Frequently asked" />
          <Reveal className="mt-10">
            <FaqAccordion faqs={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
