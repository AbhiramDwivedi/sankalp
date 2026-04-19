import { OverviewView } from '@/components/pages/OverviewView'
import { PageShell } from '@/components/route-helpers'

// /overview — the parent/teacher/student-legible "what is Sankalp" document.
// Renamed from /how-this-works in Phase D; the old path still redirects here
// via app/how-this-works/page.tsx for legacy bookmarks. Everything on the
// page is pulled from the content registries, so no build-time data hook is
// needed and the route can render as a plain server component.
export default function OverviewPage() {
  return (
    <PageShell>
      <OverviewView />
    </PageShell>
  )
}
