'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'

export default function ReadingHolaLesson() {
  const totalCW = 2
  const totalHW = 3
  const total = totalCW + totalHW
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_reading_hola', totalCW, totalHW)
  const stats = getStats('cw')
  const statsHW = getStats('hw')
  const correctCount = stats.correct + statsHW.correct
  const pct = (correctCount / total) * 100

  const [answers, setAnswers] = useState({})

  // Restoration logic
  useEffect(() => {
    if (!loading && progress) {
        const restored = {}
        const restore = (mode) => {
            if (progress[mode]) {
                Object.keys(progress[mode]).forEach(id => {
                    const item = progress[mode][id]
                    if (item) {
                        restored[id] = { value: item.value || '', isCorrect: item.status === 'correct', checked: true }
                    }
                })
            }
        }
        restore('cw')
        restore('hw')
        setAnswers(prev => ({ ...prev, ...restored }))
    }
  }, [loading, progress])

  const speakSpanish = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = (id, correctAns, value, mode = 'cw') => {
    const isCorrect = value.toLowerCase().trim() === correctAns.toLowerCase().trim() && value !== ''
    setAnswers(prev => ({ ...prev, [id]: { value, isCorrect, checked: true } }))
    updateProgress(id, mode, isCorrect ? 'correct' : 'wrong', 1, value)
  }

  const SentencePair = ({ spanish, russian }) => (
    <div className="mb-6 group">
      <p className="text-[17px] text-[#1a1a2e] leading-relaxed flex items-start gap-3">
        <button 
          onClick={() => speakSpanish(spanish)}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f4a261]/10 text-[#f4a261] flex items-center justify-center text-sm hover:bg-[#f4a261] hover:text-white transition-colors mt-0.5"
          title="Прослушать"
        >
          🔊
        </button>
        <span className="font-medium pt-1">{spanish}</span>
      </p>
      <span className="text-[14px] text-gray-500 block mt-2 mb-4 border-l-2 border-[#e5e0d5] pl-4 ml-11 transition-colors group-hover:border-[#f4a261]">
        {russian}
      </span>
    </div>
  );

  const ExerciseItem = ({ id, q, ans, mode = 'cw' }) => {
    const state = answers[id] || { value: '', checked: false }
    return (
        <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="font-bold mb-3">{q}</p>
            <div className="flex gap-2">
                <input 
                    type="text"
                    value={state.value}
                    onChange={e => setAnswers(prev => ({ ...prev, [id]: { ...prev[id], value: e.target.value, checked: false } }))}
                    className={`flex-1 border-2 rounded-lg px-4 py-2 outline-none transition-all ${state.checked ? (state.isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50') : 'border-gray-200 focus:border-[#f4a261]'}`}
                    placeholder="Ответ по-испански..."
                />
                <button 
                    onClick={() => checkAnswer(id, ans, state.value, mode)}
                    className="bg-[#1a1a2e] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#f4a261] transition-colors"
                >Ok</button>
            </div>
            {state.checked && !state.isCorrect && <p className="text-rose-600 text-sm mt-2">Попробуй еще раз (подсказка: ответ в тексте)</p>}
            {state.checked && state.isCorrect && <p className="text-emerald-600 text-sm mt-2">¡Muy bien!</p>}
        </div>
    )
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono text-xl">CARGANDO...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#f4a261] mb-3">
          🇪🇸 Чтение · Текст 1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Hola,<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">me llamo...</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Базовый текст о себе. Идеально для старта! Слушай произношение и сверяйся с переводом.
        </p>
        <div className="absolute right-[-20px] top-[-20px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          TEXTO
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/lessons/spanish/reading/intro" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#f4a261] hover:text-white">
            ← Карта текстов
          </Link>
          <button 
            onClick={() => speakSpanish("¡Hola! Me llamo Carlos. Soy de Madrid, España. Tengo veinticinco años и soy estudiante. Estudio historia en la universidad. Vivo con mi familia. Mi padre se llama Juan и mi madre se llama María. Tengo un hermano menor, Luis. Me gusta mucho leer и escuchar música. Los fines de semana, camino por el parque con mis amigos.")}
            className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#f4a261] flex items-center gap-2"
          >
            <span>🔊</span> Прослушать весь текст
          </button>
        </nav>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 md:p-12 mb-4 mt-8 shadow-sm">
          <SentencePair 
            spanish="¡Hola! Me llamo Carlos. Soy de Madrid, España." 
            russian="Привет! Меня зовут Карлос. Я из Мадрида, Испания." 
          />

          <SentencePair 
            spanish="Tengo veinticinco años и soy estudiante. Estudio historia en la universidad." 
            russian="Мне 25 лет и я студент. Я изучаю историю в университете." 
          />

          <SentencePair 
            spanish="Vivo con mi familia. Mi padre se llama Juan и mi madre se llama María. Tengo un hermano menor, Luis." 
            russian="Я живу со своей семьей. Моего отца зовут Хуан, а маму зовут Мария. У меня есть младший брат, Луис." 
          />

          <SentencePair 
            spanish="Me gusta mucho leer и escuchar música. Los fines de semana, camino por el parque con mis amigos." 
            russian="Мне очень нравится читать и слушать музыку. По выходным я гуляю по парку с друзьями." 
          />
        </div>

        {/* EXERCISES */}
        <div className="mt-12">
            <h3 className="text-xl font-bold unbounded mb-6">🎯 Проверка понимания (CW)</h3>
            <ExerciseItem id="cw1" q="¿Как зовут главного героя?" ans="Carlos" mode="cw" />
            <ExerciseItem id="cw2" q="¿Откуда он родом? (город)" ans="Madrid" mode="cw" />

            <h3 className="text-xl font-bold unbounded mb-6 mt-12">📝 Домашнее задание (HW)</h3>
            <ExerciseItem id="hw1" q="Сколько ему лет? (числом)" ans="25" mode="hw" />
            <ExerciseItem id="hw2" q="Что он изучает в университете?" ans="historia" mode="hw" />
            <ExerciseItem id="hw3" q="Как зовут его младшего брата?" ans="Luis" mode="hw" />
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-8 shadow-sm sticky bottom-4 z-30">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Прогресс урока</span>
            <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full">{correctCount} / {total}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div className="h-full bg-[#f4a261] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
