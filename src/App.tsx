import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ClipboardList, Gauge, ArrowRight } from 'lucide-react'
import { STATES, LICENSE_TYPES, NATIONAL, SEED_QUESTIONS } from './db/questions'
import type { Question } from './types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'ghost' }) {
  const base = 'rounded-xl border px-4 py-3 transition'
  const cls = props.variant === 'ghost' ? `${base} border-transparent text-gray-300 hover:text-white` : `${base} border-white/10 bg-dark-900/70 hover:bg-white/10`
  return <button {...props} className={`${cls} ${props.className || ''}`} />
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

function FlashcardView({ questions, onBack, onDone }: { questions: Question[]; onBack: () => void; onDone: () => void }) {
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
    if (index + 1 >= total) { onDone(); return }
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
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <Button variant="ghost" onClick={restart}>Restart</Button>
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
          <Button key={idx} onClick={() => answer(idx)} disabled={flipped} className={`${flipped && idx === current.correct_index ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-dark-900/70'} disabled:opacity-60`}>
            <span className="mr-2 text-muted">{['A','B','C','D'][idx]}.</span>
            <span className="text-white">{choice}</span>
          </Button>
        ))}
      </div>
      <div className="mt-4">
        {flipped && (
          <div className="rounded-2xl border border-white/[0.06] bg-dark-800/80 p-6">
            <div className="text-neon-cyan font-semibold mb-2">Answer</div>
            <div className="text-white">{current.choices[current.correct_index]}</div>
            <div className="mt-3 text-gray-400 text-sm">{current.explanation}</div>
            {index + 1 < total && <Button onClick={next} className="mt-4 bg-white text-dark-950 hover:bg-gray-200">Next</Button>}
          </div>
        )}
      </div>
    </div>
  )
}

function QuizView({ questions, onBack, onDone }: { questions: Question[]; onBack: () => void; onDone: () => void }) {
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
        <div className="mt-2 text-gray-400 text-sm">Results are saved in later phases.</div>
        <div className="mt-4 flex gap-3">
          <Button onClick={restart} className="bg-white text-dark-950 hover:bg-gray-200">Retake Quiz</Button>
          <Button onClick={onDone} className="border-white/10 bg-white/5">Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>← Back</Button>
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
          <Button key={idx} onClick={() => submit(idx)} disabled={selected !== null} className={`${selected === idx ? (idx === current.correct_index ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-white/10 bg-dark-900/70'} disabled:opacity-60`}>
            <span className="mr-2 text-muted">{['A','B','C','D'][idx]}.</span>
            <span className="text-white">{choice}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

function MockView({ questions, onBack }: { questions: Question[]; onBack: () => void }) {
  const pool = useMemo(() => {
    const deduped = Array.from(new Map(questions.map((q) => [q.id, q])).values())
    return shuffle(deduped)
  }, [questions])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = pool[index]
  const total = Math.min(pool.length, 50)
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

  if (!current) return <div className="mt-8 text-gray-400">No mock questions for this selection.</div>

  if (finished) {
    return (
      <div className="mt-8 rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
        <div className="text-white text-xl font-semibold">Mock Complete</div>
        <div className="mt-2 text-gray-400">Score: {score} / {total}</div>
        <div className="mt-2 text-gray-400 text-sm">History stays local in this build.</div>
        <div className="mt-4 flex gap-3">
          <Button onClick={restart} className="bg-white text-dark-950 hover:bg-gray-200">Retake Mock</Button>
          <Button onClick={onBack} className="border-white/10 bg-white/5">Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>← Back</Button>
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
          <Button key={idx} onClick={() => submit(idx)} disabled={selected !== null} className={`${selected === idx ? (idx === current.correct_index ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-white/10 bg-dark-900/70'} disabled:opacity-60`}>
            <span className="mr-2 text-muted">{['A','B','C','D'][idx]}.</span>
            <span className="text-white">{choice}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

function selectQuestions(state: string, license: string): Question[] {
  if (!state || !license) return []
  const stateQs = SEED_QUESTIONS.filter((q) => q.state === state && q.license_type === license)
  const natlQs = SEED_QUESTIONS.filter((q) => q.state === NATIONAL && q.license_type === license)
  return [...stateQs, ...natlQs]
}

function Dashboard({ state, license, onBack }: { state: string; license: string; onBack: () => void }) {
  const [mode, setMode] = useState<'flashcards' | 'quiz' | 'mock' | 'plan' | 'profile' | 'admin' | null>(null)
  const questions: Question[] = useMemo(() => selectQuestions(state, license), [state, license])

  if (mode === 'flashcards') return <View title="Flashcards" desc="Review questions from your selected state and license." back={onBack} ><FlashcardView questions={questions} onBack={onBack} onDone={onBack} /></View>
  if (mode === 'quiz') return <View title="Quizzes" desc="10-question practice quiz from your selection." back={onBack} ><QuizView questions={questions} onBack={onBack} onDone={onBack} /></View>
  if (mode === 'mock') return <View title="Mock Exam" desc="Full timed mock exam for your exam profile." back={onBack} ><MockView questions={questions} onBack={onBack} /></View>
  if (mode === 'plan') return <View title="Study Plan" desc="Planned topics and weak-area focus." back={onBack} ><StudyPlanView questions={questions} state={state} license={license} /></View>
  if (mode === 'profile') return <View title="Profile" desc="Saved progress and mastery summary." back={onBack} ><ProfileView questions={questions} state={state} license={license} /></View>
  if (mode === 'admin') return <View title="Content" desc="Question bank management." back={onBack} ><AdminView questions={questions} /></View>

  return (
    <div className="grid md:grid-cols-3 gap-5">
      <DashboardCard title="Study Guide" desc="State-specific outlines, definitions, and focused notes." icon={<BookOpen />} cta="Start Flashcards" onClick={() => setMode('flashcards')} />
      <DashboardCard title="Quizzes" desc="Practice questions mapped to your state exam outline." icon={<ClipboardList />} cta="Start Quiz" onClick={() => setMode('quiz')} />
      <DashboardCard title="Mock Exam" desc="Timed full-length simulation." icon={<Gauge />} cta="Start Mock" onClick={() => setMode('mock')} />
      <DashboardCard title="Study Plan" desc="Topic plan and weak-area targeting." icon={<BookOpen />} cta="Open Plan" onClick={() => setMode('plan')} />
      <DashboardCard title="Profile" desc="Progress and mastery summary." icon={<ClipboardList />} cta="Open Profile" onClick={() => setMode('profile')} />
      <DashboardCard title="Content" desc="Question bank management." icon={<Gauge />} cta="Open Content" onClick={() => setMode('admin')} />
    </div>
  )
}

function DashboardCard({ title, desc, icon, cta, onClick }: { title: string; desc: string; icon: React.ReactNode; cta: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="block rounded-2xl border border-white/[0.06] bg-dark-800/60 p-5 hover:-translate-y-1 transition text-left">
      <div className="text-neon-cyan">{icon}</div>
      <h3 className="mt-3 text-white font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{desc}</p>
      <div className="mt-4 text-sm text-white inline-flex items-center gap-2">{cta} <ArrowRight size={16} /></div>
    </button>
  )
}

function View({ title, desc, back, children }: { title: string; desc: string; back: () => void; children: React.ReactNode }) {
  return (
    <div>
      <Button variant="ghost" onClick={back}>← Back</Button>
      <h2 className="mt-3 text-white text-2xl font-semibold">{title}</h2>
      <p className="text-muted">{desc}</p>
      <div className="mt-6">{children}</div>
    </div>
  )
}

function StudyPlanView({ questions, state, license }: { questions: Question[]; state: string; license: string }) {
  const byTopic = useMemo(() => {
    const map = new Map<string, { topic: string; count: number }>()
    questions.forEach((q) => {
      const key = q.topic
      const current = map.get(key) || { topic: key, count: 0 }
      current.count += 1
      map.set(key, current)
    })
    return Array.from(map.values())
  }, [questions])

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
      <div className="text-white text-xl font-semibold">Study Plan</div>
      <div className="mt-2 text-gray-400">{state} • {license}</div>
      <div className="mt-4 space-y-2 text-sm text-gray-300">
        <div>1. Review {byTopic.length} topic groups.</div>
        <div>2. Complete 1 flashcard session and 1 quiz.</div>
        <div>3. Take a mock exam when topic coverage is strong.</div>
      </div>
      <div className="mt-4">
        <div className="text-xs text-muted mb-2">Topics</div>
        <div className="flex flex-wrap gap-2">
          {byTopic.length === 0 && <span className="text-xs text-gray-400">No topics yet.</span>}
          {byTopic.map((t) => <span key={t.topic} className="rounded-lg border border-white/10 bg-dark-900/70 px-3 py-1 text-xs text-gray-300">{t.topic} ({t.count})</span>)}
        </div>
      </div>
    </div>
  )
}

function ProfileView({ questions, state, license }: { questions: Question[]; state: string; license: string }) {
  const percent = questions.length === 0 ? 0 : 100
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
        <div className="text-white text-xl font-semibold">Progress</div>
        <div className="mt-2 text-gray-400">{state} • {license}</div>
        <div className="mt-4 text-sm text-gray-300">Mastery estimate: {Math.round(percent)}%</div>
        <div className="mt-2 h-2 w-full rounded bg-dark-700">
          <div className="h-2 rounded bg-neon-cyan transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
        <div className="text-white text-xl font-semibold">History</div>
        <div className="mt-2 text-gray-400 text-sm">No saved sessions yet.</div>
      </div>
    </div>
  )
}

function AdminView({ questions }: { questions: Question[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
      <div className="text-white text-xl font-semibold">Content</div>
      <div className="mt-2 text-gray-400">Question bank ({questions.length} loaded in memory)</div>
      <div className="mt-4 text-xs text-gray-400">Admin import UI is scaffolded but not implemented in this build.</div>
    </div>
  )
}

export default function App() {
  const [state, setState] = useState('')
  const [license, setLicense] = useState('')
  const [mode, setMode] = useState<'landing' | 'study' | 'dashboard'>('landing')

  const questions: Question[] = useMemo(() => selectQuestions(state, license), [state, license])

  return (
    <div className="relative min-h-screen bg-dark-950 text-gray-200 bg-grid overflow-hidden">
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div>
          <div className="text-white font-semibold tracking-wide">InsuranceStudyGuide</div>
          <div className="text-muted text-xs">50-state life insurance exam prep</div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button onClick={() => setMode('landing')} className="text-gray-400 hover:text-white">Home</button>
          <button onClick={() => setMode('dashboard')} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Dashboard</button>
        </div>
      </nav>

      {mode === 'landing' && (
        <>
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
            <p className="mt-3 text-xs text-muted">Select both, then open Dashboard.</p>
          </header>
          <main className="relative z-10 max-w-7xl mx-auto px-6 py-8" id="features">
            <div className="grid md:grid-cols-3 gap-5">
              <FeatureCard title="Study Guide" desc="State-specific outlines, definitions, and exam-focused notes." icon={<BookOpen />} cta="Open Dashboard" onClick={() => setMode('dashboard')} />
              <FeatureCard title="Quizzes" desc="Practice questions mapped to your state exam outline." icon={<ClipboardList />} cta="Open Dashboard" onClick={() => setMode('dashboard')} />
              <FeatureCard title="Mock Exam" desc="Timed full-length simulation." icon={<Gauge />} cta="Open Dashboard" onClick={() => setMode('dashboard')} />
            </div>
          </main>
        </>
      )}

      {mode === 'study' && <FlashcardView questions={questions} onBack={() => setMode('dashboard')} onDone={() => setMode('dashboard')} />}
      {mode === 'dashboard' && <Dashboard state={state} license={license} onBack={() => setMode('landing')} />}

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-10 text-xs text-muted">InsuranceStudyGuide — approved scope only.</footer>
    </div>
  )
}
