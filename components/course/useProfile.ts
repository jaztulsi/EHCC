"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";

export interface Profile {
  name: string;
  email: string;
  joined: string; // ISO date
}

/** Local student profile — name + email in the browser, no password, no backend. */
export function useProfile() {
  const [profile, setProfile, loaded] = useLocalStorage<Profile | null>("ehcc-profile", null);
  const signIn = (name: string, email: string) =>
    setProfile({ name: name.trim(), email: email.trim(), joined: new Date().toISOString() });
  const signOut = () => setProfile(null);
  return { profile, signIn, signOut, loaded };
}
