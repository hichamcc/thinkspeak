'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Phase, Language, Topic, PracticeSession } from '@/lib/practice/types'
import { createTopicQueue } from '@/lib/practice/topics'
import { startRecording, type RecorderHandle } from '@/lib/practice/recorder'
import { saveSession, listSessions, getStats } from '@/lib/practice/db'
import { getStreak, recordSession } from '@/lib/practice/streak'
import TopicCard from '@/components/practice/TopicCard'
import PhaseTimer from '@/components/practice/PhaseTimer'
import RecordingControls from '@/components/practice/RecordingControls'
import Playback from '@/components/practice/Playback'
import HistoryList from '@/components/practice/HistoryList'
import FeedbackModal from '@/components/practice/FeedbackModal'

const THINK_SECS = 30
const SPEAK_SECS = 60

const LABELS: Record<string, Record<string, string>> = {
  think: { en: 'think', fr: 'réfléchis', es: 'piensa',  ar: 'فكّر',   ja: '考えて' },
  speak: { en: 'speak', fr: 'parle',     es: 'habla',   ar: 'تحدّث',  ja: '話して' },
  done:  { en: 'done',  fr: 'terminé',   es: 'listo',   ar: 'انتهى',  ja: '完了'   },
}

export default function PracticePage() {
  const [lang, setLang]         = useState<Language>('en')
  const [phase, setPhase]       = useState<Phase>('home')
  const [queue, setQueue]       = useState<Topic[]>([])
  const [topicIdx, setTopicIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(THINK_SECS)
  const [micError, setMicError] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [recordedSecs, setRecordedSecs] = useState(0)
  const [sessions, setSessions] = useState<PracticeSession[]>([])
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [homeStats, setHomeStats] = useState<{ total: number; totalSecs: number } | null>(null)
  const [streak, setStreak]     = useState(0)

  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const recorderRef = useRef<RecorderHandle | null>(null)
  const speakStart  = useRef<number>(0)

  // Load lang + initial queue + stats
  useEffect(() => {
    const saved = (localStorage.getItem('practice-lang') as Language) ?? 'en'
    setLang(saved)
    setQueue(createTopicQueue(saved))
    setStreak(getStreak())
    getStats().then(s => setHomeStats({ total: s.total, totalSecs: s.totalSecs }))
  }, [])

  function switchLang(l: Language) {
    if (l === lang) return
    localStorage.setItem('practice-lang', l)
    setLang(l)
    setQueue(createTopicQueue(l))
    setTopicIdx(0)
    setPhase('home')
  }

  const topic = queue[topicIdx] ?? null

  // Timer
  useEffect(() => {
    if (phase !== 'think' && phase !== 'speak') {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          if (phase === 'think') {
            setTimeout(() => beginSpeak(), 500)
          } else {
            stopRecording()
          }
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.code === 'Space') {
        e.preventDefault()
        if (phase === 'home') startThink()
        else if (phase === 'speak') stopRecording()
      } else if (e.code === 'KeyS' && phase === 'done') {
        handleSave()
      } else if (e.code === 'KeyD' && phase === 'done') {
        handleDiscard()
      } else if (e.code === 'ArrowRight' && phase === 'home') {
        nextTopic()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  function startThink() {
    setPhase('think')
    setTimeLeft(THINK_SECS)
    setMicError(false)
    setRecordedBlob(null)
  }

  function cancelThink() {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('home')
  }

  async function beginSpeak() {
    try {
      const handle = await startRecording()
      recorderRef.current = handle
      speakStart.current  = Date.now()
      setAnalyser(handle.analyser)
    } catch {
      // mic denied — continue without recording
    }
    speakStart.current = Date.now()
    setPhase('speak')
    setTimeLeft(SPEAK_SECS)
  }

  async function stopRecording() {
    if (!recorderRef.current) return
    const blob = await recorderRef.current.stop()
    recorderRef.current = null
    setAnalyser(null)
    const secs = Math.round((Date.now() - speakStart.current) / 1000)
    setRecordedBlob(blob)
    setRecordedSecs(secs)
    setPhase('done')
  }

  async function handleSave() {
    if (!recordedBlob || !topic) return
    const session: PracticeSession = {
      id:       crypto.randomUUID(),
      date:     Date.now(),
      topic:    topic.text,
      category: topic.category,
      language: lang,
      duration: recordedSecs,
      blob:     recordedBlob,
    }
    await saveSession(session)
    recordSession()
    getStats().then(s => setHomeStats({ total: s.total, totalSecs: s.totalSecs }))
    setStreak(getStreak())
    nextTopic()
  }

  function handleDiscard() { nextTopic() }

  function nextTopic() {
    setTopicIdx(i => {
      const next = i + 1
      if (next >= queue.length) {
        setQueue(createTopicQueue(lang))
        return 0
      }
      return next
    })
    setRecordedBlob(null)
    setPhase('home')
  }

  async function openHistory() {
    const s = await listSessions()
    setSessions(s)
    setPhase('history')
  }

  function handleSessionDeleted(id: string) {
    setSessions(prev => prev.filter(s => s.id !== id))
  }

  const inGame    = phase === 'think' || phase === 'speak'
  const totalMins = homeStats ? Math.round(homeStats.totalSecs / 60) : 0
  const [showFeedback, setShowFeedback] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  async function handleShare() {
    const data = {
      title: 'ThinkSpeak',
      text: 'Practice speaking out loud — get a topic, 30s to think, 60s to speak. Free, no account.',
      url: 'https://thinkspeak.vercel.app',
    }
    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share(data) } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(data.url)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    }
  }

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <span className="pr-nav-brand">ThinkSpeak</span>
          {/* Desktop links */}
          <div className="pr-nav-actions pr-nav-actions--desktop">
            {phase !== 'history' && !inGame && (
              <button className="pr-nav-link" onClick={openHistory}>history</button>
            )}
            {phase !== 'history' && !inGame && (
              <Link href="/settings" className="pr-nav-link">settings</Link>
            )}
            {phase !== 'history' && !inGame && (
              <Link href="/blog" className="pr-nav-link">blog</Link>
            )}
            {phase !== 'history' && !inGame && (
              <Link href="/about" className="pr-nav-link">about</Link>
            )}
            {phase === 'history' && (
              <button className="pr-nav-link" onClick={() => setPhase('home')}>back</button>
            )}
          </div>
          {/* Mobile hamburger */}
          {!inGame && (
            <button
              className="pr-nav-burger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
            >
              <span className={`burger-icon ${menuOpen ? 'open' : ''}`} />
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        {menuOpen && !inGame && (
          <div className="pr-nav-mobile-menu" onClick={() => setMenuOpen(false)}>
            {phase !== 'history' && (
              <button className="pr-nav-link" onClick={openHistory}>history</button>
            )}
            {phase !== 'history' && (
              <Link href="/settings" className="pr-nav-link">settings</Link>
            )}
            {phase !== 'history' && (
              <Link href="/blog" className="pr-nav-link">blog</Link>
            )}
            {phase !== 'history' && (
              <Link href="/about" className="pr-nav-link">about</Link>
            )}
            {phase === 'history' && (
              <button className="pr-nav-link" onClick={() => setPhase('home')}>back</button>
            )}
          </div>
        )}

        {!inGame && (
          <div className="pr-nav-langs">
            {(['en', 'fr', 'es', 'ar', 'ja'] as const).map(l => (
              <button
                key={l}
                className={`lang-pill ${lang === l ? 'active' : ''}`}
                onClick={() => { switchLang(l); setMenuOpen(false) }}
              >{l.toUpperCase()}</button>
            ))}
          </div>
        )}
      </nav>

      {phase === 'home' && topic && (
        <div className="pr-home">
          {micError && (
            <p className="pr-error">Microphone access denied. Allow it in your browser settings.</p>
          )}
          <div className="home-headline">
            <span className="home-eyebrow">speaking practice</span>
            <h1 className="home-title">Think. Speak. Repeat.</h1>
            <p className="home-sub">Get a topic, think for 30 seconds, speak for 60. Build fluency in any language.</p>
          </div>
          <span className="queue-pos">{topicIdx + 1} / {queue.length}</span>
          <TopicCard topic={topic} lang={lang} />
          {homeStats && homeStats.total > 0 && (
            <p className="home-stats">{homeStats.total} sessions · {totalMins} min recorded</p>
          )}
          {streak > 0 && (
            <p className="home-streak">{streak} day streak</p>
          )}
          <button className="pr-start" onClick={startThink}>start</button>
          <button className="pr-skip" onClick={nextTopic}>next topic →</button>
          <p className="home-mic-note">
            <span className="home-mic-note-label">note</span>{' '}
            your browser will ask for mic access so you can listen back and improve.
            recordings stay on your device only. deny mic to practice without recording.
          </p>
          <button className="home-share" onClick={handleShare}>
            {shareCopied ? 'link copied!' : 'share this app'}
          </button>
          <button className="home-lang-suggest" onClick={() => setShowFeedback(true)}>
            want to practice in another language? let us know →
          </button>
          <div className="kbd-hint"><kbd>space</kbd> start · <kbd>→</kbd> next topic</div>
        </div>
      )}

      {phase === 'think' && topic && (
        <div className="pr-phase">
          <p className="pr-phase-name">{LABELS.think[lang]}</p>
          <TopicCard topic={topic} lang={lang} showHints />
          <PhaseTimer label={lang === 'en' ? 'think' : `think / ${LABELS.think[lang]}`} timeLeft={timeLeft} total={THINK_SECS} />
          <button className="pr-back" onClick={cancelThink}>← back</button>
        </div>
      )}

      {phase === 'speak' && topic && (
        <div className="pr-phase">
          <p className="pr-phase-name">{LABELS.speak[lang]}</p>
          <TopicCard topic={topic} lang={lang} dim />
          <PhaseTimer label={lang === 'en' ? 'speak' : `speak / ${LABELS.speak[lang]}`} timeLeft={timeLeft} total={SPEAK_SECS} />
          <RecordingControls onStop={stopRecording} analyser={analyser ?? undefined} />
          <div className="kbd-hint"><kbd>space</kbd> stop</div>
        </div>
      )}

      {phase === 'done' && topic && recordedBlob && (
        <div className="pr-phase">
          <p className="pr-phase-name">{LABELS.done[lang]}</p>
          <TopicCard topic={topic} lang={lang} dim />
          <Playback
            blob={recordedBlob}
            duration={recordedSecs}
            isShort={recordedSecs < 8}
            onSave={handleSave}
            onDiscard={handleDiscard}
          />
          <div className="kbd-hint"><kbd>s</kbd> save · <kbd>d</kbd> discard</div>
        </div>
      )}

      {phase === 'history' && (
        <div className="pr-history">
          <div className="pr-history-header">
            <p className="pr-phase-name">history</p>
          </div>
          <HistoryList sessions={sessions} onDeleted={handleSessionDeleted} />
        </div>
      )}
      <button className="feedback-btn" onClick={() => setShowFeedback(true)}>feedback</button>
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </main>
  )
}
