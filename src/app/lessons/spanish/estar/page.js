'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function EstarLessonPage() {
  const lessonId = 'spa_estar'
  // CW: 20 items (6 conjugation + 6 SER vs ESTAR + 5 prepositions + 3 translation)
  // HW: 15 items per variant
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

            {/* Card 2: Prepositions of Place */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                <Info size={20} className="text-blue-500" /> Предлоги места (Preposiciones de lugar)
              </h3>
              <p className="mb-6 leading-relaxed text-slate-600">
                ESTAR часто используется с предлогами для описания местоположения объектов.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 block mb-2">en</strong>
                  <p className="text-slate-600 text-sm">в, на</p>
                  <p className="text-slate-500 text-xs italic mt-1">El libro está en la mesa.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 block mb-2">sobre</strong>
                  <p className="text-slate-600 text-sm">на (поверх)</p>
                  <p className="text-slate-500 text-xs italic mt-1">El gato está sobre la silla.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 block mb-2">debajo de</strong>
                  <p className="text-slate-600 text-sm">под</p>
                  <p className="text-slate-500 text-xs italic mt-1">El perro está debajo de la mesa.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 block mb-2">al lado de</strong>
                  <p className="text-slate-600 text-sm">рядом с</p>
                  <p className="text-slate-500 text-xs italic mt-1">Estoy al lado de María.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 block mb-2">delante de</strong>
                  <p className="text-slate-600 text-sm">перед</p>
                  <p className="text-slate-500 text-xs italic mt-1">Estoy delante de la puerta.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 block mb-2">detrás de</strong>
                  <p className="text-slate-600 text-sm">за, позади</p>
                  <p className="text-slate-500 text-xs italic mt-1">El coche está detrás de la casa.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 block mb-2">cerca de</strong>
                  <p className="text-slate-600 text-sm">близко к</p>
                  <p className="text-slate-500 text-xs italic mt-1">La escuela está cerca de mi casa.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <strong className="text-blue-600 block mb-2">lejos de</strong>
                  <p className="text-slate-600 text-sm">далеко от</p>
                  <p className="text-slate-500 text-xs italic mt-1">Madrid está lejos de Barcelona.</p>
                </div>
              </div>
            </div>

            {/* Card 3: Temporary States */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500"></div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                <Star size={20} className="text-purple-500" /> Временные состояния (Estados temporales)
              </h3>
              <p className="mb-6 leading-relaxed text-slate-600">
                ESTAR используется для описания временных эмоций и физических состояний.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-bold text-purple-600 mb-3 text-sm uppercase tracking-wider">Эмоции</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li><strong>feliz</strong> — счастливый</li>
                    <li><strong>triste</strong> — грустный</li>
                    <li><strong>enojado</strong> — злой</li>
                    <li><strong>nervioso</strong> — нервный</li>
                    <li><strong>tranquilo</strong> — спокойный</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-purple-600 mb-3 text-sm uppercase tracking-wider">Физические</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li><strong>cansado</strong> — уставший</li>
                    <li><strong>enfermo</strong> — больной</li>
                    <li><strong>ocupado</strong> — занятый</li>
                    <li><strong>libre</strong> — свободный</li>
                    <li><strong>listo</strong> — готовый</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-purple-600 mb-3 text-sm uppercase tracking-wider">Примеры</h4>
                  <ul className="space-y-2 text-xs text-slate-500 italic">
                    <li>Estoy feliz hoy.</li>
                    <li>Estás muy cansado.</li>
                    <li>Ella está enferma.</li>
                    <li>Estamos ocupados.</li>
                    <li>¿Estás listo?</li>
                  </ul>
                </div>
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

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №2: Местоположение = ESTAR</div>
                  <p className="text-slate-300 text-sm mb-4">Для описания местоположения ВСЕГДА используется ESTAR, даже если это постоянное место.</p>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2">Madrid está en España. <span className="text-slate-400">(Мадрид находится в Испании)</span></p>
                    <p className="text-white text-sm">Estoy en casa. <span className="text-slate-400">(Я дома)</span></p>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №3: Прилагательные меняют значение</div>
                  <p className="text-slate-300 text-sm mb-4">Некоторые прилагательные имеют разное значение с SER и ESTAR.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-lg">
                      <strong className="text-rose-400 block mb-2">ser listo</strong>
                      <p className="text-white text-sm">умный (характеристика)</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg">
                      <strong className="text-emerald-400 block mb-2">estar listo</strong>
                      <p className="text-white text-sm">готовый (состояние)</p>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-lg">
                      <strong className="text-rose-400 block mb-2">ser aburrido</strong>
                      <p className="text-white text-sm">скучный (человек)</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg">
                      <strong className="text-emerald-400 block mb-2">estar aburrido</strong>
                      <p className="text-white text-sm">скучающий (состояние)</p>
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
            {/* Block 1: ESTAR Conjugation */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Блок 1: Формы ESTAR (6 упражнений)
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw1', q: "1. Yo ___ en el parque.", opts: ['estoy', 'estás', 'está'], ans: 'estoy' },
                  { id: 'cw2', q: "2. ¿Dónde ___ tú?", opts: ['estoy', 'estás', 'está'], ans: 'estás' },
                  { id: 'cw3', q: "3. Ella ___ en casa.", opts: ['estoy', 'estás', 'está'], ans: 'está' },
                  { id: 'cw4', q: "4. Nosotros ___ cansados.", opts: ['estamos', 'estáis', 'están'], ans: 'estamos' },
                  { id: 'cw5', q: "5. Vosotros ___ ocupados.", opts: ['estamos', 'estáis', 'están'], ans: 'estáis' },
                  { id: 'cw6', q: "6. Ellos ___ en Madrid.", opts: ['estamos', 'estáis', 'están'], ans: 'están' },
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

            {/* Block 2: SER vs ESTAR */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div> Блок 2: SER vs ESTAR (6 упражнений)
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw7', q: "1. María ___ profesora.", opts: ['es', 'está'], ans: 'es' },
                  { id: 'cw8', q: "2. María ___ enferma hoy.", opts: ['es', 'está'], ans: 'está' },
                  { id: 'cw9', q: "3. El libro ___ interesante.", opts: ['es', 'está'], ans: 'es' },
                  { id: 'cw10', q: "4. El libro ___ sobre la mesa.", opts: ['es', 'está'], ans: 'está' },
                  { id: 'cw11', q: "5. Yo ___ alto.", opts: ['soy', 'estoy'], ans: 'soy' },
                  { id: 'cw12', q: "6. Yo ___ cansado.", opts: ['soy', 'estoy'], ans: 'estoy' },
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

            {/* Block 3: Prepositions */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Блок 3: Предлоги места (5 упражнений)
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw13', q: "1. El gato está ___ la mesa.", opts: ['sobre', 'debajo de', 'cerca de'], ans: 'sobre' },
                  { id: 'cw14', q: "2. El perro está ___ la silla.", opts: ['sobre', 'debajo de', 'al lado de'], ans: 'debajo de' },
                  { id: 'cw15', q: "3. Estoy ___ María.", opts: ['al lado de', 'lejos de', 'detrás de'], ans: 'al lado de' },
                  { id: 'cw16', q: "4. La escuela está ___ mi casa.", opts: ['cerca de', 'debajo de', 'sobre'], ans: 'cerca de' },
                  { id: 'cw17', q: "5. El coche está ___ la casa.", opts: ['delante de', 'en', 'sobre'], ans: 'delante de' },
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

            {/* Block 4: Translation */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div> Блок 4: Перевод (3 упражнения)
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw18', q: "1. Я в школе.", ans: 'Estoy en la escuela' },
                  { id: 'cw19', q: "2. Они устали.", ans: 'Están cansados' },
                  { id: 'cw20', q: "3. Мы счастливы.", ans: 'Estamos felices' },
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
                      { id: 'hw5', q: "5. Ellos ___ cansados.", ans: "están" },
                      { id: 'hw6', q: "6. María ___ estudiante.", opts: ['es', 'está'], ans: "es" },
                      { id: 'hw7', q: "7. María ___ triste.", opts: ['es', 'está'], ans: "está" },
                      { id: 'hw8', q: "8. El libro ___ nuevo.", opts: ['es', 'está'], ans: "es" },
                      { id: 'hw9', q: "9. El libro ___ en la mesa.", opts: ['es', 'está'], ans: "está" },
                      { id: 'hw10', q: "10. Yo ___ inteligente.", opts: ['soy', 'estoy'], ans: "soy" },
                      { id: 'hw11', q: "11. El gato está ___ la cama.", opts: ['sobre', 'debajo de', 'cerca de'], ans: "sobre" },
                      { id: 'hw12', q: "12. La escuela está ___ mi casa.", opts: ['cerca de', 'lejos de', 'sobre'], ans: "cerca de" },
                      { id: 'hw13', q: "13. Estoy ___ la puerta.", opts: ['delante de', 'debajo de', 'sobre'], ans: "delante de" },
                      { id: 'hw14', q: "14. Я дома.", ans: "Estoy en casa" },
                      { id: 'hw15', q: "15. Они счастливы.", ans: "Están felices" },
                    ].map((ex) => (
                      <Exercise
                        key={ex.id}
                        id={ex.id}
                        mode="hw"
                        type={ex.opts ? "dropdown" : "text"}
                        label={ex.q}
                        placeholder={ex.opts ? undefined : "Enter answer"}
                        options={ex.opts}
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
                      { id: 'hw5_v2', q: "5. Ellas ___ nerviosas.", ans: "están" },
                      { id: 'hw6_v2', q: "6. Pedro ___ médico.", opts: ['es', 'está'], ans: "es" },
                      { id: 'hw7_v2', q: "7. Pedro ___ ocupado.", opts: ['es', 'está'], ans: "está" },
                      { id: 'hw8_v2', q: "8. La casa ___ grande.", opts: ['es', 'está'], ans: "es" },
                      { id: 'hw9_v2', q: "9. La casa ___ cerca del parque.", opts: ['es', 'está'], ans: "está" },
                      { id: 'hw10_v2', q: "10. Tú ___ simpático.", opts: ['eres', 'estás'], ans: "eres" },
                      { id: 'hw11_v2', q: "11. El perro está ___ la mesa.", opts: ['sobre', 'debajo de', 'cerca de'], ans: "debajo de" },
                      { id: 'hw12_v2', q: "12. Madrid está ___ Barcelona.", opts: ['cerca de', 'lejos de', 'sobre'], ans: "lejos de" },
                      { id: 'hw13_v2', q: "13. El coche está ___ la casa.", opts: ['delante de', 'debajo de', 'sobre'], ans: "delante de" },
                      { id: 'hw14_v2', q: "14. Я в школе.", ans: "Estoy en la escuela" },
                      { id: 'hw15_v2', q: "15. Мы устали.", ans: "Estamos cansados" },
                    ].map((ex) => (
                      <Exercise
                        key={ex.id}
                        id={ex.id}
                        mode="hw"
                        type={ex.opts ? "dropdown" : "text"}
                        label={ex.q}
                        placeholder={ex.opts ? undefined : "Enter answer"}
                        options={ex.opts}
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
