import Link from 'next/link'

const footerLinks = {
  learn: [
    { href: '/courses', label: 'Courses' },
    { href: '/lessons', label: 'Lessons' },
    { href: '/practice', label: 'Practice' },
    { href: '/exams', label: 'Mock Exams' },
  ],
  resources: [
    { href: '/resources', label: 'Parent Guide' },
    { href: '/resources/curriculum', label: 'Curriculum' },
    { href: '/resources/rubrics', label: 'Assessment Rubrics' },
    { href: '/resources/faq', label: 'FAQ' },
  ],
  languages: [
    { href: '/courses/hindi', label: 'Hindi' },
    { href: '/courses/tamil', label: 'Tamil (Coming Soon)' },
    { href: '/courses/telugu', label: 'Telugu (Coming Soon)' },
    { href: '/courses/kannada', label: 'Kannada (Coming Soon)' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold text-lg">सं</span>
              </div>
              <span className="font-semibold text-xl text-foreground">Sankalp</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering middle school students to learn Indian languages and earn world language credit through engaging, interactive lessons.
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

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
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

          {/* Languages */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Languages</h3>
            <ul className="space-y-2">
              {footerLinks.languages.map((link) => (
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
            {new Date().getFullYear()} Sankalp Learning. Designed for world language credit.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
