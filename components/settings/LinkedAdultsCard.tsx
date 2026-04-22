'use client'

// Settings card shown to students. Surfaces:
//   - Pending invites the adult has issued to this student's email.
//   - Adults who've been accepted (so the student can revoke).
//
// Pending invites are matched by email (auth.users.email) via the RLS
// policy in migration 0002; the student does not need a profile yet. On
// accept the link is attached to the student's currently active profile
// (`activeId` on the provider).

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
import { Badge } from '@/components/ui/badge.shadcn'
import { Check, X, Trash2, Users, BookOpen, GraduationCap } from 'lucide-react'
import {
  acceptInvite,
  listStudentInvites,
  loadLinkedProfileSummary,
  revokeLink,
} from '@/lib/studentLinks'
import type { StudentLink } from '@/types'
import { useProfile } from '@/lib/profile-context'

const ROLE_ICON = {
  parent: Users,
  teacher: BookOpen,
  student: GraduationCap,
}

type AdultSummary = { name: string; role: 'parent' | 'teacher' | 'student' }

export function LinkedAdultsCard() {
  const { activeId } = useProfile()
  const [links, setLinks] = useState<StudentLink[] | null>(null)
  const [adults, setAdults] = useState<Record<string, AdultSummary>>({})
  const [pending, startTransition] = useTransition()

  const refresh = useCallback(async () => {
    const next = await listStudentInvites()
    const visible = next.filter((l) => l.status !== 'revoked')
    setLinks(visible)
    // Pre-load adult display names for accepted rows.
    const needed = visible
      .filter((l) => l.status === 'accepted')
      .map((l) => l.adultProfileId)
    for (const id of needed) {
      setAdults((prev) => {
        if (prev[id]) return prev
        loadLinkedProfileSummary(id).then((summary) => {
          if (!summary) return
          const role =
            summary.role === 'parent' || summary.role === 'teacher'
              ? summary.role
              : 'student'
          setAdults((cur) => ({ ...cur, [id]: { name: summary.name, role } }))
        })
        return prev
      })
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleAccept = (link: StudentLink) => {
    if (!activeId) {
      toast.error('Create a profile first, then accept the invite.')
      return
    }
    startTransition(async () => {
      const { error } = await acceptInvite({
        linkId: link.id,
        studentProfileId: activeId,
      })
      if (error) {
        toast.error(error)
        return
      }
      toast.success('Connected.')
      refresh()
    })
  }

  const handleDecline = (linkId: string) => {
    if (!confirm('Decline this invite?')) return
    startTransition(async () => {
      const { error } = await revokeLink({ linkId, revokedBy: 'student' })
      if (error) {
        toast.error(error)
        return
      }
      refresh()
    })
  }

  const pendingLinks = links?.filter((l) => l.status === 'pending') ?? []
  const acceptedLinks = links?.filter((l) => l.status === 'accepted') ?? []

  // Nothing to render if there's no loaded data yet AND no relationships.
  if (links === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connections</CardTitle>
          <CardDescription>Loading…</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (pendingLinks.length === 0 && acceptedLinks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connections</CardTitle>
          <CardDescription>
            A parent or teacher can invite you to share progress. You&rsquo;ll
            see their invite here when they do.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connections</CardTitle>
        <CardDescription>
          Adults you&rsquo;ve let see your progress. They can change your
          level, study plan, and exam date — you keep ownership of everything
          else.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Pending invites ---------------------------------------------- */}
        {pendingLinks.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Pending invites</h3>
            <ul className="space-y-2">
              {pendingLinks.map((link) => (
                <li
                  key={link.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Invite from {link.invitedEmail === '' ? 'an adult' : 'someone'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sent {new Date(link.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(link)}
                      disabled={pending}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDecline(link.id)}
                      disabled={pending}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Accepted links ----------------------------------------------- */}
        {acceptedLinks.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Connected adults</h3>
            <ul className="space-y-2">
              {acceptedLinks.map((link) => {
                const adult = adults[link.adultProfileId]
                const Icon = ROLE_ICON[adult?.role ?? 'parent']
                return (
                  <li
                    key={link.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <Icon className="h-5 w-5 text-primary shrink-0" aria-hidden />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {adult?.name ?? 'Loading…'}
                      </p>
                      {adult && (
                        <Badge variant="secondary" className="capitalize">
                          {adult.role}
                        </Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (!confirm("Stop sharing your progress with this adult?")) return
                        startTransition(async () => {
                          const { error } = await revokeLink({
                            linkId: link.id,
                            revokedBy: 'student',
                          })
                          if (error) toast.error(error)
                          else refresh()
                        })
                      }}
                      disabled={pending}
                      aria-label="Revoke access"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
