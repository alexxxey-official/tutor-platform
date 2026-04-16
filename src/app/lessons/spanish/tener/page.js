'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function TenerLesson() {
  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  const total = 15
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length
  const pct = (correctCount / total) * 100

  const normalize = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim()

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

  const ExerciseItem = ({ id, num, problem, correctAns, hintText, placeholder }) => {
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
              placeholder={placeholder}
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
              {state.isCorrect ? '✓ ¡Perfecto!' : '✗ Неверно. Вспомни правило!'}
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
          🇪🇸 Урок 3 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Глагол<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">TENER</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Быть голодным, иметь собаку, указывать возраст и быть должным что-то сделать. Всё это — глагол "ИМЕТЬ".
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap relative z-10">
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Спряжение TENER</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Выражения с TENER</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Tener que + infinitivo</span>
        </div>
        <div className="absolute right-[-20px] top-[10px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          TENER
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
            ← Дашборд
          </Link>
          <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">📖 Теория</a>
          <a href="#exercises-conj" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 1: Спряжение</a>
          <a href="#exercises-states" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 2: Состояния</a>
          <a href="#exercises-que" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946]">🎯 Блок 3: Должен!</a>
        </nav>

        {/* THEORY */}
        <div id="theory">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
            Теория
            <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Глагол, который делает всё</h2>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">1. Как он спрягается (Это исключение!)</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              Глагол <strong>TENER</strong> (иметь) относится к неправильным глаголам (отклоняющимся). В форме "Yo" у него появляется буква <i>g</i> (tengo), а буква <i>e</i> в корне распадается на <i>ie</i> (tienes).
            </p>

            <div className="overflow-x-auto my-5">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Местоимение</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">TENER (иметь)</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пример</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946] w-1/4">Yo (Я)</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono">tengo</td>
                    <td className="border border-[#e5e0d5] p-3">(Yo) tengo un perro. (У меня есть собака)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Tú (Ты)</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono">tienes</td>
                    <td className="border border-[#e5e0d5] p-3">¿Tienes un coche? (У тебя есть машина?)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Él/Ella/Ud.</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono">tiene</td>
                    <td className="border border-[#e5e0d5] p-3">Ella tiene dinero. (У нее есть деньги)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Nosotros</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono">tenemos</td>
                    <td className="border border-[#e5e0d5] p-3">Tenemos tiempo. (У нас есть время)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Ellos/Uds.</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono">tienen</td>
                    <td className="border border-[#e5e0d5] p-3">Ellos tienen una casa. (У них есть дом)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">2. Возраст и Чувства (Ловушки перевода!)</h3>
            <p className="text-gray-700 text-[15px] mb-4">
              В русском языке мы говорим "Мне 20 лет", в английском "I am 20". Но в испанском мы <strong>ИМЕЕМ годы</strong>! И мы <strong>ИМЕЕМ</strong> голод, холод и страх.
            </p>
            <ul className="ml-5 space-y-2 text-[15px] text-gray-700 list-disc">
              <li><strong>Tener ... años</strong> (Иметь ... лет): <i>Tengo veinte años</i> (Мне 20 лет).</li>
              <li><strong>Tener hambre</strong> (Иметь голод): <i>¿Tienes hambre?</i> (Ты голоден?)</li>
              <li><strong>Tener sed</strong> (Иметь жажду): <i>Tiene sed</i> (Он хочет пить).</li>
              <li><strong>Tener frío</strong> (Иметь холод): <i>Tenemos frío</i> (Нам холодно).</li>
              <li><strong>Tener calor</strong> (Иметь жару): <i>Ellos имеют жару</i> (Им жарко).</li>
              <li><strong>Tener miedo</strong> (Иметь страх): <i>Tengo miedo</i> (Мне страшно / Я боюсь).</li>
            </ul>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">3. Tener que + инфинитив (Я ДОЛЖЕН)</h3>
            <p className="text-gray-700 text-[15px] mb-4">
              Если после глагола tener поставить словечко <strong>que</strong>, смысл резко меняется. Теперь это переводится как <strong>«быть должным / нужно что-то сделать»</strong>.
            </p>
            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 text-[14px] text-[#7c4a00]">
              <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">⚠️ Сравни:</strong>
              <p className="mb-2"><i>Tengo un libro.</i> — У меня есть книга. (Просто владение).</p>
              <p><i>Tengo <strong>que</strong> leer un libro.</i> — Я <strong>должен</strong> прочитать книгу. (Обязательство).</p>
            </div>
          </div>
        </div>

        {/* EXERCISES */}
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
          Большая практика (15 заданий)
          <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
        </div>
        <p className="text-[14px] text-gray-500 mb-5">
          Давай закрепим все 3 функции глагола Tener! Пиши глагол маленькими буквами.
        </p>

        <div id="exercises-conj" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 1: Спряжение TENER (иметь)</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">tengo, tienes, tiene...</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex1" num="1." problem="Yo ________ un проблема. (У меня есть проблема)" correctAns="tengo" />
            <ExerciseItem id="ex2" num="2." problem="Tú ________ mucho dinero. (У тебя есть много денег)" correctAns="tienes" hintText="Для 'Tú' глагол меняет гласную: tienes." />
            <ExerciseItem id="ex3" num="3." problem="María ________ un coche nuevo. (У Марии есть новая машина)" correctAns="tiene" />
            <ExerciseItem id="ex4" num="4." problem="Nosotros ________ время. (У нас есть время)" correctAns="tenemos" />
            <ExerciseItem id="ex5" num="5." problem="Los estudiantes ________ libros. (У студентов есть книги)" correctAns="tienen" />
          </div>
        </div>

        <div id="exercises-states" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 2: Возраст и Состояния</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">hambre, frío, años</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex6" num="6." problem="Ella ________ 25 años. (Ей 25 лет)" correctAns="tiene" />
            <ExerciseItem id="ex7" num="7." problem="Nosotros ________ hambre. (Мы голодны / Мы хотим есть)" correctAns="tenemos" />
            <ExerciseItem id="ex8" num="8." problem="Yo ________ mucho calor. (Мне очень жарко)" correctAns="tengo" />
            <ExerciseItem id="ex9" num="9." problem="¿(Tú) ________ sed? (Ты хочешь пить?)" correctAns="tienes" />
            <ExerciseItem id="ex10" num="10." problem="El niño ________ miedo del perro. (Мальчик боится собаки)" correctAns="tiene" hintText="Мальчик (El niño) = Он (él). Значит форма глагола — tiene." />
          </div>
        </div>

        <div id="exercises-que" className="bg-[#1a1a2e] text-white border border-[#1a1a2e] rounded-2xl overflow-hidden mb-4 shadow-lg mt-8">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-white/10 bg-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></div>
            <h3 className="text-[16px] font-semibold m-0 text-white">Блок 3: Быть должным (Tener que)</h3>
            <span className="ml-auto text-[12px] text-gray-400 bg-white/10 px-2.5 py-1 rounded-full hidden sm:inline-block">Не забудь написать "que"!</span>
          </div>
          <div className="px-6 py-4 text-[#1a1a2e] bg-white">
            <ExerciseItem id="ex11" num="11." problem="Yo ____________ trabajar hoy. (Я должен работать сегодня)" correctAns="tengo que" placeholder="два слова" />
            <ExerciseItem id="ex12" num="12." problem="Nosotros ____________ estudiar español. (Мы должны учить испанский)" correctAns="tenemos que" placeholder="два слова" />
            <ExerciseItem id="ex13" num="13." problem="Tú ____________ comer más. (Ты должен больше есть)" correctAns="tienes que" placeholder="два слова" />
            <ExerciseItem id="ex14" num="14." problem="Éл ____________ dormir. (Он должен спать)" correctAns="tiene que" placeholder="два слова" />
            <ExerciseItem id="ex15" num="15." problem="Ellos ____________ beber agua. (Они должны пить воду)" correctAns="tienen que" placeholder="два слова" />
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
          {pct === 100 && (
            <div className="mt-4 p-3 bg-[#f0faf8] text-[#2a9d8f] font-bold text-center rounded-lg border border-[#2a9d8f]/30">
              🎉 ¡Perfecto! Ты освоил все грани глагола TENER!
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
