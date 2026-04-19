'use client'

import { useRouter } from 'next/navigation'
import { CreditAuditView } from '@/components/pages/CreditAuditView'
import { PageShell } from '@/components/route-helpers'

// Live 3-credit audit. Same content as docs/CREDIT_AUDIT.md; linked from
// the landing page and from Settings.
export default function AuditPage() {
  const router = useRouter()
  return (
    <PageShell>
      <CreditAuditView onBack={() => router.push('/dashboard')} />
    </PageShell>
  )
}
