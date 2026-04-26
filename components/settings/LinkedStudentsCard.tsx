'use client'

// Settings card shown to adults (parent / teacher profiles). Lists pending
// and accepted student links, lets the adult send a new invite by email,
// and revoke either a pending invite or an accepted link.
//
// Why there is no "send email" step yet: v1 does not dispatch invite
// emails. The row is created in `pending`; the student sees it on their
// next sign-in (matched by invited_email == auth.users.email). A v1.1
// SMTP hook can layer on later without changing the schema.

import { useCallback, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge.shadcn'
import { Clock, Check, Trash2, Mail, UserPlus } from 'lucide-react'
import {
  createInvite,
  listAdultLinks,
  loadLinkedProfileSummary,
  revokeLink,
} from '@/lib/studentLinks'
import type { StudentLink } from '@/types'

interface Props {
  /** The adult's profile id (parent or teacher). */
  adultProfileId: string
  /** The adult's Supabase auth user id. */
  adultUserId: string
  /** UI label — parents see "children", teachers see "students". */
  relationshipWord: 'children' | 'students'
}

// Minimal cache from student_profile_id → display name so the list shows
// real names instead of UUIDs for accepted links.
type NameCache = Record<string, string>

export function LinkedStudentsCard({
  adultProfileId,
  adultUserId,
  relationshipWord,
}: Props) {
  const [links, setLinks] = useState<StudentLink[] | null>(null)
  const [names, setNames] = useState<NameCache>({})
  const [email, setEmail] = useState('')
  const [label, setLabel] = useState('')
  const [pending, startTransition] = useTransition()

  const refresh = useCallback(async () => {
    const next = await listAdultLinks(adultUserId)
    const visible = next.filter((l) => l.status !== 'revoked')
    setLinks(visible)
    // Warm the name cache for accepted rows we haven't seen yet. We use
    // setNames with a functional update so the effect doesn't depend on
    // `names` (which would re-fire the effect each time a name lands).
    const needed = visible
      .filter((l) => l.status === 'accepted' && l.studentProfileId)
      .map((l) => l.studentProfileId!)
    for (const id of needed) {
      setNames((prev) => {
        if (prev[id]) return prev
        // Kick off a fetch; update on resolution. Safe to fire-and-forget.
        loadLinkedProfileSummary(id).then((summary) => {
          if (summary) setNames((cur) => ({ ...cur, [id]: summary.name }))
        })
        return prev
      })
    }
  }, [adultUserId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return
    startTransition(async () => {
      const { error, emailSent } = await createInvite({
        adultProfileId,
        adultUserId,
        invitedEmail: trimmed,
        adultLabel: label.trim() || null,
      })
      if (error) {
        toast.error(error)
        return
      }
      // Successful row insert. Distinguish the "email actually went out" path
      // from the soft-fail (most often: user already has an account, so
      // `inviteUserByEmail` errors). Both flows are valid — just different
      // copy so the inviter knows what to tell the student next.
      if (emailSent) {
        toast.success(`Invite emailed to ${trimmed}.`)
      } else {
        toast.success(
          `Invite created. ${trimmed} can sign in to Sankalp and accept it from Settings.`,
        )
      }
      setEmail('')
      setLabel('')
      refresh()
    })
  }

  const handleRevoke = (linkId: string, wasAccepted: boolean) => {
    const prompt = wasAccepted
      ? 'Remove this link? You will stop seeing their progress immediately.'
      : 'Cancel this pending invite?'
    if (!confirm(prompt)) return
    startTransition(async () => {
      const { error } = await revokeLink({ linkId, revokedBy: 'adult' })
      if (error) {
        toast.error(error)
        return
      }
      refresh()
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Linked {relationshipWord}
        </CardTitle>
        <CardDescription>
          Invite a {relationshipWord === 'children' ? 'child' : 'student'} by
          email. They accept the invite on their next sign-in, then you can
          see their progress and adjust their level, study plan, and exam date.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Invite form --------------------------------------------------- */}
        <form onSubmit={handleInvite} className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                required
                placeholder="student@example.com"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pending}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="invite-label">
                Label <span className="text-muted-foreground">(just for you)</span>
              </Label>
              <Input
                id="invite-label"
                placeholder={
                  relationshipWord === 'children' ? 'My son Aarav' : 'Period 3 - Priya'
                }
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                disabled={pending}
              />
            </div>
          </div>
          <Button type="submit" disabled={pending || !email.trim()}>
            <UserPlus className="mr-2 h-4 w-4" />
            {pending ? 'Sending…' : 'Send invite'}
          </Button>
        </form>

        {/* List ---------------------------------------------------------- */}
        {links === null ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : links.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No invites yet. Send one above.
          </p>
        ) : (
          <ul className="space-y-2">
            {links.map((link) => {
              const isAccepted = link.status === 'accepted'
              const title = isAccepted
                ? (link.studentProfileId && names[link.studentProfileId]) || link.invitedEmail
                : link.invitedEmail
              return (
                <li
                  key={link.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  {isAccepted ? (
                    <Check className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm truncate">{title}</span>
                      <Badge variant="secondary" className="capitalize">
                        {link.status}
                      </Badge>
                    </div>
                    {link.adultLabel && (
                      <p className="text-xs text-muted-foreground truncate">
                        {link.adultLabel}
                      </p>
                    )}
                    {!isAccepted && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3" aria-hidden />
                        Waiting for {link.invitedEmail} to sign in and accept
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRevoke(link.id, isAccepted)}
                    aria-label={isAccepted ? 'Remove link' : 'Cancel invite'}
                    disabled={pending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
