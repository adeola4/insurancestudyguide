import { useFlashcards } from '../lib/studyEngine'

export default function Flashcards({ state, license_type, questions }: { state: string; license_type: string; questions: any[] }) {
  const { current, flipped, answer, next, restart, done, progress, score, total } = useFlashcards(questions)

  if (!current) return <div className="mt-8 text-gray-400">No flashcards available for this selection.</div>

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <button onClick={restart} className="text-sm text-gray-400 hover:text-white">Restart</button>
        <div className="text-sm text-gray-400">{done ? 'Finished' : `${score} / ${total}`}</div>
      </div>
      <div className="mt-4 h-2 w-full rounded bg-dark-700">
        <div className="h-2 rounded bg-neon-cyan transition-all" style={{ width: `${progress}%` }} />
      </div>

      {!done ? (
        <div className="mt-6">
          <div
            onClick={() => flipped && next()}
            className="relative cursor-pointer select-none"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6 text-left">
              <div className="text-xs text-muted mb-2">{current.topic}</div>
              <div className="text-white text-lg">{current.question}</div>
            </div>
            <AnimatePresence>
              {flipped && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-white/[0.06] bg-dark-800/80 p-6 text-left">
                  <div className="text-neon-cyan font-semibold mb-2">Answer</div>
                  <div className="text-white">{current.choices[current.correct_index]}</div>
                  <div className="mt-3 text-gray-400 text-sm">{current.explanation}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 grid gap-2">
            {current.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => answer(idx)}
                disabled={flipped}
                className="rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-left hover:bg-white/10 disabled:opacity-60"
              >
                <span className="mr-2 text-muted">{['A','B','C','D'][idx]}.</span>
                <span className="text-white">{choice}</span>
              </button>
            ))}
          </div>

          {flipped && (
            <button onClick={next} className="mt-6 rounded-xl bg-white text-dark-950 px-5 py-3 font-medium hover:bg-gray-200">Next</button>
          )}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-dark-800/60 p-6">
          <div className="text-white text-xl font-semibold">Session complete</div>
          <div className="mt-2 text-gray-400">Score: {score} / {total}</div>
          <button onClick={restart} className="mt-4 rounded-xl bg-white text-dark-950 px-5 py-3 font-medium hover:bg-gray-200">Restart</button>
        </div>
      )}
    </div>
  )
}
