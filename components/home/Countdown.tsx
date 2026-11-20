"use client";
// The next meeting, on a split-flap board. Each flap falls when its number changes, like a station departures board.
import { useEffect, useRef, useState } from "react";
import { CLUB, MEETING } from "@/content/site";

const FROM = new Date(`${MEETING.from}T00:00`).getTime();
const WEEK = 7 * 86_400_000;

function nextMeeting(now: Date) {
  for (let d = 0; d < 15; d++) {
    const t = new Date(now);
    t.setDate(now.getDate() + d);
    t.setHours(MEETING.hour, MEETING.minute, 0, 0);
    if (t.getDay() !== MEETING.day || Math.round((t.getTime() - FROM) / WEEK) % 2) continue; // off weeks skip
    const end = t.getTime() + MEETING.lengthMin * 60_000;
    if (end > now.getTime()) return { start: t, end, live: t <= now };
  }
  return null;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** One flap: the old top half falls, the new bottom half lands. */
function Flap({ value }: { value: string }) {
  const last = useRef(value);
  const [s, set] = useState({ cur: value, old: value, n: 0 });
  useEffect(() => {
    if (value === last.current) return;
    set((p) => ({ cur: value, old: last.current, n: p.n + 1 }));
    last.current = value;
  }, [value]);
  return (
    <span className="flap">
      <span className="flap-half flap-top">
        <span>{s.cur}</span>
      </span>
      <span className="flap-half flap-bot">
        <span>{s.old}</span>
      </span>
      {s.n > 0 && (
        <>
          <span key={`f${s.n}`} className="flap-half flap-top flap-fall">
            <span>{s.old}</span>
          </span>
          <span key={`l${s.n}`} className="flap-half flap-bot flap-land">
            <span>{s.cur}</span>
          </span>
        </>
      )}
    </span>
  );
}

export default function Countdown() {
  const [now, setNow] = useState<Date | null>(null); // null on the server: no hydration mismatch
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const m = now && nextMeeting(now);
  const left = m && now ? Math.max(0, Math.floor(((m.live ? m.end : m.start.getTime()) - now.getTime()) / 1000)) : null;
  const units: [string, string][] = [
    [left === null ? "--" : pad(Math.floor(left / 86400)), "Days"],
    [left === null ? "--" : pad(Math.floor(left / 3600) % 24), "Hours"],
    [left === null ? "--" : pad(Math.floor(left / 60) % 60), "Min"],
    [left === null ? "--" : pad(left % 60), "Sec"],
  ];
  const when = m
    ? m.start.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    : CLUB.meetingDays;

  return (
    <div className="flapboard">
      <i className="screw" aria-hidden />
      <i className="screw" aria-hidden />
      <i className="screw" aria-hidden />
      <i className="screw" aria-hidden />
      <p className="flap-label">
        {m?.live && <span className="live-dot" aria-hidden />}
        {m?.live ? "In session now · ends in" : "Next meeting"}
      </p>
      <p className="flap-when">
        {when} · {CLUB.meetingTime}
      </p>
      <div className="flaps" aria-hidden>
        {units.map(([v, label]) => (
          <div className="flap-unit" key={label}>
            <Flap value={v} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="flap-where">{CLUB.meetingRoom}</p>
    </div>
  );
}
