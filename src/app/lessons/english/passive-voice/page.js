'use client'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { RefreshCcw, Home, BookOpen, PenTool, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function PassiveVoicePage() {
  const lessonId = 'eng_passive'
  // CW: 2 (Reading) + 8 (Dropdown) + 5 (Builder) + 3 (MCQ) + 5 (V3) = 23
  // HW: 18
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
      <header className="bg-indigo-950 text-white py-12 md:py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[100px] md:text-[150px] font-black opacity-5 pointer-events-none select-none unbounded translate-x-20 -translate-y-10">PASSIVE</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            🇬🇧 Урок 1 · Grammar B1
          </div>
          <h1 className="text-3xl md:text-5xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight">
            The Passive <br/><span className="text-amber-400 italic">Voice</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Учимся фокусироваться на действии, а не на исполнителе.
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
          <Link href="/" className="px-3 py-1.5 bg-white rounded-xl shadow-sm border border-slate-200 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Home size={14} /> Home
          </Link>
          <a href="#theory" className="px-3 py-1.5 bg-white rounded-xl shadow-sm border border-slate-200 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <BookOpen size={14} /> Theory
          </a>
          <a href="#classwork" className="px-3 py-1.5 bg-white rounded-xl shadow-sm border border-slate-200 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <PenTool size={14} /> Practice
          </a>
          <a href="#homework" className="px-3 py-1.5 bg-white rounded-xl shadow-sm border border-slate-200 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <CheckCircle size={14} /> Homework
          </a>
        </nav>

        {/* THEORY */}
        <section id="theory" className="mb-16 scroll-mt-10">
          <h2 className="text-2xl font-black unbounded mb-6 uppercase tracking-tight">Focus on the Action</h2>
          <div className="grid gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
              <h3 className="text-lg font-bold mb-3">1. Active vs Passive</h3>
              <p className="text-sm text-slate-600 mb-4">
                Active: Shakespeare wrote Hamlet. (Subject does the action)<br/>
                Passive: Hamlet <strong>was written</strong> by Shakespeare. (Action is done to the subject)
              </p>
              <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-teal-900 text-sm">
                <div className="font-bold">Formula: to be + V3</div>
              </div>
            </div>
          </div>
        </section>

        {/* READING */}
        <section id="reading" className="mb-16">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl mb-6 text-slate-700 text-sm italic leading-relaxed">
            Chocolate <strong>is loved</strong> by people all over the world... Cacao beans <strong>are grown</strong> on small farms.
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <Exercise id="cw1" mode="cw" type="mcq" label="How are cacao beans harvested?" options={["By hand", "By machine"]} correctAnswer="By hand" progressItem={progress.cw?.cw1} onUpdate={updateProgress} compact />
            <Exercise id="cw2" mode="cw" type="mcq" label="Where are they roasted?" options={["At the factory", "In the sun"]} correctAnswer="At the factory" progressItem={progress.cw?.cw2} onUpdate={updateProgress} compact />
          </div>
        </section>

        {/* CLASSWORK */}
        <section id="classwork" className="mb-16">
          <h2 className="text-2xl font-black unbounded mb-6 uppercase">Classwork</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold mb-4 text-indigo-600">Tense Selection</h3>
              {[
                { id: 'cw3', q: "The office ___ cleaned every day.", ans: 'is', opts: ['is', 'are', 'was'] },
                { id: 'cw4', q: "My car ___ stolen last night.", ans: 'was', opts: ['is', 'was', 'were'] },
                { id: 'cw5', q: "The bridge ___ opened next year.", ans: 'will be', opts: ['is', 'will be'] },
              ].map(ex => (
                <Exercise key={ex.id} id={ex.id} mode="cw" type="dropdown" label={ex.q} options={ex.opts} correctAnswer={ex.ans} progressItem={progress.cw?.[ex.id]} onUpdate={updateProgress} compact />
              ))}
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
              <h3 className="font-bold mb-4 text-amber-400">Sentence Builder</h3>
              <Exercise id="cw11" mode="cw" type="builder" label="Письмо было написано вчера." options={['yesterday', 'written', 'was', 'The', 'letter']} correctAnswer="The letter was written yesterday" progressItem={progress.cw?.cw11} onUpdate={updateProgress} compact />
            </div>
          </div>
        </section>

        {/* HOMEWORK */}
        <section id="homework" className="mb-16 scroll-mt-10">
          <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black unbounded uppercase text-amber-400">Homework</h2>
              {variant === 1 && statsHW.isComplete && statsHW.pct < 60 && (
                <button onClick={resetHW} className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-bold flex items-center gap-2">
                  <RefreshCcw size={14} /> Retake
                </button>
              )}
            </div>

            <div className="space-y-10">
              {variant === 1 ? (
                <>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Part 1: Present Simple</h4>
                    <Exercise id="hw1" mode="hw" label="1. English (speak) in Australia." correctAnswer="is spoken" progressItem={progress.hw?.hw1} onUpdate={updateProgress} />
                    <Exercise id="hw2" mode="hw" label="2. These cars (make) in Japan." correctAnswer="are made" progressItem={progress.hw?.hw2} onUpdate={updateProgress} />
                    
                    <div className="bg-slate-800/50 p-6 rounded-[1.5rem] border border-slate-700/50 shadow-inner">
                      <div className="text-[9px] font-black uppercase text-blue-500 mb-4 tracking-widest">Question Transformation</div>
                      <div className="text-lg font-black text-white mb-6 text-center leading-tight italic">“Do they clean the rooms every day?”</div>
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 mb-6">
                        <div className="w-32"><Exercise id="hw4_1" mode="hw" placeholder="To be..." correctAnswer="Are" progressItem={progress.hw?.hw4_1} onUpdate={updateProgress} variant="inline" /></div>
                        <span className="text-slate-400 font-bold">the rooms</span>
                        <div className="w-40"><Exercise id="hw4_2" mode="hw" placeholder="V3 form..." correctAnswer="cleaned" progressItem={progress.hw?.hw4_2} onUpdate={updateProgress} variant="inline" /></div>
                        <span className="text-slate-400 font-bold">every day?</span>
                      </div>
                      <button onClick={() => {['hw4_1','hw4_2'].forEach(i=>window.dispatchEvent(new CustomEvent('trigger-check',{detail:{id:i}})))}} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-blue-400 font-black uppercase tracking-widest text-[9px]">Check Sentence</button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-slate-800">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2">Part 2: Past Simple</h4>
                    <Exercise id="hw6" mode="hw" label="6. My wallet (steal) yesterday." correctAnswer="was stolen" progressItem={progress.hw?.hw6} onUpdate={updateProgress} />
                    
                    <div className="bg-slate-800/50 p-6 rounded-[1.5rem] border border-slate-700/50 shadow-inner">
                      <div className="text-[9px] font-black uppercase text-amber-500 mb-4 tracking-widest">Question Transformation</div>
                      <div className="text-lg font-black text-white mb-6 text-center leading-tight italic">“Did Shakespeare write this play?”</div>
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 mb-6">
                        <div className="w-32"><Exercise id="hw9_1" mode="hw" placeholder="To be..." correctAnswer="Was" progressItem={progress.hw?.hw9_1} onUpdate={updateProgress} variant="inline" /></div>
                        <span className="text-slate-400 font-bold">this play</span>
                        <div className="w-40"><Exercise id="hw9_2" mode="hw" placeholder="V3 form..." correctAnswer="written" progressItem={progress.hw?.hw9_2} onUpdate={updateProgress} variant="inline" /></div>
                        <span className="text-slate-400 font-bold">by Shakespeare?</span>
                      </div>
                      <button onClick={() => {['hw9_1','hw9_2'].forEach(i=>window.dispatchEvent(new CustomEvent('trigger-check',{detail:{id:i}})))}} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-amber-400 font-black uppercase tracking-widest text-[9px]">Check Sentence</button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-slate-800">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-2">Part 3: Future & Perfect</h4>
                    <Exercise id="hw11" mode="hw" label="11. The project (will / finish) tomorrow." correctAnswer="will be finished" progressItem={progress.hw?.hw11} onUpdate={updateProgress} />
                    
                    <div className="bg-slate-800/50 p-6 rounded-[1.5rem] border border-slate-700/50 shadow-inner">
                      <div className="text-[9px] font-black uppercase text-teal-400 mb-4 tracking-widest">Future Question</div>
                      <div className="text-lg font-black text-white mb-6 text-center leading-tight italic">“Will they serve dinner at 8?”</div>
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 mb-6">
                        <div className="w-32"><Exercise id="hw15_1" mode="hw" placeholder="Will...?" correctAnswer="Will" progressItem={progress.hw?.hw15_1} onUpdate={updateProgress} variant="inline" /></div>
                        <span className="text-slate-400 font-bold">dinner</span>
                        <div className="w-40"><Exercise id="hw15_2" mode="hw" placeholder="be + V3..." correctAnswer="be served" progressItem={progress.hw?.hw15_2} onUpdate={updateProgress} variant="inline" /></div>
                        <span className="text-slate-400 font-bold">at 8?</span>
                      </div>
                      <button onClick={() => {['hw15_1','hw15_2'].forEach(i=>window.dispatchEvent(new CustomEvent('trigger-check',{detail:{id:i}})))}} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-teal-400 font-black uppercase tracking-widest text-[9px]">Check Sentence</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Variant 2: Practice</h4>
                    <Exercise id="hw1_v2" mode="hw" label="1. Spanish (speak) in Mexico." correctAnswer="is spoken" progressItem={progress.hw?.hw1_v2} onUpdate={updateProgress} />
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-inner">
                      <div className="text-lg font-black text-white mb-6 text-center italic">“Does he help you every day?”</div>
                      <div className="flex flex-wrap justify-center gap-3">
                        <div className="w-32"><Exercise id="hw4_1_v2" mode="hw" placeholder="To be..." correctAnswer="Are" progressItem={progress.hw?.hw4_1_v2} onUpdate={updateProgress} variant="inline" /></div>
                        <span className="text-slate-400 font-bold">you</span>
                        <div className="w-40"><Exercise id="hw4_2_v2" mode="hw" placeholder="V3 form..." correctAnswer="helped" progressItem={progress.hw?.hw4_2_v2} onUpdate={updateProgress} variant="inline" /></div>
                        <span className="text-slate-400 font-bold">every day?</span>
                      </div>
                      <button onClick={() => {['hw4_1_v2','hw4_2_v2'].forEach(i=>window.dispatchEvent(new CustomEvent('trigger-check',{detail:{id:i}})))}} className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl text-blue-400 font-black uppercase text-[9px]">Check Sentence</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      <footer className="text-center text-slate-500 text-[10px] mt-12 opacity-50 uppercase tracking-widest font-bold">
        © 2026 AG Academy · Excellence in Grammar
      </footer>
    </div>
  )
}
