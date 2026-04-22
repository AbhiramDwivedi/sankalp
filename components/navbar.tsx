'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  Menu,
  X,
  LayoutDashboard,
  Layers,
  Target,
  CalendarDays,
  ClipboardList,
  Compass,
  Flame,
  Sparkles,
  Settings,
  UserPlus,
  Check,
  GraduationCap,
  Users,
  LogOut,
  LogIn,
} from 'lucide-react'
import { useState } from 'react'
import { useProfile } from '@/lib/profile-context'
import { computeStreak } from '@/lib/streak'
import { computeXp } from '@/lib/xp'

// Sankalp's top-of-app chrome. Now auth-aware: signed-out visitors on public
// marketing routes (/, /overview, /audit, /rubric, /how-this-works) see a
// Sign-in button instead of the progress pills + avatar dropdown; signed-in
// users see the same dropdown as before with a new Sign-out row.
const navItems: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/overview', label: 'Overview', icon: Compass },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
  { href: '/capstones', label: 'Capstones', icon: Target },
  { href: '/plan', label: 'Plan', icon: CalendarDays },
  { href: '/rubric', label: 'Rubric', icon: ClipboardList },
]

const ROLE_ICON: Record<'student' | 'teacher' | 'parent', React.ComponentType<{ className?: string }>> = {
  student: GraduationCap,
  teacher: BookOpen,
  parent: Users,
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { hydrated, authUser, profile, profiles, activeId, switchProfile, signOut } = useProfile()

  // The navbar distinguishes two concerns:
  //   hasProfile  — do we show the progress pills + avatar dropdown?
  //   isAuthed    — do we show Sign out?
  // These can diverge only in E2E bypass mode (profile in localStorage, no
  // real session); in production they move together because middleware
  // prevents unauth users from ever having an active profile context.
  const hasProfile = hydrated && !!profile
  const isAuthed = hydrated && !!authUser

  // Hydrate streak + XP from the active profile (teacher/parent pills reflect
  // their demo student's progress — the demo dashboard's whole point).
  const role = profile?.role ?? 'student'
  const demo = profile?.demoStudent
  const xpSource =
    hydrated && profile
      ? role !== 'student' && demo
        ? {
            completedTopicIds: demo.completedTopicIds,
            completedCapstoneIds: demo.completedCapstoneIds,
            flashcardsMastered: demo.flashcardsMastered,
            evaluations: {},
            speakingRecordings: {},
          }
        : profile
      : null
  const streakSource =
    hydrated && profile
      ? role !== 'student' && demo
        ? demo.activityDates
        : profile.activityDates
      : undefined

  const placeholderName = hydrated && profile ? profile.name : 'Student'
  const initials =
    hydrated && profile && profile.name
      ? profile.name.trim().charAt(0).toUpperCase() || 'S'
      : 'S'
  const streakDays = streakSource ? computeStreak(streakSource) : 0
  const xpTotal = xpSource ? computeXp(xpSource) : 0

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  async function handleSignOut() {
    await signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="font-bold text-lg">सं</span>
          </div>
          <span className="font-semibold text-xl text-foreground">Sankalp</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive(item.href) ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right rail: streak + XP + avatar whenever a profile exists; Sign-in button otherwise */}
        <div className="hidden md:flex items-center gap-3">
          {hasProfile ? (
            <>
              <div
                className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm"
                aria-label={`${streakDays} day streak`}
              >
                <Flame className="h-4 w-4 text-primary" aria-hidden />
                <span className="font-medium text-foreground">{streakDays}</span>
                <span className="text-muted-foreground">day streak</span>
              </div>
              <div
                className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm"
                aria-label={`${xpTotal} XP`}
              >
                <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                <span className="font-medium text-foreground">{xpTotal}</span>
                <span className="text-muted-foreground">XP</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="Profile menu">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium truncate">{placeholderName}</p>
                      <p className="text-xs text-muted-foreground truncate capitalize">
                        {authUser?.email ?? `${role} profile`}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {profiles.length > 0 ? (
                    <>
                      <DropdownMenuSeparator />
                      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Switch profile
                      </div>
                      {profiles.map((p) => {
                        const pRole = (p.role ?? 'student') as 'student' | 'teacher' | 'parent'
                        const Icon = ROLE_ICON[pRole]
                        const isActiveProfile = p.id === activeId
                        return (
                          <DropdownMenuItem
                            key={p.id}
                            onSelect={() => switchProfile(p.id)}
                            className="cursor-pointer"
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            <span className="flex-1 truncate">{p.name}</span>
                            {isActiveProfile ? <Check className="h-4 w-4 text-primary" /> : null}
                          </DropdownMenuItem>
                        )
                      })}
                    </>
                  ) : null}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/onboarding" className="cursor-pointer">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add profile
                    </Link>
                  </DropdownMenuItem>
                  {isAuthed ? (
                    <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild variant="secondary" size="sm">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors',
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border pt-4 mt-2 flex flex-col gap-2">
              {hasProfile ? (
                <>
                  <div className="flex items-center gap-2 pb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{placeholderName}</p>
                      <p className="text-xs text-muted-foreground truncate capitalize">
                        {authUser?.email ?? `${role} profile`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                      <Flame className="h-4 w-4 text-primary" aria-hidden />
                      <span className="font-medium">{streakDays}</span>
                      <span className="text-muted-foreground">day streak</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                      <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                      <span className="font-medium">{xpTotal}</span>
                      <span className="text-muted-foreground">XP</span>
                    </span>
                  </div>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  {isAuthed ? (
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground text-left"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        handleSignOut()
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  ) : null}
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
