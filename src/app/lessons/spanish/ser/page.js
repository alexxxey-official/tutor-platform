'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function SerLesson() {
  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  const total = 10
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length
  const pct = (correctCount / total) * 100

  const normalize = (s) => s.toLowerCase().replace(/\s+/g, '').trim()

  const checkAnswer = (id, correctAns, value) => {
    const isCorrect = normalize(value) === normalize(correctAns) && value !== ''
    setAnswers((prev) => ({
      ...prev,
      [id]: { value, isCorrect, checked: true },
    }))
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
              {state.isCorrect ? '✓ ¡Muy bien! (Очень хорошо!)' : '✗ Неверно. Попробуй ещё раз!'}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#e63946] mb-3">
          🇪🇸 Урок 2 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Местоимения<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">и глагол SER</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Фундамент испанского языка. Кто мы такие, откуда и кем работаем.
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap relative z-10">
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Местоимения</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Спряжение SER</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Базовая лексика</span>
        </div>
        <div className="absolute right-[-20px] top-[10px] text-[150px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          SER
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
            ← Дашборд
          </Link>
          <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">📖 Теория</a>
          <a href="#exercises-pronouns" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Упражнения 1</a>
          <a href="#exercises-ser" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946]">🎯 Упражнения 2</a>
        </nav>

        {/* THEORY */}
        <div id="theory">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
            Теория
            <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">1. Личные местоимения</h2>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">Кто есть кто (Pronombres personales)</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              В испанском языке местоимения имеют <strong>род</strong> даже во множественном числе!
            </p>

            <div className="overflow-x-auto my-5">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Местоимение</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Перевод</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Особенности</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Yo</td>
                    <td className="border border-[#e5e0d5] p-3">Я</td>
                    <td className="border border-[#e5e0d5] p-3"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Tú</td>
                    <td className="border border-[#e5e0d5] p-3">Ты</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm">Всегда с ударением (tú). Без ударения tu = твой.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Él / Ella / Usted</td>
                    <td className="border border-[#e5e0d5] p-3">Он / Она / Вы (ед.)</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm">Usted — вежливое обращение к одному человеку.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Nosotros / Nosotras</td>
                    <td className="border border-[#e5e0d5] p-3">Мы (м.) / Мы (ж.)</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm">Мужской род — смешанные группы или только мужчины.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Ellos / Ellas / Ustedes</td>
                    <td className="border border-[#e5e0d5] p-3">Они (м.) / Они (ж.) / Вы (мн.)</td>
                    <td className="border border-[#e5e0d5] p-3 text-sm">Ustedes — вежливое "Вы" к группе людей.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">2. Глагол SER (Быть)</h3>
            <p className="text-gray-700 text-[15px] mb-4">
              В испанском <strong>обязательно</strong> нужен глагол-связка: "Я ЕСТЬ студент", "Он ЕСТЬ умный".
            </p>

            <div className="overflow-x-auto mb-5">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Местоимение</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Глагол SER</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пример</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Yo</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#2a9d8f]">soy</td>
                    <td className="border border-[#e5e0d5] p-3">Soy de Rusia. (Я из России)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Tú</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#2a9d8f]">eres</td>
                    <td className="border border-[#e5e0d5] p-3">¿Eres студент? (Ты студент?)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Él / Ella / Usted</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#2a9d8f]">es</td>
                    <td className="border border-[#e5e0d5] p-3">Ella es profesora. (Она преподаватель)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Nosotros / Nosotras</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#2a9d8f]">somos</td>
                    <td className="border border-[#e5e0d5] p-3">Somos amigos. (Мы друзья)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Ellos / Ellas / Ustedes</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono font-bold text-[#2a9d8f]">son</td>
                    <td className="border border-[#e5e0d5] p-3">Ellos son listos. (Они умные)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 text-[14px] text-[#7c4a00]">
              <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">⚡ Главный лайфхак A1:</strong>
              Испанцы в 90% случаев <strong>не говорят местоимения</strong>. Форма глагола уже говорит о том, КТО совершает действие!
            </div>
          </div>
        </div>

        {/* EXERCISES */}
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
          Практика: Тренировка до автоматизма
          <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
        </div>
        <p className="text-[14px] text-gray-500 mb-5">
          Введи правильное слово в поле (строчными буквами).
        </p>

        <div id="exercises-pronouns" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 1: Личные местоимения</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">yo, tú, ella...</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex1" num="1." problem="Как сказать 'Мы', если речь идет о группе только из девочек?" correctAns="nosotras" />
            <ExerciseItem id="ex2" num="2." problem="Как сказать 'Вы' (вежливо одному человеку)?" correctAns="usted" />
            <ExerciseItem id="ex3" num="3." problem="Как сказать 'Они', если в группе 5 девушек и 1 парень?" correctAns="ellos" hintText="Даже один мужчина превращает всю группу в мужской род (ellos)!" />
          </div>
        </div>

        <div id="exercises-ser" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 2: Спряжение глагола SER</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">soy, eres, somos...</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex4" num="4." problem="Yo _______ de Rusia. (Я из России)" correctAns="soy" />
            <ExerciseItem id="ex5" num="5." problem="¿De dónde _______ tú? (Откуда ты?)" correctAns="eres" />
            <ExerciseItem id="ex6" num="6." problem="María y Juan _______ amigos. (Они друзья)" correctAns="son" hintText="Мария и Хуан — это ОНИ (Ellos). Посмотри в таблицу!" />
            <ExerciseItem id="ex7" num="7." problem="Mi coche _______ muy rápido. (Моя машина очень быстрая)" correctAns="es" />
            <ExerciseItem id="ex8" num="8." problem="Nosotros _______ estudiantes de español. (Мы студенты)" correctAns="somos" />
          </div>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-8 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Твой прогресс в Уроке 2</span>
            <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full">{correctCount} / {total} правильно</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div className="h-full bg-[#e63946] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
          {pct === 100 && (
            <div className="mt-4 p-3 bg-[#f0faf8] text-[#2a9d8f] font-bold text-center rounded-lg border border-[#2a9d8f]/30">
              🎉 ¡Magnífico! Ты заложил отличный фундамент!
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
