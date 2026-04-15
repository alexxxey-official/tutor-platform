'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function SpanishLesson() {
  const speakSpanish = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Очистка текста от лишних символов для корректной озвучки
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
              <thead><tr><th>Испанский</th><th>Русский</th></tr></thead>
              <tbody>
                <tr><td><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('Hola / Adiós')}>🔊</span> <span className="font-bold text-[#2a9d8f]">Hola / Adiós</span></td><td>Привет / Пока</td></tr>
                <tr><td><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('Buenos días')}>🔊</span> <span className="font-bold text-[#2a9d8f]">Buenos días</span></td><td>Доброе утро</td></tr>
                <tr><td><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('Gracias')}>🔊</span> <span className="font-bold text-[#2a9d8f]">Gracias</span></td><td>Спасибо</td></tr>
              </tbody>
            </table>
            
            <h3 className="unbounded text-lg font-bold mt-8 mb-4">Как дела? (Фразы)</h3>
            <div className="phrase-box">
              <p><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('Qué tal')}>🔊</span> <strong>¿Qué tal?</strong> <em className="text-gray-400 not-italic text-sm">Как дела?</em></p>
              <p><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('Cómo estás')}>🔊</span> <strong>¿Cómo estás?</strong> <em className="text-gray-400 not-italic text-sm">Как ты?</em></p>
              <p><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('Mucho gusto')}>🔊</span> <strong>Mucho gusto</strong> <em className="text-gray-400 not-italic text-sm">Очень приятно</em></p>
            </div>
          </div>
        </section>

        {/* FAMILY */}
        <section id="family" className="scroll-mt-24">
          <div className="section-label">Тема 2</div>
          <h2 className="unbounded text-2xl font-bold mb-6">👨‍👩‍👧‍👦 Семья и Люди</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <table className="conj-table">
              <tbody>
                <tr><td><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('la familia')}>🔊</span> <span className="font-bold text-[#2a9d8f]">la familia</span></td><td>семья</td></tr>
                <tr><td><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('los padres')}>🔊</span> <span className="font-bold text-[#2a9d8f]">los padres</span></td><td>родители</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CITY */}
        <section id="city" className="scroll-mt-24">
          <div className="section-label">Тема 3</div>
          <h2 className="unbounded text-2xl font-bold mb-6">🏙️ Город и Навигация</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <div className="phrase-box">
              <p><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('Dónde está')}>🔊</span> <strong>¿Dónde está...?</strong> <em className="text-gray-400 not-italic text-sm">Где находится...?</em></p>
              <p><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('Gira a la derecha')}>🔊</span> <strong>Gira a la derecha</strong> <em className="text-gray-400 not-italic text-sm">Поверни направо</em></p>
            </div>
          </div>
        </section>

        {/* FOOD */}
        <section id="food" className="scroll-mt-24">
          <div className="section-label">Тема 4</div>
          <h2 className="unbounded text-2xl font-bold mb-6">🥘 Еда и Ресторан</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <div className="phrase-box">
              <p><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('La cuenta por favor')}>🔊</span> <strong>La cuenta, por favor</strong> <em className="text-gray-400 not-italic text-sm">Счёт, пожалуйста</em></p>
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
                <tr><td><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('bueno malo')}>🔊</span> <span className="font-bold text-[#2a9d8f]">bueno - malo</span></td><td>хороший - плохой</td></tr>
                <tr><td><span className="cursor-pointer hover:opacity-70" onClick={() => speakSpanish('grande pequeño')}>🔊</span> <span className="font-bold text-[#2a9d8f]">grande - pequeño</span></td><td>большой - маленький</td></tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}
