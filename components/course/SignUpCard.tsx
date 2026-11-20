"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";
import { useProfile } from "./useProfile";

/** Local profile sign-up: a name and an email, no password, no backend. */
export function SignUpCard({
  eyebrow = "Free profile",
  heading = "Create your profile",
  blurb = "A profile unlocks the lessons and quizzes, remembers where you stopped and collects your certificates. It takes a name and an email.",
  className,
}: {
  eyebrow?: string;
  heading?: string;
  blurb?: string;
  className?: string;
}) {
  const { signIn } = useProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [created, setCreated] = useState(false);
  const id = useId();
  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email);

  // Each useProfile() keeps its own copy of the profile, so the nav and the page around this card
  // only see the new profile after a reload. The save runs in an effect before this one.
  useEffect(() => {
    if (!created) return;
    const t = window.setTimeout(() => window.location.reload(), 450);
    return () => window.clearTimeout(t);
  }, [created]);

  return (
    <div
      className={cn(
        "grid gap-8 surface p-6 shadow-[var(--shadow-sm)] md:grid-cols-2 md:gap-12 md:p-10",
        className
      )}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-[28px] font-medium leading-[1.15] tracking-title text-ink">{heading}</h2>
        <p className="mt-3 max-w-md text-base leading-7 text-ink-2">{blurb}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid || created) return;
          signIn(name, email);
          play("success");
          setCreated(true);
        }}
        className="grid gap-4"
      >
        <div className="grid gap-2">
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-ink-2">
            Name
          </label>
          <input
            id={`${id}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Maya Chen"
            className="input"
            required
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink-2">
            Email
          </label>
          <input
            id={`${id}-email`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            placeholder="you@school.edu"
            className="input"
            required
          />
        </div>
        <Button type="submit" disabled={!valid || created} data-sfx="none" className="mt-2 w-full">
          {created ? (
            <>
              <Check strokeWidth={1.5} aria-hidden /> Profile created
            </>
          ) : (
            <>
              Create profile <ArrowRight strokeWidth={1.5} aria-hidden />
            </>
          )}
        </Button>
        <p className="flex items-center gap-2 text-[13px] leading-5 text-ink-3">
          <Lock size={16} strokeWidth={1.5} className="shrink-0" aria-hidden />
          Saved in this browser only. No password, nothing sent anywhere.
        </p>
      </form>
    </div>
  );
}
