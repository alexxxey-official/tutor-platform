'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import { Home, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function VerbsTrainer() {
  const [answers, setAnswers] = useState({})
  const inputRefs = useRef([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (loading || !mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="font-bold text-slate-400 animate-pulse">CARGANDO...</div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e1b4b] font-sans pb-20">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800;900&display=swap');
        .unbounded { font-family: 'Unbounded', sans-serif; }
      `}} />

      {/* Header */}
      <header className="bg-rose-600 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10 uppercase">VERBOS</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-rose-800 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Тренажёр · Práctica Intensiva
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            50 <span className="text-amber-300 italic">Глаголов</span>
          </h1>
          <p className="text-rose-100 text-lg max-w-2xl mx-auto font-medium">
            Интенсивная практика спряжения правильных глаголов -AR, -ER, -IR. Прокачай автоматизм! ⚡
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <AdvancedProgressBar
          statsHW={stats}
          variant={1}
        />

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2 mb-12">
          <Link href="/dashboard" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-700">
            <Home size={16} /> Inicio
          </Link>
          <div className="px-4 py-2 bg-rose-50 rounded-xl shadow-sm border border-rose-200 text-sm font-bold flex items-center gap-2 text-rose-700">
            <Zap size={16} /> Тренажёр активен
          </div>
        </nav>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4">
            {exercises.map((ex, index) => {
              const state = answers[ex.id] || { value: '', status: 'attempting', attempts: 0 }
              const isDone = state.status === 'correct' || state.status === 'revealed'

              return (
                <div key={ex.id} className={`border-b border-slate-100 py-5 flex gap-4 items-start last:border-none transition-colors ${state.status === 'correct' ? 'bg-emerald-50/50' : state.status === 'revealed' ? 'bg-rose-50/50' : ''}`}>
                  <div className="font-mono text-sm text-slate-400 min-w-[32px] pt-1 font-bold">{index + 1}.</div>
                  <div className="flex-1">
                    <div className="text-[15px] px-4 py-3 bg-slate-50 rounded-xl mb-3 border border-slate-100">
                      {ex.problem}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        disabled={isDone}
                        value={state.value}
                        onChange={(e) => setAnswers(prev => ({...prev, [ex.id]: { ...state, value: e.target.value }}))}
                        className={`border-2 rounded-xl px-4 py-2 font-mono text-sm w-[220px] outline-none transition-all ${
                          isDone
                            ? state.status === 'correct'
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold'
                              : 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
                        }`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') checkItem(ex.id, ex.ans, state.value, index)
                        }}
                      />
                      {!isDone && (
                        <button
                          onClick={() => checkItem(ex.id, ex.ans, state.value, index)}
                          className="bg-rose-600 text-white border-none rounded-xl px-5 py-2 text-sm font-bold cursor-pointer hover:bg-rose-700 transition-colors shadow-sm"
                        >
                          Check
                        </button>
                      )}
                    </div>
                    {isDone && (
                      <div className={`mt-2 text-sm font-bold ${state.status === 'correct' ? 'text-emerald-600' : 'text-rose-600'}`}>
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
