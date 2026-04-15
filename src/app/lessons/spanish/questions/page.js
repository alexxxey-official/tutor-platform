'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function QuestionsLesson() {
  const [progress, setProgress] = useState({})
  const total = 23;
  const correctCount = Object.values(progress).filter(Boolean).length;
  const pct = (correctCount / total) * 100;

  const markCorrect = (id, isCorrect) => {
    setProgress(prev => ({ ...prev, [id]: isCorrect }))
  }

  const speakSpanish = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const AudioWord = ({ spanish, russian, example }) => (
    <tr>
      <td className="border border-[#e5e0d5] p-3 text-left">
        <span className="cursor-pointer hover:opacity-70 text-lg mr-2 inline-block align-middle" onClick={() => speakSpanish(spanish)} title="Прослушать">🔊</span>
        <span className="font-bold text-[#e63946]">{spanish}</span>
      </td>
      <td className="border border-[#e5e0d5] p-3 text-left text-gray-700">{russian}</td>
      <td className="border border-[#e5e0d5] p-3 text-left">
        <span className="cursor-pointer text-[#e63946] mr-2" onClick={() => speakSpanish(example.split('(')[0])}>🔊</span>
        {example}
      </td>
    </tr>
  );

  // EXERCISE COMPONENTS

  const McqExercise = ({ id, num, problem, options, correctIdx, audioWord }) => {
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState(null);

    const check = () => {
      if (selected === null) {
        alert("Сначала выбери вариант ответа!");
        return;
      }
      const isCorrect = selected === correctIdx;
      setStatus(isCorrect ? 'correct' : 'wrong');
      if (isCorrect) markCorrect(id, true);
    };

    return (
      <div className="border-b border-dashed border-[#e5e0d5] py-6 flex flex-col gap-3 last:border-none">
        <div className="flex items-center gap-3 text-[16px] font-medium mb-1">
          {num} {problem}
          {audioWord && (
            <button 
              onClick={() => speakSpanish(audioWord)}
              className="w-10 h-10 rounded-full bg-[#2a9d8f] text-white flex items-center justify-center text-lg hover:scale-105 transition-transform"
            >🔊</button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {options.map((opt, idx) => {
            let btnClass = "bg-white border-[1.5px] rounded-xl p-4 text-[15px] text-left transition-all font-sans flex items-center gap-3 ";
            if (status === 'correct' && selected === idx) {
              btnClass += "border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f] font-bold pointer-events-none";
            } else if (status === 'wrong' && selected === idx) {
              btnClass += "border-[#e63946] bg-[#fff5f5] text-[#e63946] pointer-events-none opacity-70";
            } else if (selected === idx) {
              btnClass += "border-[#e63946] bg-[#fff5f5] text-[#1a1a2e]";
            } else {
              btnClass += "border-[#e5e0d5] hover:border-[#e63946] hover:bg-gray-50";
            }
            
            return (
              <button 
                key={idx} 
                onClick={() => { setSelected(idx); setStatus(null); }}
                className={btnClass}
                disabled={status === 'correct'}
              >
                {opt}
              </button>
            )
          })}
        </div>
        <button onClick={check} className="bg-[#1a1a2e] text-white rounded-lg px-5 py-2.5 text-[14px] font-bold w-fit mt-2 hover:bg-[#2d2d4e] transition-colors">
          Проверить
        </button>
        {status && (
          <div className={`mt-2 p-3 rounded-lg text-[14px] font-medium border-l-4 ${status === 'correct' ? 'bg-[#f0faf8] text-[#2a9d8f] border-[#2a9d8f]' : 'bg-[#fff5f5] text-[#e63946] border-[#e63946]'}`}>
            {status === 'correct' ? '✓ Правильно!' : '✗ Неверно. Попробуй другой вариант.'}
          </div>
        )}
      </div>
    )
  }

  const DropdownExercise = ({ id, num, prefix, suffix, options, correctVal }) => {
    const [val, setVal] = useState('');
    const [status, setStatus] = useState(null);

    const check = () => {
      if (!val) return;
      const isCorrect = val === correctVal;
      setStatus(isCorrect ? 'correct' : 'wrong');
      if (isCorrect) markCorrect(id, true);
    }

    let selectClass = "appearance-none bg-gray-50 border-[1.5px] rounded-lg py-1.5 pl-3 pr-8 font-mono text-[15px] font-bold outline-none transition-colors mx-2 cursor-pointer ";
    if (status === 'correct') selectClass += "border-[#2a9d8f] text-[#2a9d8f] bg-[#f0faf8]";
    else if (status === 'wrong') selectClass += "border-[#e63946] text-[#e63946] bg-[#fff5f5]";
    else selectClass += "border-[#e5e0d5] text-[#e63946] focus:border-[#e63946]";

    const arrowSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;

    return (
      <div className="border-b border-dashed border-[#e5e0d5] py-6 flex flex-col gap-3 last:border-none">
        <div className="text-[16px] font-medium mb-1 flex items-center flex-wrap">
          {num} {prefix}
          <select 
            value={val} 
            onChange={e => { setVal(e.target.value); setStatus(null); }}
            className={selectClass}
            style={{ backgroundImage: arrowSvg, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            disabled={status === 'correct'}
          >
            <option value="" disabled>выбери</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {suffix}
        </div>
        <button onClick={check} className="bg-[#1a1a2e] text-white rounded-lg px-5 py-2.5 text-[14px] font-bold w-fit mt-2 hover:bg-[#2d2d4e] transition-colors">
          Проверить
        </button>
        {status && (
          <div className={`mt-2 p-3 rounded-lg text-[14px] font-medium border-l-4 ${status === 'correct' ? 'bg-[#f0faf8] text-[#2a9d8f] border-[#2a9d8f]' : 'bg-[#fff5f5] text-[#e63946] border-[#e63946]'}`}>
            {status === 'correct' ? '✓ Правильно!' : '✗ Ошибка. Подумай еще.'}
          </div>
        )}
      </div>
    )
  }

  const BuilderExercise = ({ id, num, problem, initialWords, correctAns }) => {
    const [bank, setBank] = useState(initialWords);
    const [zone, setZone] = useState([]);
    const [status, setStatus] = useState(null);

    const check = () => {
      const userAns = zone.join(' ');
      const isCorrect = userAns === correctAns;
      setStatus(isCorrect ? 'correct' : 'wrong');
      if (isCorrect) markCorrect(id, true);
    }

    const moveToZone = (word, idx) => {
      if (status === 'correct') return;
      setBank(bank.filter((_, i) => i !== idx));
      setZone([...zone, word]);
      setStatus(null);
    }

    const moveToBank = (word, idx) => {
      if (status === 'correct') return;
      setZone(zone.filter((_, i) => i !== idx));
      setBank([...bank, word]);
      setStatus(null);
    }

    return (
      <div className="border-b border-dashed border-[#e5e0d5] py-6 flex flex-col gap-3 last:border-none w-full">
        <div className="text-[16px] font-medium mb-2">{num} {problem}</div>
        
        <div className="w-full">
          <div className={`min-h-[60px] bg-gray-50 border-2 border-dashed rounded-xl p-3 flex flex-wrap gap-2 items-center mb-4 transition-colors ${status === 'correct' ? 'border-[#2a9d8f] bg-[#f0faf8]' : status === 'wrong' ? 'border-[#e63946] bg-[#fff5f5]' : 'border-[#e5e0d5]'}`}>
            {zone.map((word, idx) => (
              <div 
                key={`zone-${idx}`} 
                onClick={() => moveToBank(word, idx)}
                className="bg-white border-[1.5px] border-[#e5e0d5] rounded-lg px-4 py-2 text-[15px] font-medium cursor-pointer shadow-sm hover:scale-95 transition-transform select-none"
              >
                {word}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 min-h-[50px]">
            {bank.map((word, idx) => (
              <div 
                key={`bank-${idx}`} 
                onClick={() => moveToZone(word, idx)}
                className="bg-white border-[1.5px] border-[#e5e0d5] rounded-lg px-4 py-2 text-[15px] font-medium cursor-pointer shadow-sm hover:scale-105 transition-transform select-none"
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        <button onClick={check} className="bg-[#1a1a2e] text-white rounded-lg px-5 py-2.5 text-[14px] font-bold w-fit mt-2 hover:bg-[#2d2d4e] transition-colors">
          Проверить
        </button>
        {status && (
          <div className={`mt-2 p-3 rounded-lg text-[14px] font-medium border-l-4 ${status === 'correct' ? 'bg-[#f0faf8] text-[#2a9d8f] border-[#2a9d8f]' : 'bg-[#fff5f5] text-[#e63946] border-[#e63946]'}`}>
            {status === 'correct' ? '✓ Идеально собрано!' : '✗ Неправильный порядок. Попробуй переставить слова.'}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#e63946] mb-3">
          🇪🇸 Урок 6 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Вопросы и<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">Порядок слов</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Учимся строить испанские предложения. Где ставить вопросительные слова, как использовать прилагательные и почему порядок слов имеет значение.
        </p>
        <div className="absolute right-[-20px] top-[10px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          ¿?
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 items-start relative">
          
          <div className="flex-1 w-full">
            <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
              <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
                ← На главную
              </Link>
              <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">📖 Теория</a>
              <a href="#exercises-mcq" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Выбор ответа</a>
              <a href="#exercises-dropdown" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Подстановка</a>
              <a href="#exercises-drag" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🧩 Конструктор</a>
            </nav>

            {/* THEORY */}
            <div id="theory">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
                Теория
                <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
              </div>
              <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Анатомия испанской фразы</h2>

              <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
                <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
                <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">1. Вопросы (¿?)</h3>
                <p className="text-gray-700 text-[15px] mb-4">
                  Перед вопросом всегда ставится <strong>перевёрнутый вопросительный знак (¿)</strong>, а перед восклицанием — <strong>(¡)</strong>.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse text-[15px]">
                    <thead>
                      <tr>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Слово</th>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Перевод</th>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пример</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AudioWord spanish="¿Qué?" russian="Что? / Какой?" example="¿Qué es esto? (Что это?)" />
                      <AudioWord spanish="¿Quién?" russian="Кто?" example="¿Quién es él? (Кто он?)" />
                      <AudioWord spanish="¿Dónde?" russian="Где?" example="¿Dónde vives? (Где ты живешь?)" />
                      <AudioWord spanish="¿Cuándo?" russian="Когда?" example="¿Cuándo trabajas? (Когда ты работаешь?)" />
                      <AudioWord spanish="¿Por qué?" russian="Почему?" example="¿Por qué estudias español? (Почему ты учишь испанский?)" />
                      <AudioWord spanish="¿Cómo?" russian="Как?" example="¿Cómo estás? (Как ты?)" />
                      <AudioWord spanish="¿Cuánto?" russian="Сколько?" example="¿Cuánto cuesta? (Сколько стоит?)" />
                    </tbody>
                  </table>
                </div>

                <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 my-6 text-[14px] text-[#7c4a00]">
                  <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">💡 Правило ударений:</strong>
                  Все вопросительные слова <strong>всегда</strong> пишутся с графическим ударением (Tilde): <i>qué, dónde, cómo</i>. Если ударения нет, то они превращаются в союзы: "что", "где", "как" внутри обычного предложения.
                </div>
              </div>

              <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
                <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
                <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">2. Порядок слов (Прилагательные в конце!)</h3>
                <p className="text-gray-700 text-[15px] mb-4">
                  В русском языке мы говорим "Красная машина" (сначала признак, потом предмет). В испанском всё наоборот: <strong>Машина красная.</strong>
                </p>
                <ul className="ml-5 leading-[1.8] list-disc mb-6 text-[15px] text-gray-700">
                  <li><i>El coche rojo</i> (Машина красная)</li>
                  <li><i>La chica guapa</i> (Девушка красивая)</li>
                  <li><i>Un libro interesante</i> (Книга интересная)</li>
                </ul>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-[15px] mb-3">
                  <span className="font-bold text-[#e63946] block mb-1">Порядок в утверждении:</span>
                  Кто (Субъект) + Что делает (Глагол) + Детали (Объект/Место).<br/>
                  <i>Yo como una manzana (Я ем яблоко).</i>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-[15px]">
                  <span className="font-bold text-[#2a9d8f] block mb-1">Порядок в вопросе:</span>
                  Вопросительное слово + Глагол + Кто.<br/>
                  <i>¿Dónde vive María? (Где живёт Мария?)</i>
                </div>
              </div>
            </div>

            {/* EXERCISES */}
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
              Практика
              <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
            </div>
            <p className="text-[14px] text-gray-500 mb-5">
              Отработаем теорию на большой подборке заданий.
            </p>

            <div id="exercises-mcq" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 1: Выбор перевода</h3>
              </div>
              <div className="px-6 py-2">
                <McqExercise id="q1" num="1." problem="Как спросить: 'Где находится банк?'" options={['¿Cuándo está el banco?', '¿Dónde está el banco?', '¿Qué es el banco?', '¿Cómo está el banco?']} correctIdx={1} />
                <McqExercise id="q2" num="2." problem="Как перевести фразу: 'La casa grande'?" options={['Красный дом', 'Маленький дом', 'Большой дом', 'Старый дом']} correctIdx={2} />
                <McqExercise id="q3" num="3." problem="Как спросить: 'Почему ты здесь?'" options={['¿Por qué estás aquí?', '¿Qué estás aquí?', '¿Dónde estás aquí?', '¿Cómo estás aquí?']} correctIdx={0} />
                <McqExercise id="q4" num="4." problem="Как спросить: 'Сколько это стоит?'" options={['¿Cómo cuesta?', '¿Qué cuesta?', '¿Cuándo cuesta?', '¿Cuánto cuesta?']} correctIdx={3} />
                <McqExercise id="q5" num="5." problem="'Красная машина' — это..." options={['El rojo coche', 'El coche rojo', 'La coche roja', 'La roja coche']} correctIdx={1} />
                <McqExercise id="q6" num="6." problem="'Интересная книга' — это..." options={['Un interesante libro', 'Un libro interesante', 'Una libro interesante', 'Interesante un libro']} correctIdx={1} />
              </div>
            </div>

            <div id="exercises-dropdown" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 2: Подстановка</h3>
              </div>
              <div className="px-6 py-2">
                <DropdownExercise id="q7" num="7." prefix="¿" suffix="hora es? (Который час?)" options={['dónde', 'qué', 'cuándo']} correctVal="qué" />
                <DropdownExercise id="q8" num="8." prefix="¿" suffix="estudias español? (Почему ты учишь испанский?)" options={['quién', 'dónde', 'por qué']} correctVal="por qué" />
                <DropdownExercise id="q9" num="9." prefix="¿De" suffix="eres? (Откуда ты родом?)" options={['qué', 'dónde', 'cuándo']} correctVal="dónde" />
                <DropdownExercise id="q10" num="10." prefix="¿" suffix="es él? - Он мой брат. (Кто он?)" options={['quién', 'qué', 'cómo']} correctVal="quién" />
                <DropdownExercise id="q11" num="11." prefix="¿" suffix="estás hoy? (Как ты сегодня?)" options={['cómo', 'cuánto', 'qué']} correctVal="cómo" />
                <DropdownExercise id="q12" num="12." prefix="¿" suffix="trabajas? - Утром. (Когда ты работаешь?)" options={['cuándo', 'dónde', 'por qué']} correctVal="cuándo" />
              </div>
            </div>

            <div id="exercises-drag" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 3: Собери предложение</h3>
              </div>
              <div className="px-6 py-2">
                <BuilderExercise id="q13" num="13." problem="У меня есть красная машина." initialWords={['rojo', 'un', 'Yo', 'tengo', 'coche']} correctAns="Yo tengo un coche rojo" />
                <BuilderExercise id="q14" num="14." problem="Где живет Мария?" initialWords={['María', '¿', 'vive', 'Dónde', '?']} correctAns="¿ Dónde vive María ?" />
                <BuilderExercise id="q15" num="15." problem="Музей большой и старый." initialWords={['viejo', 'es', 'grande', 'El', 'museo', 'y']} correctAns="El museo es grande y viejo" />
                <BuilderExercise id="q16" num="16." problem="Когда ты работаешь в банке?" initialWords={['trabajas', '¿', 'el', 'en', 'banco', 'Cuándo', '?']} correctAns="¿ Cuándo trabajas en el banco ?" />
                <BuilderExercise id="q17" num="17." problem="Мой брат — хороший студент." initialWords={['bueno', 'Mi', 'estudiante', 'es', 'un', 'hermano']} correctAns="Mi hermano es un estudiante bueno" />
                <BuilderExercise id="q18" num="18." problem="Почему ты не ешь мясо?" initialWords={['carne', '¿', 'no', 'Por', 'comes', 'qué', '?']} correctAns="¿ Por qué no comes carne ?" />
              </div>
            </div>

            <div id="exercises-audio" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a2e]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 4: Аудио-диктант</h3>
              </div>
              <div className="px-6 py-2">
                <McqExercise id="q19" num="19." problem="Какое слово произнесено?" audioWord="¿Quién?" options={['¿Cién?', '¿Kién?', '¿Quién?', '¿Gién?']} correctIdx={2} />
                <McqExercise id="q20" num="20." problem="Какое слово произнесено?" audioWord="¿Cuándo?" options={['¿Cuándo?', '¿Cuánto?', '¿Kuando?', '¿Cómdo?']} correctIdx={0} />
                <McqExercise id="q21" num="21." problem="Какое слово произнесено?" audioWord="¿Cómo?" options={['¿Qué?', '¿Cómo?', '¿Dónde?', '¿Kómo?']} correctIdx={1} />
                <McqExercise id="q22" num="22." problem="Какое слово произнесено?" audioWord="¿Por qué?" options={['¿Porque?', '¿Porke?', '¿Porqué?', '¿Por qué?']} correctIdx={3} />
                <McqExercise id="q23" num="23." problem="Какое слово произнесено?" audioWord="¿Dónde?" options={['¿Dónde?', '¿Donde?', '¿Dande?', '¿Cuando?']} correctIdx={0} />
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR (PROGRESS) */}
          <div className="md:w-[280px] w-full flex-shrink-0 md:sticky md:top-24 mb-8 mt-8">
            <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-[15px]">Твой прогресс</span>
                <span className="font-bold text-[#1a1a2e] bg-gray-100 px-3 py-1 rounded-full text-sm">{correctCount} / {total}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                <div className="h-full bg-[#e63946] rounded-full transition-all duration-400 ease-out" style={{ width: `${pct}%` }}></div>
              </div>
              {pct === 100 && (
                <div className="mt-4 p-3 bg-[#f0faf8] text-[#2a9d8f] font-bold text-center rounded-lg border border-[#2a9d8f]/30 text-sm">
                  🎉 ¡Felicidades! Ты отлично справился!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
