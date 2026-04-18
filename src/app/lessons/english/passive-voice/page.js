'use client'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { RefreshCcw, Home, BookOpen, PenTool, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function PassiveVoicePage() {
  const lessonId = 'eng_passive'
  // CW: 2 (Reading) + 8 (Dropdown) + 5 (Builder) + 3 (MCQ) + 5 (V3) = 23
  // HW: 18 (Total inputs in 15 questions)
  const { progress, updateProgress, resetHW, variant, getStats, loading } = 
    useLessonProgress(lessonId, 23, 18)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="font-bold text-slate-400 animate-pulse">LOADING LESSON...</div>
      </div>
    </div>
  )

  const statsCW = getStats('cw')
  const statsHW = getStats('hw')

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e1b4b] font-sans pb-20">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800&display=swap');
        .unbounded { font-family: 'Unbounded', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="bg-indigo-950 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-5 pointer-events-none select-none unbounded translate-x-20 -translate-y-10">PASSIVE</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            🇬🇧 Lesson 1 · Grammar B1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight">
            The Passive <br/><span className="text-amber-400 italic">Voice</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium">
            Пассивный залог — визитная карточка уровня B1. Мы учимся говорить не о том, кто совершил действие, а о том, что произошло с объектом.
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
          <Link href="/" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Home size={16} /> Home
          </Link>
          <a href="#theory" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <BookOpen size={16} /> Theory
          </a>
          <a href="#classwork" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <PenTool size={16} /> Practice
          </a>
          <a href="#homework" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <CheckCircle size={16} /> Homework
          </a>
        </nav>

        {/* THEORY SECTION */}
        <section id="theory" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Theory <div className="h-[2px] w-12 bg-blue-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8">Кто виноват или что сделано?</h2>
          
          <div className="grid gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
              <h3 className="text-xl font-bold mb-4">1. Суть пассивного залога (Active vs Passive)</h3>
              <p className="mb-4">В активном залоге (Active voice) мы фокусируемся на том, <strong>КТО</strong> выполняет действие:</p>
              <p className="italic text-slate-500 mb-6">Shakespeare wrote Hamlet. (Шекспир написал Гамлета)</p>
              
              <p className="mb-4">В пассивном залоге (Passive voice) фокус внимания смещается на <strong>ОБЪЕКТ</strong>:</p>
              <p className="italic text-slate-500 mb-6">Hamlet <strong>was written</strong> by Shakespeare. (Гамлет был написан Шекспиром)</p>

              <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl text-teal-900 text-sm leading-relaxed">
                <strong className="block text-[10px] uppercase tracking-widest text-teal-600 mb-2">💡 Золотая формула:</strong>
                <div className="text-lg font-bold">to be + V3</div>
                Чтобы изменить время, мы меняем <strong>ТОЛЬКО глагол to be</strong>. Третья форма (V3) всегда остается неизменной!
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400"></div>
              <h3 className="text-xl font-bold mb-4">2. Времена в пассивном залоге</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 font-bold text-slate-400 uppercase tracking-wider">Время</th>
                      <th className="text-left py-3 font-bold text-slate-400 uppercase tracking-wider">Формула</th>
                      <th className="text-left py-3 font-bold text-slate-400 uppercase tracking-wider">Пример</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-4 font-bold">Present Simple</td>
                      <td className="py-4 text-blue-600 font-mono">am/is/are + V3</td>
                      <td className="py-4 text-slate-600 italic text-xs">The office <strong>is cleaned</strong> daily.</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Past Simple</td>
                      <td className="py-4 text-blue-600 font-mono">was/were + V3</td>
                      <td className="py-4 text-slate-600 italic text-xs">The book <strong>was written</strong> in 1990.</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Future Simple</td>
                      <td className="py-4 text-blue-600 font-mono">will be + V3</td>
                      <td className="py-4 text-slate-600 italic text-xs">The results <strong>will be sent</strong> soon.</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Present Perfect</td>
                      <td className="py-4 text-blue-600 font-mono">have/has been + V3</td>
                      <td className="py-4 text-slate-600 italic text-xs">The car <strong>has been found</strong>.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* READING SECTION */}
        <section id="reading" className="mb-20 scroll-mt-10">
           <div className="flex items-center gap-3 text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Reading <div className="h-[2px] w-12 bg-amber-500"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8">The Journey of Chocolate</h2>
          
          <div className="bg-amber-50 border-l-4 border-amber-400 p-8 rounded-r-2xl mb-8 text-slate-700 leading-relaxed italic">
            <p className="mb-4 text-lg">
              Chocolate <strong>is loved</strong> by people all over the world, but how is it actually made? The process begins in tropical countries like Ivory Coast and Ghana. Cacao beans <strong>are grown</strong> on small farms. When the pods are ripe, they <strong>are harvested</strong> by farmers by hand.
            </p>
            <p className="mb-4">
              After that, the beans <strong>are fermented</strong> and dried in the sun. Then, they <strong>are shipped</strong> to chocolate factories in Europe or America. At the factory, the beans <strong>are roasted</strong> at high temperatures to bring out the flavor. Finally, sugar and milk <strong>are added</strong>, and the mixture <strong>is turned</strong> into delicious chocolate bars.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div> Understanding Check
            </h3>
            <Exercise
              id="cw1"
              mode="cw"
              type="mcq"
              label="1. According to the text, how are cacao beans harvested?"
              options={[
                "They are harvested by big machines.",
                "They are harvested by farmers by hand.",
                "They are grown in factories."
              ]}
              correctAnswer="They are harvested by farmers by hand."
              progressItem={progress.cw?.cw1}
              onUpdate={updateProgress}
            />
            <Exercise
              id="cw2"
              mode="cw"
              type="mcq"
              label="2. Where are the beans roasted?"
              options={[
                "At the chocolate factories.",
                "On small farms in Africa.",
                "In the sun."
              ]}
              correctAnswer="At the chocolate factories."
              progressItem={progress.cw?.cw2}
              onUpdate={updateProgress}
            />
          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Practice <div className="h-[2px] w-12 bg-indigo-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-indigo-950">Classwork</h2>
          <p className="text-slate-500 mb-8">Практикуем времена и формы глаголов.</p>

          <div className="space-y-12">
            {/* Block 1: Dropdown */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Блок 1: Выберите правильный глагол "to be"</h3>
              <div className="space-y-4">
                {[
                  { id: 'cw3', q: "(Every day) The office ___ cleaned at 6 PM.", ans: 'is', opts: ['is', 'are', 'was', 'will be'] },
                  { id: 'cw4', q: "(Last night) My car ___ stolen!", ans: 'was', opts: ['is', 'was', 'were', 'has been'] },
                  { id: 'cw5', q: "(Next year) The new bridge ___ opened.", ans: 'will be', opts: ['is', 'was', 'will be'] },
                  { id: 'cw6', q: "(Result) Oh no! The window ___ broken!", ans: 'has been', opts: ['is', 'was', 'has been'] },
                  { id: 'cw7', q: "(Usually) Millions of emails ___ sent every day.", ans: 'are', opts: ['is', 'are', 'were'] },
                  { id: 'cw8', q: "(In 1997) Harry Potter ___ published.", ans: 'was', opts: ['is', 'was', 'were'] },
                  { id: 'cw9', q: "The cake was made ___ chocolate. (Ingredient)", ans: 'with', opts: ['by', 'with'] },
                  { id: 'cw10', q: "The photo was taken ___ my brother. (Agent)", ans: 'by', opts: ['by', 'with'] },
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

            {/* Block 2: Word Builder */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 unbounded text-amber-400">Блок 2: Порядок слов</h3>
              <div className="space-y-6">
                {[
                  { id: 'cw11', q: "The letter was written yesterday.", ans: "The letter was written yesterday", opts: ['yesterday', 'written', 'was', 'The', 'letter'] },
                  { id: 'cw12', q: "English is spoken all over the world.", ans: "English is spoken all over the world", opts: ['all over', 'spoken', 'is', 'the world', 'English'] },
                  { id: 'cw13', q: "My phone has been stolen!", ans: "My phone has been stolen", opts: ['My', 'stolen', 'phone', 'has', 'been'] },
                  { id: 'cw14', q: "When was the house built?", ans: "When was the house built ?", opts: ['built', 'was', 'the house', 'When', '?'] },
                  { id: 'cw15', q: "The report will be finished tomorrow.", ans: "The report will be finished tomorrow", opts: ['be', 'finished', 'The report', 'will', 'tomorrow'] },
                ].map(ex => (
                  <Exercise
                    key={ex.id}
                    id={ex.id}
                    mode="cw"
                    type="builder"
                    label={ex.q}
                    options={ex.opts}
                    correctAnswer={ex.ans}
                    progressItem={progress.cw?.[ex.id]}
                    onUpdate={updateProgress}
                  />
                ))}
              </div>
            </div>

            {/* Block 3: MCQ */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
               <h3 className="text-xl font-bold mb-6">Блок 3: Актив или Пассив?</h3>
               <div className="space-y-4">
                  <Exercise
                    id="cw16"
                    mode="cw"
                    type="mcq"
                    label='"Somebody cleans the room." -> Passive variant:'
                    options={["The room cleaned somebody.", "The room is cleaned.", "The room was cleaned."]}
                    correctAnswer="The room is cleaned."
                    progressItem={progress.cw?.cw16}
                    onUpdate={updateProgress}
                  />
                  <Exercise
                    id="cw17"
                    mode="cw"
                    type="mcq"
                    label='"They built the house in 2010." -> Passive variant:'
                    options={["The house is built in 2010.", "The house built in 2010.", "The house was built in 2010."]}
                    correctAnswer="The house was built in 2010."
                    progressItem={progress.cw?.cw17}
                    onUpdate={updateProgress}
                  />
                  <Exercise
                    id="cw18"
                    mode="cw"
                    type="mcq"
                    label="I can't find my keys! I think they ________!"
                    options={["stole", "have been stolen", "was stolen"]}
                    correctAnswer="have been stolen"
                    progressItem={progress.cw?.cw18}
                    onUpdate={updateProgress}
                  />
               </div>
            </div>

            {/* Block 4: V3 */}
            <div className="bg-white p-8 rounded-3xl border-2 border-indigo-100 shadow-sm">
               <h3 className="text-xl font-bold mb-6 text-indigo-600">Блок 4: Напишите 3-ю форму глагола (V3)</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'cw19', v: 'make', ans: 'made' },
                    { id: 'cw20', v: 'write', ans: 'written' },
                    { id: 'cw21', v: 'break', ans: 'broken' },
                    { id: 'cw22', v: 'build', ans: 'built' },
                    { id: 'cw23', v: 'invent', ans: 'invented' },
                  ].map(ex => (
                    <Exercise
                      key={ex.id}
                      id={ex.id}
                      mode="cw"
                      type="text"
                      label={`${ex.v} →`}
                      correctAnswer={ex.ans}
                      placeholder="Enter answer"
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
            Homework <div className="h-[2px] w-12 bg-slate-900"></div>
          </div>
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black unbounded uppercase text-amber-400">
                  Homework {variant === 2 && <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white align-middle ml-4">Variant 2</span>}
                </h2>
              </div>
              
              <p className="text-slate-400 mb-8 max-w-xl">
                {variant === 1 
                  ? "Самостоятельная практика. Раскройте скобки, поставив глагол в пассивный залог в нужном времени."
                  : "Второй шанс! Решите новые задания, чтобы улучшить результат. Помните: это последняя попытка."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <>
                    {/* --- VARIANT 1 CONTENT --- */}
                    <div>
                      <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-6">Часть 1: Present Simple (am/is/are + V3)</h4>
                      <div className="space-y-4">
                          <Exercise id="hw1" mode="hw" label="1. English (speak) in Australia." correctAnswer="is spoken" progressItem={progress.hw?.hw1} onUpdate={updateProgress} />
                          <Exercise id="hw2" mode="hw" label="2. These cars (make) in Japan." correctAnswer="are made" progressItem={progress.hw?.hw2} onUpdate={updateProgress} />
                          <Exercise id="hw3" mode="hw" label="3. The mail (deliver) at 9 AM." correctAnswer="is delivered" progressItem={progress.hw?.hw3} onUpdate={updateProgress} />
                          
                      <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-50"></div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8 flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div> 
                          4. Трансформация вопроса
                        </div>
                        
                        <div className="text-xl md:text-2xl font-black text-white mb-10 text-center leading-tight tracking-tight">
                          <span className="opacity-30 text-3xl font-serif">“</span>
                          Do they clean the rooms every day?
                          <span className="opacity-30 text-3xl font-serif">”</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 mb-10">
                          <div className="w-36">
                            <Exercise id="hw4_1" mode="hw" placeholder="Enter answer" correctAnswer="Are" progressItem={progress.hw?.hw4_1} onUpdate={updateProgress} variant="inline" />
                          </div>
                          <span className="text-slate-500 font-bold text-lg">the rooms</span>
                          <div className="w-48">
                            <Exercise id="hw4_2" mode="hw" placeholder="Enter answer" correctAnswer="cleaned" progressItem={progress.hw?.hw4_2} onUpdate={updateProgress} variant="inline" />
                          </div>
                          <span className="text-slate-500 font-bold text-lg">every day?</span>
                        </div>

                        <button 
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw4_1' } }));
                            window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw4_2' } }));
                          }}
                          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-blue-400 font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] hover:border-blue-500/50"
                        >
                          Check Sentence
                        </button>
                      </div>

                          <Exercise id="hw5" mode="hw" label="5. This room (not use)." correctAnswer="is not used" hint="Можно использовать isn't used" progressItem={progress.hw?.hw5} onUpdate={updateProgress} />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-6 border-t border-slate-800 pt-8">Часть 2: Past Simple (was/were + V3)</h4>
                      <div className="space-y-4">
                          <Exercise id="hw6" mode="hw" label="6. My wallet (steal) yesterday." correctAnswer="was stolen" progressItem={progress.hw?.hw6} onUpdate={updateProgress} />
                          <Exercise id="hw7" mode="hw" label="7. The telephone (invent) by Bell." correctAnswer="was invented" progressItem={progress.hw?.hw7} onUpdate={updateProgress} />
                          <Exercise id="hw8" mode="hw" label="8. These houses (build) in 1950." correctAnswer="were built" progressItem={progress.hw?.hw8} onUpdate={updateProgress} />
                          
                      <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50"></div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8 flex items-center gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div> 
                          9. Трансформация вопроса
                        </div>
                        
                        <div className="text-xl md:text-2xl font-black text-white mb-10 text-center leading-tight tracking-tight">
                          <span className="opacity-30 text-3xl font-serif">“</span>
                          Did Shakespeare write this play?
                          <span className="opacity-30 text-3xl font-serif">”</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 mb-10">
                          <div className="w-36">
                            <Exercise id="hw9_1" mode="hw" placeholder="Enter answer" correctAnswer="Was" progressItem={progress.hw?.hw9_1} onUpdate={updateProgress} variant="inline" />
                          </div>
                          <span className="text-slate-500 font-bold text-lg">this play</span>
                          <div className="w-48">
                            <Exercise id="hw9_2" mode="hw" placeholder="Enter answer" correctAnswer="written" progressItem={progress.hw?.hw9_2} onUpdate={updateProgress} variant="inline" />
                          </div>
                          <span className="text-slate-500 font-bold text-lg">by Shakespeare?</span>
                        </div>

                        <button 
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw9_1' } }));
                            window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw9_2' } }));
                          }}
                          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-amber-400 font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] hover:border-amber-500/50"
                        >
                          Check Sentence
                        </button>
                      </div>

                          <Exercise id="hw10" mode="hw" label="10. I (not invite) to the party." correctAnswer="was not invited" progressItem={progress.hw?.hw10} onUpdate={updateProgress} />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-6 border-t border-slate-800 pt-8">Часть 3: Future & Present Perfect</h4>
                      <div className="space-y-4">
                          <Exercise id="hw11" mode="hw" label="11. The project (will / finish) tomorrow." correctAnswer="will be finished" progressItem={progress.hw?.hw11} onUpdate={updateProgress} />
                          <Exercise id="hw12" mode="hw" label="12. The door (has / paint)." correctAnswer="has been painted" progressItem={progress.hw?.hw12} onUpdate={updateProgress} />
                          <Exercise id="hw13" mode="hw" label="13. The tickets (will / send) by email." correctAnswer="will be sent" progressItem={progress.hw?.hw13} onUpdate={updateProgress} />
                          <Exercise id="hw14" mode="hw" label="14. Ten new people (have / hire)." correctAnswer="have been hired" progressItem={progress.hw?.hw14} onUpdate={updateProgress} />
                          
                          <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-50"></div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 mb-8 flex items-center gap-3">
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div> 
                              15. Вопрос в будущем времени
                            </div>
                            
                            <div className="text-xl md:text-2xl font-black text-white mb-10 text-center leading-tight tracking-tight">
                              <span className="opacity-30 text-3xl font-serif">“</span>
                              Will they serve dinner at 8?
                              <span className="opacity-30 text-3xl font-serif">”</span>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 mb-10">
                              <div className="w-36">
                                <Exercise id="hw15_1" mode="hw" placeholder="Enter answer" correctAnswer="Will" progressItem={progress.hw?.hw15_1} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="text-slate-500 font-bold text-lg">dinner</span>
                              <div className="w-48">
                                <Exercise id="hw15_2" mode="hw" placeholder="Enter answer" correctAnswer="be served" progressItem={progress.hw?.hw15_2} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="text-slate-500 font-bold text-lg">at 8?</span>
                            </div>

                            <button 
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw15_1' } }));
                                window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw15_2' } }));
                              }}
                              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-teal-400 font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] hover:border-teal-500/50"
                            >
                              Check Sentence
                            </button>
                          </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* --- VARIANT 2 CONTENT (NEW QUESTIONS) --- */}
                    <div>
                      <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-6">Часть 1: Present Simple (am/is/are + V3)</h4>
                      <div className="space-y-4">
                          <Exercise id="hw1_v2" mode="hw" label="1. Spanish (speak) in Mexico." correctAnswer="is spoken" progressItem={progress.hw?.hw1_v2} onUpdate={updateProgress} />
                          <Exercise id="hw2_v2" mode="hw" label="2. These smartphones (design) in California." correctAnswer="are designed" progressItem={progress.hw?.hw2_v2} onUpdate={updateProgress} />
                          <Exercise id="hw3_v2" mode="hw" label="3. Fresh bread (sell) here every morning." correctAnswer="is sold" progressItem={progress.hw?.hw3_v2} onUpdate={updateProgress} />
                          
                          <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-50"></div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8 flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div> 
                              4. Трансформация вопроса
                            </div>
                            
                            <div className="text-xl md:text-2xl font-black text-white mb-10 text-center leading-tight tracking-tight">
                              <span className="opacity-30 text-3xl font-serif">“</span>
                              Does he help you every day?
                              <span className="opacity-30 text-3xl font-serif">”</span>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 mb-10">
                              <div className="w-36">
                                <Exercise id="hw4_1_v2" mode="hw" placeholder="Enter answer" correctAnswer="Are" progressItem={progress.hw?.hw4_1_v2} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="text-slate-500 font-bold text-lg">you</span>
                              <div className="w-48">
                                <Exercise id="hw4_2_v2" mode="hw" placeholder="Enter answer" correctAnswer="helped" progressItem={progress.hw?.hw4_2_v2} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="text-slate-500 font-bold text-lg">every day?</span>
                            </div>

                            <button 
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw4_1_v2' } }));
                                window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw4_2_v2' } }));
                              }}
                              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-blue-400 font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] hover:border-blue-500/50"
                            >
                              Check Sentence
                            </button>
                          </div>

                          <Exercise id="hw5_v2" mode="hw" label="5. Rules (not / break) in this school." correctAnswer="are not broken" progressItem={progress.hw?.hw5_v2} onUpdate={updateProgress} />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-6 border-t border-slate-800 pt-8">Часть 2: Past Simple (was/were + V3)</h4>
                      <div className="space-y-4">
                          <Exercise id="hw6_v2" mode="hw" label="6. The Pyramids (build) thousands of years ago." correctAnswer="were built" progressItem={progress.hw?.hw6_v2} onUpdate={updateProgress} />
                          <Exercise id="hw7_v2" mode="hw" label="7. The first email (send) in 1971." correctAnswer="was sent" progressItem={progress.hw?.hw7_v2} onUpdate={updateProgress} />
                          <Exercise id="hw8_v2" mode="hw" label="8. These photos (take) during the holiday." correctAnswer="were taken" progressItem={progress.hw?.hw8_v2} onUpdate={updateProgress} />
                          
                          <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50"></div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400 mb-8 flex items-center gap-3">
                              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div> 
                              9. Трансформация вопроса
                            </div>
                            
                            <div className="text-xl md:text-2xl font-black text-white mb-10 text-center leading-tight tracking-tight">
                              <span className="opacity-30 text-3xl font-serif">“</span>
                              Did they fix the computer?
                              <span className="opacity-30 text-3xl font-serif">”</span>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 mb-10">
                              <div className="w-36">
                                <Exercise id="hw9_1_v2" mode="hw" placeholder="Enter answer" correctAnswer="Was" progressItem={progress.hw?.hw9_1_v2} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="text-slate-500 font-bold text-lg">the computer</span>
                              <div className="w-48">
                                <Exercise id="hw9_2_v2" mode="hw" placeholder="Enter answer" correctAnswer="fixed" progressItem={progress.hw?.hw9_2_v2} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="text-slate-500 font-bold text-lg">?</span>
                            </div>

                            <button 
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw9_1_v2' } }));
                                window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw9_2_v2' } }));
                              }}
                              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-amber-400 font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] hover:border-amber-500/50"
                            >
                              Check Sentence
                            </button>
                          </div>

                          <Exercise id="hw10_v2" mode="hw" label="10. I (not inform) about the meeting." correctAnswer="was not informed" progressItem={progress.hw?.hw10_v2} onUpdate={updateProgress} />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-6 border-t border-slate-800 pt-8">Часть 3: Future & Present Perfect</h4>
                      <div className="space-y-4">
                          <Exercise id="hw11_v2" mode="hw" label="11. The new mall (will / open) next month." correctAnswer="will be opened" progressItem={progress.hw?.hw11_v2} onUpdate={updateProgress} />
                          <Exercise id="hw12_v2" mode="hw" label="12. Your order (has / ship)." correctAnswer="has been shipped" progressItem={progress.hw?.hw12_v2} onUpdate={updateProgress} />
                          <Exercise id="hw13_v2" mode="hw" label="13. The test (will / grade) by tomorrow." correctAnswer="will be graded" progressItem={progress.hw?.hw13_v2} onUpdate={updateProgress} />
                          <Exercise id="hw14_v2" mode="hw" label="14. The lost keys (have / find)." correctAnswer="have been found" progressItem={progress.hw?.hw14_v2} onUpdate={updateProgress} />
                          
                          <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-50"></div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 mb-8 flex items-center gap-3">
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div> 
                              15. Вопрос в будущем времени
                            </div>
                            
                            <div className="text-xl md:text-2xl font-black text-white mb-10 text-center leading-tight tracking-tight">
                              <span className="opacity-30 text-3xl font-serif">“</span>
                              Will the company build a new office?
                              <span className="opacity-30 text-3xl font-serif">”</span>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 mb-10">
                              <div className="w-36">
                                <Exercise id="hw15_1_v2" mode="hw" placeholder="Enter answer" correctAnswer="Will" progressItem={progress.hw?.hw15_1_v2} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="text-slate-500 font-bold text-lg">a new office</span>
                              <div className="w-48">
                                <Exercise id="hw15_2_v2" mode="hw" placeholder="Enter answer" correctAnswer="be built" progressItem={progress.hw?.hw15_2_v2} onUpdate={updateProgress} variant="inline" />
                              </div>
                              <span className="text-slate-500 font-bold text-lg">?</span>
                            </div>

                            <button 
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw15_1_v2' } }));
                                window.dispatchEvent(new CustomEvent('trigger-check', { detail: { id: 'hw15_2_v2' } }));
                              }}
                              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-teal-400 font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] hover:border-teal-500/50"
                            >
                              Check Sentence
                            </button>
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
        © 2026 AG Academy · Passive Voice V2.0
      </footer>
    </div>
  )
}
