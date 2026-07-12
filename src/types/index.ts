export type LicenseType = 'Life' | 'Health' | 'Life & Health'

export interface Question {
  id: string
  state: string
  license_type: LicenseType
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  choices: string[]
  correct_index: number
  explanation: string
}

export interface UserProgress {
  state: string
  license_type: string
  topic: string
  total_questions: number
  correct_answers: number
  last_practiced: number
}

export interface StudySession {
  state: string
  license_type: string
  mode: 'flashcards' | 'quiz' | 'mock'
  started_at: number
  finished_at?: number
  score?: { correct: number; total: number }
}
