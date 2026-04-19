'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useProfile } from '@/lib/profile-context'
import {
  HydratingShell,
  NoProfileShell,
  PageShell,
} from '@/components/route-helpers'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ShieldCheck,
  Info,
  ClipboardList,
  Download,
  FileText,
} from 'lucide-react'
import { downloadJsonExport } from '@/lib/exportProgress'

// -----------------------------------------------------------------------------
// Settings page — Phase 2b minimum.
//
// - Name is editable; commits on blur.
// - Current proficiency level is read-only (Onboarding sets it; Phase 3 may
//   add a re-assess flow).
// - AI assessment toggle writes profile.aiAssessmentEnabled.
// - Links to /audit, /how-this-works, /rubric.
// - Export progress wires lib/exportProgress.downloadJsonExport and stamps
//   profile.lastExportedAt. Print-to-PDF report overlay is deferred to Phase 3
//   (it was an App.tsx-level overlay in the Vite app).
// - No profile-CRUD here — that belongs to the Phase 3 role picker.
// -----------------------------------------------------------------------------

export default function SettingsPage() {
  const { hydrated, profile, setProfile } = useProfile()
  const [nameDraft, setNameDraft] = useState<string>('')

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title="Settings" />

  // nameDraft is null-initialised; sync when profile loads the first time.
  if (nameDraft === '' && profile.name) {
    // one-shot init; downstream blur handler takes over.
    setNameDraft(profile.name)
  }

  const handleNameCommit = () => {
    const trimmed = nameDraft.trim()
    if (!trimmed || trimmed === profile.name) return
    setProfile((p) => ({ ...p, name: trimmed }))
  }

  const handleToggleAi = (next: boolean) => {
    setProfile((p) => ({ ...p, aiAssessmentEnabled: next }))
  }

  const handleExport = () => {
    const exportedAt = downloadJsonExport(profile)
    setProfile((p) => ({ ...p, lastExportedAt: exportedAt }))
  }

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Local to this device. Sankalp never signs you in or syncs anything off-box.
          </p>
        </div>

        {/* Profile card -------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>The name and level that drives your plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student-name">Name</Label>
              <Input
                id="student-name"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onBlur={handleNameCommit}
              />
            </div>
            <div className="space-y-2">
              <Label>Proficiency level</Label>
              <div className="text-sm px-3 py-2 rounded-md bg-muted text-foreground">
                {profile.currentLevel}
              </div>
              <p className="text-xs text-muted-foreground">
                Set during onboarding. Re-assessment arrives with the Phase 3 role picker.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI toggle ----------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>AI writing feedback</CardTitle>
            <CardDescription>
              Optional Gemini pass on your essays. When off, prompts stay read-only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {profile.aiAssessmentEnabled ? 'Enabled' : 'Disabled'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Requires a GEMINI_API_KEY in your build — the app still works without one.
                </p>
              </div>
              <Switch
                checked={!!profile.aiAssessmentEnabled}
                onCheckedChange={handleToggleAi}
                aria-label="AI assessment toggle"
              />
            </div>
          </CardContent>
        </Card>

        {/* References ---------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>References</CardTitle>
            <CardDescription>
              The rubric, the credit audit, and the five-minute "how this works" primer.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-3">
            <Button variant="outline" asChild>
              <Link href="/rubric">
                <ClipboardList className="mr-2 h-4 w-4" />
                Rubric
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/audit">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Credit audit
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/how-this-works">
                <Info className="mr-2 h-4 w-4" />
                How this works
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Export -------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Export progress</CardTitle>
            <CardDescription>
              A sanitized JSON snapshot (no free-form AI scratch). Share with a teacher or
              parent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
              {/* Print-to-PDF report overlay was an App.tsx-level overlay in the
               * Vite app; Phase 3 rewires it into /progress-report. */}
              <Button variant="outline" disabled>
                <FileText className="mr-2 h-4 w-4" />
                Print report (Phase 3)
              </Button>
            </div>
            {profile.lastExportedAt && (
              <p className="text-xs text-muted-foreground">
                Last exported {new Date(profile.lastExportedAt).toLocaleString()}.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
