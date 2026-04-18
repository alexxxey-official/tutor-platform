'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'

export default function GustarLesson() {
  const total = 25;
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_gustar', total, 0);
  const stats = getStats('cw');
  const correctCount = stats.correct;
  const pct = stats.pct;

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
        {example && (
          <>
            <span className="cursor-pointer text-[#e63946] mr-2" onClick={() => speakSpanish(example.split('(')[0])}>🔊</span>
            {example}
          </>
        )}
      </td>
    </tr>
  );

  // EXERCISE COMPONENTS
  const McqExercise = ({ id, num, problem, options, correctIdx, audioWord }) => {
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState('attempting');
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
      if (!loading && progress.cw?.[id]) {
        const item = progress.cw[id];
        setStatus(item.status || 'attempting');
        setAttempts(item.attempts || 0);
        if (item.value !== undefined) setSelected(parseInt(item.value));
      }
    }, [loading, progress.cw, id]);

    const check = () => {
      if (selected === null || status !== 'attempting') return;
      const curAttempts = attempts + 1;
      setAttempts(curAttempts);
      const isCorrect = selected === correctIdx;
      
      let newStatus = 'attempting';
      if (isCorrect) newStatus = 'correct';
      else if (curAttempts >= 2) newStatus = 'revealed';

      setStatus(newStatus);
      if (newStatus !== 'attempting') {
        updateProgress(id, 'cw', newStatus, curAttempts, String(selected));
      }
    };

    const isDone = status === 'correct' || status === 'revealed';

    return (
      <div className={`border-b border-dashed border-[#e5e0d5] py-6 flex flex-col gap-3 last:border-none transition-colors ${status === 'correct' ? 'bg-emerald-50/30' : status === 'revealed' ? 'bg-rose-50/30' : ''}`}>
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
            } else if (status === 'revealed' && idx === correctIdx) {
              btnClass += "border-[#2a9d8f] bg-[#f0faf8] text-[#2a9d8f]";
            } else if (status === 'revealed' && selected === idx) {
              btnClass += "border-[#e63946] bg-[#fff5f5] text-[#e63946] pointer-events-none opacity-70";
            } else if (selected === idx) {
              btnClass += "border-[#e63946] bg-[#fff5f5] text-[#1a1a2e]";
            } else {
              btnClass += "border-[#e5e0d5] hover:border-[#e63946] hover:bg-gray-50";
            }
            
            return (
              <button 
                key={idx} 
                onClick={() => { if(!isDone) { setSelected(idx); } }}
                className={btnClass}
                disabled={isDone}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {!isDone && (
            <button onClick={check} className="bg-[#1a1a2e] text-white rounded-lg px-5 py-2.5 text-[14px] font-bold w-fit mt-2 hover:bg-[#2d2d4e] transition-colors">
            Проверить
            </button>
        )}
        {status !== 'attempting' && (
          <div className={`mt-2 p-3 rounded-lg text-[14px] font-medium border-l-4 ${status === 'correct' ? 'bg-[#f0faf8] text-[#2a9d8f] border-[#2a9d8f]' : 'bg-[#fff5f5] text-[#e63946] border-[#e63946]'}`}>
            {status === 'correct' ? '✓ ¡Muy bien!' : `✗ Решение: ${options[correctIdx]}`}
          </div>
        )}
      </div>
    )
  }

  const DropdownExercise = ({ id, num, prefix, suffix, options, correctVal }) => {
    const [val, setVal] = useState('');
    const [status, setStatus] = useState('attempting');
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
      if (!loading && progress.cw?.[id]) {
        const item = progress.cw[id];
        setVal(item.value || '');
        setStatus(item.status || 'attempting');
        setAttempts(item.attempts || 0);
      }
    }, [loading, progress.cw, id]);

    const check = () => {
      if (!val || status !== 'attempting') return;
      const curAttempts = attempts + 1;
      setAttempts(curAttempts);
      const isCorrect = val === correctVal;
      
      let newStatus = 'attempting';
      if (isCorrect) newStatus = 'correct';
      else if (curAttempts >= 2) newStatus = 'revealed';

      setStatus(newStatus);
      if (newStatus !== 'attempting') {
        updateProgress(id, 'cw', newStatus, curAttempts, val);
      }
    }

    const isDone = status === 'correct' || status === 'revealed';

    let selectClass = "appearance-none bg-gray-50 border-[1.5px] rounded-lg py-1.5 pl-3 pr-8 font-mono text-[15px] font-bold outline-none transition-colors mx-2 cursor-pointer ";
    if (status === 'correct') selectClass += "border-[#2a9d8f] text-[#2a9d8f] bg-[#f0faf8]";
    else if (status === 'revealed') selectClass += "border-[#e63946] text-[#e63946] bg-[#fff5f5]";
    else selectClass += "border-[#e5e0d5] text-[#e63946] focus:border-[#e63946]";

    const arrowSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;

    return (
      <div className={`border-b border-dashed border-[#e5e0d5] py-6 flex flex-col gap-3 last:border-none ${status === 'correct' ? 'bg-emerald-50/20' : ''}`}>
        <div className="text-[16px] font-medium mb-1 flex items-center flex-wrap">
          {num} {prefix}
          <select 
            value={val} 
            onChange={e => setVal(e.target.value)}
            className={selectClass}
            style={{ backgroundImage: arrowSvg, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            disabled={isDone}
          >
            <option value="" disabled>выбери</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {suffix}
        </div>
        {!isDone && (
            <button onClick={check} className="bg-[#1a1a2e] text-white rounded-lg px-5 py-2.5 text-[14px] font-bold w-fit mt-2 hover:bg-[#2d2d4e] transition-colors">
            Проверить
            </button>
        )}
        {status === 'revealed' && (
          <div className="mt-2 p-3 rounded-lg text-[14px] font-medium border-l-4 bg-[#f0faf8] text-[#2a9d8f] border-[#2a9d8f]">
            ✓ Правильный ответ: {correctVal}
          </div>
        )}
      </div>
    )
  }

  const BuilderExercise = ({ id, num, problem, initialWords, correctAns }) => {
    const [bank, setBank] = useState(initialWords);
    const [zone, setZone] = useState([]);
    const [status, setStatus] = useState('attempting');
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
      if (!loading && progress.cw?.[id]) {
        const item = progress.cw[id];
        setStatus(item.status || 'attempting');
        setAttempts(item.attempts || 0);
        if ((item.status === 'correct' || item.status === 'revealed') && item.value) {
            const words = item.value.split(' ');
            setZone(words);
            let currentBank = [...initialWords];
            words.forEach(w => {
                const idx = currentBank.indexOf(w);
                if (idx > -1) currentBank.splice(idx, 1);
            });
            setBank(currentBank);
        }
      }
    }, [loading, progress.cw, id, initialWords]);

    const check = () => {
      if (status !== 'attempting') return;
      const curAttempts = attempts + 1;
      setAttempts(curAttempts);
      const userAns = zone.join(' ');
      const isCorrect = userAns === correctAns;
      
      let newStatus = 'attempting';
      if (isCorrect) newStatus = 'correct';
      else if (curAttempts >= 2) newStatus = 'revealed';

      setStatus(newStatus);
      if (newStatus !== 'attempting') {
        updateProgress(id, 'cw', newStatus, curAttempts, isCorrect ? userAns : correctAns);
        if (!isCorrect && curAttempts >= 2) {
            setZone(correctAns.split(' '));
            setBank([]);
        }
      }
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

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#f4a261] mb-3">
          🇪🇸 Урок 9 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Глагол GUSTAR<br />
          <em className="text-[#e63946] not-italic font-normal font-serif">и Еда</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Как сказать "Мне нравится", "Ей не нравится" и почему этот глагол ломает привычную логику. Изучаем еду и напитки!
        </p>
        <div className="absolute right-[-20px] top-[10px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          GUSTA
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 items-start relative">
          
          <div className="flex-1 w-full">
            <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
              <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
                ← На главную
              </Link>
              <a href="#theory" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#f4a261] hover:text-white">📖 Теория</a>
              <a href="#exercises-mcq" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Лексика (Еда)</a>
              <a href="#exercises-dropdown" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Gusta / Gustan</a>
              <a href="#exercises-drag" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🧩 Конструктор</a>
              <a href="#exercises-audio" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946]">🎧 Диктант</a>
            </nav>

            {/* THEORY */}
            <div id="theory">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#f4a261] my-12 mb-5">
                Теория
                <div className="w-[40px] h-[2px] bg-[#f4a261]"></div>
              </div>
              <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Как выражать симпатии</h2>

              <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
                <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
                <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">1. Еда и напитки (La comida y las bebidas)</h3>
                <p className="text-gray-700 text-[15px] mb-4">
                  Чтобы было что любить (или не любить), давай выучим базовые слова. Обращай внимание на артикли (el/la)!
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse text-[15px]">
                    <thead>
                      <tr>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Слово (Испанский)</th>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Перевод</th>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Пример</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AudioWord spanish="el pan" russian="хлеб" example="Comer pan (Есть хлеб)" />
                      <AudioWord spanish="la carne" russian="мясо" example="Carne con patatas (Мясо с картошкой)" />
                      <AudioWord spanish="el pescado" russian="рыба" example="Pescado fresco (Свежая рыба)" />
                      <AudioWord spanish="el agua" russian="вода" example="Beber agua (Пить воду)" />
                      <AudioWord spanish="el café" russian="кофе" example="Café con leche (Кофе с молоком)" />
                      <AudioWord spanish="el té" russian="чай" example="Té verde (Зеленый чай)" />
                      <AudioWord spanish="el zumo" russian="сок" example="Zumo de naranja (Апельсиновый сок)" />
                      <AudioWord spanish="la manzana" russian="яблоко" example="Manzana roja (Красное яблоко)" />
                      <AudioWord spanish="el queso" russian="сыр" example="Queso español (Испанский сыр)" />
                      <AudioWord spanish="el restaurante" russian="ресторан" example="Cenar en el restaurante (Ужинать в ресторане)" />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* GRAMMAR: GUSTAR */}
              <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
                <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
                <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">2. Глагол GUSTAR (Нравиться)</h3>
                <p className="text-gray-700 text-[15px] mb-4">
                  В испанском мы не говорим "Я люблю кофе" (Yo amo...). Мы говорим: <strong>"Мне нравится кофе"</strong> (Кофе нравится мне).
                  Сам предмет решает, какую форму примет глагол!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <span className="block font-bold mb-2 text-[#e63946]">Кому нравится? (Местоимения)</span>
                    <ul className="text-[15px] space-y-2">
                      <li><span className="font-mono bg-white px-2 py-1 rounded border">me</span> = мне</li>
                      <li><span className="font-mono bg-white px-2 py-1 rounded border">te</span> = тебе</li>
                      <li><span className="font-mono bg-white px-2 py-1 rounded border">le</span> = ему / ей / Вам</li>
                      <li><span className="font-mono bg-white px-2 py-1 rounded border">nos</span> = нам</li>
                      <li><span className="font-mono bg-white px-2 py-1 rounded border">os</span> = вам (ребятам)</li>
                      <li><span className="font-mono bg-white px-2 py-1 rounded border">les</span> = им / Вам (многим)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <span className="block font-bold mb-2 text-[#2a9d8f]">Нравится что? (Форма глагола)</span>
                    <ul className="text-[15px] space-y-4">
                      <li>
                        <strong>gusta</strong> — если предмет ОДИН или это ДЕЙСТВИЕ (инфинитив).<br/>
                        <i>Me gusta el té</i> (Мне нравится чай).<br/>
                        <i>Me gusta leer</i> (Мне нравится читать).
                      </li>
                      <li className="pt-2 border-t border-gray-200">
                        <strong>gustan</strong> — если предметов МНОГО.<br/>
                        <i>Me gustan las manzanas</i> (Мне нравятся яблоки).
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 mb-2 text-[14px] text-[#7c4a00]">
                  <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">⚠️ Важно (Усиление):</strong>
                  Часто испанцы добавляют "A mí, A ti, A María" в начале, чтобы подчеркнуть, КОМУ ИМЕННО это нравится. Если мы говорим про Марию, мы <strong>обязаны</strong> сказать это в начале, иначе никто не поймет, кто такие "le".<br/>
                  <i>A María le gusta el pan.</i> (Марии ей нравится хлеб).
                </div>
              </div>

            </div>

            {/* EXERCISES */}
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
              Огромная практика (25 заданий)
              <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
            </div>

            <div id="exercises-mcq" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 1: Еда и Напитки</h3>
                <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">Лексика</span>
              </div>
              <div className="px-6 py-2">
                <McqExercise id="q1" num="1." problem="Мясо" options={['el pan', 'la carne', 'el queso', 'el pescado']} correctIdx={1} />
                <McqExercise id="q2" num="2." problem="Рыба" options={['el pescado', 'el pollo', 'la manzana', 'el té']} correctIdx={0} />
                <McqExercise id="q3" num="3." problem="Хлеб" options={['el queso', 'el pan', 'el agua', 'la carne']} correctIdx={1} />
                <McqExercise id="q4" num="4." problem="Вода" options={['el zumo', 'el café', 'el té', 'el agua']} correctIdx={3} />
                <McqExercise id="q5" num="5." problem="Сок" options={['el café', 'el té', 'el zumo', 'el pan']} correctIdx={2} />
                <McqExercise id="q6" num="6." problem="Яблоко" options={['el plátano', 'la manzana', 'la naranja', 'la fresa']} correctIdx={1} />
                <McqExercise id="q7" num="7." problem="Сыр" options={['el pescado', 'la carne', 'el pan', 'el queso']} correctIdx={3} />
                <McqExercise id="q8" num="8." problem="Ресторан" options={['el hospital', 'el banco', 'el restaurante', 'el hotel']} correctIdx={2} />
              </div>
            </div>

            <div id="exercises-dropdown" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 2: Gusta или Gustan? (И местоимения)</h3>
                <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">Думай логически</span>
              </div>
              <div className="px-6 py-2">
                <DropdownExercise id="q9" num="9." prefix="A mí" suffix="gusta el café. (Мне нравится кофе)" options={['me', 'te', 'le']} correctVal="me" />
                <DropdownExercise id="q10" num="10." prefix="Me" suffix="las manzanas. (Мне нравятся яблоки)" options={['gusta', 'gustan']} correctVal="gustan" />
                <DropdownExercise id="q11" num="11." prefix="A nosotros" suffix="gusta el pan. (Нам нравится хлеб)" options={['nos', 'os', 'les']} correctVal="nos" />
                <DropdownExercise id="q12" num="12." prefix="Me" suffix="beber agua. (Мне нравится пить воду)" options={['gusta', 'gustan']} correctVal="gusta" />
                <DropdownExercise id="q13" num="13." prefix="¿Te" suffix="los gatos? (Тебе нравятся коты?)" options={['gusta', 'gustan']} correctVal="gustan" />
                <DropdownExercise id="q14" num="14." prefix="A María" suffix="gusta la carne. (Марии нравится мясо)" options={['me', 'te', 'le']} correctVal="le" />
              </div>
            </div>

            <div id="exercises-drag" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 3: Собери предложение</h3>
              </div>
              <div className="px-6 py-2">
                <BuilderExercise id="q15" num="15." problem="Мне нравится кофе." initialWords={['café', 'gusta', 'Me', 'el']} correctAns="Me gusta el café" />
                <BuilderExercise id="q16" num="16." problem="Тебе нравятся яблоки?" initialWords={['¿', 'las', 'Te', 'manzanas', 'gustan', '?']} correctAns="¿ Te gustan las manzanas ?" />
                <BuilderExercise id="q17" num="17." problem="Нам не нравится рыба." initialWords={['gusta', 'pescado', 'nos', 'No', 'el']} correctAns="No nos gusta el pescado" />
                <BuilderExercise id="q18" num="18." problem="Марии нравится читать." initialWords={['le', 'María', 'leer', 'A', 'gusta']} correctAns="A María le gusta leer" />
                <BuilderExercise id="q19" num="19." problem="Мне очень нравится этот ресторан." initialWords={['restaurante', 'este', 'gusta', 'Me', 'mucho']} correctAns="Me gusta mucho este restaurante" />
                <BuilderExercise id="q20" num="20." problem="Им не нравится вода." initialWords={['el', 'les', 'A', 'agua', 'no', 'gusta', 'ellos']} correctAns="A ellos no les gusta el agua" />
              </div>
            </div>

            <div id="exercises-audio" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a2e]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 4: Аудио-диктант</h3>
                <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">Слушай внимательно</span>
              </div>
              <div className="px-6 py-2">
                <McqExercise id="q21" num="21." problem="Какая фраза прозвучала?" audioWord="Me gusta el té" options={['Мне нравится кофе', 'Тебе нравится чай', 'Мне нравится чай', 'Нам нравится вода']} correctIdx={2} />
                <McqExercise id="q22" num="22." problem="Какая фраза прозвучала?" audioWord="No me gusta la carne" options={['Мне не нравится рыба', 'Мне не нравится мясо', 'Тебе не нравится курица', 'Ему нравится мясо']} correctIdx={1} />
                <McqExercise id="q23" num="23." problem="О чем спрашивает диктор?" audioWord="¿Te gusta el queso?" options={['Тебе нравится хлеб?', 'Вам нравится сыр?', 'Ей нравится рыба?', 'Тебе нравится сыр?']} correctIdx={3} />
                <McqExercise id="q24" num="24." problem="О ком идёт речь?" audioWord="A ella le gustan los gatos" options={['Мне нравятся коты', 'Тебе нравятся собаки', 'Ей нравятся коты', 'Ему нравятся коты']} correctIdx={2} />
                <McqExercise id="q25" num="25." problem="Какая фраза прозвучала?" audioWord="Me gusta comer pan" options={['Мне нравится пить воду', 'Мне нравится есть хлеб', 'Тебе нравится есть рыбу', 'Ему нравится покупать хлеб']} correctIdx={1} />
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
                  🎉 ¡Excelente! Теперь ты знаешь, как сказать "Мне нравится"!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
