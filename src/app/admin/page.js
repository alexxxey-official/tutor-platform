'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LESSONS, getLessonById } from '../../lib/lessons'
import { ChevronDown, ChevronUp, CheckCircle, XCircle, HelpCircle } from 'lucide-react'

export default function AdminPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [expandedId, setExpandedId] = useState(null)
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
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) console.error("Error fetching students:", error)
    else setStudents(data || [])
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
    }
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

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

      <div className="max-w-[1100px] mx-auto px-6 mt-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 w-full">
            <div className="bg-white border border-[#e5e0d5] rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gray-50 border-b border-[#e5e0d5] px-5 py-4 font-bold">Студенты</div>
                <div className="divide-y divide-[#e5e0d5]">
                    {students.map(s => (
                        <button key={s.id} onClick={() => selectStudent(s)} className={`w-full text-left p-4 hover:bg-gray-50 transition-all ${selectedStudent?.id === s.id ? 'bg-[#f0faf8] border-l-4 border-[#2a9d8f]' : 'border-l-4 border-transparent'}`}>
                            <div className="font-bold text-sm truncate">{s.email}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="md:w-2/3 w-full">
            {selectedStudent ? (
                <div className="bg-white border border-[#e5e0d5] rounded-2xl shadow-sm overflow-hidden p-8">
                    <h2 className="text-2xl font-bold mb-6">{selectedStudent.email}</h2>
                    
                    <div className="mb-8 flex gap-3">
                        <select id="lSelect" className="flex-1 border rounded-xl p-2.5 text-sm outline-none bg-gray-50">
                            <option value="">Назначить урок...</option>
                            {Object.values(LESSONS).flat().map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                        </select>
                        <button onClick={() => assignLesson(document.getElementById('lSelect').value)} className="bg-slate-900 text-white px-6 rounded-xl text-sm font-bold">Add</button>
                    </div>

                    <div className="space-y-4">
                        {assignments.map(a => {
                            const meta = getLessonById(a.lesson_id);
                            const isExpanded = expandedId === a.id;
                            const pct = a.total_score > 0 ? Math.round((a.score / a.total_score) * 100) : 0;

                            return (
                                <div key={a.id} className="flex flex-col">
                                    <div onClick={() => toggleExpand(a.id)} className="border border-[#e5e0d5] rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
                                        <div className="flex-1">
                                            <div className="text-[10px] font-bold text-[#2a9d8f] uppercase">{meta?.subject}</div>
                                            <div className="font-bold">{meta?.title || a.lesson_id}</div>
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <div className="text-sm font-bold">{a.score} / {a.total_score}</div>
                                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
  )
}
