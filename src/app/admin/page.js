'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LESSONS, getLessonById } from '../../lib/lessons'

export default function AdminPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [expandedAssignment, setExpandedAssignment] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== 'gulaevl068@gmail.com') {
        router.push('/dashboard')
        return
      }
      fetchStudents()
    }
    checkAdmin()
  }, [router])

  const fetchStudents = async () => {
    // В реальном проекте Supabase нужен админский ключ (service_role) или edge function
    // чтобы получить список ВСЕХ юзеров auth.users. 
    // Поскольку у нас RLS позволяет админу читать таблицу profiles, берём оттуда:
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      // УБРАЛ ФИЛЬТР, чтобы ты временно видел СЕБЯ для тестов
      // .eq('role', 'student') 
      .order('created_at', { ascending: false })
    
    if (error) console.error("Error fetching students:", error)
    else setStudents(data || [])
    
    setLoading(false)
  }

  const selectStudent = async (student) => {
    setSelectedStudent(student)
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
        total_score: lessonMeta.totalScore
      })
      .select()
      
    if (error) {
      if (error.code === '23505') alert('Этот урок уже назначен этому ученику!')
      else alert('Ошибка при назначении: ' + error.message)
    } else {
      setAssignments([data[0], ...assignments])
    }
  }

  if (loading) return <div className="min-h-screen flex justify-center items-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] font-sans pb-20">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10">
        <div className="max-w-[1100px] mx-auto flex justify-between items-start">
          <div>
            <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#2a9d8f] mb-3">
              Панель преподавателя
            </div>
            <h1 className="font-extrabold text-4xl mb-4 unbounded">
              Centro de<br />
              <em className="text-[#2a9d8f] not-italic font-normal font-serif">Control</em>
            </h1>
          </div>
          <Link href="/dashboard" className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2 text-[13px] font-bold uppercase tracking-widest transition-colors">
            В Дашборд
          </Link>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* ЛЕВАЯ КОЛОНКА: СПИСОК УЧЕНИКОВ */}
        <div className="md:w-1/3 w-full">
          <div className="bg-white border border-[#e5e0d5] rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-[#e5e0d5] px-5 py-4">
              <h3 className="font-bold text-lg unbounded text-[#1a1a2e] m-0">Ученики</h3>
            </div>
            <div className="divide-y divide-[#e5e0d5]">
              {students.length === 0 ? (
                <div className="p-5 text-gray-500 text-sm">Нет зарегистрированных учеников.</div>
              ) : (
                students.map(student => (
                  <button 
                    key={student.id}
                    onClick={() => selectStudent(student)}
                    className={`w-full text-left p-5 hover:bg-gray-50 transition-colors ${selectedStudent?.id === student.id ? 'bg-[#f0faf8] border-l-4 border-[#2a9d8f]' : 'border-l-4 border-transparent'}`}
                  >
                    <div className="font-bold text-[15px] truncate">{student.email}</div>
                    <div className="text-[12px] text-gray-500 mt-1">Регистрация: {new Date(student.created_at).toLocaleDateString('ru-RU')}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: КАРТОЧКА УЧЕНИКА */}
        <div className="md:w-2/3 w-full">
          {!selectedStudent ? (
            <div className="bg-white border border-[#e5e0d5] rounded-2xl p-10 text-center text-gray-400 border-dashed">
              <div className="text-4xl mb-4">👨‍🎓</div>
              Выбери ученика из списка слева, чтобы просмотреть его прогресс и назначить уроки.
            </div>
          ) : (
            <div className="bg-white border border-[#e5e0d5] rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
              <div className="bg-gradient-to-r from-[#2a9d8f] to-[#21867a] text-white px-8 py-6">
                <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Личное дело</div>
                <h2 className="text-2xl font-bold truncate">{selectedStudent.email}</h2>
              </div>
              
              <div className="p-8 bg-gray-50 border-b border-[#e5e0d5]">
                <h3 className="font-bold text-[15px] mb-3">Назначить новый урок</h3>
                <div className="flex gap-3">
                  <select 
                    id="lessonSelect" 
                    className="flex-1 border border-[#e5e0d5] rounded-xl px-4 py-2.5 text-[14px] bg-white outline-none focus:border-[#2a9d8f]"
                  >
                    <option value="">-- Выбери урок --</option>
                    <optgroup label="Испанский (Español)">
                      {LESSONS.spanish.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                    </optgroup>
                    <optgroup label="Английский (English)">
                      {LESSONS.english.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                    </optgroup>
                    <optgroup label="Математика (Math)">
                      {LESSONS.math.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                    </optgroup>
                    <optgroup label="Физика (Physics)">
                      {LESSONS.physics.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                    </optgroup>
                  </select>
                  <button 
                    onClick={() => {
                      const val = document.getElementById('lessonSelect').value;
                      if(val) assignLesson(val);
                    }}
                    className="bg-[#1a1a2e] text-white px-6 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#2a9d8f] transition-colors whitespace-nowrap"
                  >
                    Добавить
                  </button>
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-bold text-[16px] mb-4 unbounded">Назначенные уроки ({assignments.length})</h3>
                <div className="space-y-3">
                  {assignments.length === 0 ? (
                    <div className="text-gray-500 text-[14px] italic">Пока ничего не назначено.</div>
                  ) : (
                    assignments.map(a => {
                      const meta = getLessonById(a.lesson_id)
                      const title = meta ? meta.title : a.lesson_id
                      const subject = meta ? meta.subject : 'Unknown'
                      const isComplete = a.status === 'completed' || (a.total_score > 0 && a.score === a.total_score)
                      const pct = a.total_score > 0 ? Math.round((a.score / a.total_score) * 100) : 0

                      return (
                        <div key={a.id} className="border border-[#e5e0d5] rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2a9d8f]">{subject}</span>
                              {isComplete && <span className="bg-[#f0faf8] text-[#2a9d8f] text-[10px] px-2 py-0.5 rounded-sm font-bold">ПРОЙДЕН</span>}
                            </div>
                            <div className="font-bold text-[15px]">{title}</div>
                            <div className="text-[12px] text-gray-400 mt-1">
                              Назначен: {new Date(a.assigned_at).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          
                          <div className="text-right ml-4 min-w-[100px]">
                            {a.total_score > 0 ? (
                              <>
                                <div className="text-[14px] font-bold mb-1">{a.score} / {a.total_score}</div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                  <div className={`h-full ${isComplete ? 'bg-[#2a9d8f]' : 'bg-[#f4a261]'}`} style={{ width: `${pct}%` }}></div>
                                </div>
                              </>
                            ) : (
                              <div className="text-[12px] text-gray-500 font-mono italic">Теория</div>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  )
}
