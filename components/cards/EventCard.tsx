import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge, toneFor } from "@/components/ui/Badge";
import type { ClubEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate(),
    full: d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" }),
  };
}

export function EventCard({ event, featured = false }: { event: ClubEvent; featured?: boolean }) {
  const date = formatDate(event.date);
  return (
    <article
      className={cn(
        "group relative flex gap-4 rounded-xl border border-white/5 bg-navy-800/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-glow",
        featured && "border-emerald/30 bg-navy-800 shadow-glow"
      )}
    >
      {/* Date badge */}
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg border border-emerald/20 bg-navy-900 text-center">
        <span className="font-mono text-[10px] font-semibold tracking-wider text-emerald">{date.month}</span>
        <span className="font-mono text-2xl font-bold leading-none text-white">{date.day}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone={toneFor(event.type)}>{event.type}</Badge>
          {event.upcoming ? (
            <Badge tone="navy" mono>upcoming</Badge>
          ) : (
            <Badge tone="navy" mono>past</Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-emerald-bright">
          {event.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{event.description}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} className="text-emerald/70" /> {date.full}
          </span>
          {event.time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-emerald/70" /> {event.time}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} className="text-emerald/70" /> {event.location}
          </span>
        </div>
      </div>
    </article>
  );
}
