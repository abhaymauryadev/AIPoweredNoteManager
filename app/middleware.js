import { NextResponse } from "next/server";



/**
 * Routes that require authentication
 */
const protectedRoutes = ["/dashboard", "/notes", "/settings"];

/**
 * Routes that should NOT be accessible when logged in
 */
const authRoutes = ["/login", "/register"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Example: auth token stored in cookies
  const token = request.cookies.get("token")?.value;

  // 🔒 Protect private routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  // 🚫 Prevent logged-in users from visiting auth pages
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

/**
 * Apply middleware only to selected paths
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/notes/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
