import type { Metadata } from "next";
import { Catalog } from "@/components/course/Catalog";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "Browse all 20 EHCC Academy courses across Python, the web, data, AI, security, and more.",
};

export default function CurriculumPage() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <p className="font-mono text-sm text-emerald">{"// curriculum"}</p>
          <h1 className="mt-1 text-3xl font-bold text-white md:text-4xl">Every course</h1>
          <p className="mt-2 max-w-xl text-muted">
            Twenty tracks, from first line of code to interview prep. Filter by topic or search, then
            sign up to start.
          </p>
        </div>
        <Catalog />
      </div>
    </section>
  );
}
