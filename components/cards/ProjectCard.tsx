import { Github, ExternalLink, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryTone = {
  "AI/ML": "violet",
  "Web Dev": "blue",
  Cybersecurity: "rose",
  "Data Science": "amber",
  Other: "navy",
} as const;

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow-md",
        large && "md:p-8"
      )}
    >
      {project.featured && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-bright">
          <Star size={11} className="fill-emerald-bright" /> FEATURED
        </span>
      )}
      <div className="mb-3 flex items-center gap-2">
        <Badge tone={categoryTone[project.category]}>{project.category}</Badge>
      </div>
      <h3 className={cn("font-bold text-white transition-colors group-hover:text-emerald-bright", large ? "text-2xl" : "text-xl")}>
        {project.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
        <Users size={13} className="text-emerald/70" />
        <span>{project.members.join(", ")}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded border border-emerald/20 bg-emerald/5 px-2 py-0.5 font-mono text-[11px] text-emerald-bright">
            {t}
          </span>
        ))}
      </div>

      {(project.github || project.demo) && (
        <div className="mt-5 flex gap-2 border-t border-white/5 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-silver transition-colors hover:border-emerald/40 hover:text-emerald-bright"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald/30 bg-emerald/10 px-3 py-1.5 text-xs font-medium text-emerald-bright transition-colors hover:bg-emerald/20"
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}
