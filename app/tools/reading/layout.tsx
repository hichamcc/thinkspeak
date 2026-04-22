import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reading Speed Trainer',
  description: 'Train yourself to read faster with RSVP (Rapid Serial Visual Presentation). Improve from 150 to 500+ words per minute without losing comprehension.',
  keywords: ['reading speed', 'speed reading', 'RSVP reading', 'words per minute', 'reading trainer', 'read faster'],
  alternates: { canonical: 'https://thinkspeak.vercel.app/tools/reading' },
  openGraph: {
    title: 'Reading Speed Trainer — ThinkSpeak',
    description: 'Train yourself to read faster with RSVP. One word at a time, from 100 to 500 WPM.',
    url: 'https://thinkspeak.vercel.app/tools/reading',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
