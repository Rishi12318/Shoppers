import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/shop/:path*", "/tailor/:path*"],
};

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}
