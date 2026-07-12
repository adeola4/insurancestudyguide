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
