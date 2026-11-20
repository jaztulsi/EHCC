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
        <h2 className="text-2xl font-bold text-ink">
          Course catalog <span className="font-mono text-base font-medium text-ink-3">{COURSE_COUNT}</span>
        </h2>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-ink-2" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses"
            className="input w-64 !min-h-[44px] !py-2 !pl-10 text-sm"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["All", ...TOPICS].map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={cn(
              "rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-semibold transition-colors",
              topic === t
                ? "bg-ink text-paper"
                : "bg-card text-ink hover:bg-mint"
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
              className="group flex h-full flex-col surface p-6 card-lift"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex rounded-[10px] border-2 border-ink bg-mint p-3 text-ink">
                  <Icon name={c.icon} className="h-6 w-6" strokeWidth={2} />
                </span>
                <Badge tone={toneFor(c.difficulty)} mono>
                  {c.difficulty}
                </Badge>
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-xl font-bold text-ink">
                {c.title}
                {loaded && p.complete && <CheckCircle2 size={18} className="text-accent" />}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-2">{c.description}</p>

              <div className="mt-4 flex items-center gap-3">
                <Badge tone="navy" mono>{c.topic}</Badge>
                <span className="font-mono text-xs text-ink-2">{c.lessons.length} lessons</span>
              </div>

              {loaded && profile && p.done > 0 && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-raised">
                  <div className="h-full rounded-full bg-emerald" style={{ width: `${p.pct}%` }} />
                </div>
              )}
              <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-bold text-ink underline decoration-2 underline-offset-4">
                {p.done > 0 ? "Continue" : "View course"} <ArrowRight size={13} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
