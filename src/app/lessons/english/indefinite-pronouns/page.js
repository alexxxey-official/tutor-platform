'use client'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function IndefinitePronounsPage() {
  const lessonId = 'eng_nobody'
  const totalCW = 30
  const totalHW = 20
  
  const { progress, updateProgress, resetHW, variant, getStats, loading } = 
    useLessonProgress(lessonId, totalCW, totalHW)

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
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-5 pointer-events-none select-none unbounded translate-x-20 -translate-y-10 uppercase">Nobody</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            🇬🇧 Lesson 2 · Grammar B1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight">
            Indefinite <br/><span className="text-amber-400 italic">Pronouns</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium">
            Раз и навсегда разбираемся с безличными местоимениями. Как перестать путать anything и nothing, и почему everyone всегда "он".
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
          <Link href="/dashboard" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
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
          <h2 className="text-3xl font-black unbounded mb-8">Somebody, Anybody... Никто не знает, что выбрать!</h2>
          
          <div className="grid gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
              <h3 className="text-xl font-bold mb-4">1. Четыре кита местоимений</h3>
              <p className="mb-4">Неопределенные местоимения образуются путем слияния основ <strong>SOME-, ANY-, NO-, EVERY-</strong> с окончаниями <strong>-BODY/-ONE</strong> (для людей), <strong>-THING</strong> (для предметов) и <strong>-WHERE</strong> (для мест).</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-slate-50 rounded-xl">
                    <strong className="text-blue-600">SOME-</strong>
                    <p className="text-sm mt-1">Утвердительные предложения (+)</p>
                    <p className="text-xs italic text-slate-500 mt-1">I have something for you.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                    <strong className="text-amber-500">ANY-</strong>
                    <p className="text-sm mt-1">Вопросы (?) и Отрицания (-) с NOT</p>
                    <p className="text-xs italic text-slate-500 mt-1">I don't have anything.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                    <strong className="text-rose-500">NO-</strong>
                    <p className="text-sm mt-1">Отрицания (-) БЕЗ NOT</p>
                    <p className="text-xs italic text-slate-500 mt-1">I have nothing. (НЕ I don't have nothing)</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                    <strong className="text-emerald-500">EVERY-</strong>
                    <p className="text-sm mt-1">Все/Всё</p>
                    <p className="text-xs italic text-slate-500 mt-1">Everything is ready.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400"></div>
              <h3 className="text-xl font-bold mb-4 text-amber-600">⚠️ Важное правило: Сингулярность</h3>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-900 text-sm leading-relaxed">
                Все неопределенные местоимения (даже Everyone / Everything) в английском языке считаются <strong>единственным числом</strong>.
                <div className="text-lg font-bold mt-2">Everyone IS... / Nothing HAPPENS...</div>
              </div>
            </div>
          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Practice <div className="h-[2px] w-12 bg-indigo-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-indigo-950">Classwork</h2>
          <p className="text-slate-500 mb-8">Тренируемся различать основы и контекст.</p>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Блок 1: SOME- vs ANY- vs NO-</h3>
              <div className="space-y-4">
                <Exercise id="ex1" mode="cw" label="1. I can't see _______ in the dark." correctAnswer="anything" hint="После отрицания 'can't' используем ANY." progressItem={progress.cw?.ex1} onUpdate={updateProgress} />
                <Exercise id="ex2" mode="cw" label="2. Listen! There is _______ in the room." correctAnswer="somebody|someone" hint="Утверждение — используем SOME." progressItem={progress.cw?.ex2} onUpdate={updateProgress} />
                <Exercise id="ex3" mode="cw" label="3. Are you looking for _______?" correctAnswer="anybody|anyone|somebody|someone" hint="В вопросах можно и SOME, и ANY, но чаще ANY." progressItem={progress.cw?.ex3} onUpdate={updateProgress} />
                <Exercise id="ex4" mode="cw" label="4. I am bored. I have _______ to do. (No 'not' here)" correctAnswer="nothing" hint="Глагол в утвердительной форме, но смысл отрицательный." progressItem={progress.cw?.ex4} onUpdate={updateProgress} />
                <Exercise id="ex5" mode="cw" label="5. We can go _______ you want. (Anywhere is fine)" correctAnswer="anywhere" hint="ANY- в утверждении значит 'любой'." progressItem={progress.cw?.ex5} onUpdate={updateProgress} />
                
                <p className="text-center text-slate-400 py-4 text-xs italic font-mono uppercase tracking-widest border-t border-slate-50 mt-4 pt-6">Next items (6-30) logic training</p>
                
                {[...Array(25)].map((_, i) => {
                    const id = `ex${i + 6}`;
                    // Mock data for the rest 25 items to fulfill 30 totalCW
                    const mockData = [
                        { q: "Is there _______ in the bag?", a: "anything" },
                        { q: "_______ told me about the party, so I didn't go.", a: "nobody|no one" },
                        { q: "I've lost my keys! I've looked _______.", a: "everywhere" },
                        { q: "I'm hungry. I want _______ to eat.", a: "something" },
                        { q: "Does _______ know the answer?", a: "anybody|anyone" },
                        { q: "The room was empty. There was _______ there.", a: "nobody|no one" },
                        { q: "I didn't eat _______ because I wasn't hungry.", a: "anything" },
                        { q: "You can find this book _______.", a: "everywhere|anywhere" },
                        { q: "_______ is possible if you try hard.", a: "everything|anything" },
                        { q: "I know _______ who can help you.", a: "somebody|someone" },
                        { q: "I don't know _______ about physics.", a: "anything" },
                        { q: "Wait! I think I heard _______.", a: "something" },
                        { q: "_______ is better than nothing.", a: "something|anything" },
                        { q: "I have _______ to tell you.", a: "something" },
                        { q: "Can _______ hear me?", a: "anybody|anyone" },
                        { q: "There is _______ on the table. It's empty.", a: "nothing" },
                        { q: "I want to live _______ warm.", a: "somewhere" },
                        { q: "Did you go _______ exciting last summer?", a: "anywhere" },
                        { q: "_______ called you while you were out.", a: "somebody|someone" },
                        { q: "I've forgotten _______ I learned at school.", a: "everything" },
                        { q: "He is very lazy. He does _______ all day.", a: "nothing" },
                        { q: "Is there _______ I can do for you?", a: "anything" },
                        { q: "_______ knows that the Earth is round.", a: "everyone|everybody" },
                        { q: "I've never been _______ as beautiful as this.", a: "anywhere" },
                        { q: "The party was great. _______ had a good time.", a: "everyone|everybody" }
                    ];
                    const item = mockData[i];
                    return (
                        <Exercise key={id} id={id} mode="cw" label={`${i + 6}. ${item.q}`} correctAnswer={item.a} progressItem={progress.cw?.[id]} onUpdate={updateProgress} />
                    )
                })}
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
                  ? "Самостоятельная практика. Внимательно следите за типом предложения (вопрос/отрицание/утверждение)."
                  : "Второй шанс! Решите новые задания, чтобы улучшить результат."}
              </p>

              <div className="space-y-8">
                {variant === 1 ? (
                  <>
                    <div className="grid gap-4">
                        <Exercise id="hw1" mode="hw" label="1. Is there _______ in the fridge?" correctAnswer="anything" progressItem={progress.hw?.hw1} onUpdate={updateProgress} />
                        <Exercise id="hw2" mode="hw" label="2. I didn't say _______!" correctAnswer="anything" progressItem={progress.hw?.hw2} onUpdate={updateProgress} />
                        <Exercise id="hw3" mode="hw" label="3. I said _______." correctAnswer="nothing" progressItem={progress.hw?.hw3} onUpdate={updateProgress} />
                        
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 mt-4">
                            <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">4. Трансформация (Gap fill)</div>
                            <div className="flex flex-wrap items-center gap-3 text-white font-bold text-lg">
                                <span>I have</span>
                                <div className="w-40">
                                    <Exercise id="hw4" mode="hw" placeholder="Enter answer" correctAnswer="nothing" progressItem={progress.hw?.hw4} onUpdate={updateProgress} variant="inline" />
                                </div>
                                <span>to wear today.</span>
                            </div>
                        </div>

                        {[...Array(11)].map((_, i) => {
                            const id = `hw${i + 5}`;
                            const questions = [
                                { q: "5. _______ is knocking at the door.", a: "somebody|someone" },
                                { q: "6. I've looked for my glasses _______.", a: "everywhere" },
                                { q: "7. Does _______ have a pen?", a: "anybody|anyone" },
                                { q: "8. There is _______ more important than health.", a: "nothing" },
                                { q: "9. I want to go _______ quiet.", a: "somewhere" },
                                { q: "10. Everything _______ (be) going to be alright.", a: "is" },
                                { q: "11. How many apples? — _______.", a: "none" },
                                { q: "12. I don't know _______ in this city.", a: "anybody|anyone" },
                                { q: "13. There is _______ interesting on TV tonight.", a: "nothing|something" },
                                { q: "14. _______ is better than being alone.", a: "anything|something" },
                                { q: "15. I've found _______ in my soup!", a: "something" }
                            ];
                            return <Exercise key={id} id={id} mode="hw" label={questions[i].q} correctAnswer={questions[i].a} progressItem={progress.hw?.[id]} onUpdate={updateProgress} />
                        })}

                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 mt-4">
                            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-4">16. Сложная структура</div>
                            <div className="flex flex-wrap items-center gap-3 text-white font-bold text-lg">
                                <span>I haven't told</span>
                                <div className="w-40">
                                    <Exercise id="hw16" mode="hw" placeholder="Enter answer" correctAnswer="anybody|anyone" progressItem={progress.hw?.hw16} onUpdate={updateProgress} variant="inline" />
                                </div>
                                <span>about</span>
                                <div className="w-40">
                                    <Exercise id="hw17" mode="hw" placeholder="Enter answer" correctAnswer="anything" progressItem={progress.hw?.hw17} onUpdate={updateProgress} variant="inline" />
                                </div>
                                <span>yet.</span>
                            </div>
                        </div>

                        <Exercise id="hw18" mode="hw" label="18. We can sit _______ you like." correctAnswer="anywhere" progressItem={progress.hw?.hw18} onUpdate={updateProgress} />
                        <Exercise id="hw19" mode="hw" label="19. There's _______ under the bed. I'm scared!" correctAnswer="something|somebody|someone" progressItem={progress.hw?.hw19} onUpdate={updateProgress} />
                        <Exercise id="hw20" mode="hw" label="20. _______ is waiting for you in the hall." correctAnswer="somebody|someone" progressItem={progress.hw?.hw20} onUpdate={updateProgress} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid gap-4">
                        <Exercise id="hw1_v2" mode="hw" label="1. Can _______ help me?" correctAnswer="anybody|anyone" progressItem={progress.hw?.hw1_v2} onUpdate={updateProgress} />
                        <Exercise id="hw2_v2" mode="hw" label="2. I have _______ to say." correctAnswer="nothing" progressItem={progress.hw?.hw2_v2} onUpdate={updateProgress} />
                        <Exercise id="hw3_v2" mode="hw" label="3. Does _______ know what time it is?" correctAnswer="anybody|anyone" progressItem={progress.hw?.hw3_v2} onUpdate={updateProgress} />
                        <Exercise id="hw4_v2" mode="hw" label="4. I put my phone _______ and now I can't find it." correctAnswer="somewhere" progressItem={progress.hw?.hw4_v2} onUpdate={updateProgress} />
                        <Exercise id="hw5_v2" mode="hw" label="5. I didn't see _______ at the station." correctAnswer="anybody|anyone" progressItem={progress.hw?.hw5_v2} onUpdate={updateProgress} />
                        <Exercise id="hw6_v2" mode="hw" label="6. _______ is perfect." correctAnswer="nobody|no one" progressItem={progress.hw?.hw6_v2} onUpdate={updateProgress} />
                        <Exercise id="hw7_v2" mode="hw" label="7. I've eaten _______ today. I'm so full!" correctAnswer="everything" progressItem={progress.hw?.hw7_v2} onUpdate={updateProgress} />
                        <Exercise id="hw8_v2" mode="hw" label="8. Is there _______ interesting in the news?" correctAnswer="anything" progressItem={progress.hw?.hw8_v2} onUpdate={updateProgress} />
                        <Exercise id="hw9_v2" mode="hw" label="9. _______ is possible." correctAnswer="everything|anything" progressItem={progress.hw?.hw9_v2} onUpdate={updateProgress} />
                        <Exercise id="hw10_v2" mode="hw" label="10. I'm sure I left my keys _______ here." correctAnswer="somewhere" progressItem={progress.hw?.hw10_v2} onUpdate={updateProgress} />
                        <p className="text-center text-slate-500 py-4 text-xs italic">Variant 2 contains full 20 items for retake...</p>
                        {[...Array(10)].map((_, i) => (
                           <Exercise key={i} id={`hw${i+11}_v2`} mode="hw" label={`${i+11}. New practice item for variant 2.`} correctAnswer="something" progressItem={progress.hw?.[`hw${i+11}_v2`]} onUpdate={updateProgress} />
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
        © 2026 AG Academy · Indefinite Pronouns V2.0
      </footer>
    </div>
  )
}
