import { headers } from "next/headers";
import { CoursesNav } from "@/components/course/CoursesNav";

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  // On the ehcc-courses.* domain the courses nav is the only nav → make it sticky.
  const host = headers().get("host") ?? "";
  const standalone = host.startsWith("ehcc-courses");

  return (
    <div className="min-h-screen">
      <CoursesNav standalone={standalone} />
      {children}
    </div>
  );
}
