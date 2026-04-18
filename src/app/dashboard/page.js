'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getLessonById } from '../../lib/lessons'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, PlayCircle, CheckCircle2, Circle } from 'lucide-react'

// Компонент аккордеона для каждого предмета
const SubjectAccordion = ({ subject, level, lessons, color, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-6 transition-all">
      {/* Шапка Аккордеона */}
      <button 
        onClick={onToggle}
        className="w-full px-6 py-6 sm:px-8 sm:py-8 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-lg ${color}`}>
            {subject.charAt(0)}
          </div>
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl font-black unbounded text-slate-900 mb-1">{subject}</h2>
            <div className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">
              {level} • {lessons.length} уроков
            </div>
          </div>
        </div>
        <div className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-slate-100 text-slate-900' : 'text-slate-400'}`}>
          <ChevronDown size={24} />
        </div>
      </button>

      {/* Тело Аккордеона */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
          >
            <div className="p-4 sm:p-8 flex flex-col gap-3">
              {lessons.map((lesson, idx) => {
                // Safely access progress_data
                const progressData = lesson.original?.progress_data || {}
                
                // Helper to calculate stats safely
                const calcStats = (mode, total) => {
                  try {
                    const data = progressData ? progressData[mode] : {}
                    const safeData = data || {}
                    const exercises = Object.values(safeData)
                    const correct = exercises.filter(ex => ex && ex.status === 'correct').length
                    const revealed = exercises.filter(ex => ex && ex.status === 'revealed').length
                    const isComplete = (correct + revealed) >= total && total > 0
                    return { correct, revealed, total, pct: total > 0 ? Math.round((correct / total) * 100) : 0, isComplete }
                  } catch (e) {
                    return { correct: 0, revealed: 0, total: total || 0, pct: 0, isComplete: false }
                  }
                }

                // Safely access lesson.meta
                const safeTotalCW = lesson.meta ? (lesson.meta.totalCW || 0) : 0
                const safeTotalHW = lesson.meta ? (lesson.meta.totalHW || 0) : 0

                const cwStats = calcStats('cw', safeTotalCW)
                const hwStats = calcStats('hw', safeTotalHW)
                
                // Fallback to original score calculation if meta is missing
                const isComplete = (lesson.meta && safeTotalCW + safeTotalHW > 0) 
                  ? (cwStats.isComplete && hwStats.isComplete) 
                  : (lesson.status === 'completed' || (lesson.total_score > 0 && lesson.score === lesson.total_score))

                const isStarted = lesson.score > 0

                return (
                  <Link 
                    href={lesson.link} 
                    key={lesson.id}
                    className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex items-center gap-4 sm:gap-6"
                  >
                    {/* Иконка статуса */}
                    <div className="flex-shrink-0">
                      {isComplete ? (
                        <CheckCircle2 size={32} className="text-emerald-500" />
                      ) : isStarted ? (
                        <PlayCircle size={32} className="text-amber-500" />
                      ) : (
                        <Circle size={32} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                      )}
                    </div>

                    {/* Название и прогресс */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-3">
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 truncate pr-4">
                          <span className="text-slate-400 font-normal mr-2">{idx + 1}.</span>
                          {lesson.title}
                        </h3>
                      </div>
                      
                      {/* Полоски прогресса */}
                      {(safeTotalCW > 0 || safeTotalHW > 0) ? (
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          {/* Classwork */}
                          {safeTotalCW > 0 && (
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Classwork</span>
                                <span className="text-[10px] font-black text-slate-600">{cwStats.pct}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${cwStats.total > 0 ? (cwStats.correct / cwStats.total) * 100 : 0}%` }}></div>
                                <div className="h-full bg-emerald-300 transition-all duration-1000" style={{ width: `${cwStats.total > 0 ? (cwStats.revealed / cwStats.total) * 100 : 0}%` }}></div>
                              </div>
                            </div>
                          )}
                          
                          {/* Homework */}
                          {safeTotalHW > 0 && (
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Homework</span>
                                <span className="text-[10px] font-black text-slate-600">{hwStats.pct}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${hwStats.total > 0 ? (hwStats.correct / hwStats.total) * 100 : 0}%` }}></div>
                                <div className="h-full bg-red-400 transition-all duration-1000" style={{ width: `${hwStats.total > 0 ? (hwStats.revealed / hwStats.total) * 100 : 0}%` }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                          Теория / Введение
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [openSubject, setOpenSubject] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      
      const { data: assignedData } = await supabase
        .from('student_lessons')
        .select('*')
        .eq('student_id', user.id)
        .order('assigned_at', { ascending: false })
      
      const fixedAssignments = (assignedData || []).map(a => {
        const meta = getLessonById(a.lesson_id)
        if (meta && meta.totalScore && (!a.total_score || a.total_score === 0)) {
            supabase.from('student_lessons').update({ total_score: meta.totalScore }).eq('id', a.id).then(() => {})
            return { ...a, total_score: meta.totalScore }
        }
        return a
      })
      
      setAssignments(fixedAssignments)
      setLoading(false)
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="min-h-screen bg-[#f8fafc] text-[#1e1b4b] flex items-center justify-center font-bold font-mono">LOADING...</div>

  // Настройка уровней и цветов для предметов
  const subjectConfig = {
    'Español': { level: 'Уровень A1', color: 'bg-rose-500' },
    'English': { level: 'Уровень B1', color: 'bg-indigo-600' },
    'Math': { level: 'Общий курс', color: 'bg-emerald-500' },
    'Physics': { level: 'Общий курс', color: 'bg-violet-500' }
  }

  // Группировка
  const subjectsMap = {}
  assignments.forEach(a => {
    const meta = getLessonById(a.lesson_id)
    if (!meta) return
    if (!subjectsMap[meta.subject]) {
      subjectsMap[meta.subject] = {
        name: meta.subject,
        level: subjectConfig[meta.subject]?.level || 'Общий курс',
        color: subjectConfig[meta.subject]?.color || 'bg-slate-800',
        lessons: []
      }
    }
    
    const isComplete = a.status === 'completed' || (a.total_score > 0 && a.score === a.total_score)
    
    subjectsMap[meta.subject].lessons.push({
      id: a.id,
      title: meta.title,
      link: meta.path,
      status: isComplete ? 'completed' : 'available',
      score: a.score,
      total_score: a.total_score,
      meta: meta,
      original: a
    })
  })

  const hasLessons = assignments.length > 0
  
  // Для тестирования дизайна, если нет уроков
  const renderSubjects = hasLessons ? Object.values(subjectsMap) : [
    {
      name: 'English',
      level: 'Уровень B1',
      color: 'bg-indigo-600',
      lessons: [
        { id: 'm1', title: 'Passive Voice', link: '/lessons/english/passive-voice', status: 'completed', score: 41, total_score: 41, meta: { totalCW: 23, totalHW: 18 }, original: { progress_data: { cw: { 'hw1': { status: 'correct' } }, hw: { 'hw1': { status: 'correct' } } } } },
        { id: 'm2', title: 'Indefinite Pronouns', link: '/lessons/english/indefinite-pronouns', status: 'available', score: 10, total_score: 50, meta: { totalCW: 30, totalHW: 20 }, original: { progress_data: { cw: {}, hw: {} } } }
      ]
    },
    {
      name: 'Español',
      level: 'Уровень A1',
      color: 'bg-rose-500',
      lessons: [
        { id: 's1', title: 'Введение: Карта грамматики', link: '/lessons/spanish/intro', status: 'completed', score: 0, total_score: 0, meta: { totalCW: 0, totalHW: 0 }, original: {} },
        { id: 's2', title: 'Урок 1: Правила чтения', link: '/lessons/spanish/phonetics', status: 'available', score: 0, total_score: 5, meta: { totalCW: 3, totalHW: 2 }, original: {} }
      ]
    }
  ]

  // По умолчанию открываем первый предмет
  useEffect(() => {
    try {
      if (renderSubjects && renderSubjects.length > 0 && !openSubject) {
        setOpenSubject(renderSubjects[0].name)
      }
    } catch (e) {
      // ignore
    }
  }, [renderSubjects, openSubject])

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e1b4b] pb-20 font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800;900&display=swap');
        .unbounded { font-family: 'Unbounded', sans-serif; }
      `}</style>
      
      <div className="bg-indigo-950 text-white px-6 sm:px-10 py-10 relative overflow-hidden mb-10 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 relative z-10">
          <div>
            <div className="text-[10px] font-bold tracking-[3px] uppercase text-amber-400 mb-3">
              Дашборд Ученика
            </div>
            <h1 className="font-black text-3xl sm:text-4xl leading-[1.1] mb-2 unbounded">
              Привет,<br />
              <em className="text-emerald-400 not-italic font-normal">{user?.email?.split('@')[0]}</em>!
            </h1>
          </div>
          <div className="flex gap-3">
             {user?.email === 'gulaevl068@gmail.com' && (
              <Link href="/admin" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-indigo-500 transition-colors shadow-lg">
                Admin Panel
              </Link>
            )}
            <button onClick={handleLogout} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest transition-colors">
              Выйти
            </button>
          </div>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {!hasLessons && (
           <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-center mb-8 font-bold text-sm shadow-sm mx-2">
             Вам пока не назначены реальные уроки. Показан пример интерфейса.
           </div>
        )}

        {renderSubjects.map((subj) => (
          <SubjectAccordion 
            key={subj.name}
            subject={subj.name}
            level={subj.level}
            color={subj.color}
            lessons={subj.lessons}
            isOpen={openSubject === subj.name}
            onToggle={() => setOpenSubject(openSubject === subj.name ? null : subj.name)}
          />
        ))}
      </main>
    </div>
  )
}
