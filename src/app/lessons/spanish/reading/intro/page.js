'use client'
import Link from 'next/link'

export default function ReadingIntroLesson() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#f4a261] mb-3">
          🇪🇸 Введение · Чтение
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Карта текстов<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">Уровень A1</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Читаем и переводим простые тексты для практики. От знакомства до похода в ресторан.
        </p>
        <div className="absolute right-[-20px] top-[-20px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          LECTURA
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#f4a261] hover:text-white">
            ← На главную
          </Link>
        </nav>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm mt-8">
          <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
          <h3 className="font-bold text-[20px] mb-6 unbounded text-[#1a1a2e]">Тексты A1</h3>
          
          <ul className="list-none p-0 m-0 space-y-3">
            <li className="bg-gray-50 border-l-[3px] border-[#f4a261] rounded-lg p-4">
              <strong className="text-[#1a1a2e] block mb-1 text-[16px]">1. Знакомство</strong>
              <span className="text-[14px] text-gray-500">(Hola, me llamo...) - Урок 1</span>
            </li>
            <li className="bg-gray-50 border-l-[3px] border-[#f4a261] rounded-lg p-4 opacity-70">
              <strong className="text-[#1a1a2e] block mb-1 text-[16px]">2. Мой день</strong>
              <span className="text-[14px] text-gray-500">(Mi rutina diaria) - <i>скоро</i></span>
            </li>
            <li className="bg-gray-50 border-l-[3px] border-[#f4a261] rounded-lg p-4 opacity-70">
              <strong className="text-[#1a1a2e] block mb-1 text-[16px]">3. Мой город</strong>
              <span className="text-[14px] text-gray-500">(Mi ciudad) - <i>скоро</i></span>
            </li>
            <li className="bg-gray-50 border-l-[3px] border-[#f4a261] rounded-lg p-4 opacity-70">
              <strong className="text-[#1a1a2e] block mb-1 text-[16px]">4. В ресторане</strong>
              <span className="text-[14px] text-gray-500">(En el restaurante) - <i>скоро</i></span>
            </li>
          </ul>
        </div>

        <div className="text-center my-16">
          <Link href="/lessons/spanish/reading/hola" className="inline-block bg-[#f4a261] text-[#1a1a2e] no-underline px-8 py-4 rounded-xl font-bold text-[16px] shadow-[0_4px_12px_rgba(244,162,97,0.3)] hover:bg-[#e79a5c] hover:-translate-y-0.5 transition-all">
            Начать Текст 1: Знакомство
          </Link>
        </div>
      </div>
    </div>
  )
}
