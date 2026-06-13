'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LESSONS, getLessonById } from '../../lib/lessons'
import { ChevronDown, ChevronUp, CheckCircle, XCircle, HelpCircle, Trash2, Search, Users, BookOpen, BarChart3 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [expandedId, setExpandedId] = useState(null)
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
        console.error("Admin check error:", err)
        router.push('/dashboard')
      }
    }
    checkAdmin()
  }, [router])

  const fetchStudents = async () => {
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (profilesError) {
      console.error("Error fetching students:", profilesError)
      setLoading(false)
      return
    }

    const { data: lessonsData } = await supabase
      .from('student_lessons')
      .select('*')

    const allLessons = lessonsData || []
    const totalAssigned = allLessons.length
    const completedCount = allLessons.filter(l => l.status === 'completed').length
    const scoresWithTotal = allLessons.filter(l => l.total_score > 0)
    const avgScore = scoresWithTotal.length > 0
      ? Math.round(scoresWithTotal.reduce((sum, l) => sum + (l.score / l.total_score) * 100, 0) / scoresWithTotal.length)
      : 0

    setStudents(profilesData || [])
    setAllLessons(allLessons)
    setStats({
      totalStudents: (profilesData || []).length,
      totalAssigned,
      completedCount,
      avgScore
    })
    setLoading(false)
  }

  const selectStudent = async (student) => {
    setSelectedStudent(student)
    setExpandedId(null)
    const { data, error } = await supabase
      .from('student_lessons')
      .select('*')
      .eq('student_id', student.id)
      .order('assigned_at', { ascending: false })
    
    if (error) console.error("Error fetching assignments:", error)
    else setAssignments(data || [])
  }

  const assignLesson = async (lessonId) => {
    if (!selectedStudent || !lessonId) return
    const lessonMeta = getLessonById(lessonId)
    
    const { data, error } = await supabase
      .from('student_lessons')
      .insert({
        student_id: selectedStudent.id,
        lesson_id: lessonId,
        status: 'assigned',
        score: 0,
        total_score: lessonMeta?.totalScore || 0
      })
      .select()
      
    if (error) {
      if (error.code === '23505') alert('Этот урок уже назначен!')
      else alert('Ошибка: ' + error.message)
    } else {
      setAssignments([data[0], ...assignments])
      setStats(prev => ({ ...prev, totalAssigned: prev.totalAssigned + 1 }))
    }
  }

  const removeLesson = async (assignmentId) => {
    if (!confirm('Убрать этот урок?')) return
    
    const { error } = await supabase
      .from('student_lessons')
      .delete()
      .eq('id', assignmentId)
    
    if (error) {
      alert('Ошибка: ' + error.message)
    } else {
      setAssignments(prev => prev.filter(a => a.id !== assignmentId))
      setStats(prev => ({ ...prev, totalAssigned: Math.max(0, prev.totalAssigned - 1) }))
    }
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const filteredStudents = students.map(s => {
    const studentLessons = allLessons.filter(l => l.student_id === s.id)
    return { ...s, lessonCount: studentLessons.length, completedCount: studentLessons.filter(l => l.status === 'completed').length }
  }).filter(s =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const ProgressDetails = ({ progress }) => {
    if (!progress) return <p className="text-gray-400 italic text-xs">Нет подробных данных.</p>;
    
    const renderBlock = (title, data) => {
        const items = Object.entries(data || {});
        if (items.length === 0) return null;
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
        );
    }

    return (
        <div className="mt-4 p-4 bg-white rounded-xl border border-[#e5e0d5] animate-in fade-in slide-in-from-top-2">
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
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Назначено уроков</div>
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
                    <input
                      type="text"
                      placeholder="Поиск по email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#2a9d8f] transition-colors"
                    />
                  </div>
                </div>
                <div className="divide-y divide-[#e5e0d5] max-h-[500px] overflow-y-auto">
                    {filteredStudents.map(s => (
                        <button key={s.id} onClick={() => selectStudent(s)} className={`w-full text-left p-4 hover:bg-gray-50 transition-all ${selectedStudent?.id === s.id ? 'bg-[#f0faf8] border-l-4 border-[#2a9d8f]' : 'border-l-4 border-transparent'}`}>
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-sm truncate">{s.email}</div>
                              {s.lessonCount > 0 && (
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                  {s.completedCount}/{s.lessonCount}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase mt-1">{s.role}</div>
                        </button>
                    ))}
                    {filteredStudents.length === 0 && (
                      <div className="p-4 text-center text-gray-400 text-sm italic">Не найдено</div>
                    )}
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
                      const total = assignments.length
                      const completed = assignments.filter(a => a.status === 'completed').length
                      const inProgress = assignments.filter(a => a.status === 'in_progress').length
                      const scoresWithTotal = assignments.filter(a => a.total_score > 0)
                      const avgPct = scoresWithTotal.length > 0
                        ? Math.round(scoresWithTotal.reduce((sum, a) => sum + (a.score / a.total_score) * 100, 0) / scoresWithTotal.length)
                        : 0
                      
                      return (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                          <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <div className="text-lg font-black">{total}</div>
                            <div className="text-[9px] font-bold uppercase text-gray-400">Уроков</div>
                          </div>
                          <div className="bg-emerald-50 rounded-xl p-3 text-center">
                            <div className="text-lg font-black text-emerald-600">{completed}</div>
                            <div className="text-[9px] font-bold uppercase text-emerald-400">Пройдено</div>
                          </div>
                          <div className="bg-amber-50 rounded-xl p-3 text-center">
                            <div className="text-lg font-black text-amber-600">{inProgress}</div>
                            <div className="text-[9px] font-bold uppercase text-amber-400">В процессе</div>
                          </div>
                          <div className="bg-blue-50 rounded-xl p-3 text-center">
                            <div className="text-lg font-black text-blue-600">{avgPct}%</div>
                            <div className="text-[9px] font-bold uppercase text-blue-400">Средний балл</div>
                          </div>
                        </div>
                      )
                    })()}
                    
                    <div className="mb-8 flex gap-3">
                        <select id="lSelect" className="flex-1 border rounded-xl p-2.5 text-sm outline-none bg-gray-50">
                            <option value="">Назначить урок...</option>
                            {Object.values(LESSONS).flat().map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                        </select>
                        <button onClick={() => assignLesson(document.getElementById('lSelect').value)} className="bg-slate-900 text-white px-6 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">Add</button>
                    </div>

                    <div className="space-y-4">
                        {assignments.length === 0 && (
                          <div className="text-center py-10 text-gray-400 italic">Уроки не назначены</div>
                        )}
                        {assignments.map(a => {
                            const meta = getLessonById(a.lesson_id);
                            const isExpanded = expandedId === a.id;

                            return (
                                <div key={a.id} className="flex flex-col">
                                    <div className="border border-[#e5e0d5] rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div onClick={() => toggleExpand(a.id)} className="flex-1 cursor-pointer">
                                            <div className="text-[10px] font-bold text-[#2a9d8f] uppercase">{meta?.subject}</div>
                                            <div className="font-bold">{meta?.title || a.lesson_id}</div>
                                            <div className="text-[10px] text-gray-400 mt-1">
                                              {a.status} • {a.score}/{a.total_score}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button 
                                              onClick={() => removeLesson(a.id)} 
                                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                              title="Убрать урок"
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                            <button onClick={() => toggleExpand(a.id)} className="text-gray-400">
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
            ) : (
                <div className="text-center p-20 text-gray-400 italic">Студент не выбран.</div>
            )}
        </div>
      </div>
    </div>
    </div>
  )
}
