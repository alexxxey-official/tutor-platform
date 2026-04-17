'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'

export default function ArticlesLesson() {
  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  const total = 10
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_articles', total);
  const stats = getStats('cw')
  const correctCount = stats.correct
  const pct = stats.pct

  // Restoration
  useEffect(() => {
    if (!loading && progress.cw) {
      const restored = {};
      Object.keys(progress.cw).forEach(id => {
        const item = progress.cw[id];
        if (item) {
          restored[id] = { value: item.value || '', isCorrect: item.status === 'correct', checked: true };
        }
      });
      setAnswers(prev => ({ ...prev, ...restored }));
    }
  }, [loading, progress.cw]);

  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').trim()

  const checkAnswer = (id, correctAns, value) => {
    const isCorrect = normalize(value) === normalize(correctAns) && value !== ''
    setAnswers((prev) => ({
      ...prev,
      [id]: { value, isCorrect, checked: true },
    }))
    updateProgress(id, 'cw', isCorrect ? 'correct' : 'wrong', 1, value);
  }

  const toggleHint = (id) => {
    setHints((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const ExerciseItem = ({ id, num, problem, correctAns, hintText }) => {
    const state = answers[id] || { value: '', checked: false }
    const showHint = hints[id] || false

    return (
      <div className="border-b border-dashed border-[#e5e0d5] py-4 flex gap-4 items-start last:border-none">
        <div className="font-mono text-[13px] text-gray-500 min-w-[28px] pt-1">{num}</div>
        <div className="flex-1">
          <div className="text-[15px] px-3.5 py-2.5 bg-gray-50 rounded-lg mb-2.5">
            {problem}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={state.value}
              onChange={(e) => setAnswers(prev => ({...prev, [id]: { ...prev[id], value: e.target.value, checked: false }}))}
              className={`border-[1.5px] rounded-lg px-3 py-1.5 font-mono text-[14px] w-[160px] outline-none transition-colors ${
                state.checked
                  ? state.isCorrect
                    ? 'border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f]'
                    : 'border-[#e63946] bg-[#fff5f5] text-[#e63946]'
                  : 'border-[#e5e0d5] focus:border-[#e63946]'
              }`}
              onKeyDown={(e) => { if (e.key === 'Enter') checkAnswer(id, correctAns, state.value) }}
            />
            <button
              onClick={() => checkAnswer(id, correctAns, state.value)}
              className="bg-[#1a1a2e] text-white border-none rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-[#2d2d4e] transition-colors"
            >
              Проверить
            </button>
            {hintText && (
              <button
                onClick={() => toggleHint(id)}
                className="bg-transparent text-gray-500 border border-gray-300 rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {showHint ? 'Скрыть' : 'Подсказка'}
              </button>
            )}
          </div>
          {showHint && hintText && (
            <div className="mt-2.5 px-3.5 py-2.5 bg-[#fff8f0] rounded-lg text-[13px] text-[#7c4a00] border-l-[3px] border-[#f4a261]">
              {hintText}
            </div>
          )}
          {state.checked && (
            <div className={`mt-1.5 text-[13px] font-medium ${state.isCorrect ? 'text-[#2a9d8f]' : 'text-[#e63946]'}`}>
              {state.isCorrect ? '✓ ¡Correcto!' : '✗ Неверно. Попробуй ещё раз!'}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#e63946] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-white/70 mb-3">
          🇪🇸 Урок 3 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Артикли и Род<br />
          <em className="text-white not-italic font-normal font-serif">существительных</em>
        </h1>
        <p className="text-white/80 text-[15px] max-w-[500px] relative z-10">
          Узнаем, почему стол — это "он", а рука — "она", и как не запутаться в El и La.
        </p>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
            ← Дашборд
          </Link>
          <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">📖 Теория</a>
          <a href="#exercises" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946]">🎯 Упражнения</a>
        </nav>

        <div id="theory" className="py-10">
            <h2 className="font-bold text-[28px] mb-5 unbounded">Определенные артикли</h2>
            <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 relative shadow-sm mb-5">
                <p className="mb-4">В испанском языке у каждого существительного есть род.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>El</strong> — мужской род (ед. число). Пример: <i>el libro</i></li>
                    <li><strong>La</strong> — женский род (ед. число). Пример: <i>la mesa</i></li>
                    <li><strong>Los</strong> — мужской род (мн. число). Пример: <i>los libros</i></li>
                    <li><strong>Las</strong> — женский род (мн. число). Пример: <i>las mesas</i></li>
                </ul>
            </div>
        </div>

        <div id="exercises" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
            <div className="px-6 py-4">
                <ExerciseItem id="ex1" num="1." problem="____ libro (книга, муж. род)" correctAns="el" />
                <ExerciseItem id="ex2" num="2." problem="____ mesa (стол, жен. род)" correctAns="la" />
                <ExerciseItem id="ex3" num="3." problem="____ chicos (мальчики)" correctAns="los" />
                <ExerciseItem id="ex4" num="4." problem="____ chicas (девочки)" correctAns="las" />
                <ExerciseItem id="ex5" num="5." problem="____ profesor (учитель)" correctAns="el" />
                <ExerciseItem id="ex6" num="6." problem="____ casa (дом, жен. род)" correctAns="la" />
                <ExerciseItem id="ex7" num="7." problem="____ coches (машины, муж. род)" correctAns="los" />
                <ExerciseItem id="ex8" num="8." problem="____ flor (цветок, жен. род)" correctAns="la" />
                <ExerciseItem id="ex9" num="9." problem="____ manos (руки, жен. род - ИСКЛЮЧЕНИЕ!)" correctAns="las" hintText="Mano оканчивается на -o, но это ЖЕНСКИЙ род!" />
                <ExerciseItem id="ex10" num="10." problem="____ mapa (карта, муж. род - ИСКЛЮЧЕНИЕ!)" correctAns="el" hintText="Mapa оканчивается на -a, но это МУЖСКОЙ род!" />
            </div>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-8 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Твой прогресс в Уроке 3</span>
            <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full">{correctCount} / {total} правильно</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div className="h-full bg-[#e63946] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
