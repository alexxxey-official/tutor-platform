'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle, Volume2 } from 'lucide-react'
import Link from 'next/link'

export default function PhoneticsLesson() {
  const lessonId = 'spa_phonetics'
  // CW: 13 items (5 stress + 5 pronunciation + 3 silent letters)
  // HW: 10 items per variant
  const totalCW = 13
  const totalHW = 10

  const { progress, updateProgress, resetHW, variant, getStats, loading } =
    useLessonProgress(lessonId, totalCW, totalHW)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (loading || !mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
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
      <header className="bg-orange-500 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10">FONÉTICA</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-orange-700 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 1 · Fonética A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            Испанская <span className="text-amber-200 italic">Фонетика</span>
          </h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto font-medium">
            Закладываем фундамент произношения! Учим алфавит, правила чтения и ударения. 🔊
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
          <div className="flex items-center gap-3 text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Teoría <div className="h-[2px] w-12 bg-orange-500"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Испанский Алфавит</h2>
          <div className="grid gap-6">
            {/* Card 1: Alphabet */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Info size={20} className="text-orange-500" /> Блок 1: El Alfabeto Español (27 букв)
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                В испанском алфавите 27 букв, включая уникальную букву <strong className="text-orange-600">Ñ (эньe)</strong>, которой нет в других языках!
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {[
                  'A (a)', 'B (be)', 'C (ce)', 'D (de)', 'E (e)', 'F (efe)', 'G (ge)', 'H (hache)',
                  'I (i)', 'J (jota)', 'K (ka)', 'L (ele)', 'M (eme)', 'N (ene)', 'Ñ (eñe)', 'O (o)',
                  'P (pe)', 'Q (cu)', 'R (erre)', 'S (ese)', 'T (te)', 'U (u)', 'V (uve)', 'W (uve doble)',
                  'X (equis)', 'Y (i griega)', 'Z (zeta)'
                ].map((letter, idx) => (
                  <div key={idx} className="bg-orange-50 p-3 rounded-lg border border-orange-100 font-mono text-center">
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Vowels */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Volume2 size={20} className="text-amber-500" /> Блок 2: Гласные (Las Vocales)
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                В испанском всего <strong>5 гласных: A, E, I, O, U</strong>. Они произносятся <strong className="text-amber-600">четко и не редуцируются</strong>, в отличие от русского!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { letter: 'A', sound: '[а]', example: 'casa', meaning: 'дом' },
                  { letter: 'E', sound: '[э]', example: 'mesa', meaning: 'стол' },
                  { letter: 'I', sound: '[и]', example: 'piso', meaning: 'этаж' },
                  { letter: 'O', sound: '[о]', example: 'solo', meaning: 'только' },
                  { letter: 'U', sound: '[у]', example: 'luna', meaning: 'луна' }
                ].map((v, idx) => (
                  <div key={idx} className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
                    <div className="text-3xl font-black text-amber-600 mb-2">{v.letter}</div>
                    <div className="text-sm text-amber-700 font-bold mb-1">{v.sound}</div>
                    <div className="text-xs text-slate-600 italic">{v.example}</div>
                    <div className="text-xs text-slate-400">({v.meaning})</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Consonants */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Star size={20} className="text-blue-500" /> Блок 3: Согласные (Las Consonantes)
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-700">B/V</strong> — оба читаются как [б] (между гласными → [в])
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-700">C</strong> — перед e,i → [с/θ], перед a,o,u → [к]
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-700">G</strong> — перед e,i → [х], перед a,o,u → [г]
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                    <strong className="text-rose-700">H</strong> — НЕ читается! (hotel = отель)
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-700">J</strong> — [х] (jota = хота)
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-700">R</strong> — [р], в начале или RR → [рр] раскатистое
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-700">Z</strong> — [с/θ] межзубный в Испании
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-700">Ñ</strong> — [нь] (España = Эспанья)
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Special Combinations */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <AlertTriangle size={20} className="text-purple-500" /> Блок 4: Особые сочетания
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <strong className="text-purple-700">CH</strong> → [ч] (chocolate = чоколате)
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <strong className="text-purple-700">LL</strong> → [й] или [ль] (llama = йама)
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <strong className="text-purple-700">RR</strong> → [рр] раскатистое (perro = пэрро)
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <strong className="text-purple-700">QU</strong> → [к] перед e,i (quiero = киеро)
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <strong className="text-purple-700">GU</strong> → [г] перед e,i (guerra = герра)
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <strong className="text-purple-700">GÜ</strong> → [гу] с U (pingüino = пингуино)
                </div>
              </div>
            </div>

            {/* Card 5: Stress Rules */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Info size={20} className="text-emerald-500" /> Блок 5: Правила ударения
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <strong className="text-emerald-700">Правило 1:</strong> Слово на гласную, N или S → ударение на предпоследний слог
                  <div className="text-xs text-slate-600 mt-2">Примеры: <strong>casa, hablan, libros</strong></div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <strong className="text-emerald-700">Правило 2:</strong> Слово на согласную (кроме N, S) → ударение на последний слог
                  <div className="text-xs text-slate-600 mt-2">Примеры: <strong>hotel, ciudad</strong></div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <strong className="text-emerald-700">Правило 3:</strong> Акцент (´) → ударение на этот слог
                  <div className="text-xs text-slate-600 mt-2">Примеры: <strong>café, música, inglés</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* LAS REGLAS Section */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl mt-8 shadow-lg">
            <h3 className="text-2xl font-black unbounded mb-6 flex items-center gap-3">
              <AlertTriangle size={24} className="text-amber-400" />
              LAS REGLAS (Правила)
            </h3>
            
            <div className="space-y-4">
              <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-amber-400">
                <div className="font-bold text-amber-300 mb-2">Regla №1: H никогда не читается</div>
                <div className="text-slate-300 text-sm">hotel = отель, hola = ола, ahora = аора</div>
              </div>
              
              <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-amber-400">
                <div className="font-bold text-amber-300 mb-2">Regla №2: Гласные не редуцируются</div>
                <div className="text-slate-300 text-sm">chocolate = чо-ко-ла-те (не "чъкълате")</div>
              </div>
              
              <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-amber-400">
                <div className="font-bold text-amber-300 mb-2">Regla №3: B и V — одинаковое произношение</div>
                <div className="text-slate-300 text-sm">vaca = бака, boca = бока</div>
              </div>
              
              <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-amber-400">
                <div className="font-bold text-amber-300 mb-2">Regla №4: C и G меняются перед e, i</div>
                <div className="text-slate-300 text-sm">casa [ка], pero cena [сена]; gato [гато], pero gente [хенте]</div>
              </div>
              
              <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-amber-400">
                <div className="font-bold text-amber-300 mb-2">Regla №5: R в начале = RR</div>
                <div className="text-slate-300 text-sm">rosa = рроса (раскатистое), perro = пэрро</div>
              </div>
            </div>
          </div>

          {/* Cheat Sheet */}
          <div className="bg-rose-50 border-2 border-rose-200 p-8 rounded-2xl mt-8">
            <h3 className="text-2xl font-black unbounded mb-6 text-rose-700 flex items-center gap-3">
              ¡OJO! Частые ошибки
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg border border-rose-200">
                <div className="text-rose-600 font-bold mb-1">❌ hotel = "хотель"</div>
                <div className="text-emerald-600 font-bold">✅ "отель" (H не читается!)</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-rose-200">
                <div className="text-rose-600 font-bold mb-1">❌ guitarra = "гуитарра"</div>
                <div className="text-emerald-600 font-bold">✅ "гитарра" (GU перед i = [г])</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-rose-200">
                <div className="text-rose-600 font-bold mb-1">❌ queso = "куэсо"</div>
                <div className="text-emerald-600 font-bold">✅ "кесо" (QU = [к])</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-rose-200">
                <div className="text-rose-600 font-bold mb-1">❌ jota = "йота"</div>
                <div className="text-emerald-600 font-bold">✅ "хота" (J = [х])</div>
              </div>
            </div>
          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Práctica <div className="h-[2px] w-12 bg-orange-500"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Classwork (13 заданий)</h2>

          {/* CW Block 1: Stress (5 items) */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xl font-bold mb-6 text-slate-900">Блок CW1: Определи ударение</h3>
            
            <Exercise
              id="cw1"
              mode="cw"
              type="dropdown"
              label="1. casa → Ударение на:"
              options={['ca', 'sa']}
              correctAnswer="ca"
              progressItem={progress.cw?.cw1}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw2"
              mode="cw"
              type="dropdown"
              label="2. hotel → Ударение на:"
              options={['ho', 'tel']}
              correctAnswer="tel"
              progressItem={progress.cw?.cw2}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw3"
              mode="cw"
              type="dropdown"
              label="3. música → Ударение на:"
              options={['mú', 'si', 'ca']}
              correctAnswer="mú"
              progressItem={progress.cw?.cw3}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw4"
              mode="cw"
              type="dropdown"
              label="4. español → Ударение на:"
              options={['es', 'pa', 'ñol']}
              correctAnswer="ñol"
              progressItem={progress.cw?.cw4}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw5"
              mode="cw"
              type="dropdown"
              label="5. libros → Ударение на:"
              options={['li', 'bros']}
              correctAnswer="li"
              progressItem={progress.cw?.cw5}
              onUpdate={updateProgress}
            />
          </div>

          {/* CW Block 2: Pronunciation (5 items) */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xl font-bold mb-6 text-slate-900">Блок CW2: Как читается?</h3>
            
            <Exercise
              id="cw6"
              mode="cw"
              type="dropdown"
              label="6. hotel → Как читается?"
              options={['отель', 'хотель', 'готель']}
              correctAnswer="отель"
              progressItem={progress.cw?.cw6}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw7"
              mode="cw"
              type="dropdown"
              label="7. guitarra → Как читается?"
              options={['гуитарра', 'хитарра', 'гитарра']}
              correctAnswer="гитарра"
              progressItem={progress.cw?.cw7}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw8"
              mode="cw"
              type="dropdown"
              label="8. queso → Как читается?"
              options={['куэсо', 'кесо', 'квесо']}
              correctAnswer="кесо"
              progressItem={progress.cw?.cw8}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw9"
              mode="cw"
              type="dropdown"
              label="9. chico → Как читается?"
              options={['чико', 'кико', 'шико']}
              correctAnswer="чико"
              progressItem={progress.cw?.cw9}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw10"
              mode="cw"
              type="dropdown"
              label="10. llama → Как читается?"
              options={['лама', 'йама', 'льама']}
              correctAnswer="йама"
              progressItem={progress.cw?.cw10}
              onUpdate={updateProgress}
            />
          </div>

          {/* CW Block 3: Silent Letters (3 items) */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xl font-bold mb-6 text-slate-900">Блок CW3: Найди букву, которая не читается</h3>
            
            <Exercise
              id="cw11"
              mode="cw"
              type="text"
              label="11. hotel → Какая буква не читается?"
              correctAnswer="h"
              placeholder="Введи букву"
              progressItem={progress.cw?.cw11}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw12"
              mode="cw"
              type="text"
              label="12. ahora → Какая буква не читается?"
              correctAnswer="h"
              placeholder="Введи букву"
              progressItem={progress.cw?.cw12}
              onUpdate={updateProgress}
            />
            
            <Exercise
              id="cw13"
              mode="cw"
              type="text"
              label="13. hola → Какая буква не читается?"
              correctAnswer="h"
              placeholder="Введи букву"
              progressItem={progress.cw?.cw13}
              onUpdate={updateProgress}
            />
          </div>
        </section>

        {/* HOMEWORK SECTION */}
        <section id="homework" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Tareas <div className="h-[2px] w-12 bg-orange-500"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Homework (10 заданий)</h2>

          {variant === 1 ? (
            <>
              {/* Variant 1 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
                <h3 className="text-xl font-bold mb-6 text-slate-900">Вариант 1: Определи ударение</h3>
                
                <Exercise
                  id="hw1"
                  mode="hw"
                  type="dropdown"
                  label="1. trabajar → Ударение на:"
                  options={['tra', 'ba', 'jar']}
                  correctAnswer="jar"
                  progressItem={progress.hw?.hw1}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw2"
                  mode="hw"
                  type="dropdown"
                  label="2. teléfono → Ударение на:"
                  options={['te', 'lé', 'fo', 'no']}
                  correctAnswer="lé"
                  progressItem={progress.hw?.hw2}
                  onUpdate={updateProgress}
                />

                <Exercise
                  id="hw3"
                  mode="hw"
                  type="dropdown"
                  label="3. francés → Ударение на:"
                  options={['fran', 'cés']}
                  correctAnswer="cés"
                  progressItem={progress.hw?.hw3}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw4"
                  mode="hw"
                  type="dropdown"
                  label="4. profesor → Ударение на:"
                  options={['pro', 'fe', 'sor']}
                  correctAnswer="sor"
                  progressItem={progress.hw?.hw4}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw5"
                  mode="hw"
                  type="dropdown"
                  label="5. estudiante → Ударение на:"
                  options={['es', 'tu', 'dian', 'te']}
                  correctAnswer="dian"
                  progressItem={progress.hw?.hw5}
                  onUpdate={updateProgress}
                />
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
                <h3 className="text-xl font-bold mb-6 text-slate-900">Вариант 1: Как читается слово?</h3>
                
                <Exercise
                  id="hw6"
                  mode="hw"
                  type="text"
                  label="6. gato → Как читается? (русскими буквами)"
                  correctAnswer="гато"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw6}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw7"
                  mode="hw"
                  type="text"
                  label="7. joven → Как читается?"
                  correctAnswer="ховен"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw7}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw8"
                  mode="hw"
                  type="text"
                  label="8. calle → Как читается?"
                  correctAnswer="кайе"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw8}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw9"
                  mode="hw"
                  type="text"
                  label="9. perro → Как читается?"
                  correctAnswer="перро"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw9}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw10"
                  mode="hw"
                  type="text"
                  label="10. niño → Как читается?"
                  correctAnswer="ниньо"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw10}
                  onUpdate={updateProgress}
                />
              </div>
            </>
          ) : (
            <>
              {/* Variant 2 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
                <h3 className="text-xl font-bold mb-6 text-slate-900">Вариант 2: Определи ударение</h3>
                
                <Exercise
                  id="hw1"
                  mode="hw"
                  type="dropdown"
                  label="1. hablar → Ударение на:"
                  options={['ha', 'blar']}
                  correctAnswer="blar"
                  progressItem={progress.hw?.hw1}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw2"
                  mode="hw"
                  type="dropdown"
                  label="2. teléfono → Ударение на:"
                  options={['te', 'lé', 'fo', 'no']}
                  correctAnswer="lé"
                  progressItem={progress.hw?.hw2}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw3"
                  mode="hw"
                  type="dropdown"
                  label="3. inglés → Ударение на:"
                  options={['in', 'glés']}
                  correctAnswer="glés"
                  progressItem={progress.hw?.hw3}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw4"
                  mode="hw"
                  type="dropdown"
                  label="4. doctor → Ударение на:"
                  options={['doc', 'tor']}
                  correctAnswer="tor"
                  progressItem={progress.hw?.hw4}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw5"
                  mode="hw"
                  type="dropdown"
                  label="5. amigos → Ударение на:"
                  options={['a', 'mi', 'gos']}
                  correctAnswer="mi"
                  progressItem={progress.hw?.hw5}
                  onUpdate={updateProgress}
                />
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
                <h3 className="text-xl font-bold mb-6 text-slate-900">Вариант 2: Как читается слово?</h3>
                
                <Exercise
                  id="hw6"
                  mode="hw"
                  type="text"
                  label="6. casa → Как читается? (русскими буквами)"
                  correctAnswer="каса"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw6}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw7"
                  mode="hw"
                  type="text"
                  label="7. jugar → Как читается?"
                  correctAnswer="хугар"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw7}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw8"
                  mode="hw"
                  type="text"
                  label="8. pollo → Как читается?"
                  correctAnswer="пойо"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw8}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw9"
                  mode="hw"
                  type="text"
                  label="9. carro → Как читается?"
                  correctAnswer="карро"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw9}
                  onUpdate={updateProgress}
                />
                
                <Exercise
                  id="hw10"
                  mode="hw"
                  type="text"
                  label="10. mañana → Как читается?"
                  correctAnswer="маньяна"
                  placeholder="Введи транскрипцию"
                  progressItem={progress.hw?.hw10}
                  onUpdate={updateProgress}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
