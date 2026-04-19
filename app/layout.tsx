import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Noto_Sans_Devanagari, Tiro_Devanagari_Hindi } from 'next/font/google'
import { Toaster } from 'sonner'
import { ProfileProvider } from '@/lib/profile-context'
import './globals.css'

// Latin body/mono. Geist ships CSS vars we pick up in globals.css via
// @theme inline { --font-sans / --font-mono }. The Devanagari families are
// surfaced as --font-hindi-body / --font-hindi-display and wired to the
// .font-hindi / .font-hindi-display utility classes that ScriptText and
// DevanagariText emit.
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hindi-body',
  display: 'swap',
})
const tiroDevanagariHindi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-hindi-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sankalp — Hindi STAMP prep',
  description:
    'Hindi learning for US middle-schoolers targeting the FCPS World Language Credit Exam (Avant STAMP 2S/WS). Hand-authored topic packs, capstones, flashcards, and study plans — built for students, parents, and teachers.',
  keywords: ['Hindi', 'STAMP', 'FCPS', 'world language credit', 'middle school', 'language learning'],
  authors: [{ name: 'Sankalp' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#d97706',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansDevanagari.variable} ${tiroDevanagariHindi.variable} bg-background`}
    >
      <body className="font-sans antialiased min-h-screen">
        <ProfileProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ProfileProvider>
      </body>
    </html>
  )
}
