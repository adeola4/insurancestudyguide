import { useState } from 'react'
import type { Question, StudySession, StudyEvent } from '../types'

type StudyMode = 'flashcards' | 'quiz' | 'mock'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useFlashcards(questions: Question[]) {
  const [queue, setQueue] = useState<Question[]>(() => shuffle(questions))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [events, setEvents] = useState<{ question_id: string; selected_index: number | null; is_correct: boolean }[]>([])
  const [done, setDone] = useState(false)

  const current = queue[index]
  const total = queue.length
  const progress = total === 0 ? 0 : ((index + 1) / total) * 100

  const answer = (selected_index: number) => {
    if (flipped) return
    const is_correct = selected_index === current.correct_index
    setFlipped(true)
    setEvents((prev) => [...prev, { question_id: current.id, selected_index, is_correct }])
  }

  const next = () => {
    if (index + 1 >= total) {
      setDone(true)
    } else {
      setIndex(index + 1)
      setFlipped(false)
    }
  }

  const restart = () => {
    setQueue(shuffle(questions))
    setIndex(0)
    setFlipped(false)
    setEvents([])
    setDone(false)
  }

  const score = events.filter((e: any) => e.is_correct).length

  return { current, flipped, answer, next, restart, done, progress, events, score, total }
}

export function useQuiz(questions: Question[], limit = 10, timePerQuestionSec = 45) {
  const [queue] = useState<Question[]>(() => shuffle(questions).slice(0, Math.min(limit, questions.length)))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [events, setEvents] = useState<{ question_id: string; selected_index: number | null; is_correct: boolean }[]>([])
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timePerQuestionSec)

  const current = queue[index]
  const total = queue.length
  const progress = total === 0 ? 0 : ((index + 1) / total) * 100

  const submit = (choiceIndex: number) => {
    if (selected !== null) return
    setSelected(choiceIndex)
    const is_correct = choiceIndex === current.correct_index
    setEvents((prev) => [...prev, { question_id: current.id, selected_index: choiceIndex, is_correct }])
    setTimeout(() => {
      if (index + 1 >= total) {
        setFinished(true)
      } else {
        setIndex(index + 1)
        setSelected(null)
        setTimeLeft(timePerQuestionSec)
      }
    }, 900)
  }

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setEvents([])
    setStartedAt(Date.now())
    setFinished(false)
    setTimeLeft(timePerQuestionSec)
  }

  const score = events.filter((e: any) => e.is_correct).length
  const elapsed = Math.round((Date.now() - startedAt) / 1000)

  return { current, selected, submit, restart, finished, progress, events, score, total, timeLeft, setTimeLeft, elapsed }
}
