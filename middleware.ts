import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

const { auth: authMiddleware } = NextAuth(authConfig);

export default authMiddleware(async (req) => {
  const { auth: session, nextUrl } = req;

  const isLoggedIn = !!session;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const currentRoute = req.headers.get("referer");
      if (currentRoute) {
        return Response.redirect(new URL(currentRoute));
      }
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callback = nextUrl.pathname;
    if (nextUrl.search) {
      callback += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callback);
    return Response.redirect(
      new URL(`/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // check if route is AuthRoute

  // check if is protected route

  //  check if is public route

  // Allow signed out users to access the specified routes:
  // publicRoutes: ['/anyone-can-visit-this-route'],
  // publicRoutes: ["/", "/api/webhooks/clerk"],
  // afterAuth(auth, req) {
  //   if (auth.userId && auth.isPublicRoute) {
  //     let path = "/select-org";

  //     if (auth.orgId) {
  //       path = `/organization/${auth.orgId}`;
  //     }

  //     const orgSelection = new URL(path, req.url);

  //     return NextResponse.redirect(orgSelection);
  //   }

  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }

  //   if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
  //     const orgSelection = new URL("/select-org", req.url);
  //     return NextResponse.redirect(orgSelection);
  //   }
  // },
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
