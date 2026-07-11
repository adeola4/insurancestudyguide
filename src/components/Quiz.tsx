import { useQuiz } from '../lib/studyEngine'

export default function Quiz({ state, license_type, questions }: { state: string; license_type: string; questions: any[] }) {
  const { current, selected, submit, restart, finished, progress, score, total, timeLeft } = useQuiz(questions, 10, 45)

  if (!current) return <div className="mt-8 text-gray-400">No quiz questions available for this selection.</div>

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
        <div className="text-sm text-gray-400">Question {Math.min(10, total)} of {total} • {timeLeft}s</div>
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
          <button
            key={idx}
            onClick={() => submit(idx)}
            disabled={selected !== null}
            className={`rounded-xl border px-4 py-3 text-left hover:bg-white/10 disabled:opacity-60 ${selected === idx ? (idx === current.correct_index ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-white/10 bg-dark-900/70'}`}
          >
            <span className="mr-2 text-muted">{['A','B','C','D'][idx]}.</span>
            <span className="text-white">{choice}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
