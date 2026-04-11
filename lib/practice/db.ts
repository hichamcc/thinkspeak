import type { Language, PracticeSession } from './types'

const DB_NAME = 'practice-sessions'
const STORE   = 'sessions'
const VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: 'id' })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

export async function saveSession(session: PracticeSession): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(session)
    tx.oncomplete = () => resolve()
    tx.onerror    = () => reject(tx.error)
  })
}

export async function listSessions(): Promise<PracticeSession[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = () =>
      resolve((req.result as PracticeSession[]).sort((a, b) => b.date - a.date))
    req.onerror = () => reject(req.error)
  })
}

export async function deleteSession(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(id)
    tx.oncomplete = () => resolve()
    tx.onerror    = () => reject(tx.error)
  })
}

export async function updateSessionNote(id: string, note: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    const req   = store.get(id)
    req.onsuccess = () => {
      const session = req.result
      if (session) store.put({ ...session, note })
    }
    tx.oncomplete = () => resolve()
    tx.onerror    = () => reject(tx.error)
  })
}

export async function getStats(): Promise<{ total: number; totalSecs: number; byLang: Record<Language, number> }> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = () => {
      const sessions = req.result as PracticeSession[]
      const byLang: Record<Language, number> = { en: 0, fr: 0, es: 0, ar: 0, ja: 0 }
      for (const s of sessions) byLang[s.language] = (byLang[s.language] ?? 0) + 1
      resolve({
        total:     sessions.length,
        totalSecs: sessions.reduce((acc, s) => acc + s.duration, 0),
        byLang,
      })
    }
    req.onerror = () => reject(req.error)
  })
}
