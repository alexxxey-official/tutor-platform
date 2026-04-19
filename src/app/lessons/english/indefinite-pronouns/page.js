'use client'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
import { Home, BookOpen, PenTool, CheckCircle, Star, AlertCircle, Info } from 'lucide-react'
import Link from 'next/link'

export default function IndefinitePronounsPage() {
  const lessonId = 'eng_nobody'
  // CW: 5 (Reading) + 10 (Dropdown) + 5 (Builder) + 5 (Transformation) + 5 (Logic) = 30
  // HW: 20 items per variant
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
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800;900&display=swap');
        .unbounded { font-family: 'Unbounded', sans-serif; }
      `}} />

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
            {/* Card 1: The Basics */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Info size={20} className="text-blue-600" /> 1. Основные группы
              </h3>
              <p className="mb-6 leading-relaxed">
                Неопределенные местоимения в английском строятся как конструктор: мы берем <strong>основу</strong> (Some, Any, No, Every) и добавляем к ней <strong>категорию</strong>.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 font-bold text-slate-400 uppercase tracking-wider">Категория</th>
                      <th className="text-left py-3 font-bold text-slate-400 uppercase tracking-wider">Окончание</th>
                      <th className="text-left py-3 font-bold text-slate-400 uppercase tracking-wider">Значение</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-4 font-bold">Люди</td>
                      <td className="py-4 text-blue-600 font-mono">-body / -one</td>
                      <td className="py-4 text-slate-600 italic">Somebody / Everyone</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Предметы</td>
                      <td className="py-4 text-blue-600 font-mono">-thing</td>
                      <td className="py-4 text-slate-600 italic">Something / Nothing</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Места</td>
                      <td className="py-4 text-blue-600 font-mono">-where</td>
                      <td className="py-4 text-slate-600 italic">Somewhere / Anywhere</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 2: Usage Rules */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400"></div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Star size={20} className="text-amber-500" /> 2. Правила выбора основы
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-blue-600 uppercase tracking-widest text-xs">Some-</strong>
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">Affirmative (+)</span>
                  </div>
                  <p className="text-sm">Используем в утверждениях или когда что-то предлагаем.</p>
                  <p className="text-xs italic text-slate-500 mt-2">Example: Would you like <span className="text-indigo-600 font-bold">something</span> to drink?</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-amber-600 uppercase tracking-widest text-xs">Any-</strong>
                    <span className="text-[10px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-bold">Questions (?) & Negatives (-)</span>
                  </div>
                  <p className="text-sm">Используем в вопросах и отрицаниях с частицей NOT.</p>
                  <p className="text-xs italic text-slate-500 mt-2">Example: I don't know <span className="text-indigo-600 font-bold">anybody</span> here.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-rose-600 uppercase tracking-widest text-xs">No-</strong>
                    <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">Hard Negatives (-)</span>
                  </div>
                  <p className="text-sm">Используем для отрицания БЕЗ частицы NOT. <strong>Двойное отрицание запрещено!</strong></p>
                  <p className="text-xs italic text-slate-500 mt-2">Example: <span className="text-indigo-600 font-bold">Nobody</span> called me. (NOT: Nobody didn't call)</p>
                </div>
              </div>
            </div>

            {/* Card 3: The Singularity Rule */}
            <div className="bg-indigo-950 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-10 text-white">
                <AlertCircle size={80} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">⚠️ Правило "Единственного числа"</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Даже если местоимение означает "все" (Everyone) или "всё" (Everything), грамматически это всегда <strong>ОН/ОНО</strong>.
              </p>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl font-mono text-emerald-400">
                Everyone <span className="underline text-white">is</span> happy. (NOT: Everyone are)<br/>
                Nothing <span className="underline text-white">happens</span> by chance.
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
          <p className="text-slate-500 mb-8">Практикуем основы, логику и сложные конструкции.</p>

          <div className="space-y-12">
            {/* Block 1: Reading / Context */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div> Блок 1: Понимание контекста
              </h3>
              <div className="space-y-4">
                <Exercise
                  id="cw1"
                  mode="cw"
                  type="mcq"
                  label='1. В каком случае мы ГАРАНТИРОВАННО используем "Something" вместо "Anything" в вопросе?'
                  options={[
                    "Если мы не знаем ответа.",
                    "Если мы предлагаем что-то (Would you like...?)",
                    "Если в предложении есть частица NOT."
                  ]}
                  correctAnswer="Если мы предлагаем что-то (Would you like...?)"
                  progressItem={progress.cw?.cw1}
                  onUpdate={updateProgress}
                />
                <Exercise
                  id="cw2"
                  mode="cw"
                  type="mcq"
                  label='2. Как правильно перевести: "Там никого нет" (без использования NOT)?'
                  options={[
                    "There isn't anyone there.",
                    "There is nobody there.",
                    "There is no anyone there."
                  ]}
                  correctAnswer="There is nobody there."
                  progressItem={progress.cw?.cw2}
                  onUpdate={updateProgress}
                />
                {[...Array(3)].map((_, i) => (
                  <Exercise
                    key={`cw_mcq_${i}`}
                    id={`cw_m${i+3}`}
                    mode="cw"
                    type="mcq"
                    label={`${i+3}. Выберите верное окончание: "Everything _____ ready."`}
                    options={["is", "are", "am"]}
                    correctAnswer="is"
                    progressItem={progress.cw?.[`cw_m${i+3}`]}
                    onUpdate={updateProgress}
                  />
                ))}
              </div>
            </div>

            {/* Block 2: Mechanics (Dropdown) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-600">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Блок 2: Выберите основу
              </h3>
              <div className="grid gap-4">
                {[
                  { id: 'cw6', q: "I can't find my keys _______.", ans: 'anywhere', opts: ['anywhere', 'nowhere', 'somewhere'] },
                  { id: 'cw7', q: "Wait! I think I heard _______.", ans: 'something', opts: ['something', 'anything', 'nothing'] },
                  { id: 'cw8', q: "Does _______ know where Leo is?", ans: 'anybody', opts: ['anybody', 'somebody', 'nobody'] },
                  { id: 'cw9', q: "I'm so bored, there is _______ to do.", ans: 'nothing', opts: ['nothing', 'anything', 'everything'] },
                  { id: 'cw10', q: "Look! _______ is coming towards us.", ans: 'somebody', opts: ['somebody', 'anybody', 'nobody'] },
                  { id: 'cw11', q: "I've looked _______, but I can't find it.", ans: 'everywhere', opts: ['everywhere', 'anywhere', 'somewhere'] },
                  { id: 'cw12', q: "Don't worry, _______ is going to be okay.", ans: 'everything', opts: ['everything', 'anything', 'something'] },
                  { id: 'cw13', q: "I didn't tell _______ about the secret.", ans: 'anybody', opts: ['anybody', 'somebody', 'nobody'] },
                  { id: 'cw14', q: "There is _______ interesting on TV tonight.", ans: 'nothing', opts: ['nothing', 'anything', 'something'] },
                  { id: 'cw15', q: "I want to live _______ warm.", ans: 'somewhere', opts: ['somewhere', 'anywhere', 'nowhere'] },
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

            {/* Block 3: Sentence Builder */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 unbounded text-amber-400">Блок 3: Порядок слов</h3>
              <div className="space-y-6">
                {[
                  { id: 'cw16', ans: "There is nothing in the bag", opts: ['the bag', 'nothing', 'There', 'in', 'is'] },
                  { id: 'cw17', ans: "I don't know anyone here", opts: ['anyone', 'I', 'know', 'here', "don't"] },
                  { id: 'cw18', ans: "Everything was ready for the party", opts: ['ready', 'Everything', 'for', 'was', 'the party'] },
                  { id: 'cw19', ans: "Is there anything I can do ?", opts: ['can', 'I', 'anything', 'Is', 'there', 'do', '?'] },
                  { id: 'cw20', ans: "Nobody knows the answer to this", opts: ['answer', 'the', 'knows', 'to this', 'Nobody'] },
                ].map(ex => (
                  <Exercise
                    key={ex.id}
                    id={ex.id}
                    mode="cw"
                    type="builder"
                    label="Assemble the sentence:"
                    options={ex.opts}
                    correctAnswer={ex.ans}
                    progressItem={progress.cw?.[ex.id]}
                    onUpdate={updateProgress}
                  />
                ))}
              </div>
            </div>

            {/* Block 4: Gap-fill Transformation */}
            <div className="bg-white p-8 rounded-3xl border-2 border-indigo-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-indigo-600">Блок 4: Трансформация смыслов</h3>
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-3 text-slate-900 font-bold text-lg">
                  <span className="text-sm text-slate-400 w-full mb-2 uppercase tracking-widest font-mono">21. (I don't have anything) {'->'}</span>
                  <span>I have</span>
                  <div className="w-40">
                    <Exercise id="cw21" mode="cw" placeholder="Enter answer" correctAnswer="nothing" progressItem={progress.cw?.cw21} onUpdate={updateProgress} variant="inline" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-slate-900 font-bold text-lg">
                  <span className="text-sm text-slate-400 w-full mb-2 uppercase tracking-widest font-mono">22. (Nobody is here) {'->'}</span>
                  <span>There isn't</span>
                  <div className="w-40">
                    <Exercise id="cw22" mode="cw" placeholder="Enter answer" correctAnswer="anybody|anyone" progressItem={progress.cw?.cw22} onUpdate={updateProgress} variant="inline" />
                  </div>
                  <span>here.</span>
                </div>

                {[...Array(3)].map((_, i) => (
                  <div key={`cw_gap_${i}`} className="flex flex-wrap items-center gap-3 text-slate-900 font-bold text-lg border-t border-slate-50 pt-6">
                    <span className="text-sm text-slate-400 w-full mb-2 uppercase tracking-widest font-mono">{i+23}. Fill the gap:</span>
                    <span>Is there</span>
                    <div className="w-40">
                      <Exercise id={`cw23_${i}`} mode="cw" placeholder="Enter answer" correctAnswer="anything" progressItem={progress.cw?.[`cw23_${i}`]} onUpdate={updateProgress} variant="inline" />
                    </div>
                    <span>wrong?</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 5: Core Logic (Text Inputs) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Блок 5: Напишите верное слово</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'cw26', q: "All people {'->'}", ans: 'everyone|everybody' },
                    { id: 'cw27', q: "No thing {'->'}", ans: 'nothing' },
                    { id: 'cw28', q: "All places {'->'}", ans: 'everywhere' },
                    { id: 'cw29', q: "Not any thing {'->'}", ans: 'nothing|anything' },
                    { id: 'cw30', q: "One person (some) {'->'}", ans: 'somebody|someone' },
                  ].map(ex => (
                    <Exercise
                      key={ex.id}
                      id={ex.id}
                      mode="cw"
                      type="text"
                      label={ex.q}
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
              
              <p className="text-slate-400 mb-12 max-w-xl">
                {variant === 1 
                  ? "Самостоятельная практика. Внимательно следите за типом предложения и отсутствием двойных отрицаний."
                  : "Второй шанс! Решите новые задания, чтобы улучшить результат. Будьте внимательны к деталям."}
              </p>

              <div className="space-y-12">
                {variant === 1 ? (
                  <>
                    {/* VARIANT 1 - 20 ITEMS */}
                    <div className="space-y-6">
                        {[
                          { id: 'hw1', q: "1. Is there _______ in the fridge?", a: "anything" },
                          { id: 'hw2', q: "2. I didn't say _______!", a: "anything" },
                          { id: 'hw3', q: "3. I said _______.", a: "nothing" },
                          { id: 'hw4', q: "4. _______ is knocking at the door.", a: "somebody|someone" },
                          { id: 'hw5', q: "5. I've looked for my glasses _______.", a: "everywhere" },
                          { id: 'hw6', q: "6. Does _______ have a pen?", a: "anybody|anyone" },
                          { id: 'hw7', q: "7. There is _______ more important than health.", a: "nothing" },
                          { id: 'hw8', q: "8. I want to go _______ quiet.", a: "somewhere" },
                          { id: 'hw9', q: "9. How many apples? — _______.", a: "none" },
                        ].map(ex => (
                          <Exercise key={ex.id} id={ex.id} mode="hw" label={ex.q} correctAnswer={ex.a} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} />
                        ))}

                        {/* Gap fill transformation */}
                        <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700/50 my-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8 flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> 10. Sentence Logic
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 text-white font-bold text-lg">
                                <span>I have</span>
                                <div className="w-40">
                                    <Exercise id="hw10" mode="hw" placeholder="Enter answer" correctAnswer="nothing" progressItem={progress.hw?.hw10} onUpdate={updateProgress} variant="inline" />
                                </div>
                                <span>to wear today, because</span>
                                <div className="w-40">
                                    <Exercise id="hw11" mode="hw" placeholder="Enter answer" correctAnswer="everyone|everybody" progressItem={progress.hw?.hw11} onUpdate={updateProgress} variant="inline" />
                                </div>
                                <span>took my clothes.</span>
                            </div>
                        </div>

                        {[
                          { id: 'hw12', q: "12. I don't know _______ in this city.", a: "anybody|anyone" },
                          { id: 'hw13', q: "13. There is _______ interesting on TV tonight.", a: "nothing|something" },
                          { id: 'hw14', q: "14. _______ is better than being alone.", a: "anything|something" },
                          { id: 'hw15', q: "15. I've found _______ in my soup!", a: "something" },
                          { id: 'hw16', q: "16. We can sit _______ you like.", a: "anywhere" },
                          { id: 'hw17', q: "17. There's _______ under the bed. I'm scared!", a: "something|somebody|someone" },
                          { id: 'hw18', q: "18. _______ is waiting for you in the hall.", a: "somebody|someone" },
                          { id: 'hw19', q: "19. The room was empty. _______ was there.", a: "nobody|no one" },
                          { id: 'hw20', q: "20. I didn't go _______ last night.", a: "anywhere" },
                        ].map(ex => (
                          <Exercise key={ex.id} id={ex.id} mode="hw" label={ex.q} correctAnswer={ex.a} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} />
                        ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* VARIANT 2 - 20 ITEMS */}
                    <div className="space-y-6">
                        {[
                          { id: 'hw1_v2', q: "1. Can _______ help me with this box?", a: "anybody|anyone|somebody|someone" },
                          { id: 'hw2_v2', q: "2. I have _______ to say to you.", a: "nothing" },
                          { id: 'hw3_v2', q: "3. Does _______ know what time it is?", a: "anybody|anyone" },
                          { id: 'hw4_v2', q: "4. I put my phone _______ and now I can't find it.", a: "somewhere" },
                          { id: 'hw5_v2', q: "5. I didn't see _______ at the station.", a: "anybody|anyone" },
                          { id: 'hw6_v2', q: "6. _______ is perfect, so don't worry.", a: "nobody|no one" },
                          { id: 'hw7_v2', q: "7. I've eaten _______ today. I'm so full!", a: "everything" },
                          { id: 'hw8_v2', q: "8. Is there _______ interesting in the news?", a: "anything" },
                          { id: 'hw9_v2', q: "9. _______ is possible if you try.", a: "everything|anything" },
                        ].map(ex => (
                          <Exercise key={ex.id} id={ex.id} mode="hw" label={ex.q} correctAnswer={ex.a} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} />
                        ))}

                        {/* Gap fill transformation */}
                        <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700/50 my-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400 mb-8 flex items-center gap-3">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div> 10. Sentence Logic V2
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 text-white font-bold text-lg">
                                <span>I looked</span>
                                <div className="w-40">
                                    <Exercise id="hw10_v2" mode="hw" placeholder="Enter answer" correctAnswer="everywhere" progressItem={progress.hw?.hw10_v2} onUpdate={updateProgress} variant="inline" />
                                </div>
                                <span>but found</span>
                                <div className="w-40">
                                    <Exercise id="hw11_v2" mode="hw" placeholder="Enter answer" correctAnswer="nothing" progressItem={progress.hw?.hw11_v2} onUpdate={updateProgress} variant="inline" />
                                </div>
                                <span>.</span>
                            </div>
                        </div>

                        {[
                          { id: 'hw12_v2', q: "12. I'm sure I left my keys _______ here.", a: "somewhere" },
                          { id: 'hw13_v2', q: "13. I didn't do _______ wrong.", a: "anything" },
                          { id: 'hw14_v2', q: "14. _______ knows that the Earth is round.", a: "everyone|everybody" },
                          { id: 'hw15_v2', q: "15. I've never been _______ as beautiful as this.", a: "anywhere" },
                          { id: 'hw16_v2', q: "16. The party was great. _______ had a good time.", a: "everyone|everybody" },
                          { id: 'hw17_v2', q: "17. There's _______ at the door. Go check.", a: "somebody|someone" },
                          { id: 'hw18_v2', q: "18. I have _______ more to add.", a: "nothing" },
                          { id: 'hw19_v2', q: "19. Did you see _______ you liked?", a: "anything" },
                          { id: 'hw20_v2', q: "20. _______ is waiting for you upstairs.", a: "somebody|someone" },
                        ].map(ex => (
                          <Exercise key={ex.id} id={ex.id} mode="hw" label={ex.q} correctAnswer={ex.a} progressItem={progress.hw?.[ex.id]} onUpdate={updateProgress} />
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
        © 2026 AG Academy · Indefinite Pronouns V2.5
      </footer>
    </div>
  )
}
