'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function GustarLessonPage() {
  const lessonId = 'spa_gustar'
  // CW: 20 items, HW: 15 items per variant
  const totalCW = 20
  const totalHW = 15

  const { progress, updateProgress, resetHW, variant, getStats, loading } =
    useLessonProgress(lessonId, totalCW, totalHW)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (loading || !mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
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
      <header className="bg-pink-600 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10 uppercase">GUSTAR</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-pink-800 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 9 · Gramática A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            El Verbo <span className="text-amber-300 italic">GUSTAR</span>
          </h1>
          <p className="text-pink-100 text-lg max-w-2xl mx-auto font-medium">
            Особенный глагол! Учимся говорить о том, что нам нравится по-испански. ❤️
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
          <div className="flex items-center gap-3 text-pink-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Teoría <div className="h-[2px] w-12 bg-pink-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Особая конструкция GUSTAR</h2>

          <div className="grid gap-6">
            {/* Card 1: How GUSTAR works */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Info size={20} className="text-pink-500" /> Как работает GUSTAR
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                GUSTAR — особенный глагол! Буквально означает "нравиться", а не "любить". Конструкция обратная: "Мне нравится" = "Me gusta".
              </p>

              <div className="space-y-4">
                <div className="bg-pink-50 p-5 rounded-xl border border-pink-100">
                  <p className="font-bold text-pink-900 mb-2">Формула:</p>
                  <p className="font-mono text-lg text-slate-700">
                    <span className="text-pink-600">me/te/le/nos/os/les</span> + <span className="text-amber-600">gusta/gustan</span> + <span className="text-slate-600">что-то</span>
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-900 mb-3">Местоимения:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong className="text-pink-600">me</strong> gusta — мне нравится</div>
                    <div><strong className="text-pink-600">nos</strong> gusta — нам нравится</div>
                    <div><strong className="text-pink-600">te</strong> gusta — тебе нравится</div>
                    <div><strong className="text-pink-600">os</strong> gusta — вам нравится</div>
                    <div><strong className="text-pink-600">le</strong> gusta — ему/ей нравится</div>
                    <div><strong className="text-pink-600">les</strong> gusta — им нравится</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: GUSTA vs GUSTAN */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Star size={20} className="text-amber-500" /> GUSTA vs GUSTAN
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                  <p className="font-bold text-emerald-900 mb-2">GUSTA (единственное число):</p>
                  <p className="text-slate-700">Me gust<strong className="text-emerald-600">a</strong> el chocolate. <span className="text-xs text-slate-500">(Мне нравится шоколад)</span></p>
                </div>
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <p className="font-bold text-blue-900 mb-2">GUSTAN (множественное число):</p>
                  <p className="text-slate-700">Me gust<strong className="text-blue-600">an</strong> los gatos. <span className="text-xs text-slate-500">(Мне нравятся кошки)</span></p>
                </div>
              </div>
            </div>

            {/* Las Reglas */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-8 text-pink-400 unbounded text-center flex justify-center items-center gap-3">
                <AlertTriangle size={28} /> LAS REGLAS (ПРАВИЛА)
              </h3>

              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-pink-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №1: Обратная логика!</div>
                  <p className="text-slate-300 text-sm mb-3">В испанском "нравится" согласуется с ОБЪЕКТОМ, а не с субъектом!</p>
                  <div className="bg-black/30 p-4 rounded-lg font-mono text-sm space-y-1">
                    <p className="text-emerald-400">Me gusta la pizza. (Мне нравится пицца)</p>
                    <p className="text-emerald-400">Me gustan las pizzas. (Мне нравятся пиццы)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cheat Sheet */}
            <div className="bg-pink-50 p-8 rounded-2xl border-2 border-pink-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-900 unbounded uppercase">
                ¡OJO! (Внимание!)
              </h3>
              <p className="text-pink-800 mb-4 font-medium">Популярные фразы с GUSTAR:</p>
              <ul className="space-y-2 text-pink-900 font-medium list-disc list-inside">
                <li>Me gusta el café. — Мне нравится кофе.</li>
                <li>Me gustan los perros. — Мне нравятся собаки.</li>
                <li>¿Te gusta bailar? — Тебе нравится танцевать?</li>
              </ul>
            </div>

          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-pink-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Práctica <div className="h-[2px] w-12 bg-pink-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-slate-900">Classwork</h2>
          <p className="text-slate-500 mb-8">Тренируем конструкцию с GUSTAR.</p>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div> Блок 1: GUSTA или GUSTAN?
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw1', q: "1. Me ___ el chocolate.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw2', q: "2. Me ___ los gatos.", ans: 'gustan', opts: ['gusta', 'gustan'] },
                  { id: 'cw3', q: "3. Te ___ la música.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw4', q: "4. Te ___ las películas.", ans: 'gustan', opts: ['gusta', 'gustan'] },
                  { id: 'cw5', q: "5. Le ___ bailar.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw6', q: "6. Nos ___ el fútbol.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw7', q: "7. Os ___ los libros.", ans: 'gustan', opts: ['gusta', 'gustan'] },
                  { id: 'cw8', q: "8. Les ___ viajar.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw9', q: "9. Me ___ las manzanas.", ans: 'gustan', opts: ['gusta', 'gustan'] },
                  { id: 'cw10', q: "10. Te ___ estudiar.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw11', q: "11. Nos ___ el café.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw12', q: "12. Le ___ los perros.", ans: 'gustan', opts: ['gusta', 'gustan'] },
                  { id: 'cw13', q: "13. Me ___ cantar.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw14', q: "14. Os ___ las series.", ans: 'gustan', opts: ['gusta', 'gustan'] },
                  { id: 'cw15', q: "15. Les ___ el arte.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw16', q: "16. Te ___ los deportes.", ans: 'gustan', opts: ['gusta', 'gustan'] },
                  { id: 'cw17', q: "17. Me ___ cocinar.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw18', q: "18. Nos ___ las vacaciones.", ans: 'gustan', opts: ['gusta', 'gustan'] },
                  { id: 'cw19', q: "19. Le ___ el chocolate.", ans: 'gusta', opts: ['gusta', 'gustan'] },
                  { id: 'cw20', q: "20. Os ___ nadar.", ans: 'gusta', opts: ['gusta', 'gustan'] },
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
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl border-t-8 border-pink-600">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black unbounded uppercase text-pink-400">
                  Homework {variant === 2 && <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white align-middle ml-4">Variant 2</span>}
                </h2>
              </div>

              <p className="text-slate-400 mb-12 max-w-xl">
                {variant === 1
                  ? "Самостоятельная практика. Впишите правильную форму: gusta или gustan."
                  : "Второй шанс! Решите новые задания."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <div className="space-y-4">
                    {[
                      { id: 'hw1', q: "1. Me ___ el café.", ans: "gusta" },
                      { id: 'hw2', q: "2. Me ___ los perros.", ans: "gustan" },
                      { id: 'hw3', q: "3. Te ___ la pizza.", ans: "gusta" },
                      { id: 'hw4', q: "4. Te ___ las frutas.", ans: "gustan" },
                      { id: 'hw5', q: "5. Le ___ nadar.", ans: "gusta" },
                      { id: 'hw6', q: "6. Le ___ los deportes.", ans: "gustan" },
                      { id: 'hw7', q: "7. Nos ___ el cine.", ans: "gusta" },
                      { id: 'hw8', q: "8. Nos ___ las vacaciones.", ans: "gustan" },
                      { id: 'hw9', q: "9. Os ___ cocinar.", ans: "gusta" },
                      { id: 'hw10', q: "10. Os ___ los videojuegos.", ans: "gustan" },
                      { id: 'hw11', q: "11. Les ___ la playa.", ans: "gusta" },
                      { id: 'hw12', q: "12. Les ___ las montañas.", ans: "gustan" },
                      { id: 'hw13', q: "13. Me ___ leer.", ans: "gusta" },
                      { id: 'hw14', q: "14. Te ___ los animales.", ans: "gustan" },
                      { id: 'hw15', q: "15. Le ___ el arte.", ans: "gusta" },
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
                      { id: 'hw1_v2', q: "1. Me ___ el té.", ans: "gusta" },
                      { id: 'hw2_v2', q: "2. Me ___ los gatos.", ans: "gustan" },
                      { id: 'hw3_v2', q: "3. Te ___ la pasta.", ans: "gusta" },
                      { id: 'hw4_v2', q: "4. Te ___ las verduras.", ans: "gustan" },
                      { id: 'hw5_v2', q: "5. Le ___ correr.", ans: "gusta" },
                      { id: 'hw6_v2', q: "6. Le ___ los coches.", ans: "gustan" },
                      { id: 'hw7_v2', q: "7. Nos ___ el teatro.", ans: "gusta" },
                      { id: 'hw8_v2', q: "8. Nos ___ las fiestas.", ans: "gustan" },
                      { id: 'hw9_v2', q: "9. Os ___ cantar.", ans: "gusta" },
                      { id: 'hw10_v2', q: "10. Os ___ los conciertos.", ans: "gustan" },
                      { id: 'hw11_v2', q: "11. Les ___ la naturaleza.", ans: "gusta" },
                      { id: 'hw12_v2', q: "12. Les ___ los ríos.", ans: "gustan" },
                      { id: 'hw13_v2', q: "13. Me ___ escribir.", ans: "gusta" },
                      { id: 'hw14_v2', q: "14. Te ___ las flores.", ans: "gustan" },
                      { id: 'hw15_v2', q: "15. Le ___ el deporte.", ans: "gusta" },
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
        © 2026 AG Academy · GUSTAR V1.2
      </footer>
    </div>
  )
}
