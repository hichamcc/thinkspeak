const KEY_COUNT = 'practice-streak-count'
const KEY_LAST  = 'practice-streak-last'

function today(): string {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

function diffDays(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)
}

export function getStreak(): number {
  const count = parseInt(localStorage.getItem(KEY_COUNT) ?? '0', 10)
  const last  = localStorage.getItem(KEY_LAST) ?? ''
  if (!last) return 0
  const d = diffDays(last, today())
  if (d > 1) return 0  // streak broken
  return count
}

export function recordSession(): void {
  const t    = today()
  const last = localStorage.getItem(KEY_LAST) ?? ''
  if (last === t) return  // already recorded today

  const count = parseInt(localStorage.getItem(KEY_COUNT) ?? '0', 10)
  const d     = last ? diffDays(last, t) : 999

  localStorage.setItem(KEY_COUNT, String(d === 1 ? count + 1 : 1))
  localStorage.setItem(KEY_LAST, t)
}
