'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ArticlesLesson() {
  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  const total = 10
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length
  const pct = (correctCount / total) * 100

  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').trim()

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
              {state.isCorrect ? '✓ ¡Muy bien! (Отлично!)' : '✗ Ошибка. Вспомни правило!'}
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
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded">
          Существительные<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">и Артикли</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px]">
          Почему стол — это мальчик, а кровать — девочка? И как с этим жить.
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap">
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Мужской и женский род</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Множественное число</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Исключения</span>
        </div>
        <div className="absolute right-[20px] top-[-20px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none">
          EL/LA
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">
            ← Дашборд
          </Link>
          <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">📖 Теория</a>
          <a href="#exercises-gender" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 1: Род</a>
          <a href="#exercises-exceptions" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 2: Исключения</a>
        </nav>

        {/* THEORY */}
        <div id="theory">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
            Теория
            <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Всё о предметах</h2>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">1. Мальчик или Девочка? (Род)</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              В испанском нет среднего рода. Любой предмет — это либо <strong>мужской род (el)</strong>, либо <strong>женский род (la)</strong>.
            </p>
            
            <div className="overflow-x-auto my-5">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Мужской род (EL)</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Женский род (LA)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3">Обычно заканчивается на <strong>-o</strong><br/><i>el chico (мальчик), el gato (кот)</i></td>
                    <td className="border border-[#e5e0d5] p-3">Обычно заканчивается на <strong>-a</strong><br/><i>la chica (девочка), la gata (кошка)</i></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3">Заканчивается на согласную (часто)<br/><i>el hotel, el hospital</i></td>
                    <td className="border border-[#e5e0d5] p-3">Заканчивается на <strong>-ción, -sión, -dad</strong><br/><i>la canción (песня), la ciudad (город)</i></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 text-[15px] mb-2.5">
              В испанском перед каждым существительным ставится маленькое слово — <strong>артикль</strong>. Он показывает род предмета и то, говорим мы о чём-то конкретном или нет.
            </p>
            <ul className="ml-5 leading-[1.8] list-disc">
              <li><strong>el</strong> / <strong>la</strong> — определённые (этот конкретный мальчик / девочка).</li>
              <li><strong>un</strong> / <strong>una</strong> — неопределённые (какой-то один мальчик / какая-то девочка).</li>
            </ul>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">2. Множественное число</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              Чтобы сделать много предметов из одного, мы прибавляем букву <strong>-s</strong> (если слово кончается на гласную) или <strong>-es</strong> (если на согласную). Артикли тоже меняются!
            </p>
            
            <div className="overflow-x-auto my-5">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Единственное</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Множественное</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946] w-1/4">el gato (кот)</td>
                    <td className="border border-[#e5e0d5] p-3"><strong>los</strong> gatos (коты)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946]">la casa (дом)</td>
                    <td className="border border-[#e5e0d5] p-3"><strong>las</strong> casas (дома)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946]">el hotel (отель)</td>
                    <td className="border border-[#e5e0d5] p-3"><strong>los</strong> hoteles (отели)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946]">la ciudad (город)</td>
                    <td className="border border-[#e5e0d5] p-3"><strong>las</strong> ciudades (города)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">3. Исключения (Слова-шпионы)</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              Конечно, есть слова, которые выглядят как девочки, но на самом деле мальчики (и наоборот). Их нужно просто выучить!
            </p>
            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 my-4 text-[14px] text-[#7c4a00]">
              <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">⚠️ Запомни эти слова-исключения:</strong>
              <strong>el</strong> mapa (карта) — <i>оканчивается на -a, но мальчик!</i><br/>
              <strong>el</strong> día (день) — <i>мальчик!</i><br/>
              <strong>el</strong> planeta (планета) — <i>мальчик!</i><br/>
              <strong>el</strong> problema, el idioma, el sistema (слова на -ma греческого происхождения — мальчики).<br/><br/>
              <strong>la</strong> mano (рука) — <i>оканчивается на -o, но девочка!</i><br/>
              <strong>la</strong> foto (фотография) — <i>сокращение от la fotografía.</i><br/>
              <strong>la</strong> moto (мотоцикл) — <i>сокращение от la motocicleta.</i>
            </div>
          </div>
        </div>

        {/* EXERCISES */}
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
          Практика
          <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
        </div>
        <p className="text-[14px] text-gray-500 mb-5">
          Введи правильный артикль (el, la, los, las).
        </p>

        <div id="exercises-gender" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 1: Базовый род и число</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm">Введи el / la / los / las</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex1" num="1." problem="___ perro (собака, м.р.)" correctAns="el" />
            <ExerciseItem id="ex2" num="2." problem="___ mesa (стол)" correctAns="la" />
            <ExerciseItem id="ex3" num="3." problem="___ chicos (мальчики)" correctAns="los" />
            <ExerciseItem id="ex4" num="4." problem="___ ciudad (город)" correctAns="la" hintText="Слова на -dad — это женский род (девочки)." />
          </div>
        </div>

        <div id="exercises-exceptions" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 2: Слова-исключения (Сложно)</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm">Вспомни ловушки!</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex5" num="5." problem="___ problema (проблема)" correctAns="el" hintText="Оканчивается на -ma, значит это мальчик!" />
            <ExerciseItem id="ex6" num="6." problem="___ mapa (карта)" correctAns="el" />
            <ExerciseItem id="ex7" num="7." problem="___ mano (рука)" correctAns="la" />
            <ExerciseItem id="ex8" num="8." problem="___ día (день)" correctAns="el" />
            <ExerciseItem id="ex9" num="9." problem="___ canción (песня)" correctAns="la" hintText="Слова на -ción всегда женского рода!" />
            <ExerciseItem id="ex10" num="10." problem="___ fotos (фотографии)" correctAns="las" />
          </div>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Твой прогресс в Уроке 2</span>
            <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full">{correctCount} / {total} правильно</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div className="h-full bg-[#e63946] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
          {pct === 100 && (
            <div className="mt-4 p-3 bg-[#f0faf8] text-[#2a9d8f] font-bold text-center rounded-lg border border-[#2a9d8f]/30">
              🎉 ¡Magnífico! Ты идеально справился со всеми заданиями!
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
