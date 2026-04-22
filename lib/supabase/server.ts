// Server-side Supabase client for Server Components, Server Actions, and
// Route Handlers. Reads/writes session cookies via `next/headers`. The
// try/catch on `setAll` is required because Server Components are not allowed
// to set cookies; middleware takes care of cookie refresh there instead.

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component — expected; middleware refreshes cookies.
          }
        },
      },
    },
  )
}
