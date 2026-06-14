'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LESSONS, getLessonById } from '../../lib/lessons'
import { ChevronDown, ChevronUp, CheckCircle, XCircle, HelpCircle, Trash2, Search, Users, BookOpen, BarChart3, Plus, Check } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const subjectConfig = {
  'Español': { color: 'bg-rose-500', light: 'bg-rose-50 text-rose-700 border-rose-200', icon: '🇪🇸' },
  'English': { color: 'bg-indigo-600', light: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: '🇬🇧' },
  'Math': { color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '📐' },
  'Physics': { color: 'bg-violet-500', light: 'bg-violet-50 text-violet-700 border-violet-200', icon: '⚛️' },
  'עברית': { color: 'bg-cyan-500', light: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: '🇮🇱' },
}

export default function AdminPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [activeSubject, setActiveSubject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({ totalStudents: 0, totalAssigned: 0, completedCount: 0, avgScore: 0 })
  const [allLessons, setAllLessons] = useState([])
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data, error: authError } = await supabase.auth.getUser()
        const user = data?.user
        if (authError || !user || user.email !== 'gulaevl068@gmail.com') {
          router.push('/dashboard')
          return
        }
        fetchStudents()
      } catch (err) {
        router.push('/dashboard')
      }
    }
    checkAdmin()
  }, [router])

  const fetchStudents = async () => {
    const { data: profilesData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    const { data: lessonsData } = await supabase.from('student_lessons').select('*')

    const all = lessonsData || []
    setStudents(profilesData || [])
    setAllLessons(all)
    setStats({
      totalStudents: (profilesData || []).length,
      totalAssigned: all.length,
      completedCount: all.filter(l => l.status === 'completed').length,
      avgScore: all.filter(l => l.total_score > 0).length > 0
        ? Math.round(all.filter(l => l.total_score > 0).reduce((s, l) => s + (l.score / l.total_score) * 100, 0) / all.filter(l => l.total_score > 0).length)
        : 0
    })
    setLoading(false)
  }

  const selectStudent = async (student) => {
    setSelectedStudent(student)
    setExpandedId(null)
    setActiveSubject(null)
    const { data } = await supabase.from('student_lessons').select('*').eq('student_id', student.id).order('assigned_at', { ascending: false })
    setAssignments(data || [])
  }

  const assignLesson = async (lessonId) => {
    if (!selectedStudent || !lessonId) return
    const lessonMeta = getLessonById(lessonId)
    const { data, error } = await supabase.from('student_lessons').insert({
      student_id: selectedStudent.id,
      lesson_id: lessonId,
      status: 'assigned',
      score: 0,
      total_score: lessonMeta?.totalScore || 0
    }).select()

    if (error) {
      if (error.code === '23505') alert('Этот урок уже назначен!')
      else alert('Ошибка: ' + error.message)
    } else {
      setAssignments([data[0], ...assignments])
    }
  }

  const removeLesson = async (assignmentId) => {
    if (!confirm('Убрать этот урок?')) return
    const { error } = await supabase.from('student_lessons').delete().eq('id', assignmentId)
    if (!error) setAssignments(prev => prev.filter(a => a.id !== assignmentId))
  }

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id)

  const filteredStudents = students.map(s => {
    const sl = allLessons.filter(l => l.student_id === s.id)
    return { ...s, lessonCount: sl.length, completedCount: sl.filter(l => l.status === 'completed').length }
  }).filter(s => s.email.toLowerCase().includes(searchQuery.toLowerCase()))

  const assignedIds = new Set(assignments.map(a => a.lesson_id))

  const ProgressDetails = ({ progress }) => {
    if (!progress) return <p className="text-gray-400 italic text-xs">Нет данных.</p>
    const renderBlock = (title, data) => {
      const items = Object.entries(data || {})
      if (!items.length) return null
      return (
        <div className="mb-4">
          <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-2">{title}</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {items.map(([id, info]) => (
              <div key={id} className={`p-2 rounded border flex flex-col items-center justify-center text-center ${info.status === 'correct' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : info.status === 'revealed' ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                <span className="text-[10px] font-bold block truncate w-full">{id}</span>
                <div className="flex items-center gap-1 mt-1">
                  {info.status === 'correct' ? <CheckCircle size={10} /> : info.status === 'revealed' ? <XCircle size={10} /> : <HelpCircle size={10} />}
                  <span className="text-[10px]">{info.attempts || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return (
      <div className="mt-4 p-4 bg-white rounded-xl border border-[#e5e0d5]">
        {renderBlock("Classwork (CW)", progress.cw)}
        {renderBlock("Homework (HW)", progress.hw)}
      </div>
    )
  }

  if (loading) return <div className="min-h-screen flex justify-center items-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] font-sans pb-20">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10">
        <div className="max-w-[1100px] mx-auto flex justify-between items-start">
          <h1 className="font-extrabold text-4xl mb-4 unbounded uppercase">Admin <span className="text-[#2a9d8f]">Control</span></h1>
          <Link href="/dashboard" className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2 text-[13px] font-bold transition-colors">Дашборд</Link>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-5 text-center">
            <Users size={20} className="text-[#2a9d8f] mx-auto mb-2" />
            <div className="text-2xl font-black unbounded">{stats.totalStudents}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Учеников</div>
          </div>
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-5 text-center">
            <BookOpen size={20} className="text-[#e63946] mx-auto mb-2" />
            <div className="text-2xl font-black unbounded">{stats.totalAssigned}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Назначено</div>
          </div>
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-5 text-center">
            <CheckCircle size={20} className="text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-black unbounded">{stats.completedCount}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Пройдено</div>
          </div>
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-5 text-center">
            <BarChart3 size={20} className="text-[#f4a261] mx-auto mb-2" />
            <div className="text-2xl font-black unbounded">{stats.avgScore}%</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Средний балл</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 w-full">
            <div className="bg-white border border-[#e5e0d5] rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-[#e5e0d5] px-5 py-4">
                <div className="font-bold mb-3">Студенты ({filteredStudents.length})</div>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Поиск..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#2a9d8f]" />
                </div>
              </div>
              <div className="divide-y divide-[#e5e0d5] max-h-[500px] overflow-y-auto">
                {filteredStudents.map(s => (
                  <button key={s.id} onClick={() => selectStudent(s)} className={`w-full text-left p-4 hover:bg-gray-50 transition-all ${selectedStudent?.id === s.id ? 'bg-[#f0faf8] border-l-4 border-[#2a9d8f]' : 'border-l-4 border-transparent'}`}>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm truncate">{s.email}</div>
                      {s.lessonCount > 0 && (
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{s.completedCount}/{s.lessonCount}</span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-400 uppercase mt-1">{s.role}</div>
                  </button>
                ))}
                {filteredStudents.length === 0 && <div className="p-4 text-center text-gray-400 text-sm italic">Не найдено</div>}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 w-full">
            {selectedStudent ? (
              <div className="bg-white border border-[#e5e0d5] rounded-2xl shadow-sm overflow-hidden p-8">
                <h2 className="text-2xl font-bold mb-2">{selectedStudent.email}</h2>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-6">
                  Зарегистрирован: {new Date(selectedStudent.created_at).toLocaleDateString('ru-RU')}
                </div>

                {assignments.length > 0 && (() => {
                  const bySubject = {}
                  assignments.forEach(a => {
                    const meta = getLessonById(a.lesson_id)
                    const subject = meta?.subject || 'Другое'
                    if (!bySubject[subject]) bySubject[subject] = { total: 0, completed: 0, scores: [] }
                    bySubject[subject].total++
                    if (a.status === 'completed') bySubject[subject].completed++
                    if (a.total_score > 0) bySubject[subject].scores.push((a.score / a.total_score) * 100)
                  })

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                      {Object.entries(bySubject).map(([subject, data]) => {
                        const avgPct = data.scores.length > 0
                          ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length)
                          : 0
                        const cfg = subjectConfig[subject] || { light: 'bg-gray-50 text-gray-700' }
                        return (
                          <div key={subject} className={`${cfg.light} rounded-xl p-4`}>
                            <div className="font-bold text-sm mb-2">{subject}</div>
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-[10px] uppercase opacity-60">Уроков</div>
                                <div className="text-lg font-black">{data.completed}/{data.total}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] uppercase opacity-60">Балл</div>
                                <div className="text-lg font-black">{avgPct}%</div>
                              </div>
                            </div>
                            <div className="mt-2 h-1.5 bg-black/10 rounded-full overflow-hidden">
                              <div className="h-full bg-current rounded-full transition-all" style={{ width: `${data.total > 0 ? (data.completed / data.total) * 100 : 0}%` }}></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}

                <div className="mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Назначить урок</div>
                  <div className="space-y-3">
                    {Object.entries(LESSONS).map(([key, lessons]) => {
                      const cfg = subjectConfig[lessons[0]?.subject] || { color: 'bg-gray-500', light: 'bg-gray-50 text-gray-700 border-gray-200', icon: '📚' }
                      const isOpen = activeSubject === key
                      const assignedInSubject = lessons.filter(l => assignedIds.has(l.id)).length

                      return (
                        <div key={key} className={`border rounded-xl overflow-hidden transition-all ${isOpen ? 'border-slate-300 shadow-sm' : 'border-[#e5e0d5]'}`}>
                          <button
                            onClick={() => setActiveSubject(isOpen ? null : key)}
                            className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${cfg.light} hover:brightness-95`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{cfg.icon}</span>
                              <div className="text-left">
                                <div className="font-bold text-sm">{lessons[0]?.subject}</div>
                                <div className="text-[10px] opacity-60">{lessons.length} уроков • {assignedInSubject} назначено</div>
                              </div>
                            </div>
                            <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isOpen && (
                            <div className="border-t border-[#e5e0d5] bg-white divide-y divide-[#e5e0d5]">
                              {lessons.map(lesson => {
                                const isAssigned = assignedIds.has(lesson.id)
                                return (
                                  <button
                                    key={lesson.id}
                                    onClick={() => !isAssigned && assignLesson(lesson.id)}
                                    disabled={isAssigned}
                                    className={`w-full px-5 py-3 flex items-center justify-between text-left transition-colors ${
                                      isAssigned ? 'bg-gray-50 cursor-default' : 'hover:bg-gray-50 cursor-pointer'
                                    }`}
                                  >
                                    <div className="flex-1 min-w-0">
                                      <div className="font-bold text-sm truncate">{lesson.title}</div>
                                      {lesson.totalScore > 0 && (
                                        <div className="text-[10px] text-gray-400">{lesson.totalCW} CW + {lesson.totalHW} HW = {lesson.totalScore}</div>
                                      )}
                                    </div>
                                    {isAssigned ? (
                                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
                                        <Check size={12} /> Назначен
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-bold text-white bg-slate-900 hover:bg-slate-700 px-3 py-1 rounded-full flex items-center gap-1 transition-colors">
                                        <Plus size={12} /> Назначить
                                      </span>
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Назначенные уроки</div>
                  <div className="space-y-3">
                    {assignments.length === 0 && (
                      <div className="text-center py-10 text-gray-400 italic">Уроки не назначены</div>
                    )}
                    {assignments.map(a => {
                      const meta = getLessonById(a.lesson_id)
                      const cfg = subjectConfig[meta?.subject] || { light: 'bg-gray-50 text-gray-700 border-gray-200' }
                      const isExpanded = expandedId === a.id
                      return (
                        <div key={a.id} className="flex flex-col">
                          <div className={`border rounded-xl p-4 flex items-center justify-between transition-colors ${isExpanded ? 'border-slate-300 bg-gray-50' : 'border-[#e5e0d5] hover:bg-gray-50'}`}>
                            <div onClick={() => toggleExpand(a.id)} className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cfg.light}`}>{meta?.subject}</span>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                  a.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                  a.status === 'in_progress' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'
                                }`}>{a.status}</span>
                              </div>
                              <div className="font-bold text-sm">{meta?.title || a.lesson_id}</div>
                              <div className="text-[10px] text-gray-400 mt-1">{a.score}/{a.total_score}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => removeLesson(a.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Убрать">
                                <Trash2 size={14} />
                              </button>
                              <button onClick={() => toggleExpand(a.id)} className="p-1 text-gray-400">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                          </div>
                          {isExpanded && <ProgressDetails progress={a.progress_data} />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-20 text-gray-400 italic">Выбери ученика слева</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
