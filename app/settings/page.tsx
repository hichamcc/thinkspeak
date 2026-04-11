'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Language } from '@/lib/practice/types'

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
        <Link href="/" className="pr-nav-link">← back</Link>
      </nav>

      <div className="settings-body">
        <p className="settings-label">language</p>
        <div className="settings-row">
          <button
            className={`settings-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => select('en')}
          >
            English
          </button>
          <button
            className={`settings-btn ${lang === 'fr' ? 'active' : ''}`}
            onClick={() => select('fr')}
          >
            Français
          </button>
        </div>
      </div>
    </main>
  )
}
