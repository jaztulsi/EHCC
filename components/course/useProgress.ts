"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";

/** Lesson-completion progress, persisted in localStorage (no backend). */
export function useProgress() {
  const [done, setDone, loaded] = useLocalStorage<string[]>("ehcc-course-progress", []);
  const has = (id: string) => done.includes(id);
  const toggle = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
  const reset = () => setDone([]);
  return { done, has, toggle, reset, loaded };
}
