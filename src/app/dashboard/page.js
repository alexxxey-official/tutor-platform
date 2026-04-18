'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getLessonById } from '../../lib/lessons'
import SkillTree from '../../components/SkillTree'

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
      
      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(profileData)
      
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

  // Group assignments by subject
  const subjects = {}
  assignments.forEach(a => {
    const meta = getLessonById(a.lesson_id)
    if (!meta) return
    if (!subjects[meta.subject]) subjects[meta.subject] = []
    
    // Map to SkillTree node format
    const isComplete = a.status === 'completed' || (a.total_score > 0 && a.score === a.total_score)
    const isStarted = a.score > 0
    
    subjects[meta.subject].push({
      id: a.id,
      title: meta.title,
      link: meta.path,
      status: isComplete ? 'completed' : (isStarted ? 'current' : 'locked'),
      original: a
    })
  })

  // For testing UI if student has no lessons assigned yet
  const hasLessons = assignments.length > 0
  const renderSubjects = hasLessons ? subjects : {
    "English": [
      { id: 'mock1', title: 'Passive Voice', status: 'completed', link: '/lessons/english/passive-voice' },
      { id: 'mock2', title: 'Indefinite Pronouns', status: 'current', link: '/lessons/english/indefinite-pronouns' },
      { id: 'mock3', title: 'Conditionals (Zero & 1st)', status: 'locked' }
    ]
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e1b4b] pb-20 font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800;900&display=swap');
        .unbounded { font-family: 'Unbounded', sans-serif; }
      `}</style>
      
      <div className="bg-indigo-950 text-white px-10 py-12 pb-10 relative overflow-hidden mb-12 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-start relative z-10">
          <div>
            <div className="text-[11px] font-semibold tracking-[3px] uppercase text-amber-400 mb-3">
              STUDENT DASHBOARD
            </div>
            <h1 className="font-black text-4xl leading-[1.1] mb-4 unbounded">
              Hello,<br />
              <em className="text-emerald-400 not-italic font-normal">{user?.email?.split('@')[0]}</em>!
            </h1>
            <p className="text-white/70 text-[15px] max-w-[500px]">
              {hasLessons ? "Welcome to your Skill Map. Your assigned lessons are ready." : "This is a preview of your Skill Map. Your teacher will assign real lessons soon."}
            </p>
          </div>
          <div className="flex gap-3">
             {user?.email === 'gulaevl068@gmail.com' && (
              <Link href="/admin" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-indigo-500 transition-colors shadow-lg">
                Admin Panel
              </Link>
            )}
            <button onClick={handleLogout} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-6">
        {!hasLessons && (
           <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-center mb-8 font-bold text-sm shadow-sm">
             You don't have assigned lessons yet. Showing a preview Map.
           </div>
        )}

        {Object.keys(renderSubjects).map(subject => (
          <div key={subject} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-12 mb-12 relative overflow-hidden">
             <SkillTree subject={subject} lessons={renderSubjects[subject]} />
          </div>
        ))}
      </main>
    </div>
  )
}
