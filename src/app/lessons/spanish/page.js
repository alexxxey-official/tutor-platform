'use client'
import Link from 'next/link'

export default function SpanishLesson() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20">
      <div className="hero">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="label">🇪🇸 Лексика · Уровень A1</div>
          <h1>Мега-словарь<br /><em>A1 (500+ слов)</em></h1>
          <p className="opacity-60 text-sm max-w-[500px]">Продвинутый словарный запас для начинающих. Всё, что нужно для выживания, общения, походов в ресторан и навигации по городу.</p>
        </div>
        <div className="absolute right-[-20px] top-10 text-[100px] text-white/5 font-black pointer-events-none select-none tracking-tighter uppercase">Vocabulario</div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl p-6 mt-8 flex flex-wrap gap-2 items-center">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">← На главную</Link>
          <a href="#greetings" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">👋 Приветствия</a>
          <a href="#family" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">👨‍👩‍👧‍👦 Семья</a>
          <a href="#city" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">🏙️ Город</a>
        </nav>

        {/* GREETINGS */}
        <div id="greetings" className="scroll-mt-8">
          <div className="section-label">Тема 1</div>
          <h2 className="unbounded text-2xl font-bold mb-6">👋 Приветствия и Вежливость</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3 className="unbounded text-lg font-bold mb-4">Базовые слова</h3>
            <table className="conj-table">
              <thead className="bg-[#f9fafb]">
                <tr><th>Испанский</th><th>Русский</th></tr>
              </thead>
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">Hola / Adiós</td><td>Привет / Пока</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">Buenos días</td><td>Доброе утро (до обеда)</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">Buenas tardes</td><td>Добрый день (после обеда)</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">Buenas noches</td><td>Добрый вечер / Спокойной ночи</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">Vale</td><td>Окей / Ладно</td></tr>
              </tbody>
            </table>

            <h3 className="unbounded text-lg font-bold mb-4">Как дела? (Фразы)</h3>
            <div className="phrase-box">
              <p><strong>¿Qué tal?</strong> <em className="text-gray-400 not-italic text-sm">Как дела? (Универсально)</em></p>
              <p><strong>¿Cómo estás?</strong> <em className="text-gray-400 not-italic text-sm">Как ты?</em></p>
              <p><strong>Mucho gusto</strong> <em className="text-gray-400 not-italic text-sm">Очень приятно</em></p>
            </div>
          </div>
        </div>

        {/* FAMILY */}
        <div id="family" className="scroll-mt-8">
          <div className="section-label">Тема 2</div>
          <h2 className="unbounded text-2xl font-bold mb-6">👨‍👩‍👧‍👦 Семья и Люди</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3 className="unbounded text-lg font-bold mb-4">Родственники (Продвинутый A1)</h3>
            <table className="conj-table">
              <thead className="bg-[#f9fafb]">
                <tr><th>Испанский</th><th>Русский</th></tr>
              </thead>
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">la familia</td><td>семья</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">los padres</td><td>родители</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">el padre / la madre</td><td>отец / мать</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">el marido / la mujer</td><td>муж / жена</td></tr>
              </tbody>
            </table>

            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-xl p-5 my-6 text-[#7c4a00] text-sm">
              <strong className="block text-[#5c3300] uppercase tracking-wider text-xs mb-1">💡 Правило множественного числа:</strong>
              Если мы объединяем мужчин и женщин в одну группу, используется мужской род множественного числа.<br />
              <i>el padre + la madre = <strong>los padres</strong> (родители)</i>
            </div>
          </div>
        </div>

        {/* CITY */}
        <div id="city" className="scroll-mt-8">
          <div className="section-label">Тема 3</div>
          <h2 className="unbounded text-2xl font-bold mb-6">🏙️ Город и Навигация</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3 className="unbounded text-lg font-bold mb-4">Места в городе</h3>
            <table className="conj-table">
              <thead className="bg-[#f9fafb]">
                <tr><th>Испанский</th><th>Русский</th></tr>
              </thead>
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">la ciudad / el pueblo</td><td>город / деревня</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">la calle / la plaza</td><td>улица / площадь</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">el centro</td><td>центр</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">el restaurante</td><td>ресторан</td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
