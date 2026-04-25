'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function TenerLessonPage() {
  const lessonId = 'spa_tener'
  // CW: 20 items, HW: 8 items per variant
  const totalCW = 20
  const totalHW = 8

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
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10 uppercase">TENER</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-amber-700 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 4 · Gramática A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            El Verbo <span className="text-rose-600 italic">TENER</span>
          </h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto font-medium">
            Один из самых важных глаголов! Учимся говорить о том, что у нас есть, сколько нам лет и что мы должны делать. 🎯
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
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Что у меня есть?</h2>

          <div className="grid gap-6">
            {/* Card 1: Conjugation */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Star size={20} className="text-amber-500" /> Спряжение глагола TENER
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                TENER — неправильный глагол (verbo irregular). Используется для выражения обладания, возраста и обязанности.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-amber-100">
                      <th className="text-left py-3 font-black text-amber-800 uppercase tracking-wider">Местоимение</th>
                      <th className="text-left py-3 font-black text-amber-800 uppercase tracking-wider">Форма TENER</th>
                      <th className="text-left py-3 font-black text-amber-800 uppercase tracking-wider">Пример</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">Yo</td>
                      <td className="py-4 font-black text-amber-600 text-lg">tengo</td>
                      <td className="py-4 text-slate-600 italic">Yo <strong className="text-amber-500 font-bold">tengo</strong> un perro. <span className="text-xs text-slate-400">(У меня есть собака)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">Tú</td>
                      <td className="py-4 font-black text-amber-600 text-lg">tienes</td>
                      <td className="py-4 text-slate-600 italic">Tú <strong className="text-amber-500 font-bold">tienes</strong> 20 años. <span className="text-xs text-slate-400">(Тебе 20 лет)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors bg-amber-50/30">
                      <td className="py-4 font-bold text-slate-700">Él / Ella / Usted</td>
                      <td className="py-4 font-black text-amber-600 text-lg">tiene</td>
                      <td className="py-4 text-slate-600 italic">Ella <strong className="text-amber-500 font-bold">tiene</strong> hambre. <span className="text-xs text-slate-400">(Она голодна)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">Nosotros / Nosotras</td>
                      <td className="py-4 font-black text-amber-600 text-lg">tenemos</td>
                      <td className="py-4 text-slate-600 italic">Nosotros <strong className="text-amber-500 font-bold">tenemos</strong> clase. <span className="text-xs text-slate-400">(У нас урок)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700">Vosotros / Vosotras</td>
                      <td className="py-4 font-black text-amber-600 text-lg">tenéis</td>
                      <td className="py-4 text-slate-600 italic">Vosotros <strong className="text-amber-500 font-bold">tenéis</strong> razón. <span className="text-xs text-slate-400">(Вы правы)</span></td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition-colors bg-amber-50/30">
                      <td className="py-4 font-bold text-slate-700">Ellos / Ellas / Ustedes</td>
                      <td className="py-4 font-black text-amber-600 text-lg">tienen</td>
                      <td className="py-4 text-slate-600 italic">Ellos <strong className="text-amber-500 font-bold">tienen</strong> dinero. <span className="text-xs text-slate-400">(У них есть деньги)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 2: Las Reglas */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-8 text-amber-400 unbounded text-center flex justify-center items-center gap-3">
                <AlertTriangle size={28} /> LAS REGLAS (ПРАВИЛА)
              </h3>

              <div className="space-y-6">
                {/* Rule 1 */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №1: TENER для возраста</div>
                  <p className="text-slate-300 text-sm mb-4">В испанском языке возраст выражается глаголом TENER, а не SER!</p>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg">
                    <p className="text-white font-mono">Tengo 25 años. <span className="text-slate-400 italic">(Мне 25 лет)</span></p>
                    <p className="text-rose-400 text-xs mt-2">❌ Soy 25 años. (НЕПРАВИЛЬНО!)</p>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №2: TENER QUE + инфинитив</div>
                  <p className="text-slate-300 text-sm mb-3">Конструкция <strong className="text-white">tener que + infinitivo</strong> означает "должен что-то сделать".</p>
                  <ul className="text-sm text-slate-400 space-y-2 font-mono bg-black/30 p-4 rounded-lg">
                    <li>Tengo que estudiar. <span className="text-emerald-400">→ Я должен учиться.</span></li>
                    <li>Tienes que trabajar. <span className="text-emerald-400">→ Ты должен работать.</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cheat Sheet */}
            <div className="bg-rose-50 p-8 rounded-2xl border-2 border-rose-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-rose-900 unbounded uppercase">
                ¡OJO! (Внимание!)
              </h3>
              <p className="text-rose-800 mb-4 font-medium">Популярные выражения с TENER:</p>
              <ul className="space-y-3 text-rose-900 font-medium grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm flex-shrink-0">1</span>
                  <div><strong>tener hambre</strong> — быть голодным</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm flex-shrink-0">2</span>
                  <div><strong>tener sed</strong> — хотеть пить</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm flex-shrink-0">3</span>
                  <div><strong>tener sueño</strong> — хотеть спать</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm flex-shrink-0">4</span>
                  <div><strong>tener frío/calor</strong> — мерзнуть/жарко</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm flex-shrink-0">5</span>
                  <div><strong>tener razón</strong> — быть правым</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm flex-shrink-0">6</span>
                  <div><strong>tener miedo</strong> — бояться</div>
                </li>
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
          <p className="text-slate-500 mb-8">Тренируем спряжение глагола TENER.</p>

          <div className="space-y-12">
            {/* Block 1: Conjugation */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Блок 1: Формы глагола TENER
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw1', q: "1. Yo ___ un coche rojo.", ans: 'tengo' },
                  { id: 'cw2', q: "2. ¿Tú ___ hermanos?", ans: 'tienes' },
                  { id: 'cw3', q: "3. Ella ___ 30 años.", ans: 'tiene' },
                  { id: 'cw4', q: "4. Nosotros ___ una casa grande.", ans: 'tenemos' },
                  { id: 'cw5', q: "5. Vosotros ___ mucho dinero.", ans: 'tenéis' },
                  { id: 'cw6', q: "6. Ellos ___ hambre.", ans: 'tienen' },
                  { id: 'cw7', q: "7. Usted ___ razón.", ans: 'tiene' },
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

            {/* Block 2: Age expressions */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div> Блок 2: Возраст (Tener + años)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'cw8', q: "Yo ___ 25 años. (Мне 25 лет)", ans: 'tengo', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                  { id: 'cw9', q: "Mi hermano ___ 18 años.", ans: 'tiene', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                  { id: 'cw10', q: "¿Cuántos años ___ tú?", ans: 'tienes', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                  { id: 'cw11', q: "Nosotros ___ 30 años.", ans: 'tenemos', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                ].map(ex => (
                  <Exercise
                    key={ex.id}
                    id={ex.id}
                    mode="cw"
                    type="dropdown"
                    label={ex.q}
                    options={ex.opts}
                    correctAnswer={ex.ans}
                    progressItem={progress.cw?.[ex.id]}
                    onUpdate={updateProgress}
                  />
                ))}
              </div>
            </div>

            {/* Block 3: Tener que + infinitive */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Блок 3: Tener que + инфинитив (Должен)
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw12', q: "12. Yo ___ que estudiar. (Я должен учиться)", ans: 'tengo que' },
                  { id: 'cw13', q: "13. Tú ___ que trabajar. (Ты должен работать)", ans: 'tienes que' },
                  { id: 'cw14', q: "14. Ella ___ que cocinar. (Она должна готовить)", ans: 'tiene que' },
                  { id: 'cw15', q: "15. Nosotros ___ que salir. (Мы должны выйти)", ans: 'tenemos que' },
                ].map(ex => (
                  <Exercise
                    key={ex.id}
                    id={ex.id}
                    mode="cw"
                    type="text"
                    label={ex.q}
                    placeholder="tengo/tienes/tiene... que"
                    correctAnswer={ex.ans}
                    progressItem={progress.cw?.[ex.id]}
                    onUpdate={updateProgress}
                  />
                ))}
              </div>
            </div>

            {/* Block 4: Expressions with tener */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 unbounded text-amber-400">Блок 4: Устойчивые выражения</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'cw16', q: "Yo ___ hambre. (Я голоден)", ans: 'tengo', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                  { id: 'cw17', q: "Tú ___ sed. (Ты хочешь пить)", ans: 'tienes', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                  { id: 'cw18', q: "Él ___ frío. (Ему холодно)", ans: 'tiene', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                  { id: 'cw19', q: "Nosotros ___ calor. (Нам жарко)", ans: 'tenemos', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                  { id: 'cw20', q: "Ellos ___ miedo. (Они боятся)", ans: 'tienen', opts: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
                ].map(ex => (
                  <Exercise
                    key={ex.id}
                    id={ex.id}
                    mode="cw"
                    type="dropdown"
                    label={ex.q}
                    options={ex.opts}
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
                  ? "Самостоятельная практика. Впишите правильную форму глагола TENER."
                  : "Второй шанс! Решите новые задания, чтобы улучшить результат."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <>
                    {/* VARIANT 1 - 8 ITEMS */}
                    <div className="space-y-4">
                      {[
                        { id: 'hw1', q: "1. Yo ___ sed.", ans: "tengo" },
                        { id: 'hw2', q: "2. ¿Cuántos años ___ tú?", ans: "tienes" },
                        { id: 'hw3', q: "3. Mi hermana ___ un gato.", ans: "tiene" },
                        { id: 'hw4', q: "4. Nosotros ___ que estudiar.", ans: "tenemos" },
                        { id: 'hw5', q: "5. Vosotros ___ frío.", ans: "tenéis" },
                        { id: 'hw6', q: "6. Ellos ___ miedo.", ans: "tienen" },
                        { id: 'hw7', q: "7. Usted ___ razón.", ans: "tiene" },
                        { id: 'hw8', q: "8. Yo ___ sueño.", ans: "tengo" },
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
                  </>
                ) : (
                  <>
                    {/* VARIANT 2 - 8 ITEMS */}
                    <div className="space-y-4">
                      {[
                        { id: 'hw1_v2', q: "1. Yo ___ calor.", ans: "tengo" },
                        { id: 'hw2_v2', q: "2. ¿Tú ___ tiempo?", ans: "tienes" },
                        { id: 'hw3_v2', q: "3. Él ___ 40 años.", ans: "tiene" },
                        { id: 'hw4_v2', q: "4. Nosotras ___ prisa.", ans: "tenemos" },
                        { id: 'hw5_v2', q: "5. Vosotras ___ suerte.", ans: "tenéis" },
                        { id: 'hw6_v2', q: "6. Ellas ___ que trabajar.", ans: "tienen" },
                        { id: 'hw7_v2', q: "7. Ustedes ___ hambre.", ans: "tienen" },
                        { id: 'hw8_v2', q: "8. Yo ___ un problema.", ans: "tengo" },
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
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-center text-slate-400 text-xs mt-20 unbounded opacity-50">
        © 2026 AG Academy · TENER V1.2
      </footer>
    </div>
  )
}
