'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function IndefinitePronounsLesson() {
  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  const total = 35 // Increased number of tasks
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length
  const pct = (correctCount / total) * 100

  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').trim()

  const checkAnswer = (id, correctAns, value) => {
    // Handle multiple possible answers separated by |
    const correctOptions = correctAns.split('|').map(normalize)
    const isCorrect = correctOptions.includes(normalize(value)) && value !== ''
    setAnswers((prev) => ({
      ...prev,
      [id]: { value, isCorrect, checked: true },
    }))
  }

  const toggleHint = (id) => {
    setHints((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const ExerciseItem = ({ id, num, problem, correctAns, hintText, placeholder = "" }) => {
    const state = answers[id] || { value: '', checked: false }
    const showHint = hints[id] || false

    return (
      <div className="border-b border-dashed border-[#e5e0d5] py-4 flex gap-4 items-start last:border-none">
        <div className="font-mono text-[13px] text-gray-500 min-w-[28px] pt-1">{num}</div>
        <div className="flex-1">
          <div className="text-[15px] px-3.5 py-2.5 bg-gray-50 rounded-lg mb-2.5" dangerouslySetInnerHTML={{ __html: problem }}></div>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              placeholder={placeholder}
              value={state.value}
              onChange={(e) => setAnswers(prev => ({...prev, [id]: { ...prev[id], value: e.target.value, checked: false }}))}
              className={`border-[1.5px] rounded-lg px-3 py-1.5 font-mono text-[14px] w-[200px] outline-none transition-colors ${
                state.checked
                  ? state.isCorrect
                    ? 'border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f]'
                    : 'border-[#e63946] bg-[#fff5f5] text-[#e63946]'
                  : 'border-[#e5e0d5] focus:border-[#e63946]'
              }`}
              onKeyDown={(e) => { if (e.key === 'Enter') checkAnswer(id, correctAns, state.value) }}
            />
            <button
              onClick={() => checkAnswer(id, correctAns, state.value)}
              className="bg-[#1a1a2e] text-white border-none rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-[#2d2d4e] transition-colors"
            >
              Check
            </button>
            {hintText && (
              <button
                onClick={() => toggleHint(id)}
                className="bg-transparent text-gray-500 border border-gray-300 rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {showHint ? 'Hide Hint' : 'Hint'}
              </button>
            )}
          </div>
          {showHint && hintText && (
            <div className="mt-2.5 px-3.5 py-2.5 bg-[#fff8f0] rounded-lg text-[13px] text-[#7c4a00] border-l-[3px] border-[#f4a261]">
              {hintText}
            </div>
          )}
          {state.checked && (
            <div className={`mt-1.5 text-[13px] font-medium ${state.isCorrect ? 'text-[#2a9d8f]' : 'text-[#e63946]'}`}>
              {state.isCorrect ? '✓ Excellent!' : '✗ Try again!'}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#2a9d8f] mb-3">
          🇬🇧 Урок · Грамматика B1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded">
          Somebody, Anybody...<br />
          <em className="text-[#2a9d8f] not-italic font-normal font-serif">Никто не знает, что выбрать!</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px]">
          Раз и навсегда разбираемся с безличными местоимениями. Как перестать путать anything и nothing, и почему everyone всегда "он".
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap">
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">🕒 90 минут</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Level: B1</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Grammar Rules</span>
        </div>
        <div className="absolute right-[20px] top-[-20px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none">
          NOBODY
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">
            ← В дашборд
          </Link>
          <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">📖 Теория</a>
          <a href="#practice-basic" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">🎯 Блок 1: База</a>
          <a href="#practice-secrets" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">🔥 Блок 2: Секреты</a>
          <a href="#homework" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f]">📝 Домашка (20)</a>
        </nav>

        {/* THEORY */}
        <div id="theory">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] my-12 mb-5">
            Теория
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Как собрать местоимение? Как конструктор!</h2>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">Шаг 1: Выбери «КТО / ЧТО» (Окончание)</h3>
            <ul className="ml-5 leading-[1.8] list-disc mb-4 text-[15px] text-gray-700">
              <li><strong>-body / -one</strong> = люди <i>(кто-то, никто)</i></li>
              <li><strong>-thing</strong> = вещи <i>(что-то, ничто)</i></li>
              <li><strong>-where</strong> = места <i>(где-то, везде)</i></li>
            </ul>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-500">
              💡 Разницы между <i>-body</i> и <i>-one</i> (например, somebody и someone) практически нет. Someone звучит чуть более формально.
            </div>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded">Шаг 2: Выбери «ЛОГИКУ» (Приставка)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-3 text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Приставка</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Тип предложения</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Перевод</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пример</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#f4a261]">SOME-</td>
                    <td className="border border-[#e5e0d5] p-3">Утверждение (+)</td>
                    <td className="border border-[#e5e0d5] p-3">Кое-кто / Что-то</td>
                    <td className="border border-[#e5e0d5] p-3">I have <b>something</b>.<br/><span className="text-gray-500 text-sm">У меня кое-что есть.</span></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">ANY-</td>
                    <td className="border border-[#e5e0d5] p-3">Вопрос (?)<br/>Отрицание (-)</td>
                    <td className="border border-[#e5e0d5] p-3">Кто-нибудь<br/>Никто</td>
                    <td className="border border-[#e5e0d5] p-3">Do you have <b>anything</b>?<br/>I don't have <b>anything</b>.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#1a1a2e]">NO-</td>
                    <td className="border border-[#e5e0d5] p-3">Отрицание (-)</td>
                    <td className="border border-[#e5e0d5] p-3">Никто / Ничто</td>
                    <td className="border border-[#e5e0d5] p-3">I have <b>nothing</b>.<br/><span className="text-gray-500 text-sm">У меня ничего нет.</span></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#2a9d8f]">EVERY-</td>
                    <td className="border border-[#e5e0d5] p-3">Все (100%)</td>
                    <td className="border border-[#e5e0d5] p-3">Все / Всё / Везде</td>
                    <td className="border border-[#e5e0d5] p-3">I have <b>everything</b>.<br/><span className="text-gray-500 text-sm">У меня есть всё.</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gradient-to-br from-[#fff5f5] to-[#fce8e8] border border-[#e63946] border-l-4 border-l-[#e63946] rounded-lg p-4 my-4 text-[14px] text-[#7a1921]">
              <strong className="block mb-1 text-[12px] tracking-[1px] uppercase">⚠️ Шпаргалка для выбора:</strong>
              <ul className="ml-4 list-disc mt-2 space-y-1">
                <li>Если в предложении есть NOT — используй <b>ANY</b> <i>(I don't know anyone)</i>.</li>
                <li>Если в предложении нет NOT, но смысл отрицательный — используй <b>NO</b> <i>(I know no one)</i>. В английском не бывает двойного отрицания!</li>
                <li>Если спрашиваешь «Кто-нибудь?» — используй <b>ANY</b> <i>(Is anyone there?)</i>.</li>
                <li>Если утверждаешь «Кто-то есть» — используй <b>SOME</b> <i>(Someone is there)</i>.</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#1a1a2e] text-white rounded-2xl p-8 pl-10 mb-4 relative shadow-lg">
            <h3 className="font-bold text-[22px] mb-6 unbounded text-[#f4a261]">🔥 ТРИ ВАЖНЫХ СЕКРЕТА</h3>
            
            <div className="mb-6 border-b border-white/10 pb-6">
              <h4 className="text-lg font-bold mb-2 text-[#2a9d8f]">Секрет №1: ANY в утверждении (+)</h4>
              <p className="text-white/80 text-[15px] mb-2">Если поставить <b>Any-</b> в обычное утвердительное предложение (без вопроса и отрицания), оно меняет значение на <b>«ЛЮБОЙ / КТО УГОДНО»</b>.</p>
              <ul className="text-white/70 italic text-sm list-none space-y-1 bg-white/5 p-3 rounded">
                <li>Take <b>anything</b>! (Бери что угодно!)</li>
                <li>Ask <b>anyone</b>. (Спроси любого).</li>
              </ul>
            </div>

            <div className="mb-6 border-b border-white/10 pb-6">
              <h4 className="text-lg font-bold mb-2 text-[#2a9d8f]">Секрет №2: Грамматика (Всегда «ОН»)</h4>
              <p className="text-white/80 text-[15px] mb-2">Все эти слова (даже everyone — «все») в английском считаются <b>единственным числом</b> (He/She/It).</p>
              <ul className="text-white/70 italic text-sm list-none space-y-1 bg-white/5 p-3 rounded">
                <li>Every<b>one</b> <span className="text-[#e63946] font-bold">is</span> happy. (Все счастливы).</li>
                <li>No<b>thing</b> work<span className="text-[#e63946] font-bold">s</span>. (Ничего не работает).</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-2 text-[#2a9d8f]">Секрет №3: NONE vs NO ONE</h4>
              <p className="text-white/80 text-[15px] mb-2"><b>No one / Nobody</b> = Никто (вообще в мире, просто пустота).<br/><b>None</b> = Ни один ИЗ (какой-то конкретной группы) ИЛИ нисколько (ответ на вопрос «сколько?»).</p>
              <ul className="text-white/70 italic text-sm list-none space-y-1 bg-white/5 p-3 rounded">
                <li><b>None</b> of my friends. (Никто из моих друзей).</li>
                <li>— How much water? — <b>None</b>. (— Сколько воды? — Нисколько).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PRACTICE 1 */}
        <div id="practice-basic" className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] my-12 mb-5">
          Практика
          <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
            <h3 className="text-[16px] font-bold m-0">Блок 1: SOME, ANY или NO?</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm">Впиши правильное слово</span>
          </div>
          <div className="px-6 py-2">
            <ExerciseItem id="ex1" num="1." problem="I can't see _______ in the dark. (Я ничего не вижу в темноте - отрицание уже есть)" correctAns="anything" hintText="Если уже есть can't (NOT), используем ANY-." />
            <ExerciseItem id="ex2" num="2." problem="Listen! There is _______ in the room. (Слушай! Кто-то в комнате.)" correctAns="somebody|someone" />
            <ExerciseItem id="ex3" num="3." problem="Are you looking for _______? (Ты кого-то ищешь?)" correctAns="somebody|someone|anybody|anyone" hintText="В вопросах обычно ANY, но если мы предлагаем помощь или уверены, можно SOME." />
            <ExerciseItem id="ex4" num="4." problem="I am bored. I have _______ to do. (Мне скучно. Мне нечего делать - без NOT)" correctAns="nothing" hintText="Нет NOT, значит нужно слово с NO-." />
            <ExerciseItem id="ex5" num="5." problem="We can go _______ you want. (Мы можем пойти куда угодно.)" correctAns="anywhere" hintText="Утверждение + 'куда угодно' = ANY." />
          </div>
        </div>

        <div id="practice-secrets" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></div>
            <h3 className="text-[16px] font-bold m-0">Блок 2: Секреты (None, Everyone is)</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm">Внимание на глаголы и контекст</span>
          </div>
          <div className="px-6 py-2">
            <ExerciseItem id="ex6" num="6." problem="Everyone _______ (be) happy at the party yesterday." correctAns="was" hintText="Everyone - единственное число. В прошедшем времени глагол to be для ед.ч. - was." />
            <ExerciseItem id="ex7" num="7." problem="_______ of my classmates passed the exam. (Никто ИЗ моих одноклассников)" correctAns="none" hintText="Никто ИЗ группы = None (of)." />
            <ExerciseItem id="ex8" num="8." problem="Does _______ know the answer? (Кто-нибудь)" correctAns="anybody|anyone" />
            <ExerciseItem id="ex9" num="9." problem="Nobody _______ (want) to clean the house." correctAns="wants" hintText="Nobody - единственное число (ОН). Добавляем -s к глаголу в Present Simple." />
            <ExerciseItem id="ex10" num="10." problem="I opened the box, but there was _______ inside." correctAns="nothing" />
          </div>
        </div>

        {/* HOMEWORK (20 exercises) */}
        <div id="homework" className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#1a1a2e] mt-12 mb-5">
          Homework
          <div className="w-[40px] h-[2px] bg-[#1a1a2e]"></div>
        </div>

        <div className="bg-[#1a1a2e] text-white rounded-2xl p-8 mb-4">
          <h3 className="text-xl font-bold mb-2 unbounded text-[#f4a261]">Большая домашка (20 заданий)</h3>
          <p className="text-white/70 mb-6 text-sm">Проверь себя на прочность. Впиши правильное слово. Не забывай про окончание у глаголов (Secret 2)!</p>
          
          <div className="bg-white text-[#1a1a2e] rounded-xl overflow-hidden">
            <div className="px-6 py-2">
              <ExerciseItem id="hw1" num="1." problem="Is there _______ in the fridge? (Что-нибудь)" correctAns="anything" />
              <ExerciseItem id="hw2" num="2." problem="I didn't say _______! (Я ничего не говорил - есть NOT)" correctAns="anything" />
              <ExerciseItem id="hw3" num="3." problem="I said _______. (Я ничего не сказал - без NOT)" correctAns="nothing" />
              <ExerciseItem id="hw4" num="4." problem="_______ called you while you were out. (Кто-то)" correctAns="somebody|someone" />
              <ExerciseItem id="hw5" num="5." problem="I want to travel _______. (Куда-нибудь)" correctAns="somewhere" />
              <ExerciseItem id="hw6" num="6." problem="There is _______ at the door. Go and open it." correctAns="somebody|someone" />
              <ExerciseItem id="hw7" num="7." problem="She didn't tell _______ her secret." correctAns="anybody|anyone" />
              <ExerciseItem id="hw8" num="8." problem="_______ understands me! (Никто)" correctAns="nobody|no one" />
              <ExerciseItem id="hw9" num="9." problem="I bought _______ for you. (Кое-что)" correctAns="something" />
              <ExerciseItem id="hw10" num="10." problem="Everything _______ (be) going to be alright." correctAns="is" />
              <ExerciseItem id="hw11" num="11." problem="How many apples do we have? — _______. (Нисколько)" correctAns="none" />
              <ExerciseItem id="hw12" num="12." problem="_______ of the students did their homework. (Никто ИЗ)" correctAns="none" />
              <ExerciseItem id="hw13" num="13." problem="You can choose _______ you like from the menu. (Что угодно)" correctAns="anything" />
              <ExerciseItem id="hw14" num="14." problem="I have looked _______ for my keys! (Везде)" correctAns="everywhere" />
              <ExerciseItem id="hw15" num="15." problem="Did _______ call me?" correctAns="anybody|anyone" />
              <ExerciseItem id="hw16" num="16." problem="Let's go _______ quiet. (Куда-нибудь)" correctAns="somewhere" />
              <ExerciseItem id="hw17" num="17." problem="_______ is perfect. (Никто не идеален)" correctAns="nobody|no one" />
              <ExerciseItem id="hw18" num="18." problem="Everyone _______ (need) a friend." correctAns="needs" />
              <ExerciseItem id="hw19" num="19." problem="I don't want to go _______. (Никуда - с NOT)" correctAns="anywhere" />
              <ExerciseItem id="hw20" num="20." problem="He has _______ to live. (Ему негде жить - без NOT)" correctAns="nowhere" />
            </div>
          </div>
        </div>


        {/* FINAL PROGRESS */}
        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-8 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Твой прогресс в Уроке</span>
            <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full">{correctCount} / {total} правильно</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div className="h-full bg-[#2a9d8f] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
          {pct === 100 && (
            <div className="mt-4 p-3 bg-[#f0faf8] text-[#2a9d8f] font-bold text-center rounded-lg border border-[#2a9d8f]/30">
              🎉 Потрясающе! Ты идеально справился со всеми заданиями!
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
