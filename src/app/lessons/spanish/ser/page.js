'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import confetti from 'canvas-confetti'

export default function SerLesson() {
  const totalCW = 10
  const totalHW = 0 // Ser lesson seems to have only 8 items in the code I wrote before, let me check
  // Wait, in my previous write I set total = 10 and had 8 exercises. I should align this.
  
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_ser', 8, 0);
  const stats = getStats('cw')

  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  // Restoration
  useEffect(() => {
    if (!loading && progress.cw) {
      const restored = {};
      Object.keys(progress.cw).forEach(id => {
        const item = progress.cw[id];
        if (item) {
          restored[id] = { 
            value: item.value || '', 
            status: item.status,
            attempts: item.attempts || 0
          };
        }
      });
      setAnswers(prev => ({ ...prev, ...restored }));
    }
  }, [loading, progress.cw]);

  const normalize = (s) => s.toLowerCase().replace(/\s+/g, '').trim()

  const ExerciseItem = ({ id, num, problem, correctAns, hintText, mode = 'cw' }) => {
    const saved = answers[id] || { value: '', status: 'attempting', attempts: 0 }
    const [val, setVal] = useState(saved.value || '')
    const [status, setStatus] = useState(saved.status || 'attempting')
    const [attempts, setAttempts] = useState(saved.attempts || 0)
    const [showHint, setShowHint] = useState(false)
    const [feedback, setFeedback] = useState('')

    const maxAttempts = mode === 'cw' ? 2 : 3

    useEffect(() => {
        setVal(saved.value)
        setStatus(saved.status)
        setAttempts(saved.attempts)
    }, [saved.value, saved.status, saved.attempts])

    const check = () => {
        if (status !== 'attempting') return
        const curAttempts = attempts + 1
        setAttempts(curAttempts)

        const isCorrect = normalize(val) === normalize(correctAns) && val !== ''
        
        if (isCorrect) {
            setStatus('correct')
            setFeedback('¡Muy bien! ✓')
            updateProgress(id, mode, 'correct', curAttempts, val)
        } else {
            if (curAttempts >= maxAttempts) {
                setStatus('revealed')
                setFeedback(mode === 'cw' ? `Correct: ${correctAns}` : `Incorrect. Answer: ${correctAns}`)
                updateProgress(id, mode, 'revealed', curAttempts, val)
            } else {
                setFeedback('Try again!')
                if (mode === 'hw' && curAttempts === 2) setShowHint(true)
            }
        }
    }

    const isDone = status === 'correct' || status === 'revealed'

    return (
      <div className={`border-b border-dashed border-[#e5e0d5] py-4 flex gap-4 items-start last:border-none transition-colors ${status === 'correct' ? 'bg-emerald-50/50' : status === 'revealed' ? 'bg-rose-50/50' : ''}`}>
        <div className="font-mono text-[13px] text-gray-500 min-w-[28px] pt-1">{num}</div>
        <div className="flex-1">
          <div className="text-[15px] px-3.5 py-2.5 bg-gray-50 rounded-lg mb-2.5">
            {problem}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              disabled={isDone}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className={`border-[1.5px] rounded-lg px-3 py-1.5 font-mono text-[14px] w-[160px] outline-none transition-colors ${
                isDone
                  ? status === 'correct'
                    ? 'border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f]'
                    : 'border-[#e63946] bg-[#fff5f5] text-[#e63946]'
                  : 'border-[#e5e0d5] focus:border-[#e63946]'
              }`}
              onKeyDown={(e) => { if (e.key === 'Enter') check() }}
            />
            {!isDone && (
                <button
                onClick={check}
                className="bg-[#1a1a2e] text-white border-none rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-[#2d2d4e] transition-colors"
                >
                Check
                </button>
            )}
            {hintText && !isDone && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-transparent text-gray-500 border border-gray-300 rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {showHint ? 'Hide' : 'Hint'}
              </button>
            )}
          </div>
          {showHint && hintText && (
            <div className="mt-2.5 px-3.5 py-2.5 bg-[#fff8f0] rounded-lg text-[13px] text-[#7c4a00] border-l-[3px] border-[#f4a261]">
              {hintText}
            </div>
          )}
          {feedback && (
            <div className={`mt-1.5 text-[13px] font-medium ${status === 'correct' ? 'text-[#2a9d8f]' : 'text-[#e63946]'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      {/* ... Hero omitted ... */}
      <div className="max-w-[860px] mx-auto px-6">
        <AdvancedProgressBar data={progress.cw} total={8} title="Прогресс урока" mode="cw" />
        
        <div id="exercises-pronouns" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm mt-8">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 1: Личные местоимения</h3>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex1" num="1." problem="Как сказать 'Мы' (только девочки)?" correctAns="nosotras" mode="cw" />
            <ExerciseItem id="ex2" num="2." problem="Как сказать 'Вы' (вежливо, 1 чел)?" correctAns="usted" mode="cw" />
            <ExerciseItem id="ex3" num="3." problem="Как сказать 'Они' (5 дев + 1 парень)?" correctAns="ellos" mode="cw" />
          </div>
        </div>

        <div id="exercises-ser" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 2: Глагол SER</h3>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex4" num="4." problem="Yo _______ de Rusia." correctAns="soy" mode="cw" />
            <ExerciseItem id="ex5" num="5." problem="¿De dónde _______ tú?" correctAns="eres" mode="cw" />
            <ExerciseItem id="ex6" num="6." problem="María y Juan _______ amigos." correctAns="son" mode="cw" />
            <ExerciseItem id="ex7" num="7." problem="Mi coche _______ rápido." correctAns="es" mode="cw" />
            <ExerciseItem id="ex8" num="8." problem="Nosotros _______ estudiantes." correctAns="somos" mode="cw" />
          </div>
        </div>
      </div>
    </div>
  )
}
