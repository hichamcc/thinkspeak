'use client'

interface Props {
  onRecord: () => void
  onSkip: () => void
}

export default function MicModal({ onRecord, onSkip }: Props) {
  return (
    <div className="notice-backdrop">
      <div className="notice-box">
        <p className="notice-title">Record your answer?</p>
        <p className="notice-body">
          Recording lets you listen back after you speak — that's where the real improvement happens.
          You'll hear your pace, your hesitations, and what to work on next time.
        </p>
        <p className="notice-body">
          Your recordings stay on your device only. Nothing is sent anywhere.
        </p>
        <p className="notice-body">
          Rather just speak aloud? You can practice without recording — the timer runs the same way.
        </p>
        <div className="mic-modal-actions">
          <button className="notice-btn" onClick={onRecord}>Record my answer</button>
          <button className="mic-skip-btn" onClick={onSkip}>Continue without recording</button>
        </div>
      </div>
    </div>
  )
}
