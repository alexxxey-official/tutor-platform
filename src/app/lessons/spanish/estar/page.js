'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function EstarLesson() {
  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  const total = 8
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
              {state.isCorrect ? '✓ ¡Muy bien!' : '✗ Ошибка. Прочитай подсказку!'}
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
          🇪🇸 Урок 5 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded">
          ESTAR<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">и Предлоги места</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px]">
          Как описать свой город: где находится музей, банк или аптека. Это именно то, что мучает тебя в Модуле 3!
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap">
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Где это? (ESTAR)</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Предлоги места</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Слияние "del"</span>
        </div>
        <div className="absolute right-[20px] top-[-20px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none">
          ESTAR
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center">
          <Link href="/lessons/spanish" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">
            ← Назад к урокам
          </Link>
          <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">📖 Теория</a>
          <a href="#exercises-estar" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 1: ESTAR</a>
          <a href="#exercises-prep" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 2: Предлоги</a>
        </nav>

        {/* THEORY */}
        <div id="theory">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
            Теория
            <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Где мы находимся?</h2>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">1. Второй глагол "БЫТЬ" (ESTAR)</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              Если SER — это постоянные факты (Я человек, я высокий, я из России), то <strong>ESTAR</strong> — это <strong>временное состояние</strong> (я устал) или <strong>местоположение</strong> (я нахожусь в Москве).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-5 text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Местоимение</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Глагол ESTAR</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пример</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946] w-1/4">Yo</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">estoy</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">Estoy cansado (Я уставший сейчас)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946]">Tú</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">estás</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">¿Dónde estás? (Где ты находишься?)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946]">Él / Ella / Usted</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">está</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">El museo está aquí (Музей находится здесь)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946]">Nosotros/as</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">estamos</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">Estamos en el hotel (Мы в отеле)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946]">Vosotros/as</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">estáis</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">Estáis felices (Вы счастливы)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-left font-semibold text-[#e63946]">Ellos/as / Ustedes</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">están</td>
                    <td className="border border-[#e5e0d5] p-3 text-left">Ellos están lejos (Они далеко)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 my-4 text-[14px] text-[#7c4a00]">
              <strong className="text-[#5c3300] block mb-1 text-[12px] tracking-[1px] uppercase">💡 Запомни: PLACE!</strong>
              Мы используем ESTAR для: <strong>P</strong>osition (Позиция), <strong>L</strong>ocation (Местоположение - город, улица), <strong>A</strong>ction (Действие в процессе), <strong>C</strong>ondition (Временное состояние - больной, уставший), <strong>E</strong>motion (Эмоция).
            </div>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">2. Предлоги места (Ловушка Duolingo)</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              В модуле про город тебе нужно говорить, что где находится. Используй предлоги:
            </p>
            <ul className="ml-5 leading-[1.8] list-disc">
              <li><strong>en</strong> — в, на (<i>está en la ciudad</i> - находится в городе)</li>
              <li><strong>cerca de</strong> — близко от, рядом с (<i>cerca de la plaza</i> - рядом с площадью)</li>
              <li><strong>lejos de</strong> — далеко от (<i>lejos de casa</i> - далеко от дома)</li>
              <li><strong>al lado de</strong> — совсем рядом, сбоку от</li>
            </ul>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">3. Опасное слияние: DEL (de + el)</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              В испанском языке предлог <strong>de</strong> (от/из) и артикль <strong>el</strong> (мальчик) никогда не стоят рядом. Они слипаются в одно слово — <strong>del</strong>.
            </p>
            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 my-4 text-[14px] text-[#7c4a00]">
              <strong className="text-[#5c3300] block mb-1 text-[12px] tracking-[1px] uppercase">⚠️ Сравни:</strong>
              <i>cerca de + la casa = <strong>cerca de la</strong> casa</i> (Рядом с домом, la - девочка, ничего не слипается).<br/>
              <i>cerca de + el hotel = <strong>cerca del</strong> hotel</i> (Рядом с отелем, el - мальчик, слиплось!).
            </div>
            <p className="text-gray-700 text-[15px] mb-2.5">
              То же самое происходит с предлогом <strong>a</strong> (в направлении) + <strong>el</strong> = <strong>al</strong> (в, на).
            </p>
          </div>
        </div>

        {/* EXERCISES */}
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
          Практика
          <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
        </div>
        <p className="text-[14px] text-gray-500 mb-5">
          Разберёмся с местоположением и слиянием предлогов!
        </p>

        <div id="exercises-estar" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 1: ESTAR или SER?</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Вставь правильный глагол</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem 
              id="ex1" num="1." 
              problem="El museo ________ aquí. (Музей находится здесь)" 
              correctAns="está" 
              hintText="Речь про местоположение (Location), значит нужен ESTAR для 'он' (музей)."
            />
            <ExerciseItem 
              id="ex2" num="2." 
              problem="Nosotros ________ en Madrid. (Мы находимся в Мадриде)" 
              correctAns="estamos" 
            />
            <ExerciseItem 
              id="ex3" num="3." 
              problem="Yo ________ de Moscú. (Я из Москвы - происхождение!)" 
              correctAns="soy" 
              hintText="Осторожно! Это не местоположение сейчас, это происхождение (Origin из правила DOCTOR). Нужен глагол SER."
            />
            <ExerciseItem 
              id="ex4" num="4." 
              problem="La chica ________ cansada. (Девушка уставшая)" 
              correctAns="está" 
            />
          </div>
        </div>

        <div id="exercises-prep" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 2: Предлоги и слияние "DEL"</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Вставь de la или del</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem 
              id="ex5" num="5." 
              problem="El hotel está cerca ________ museo. (Рядом с музеем - el museo)" 
              correctAns="del" 
              hintText="Музей — мужской род (el). Значит de + el слипаются."
            />
            <ExerciseItem 
              id="ex6" num="6." 
              problem="El parque está lejos ________ farmacia. (Далеко от аптеки - la farmacia)" 
              correctAns="de la" 
            />
            <ExerciseItem 
              id="ex7" num="7." 
              problem="El banco está al lado ________ hospital. (Сбоку от больницы - el hospital)" 
              correctAns="del" 
            />
            <ExerciseItem 
              id="ex8" num="8." 
              problem="Nosotros vamos ________ aeropuerto. (Мы идем в аэропорт - el aeropuerto)" 
              correctAns="al" 
              hintText='Здесь предлог направления "a". Предлог a + el aeropuerto = ...?'
            />
          </div>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Твой прогресс в Уроке 3</span>
            <span className="font-medium text-[#1a1a2e]">{correctCount} / {total} правильно</span>
          </div>
          <div className="bg-gray-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div className="h-full bg-[#e63946] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
        </div>

      </div>
    </div>
  )
}
