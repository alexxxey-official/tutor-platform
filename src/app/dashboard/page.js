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

  if (loading) return <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] flex items-center justify-center">Загрузка...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20">
      <div className="hero mb-12">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div>
            <div className="label">ESTUDIANTES · AG ACADEMY</div>
            <h1>¡Hola, <em>{user?.email?.split('@')[0]}</em>!</h1>
            <p>Добро пожаловать в твой учебный центр. Весь твой прогресс и уроки собраны здесь.</p>
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
        <div className="section-label">Твоё обучение</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* ENGLISH */}
          <div className="theory-card group hover:shadow-xl transition-all duration-300">
            <div className="stripe !bg-[#2a9d8f]"></div>
            <div className="label !mb-2">English · B1</div>
            <h3 className="unbounded font-bold text-xl mb-4">Passive Voice</h3>
            <p className="text-gray-500 text-sm mb-6">Хардкорная практика пассивного залога с трансформацией и переводом.</p>
            <Link href="/lessons/passive-voice" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#2a9d8f] transition-colors">Начать урок</Link>
          </div>

          {/* SPANISH */}
          <div className="theory-card group hover:shadow-xl transition-all duration-300">
            <div className="stripe !bg-[#f4a261]"></div>
            <div className="label !mb-2 !color-[#f4a261]">Español · A1</div>
            <h3 className="unbounded font-bold text-xl mb-4">Vocabulario A1</h3>
            <p className="text-gray-500 text-sm mb-6">Мега-словарь испанского языка: 500+ слов для выживания в городе.</p>
            <Link href="/lessons/spanish" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#f4a261] transition-colors">Перейти к словарю</Link>
          </div>

          {/* MATH (Disabled) */}
          <div className="theory-card opacity-60">
            <div className="stripe !bg-[#6b7280]"></div>
            <div className="label !mb-2">Math · Core</div>
            <h3 className="unbounded font-bold text-xl mb-4 text-gray-400">Алгебра</h3>
            <p className="text-gray-400 text-sm mb-6">Скоро открытие нового математического блока.</p>
            <div className="py-3 bg-gray-100 text-gray-400 text-center rounded-xl font-bold cursor-not-allowed">В разработке</div>
          </div>

        </div>
      </div>
    </div>
  )
}
