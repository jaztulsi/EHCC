"use client";

import { useState } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useProfile } from "./useProfile";

/** Reusable local-profile sign-up form (name + email; no password, no backend). */
export function SignUpCard({
  heading = "Create your student profile",
  blurb = "Sign up to unlock the courses, track progress, resume lessons, and earn certificates. It's free — your profile is saved to this browser.",
}: {
  heading?: string;
  blurb?: string;
}) {
  const { signIn } = useProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email);

  return (
    <div className="rounded-2xl border border-emerald/20 bg-navy-800/60 p-6 md:p-8">
      <div className="flex items-center gap-2">
        <GraduationCap className="text-emerald-bright" size={22} />
        <h2 className="text-2xl font-bold text-white">{heading}</h2>
      </div>
      <p className="mt-2 max-w-lg text-muted">{blurb}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) signIn(name, email);
        }}
        className="mt-6 grid gap-4 sm:grid-cols-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputCls}
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@school.edu"
          className={inputCls}
          required
        />
        <button
          type="submit"
          disabled={!valid}
          className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-lg bg-emerald px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-emerald-bright disabled:opacity-50 sm:col-span-2"
        >
          Start learning <ArrowRight size={17} />
        </button>
      </form>
      <p className="mt-3 font-mono text-xs text-muted">
        {"// profile + progress are stored in your browser only"}
      </p>
    </div>
  );
}

const inputCls =
  "rounded-lg border border-white/10 bg-navy-950 px-4 py-2.5 text-sm text-silver outline-none transition-colors placeholder:text-muted/60 focus:border-emerald/50";
