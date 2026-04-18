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
  label = "",
  compact = false
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
    if (progressItem && (progressItem.attempts > 0 || progressItem.status)) {
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
    } else {
      // Hard Reset if no progress or reset happened
      setInput('');
      setFeedback(null);
      setLocalAttempts(0);
      setShowHint(false);
      if (type === 'builder') {
        setBuilderZone([]);
        setBuilderBank(options);
      }
    }
  }, [progressItem, type, options]);

  const normalize = (s) => s.toString().toLowerCase().replace(/\s+/g,' ').trim();

  const checkAnswer = (customVal = null) => {
    if (feedback === 'correct' || feedback === 'revealed') return;

    const valToCheck = customVal !== null ? customVal : input;
    
    // Prevent empty submissions
    if (!valToCheck || valToCheck.trim() === '') return;

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
  const isInputEmpty = type === 'text' || type === 'dropdown' ? !input.trim() : (type === 'builder' ? builderZone.length === 0 : !input);

  return (
    <div className={`${compact ? 'p-2 mb-2 flex-1' : 'p-4 mb-4'} rounded-xl border-2 transition-all duration-300 ${isShaking ? 'animate-shake' : ''} ${
      feedback === 'correct' ? 'border-emerald-500 bg-emerald-50' : 
      feedback === 'revealed' ? 'border-orange-500 bg-orange-50' : 
      isError ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white'
    }`}>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>

      <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-3'}`}>
        {label && (
          <div className={`${compact ? 'text-sm' : 'text-base md:text-lg'} font-bold text-slate-800 leading-snug`}>
            {label}
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          {type === 'text' && (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked}
                placeholder={placeholder}
                className={`flex-1 ${compact ? 'p-1.5 text-sm' : 'p-2.5 text-base'} rounded-lg border-2 focus:outline-none transition-all ${
                  isLocked ? 'bg-slate-100 border-slate-200 text-slate-500' : 
                  isError ? 'border-amber-300 focus:border-amber-500 bg-white' : 'border-slate-200 focus:border-indigo-400 bg-white'
                }`}
                onKeyDown={(e) => e.key === 'Enter' && !isInputEmpty && checkAnswer()}
              />
              {!isLocked && (
                <button 
                  onClick={() => checkAnswer()} 
                  disabled={isInputEmpty}
                  className={`${compact ? 'px-3' : 'px-6'} bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-bold uppercase tracking-widest text-[10px] shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Check
                </button>
              )}
            </div>
          )}

          {type === 'mcq' && (
            <div className="grid grid-cols-1 gap-2">
              {options.map((opt, i) => (
                <button
                  key={i}
                  disabled={isLocked}
                  onClick={() => { setInput(opt); checkAnswer(opt); }}
                  className={`${compact ? 'p-2 text-sm' : 'p-3 text-base'} text-left rounded-lg border-2 transition-all font-semibold ${
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
            <div className="flex gap-2 items-center">
              <select
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked}
                className={`${compact ? 'p-1.5 text-sm' : 'p-2.5 text-base'} rounded-lg border-2 outline-none transition-all flex-1 md:flex-none ${
                  isError ? 'border-amber-300 bg-white' : 'border-slate-200 focus:border-indigo-400 bg-white'
                }`}
              >
                <option value="">Выберите...</option>
                {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {!isLocked && (
                <button 
                  onClick={() => checkAnswer()} 
                  disabled={isInputEmpty}
                  className={`${compact ? 'px-3 py-2' : 'px-6 py-2.5'} bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-bold uppercase tracking-widest text-[10px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Check
                </button>
              )}
            </div>
          )}

          {type === 'builder' && (
            <div className="flex flex-col gap-3">
              <div className={`min-h-[50px] ${compact ? 'p-2' : 'p-3'} bg-white border-2 border-dashed rounded-xl flex flex-wrap gap-2 transition-colors ${
                isError ? 'border-amber-400 bg-amber-50/30' : 
                isLocked ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
              }`}>
                {builderZone.map((word, i) => (
                  <button key={i} onClick={() => handleBuilderClick(word, false)} disabled={isLocked} className={`${compact ? 'px-3 py-1 text-sm' : 'px-4 py-1.5 text-base'} bg-white border-2 border-slate-200 rounded-lg shadow-sm hover:border-indigo-400 transition-all font-bold`}>
                    {word}
                  </button>
                ))}
              </div>
              {!isLocked && (
                <div className="flex flex-wrap gap-2 p-2 bg-slate-100/50 rounded-xl border border-slate-200">
                  {builderBank.map((word, i) => (
                    <button key={i} onClick={() => handleBuilderClick(word, true)} className={`${compact ? 'px-3 py-1 text-sm' : 'px-4 py-1.5 text-base'} bg-white text-slate-700 border-2 border-transparent rounded-lg hover:bg-indigo-600 hover:text-white transition-all font-bold shadow-sm`}>
                      {word}
                    </button>
                  ))}
                </div>
              )}
              {!isLocked && (
                <button 
                  onClick={() => checkAnswer()} 
                  disabled={isInputEmpty}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold uppercase tracking-widest text-[10px] shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Sentence
                </button>
              )}
            </div>
          )}
        </div>

        {/* FEEDBACK & ATTEMPTS */}
        <div className="flex justify-between items-center">
          <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">
             Att. {localAttempts}/{maxAttempts}
          </div>
          
          {isError && (
            <div className="text-[10px] font-black text-amber-600 animate-pulse bg-amber-100 px-2 py-0.5 rounded-full">
              AGAIN! 🧐
            </div>
          )}
          
          {feedback === 'correct' && (
            <div className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
              OK! ✨
            </div>
          )}
        </div>

        {showHint && hint && !isLocked && (
          <div className="text-sm text-indigo-700 italic bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-500 animate-in fade-in duration-500">
            {hint}
          </div>
        )}

        {feedback === 'revealed' && (
          <div className="mt-1 p-3 bg-white rounded-xl border-2 border-orange-200 shadow-sm animate-in slide-in-from-top-2">
            <div className="text-slate-800 text-sm leading-relaxed font-bold">
              {mode === 'cw' ? (solution || `Ans: ${correctAnswer}`) : correctAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
