"use client";
import { useEffect, useState } from "react";
import { CLUB, MEETING } from "@/content/site";

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

export default function Countdown() {
  const [now, setNow] = useState<Date | null>(null); // null on the server: no hydration mismatch
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const m = now && nextMeeting(now);
  const left = m && now ? Math.max(0, Math.floor(((m.live ? m.end : m.start.getTime()) - now.getTime()) / 1000)) : null;
  const units: [number | null, string][] = [
    [left === null ? null : Math.floor(left / 86400), "Days"],
    [left === null ? null : Math.floor(left / 3600) % 24, "Hrs"],
    [left === null ? null : Math.floor(left / 60) % 60, "Min"],
    [left === null ? null : left % 60, "Sec"],
  ];

  return (
    <div className="countdown">
      <div className="clap-stick" aria-hidden />
      <div className="count-body">
        <p className="mono" style={{ color: "var(--sun)" }}>
          {m?.live ? "● Rolling now · ends in" : "Next meeting"}
        </p>
        <p className="h3 mt-2">
          {m ? DAY[m.start.getDay()] : CLUB.meetingDays} · {CLUB.meetingTime}
        </p>
        <div className="digits" aria-hidden>
          {units.map(([v, label]) => (
            <div className="digit tick" key={label}>
              <b key={v ?? "-"}>{v === null ? "--" : pad(v)}</b>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <p className="mono" style={{ color: "var(--mint-200)" }}>
          {CLUB.meetingRoom} · {CLUB.school}
        </p>
      </div>
    </div>
  );
}
