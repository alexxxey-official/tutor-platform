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
          <a href="#food" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">🥘 Еда</a>
          <a href="#house" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">🏠 Дом</a>
          <a href="#clothes" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">👕 Одежда</a>
          <a href="#time" className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a9d8f] hover:text-white transition">⏳ Время</a>
        </nav>

        {/* GREETINGS */}
        <section id="greetings" className="scroll-mt-8">
          <div className="section-label">Тема 1</div>
          <h2 className="unbounded text-2xl font-bold mb-6">👋 Приветствия и Вежливость</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3 className="unbounded text-lg font-bold mb-4">Базовые слова</h3>
            <table className="conj-table">
              <thead><tr><th>Испанский</th><th>Русский</th></tr></thead>
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">Hola / Adiós</td><td>Привет / Пока</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">Buenos días</td><td>Доброе утро</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">Gracias / De nada</td><td>Спасибо / Не за что</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">Vale</td><td>Окей / Ладно</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAMILY */}
        <section id="family" className="scroll-mt-8">
          <div className="section-label">Тема 2</div>
          <h2 className="unbounded text-2xl font-bold mb-6">👨‍👩‍👧‍👦 Семья и Люди</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <table className="conj-table">
              <thead><tr><th>Испанский</th><th>Русский</th></tr></thead>
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">la familia</td><td>семья</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">los padres</td><td>родители</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">el marido / la mujer</td><td>муж / жена</td></tr>
              </tbody>
            </table>
            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-xl p-5 my-6 text-[#7c4a00] text-sm">
              <strong className="block text-[#5c3300] uppercase tracking-wider text-xs mb-1">💡 Правило:</strong>
              Мужской род мн.ч. объединяет группу (los padres = родители).
            </div>
          </div>
        </section>

        {/* CITY */}
        <section id="city" className="scroll-mt-8">
          <div className="section-label">Тема 3</div>
          <h2 className="unbounded text-2xl font-bold mb-6">🏙️ Город и Навигация</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">la ciudad</td><td>город</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">la calle / la plaza</td><td>улица / площадь</td></tr>
              </tbody>
            </table>
            <div className="phrase-box mt-6">
              <p><strong>¿Dónde está...?</strong> <em className="text-gray-400 not-italic text-sm">Где находится...?</em></p>
              <p><strong>Gira a la derecha</strong> <em className="text-gray-400 not-italic text-sm">Поверни направо</em></p>
            </div>
          </div>
        </section>

        {/* FOOD */}
        <section id="food" className="scroll-mt-8">
          <div className="section-label">Тема 4</div>
          <h2 className="unbounded text-2xl font-bold mb-6">🥘 Еда и Ресторан</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">el pan / el agua</td><td>хлеб / вода</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">la carne / el pescado</td><td>мясо / рыба</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">La cuenta, por favor</td><td>Счёт, пожалуйста</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* HOUSE */}
        <section id="house" className="scroll-mt-8">
          <div className="section-label">Тема 5</div>
          <h2 className="unbounded text-2xl font-bold mb-6">🏠 Дом и Мебель</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3 className="unbounded text-lg font-bold mb-4">Комнаты и мебель</h3>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">la casa / el piso</td><td>дом / квартира</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">la cocina / el baño</td><td>кухня / ванная</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">la cama / el armario</td><td>кровать / шкаф</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">la nevera</td><td>холодильник</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CLOTHES */}
        <section id="clothes" className="scroll-mt-8">
          <div className="section-label">Тема 6</div>
          <h2 className="unbounded text-2xl font-bold mb-6">👕 Одежда и Цвета</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <h3 className="unbounded text-lg font-bold mb-4">Одежда (La ropa)</h3>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">la camiseta / la camisa</td><td>футболка / рубашка</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">los vaqueros / el vestido</td><td>джинсы / платье</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">los zapatos</td><td>туфли, ботинки</td></tr>
              </tbody>
            </table>
            <h3 className="unbounded text-lg font-bold mt-8 mb-4">Цвета (Los colores)</h3>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">rojo / azul / verde</td><td>красный / синий / зеленый</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">negro / blanco</td><td>черный / белый</td></tr>
              </tbody>
            </table>
            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-xl p-5 my-6 text-[#7c4a00] text-sm">
              <strong className="block text-[#5c3300] uppercase tracking-wider text-xs mb-1">💡 Правило:</strong>
              Naranja и Rosa не меняют окончание по роду (la casa naranja).
            </div>
          </div>
        </section>

        {/* TIME */}
        <section id="time" className="scroll-mt-8">
          <div className="section-label">Тема 7</div>
          <h2 className="unbounded text-2xl font-bold mb-6">⏳ Время и Календарь</h2>
          <div className="theory-card">
            <div className="stripe"></div>
            <table className="conj-table">
              <tbody>
                <tr><td className="font-bold text-[#2a9d8f]">lunes, martes, miércoles</td><td>пн, вт, ср</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">jueves, viernes</td><td>чт, пт</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">sábado, domingo</td><td>сб, вс</td></tr>
                <tr><td className="font-bold text-[#2a9d8f]">el fin de semana</td><td>выходные</td></tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}
