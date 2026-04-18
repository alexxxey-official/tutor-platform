'use client'
import { useState, useEffect } from 'react';

/**
 * Универсальный компонент для заданий v2.2 (Refined UI & Logic)
 */
export default function Exercise({ 
  id, 
  mode, 
  type = 'text', 
  correctAnswer, 
  options = [], 
  solution, 
  hint, 
  progressItem, 
  onUpdate,
  maxAttempts: customMaxAttempts,
  placeholder = "Введите ответ...",
  label = "" 
}) {
  const maxAttempts = customMaxAttempts || (mode === 'cw' ? 2 : 3);
  const [input, setInput] = useState('');
  const [localAttempts, setLocalAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null); 
  const [isShaking, setIsShaking] = useState(false);

  // Builder state
  const [builderBank, setBuilderBank] = useState([]);
  const [builderZone, setBuilderZone] = useState([]);

  useEffect(() => {
    if (type === 'builder' && options.length > 0) {
      setBuilderBank(options);
    }
  }, [type, options]);

  useEffect(() => {
    if (progressItem) {
      const val = progressItem.value || '';
      setInput(val);
      setLocalAttempts(progressItem.attempts || 0);
      setFeedback(progressItem.status);
      
      if (type === 'builder' && val) {
        const words = val.split(' ');
        setBuilderZone(words);
        let currentBank = [...options];
        words.forEach(w => {
          const idx = currentBank.indexOf(w);
          if (idx > -1) currentBank.splice(idx, 1);
        });
        setBuilderBank(currentBank);
      }
    }
  }, [progressItem, type, options]);

  const normalize = (s) => s.toString().toLowerCase().replace(/\s+/g,' ').trim();

  const checkAnswer = (customVal = null) => {
    if (feedback === 'correct' || feedback === 'revealed') return;

    const valToCheck = customVal !== null ? customVal : input;
    const isCorrect = normalize(valToCheck) === normalize(correctAnswer);
    const newAttempts = localAttempts + 1;
    setLocalAttempts(newAttempts);

    if (isCorrect) {
      setFeedback('correct');
      onUpdate(id, mode, 'correct', newAttempts, valToCheck);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      if (newAttempts >= maxAttempts) {
        setFeedback('revealed');
        if (type === 'builder') setBuilderZone(correctAnswer.split(' '));
        onUpdate(id, mode, 'revealed', newAttempts, valToCheck);
      } else {
        setFeedback('attempting'); // Sync with DB status
        onUpdate(id, mode, 'attempting', newAttempts, valToCheck);
        if (newAttempts >= 1) setShowHint(true);
      }
    }
  };

  const handleBuilderClick = (word, fromBank) => {
    if (isLocked) return;
    let newZone, newBank;
    if (fromBank) {
      newZone = [...builderZone, word];
      newBank = builderBank.filter((w, i) => i !== builderBank.indexOf(word));
    } else {
      newBank = [...builderBank, word];
      newZone = builderZone.filter((w, i) => i !== builderZone.lastIndexOf(word));
    }
    setBuilderZone(newZone);
    setBuilderBank(newBank);
    setInput(newZone.join(' '));
  };

  const isLocked = feedback === 'correct' || feedback === 'revealed';
  const isError = feedback === 'attempting' && localAttempts > 0;

  return (
    <div className={`p-5 mb-6 rounded-2xl border-2 transition-all duration-300 ${isShaking ? 'animate-shake' : ''} ${
      feedback === 'correct' ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 
      feedback === 'revealed' ? 'border-orange-500 bg-orange-50' : 
      isError ? 'border-amber-400 bg-amber-50 shadow-md scale-[1.01]' : 'border-slate-200 bg-white'
    }`}>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>

      <div className="flex flex-col gap-4">
        {label && (
          <div className="text-lg md:text-xl font-bold text-slate-800 leading-snug">
            {label}
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          {type === 'text' && (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked}
                placeholder={placeholder}
                className={`flex-1 p-3.5 text-lg rounded-xl border-2 focus:outline-none transition-all ${
                  isLocked ? 'bg-slate-100 border-slate-200 text-slate-500' : 
                  isError ? 'border-amber-300 focus:border-amber-500 bg-white' : 'border-slate-200 focus:border-indigo-400 bg-white'
                }`}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              />
              {!isLocked && (
                <button 
                  onClick={() => checkAnswer()} 
                  className="px-8 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-black uppercase tracking-widest text-xs shadow-lg active:scale-95"
                >
                  Check
                </button>
              )}
            </div>
          )}

          {type === 'mcq' && (
            <div className="grid grid-cols-1 gap-2.5">
              {options.map((opt, i) => (
                <button
                  key={i}
                  disabled={isLocked}
                  onClick={() => { setInput(opt); checkAnswer(opt); }}
                  className={`p-4 text-left rounded-xl border-2 transition-all text-lg font-semibold ${
                    input === opt && isError ? 'border-amber-400 bg-amber-100/50' : 
                    input === opt ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                  } ${isLocked && opt === correctAnswer ? 'border-emerald-500 bg-emerald-100 text-emerald-900 shadow-inner' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {type === 'dropdown' && (
            <div className="flex gap-3 items-center">
              <select
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked}
                className={`p-3.5 text-lg rounded-xl border-2 outline-none transition-all flex-1 md:flex-none md:min-w-[200px] ${
                  isError ? 'border-amber-300 bg-white' : 'border-slate-200 focus:border-indigo-400 bg-white'
                }`}
              >
                <option value="">Выберите вариант...</option>
                {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {!isLocked && (
                <button onClick={() => checkAnswer()} className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-black uppercase tracking-widest text-xs shadow-lg">Check</button>
              )}
            </div>
          )}

          {type === 'builder' && (
            <div className="flex flex-col gap-5">
              <div className={`min-h-[70px] p-4 bg-white border-2 border-dashed rounded-2xl flex flex-wrap gap-2.5 transition-colors ${
                isError ? 'border-amber-400 bg-amber-50/30' : 
                isLocked ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
              }`}>
                {builderZone.map((word, i) => (
                  <button key={i} onClick={() => handleBuilderClick(word, false)} disabled={isLocked} className="px-5 py-2 bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:border-indigo-400 transition-all font-bold text-lg">
                    {word}
                  </button>
                ))}
              </div>
              {!isLocked && (
                <div className="flex flex-wrap gap-2.5 p-3 bg-slate-100/50 rounded-2xl border border-slate-200">
                  {builderBank.map((word, i) => (
                    <button key={i} onClick={() => handleBuilderClick(word, true)} className="px-5 py-2 bg-white text-slate-700 border-2 border-transparent rounded-xl hover:bg-indigo-600 hover:text-white transition-all font-bold text-lg shadow-sm">
                      {word}
                    </button>
                  ))}
                </div>
              )}
              {!isLocked && (
                <button onClick={() => checkAnswer()} className="w-full py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black uppercase tracking-[0.2em] shadow-xl active:scale-[0.98]">Check Sentence</button>
              )}
            </div>
          )}
        </div>

        {/* FEEDBACK & ATTEMPTS */}
        <div className="flex justify-between items-center mt-1">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             Attempt {localAttempts} of {maxAttempts}
          </div>
          
          {isError && (
            <div className="text-sm font-black text-amber-600 animate-pulse bg-amber-100 px-3 py-1 rounded-full">
              ПОПРОБУЙ ЕЩЕ РАЗ! 🧐
            </div>
          )}
          
          {feedback === 'correct' && (
            <div className="text-sm font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
              ВЕРНО! ✨
            </div>
          )}
        </div>

        {showHint && hint && !isLocked && (
          <div className="text-base text-indigo-700 italic bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500 animate-in fade-in duration-500">
            <span className="font-black uppercase text-[10px] tracking-widest block mb-1 opacity-50">Подсказка</span>
            {hint}
          </div>
        )}

        {feedback === 'revealed' && (
          <div className="mt-2 p-5 bg-white rounded-2xl border-2 border-orange-200 shadow-lg animate-in slide-in-from-top-4">
            <div className="text-[10px] font-black text-orange-500 uppercase mb-3 tracking-[0.2em]">
              {mode === 'cw' ? 'Разбор задания:' : 'Правильный ответ:'}
            </div>
            <div className="text-slate-800 text-lg leading-relaxed font-bold">
              {mode === 'cw' ? (solution || `Правильный ответ: ${correctAnswer}`) : correctAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
