'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'

export default function FamilyLesson() {
  const total = 25;
  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_family', total, 0);
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
        <span className="cursor-pointer text-[#e63946] mr-2" onClick={() => speakSpanish(example.split('(')[0])}>🔊</span>
        {example}
      </td>
    </tr>
  );

  const McqExercise = ({ id, num, problem, options, correctIdx, audioWord }) => {
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
      if (!loading && progress.cw?.[id]) {
        const item = progress.cw[id];
        if (item.status === 'correct') {
            setStatus('correct');
            setSelected(parseInt(item.value || correctIdx));
        } else if (item.status === 'wrong') {
            setStatus('wrong');
            setSelected(parseInt(item.value));
        }
      }
    }, [loading, progress.cw, id, correctIdx]);

    const check = () => {
      if (selected === null) {
        alert("Сначала выбери вариант ответа!");
        return;
      }
      const isCorrect = selected === correctIdx;
      setStatus(isCorrect ? 'correct' : 'wrong');
      updateProgress(id, 'cw', isCorrect ? 'correct' : 'wrong', 1, String(selected));
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

    useEffect(() => {
      if (!loading && progress.cw?.[id]) {
        const item = progress.cw[id];
        setVal(item.value || '');
        setStatus(item.status);
      }
    }, [loading, progress.cw, id]);

    const check = () => {
      if (!val) return;
      const isCorrect = val === correctVal;
      setStatus(isCorrect ? 'correct' : 'wrong');
      updateProgress(id, 'cw', isCorrect ? 'correct' : 'wrong', 1, val);
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
            {status === 'correct' ? '✓ Правильно!' : '✗ Ошибка. Подумай еще раз.'}
          </div>
        )}
      </div>
    )
  }

  const BuilderExercise = ({ id, num, problem, initialWords, correctAns }) => {
    const [bank, setBank] = useState(initialWords);
    const [zone, setZone] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
      if (!loading && progress.cw?.[id]) {
        const item = progress.cw[id];
        if (item.status === 'correct' && item.value) {
            setStatus('correct');
            const words = item.value.split(' ');
            setZone(words);
            // Filter bank
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
      const userAns = zone.join(' ');
      const isCorrect = userAns === correctAns;
      setStatus(isCorrect ? 'correct' : 'wrong');
      updateProgress(id, 'cw', isCorrect ? 'correct' : 'wrong', 1, userAns);
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
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#e63946] mb-3">
          🇪🇸 Урок 8 · Грамматика A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Семья и<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">Внешность</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Как рассказать о своих родственниках, описать, как они выглядят, и правильно сказать «мой», «твой» или «наш».
        </p>
        <div className="absolute right-[-20px] top-[10px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          FAMILIA
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
              <a href="#exercises-mcq" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 1 (Тест)</a>
              <a href="#exercises-dropdown" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🎯 Блок 2 (Окончания)</a>
              <a href="#exercises-drag" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946] hover:text-white">🧩 Блок 3 (Конструктор)</a>
              <a href="#exercises-audio" className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#e63946]">🎧 Аудио-Диктант</a>
            </nav>

            {/* THEORY */}
            <div id="theory">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
                Теория
                <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
              </div>
              <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Чьё это? И как они выглядят?</h2>

              {/* VOCAB: FAMILY */}
              <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
                <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#e63946]"></div>
                <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">1. La familia (Семья)</h3>
                <p className="text-gray-700 text-[15px] mb-4">
                  В испанском языке мужской и женский род в семье образуют пары. А если мы говорим о них во множественном числе (например, "родители"), мы берём <strong>слово мужского рода и ставим -s</strong>.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse text-[15px]">
                    <thead>
                      <tr>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Мужчина (el)</th>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Женщина (la)</th>
                        <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Вместе (los)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('el padre')}>🔊</span> el padre (отец)</td>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('la madre')}>🔊</span> la madre (мать)</td>
                        <td className="border border-[#e5e0d5] p-3 font-bold"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('los padres')}>🔊</span> los padres (родители)</td>
                      </tr>
                      <tr>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('el hermano')}>🔊</span> el hermano (брат)</td>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('la hermana')}>🔊</span> la hermana (сестра)</td>
                        <td className="border border-[#e5e0d5] p-3 font-bold"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('los hermanos')}>🔊</span> los hermanos (братья и сестры)</td>
                      </tr>
                      <tr>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('el hijo')}>🔊</span> el hijo (сын)</td>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('la hija')}>🔊</span> la hija (дочь)</td>
                        <td className="border border-[#e5e0d5] p-3 font-bold"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('los hijos')}>🔊</span> los hijos (дети)</td>
                      </tr>
                      <tr>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('el abuelo')}>🔊</span> el abuelo (дедушка)</td>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('la abuela')}>🔊</span> la abuela (бабушка)</td>
                        <td className="border border-[#e5e0d5] p-3 font-bold"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('los abuelos')}>🔊</span> los abuelos (бабушка и дедушка)</td>
                      </tr>
                      <tr>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('el tío')}>🔊</span> el tío (дядя)</td>
                        <td className="border border-[#e5e0d5] p-3"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('la tía')}>🔊</span> la tía (тётя)</td>
                        <td className="border border-[#e5e0d5] p-3 font-bold"><span className="cursor-pointer text-[#e63946]" onClick={() => speakSpanish('los tíos')}>🔊</span> los tíos (дяди и тёти)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* GRAMMAR: POSSESSIVES */}
              <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
                <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
                <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">2. Притяжательные местоимения (Чьё?)</h3>
                <p className="text-gray-700 text-[15px] mb-4">
                  В испанском слова "мой, твой, его" <strong>должны совпадать в числе</strong> с тем предметом, о котором мы говорим! 
                  Если предмет один — говорим <i>mi</i>. Если предметов много — добавляем "s": <i>mis</i>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <span className="block font-bold mb-2">Один предмет (Singular)</span>
                    <ul className="text-[15px] space-y-1">
                      <li><strong>mi</strong> (мой/моя)</li>
                      <li><strong>tu</strong> (твой/твоя)</li>
                      <li><strong>su</strong> (его/её/их/Ваш)</li>
                      <li><strong>nuestro / nuestra</strong> (наш / наша) <span className="text-xs text-gray-500">← Меняется род!</span></li>
                      <li><strong>vuestro / vuestra</strong> (ваш / ваша)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <span className="block font-bold mb-2">Много предметов (Plural)</span>
                    <ul className="text-[15px] space-y-1">
                      <li><strong>mis</strong> (мои) — <i>mis amigos</i></li>
                      <li><strong>tus</strong> (твои) — <i>tus gatos</i></li>
                      <li><strong>sus</strong> (его/её/их/Ваши) — <i>sus hijos</i></li>
                      <li><strong>nuestros / nuestras</strong> (наши)</li>
                      <li><strong>vuestros / vuestras</strong> (ваши)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 mb-2 text-[14px] text-[#7c4a00]">
                  <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">⚠️ Важно:</strong>
                  Местоимение <strong>su</strong> — это шпион. Оно может значить "его", "её", "их" или вежливое "Ваш". Поймём мы это только по контексту!<br/>
                  <i>Su casa</i> = Его дом / Её дом / Их дом / Ваш дом.
                </div>
              </div>

              {/* GRAMMAR: DESCRIPTIONS */}
              <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
                <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
                <h3 className="font-bold text-[20px] mb-3 unbounded text-[#1a1a2e]">3. Описание внешности (SER vs TENER)</h3>
                <p className="text-gray-700 text-[15px] mb-4">
                  Когда мы описываем человека в целом (какой он есть) — мы используем глагол <strong>SER (быть)</strong>. А когда говорим о том, что у него "приклеено" к телу (волосы, глаза, борода) — используем <strong>TENER (иметь)</strong>.
                </p>
                
                <ul className="ml-5 leading-[1.8] list-disc mb-6 text-[15px] text-gray-700">
                  <li><strong className="text-[#e63946]">SER (быть):</strong> alto (высокий), bajo (низкий), rubio (блондин), moreno (брюнет/смуглый), delgado (худой), gordo (толстый), pelirrojo (рыжий).</li>
                  <br/>
                  <li><strong className="text-[#2a9d8f]">TENER (иметь):</strong><br/>
                    - <i>el pelo largo / corto</i> (длинные / короткие волосы)<br/>
                    - <i>el pelo liso / rizado</i> (прямые / кудрявые волосы)<br/>
                    - <i>los ojos azules / verdes / marrones</i> (голубые / зеленые / карие глаза)<br/>
                    - <i>barba / bigote</i> (борода / усы)
                  </li>
                </ul>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-[15px]">
                  <span className="font-bold text-[#1a1a2e] block mb-1">Пример:</span>
                  Mi padre <strong>es</strong> alto y moreno. Él <strong>tiene</strong> los ojos marrones y <strong>tiene</strong> barba.<br/>
                  <i>(Мой папа высокий и брюнет. У него карие глаза и у него есть борода).</i>
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
                <h3 className="text-[16px] font-bold m-0">Блок 1: Семья и Внешность</h3>
                <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">Выбери правильный перевод</span>
              </div>
              <div className="px-6 py-2">
                <McqExercise id="q1" num="1." problem="Отец" options={['el tío', 'el padre', 'el abuelo', 'el hijo']} correctIdx={1} />
                <McqExercise id="q2" num="2." problem="Дедушка и Бабушка (вместе)" options={['los abuelos', 'los padres', 'los hermanos', 'los tíos']} correctIdx={0} />
                <McqExercise id="q3" num="3." problem="Мои братья и сестры" options={['mis hijos', 'mi hermano', 'mis hermanos', 'los primos']} correctIdx={2} />
                <McqExercise id="q4" num="4." problem="Мой кузен (двоюродный брат)" options={['mi sobrino', 'mi hermano', 'mi hijo', 'mi primo']} correctIdx={3} />
                <McqExercise id="q5" num="5." problem="Блондин" options={['moreno', 'rubio', 'pelirrojo', 'delgado']} correctIdx={1} />
                <McqExercise id="q6" num="6." problem="Короткие волосы" options={['el pelo liso', 'el pelo largo', 'el pelo rizado', 'el pelo corto']} correctIdx={3} />
                <McqExercise id="q7" num="7." problem="У него карие глаза" options={['Tiene los ojos verdes', 'Es los ojos marrones', 'Tiene los ojos marrones', 'Tiene el pelo marrón']} correctIdx={2} />
                <McqExercise id="q8" num="8." problem="Она худая и высокая" options={['Ella es gorda y baja', 'Ella es delgada y alta', 'Ella tiene delgada y alta', 'Ella es morena y alta']} correctIdx={1} />
              </div>
            </div>

            <div id="exercises-dropdown" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f4a261]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 2: Окончания местоимений (mi vs mis)</h3>
                <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">Следи за числом!</span>
              </div>
              <div className="px-6 py-2">
                <DropdownExercise id="q9" num="9." prefix="" suffix="madre es doctora. (Моя мама — врач)" options={['mi', 'mis', 'tu']} correctVal="mi" />
                <DropdownExercise id="q10" num="10." prefix="¿Dónde viven" suffix="abuelos? (Где живут твои бабушка и дедушка?)" options={['tu', 'tus', 'su']} correctVal="tus" />
                <DropdownExercise id="q11" num="11." prefix="" suffix="padres son simpáticos. (Его родители милые)" options={['su', 'sus', 'mis']} correctVal="sus" />
                <DropdownExercise id="q12" num="12." prefix="" suffix="familia es grande. (Наша семья большая)" options={['nuestro', 'nuestra', 'nuestros']} correctVal="nuestra" />
                <DropdownExercise id="q13" num="13." prefix="" suffix="amigos estudian ruso. (Наши друзья учат русский)" options={['nuestro', 'nuestros', 'nuestras']} correctVal="nuestros" />
                <DropdownExercise id="q14" num="14." prefix="" suffix="tío trabaja en un banco. (Её дядя работает в банке)" options={['su', 'sus', 'tu']} correctVal="su" />
              </div>
            </div>

            <div id="exercises-drag" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 3: Собери предложение</h3>
              </div>
              <div className="px-6 py-2">
                <BuilderExercise id="q15" num="15." problem="Моя сестра — блондинка." initialWords={['rubia', 'Mi', 'es', 'hermana']} correctAns="Mi hermana es rubia" />
                <BuilderExercise id="q16" num="16." problem="У твоего брата зелёные глаза." initialWords={['Tu', 'los', 'verdes', 'hermano', 'tiene', 'ojos']} correctAns="Tu hermano tiene los ojos verdes" />
                <BuilderExercise id="q17" num="17." problem="Наши дети не высокие." initialWords={['no', 'hijos', 'Nuestros', 'son', 'altos']} correctAns="Nuestros hijos no son altos" />
                <BuilderExercise id="q18" num="18." problem="Его отец имеет бороду и усы." initialWords={['bigote', 'y', 'tiene', 'padre', 'barba', 'Su']} correctAns="Su padre tiene barba y bigote" />
                <BuilderExercise id="q19" num="19." problem="Где твои родители?" initialWords={['¿', 'padres', 'Dónde', 'tus', 'están', '?']} correctAns="¿ Dónde están tus padres ?" />
                <BuilderExercise id="q20" num="20." problem="Моя мама имеет кудрявые волосы." initialWords={['rizado', 'madre', 'el', 'tiene', 'pelo', 'Mi']} correctAns="Mi madre tiene el pelo rizado" />
              </div>
            </div>

            <div id="exercises-audio" className="bg-white border border-[#e5e0d5] rounded-2xl overflow-hidden mb-8 shadow-sm">
              <div className="px-6 py-4 flex items-center gap-3 border-b border-[#e5e0d5] bg-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a2e]"></div>
                <h3 className="text-[16px] font-bold m-0">Блок 4: Аудио-диктант</h3>
                <span className="ml-auto text-[12px] text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm hidden sm:inline-block">Включи звук!</span>
              </div>
              <div className="px-6 py-2">
                <McqExercise id="q21" num="21." problem="Кого упомянул диктор?" audioWord="El abuelo" options={['Дядя', 'Дедушка', 'Отец', 'Брат']} correctIdx={1} />
                <McqExercise id="q22" num="22." problem="О ком идёт речь?" audioWord="La hija" options={['Тётя', 'Бабушка', 'Сестра', 'Дочь']} correctIdx={3} />
                <McqExercise id="q23" num="23." problem="Какая деталь внешности прозвучала?" audioWord="Rubio" options={['Брюнет', 'Блондин', 'Толстый', 'Низкий']} correctIdx={1} />
                <McqExercise id="q24" num="24." problem="Какая деталь внешности прозвучала?" audioWord="Pelo rizado" options={['Прямые волосы', 'Карие глаза', 'Кудрявые волосы', 'Борода']} correctIdx={2} />
                <McqExercise id="q25" num="25." problem="Какая фраза прозвучала?" audioWord="Tus padres son altos" options={['Твои родители высокие', 'Мои родители низкие', 'Его родители толстые', 'Её брат высокий']} correctIdx={0} />
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
                  🎉 ¡Genial! Ты выучил семью и местоимения!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
