// Single source of truth for which routes are public (no auth required) vs
// gated. The middleware reads this to decide whether to redirect a logged-out
// user to /login, and the landing CTA row reads it to decide whether the
// "Enter as X" buttons go straight to /onboarding or through /login first.

export const PUBLIC_ROUTES = [
  '/',
  '/how-this-works',
  '/overview',
  '/rubric',
  '/audit',
] as const

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )
}

// Routes that are part of the auth flow itself. Always reachable regardless
// of session — unauthenticated users need them to sign in, and authenticated
// users passing through /auth/* (e.g. sign-out) also need them.
export function isAuthRoute(pathname: string): boolean {
  return pathname === '/login' || pathname.startsWith('/auth/')
}
