'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'

export default function VerbsLesson() {
  const [answers, setAnswers] = useState({})
  const [hints, setHints] = useState({})

  const total = 15
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_verbs', total, 0);
  const stats = getStats('cw');
  const correctCount = stats.correct;
  const pct = stats.pct;

  // Restoration
  useEffect(() => {
    if (!loading && progress.cw) {
      const restored = {};
      Object.keys(progress.cw).forEach(id => {
        const item = progress.cw[id];
        if (item) {
          restored[id] = { value: item.value || '', isCorrect: item.status === 'correct', checked: true };
        }
      });
      setAnswers(prev => ({ ...prev, ...restored }));
    }
  }, [loading, progress.cw]);

  const normalize = (s) => s.toLowerCase().replace(/[^a-záéíóúñ]/g, '').trim()

  const checkAnswer = (id, correctAns, value) => {
    const isCorrect = normalize(value) === normalize(correctAns) && value !== ''
    setAnswers((prev) => ({
      ...prev,
      [id]: { value, isCorrect, checked: true },
    }))
    updateProgress(id, 'cw', isCorrect ? 'correct' : 'wrong', 1, value);
  }

  const toggleHint = (id) => {
    setHints((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const ExerciseItem = ({ id, num, problem, correctAns, hintText }) => {
    const state = answers[id] || { value: '', checked: false }
    const showHint = hints[id] || false

    return (
      <div className="border-b border-dashed border-[#e5e0d5] py-4 flex gap-4 items-start last:border-none">
        <div className="font-mono text-[13px] text-gray-500 min-w-[28px] pt-1">{num}</div>
        <div className="flex-1">
          <div 
            className="text-[15px] px-3.5 py-2.5 bg-gray-50 rounded-lg mb-2.5" 
            dangerouslySetInnerHTML={{ __html: problem }}
          />
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={state.value}
              onChange={(e) => setAnswers(prev => ({...prev, [id]: { ...prev[id], value: e.target.value, checked: false }}))}
              className={`border-[1.5px] rounded-lg px-3 py-1.5 font-mono text-[14px] w-[160px] outline-none transition-colors ${
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
              Проверить
            </button>
            {hintText && (
              <button
                onClick={() => toggleHint(id)}
                className="bg-transparent text-gray-500 border border-gray-300 rounded-lg px-4 py-1.5 text-[13px] font-sans cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {showHint ? 'Скрыть' : 'Подсказка'}
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
              {state.isCorrect ? '✓ ¡Exacto!' : '✗ Ошибка. Проверь окончание в таблице!'}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#e63946] mb-3">
          🇪🇸 Урок 4 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Правильные<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">глаголы</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Как сказать "я говорю", "мы едим", "они живут". Поняв эту систему один раз, ты выучишь тысячи испанских глаголов.
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap relative z-10">
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Глаголы на -AR</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Глаголы на -ER</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Глаголы на -IR</span>
        </div>
        <div className="absolute right-[-20px] top-[10px] text-[100px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          -AR-ER-IR
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
            ← На главную
          </Link>
          <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">📖 Теория</a>
          <a href="#exercises-ar" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 1: -AR</a>
          <a href="#exercises-erir" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 2: -ER/-IR</a>
          <a href="#exercises-mix" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946]">🎯 Блок 3: Микс</a>
        </nav>

        {/* THEORY */}
        <div id="theory">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
            Теория
            <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Три кита испанских действий</h2>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">Как это работает?</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              В испанском языке <strong>все глаголы</strong> в начальной форме (что делать?) заканчиваются либо на <strong>-AR</strong>, либо на <strong>-ER</strong>, либо на <strong>-IR</strong>. Третьего не дано.
            </p>
            <p className="text-gray-700 text-[15px] mb-2.5">
              Чтобы сказать "я говорю" или "мы едим", мы просто <strong>отрываем хвостик</strong> (-ar, -er, -ir) и приклеиваем новое окончание в зависимости от того, КТО делает действие.
            </p>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">Группа 1: Глаголы на -AR</h3>
            <p className="text-gray-700 text-[15px] mb-4">
              Самая большая группа. Пример: <strong>HABL<span className="text-[#e63946]">AR</span></strong> (говорить), <strong>TRABAJ<span className="text-[#e63946]">AR</span></strong> (работать), <strong>ESTUDI<span className="text-[#e63946]">AR</span></strong> (учиться).
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Местоимение</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Окончание</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">habl-ar (говорить)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946] w-1/4">Yo (Я)</td>
                    <td className="border border-[#e5e0d5] p-3 text-gray-600 font-mono">-o</td>
                    <td className="border border-[#e5e0d5] p-3">habl<strong>o</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Tú (Ты)</td>
                    <td className="border border-[#e5e0d5] p-3 text-gray-600 font-mono">-as</td>
                    <td className="border border-[#e5e0d5] p-3">habl<strong>as</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Él/Ella/Usted</td>
                    <td className="border border-[#e5e0d5] p-3 text-gray-600 font-mono">-a</td>
                    <td className="border border-[#e5e0d5] p-3">habl<strong>a</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Nosotros (Мы)</td>
                    <td className="border border-[#e5e0d5] p-3 text-gray-600 font-mono">-amos</td>
                    <td className="border border-[#e5e0d5] p-3">habl<strong>amos</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#e63946]">Ellos/Ustedes</td>
                    <td className="border border-[#e5e0d5] p-3 text-gray-600 font-mono">-an</td>
                    <td className="border border-[#e5e0d5] p-3">habl<strong>an</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[13px] text-gray-500 italic">
              * Форму Vosotros (sois/habláis) пока пропустим, её используют только в Испании, для A1 важнее понять базу.
            </p>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">Группы 2 и 3: Глаголы на -ER и -IR</h3>
            <p className="text-gray-700 text-[15px] mb-2.5">
              Они спрягаются почти одинаково! Разница только в форме "Мы" (nosotros).
            </p>
            <p className="text-gray-700 text-[15px] mb-4">
              Примеры: <strong>COM<span className="text-[#2a9d8f]">ER</span></strong> (есть/кушать), <strong>BEB<span className="text-[#2a9d8f]">ER</span></strong> (пить), <strong>VIV<span className="text-[#2a9d8f]">IR</span></strong> (жить), <strong>ESCRIB<span className="text-[#2a9d8f]">IR</span></strong> (писать).
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-1/4">Кто?</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">com-er (кушать)</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">viv-ir (жить)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#2a9d8f]">Yo (Я)</td>
                    <td className="border border-[#e5e0d5] p-3">com<strong>o</strong></td>
                    <td className="border border-[#e5e0d5] p-3">viv<strong>o</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#2a9d8f]">Tú (Ты)</td>
                    <td className="border border-[#e5e0d5] p-3">com<strong>es</strong></td>
                    <td className="border border-[#e5e0d5] p-3">viv<strong>es</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#2a9d8f]">Él/Ella/Ud.</td>
                    <td className="border border-[#e5e0d5] p-3">com<strong>e</strong></td>
                    <td className="border border-[#e5e0d5] p-3">viv<strong>e</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#2a9d8f]">Nosotros (Мы)</td>
                    <td className="border border-[#e5e0d5] p-3">com<strong>emos</strong></td>
                    <td className="border border-[#e5e0d5] p-3 bg-teal-50">viv<strong>imos</strong> (Тут разница!)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 font-semibold text-[#2a9d8f]">Ellos/Uds.</td>
                    <td className="border border-[#e5e0d5] p-3">com<strong>en</strong></td>
                    <td className="border border-[#e5e0d5] p-3">viv<strong>en</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 text-[14px] text-[#7c4a00]">
              <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">💡 Закономерность (Лайфхак):</strong>
              <ul className="list-disc ml-4 space-y-1">
                <li>Форма "Я" (Yo) <strong>всегда</strong> заканчивается на <strong>-o</strong> (hablo, como, vivo).</li>
                <li>Форма "Ты" (Tú) всегда заканчивается на <strong>-s</strong> (hablas, comes, vives).</li>
                <li>Форма "Они" (Ellos) всегда заканчивается на <strong>-n</strong> (hablan, comen, viven).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* EXERCISES */}
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
          Большая практика (15 заданий)
          <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
        </div>
        <p className="text-[14px] text-gray-500 mb-5">
          Отрывай концовку инфинитива и приклеивай нужную! Пиши глагол маленькими буквами.
        </p>

        <div id="exercises-ar" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 1: Глаголы на -AR</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">hablar, trabajar, estudiar</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex1" num="1." problem="Yo ________ español. (hablar)" correctAns="hablo" />
            <ExerciseItem id="ex2" num="2." problem="Tú ________ mucho. (trabajar - работать)" correctAns="trabajas" hintText="Для 'Tú' окончание -as. Trabaj + as." />
            <ExerciseItem id="ex3" num="3." problem="Juan ________ en la universidad. (estudiar)" correctAns="estudia" />
            <ExerciseItem id="ex4" num="4." problem="Nosotros ________ música. (escuchar - слушать)" correctAns="escuchamos" />
            <ExerciseItem id="ex5" num="5." problem="Ellos ________ por la calle. (caminar - гулять)" correctAns="caminan" />
          </div>
        </div>

        <div id="exercises-erir" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
            <h3 className="text-[16px] font-semibold m-0">Блок 2: Глаголы на -ER и -IR</h3>
            <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">comer, beber, vivir</span>
          </div>
          <div className="px-6 py-4">
            <ExerciseItem id="ex6" num="6." problem="Yo ________ agua. (beber - пить)" correctAns="bebo" />
            <ExerciseItem id="ex7" num="7." problem="Tú ________ pan. (comer - есть/кушать)" correctAns="comes" />
            <ExerciseItem id="ex8" num="8." problem="María ________ en Madrid. (vivir - жить)" correctAns="vive" />
            <ExerciseItem id="ex9" num="9." problem="Nosotros ________ libros. (escribir - писать)" correctAns="escribimos" hintText="Escribir кончается на -IR. Значит для Nosotros будет -imos." />
            <ExerciseItem id="ex10" num="10." problem="Ellos ________ mucho. (comer)" correctAns="comen" />
          </div>
        </div>

        <div id="exercises-mix" className="bg-[#1a1a2e] text-white border border-[#1a1a2e] rounded-2xl overflow-hidden mb-4 shadow-lg mt-8">
          <div className="px-6 py-4 flex items-center gap-3 border-b border-white/10 bg-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></div>
            <h3 className="text-[16px] font-semibold m-0 text-white">Блок 3: Скрытые местоимения</h3>
            <span className="ml-auto text-[12px] text-gray-400 bg-white/10 px-2.5 py-1 rounded-full hidden sm:inline-block">Ориентируйся на смысл!</span>
          </div>
          <div className="px-6 py-4 text-[#1a1a2e] bg-white">
            <ExerciseItem id="ex11" num="11." problem="¿Dónde ________? (vivir). — Где <b>ты</b> живешь?" correctAns="vives" />
            <ExerciseItem id="ex12" num="12." problem="________ en un hospital. (trabajar). — <b>Я</b> работаю в больнице." correctAns="trabajo" />
            <ExerciseItem id="ex13" num="13." problem="¿Qué ________? (comer). — Что <b>вы (ellos/ustedes)</b> едите?" correctAns="comen" hintText="Для Они/Вы(мн.ч.) окончание -en." />
            <ExerciseItem id="ex14" num="14." problem="________ español todos los días. (estudiar). — <b>Мы</b> изучаем испанский каждый день." correctAns="estudiamos" />
            <ExerciseItem id="ex15" num="15." problem="Ana ________ un libro. (escribir). — Ана <b>(она)</b> пишет книгу." correctAns="escribe" />
          </div>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 mb-4 mt-8 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[15px]">Твой прогресс в Уроке 4</span>
            <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full">{correctCount} / {total} правильно</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div className="h-full bg-[#e63946] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
          </div>
          {pct === 100 && (
            <div className="mt-4 p-3 bg-[#f0faf8] text-[#2a9d8f] font-bold text-center rounded-lg border border-[#2a9d8f]/30">
              🎉 ¡Impresionante! Ты идеально проспрягал все глаголы!
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
