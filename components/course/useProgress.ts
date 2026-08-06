"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import { COURSES } from "@/lib/courses";

const key = (courseId: string, lessonId: string) => `${courseId}:${lessonId}`;

/** Lesson-completion progress, persisted in localStorage (keyed by course:lesson). */
export function useProgress() {
  const [done, setDone, loaded] = useLocalStorage<string[]>("ehcc-course-progress", []);

  const isDone = (c: string, l: string) => done.includes(key(c, l));
  const complete = (c: string, l: string) =>
    setDone((d) => (d.includes(key(c, l)) ? d : [...d, key(c, l)]));
  const reset = () => setDone([]);

  const courseProgress = (courseId: string) => {
    const course = COURSES.find((c) => c.id === courseId);
    const total = course?.lessons.length ?? 0;
    const doneN = course ? course.lessons.filter((l) => done.includes(key(courseId, l.id))).length : 0;
    return { done: doneN, total, pct: total ? Math.round((doneN / total) * 100) : 0, complete: total > 0 && doneN === total };
  };

  return { done, isDone, complete, reset, courseProgress, totalDone: done.length, loaded };
}
