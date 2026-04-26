// Server-only Supabase client built with the service-role key. Bypasses RLS
// — reserved for explicit admin operations like sending invite emails via
// `auth.admin.inviteUserByEmail`. Never import from a client component or
// any code path that could ship to the browser.
//
// Throws on missing env vars at construction time so a misconfigured
// deployment fails loudly instead of silently inserting rows without
// firing the email side-effect.

import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY',
    )
  }
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
