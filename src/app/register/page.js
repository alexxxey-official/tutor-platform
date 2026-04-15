'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { emailRedirectTo: window.location.origin + '/auth/callback' }
    })
    if (error) setMessage(error.message)
    else setMessage('Проверь почту для подтверждения регистрации!')
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-400">Регистрация</h1>
        {message && <p className="text-blue-400 mb-4 text-sm text-center">{message}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" required />
        <input type="password" placeholder="Пароль (мин. 6 символов)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-6 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" required />
        <button disabled={loading} className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition">
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
        <p className="mt-6 text-center text-gray-400">Уже есть аккаунт? <Link href="/login" className="text-blue-400 hover:underline">Войти</Link></p>
      </form>
    </div>
  )
}
