'use client'
import { useState, useEffect } from 'react'
import { Check, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export default function Exercise({ 
  id, 
  mode = 'cw', // 'cw' or 'hw'
  type = 'text', // 'text', 'mcq', 'dropdown'
  problem, 
  hint, 
  solution, 
  correctAnswer, 
  options, // for mcq/dropdown
  onSuccess, // callback(attempts, status)
  savedState // { attempts, status }
}) {
  const [userAnswer, setUserAnswer] = useState('')
  const [selectedMcq, setSelectedMcq] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [status, setStatus] = useState('attempting') // 'attempting', 'correct', 'revealed'
  const [feedback, setFeedback] = useState('')
  const [showHint, setShowHint] = useState(false)

  const maxAttempts = mode === 'cw' ? 2 : 3

  useEffect(() => {
    if (savedState) {
      setAttempts(savedState.attempts || 0)
      setStatus(savedState.status || 'attempting')
      if (savedState.value) {
        if (type === 'text') setUserAnswer(savedState.value)
        else if (type === 'mcq' || type === 'dropdown') setSelectedMcq(savedState.value)
      }
    }
  }, [savedState, type])

  const normalize = (val) => val.toLowerCase().trim().replace(/\s+/g, ' ')

  const check = () => {
    if (status !== 'attempting') return

    const currentAttempts = attempts + 1
    setAttempts(currentAttempts)

    let isCorrect = false
    let currentVal = ''
    if (type === 'text') {
      isCorrect = normalize(userAnswer) === normalize(correctAnswer)
      currentVal = userAnswer
    } else if (type === 'mcq' || type === 'dropdown') {
      isCorrect = String(selectedMcq) === String(correctAnswer)
      currentVal = String(selectedMcq)
    }

    if (isCorrect) {
      setStatus('correct')
      setFeedback('¡Perfecto! ✓')
      onSuccess(currentAttempts, 'correct', currentVal)
    } else {
      if (currentAttempts >= maxAttempts) {
        setStatus('revealed')
        setFeedback(mode === 'cw' ? 'Посмотри решение ниже' : `Вот правильный ответ: ${correctAnswer}`)
        onSuccess(currentAttempts, 'revealed', currentVal)
      } else {
        // Multi-stage feedback
        if (mode === 'cw') {
          setFeedback('Неверно. Попробуй ещё раз!')
        } else {
          // HW logic
          if (currentAttempts === 1) {
            setFeedback('Неверно. Попробуй ещё раз!')
          } else if (currentAttempts === 2) {
            setFeedback('Почти! Посмотри подсказку.')
            setShowHint(true)
          }
        }
      }
    }
  }

  const isCompleted = status === 'correct' || status === 'revealed'

  return (
    <div className={cn(
      "p-6 rounded-2xl border transition-all duration-300 mb-4",
      status === 'attempting' ? "bg-white border-slate-200 shadow-sm" : 
      status === 'correct' ? "bg-emerald-50 border-emerald-200" : 
      "bg-rose-50 border-rose-200"
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
          status === 'attempting' ? "bg-slate-100 text-slate-500" :
          status === 'correct' ? "bg-emerald-500 text-white" :
          "bg-rose-500 text-white"
        )}>
          {status === 'correct' ? <Check size={18} /> : 
           status === 'revealed' ? <AlertCircle size={18} /> : 
           <HelpCircle size={18} />}
        </div>
        
        <div className="flex-1">
          <div className="text-slate-800 font-medium text-lg mb-4" dangerouslySetInnerHTML={{ __html: problem }} />

          {/* INPUT AREA */}
          <div className="flex flex-col gap-4">
            {type === 'text' && (
              <input 
                type="text"
                disabled={isCompleted}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Твой ответ..."
                className={cn(
                  "px-4 py-3 rounded-xl border font-mono outline-none transition-all w-full md:w-80",
                  status === 'attempting' ? "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" :
                  status === 'correct' ? "border-emerald-300 bg-emerald-10" :
                  "border-rose-300 bg-rose-10"
                )}
              />
            )}

            {type === 'mcq' && (
              <div className="grid grid-cols-1 gap-2">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={isCompleted}
                    onClick={() => setSelectedMcq(opt.value)}
                    className={cn(
                      "text-left px-5 py-3 rounded-xl border transition-all",
                      selectedMcq === opt.value ? "bg-indigo-50 border-indigo-500 border-2" : "bg-white border-slate-200 hover:border-slate-300",
                      isCompleted && opt.value === correctAnswer ? "bg-emerald-100 border-emerald-500" : ""
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {!isCompleted && (
              <button 
                onClick={check}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors inline-flex items-center gap-2 w-fit"
              >
                Проверить <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* FEEDBACK */}
          {feedback && (
            <div className={cn(
              "mt-4 text-sm font-semibold",
              status === 'correct' ? "text-emerald-600" : "text-rose-600"
            )}>
              {feedback}
            </div>
          )}

          {/* HINT & SOLUTION */}
          {showHint && hint && (
            <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl text-amber-800 text-sm">
              <span className="font-bold uppercase text-[10px] tracking-widest block mb-1">ПОДСКАЗКА:</span>
              <div dangerouslySetInnerHTML={{ __html: hint }} />
            </div>
          )}

          {status === 'revealed' && mode === 'cw' && solution && (
            <div className="mt-4 p-5 bg-indigo-50 border-indigo-200 border rounded-2xl">
              <span className="font-bold uppercase text-xs tracking-widest text-indigo-600 block mb-2">РЕШЕНИЕ:</span>
              <div className="text-slate-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: solution }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
