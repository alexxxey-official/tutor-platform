'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function VerbsLessonPage() {
  const lessonId = 'spa_verbs'
  // CW: 7 items, HW: 8 items per variant
  const totalCW = 7
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
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
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
      <header className="bg-emerald-600 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10 uppercase">VERBOS</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-emerald-800 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 5 · Gramática A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            Verbos <span className="text-amber-300 italic">Regulares</span>
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto font-medium">
            Правильные глаголы — основа испанского языка! Учимся спрягать глаголы трех групп: -AR, -ER, -IR. 📚
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
          <div className="flex items-center gap-3 text-emerald-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Teoría <div className="h-[2px] w-12 bg-emerald-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Три группы глаголов</h2>

          <div className="grid gap-6">
            {/* Card 1: Three Groups */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Info size={20} className="text-emerald-500" /> Шаг 1: Три типа окончаний
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                В испанском языке все правильные глаголы делятся на три группы по окончанию инфинитива:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 font-mono text-2xl block mb-2">-AR</strong>
                  <p className="text-sm font-bold text-slate-700 mb-2">Первая группа</p>
                  <p className="text-xs text-slate-500">habl<strong>ar</strong>, trabaj<strong>ar</strong>, estudi<strong>ar</strong></p>
                </div>
                <div className="bg-rose-50 p-5 rounded-xl border border-rose-100">
                  <strong className="text-rose-600 font-mono text-2xl block mb-2">-ER</strong>
                  <p className="text-sm font-bold text-slate-700 mb-2">Вторая группа</p>
                  <p className="text-xs text-slate-500">com<strong>er</strong>, beb<strong>er</strong>, le<strong>er</strong></p>
                </div>
                <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                  <strong className="text-amber-600 font-mono text-2xl block mb-2">-IR</strong>
                  <p className="text-sm font-bold text-slate-700 mb-2">Третья группа</p>
                  <p className="text-xs text-slate-500">viv<strong>ir</strong>, escrib<strong>ir</strong>, abr<strong>ir</strong></p>
                </div>
              </div>
            </div>

            {/* Card 2: Conjugation Tables */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Star size={20} className="text-emerald-500" /> Шаг 2: Спряжение в настоящем времени
                </h3>
              </div>

              <div className="space-y-6">
                {/* AR verbs */}
                <div>
                  <h4 className="font-bold text-blue-600 mb-3 uppercase tracking-wider text-sm">Глаголы на -AR (hablar — говорить)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-blue-50/50">
                          <td className="py-3 font-bold text-slate-700 w-1/3">Yo</td>
                          <td className="py-3 font-black text-blue-600 text-lg">hablo</td>
                        </tr>
                        <tr className="hover:bg-blue-50/50">
                          <td className="py-3 font-bold text-slate-700">Tú</td>
                          <td className="py-3 font-black text-blue-600 text-lg">hablas</td>
                        </tr>
                        <tr className="hover:bg-blue-50/50 bg-blue-50/30">
                          <td className="py-3 font-bold text-slate-700">Él/Ella/Usted</td>
                          <td className="py-3 font-black text-blue-600 text-lg">habla</td>
                        </tr>
                        <tr className="hover:bg-blue-50/50">
                          <td className="py-3 font-bold text-slate-700">Nosotros/as</td>
                          <td className="py-3 font-black text-blue-600 text-lg">hablamos</td>
                        </tr>
                        <tr className="hover:bg-blue-50/50">
                          <td className="py-3 font-bold text-slate-700">Vosotros/as</td>
                          <td className="py-3 font-black text-blue-600 text-lg">habláis</td>
                        </tr>
                        <tr className="hover:bg-blue-50/50 bg-blue-50/30">
                          <td className="py-3 font-bold text-slate-700">Ellos/Ellas/Ustedes</td>
                          <td className="py-3 font-black text-blue-600 text-lg">hablan</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ER verbs */}
                <div>
                  <h4 className="font-bold text-rose-600 mb-3 uppercase tracking-wider text-sm">Глаголы на -ER (comer — есть)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-rose-50/50">
                          <td className="py-3 font-bold text-slate-700 w-1/3">Yo</td>
                          <td className="py-3 font-black text-rose-600 text-lg">como</td>
                        </tr>
                        <tr className="hover:bg-rose-50/50">
                          <td className="py-3 font-bold text-slate-700">Tú</td>
                          <td className="py-3 font-black text-rose-600 text-lg">comes</td>
                        </tr>
                        <tr className="hover:bg-rose-50/50 bg-rose-50/30">
                          <td className="py-3 font-bold text-slate-700">Él/Ella/Usted</td>
                          <td className="py-3 font-black text-rose-600 text-lg">come</td>
                        </tr>
                        <tr className="hover:bg-rose-50/50">
                          <td className="py-3 font-bold text-slate-700">Nosotros/as</td>
                          <td className="py-3 font-black text-rose-600 text-lg">comemos</td>
                        </tr>
                        <tr className="hover:bg-rose-50/50">
                          <td className="py-3 font-bold text-slate-700">Vosotros/as</td>
                          <td className="py-3 font-black text-rose-600 text-lg">coméis</td>
                        </tr>
                        <tr className="hover:bg-rose-50/50 bg-rose-50/30">
                          <td className="py-3 font-bold text-slate-700">Ellos/Ellas/Ustedes</td>
                          <td className="py-3 font-black text-rose-600 text-lg">comen</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* IR verbs */}
                <div>
                  <h4 className="font-bold text-amber-600 mb-3 uppercase tracking-wider text-sm">Глаголы на -IR (vivir — жить)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-amber-50/50">
                          <td className="py-3 font-bold text-slate-700 w-1/3">Yo</td>
                          <td className="py-3 font-black text-amber-600 text-lg">vivo</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="py-3 font-bold text-slate-700">Tú</td>
                          <td className="py-3 font-black text-amber-600 text-lg">vives</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50 bg-amber-50/30">
                          <td className="py-3 font-bold text-slate-700">Él/Ella/Usted</td>
                          <td className="py-3 font-black text-amber-600 text-lg">vive</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="py-3 font-bold text-slate-700">Nosotros/as</td>
                          <td className="py-3 font-black text-amber-600 text-lg">vivimos</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="py-3 font-bold text-slate-700">Vosotros/as</td>
                          <td className="py-3 font-black text-amber-600 text-lg">vivís</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50 bg-amber-50/30">
                          <td className="py-3 font-bold text-slate-700">Ellos/Ellas/Ustedes</td>
                          <td className="py-3 font-black text-amber-600 text-lg">viven</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Las Reglas */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-8 text-emerald-400 unbounded text-center flex justify-center items-center gap-3">
                <AlertTriangle size={28} /> LAS REGLAS (ПРАВИЛА)
              </h3>

              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №1: Окончания -ER и -IR почти одинаковые!</div>
                  <p className="text-slate-300 text-sm mb-3">Глаголы на -ER и -IR спрягаются почти одинаково. Разница только в формах nosotros и vosotros.</p>
                  <div className="bg-black/30 p-4 rounded-lg font-mono text-sm">
                    <p className="text-rose-400">com<strong>emos</strong> vs viv<strong>imos</strong></p>
                    <p className="text-rose-400">com<strong>éis</strong> vs viv<strong>ís</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cheat Sheet */}
            <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-900 unbounded uppercase">
                ¡OJO! (Внимание!)
              </h3>
              <p className="text-emerald-800 mb-4 font-medium">Алгоритм спряжения правильных глаголов:</p>
              <ol className="space-y-2 text-emerald-900 font-medium list-decimal list-inside">
                <li>Убираем окончание (-ar, -er, -ir) → получаем основу</li>
                <li>Добавляем нужное окончание в зависимости от лица и группы</li>
                <li>Готово! 🎉</li>
              </ol>
            </div>

          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-emerald-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Práctica <div className="h-[2px] w-12 bg-emerald-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-slate-900">Classwork</h2>
          <p className="text-slate-500 mb-8">Тренируем спряжение правильных глаголов.</p>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Блок 1: Спряжение
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw1', q: "1. Yo ___ español. (hablar)", ans: 'hablo' },
                  { id: 'cw2', q: "2. Tú ___ en Madrid. (vivir)", ans: 'vives' },
                  { id: 'cw3', q: "3. Ella ___ mucho. (trabajar)", ans: 'trabaja' },
                  { id: 'cw4', q: "4. Nosotros ___ pizza. (comer)", ans: 'comemos' },
                  { id: 'cw5', q: "5. Vosotros ___ libros. (leer)", ans: 'leéis' },
                  { id: 'cw6', q: "6. Ellos ___ cartas. (escribir)", ans: 'escriben' },
                  { id: 'cw7', q: "7. Usted ___ en la universidad. (estudiar)", ans: 'estudia' },
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
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl border-t-8 border-emerald-600">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black unbounded uppercase text-emerald-400">
                  Homework {variant === 2 && <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white align-middle ml-4">Variant 2</span>}
                </h2>
              </div>

              <p className="text-slate-400 mb-12 max-w-xl">
                {variant === 1
                  ? "Самостоятельная практика. Проспрягайте глаголы в нужной форме."
                  : "Второй шанс! Решите новые задания."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <div className="space-y-4">
                    {[
                      { id: 'hw1', q: "1. Yo ___ en casa. (trabajar)", ans: "trabajo" },
                      { id: 'hw2', q: "2. Tú ___ agua. (beber)", ans: "bebes" },
                      { id: 'hw3', q: "3. Él ___ la puerta. (abrir)", ans: "abre" },
                      { id: 'hw4', q: "4. Nosotras ___ música. (escuchar)", ans: "escuchamos" },
                      { id: 'hw5', q: "5. Vosotros ___ en Barcelona. (vivir)", ans: "vivís" },
                      { id: 'hw6', q: "6. Ellas ___ el periódico. (leer)", ans: "leen" },
                      { id: 'hw7', q: "7. Usted ___ bien. (cantar)", ans: "canta" },
                      { id: 'hw8', q: "8. Yo ___ correos. (escribir)", ans: "escribo" },
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
                      { id: 'hw1_v2', q: "1. Yo ___ francés. (aprender)", ans: "aprendo" },
                      { id: 'hw2_v2', q: "2. Tú ___ la ventana. (abrir)", ans: "abres" },
                      { id: 'hw3_v2', q: "3. Ella ___ en un restaurante. (trabajar)", ans: "trabaja" },
                      { id: 'hw4_v2', q: "4. Nosotros ___ café. (beber)", ans: "bebemos" },
                      { id: 'hw5_v2', q: "5. Vosotras ___ novelas. (leer)", ans: "leéis" },
                      { id: 'hw6_v2', q: "6. Ellos ___ en Madrid. (vivir)", ans: "viven" },
                      { id: 'hw7_v2', q: "7. Ustedes ___ español. (hablar)", ans: "hablan" },
                      { id: 'hw8_v2', q: "8. Yo ___ en la biblioteca. (estudiar)", ans: "estudio" },
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
        © 2026 AG Academy · Verbos Regulares V1.2
      </footer>
    </div>
  )
}
