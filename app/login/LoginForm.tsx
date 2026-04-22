'use client'

// Two-stage email OTP sign-in. Stage 1 collects an email and asks Supabase to
// send a 6-digit code; stage 2 verifies the code and redirects. A `redirect`
// query parameter carries the original destination (set by middleware when
// bouncing an unauthenticated user off a gated route). A `role` query is
// honored for users arriving from the landing CTAs so a brand-new account
// lands on the role-tagged onboarding flow.

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'

type Stage = 'email' | 'otp'

const VALID_ROLES = new Set(['student', 'teacher', 'parent'])

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [stage, setStage] = useState<Stage>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [pending, startTransition] = useTransition()

  const redirectParam = searchParams.get('redirect')
  const roleParam = searchParams.get('role')
  const safeRole = roleParam && VALID_ROLES.has(roleParam) ? roleParam : null

  function resolveDestination(): string {
    // If middleware bounced us with a specific redirect target, honor it.
    if (redirectParam && redirectParam.startsWith('/')) return redirectParam
    // Otherwise, if a role was carried forward from a landing CTA, deep-link
    // to onboarding so a brand-new account picks up that role. Onboarding
    // itself short-circuits to /dashboard when a profile already exists.
    if (safeRole) return `/onboarding?role=${safeRole}`
    return '/dashboard'
  }

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    const normalized = email.trim()
    if (!normalized) return
    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email: normalized,
        options: { shouldCreateUser: true },
      })
      if (error) {
        toast.error(error.message)
        return
      }
      toast.success('Code sent — check your email')
      setStage('otp')
    })
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) return
    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otp,
        type: 'email',
      })
      if (error) {
        toast.error(error.message)
        setOtp('')
        return
      }
      router.push(resolveDestination())
      router.refresh()
    })
  }

  if (stage === 'email') {
    return (
      <form
        onSubmit={handleSendOtp}
        className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4"
      >
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            We&rsquo;ll email you a 6-digit code. No password needed.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Sending…' : 'Send code'}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          New here? A code to any email address creates an account.
        </p>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleVerifyOtp}
      className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4"
    >
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Enter the code</h1>
        <p className="text-sm text-muted-foreground">
          Sent to <span className="font-medium text-foreground">{email}</span>. Check spam if you don&rsquo;t see it.
        </p>
      </div>
      <div className="flex justify-center py-2">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          autoFocus
          disabled={pending}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => {
            setStage('email')
            setOtp('')
          }}
          disabled={pending}
        >
          Change email
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={pending || otp.length !== 6}
        >
          {pending ? 'Verifying…' : 'Sign in'}
        </Button>
      </div>
    </form>
  )
}
