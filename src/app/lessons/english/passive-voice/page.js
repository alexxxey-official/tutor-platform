'use client'
import { useState } from 'react'
import Exercise from '../../../../components/Exercise'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import { RefreshCcw, BookOpen, Star } from 'lucide-react'
import confetti from 'canvas-confetti'

const CW_DATA = [
  {
    id: 'eng_cw_1',
    type: 'text',
    problem: 'Переведи в пассивный залог: <b>She writes a letter.</b>',
    correctAnswer: 'A letter is written (by her).',
    hint: 'В пассиве глагол «write» → «is written», субъект становится «by …».',
    solution: 'She writes a letter → A letter is written (by her).'
  },
  {
    id: 'eng_cw_2',
    type: 'text',
    problem: 'Переведи в пассивный залог: <b>The chef cooks the soup.</b>',
    correctAnswer: 'The soup is cooked (by the chef).',
    hint: 'Субъект «the soup», глагол «cooks» → «is cooked».',
    solution: 'The chef cooks the soup → The soup is cooked (by the chef).'
  }
]

const HW_VARIANTS = {
  1: [
    {
      id: 'eng_hw_1',
      type: 'text',
      problem: 'Переведи в пассивный залог: <b>They will build a new bridge.</b>',
      correctAnswer: 'A new bridge will be built (by them).',
      hint: 'Будущее «will be built», субъект в скобках.'
    },
    {
      id: 'eng_hw_2',
      type: 'text',
      problem: 'Переведи в пассивный залог: <b>Someone has opened the window.</b>',
      correctAnswer: 'The window has been opened (by someone).',
      hint: 'Present perfect → «has been opened». '
    }
  ],
  2: [
    {
      id: 'eng_hw_1',
      type: 'text',
      problem: 'Переведи в пассивный залог: <b>People speak English worldwide.</b>',
      correctAnswer: 'English is spoken worldwide (by people).',
      hint: 'Общее действие → «is spoken». '
    },
    {
      id: 'eng_hw_2',
      type: 'text',
      problem: 'Переведи в пассивный залог: <b>They were painting the house.</b>',
      correctAnswer: 'The house was being painted (by them).',
      hint: 'Past continuous → «was being painted». '
    }
  ]
}

export default function PassiveVoicePage() {
  const lessonId = 'eng_passive'
  const { progress, updateProgress, resetHW, variant, getStats, loading } =
    useLessonProgress(lessonId, 2, 2)
  const [activeTab, setActiveTab] = useState('theory')

  if (loading) return (
    <div className="p-20 text-center font-mono animate-pulse">Загрузка урока…</div>
  )

  const cwStats = getStats('cw')
  const hwStats = getStats('hw')

  const handleHWSuccess = (id, attempts, status) => {
    updateProgress(id, 'hw', status, attempts)
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#10b981', '#f59e0b']
    })
  }

  if (hwStats.isComplete && hwStats.pct >= 85 && !progress.confettiTriggered) {
    triggerConfetti()
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      {/* HERO */}
      <div className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-indigo-400 font-bold uppercase tracking-[4px] text-xs mb-4">
            English · B1‑B2
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight">
            Passive Voice <span className="text-indigo-400">Lesson</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Научитесь превращать активные предложения в пассивные, используя разные времена.
          </p>
        </div>
        <div className="absolute right-[-5%] top-[-10%] text-[20rem] font-black text-white/[0.03] select-none pointer-events-none">
          …
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex gap-2 p-1 bg-slate-200/50 rounded-2xl mt-8 mb-8 sticky top-4 z-40 backdrop-blur-md shadow-sm">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'theory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen size={18} /> Теория
          </button>
          <button
            onClick={() => setActiveTab('classwork')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'classwork' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Star size={18} /> Классная
          </button>
          <button
            onClick={() => setActiveTab('homework')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'homework' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Star size={18} /> Домашка
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-8">
          {activeTab === 'theory' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-slate-900 mb-6">
                Что такое пассивный залог?
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Пассивный залог образуется с помощью глагола «to be» + причастие III формы (past participle). Субъект действия становится объектом, а исполнитель (при необходимости) указывается после предлога <b>by</b>.
              </p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>Present Simple → <i>is/are + past participle</i></li>
                <li>Past Simple → <i>was/were + past participle</i></li>
                <li>Future → <i>will be + past participle</i></li>
                <li>Present Perfect → <i>has/have been + past participle</i></li>
                <li>Past Continuous → <i>was/were being + past participle</i></li>
              </ul>
            </div>
          )}

          {activeTab === 'classwork' && (
            <div className="space-y-6">
              <AdvancedProgressBar data={progress.cw} total={2} title="Прогресс классной работы" />
              {CW_DATA.map((ex) => (
                <Exercise
                  key={ex.id}
                  {...ex}
                  mode="cw"
                  savedState={progress.cw?.[ex.id]}
                  onSuccess={(attempts, status) => updateProgress(ex.id, 'cw', status, attempts)}
                />
              ))}
            </div>
          )}

          {activeTab === 'homework' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">Вариант {variant}</h3>
                  <p className="text-slate-500 text-sm">Один шанс пересдать (переключить вариант)</p>
                </div>
                {variant === 1 && (
                  <button
                    onClick={resetHW}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"
                  >
                    <RefreshCcw size={16} /> Другой вариант
                  </button>
                )}
              </div>

              <AdvancedProgressBar data={progress.hw} total={2} title="Прогресс домашней работы" />

              {HW_VARIANTS[variant].map((ex) => (
                <Exercise
                  key={ex.id}
                  {...ex}
                  mode="hw"
                  savedState={progress.hw?.[ex.id]}
                  onSuccess={handleHWSuccess}
                />
              ))}

              {hwStats.isComplete && (
                <div className="bg-indigo-600 p-8 rounded-3xl text-white text-center shadow-xl shadow-indigo-200 mt-12">
                  <h3 className="text-3xl font-black mb-2">Урок завершён!</h3>
                  <p className="text-indigo-100 opacity-80 mb-6">Твой результат: {hwStats.pct}%</p>
                  {hwStats.pct >= 85 && <div className="text-5xl mb-4">🎉</div>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
