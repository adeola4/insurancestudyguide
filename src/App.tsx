import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ClipboardList, Gauge, ArrowRight } from 'lucide-react'
import { STATES, LICENSE_TYPES } from './db/questions'
import type { Question } from './types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function FeatureCard({ title, desc, icon, cta, onClick }: { title: string; desc: string; icon: React.ReactNode; cta: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="block rounded-2xl border border-white/[0.06] bg-dark-800/60 p-5 hover:-translate-y-1 transition text-left">
      <div className="text-neon-cyan">{icon}</div>
      <h3 className="mt-3 text-white font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{desc}</p>
      <div className="mt-4 text-sm text-white inline-flex items-center gap-2">{cta} <ArrowRight size={16} /></div>
    </button>
  )
}

function Flashcards({ questions, onBack }: { questions: Question[]; onBack: () => void }) {
  const [queue] = useState<Question[]>(() => shuffle(questions))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState(0)

  const current = queue[index]
  const total = queue.length
  const progress = total === 0 ? 0 : ((index + 1) / total) * 100

  const answer = (idx: number) => {
    if (flipped || !current) return
    if (idx === current.correct_index) setScore((s) => s + 1)
    setFlipped(true)
  }
  const next = () => {
    if (index + 1 >= total) return
    setIndex((i) => i + 1)
    setFlipped(false)
  }
  const restart = () => {
    setIndex(0)
    setFlipped(false)
    setScore(0)
  }

  if (!current) return <div className="mt-8 text-gray-400">No flashcards for this selection.</div>

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-white">← Back</button>
        <button onClick={restart} className="text-sm text-gray-400 hover:text-white">Restart</button>
        <div className="text-sm text-gray-400">{score} / {total}</div>
      </div>
      <div className="mt-4 h-2 w-full rounded bg-dark-700">
        <div className="h-2 rounded bg-neon-cyan transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-6 rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
        <div className="text-xs text-muted mb-2">{current.topic}</div>
        <div className="text-white text-lg">{current.question}</div>
      </div>
      <div className="mt-4 grid gap-2">
        {current.choices.map((choice, idx) => (
          <button key={idx} onClick={() => answer(idx)} disabled={flipped} className={`rounded-xl border px-4 py-3 text-left hover:bg-white/10 disabled:opacity-60 ${flipped && idx === current.correct_index ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-dark-900/70'}`}>
            <span className="mr-2 text-muted">{['A','B','C','D'][idx]}.</span>
            <span className="text-white">{choice}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {flipped && (
          <div className="rounded-2xl border border-white/[0.06] bg-dark-800/80 p-6">
            <div className="text-neon-cyan font-semibold mb-2">Answer</div>
            <div className="text-white">{current.choices[current.correct_index]}</div>
            <div className="mt-3 text-gray-400 text-sm">{current.explanation}</div>
            {index + 1 < total && <button onClick={next} className="mt-4 rounded-xl bg-white text-dark-950 px-5 py-3 font-medium hover:bg-gray-200">Next</button>}
          </div>
        )}
      </div>
    </div>
  )
}

function Quiz({ questions, onBack }: { questions: Question[]; onBack: () => void }) {
  const [queue] = useState<Question[]>(() => shuffle(questions).slice(0, Math.min(10, questions.length)))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = queue[index]
  const total = queue.length
  const progress = total === 0 ? 0 : ((index + 1) / total) * 100

  const submit = (idx: number) => {
    if (selected !== null || !current) return
    setSelected(idx)
    if (idx === current.correct_index) setScore((s) => s + 1)
    setTimeout(() => {
      if (index + 1 >= total) setFinished(true)
      else {
        setIndex((i) => i + 1)
        setSelected(null)
      }
    }, 700)
  }
  const restart = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (!current) return <div className="mt-8 text-gray-400">No quiz questions for this selection.</div>

  if (finished) {
    return (
      <div className="mt-8 rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
        <div className="text-white text-xl font-semibold">Quiz Complete</div>
        <div className="mt-2 text-gray-400">Score: {score} / {total}</div>
        <button onClick={restart} className="mt-4 rounded-xl bg-white text-dark-950 px-5 py-3 font-medium hover:bg-gray-200">Retake Quiz</button>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-gray-400 hover:text-white">← Back</button>
        <div className="text-sm text-gray-400">Question {index + 1} of {total}</div>
        <div className="text-sm text-gray-400">{score} correct</div>
      </div>
      <div className="mt-4 h-2 w-full rounded bg-dark-700">
        <div className="h-2 rounded bg-neon-cyan transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-6 rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
        <div className="text-xs text-muted mb-2">{current.topic}</div>
        <div className="text-white text-lg">{current.question}</div>
      </div>
      <div className="mt-4 grid gap-2">
        {current.choices.map((choice, idx) => (
          <button key={idx} onClick={() => submit(idx)} disabled={selected !== null} className={`rounded-xl border px-4 py-3 text-left hover:bg-white/10 disabled:opacity-60 ${selected === idx ? (idx === current.correct_index ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-white/10 bg-dark-900/70'}`}>
            <span className="mr-2 text-muted">{['A','B','C','D'][idx]}.</span>
            <span className="text-white">{choice}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [state, setState] = useState('')
  const [license, setLicense] = useState('')
  const [mode, setMode] = useState<'landing' | 'flashcards' | 'quiz'>('landing')

  const questions: Question[] = useMemo(() => {
    if (!state || !license) return []
    return (window as any).SEED_QUESTIONS?.filter((q: any) => q.state === state && q.license_type === license) ?? []
  }, [state, license])

  return (
    <div className="relative min-h-screen bg-dark-950 text-gray-200 bg-grid overflow-hidden">
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div>
          <div className="text-white font-semibold tracking-wide">InsuranceStudyGuide</div>
          <div className="text-muted text-xs">50-state life insurance exam prep</div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#features" className="text-gray-400 hover:text-white">Features</a>
          <button onClick={() => { if (state && license) setMode('flashcards'); else alert('Choose state + license first.'); }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Start Studying</button>
        </div>
      </nav>

      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-semibold text-white leading-tight max-w-3xl">Study smarter for your life insurance license</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-4 text-gray-400 text-lg max-w-2xl">Choose your state and license path to access flashcards, quizzes, and focused prep tools.</motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
          <select value={state} onChange={(e) => setState(e.target.value)} className="flex-1 rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-white">
            <option value="">Select your state</option>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={license} onChange={(e) => setLicense(e.target.value)} className="flex-1 rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-white">
            <option value="">Select license type</option>
            {LICENSE_TYPES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </motion.div>

        <p className="mt-3 text-xs text-muted">Select both, then use Start Studying.</p>
      </header>

      {mode === 'landing' && (
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-8" id="features">
          <div className="grid md:grid-cols-3 gap-5">
            <FeatureCard title="Study Guide" desc="State-specific outlines, definitions, and exam-focused notes." icon={<BookOpen />} cta="Start Flashcards" onClick={() => setMode('flashcards')} />
            <FeatureCard title="Quizzes" desc="Practice questions mapped to your state exam outline." icon={<ClipboardList />} cta="Start Quiz" onClick={() => setMode('quiz')} />
            <FeatureCard title="Mock Exam" desc="Timed full-length simulation." icon={<Gauge />} cta="Coming soon" onClick={() => {}} />
          </div>
        </main>
      )}

      {mode === 'flashcards' && <Flashcards questions={questions} onBack={() => setMode('landing')} />}
      {mode === 'quiz' && <Quiz questions={questions} onBack={() => setMode('landing')} />}

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-10 text-xs text-muted">InsuranceStudyGuide — approved scope only.</footer>
    </div>
  )
}
