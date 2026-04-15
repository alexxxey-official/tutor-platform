'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">Вход в AG Academy</h1>
        {message && <p className="text-red-400 mb-4 text-sm">{message}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" required />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-6 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" required />
        <button disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition">
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
        <p className="mt-6 text-center text-gray-400">Нет аккаунта? <Link href="/register" className="text-blue-400 hover:underline">Зарегистрироваться</Link></p>
      </form>
    </div>
  )
}
