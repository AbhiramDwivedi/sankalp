// Supabase client helpers for parent/teacher ↔ student linking. See the
// 0002_student_links migration for the underlying table, RLS, and the
// SECURITY DEFINER function that mediates adult → student path-dial writes.
//
// All functions here assume the caller is signed in; RLS enforces that
// users can only see / create / update / revoke rows they are party to.

import { createClient } from '@/lib/supabase/client'
import type { StudentLink, StudentLinkStatus, StudentProfile } from '@/types'

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
  }
}

/**
 * Adult creates a pending invite. The row starts with `status='pending'`
 * and no student ids — those fill in when the student accepts. Duplicate
 * pending invites from the same adult to the same email are rejected by
 * a unique partial index; the caller can treat that as "already invited".
 */
export async function createInvite(args: {
  adultProfileId: string
  adultUserId: string
  invitedEmail: string
  adultLabel?: string | null
}): Promise<{ link?: StudentLink; error?: string }> {
  const supabase = createClient()
  const email = args.invitedEmail.trim()
  if (!email || !/@/.test(email)) {
    return { error: 'Enter a valid email.' }
  }
  const { data, error } = await supabase
    .from('student_links')
    .insert({
      adult_profile_id: args.adultProfileId,
      adult_user_id: args.adultUserId,
      invited_email: email,
      adult_label: args.adultLabel ?? null,
    })
    .select('*')
    .single()
  if (error) {
    // Unique-constraint violation on (adult, email) while pending — surface
    // a friendlier message instead of the Postgres code.
    if (error.code === '23505') {
      return { error: 'You already have a pending invite to that address.' }
    }
    return { error: error.message }
  }
  return { link: rowToLink(data as StudentLinkRow) }
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
