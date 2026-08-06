"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import { Badge, toneFor } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { COURSES, TOPICS, COURSE_COUNT } from "@/lib/courses";
import { cn } from "@/lib/utils";
import { useProgress } from "./useProgress";
import { useProfile } from "./useProfile";

export function Catalog() {
  const { courseProgress, loaded } = useProgress();
  const { profile } = useProfile();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");

  const filtered = COURSES.filter((c) => {
    const okTopic = topic === "All" || c.topic === topic;
    const okQuery =
      !query || (c.title + " " + c.description + " " + c.topic).toLowerCase().includes(query.toLowerCase());
    return okTopic && okQuery;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">
          Course catalog <span className="font-mono text-base text-muted">({COURSE_COUNT})</span>
        </h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses…"
            className="w-56 rounded-lg border border-white/10 bg-navy-950 py-2.5 pl-9 pr-4 text-sm text-silver outline-none transition-colors placeholder:text-muted/60 focus:border-emerald/50"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["All", ...TOPICS].map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              topic === t
                ? "border-emerald bg-emerald/10 text-emerald-bright"
                : "border-white/10 text-muted hover:border-white/25"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const p = courseProgress(c.id);
          return (
            <Link
              key={c.id}
              href={`/courses/${c.id}`}
              className="group flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex rounded-xl bg-emerald/10 p-3 text-emerald-bright">
                  <Icon name={c.icon} className="h-7 w-7" />
                </span>
                <Badge tone={toneFor(c.difficulty)} mono>
                  {c.difficulty}
                </Badge>
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-xl font-bold text-white">
                {c.title}
                {loaded && p.complete && <CheckCircle2 size={16} className="text-emerald" />}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>

              <div className="mt-4 flex items-center gap-3">
                <Badge tone="navy" mono>{c.topic}</Badge>
                <span className="font-mono text-xs text-muted">{c.lessons.length} lessons</span>
              </div>

              {loaded && profile && p.done > 0 && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy-950">
                  <div className="h-full rounded-full bg-emerald" style={{ width: `${p.pct}%` }} />
                </div>
              )}
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-emerald/70 transition-colors group-hover:text-emerald-bright">
                {p.done > 0 ? "Continue" : "View course"} <ArrowRight size={13} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
