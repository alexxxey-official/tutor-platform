'use client'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import confetti from 'canvas-confetti'
import { RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export default function PassiveVoiceFullLegacyPage() {
  const lessonId = 'eng_passive'
  const cwCount = 23
  const hwCount = 18
  const { progress, updateProgress, resetHW, variant, getStats, loading } = 
    useLessonProgress(lessonId, cwCount, hwCount)

  // Local state for interactive elements
  const [selectedMcqs, setSelectedMcqs] = useState({})
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
  const [textInputs, setTextInputs] = useState({})

  // Restore values from progress
  useEffect(() => {
    if (!loading && progress) {
        const newInputs = {}
        const newMcqs = {}
        const restore = (mode) => {
            if (progress[mode]) {
                Object.keys(progress[mode]).forEach(id => {
                    const item = progress[mode][id]
                    if (item.value !== undefined && item.value !== null) {
                        // Check if it's an MCQ (stored as index string in my logic)
                        if (id.startsWith('cw1') || id.startsWith('cw2') || id.startsWith('cw16') || id.startsWith('cw17') || id.startsWith('cw18')) {
                           newMcqs[id] = parseInt(item.value)
                        } else {
                           newInputs[id] = item.value
                        }
                    }
                })
            }
        }
        restore('cw')
        restore('hw')
        setTextInputs(prev => ({ ...prev, ...newInputs }))
        setSelectedMcqs(prev => ({ ...prev, ...newMcqs }))

        // Restore Word Builders
        if (progress.cw) {
            const newBuilders = { 
                zone1: [], zone2: [], zone3: [], zone4: [], zone5: [] 
            }
            const newBanks = { 
                bank1: ['yesterday', 'written', 'was', 'The', 'letter'],
                bank2: ['all over', 'spoken', 'is', 'the world', 'English'],
                bank3: ['My', 'stolen', 'phone', 'has', 'been'],
                bank4: ['built', 'was', 'the house', 'When', '?'],
                bank5: ['be', 'finished', 'The report', 'will', 'tomorrow']
            }
            let builderChanged = false

            const builderMap = [
                { id: 'cw11', zone: 'zone1', bank: 'bank1' },
                { id: 'cw12', zone: 'zone2', bank: 'bank2' },
                { id: 'cw13', zone: 'zone3', bank: 'bank3' },
                { id: 'cw14', zone: 'zone4', bank: 'bank4' },
                { id: 'cw15', zone: 'zone5', bank: 'bank5' }
            ]

            builderMap.forEach(m => {
                const item = progress.cw[m.id]
                if (item && item.status === 'correct' && item.value) {
                    const words = item.value.split(' ')
                    newBuilders[m.zone] = words
                    // Filter bank to remove used words
                    let currentBank = [...newBanks[m.bank]]
                    words.forEach(w => {
                        const idx = currentBank.indexOf(w)
                        if (idx > -1) currentBank.splice(idx, 1)
                    })
                    newBanks[m.bank] = currentBank
                    builderChanged = true
                }
            })

            if (builderChanged) {
                setBuilders(newBuilders)
                setBanks(newBanks)
            }
        }
    }
  }, [loading, progress])

  const normalize = (s) => s.toLowerCase().replace(/\s+/g,' ').trim();

  // Helper to get class for inputs
  const getInputClass = (id, mode = 'cw') => {
    const status = progress[mode]?.[id]?.status
    if (status === 'correct') return 'correct'
    if (status === 'wrong') return 'wrong'
    return ''
  }

  const handleMcqSelect = (exId, val) => {
    if (progress.cw?.[exId]?.status === 'correct') return
    setSelectedMcqs(prev => ({ ...prev, [exId]: val }))
  }

  const checkMcq = (exId, correctAns) => {
    const selected = selectedMcqs[exId]
    if (selected === undefined) return
    const isCorrect = String(selected) === String(correctAns)
    updateProgress(exId, 'cw', isCorrect ? 'correct' : 'wrong', 1, String(selected))
  }

  const checkDropdown = (exId, correctAns) => {
    const val = textInputs[exId]
    if (!val) return
    const isCorrect = normalize(val) === normalize(correctAns)
    updateProgress(exId, 'cw', isCorrect ? 'correct' : 'wrong', 1, val)
  }

  const toggleWord = (word, zoneKey, bankKey, exId) => {
    if (progress.cw?.[exId]?.status === 'correct') return
    
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

  const checkBuilder = (exId, zoneKey, correctStr) => {
    const userStr = builders[zoneKey].join(' ')
    const isCorrect = userStr === correctStr
    updateProgress(exId, 'cw', isCorrect ? 'correct' : 'wrong', 1, userStr)
  }

  const checkText = (exId, correctAns, mode = 'cw') => {
    const val = textInputs[exId] || ''
    const isCorrect = normalize(val) === normalize(correctAns)
    updateProgress(exId, mode, isCorrect ? 'correct' : 'wrong', 1, val)
    
    if (isCorrect && mode === 'hw') {
        const stats = getStats('hw')
        if (stats.correct + 1 === hwCount) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
        }
    }
  }

  const checkV3Block = () => {
    const v3Data = [
        { id: 'cw19', ans: 'made' },
        { id: 'cw20', ans: 'written' },
        { id: 'cw21', ans: 'broken' },
        { id: 'cw22', ans: 'built' },
        { id: 'cw23', ans: 'invented' }
    ]
    v3Data.forEach(item => {
        const val = textInputs[item.id] || ''
        const isCorrect = normalize(val) === normalize(item.ans)
        updateProgress(item.id, 'cw', isCorrect ? 'correct' : 'wrong', 1, val)
    })
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  const cwStats = getStats('cw')

  return (
    <div className="legacy-body">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        :root { --ink: #1e1b4b; --paper: #f8fafc; --accent: #2563eb; --gold: #f59e0b; --teal: #0d9488; --muted: #64748b; --card: #ffffff; --border: #e2e8f0; --correct: #059669; --wrong: #dc2626; }
        
        .legacy-body { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); line-height: 1.7; padding-bottom: 80px; margin: 0; }
        
        .hero { background: var(--ink); color: white; padding: 56px 40px 48px; position: relative; overflow: hidden; }
        .hero .label { font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
        .hero h1 { font-family: 'Unbounded', sans-serif; font-weight: 800; font-size: clamp(32px,5vw,52px); line-height: 1.1; margin-bottom: 16px; position: relative; z-index: 2; margin-top: 0; }
        .hero h1 em { color: var(--gold); font-style: italic; font-family: 'DM Serif Display', serif; font-weight: 400; }
        .hero p { color: rgba(255,255,255,.8); font-size: 16px; max-width: 540px; position: relative; z-index: 2; }
        .hero::before { content: 'V3'; position: absolute; right: 10px; top: -10px; font-size: 180px; color: rgba(255,255,255,.02); font-family: 'Unbounded', sans-serif; font-weight: 800; line-height: 1; letter-spacing: -5px; z-index: 1; pointer-events: none;}
        
        .container { max-width: 860px; margin: 0 auto; padding: 0 24px; }
        
        .section-label { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent); margin: 56px 0 20px; }
        .section-label::after { content: ''; display: block; width: 40px; height: 2px; background: var(--accent); }
        h2 { font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: 28px; color: var(--ink); margin-bottom: 24px; margin-top: 0; }

        .theory-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 32px 32px 32px 40px; margin-bottom: 20px; position: relative; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .theory-card .stripe { position: absolute; left: 0; top: 20px; bottom: 20px; width: 4px; border-radius: 0 2px 2px 0; background: var(--accent); }
        .theory-card.gold .stripe { background: var(--gold); }
        .theory-card.teal .stripe { background: var(--teal); }
        .theory-card h3 { font-family: 'Unbounded', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 16px; color: var(--ink); margin-top: 0; }
        .theory-card p { color: #334155; font-size: 15px; margin-bottom: 12px; }
        
        .rule-box { background: linear-gradient(135deg,#f0fdf4,#ccfbf1); border: 1px solid #5eead4; border-left: 4px solid var(--teal); border-radius: 10px; padding: 16px 20px; margin: 16px 0; font-size: 14px; color: #115e59; }
        .rule-box > strong:first-child { color: #042f2e; display: block; margin-bottom: 8px; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; }

        .conj-table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 15px; }
        .conj-table th, .conj-table td { border: 1px solid var(--border); padding: 14px 16px; text-align: left; }
        .conj-table th { background: #f8fafc; font-weight: 600; color: var(--ink); }
        .conj-table td:first-child { font-weight: 600; color: var(--accent); width: 35%; }

        .toc { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; margin: 32px 0 0; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
        .toc a { background: #f1f5f9; color: var(--ink); text-decoration: none; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; transition: all .2s; cursor: pointer; }
        .toc a:hover { background: var(--accent); color: white; }

        .exercise-set { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-bottom: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .exercise-set-header { padding: 20px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--border); background: #fafaf9; }
        .difficulty-dot { width: 10px; height: 10px; border-radius: 50%; }
        .difficulty-dot.easy { background: var(--teal); } .difficulty-dot.medium { background: var(--gold); } .difficulty-dot.hard { background: var(--accent); } .difficulty-dot.teal { background: var(--teal); }
        .exercise-set-header h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin: 0; }
        .exercise-list { padding: 16px 24px; }
        .exercise-item { border-bottom: 1px dashed var(--border); padding: 24px 0; display: flex; gap: 16px; align-items: flex-start; flex-direction: column; }
        .exercise-item:last-child { border-bottom: none; }
        .ex-problem { font-size: 16px; font-weight: 500; margin-bottom: 16px; color: var(--ink); line-height: 1.5; }
        
        .feedback { display: none; margin-top: 16px; font-size: 14px; font-weight: 500; padding: 12px 16px; border-radius: 8px; width: 100%; }
        .feedback.show { display: block; }
        .feedback.correct { background: #ecfdf5; color: var(--correct); border-left: 4px solid var(--correct); }
        .feedback.wrong { background: #fef2f2; color: var(--wrong); border-left: 4px solid var(--wrong); }

        .answer-input { border: 1.5px solid var(--border); border-radius: 8px; padding: 10px 14px; font-family: 'DM Mono', monospace; font-size: 15px; min-width: 220px; outline: none; transition: border-color .2s; background: white; }
        .answer-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .answer-input.correct { border-color: var(--correct); background-color: #ecfdf5; color: var(--correct); }
        .answer-input.wrong { border-color: var(--wrong); background-color: #fef2f2; color: var(--wrong); }

        .inline-select { appearance: none; background: #f8fafc; border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 36px 8px 14px; font-family: 'DM Mono', monospace; font-size: 15px; color: var(--accent); font-weight: 600; cursor: pointer; outline: none; transition: border-color 0.2s; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
        .inline-select.correct { border-color: var(--correct); color: var(--correct); background-color: #ecfdf5; }
        .inline-select.wrong { border-color: var(--wrong); color: var(--wrong); background-color: #fef2f2; }

        .drop-zone { min-height: 56px; background: #f8fafc; border: 2px dashed var(--border); border-radius: 12px; padding: 12px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 20px; transition: border-color 0.2s; width: 100%; }
        .drop-zone.correct { background: #ecfdf5; border-color: var(--correct); border-style: solid; }
        .word-bank { display: flex; flex-wrap: wrap; gap: 10px; min-height: 48px; }
        .draggable-word { background: white; border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 16px; font-size: 15px; font-weight: 500; cursor: pointer; user-select: none; box-shadow: 0 2px 4px rgba(0,0,0,0.03); transition: transform 0.1s, box-shadow 0.1s, background 0.2s; color: var(--ink); }
        .draggable-word:hover { background: #f1f5f9; border-color: var(--muted); }

        .mcq-grid { display: grid; grid-template-columns: 1fr; gap: 12px; width: 100%; }
        .mcq-btn { background: white; border: 1.5px solid var(--border); border-radius: 10px; padding: 16px 20px; font-size: 15px; text-align: left; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; color: var(--ink); }
        .mcq-btn:hover { border-color: var(--accent); background: #f8fafc; }
        .mcq-btn.selected { border-color: var(--accent); background: #eff6ff; }
        .mcq-btn.correct { border-color: var(--correct); background: #ecfdf5; color: var(--correct); font-weight: 600; }
        .mcq-btn.wrong { border-color: var(--wrong); background: #fef2f2; color: var(--wrong); }

        .check-btn { background: var(--ink); color: white; border: none; border-radius: 8px; padding: 12px 24px; font-size: 15px; cursor: pointer; transition: background .2s; font-weight: 600; margin-top: 8px; }
        .check-btn:hover { background: #334155; }

        .progress-card { background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px; margin-bottom: 24px; margin-top: 32px; position: sticky; top: 20px; z-index: 50; box-shadow: 0 10px 30px rgba(0,0,0,0.06);}
        .progress-bar-wrap { background: #f1f5f9; border-radius: 10px; height: 8px; margin: 12px 0 0; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: var(--accent); border-radius: 10px; width: 0%; transition: width .4s cubic-bezier(0.4, 0, 0.2, 1); }

        .reading-text { font-size: 16px; line-height: 1.8; color: #334155; background: #fffbeb; border-left: 4px solid var(--gold); padding: 24px 32px; border-radius: 0 16px 16px 0; margin-bottom: 24px; }
        .hw-badge { background: var(--ink); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
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
          <Link href="/dashboard">← На главную</Link>
          <a href="#theory">📖 Теория</a>
          <a href="#reading">📰 Чтение (Текст)</a>
          <a href="#classwork">🎯 Практика (Класс)</a>
          <a href="#homework">📝 Домашнее задание</a>
        </nav>

        {/* THEORY */}
        <div id="theory">
          <div className="section-label">Теория: Пассивный залог</div>
          <h2>Кто виноват или что сделано?</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3>1. Суть пассива (Active vs Passive)</h3>
            <p>В активном залоге (Active Voice) мы фокусируемся на том, <strong>КТО</strong> совершает действие: <br />
            <i>Shakespeare wrote Hamlet. (Шекспир написал Гамлета).</i></p>
            <p>В пассивном залоге (Passive Voice) нам не так важно (или мы не знаем), кто это сделал. Фокус смещается на сам <strong>ОБЪЕКТ</strong>: <br />
            <i>Hamlet <strong>was written</strong> by Shakespeare. (Гамлет был написан Шекспиром).</i></p>
            <div className="rule-box">
              <strong>💡 Золотая формула пассива:</strong><br />
              <strong>to be</strong> + <strong>V3</strong> (глагол в 3-й форме: <i>written, done, played</i>).<br />
              Чтобы поменять время в предложении, мы меняем <strong>ТОЛЬКО глагол to be</strong>. Третья форма (V3) остаётся неизменной всегда!
            </div>
          </div>
          <div className="theory-card gold">
            <div className="stripe"></div>
            <h3>2. Времена в Пассиве (Главные для B1)</h3>
            <table className="conj-table">
              <thead>
                <tr><th>Время</th><th>Формула (to be) + V3</th><th>Пример</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Present Simple</strong><br /><i>Обычно, каждый день</i></td><td>am / is / are + V3</td><td>The office <strong>is cleaned</strong> every day.</td></tr>
                <tr><td><strong>Past Simple</strong><br /><i>Вчера, в 1999 году</i></td><td>was / were + V3</td><td>The Mona Lisa <strong>was painted</strong> by Da Vinci.</td></tr>
                <tr><td><strong>Future Simple</strong><br /><i>Завтра, в будущем</i></td><td>will be + V3</td><td>The new bridge <strong>will be finished</strong> next year.</td></tr>
                <tr><td><strong>Present Perfect</strong><br /><i>Результат к настоящему</i></td><td>have been / has been + V3</td><td>My car <strong>has been stolen</strong>!</td></tr>
              </tbody>
            </table>
          </div>
          <div className="theory-card teal">
            <div className="stripe"></div>
            <h3>3. Кем или Чем? (by vs with)</h3>
            <p>Если нам всё-таки хочется указать, кто или что совершило действие, мы используем предлоги в конце предложения:</p>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
              <li><strong>BY + Человек / Создатель:</strong> <i>The book was written <strong>by</strong> J.K. Rowling.</i></li>
              <li><strong>WITH + Инструмент / Материал:</strong> <i>The window was broken <strong>with</strong> a hammer.</i></li>
            </ul>
          </div>
        </div>

        {/* READING */}
        <div id="reading">
          <div className="section-label">Чтение в контексте</div>
          <h2>The Journey of Chocolate</h2>
          <div className="reading-text">
            <p>Chocolate <strong>is loved</strong> by people all over the world, but how is it actually made? The process begins in tropical countries like Ivory Coast and Ghana. Cacao beans <strong>are grown</strong> on small farms. When the pods are ripe, they <strong>are harvested</strong> by farmers by hand.</p>
            <p>After that, the beans <strong>are fermented</strong> and dried in the sun. Then, they <strong>are shipped</strong> to chocolate factories in Europe or America. At the factory, the beans <strong>are roasted</strong> at high temperatures to bring out the flavor. Finally, sugar and milk <strong>are added</strong>, and the mixture <strong>is turned</strong> into delicious chocolate bars.</p>
            <p>Many new types of chocolate <strong>will be invented</strong> in the future, but the classic milk chocolate will always be popular!</p>
          </div>
          <div className="exercise-set">
            <div className="exercise-set-header">
              <div className="difficulty-dot teal"></div>
              <h3>Чтение: Проверка понимания (Reading Comprehension)</h3>
            </div>
            <div className="exercise-list">
              {[
                { id: 'cw1', q: '1. According to the text, how are cacao beans harvested?', options: ['They are harvested by big machines.', 'They are harvested by farmers by hand.', 'They are grown in factories.'], ans: 1 },
                { id: 'cw2', q: '2. Where are the beans roasted?', options: ['At the chocolate factories.', 'On small farms in Africa.', 'In the sun.'], ans: 0 }
              ].map(ex => (
                <div key={ex.id} className="exercise-item">
                  <div className="ex-problem">{ex.q}</div>
                  <div className="mcq-grid">
                    {ex.options.map((opt, i) => (
                      <button 
                        key={i} 
                        className={`mcq-btn ${selectedMcqs[ex.id] === i ? 'selected' : ''} ${progress.cw?.[ex.id]?.status === 'correct' && i === ex.ans ? 'correct' : ''} ${progress.cw?.[ex.id]?.status === 'wrong' && selectedMcqs[ex.id] === i ? 'wrong' : ''}`}
                        onClick={() => handleMcqSelect(ex.id, i)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button className="check-btn" onClick={() => checkMcq(ex.id, ex.ans)}>Check Answer</button>
                  <div className={`feedback ${progress.cw?.[ex.id] ? 'show' : ''} ${progress.cw?.[ex.id]?.status}`}>
                    {progress.cw?.[ex.id]?.status === 'correct' ? '✓ Правильно!' : '✗ Ошибка.'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="progress-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Твой прогресс (Классная работа)</span>
            <span style={{ fontWeight: 600 }}>{cwStats.correct} / {cwCount} правильно</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${(cwStats.correct / cwCount) * 100}%` }}></div>
          </div>
        </div>

        {/* CLASSWORK */}
        <div id="classwork">
          <div className="section-label">Классная работа (Classwork)</div>
          
          <div className="exercise-set">
            <div className="exercise-set-header">
              <div className="difficulty-dot easy"></div>
              <h3>Блок 1: Выбери правильную форму "to be" (8 заданий)</h3>
            </div>
            <div className="exercise-list">
              {[
                { id: 'cw3', q: '3. (Every day) The office', opts: ['is', 'are', 'was', 'will be'], ans: 'is', suf: 'cleaned at 6 PM.' },
                { id: 'cw4', q: '4. (Last night) My car', opts: ['is', 'was', 'were', 'has been'], ans: 'was', suf: 'stolen!' },
                { id: 'cw5', q: '5. (Next year) The new bridge', opts: ['is', 'was', 'will be'], ans: 'will be', suf: 'opened to the public.' },
                { id: 'cw6', q: '6. (Result) Oh no! The window', opts: ['is', 'was', 'has been'], ans: 'has been', suf: 'broken!' },
                { id: 'cw7', q: '7. (Usually) Millions of emails', opts: ['is', 'are', 'were'], ans: 'are', suf: 'sent every day.' },
                { id: 'cw8', q: "8. (In 1997) Harry Potter", opts: ['is', 'was', 'were'], ans: 'was', suf: "published." },
                { id: 'cw9', q: '9. The cake was made', opts: ['by', 'with'], ans: 'with', suf: 'chocolate. (Ингредиент)' },
                { id: 'cw10', q: '10. The photo was taken', opts: ['by', 'with'], ans: 'by', suf: 'my brother. (Деятель)' },
              ].map(ex => (
                <div key={ex.id} className="exercise-item">
                  <div className="ex-problem">
                    {ex.q} 
                    <select 
                      className={`inline-select mx-2 ${progress.cw?.[ex.id]?.status}`}
                      value={textInputs[ex.id] || ''}
                      onChange={e => setTextInputs(prev => ({...prev, [ex.id]: e.target.value}))}
                    >
                      <option value="">choose</option>
                      {ex.opts.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {ex.suf}
                  </div>
                  <button className="check-btn" onClick={() => checkDropdown(ex.id, ex.ans)}>Check</button>
                  <div className={`feedback ${progress.cw?.[ex.id] ? 'show' : ''} ${progress.cw?.[ex.id]?.status}`}>
                    {progress.cw?.[ex.id]?.status === 'correct' ? '✓ Правильно!' : '✗ Неверно.'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="exercise-set">
            <div className="exercise-set-header">
              <div className="difficulty-dot medium"></div>
              <h3>Блок 2: Порядок слов (Собери фразу)</h3>
            </div>
            <div className="exercise-list">
              {[
                { id: 'cw11', q: '11. Письмо было написано вчера.', ans: 'The letter was written yesterday', zone: 'zone1', bank: 'bank1' },
                { id: 'cw12', q: '12. По-английски говорят по всему миру.', ans: 'English is spoken all over the world', zone: 'zone2', bank: 'bank2' },
                { id: 'cw13', q: '13. Мой телефон украли!', ans: 'My phone has been stolen', zone: 'zone3', bank: 'bank3' },
                { id: 'cw14', q: '14. Когда был построен дом?', ans: 'When was the house built ?', zone: 'zone4', bank: 'bank4' },
                { id: 'cw15', q: '15. Отчет будет закончен завтра.', ans: 'The report will be finished tomorrow', zone: 'zone5', bank: 'bank5' },
              ].map(ex => (
                <div key={ex.id} className="exercise-item">
                  <div className="ex-problem">{ex.q}</div>
                  <div className={`drop-zone ${progress.cw?.[ex.id]?.status === 'correct' ? 'correct' : ''}`}>
                    {builders[ex.zone].map((w, i) => (
                      <span key={i} className="draggable-word" onClick={() => toggleWord(w, ex.zone, ex.bank, ex.id)}>{w}</span>
                    ))}
                  </div>
                  <div className="word-bank">
                    {banks[ex.bank].map((w, i) => (
                      <span key={i} className="draggable-word" onClick={() => toggleWord(w, ex.zone, ex.bank, ex.id)}>{w}</span>
                    ))}
                  </div>
                  <button className="check-btn" onClick={() => checkBuilder(ex.id, ex.zone, ex.ans)}>Check</button>
                  <div className={`feedback ${progress.cw?.[ex.id] ? 'show' : ''} ${progress.cw?.[ex.id]?.status}`}>
                    {progress.cw?.[ex.id]?.status === 'correct' ? '✓ Правильно!' : '✗ Ошибка.'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="exercise-set">
            <div className="exercise-set-header">
              <div className="difficulty-dot teal"></div>
              <h3>Блок 3: Active или Passive?</h3>
            </div>
            <div className="exercise-list">
              {[
                { id: 'cw16', q: '16. "Somebody cleans the room." -> Какое предложение правильно переведено в пассив?', options: ['The room cleaned somebody.', 'The room is cleaned.', 'The room was cleaned.'], ans: 1 },
                { id: 'cw17', q: '17. "They built the house in 2010." -> Пассивный вариант:', options: ['The house is built in 2010.', 'The house built in 2010.', 'The house was built in 2010.'], ans: 2 },
                { id: 'cw18', q: '18. Выбери правильное продолжение: I can\'t find my keys! I think they ________!', options: ['stole', 'have been stolen', 'was stolen'], ans: 1 }
              ].map(ex => (
                <div key={ex.id} className="exercise-item">
                  <div className="ex-problem">{ex.q}</div>
                  <div className="mcq-grid">
                    {ex.options.map((opt, i) => (
                      <button 
                        key={i} 
                        className={`mcq-btn ${selectedMcqs[ex.id] === i ? 'selected' : ''} ${progress.cw?.[ex.id]?.status === 'correct' && i === ex.ans ? 'correct' : ''} ${progress.cw?.[ex.id]?.status === 'wrong' && selectedMcqs[ex.id] === i ? 'wrong' : ''}`}
                        onClick={() => handleMcqSelect(ex.id, i)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button className="check-btn" onClick={() => checkMcq(ex.id, ex.ans)}>Check Answer</button>
                  <div className={`feedback ${progress.cw?.[ex.id] ? 'show' : ''} ${progress.cw?.[ex.id]?.status}`}>
                    {progress.cw?.[ex.id]?.status === 'correct' ? '✓ Правильно!' : '✗ Ошибка.'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="exercise-set">
            <div className="exercise-set-header">
              <div className="difficulty-dot hard"></div>
              <h3>Блок 4: Напиши 3-ю форму глагола (V3)</h3>
            </div>
            <div className="exercise-list">
              {[
                { id: 'cw19', q: 'make →', ans: 'made' },
                { id: 'cw20', q: 'write →', ans: 'written' },
                { id: 'cw21', q: 'break →', ans: 'broken' },
                { id: 'cw22', q: 'build →', ans: 'built' },
                { id: 'cw23', q: 'invent →', ans: 'invented' },
              ].map(ex => (
                <div key={ex.id} className="exercise-item" style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <div className="ex-problem" style={{ margin: 0, minWidth: '100px' }}>{ex.q}</div>
                  <input 
                    className={`answer-input ${progress.cw?.[ex.id]?.status}`} 
                    type="text" 
                    value={textInputs[ex.id] || ''}
                    onChange={e => setTextInputs(prev => ({...prev, [ex.id]: e.target.value}))}
                    placeholder="V3 form..." 
                  />
                </div>
              ))}
              <button className="check-btn" onClick={checkV3Block}>Проверить блок V3</button>
            </div>
          </div>
        </div>

        {/* HOMEWORK */}
        <div id="homework">
          <div className="section-label" style={{ color: 'var(--ink)' }}>Домашнее задание (Homework)</div>
          <div className="exercise-set" style={{ border: '2px solid var(--ink)' }}>
            <div className="exercise-set-header" style={{ background: 'var(--ink)', color: 'white' }}>
              <span className="hw-badge">Mandatory</span>
              <h3 style={{ color: 'white' }}>Rewrite in Passive Voice (15 items)</h3>
            </div>
            <div className="exercise-list">
              <div style={{ fontWeight: 700, color: 'var(--accent)', marginBottom: '12px', textTransform: 'uppercase', fontSize: '13px' }}>Part 1: Present Simple</div>
              {[
                { id: 'hw1', q: '1. People speak English in Australia. -> English', ans: 'is spoken', suf: 'in Australia.' },
                { id: 'hw2', q: '2. They make these cars in Japan. -> These cars', ans: 'are made', suf: 'in Japan.' },
                { id: 'hw3', q: '3. The postman delivers the mail at 9 AM. -> The mail', ans: 'is delivered', suf: 'at 9 AM.' },
                { id: 'hw4', q: '4. Do they clean the rooms every day? ->', ans: 'Are', mid: 'the rooms', ans2: 'cleaned', suf: 'every day?' },
                { id: 'hw5', q: '5. We do not use this room. -> This room', ans: 'is not used', suf: '.' },
              ].map(ex => (
                <div key={ex.id} className="exercise-item">
                  <div className="ex-problem">
                    {ex.q} 
                    <input 
                        className={`answer-input mx-2 ${progress.hw?.[ex.id]?.status}`} 
                        type="text" 
                        value={textInputs[ex.id] || ''}
                        onChange={e => setTextInputs(prev => ({...prev, [ex.id]: e.target.value}))}
                    />
                    {ex.mid}
                    {ex.ans2 && <input 
                        className={`answer-input mx-2 ${progress.hw?.[ex.id+'_2']?.status}`} 
                        type="text" 
                        value={textInputs[ex.id+'_2'] || ''}
                        onChange={e => setTextInputs(prev => ({...prev, [ex.id+'_2']: e.target.value}))}
                    />}
                    {ex.suf}
                  </div>
                  <button className="check-btn" onClick={() => {
                    checkText(ex.id, ex.ans, 'hw')
                    if(ex.ans2) checkText(ex.id+'_2', ex.ans2, 'hw')
                  }}>Check</button>
                </div>
              ))}

              <div style={{ fontWeight: 700, color: 'var(--accent)', margin: '24px 0 12px', textTransform: 'uppercase', fontSize: '13px' }}>Part 2: Past Simple</div>
              {[
                { id: 'hw6', q: '6. Someone stole my wallet yesterday. -> My wallet', ans: 'was stolen', suf: 'yesterday.' },
                { id: 'hw7', q: '7. Alexander Bell invented the telephone. -> The telephone', ans: 'was invented', suf: 'by Alexander Bell.' },
                { id: 'hw8', q: '8. They built these houses in 1950. -> These houses', ans: 'were built', suf: 'in 1950.' },
                { id: 'hw9', q: '9. Did Shakespeare write this play? ->', ans: 'Was', mid: 'this play', ans2: 'written', suf: 'by Shakespeare?' },
                { id: 'hw10', q: '10. They didn\'t invite me to the party. -> I', ans: 'was not invited', suf: 'to the party.' },
              ].map(ex => (
                <div key={ex.id} className="exercise-item">
                   <div className="ex-problem">
                    {ex.q} 
                    <input 
                        className={`answer-input mx-2 ${progress.hw?.[ex.id]?.status}`} 
                        type="text" 
                        value={textInputs[ex.id] || ''}
                        onChange={e => setTextInputs(prev => ({...prev, [ex.id]: e.target.value}))}
                    />
                    {ex.mid}
                    {ex.ans2 && <input 
                        className={`answer-input mx-2 ${progress.hw?.[ex.id+'_2']?.status}`} 
                        type="text" 
                        value={textInputs[ex.id+'_2'] || ''}
                        onChange={e => setTextInputs(prev => ({...prev, [ex.id+'_2']: e.target.value}))}
                    />}
                    {ex.suf}
                  </div>
                  <button className="check-btn" onClick={() => {
                    checkText(ex.id, ex.ans, 'hw')
                    if(ex.ans2) checkText(ex.id+'_2', ex.ans2, 'hw')
                  }}>Check</button>
                </div>
              ))}

              <div style={{ fontWeight: 700, color: 'var(--accent)', margin: '24px 0 12px', textTransform: 'uppercase', fontSize: '13px' }}>Part 3: Future & Perfect</div>
              {[
                { id: 'hw11', q: '11. They will finish the project tomorrow. -> The project', ans: 'will be finished', suf: 'tomorrow.' },
                { id: 'hw12', q: '12. Someone has painted the door. -> The door', ans: 'has been painted', suf: '.' },
                { id: 'hw13', q: '13. They will send the tickets by email. -> The tickets', ans: 'will be sent', suf: 'by email.' },
                { id: 'hw14', q: '14. The company has hired ten new people. -> Ten new people', ans: 'have been hired', suf: '.' },
                { id: 'hw15', q: '15. Will they serve dinner at 8? ->', ans: 'Will', mid: 'dinner', ans2: 'be served', suf: 'at 8?' },
              ].map(ex => (
                <div key={ex.id} className="exercise-item">
                  <div className="ex-problem">
                    {ex.q} 
                    <input 
                        className={`answer-input mx-2 ${progress.hw?.[ex.id]?.status}`} 
                        type="text" 
                        value={textInputs[ex.id] || ''}
                        onChange={e => setTextInputs(prev => ({...prev, [ex.id]: e.target.value}))}
                    />
                    {ex.mid}
                    {ex.ans2 && <input 
                        className={`answer-input mx-2 ${progress.hw?.[ex.id+'_2']?.status}`} 
                        type="text" 
                        value={textInputs[ex.id+'_2'] || ''}
                        onChange={e => setTextInputs(prev => ({...prev, [ex.id+'_2']: e.target.value}))}
                    />}
                    {ex.suf}
                  </div>
                  <button className="check-btn" onClick={() => {
                    checkText(ex.id, ex.ans, 'hw')
                    if(ex.ans2) checkText(ex.id+'_2', ex.ans2, 'hw')
                  }}>Check</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
