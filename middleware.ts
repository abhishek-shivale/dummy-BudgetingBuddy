import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname.startsWith("/auth/signin") ||
      url.pathname.startsWith("/auth/newUser") ||
      url.pathname.startsWith("/") ||
      url.pathname.startsWith("/auth/verify"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/auth/signin",
    "/auth/newUser",
    "/dashboard/:path*",
    "/verify/:path*",
  ],
};
