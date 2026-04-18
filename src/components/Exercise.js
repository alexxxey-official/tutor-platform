'use client'
import { useState, useEffect } from 'react';

/**
 * Универсальный компонент для заданий v2.1 (Enhanced Feedback)
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
  const [feedback, setFeedback] = useState(null); // 'correct', 'error', 'revealed'
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
      // Trigger shake animation
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      if (newAttempts >= maxAttempts) {
        setFeedback('revealed');
        if (type === 'builder') setBuilderZone(correctAnswer.split(' '));
        onUpdate(id, mode, 'revealed', newAttempts, valToCheck);
      } else {
        setFeedback('error');
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

  return (
    <div className={`p-4 mb-4 rounded-xl border-2 transition-all duration-300 ${isShaking ? 'animate-shake' : ''} ${
      feedback === 'correct' ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 
      feedback === 'revealed' ? 'border-orange-500 bg-orange-50' : 
      feedback === 'error' ? 'border-amber-400 bg-amber-50 shadow-md scale-[1.01]' : 'border-slate-200 bg-white'
    }`}>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>

      <div className="flex flex-col gap-3">
        {label && <div className="text-sm font-bold text-slate-800 mb-1 leading-relaxed">{label}</div>}
        
        <div className="flex flex-col gap-2">
          {type === 'text' && (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked}
                placeholder={placeholder}
                className={`flex-1 p-2.5 rounded-lg border-2 focus:outline-none transition-all ${
                  isLocked ? 'bg-slate-100 border-slate-200' : 
                  feedback === 'error' ? 'border-amber-300 focus:border-amber-500' : 'border-slate-200 focus:border-blue-400'
                }`}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              />
              {!isLocked && (
                <button onClick={() => checkAnswer()} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-bold shadow-sm active:scale-95">Check</button>
              )}
            </div>
          )}

          {/* MCQ */}
          {type === 'mcq' && (
            <div className="grid grid-cols-1 gap-2">
              {options.map((opt, i) => (
                <button
                  key={i}
                  disabled={isLocked}
                  onClick={() => { setInput(opt); checkAnswer(opt); }}
                  className={`p-3 text-left rounded-lg border-2 transition-all font-medium ${
                    input === opt && feedback !== 'correct' ? 'border-amber-400 bg-amber-50' : 
                    input === opt ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                  } ${isLocked && opt === correctAnswer ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* ... other types (dropdown, builder) stay similar but benefit from wrapper styles ... */}
          {type === 'dropdown' && (
            <div className="flex gap-2 items-center">
              <select
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked}
                className={`p-2.5 rounded-lg border-2 outline-none transition-all ${
                  feedback === 'error' ? 'border-amber-300' : 'border-slate-200 focus:border-blue-400'
                }`}
              >
                <option value="">Выберите...</option>
                {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {!isLocked && (
                <button onClick={() => checkAnswer()} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-bold">Check</button>
              )}
            </div>
          )}

          {type === 'builder' && (
            <div className="flex flex-col gap-4">
              <div className={`min-h-[60px] p-3 bg-slate-50 border-2 border-dashed rounded-xl flex flex-wrap gap-2 transition-colors ${
                feedback === 'error' ? 'border-amber-300 bg-amber-50/50' : 
                isLocked ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200'
              }`}>
                {builderZone.map((word, i) => (
                  <button key={i} onClick={() => handleBuilderClick(word, false)} disabled={isLocked} className="px-4 py-1.5 bg-white border-2 border-slate-200 rounded-lg shadow-sm hover:border-slate-400 transition-all font-medium">
                    {word}
                  </button>
                ))}
              </div>
              {!isLocked && (
                <div className="flex flex-wrap gap-2 p-2 bg-white rounded-lg border border-slate-100">
                  {builderBank.map((word, i) => (
                    <button key={i} onClick={() => handleBuilderClick(word, true)} className="px-4 py-1.5 bg-slate-100 text-slate-700 border-2 border-transparent rounded-lg hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all font-medium">
                      {word}
                    </button>
                  ))}
                </div>
              )}
              {!isLocked && (
                <button onClick={() => checkAnswer()} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-black uppercase tracking-widest shadow-md">Check Order</button>
              )}
            </div>
          )}
        </div>

        {/* FEEDBACK MESSAGES */}
        <div className="flex justify-between items-center min-h-[20px]">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
             Attempt: {localAttempts} / {maxAttempts}
          </div>
          
          {feedback === 'error' && !isLocked && (
            <div className="text-xs font-bold text-amber-600 animate-bounce">
              Попробуй еще раз! 🧐
            </div>
          )}
          
          {feedback === 'correct' && (
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span>Отлично! ✨</span>
            </div>
          )}
        </div>

        {showHint && hint && !isLocked && (
          <div className="text-sm text-indigo-600 italic bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 animate-in fade-in duration-500">
            💡 <span className="font-semibold text-indigo-800">Подсказка:</span> {hint}
          </div>
        )}

        {feedback === 'revealed' && (
          <div className="mt-2 p-4 bg-white rounded-xl border-2 border-orange-200 text-sm shadow-sm animate-in slide-in-from-top-2">
            <div className="text-[10px] font-black text-orange-500 uppercase mb-2 tracking-widest">
              {mode === 'cw' ? 'Разбор задания:' : 'Правильный ответ:'}
            </div>
            <div className="text-slate-800 leading-relaxed font-medium">
              {mode === 'cw' ? (solution || `Правильный ответ: ${correctAnswer}`) : correctAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
