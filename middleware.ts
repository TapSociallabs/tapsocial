import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/dashboard") &&
    !req.cookies.get("sb-access-token")
  ) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }
  return NextResponse.next();
}
