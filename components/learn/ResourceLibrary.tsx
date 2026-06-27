"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Video, Wrench, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/types";

const CATEGORY_ICON = {
  Tutorial: BookOpen,
  Docs: FileText,
  Video: Video,
  Tool: Wrench,
} as const;

export function ResourceLibrary({ resources }: { resources: Resource[] }) {
  const topics = ["All", ...Array.from(new Set(resources.map((r) => r.topic)))];
  const [topic, setTopic] = useState("All");
  const filtered = topic === "All" ? resources : resources.filter((r) => r.topic === topic);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
              topic === t
                ? "border-emerald/50 bg-emerald/10 text-emerald-bright"
                : "border-white/10 text-muted hover:border-white/20 hover:text-silver"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => {
            const CatIcon = CATEGORY_ICON[r.category];
            return (
              <motion.a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col rounded-xl border border-white/5 bg-navy-800/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-glow"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-navy-900/80 px-2 py-1 text-xs text-emerald-bright">
                    <CatIcon size={13} /> {r.category}
                  </span>
                  <ExternalLink size={14} className="text-muted transition-colors group-hover:text-emerald-bright" />
                </div>
                <h3 className="font-semibold text-white transition-colors group-hover:text-emerald-bright">
                  {r.title}
                </h3>
                <p className="mt-1 flex-1 text-sm text-muted">{r.description}</p>
                <span className="mt-3 font-mono text-[11px] text-emerald/60">#{r.topic.toLowerCase().replace(/[^a-z]/g, "")}</span>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
