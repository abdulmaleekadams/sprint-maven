/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/about",
  "/auth/verification",
];

/**
 * An array of routes that are used for authentication
 * These routes do not require authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/signin",
  "/auth/signup",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are for API
 * authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";
export const isUploadthingApi: string = "/api/uploadthing";
