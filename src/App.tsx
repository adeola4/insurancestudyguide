import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ClipboardList, Gauge, ArrowRight } from 'lucide-react'
import { STATES, LICENSE_TYPES, SEED_QUESTIONS } from '../db/questions'
import Flashcards from '../components/Flashcards'
import Quiz from '../components/Quiz'
import Dashboard from '../pages/Dashboard'

function FeatureCard({ title, desc, icon, href, cta }: { title: string; desc: string; icon: React.ReactNode; href: string; cta: string }) {
  return (
    <a key={href} href={href} className="block rounded-2xl border border-white/[0.06] bg-dark-800/60 p-5 hover:-translate-y-1 transition">
      <div className="text-neon-cyan">{icon}</div>
      <h3 className="mt-3 text-white font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{desc}</p>
      <div className="mt-4 text-sm text-white inline-flex items-center gap-2">{cta} <ArrowRight size={16} /></div>
    </a>
  )
}

export default function App() {
  const [state, setState] = useState('')
  const [license, setLicense] = useState('')

  return (
    <div className="relative min-h-screen bg-dark-950 text-gray-200 bg-grid overflow-hidden">
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div>
          <div className="text-white font-semibold tracking-wide">InsuranceStudyGuide</div>
          <div className="text-muted text-xs">50-state life insurance exam prep</div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#features" className="text-gray-400 hover:text-white">Features</a>
          <a href="/dashboard" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Start Studying</a>
        </div>
      </nav>

      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-semibold text-white leading-tight max-w-3xl">
          Study smarter for your life insurance license
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-4 text-gray-400 text-lg max-w-2xl">
          Choose your state and license path to access flashcards, quizzes, and focused prep tools.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
          <select value={state} onChange={(e) => setState(e.target.value)} className="flex-1 rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-white">
            <option value="">Select your state</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={license} onChange={(e) => setLicense(e.target.value)} className="flex-1 rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-white">
            <option value="">Select license type</option>
            {LICENSE_TYPES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <a href={`/dashboard?state=${encodeURIComponent(state)}&license=${encodeURIComponent(license)}`} className="rounded-xl bg-white text-dark-950 px-5 py-3 font-medium hover:bg-gray-200 text-center">Enter Prep <ArrowRight className="inline ml-1" size={18} /></a>
        </motion.div>

        <p className="mt-3 text-xs text-muted">Approved UI shell. Real study tools live on subpages.</p>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8" id="features">
        <div className="grid md:grid-cols-3 gap-5">
          <FeatureCard title="Study Guide" desc="State-specific outlines, definitions, and exam-focused notes." icon={<BookOpen />} href={`/study?state=${encodeURIComponent(state)}&license=${encodeURIComponent(license)}`} cta="Start Flashcards" />
          <FeatureCard title="Quizzes" desc="Practice questions mapped to your state exam outline." icon={<ClipboardList />} href={`/quiz?state=${encodeURIComponent(state)}&license=${encodeURIComponent(license)}`} cta="Start Quiz" />
          <FeatureCard title="Mock Exam" desc="Timed full-length simulation." icon={<Gauge />} href={`/mock?state=${encodeURIComponent(state)}&license=${encodeURIComponent(license)}`} cta="Start Mock" />
        </div>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-10 text-xs text-muted">
        InsuranceStudyGuide MVP shell — approved scope only.
      </footer>
    </div>
  )
}
