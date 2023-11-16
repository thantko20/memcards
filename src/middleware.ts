import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect("/app");
  }
  return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.png).*)"]
};
