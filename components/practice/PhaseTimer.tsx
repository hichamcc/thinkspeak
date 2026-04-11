'use client'

interface Props {
  label: string
  timeLeft: number
  total: number
}

const R = 72
const CIRCUMFERENCE = 2 * Math.PI * R  // ≈ 452.4

export default function PhaseTimer({ label, timeLeft, total }: Props) {
  const pct    = Math.max(0, timeLeft / total)
  const offset = CIRCUMFERENCE * (1 - pct)
  const urgent = pct < 0.25

  return (
    <div className="phase-timer-circle">
      <svg width="180" height="180" viewBox="0 0 180 180">
        {/* Track */}
        <circle
          cx="90" cy="90" r={R}
          fill="none"
          stroke="var(--cell-empty)"
          strokeWidth="6"
        />
        {/* Progress */}
        <circle
          cx="90" cy="90" r={R}
          fill="none"
          stroke={urgent ? 'var(--cell-wrong)' : 'var(--fg)'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 90 90)"
          style={{ transition: 'stroke-dashoffset 0.6s linear, stroke 0.4s' }}
        />
      </svg>

      {/* Center content */}
      <div className="phase-timer-inner">
        <span className={`phase-circle-number ${urgent ? 'urgent' : ''}`}>
          {timeLeft}
        </span>
        <span className="phase-circle-label">{label}</span>
      </div>
    </div>
  )
}
