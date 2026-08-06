import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { CourseBrowser } from "@/components/course/CourseBrowser";
import { COURSE, UNITS, LESSON_COUNT, ALL_LESSONS } from "@/lib/course";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "EHCC Coding Foundations — a student-built curriculum. Structured units and lessons that take you from zero to shipping, with curated video sources and browser progress tracking.",
};

const STATS = [
  { value: String(UNITS.length), label: "Curriculum Units" },
  { value: String(LESSON_COUNT), label: "Lessons Live" },
  { value: COURSE.primaryLanguage, label: "Primary Language" },
  { value: COURSE.focus, label: "Focus Areas" },
];

export default function CoursesPage() {
  const first = ALL_LESSONS[0];
  return (
    <>
      <PageHero
        eyebrow="master coding"
        title={
          <>
            Learn by <span className="text-gradient">building</span>.
          </>
        }
        subtitle={COURSE.tagline}
      />

      {/* Telemetry-style stats + primary CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="container-x">
          <div className="grid gap-4 rounded-2xl border border-white/5 bg-navy-800/50 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono text-3xl font-bold text-emerald-bright">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
          {first && (
            <div className="mt-6 flex justify-center">
              <Button href={`/courses/${first.id}`} size="lg">
                Begin Unit 1 <ArrowRight size={18} />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Curriculum + progress */}
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow={COURSE.eyebrow}
            title="Structured units. One clear path."
            subtitle="Follow the sequence, or jump to the topic your branch needs. Progress saves to your browser."
          />
          <Reveal className="mt-12">
            <CourseBrowser />
          </Reveal>
        </div>
      </section>
    </>
  );
}
