'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'

export default function VerbsTrainer() {
  const [answers, setAnswers] = useState({})
  const inputRefs = useRef([])

  const total = 50
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length
  const pct = (correctCount / total) * 100

  const normalize = (s) => s.toLowerCase().replace(/\s+/g, '').trim()

  const checkAnswer = (id, correctAns, value, index) => {
    const isCorrect = normalize(value) === normalize(correctAns) && value !== ''
    setAnswers((prev) => ({
      ...prev,
      [id]: { value, isCorrect, checked: true },
    }))

    if (isCorrect && index < total - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus()
      }, 10)
    }
  }

  const exercises = [
    { id: 'ex1', problem: 'Él/Ella/Ud. ________. (estudiar - учиться)', ans: 'estudia' },
    { id: 'ex2', problem: '________. (мы - cantar, петь)', ans: 'cantamos' },
    { id: 'ex3', problem: 'Yo ________. (beber - пить)', ans: 'bebo' },
    { id: 'ex4', problem: 'Él/Ella/Ud. ________. (vivir - жить)', ans: 'vive' },
    { id: 'ex5', problem: 'Él/Ella/Ud. ________. (escribir - писать)', ans: 'escribe' },
    { id: 'ex6', problem: 'Nosotros ________. (correr - бегать)', ans: 'corremos' },
    { id: 'ex7', problem: 'Yo ________. (recibir - получать)', ans: 'recibo' },
    { id: 'ex8', problem: 'Ellos/Uds. ________. (vender - продавать)', ans: 'venden' },
    { id: 'ex9', problem: 'Ellos/Uds. ________. (caminar - гулять)', ans: 'caminan' },
    { id: 'ex10', problem: 'Ellos/Uds. ________. (hablar - говорить)', ans: 'hablan' },
    { id: 'ex11', problem: '________. (я - vender, продавать)', ans: 'vendo' },
    { id: 'ex12', problem: 'Yo ________. (comer - есть)', ans: 'como' },
    { id: 'ex13', problem: 'Ellos/Uds. ________. (estudiar - учиться)', ans: 'estudian' },
    { id: 'ex14', problem: 'Yo ________. (comer - есть)', ans: 'como' },
    { id: 'ex15', problem: 'Ellos/Uds. ________. (escuchar - слушать)', ans: 'escuchan' },
    { id: 'ex16', problem: 'Tú ________. (creer - верить/думать)', ans: 'crees' },
    { id: 'ex17', problem: 'Tú ________. (leer - читать)', ans: 'lees' },
    { id: 'ex18', problem: 'Tú ________. (escribir - писать)', ans: 'escribes' },
    { id: 'ex19', problem: 'Tú ________. (vender - продавать)', ans: 'vendes' },
    { id: 'ex20', problem: 'Ellos/Uds. ________. (comprender - понимать)', ans: 'comprenden' },
    { id: 'ex21', problem: 'Él/Ella/Ud. ________. (beber - пить)', ans: 'bebe' },
    { id: 'ex22', problem: 'Tú ________. (escribir - писать)', ans: 'escribes' },
    { id: 'ex23', problem: 'Él/Ella/Ud. ________. (comprar - покупать)', ans: 'compra' },
    { id: 'ex24', problem: 'Yo ________. (descansar - отдыхать)', ans: 'descanso' },
    { id: 'ex25', problem: 'Él/Ella/Ud. ________. (bailar - танцевать)', ans: 'baila' },
    { id: 'ex26', problem: 'Yo ________. (cantar - петь)', ans: 'canto' },
    { id: 'ex27', problem: 'Yo ________. (recibir - получать)', ans: 'recibo' },
    { id: 'ex28', problem: 'Yo ________. (hablar - говорить)', ans: 'hablo' },
    { id: 'ex29', problem: 'Nosotros ________. (hablar - говорить)', ans: 'hablamos' },
    { id: 'ex30', problem: 'Él/Ella/Ud. ________. (trabajar - работать)', ans: 'trabaja' },
    { id: 'ex31', problem: 'Él/Ella/Ud. ________. (hablar - говорить)', ans: 'habla' },
    { id: 'ex32', problem: 'Tú ________. (descansar - отдыхать)', ans: 'descansas' },
    { id: 'ex33', problem: 'Ellos/Uds. ________. (bailar - танцевать)', ans: 'bailan' },
    { id: 'ex34', problem: 'Yo ________. (escribir - писать)', ans: 'escribo' },
    { id: 'ex35', problem: 'Ellos/Uds. ________. (caminar - гулять)', ans: 'caminan' },
    { id: 'ex36', problem: '________. (ты - descansar, отдыхать)', ans: 'descansas' },
    { id: 'ex37', problem: 'Él/Ella/Ud. ________. (cantar - петь)', ans: 'canta' },
    { id: 'ex38', problem: 'Él/Ella/Ud. ________. (beber - пить)', ans: 'bebe' },
    { id: 'ex39', problem: '________. (мы - cantar, петь)', ans: 'cantamos' },
    { id: 'ex40', problem: 'Nosotros ________. (descansar - отдыхать)', ans: 'descansamos' },
    { id: 'ex41', problem: 'Él/Ella/Ud. ________. (descansar - отдыхать)', ans: 'descansa' },
    { id: 'ex42', problem: 'Nosotros ________. (abrir - открывать)', ans: 'abrimos' },
    { id: 'ex43', problem: 'Yo ________. (trabajar - работать)', ans: 'trabajo' },
    { id: 'ex44', problem: 'Tú ________. (beber - пить)', ans: 'bebes' },
    { id: 'ex45', problem: 'Él/Ella/Ud. ________. (recibir - получать)', ans: 'recibe' },
    { id: 'ex46', problem: 'Nosotros ________. (cantar - петь)', ans: 'cantamos' },
    { id: 'ex47', problem: '________. (ты - preguntar, спрашивать)', ans: 'preguntas' },
    { id: 'ex48', problem: 'Él/Ella/Ud. ________. (bailar - танцевать)', ans: 'baila' },
    { id: 'ex49', problem: 'Nosotros ________. (bailar - танцевать)', ans: 'bailamos' },
    { id: 'ex50', problem: 'Tú ________. (comprender - понимать)', ans: 'comprendes' },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#e63946] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#ffb3b3] mb-3">
          🇪🇸 Хардкор Тренажёр
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          50 глаголов<br />
          <em className="text-white not-italic font-normal font-serif">на выживание</em>
        </h1>
        <p className="text-white/80 text-[15px] max-w-[500px] relative z-10">
          Чтобы больше никогда не путаться в окончаниях -AR, -ER, -IR. Вбивай глаголы строчными буквами, не думай — делай на автоматизме!
        </p>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
            ← Дашборд
          </Link>
          <Link href="/lessons/spanish/verbs" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">
            ← Урок 5 (Теория)
          </Link>
        </nav>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-8 sticky top-5 z-20 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Твой прогресс в Тренажёре</span>
            <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full">{correctCount} / {total}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
            <div className="h-full bg-[#e63946] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm mt-8">
          <div className="px-6 py-4">
            {exercises.map((ex, index) => {
              const state = answers[ex.id] || { value: '', checked: false }
              return (
                <div key={ex.id} className="border-b border-dashed border-[#e5e0d5] py-5 flex gap-4 items-start last:border-none">
                  <div className="font-mono text-[13px] text-gray-500 min-w-[28px] pt-1">{index + 1}.</div>
                  <div className="flex-1">
                    <div className="text-[15px] px-3.5 py-2.5 bg-gray-50 rounded-lg mb-2.5">
                      {ex.problem}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        value={state.value}
                        onChange={(e) => setAnswers(prev => ({...prev, [ex.id]: { value: e.target.value, checked: false }}))}
                        className={`border-[1.5px] rounded-lg px-3 py-1.5 font-mono text-[14px] w-[200px] outline-none transition-colors ${
                          state.checked
                            ? state.isCorrect
                              ? 'border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f]'
                              : 'border-[#e63946] bg-[#fff5f5] text-[#e63946]'
                            : 'border-[#e5e0d5] focus:border-[#e63946]'
                        }`}
                        onKeyDown={(e) => { 
                          if (e.key === 'Enter') checkAnswer(ex.id, ex.ans, state.value, index) 
                        }}
                      />
                      <button
                        onClick={() => checkAnswer(ex.id, ex.ans, state.value, index)}
                        className="bg-[#1a1a2e] text-white border-none rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-[#2d2d4e] transition-colors"
                      >
                        Проверить
                      </button>
                    </div>
                    {state.checked && (
                      <div className={`mt-1.5 text-[13px] font-medium ${state.isCorrect ? 'text-[#2a9d8f]' : 'text-[#e63946]'}`}>
                        {state.isCorrect ? '✓ ¡Perfecto!' : `✗ Ошибка. Правильный ответ: ${ex.ans}`}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {pct === 100 && (
          <div className="mt-8 p-10 bg-[#f0faf8] text-[#2a9d8f] font-bold text-center rounded-2xl border-2 border-[#2a9d8f] shadow-xl">
            <div className="text-4xl mb-4">🏆</div>
            <div className="text-2xl mb-2">¡HÉROE DE VERBOS!</div>
            <div>Ты прошел хардкор-тренажёр без единой ошибки. Теперь ты машина по спряжению глаголов!</div>
          </div>
        )}

      </div>
    </div>
  )
}
