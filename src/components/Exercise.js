'use client'
import { useState, useEffect } from 'react';

/**
 * Универсальный компонент для заданий v2
 */
export default function Exercise({ 
  id, 
  mode, 
  type = 'text', // 'text', 'mcq', 'dropdown', 'builder'
  correctAnswer, 
  options = [], // For mcq and dropdown
  solution, 
  hint, 
  progressItem, 
  onUpdate,
  maxAttempts: customMaxAttempts,
  placeholder = "Введите ответ...",
  label = "" // Текст задания
}) {
  const maxAttempts = customMaxAttempts || (mode === 'cw' ? 2 : 3);
  const [input, setInput] = useState('');
  const [localAttempts, setLocalAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct', 'error', 'revealed'
  
  // For Builder
  const [builderBank, setBuilderBank] = useState([]);
  const [builderZone, setBuilderZone] = useState([]);

  useEffect(() => {
    if (type === 'builder' && options.length > 0) {
      setBuilderBank(options);
    }
  }, [type, options]);

  // Восстановление состояния из БД
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
      if (newAttempts >= maxAttempts) {
        setFeedback('revealed');
        // При раскрытии показываем правильный ответ в builder
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
    <div className={`p-4 mb-4 rounded-xl border-2 transition-all ${
      feedback === 'correct' ? 'border-green-500 bg-green-50' : 
      feedback === 'revealed' ? 'border-orange-500 bg-orange-50' : 
      feedback === 'error' ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex flex-col gap-3">
        {label && <div className="text-sm font-semibold text-indigo-900 mb-1">{label}</div>}
        
        <div className="flex flex-col gap-2">
          {/* TEXT INPUT */}
          {type === 'text' && (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked}
                placeholder={placeholder}
                className={`flex-1 p-2 rounded-lg border focus:outline-none transition-all ${
                  isLocked ? 'bg-gray-100' : 'focus:ring-2 focus:ring-blue-400'
                }`}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              />
              {!isLocked && (
                <button onClick={() => checkAnswer()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold">Check</button>
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
                  className={`p-3 text-left rounded-lg border-2 transition-all ${
                    input === opt ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-blue-200'
                  } ${isLocked && opt === correctAnswer ? 'border-green-500 bg-green-100' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* DROPDOWN */}
          {type === 'dropdown' && (
            <div className="flex gap-2 items-center">
              <select
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLocked}
                className="p-2 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Выберите...</option>
                {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
              {!isLocked && (
                <button onClick={() => checkAnswer()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold">Check</button>
              )}
            </div>
          )}

          {/* BUILDER */}
          {type === 'builder' && (
            <div className="flex flex-col gap-4">
              <div className={`min-h-[50px] p-2 bg-gray-50 border-2 border-dashed rounded-lg flex flex-wrap gap-2 ${isLocked ? 'border-green-200' : 'border-gray-300'}`}>
                {builderZone.map((word, i) => (
                  <button key={i} onClick={() => handleBuilderClick(word, false)} disabled={isLocked} className="px-3 py-1 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors">
                    {word}
                  </button>
                ))}
              </div>
              {!isLocked && (
                <div className="flex flex-wrap gap-2">
                  {builderBank.map((word, i) => (
                    <button key={i} onClick={() => handleBuilderClick(word, true)} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded hover:bg-blue-100 transition-colors">
                      {word}
                    </button>
                  ))}
                </div>
              )}
              {!isLocked && (
                <button onClick={() => checkAnswer()} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold mt-2">Check Order</button>
              )}
            </div>
          )}
        </div>

        {/* Info & Feedback */}
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
           <div>Attempts: {localAttempts} / {maxAttempts}</div>
           {showHint && hint && !isLocked && <div className="text-blue-500 animate-pulse">💡 Hint available</div>}
        </div>

        {showHint && hint && !isLocked && (
          <div className="text-sm text-blue-600 italic bg-blue-50 p-2 rounded-lg border border-blue-100">
            💡 {hint}
          </div>
        )}

        {feedback === 'revealed' && (
          <div className="mt-2 p-3 bg-white rounded-lg border border-orange-200 text-sm shadow-sm animate-in slide-in-from-top-2 duration-300">
            <div className="text-xs font-bold text-orange-500 uppercase mb-1">
              {mode === 'cw' ? 'Разбор задания:' : 'Правильный ответ:'}
            </div>
            <div className="text-gray-800 leading-relaxed">
              {mode === 'cw' ? (solution || `Правильный ответ: ${correctAnswer}`) : correctAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
