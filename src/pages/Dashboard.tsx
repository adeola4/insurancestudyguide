import { useState } from 'react'
import { BookOpen, ClipboardList, Gauge, ArrowRight } from 'lucide-react'

function FeatureCard({ title, desc, icon, href, cta }: { title: string; desc: string; icon: React.ReactNode; href: string; cta?: string }) {
  return (
    <a href={href} className="block rounded-2xl border border-white/[0.06] bg-dark-800/60 p-5 hover:-translate-y-1 transition">
      <div className="text-neon-cyan">{icon}</div>
      <h3 className="mt-3 text-white font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{desc}</p>
      {cta && <div className="mt-4 text-sm text-white inline-flex items-center gap-2">{cta} <ArrowRight size={16}/></div>}
    </a>
  )
}

export default function Dashboard({ state, license_type, onStart }: { state: string; license_type: string; onStart: (mode: 'flashcards' | 'quiz' | 'mock') => void }) {
  const [mode, setMode] = useState<'flashcards' | 'quiz' | 'mock' | null>(null)

  if (mode === 'flashcards') {
    return (
      <div>
        <button onClick={() => setMode(null)} className="text-sm text-gray-400 hover:text-white">← Back</button>
        <h2 className="mt-3 text-white text-2xl font-semibold">Flashcards</h2>
        <p className="text-muted">Review questions from your selected state and license.</p>
        {/* Flashcards component rendered by caller */}
      </div>
    )
  }

  if (mode === 'quiz') {
    return (
      <div>
        <button onClick={() => setMode(null)} className="text-sm text-gray-400 hover:text-white">← Back</button>
        <h2 className="mt-3 text-white text-2xl font-semibold">Quiz</h2>
        <p className="text-muted">10-question practice quiz from your selection.</p>
      </div>
    )
  }

  if (mode === 'mock') {
    return (
      <div>
        <button onClick={() => setMode(null)} className="text-sm text-gray-400 hover:text-white">← Back</button>
        <h2 className="mt-3 text-white text-2xl font-semibold">Mock Exam</h2>
        <p className="text-muted">Full timed mock exam for your exam profile.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-5">
      <FeatureCard title="Study Guide" desc="State-specific outlines, definitions, and exam-focused notes." icon={<BookOpen />} href={`/study/flashcards?state=${encodeURIComponent(state)}&license=${encodeURIComponent(license_type)}`} cta="Start Flashcards" />
      <FeatureCard title="Quizzes" desc="Practice questions mapped to your state exam outline." icon={<ClipboardList />} href={`/quiz?state=${encodeURIComponent(state)}&license=${encodeURIComponent(license_type)}`} cta="Start Quiz" />
      <FeatureCard title="Mock Exam" desc="Timed full-length exam simulation." icon={<Gauge />} href={`/mock?state=${encodeURIComponent(state)}&license=${encodeURIComponent(license_type)}`} cta="Start Mock" />
    </div>
  )
}
