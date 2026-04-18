'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import confetti from 'canvas-confetti'

export default function VerbsTrainer() {
  const [answers, setAnswers] = useState({})
  const inputRefs = useRef([])

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

  const total = 50
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_verbs_trainer', 0, total);
  const stats = getStats('hw')

  useEffect(() => {
    if (stats.isComplete && stats.pct >= 85) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
    }
  }, [stats.isComplete, stats.pct])

  // Restoration logic
  useEffect(() => {
    if (!loading && progress.hw) {
      const restored = {};
      Object.keys(progress.hw).forEach(key => {
        const item = progress.hw[key];
        if (item) {
          restored[key] = { 
            value: item.value || '', 
            status: item.status,
            attempts: item.attempts || 0
          };
        }
      });
      setAnswers(restored);
    }
  }, [loading, progress.hw]);

  const normalize = (s) => s.toLowerCase().replace(/\s+/g, '').trim()

  const checkItem = (id, correctAns, value, index) => {
    const saved = answers[id] || { status: 'attempting', attempts: 0 }
    if (saved.status !== 'attempting') return

    const curAttempts = (saved.attempts || 0) + 1
    const isCorrect = normalize(value) === normalize(correctAns) && value !== ''
    
    let newStatus = 'attempting'
    if (isCorrect) {
        newStatus = 'correct'
    } else if (curAttempts >= 3) {
        newStatus = 'revealed'
    }

    setAnswers(prev => ({ 
        ...prev, 
        [id]: { value, status: newStatus, attempts: curAttempts } 
    }))

    if (newStatus !== 'attempting') {
        updateProgress(id, 'hw', newStatus, curAttempts, value);
    }

    if (isCorrect && index < total - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus()
      }, 10)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#e63946] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded">50 глаголов</h1>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <AdvancedProgressBar data={progress.hw} total={total} title="Тренажёр" mode="hw" />

        <div className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm mt-8">
          <div className="px-6 py-4">
            {exercises.map((ex, index) => {
              const state = answers[ex.id] || { value: '', status: 'attempting', attempts: 0 }
              const isDone = state.status === 'correct' || state.status === 'revealed'
              
              return (
                <div key={ex.id} className={`border-b border-dashed border-[#e5e0d5] py-5 flex gap-4 items-start last:border-none transition-colors ${state.status === 'correct' ? 'bg-emerald-50/30' : state.status === 'revealed' ? 'bg-rose-50/30' : ''}`}>
                  <div className="font-mono text-[13px] text-gray-500 min-w-[28px] pt-1">{index + 1}.</div>
                  <div className="flex-1">
                    <div className="text-[15px] px-3.5 py-2.5 bg-gray-50 rounded-lg mb-2.5">
                      {ex.problem}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        disabled={isDone}
                        value={state.value}
                        onChange={(e) => setAnswers(prev => ({...prev, [ex.id]: { ...state, value: e.target.value }}))}
                        className={`border-[1.5px] rounded-lg px-3 py-1.5 font-mono text-[14px] w-[200px] outline-none transition-colors ${
                          isDone
                            ? state.status === 'correct'
                              ? 'border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f]'
                              : 'border-[#e63946] bg-[#fff5f5] text-[#e63946]'
                            : 'border-[#e5e0d5] focus:border-[#e63946]'
                        }`}
                        onKeyDown={(e) => { 
                          if (e.key === 'Enter') checkItem(ex.id, ex.ans, state.value, index) 
                        }}
                      />
                      {!isDone && (
                        <button
                          onClick={() => checkItem(ex.id, ex.ans, state.value, index)}
                          className="bg-[#1a1a2e] text-white border-none rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-[#2d2d4e] transition-colors"
                        >
                          Check
                        </button>
                      )}
                    </div>
                    {isDone && (
                      <div className={`mt-1.5 text-[13px] font-medium ${state.status === 'correct' ? 'text-[#2a9d8f]' : 'text-[#e63946]'}`}>
                        {state.status === 'correct' ? '✓ ¡Perfecto!' : `✗ Правильный ответ: ${ex.ans}`}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
