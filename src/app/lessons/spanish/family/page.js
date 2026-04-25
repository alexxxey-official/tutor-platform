'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function FamilyLessonPage() {
  const lessonId = 'spa_family'
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
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
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
      <header className="bg-rose-600 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10 uppercase">FAMILIA</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-rose-800 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 8 · Vocabulario A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            La <span className="text-amber-300 italic">Familia</span>
          </h1>
          <p className="text-rose-100 text-lg max-w-2xl mx-auto font-medium">
            Учим слова о семье и внешности! Рассказываем о родственниках по-испански. 👨‍👩‍👧‍👦
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
          <div className="flex items-center gap-3 text-rose-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Teoría <div className="h-[2px] w-12 bg-rose-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Vocabulario: La Familia</h2>

          <div className="grid gap-6">
            {/* Card 1: Family Members */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Info size={20} className="text-rose-500" /> Члены семьи
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-rose-600 font-mono text-lg">padre</strong>
                  <p className="text-sm text-slate-700 mt-1">отец</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-rose-600 font-mono text-lg">madre</strong>
                  <p className="text-sm text-slate-700 mt-1">мать</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-rose-600 font-mono text-lg">hermano</strong>
                  <p className="text-sm text-slate-700 mt-1">брат</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-rose-600 font-mono text-lg">hermana</strong>
                  <p className="text-sm text-slate-700 mt-1">сестра</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-rose-600 font-mono text-lg">hijo</strong>
                  <p className="text-sm text-slate-700 mt-1">сын</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-rose-600 font-mono text-lg">hija</strong>
                  <p className="text-sm text-slate-700 mt-1">дочь</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-rose-600 font-mono text-lg">abuelo</strong>
                  <p className="text-sm text-slate-700 mt-1">дедушка</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-rose-600 font-mono text-lg">abuela</strong>
                  <p className="text-sm text-slate-700 mt-1">бабушка</p>
                </div>
              </div>
            </div>

            {/* Card 2: Appearance */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Star size={20} className="text-amber-500" /> Внешность
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-amber-600 font-mono text-lg">alto/a</strong>
                  <p className="text-sm text-slate-700 mt-1">высокий/ая</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-amber-600 font-mono text-lg">bajo/a</strong>
                  <p className="text-sm text-slate-700 mt-1">низкий/ая</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-amber-600 font-mono text-lg">guapo/a</strong>
                  <p className="text-sm text-slate-700 mt-1">красивый/ая</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-amber-600 font-mono text-lg">joven</strong>
                  <p className="text-sm text-slate-700 mt-1">молодой</p>
                </div>
              </div>
            </div>

            {/* Las Reglas */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-8 text-rose-400 unbounded text-center flex justify-center items-center gap-3">
                <AlertTriangle size={28} /> LAS REGLAS (ПРАВИЛА)
              </h3>

              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №1: Род прилагательных</div>
                  <p className="text-slate-300 text-sm mb-3">Прилагательные согласуются с существительным по роду и числу.</p>
                  <div className="bg-black/30 p-4 rounded-lg font-mono text-sm space-y-1">
                    <p className="text-emerald-400">Mi padre es alto. (мужской род)</p>
                    <p className="text-emerald-400">Mi madre es alta. (женский род)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-rose-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Práctica <div className="h-[2px] w-12 bg-rose-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-slate-900">Classwork</h2>
          <p className="text-slate-500 mb-8">Тренируем слова о семье.</p>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div> Блок 1: Vocabulario
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw1', q: "1. El ___ de mi madre es mi abuelo. (отец)", ans: 'padre' },
                  { id: 'cw2', q: "2. La ___ de mi padre es mi tía. (сестра)", ans: 'hermana' },
                  { id: 'cw3', q: "3. Mi ___ es muy alto. (брат)", ans: 'hermano' },
                  { id: 'cw4', q: "4. Mi ___ tiene 60 años. (бабушка)", ans: 'abuela' },
                  { id: 'cw5', q: "5. Tengo dos ___. (сыновья)", ans: 'hijos' },
                  { id: 'cw6', q: "6. Mi madre es muy ___. (красивая)", ans: 'guapa' },
                  { id: 'cw7', q: "7. Mi hermano es ___. (молодой)", ans: 'joven' },
                  { id: 'cw8', q: "8. Mi padre es ___. (высокий)", ans: 'alto' },
                  { id: 'cw9', q: "9. Tengo una ___ pequeña. (дочь)", ans: 'hija' },
                  { id: 'cw10', q: "10. Mi ___ es doctor. (дедушка)", ans: 'abuelo' },
                  { id: 'cw11', q: "11. Mi ___ es profesora. (мама)", ans: 'madre' },
                  { id: 'cw12', q: "12. El hijo de mi hermano es mi ___. (племянник)", ans: 'sobrino' },
                  { id: 'cw13', q: "13. Mi ___ es rubia. (жена)", ans: 'esposa' },
                  { id: 'cw14', q: "14. Mi ___ trabaja en un banco. (муж)", ans: 'esposo' },
                  { id: 'cw15', q: "15. Tengo tres ___. (внуки)", ans: 'nietos' },
                  { id: 'cw16', q: "16. Mi hermana es muy ___. (умная)", ans: 'inteligente' },
                  { id: 'cw17', q: "17. Mi padre es ___. (старый)", ans: 'viejo' },
                  { id: 'cw18', q: "18. Mi ___ es morena. (тетя)", ans: 'tía' },
                  { id: 'cw19', q: "19. El hermano de mi padre es mi ___. (дядя)", ans: 'tío' },
                  { id: 'cw20', q: "20. Mi familia es muy ___. (большая)", ans: 'grande' },
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
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl border-t-8 border-rose-600">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black unbounded uppercase text-rose-400">
                  Homework {variant === 2 && <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white align-middle ml-4">Variant 2</span>}
                </h2>
              </div>

              <p className="text-slate-400 mb-12 max-w-xl">
                {variant === 1
                  ? "Самостоятельная практика. Впишите правильное слово о семье."
                  : "Второй шанс! Решите новые задания."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <div className="space-y-4">
                    {[
                      { id: 'hw1', q: "1. Mi ___ es profesora. (мать)", ans: "madre" },
                      { id: 'hw2', q: "2. Tengo un ___ mayor. (брат)", ans: "hermano" },
                      { id: 'hw3', q: "3. Mi ___ trabaja en un banco. (отец)", ans: "padre" },
                      { id: 'hw4', q: "4. Mi ___ tiene 5 años. (дочь)", ans: "hija" },
                      { id: 'hw5', q: "5. Mi ___ es muy vieja. (бабушка)", ans: "abuela" },
                      { id: 'hw6', q: "6. Tengo dos ___. (сестры)", ans: "hermanas" },
                      { id: 'hw7', q: "7. Mi ___ es ingeniero. (дедушка)", ans: "abuelo" },
                      { id: 'hw8', q: "8. Mi hermana es muy ___. (красивая)", ans: "guapa" },
                      { id: 'hw9', q: "9. Mi padre es ___. (высокий)", ans: "alto" },
                      { id: 'hw10', q: "10. Mi hermano es ___. (молодой)", ans: "joven" },
                      { id: 'hw11', q: "11. Tengo tres ___. (сыновья)", ans: "hijos" },
                      { id: 'hw12', q: "12. Mi madre es ___. (низкая)", ans: "baja" },
                      { id: 'hw13', q: "13. Mi ___ menor tiene 3 años. (сын)", ans: "hijo" },
                      { id: 'hw14', q: "14. Mi ___ es enfermera. (сестра)", ans: "hermana" },
                      { id: 'hw15', q: "15. Mis ___ viven en Madrid. (родители)", ans: "padres" },
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
                      { id: 'hw1_v2', q: "1. Mi ___ es doctor. (отец)", ans: "padre" },
                      { id: 'hw2_v2', q: "2. Tengo una ___ pequeña. (сестра)", ans: "hermana" },
                      { id: 'hw3_v2', q: "3. Mi ___ cocina muy bien. (мать)", ans: "madre" },
                      { id: 'hw4_v2', q: "4. Mi ___ tiene 8 años. (сын)", ans: "hijo" },
                      { id: 'hw5_v2', q: "5. Mi ___ tiene 80 años. (дедушка)", ans: "abuelo" },
                      { id: 'hw6_v2', q: "6. Tengo dos ___. (братья)", ans: "hermanos" },
                      { id: 'hw7_v2', q: "7. Mi ___ es muy amable. (бабушка)", ans: "abuela" },
                      { id: 'hw8_v2', q: "8. Mi padre es muy ___. (красивый)", ans: "guapo" },
                      { id: 'hw9_v2', q: "9. Mi hermana es ___. (высокая)", ans: "alta" },
                      { id: 'hw10_v2', q: "10. Mi madre es ___. (молодая)", ans: "joven" },
                      { id: 'hw11_v2', q: "11. Tengo dos ___. (дочери)", ans: "hijas" },
                      { id: 'hw12_v2', q: "12. Mi hermano es ___. (низкий)", ans: "bajo" },
                      { id: 'hw13_v2', q: "13. Mi ___ mayor estudia medicina. (дочь)", ans: "hija" },
                      { id: 'hw14_v2', q: "14. Mi ___ trabaja en casa. (брат)", ans: "hermano" },
                      { id: 'hw15_v2', q: "15. Mis ___ son profesores. (родители)", ans: "padres" },
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
        © 2026 AG Academy · La Familia V1.2
      </footer>
    </div>
  )
}
