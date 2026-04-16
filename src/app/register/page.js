'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { emailRedirectTo: window.location.origin + '/auth/callback' }
    })
    if (error) {
      setMessage(error.message)
      setIsSuccess(false)
    } else {
      setMessage('Проверь почту для подтверждения регистрации!')
      setIsSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f3] text-[#1a1a2e] p-6 font-sans">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#2a9d8f] mb-3">AG Academy</div>
          <h1 className="text-4xl font-extrabold unbounded leading-tight text-[#1a1a2e]">
            Начать<br/>
            <em className="text-[#2a9d8f] not-italic font-normal font-serif">обучение</em>
          </h1>
        </div>

        <form onSubmit={handleRegister} className="bg-white border border-[#e5e0d5] p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#2a9d8f] via-[#f4a261] to-[#e63946]"></div>
          
          {message && (
            <div className={`p-3 mb-6 rounded-r-lg text-sm font-medium border-l-4 ${isSuccess ? 'bg-[#f0faf8] text-[#2a9d8f] border-[#2a9d8f]' : 'bg-[#fff5f5] text-[#e63946] border-[#e63946]'}`}>
              {message}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
            <input 
              type="email" 
              placeholder="tuyo@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3.5 bg-gray-50 rounded-xl border-[1.5px] border-[#e5e0d5] focus:border-[#2a9d8f] focus:bg-white outline-none transition-colors text-[15px] font-medium" 
              required 
            />
          </div>

          <div className="mb-8">
            <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-2">Пароль (мин. 6 символов)</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3.5 bg-gray-50 rounded-xl border-[1.5px] border-[#e5e0d5] focus:border-[#2a9d8f] focus:bg-white outline-none transition-colors text-[15px] font-mono tracking-widest" 
              required 
              minLength={6}
            />
          </div>

          <button disabled={loading} className="w-full py-3.5 bg-[#1a1a2e] hover:bg-[#2a9d8f] text-white rounded-xl font-bold text-[15px] transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]">
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>

          <p className="mt-8 text-center text-[14px] text-gray-500 font-medium">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-[#2a9d8f] font-bold hover:underline decoration-2 underline-offset-4 transition-all">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
