import type { UserProgress } from '../types'

const KEY = 'isg_progress_v1'

export function loadProgress(): UserProgress[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveProgress(items: UserProgress[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function upsertProgress(items: UserProgress[]) {
  const current = loadProgress()
  const map = new Map(current.map(p => [`${p.state}|${p.license_type}|${p.topic}`, p]))
  for (const item of items) {
    const key = `${item.state}|${item.license_type}|${item.topic}`
    const existing = map.get(key)
    if (!existing) {
      map.set(key, item)
    } else {
      existing.correct_answers += item.correct_answers
      existing.total_questions += item.total_questions
      existing.last_practiced = Math.max(existing.last_practiced, item.last_practiced)
    }
  }
  saveProgress(Array.from(map.values()))
}
