"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/types";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "AI/ML", "Web Dev", "Cybersecurity", "Data Science", "Other"];

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f ? "text-navy-950" : "text-muted hover:text-silver"
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-full bg-emerald shadow-glow"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
