import type { StudySession } from '../types'

const KEY = 'isg_sessions_v1'

export function loadSessions(): StudySession[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveSession(session: StudySession) {
  const sessions = loadSessions()
  sessions.unshift(session)
  localStorage.setItem(KEY, JSON.stringify(sessions.slice(0, 200)))
}
