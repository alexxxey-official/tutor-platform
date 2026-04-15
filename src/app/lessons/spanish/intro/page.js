'use client'
import Link from 'next/link'

export default function SpanishIntroLesson() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#e63946] mb-3">
          🇪🇸 Введение в язык · Лингвистика
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded">
          Карта грамматики<br />
          <em className="text-[#e63946] not-italic font-normal font-serif">Уровень A1</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px]">
          Добро пожаловать на курс испанского! Здесь нет случайных фраз, только чёткая система, логика и понимание того, как устроен язык Сервантеса.
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap">
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Грамматика</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">A1 Beginner</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Основы</span>
        </div>
        <div className="absolute right-[20px] top-[-20px] text-[150px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none">
          A1
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center">
          <span className="text-[12px] text-gray-500 font-semibold tracking-[1px] uppercase mr-2">Навигация</span>
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">
            ← Дашборд
          </Link>
          <Link href="/lessons/spanish/ser" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946]">
            Перейти к Уроку 1 👉
          </Link>
        </nav>

        <div id="theory">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
            Как устроен испанский
            <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Анатомия языка</h2>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">Хорошие новости (Чего тут нет)</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              Испанский язык очень логичен. В отличие от русского, здесь <strong>нет падежей</strong> (тебе не нужно менять окончания слов типа "стол-стола-столу-столом"). Слова связываются между собой с помощью коротких предлогов (de, a, en, por).
            </p>
            <p className="text-gray-700 text-[15px] mb-2.5">
              В отличие от английского, здесь <strong>как пишется, так и читается</strong>. Запомнив правила чтения за один вечер, ты сможешь прочитать вслух любую книгу, даже не зная перевода.
            </p>
          </div>

          <div className="bg-white border border-[#f4a261] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">Главные шестерёнки языка (Что нас ждёт)</h3>
            <p className="text-gray-700 text-[15px] mb-5">
              Чтобы заговорить на уровне A1 и перестать угадывать ответы в Duolingo, нам нужно освоить всего несколько базовых механизмов. Вот твой план обучения на ближайшее время:
            </p>

            <ul className="list-none p-0 m-0 space-y-2 mb-6">
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">1. Местоимения и Глаголы-фундаменты (SER, ESTAR, TENER)</strong>
                <span className="text-[13px] text-gray-500">В испанском два глагола "быть" и один глагол "иметь". На них строится 50% всех базовых фраз.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">2. Существительные: Род и Число (+ Артикли)</strong>
                <span className="text-[13px] text-gray-500">Всё в испанском — либо мальчик (el), либо девочка (la). Среднего рода нет. Стол — мальчик, а кровать — девочка.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">3. Правильные глаголы (Окончания -AR, -ER, -IR)</strong>
                <span className="text-[13px] text-gray-500">Поняв логику спряжения (как меняется хвостик слова), ты автоматически научишься использовать тысячи новых глаголов.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">4. Предлоги и Направление</strong>
                <span className="text-[13px] text-gray-500">Как сказать "Я иду В магазин", "Я возвращаюсь ИЗ магазина" и "Я нахожусь В магазине".</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">5. Возвратные глаголы</strong>
                <span className="text-[13px] text-gray-500">Глаголы с частичкой "ся". (Я моюсь, ты одеваешься).</span>
              </li>
            </ul>

            <div className="bg-gradient-to-br from-[#fff5f5] to-[#ffe6e6] border border-[#ffb3b3] border-l-4 border-l-[#e63946] rounded-lg p-4 my-4 text-[14px] text-[#800000]">
              <strong className="text-[#5c0000] block mb-1 text-[12px] tracking-[1px] uppercase">💡 Совет профессора:</strong>
              Испанцы — очень быстрые ребята. Чтобы говорить быстро, они часто <strong>выбрасывают личные местоимения</strong>. Вместо "Yo soy Alex" (Я есть Алекс), они скажут просто "Soy Alex". Окончание глагола уже говорит нам о том, кто совершает действие!
            </div>
          </div>
        </div>

        <div className="text-center my-16">
          <Link href="/lessons/spanish/ser" className="inline-block bg-[#e63946] text-white no-underline px-8 py-4 rounded-xl font-bold text-[16px] shadow-[0_4px_12px_rgba(230,57,70,0.3)] hover:bg-[#d62839] hover:-translate-y-0.5 transition-all">
            Начать Урок 1: Местоимения и глагол SER
          </Link>
        </div>
      </div>
    </div>
  )
}
