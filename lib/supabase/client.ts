// Browser-side Supabase client. Safe to import in client components and in
// any code path that runs in the browser. Reads the publishable key (new
// Supabase key system — starts with `sb_publishable_...`), which is designed
// to be exposed in the browser bundle.

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
}
