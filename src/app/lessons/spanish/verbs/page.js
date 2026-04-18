'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'

export default function VerbsLesson() {
  const [answers, setAnswers] = useState({})
  const total = 15
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_verbs', total, 0);

  useEffect(() => {
    if (!loading && progress.cw) {
      const restored = {};
      Object.keys(progress.cw).forEach(id => {
        const item = progress.cw[id];
        if (item) restored[id] = { value: item.value || '', status: item.status, attempts: item.attempts || 0 };
      });
      setAnswers(restored);
    }
  }, [loading, progress.cw]);

  const normalize = (s) => s.toLowerCase().replace(/[^a-záéíóúñ]/g, '').trim()

  const checkAnswer = (id, correctAns, value) => {
    const saved = answers[id] || { status: 'attempting', attempts: 0 }
    if (saved.status !== 'attempting') return
    const curAttempts = saved.attempts + 1
    const isCorrect = normalize(value) === normalize(correctAns) && value !== ''
    
    let newStatus = 'attempting'
    if (isCorrect) newStatus = 'correct'
    else if (curAttempts >= 2) newStatus = 'revealed'

    setAnswers(prev => ({ ...prev, [id]: { value, status: newStatus, attempts: curAttempts } }))
    if (newStatus !== 'attempting') updateProgress(id, 'cw', newStatus, curAttempts, value);
  }

  const ExerciseItem = ({ id, num, problem, correctAns }) => {
    const state = answers[id] || { value: '', status: 'attempting' }
    const isDone = state.status === 'correct' || state.status === 'revealed'
    return (
      <div className={`border-b border-dashed border-[#e5e0d5] py-4 flex gap-4 items-start last:border-none ${state.status === 'correct' ? 'bg-emerald-50/20' : ''}`}>
        <div className="font-mono text-[13px] text-gray-500 min-w-[28px] pt-1">{num}</div>
        <div className="flex-1">
          <div className="text-[15px] px-3.5 py-2.5 bg-gray-50 rounded-lg mb-2.5" dangerouslySetInnerHTML={{ __html: problem }} />
          <div className="flex items-center gap-2">
            <input
              type="text"
              disabled={isDone}
              value={state.value}
              onChange={(e) => setAnswers(prev => ({...prev, [id]: { ...state, value: e.target.value }}))}
              className={`border-[1.5px] rounded-lg px-3 py-1.5 font-mono text-[14px] w-[160px] outline-none transition-colors ${isDone ? (state.status === 'correct' ? 'border-[#2a9d8f] bg-[#f0faf8]' : 'border-[#e63946] bg-[#fff5f5]') : 'border-[#e5e0d5] focus:border-[#e63946]'}`}
            />
            {!isDone && <button onClick={() => checkAnswer(id, correctAns, state.value)} className="bg-[#1a1a2e] text-white px-4 py-1.5 rounded-lg text-[13px] font-sans">Check</button>}
          </div>
          {isDone && <div className={`mt-1 text-[13px] font-medium ${state.status === 'correct' ? 'text-[#2a9d8f]' : 'text-[#e63946]'}`}>{state.status === 'correct' ? '✓ ¡Exacto!' : `✗ Correct: ${correctAns}`}</div>}
        </div>
      </div>
    )
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10">
        <h1 className="font-extrabold text-4xl mb-4 unbounded">Правильные глаголы</h1>
      </div>
      <div className="max-w-[860px] mx-auto px-6">
        <div className="mt-8"><AdvancedProgressBar data={progress.cw} total={total} title="Прогресс" mode="cw" /></div>
        <div className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm mt-8 px-6">
            <ExerciseItem id="ex1" num="1." problem="Yo ________ español. (hablar)" correctAns="hablo" />
            {/* ... */}
        </div>
      </div>
    </div>
  )
}
