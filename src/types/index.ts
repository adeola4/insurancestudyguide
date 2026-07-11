export type LicenseType = 'Life' | 'Health' | 'Life & Health'

export type StudyMode = 'flashcards' | 'quiz' | 'mock'

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
  source?: string
}

export interface StudyEvent {
  question_id: string
  selected_index: number | null
  is_correct: boolean
}

export interface StudySession {
  mode: StudyMode
  state: string
  license_type: LicenseType
  started_at: number
  finished_at: number | null
  questions: Question[]
  events: StudyEvent[]
  score: { correct: number; total: number } | null
}

export interface UserProgress {
  state: string
  license_type: LicenseType
  topic: string
  total_questions: number
  correct_answers: number
  last_practiced: number
}
