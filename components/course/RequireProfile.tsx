"use client";

import { Lock } from "lucide-react";
import { useProfile } from "./useProfile";
import { SignUpCard } from "./SignUpCard";

/** Gate: course content is only usable once a student profile exists. */
export function RequireProfile({ children }: { children: React.ReactNode }) {
  const { profile, loaded } = useProfile();

  if (!loaded) {
    return <div className="h-40 animate-pulse rounded-2xl border border-white/5 bg-navy-800/40" />;
  }
  if (profile) return <>{children}</>;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald/20 bg-emerald/5 px-4 py-3 text-sm text-silver">
        <Lock size={16} className="shrink-0 text-emerald-bright" />
        Sign up (free) to start this course, take the quizzes, and save your progress.
      </div>
      <SignUpCard heading="Sign up to start learning" />
    </div>
  );
}
