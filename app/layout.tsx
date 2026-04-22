import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const BASE_URL = 'https://thinkspeak.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ThinkSpeak — Language Speaking Practice',
    template: '%s | ThinkSpeak',
  },
  description: 'Practice speaking English, French, Spanish, Arabic, or Japanese. 30 seconds to think, 60 seconds to speak. No account, no server — everything stays on your device.',
  keywords: [
    'language practice', 'speaking practice', 'oral fluency',
    'english practice', 'french practice', 'spanish practice', 'arabic practice', 'japanese practice',
    'language tools', 'shadowing technique', 'dictation practice', 'language flashcards',
    'reading speed', 'tongue twisters', 'debate practice', 'word association',
    'free language learning', 'speak a language',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'ThinkSpeak — Language Speaking Practice',
    description: 'Practice speaking any language. Think 30s, speak 60s, listen back.',
    url: BASE_URL,
    siteName: 'ThinkSpeak',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThinkSpeak — Language Speaking Practice',
    description: 'Practice speaking any language. Think 30s, speak 60s, listen back.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
