'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { SHADOWING, type Language } from '@/lib/tools/data'
import { startRecording, type RecorderHandle } from '@/lib/practice/recorder'

const LANGS: Language[] = ['en', 'fr', 'es', 'ar', 'ja']

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

type Phase = 'home' | 'listen' | 'record' | 'done'

export default function ShadowingPage() {
  const [lang, setLang]   = useState<Language>('en')
  const [order]           = useState<Record<Language, number[]>>(() => {
    const r = {} as Record<Language, number[]>
    for (const l of LANGS) r[l] = shuffle(SHADOWING[l].map((_, i) => i))
    return r
  })
  const [idx, setIdx]     = useState<Record<Language, number>>({ en: 0, fr: 0, es: 0, ar: 0, ja: 0 })
  const [phase, setPhase] = useState<Phase>('home')
  const [blob, setBlob]   = useState<Blob | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [speaking, setSpeaking] = useState(false)

  const recorderRef  = useRef<RecorderHandle | null>(null)
  const originalRef  = useRef<HTMLAudioElement | null>(null)

  const sentenceIdx  = order[lang][idx[lang] % order[lang].length]
  const sentence     = SHADOWING[lang][sentenceIdx]
  const audioSrc     = `/audio/shadowing/${lang}-${sentenceIdx}.mp3`

  function stopOriginal() {
    if (originalRef.current) {
      originalRef.current.pause()
      originalRef.current.currentTime = 0
    }
  }

  function changeLang(l: Language) {
    stopOriginal()
    setLang(l); setPhase('home'); setBlob(null); setBlobUrl(null); setSpeaking(false)
  }

  function playOriginal(onEnd?: () => void) {
    stopOriginal()
    const audio = new Audio(audioSrc)
    originalRef.current = audio
    setSpeaking(true)
    audio.onended = () => { setSpeaking(false); onEnd?.() }
    audio.onerror = () => {
      // Fallback to browser TTS if audio file not generated yet
      setSpeaking(false)
      const u = new SpeechSynthesisUtterance(sentence)
      u.rate = 0.85
      u.onend = () => { setSpeaking(false); onEnd?.() }
      window.speechSynthesis.speak(u)
    }
    audio.play()
  }

  function listen() {
    playOriginal(() => setPhase('listen'))
    setPhase('listen')
  }

  function replayListen() {
    playOriginal()
  }

  async function startRecord() {
    stopOriginal()
    setBlob(null); setBlobUrl(null)
    try {
      recorderRef.current = await startRecording()
      setPhase('record')
    } catch { /* no mic */ }
  }

  async function stopRecord() {
    if (recorderRef.current) {
      const b = await recorderRef.current.stop()
      recorderRef.current = null
      setBlob(b)
      if (blobUrl) URL.revokeObjectURL(blobUrl)
      setBlobUrl(URL.createObjectURL(b))
    }
    setPhase('done')
  }

  function next() {
    stopOriginal()
    setIdx(prev => ({ ...prev, [lang]: prev[lang] + 1 }))
    setPhase('home'); setBlob(null); setBlobUrl(null); setSpeaking(false)
  }

  const total = order[lang].length

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/tools" className="pr-nav-link" style={{ fontSize: 13 }}>← tools</Link>
          <span className="pr-nav-brand">Shadowing</span>
        </div>
      </nav>

      <div className="pr-home" style={{ maxWidth: 540, width: '100%', margin: '0 auto' }}>
        <div className="home-headline">
          <span className="home-eyebrow">shadowing</span>
          <p className="home-sub">Listen to the sentence, then repeat it immediately. Focus on rhythm and tone, not just the words.</p>
        </div>

        <div className="pr-nav-langs">
          {LANGS.map(l => (
            <button key={l} className={`lang-pill ${lang === l ? 'active' : ''}`} onClick={() => changeLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Sentence */}
        <div className="topic-card topic-card-framed">
          <p className="topic-text" style={{ fontSize: 22, lineHeight: 1.5 }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {sentence}
          </p>
        </div>

        {/* Step indicators */}
        <div className="shadow-steps">
          <div className={`shadow-step ${phase !== 'home' ? 'done' : 'active'}`}>
            <span className="shadow-step-num">1</span>
            <span>Listen</span>
          </div>
          <div className="shadow-step-divider" />
          <div className={`shadow-step ${phase === 'record' || phase === 'done' ? 'done' : phase === 'listen' ? 'active' : ''}`}>
            <span className="shadow-step-num">2</span>
            <span>Repeat</span>
          </div>
          <div className="shadow-step-divider" />
          <div className={`shadow-step ${phase === 'done' ? 'active' : ''}`}>
            <span className="shadow-step-num">3</span>
            <span>Compare</span>
          </div>
        </div>

        {phase === 'home' && (
          <button className="pr-start" onClick={listen}>▶ listen</button>
        )}

        {phase === 'listen' && (
          <div className="home-actions">
            <button className="pr-start" onClick={startRecord}>⏺ record yourself</button>
            <button className="pr-skip" onClick={replayListen}>{speaking ? 'playing...' : 'replay'}</button>
          </div>
        )}

        {phase === 'record' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div className="rec-indicator">
              <span className="rec-dot" />
              <span className="rec-label">recording</span>
            </div>
            <button className="pr-start" style={{ background: '#e74c3c' }} onClick={stopRecord}>⬛ stop</button>
          </div>
        )}

        {phase === 'done' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 400 }}>
              <p className="home-stats">original</p>
              <button className="pr-btn" onClick={replayListen}>{speaking ? 'playing...' : '▶ play original'}</button>
              <p className="home-stats" style={{ marginTop: 8 }}>your recording</p>
              {blobUrl && <audio src={blobUrl} controls className="playback-audio" />}
            </div>
            <div className="home-actions">
              <button className="pr-start" onClick={next}>next sentence</button>
              <button className="pr-skip" onClick={() => setPhase('home')}>try again</button>
            </div>
          </div>
        )}

        <span className="queue-pos">{(idx[lang] % total) + 1} / {total}</span>
      </div>
    </main>
  )
}
