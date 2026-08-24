import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/notes", "/settings", "/folders", "/tags", "/trash", "/summaries", "/notebooks", "/search"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (authRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/notes/:path*",
    "/settings/:path*",
    "/folders/:path*",
    "/tags/:path*",
    "/trash/:path*",
    "/summaries/:path*",
    "/notebooks/:path*",
    "/search/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
