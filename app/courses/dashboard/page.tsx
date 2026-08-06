import type { Metadata } from "next";
import { RequireProfile } from "@/components/course/RequireProfile";
import { Dashboard } from "@/components/course/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your EHCC Academy dashboard — progress, courses in progress, and certificates.",
};

export default function DashboardPage() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <RequireProfile>
          <Dashboard />
        </RequireProfile>
      </div>
    </section>
  );
}
