'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle, PlayCircle } from 'lucide-react'
import Link from 'next/link'

export default function ArticlesLessonPage() {
  const lessonId = 'spa_articles'
  // CW: 30 items
  // HW: 20 items per variant
  const totalCW = 30
  const totalHW = 20
  
  const { progress, updateProgress, resetHW, variant, getStats, loading } = 
    useLessonProgress(lessonId, totalCW, totalHW)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (loading || !mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
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
        <div className="absolute top-0 right-0 text-[100px] md:text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10 uppercase">GÉNERO</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-rose-800 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 3 · Gramática A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            Artículos y <span className="text-amber-300 italic">Género</span>
          </h1>
          <p className="text-rose-100 text-lg max-w-2xl mx-auto font-medium">
            В испанском у каждого предмета есть пол! Учимся определять род существительных, ставить артикли и не путать мужское с женским. 🍷
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
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Мужчины на О, Женщины на А</h2>
          
          <div className="grid gap-6">
            {/* Card 1: Masculine vs Feminine */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Info size={20} className="text-blue-500" /> Шаг 1: Определяем род (Género)
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                В испанском языке нет среднего рода для предметов. Все существительные делятся на две команды: <strong>Мужской род (Masculino)</strong> и <strong>Женский род (Femenino)</strong>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-blue-200 pb-3">
                    <span className="text-3xl">👨🏽</span>
                    <strong className="text-blue-700 text-lg uppercase tracking-widest unbounded">Masculino</strong>
                  </div>
                  <ul className="space-y-3 text-blue-900">
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Заканчиваются на <strong>-o</strong> (chico, libro)</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Дни недели и месяцы (lunes, abril)</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Реки, горы, моря</li>
                  </ul>
                </div>
                
                <div className="bg-rose-50/50 p-6 rounded-xl border border-rose-100 flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-rose-200 pb-3">
                    <span className="text-3xl">👩🏽</span>
                    <strong className="text-rose-700 text-lg uppercase tracking-widest unbounded">Femenino</strong>
                  </div>
                  <ul className="space-y-3 text-rose-900">
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400"></div>Заканчиваются на <strong>-a</strong> (chica, mesa)</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400"></div>Окончания <strong>-ción, -sión</strong> (canción, televisión)</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400"></div>Окончания <strong>-dad, -tad, -tud</strong> (ciudad, libertad, juventud)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2: Articles Table */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Star size={20} className="text-amber-500" /> Шаг 2: Артикли (Artículos)
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                Артикль — это "бейджик" слова, который ставится перед ним. Он показывает род (М/Ж), число (ед./мн.) и конкретность (знаком нам предмет или нет).
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 font-black text-slate-400 uppercase tracking-wider">Тип</th>
                      <th className="text-left py-3 font-black text-blue-600 uppercase tracking-wider">Мужской Ед.</th>
                      <th className="text-left py-3 font-black text-rose-600 uppercase tracking-wider">Женский Ед.</th>
                      <th className="text-left py-3 font-black text-blue-600 uppercase tracking-wider">Мужской Мн.</th>
                      <th className="text-left py-3 font-black text-rose-600 uppercase tracking-wider">Женский Мн.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4">
                        <strong className="text-slate-800">Определенный</strong><br/>
                        <span className="text-xs text-slate-500">Конкретный, известный предмет (тот самый)</span>
                      </td>
                      <td className="py-4 font-black text-blue-600 text-lg">el</td>
                      <td className="py-4 font-black text-rose-600 text-lg">la</td>
                      <td className="py-4 font-black text-blue-600 text-lg">los</td>
                      <td className="py-4 font-black text-rose-600 text-lg">las</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4">
                        <strong className="text-slate-800">Неопределенный</strong><br/>
                        <span className="text-xs text-slate-500">Один из многих, впервые упоминается</span>
                      </td>
                      <td className="py-4 font-black text-blue-600 text-lg">un</td>
                      <td className="py-4 font-black text-rose-600 text-lg">una</td>
                      <td className="py-4 font-black text-blue-600 text-lg">unos</td>
                      <td className="py-4 font-black text-rose-600 text-lg">unas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 3: Las Reglas (Exceptions & Strict Rules) */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-8 text-rose-500 unbounded text-center flex justify-center items-center gap-3">
                <AlertTriangle size={28} /> LAS REGLAS (ИСКЛЮЧЕНИЯ)
              </h3>
              
              <div className="space-y-6">
                {/* Rule 1 */}
                <div className="bg-white/5 p-6 rounded-xl border border-rose-500/30">
                  <div className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №1: Трансгендеры (Слова-исключения)</div>
                  <p className="text-slate-300 text-sm mb-4">Некоторые слова притворяются другим родом. Их нужно просто выучить наизусть!</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-500/20">
                      <strong className="text-blue-400 block mb-2">Оканчиваются на -a, но МУЖСКИЕ:</strong>
                      <ul className="text-slate-300 font-mono text-sm space-y-1">
                        <li><span className="text-blue-400 font-bold">el</span> día (день)</li>
                        <li><span className="text-blue-400 font-bold">el</span> mapa (карта)</li>
                        <li><span className="text-blue-400 font-bold">el</span> problema (проблема)</li>
                        <li><span className="text-blue-400 font-bold">el</span> sofá (диван)</li>
                        <li><span className="text-blue-400 font-bold">el</span> planeta (планета)</li>
                        <li>*Многие слова на -ma, -pa, -ta (греческого происхождения).</li>
                      </ul>
                    </div>
                    <div className="bg-rose-900/50 p-4 rounded-lg border border-rose-500/20">
                      <strong className="text-rose-400 block mb-2">Оканчиваются на -o, но ЖЕНСКИЕ:</strong>
                      <ul className="text-slate-300 font-mono text-sm space-y-1">
                        <li><span className="text-rose-400 font-bold">la</span> mano (рука, кисть)</li>
                        <li><span className="text-rose-400 font-bold">la</span> foto(grafía) (фотография)</li>
                        <li><span className="text-rose-400 font-bold">la</span> moto(cicleta) (мотоцикл)</li>
                        <li><span className="text-rose-400 font-bold">la</span> radio (радио)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №2: Вода и Орлы (El Agua)</div>
                  <p className="text-slate-300 text-sm mb-3">Если существительное <strong className="text-rose-400">женского рода</strong> начинается с ударной буквы <strong>A</strong> (или <strong>HA</strong>), то в единственном числе оно получает мужской артикль <strong className="text-blue-400">EL / UN</strong>, чтобы избежать слияния двух звуков "А".</p>
                  <ul className="text-sm text-slate-400 space-y-2 font-mono bg-black/30 p-4 rounded-lg">
                    <li><span className="line-through text-rose-400 opacity-50">la a</span>gua {'->'} <strong className="text-emerald-400">el agua</strong> (вода)</li>
                    <li><span className="line-through text-rose-400 opacity-50">una á</span>guila {'->'} <strong className="text-emerald-400">un águila</strong> (орёл)</li>
                    <li><span className="line-through text-rose-400 opacity-50">la ha</span>cha {'->'} <strong className="text-emerald-400">el hacha</strong> (топор)</li>
                    <li className="mt-2 text-rose-300 italic">*Во множественном числе артикль возвращается к женскому: <strong className="text-rose-400 font-bold">las</strong> aguas.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cheat Sheet */}
            <div className="bg-amber-50 p-8 rounded-2xl border-2 border-amber-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-900 unbounded uppercase">
                ¡OJO! (Множественное число)
              </h3>
              <p className="text-amber-800 mb-4 font-medium">Как сделать из одного предмета много? (Plural)</p>
              <ul className="space-y-3 text-amber-900 font-medium">
                <li className="flex items-center gap-3">
                  <span className="bg-rose-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm">1</span>
                  Если слово оканчивается на <strong>гласную (a, e, i, o, u)</strong> ➡️ добавляем <strong>-S</strong> <span className="text-amber-700/80 font-normal italic ml-2">(el chico {'->'} los chico<strong className="text-rose-600">s</strong>)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-rose-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm">2</span>
                  Если слово оканчивается на <strong>согласную</strong> ➡️ добавляем <strong>-ES</strong> <span className="text-amber-700/80 font-normal italic ml-2">(el doctor {'->'} los doctor<strong className="text-rose-600">es</strong>)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-rose-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-black shadow-sm">3</span>
                  Если оканчивается на <strong>Z</strong> ➡️ меняем Z на C и добавляем <strong>-ES</strong> <span className="text-amber-700/80 font-normal italic ml-2">(el lápiz {'->'} los lápi<strong className="text-rose-600">ces</strong>)</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-rose-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Práctica <div className="h-[2px] w-12 bg-rose-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-slate-900">Classwork</h2>
          <p className="text-slate-500 mb-8">Тренируем артикли и учимся определять род слов с первого взгляда. ¡Vamos!</p>

          <div className="space-y-12">
            {/* Block 1: El / La (Definite Articles) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Блок 1: El или La? (Определенные артикли)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'cw1', q: "____ chico (мальчик)", ans: 'el', opts: ['el', 'la'] },
                  { id: 'cw2', q: "____ chica (девочка)", ans: 'la', opts: ['el', 'la'] },
                  { id: 'cw3', q: "____ libro (книга)", ans: 'el', opts: ['el', 'la'] },
                  { id: 'cw4', q: "____ mesa (стол)", ans: 'la', opts: ['el', 'la'] },
                  { id: 'cw5', q: "____ perro (собака)", ans: 'el', opts: ['el', 'la'] },
                  { id: 'cw6', q: "____ gata (кошка)", ans: 'la', opts: ['el', 'la'] },
                  { id: 'cw7', q: "____ casa (дом)", ans: 'la', opts: ['el', 'la'] },
                  { id: 'cw8', q: "____ amigo (друг)", ans: 'el', opts: ['el', 'la'] },
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

            {/* Block 2: Un / Una / Unos / Unas (Indefinite Articles) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Блок 2: Неопределенные артикли (Un, Una, Unos, Unas)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'cw9', q: "____ ordenador (один компьютер)", ans: 'un', opts: ['un', 'una', 'unos', 'unas'] },
                  { id: 'cw10', q: "____ amigas (какие-то подруги)", ans: 'unas', opts: ['un', 'una', 'unos', 'unas'] },
                  { id: 'cw11', q: "____ coches (какие-то машины, м.р.)", ans: 'unos', opts: ['un', 'una', 'unos', 'unas'] },
                  { id: 'cw12', q: "____ flor (один цветок, ж.р.)", ans: 'una', opts: ['un', 'una', 'unos', 'unas'] },
                  { id: 'cw13', q: "____ ciudad (один город, ж.р.)", ans: 'una', opts: ['un', 'una', 'unos', 'unas'] },
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

            {/* Block 3: Los Secretos / Excepciones (Text Input) */}
            <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-rose-900">Блок 3: Исключения! (Впишите el или la)</h3>
              <p className="text-sm text-rose-700 mb-6">Вспомните "трансгендеров" и правило "El agua". Впишите определенный артикль.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'cw14', word: "día (день)", ans: "el" },
                  { id: 'cw15', word: "mano (рука)", ans: "la" },
                  { id: 'cw16', word: "problema (проблема)", ans: "el" },
                  { id: 'cw17', word: "agua (вода)", ans: "el" },
                  { id: 'cw18', word: "foto (фото)", ans: "la" },
                  { id: 'cw19', word: "mapa (карта)", ans: "el" },
                  { id: 'cw20', word: "televisión (ТВ)", ans: "la" },
                  { id: 'cw21', word: "canción (песня)", ans: "la" },
                ].map((ex, i) => (
                  <div key={ex.id} className="flex items-center gap-3 text-slate-900 font-bold text-lg bg-white p-3 rounded-xl shadow-sm border border-rose-200">
                    <span className="text-sm text-rose-400 font-mono min-w-[24px]">{i+14}.</span>
                    <div className="w-24">
                      <Exercise id={ex.id} mode="cw" placeholder="..." correctAnswer={ex.ans} progressItem={progress.cw?.[ex.id]} onUpdate={updateProgress} variant="inline" />
                    </div>
                    <span>{ex.word}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 4: Pluralization (Gap-fills) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Блок 4: Сделайте множественное число</h3>
              <p className="text-sm text-slate-500 mb-6">Измените артикль и добавьте окончание -s или -es к слову.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'cw22', q: "el perro {'->'}", ans: "los perros" },
                  { id: 'cw23', q: "la casa {'->'}", ans: "las casas" },
                  { id: 'cw24', q: "el hotel {'->'}", ans: "los hoteles" },
                  { id: 'cw25', q: "la flor {'->'}", ans: "las flores" },
                  { id: 'cw26', q: "el lápiz {'->'}", ans: "los lápices" },
                ].map((ex, i) => (
                  <Exercise
                    key={ex.id}
                    id={ex.id}
                    mode="cw"
                    type="text"
                    label={`${i+22}. ${ex.q}`}
                    correctAnswer={ex.ans}
                    placeholder="Enter answer"
                    progressItem={progress.cw?.[ex.id]}
                    onUpdate={updateProgress}
                  />
                ))}
              </div>
            </div>

            {/* Block 5: Context Logic */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 unbounded text-amber-400">Блок 5: Контекст</h3>
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-white font-bold text-lg border-b border-slate-700 pb-6">
                  <span className="text-sm text-slate-400 w-full mb-2 uppercase tracking-widest font-mono">27. (Девушки пьют воду)</span>
                  <span>Las chicas beben</span>
                  <div className="w-24">
                    <Exercise id="cw27" mode="cw" placeholder="el/la" correctAnswer="el" progressItem={progress.cw?.cw27} onUpdate={updateProgress} variant="inline" />
                  </div>
                  <span>agua.</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-white font-bold text-lg border-b border-slate-700 pb-6">
                  <span className="text-sm text-slate-400 w-full mb-2 uppercase tracking-widest font-mono">28. (Это хорошая песня)</span>
                  <span>Es</span>
                  <div className="w-24">
                    <Exercise id="cw28" mode="cw" placeholder="un/una" correctAnswer="una" progressItem={progress.cw?.cw28} onUpdate={updateProgress} variant="inline" />
                  </div>
                  <span>buena canción.</span>
                </div>
                
                <Exercise
                  id="cw29"
                  mode="cw"
                  type="mcq"
                  label="29. Почему мы говорим 'EL agua', но 'LAS aguas'?"
                  options={["Потому что вода меняет пол.", "В ед.ч. 'el' ставится для благозвучия (чтобы 'a' не сливались), а во мн.ч. этой проблемы нет ('las aguas').", "Это просто исключение, логики нет."]}
                  correctAnswer="В ед.ч. 'el' ставится для благозвучия (чтобы 'a' не сливались), а во мн.ч. этой проблемы нет ('las aguas')."
                  progressItem={progress.cw?.cw29}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="cw30"
                  mode="cw"
                  type="mcq"
                  label="30. Слово 'mapa' (карта) мужского или женского рода?"
                  options={["Мужского (el mapa)", "Женского (la mapa)", "Среднего (lo mapa)"]}
                  correctAnswer="Мужского (el mapa)"
                  progressItem={progress.cw?.cw30}
                  onUpdate={updateProgress}
                />
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
                <h2 className="text-3xl font-black unbounded uppercase text-rose-500">
                  Homework {variant === 2 && <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white align-middle ml-4">Variant 2</span>}
                </h2>
              </div>
              
              <p className="text-slate-400 mb-12 max-w-xl">
                {variant === 1 
                  ? "Самостоятельная практика. Впишите правильный артикль. Следите за родом и числом. Помните про исключения!"
                  : "Второй шанс! Решите новые задания. Обратите внимание на окончания слов и слова-исключения."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <>
                    {/* VARIANT 1 - 20 ITEMS */}
                    <div className="space-y-8">
                      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-6">Часть 1: Определенные артикли (el, la, los, las)</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
                            { id: 'hw1', pre: "1.", post: "mundo (мир)", ans: "el" },
                            { id: 'hw2', pre: "2.", post: "puerta (дверь)", ans: "la" },
                            { id: 'hw3', pre: "3.", post: "estudiantes (студенты, м.р.)", ans: "los" },
                            { id: 'hw4', pre: "4.", post: "madres (матери)", ans: "las" },
                            { id: 'hw5', pre: "5.", post: "mano (рука - искл.)", ans: "la" },
                            { id: 'hw6', pre: "6.", post: "día (день - искл.)", ans: "el" },
                            { id: 'hw7', pre: "7.", post: "ciudad (город)", ans: "la" },
                            { id: 'hw8', pre: "8.", post: "profesor (учитель)", ans: "el" },
                          ].map((ex) => (
                            <div key={ex.id} className="flex flex-wrap items-center gap-3 text-white font-bold text-lg">
                              <span>{ex.pre}</span>
                              <div className="w-24">
                                <Exercise id={ex.id} mode="hw" placeholder="el/la..." correctAnswer={ex.ans} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="truncate">{ex.post}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-6">Часть 2: Неопределенные артикли (un, una, unos, unas)</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
                            { id: 'hw9', pre: "9.", post: "coche", ans: "un" },
                            { id: 'hw10', pre: "10.", post: "niña", ans: "una" },
                            { id: 'hw11', pre: "11.", post: "problema", ans: "un" },
                            { id: 'hw12', pre: "12.", post: "fotos", ans: "unas" },
                            { id: 'hw13', pre: "13.", post: "libros", ans: "unos" },
                          ].map((ex) => (
                            <div key={ex.id} className="flex flex-wrap items-center gap-3 text-white font-bold text-lg">
                              <span>{ex.pre}</span>
                              <div className="w-24">
                                <Exercise id={ex.id} mode="hw" placeholder="un/una..." correctAnswer={ex.ans} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="truncate">{ex.post}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6">Часть 3: Множественное число (Напишите слово с определенным артиклем)</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
                            { id: 'hw14', q: "14. el gato {'->'}", ans: "los gatos" },
                            { id: 'hw15', q: "15. la habitación {'->'}", ans: "las habitaciones" },
                            { id: 'hw16', q: "16. el televisor {'->'}", ans: "los televisores" },
                            { id: 'hw17', q: "17. el pez {'->'}", ans: "los peces" },
                            { id: 'hw18', q: "18. la actriz {'->'}", ans: "las actrices" },
                            { id: 'hw19', q: "19. la verdad {'->'}", ans: "las verdades" },
                            { id: 'hw20', q: "20. el agua {'->'}", ans: "las aguas" },
                          ].map(ex => (
                            <Exercise key={ex.id} id={ex.id} mode="hw" label={ex.q} type="text" placeholder="Enter answer" correctAnswer={ex.ans} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* VARIANT 2 - 20 ITEMS */}
                    <div className="space-y-8">
                      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-6">Часть 1: Определенные артикли (el, la, los, las) [Вариант 2]</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
                            { id: 'hw1_v2', pre: "1.", post: "chico", ans: "el" },
                            { id: 'hw2_v2', pre: "2.", post: "noche", ans: "la" },
                            { id: 'hw3_v2', pre: "3.", post: "amigos", ans: "los" },
                            { id: 'hw4_v2', pre: "4.", post: "chicas", ans: "las" },
                            { id: 'hw5_v2', pre: "5.", post: "moto", ans: "la" },
                            { id: 'hw6_v2', pre: "6.", post: "planeta", ans: "el" },
                            { id: 'hw7_v2', pre: "7.", post: "universidad", ans: "la" },
                            { id: 'hw8_v2', pre: "8.", post: "hospital", ans: "el" },
                          ].map((ex) => (
                            <div key={ex.id} className="flex flex-wrap items-center gap-3 text-white font-bold text-lg">
                              <span>{ex.pre}</span>
                              <div className="w-24">
                                <Exercise id={ex.id} mode="hw" placeholder="el/la..." correctAnswer={ex.ans} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="truncate">{ex.post}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-6">Часть 2: Неопределенные артикли [Вариант 2]</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
                            { id: 'hw9_v2', pre: "9.", post: "restaurante", ans: "un" },
                            { id: 'hw10_v2', pre: "10.", post: "canción", ans: "una" },
                            { id: 'hw11_v2', pre: "11.", post: "mapa", ans: "un" },
                            { id: 'hw12_v2', pre: "12.", post: "radios", ans: "unas" },
                            { id: 'hw13_v2', pre: "13.", post: "días", ans: "unos" },
                          ].map((ex) => (
                            <div key={ex.id} className="flex flex-wrap items-center gap-3 text-white font-bold text-lg">
                              <span>{ex.pre}</span>
                              <div className="w-24">
                                <Exercise id={ex.id} mode="hw" placeholder="un/una..." correctAnswer={ex.ans} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="truncate">{ex.post}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6">Часть 3: Множественное число [Вариант 2]</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
                            { id: 'hw14_v2', q: "14. el zapato {'->'}", ans: "los zapatos" },
                            { id: 'hw15_v2', q: "15. la mujer {'->'}", ans: "las mujeres" },
                            { id: 'hw16_v2', q: "16. el león {'->'}", ans: "los leones" },
                            { id: 'hw17_v2', q: "17. el rey {'->'}", ans: "los reyes" },
                            { id: 'hw18_v2', q: "18. la luz {'->'}", ans: "las luces" },
                            { id: 'hw19_v2', q: "19. la pared {'->'}", ans: "las paredes" },
                            { id: 'hw20_v2', q: "20. el águila {'->'}", ans: "las águilas" },
                          ].map(ex => (
                            <Exercise key={ex.id} id={ex.id} mode="hw" label={ex.q} type="text" placeholder="Enter answer" correctAnswer={ex.ans} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-center text-slate-400 text-xs mt-20 unbounded opacity-50">
        © 2026 AG Academy · Artículos y Género V1.2
      </footer>
    </div>
  )
}