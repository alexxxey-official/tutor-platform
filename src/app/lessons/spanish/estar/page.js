'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'

export default function EstarLesson() {
  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  const total = 8
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_estar', total);
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

  const normalize = (s) => s.toLowerCase().replace(/\s+/g, '').trim()

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
              {state.isCorrect ? '✓ ¡Muy bien!' : '✗ Неверно. Попробуй ещё раз!'}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#f4a261] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-white/80 mb-3">
          🇪🇸 Урок 6 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Глагол ESTAR<br />
          <em className="text-white not-italic font-normal font-serif">и местоположение</em>
        </h1>
        <p className="text-white/90 text-[15px] max-w-[500px] relative z-10">
          Второй «быть» в испанском. Узнаем, где всё находится и как мы себя чувствуем.
        </p>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
            ← Дашборд
          </Link>
          <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#f4a261] hover:text-white">📖 Теория</a>
          <a href="#exercises" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#f4a261]">🎯 Упражнения</a>
        </nav>

        {/* THEORY */}
        <div id="theory">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#f4a261] my-12 mb-5">
            Теория
            <div className="w-[40px] h-[2px] bg-[#f4a261]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Глагол ESTAR (Быть / Находиться)</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-8 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            <p className="text-gray-700 text-[15px] mb-4">
              В отличие от SER (постоянные признаки), <strong>ESTAR</strong> используется для временных состояний и местоположения.
            </p>

            <div className="overflow-x-auto mb-5">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Местоимение</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Глагол ESTAR</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пример</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold">Yo</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#f4a261]">estoy</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm italic">Estoy en casa. (Я дома)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold">Tú</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#f4a261]">estás</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm italic">¿Estás bien? (Ты в порядке?)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold">Él / Ella / Ud.</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#f4a261]">está</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm italic">El libro está здесь. (Книга здесь)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold">Nosotros</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#f4a261]">estamos</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm italic">Estamos felices. (Мы счастливы)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold">Ellos / Uds.</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#f4a261]">están</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm italic">Ellos están de vacaciones. (Они в отпуске)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* EXERCISES */}
        <div id="exercises">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#f4a261] my-12 mb-5">
            Практика
            <div className="w-[40px] h-[2px] bg-[#f4a261]"></div>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
             <div className="px-6 py-4">
                <ExerciseItem id="ex1" num="1." problem="Yo _______ en el parque. (Я в парке)" correctAns="estoy" />
                <ExerciseItem id="ex2" num="2." problem="¿Dónde _______ tú? (Где ты?)" correctAns="estás" />
                <ExerciseItem id="ex3" num="3." problem="La comida _______ rica. (Еда вкусная - сейчас)" correctAns="está" />
                <ExerciseItem id="ex4" num="4." problem="Nosotros _______ cansados. (Мы устали)" correctAns="estamos" />
                <ExerciseItem id="ex5" num="5." problem="Mis amigos _______ en Madrid. (Мои друзья в Мадриде)" correctAns="están" />
                <ExerciseItem id="ex6" num="6." problem="¿_______ usted bien? (Вы в порядке? - вежливо)" correctAns="está" />
                <ExerciseItem id="ex7" num="7." problem="Las llaves _______ на столе. (Ключи на столе)" correctAns="están" />
                <ExerciseItem id="ex8" num="8." problem="Tú _______ очень занят. (Ты очень занят)" correctAns="estás" />
             </div>
          </div>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-8 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Твой прогресс в Уроке 6</span>
            <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full">{correctCount} / {total} правильно</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div className="h-full bg-[#f4a261] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
