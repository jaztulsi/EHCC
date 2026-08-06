import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// On the ehcc-courses.* domain, open straight to the course platform.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("ehcc-courses") && req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/courses";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: "/" };
