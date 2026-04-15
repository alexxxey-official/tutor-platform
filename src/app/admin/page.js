'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email === 'gulaevl068@gmail.com') {
        setIsAdmin(true)
        fetchData()
      } else {
        router.push('/dashboard')
      }
    }
    
    const fetchData = async () => {
      // Здесь в будущем будем тянуть данные из таблиц profiles и user_progress
      setLoading(false)
    }

    checkAdmin()
  }, [router])

  if (!isAdmin || loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-2xl">Доступ ограничен. Проверка прав... 🛡️</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-red-500">Admin Control Center ⚡</h1>
          <button onClick={() => router.push('/dashboard')} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">Назад в кабинет</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl border border-red-900/50">
            <h3 className="text-gray-400 uppercase text-sm font-bold">Всего учеников</h3>
            <p className="text-4xl font-bold mt-2">1</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-red-900/50">
            <h3 className="text-gray-400 uppercase text-sm font-bold">Пройдено уроков</h3>
            <p className="text-4xl font-bold mt-2">0</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-red-900/50">
            <h3 className="text-gray-400 uppercase text-sm font-bold">Средний балл</h3>
            <p className="text-4xl font-bold mt-2">--</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
              <tr>
                <th className="p-4">Ученик</th>
                <th className="p-4">Последняя активность</th>
                <th className="p-4">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="p-4">gulaevl068@gmail.com (Ты)</td>
                <td className="p-4 text-gray-400">Только что</td>
                <td className="p-4"><span className="px-2 py-1 bg-red-900/50 text-red-400 rounded text-xs uppercase font-bold border border-red-500/50">Admin</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
