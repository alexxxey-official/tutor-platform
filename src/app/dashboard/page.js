'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
      else setUser(user)
      setLoading(false)
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] flex items-center justify-center font-bold font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20">
      <div className="hero mb-12">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div>
            <div className="label">ESTUDIANTES · AG ACADEMY</div>
            <h1>¡Hola, <em>{user?.email?.split('@')[0]}</em>!</h1>
            <p>Добро пожаловать в твой учебный центр. Все твои уроки и прогресс собраны здесь.</p>
          </div>
          <div className="flex gap-3">
             {user?.email === 'gulaevl068@gmail.com' && (
              <Link href="/admin" className="px-4 py-2 bg-[#2a9d8f] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#21867a] transition">Admin Panel</Link>
            )}
            <button onClick={handleLogout} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition">Выйти</button>
          </div>
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-6">
        {/* АНГЛИЙСКИЙ */}
        <div className="section-label">English Language</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="theory-card">
            <div className="stripe !bg-[#2a9d8f]"></div>
            <div className="label !mb-2">Grammar · B1-B2</div>
            <h3 className="unbounded font-bold text-xl mb-4">Passive Voice</h3>
            <a href="/legacy-lessons/english/english_passive_voice.html" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#2a9d8f] transition-colors">Открыть урок</a>
          </div>
        </div>

        {/* ИСПАНСКИЙ */}
        <div className="section-label">Español</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="theory-card">
            <div className="stripe !bg-[#f4a261]"></div>
            <div className="label !mb-2">Vocabulario · A1</div>
            <h3 className="unbounded font-bold text-xl mb-4">Мега-словарь A1</h3>
            <Link href="/lessons/spanish" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#f4a261] transition-colors">Открыть словарь</Link>
          </div>
        </div>

        {/* МАТЕМАТИКА */}
        <div className="section-label">Mathematics</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="theory-card">
            <div className="stripe !bg-[#e63946]"></div>
            <h3 className="unbounded font-bold text-lg mb-4">Квадратные уравнения</h3>
            <a href="/legacy-lessons/math/quadratic_equations.html" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#e63946] transition-colors text-sm">Открыть</a>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-[#e63946]"></div>
            <h3 className="unbounded font-bold text-lg mb-4">Неравенства</h3>
            <a href="/legacy-lessons/math/inequalities.html" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#e63946] transition-colors text-sm">Открыть</a>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-[#e63946]"></div>
            <h3 className="unbounded font-bold text-lg mb-4">Движение (Задание 10)</h3>
            <a href="/legacy-lessons/math/ege_task10_motion.html" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#e63946] transition-colors text-sm">Открыть</a>
          </div>
        </div>

        {/* ФИЗИКА */}
        <div className="section-label">Physics</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="theory-card">
            <div className="stripe !bg-purple-600"></div>
            <h3 className="unbounded font-bold text-lg mb-4">Постоянный ток (DC)</h3>
            <a href="/legacy-lessons/physics/physics_dc.html" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-purple-600 transition-colors text-sm">Открыть</a>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-purple-600"></div>
            <h3 className="unbounded font-bold text-lg mb-4">Теплопередача</h3>
            <a href="/legacy-lessons/physics/physics_heat_transfer.html" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-purple-600 transition-colors text-sm">Открыть</a>
          </div>
        </div>

      </div>
    </div>
  )
}
