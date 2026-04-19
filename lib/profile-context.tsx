'use client'

// -----------------------------------------------------------------------------
// ProfileProvider + useProfile — Phase 2b client context.
//
// Single source of truth for the active student profile in the Next.js App
// Router tree. Reads and writes the same localStorage keys the Vite SPA used
// (sankalpa_hindi_profiles + sankalpa_active_id), runs migrateProfile() on
// every read so legacy records keep working, and exposes a minimal surface
// that the route-level page wrappers call into:
//
//   profile        — currently selected StudentProfile, or null.
//   setProfile     — apply an updater function (or a new profile) to the
//                     active profile. Persists to localStorage and updates
//                     the in-memory list.
//   profiles       — all saved profiles.
//   activeId       — id of the active profile (null if none).
//   switchProfile  — swap the active id (also writes ACTIVE_ID_KEY).
//   saveAllProfiles — wholesale replace of the profiles array. Used by the
//                     onboarding flow and future settings profile CRUD.
//
// Phase 3 will layer role-awareness on top of this; for now it's the
// content-routing glue.
// -----------------------------------------------------------------------------

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { StudentProfile } from '@/types'
import { migrateProfile } from '@/types'

const PROFILES_KEY = 'sankalpa_hindi_profiles'
const ACTIVE_ID_KEY = 'sankalpa_active_id'

interface ProfileContextValue {
  hydrated: boolean
  profile: StudentProfile | null
  profiles: StudentProfile[]
  activeId: string | null
  setProfile: (
    updater: StudentProfile | ((prev: StudentProfile) => StudentProfile),
  ) => void
  switchProfile: (id: string | null) => void
  saveAllProfiles: (next: StudentProfile[]) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [profiles, setProfiles] = useState<StudentProfile[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  // Hydrate from localStorage once on mount. Failure to parse is non-fatal —
  // the provider simply starts with an empty state and the UI routes users
  // through onboarding.
  useEffect(() => {
    try {
      const rawProfiles = localStorage.getItem(PROFILES_KEY)
      const storedActive = localStorage.getItem(ACTIVE_ID_KEY)
      if (rawProfiles) {
        const parsed = JSON.parse(rawProfiles)
        if (Array.isArray(parsed)) {
          const migrated = parsed.map(migrateProfile)
          setProfiles(migrated)
          if (storedActive && migrated.some((p) => p.id === storedActive)) {
            setActiveId(storedActive)
          }
        }
      }
    } catch {
      // corrupted localStorage — fall through to empty state.
    }
    setHydrated(true)
  }, [])

  const persistProfiles = useCallback((next: StudentProfile[]) => {
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(next))
    } catch {
      // storage quota / private mode — swallow; in-memory state is still
      // consistent, and the next mount will simply return an empty list.
    }
  }, [])

  const saveAllProfiles = useCallback(
    (next: StudentProfile[]) => {
      setProfiles(next)
      persistProfiles(next)
    },
    [persistProfiles],
  )

  const switchProfile = useCallback((id: string | null) => {
    setActiveId(id)
    try {
      if (id) localStorage.setItem(ACTIVE_ID_KEY, id)
      else localStorage.removeItem(ACTIVE_ID_KEY)
    } catch {
      // ignore storage failure; active id is still tracked in state.
    }
  }, [])

  const setProfile = useCallback<ProfileContextValue['setProfile']>(
    (updater) => {
      setProfiles((prev) => {
        if (!activeId) return prev
        const next = prev.map((p) => {
          if (p.id !== activeId) return p
          return typeof updater === 'function'
            ? (updater as (p: StudentProfile) => StudentProfile)(p)
            : updater
        })
        persistProfiles(next)
        return next
      })
    },
    [activeId, persistProfiles],
  )

  const profile = useMemo(
    () => profiles.find((p) => p.id === activeId) || null,
    [profiles, activeId],
  )

  const value = useMemo<ProfileContextValue>(
    () => ({
      hydrated,
      profile,
      profiles,
      activeId,
      setProfile,
      switchProfile,
      saveAllProfiles,
    }),
    [hydrated, profile, profiles, activeId, setProfile, switchProfile, saveAllProfiles],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    // Outside a provider, return a stable null-shaped context so components
    // that render in tests without the provider don't crash. Writes are
    // no-ops.
    return {
      hydrated: false,
      profile: null,
      profiles: [],
      activeId: null,
      setProfile: () => {},
      switchProfile: () => {},
      saveAllProfiles: () => {},
    }
  }
  return ctx
}
