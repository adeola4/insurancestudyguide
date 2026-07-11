import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.tsx'
import Flashcards from './components/Flashcards'
import Quiz from './components/Quiz'
import Dashboard from './pages/Dashboard'
import { STATES, LICENSE_TYPES, SEED_QUESTIONS } from './db/questions'

function useQuery() {
  const q = new URLSearchParams(window.location.hash.split('?')[1] || '')
  return (key: string) => q.get(key) || ''
}

function StudyPage({ mode }: { mode: 'flashcards' | 'quiz' | 'mock' }) {
  const state = useQuery().get('state')
  const license = useQuery().get('license')
  const questions = SEED_QUESTIONS.filter(q => (!state || q.state === state) && (!license || q.license_type === license))

  if (mode === 'quiz') return <Quiz state={state} license_type={license} questions={questions} />
  if (mode === 'flashcards') return <Flashcards state={state} license_type={license} questions={questions} />
  return <Navigate to="/" replace />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/study" element={<StudyPage mode="flashcards" />} />
        <Route path="/quiz" element={<StudyPage mode="quiz" />} />
        <Route path="/mock" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)

function DashboardWrapper() {
  const state = useQuery().get('state') || STATES[0]
  const license = useQuery().get('license') || LICENSE_TYPES[0]
  return <Dashboard state={state} license_type={license} onStart={() => {}} />
}
