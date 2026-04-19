'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge.shadcn'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { BAND_META, BAND_ORDER, type Band } from '@/types'

// -----------------------------------------------------------------------------
// BandLevelDial — shared level-picker UI used by Settings (student) and by
// Teacher / Parent dashboards (to dial the demo student's level).
//
// Phase A contract: 3 bands only — Foundations / Intermediate / Skilled. The
// dial does NOT expose the full 6-value ProficiencyLevel. Consumers handle
// the ProficiencyLevel/plan re-derivation in their onConfirm handler.
//
// Confirmation dialog is always shown on change — the re-sequence is a big
// enough user action to warrant an "Are you sure?" even though nothing is
// destroyed (completed packs stay completed).
// -----------------------------------------------------------------------------

export interface BandLevelDialProps {
  /** Current band (coarse display level). */
  value: Band
  /** Title for the card; e.g. "Your level" or "Aarav's level". */
  title?: string
  description?: string
  /** Extra copy shown inside the confirmation dialog — lets callers customise
   *  what's re-sequenced (student plan vs. demo-student seed). */
  confirmDescription?: string
  /** Tightly-labeled button text, e.g. "Update level". */
  applyLabel?: string
  /** Called when the user confirms a new band. */
  onConfirm: (next: Band) => void
  /** Set true to render the dial in a compact (dashboard-card friendly) layout. */
  compact?: boolean
}

export function BandLevelDial({
  value,
  title = 'Your level',
  description = 'Three bands map the curriculum. Pick the one that matches where you are today.',
  confirmDescription = 'Changing your level will re-sequence your study plan. Your completed lessons stay completed. Continue?',
  applyLabel = 'Update level',
  onConfirm,
  compact = false,
}: BandLevelDialProps) {
  const [draft, setDraft] = useState<Band>(value)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const currentMeta = BAND_META[value]
  const dirty = draft !== value

  const handleApply = () => {
    if (!dirty) return
    setConfirmOpen(true)
  }

  const handleConfirmChange = () => {
    onConfirm(draft)
    setConfirmOpen(false)
  }

  const handleCancel = () => {
    setDraft(value)
    setConfirmOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">{currentMeta.label}</Badge>
          <span className="text-xs text-muted-foreground">{currentMeta.stampRange}</span>
        </div>
        <p className="text-sm text-muted-foreground">{currentMeta.description}</p>

        <RadioGroup
          value={draft}
          onValueChange={(v) => setDraft(v as Band)}
          className={compact ? 'grid grid-cols-3 gap-2' : 'grid gap-3 sm:grid-cols-3'}
          aria-label="Select curriculum band"
        >
          {BAND_ORDER.map((band) => {
            const meta = BAND_META[band]
            const active = draft === band
            const current = value === band
            return (
              <Label
                key={band}
                htmlFor={`band-${band}`}
                className={`flex flex-col gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                  active
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <div className="flex items-start gap-2">
                  <RadioGroupItem value={band} id={`band-${band}`} className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-foreground">{meta.label}</span>
                      {current && (
                        <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{meta.stampRange}</p>
                  </div>
                </div>
                {!compact && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {meta.description}
                  </p>
                )}
              </Label>
            )
          })}
        </RadioGroup>

        <div className="flex items-center justify-end gap-2">
          {dirty ? (
            <Button variant="ghost" onClick={() => setDraft(value)} type="button">
              Cancel
            </Button>
          ) : null}
          <Button onClick={handleApply} disabled={!dirty} type="button">
            {applyLabel}
          </Button>
        </div>
      </CardContent>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Switch to {BAND_META[draft].label}?
            </AlertDialogTitle>
            <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmChange}>
              Yes, switch to {BAND_META[draft].label}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
