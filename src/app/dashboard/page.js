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
        
        {/* ИСПАНСКИЙ */}
        <div className="section-label">Español</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="theory-card">
            <div className="stripe !bg-[#e63946]"></div>
            <div className="label !mb-2 !text-[#e63946]">Introducción</div>
            <h3 className="unbounded font-bold text-xl mb-2">Карта грамматики</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Система, логика и понимание того, как устроен язык Сервантеса.</p>
            <Link href="/lessons/spanish/intro" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#e63946] transition-colors">Открыть введение</Link>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-[#e63946]"></div>
            <div className="label !mb-2 !text-[#e63946]">Gramática · A1</div>
            <h3 className="unbounded font-bold text-xl mb-2">Артикли и Род</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Почему стол — это мальчик, а кровать — девочка? И как с этим жить.</p>
            <Link href="/lessons/spanish/articles" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#e63946] transition-colors">Открыть урок</Link>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-[#2a9d8f]"></div>
            <div className="label !mb-2 !text-[#2a9d8f]">Vocabulario · A1</div>
            <h3 className="unbounded font-bold text-xl mb-2">Мега-словарь A1</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">500+ слов. Всё, что нужно для выживания, общения и навигации.</p>
            <Link href="/lessons/spanish" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#2a9d8f] transition-colors">Открыть словарь</Link>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-[#f4a261]"></div>
            <div className="label !mb-2 !text-[#f4a261]">Gramática · A1</div>
            <h3 className="unbounded font-bold text-xl mb-2">ESTAR и Предлоги</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Как описать свой город: где находится музей, банк или аптека.</p>
            <Link href="/lessons/spanish/estar" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#f4a261] transition-colors">Открыть урок</Link>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-[#e63946]"></div>
            <div className="label !mb-2 !text-[#e63946]">Escucha · A1</div>
            <h3 className="unbounded font-bold text-xl mb-2">Интерактивный Диктант</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Учимся понимать на слух. Включай видео и заполняй пропуски в тексте.</p>
            <Link href="/lessons/spanish/listening" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#e63946] transition-colors">Открыть аудирование</Link>
          </div>
        </div>

        {/* АНГЛИЙСКИЙ */}
        <div className="section-label">English Language</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="theory-card">
            <div className="stripe !bg-[#2a9d8f]"></div>
            <div className="label !mb-2">Grammar · B1</div>
            <h3 className="unbounded font-bold text-xl mb-2">Nobody & Anyone</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Раз и навсегда разбираемся с безличными местоимениями.</p>
            <Link href="/lessons/english/indefinite-pronouns" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#2a9d8f] transition-colors">Открыть урок</Link>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-[#2a9d8f]"></div>
            <div className="label !mb-2">Grammar · B1-B2</div>
            <h3 className="unbounded font-bold text-xl mb-2">Passive Voice</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Учимся строить пассивный залог. Трансформации и перевод.</p>
            <a href="/legacy-lessons/english/english_passive_voice.html" className="block py-3 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#2a9d8f] transition-colors">Открыть урок</a>
          </div>
        </div>

        {/* МАТЕМАТИКА */}
        <div className="section-label">Mathematics</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="theory-card">
            <div className="stripe !bg-[#e63946]"></div>
            <h3 className="unbounded font-bold text-lg mb-4 text-sm">Квадратные уравнения</h3>
            <a href="/legacy-lessons/math/quadratic_equations.html" className="block py-2 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#e63946] transition-colors text-xs">Открыть</a>
          </div>
          <div className="theory-card">
            <div className="stripe !bg-[#e63946]"></div>
            <h3 className="unbounded font-bold text-lg mb-4 text-sm">Неравенства</h3>
            <a href="/legacy-lessons/math/inequalities.html" className="block py-2 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-[#e63946] transition-colors text-xs">Открыть</a>
          </div>
        </div>

        {/* ФИЗИКА */}
        <div className="section-label">Physics</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="theory-card">
            <div className="stripe !bg-purple-600"></div>
            <h3 className="unbounded font-bold text-lg mb-4 text-sm">Постоянный ток (DC)</h3>
            <a href="/legacy-lessons/physics/physics_dc.html" className="block py-2 bg-[#1a1a2e] text-white text-center rounded-xl font-bold hover:bg-purple-600 transition-colors text-xs">Открыть</a>
          </div>
        </div>

      </div>
    </div>
  )
}
