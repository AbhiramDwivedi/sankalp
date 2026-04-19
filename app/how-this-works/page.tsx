import { redirect } from 'next/navigation'

// Legacy route. The content moved to /overview in Phase D. We keep this
// redirect so older bookmarks, footer links cached in a parent's browser,
// and any external references still resolve cleanly. Next.js performs the
// 307 at render time; no client JS needed.
export default function HowThisWorksPage() {
  redirect('/overview')
}
