// Supabase client helpers for parent/teacher ↔ student linking. See the
// 0002_student_links migration for the underlying table, RLS, and the
// SECURITY DEFINER function that mediates adult → student path-dial writes.
//
// All functions here assume the caller is signed in; RLS enforces that
// users can only see / create / update / revoke rows they are party to.

import { createClient } from '@/lib/supabase/client'
import type {
  StudentLink,
  StudentLinkKind,
  StudentLinkStatus,
  StudentProfile,
} from '@/types'
import { migrateProfile } from '@/types'

// Row shape returned by the Supabase client — snake_case columns.
type StudentLinkRow = {
  id: string
  adult_profile_id: string
  adult_user_id: string
  student_profile_id: string | null
  student_user_id: string | null
  invited_email: string
  status: StudentLinkStatus
  adult_label: string | null
  created_at: string
  accepted_at: string | null
  revoked_at: string | null
  revoked_by: 'adult' | 'student' | null
  // Added in migration 0004. Older rows default to 'student' at the DB level;
  // tolerate undefined here for safety in case a stale read predates the
  // migration on a self-hosted Supabase.
  kind?: StudentLinkKind | null
}

function rowToLink(row: StudentLinkRow): StudentLink {
  return {
    id: row.id,
    adultProfileId: row.adult_profile_id,
    adultUserId: row.adult_user_id,
    studentProfileId: row.student_profile_id,
    studentUserId: row.student_user_id,
    invitedEmail: row.invited_email,
    status: row.status,
    adultLabel: row.adult_label,
    createdAt: row.created_at,
    acceptedAt: row.accepted_at,
    revokedAt: row.revoked_at,
    revokedBy: row.revoked_by,
    kind: row.kind === 'co_parent' ? 'co_parent' : 'student',
  }
}

/**
 * Adult creates a pending invite. Posts to the server route at
 * `/api/student-links/invite`, which inserts the row using the caller's
 * authed cookie session AND fires the Supabase Admin invite email so the
 * student gets a magic link in their inbox. The route returns the link plus
 * an `emailSent` flag — when the email failed (commonly: invitee already
 * has an account), the row is still created and the student can accept
 * manually from /settings on their next sign-in.
 *
 * Duplicate pending invites from the same adult to the same email are
 * rejected by a unique partial index; the route translates that into a
 * friendly error.
 */
export type InviteEmailReason =
  | 'sent'
  | 'already_registered'
  | 'service_unavailable'

export async function createInvite(args: {
  adultProfileId: string
  adultUserId: string
  invitedEmail: string
  adultLabel?: string | null
}): Promise<{
  link?: StudentLink
  emailSent?: boolean
  emailReason?: InviteEmailReason
  error?: string
}> {
  const email = args.invitedEmail.trim()
  if (!email || !/@/.test(email)) {
    return { error: 'Enter a valid email.' }
  }
  let res: Response
  try {
    res = await fetch('/api/student-links/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adultProfileId: args.adultProfileId,
        invitedEmail: email,
        adultLabel: args.adultLabel ?? null,
      }),
    })
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Network error.' }
  }
  let json: {
    link?: StudentLinkRow
    emailSent?: boolean
    emailReason?: InviteEmailReason
    error?: string
  }
  try {
    json = await res.json()
  } catch {
    return { error: `Server error (${res.status}).` }
  }
  if (!res.ok) {
    return { error: json.error || `Server error (${res.status}).` }
  }
  return {
    link: json.link ? rowToLink(json.link) : undefined,
    emailSent: !!json.emailSent,
    emailReason: json.emailReason,
  }
}

/** All links the current adult knows about (pending / accepted / revoked). */
export async function listAdultLinks(adultUserId: string): Promise<StudentLink[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('student_links')
    .select('*')
    .eq('adult_user_id', adultUserId)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[studentLinks] listAdultLinks', error)
    return []
  }
  return (data as StudentLinkRow[]).map(rowToLink)
}

/**
 * Invites visible to the current signed-in student. RLS matches both
 * pending invites (by invited_email == auth.users.email) and accepted/
 * revoked invites (by student_user_id == auth.uid()). The caller can
 * filter by status client-side.
 */
export async function listStudentInvites(): Promise<StudentLink[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('student_links')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[studentLinks] listStudentInvites', error)
    return []
  }
  return (data as StudentLinkRow[]).map(rowToLink)
}

/**
 * Student accepts a pending invite. `studentProfileId` must be one of the
 * student's own profile rows (RLS on profiles already enforces ownership,
 * and the update's WITH CHECK clause verifies student_user_id === auth.uid()).
 * The student's auth user id is pulled from the current session so the
 * caller doesn't need to pass it.
 */
export async function acceptInvite(args: {
  linkId: string
  studentProfileId: string
}): Promise<{ error?: string }> {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id
  if (!userId) return { error: 'Not signed in.' }
  const { error } = await supabase
    .from('student_links')
    .update({
      status: 'accepted',
      student_profile_id: args.studentProfileId,
      student_user_id: userId,
      accepted_at: new Date().toISOString(),
    })
    .eq('id', args.linkId)
  if (error) return { error: error.message }
  return {}
}

/**
 * Auto-accept every pending invite addressed to the current user's email.
 * Used by the student dashboard the moment a signed-in student lands with a
 * student profile in hand: the student already proved they own the invited
 * email by signing in, so the manual Accept step on /settings is friction
 * for the common case. The /settings card is still the recovery path if
 * this call fails or if the user wants to revoke afterwards.
 *
 * Returns the count of links accepted (0 when there were none, 0 on error).
 *
 * Why we don't filter by email client-side: RLS on `student_links` already
 * scopes the SELECT to rows whose `invited_email` matches `auth.email()`,
 * so a plain `.eq('status','pending')` sees only the current user's
 * pending invites.
 */
export async function acceptPendingInvitesForCurrentUser(
  studentProfileId: string,
): Promise<{ accepted: number; error?: string }> {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user
  if (!user) return { accepted: 0, error: 'Not signed in.' }

  // Only auto-accept kind='student' invites here. kind='co_parent' invites
  // need the SECURITY DEFINER fan-out function (acceptCoParentInvite) and
  // require the recipient to first onboard a parent profile, so the
  // dashboard banner walks them through it explicitly. Filtering here
  // keeps a co-parent who happens to also have a student profile from
  // accidentally attaching their co-parent invite to their student profile.
  const { data: rows, error: fetchErr } = await supabase
    .from('student_links')
    .select('id')
    .eq('status', 'pending')
    .eq('kind', 'student')
  if (fetchErr) return { accepted: 0, error: fetchErr.message }
  if (!rows || rows.length === 0) return { accepted: 0 }

  const ids = (rows as Array<{ id: string }>).map((r) => r.id)
  // RLS WITH CHECK on student_links_update_student rejects rows where the
  // profile isn't yet visible (first-onboarding race) or where the link was
  // revoked between our SELECT and UPDATE. Those rejections are silent —
  // the row is just left untouched, no Postgres error. So we can't trust
  // ids.length as the accepted count; we have to read back the rows that
  // actually changed via `.select('id')` on the update response.
  const { data: updatedRows, error: updateErr } = await supabase
    .from('student_links')
    .update({
      status: 'accepted',
      student_profile_id: studentProfileId,
      student_user_id: user.id,
      accepted_at: new Date().toISOString(),
    })
    .in('id', ids)
    .select('id')
  if (updateErr) return { accepted: 0, error: updateErr.message }
  return { accepted: (updatedRows as Array<{ id: string }> | null)?.length ?? 0 }
}

/** Either side revokes. `revokedBy` records who called it for audit. */
export async function revokeLink(args: {
  linkId: string
  revokedBy: 'adult' | 'student'
}): Promise<{ error?: string }> {
  const supabase = createClient()
  const { error } = await supabase
    .from('student_links')
    .update({
      status: 'revoked',
      revoked_at: new Date().toISOString(),
      revoked_by: args.revokedBy,
    })
    .eq('id', args.linkId)
  if (error) return { error: error.message }
  return {}
}

/**
 * Fetch the minimal public display fields (name, role) from a linked
 * counterparty's profile. RLS policies in migration 0002 permit these
 * cross-user reads when an accepted link exists; pending invites do not
 * grant read access.
 */
export async function loadLinkedProfileSummary(
  profileId: string,
): Promise<{ name: string; role: string } | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, data')
    .eq('id', profileId)
    .maybeSingle()
  if (error || !data) return null
  const blob = data.data as Record<string, unknown>
  return {
    name: typeof blob.name === 'string' ? blob.name : 'Profile',
    role: typeof blob.role === 'string' ? blob.role : 'student',
  }
}

/**
 * Fetch a linked student's full profile blob. Only succeeds on accepted
 * links (RLS enforces this). Returns null if the row isn't visible or
 * doesn't exist.
 */
export async function loadLinkedStudentProfile(
  studentProfileId: string,
): Promise<StudentProfile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, data')
    .eq('id', studentProfileId)
    .maybeSingle()
  if (error || !data) return null
  const blob = data.data as Record<string, unknown>
  // Caller runs this through migrateProfile() when it wants the full
  // canonicalised shape; we keep this helper thin so the import surface
  // from this module stays obvious.
  return { ...(blob as unknown as StudentProfile), id: data.id }
}

/**
 * Convenience: load every accepted-link student for an adult, with the
 * student's full profile blob normalized through migrateProfile. Returns the
 * link side-by-side with the loaded profile so callers can show the
 * adult-set label, accepted-at date, and the live progress in one render
 * pass. Used by the parent / teacher dashboards.
 *
 * Optional `adultProfileId` filter scopes results to a single adult profile —
 * matters when one auth user owns both a parent and a teacher profile under
 * the same email; without the filter both dashboards would show the same
 * combined roster.
 */
export async function loadAcceptedStudents(args: {
  adultUserId: string
  adultProfileId?: string
}): Promise<Array<{ link: StudentLink; profile: StudentProfile }>> {
  const links = await listAdultLinks(args.adultUserId)
  const accepted = links.filter(
    (l) =>
      l.status === 'accepted' &&
      l.kind === 'student' &&
      l.studentProfileId &&
      (!args.adultProfileId || l.adultProfileId === args.adultProfileId),
  )
  const loaded = await Promise.all(
    accepted.map(async (link) => {
      const blob = await loadLinkedStudentProfile(link.studentProfileId!)
      if (!blob) return null
      return { link, profile: migrateProfile(blob) }
    }),
  )
  return loaded.filter(
    (r): r is { link: StudentLink; profile: StudentProfile } => r !== null,
  )
}

/**
 * Adult writes the four "path dial" fields on a linked student's profile.
 * Goes through the SECURITY DEFINER stored function `update_linked_student_path`
 * because RLS cannot restrict writes to specific keys in a jsonb blob —
 * the function verifies the caller has an accepted link and patches only
 * the permitted fields.
 */
export async function updateLinkedStudentPath(args: {
  studentProfileId: string
  currentLevel: string
  currentBand: string
  selectedStudyPlanId: string | null
  examDate: string | null
}): Promise<{ error?: string }> {
  const supabase = createClient()
  const { error } = await supabase.rpc('update_linked_student_path', {
    p_student_profile_id: args.studentProfileId,
    p_current_level: args.currentLevel,
    p_current_band: args.currentBand,
    p_selected_study_plan_id: args.selectedStudyPlanId,
    p_exam_date: args.examDate,
  })
  if (error) return { error: error.message }
  return {}
}

// ---------------------------------------------------------------------------
// Co-parent invites — parent → parent linking with fan-out at acceptance.
//
// Wire-up notes:
//   - createCoParentInvite() POSTs to a dedicated route
//     (/api/student-links/co-parent-invite) that mirrors the student-invite
//     route but stamps `kind='co_parent'` on the row and gates the inviter's
//     profile role to 'parent' only (not 'parent' OR 'teacher').
//   - acceptCoParentInvite() calls the SECURITY DEFINER fn
//     `accept_co_parent_invite(link_id, co_parent_profile_id)` from migration
//     0004, which authenticates the caller, fans out one
//     `kind='student'` accepted link per child the inviter currently has,
//     and marks the original co-parent invite row accepted.
//   - kind='co_parent' rows are filtered out of acceptPendingInvitesForCurrentUser
//     above so the student-side auto-accept doesn't try to attach them to
//     a student profile.
// ---------------------------------------------------------------------------

export async function createCoParentInvite(args: {
  adultProfileId: string
  invitedEmail: string
  adultLabel?: string | null
}): Promise<{
  link?: StudentLink
  emailSent?: boolean
  emailReason?: InviteEmailReason
  error?: string
}> {
  const email = args.invitedEmail.trim()
  if (!email || !/@/.test(email)) {
    return { error: 'Enter a valid email.' }
  }
  let res: Response
  try {
    res = await fetch('/api/student-links/co-parent-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adultProfileId: args.adultProfileId,
        invitedEmail: email,
        adultLabel: args.adultLabel ?? null,
      }),
    })
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Network error.' }
  }
  let json: {
    link?: StudentLinkRow
    emailSent?: boolean
    emailReason?: InviteEmailReason
    error?: string
  }
  try {
    json = await res.json()
  } catch {
    return { error: `Server error (${res.status}).` }
  }
  if (!res.ok) {
    return { error: json.error || `Server error (${res.status}).` }
  }
  return {
    link: json.link ? rowToLink(json.link) : undefined,
    emailSent: !!json.emailSent,
    emailReason: json.emailReason,
  }
}

/**
 * Accept a kind='co_parent' invite and trigger the server-side fan-out.
 *
 * Returns the count of new student links created. 0 is a valid success
 * outcome (e.g. the inviter has no accepted children yet, or the co-parent
 * already had links to all the inviter's children).
 *
 * The caller passes their own parent profile id (the one they want the
 * fan-out attached to). The SECURITY DEFINER function verifies they own
 * that profile AND it has role='parent' before fanning out.
 */
export async function acceptCoParentInvite(args: {
  linkId: string
  coParentProfileId: string
}): Promise<{ created?: number; error?: string }> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('accept_co_parent_invite', {
    p_link_id: args.linkId,
    p_co_parent_profile_id: args.coParentProfileId,
  })
  if (error) return { error: error.message }
  // The fn returns an integer; supabase-js types it as `unknown` after rpc.
  const created = typeof data === 'number' ? data : 0
  return { created }
}

/**
 * Inviter (the parent who created a kind='co_parent' invite) revokes it.
 * Goes through the SECURITY DEFINER fn `revoke_co_parent_invite` which:
 *   1. Verifies the caller owns the co-parent invite row.
 *   2. Marks the invite row revoked.
 *   3. Cascades to every fanned-out kind='student' row (joined via
 *      `source_link_id`) and revokes them too — so the co-parent
 *      genuinely loses visibility into the children.
 *
 * Returns `{ cascaded }` — the count of child links that were also
 * revoked, used to make the success toast specific
 * ("Revoked. {N} child links also removed.").
 *
 * IMPORTANT: do NOT use `revokeLink()` for kind='co_parent' rows. That helper
 * only updates the invite row itself and leaves the cascaded children with
 * full visibility — which directly contradicts the UI's prompt.
 */
export async function revokeCoParentInvite(args: {
  linkId: string
  revokedBy?: 'adult' | 'student'
}): Promise<{ cascaded?: number; error?: string }> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('revoke_co_parent_invite', {
    p_link_id: args.linkId,
    p_revoked_by: args.revokedBy ?? 'adult',
  })
  if (error) return { error: error.message }
  const cascaded = typeof data === 'number' ? data : 0
  return { cascaded }
}

/**
 * Co-parent invites visible to the current authenticated user, filtered to
 * pending kind='co_parent' rows addressed to their email. RLS already
 * scopes the SELECT (student_links_select_student matches by auth.email());
 * we filter client-side because the same RLS that lets the user see student
 * invites also surfaces their co-parent invites here.
 */
export async function listPendingCoParentInvitesForCurrentUser(): Promise<StudentLink[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('student_links')
    .select('*')
    .eq('status', 'pending')
    .eq('kind', 'co_parent')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[studentLinks] listPendingCoParentInvitesForCurrentUser', error)
    return []
  }
  return (data as StudentLinkRow[]).map(rowToLink)
}
