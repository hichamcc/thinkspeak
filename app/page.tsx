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
import StorageNotice from '@/components/practice/StorageNotice'
import MicModal from '@/components/practice/MicModal'

const THINK_SECS = 30
const SPEAK_SECS = 60

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
  const [showNotice, setShowNotice]   = useState(false)
  const [showMicModal, setShowMicModal] = useState(false)
  const [noRecord, setNoRecord]       = useState(false)

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
    if (!localStorage.getItem('storage-notice-seen')) setShowNotice(true)
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
    setShowMicModal(true)
  }

  function confirmRecord(record: boolean) {
    setNoRecord(!record)
    setShowMicModal(false)
    setPhase('think')
    setTimeLeft(THINK_SECS)
    setMicError(false)
    setRecordedBlob(null)
  }

  async function beginSpeak() {
    if (noRecord) {
      speakStart.current = Date.now()
      setPhase('speak')
      setTimeLeft(SPEAK_SECS)
      return
    }
    try {
      const handle = await startRecording()
      recorderRef.current = handle
      speakStart.current  = Date.now()
      setAnalyser(handle.analyser)
      setPhase('speak')
      setTimeLeft(SPEAK_SECS)
    } catch {
      setMicError(true)
      setPhase('home')
    }
  }

  async function stopRecording() {
    if (noRecord) {
      nextTopic()
      return
    }
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
    setNoRecord(false)
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

  function dismissNotice() {
    localStorage.setItem('storage-notice-seen', '1')
    setShowNotice(false)
  }

  const inGame    = phase === 'think' || phase === 'speak'
  const totalMins = homeStats ? Math.round(homeStats.totalSecs / 60) : 0

  return (
    <main className="pr-screen">
      <nav className="pr-nav">
        <div className="pr-nav-top">
          <span className="pr-nav-brand">ThinkSpeak</span>
          <div className="pr-nav-actions">
            {phase !== 'history' && !inGame && (
              <button className="pr-nav-link" onClick={openHistory}>history</button>
            )}
            {phase !== 'history' && !inGame && (
              <Link href="/settings" className="pr-nav-link">settings</Link>
            )}
            {phase === 'history' && (
              <button className="pr-nav-link" onClick={() => setPhase('home')}>back</button>
            )}
          </div>
        </div>

        {!inGame && (
          <div className="pr-nav-langs">
            {(['en', 'fr', 'es', 'ar', 'ja'] as const).map(l => (
              <button
                key={l}
                className={`lang-pill ${lang === l ? 'active' : ''}`}
                onClick={() => switchLang(l)}
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
            <h1 className="home-title">Think. Speak. Repeat.</h1>
            <p className="home-sub">30 seconds to think · 60 seconds to speak</p>
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
          <button className="pr-skip" onClick={nextTopic}>skip</button>
          <div className="kbd-hint"><kbd>space</kbd> start · <kbd>→</kbd> skip</div>
        </div>
      )}

      {phase === 'think' && topic && (
        <div className="pr-phase">
          <p className="pr-phase-name">think</p>
          <TopicCard topic={topic} lang={lang} showHints />
          <PhaseTimer label="think" timeLeft={timeLeft} total={THINK_SECS} />
        </div>
      )}

      {phase === 'speak' && topic && (
        <div className="pr-phase">
          <p className="pr-phase-name">speak</p>
          <TopicCard topic={topic} lang={lang} dim />
          <PhaseTimer label="speak" timeLeft={timeLeft} total={SPEAK_SECS} />
          <RecordingControls onStop={stopRecording} analyser={analyser ?? undefined} />
          <div className="kbd-hint"><kbd>space</kbd> stop</div>
        </div>
      )}

      {phase === 'done' && topic && recordedBlob && (
        <div className="pr-phase">
          <p className="pr-phase-name">done</p>
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
      {showNotice   && <StorageNotice onClose={dismissNotice} />}
      {showMicModal && <MicModal onRecord={() => confirmRecord(true)} onSkip={() => confirmRecord(false)} />}
    </main>
  )
}
