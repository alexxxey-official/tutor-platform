'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import { Home, BookOpen, Volume2, CheckCircle, XCircle, Eye } from 'lucide-react'

export default function ListeningLesson() {
  const lessonId = 'spa_listening'
  const totalCW = 15
  const totalHW = 10

  const { progress, updateProgress, resetHW, variant, getStats, loading } = useLessonProgress(lessonId, totalCW, totalHW)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (loading || !mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
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
      <header className="bg-purple-600 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] font-black opacity-10 pointer-events-none select-none unbounded translate-x-10 -translate-y-10">🎧</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-purple-800 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-md">
            🇪🇸 Lección 10 · Listening A1
          </div>
          <h1 className="text-4xl md:text-6xl font-black unbounded uppercase mb-6 tracking-tighter leading-tight drop-shadow-lg">
            Диктант и <span className="text-amber-300 italic">Аудирование</span>
          </h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto font-medium">
            Тренируем восприятие испанской речи на слух! Слушай, понимай, записывай. 🎧
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
            <Volume2 size={16} /> Práctica
          </a>
          <a href="#homework" className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-700">
            <CheckCircle size={16} /> Tareas
          </a>
        </nav>

        {/* THEORY SECTION */}
        <section id="theory" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-purple-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Teoría <div className="h-[2px] w-12 bg-purple-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-8 text-slate-900">Как тренировать аудирование</h2>

          <div className="grid gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div> Шаг 1: Слушай внимательно
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Прослушай аудио 2-3 раза. Не спеши сразу писать - сначала пойми общий смысл.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div> Шаг 2: Записывай по частям
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Слушай предложение по частям. Ставь аудио на паузу и записывай услышанное.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div> Шаг 3: Проверяй себя
              </h3>
              <p className="text-slate-600 leading-relaxed">
                У тебя 3 попытки на каждое слово. После 3-й попытки увидишь правильный ответ.
              </p>
            </div>
          </div>
        </section>

        {/* CLASSWORK SECTION */}
        <section id="classwork" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-purple-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Práctica <div className="h-[2px] w-12 bg-purple-600"></div>
          </div>
          <h2 className="text-3xl font-black unbounded mb-4 text-slate-900">Classwork</h2>
          <p className="text-slate-500 mb-8">Интерактивный диктант с аудио.</p>

          <div className="space-y-12">
            {/* Video Dictation */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div> Диктант: Presentación
              </h3>

              {/* YouTube Video */}
              <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/JL9gJH9u5Oc"
                  title="Spanish A1 Listening"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl mb-6">
                <p className="text-sm text-purple-700 mb-2 font-bold">📝 Инструкция:</p>
                <p className="text-sm text-slate-600">
                  Прослушай видео и заполни пропуски. Можешь ставить на паузу и пересматривать сколько угодно раз.
                </p>
              </div>

              <DictationExercise
                id="cw1"
                text="¡Hola! Me ___ Pablo."
                answer="llamo"
                progress={progress}
                updateProgress={updateProgress}
              />
              <DictationExercise
                id="cw2"
                text="___ de España."
                answer="Soy"
                progress={progress}
                updateProgress={updateProgress}
              />
              <DictationExercise
                id="cw3"
                text="Tengo ___ años."
                answer="veinte"
                progress={progress}
                updateProgress={updateProgress}
              />
              <DictationExercise
                id="cw4"
                text="___ en Madrid."
                answer="Vivo"
                progress={progress}
                updateProgress={updateProgress}
              />
              <DictationExercise
                id="cw5"
                text="Me gusta ___ español."
                answer="hablar"
                progress={progress}
                updateProgress={updateProgress}
              />
            </div>

            {/* Audio-only exercises */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 unbounded text-purple-400">Диктант: Frases cortas</h3>
              <p className="text-slate-400 mb-6 text-sm">Слушай аудио и записывай целые фразы.</p>

              <AudioDictationExercise
                id="cw6"
                audioText="Buenos días"
                answer="Buenos días"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw7"
                audioText="¿Cómo estás?"
                answer="¿Cómo estás?"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw8"
                audioText="Mucho gusto"
                answer="Mucho gusto"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw9"
                audioText="Hasta luego"
                answer="Hasta luego"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw10"
                audioText="Gracias"
                answer="Gracias"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw11"
                audioText="De nada"
                answer="De nada"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw12"
                audioText="Por favor"
                answer="Por favor"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw13"
                audioText="Lo siento"
                answer="Lo siento"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw14"
                audioText="No entiendo"
                answer="No entiendo"
                progress={progress}
                updateProgress={updateProgress}
              />
              <AudioDictationExercise
                id="cw15"
                audioText="¿Hablas inglés?"
                answer="¿Hablas inglés?"
                progress={progress}
                updateProgress={updateProgress}
              />
            </div>
          </div>
        </section>

        {/* HOMEWORK SECTION */}
        <section id="homework" className="mb-20 scroll-mt-10">
          <div className="flex items-center gap-3 text-slate-900 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Tareas <div className="h-[2px] w-12 bg-slate-900"></div>
          </div>
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl border-t-8 border-purple-600">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black unbounded uppercase text-purple-400">
                  Homework {variant === 2 && <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white align-middle ml-4">Variant 2</span>}
                </h2>
              </div>

              <p className="text-slate-400 mb-12 max-w-xl">
                {variant === 1
                  ? "Самостоятельная практика. Слушай и записывай фразы."
                  : "Второй шанс! Новые фразы для диктанта."}
              </p>

              <div className="space-y-6">
                {variant === 1 ? (
                  <>
                    <AudioDictationExercise
                      id="hw1"
                      audioText="Me llamo María"
                      answer="Me llamo María"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw2"
                      audioText="Tengo hambre"
                      answer="Tengo hambre"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw3"
                      audioText="¿Dónde está el baño?"
                      answer="¿Dónde está el baño?"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw4"
                      audioText="No hablo español"
                      answer="No hablo español"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw5"
                      audioText="¿Cuánto cuesta?"
                      answer="¿Cuánto cuesta?"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw6"
                      audioText="Soy estudiante"
                      answer="Soy estudiante"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw7"
                      audioText="Vivo en Moscú"
                      answer="Vivo en Moscú"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw8"
                      audioText="Me gusta el café"
                      answer="Me gusta el café"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw9"
                      audioText="Tengo dos hermanos"
                      answer="Tengo dos hermanos"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw10"
                      audioText="Estudio español"
                      answer="Estudio español"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                  </>
                ) : (
                  <>
                    <AudioDictationExercise
                      id="hw1_v2"
                      audioText="Me llamo Pedro"
                      answer="Me llamo Pedro"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw2_v2"
                      audioText="Tengo sed"
                      answer="Tengo sed"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw3_v2"
                      audioText="¿Dónde vives?"
                      answer="¿Dónde vives?"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw4_v2"
                      audioText="Hablo inglés"
                      answer="Hablo inglés"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw5_v2"
                      audioText="¿Qué hora es?"
                      answer="¿Qué hora es?"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw6_v2"
                      audioText="Soy profesor"
                      answer="Soy profesor"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw7_v2"
                      audioText="Vivo en Madrid"
                      answer="Vivo en Madrid"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw8_v2"
                      audioText="Me gusta el té"
                      answer="Me gusta el té"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw9_v2"
                      audioText="Tengo una hermana"
                      answer="Tengo una hermana"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                    <AudioDictationExercise
                      id="hw10_v2"
                      audioText="Trabajo en casa"
                      answer="Trabajo en casa"
                      progress={progress}
                      updateProgress={updateProgress}
                      mode="hw"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Dictation Exercise Component (for video-based)
function DictationExercise({ id, text, answer, progress, updateProgress }) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('pending')
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    const item = progress.cw?.[id]
    if (item) {
      setValue(item.value || '')
      setStatus(item.status || 'pending')
      setAttempts(item.attempts || 0)
    }
  }, [progress, id])

  const normalize = (s) => s.toLowerCase().replace(/[^a-zñáéíóúü]/g, '').trim()

  const handleCheck = () => {
    if (status === 'correct' || status === 'revealed') return

    const newAttempts = attempts + 1
    const isCorrect = normalize(value) === normalize(answer) && value !== ''

    let newStatus = 'attempting'
    if (isCorrect) newStatus = 'correct'
    else if (newAttempts >= 3) newStatus = 'revealed'

    setAttempts(newAttempts)
    setStatus(newStatus)

    updateProgress('cw', id, {
      value: newStatus === 'revealed' ? answer : value,
      status: newStatus,
      attempts: newAttempts
    })
  }

  const parts = text.split('___')

  return (
    <div className="mb-4 p-4 bg-slate-50 rounded-xl">
      <div className="text-lg mb-2 flex items-center gap-2 flex-wrap">
        <span>{parts[0]}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          disabled={status === 'correct' || status === 'revealed'}
          className={`border-b-2 outline-none px-2 py-1 w-32 text-center bg-white ${
            status === 'correct' ? 'text-emerald-600 border-emerald-600' :
            status === 'revealed' ? 'text-rose-600 border-rose-600' :
            'border-slate-300'
          }`}
          placeholder="..."
        />
        <span>{parts[1]}</span>
        {status !== 'correct' && status !== 'revealed' && (
          <button
            onClick={handleCheck}
            className="ml-2 px-3 py-1 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition-all"
          >
            Проверить
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm">
        {status === 'correct' && (
          <span className="text-emerald-600 flex items-center gap-1">
            <CheckCircle size={16} /> Правильно!
          </span>
        )}
        {status === 'revealed' && (
          <span className="text-rose-600 flex items-center gap-1">
            <Eye size={16} /> Ответ: {answer}
          </span>
        )}
        {status === 'attempting' && attempts > 0 && (
          <span className="text-amber-600 flex items-center gap-1">
            <XCircle size={16} /> Попытка {attempts}/3
          </span>
        )}
      </div>
    </div>
  )
}

// Audio Dictation Exercise Component
function AudioDictationExercise({ id, audioText, answer, progress, updateProgress, mode = 'cw' }) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('pending')
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    const item = progress[mode]?.[id]
    if (item) {
      setValue(item.value || '')
      setStatus(item.status || 'pending')
      setAttempts(item.attempts || 0)
    }
  }, [progress, id, mode])

  const normalize = (s) => s.toLowerCase().replace(/[^a-zñáéíóúü]/g, '').trim()

  const handleCheck = () => {
    if (status === 'correct' || status === 'revealed') return

    const newAttempts = attempts + 1
    const isCorrect = normalize(value) === normalize(answer) && value !== ''

    let newStatus = 'attempting'
    if (isCorrect) newStatus = 'correct'
    else if (newAttempts >= 3) newStatus = 'revealed'

    setAttempts(newAttempts)
    setStatus(newStatus)

    updateProgress(mode, id, {
      value: newStatus === 'revealed' ? answer : value,
      status: newStatus,
      attempts: newAttempts
    })
  }

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(audioText)
    utterance.lang = 'es-ES'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={playAudio}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Volume2 size={18} /> Слушать
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          disabled={status === 'correct' || status === 'revealed'}
          className={`flex-1 border-2 outline-none px-4 py-2 rounded-lg ${
            status === 'correct' ? 'text-emerald-600 border-emerald-600 bg-emerald-50' :
            status === 'revealed' ? 'text-rose-600 border-rose-600 bg-rose-50' :
            'border-slate-300 bg-white text-slate-900'
          }`}
          placeholder="Escribe lo que escuchas..."
        />
        {status !== 'correct' && status !== 'revealed' && (
          <button
            onClick={handleCheck}
            className="px-4 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-slate-100 transition-all"
          >
            ✓
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm">
        {status === 'correct' && (
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle size={16} /> ¡Correcto!
          </span>
        )}
        {status === 'revealed' && (
          <span className="text-rose-400 flex items-center gap-1">
            <Eye size={16} /> Respuesta: {answer}
          </span>
        )}
        {status === 'attempting' && attempts > 0 && (
          <span className="text-amber-400 flex items-center gap-1">
            <XCircle size={16} /> Intento {attempts}/3
          </span>
        )}
      </div>
    </div>
  )
}
