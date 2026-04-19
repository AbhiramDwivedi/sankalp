import Link from 'next/link'

// Three-column footer that matches the app's real IA. The v0 "Languages"
// column (Tamil / Telugu / Kannada tiles) moved up to the landing page
// where it's clearer those are aspirational. "Reference" groups the
// things a parent or teacher reads rather than a student does day-to-day.
const footerLinks = {
  learn: [
    { href: '/lessons', label: 'Lessons' },
    { href: '/flashcards', label: 'Flashcards' },
    { href: '/capstones', label: 'Capstones' },
  ],
  reference: [
    { href: '/plan', label: 'Plan' },
    { href: '/rubric', label: 'Rubric' },
    { href: '/audit', label: 'Credit audit' },
  ],
  about: [
    { href: '/how-this-works', label: 'How this works' },
    { href: '/settings', label: 'Settings' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 rounded-t-2xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="font-bold text-lg">सं</span>
              </div>
              <span className="font-semibold text-xl text-foreground">Sankalp</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sankalp — Hindi learning for US middle-schoolers aiming at STAMP proficiency. Built for students,
              parents, and teachers.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Learn</h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reference */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Reference</h3>
            <ul className="space-y-2">
              {footerLinks.reference.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Sankalp — built for FCPS World Language Credit (STAMP 2S/WS Hindi).
          </p>
          <p className="text-sm text-muted-foreground">
            Local-only. No login, no accounts, no data leaves your browser.
          </p>
        </div>
      </div>
    </footer>
  )
}
