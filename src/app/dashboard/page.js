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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-400 font-mono tracking-tighter">AG ACADEMY</h1>
            {user?.email === 'gulaevl068@gmail.com' && (
              <Link href="/admin" className="px-3 py-1 bg-red-900/50 text-red-400 border border-red-500/50 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-800 transition">Admin Panel</Link>
            )}
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition text-sm font-bold shadow-lg">Выйти</button>
        </div>
        
        <h3 className="text-2xl font-bold mb-8">Доступные курсы</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ENGLISH */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all group">
            <span className="text-xs text-blue-400 font-black uppercase tracking-widest">ENGLISH</span>
            <h4 className="text-xl font-bold mt-1">Passive Voice</h4>
            <Link href="/lessons/passive-voice" className="mt-6 block py-2 bg-blue-600 hover:bg-blue-500 text-center rounded-xl font-bold transition">Начать</Link>
          </div>

          {/* SPANISH */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-all group">
            <span className="text-xs text-yellow-400 font-black uppercase tracking-widest">SPANISH</span>
            <h4 className="text-xl font-bold mt-1">Урок 1: Hola!</h4>
            <Link href="/lessons/spanish" className="mt-6 block py-2 bg-yellow-600 hover:bg-yellow-500 text-center rounded-xl font-bold transition">Начать</Link>
          </div>

          {/* MATH */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-green-500 transition-all group">
            <span className="text-xs text-green-400 font-black uppercase tracking-widest">MATH</span>
            <h4 className="text-xl font-bold mt-1">Алгебра: База</h4>
            <Link href="/lessons/math" className="mt-6 block py-2 bg-green-600 hover:bg-green-500 text-center rounded-xl font-bold transition text-white/50 pointer-events-none">В разработке</Link>
          </div>

          {/* PHYSICS */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group">
            <span className="text-xs text-purple-400 font-black uppercase tracking-widest">PHYSICS</span>
            <h4 className="text-xl font-bold mt-1">Механика</h4>
            <Link href="/lessons/physics" className="mt-6 block py-2 bg-purple-600 hover:bg-purple-500 text-center rounded-xl font-bold transition text-white/50 pointer-events-none">В разработке</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
