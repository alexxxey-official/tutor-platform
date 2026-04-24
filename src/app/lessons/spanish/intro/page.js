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
                <strong className="text-[#1a1a2e] block mb-1">1. Фонетика и Произношение</strong>
                <span className="text-[13px] text-gray-500">Как читается, так и пишется! Освоив правила чтения за один вечер, ты сможешь прочитать любой текст.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">2. Местоимения и Глаголы-фундаменты (SER, ESTAR, TENER)</strong>
                <span className="text-[13px] text-gray-500">В испанском два глагола "быть" и один глагол "иметь". На них строится 50% всех базовых фраз.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">3. Существительные: Род и Число (+ Артикли)</strong>
                <span className="text-[13px] text-gray-500">Всё в испанском — либо мальчик (el), либо девочка (la). Среднего рода нет. Стол — мальчик, а кровать — девочка.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">4. Правильные глаголы (Окончания -AR, -ER, -IR)</strong>
                <span className="text-[13px] text-gray-500">Поняв логику спряжения (как меняется хвостик слова), ты автоматически научишься использовать тысячи новых глаголов.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">5. Прилагательные и Согласование</strong>
                <span className="text-[13px] text-gray-500">Прилагательные меняются по роду и числу: "красивый мальчик" (chico guapo), "красивая девочка" (chica guapa).</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">6. Предлоги и Направление</strong>
                <span className="text-[13px] text-gray-500">Как сказать "Я иду В магазин", "Я возвращаюсь ИЗ магазина" и "Я нахожусь В магазине".</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">7. Вопросительные слова</strong>
                <span className="text-[13px] text-gray-500">¿Qué? ¿Dónde? ¿Cuándo? ¿Cómo? — учимся задавать вопросы и строить диалоги.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">8. Числительные и Время</strong>
                <span className="text-[13px] text-gray-500">Считаем до 100, называем время, дни недели и месяцы.</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">9. Притяжательные местоимения</strong>
                <span className="text-[13px] text-gray-500">Мой, твой, его, наш — как показать принадлежность (mi casa, tu libro, su amigo).</span>
              </li>
              <li className="bg-gray-50 border-l-[3px] border-[#2a9d8f] rounded-lg p-3 text-[15px]">
                <strong className="text-[#1a1a2e] block mb-1">10. Возвратные глаголы</strong>
                <span className="text-[13px] text-gray-500">Глаголы с частичкой "ся" (Я моюсь, ты одеваешься) — llamarse, levantarse, ducharse.</span>
              </li>
            </ul>

            <div className="bg-gradient-to-br from-[#fff5f5] to-[#ffe6e6] border border-[#ffb3b3] border-l-4 border-l-[#e63946] rounded-lg p-4 my-4 text-[14px] text-[#800000]">
              <strong className="text-[#5c0000] block mb-1 text-[12px] tracking-[1px] uppercase">💡 Совет профессора:</strong>
              Испанцы — очень быстрые ребята. Чтобы говорить быстро, они часто <strong>выбрасывают личные местоимения</strong>. Вместо "Yo soy Alex" (Я есть Алекс), они скажут просто "Soy Alex". Окончание глагола уже говорит нам о том, кто совершает действие!
            </div>
          </div>

          {/* Visual Grammar Roadmap */}
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#264653]"></div>
            <h3 className="font-bold text-[20px] mb-5 unbounded">Визуальная карта A1</h3>
            <p className="text-gray-700 text-[15px] mb-6">
              Вот как связаны все темы курса. Каждый блок опирается на предыдущий:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🔊</div>
                <div className="font-bold text-orange-700 mb-1">Фонетика</div>
                <div className="text-xs text-gray-600">Основа всего</div>
              </div>

              <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">👤</div>
                <div className="font-bold text-rose-700 mb-1">Местоимения</div>
                <div className="text-xs text-gray-600">Yo, tú, él...</div>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-bold text-red-700 mb-1">SER / ESTAR</div>
                <div className="text-xs text-gray-600">Два "быть"</div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">📦</div>
                <div className="font-bold text-blue-700 mb-1">Артикли + Род</div>
                <div className="text-xs text-gray-600">el/la, un/una</div>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-bold text-purple-700 mb-1">TENER</div>
                <div className="text-xs text-gray-600">Иметь</div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🔄</div>
                <div className="font-bold text-green-700 mb-1">Глаголы -AR/-ER/-IR</div>
                <div className="text-xs text-gray-600">Спряжение</div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🎨</div>
                <div className="font-bold text-amber-700 mb-1">Прилагательные</div>
                <div className="text-xs text-gray-600">Описание</div>
              </div>

              <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">❓</div>
                <div className="font-bold text-teal-700 mb-1">Вопросы</div>
                <div className="text-xs text-gray-600">¿Qué? ¿Dónde?</div>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🪞</div>
                <div className="font-bold text-indigo-700 mb-1">Возвратные</div>
                <div className="text-xs text-gray-600">-se глаголы</div>
              </div>
            </div>
          </div>

          {/* Learning Methodology */}
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e76f51]"></div>
            <h3 className="font-bold text-[20px] mb-5 unbounded">Как учить испанский правильно</h3>

            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="font-bold text-emerald-800 mb-2">✅ Грамматика + Практика</div>
                <p className="text-sm text-gray-700">
                  Не пытайся учить фразы наизусть. Понимай <strong>систему</strong>. Когда ты знаешь, как работает спряжение глаголов, ты можешь создавать тысячи новых предложений.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-bold text-blue-800 mb-2">🎯 Фокус на частотных словах</div>
                <p className="text-sm text-gray-700">
                  300 самых частых слов покрывают 65% разговорного испанского. Не гонись за редкими словами — сначала освой базу.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="font-bold text-amber-800 mb-2">⏱️ Реалистичные сроки</div>
                <p className="text-sm text-gray-700">
                  <strong>A1 за 2-3 месяца</strong> при занятиях 3-4 раза в неделю по 1 часу. Не спеши — качество важнее скорости.
                </p>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <div className="font-bold text-rose-800 mb-2">❌ Частые ошибки русскоговорящих</div>
                <ul className="text-sm text-gray-700 space-y-1 mt-2">
                  <li>• Путают SER и ESTAR (оба "быть", но разные!)</li>
                  <li>• Забывают про род существительных</li>
                  <li>• Произносят H (она не читается!)</li>
                  <li>• Редуцируют гласные (как в русском)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Progress Roadmap */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-2xl p-8 mb-4">
            <h3 className="font-bold text-[20px] mb-5 unbounded text-center">Твой путь в испанском</h3>

            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2 shadow-lg">
                  A1
                </div>
                <div className="font-bold text-emerald-700 mb-1">Beginner</div>
                <div className="text-xs text-gray-600">Ты здесь! 👈</div>
                <div className="text-xs text-gray-500 mt-2">2-3 месяца</div>
              </div>

              <div className="flex-shrink-0 w-12 h-1 bg-slate-300 mx-2"></div>

              <div className="flex-1 text-center opacity-60">
                <div className="w-16 h-16 bg-slate-300 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                  A2
                </div>
                <div className="font-bold text-slate-600 mb-1">Elementary</div>
                <div className="text-xs text-gray-500">Базовые диалоги</div>
                <div className="text-xs text-gray-400 mt-2">+3-4 месяца</div>
              </div>

              <div className="flex-shrink-0 w-12 h-1 bg-slate-300 mx-2"></div>

              <div className="flex-1 text-center opacity-40">
                <div className="w-16 h-16 bg-slate-300 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                  B1
                </div>
                <div className="font-bold text-slate-600 mb-1">Intermediate</div>
                <div className="text-xs text-gray-500">Свободное общение</div>
                <div className="text-xs text-gray-400 mt-2">+6-8 месяцев</div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg p-4 text-sm text-gray-700">
              <strong className="text-slate-800">После A1 ты сможешь:</strong>
              <ul className="mt-2 space-y-1">
                <li>✓ Представиться и рассказать о себе</li>
                <li>✓ Заказать еду в ресторане</li>
                <li>✓ Спросить дорогу и понять ответ</li>
                <li>✓ Описать свою семью и друзей</li>
                <li>✓ Говорить о своих планах и желаниях</li>
              </ul>
            </div>
          </div>

          {/* Motivation Block */}
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-200 rounded-2xl p-8 mb-4">
            <h3 className="font-bold text-[20px] mb-5 unbounded text-center">Почему испанский?</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-4xl mb-2">🌍</div>
                <div className="font-bold text-lg text-slate-800">580 млн</div>
                <div className="text-sm text-gray-600">носителей языка</div>
              </div>

              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-4xl mb-2">🗺️</div>
                <div className="font-bold text-lg text-slate-800">21 страна</div>
                <div className="text-sm text-gray-600">официальный язык</div>
              </div>

              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-4xl mb-2">📈</div>
                <div className="font-bold text-lg text-slate-800">№2 в мире</div>
                <div className="text-sm text-gray-600">по популярности</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 text-sm text-gray-700">
              <p className="mb-3">
                <strong className="text-rose-700">Испанский — это не просто язык.</strong> Это ключ к культуре Латинской Америки и Испании: фламенко, Гауди, Гарсия Маркес, сальса, паэлья, Месси, Дали...
              </p>
              <p>
                Это язык страсти, музыки и солнца. И он намного проще английского для русскоговорящих! 🔥
              </p>
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
