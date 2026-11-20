import type { Metadata } from "next";
import { Catalog } from "@/components/course/Catalog";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "Browse all 20 EHIC courses across Python, the web, data, AI, security, and more.",
};

export default function CurriculumPage() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <p className="eyebrow">Curriculum</p>
          <h1 className="page-title !text-[clamp(40px,6vw,72px)]">Every course</h1>
          <p className="page-lede">
            Twenty tracks, from a first line of code to interview prep. Filter by topic or search, then sign up to start
          </p>
        </div>
        <Catalog />
      </div>
    </section>
  );
}
