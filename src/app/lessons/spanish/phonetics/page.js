'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'

export default function PhoneticsLesson() {
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_phonetics', 5, 0);

  useEffect(() => {
    if (!loading && progress.cw) {
      const restored = {};
      let hasData = false;
      quizQuestions.forEach(q => {
        const item = progress.cw[q.id];
        if (item && item.value !== undefined) {
          restored[q.id] = parseInt(item.value);
          hasData = true;
        }
      });
      if (hasData) {
        setQuizAnswers(restored);
        setShowResults(true);
      }
    }
  }, [loading, progress.cw]);

  const quizQuestions = [
    { id: 'q1', word: 'hotel', options: ['hОtel', 'hotEl', 'Оtel', 'otEl'], correct: 3 },
    { id: 'q2', word: 'trabajan', options: ['trAbajan', 'trabAjan', 'trabajAn'], correct: 1 },
    { id: 'q3', word: 'guitarra', options: ['гуитАрра', 'гитАрра', 'хитАрра'], correct: 1 },
    { id: 'q4', word: 'zorro', options: ['сОрро (межзубный)', 'зОрро', 'цОрро'], correct: 0 },
    { id: 'q5', word: 'queso', options: ['куЭсо', 'кЭсо', 'сЭсо'], correct: 1 },
  ]

  const handleCheck = () => {
    setShowResults(true)
    quizQuestions.forEach(q => {
        const userIdx = quizAnswers[q.id];
        if (userIdx === undefined) return;
        const isCorrect = userIdx === q.correct;
        
        // Logical attempts for quiz: if they click check, we treat it as 1 attempt and final.
        // Or we can allow 2 attempts.
        // For simplicity in quiz: 1 attempt.
        updateProgress(q.id, 'cw', isCorrect ? 'correct' : 'revealed', 1, String(userIdx));
    });
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
        <div className="bg-[#1a1a2e] text-white p-12">
            <h1 className="text-4xl font-black unbounded">Фонетика</h1>
        </div>
        <div className="max-w-[860px] mx-auto px-6 mt-8">
            <AdvancedProgressBar data={progress.cw} total={5} title="Quiz Progress" mode="cw" />
            <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 mt-8 shadow-sm">
                {quizQuestions.map((q, idx) => (
                    <div key={q.id} className="mb-8 last:mb-0">
                        <p className="font-bold mb-4">{idx + 1}. Как читается слово <b>{q.word}</b>?</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((opt, oIdx) => (
                                <button
                                    key={oIdx}
                                    disabled={showResults}
                                    onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                                    className={`text-left p-4 rounded-xl border-2 transition-all ${quizAnswers[q.id] === oIdx ? 'border-[#e63946] bg-[#fff5f5]' : 'border-gray-100 hover:border-gray-200'} ${showResults && oIdx === q.correct ? '!border-emerald-500 !bg-emerald-50' : ''}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {!showResults && <button onClick={handleCheck} className="mt-8 bg-[#1a1a2e] text-white px-8 py-3 rounded-xl font-bold">Проверить всё</button>}
            </div>
        </div>
    </div>
  )
}
