import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import { apiAuthPrefix, authPrefix, authRoutes, publicRoutes } from "./routes";

const { auth: authMiddleware } = NextAuth(authConfig);

export default authMiddleware(async (req) => {
  const { auth: session, nextUrl } = req;

  const isLoggedIn = !!session?.user;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAuthPrefix = nextUrl.pathname.startsWith(authPrefix);

  // 1. Bypass API routes from authentication logic
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthPrefix) {
    return NextResponse.next();
  }

  // 3. Handle Auth Routes (like sign in/sign up) when user is already logged in
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect to referer or home after sign-in
      const referer = req.headers.get("referer") || "/";
      return NextResponse.redirect(new URL(referer, nextUrl));
    }
    return NextResponse.next(); // Allow access to sign-in page
  }

  // 4. Redirect to sign-in if user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // 5. Allow access to public routes and protected routes if logged in
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Exclude static files and Next.js internals
    "/(api|trpc)(.*)", // Include API routes
  ],
};
