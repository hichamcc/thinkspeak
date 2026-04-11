'use client'

import type { Topic, Language } from '@/lib/practice/types'
import { CATEGORY_LABELS, CATEGORY_HINTS } from '@/lib/practice/topics'

interface Props {
  topic: Topic
  lang: Language
  dim?: boolean
  showHints?: boolean
}

export default function TopicCard({ topic, lang, dim, showHints }: Props) {
  return (
    <div className={`topic-card topic-card-framed ${dim ? 'dim' : ''}`}>
      <p className="topic-category">{CATEGORY_LABELS[topic.category][lang]}</p>
      <p className={`topic-text ${topic.category === 'word' ? 'topic-word' : ''}`}>
        {topic.text}
      </p>
      {showHints && (
        <div className="hints-list">
          {CATEGORY_HINTS[topic.category][lang].map((hint, i) => (
            <span key={i} className="hints-item">· {hint}</span>
          ))}
        </div>
      )}
    </div>
  )
}
