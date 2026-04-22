import { Suspense } from 'react'
import Link from 'next/link'
import { LoginForm } from './LoginForm'

// Minimal auth layout: Sankalp logo + centered form. Deliberately does not
// render the full Navbar/Footer chrome — those are for signed-in product
// surfaces. Public marketing pages (/, /how-this-works, etc.) stay free of
// this shell.

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-bold text-lg">सं</span>
            </div>
            <span className="font-semibold text-xl text-foreground">Sankalp</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
