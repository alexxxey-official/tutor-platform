'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import confetti from 'canvas-confetti'
import { Check, AlertCircle, RefreshCcw, BookOpen, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Данные для упражнений (те же, что в HTML)
const CW_BLOCK1 = [
  { id: 'cw3', problem: '3. (Every day) The office', options: ['is', 'are', 'was', 'will be'], ans: 'is', type: 'dropdown' },
  { id: 'cw4', problem: '4. (Last night) My car', options: ['is', 'was', 'were', 'has been'], ans: 'was', type: 'dropdown' },
  { id: 'cw5', problem: '5. (Next year) The new bridge', options: ['is', 'was', 'will be'], ans: 'will be', type: 'dropdown' },
  { id: 'cw6', problem: '6. (Just now / Result) Oh no! The window', options: ['is', 'was', 'has been'], ans: 'has been', type: 'dropdown' },
  { id: 'cw7', problem: '7. (Usually) Millions of emails', options: ['is', 'are', 'were'], ans: 'are', type: 'dropdown' },
  { id: 'cw8', problem: "8. (In 1997) Harry Potter", options: ['is', 'was', 'were'], ans: 'was', type: 'dropdown' },
  { id: 'cw9', problem: '9. The cake was made', options: ['by', 'with'], ans: 'with', type: 'dropdown', label: '(Ингредиент)' },
  { id: 'cw10', problem: '10. The photo was taken', options: ['by', 'with'], ans: 'by', type: 'dropdown', label: '(Человек)' },
]

export default function PassiveVoiceLegacyPage() {
  const lessonId = 'eng_passive_v3' // Используем новый ID для чистых тестов
  const cwCount = 23
  const hwCount = 15
  const { progress, updateProgress, resetHW, variant, getStats, loading } = 
    useLessonProgress(lessonId, cwCount, hwCount)

  // Local state for inputs to avoid jumping
  const [inputs, setInputs] = useState({})
  const [builders, setBuilders] = useState({
    zone1: [], zone2: [], zone3: [], zone4: [], zone5: []
  })
  const [banks, setBanks] = useState({
    bank1: ['yesterday', 'written', 'was', 'The', 'letter'],
    bank2: ['all over', 'spoken', 'is', 'the world', 'English'],
    bank3: ['My', 'stolen', 'phone', 'has', 'been'],
    bank4: ['built', 'was', 'the house', 'When', '?'],
    bank5: ['be', 'finished', 'The report', 'will', 'tomorrow']
  })

  useEffect(() => {
    // Синхронизация локального стейта с загруженным прогрессом если нужно
  }, [loading])

  const handleInputChange = (id, val) => {
    setInputs(prev => ({ ...prev, [id]: val }))
  }

  const checkExercise = (id, correctAns, mode = 'cw') => {
    const userAns = inputs[id] || ''
    const isCorrect = userAns.toLowerCase().trim() === correctAns.toLowerCase().trim()
    updateProgress(id, mode, isCorrect ? 'correct' : 'wrong', 1)
    if (isCorrect && id.startsWith('hw') && getStats('hw').correct + 1 === hwCount) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
    }
  }

  const toggleWord = (word, zoneKey, bankKey) => {
    if (progress.cw?.[zoneKey]?.status === 'correct') return
    
    setBuilders(prev => {
      const inZone = prev[zoneKey].includes(word)
      if (inZone) {
        setBanks(b => ({ ...b, [bankKey]: [...b[bankKey], word] }))
        return { ...prev, [zoneKey]: prev[zoneKey].filter(w => w !== word) }
      } else {
        setBanks(b => ({ ...b, [bankKey]: b[bankKey].filter(w => w !== word) }))
        return { ...prev, [zoneKey]: [...prev[zoneKey], word] }
      }
    })
  }

  const checkBuilder = (id, zoneKey, correctStr) => {
    const userStr = builders[zoneKey].join(' ')
    const isCorrect = userStr === correctStr
    updateProgress(id, 'cw', isCorrect ? 'correct' : 'wrong', 1)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  const cwStats = getStats('cw')

  return (
    <div className="legacy-theme">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        :root { 
            --ink: #1e1b4b; --paper: #f8fafc; --accent: #2563eb; --gold: #f59e0b; 
            --teal: #0d9488; --muted: #64748b; --card: #ffffff; --border: #e2e8f0; 
            --correct: #059669; --wrong: #dc2626; 
        }

        .legacy-theme {
            font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); line-height: 1.7; padding-bottom: 80px;
        }

        .hero { background: var(--ink); color: white; padding: 80px 40px 60px; position: relative; overflow: hidden; }
        .hero .label { font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
        .hero h1 { font-family: 'Unbounded', sans-serif; font-weight: 800; font-size: clamp(32px,5vw,52px); line-height: 1.1; margin-bottom: 16px; position: relative; z-index: 2; }
        .hero h1 em { color: var(--gold); font-style: italic; font-family: serif; font-weight: 400; }
        .hero p { color: rgba(255,255,255,.8); font-size: 18px; max-width: 540px; position: relative; z-index: 2; }
        .hero::before { content: 'V3'; position: absolute; right: 10px; top: -10px; font-size: 180px; color: rgba(255,255,255,.02); font-family: 'Unbounded', sans-serif; font-weight: 800; z-index: 1; pointer-events: none;}

        .container { max-width: 860px; margin: 0 auto; padding: 0 24px; }

        .toc { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; margin: 32px 0; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
        .toc a { background: #f1f5f9; color: var(--ink); text-decoration: none; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; transition: all .2s; }
        .toc a:hover { background: var(--accent); color: white; }

        .section-label { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent); margin: 56px 0 20px; }
        .section-label::after { content: ''; display: block; width: 40px; height: 2px; background: var(--accent); }
        
        h2 { font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: 28px; margin-bottom: 24px; }

        .theory-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 32px 40px; margin-bottom: 20px; position: relative; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .theory-card .stripe { position: absolute; left: 0; top: 20px; bottom: 20px; width: 4px; border-radius: 0 2px 2px 0; background: var(--accent); }
        .theory-card.gold .stripe { background: var(--gold); }
        .theory-card.teal .stripe { background: var(--teal); }
        .theory-card h3 { font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 16px; }

        .rule-box { background: linear-gradient(135deg,#f0fdf4,#ccfbf1); border: 1px solid #5eead4; border-left: 4px solid var(--teal); border-radius: 10px; padding: 16px 20px; margin: 16px 0; font-size: 14px; color: #115e59; }

        .conj-table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 15px; }
        .conj-table th, .conj-table td { border: 1px solid var(--border); padding: 14px 16px; text-align: left; }
        .conj-table th { background: #f8fafc; font-weight: 600; }

        .reading-text { font-size: 16px; line-height: 1.8; color: #334155; background: #fffbeb; border-left: 4px solid var(--gold); padding: 24px 32px; border-radius: 0 16px 16px 0; margin-bottom: 24px; }

        .exercise-set { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-bottom: 24px; }
        .exercise-set-header { padding: 20px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--border); background: #fafaf9; }
        .difficulty-dot { width: 10px; height: 10px; border-radius: 50%; }
        .difficulty-dot.teal { background: var(--teal); }
        .difficulty-dot.easy { background: var(--teal); }
        .difficulty-dot.medium { background: var(--gold); }
        .difficulty-dot.hard { background: var(--accent); }
        .exercise-set-header h3 { font-size: 16px; font-weight: 700; margin: 0; }

        .exercise-list { padding: 16px 24px; }
        .exercise-item { border-bottom: 1px dashed var(--border); padding: 24px 0; display: flex; flex-direction: column; gap: 12px; }
        .exercise-item:last-child { border-bottom: none; }
        .ex-problem { font-size: 16px; font-weight: 500; color: var(--ink); }

        .answer-input { border: 1.5px solid var(--border); border-radius: 8px; padding: 10px 14px; font-family: 'DM Mono', monospace; font-size: 15px; min-width: 220px; outline: none; transition: all .2s; }
        .answer-input:focus { border-color: var(--accent); }
        .answer-input.correct { border-color: var(--correct); background: #ecfdf5; color: var(--correct); }
        .answer-input.wrong { border-color: var(--wrong); background: #fef2f2; color: var(--wrong); }

        .inline-select { appearance: none; background: #f8fafc; border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 36px 8px 14px; font-family: 'DM Mono', monospace; font-size: 15px; color: var(--accent); font-weight: 600; cursor: pointer; outline: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
        .inline-select.correct { border-color: var(--correct); color: var(--correct); background-color: #ecfdf5; }
        .inline-select.wrong { border-color: var(--wrong); color: var(--wrong); background-color: #fef2f2; }

        .mcq-grid { display: grid; grid-template-columns: 1fr; gap: 12px; width: 100%; margin-top: 10px; }
        .mcq-btn { background: white; border: 1.5px solid var(--border); border-radius: 10px; padding: 16px 20px; font-size: 15px; text-align: left; cursor: pointer; transition: all 0.2s; }
        .mcq-btn:hover { border-color: var(--accent); }
        .mcq-btn.selected { border-color: var(--accent); background: #eff6ff; }
        .mcq-btn.correct { border-color: var(--correct); background: #ecfdf5; color: var(--correct); font-weight: 600; }
        .mcq-btn.wrong { border-color: var(--wrong); background: #fef2f2; color: var(--wrong); }

        .drop-zone { min-height: 56px; background: #f8fafc; border: 2px dashed var(--border); border-radius: 12px; padding: 12px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 12px; }
        .drop-zone.correct { background: #ecfdf5; border-color: var(--correct); border-style: solid; }
        .word-bank { display: flex; flex-wrap: wrap; gap: 10px; }
        .draggable-word { background: white; border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 16px; font-size: 14px; cursor: pointer; transition: all 0.1s; }
        .draggable-word:hover { background: #f1f5f9; }

        .check-btn { background: var(--ink); color: white; border: none; border-radius: 8px; padding: 10px 20px; font-size: 14px; cursor: pointer; font-weight: 600; width: fit-content; margin-top: 5px; }
        .check-btn:hover { background: #334155; }

        .feedback { font-size: 14px; font-weight: 600; padding: 10px 14px; border-radius: 8px; margin-top: 10px; display: none; }
        .feedback.show { display: block; }
        .feedback.correct { background: #ecfdf5; color: var(--correct); border-left: 4px solid var(--correct); }
        .feedback.wrong { background: #fef2f2; color: var(--wrong); border-left: 4px solid var(--wrong); }

        .progress-card { background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px; margin-bottom: 24px; position: sticky; top: 20px; z-index: 50; box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
        .progress-bar-wrap { background: #f1f5f9; border-radius: 10px; height: 8px; margin-top: 12px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: var(--accent); transition: width .4s ease; }

        .hw-badge { background: var(--ink); color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-right: 10px; }
      `}</style>

      <div className="hero">
        <div className="container">
          <div className="label">🇬🇧 Урок 1 · Грамматика B1</div>
          <h1>The Passive<br /><em>Voice</em></h1>
          <p>Пассивный залог — визитная карточка уровня B1. Учимся говорить не о том, кто сделал действие, а о том, что произошло с предметом.</p>
        </div>
      </div>

      <div className="container">
        <nav className="toc">
          <Link href="/dashboard">← В Дашборд</Link>
          <a href="#theory">📖 Теория</a>
          <a href="#reading">📰 Чтение</a>
          <a href="#classwork">🎯 Практика</a>
          <a href="#homework">📝 Домашка</a>
        </nav>

        {/* PROGRESS */}
        <div className="progress-card">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Твой прогресс (Классная работа)</span>
            <span className="font-mono font-bold text-accent">{cwStats.correct} / {cwCount}</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${(cwStats.correct / cwCount) * 100}%` }}></div>
          </div>
        </div>

        {/* THEORY */}
        <section id="theory">
          <div className="section-label">Теория: Пассивный залог</div>
          <h2>Кто виноват или что сделано?</h2>

          <div className="theory-card">
            <div className="stripe"></div>
            <h3>1. Суть пассива (Active vs Passive)</h3>
            <p>В активном залоге (Active Voice) мы фокусируемся на том, <strong>КТО</strong> совершает действие: <br />
            <i>Shakespeare wrote Hamlet. (Шекспир написал Гамлета).</i></p>
            <p>В пассивном залоге (Passive Voice) фокус смещается на сам <strong>ОБЪЕКТ</strong>: <br />
            <i>Hamlet <strong>was written</strong> by Shakespeare. (Гамлет был написан Шекспиром).</i></p>
            <div className="rule-box">
              <strong>💡 Золотая формула пассива:</strong><br />
              <strong>to be</strong> + <strong>V3</strong> (глагол в 3-й форме).<br />
              Меняем <strong>ТОЛЬКО глагол to be</strong>. V3 остаётся неизменной!
            </div>
          </div>

          <div className="theory-card gold">
            <div className="stripe"></div>
            <h3>2. Времена в Пассиве</h3>
            <table className="conj-table">
              <thead>
                <tr><th>Время</th><th>Формула</th><th>Пример</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Present Simple</strong></td><td>am/is/are + V3</td><td>The office <strong>is cleaned</strong> every day.</td></tr>
                <tr><td><strong>Past Simple</strong></td><td>was/were + V3</td><td>The Mona Lisa <strong>was painted</strong> by Da Vinci.</td></tr>
                <tr><td><strong>Future Simple</strong></td><td>will be + V3</td><td>The bridge <strong>will be finished</strong> next year.</td></tr>
                <tr><td><strong>Present Perfect</strong></td><td>have/has been + V3</td><td>My car <strong>has been stolen</strong>!</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* READING */}
        <section id="reading">
          <div className="section-label">Чтение в контексте</div>
          <h2>The Journey of Chocolate</h2>
          <div className="reading-text">
            <p>Chocolate <strong>is loved</strong> by people all over the world, but how is it actually made? The process begins in tropical countries like Ivory Coast and Ghana. Cacao beans <strong>are grown</strong> on small farms. When the pods are ripe, they <strong>are harvested</strong> by farmers by hand.</p>
            <p>After that, the beans <strong>are fermented</strong> and dried in the sun. Then, they <strong>are shipped</strong> to chocolate factories in Europe or America. Finally, sugar and milk <strong>are added</strong>, and the mixture <strong>is turned</strong> into delicious chocolate bars.</p>
          </div>

          <div className="exercise-set">
            <div className="exercise-set-header">
                <div className="difficulty-dot teal"></div>
                <h3>Чтение: Проверка понимания</h3>
            </div>
            <div className="exercise-list">
                {[
                  { id: 'cw1', q: '1. According to the text, how are cacao beans harvested?', options: ['They are harvested by machines.', 'They are harvested by hand.', 'They are grown in factories.'], ans: 1 },
                  { id: 'cw2', q: '2. Where are the beans roasted?', options: ['At the chocolate factories.', 'On small farms.', 'In the sun.'], ans: 0 }
                ].map((ex) => (
                  <div key={ex.id} className="exercise-item">
                    <div className="ex-problem">{ex.q}</div>
                    <div className="mcq-grid">
                      {ex.options.map((opt, i) => (
                        <button 
                          key={i} 
                          className={`mcq-btn ${inputs[ex.id] === i ? 'selected' : ''} ${progress.cw?.[ex.id]?.status === 'correct' && i === ex.ans ? 'correct' : ''} ${progress.cw?.[ex.id]?.status === 'wrong' && inputs[ex.id] === i ? 'wrong' : ''}`}
                          onClick={() => handleInputChange(ex.id, i)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <button className="check-btn" onClick={() => checkExercise(ex.id, String(ex.ans))}>Check Answer</button>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* CLASSWORK */}
        <section id="classwork">
          <div className="section-label">Классная работа</div>
          
          <div className="exercise-set">
            <div className="exercise-set-header">
              <div className="difficulty-dot easy"></div>
              <h3>Блок 1: Форма "to be"</h3>
            </div>
            <div className="exercise-list">
              {CW_BLOCK1.map(ex => (
                <div key={ex.id} className="exercise-item">
                  <div className="ex-problem">
                    {ex.problem} 
                    <select 
                      className={`inline-select mx-2 ${progress.cw?.[ex.id]?.status === 'correct' ? 'correct' : ''} ${progress.cw?.[ex.id]?.status === 'wrong' ? 'wrong' : ''}`}
                      onChange={(e) => handleInputChange(ex.id, e.target.value)}
                      value={inputs[ex.id] || ''}
                    >
                      <option value="">выбери</option>
                      {ex.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    cleaned at 6 PM. {ex.label}
                  </div>
                  <button className="check-btn" onClick={() => checkExercise(ex.id, ex.ans)}>Check</button>
                </div>
              ))}
            </div>
          </div>

          <div className="exercise-set">
            <div className="exercise-set-header">
              <div className="difficulty-dot medium"></div>
              <h3>Блок 2: Порядок слов</h3>
            </div>
            <div className="exercise-list">
              {[
                { id: 'cw11', q: '11. Письмо было написано вчера.', ans: 'The letter was written yesterday', zone: 'zone1', bank: 'bank1' },
                { id: 'cw12', q: '12. По-английски говорят по всему миру.', ans: 'English is spoken all over the world', zone: 'zone2', bank: 'bank2' },
                { id: 'cw13', q: '13. Мой телефон украли!', ans: 'My phone has been stolen', zone: 'zone3', bank: 'bank3' },
              ].map(ex => (
                <div key={ex.id} className="exercise-item">
                  <div className="ex-problem">{ex.q}</div>
                  <div className={`drop-zone ${progress.cw?.[ex.id]?.status === 'correct' ? 'correct' : ''}`}>
                    {builders[ex.zone].map((w, i) => (
                      <span key={i} className="draggable-word" onClick={() => toggleWord(w, ex.zone, ex.bank)}>{w}</span>
                    ))}
                  </div>
                  <div className="word-bank">
                    {banks[ex.bank].map((w, i) => (
                      <span key={i} className="draggable-word" onClick={() => toggleWord(w, ex.zone, ex.bank)}>{w}</span>
                    ))}
                  </div>
                  <button className="check-btn" onClick={() => checkBuilder(ex.id, ex.zone, ex.ans)}>Check Order</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOMEWORK */}
        <section id="homework">
          <div className="section-label">Домашнее задание</div>
          <div className="exercise-set" style={{ border: '2px solid var(--ink)' }}>
            <div className="exercise-set-header" style={{ background: 'var(--ink)', color: 'white' }}>
              <span className="hw-badge">Вариант {variant}</span>
              <h3 style={{ color: 'white' }}>Rewrite in Passive Voice</h3>
              {variant === 1 && <button onClick={resetHW} className="ml-auto text-[10px] uppercase font-bold text-accent hover:underline">Сменить вариант</button>}
            </div>
            <div className="exercise-list">
               <p className="text-sm text-muted mb-4 italic">Раскрой скобки в правильном времени.</p>
               {[
                 { id: 'hw1', q: '1. People speak English in Australia. -> English', ans: 'is spoken', suf: 'in Australia.' },
                 { id: 'hw2', q: '2. Someone stole my wallet. -> My wallet', ans: 'was stolen', suf: 'yesterday.' },
                 { id: 'hw3', q: '3. They will finish the project. -> The project', ans: 'will be finished', suf: 'tomorrow.' }
               ].map(ex => (
                 <div key={ex.id} className="exercise-item">
                    <div className="ex-problem">
                      {ex.q} 
                      <input 
                        type="text" 
                        className={`answer-input mx-2 ${progress.hw?.[ex.id]?.status === 'correct' ? 'correct' : ''}`}
                        placeholder="..."
                        value={inputs[ex.id] || ''}
                        onChange={(e) => handleInputChange(ex.id, e.target.value)}
                      />
                      {ex.suf}
                    </div>
                    <button className="check-btn" onClick={() => checkExercise(ex.id, ex.ans, 'hw')}>Check HW</button>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
