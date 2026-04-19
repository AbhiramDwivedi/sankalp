'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  Flame,
  Sparkles,
  Settings,
  UserCog,
} from 'lucide-react'
import { useState } from 'react'

// Sankalp has a single-role, local-only student shell — no login, no roles
// bolted onto the navbar. The six primary destinations below match the tabs
// in components/Layout.tsx (the Vite/SPA shell we're migrating from), so a
// returning student sees the same IA. Streak + XP pills are placeholders
// here; Phase 3 wires them to the active profile.
const navItems: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
  { href: '/capstones', label: 'Capstones', icon: Target },
  { href: '/plan', label: 'Plan', icon: CalendarDays },
  { href: '/rubric', label: 'Rubric', icon: ClipboardList },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Placeholder student identity for the avatar bubble. Phase 3 hydrates
  // these from localStorage (sankalpa_hindi_profiles / sankalpa_active_id).
  const placeholderName = 'Student'
  const initials = 'S'
  const streakDays = 0
  const xpTotal = 0

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

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

        {/* Right rail: streak + XP + avatar */}
        <div className="hidden md:flex items-center gap-3">
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
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{placeholderName}</p>
                  <p className="text-xs text-muted-foreground">Local profile</p>
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
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                {/* Phase 3 wires real profile swap; dead link for now. */}
                <Link href="#" className="cursor-pointer" aria-disabled>
                  <UserCog className="mr-2 h-4 w-4" />
                  Switch profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <div className="flex items-center gap-2 pb-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{placeholderName}</p>
                  <p className="text-xs text-muted-foreground">Local profile</p>
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
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
