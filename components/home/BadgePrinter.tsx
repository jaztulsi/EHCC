"use client";
// The crew badge printer. Fill it in, it feeds out a badge (on whole frames, like the old stop-motion site),
// stamps it, and hands off to the official Google Form, which is the club's real sign-up list.
// Nothing typed here leaves the browser.
import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Pencil } from "lucide-react";
import { CLUB, INTERESTS } from "@/content/site";
import { confetti, prefersReducedMotion } from "@/lib/motion";
import { play } from "@/lib/sound";

type Errors = { name?: string; grade?: string };
type Badge = { name: string; grade: string; picks: string[]; year: number };

/** A barcode drawn from the name: same name, same bars. */
function Barcode({ seed }: { seed: string }) {
  const bars: [number, number][] = [];
  let x = 0;
  for (const ch of `*${seed.toUpperCase()}*`) {
    const c = ch.charCodeAt(0);
    for (let k = 0; k < 3; k++) {
      const w = 1 + ((c >> (k * 2)) & 1) + ((c >> k) & 1);
      bars.push([x, w]);
      x += w + 1 + ((c >> (k + 3)) & 1);
    }
  }
  return (
    <svg className="barcode" viewBox={`0 0 ${x} 24`} preserveAspectRatio="none" aria-hidden>
      {bars.map(([bx, w], i) => (
        <rect key={i} x={bx} y="0" width={w} height="24" />
      ))}
    </svg>
  );
}

export default function BadgePrinter() {
  const [errors, setErrors] = useState<Errors>({});
  const [badge, setBadge] = useState<Badge | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLHeadingElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") ?? "").trim();
    const grade = String(f.get("grade") ?? "");
    const errs: Errors = {};
    if (!name) errs.name = "Your name goes on the badge";
    if (!grade) errs.grade = "Pick your grade";
    setErrors(errs);
    if (errs.name || errs.grade) {
      play("error");
      const c = card.current!;
      c.classList.remove("shake");
      void c.offsetWidth;
      c.classList.add("shake");
      (form.querySelector<HTMLElement>(errs.name ? "#name" : "input[name=grade]"))?.focus();
      return;
    }
    play("print");
    setBadge({ name, grade, picks: f.getAll("interest").map(String), year: new Date().getFullYear() });
    const rm = prefersReducedMotion();
    // the feed takes 8 frames at 12 fps; the stamp lands on the frame after
    timers.current.push(
      setTimeout(
        () => {
          play("stamp");
          const b = card.current?.querySelector(".badge-card")?.getBoundingClientRect();
          if (b) confetti(b.left + b.width / 2, b.top + b.height * 0.4, 40);
          timers.current.push(setTimeout(() => play("success"), 220));
          done.current?.focus({ preventScroll: true });
        },
        rm ? 0 : 760
      )
    );
  };

  return (
    <div ref={card} className="printer-card" onAnimationEnd={(e) => e.currentTarget.classList.remove("shake")}>
      {badge ? (
        <div className="printed">
          <div className="printer-mouth" aria-hidden />
          <div className="badge-feed">
            <article className="badge-card" aria-label={`Crew badge for ${badge.name}`}>
              <span className="badge-slot" aria-hidden />
              <div className="badge-band">
                <Image src="/logo-mark.png" alt="" width={22} height={22} />
                <span>EHIC</span>
                <span className="badge-band-r">Crew</span>
              </div>
              <div className="badge-body">
                <p className="badge-name">{badge.name}</p>
                <p className="badge-grade">Grade {badge.grade}</p>
                {badge.picks.length > 0 && (
                  <ul className="badge-picks">
                    {badge.picks.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                <div className="badge-foot">
                  <Barcode seed={badge.name} />
                  <span>Since {badge.year}</span>
                </div>
              </div>
              <span className="stamp" aria-hidden>
                G-225
                <small>approved</small>
              </span>
            </article>
          </div>
          <h3 ref={done} tabIndex={-1} className="h3 printed-h">
            One more step, {badge.name.split(" ")[0]}
          </h3>
          <p className="printed-p">
            This badge only lives in your browser. Make it official on the club form, then come by {CLUB.meetingRoom}.
          </p>
          <div className="printed-ctas">
            <a className="btn btn-primary btn-lg" href={CLUB.joinFormUrl} target="_blank" rel="noopener noreferrer">
              Finish the official form <ArrowUpRight aria-hidden />
            </a>
            <button type="button" className="btn btn-secondary btn-lg" onClick={() => setBadge(null)}>
              <Pencil aria-hidden /> Edit badge
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <p className="printer-step">Crew badge · step 1 of 2</p>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby="name-err"
              placeholder="Ada Lovelace"
            />
            <p id="name-err" className="err">
              {errors.name}
            </p>
          </div>
          <fieldset className="field">
            <legend>Grade</legend>
            <div className="segments" role="radiogroup" aria-describedby="grade-err">
              {["9", "10", "11", "12"].map((g) => (
                <label key={g}>
                  <input type="radio" name="grade" value={g} aria-invalid={!!errors.grade} />
                  <span>{g}</span>
                </label>
              ))}
            </div>
            <p id="grade-err" className="err">
              {errors.grade}
            </p>
          </fieldset>
          <fieldset className="field">
            <legend>
              What do you want to build? <span className="optional">Optional</span>
            </legend>
            <div className="chips">
              {INTERESTS.map((it) => (
                <label key={it} className="chip">
                  <input type="checkbox" name="interest" value={it} />
                  <span>
                    <Check aria-hidden strokeWidth={2} />
                    {it}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary btn-lg" data-sfx="none">
            Print my badge
          </button>
        </form>
      )}
    </div>
  );
}
