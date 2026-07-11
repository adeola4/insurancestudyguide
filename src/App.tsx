import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ClipboardList, Gauge, ArrowRight } from 'lucide-react'

function App() {
  const [state, setState] = useState('')
  const [license, setLicense] = useState('')

  const enter = () => {
    if (!state || !license) return alert('Select a state and license type.')
  }

  return (
    <div className="relative min-h-screen bg-dark-950 text-gray-200 bg-grid overflow-hidden">
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div>
          <div className="text-white font-semibold tracking-wide">InsuranceStudyGuide</div>
          <div className="text-muted text-xs">50-state life insurance exam prep</div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#features" className="text-gray-400 hover:text-white">Features</a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10"
          >
            Start Studying
          </button>
        </div>
      </nav>

      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-semibold text-white leading-tight max-w-3xl"
        >
          Study smarter for your life insurance license
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-4 text-gray-400 text-lg max-w-2xl"
        >
          Choose your state and license path, then study with flashcards, quizzes, and focused prep tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl"
        >
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-white"
          >
            <option value="">Select your state</option>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>Arizona</option>
            <option>Arkansas</option>
            <option>California</option>
            <option>Colorado</option>
            <option>Connecticut</option>
            <option>Delaware</option>
            <option>District of Columbia</option>
            <option>Florida</option>
            <option>Georgia</option>
            <option>Hawaii</option>
            <option>Idaho</option>
            <option>Illinois</option>
            <option>Indiana</option>
            <option>Iowa</option>
            <option>Kansas</option>
            <option>Kentucky</option>
            <option>Louisiana</option>
            <option>Maine</option>
            <option>Maryland</option>
            <option>Massachusetts</option>
            <option>Michigan</option>
            <option>Minnesota</option>
            <option>Mississippi</option>
            <option>Missouri</option>
            <option>Montana</option>
            <option>Nebraska</option>
            <option>Nevada</option>
            <option>New Hampshire</option>
            <option>New Jersey</option>
            <option>New Mexico</option>
            <option>New York</option>
            <option>North Carolina</option>
            <option>North Dakota</option>
            <option>Ohio</option>
            <option>Oklahoma</option>
            <option>Oregon</option>
            <option>Pennsylvania</option>
            <option>Rhode Island</option>
            <option>South Carolina</option>
            <option>South Dakota</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Utah</option>
            <option>Vermont</option>
            <option>Virginia</option>
            <option>Washington</option>
            <option>West Virginia</option>
            <option>Wisconsin</option>
            <option>Wyoming</option>
          </select>

          <select
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-white"
          >
            <option value="">Select license type</option>
            <option>Life</option>
            <option>Health</option>
            <option>Life & Health</option>
          </select>

          <button
            onClick={enter}
            className="rounded-xl bg-white text-dark-950 px-5 py-3 font-medium hover:bg-gray-200"
          >
            Enter Prep <ArrowRight className="inline ml-1" size={18} />
          </button>
        </motion.div>

        <p className="mt-3 text-xs text-muted">This is the approved UI shell. Real study tools are next.</p>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8" id="features">
        <div className="grid md:grid-cols-3 gap-5">
          <FeatureCard
            title="Study Guide"
            desc="State-specific outlines, definitions, and exam-focused notes."
            icon={<BookOpen />}
          />
          <FeatureCard
            title="Quizzes"
            desc="Practice questions mapped to your state exam outline."
            icon={<ClipboardList />}
          />
          <FeatureCard
            title="Mastery Tracker"
            desc="See what you know and what still needs work."
            icon={<Gauge />}
          />
        </div>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-10 text-xs text-muted">
        InsuranceStudyGuide MVP shell — approved scope only.
      </footer>
    </div>
  )
}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/[0.06] bg-dark-800/60 backdrop-blur-xl p-5"
    >
      <div className="text-neon-cyan">{icon}</div>
      <h3 className="mt-3 text-white font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{desc}</p>
    </motion.div>
  )
}

export default App
