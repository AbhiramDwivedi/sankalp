'use client'

// -----------------------------------------------------------------------------
// ProfileProvider + useProfile — Supabase-backed client context.
//
// The provider resolves state in this order:
//   1. Read the current Supabase auth session.
//   2. If signed in, fetch all profiles owned by auth.uid() from `public.profiles`.
//   3. If signed-in user has zero remote profiles AND legacy localStorage
//      profiles exist on this device, stash them in `pendingLocal` so the
//      onboarding page can prompt the user to adopt or start fresh. This is
//      the one-time migration path from the pre-auth, localStorage-only era.
//   4. If not signed in, profiles is empty — the middleware prevents gated
//      routes from rendering without a session, so this state is reachable
//      only from public marketing routes.
//
// Writes are optimistic: local state updates immediately, Supabase calls are
// fire-and-forget (debounced for `setProfile` which fires on every progress
// increment). Errors surface as a sonner toast but do not block the UI —
// this matches the original localStorage "best effort" semantics so a brief
// network blip doesn't break a lesson.
//
// The public API (profile / profiles / activeId / setProfile / switchProfile
// / saveAllProfiles) is unchanged from the localStorage era so the 20+
// existing consumers keep working; `authUser`, `hasPendingLocalMigration`,
// `adoptLocalProfiles`, `discardLocalProfiles`, and `signOut` are net-new.
// -----------------------------------------------------------------------------

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { User } from '@supabase/supabase-js'
import { toast } from 'sonner'
import type { StudentProfile } from '@/types'
import { migrateProfile } from '@/types'
import { createClient } from '@/lib/supabase/client'

const LEGACY_PROFILES_KEY = 'sankalpa_hindi_profiles'
const LEGACY_ACTIVE_ID_KEY = 'sankalpa_active_id'
const ACTIVE_ID_KEY = 'sankalpa_active_id'

interface ProfileContextValue {
  hydrated: boolean
  authUser: User | null
  profile: StudentProfile | null
  profiles: StudentProfile[]
  activeId: string | null
  setProfile: (
    updater: StudentProfile | ((prev: StudentProfile) => StudentProfile),
  ) => void
  switchProfile: (id: string | null) => void
  saveAllProfiles: (next: StudentProfile[]) => void
  /** True when the signed-in user has 0 remote profiles but local legacy
   *  profiles still exist on this device. The onboarding route renders a
   *  prompt gated on this. */
  hasPendingLocalMigration: boolean
  pendingLocalProfiles: StudentProfile[]
  /** Copy local profiles into this user's account and clear local storage. */
  adoptLocalProfiles: () => Promise<void>
  /** Abandon the local profiles without adopting; user starts fresh. */
  discardLocalProfiles: () => void
  signOut: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

type DbRow = { id: string; data: Record<string, unknown> }

function rowToProfile(row: DbRow): StudentProfile {
  // Canonicalize: DB row id always wins over any id embedded in the blob.
  return migrateProfile({ ...row.data, id: row.id })
}

function profileToData(profile: StudentProfile): Record<string, unknown> {
  // Strip the id out of the blob — it lives in its own column. Keeping a
  // copy would risk drift if it's ever edited out-of-band.
  const { id: _id, ...rest } = profile
  return rest
}

function readLegacyProfiles(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(LEGACY_PROFILES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(migrateProfile)
  } catch {
    return []
  }
}

function clearLegacyProfiles() {
  try {
    localStorage.removeItem(LEGACY_PROFILES_KEY)
    localStorage.removeItem(LEGACY_ACTIVE_ID_KEY)
  } catch {
    /* ignore */
  }
}

function writeLegacyProfiles(next: StudentProfile[]) {
  try {
    localStorage.setItem(LEGACY_PROFILES_KEY, JSON.stringify(next))
  } catch {
    /* ignore — storage quota / private mode */
  }
}

function readActiveId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_ID_KEY)
  } catch {
    return null
  }
}

function writeActiveId(id: string | null) {
  try {
    if (id) localStorage.setItem(ACTIVE_ID_KEY, id)
    else localStorage.removeItem(ACTIVE_ID_KEY)
  } catch {
    /* ignore */
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), [])
  const [hydrated, setHydrated] = useState(false)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [profiles, setProfiles] = useState<StudentProfile[]>([])
  const [activeId, setActiveIdState] = useState<string | null>(null)
  const [pendingLocalProfiles, setPendingLocalProfiles] = useState<StudentProfile[]>([])

  // Debounced Supabase writes per profile id. A single active user can fire
  // 5–10 `setProfile` calls per minute (flashcard ratings, pack completion,
  // streak pings); the 500 ms coalesce keeps that well under the default
  // Supabase rate limit without being user-visible.
  const writeTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  // -- Auth ----------------------------------------------------------------
  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      setAuthUser(data.user ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null)
    })
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [supabase])

  // -- Profile load -------------------------------------------------------
  useEffect(() => {
    let cancelled = false
    setHydrated(false)

    async function load() {
      if (!authUser) {
        // Not signed in. Middleware blocks this path on gated routes in
        // production, so we only reach here from public marketing routes
        // (landing / overview / audit / rubric / how-this-works) or the
        // E2E_AUTH_BYPASS path used by the smoke suite. Fall back to the
        // localStorage state so those surfaces still render meaningful
        // "Go to Dashboard" CTAs for returning users who completed
        // onboarding, and so E2E tests can persist profiles across full
        // page navigations without a real session.
        if (cancelled) return
        const local = readLegacyProfiles()
        setProfiles(local)
        setPendingLocalProfiles([])
        const storedActive = readActiveId()
        const chosen =
          storedActive && local.some((p) => p.id === storedActive)
            ? storedActive
            : (local[0]?.id ?? null)
        setActiveIdState(chosen)
        setHydrated(true)
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, data')
        .eq('owner_user_id', authUser.id)
        .order('created_at', { ascending: true })

      if (cancelled) return

      if (error) {
        console.error('[profile-context] Failed to load profiles', error)
        toast.error("Couldn't load your profiles. Please refresh.")
        setProfiles([])
        setHydrated(true)
        return
      }

      const loaded = (data || []).map((row) => rowToProfile(row as DbRow))
      setProfiles(loaded)

      // Legacy-migration probe: only when the authed user has zero remote
      // profiles do we surface local ones. If they already have remote state
      // the local copy is noise and we leave it (they can clear storage from
      // the browser if they care).
      const legacy = loaded.length === 0 ? readLegacyProfiles() : []
      setPendingLocalProfiles(legacy)

      // Last-active id: localStorage preference if it still matches a
      // profile; else first.
      const storedActive = readActiveId()
      const chosen =
        storedActive && loaded.some((p) => p.id === storedActive)
          ? storedActive
          : (loaded[0]?.id ?? null)
      setActiveIdState(chosen)
      setHydrated(true)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [authUser, supabase])

  // -- Writes --------------------------------------------------------------
  const schedulePersist = useCallback(
    (profile: StudentProfile) => {
      if (!authUser) return
      const id = profile.id
      if (writeTimers.current[id]) clearTimeout(writeTimers.current[id])
      writeTimers.current[id] = setTimeout(async () => {
        const { error } = await supabase
          .from('profiles')
          .update({ data: profileToData(profile) })
          .eq('id', id)
          .eq('owner_user_id', authUser.id)
        if (error) {
          console.error('[profile-context] Failed to persist profile', error)
          toast.error("Couldn't save progress. Check your connection.")
        }
      }, 500)
    },
    [authUser, supabase],
  )

  const setProfile = useCallback<ProfileContextValue['setProfile']>(
    (updater) => {
      if (!activeId) return
      setProfiles((prev) => {
        let updated: StudentProfile | null = null
        const next = prev.map((p) => {
          if (p.id !== activeId) return p
          updated =
            typeof updater === 'function'
              ? (updater as (p: StudentProfile) => StudentProfile)(p)
              : updater
          return updated
        })
        if (updated) {
          if (authUser) schedulePersist(updated)
          else writeLegacyProfiles(next)
        }
        return next
      })
    },
    [activeId, authUser, schedulePersist],
  )

  const switchProfile = useCallback((id: string | null) => {
    setActiveIdState(id)
    writeActiveId(id)
  }, [])

  const saveAllProfiles = useCallback<ProfileContextValue['saveAllProfiles']>(
    (next) => {
      // Optimistic update first so onboarding transitions feel instant.
      setProfiles((prev) => {
        // Diff to know which rows to delete remotely.
        const nextIds = new Set(next.map((p) => p.id))
        const removed = prev.filter((p) => !nextIds.has(p.id))

        if (authUser) {
          const rows = next.map((p) => ({
            id: p.id,
            owner_user_id: authUser.id,
            data: profileToData(p),
          }))
          // Upsert every row (insert new, overwrite existing).
          supabase
            .from('profiles')
            .upsert(rows, { onConflict: 'id' })
            .then(({ error }) => {
              if (error) {
                console.error('[profile-context] upsert failed', error)
                toast.error("Couldn't sync profiles. Please refresh.")
              }
            })
          if (removed.length > 0) {
            supabase
              .from('profiles')
              .delete()
              .in(
                'id',
                removed.map((p) => p.id),
              )
              .then(({ error }) => {
                if (error) {
                  console.error('[profile-context] delete failed', error)
                }
              })
          }
        } else {
          writeLegacyProfiles(next)
        }

        return next
      })
    },
    [authUser, supabase],
  )

  // -- Migration -----------------------------------------------------------
  const adoptLocalProfiles = useCallback(async () => {
    if (!authUser || pendingLocalProfiles.length === 0) return
    const rows = pendingLocalProfiles.map((p) => ({
      id: p.id,
      owner_user_id: authUser.id,
      data: profileToData(p),
    }))
    const { error } = await supabase.from('profiles').insert(rows)
    if (error) {
      console.error('[profile-context] adopt failed', error)
      toast.error("Couldn't copy local progress into your account.")
      return
    }
    setProfiles(pendingLocalProfiles)
    const firstId = pendingLocalProfiles[0]?.id ?? null
    setActiveIdState(firstId)
    writeActiveId(firstId)
    setPendingLocalProfiles([])
    clearLegacyProfiles()
    toast.success('Local progress moved into your account.')
  }, [authUser, pendingLocalProfiles, supabase])

  const discardLocalProfiles = useCallback(() => {
    setPendingLocalProfiles([])
    clearLegacyProfiles()
  }, [])

  const signOut = useCallback(async () => {
    // Flush any pending per-profile debounced writes so a timer scheduled
    // within the last 500 ms doesn't fire against an expired session and
    // surface a "Couldn't save progress" toast to the next visitor.
    for (const t of Object.values(writeTimers.current)) clearTimeout(t)
    writeTimers.current = {}
    await supabase.auth.signOut()
    // authUser goes null via onAuthStateChange; the load effect clears
    // profiles naturally.
  }, [supabase])

  const profile = useMemo(
    () => profiles.find((p) => p.id === activeId) || null,
    [profiles, activeId],
  )

  const value = useMemo<ProfileContextValue>(
    () => ({
      hydrated,
      authUser,
      profile,
      profiles,
      activeId,
      setProfile,
      switchProfile,
      saveAllProfiles,
      hasPendingLocalMigration: pendingLocalProfiles.length > 0,
      pendingLocalProfiles,
      adoptLocalProfiles,
      discardLocalProfiles,
      signOut,
    }),
    [
      hydrated,
      authUser,
      profile,
      profiles,
      activeId,
      setProfile,
      switchProfile,
      saveAllProfiles,
      pendingLocalProfiles,
      adoptLocalProfiles,
      discardLocalProfiles,
      signOut,
    ],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    // Outside a provider (tests, storybook) — a stable null-shaped context
    // so components don't crash.
    return {
      hydrated: false,
      authUser: null,
      profile: null,
      profiles: [],
      activeId: null,
      setProfile: () => {},
      switchProfile: () => {},
      saveAllProfiles: () => {},
      hasPendingLocalMigration: false,
      pendingLocalProfiles: [],
      adoptLocalProfiles: async () => {},
      discardLocalProfiles: () => {},
      signOut: async () => {},
    }
  }
  return ctx
}
