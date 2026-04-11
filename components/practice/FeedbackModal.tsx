'use client'

import { useState } from 'react'

interface Props {
  onClose: () => void
}

export default function FeedbackModal({ onClose }: Props) {
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit() {
    if (!message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/feedback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="notice-backdrop" onClick={onClose}>
      <div className="notice-box" onClick={e => e.stopPropagation()}>
        {status === 'sent' ? (
          <>
            <p className="notice-title">Thanks for the feedback</p>
            <p className="notice-body">It helps more than you think.</p>
            <button className="notice-btn" onClick={onClose}>close</button>
          </>
        ) : (
          <>
            <p className="notice-title">Send feedback</p>
            <p className="notice-body">What's working, what's not, or anything you'd like to see.</p>
            <textarea
              className="feedback-textarea"
              placeholder="Your message..."
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              autoFocus
            />
            {status === 'error' && (
              <p className="pr-error">Something went wrong — try again.</p>
            )}
            <div className="playback-actions">
              <button
                className="notice-btn"
                onClick={submit}
                disabled={status === 'sending' || !message.trim()}
              >
                {status === 'sending' ? 'sending…' : 'send'}
              </button>
              <button className="pr-btn" onClick={onClose}>cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
