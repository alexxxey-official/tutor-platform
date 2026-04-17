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
    problem: '<b>Reading:</b> According to the text, how are cacao beans harvested?',
    options: [
      { label: 'They are harvested by big machines.', value: '1' },
      { label: 'They are harvested by farmers by hand.', value: '2' },
      { label: 'They are grown in factories.', value: '3' }
    ],
    correctAnswer: '2',
    hint: 'Посмотри первый абзац текста про шоколад.',
    solution: 'В тексте сказано: "they are harvested by farmers by hand".'
  },
  {
    id: 'eng_passive_read_2',
    type: 'mcq',
    problem: '<b>Reading:</b> Where are the beans roasted?',
    options: [
      { label: 'At the chocolate factories.', value: '1' },
      { label: 'On small farms in Africa.', value: '2' },
      { label: 'In the sun.', value: '3' }
    ],
    correctAnswer: '1',
    hint: 'Посмотри второй абзац: "At the factory, the beans are roasted..."',
    solution: 'Beans are roasted at chocolate factories.'
  },
  // --- BLOCK 1: FORMS OF TO BE ---
  {
    id: 'eng_passive_be_1',
    type: 'mcq',
    problem: '(Every day) The office _______ cleaned at 6 PM.',
    options: [
      { label: 'is', value: 'is' },
      { label: 'are', value: 'are' },
      { label: 'was', value: 'was' },
      { label: 'will be', value: 'will be' }
    ],
    correctAnswer: 'is',
    hint: 'Every day указывает на Present Simple.',
    solution: 'Present Simple Passive: is/are + V3. Office — единственное число.'
  },
  {
    id: 'eng_passive_be_2',
    type: 'mcq',
    problem: '(Last night) My car _______ stolen!',
    options: [
      { label: 'is', value: 'is' },
      { label: 'was', value: 'was' },
      { label: 'were', value: 'were' },
      { label: 'has been', value: 'has been' }
    ],
    correctAnswer: 'was',
    hint: 'Last night — это прошедшее время (Past Simple).',
    solution: 'Past Simple Passive: was/were + V3.'
  },
  {
    id: 'eng_passive_be_3',
    type: 'mcq',
    problem: '(Next year) The new bridge _______ opened to the public.',
    options: [
      { label: 'is', value: 'is' },
      { label: 'was', value: 'was' },
      { label: 'will be', value: 'will be' }
    ],
    correctAnswer: 'will be',
    hint: 'Next year указывает на будущее время.',
    solution: 'Future Simple Passive: will be + V3.'
  },
  {
    id: 'eng_passive_be_4',
    type: 'mcq',
    problem: '(Result) Oh no! The window _______ broken!',
    options: [
      { label: 'is', value: 'is' },
      { label: 'was', value: 'was' },
      { label: 'has been', value: 'has been' }
    ],
    correctAnswer: 'has been',
    hint: 'Когда важен результат к настоящему моменту, используем Perfect.',
    solution: 'Present Perfect Passive: has/have been + V3.'
  },
  // --- BLOCK 2: TRANSLATIONS ---
  {
    id: 'eng_passive_trans_1',
    type: 'text',
    problem: 'Переведи: <b>По-английски говорят по всему миру.</b>',
    correctAnswer: 'English is spoken all over the world',
    hint: 'Используй Present Simple Passive: is spoken.',
    solution: 'English is spoken all over the world.'
  },
  {
    id: 'eng_passive_trans_2',
    type: 'text',
    problem: 'Переведи: <b>Когда был построен дом?</b>',
    correctAnswer: 'When was the house built?',
    hint: 'Это вопрос в Past Simple Passive. Не забудь про порядок слов.',
    solution: 'When was the house built?'
  },
  // --- BLOCK 3: ACTIVE OR PASSIVE ---
  {
    id: 'eng_passive_ac_1',
    type: 'mcq',
    problem: '"Somebody cleans the room." -> Какое предложение правильно переведено в пассив?',
    options: [
      { label: 'The room cleaned somebody.', value: '1' },
      { label: 'The room is cleaned.', value: '2' },
      { label: 'The room was cleaned.', value: '3' }
    ],
    correctAnswer: '2',
    solution: 'Somebody cleans (Present Simple) -> The room is cleaned.'
  },
  // --- BLOCK 4: V3 FORMS ---
  {
    id: 'eng_passive_v3_1',
    type: 'text',
    problem: 'Напиши 3-ю форму глагола (V3): <b>write</b>',
    correctAnswer: 'written',
    solution: 'write - wrote - written'
  },
  {
    id: 'eng_passive_v3_2',
    type: 'text',
    problem: 'Напиши 3-ю форму глагола (V3): <b>build</b>',
    correctAnswer: 'built',
    solution: 'build - built - built'
  }
]

const HW_VARIANTS = {
  1: [
    {
      id: 'eng_hw_1',
      type: 'text',
      problem: 'People speak English in Australia. -> English _______ in Australia.',
      correctAnswer: 'is spoken',
      hint: 'Present Simple Passive'
    },
    {
      id: 'eng_hw_2',
      type: 'text',
      problem: 'Someone stole my wallet yesterday. -> My wallet _______ yesterday.',
      correctAnswer: 'was stolen',
      hint: 'Past Simple Passive'
    },
    {
      id: 'eng_hw_3',
      type: 'text',
      problem: 'Alexander Bell invented the telephone. -> The telephone _______ by Alexander Bell.',
      correctAnswer: 'was invented',
      hint: 'Past Simple Passive'
    },
    {
      id: 'eng_hw_4',
      type: 'text',
      problem: 'They will finish the project tomorrow. -> The project _______ tomorrow.',
      correctAnswer: 'will be finished',
      hint: 'Future Simple Passive'
    }
  ],
  2: [
    {
      id: 'eng_hw_5',
      type: 'text',
      problem: 'They make these cars in Japan. -> These cars _______ in Japan.',
      correctAnswer: 'are made',
      hint: 'Present Simple Passive (множ. число)'
    },
    {
      id: 'eng_hw_6',
      type: 'text',
      problem: 'Someone has painted the door. -> The door _______ .',
      correctAnswer: 'has been painted',
      hint: 'Present Perfect Passive'
    },
    {
      id: 'eng_hw_7',
      type: 'text',
      problem: 'The postman delivers the mail at 9 AM. -> The mail _______ at 9 AM.',
      correctAnswer: 'is delivered',
      hint: 'Present Simple Passive'
    },
    {
      id: 'eng_hw_8',
      type: 'text',
      problem: 'Ten new people have been hired by the company. (Active: The company _______ ten new people.)',
      correctAnswer: 'has hired',
      hint: 'Переведи обратно в Active Voice (Present Perfect).'
    }
  ]
}

export default function PassiveVoicePage() {
  const lessonId = 'eng_passive'
  const cwCount = CW_DATA.length
  const hwCount = 4
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
