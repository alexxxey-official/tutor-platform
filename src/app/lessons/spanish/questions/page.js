'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Info, Star, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function QuestionsLessonPage() {
  const lessonId = 'spa_questions'
  // CW: 10 items, HW: 13 items per variant
  const totalCW = 10
  const totalHW = 13

  const { progress, updateProgress, resetHW, variant, getStats, loading } =
    useLessonProgress(lessonId, totalCW, totalHW)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (loading || !mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
      <header className="bg-blue-600 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10 uppercase">¿QUÉ?</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-blue-800 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 7 · Gramática A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            Preguntas y <span className="text-amber-300 italic">Orden</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto font-medium">
            Учимся задавать вопросы по-испански! Вопросительные слова и правильный порядок слов. ❓
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
          <div className="flex items-center gap-3 text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Teoría <div className="h-[2px] w-12 bg-blue-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Как задавать вопросы?</h2>

          <div className="grid gap-6">
            {/* Card 1: Question Words */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Info size={20} className="text-blue-500" /> Вопросительные слова
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                Все вопросительные слова в испанском имеют ударение (tilde) и пишутся между знаками ¿ ?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-blue-600 font-mono text-lg">¿Qué?</strong>
                  <p className="text-sm text-slate-700 mt-1">Что? Какой?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-blue-600 font-mono text-lg">¿Quién?</strong>
                  <p className="text-sm text-slate-700 mt-1">Кто?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-blue-600 font-mono text-lg">¿Dónde?</strong>
                  <p className="text-sm text-slate-700 mt-1">Где?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-blue-600 font-mono text-lg">¿Cuándo?</strong>
                  <p className="text-sm text-slate-700 mt-1">Когда?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-blue-600 font-mono text-lg">¿Cómo?</strong>
                  <p className="text-sm text-slate-700 mt-1">Как?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-blue-600 font-mono text-lg">¿Por qué?</strong>
                  <p className="text-sm text-slate-700 mt-1">Почему?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-blue-600 font-mono text-lg">¿Cuánto/a?</strong>
                  <p className="text-sm text-slate-700 mt-1">Сколько?</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="text-blue-600 font-mono text-lg">¿Cuál?</strong>
                  <p className="text-sm text-slate-700 mt-1">Который? Какой?</p>
                </div>
              </div>
            </div>

            {/* Card 2: Word Order */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Star size={20} className="text-amber-500" /> Порядок слов в вопросе
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-slate-600">
                В испанском вопросе глагол идет ПЕРЕД подлежащим (обратный порядок слов).
              </p>

              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <p className="font-bold text-emerald-900 mb-2">Утверждение:</p>
                  <p className="font-mono text-slate-700">Tú <strong className="text-emerald-600">hablas</strong> español.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="font-bold text-blue-900 mb-2">Вопрос:</p>
                  <p className="font-mono text-slate-700">¿<strong className="text-blue-600">Hablas</strong> tú español?</p>
                </div>
              </div>
            </div>

            {/* Las Reglas */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-8 text-blue-400 unbounded text-center flex justify-center items-center gap-3">
                <AlertTriangle size={28} /> LAS REGLAS (ПРАВИЛА)
              </h3>

              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №1: Всегда ¿ и ?</div>
                  <p className="text-slate-300 text-sm mb-3">В испанском вопросы обрамляются двумя знаками: ¿ в начале и ? в конце.</p>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg">
                    <p className="text-white font-mono">¿Cómo estás?</p>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Regla №2: Ударения обязательны!</div>
                  <p className="text-slate-300 text-sm mb-3">Все вопросительные слова пишутся с ударением (tilde).</p>
                  <div className="bg-black/30 p-4 rounded-lg font-mono text-sm space-y-1">
                    <p className="text-emerald-400">✓ ¿Qué es esto?</p>
                    <p className="text-rose-400">✗ ¿Que es esto?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cheat Sheet */}
            <div className="bg-blue-50 p-8 rounded-2xl border-2 border-blue-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-900 unbounded uppercase">
                ¡OJO! (Внимание!)
              </h3>
              <p className="text-blue-800 mb-4 font-medium">Алгоритм построения вопроса:</p>
              <ol className="space-y-2 text-blue-900 font-medium list-decimal list-inside">
                <li>Ставим ¿ в начале</li>
                <li>Вопросительное слово (если есть) с ударением</li>
                <li>Глагол</li>
                <li>Подлежащее</li>
                <li>Остальные слова</li>
                <li>Ставим ? в конце</li>
              </ol>
            </div>

          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Práctica <div className="h-[2px] w-12 bg-blue-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-slate-900">Classwork</h2>
          <p className="text-slate-500 mb-8">Тренируем вопросительные слова и порядок слов.</p>

          <div className="space-y-12">
            {/* Block 1: Question Words */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Блок 1: Вопросительные слова
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cw1', q: "1. ___ te llamas? (Как тебя зовут?)", ans: 'Cómo', opts: ['Cómo', 'Qué', 'Quién'] },
                  { id: 'cw2', q: "2. ___ años tienes? (Сколько тебе лет?)", ans: 'Cuántos', opts: ['Cuántos', 'Cuánto', 'Qué'] },
                  { id: 'cw3', q: "3. ___ vives? (Где ты живешь?)", ans: 'Dónde', opts: ['Dónde', 'Cuándo', 'Cómo'] },
                  { id: 'cw4', q: "4. ___ es tu nombre? (Как твое имя?)", ans: 'Cuál', opts: ['Cuál', 'Qué', 'Quién'] },
                  { id: 'cw5', q: "5. ___ estudias español? (Почему ты учишь испанский?)", ans: 'Por qué', opts: ['Por qué', 'Porque', 'Qué'] },
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

            {/* Block 2: Word Order */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 unbounded text-blue-400">Блок 2: Порядок слов</h3>
              <div className="space-y-4">
                {[
                  { id: 'cw6', q: "6. ¿___ tú español? (Говоришь ли ты по-испански?)", ans: 'Hablas' },
                  { id: 'cw7', q: "7. ¿___ está tu hermano? (Где твой брат?)", ans: 'Dónde' },
                  { id: 'cw8', q: "8. ¿___ es tu profesora? (Кто твоя учительница?)", ans: 'Quién' },
                  { id: 'cw9', q: "9. ¿___ años tiene ella? (Сколько ей лет?)", ans: 'Cuántos' },
                  { id: 'cw10', q: "10. ¿___ te llamas? (Как тебя зовут?)", ans: 'Cómo' },
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
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl border-t-8 border-blue-600">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black unbounded uppercase text-blue-400">
                  Homework {variant === 2 && <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white align-middle ml-4">Variant 2</span>}
                </h2>
              </div>

              <p className="text-slate-400 mb-12 max-w-xl">
                {variant === 1
                  ? "Самостоятельная практика. Впишите правильное вопросительное слово."
                  : "Второй шанс! Решите новые задания."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <div className="space-y-4">
                    {[
                      { id: 'hw1', q: "1. ¿___ estás? (Как дела?)", ans: "Cómo" },
                      { id: 'hw2', q: "2. ¿___ vives? (Где ты живешь?)", ans: "Dónde" },
                      { id: 'hw3', q: "3. ¿___ años tienes? (Сколько тебе лет?)", ans: "Cuántos" },
                      { id: 'hw4', q: "4. ¿___ es tu nombre? (Как твое имя?)", ans: "Cuál" },
                      { id: 'hw5', q: "5. ¿___ estudias? (Что ты изучаешь?)", ans: "Qué" },
                      { id: 'hw6', q: "6. ¿___ es tu profesor? (Кто твой учитель?)", ans: "Quién" },
                      { id: 'hw7', q: "7. ¿___ trabajas? (Когда ты работаешь?)", ans: "Cuándo" },
                      { id: 'hw8', q: "8. ¿___ estudias español? (Почему ты учишь испанский?)", ans: "Por qué" },
                      { id: 'hw9', q: "9. ¿___ cuesta? (Сколько стоит?)", ans: "Cuánto" },
                      { id: 'hw10', q: "10. ¿___ te llamas? (Как тебя зовут?)", ans: "Cómo" },
                      { id: 'hw11', q: "11. ¿___ está tu casa? (Где твой дом?)", ans: "Dónde" },
                      { id: 'hw12', q: "12. ¿___ hermanos tienes? (Сколько у тебя братьев/сестер?)", ans: "Cuántos" },
                      { id: 'hw13', q: "13. ¿___ es esto? (Что это?)", ans: "Qué" },
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
                      { id: 'hw1_v2', q: "1. ¿___ te sientes? (Как ты себя чувствуешь?)", ans: "Cómo" },
                      { id: 'hw2_v2', q: "2. ¿___ trabajas? (Где ты работаешь?)", ans: "Dónde" },
                      { id: 'hw3_v2', q: "3. ¿___ cuesta el libro? (Сколько стоит книга?)", ans: "Cuánto" },
                      { id: 'hw4_v2', q: "4. ¿___ es tu apellido? (Какая твоя фамилия?)", ans: "Cuál" },
                      { id: 'hw5_v2', q: "5. ¿___ haces? (Что ты делаешь?)", ans: "Qué" },
                      { id: 'hw6_v2', q: "6. ¿___ es ella? (Кто она?)", ans: "Quién" },
                      { id: 'hw7_v2', q: "7. ¿___ es tu cumpleaños? (Когда твой день рождения?)", ans: "Cuándo" },
                      { id: 'hw8_v2', q: "8. ¿___ no vienes? (Почему ты не приходишь?)", ans: "Por qué" },
                      { id: 'hw9_v2', q: "9. ¿___ personas hay? (Сколько людей?)", ans: "Cuántas" },
                      { id: 'hw10_v2', q: "10. ¿___ se dice en español? (Как это сказать по-испански?)", ans: "Cómo" },
                      { id: 'hw11_v2', q: "11. ¿___ está el baño? (Где туалет?)", ans: "Dónde" },
                      { id: 'hw12_v2', q: "12. ¿___ idiomas hablas? (Сколько языков ты знаешь?)", ans: "Cuántos" },
                      { id: 'hw13_v2', q: "13. ¿___ quieres? (Что ты хочешь?)", ans: "Qué" },
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
        © 2026 AG Academy · Preguntas V1.2
      </footer>
    </div>
  )
}
