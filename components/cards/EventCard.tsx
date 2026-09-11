import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react";
import { Badge, toneFor } from "@/components/ui/Badge";
import type { ClubEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate(),
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    full: d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}

/**
 * Each event type gets its own accent so a list of events reads as a set of
 * distinct things rather than one repeated card.
 */
const ACCENTS: Record<string, { rail: string; tint: string; ink: string }> = {
  Hackathon: { rail: "bg-emerald", tint: "bg-emerald/[0.07]", ink: "text-emerald" },
  Workshop: { rail: "bg-lagoon", tint: "bg-lagoon/[0.07]", ink: "text-lagoon" },
  Competition: { rail: "bg-clay", tint: "bg-clay/[0.08]", ink: "text-clay" },
  "Guest Speaker": { rail: "bg-iris", tint: "bg-iris/[0.07]", ink: "text-iris" },
  Social: { rail: "bg-clay", tint: "bg-clay/[0.07]", ink: "text-clay" },
};

function accentFor(type: string) {
  return ACCENTS[type] ?? { rail: "bg-emerald", tint: "bg-emerald/[0.07]", ink: "text-emerald" };
}

/** Date block, shared by every variant. */
function DateBlock({
  date,
  accent,
  large = false,
}: {
  date: ReturnType<typeof formatDate>;
  accent: ReturnType<typeof accentFor>;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center justify-center rounded-card border border-line text-center",
        accent.tint,
        large ? "h-20 w-20" : "h-16 w-16"
      )}
    >
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-[0.14em]",
          accent.ink
        )}
      >
        {date.month}
      </span>
      <span
        className={cn(
          "font-semibold leading-none tracking-title text-silver",
          large ? "text-3xl" : "text-2xl"
        )}
      >
        {date.day}
      </span>
    </div>
  );
}

/**
 * Featured event. Wide, quieter type, a coloured rail down the left edge and a
 * light sweep on hover. Used for the next event on the calendar.
 */
export function FeaturedEventCard({ event }: { event: ClubEvent }) {
  const date = formatDate(event.date);
  const accent = accentFor(event.type);

  return (
    <article className="surface card-lift sheen group relative flex flex-col overflow-hidden md:flex-row">
      <span className={cn("h-1 w-full md:h-auto md:w-1.5", accent.rail)} aria-hidden="true" />

      <div className="flex flex-1 flex-col gap-6 p-7 md:flex-row md:items-start md:p-9">
        <DateBlock date={date} accent={accent} large />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={toneFor(event.type)}>{event.type}</Badge>
            <span className="text-xs font-medium text-muted">{date.weekday}</span>
          </div>

          <h3 className="mt-3 text-2xl font-semibold tracking-title text-silver md:text-[1.75rem]">
            {event.title}
          </h3>
          <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted">
            {event.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} className={accent.ink} /> {date.full}
            </span>
            {event.time && (
              <span className="inline-flex items-center gap-2">
                <Clock size={14} className={accent.ink} /> {event.time}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className={accent.ink} /> {event.location}
            </span>
          </div>
        </div>

        <ArrowUpRight
          size={20}
          className="hidden shrink-0 text-muted transition-transform duration-500 ease-apple group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald md:block"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

/** Compact row. Used for dense past-event lists. */
export function CompactEventCard({ event }: { event: ClubEvent }) {
  const date = formatDate(event.date);
  const accent = accentFor(event.type);

  return (
    <article className="group flex items-center gap-4 border-b border-line py-4 last:border-b-0">
      <span className={cn("h-9 w-1 shrink-0 rounded-full", accent.rail)} aria-hidden="true" />
      <div className="w-14 shrink-0">
        <p className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", accent.ink)}>
          {date.month}
        </p>
        <p className="text-lg font-semibold leading-none text-silver">{date.day}</p>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-semibold text-silver transition-colors group-hover:text-emerald">
          {event.title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-muted">
          {event.type} · {event.location}
        </p>
      </div>
    </article>
  );
}

/** Standard grid card. */
export function EventCard({
  event,
  featured = false,
}: {
  event: ClubEvent;
  featured?: boolean;
}) {
  if (featured) return <FeaturedEventCard event={event} />;

  const date = formatDate(event.date);
  const accent = accentFor(event.type);

  return (
    <article className="surface card-lift group relative flex h-full flex-col overflow-hidden">
      <span className={cn("h-1 w-full", accent.rail)} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-4">
          <DateBlock date={date} accent={accent} />
          <div className="min-w-0 flex-1">
            <Badge tone={toneFor(event.type)}>{event.type}</Badge>
            <h3 className="mt-2.5 text-lg font-semibold leading-snug tracking-title text-silver transition-colors group-hover:text-emerald">
              {event.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{event.description}</p>

        <div className="mt-5 space-y-1.5 border-t border-line pt-4 text-xs text-muted">
          {event.time && (
            <span className="flex items-center gap-2">
              <Clock size={13} className={accent.ink} /> {event.time}
            </span>
          )}
          <span className="flex items-center gap-2">
            <MapPin size={13} className={accent.ink} /> {event.location}
          </span>
        </div>
      </div>
    </article>
  );
}
