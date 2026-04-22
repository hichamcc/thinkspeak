'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { DEBATE_PROMPTS } from '@/lib/tools/data'
import { startRecording, type RecorderHandle } from '@/lib/practice/recorder'

const THINK_SECS = 30
const SPEAK_SECS = 60

type Phase = 'home' | 'think' | 'speak' | 'flip' | 'think2' | 'speak2' | 'done'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function DebatePage() {
  const [prompts]   = useState(() => shuffle(DEBATE_PROMPTS))
  const [idx, setIdx]       = useState(0)
  const [side, setSide]     = useState<'for' | 'against'>('for')
  const [phase, setPhase]   = useState<Phase>('home')
  const [timeLeft, setTimeLeft] = useState(THINK_SECS)
  const [blob1, setBlob1]   = useState<Blob | null>(null)
  const [blob2, setBlob2]   = useState<Blob | null>(null)
  const [url1, setUrl1]     = useState<string | null>(null)
  const [url2, setUrl2]     = useState<string | null>(null)

  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const recorderRef = useRef<RecorderHandle | null>(null)

  const prompt = prompts[idx]
  const oppSide = side === 'for' ? 'against' : 'for'

  useEffect(() => {
    setSide(Math.random() > 0.5 ? 'for' : 'against')
  }, [idx])

  useEffect(() => {
    if (phase !== 'think' && phase !== 'speak' && phase !== 'think2' && phase !== 'speak2') {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          if (phase === 'think')  setTimeout(() => beginSpeak1(), 300)
          if (phase === 'speak')  stopSpeak1()
          if (phase === 'think2') setTimeout(() => beginSpeak2(), 300)
          if (phase === 'speak2') stopSpeak2()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  function startDebate() {
    setBlob1(null); setBlob2(null); setUrl1(null); setUrl2(null)
    setPhase('think'); setTimeLeft(THINK_SECS)
  }

  async function beginSpeak1() {
    try {
      recorderRef.current = await startRecording()
    } catch { /* no mic */ }
    setPhase('speak'); setTimeLeft(SPEAK_SECS)
  }

  async function stopSpeak1() {
    if (recorderRef.current) {
      const b = await recorderRef.current.stop()
      recorderRef.current = null
      setBlob1(b)
      setUrl1(URL.createObjectURL(b))
    }
    setPhase('flip')
  }

  function startRound2() {
    setPhase('think2'); setTimeLeft(THINK_SECS)
  }

  async function beginSpeak2() {
    try {
      recorderRef.current = await startRecording()
    } catch { /* no mic */ }
    setPhase('speak2'); setTimeLeft(SPEAK_SECS)
  }

  async function stopSpeak2() {
    if (recorderRef.current) {
      const b = await recorderRef.current.stop()
      recorderRef.current = null
      setBlob2(b)
      setUrl2(URL.createObjectURL(b))
    }
    setPhase('done')
  }

  function nextPrompt() {
    setIdx(i => (i + 1) % prompts.length)
    setPhase('home')
    setBlob1(null); setBlob2(null); setUrl1(null); setUrl2(null)
  }

  const isActive = phase === 'think' || phase === 'speak' || phase === 'think2' || phase === 'speak2'
  const pct = timeLeft / (phase === 'speak' || phase === 'speak2' ? SPEAK_SECS : THINK_SECS)
  const r = 70, circ = 2 * Math.PI * r

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <Link href="/tools" className="pr-nav-link" style={{ fontSize: 13 }}>← tools</Link>
          <span className="pr-nav-brand">Debate</span>
        </div>
      </nav>

      {phase === 'home' && (
        <div className="pr-home">
          <div className="home-headline">
            <span className="home-eyebrow">debate prompt</span>
            <p className="home-sub">Argue a position for 60 seconds. Then flip and argue the opposite.</p>
          </div>
          <div className="topic-card topic-card-framed">
            <p className="topic-text" style={{ fontSize: 24 }}>{prompt}</p>
          </div>
          <div className="debate-side-badge debate-side-badge--{side}">
            You will argue: <strong>{side === 'for' ? 'FOR' : 'AGAINST'}</strong>
          </div>
          <div className="home-actions">
            <button className="pr-start" onClick={startDebate}>start</button>
            <button className="pr-skip" onClick={nextPrompt}>next topic →</button>
          </div>
        </div>
      )}

      {(phase === 'think' || phase === 'think2') && (
        <div className="pr-phase">
          <p className="pr-phase-name">{phase === 'think' ? `argue ${side}` : `now argue ${oppSide}`}</p>
          <div className="topic-card topic-card-framed">
            <p className="topic-text" style={{ fontSize: 20 }}>{prompt}</p>
          </div>
          <div className="phase-timer-circle">
            <svg width="180" height="180">
              <circle cx="90" cy="90" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle cx="90" cy="90" r={r} fill="none" stroke="var(--fg)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - pct)}
                transform="rotate(-90 90 90)"
              />
            </svg>
            <div className="phase-timer-inner">
              <span className="phase-circle-number" style={{ fontSize: 52 }}>{timeLeft}</span>
              <span className="phase-circle-label">think</span>
            </div>
          </div>
        </div>
      )}

      {(phase === 'speak' || phase === 'speak2') && (
        <div className="pr-phase">
          <p className="pr-phase-name">{phase === 'speak' ? `argue ${side}` : `argue ${oppSide}`}</p>
          <div className="topic-card topic-card-framed">
            <p className="topic-text" style={{ fontSize: 20, opacity: 0.4 }}>{prompt}</p>
          </div>
          <div className="phase-timer-circle">
            <svg width="180" height="180">
              <circle cx="90" cy="90" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle cx="90" cy="90" r={r} fill="none" stroke="var(--fg)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - pct)}
                transform="rotate(-90 90 90)"
              />
            </svg>
            <div className="phase-timer-inner">
              <span className="phase-circle-number" style={{ fontSize: 52 }}>{timeLeft}</span>
              <span className="phase-circle-label">speak</span>
            </div>
          </div>
          <button className="pr-skip" onClick={phase === 'speak' ? stopSpeak1 : stopSpeak2}>stop early</button>
        </div>
      )}

      {phase === 'flip' && (
        <div className="pr-phase">
          <p className="pr-phase-name">round 1 done</p>
          <div className="topic-card topic-card-framed">
            <p className="topic-text" style={{ fontSize: 20 }}>{prompt}</p>
          </div>
          {url1 && <audio src={url1} controls className="playback-audio" />}
          <div className="debate-side-badge">
            Now argue: <strong>{oppSide === 'for' ? 'FOR' : 'AGAINST'}</strong>
          </div>
          <button className="pr-start" onClick={startRound2}>start round 2</button>
        </div>
      )}

      {phase === 'done' && (
        <div className="pr-phase">
          <p className="pr-phase-name">done</p>
          <div className="topic-card topic-card-framed">
            <p className="topic-text" style={{ fontSize: 18 }}>{prompt}</p>
          </div>
          <div className="debate-done-audios">
            <div>
              <p className="pr-phase-name">argue {side}</p>
              {url1 && <audio src={url1} controls className="playback-audio" />}
            </div>
            <div>
              <p className="pr-phase-name">argue {oppSide}</p>
              {url2 && <audio src={url2} controls className="playback-audio" />}
            </div>
          </div>
          <div className="home-actions">
            <button className="pr-start" onClick={nextPrompt}>next topic</button>
          </div>
        </div>
      )}
    </main>
  )
}
