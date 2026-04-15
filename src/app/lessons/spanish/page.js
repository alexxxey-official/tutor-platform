'use client'
import Link from 'next/link'

export default function SpanishLesson() {
  const speakSpanish = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const cleanText = text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').split('/')[0].trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

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
        <nav className="bg-white border border-[#e5e0d5] rounded-xl p-6 mt-8 flex flex-wrap gap-2 items-center sticky top-4 z-10 shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">← На главную</Link>
          <a href="#greetings" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">👋 Приветствия</a>
          <a href="#family" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">👨‍👩‍👧‍👦 Семья</a>
          <a href="#city" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">🏙️ Город</a>
          <a href="#food" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">🥘 Еда</a>
          <a href="#house" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">🏠 Дом</a>
          <a href="#clothes" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">👕 Одежда</a>
          <a href="#time" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">⏳ Время</a>
          <a href="#adjectives" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">✨ Прилагательные</a>
        </nav>

        {/* GREETINGS */}
        <section id="greetings" className="scroll-mt-24">
          <div className="section-label">Тема 1</div>
          <h2 className="unbounded text-2xl font-bold mb-6">👋 Приветствия и Вежливость</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3 className="unbounded text-lg font-bold mb-4">Базовые слова</h3>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f] cursor-pointer" onClick={() => speakSpanish('Hola')}>🔊 Hola / Adiós</td><td>Привет / Пока</td></tr>
                <tr><td className="font-bold text-[#2a9d8f] cursor-pointer" onClick={() => speakSpanish('Buenos días')}>🔊 Buenos días</td><td>Доброе утро</td></tr>
                <tr><td className="font-bold text-[#2a9d8f] cursor-pointer" onClick={() => speakSpanish('Vale')}>🔊 Vale</td><td>Окей / Ладно</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TIME */}
        <section id="time" className="scroll-mt-24">
          <div className="section-label">Тема 7</div>
          <h2 className="unbounded text-2xl font-bold mb-6">⏳ Время и Календарь</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3 className="unbounded text-lg font-bold mb-4">Сезоны и фразы</h3>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f] cursor-pointer" onClick={() => speakSpanish('la primavera')}>🔊 la primavera / el verano</td><td>весна / лето</td></tr>
                <tr><td className="font-bold text-[#2a9d8f] cursor-pointer" onClick={() => speakSpanish('el otoño')}>🔊 el otoño / el invierno</td><td>осень / зима</td></tr>
              </tbody>
            </table>
            <div className="phrase-box mt-6">
              <p><strong>¿Qué hora es?</strong> <em className="text-gray-400 not-italic text-sm">Который час?</em></p>
              <p><strong>Son las tres y media.</strong> <em className="text-gray-400 not-italic text-sm">3:30.</em></p>
            </div>
          </div>
        </section>

        {/* ADJECTIVES */}
        <section id="adjectives" className="scroll-mt-24">
          <div className="section-label">Тема 8</div>
          <h2 className="unbounded text-2xl font-bold mb-6">✨ Базовые прилагательные</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f] cursor-pointer" onClick={() => speakSpanish('bueno')}>🔊 bueno - malo</td><td>хороший - плохой</td></tr>
                <tr><td className="font-bold text-[#2a9d8f] cursor-pointer" onClick={() => speakSpanish('grande')}>🔊 grande - pequeño</td><td>большой - маленький</td></tr>
                <tr><td className="font-bold text-[#2a9d8f] cursor-pointer" onClick={() => speakSpanish('caro')}>🔊 caro - barato</td><td>дорогой - дешевый</td></tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}
