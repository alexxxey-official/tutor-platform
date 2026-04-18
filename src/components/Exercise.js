'use client'
import { useState, useEffect } from 'react';

/**
 * Универсальный компонент для заданий v2.4 (Downscaled & Refined)
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
  placeholder = "Type your answer...",
  label = "",
  compact = false,
  variant = 'default' // 'default' or 'inline'
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
    } else if (!progressItem || (progressItem.attempts === 0 && !progressItem.status)) {
      setInput(prev => (localAttempts > 0 ? '' : prev)); 
      setFeedback(null);
      setLocalAttempts(0);
      setShowHint(false);
      if (type === 'builder') {
        setBuilderZone([]);
        setBuilderBank(options);
      }
    }
  }, [progressItem?.status, progressItem?.attempts, progressItem?.value, type, options, localAttempts]);

  const normalize = (s) => s.toString().toLowerCase().replace(/\s+/g,' ').trim();

  const checkAnswer = (customVal = null) => {
    if (feedback === 'correct' || feedback === 'revealed') return;
    const valToCheck = customVal !== null ? customVal : input;
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
        setFeedback('attempting');
        onUpdate(id, mode, 'attempting', newAttempts, valToCheck);
        if (newAttempts >= 1) setShowHint(true);
      }
    }
  };

  useEffect(() => {
    const handleTrigger = (e) => {
      if (e.detail.id === id) checkAnswer();
    };
    window.addEventListener('trigger-check', handleTrigger);
    return () => window.removeEventListener('trigger-check', handleTrigger);
  }, [id, input, feedback, localAttempts, correctAnswer, mode, onUpdate]);

  const isLocked = feedback === 'correct' || feedback === 'revealed';
  const isError = feedback === 'attempting' && localAttempts > 0;
  const isInputEmpty = type === 'text' || type === 'dropdown' ? !input.trim() : (type === 'builder' ? builderZone.length === 0 : !input);

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

  if (variant === 'inline') {
    return (
      <div className={`inline-block align-middle ${isShaking ? 'animate-shake' : ''} w-full`}>
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
          }
          .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        `}</style>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLocked}
          placeholder={placeholder}
          className={`w-full p-2 px-3 text-sm md:text-base rounded-xl border-2 focus:outline-none transition-all text-slate-900 font-bold text-center ${
            isLocked ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-inner' : 
            isError ? 'border-amber-400 bg-amber-50 shadow-md' : 'border-slate-700 bg-slate-800 focus:border-blue-400 focus:bg-slate-700 text-white'
          } ${feedback === 'revealed' ? 'border-orange-500 bg-orange-50 text-orange-700' : ''}`}
          onKeyDown={(e) => e.key === 'Enter' && !isInputEmpty && checkAnswer()}
        />
      </div>
    );
  }

  return (
    <div className={`${compact ? 'p-2.5 mb-2.5' : 'p-4 mb-4'} rounded-xl border-2 transition-all duration-300 ${isShaking ? 'animate-shake' : ''} ${
      feedback === 'correct' ? 'border-emerald-500 bg-emerald-50' : 
      feedback === 'revealed' ? 'border-orange-500 bg-orange-50' : 
      isError ? 'border-amber-400 bg-amber-50 shadow-md scale-[1.01]' : 'border-slate-200 bg-white'
    }`}>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>

      <div className="flex flex-col gap-3">
        {label && (
          <div className={`${compact ? 'text-sm' : 'text-base'} font-bold text-slate-800 leading-snug`}>
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
                className={`flex-1 ${compact ? 'p-2 text-xs' : 'p-2.5 text-sm'} rounded-lg border-2 focus:outline-none transition-all text-slate-900 ${
                  isLocked ? 'bg-slate-100 border-slate-200 text-slate-500' : 
                  isError ? 'border-amber-300 focus:border-amber-500 bg-white' : 'border-slate-200 focus:border-indigo-400 bg-white'
                }`}
                onKeyDown={(e) => e.key === 'Enter' && !isInputEmpty && checkAnswer()}
              />
              {!isLocked && (
                <button 
                  onClick={() => checkAnswer()} 
                  disabled={isInputEmpty}
                  className={`${compact ? 'px-4' : 'px-6'} bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-black uppercase tracking-widest text-[10px] shadow-lg active:scale-95 disabled:opacity-50`}
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
                  className={`${compact ? 'p-2.5 text-xs' : 'p-3 text-sm'} text-left rounded-lg border-2 transition-all font-semibold ${
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
                className={`${compact ? 'p-2 text-xs' : 'p-2.5 text-sm'} rounded-lg border-2 outline-none transition-all flex-1 md:flex-none md:min-w-[160px] text-slate-900 ${
                  isError ? 'border-amber-300 bg-white' : 'border-slate-200 focus:border-indigo-400 bg-white'
                }`}
              >
                <option value="">Choose...</option>
                {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {!isLocked && (
                <button 
                  onClick={() => checkAnswer()} 
                  disabled={isInputEmpty}
                  className={`${compact ? 'px-4 py-2' : 'px-6 py-2.5'} bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-black uppercase tracking-widest text-[10px] shadow-lg disabled:opacity-50`}
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
                  <button key={i} onClick={() => handleBuilderClick(word, false)} disabled={isLocked} className={`${compact ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'} bg-white border-2 border-slate-200 rounded-lg shadow-sm hover:border-indigo-400 transition-all font-bold text-slate-900`}>
                    {word}
                  </button>
                ))}
              </div>
              {!isLocked && (
                <div className="flex flex-wrap gap-2 p-2 bg-slate-100/50 rounded-xl border border-slate-200">
                  {builderBank.map((word, i) => (
                    <button key={i} onClick={() => handleBuilderClick(word, true)} className={`${compact ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'} bg-white text-slate-700 border-2 border-transparent rounded-lg hover:bg-indigo-600 hover:text-white transition-all font-bold shadow-sm`}>
                      {word}
                    </button>
                  ))}
                </div>
              )}
              {!isLocked && (
                <button onClick={() => checkAnswer()} disabled={isInputEmpty} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-black uppercase tracking-[0.2em] text-[10px] shadow-xl active:scale-[0.98] disabled:opacity-50">Check Sentence</button>
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
            <span className="font-black uppercase text-[10px] tracking-widest block mb-1 opacity-50">Hint</span>
            {hint}
          </div>
        )}

        {feedback === 'revealed' && (
          <div className="mt-2 p-4 bg-white rounded-2xl border-2 border-orange-200 shadow-lg animate-in slide-in-from-top-4">
            <div className="text-[10px] font-black text-orange-500 uppercase mb-2 tracking-[0.2em]">
              {mode === 'cw' ? 'Analysis:' : 'Answer:'}
            </div>
            <div className="text-slate-800 text-base leading-relaxed font-bold">
              {mode === 'cw' ? (solution || `Correct: ${correctAnswer}`) : correctAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
