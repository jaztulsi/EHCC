import type { Metadata } from "next";
import { CoursesHome } from "@/components/course/CoursesHome";

export const metadata: Metadata = {
  title: "EHCC Academy",
  description:
    "EHCC Academy — 20 student-built courses with reading, videos, and quizzes. Sign up free to track progress, resume lessons, and earn certificates.",
};

export default function CoursesPage() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <CoursesHome />
      </div>
    </section>
  );
}
