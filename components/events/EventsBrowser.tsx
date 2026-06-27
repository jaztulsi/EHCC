"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventCard } from "@/components/cards/EventCard";
import { cn } from "@/lib/utils";
import type { ClubEvent } from "@/lib/types";

const FILTERS = ["All", "Upcoming", "Hackathon", "Workshop", "Guest Speaker"] as const;
type Filter = (typeof FILTERS)[number];

export function EventsBrowser({ events }: { events: ClubEvent[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = events.filter((e) => {
    if (filter === "All") return true;
    if (filter === "Upcoming") return e.upcoming;
    return e.type === filter;
  });

  return (
    <div>
      {/* Tab filter */}
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
                layoutId="event-filter-pill"
                className="absolute inset-0 rounded-full bg-emerald shadow-glow"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((e) => (
            <motion.div
              key={e.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <EventCard event={e} featured={e.featured} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center font-mono text-sm text-muted">
          {"// no events match this filter — check back soon"}
        </p>
      )}
    </div>
  );
}
