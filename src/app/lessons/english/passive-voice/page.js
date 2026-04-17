'use client'
import { useState } from 'react'
import Exercise from '../../../../components/Exercise'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import { RefreshCcw, BookOpen, Star } from 'lucide-react'
import confetti from 'canvas-confetti'

const CW_DATA = [
  // --- READING COMPREHENSION ---
  {
    id: 'eng_passive_read_1',
    type: 'mcq',
    problem: '1. According to the text, how are cacao beans harvested?',
    options: [
      { label: 'They are harvested by big machines.', value: '1' },
      { label: 'They are harvested by farmers by hand.', value: '2' },
      { label: 'They are grown in factories.', value: '3' }
    ],
    correctAnswer: '2',
    solution: 'В тексте: "they are harvested by farmers by hand".'
  },
  {
    id: 'eng_passive_read_2',
    type: 'mcq',
    problem: '2. Where are the beans roasted?',
    options: [
      { label: 'At the chocolate factories.', value: '1' },
      { label: 'On small farms in Africa.', value: '2' },
      { label: 'In the sun.', value: '3' }
    ],
    correctAnswer: '1',
    solution: 'В тексте: "At the factory, the beans are roasted...".'
  },
  // --- BLOCK 1: DROPDOWN (TENSES) ---
  {
    id: 'eng_passive_be_1',
    type: 'dropdown',
    problem: '3. (Every day) The office _______ cleaned at 6 PM.',
    options: [
      { label: 'is', value: 'is' },
      { label: 'are', value: 'are' },
      { label: 'was', value: 'was' },
      { label: 'will be', value: 'will be' }
    ],
    correctAnswer: 'is',
    hint: 'Every day → Present Simple Passive (is/are + V3). Office — ед. ч.',
    solution: 'The office is cleaned every day.'
  },
  {
    id: 'eng_passive_be_2',
    type: 'dropdown',
    problem: '4. (Last night) My car _______ stolen!',
    options: [
      { label: 'is', value: 'is' },
      { label: 'was', value: 'was' },
      { label: 'were', value: 'were' },
      { label: 'has been', value: 'has been' }
    ],
    correctAnswer: 'was',
    hint: 'Last night → Past Simple Passive (was/were + V3).',
    solution: 'My car was stolen last night.'
  },
  {
    id: 'eng_passive_be_3',
    type: 'dropdown',
    problem: '5. (Next year) The new bridge _______ opened to the public.',
    options: [
      { label: 'is', value: 'is' },
      { label: 'was', value: 'was' },
      { label: 'will be', value: 'will be' }
    ],
    correctAnswer: 'will be',
    hint: 'Next year → Future Simple Passive (will be + V3).',
    solution: 'The bridge will be opened next year.'
  },
  {
    id: 'eng_passive_be_4',
    type: 'dropdown',
    problem: '6. (Just now / Result) Oh no! The window _______ broken!',
    options: [
      { label: 'is', value: 'is' },
      { label: 'was', value: 'was' },
      { label: 'has been', value: 'has been' }
    ],
    correctAnswer: 'has been',
    hint: 'Result just now → Present Perfect Passive (has/have been + V3).',
    solution: 'The window has been broken.'
  },
  {
    id: 'eng_passive_be_5',
    type: 'dropdown',
    problem: '7. (Usually) Millions of emails _______ sent every day.',
    options: [
      { label: 'is', value: 'is' },
      { label: 'are', value: 'are' },
      { label: 'were', value: 'were' }
    ],
    correctAnswer: 'are',
    solution: 'Emails (plural) are sent.'
  },
  {
    id: 'eng_passive_be_6',
    type: 'dropdown',
    problem: "8. (In 1997) Harry Potter and the Philosopher's Stone _______ published.",
    options: [
      { label: 'is', value: 'is' },
      { label: 'was', value: 'was' },
      { label: 'were', value: 'were' }
    ],
    correctAnswer: 'was',
    solution: 'In 1997 → was published.'
  },
  {
    id: 'eng_passive_be_7',
    type: 'dropdown',
    problem: '9. The cake was made _______ chocolate and strawberries. (Инструмент/Ингредиент)',
    options: [
      { label: 'by', value: 'by' },
      { label: 'with', value: 'with' }
    ],
    correctAnswer: 'with',
    solution: 'With — для инструментов/ингредиентов.'
  },
  {
    id: 'eng_passive_be_8',
    type: 'dropdown',
    problem: '10. The photo was taken _______ my brother. (Человек/Деятель)',
    options: [
      { label: 'by', value: 'by' },
      { label: 'with', value: 'with' }
    ],
    correctAnswer: 'by',
    solution: 'By — для деятеля (человека).'
  },
  // --- BLOCK 2: TRANSLATIONS (WORD BUILDER) ---
  {
    id: 'eng_passive_trans_1',
    type: 'text',
    problem: '11. Письмо было написано вчера. (Translate)',
    correctAnswer: 'The letter was written yesterday',
    solution: 'The letter was written yesterday.'
  },
  {
    id: 'eng_passive_trans_2',
    type: 'text',
    problem: '12. По-английски говорят по всему миру. (Translate)',
    correctAnswer: 'English is spoken all over the world',
    solution: 'English is spoken all over the world.'
  },
  {
    id: 'eng_passive_trans_3',
    type: 'text',
    problem: '13. Мой телефон украли! (К настоящему моменту)',
    correctAnswer: 'My phone has been stolen',
    solution: 'My phone has been stolen.'
  },
  {
    id: 'eng_passive_trans_4',
    type: 'text',
    problem: '14. Когда был построен дом? (Вопрос)',
    correctAnswer: 'When was the house built?',
    solution: 'When was the house built?'
  },
  {
    id: 'eng_passive_trans_5',
    type: 'text',
    problem: '15. Отчет будет закончен завтра.',
    correctAnswer: 'The report will be finished tomorrow',
    solution: 'The report will be finished tomorrow.'
  },
  // --- BLOCK 3: ACTIVE OR PASSIVE ---
  {
    id: 'eng_passive_ac_1',
    type: 'mcq',
    problem: '16. "Somebody cleans the room." -> Какое предложение правильно переведено в пассив?',
    options: [
      { label: 'The room cleaned somebody.', value: '1' },
      { label: 'The room is cleaned.', value: '2' },
      { label: 'The room was cleaned.', value: '3' }
    ],
    correctAnswer: '2',
    solution: 'Cleans (Present Simple) -> is cleaned.'
  },
  {
    id: 'eng_passive_ac_2',
    type: 'mcq',
    problem: '17. "They built the house in 2010." -> Пассивный вариант:',
    options: [
      { label: 'The house is built in 2010.', value: '1' },
      { label: 'The house built in 2010.', value: '2' },
      { label: 'The house was built in 2010.', value: '3' }
    ],
    correctAnswer: '3',
    solution: 'Built (Past Simple) -> was built.'
  },
  {
    id: 'eng_passive_ac_3',
    type: 'mcq',
    problem: "18. I can't find my keys! I think they ________!",
    options: [
      { label: 'stole', value: '1' },
      { label: 'have been stolen', value: '2' },
      { label: 'was stolen', value: '3' }
    ],
    correctAnswer: '2',
    solution: "Result just now -> have been stolen."
  },
  // --- BLOCK 4: V3 FORMS ---
  { id: 'eng_passive_v3_1', type: 'text', problem: '19. make →', correctAnswer: 'made' },
  { id: 'eng_passive_v3_2', type: 'text', problem: '20. write →', correctAnswer: 'written' },
  { id: 'eng_passive_v3_3', type: 'text', problem: '21. break →', correctAnswer: 'broken' },
  { id: 'eng_passive_v3_4', type: 'text', problem: '22. build →', correctAnswer: 'built' },
  { id: 'eng_passive_v3_5', type: 'text', problem: '23. invent →', correctAnswer: 'invented' }
]

const HW_VARIANTS = {
  1: [
    {
      id: 'eng_hw_1',
      type: 'text',
      problem: '1. English (speak) _______ in Australia.',
      correctAnswer: 'is spoken',
      hint: 'Present Simple Passive'
    },
    {
      id: 'eng_hw_2',
      type: 'text',
      problem: '2. These cars (make) _______ in Japan.',
      correctAnswer: 'are made',
      hint: 'Present Simple Passive (plural)'
    },
    {
      id: 'eng_hw_3',
      type: 'text',
      problem: '3. The mail (deliver) _______ at 9 AM every day.',
      correctAnswer: 'is delivered',
      hint: 'Present Simple Passive'
    },
    {
      id: 'eng_hw_4',
      type: 'text',
      problem: '4. (Question) _______ the rooms (clean) _______ every day?',
      correctAnswer: 'Are cleaned',
      hint: 'Are the rooms cleaned...?'
    },
    {
      id: 'eng_hw_5',
      type: 'text',
      problem: '5. This room (not use) _______ by anybody.',
      correctAnswer: 'is not used',
      hint: 'Negative Present Simple Passive'
    },
    {
      id: 'eng_hw_6',
      type: 'text',
      problem: '6. My wallet (steal) _______ yesterday.',
      correctAnswer: 'was stolen',
      hint: 'Past Simple Passive'
    },
    {
      id: 'eng_hw_7',
      type: 'text',
      problem: '7. The telephone (invent) _______ by Alexander Bell.',
      correctAnswer: 'was invented',
      hint: 'Past Simple Passive'
    }
  ],
  2: [
    {
      id: 'eng_hw_8',
      type: 'text',
      problem: '8. These houses (build) _______ in 1950.',
      correctAnswer: 'were built',
      hint: 'Past Simple Passive (plural)'
    },
    {
      id: 'eng_hw_9',
      type: 'text',
      problem: '9. (Question) _______ this play (write) _______ by Shakespeare?',
      correctAnswer: 'Was written',
      hint: 'Was this play written...?'
    },
    {
      id: 'eng_hw_10',
      type: 'text',
      problem: '10. I (not invite) _______ to the party last night.',
      correctAnswer: 'was not invited',
      hint: 'Negative Past Simple Passive'
    },
    {
      id: 'eng_hw_11',
      type: 'text',
      problem: '11. The project (finish) _______ tomorrow.',
      correctAnswer: 'will be finished',
      hint: 'Future Simple Passive'
    },
    {
      id: 'eng_hw_12',
      type: 'text',
      problem: '12. The door (paint) _______ recently.',
      correctAnswer: 'has been painted',
      hint: 'Present Perfect Passive'
    },
    {
      id: 'eng_hw_13',
      type: 'text',
      problem: '13. The tickets (send) _______ by email next week.',
      correctAnswer: 'will be sent',
      hint: 'Future Simple Passive'
    },
    {
      id: 'eng_hw_14',
      type: 'text',
      problem: '14. Ten new people (hire) _______ by the company this month.',
      correctAnswer: 'have been hired',
      hint: 'Present Perfect Passive (plural)'
    },
    {
      id: 'eng_hw_15',
      type: 'text',
      problem: '15. (Question) _______ dinner (serve) _______ at 8?',
      correctAnswer: 'Will be served',
      hint: 'Will dinner be served...?'
    }
  ]
}

export default function PassiveVoicePage() {
  const lessonId = 'eng_passive'
  const cwCount = CW_DATA.length
  const hwCount = variant === 1 ? 7 : 8
  const { progress, updateProgress, resetHW, variant, getStats, loading } =
    useLessonProgress(lessonId, cwCount, hwCount)
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
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-black text-slate-900 mb-6">
                  Что такое пассивный залог?
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Пассивный залог образуется с помощью глагола «to be» + причастие III формы (past participle). Субъект действия становится объектом, а исполнитель (при необходимости) указывается после предлога <b>by</b>.
                </p>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                  <strong className="text-emerald-900 block mb-2">Золотая формула:</strong>
                  <code className="text-emerald-700 font-bold text-lg">to be + V3 (Past Participle)</code>
                </div>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li><b>Present Simple</b> → <i>is/are + written</i></li>
                  <li><b>Past Simple</b> → <i>was/were + written</i></li>
                  <li><b>Future</b> → <i>will be + written</i></li>
                  <li><b>Present Perfect</b> → <i>has/have been + written</i></li>
                </ul>
              </div>

              <div className="bg-amber-50 p-8 rounded-3xl border border-amber-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-black text-amber-900 mb-4 font-serif italic">
                  The Journey of Chocolate
                </h2>
                <div className="text-amber-900/80 leading-relaxed space-y-4 text-lg">
                  <p>
                    Chocolate <strong>is loved</strong> by people all over the world, but how is it actually made? 
                    The process begins in tropical countries like Ivory Coast and Ghana. 
                    Cacao beans <strong>are grown</strong> on small farms. When the pods are ripe, 
                    they <strong>are harvested</strong> by farmers by hand.
                  </p>
                  <p>
                    After that, the beans <strong>are fermented</strong> and dried in the sun. 
                    Then, they <strong>are shipped</strong> to chocolate factories in Europe or America. 
                    At the factory, the beans <strong>are roasted</strong> at high temperatures to bring out the flavor. 
                    Finally, sugar and milk <strong>are added</strong>, and the mixture <strong>is turned</strong> into delicious chocolate bars.
                  </p>
                  <p>
                    Many new types of chocolate <strong>will be invented</strong> in the future, 
                    but the classic milk chocolate will always be popular!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classwork' && (
            <div className="space-y-6">
              <AdvancedProgressBar data={progress.cw} total={cwCount} title="Прогресс классной работы" />
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

              <AdvancedProgressBar data={progress.hw} total={hwCount} title="Прогресс домашней работы" />

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
