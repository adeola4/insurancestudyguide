import { useEffect, useState } from 'react'

const PROGRESS_KEY = 'isg_progress_v1'

export interface TopicProgress {
  state: string
  license_type: string
  topic: string
  total_questions: number
  correct_answers: number
  last_practiced: number
}

export interface SessionRecord {
  state: string
  license_type: string
  mode: 'flashcards' | 'quiz' | 'mock'
  finished_at: number
  score?: { correct: number; total: number }
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or unavailable — non-fatal */
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<TopicProgress[]>(() => read(PROGRESS_KEY, []))
  const [sessions, setSessions] = useState<SessionRecord[]>(() => read('isg_sessions_v1', []))

  useEffect(() => { write(PROGRESS_KEY, progress) }, [progress])
  useEffect(() => { write('isg_sessions_v1', sessions) }, [sessions])

  const recordSession = (s: SessionRecord) => setSessions((prev) => [s, ...prev].slice(0, 100))

  const recordResult = (
    state: string,
    license_type: string,
    results: { topic: string; correct: boolean }[],
  ) => {
    setProgress((prev) => {
      const map = new Map(prev.map((p) => [`${p.state}|${p.license_type}|${p.topic}`, p]))
      for (const r of results) {
        const key = `${state}|${license_type}|${r.topic}`
        const existing = map.get(key) || {
          state, license_type, topic: r.topic, total_questions: 0, correct_answers: 0, last_practiced: 0,
        }
        existing.total_questions += 1
        existing.correct_answers += r.correct ? 1 : 0
        existing.last_practiced = Date.now()
        map.set(key, existing)
      }
      return Array.from(map.values())
    })
  }

  return { progress, sessions, recordSession, recordResult }
}
