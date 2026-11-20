"use client";

import { useProfile } from "./useProfile";
import { SignUpCard } from "./SignUpCard";

/** Gate: course content is only usable once a student profile exists. */
export function RequireProfile({ children }: { children: React.ReactNode }) {
  const { profile, loaded } = useProfile();

  if (!loaded) {
    return <div className="h-40 rounded-card bg-raised" aria-hidden />;
  }
  if (profile) return <>{children}</>;

  return (
    <SignUpCard
      eyebrow="Profile needed"
      heading="Create a profile to start"
      blurb="Lessons, quizzes and saved progress need a profile. It's free, takes a name and an email, and stays in this browser."
    />
  );
}
