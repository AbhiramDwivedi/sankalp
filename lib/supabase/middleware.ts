// Middleware helper that refreshes the Supabase session cookie on every
// request and enforces the public/gated route split declared in
// `lib/auth-routes.ts`. Must be invoked from the root `middleware.ts`.
//
// IMPORTANT: the `getUser()` call is load-bearing — it refreshes the access
// token when it's near expiry. Do not remove it even if the value is unused.

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isAuthRoute, isPublicRoute } from '@/lib/auth-routes'

export async function updateSession(request: NextRequest) {
  // E2E-only auth bypass. Respected solely when NODE_ENV is not 'production'
  // AND the env var is explicitly opt-in — lets the Playwright suite exercise
  // gated routes without stubbing a real Supabase session. Vercel deploys
  // always run with NODE_ENV=production so this can't leak to prod.
  if (
    process.env.E2E_AUTH_BYPASS === '1' &&
    process.env.NODE_ENV !== 'production'
  ) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Logged-out user hitting a gated route → bounce to /login with a
  // `redirect` query so the login form can send them back after sign-in.
  if (!user && !isPublicRoute(pathname) && !isAuthRoute(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname + request.nextUrl.search)
    return NextResponse.redirect(url)
  }

  // Logged-in user sitting on /login has nothing to do there → dashboard.
  if (user && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
