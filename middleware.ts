import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// On the ehic-courses.* domain, open straight to the course platform.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (/^(ehic|hic|ehcc)-courses/.test(host) && req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/courses";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: "/" };
