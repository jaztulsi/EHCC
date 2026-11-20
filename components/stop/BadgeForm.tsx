"use client";
// Print a crew badge, then finish on the official Google Form (the club's real sign-up list).
// Nothing typed here leaves the browser.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CLUB, INTERESTS } from "@/content/site";
import { confetti } from "@/lib/motion";

type Errors = { name?: string; grade?: string };

export default function BadgeForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [badge, setBadge] = useState<null | { name: string; grade: string; picks: string[] }>(null);
  const card = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (badge) done.current?.focus();
  }, [badge]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") ?? "").trim();
    const grade = String(f.get("grade") ?? "");
    const errs: Errors = {};
    if (!name) errs.name = "Your name goes on the badge.";
    if (!grade) errs.grade = "Pick your grade.";
    setErrors(errs);
    if (errs.name || errs.grade) {
      const c = card.current!;
      c.classList.remove("shake");
      void c.offsetWidth;
      c.classList.add("shake");
      (form.elements.namedItem(errs.name ? "name" : "grade") as HTMLElement).focus();
      return;
    }
    const r = (e.nativeEvent as SubmitEvent).submitter?.getBoundingClientRect();
    confetti(r ? r.left + r.width / 2 : innerWidth / 2, r ? r.top : innerHeight / 2, 48);
    setBadge({ name, grade, picks: f.getAll("interest").map(String) });
  };

  return (
    <div ref={card} className="form-card" onAnimationEnd={(e) => e.currentTarget.classList.remove("shake")}>
      <span className="tape" aria-hidden />
      <span className="tape" aria-hidden />
      {badge ? (
        <div className="badge badge-in">
          <p className="mono">Badge printed</p>
          <div className="badge-card">
            <div className="hole" aria-hidden />
            <p className="mono">EHIC · Crew</p>
            <b>{badge.name}</b>
            <p className="mono mt-3">
              Grade {badge.grade}
              {badge.picks.length > 0 && ` · ${badge.picks.join(" / ")}`}
            </p>
          </div>
          <h3 ref={done} tabIndex={-1} className="h3">
            One more step, {badge.name.split(" ")[0]}.
          </h3>
          <p className="mx-auto mb-6 mt-3 max-w-[36ch]">
            This badge only lives in your browser. Make it official on the club form, then come by {CLUB.meetingRoom}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="btn btn-coral" href={CLUB.joinFormUrl} target="_blank" rel="noopener noreferrer">
              Finish on the official form ↗
            </a>
            <button type="button" className="btn btn-paper" onClick={() => setBadge(null)}>
              Edit badge
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <p className="mono mb-5">Crew badge · Step 1 of 2</p>
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
          <div className="field">
            <label htmlFor="grade">Grade</label>
            <select id="grade" name="grade" defaultValue="" aria-invalid={!!errors.grade} aria-describedby="grade-err">
              <option value="" disabled>
                Pick one
              </option>
              {["9", "10", "11", "12"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
            <p id="grade-err" className="err">
              {errors.grade}
            </p>
          </div>
          <fieldset className="field">
            <legend className="mb-2">What do you want to build? (optional)</legend>
            <div className="toggles">
              {INTERESTS.map((it, i) => (
                <label key={it} className="toggle" style={{ "--tilt": `${[-1.5, 1, -0.5, 1.5, -1, 0.5][i]}deg` } as React.CSSProperties}>
                  <input type="checkbox" name="interest" value={it} />
                  <span>{it}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="btn btn-coral mt-2">
            Print my badge
          </button>
        </form>
      )}
    </div>
  );
}
