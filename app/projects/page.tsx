import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects built by the Emerald Hacking & Coding Club across our three branches: Hackathon, Data Science, and AI Principles / Programming.",
};

export default function ProjectsPage() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <>
      <PageHero
        eyebrow="projects"
        title={
          <>
            Built by <span className="text-gradient">our branches</span>.
          </>
        }
        subtitle="Real work from EHCC members across Hackathon, Data Science, and AI Principles / Programming — with more shipping every semester."
      />

      {/* Featured / pinned */}
      <section className="section">
        <div className="container-x">
          <SectionHeader align="left" eyebrow="pinned" title="Featured projects" />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} large />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* All projects with filter */}
      <section className="relative section pt-0">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative">
          <SectionHeader align="left" eyebrow="explore" title="All projects" subtitle="Filter by category to find work that matches your interests." />
          <div className="mt-8">
            <ProjectsBrowser projects={PROJECTS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald/20 bg-navy-800/60 p-10 text-center">
              <p className="font-mono text-sm text-emerald">{"// your project here"}</p>
              <h3 className="text-2xl font-bold text-white md:text-3xl">Start your own project</h3>
              <p className="max-w-md text-muted">
                Got an idea? We&apos;ll help you build it — find teammates, mentorship, and a stage to demo.
              </p>
              <Button href="/join" size="lg" className="mt-2">
                Pitch your idea <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
