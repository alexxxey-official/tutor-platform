'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getLessonById } from '../../lib/lessons'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      
      // Load profile to check role
      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(profileData)
      
      // Load assigned lessons
      const { data: assignedData } = await supabase
        .from('student_lessons')
        .select('*')
        .eq('student_id', user.id)
        .order('assigned_at', { ascending: false })
      
      setAssignments(assignedData || [])
      setLoading(false)
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] flex items-center justify-center font-bold font-mono">LOADING...</div>

  // Group assignments by subject
  const subjects = {}
  assignments.forEach(a => {
    const meta = getLessonById(a.lesson_id)
    if (!meta) return
    if (!subjects[meta.subject]) subjects[meta.subject] = []
    subjects[meta.subject].push({ ...a, meta })
  })

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden mb-12">
        <div className="max-w-[1100px] mx-auto flex justify-between items-start relative z-10">
          <div>
            <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#e63946] mb-3">
              ESTUDIANTES · AG ACADEMY
            </div>
            <h1 className="font-extrabold text-[clamp(32px,5vw,48px)] leading-[1.1] mb-4 unbounded">
              ¡Hola,<br />
              <em className="text-[#f4a261] not-italic font-normal font-serif">{user?.email?.split('@')[0]}</em>!
            </h1>
            <p className="text-white/70 text-[15px] max-w-[500px]">
              Добро пожаловать в твой учебный центр. Здесь отображаются только те уроки, которые назначил преподаватель.
            </p>
          </div>
          <div className="flex gap-3">
             {profile?.role === 'admin' && (
              <Link href="/admin" className="px-5 py-2.5 bg-[#2a9d8f] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#21867a] transition-colors shadow-lg">
                Admin Panel
              </Link>
            )}
            <button onClick={handleLogout} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest transition-colors">
              Выйти
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1100px] mx-auto px-6">
        
        {assignments.length === 0 ? (
          <div className="bg-white border border-[#e5e0d5] rounded-3xl p-16 text-center shadow-sm max-w-[600px] mx-auto mt-10">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-2xl font-bold unbounded mb-4">Пока пусто!</h2>
            <p className="text-gray-500 text-[16px] leading-relaxed">
              Преподаватель ещё не назначил тебе уроки. Как только он это сделает, они моментально появятся на этом экране.
            </p>
          </div>
        ) : (
          Object.keys(subjects).map(subject => (
            <div key={subject} className="mb-16">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#1a1a2e] mb-6">
                Предмет
                <div className="w-[40px] h-[2px] bg-[#1a1a2e]"></div>
              </div>
              <h2 className="font-bold text-[32px] text-[#1a1a2e] mb-8 unbounded">{subject}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects[subject].map(({ id, status, score, total_score, meta }) => {
                  const isComplete = status === 'completed' || (total_score > 0 && score === total_score)
                  const pct = total_score > 0 ? Math.round((score / total_score) * 100) : 0
                  
                  return (
                    <div key={id} className="bg-white border border-[#e5e0d5] rounded-2xl p-6 relative shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                      <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-sm transition-colors" style={{ backgroundColor: meta.color }}></div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: meta.color }}>
                          Назначено
                        </div>
                        {isComplete && (
                          <div className="bg-[#f0faf8] text-[#2a9d8f] text-[10px] px-2 py-0.5 rounded-sm font-bold border border-[#2a9d8f]/30">
                            ПРОЙДЕН
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-[18px] unbounded mb-3 leading-tight flex-1">
                        {meta.title}
                      </h3>

                      {total_score > 0 ? (
                        <div className="mt-auto mb-6">
                          <div className="flex justify-between text-[12px] font-bold mb-1.5 text-gray-500">
                            <span>Прогресс</span>
                            <span>{score} / {total_score}</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500" 
                              style={{ width: `${pct}%`, backgroundColor: isComplete ? '#2a9d8f' : meta.color }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-auto mb-6">
                          <div className="text-[12px] text-gray-400 font-mono italic">Теоретический материал</div>
                        </div>
                      )}

                      <Link 
                        href={meta.path} 
                        className="block w-full py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold text-[14px] transition-colors group-hover:opacity-90"
                        style={{ backgroundColor: isComplete ? '#1a1a2e' : meta.color }}
                      >
                        {isComplete ? 'Повторить' : (score > 0 ? 'Продолжить' : 'Начать')}
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  )
}
