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

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Загрузка...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-400">Личный кабинет</h1>
            {user?.email === 'gulaevl068@gmail.com' && (
              <Link href="/admin" className="px-3 py-1 bg-red-900/50 text-red-400 border border-red-500/50 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-800 transition">Admin Panel</Link>
            )}
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition text-sm font-bold shadow-lg shadow-red-900/20">Выйти</button>
        </div>
        
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 mb-10 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Привет, {user?.email}! 👋</h2>
          <p className="text-gray-400">Добро пожаловать в AG Academy. Твой прогресс будет отображаться здесь.</p>
        </div>

        <h3 className="text-2xl font-bold mb-6">Твои уроки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all group shadow-lg">
            <span className="text-sm text-blue-400 font-bold uppercase tracking-widest">ENGLISH</span>
            <h4 className="text-xl font-bold mt-2">Passive Voice (B1-B2)</h4>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">Хардкорная практика пассивного залога с трансформацией предложений и переводом.</p>
            <Link href="/lessons/passive-voice" className="mt-6 block py-3 bg-blue-600 hover:bg-blue-500 text-center rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95">Начать урок</Link>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 opacity-50 relative overflow-hidden grayscale">
             <div className="absolute top-4 right-4 bg-yellow-600 text-[10px] font-bold px-2 py-1 rounded-md text-white">COMING SOON</div>
            <span className="text-sm text-yellow-400 font-bold uppercase tracking-widest">SPANISH</span>
            <h4 className="text-xl font-bold mt-2">Próximamente</h4>
            <p className="text-gray-400 mt-2 text-sm">Урок находится в разработке и скоро появится.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
