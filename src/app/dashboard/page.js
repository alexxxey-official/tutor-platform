'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

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
          <h1 className="text-3xl font-bold text-blue-400">Личный кабинет</h1>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition text-sm">Выйти</button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-xl mb-2">Привет, {user?.email}! 👋</h2>
          <p className="text-gray-400">Добро пожаловать в AG Academy. Твой прогресс будет отображаться здесь.</p>
        </div>

        <h3 className="text-2xl font-bold mb-6">Твои уроки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition cursor-pointer">
            <span className="text-sm text-blue-400 font-bold">ENGLISH</span>
            <h4 className="text-xl font-bold mt-2">Passive Voice (B1-B2)</h4>
            <p className="text-gray-400 mt-2 text-sm">Хардкорная практика пассивного залога с трансформацией предложений.</p>
            <div className="mt-4 py-2 bg-blue-600 text-center rounded-lg font-bold">Начать урок</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 opacity-50">
            <span className="text-sm text-yellow-400 font-bold">SPANISH</span>
            <h4 className="text-xl font-bold mt-2">Próximamente</h4>
            <p className="text-gray-400 mt-2 text-sm">Урок находится в разработке и скоро появится.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
