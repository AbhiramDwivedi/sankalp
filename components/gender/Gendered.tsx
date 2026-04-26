'use client'

// -----------------------------------------------------------------------------
// Gendered first-person rendering primitives.
//
// Hindi grammar agrees with the speaker's gender for many verbs, adjectives,
// and participles ("मैं गया" vs "मैं गई"). The active student profile carries
// an optional `gender` field; this module is the single read-side helper for
// rendering content in the right form.
//
// Default behavior (per product spec): unset / undefined gender renders the
// MALE form. Authors should treat male as the conservative default and only
// add `f="..."` overrides where the form genuinely changes.
//
// Two surfaces:
//   <G m="गया" f="गई" />            — JSX-tree consumer; reads useProfile()
//   genderedText(gender, m, f)       — pure helper for non-JSX call sites
//                                      (e.g. building a string ahead of time)
//   pickGenderedHindi(version, ...)  — capstone EssayVersion picker that
//                                      respects hindiMale / hindiFemale
//                                      overrides and falls back to `hindi`.
//
// Both <G> and genderedText treat `gender === 'female'` as the only signal
// for the female form; literally everything else (undefined, 'male', 'foo')
// resolves to male. This is intentional — see CLAUDE.md "Default = male".
// -----------------------------------------------------------------------------

import type React from 'react'
import { useProfile } from '@/lib/profile-context'
import type { StudentGender } from '@/types'
import type { EssayVersion } from '@/content/schema'

interface Props {
  /** Male form (also the default when no profile / gender is unset). */
  m: React.ReactNode
  /** Female form. */
  f: React.ReactNode
}

/**
 * Renders the form matching the active student profile's gender.
 * Default (unset, missing profile, non-female value) → male.
 * Must be used inside the React tree (Client Component — depends on
 * `useProfile()`). For prose-side string interpolation use `genderedText`.
 */
export function G({ m, f }: Props) {
  const { profile } = useProfile()
  return <>{profile?.gender === 'female' ? f : m}</>
}

/**
 * String helper for prose interpolation outside the JSX tree (rare in
 * Sankalp content today — the schema is mostly JSX-rendered or string-typed
 * model essays). Pure: takes the gender as input rather than reading
 * context, so it is safe to call from server components, validators, and
 * scripts.
 */
export function genderedText(
  gender: StudentGender | undefined,
  m: string,
  f: string,
): string {
  return gender === 'female' ? f : m
}

/**
 * Pick the right Hindi string from a capstone `EssayVersion`. Honors
 * optional `hindiMale` / `hindiFemale` overrides and falls back to the
 * authored `hindi` field when an override is absent. Default-male per spec.
 *
 * Symmetric helper for transliteration is available via
 * `pickGenderedTransliteration`.
 */
export function pickGenderedHindi(
  version: Pick<EssayVersion, 'hindi' | 'hindiMale' | 'hindiFemale'>,
  gender: StudentGender | undefined,
): string {
  if (gender === 'female') return version.hindiFemale ?? version.hindi
  return version.hindiMale ?? version.hindi
}

export function pickGenderedTransliteration(
  version: Pick<
    EssayVersion,
    'transliteration' | 'transliterationMale' | 'transliterationFemale'
  >,
  gender: StudentGender | undefined,
): string {
  if (gender === 'female')
    return version.transliterationFemale ?? version.transliteration
  return version.transliterationMale ?? version.transliteration
}
