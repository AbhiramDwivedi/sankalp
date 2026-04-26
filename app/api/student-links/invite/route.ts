// POST /api/student-links/invite
//
// Server-side replacement for the previous client-only `student_links` insert.
// Two responsibilities:
//   1. Insert the link row using the caller's authed cookie session — RLS
//      enforces ownership of the adult profile and the parent/teacher role
//      check, so a malicious client can't fake the adult_user_id.
//   2. Trigger the invite email via Supabase's `auth.admin.inviteUserByEmail`,
//      which both creates a user row (if the email is new) and sends the
//      branded invite email.
//
// Failure shape:
//   - Insert rejected → 4xx with the user-facing error string.
//   - Insert ok, email send failed → 200 with `emailSent: false` and the
//     error reason. The row exists; the student can still accept manually
//     by signing in. Client toast surfaces the soft-fail.
//
// We do NOT trust client-supplied `adultUserId`; we read it from the session.

import { NextResponse, type NextRequest } from 'next/server'
import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

interface RequestBody {
  adultProfileId?: string
  invitedEmail?: string
  adultLabel?: string | null
}

export async function POST(req: NextRequest) {
  let body: RequestBody
  try {
    body = (await req.json()) as RequestBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const adultProfileId = (body.adultProfileId || '').trim()
  const invitedEmail = (body.invitedEmail || '').trim()
  const adultLabel = body.adultLabel ? String(body.adultLabel).trim() : null

  if (!adultProfileId) {
    return NextResponse.json({ error: 'Missing adult profile.' }, { status: 400 })
  }
  if (!invitedEmail || !/@/.test(invitedEmail)) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 })
  }

  const supabase = await createServerSupabase()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user
  if (!user) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 })
  }

  // Double-check ownership of the adult profile + that it's parent/teacher
  // typed before we hit RLS. RLS would reject the insert anyway, but a
  // friendly 403 here beats a generic Postgres error in the toast.
  const { data: prof, error: profErr } = await supabase
    .from('profiles')
    .select('id, owner_user_id, data')
    .eq('id', adultProfileId)
    .maybeSingle()
  if (profErr || !prof || prof.owner_user_id !== user.id) {
    return NextResponse.json({ error: 'Profile not found.' }, { status: 403 })
  }
  const role = (prof.data as { role?: string } | null)?.role
  if (role !== 'parent' && role !== 'teacher') {
    return NextResponse.json(
      { error: 'Only parent or teacher profiles can invite students.' },
      { status: 403 },
    )
  }

  // Insert the link row. RLS validates: auth.uid() = adult_user_id, status =
  // 'pending', student_* are null, and the adult profile's role is
  // parent/teacher. Unique partial index on (adult, lower(email)) blocks
  // duplicate pending invites.
  const { data: linkRow, error: linkErr } = await supabase
    .from('student_links')
    .insert({
      adult_profile_id: adultProfileId,
      adult_user_id: user.id,
      invited_email: invitedEmail,
      adult_label: adultLabel,
    })
    .select('*')
    .single()

  if (linkErr) {
    if (linkErr.code === '23505') {
      return NextResponse.json(
        { error: 'You already have a pending invite to that address.' },
        { status: 409 },
      )
    }
    return NextResponse.json({ error: linkErr.message }, { status: 500 })
  }

  // Send the email via Supabase Admin. If the user already exists this
  // call returns an "already registered" / "user exists" error — soft-fail
  // and let the client toast tell the inviter to ask the student to sign
  // in manually.
  const reqUrl = new URL(req.url)
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${reqUrl.protocol}//${reqUrl.host}`
  // After the invitee clicks the magic link they land authenticated; we
  // bounce them to onboarding so they create their student profile, after
  // which the standard /dashboard pending-invite banner steers them to
  // /settings to accept.
  const redirectTo = `${origin}/onboarding?role=student`

  // Send the email via Supabase Admin. Two outcomes worth distinguishing:
  //   sent                  — magic link emailed by Supabase
  //   already_registered    — invitee has a Supabase account; admin invite
  //                           refuses. Row is created; student accepts on
  //                           next sign-in via /settings.
  //   service_unavailable   — env vars missing, network failure, etc.
  // We deliberately do NOT echo the raw Supabase error string back to the
  // client — Supabase responds with messages that distinguish "user
  // already registered" from "user not found", which would let the inviter
  // probe arbitrary emails for Sankalp account existence. The reason enum
  // below collapses that into one bucket and the toast doesn't betray it.
  type InviteReason = 'sent' | 'already_registered' | 'service_unavailable'
  let reason: InviteReason = 'service_unavailable'
  try {
    const admin = createAdminClient()
    const { error: invErr } = await admin.auth.admin.inviteUserByEmail(
      invitedEmail,
      {
        redirectTo,
        data: {
          invited_by_user_id: user.id,
          adult_label: adultLabel,
          link_id: linkRow.id,
        },
      },
    )
    if (!invErr) {
      reason = 'sent'
    } else {
      // Supabase returns several phrasings for "this email is already a
      // user" depending on the auth path it took (existing identity vs.
      // existing user without identity). Match conservatively. Anything
      // else is bucketed as service_unavailable so a transient outage
      // doesn't get mis-labeled.
      const msg = invErr.message?.toLowerCase() || ''
      if (msg.includes('already') || msg.includes('registered') || msg.includes('exists')) {
        reason = 'already_registered'
      } else {
        reason = 'service_unavailable'
      }
      console.error('[student-links/invite] admin invite failed:', invErr)
    }
  } catch (e) {
    console.error('[student-links/invite] admin invite threw:', e)
    reason = 'service_unavailable'
  }

  return NextResponse.json({
    link: linkRow,
    emailSent: reason === 'sent',
    emailReason: reason,
  })
}
