'use client'

// Settings card shown only on parent profiles. Lets the parent invite a
// co-parent (e.g. partner / grandparent) by email. The invite goes through
// /api/student-links/co-parent-invite which inserts a kind='co_parent' row
// and dispatches a Supabase magic-link email. When the co-parent signs in
// and accepts (via the dashboard banner → CoParentInviteAccept), the
// SECURITY DEFINER fn `accept_co_parent_invite` fans out one
// kind='student' accepted link per child the inviter currently has, scoped
// to the co-parent's chosen parent profile.
//
// v1 limitation: children added after acceptance are NOT auto-shared. The
// remedy in v1 is for the inviter to revoke the original co-parent invite
// and send a fresh one.

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
  createCoParentInvite,
  listAdultLinks,
  revokeLink,
} from '@/lib/studentLinks'
import type { StudentLink } from '@/types'

interface Props {
  /** The parent's profile id. */
  adultProfileId: string
  /** The parent's Supabase auth user id. */
  adultUserId: string
}

export function CoParentInviteCard({ adultProfileId, adultUserId }: Props) {
  const [links, setLinks] = useState<StudentLink[] | null>(null)
  const [email, setEmail] = useState('')
  const [label, setLabel] = useState('')
  const [pending, startTransition] = useTransition()

  const refresh = useCallback(async () => {
    const next = await listAdultLinks(adultUserId)
    // Filter to co-parent invites issued from THIS parent profile (a parent
    // user may own multiple parent profiles; we want the per-profile view).
    const visible = next.filter(
      (l) =>
        l.status !== 'revoked' &&
        l.kind === 'co_parent' &&
        l.adultProfileId === adultProfileId,
    )
    setLinks(visible)
  }, [adultUserId, adultProfileId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return
    startTransition(async () => {
      const { error, emailSent } = await createCoParentInvite({
        adultProfileId,
        invitedEmail: trimmed,
        adultLabel: label.trim() || null,
      })
      if (error) {
        toast.error(error)
        return
      }
      // Distinguish the email-actually-sent path from the
      // already-registered soft-fail. Both are valid; just different copy
      // so the inviter knows what to tell the co-parent next.
      if (emailSent) {
        toast.success(`Co-parent invite emailed to ${trimmed}.`)
      } else {
        toast.success(
          `Invite created. ${trimmed} can sign in to Sankalp and accept it from their dashboard.`,
        )
      }
      setEmail('')
      setLabel('')
      refresh()
    })
  }

  const handleRevoke = (linkId: string, wasAccepted: boolean) => {
    const prompt = wasAccepted
      ? "Remove this co-parent? They will lose access to your shared children's progress."
      : 'Cancel this pending co-parent invite?'
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
        <CardTitle>Co-parent</CardTitle>
        <CardDescription>
          Invite another parent (your partner, your child&rsquo;s grandparent,
          etc.) to share visibility into your already-connected children. They
          accept on their next sign-in. Children you connect later won&rsquo;t
          be auto-shared — re-invite if you add a new child.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Invite form -------------------------------------------------- */}
        <form onSubmit={handleInvite} className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="co-parent-invite-email">Email</Label>
              <Input
                id="co-parent-invite-email"
                type="email"
                required
                placeholder="co-parent@example.com"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pending}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="co-parent-invite-label">
                Label{' '}
                <span className="text-muted-foreground">(just for you)</span>
              </Label>
              <Input
                id="co-parent-invite-label"
                placeholder="Partner, Aarav's dad"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                disabled={pending}
              />
            </div>
          </div>
          <Button type="submit" disabled={pending || !email.trim()}>
            <UserPlus className="mr-2 h-4 w-4" />
            {pending ? 'Sending…' : 'Invite co-parent'}
          </Button>
        </form>

        {/* List --------------------------------------------------------- */}
        {links === null ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : links.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No co-parent invites yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {links.map((link) => {
              const isAccepted = link.status === 'accepted'
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
                      <span className="font-medium text-sm truncate">
                        {link.invitedEmail}
                      </span>
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
                    aria-label={
                      isAccepted ? 'Remove co-parent' : 'Cancel invite'
                    }
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
