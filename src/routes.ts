/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/search", "/artists"];

/**
 * An array of routes that are used for authentication.
 * The login will redirect logged in users to /
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/register",
  "/auth/verification-otp",
  "/auth/login",
  "/auth/reset-password",
  "/auth/reset-otp",
  "/auth/new-password",
  "/auth/error",
];

/**
 * The prefix for authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * An array of routes that are accessible only to admin users.
 * These routes require the user to have an admin role.
 * @type {string[]}
 */
export const adminRoutes: string[] = [
  "/new-artist",
  "/new-album",
  "/new-track",
  "/dashboard",
];

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";
