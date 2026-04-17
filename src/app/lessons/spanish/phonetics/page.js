'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'

export default function PhoneticsLesson() {
  const speakSpanish = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').split('/')[0].trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const AudioWord = ({ spanish, pron, russian }) => (
    <tr>
      <td className="border border-[#e5e0d5] p-3 text-left w-1/3">
        <span className="cursor-pointer hover:opacity-70 text-lg mr-2 inline-block align-middle" onClick={() => speakSpanish(spanish)} title="Прослушать">🔊</span>
        <span className="font-bold text-[#e63946] text-lg font-mono">{spanish}</span>
      </td>
      <td className="border border-[#e5e0d5] p-3 text-left w-1/3 font-mono text-gray-600">[{pron}]</td>
      <td className="border border-[#e5e0d5] p-3 text-left w-1/3">{russian}</td>
    </tr>
  );

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_phonetics', 5, 0);

  useEffect(() => {
    if (!loading && progress.cw) {
      const restored = {};
      let hasData = false;
      quizQuestions.forEach(q => {
        const item = progress.cw[q.id];
        if (item && item.value !== undefined) {
          restored[q.id] = parseInt(item.value);
          hasData = true;
        }
      });
      if (hasData) {
        setQuizAnswers(restored);
        setShowResults(true);
      }
    }
  }, [loading, progress.cw]);

  const quizQuestions = [
    { id: 'q1', word: 'hotel', options: ['hОtel', 'hotEl', 'Оtel', 'otEl'], correct: 3, hint: 'H не читается! Кончается на L, значит ударение на последний слог.' },
    { id: 'q2', word: 'trabajan', options: ['trAbajan', 'trabAjan', 'trabajAn'], correct: 1, hint: 'Кончается на N, значит ударение на предпоследний слог.' },
    { id: 'q3', word: 'guitarra', options: ['гуитАрра', 'гитАрра', 'хитАрра'], correct: 1, hint: 'gui читается как [ги], u не читается.' },
    { id: 'q4', word: 'zorro', options: ['сОрро (межзубный)', 'зОрро', 'цОрро'], correct: 0, hint: 'Z читается как глухой межзубный [с], а не звонкий [з].' },
    { id: 'q5', word: 'queso', options: ['куЭсо', 'кЭсо', 'сЭсо'], correct: 1, hint: 'que читается как [ке].' },
  ]

  const handleQuizSelect = (qId, optionIdx) => {
    if (showResults) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }))
  }

  const checkQuiz = () => {
    setShowResults(true)
    quizQuestions.forEach(q => {
        const userIdx = quizAnswers[q.id];
        const isCorrect = userIdx === q.correct;
        updateProgress(q.id, 'cw', isCorrect ? 'correct' : 'wrong', 1, String(userIdx));
    });
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setShowResults(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  const score = Object.keys(quizAnswers).reduce((acc, qId) => {
    const q = quizQuestions.find(x => x.id === qId)
    return acc + (q.correct === quizAnswers[qId] ? 1 : 0)
  }, 0)

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#e63946] mb-3">
          🇪🇸 Урок 1 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Правила чтения<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">Как звучать круто</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[600px] relative z-10">
          Испанский язык читается ровно так, как пишется. Освой эти правила, послушай примеры, и ты сможешь прочесть вслух любую книгу, даже не зная перевода!
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap relative z-10">
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Гласные</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Согласные-хамелеоны</span>
          <span className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12px] text-white/70">Ударение</span>
        </div>
        <div className="absolute right-[-20px] top-[10px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          HOLA
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center sticky top-4 z-20 shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#f4a261] hover:text-white">
            ← На главную
          </Link>
          <a href="#vowels" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#f4a261] hover:text-white">🅰️ Гласные</a>
          <a href="#consonants" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#f4a261] hover:text-white">🔤 Хитрые согласные</a>
          <a href="#chameleons" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#f4a261] hover:text-white">🦎 Хамелеоны</a>
          <a href="#stress" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#f4a261] hover:text-white">🎯 Ударение</a>
          <a href="#quiz" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#f4a261]">✅ Практика</a>
        </nav>

        {/* VOWELS */}
        <section id="vowels" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#f4a261] mb-5">
            Золотое правило
            <div className="w-[40px] h-[2px] bg-[#f4a261]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Чёткие гласные</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
            
            <p className="text-gray-700 text-[15px] mb-4">
              В русском языке безударная "О" читается как "А" (м<u>о</u>л<u>о</u>к<u>о</u> {'->'} м[а]л[а]ко). <strong>В испанском так делать КАТЕГОРИЧЕСКИ НЕЛЬЗЯ!</strong>
            </p>
            <p className="text-gray-700 text-[15px] mb-6">
              Все 5 гласных (A, E, I, O, U) всегда читаются чётко, кратко и полнозвучно, независимо от того, падает на них ударение или нет. Никакого "жевания" звуков.
            </p>

            <div className="bg-gradient-to-br from-[#fff5f5] to-[#fce8e8] border border-[#e63946] border-l-4 border-l-[#e63946] rounded-lg p-5 my-6 text-[14px] text-[#7a1921]">
              <strong className="block mb-2 text-[13px] tracking-[1px] uppercase">⚠️ Пример фатальной ошибки:</strong>
              Слово <strong>loco</strong> (сумасшедший). Если прочитаешь расслабленно как <i>[лОка]</i>, испанец услышит <strong>loca</strong> (сумасшедшая девочка). Разница в одной чёткой букве меняет пол человека! Читай чётко: <span className="cursor-pointer underline" onClick={() => speakSpanish('loco')}>🔊 [лО-кО]</span>!
            </div>

            <div className="overflow-x-auto mb-2">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Слово</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Произношение</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Перевод</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="agua" pron="А-гуа" russian="вода" />
                  <AudioWord spanish="elefante" pron="э-лэ-фАн-тэ" russian="слон" />
                  <AudioWord spanish="isla" pron="Ис-ла" russian="остров" />
                  <AudioWord spanish="oso" pron="О-со (не 'оса'!)" russian="медведь" />
                  <AudioWord spanish="uva" pron="У-ба" russian="виноград" />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CONSONANTS */}
        <section id="consonants" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Буквы с сюрпризом
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Хитрые согласные</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            
            <p className="text-gray-700 text-[15px] mb-6">
              Большинство согласных читаются как в русском. Но есть несколько партизанов, которые ведут себя необычно. Кликай на значок 🔊, чтобы услышать!
            </p>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h4 className="text-xl font-bold mb-2 text-[#e63946] unbounded">H h — Невидимка</h4>
                <p className="text-[15px] mb-3"><strong>ВСЕГДА НЕМАЯ!</strong> Никогда не читается, словно её нет. Исключение — сочетание CH (ч).</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('hola')}>🔊 <b>h</b>ola [Ола]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('hotel')}>🔊 <b>h</b>otel [отЭль]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('hielo')}>🔊 <b>h</b>ielo [йЕло]</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h4 className="text-xl font-bold mb-2 text-[#e63946] unbounded">J j — Хриплый испанец</h4>
                <p className="text-[15px] mb-3">Читается как русская очень жесткая <strong>[Х]</strong>, прямо с хрипцой в горле.</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('jamón')}>🔊 <b>j</b>amón [хамон]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('jefe')}>🔊 <b>j</b>efe [хЕфэ]</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h4 className="text-xl font-bold mb-2 text-[#e63946] unbounded">LL ll / Y y — Йот</h4>
                <p className="text-[15px] mb-3">Двойная L читается как русская <strong>[Й]</strong> (в Аргентине как мягкая [ДЖ] или [Ш]). Буква Y в начале слова звучит так же.</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('llamar')}>🔊 <b>ll</b>amar [ямар]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('paella')}>🔊 pae<b>ll</b>a [паЭйя]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('yo')}>🔊 <b>y</b>o [йо]</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h4 className="text-xl font-bold mb-2 text-[#e63946] unbounded">Ñ ñ — Визитная карточка</h4>
                <p className="text-[15px] mb-3">Читается как мягкая <strong>[НЬ]</strong>. Волна сверху называется "тильда".</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('España')}>🔊 Espa<b>ñ</b>a [эспаНЬя]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('niño')}>🔊 ni<b>ñ</b>o [ниНЬо]</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h4 className="text-xl font-bold mb-2 text-[#e63946] unbounded">V v / B b — Близнецы</h4>
                <p className="text-[15px] mb-3">В испанском <strong>нет звука [В]</strong> (когда нижняя губа касается верхних зубов). И B, и V читаются абсолютно одинаково — как нечто среднее между [Б] и [В] (губы просто сближаются).</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('vida')}>🔊 <b>v</b>ida [Бида]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('beso')}>🔊 <b>b</b>eso [Бэсо]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('vamos')}>🔊 <b>v</b>amos [Бамос]</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h4 className="text-xl font-bold mb-2 text-[#e63946] unbounded">Z z — Межзубная фея</h4>
                <p className="text-[15px] mb-3">Читается как глухой межзубный <strong>[С]</strong> (шепеляво, кончик языка между зубами, как английское *th* в *think*). Звонкого звука [З] в испанском нет вообще!</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('zapato')}>🔊 <b>z</b>apato [сапато]</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('zorro')}>🔊 <b>z</b>orro [сорро]</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <h4 className="text-xl font-bold mb-2 text-[#e63946] unbounded">R r / RR rr — Моторчик</h4>
                <p className="text-[15px] mb-3">Одиночная R в середине слова читается кратко. Двойная RR — раскатисто и длинно! Это смыслоразличительно.</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('pero')}>🔊 pe<b>r</b>o [пЭро] (но)</div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => speakSpanish('perro')}>🔊 pe<b>rr</b>o [пЭрро] (собака)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAMELEONS */}
        <section id="chameleons" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] mb-5">
            Защита и маскировка
            <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Буквы-хамелеоны (C и G)</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
            
            <p className="text-gray-700 text-[15px] mb-6">
              Эти две буквы меняют свой звук в зависимости от того, какая гласная стоит после них. Перед <strong>E, I</strong> они читаются мягко. Перед <strong>A, O, U</strong> — твердо.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-xl mb-3 border-b pb-2">Буква C (Сэ)</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span><b>ca, co, cu</b> = [К]</span>
                    <span className="cursor-pointer bg-[#1a1a2e] text-white px-3 py-1 rounded text-sm hover:bg-[#e63946]" onClick={() => speakSpanish('casa, coco, cuna')}>🔊 casa [ка]</span>
                  </li>
                  <li className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span><b>ce, ci</b> = шепелявый [С]</span>
                    <span className="cursor-pointer bg-[#1a1a2e] text-white px-3 py-1 rounded text-sm hover:bg-[#e63946]" onClick={() => speakSpanish('cero, cinco')}>🔊 cero [сэ]</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-3 border-b pb-2">Буква G (Хэ)</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span><b>ga, go, gu</b> = [Г]</span>
                    <span className="cursor-pointer bg-[#1a1a2e] text-white px-3 py-1 rounded text-sm hover:bg-[#e63946]" onClick={() => speakSpanish('gato, gorila, guapo')}>🔊 gato [га]</span>
                  </li>
                  <li className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span><b>ge, gi</b> = [Х]</span>
                    <span className="cursor-pointer bg-[#1a1a2e] text-white px-3 py-1 rounded text-sm hover:bg-[#e63946]" onClick={() => speakSpanish('gente, gigante')}>🔊 gente [хэ]</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="font-bold text-[22px] mb-4 unbounded text-[#1a1a2e]">Секретный щит: U</h3>
            <p className="text-gray-700 text-[15px] mb-4">
              А как же написать звуки [КЕ], [КИ] или [ГЕ], [ГИ]? Ведь `ce` читается как [сэ], а `ge` как [хэ]! <br/>
              Для этого используют <strong>немую U</strong>, которая встает между буквами как щит. Она защищает звук, но сама <strong>не читается</strong>!
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пишем</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Слышим</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пример (Жми 🔊)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-lg font-bold text-[#e63946]">que, qui</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono">[КЕ], [КИ]</td>
                    <td className="border border-[#e5e0d5] p-3">
                      <span className="cursor-pointer text-[#e63946] font-bold" onClick={() => speakSpanish('queso')}>🔊 que</span>so [КЭсо] (сыр)<br/>
                      <span className="cursor-pointer text-[#e63946] font-bold" onClick={() => speakSpanish('aquí')}>🔊 qui</span>osco [КИоско]
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5e0d5] p-3 text-lg font-bold text-[#e63946]">gue, gui</td>
                    <td className="border border-[#e5e0d5] p-3 font-mono">[ГЕ], [ГИ]</td>
                    <td className="border border-[#e5e0d5] p-3">
                      <span className="cursor-pointer text-[#e63946] font-bold" onClick={() => speakSpanish('guerra')}>🔊 gue</span>rra [ГЭрра] (война)<br/>
                      <span className="cursor-pointer text-[#e63946] font-bold" onClick={() => speakSpanish('guitarra')}>🔊 gui</span>tarra [ГИтарра]
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#f0faf8] border-l-4 border-[#2a9d8f] p-4 rounded-r-lg mt-4 text-sm">
              <strong>А если мы ХОТИМ прочитать U? (Пингвин 🐧)</strong><br/>
              Если нужно, чтобы буква U зазвучала после G, на неё ставят две точки (диерезис): <strong>Ü</strong>.<br/>
              Пример: <span className="cursor-pointer font-bold text-[#2a9d8f]" onClick={() => speakSpanish('pingüino')}>🔊 pingüino</span> [пин-ГВИ-но] (пингвин), <span className="cursor-pointer font-bold text-[#2a9d8f]" onClick={() => speakSpanish('vergüenza')}>🔊 vergüenza</span> [бер-ГВЕН-са] (стыд).
            </div>
          </div>
        </section>

        {/* STRESS */}
        <section id="stress" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#1a1a2e] mb-5">
            Ритм языка
            <div className="w-[40px] h-[2px] bg-[#1a1a2e]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Ударение (Acento)</h2>
          
          <div className="bg-[#1a1a2e] text-white rounded-2xl p-8 pl-10 mb-4 relative shadow-lg">
            <p className="text-white/80 text-[15px] mb-6">
              В испанском всего <strong>два главных правила ударения</strong>. Если слово нарушает эти правила — на нём ставят графическую палочку (Tilde: á, é, í, ó, ú), чтобы спасти нас от путаницы!
            </p>

            <div className="space-y-6">
              <div className="border border-white/20 rounded-xl p-5 bg-white/5">
                <h4 className="text-xl font-bold mb-3 text-[#f4a261]">Правило 1 (Предпоследний слог)</h4>
                <p className="mb-3 text-sm text-white/70">Если слово оканчивается на <strong>гласную (A, E, I, O, U)</strong> или на согласные <strong>N, S</strong> — ударение падает на <u className="underline-offset-4">ПРЕДПОСЛЕДНИЙ</u> слог.</p>
                <div className="flex gap-4">
                  <div className="cursor-pointer bg-white/10 px-3 py-1 rounded hover:bg-white/20" onClick={() => speakSpanish('casa')}>🔊 c<strong>A</strong>sa</div>
                  <div className="cursor-pointer bg-white/10 px-3 py-1 rounded hover:bg-white/20" onClick={() => speakSpanish('trabajan')}>🔊 trab<strong>A</strong>jan</div>
                  <div className="cursor-pointer bg-white/10 px-3 py-1 rounded hover:bg-white/20" onClick={() => speakSpanish('lunes')}>🔊 l<strong>U</strong>nes</div>
                </div>
              </div>

              <div className="border border-white/20 rounded-xl p-5 bg-white/5">
                <h4 className="text-xl font-bold mb-3 text-[#2a9d8f]">Правило 2 (Последний слог)</h4>
                <p className="mb-3 text-sm text-white/70">Если слово оканчивается на <strong>ДРУГУЮ согласную</strong> (всё кроме N, S) — ударение падает на <u className="underline-offset-4">ПОСЛЕДНИЙ</u> слог.</p>
                <div className="flex gap-4">
                  <div className="cursor-pointer bg-white/10 px-3 py-1 rounded hover:bg-white/20" onClick={() => speakSpanish('ciudad')}>🔊 ciud<strong>A</strong>d</div>
                  <div className="cursor-pointer bg-white/10 px-3 py-1 rounded hover:bg-white/20" onClick={() => speakSpanish('hotel')}>🔊 hot<strong>E</strong>l</div>
                  <div className="cursor-pointer bg-white/10 px-3 py-1 rounded hover:bg-white/20" onClick={() => speakSpanish('hablar')}>🔊 habl<strong>A</strong>r</div>
                </div>
              </div>

              <div className="border border-[#e63946]/50 rounded-xl p-5 bg-[#e63946]/10">
                <h4 className="text-xl font-bold mb-3 text-[#e63946]">Правило 3 (Графическое ударение)</h4>
                <p className="mb-3 text-sm text-white/90">А что если графическое ударение (tilde) уже стоит? <strong>Забудь про правила!</strong> Просто лупи голосом туда, где стоит палочка. Она главнее всего.</p>
                <div className="flex gap-4">
                  <div className="cursor-pointer bg-[#e63946] text-white px-3 py-1 rounded hover:bg-[#d62839]" onClick={() => speakSpanish('médico')}>🔊 m<strong>É</strong>dico</div>
                  <div className="cursor-pointer bg-[#e63946] text-white px-3 py-1 rounded hover:bg-[#d62839]" onClick={() => speakSpanish('canción')}>🔊 canci<strong>Ó</strong>n</div>
                  <div className="cursor-pointer bg-[#e63946] text-white px-3 py-1 rounded hover:bg-[#d62839]" onClick={() => speakSpanish('inglés')}>🔊 ingl<strong>É</strong>s</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="font-bold text-lg mb-3">Зачем палочка на коротких словах? (Диакритика)</h4>
              <p className="text-sm text-white/70 mb-4">Иногда ударение ставится не для произношения, а чтобы различать слова-близнецы на письме:</p>
              <ul className="text-sm space-y-2 font-mono">
                <li><span className="text-[#f4a261]">el</span> (артикль 'the') — <span className="text-[#2a9d8f]">él</span> (он)</li>
                <li><span className="text-[#f4a261]">tu</span> (твой) — <span className="text-[#2a9d8f]">tú</span> (ты)</li>
                <li><span className="text-[#f4a261]">si</span> (если) — <span className="text-[#2a9d8f]">sí</span> (да!)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* INTERACTIVE QUIZ */}
        <section id="quiz" className="scroll-mt-24 mt-16 mb-12">
          <div className="bg-white border-2 border-[#2a9d8f] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-8 border-b pb-4">
              <div className="w-12 h-12 bg-[#2a9d8f] text-white rounded-full flex items-center justify-center text-2xl">🧠</div>
              <div>
                <h3 className="font-bold text-2xl unbounded m-0 text-[#1a1a2e]">Проверь себя</h3>
                <p className="text-sm text-gray-500 m-0">Как хорошо ты усвоил правила чтения?</p>
              </div>
            </div>

            <div className="space-y-8">
              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">
                      <span className="text-gray-400 mr-2">{qIndex + 1}.</span>
                      Как правильно читается <strong className="text-[#e63946]">{q.word}</strong>?
                    </h4>
                    <span className="cursor-pointer text-2xl hover:scale-110 transition-transform" onClick={() => speakSpanish(q.word)} title="Подслушать у испанца">🎧</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, idx) => {
                      const isSelected = quizAnswers[q.id] === idx;
                      const isCorrect = q.correct === idx;
                      
                      let btnClass = "text-left px-5 py-3 rounded-lg border-2 font-mono text-sm transition-all ";
                      
                      if (!showResults) {
                        btnClass += isSelected 
                          ? "border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f] font-bold" 
                          : "border-gray-200 hover:border-gray-300 bg-white";
                      } else {
                        if (isCorrect) {
                          btnClass += "border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f] font-bold"
                        } else if (isSelected && !isCorrect) {
                          btnClass += "border-[#e63946] bg-[#fff5f5] text-[#e63946]"
                        } else {
                          btnClass += "border-gray-200 bg-gray-50 opacity-50"
                        }
                      }

                      return (
                        <button 
                          key={idx} 
                          className={btnClass}
                          onClick={() => handleQuizSelect(q.id, idx)}
                          disabled={showResults}
                        >
                          {opt}
                          {showResults && isCorrect && <span className="float-right">✅</span>}
                          {showResults && isSelected && !isCorrect && <span className="float-right">❌</span>}
                        </button>
                      )
                    })}
                  </div>
                  {showResults && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg">
                      <strong>Правило: </strong> {q.hint}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              {!showResults ? (
                <button 
                  className="bg-[#1a1a2e] hover:bg-[#e63946] text-white px-8 py-3 rounded-xl font-bold transition-colors w-full"
                  onClick={checkQuiz}
                  disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                >
                  Узнать результат
                </button>
              ) : (
                <div className="w-full text-center">
                  <div className="text-2xl font-bold mb-4">
                    Твой результат: <span className={score === 5 ? "text-[#2a9d8f]" : "text-[#f4a261]"}>{score} / 5</span>
                  </div>
                  <button 
                    className="bg-gray-200 hover:bg-gray-300 text-[#1a1a2e] px-8 py-3 rounded-xl font-bold transition-colors"
                    onClick={resetQuiz}
                  >
                    Пройти еще раз
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}
