import { headers } from "next/headers";
import { CoursesNav } from "@/components/course/CoursesNav";

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  // On the ehic-courses.* domain the courses nav is the only nav → make it sticky.
  const host = headers().get("host") ?? "";
  const standalone = /^(ehic|hic|ehcc)-courses/.test(host);

  return (
    <div className="min-h-screen pt-5">
      <CoursesNav standalone={standalone} />
      {children}
    </div>
  );
}
