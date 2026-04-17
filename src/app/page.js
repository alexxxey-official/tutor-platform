import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] font-sans flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#e63946]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-[#2a9d8f]/5 rounded-full blur-3xl pointer-events-none"></div>

      <header className="px-6 md:px-10 py-6 flex justify-between items-center relative z-10 border-b border-[#e5e0d5] bg-white/50 backdrop-blur-md">
        <div className="font-bold text-[18px] tracking-[2px] uppercase text-[#1a1a2e] unbounded">
          AG<span className="text-[#e63946]">.</span>Academy
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-[13px] font-bold uppercase tracking-wider text-[#1a1a2e] hover:text-[#e63946] transition-colors">
            Войти
          </Link>
          <Link href="/register" className="bg-[#1a1a2e] text-white px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-wider hover:bg-[#e63946] transition-colors hidden sm:block">
            Регистрация
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 relative z-10 text-center">
        <div className="mb-6 flex gap-2.5 flex-wrap justify-center">
          <span className="bg-white border border-[#e5e0d5] rounded-full px-4 py-1.5 text-[12px] font-bold text-[#e63946] uppercase tracking-widest shadow-sm">
            🇪🇸 Español
          </span>
          <span className="bg-white border border-[#e5e0d5] rounded-full px-4 py-1.5 text-[12px] font-bold text-[#2a9d8f] uppercase tracking-widest shadow-sm">
            🇬🇧 English
          </span>
          <span className="bg-white border border-[#e5e0d5] rounded-full px-4 py-1.5 text-[12px] font-bold text-[#f4a261] uppercase tracking-widest shadow-sm">
            📐 Ciencias
          </span>
        </div>

        <h1 className="font-extrabold text-[clamp(40px,8vw,80px)] leading-[1.05] mb-6 unbounded max-w-[900px]">
          Платформа<br/>
          <em className="text-[#2a9d8f] not-italic font-normal font-serif">интерактивного</em> обучения
        </h1>
        
        <p className="text-gray-500 text-[16px] md:text-[18px] max-w-[600px] mb-12 leading-relaxed">
          Теория без воды, умные тренажёры, аудио-диктанты и автоматическая проверка заданий. Учись в своём темпе.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px] sm:max-w-none sm:w-auto">
          <Link href="/register" className="bg-[#1a1a2e] hover:bg-[#e63946] text-white px-8 py-4 rounded-xl font-bold text-[15px] transition-all transform hover:-translate-y-0.5 shadow-[0_10px_20px_rgba(26,26,46,0.1)] text-center border-2 border-transparent">
            Начать учиться
          </Link>
          <Link href="/login" className="bg-white border-2 border-[#e5e0d5] hover:border-[#1a1a2e] text-[#1a1a2e] px-8 py-4 rounded-xl font-bold text-[15px] transition-all text-center">
            У меня уже есть аккаунт
          </Link>
        </div>

        {/* Feature Cards below */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] w-full text-left">
          <div className="bg-white border border-[#e5e0d5] p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#e63946] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#e63946]/20"></div>
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="font-bold text-[18px] mb-3 unbounded">Умные тренажёры</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">Вписывай окончания, собирай пазлы и переводи фразы. Моментальная автоматическая проверка.</p>
          </div>
          
          <div className="bg-white border border-[#e5e0d5] p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#f4a261] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-75"></div>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#f4a261]/20"></div>
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="font-bold text-[18px] mb-3 unbounded">Аудио-практика</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">Слушай живую речь прямо в уроках и решай диктанты на слух, чтобы понимать носителей.</p>
          </div>
          
          <div className="bg-white border border-[#e5e0d5] p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#2a9d8f] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-150"></div>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#2a9d8f]/20"></div>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-bold text-[18px] mb-3 unbounded">Мониторинг</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">Преподаватель назначает уроки и видит твои успехи. Твой дашборд сохраняет всё, что ты прошёл.</p>
          </div>
        </div>

      </main>
      
      <footer className="text-center py-8 px-6 text-gray-400 text-[12px] font-medium border-t border-[#e5e0d5]/50 relative z-10 bg-white/30 backdrop-blur-sm">
        © {new Date().getFullYear()} AG Academy. Разработано для студентов Алексея Гуляева.
      </footer>
    </div>
  )
}
