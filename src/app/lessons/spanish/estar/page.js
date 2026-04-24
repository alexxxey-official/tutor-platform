'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function EstarLessonPage() {
  const lessonId = 'spa_estar'
  // CW: 4 items, HW: 4 items per variant
  const totalCW = 4
  const totalHW = 4

  const { progress, updateProgress, resetHW, variant, getStats, loading } =
    useLessonProgress(lessonId, totalCW, totalHW)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (loading || !mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="font-bold text-slate-400 animate-pulse">CARGANDO...</div>
      </div>
    </div>
  )

  const statsCW = getStats('cw')
  const statsHW = getStats('hw')

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e1b4b] font-sans pb-20">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800;900&display=swap');
        .unbounded { font-family: 'Unbounded', sans-serif; }
      `}} />

      {/* Header */}
      <header className="bg-amber-500 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10 uppercase">ESTAR</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-amber-700 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 6 · Gramática A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            El Verbo <span className="text-rose-600 italic">ESTAR</span>
          </h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto font-medium">
            Второй глагол "быть" в испанском! Учимся говорить о местоположении и временных состояниях. 📍
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <AdvancedProgressBar
          statsCW={statsCW}
          statsHW={statsHW}
          onReset={resetHW}
          variant={variant}
        />

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2 mb-12">
          <Link href="/dashboard" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-700">
            <Home size={16} /> Inicio
          </Link>
          <a href="#theory" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-700">
            <BookOpen size={16} /> Teoría
          </a>
          <a href="#classwork" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-700">
            <PenTool size={16} /> Práctica
          </a>
          <a href="#homework" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-700">
            <CheckCircle size={16} /> Tareas
          </a>
        </nav>

        {/* THEORY SECTION */}
        <section id="theory" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Teoría <div className="h-[2px] w-12 bg-amber-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">SER vs ESTAR</h2>

          <div className="grid gap-6">
            {/* Card 1: Conjugation */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Star size={20} className="text-amber-500" /> Спряжение глагола ESTAR
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                ESTAR — неправильный глагол. Используется для местоположения и временных состояний.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-amber-100">
                      <th className="text-left py-3 font-black text-amber-800 uppercase tracking-wider">Местоимение</th>
                      <th className="text-left py-3 font-black text-amber-800 uppercase tracking-wider">Форма ESTAR</th>
                      <th className="text-left py-3 font-black text-amber-800 uppercase tracking-wider">Пример</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">Yo</td>
                      <td className="py-4 font-black text-amber-600 text-lg">estoy</td>
                      <td className="py-4 text-slate-600 italic">Yo <strong className="text-amber-500 font-bold">estoy</strong> en casa. <span className="text-xs text-slate-400">(Я дома)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">Tú</td>
                      <td className="py-4 font-black text-amber-600 text-lg">estás</td>
                      <td className="py-4 text-slate-600 italic">Tú <strong className="text-amber-500 font-bold">estás</strong> cansado. <span className="text-xs text-slate-400">(Ты устал)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors bg-amber-50/30">
                      <td className="py-4 font-bold text-slate-700">Él / Ella / Usted</td>
                      <td className="py-4 font-black text-amber-600 text-lg">está</td>
                      <td className="py-4 text-slate-600 italic">Ella <strong className="text-amber-500 font-bold">está</strong> feliz. <span className="text-xs text-slate-400">(Она счастлива)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">Nosotros / Nosotras</td>
                      <td className="py-4 font-black text-amber-600 text-lg">estamos</td>
                      <td className="py-4 text-slate-600 italic">Nosotros <strong className="text-amber-500 font-bold">estamos</strong> aquí. <span className="text-xs text-slate-400">(Мы здесь)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">Vosotros / Vosotras</td>
                      <td className="py-4 font-black text-amber-600 text-lg">estáis</td>
                      <td className="py-4 text-slate-600 italic">Vosotros <strong className="text-amber-500 font-bold">estáis</strong> ocupados. <span className="text-xs text-slate-400">(Вы заняты)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors bg-amber-50/30">
                      <td className="py-4 font-bold text-slate-700">Ellos / Ellas / Ustedes</td>
                      <td className="py-4 font-black text-amber-600 text-lg">están</td>
                      <td className="py-4 text-slate-600 italic">Ellos <strong className="text-amber-500 font-bold">están</strong> en Madrid. <span className="text-xs text-slate-400">(Они в Мадриде)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Las Reglas */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-8 text-amber-400 unbounded text-center flex justify-center items-center gap-3">
                <AlertTriangle size={28} /> LAS REGLAS (ПРАВИЛА)
              </h3>

              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №1: SER vs ESTAR</div>
                  <p className="text-slate-300 text-sm mb-4">SER — постоянные характеристики. ESTAR — временные состояния и местоположение.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-lg">
                      <strong className="text-rose-400 block mb-2">SER (постоянное)</strong>
                      <p className="text-white text-sm">Soy alto. <span className="text-slate-400">(Я высокий)</span></p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg">
                      <strong className="text-emerald-400 block mb-2">ESTAR (временное)</strong>
                      <p className="text-white text-sm">Estoy cansado. <span className="text-slate-400">(Я устал)</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cheat Sheet */}
            <div className="bg-amber-50 p-8 rounded-2xl border-2 border-amber-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-900 unbounded uppercase">
                ¡OJO! (Внимание!)
              </h3>
              <p className="text-amber-800 mb-4 font-medium">Когда использовать ESTAR:</p>
              <ul className="space-y-2 text-amber-900 font-medium list-disc list-inside">
                <li><strong>Местоположение:</strong> Estoy en Madrid.</li>
                <li><strong>Временное состояние:</strong> Estoy cansado.</li>
                <li><strong>Эмоции (сейчас):</strong> Estoy feliz.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Práctica <div className="h-[2px] w-12 bg-amber-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-slate-900">Classwork</h2>
          <p className="text-slate-500 mb-8">Тренируем спряжение глагола ESTAR.</p>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Блок 1: Формы ESTAR
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw1', q: "1. Yo ___ en el parque.", ans: 'estoy' },
                  { id: 'cw2', q: "2. ¿Dónde ___ tú?", ans: 'estás' },
                  { id: 'cw3', q: "3. Nosotros ___ cansados.", ans: 'estamos' },
                  { id: 'cw4', q: "4. Ellos ___ en casa.", ans: 'están' },
                ].map(ex => (
                  <Exercise
                    key={ex.id}
                    id={ex.id}
                    mode="cw"
                    type="text"
                    label={ex.q}
                    placeholder="Enter answer"
                    correctAnswer={ex.ans}
                    progressItem={progress.cw?.[ex.id]}
                    onUpdate={updateProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOMEWORK SECTION */}
        <section id="homework" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-slate-900 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Tareas <div className="h-[2px] w-12 bg-slate-900"></div>
          </div>
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl border-t-8 border-amber-500">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black unbounded uppercase text-amber-400">
                  Homework {variant === 2 && <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white align-middle ml-4">Variant 2</span>}
                </h2>
              </div>

              <p className="text-slate-400 mb-12 max-w-xl">
                {variant === 1
                  ? "Самостоятельная практика. Впишите правильную форму глагола ESTAR."
                  : "Второй шанс! Решите новые задания."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <div className="space-y-4">
                    {[
                      { id: 'hw1', q: "1. Yo ___ feliz.", ans: "estoy" },
                      { id: 'hw2', q: "2. Tú ___ en Madrid.", ans: "estás" },
                      { id: 'hw3', q: "3. Ella ___ ocupada.", ans: "está" },
                      { id: 'hw4', q: "4. Nosotros ___ aquí.", ans: "estamos" },
                    ].map((ex) => (
                      <Exercise
                        key={ex.id}
                        id={ex.id}
                        mode="hw"
                        type="text"
                        label={ex.q}
                        placeholder="Enter answer"
                        correctAnswer={ex.ans}
                        progressItem={progress.hw?.[ex.id]}
                        onUpdate={updateProgress}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { id: 'hw1_v2', q: "1. Yo ___ triste.", ans: "estoy" },
                      { id: 'hw2_v2', q: "2. Tú ___ en Barcelona.", ans: "estás" },
                      { id: 'hw3_v2', q: "3. Él ___ enfermo.", ans: "está" },
                      { id: 'hw4_v2', q: "4. Nosotras ___ listas.", ans: "estamos" },
                    ].map((ex) => (
                      <Exercise
                        key={ex.id}
                        id={ex.id}
                        mode="hw"
                        type="text"
                        label={ex.q}
                        placeholder="Enter answer"
                        correctAnswer={ex.ans}
                        progressItem={progress.hw?.[ex.id]}
                        onUpdate={updateProgress}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-center text-slate-400 text-xs mt-20 unbounded opacity-50">
        © 2026 AG Academy · ESTAR V1.2
      </footer>
    </div>
  )
}
