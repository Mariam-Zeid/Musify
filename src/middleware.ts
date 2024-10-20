import { currentUser } from './server/currentUser';
import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = await currentUser()
  const currentUserRole = user?.role

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.endsWith(route)
  );

  const isPublicRoute =
    (publicRoutes.includes(nextUrl.pathname) ||
      publicRoutes.some((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === "/") &&
    !isAdminRoute;

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // Prevent non-admin users from accessing admin routes
  if (isAdminRoute && currentUserRole !== UserRole.ADMIN) {
    return Response.redirect(new URL("/", nextUrl)); // Redirect to home or any other page
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/artists",
    "/artists/(.*)",
    "/(api|trpc)(.*)",
  ],
};