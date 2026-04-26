// POST /api/student-links/co-parent-invite
//
// Parent A invites Parent B to share visibility into A's already-accepted
// children. Mirrors the existing /api/student-links/invite handler closely
// — same auth, same Supabase Admin email pipeline, same soft-fail
// shape — but differs in:
//   - Inserts the row with `kind = 'co_parent'` so the RLS policy in
//     migration 0004 routes it through the parent-only INSERT branch (not
//     the parent-OR-teacher branch that gates kind='student' invites).
//   - Refuses unless the inviter's profile role is exactly 'parent'.
//   - Sends the email with `data.invite_kind = 'co_parent'` so the accept
//     page can disambiguate.
//
// Why a separate route rather than overloading /api/student-links/invite:
// the existing route is shipping in production; the smallest-surface change
// is to leave it alone and add a new route that the new UI calls. The two
// routes share zero behavior past the insert kind, so there's no
// duplicated logic of consequence.

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

  // Don't let a parent invite themselves — would create a confusing accepted
  // self-link after fan-out. Match against the auth user's email
  // case-insensitively.
  if (
    user.email &&
    user.email.toLowerCase() === invitedEmail.toLowerCase()
  ) {
    return NextResponse.json(
      { error: "You can't invite yourself as a co-parent." },
      { status: 400 },
    )
  }

  // Verify ownership + parent role. RLS would reject anyway, but a 403 with
  // a useful message beats a generic Postgres error in the toast.
  const { data: prof, error: profErr } = await supabase
    .from('profiles')
    .select('id, owner_user_id, data')
    .eq('id', adultProfileId)
    .maybeSingle()
  if (profErr || !prof || prof.owner_user_id !== user.id) {
    return NextResponse.json({ error: 'Profile not found.' }, { status: 403 })
  }
  const role = (prof.data as { role?: string } | null)?.role
  if (role !== 'parent') {
    return NextResponse.json(
      { error: 'Only parent profiles can invite a co-parent.' },
      { status: 403 },
    )
  }

  // Insert the co-parent invite row. RLS policy student_links_insert_adult
  // (rebuilt in migration 0004) validates the parent-only kind='co_parent'
  // branch. The unique partial index
  // student_links_one_pending_per_adult_email_kind blocks duplicate pending
  // co-parent invites from the same adult to the same email — but allows a
  // pending student invite to coexist (different kind).
  const { data: linkRow, error: linkErr } = await supabase
    .from('student_links')
    .insert({
      adult_profile_id: adultProfileId,
      adult_user_id: user.id,
      invited_email: invitedEmail,
      adult_label: adultLabel,
      kind: 'co_parent',
    })
    .select('*')
    .single()

  if (linkErr) {
    if (linkErr.code === '23505') {
      return NextResponse.json(
        { error: 'You already have a pending co-parent invite to that address.' },
        { status: 409 },
      )
    }
    return NextResponse.json({ error: linkErr.message }, { status: 500 })
  }

  // Send the email via Supabase Admin. The redirect lands the co-parent on
  // /onboarding?role=parent so they create their own parent profile, after
  // which the dashboard's pending-invite banner steers them to /settings to
  // accept and trigger the fan-out.
  const reqUrl = new URL(req.url)
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${reqUrl.protocol}//${reqUrl.host}`
  const redirectTo = `${origin}/onboarding?role=parent`

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
          // Used by the accept page (and any future server-side accept
          // hint logic) to know this is a co-parent invite. The
          // authoritative discriminator is the `kind` column on the row;
          // this is just a soft hint.
          invite_kind: 'co_parent',
        },
      },
    )
    if (!invErr) {
      reason = 'sent'
    } else {
      const msg = invErr.message?.toLowerCase() || ''
      if (msg.includes('already') || msg.includes('registered') || msg.includes('exists')) {
        reason = 'already_registered'
      } else {
        reason = 'service_unavailable'
      }
      console.error('[co-parent-invite] admin invite failed:', invErr)
    }
  } catch (e) {
    console.error('[co-parent-invite] admin invite threw:', e)
    reason = 'service_unavailable'
  }

  return NextResponse.json({
    link: linkRow,
    emailSent: reason === 'sent',
    emailReason: reason,
  })
}
