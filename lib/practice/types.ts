export type Language = 'en' | 'fr' | 'es' | 'ar' | 'ja'

export type Phase = 'home' | 'think' | 'speak' | 'done' | 'history'

export type Category = 'daily' | 'opinion' | 'story' | 'describe' | 'abstract' | 'word'

export interface Topic {
  id: string
  category: Category
  text: string
}

export interface PracticeSession {
  id: string
  date: number        // timestamp
  topic: string
  category: Category
  language: Language
  duration: number    // seconds recorded
  blob: Blob
  note?: string
}
