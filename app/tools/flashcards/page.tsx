'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FLASHCARDS, type Language } from '@/lib/tools/data'

const LANGS: { code: Language; label: string }[] = [
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español'  },
  { code: 'ar', label: 'العربية'  },
  { code: 'ja', label: '日本語'    },
]

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function FlashcardsPage() {
  const [lang, setLang]       = useState<Language>('fr')
  const [deck, setDeck]       = useState(() => shuffle(FLASHCARDS))
  const [idx, setIdx]         = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown]     = useState(0)
  const [missed, setMissed]   = useState<typeof FLASHCARDS>([])
  const [finished, setFinished] = useState(false)
  const [reviewing, setReviewing] = useState(false)

  const card = deck[idx]

  function changeLang(l: Language) {
    setLang(l)
    reset()
  }

  function reset() {
    setDeck(shuffle(FLASHCARDS))
    setIdx(0); setFlipped(false); setKnown(0); setMissed([]); setFinished(false); setReviewing(false)
  }

  function handleKnow() {
    setKnown(k => k + 1)
    advance()
  }

  function handleMissed() {
    setMissed(m => [...m, card])
    advance()
  }

  function advance() {
    setFlipped(false)
    if (idx + 1 >= deck.length) {
      setFinished(true)
    } else {
      setIdx(i => i + 1)
    }
  }

  function reviewMissed() {
    setDeck(shuffle(missed))
    setIdx(0); setFlipped(false); setKnown(0); setMissed([]); setFinished(false); setReviewing(true)
  }

  const translation = card ? (card as unknown as Record<string, string>)[lang] : ''
  const phonetic    = card ? ((card as unknown as Record<string, string>)[`${lang}_roman`] ?? '') : ''
  const progress    = deck.length > 0 ? idx / deck.length : 0

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/tools" className="pr-nav-link" style={{ fontSize: 13 }}>← tools</Link>
          <span className="pr-nav-brand">Flashcards</span>
        </div>
      </nav>

      {finished ? (
        <div className="pr-home">
          <div className="home-headline">
            <span className="home-eyebrow">{reviewing ? 'review done' : 'deck done'}</span>
            <h2 className="home-title">{known} / {deck.length}</h2>
            <p className="home-sub">you knew {known} card{known !== 1 ? 's' : ''} out of {deck.length}</p>
          </div>
          <div className="home-actions">
            {missed.length > 0 && !reviewing && (
              <button className="pr-start" onClick={reviewMissed}>review {missed.length} missed</button>
            )}
            <button className={missed.length > 0 && !reviewing ? 'pr-skip' : 'pr-start'} onClick={reset}>
              restart
            </button>
          </div>
        </div>
      ) : (
        <div className="pr-home">
          {/* Lang selector */}
          <div className="pr-nav-langs">
            {LANGS.map(l => (
              <button key={l.code} className={`lang-pill ${lang === l.code ? 'active' : ''}`} onClick={() => changeLang(l.code)}>
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="tool-progress-track" style={{ position: 'relative', width: '100%', maxWidth: 400, borderRadius: 4 }}>
            <div className="tool-progress-fill" style={{ width: `${progress * 100}%`, borderRadius: 4 }} />
          </div>
          <span className="queue-pos">{idx + 1} / {deck.length}{reviewing ? ' (review)' : ''}</span>

          {/* Card */}
          <div
            className={`flashcard ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(f => !f)}
          >
            <div className="flashcard-front">
              <p className="flashcard-lang-label">english</p>
              <p className="flashcard-word">{card?.en}</p>
              <p className="flashcard-hint">tap to reveal {lang}</p>
            </div>
            <div className="flashcard-back">
              <p className="flashcard-lang-label">{lang}</p>
              <p className="flashcard-word">{translation}</p>
              {phonetic && <p className="flashcard-phonetic">{phonetic}</p>}
            </div>
          </div>

          {/* Actions */}
          {flipped ? (
            <div className="home-actions">
              <button className="pr-start" onClick={handleKnow}>knew it</button>
              <button className="pr-skip" onClick={handleMissed}>missed it</button>
            </div>
          ) : (
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>tap the card to flip</p>
          )}
        </div>
      )}
    </main>
  )
}
