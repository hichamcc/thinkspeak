'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Language } from '@/lib/practice/types'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English'   },
  { code: 'fr', label: 'Français'  },
  { code: 'es', label: 'Español'   },
  { code: 'ar', label: 'العربية'   },
  { code: 'ja', label: '日本語'    },
]

export default function SettingsPage() {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    setLang((localStorage.getItem('practice-lang') as Language) ?? 'en')
  }, [])

  function select(l: Language) {
    setLang(l)
    localStorage.setItem('practice-lang', l)
  }

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <span className="pr-nav-brand">ThinkSpeak</span>
          <Link href="/" className="pr-nav-link">back</Link>
        </div>
      </nav>

      <div className="settings-body">
        <p className="settings-label">language</p>
        <div className="settings-col">
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              className={`settings-btn ${lang === code ? 'active' : ''}`}
              onClick={() => select(code)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="settings-about-link">
          <Link href="/about" className="pr-nav-link">about &amp; privacy →</Link>
        </div>
      </div>
    </main>
  )
}
