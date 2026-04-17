'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'

export default function ListeningLesson() {
  const [inputs, setInputs] = useState({
    w1: '', w2: '', w3: '', w4: '', w5: ''
  })
  const [status, setStatus] = useState({
    w1: null, w2: null, w3: null, w4: null, w5: null
  })
  const [message, setMessage] = useState(null)

  const { progress, updateProgress, getStats, loading } = useLessonProgress('spa_listening', 0, 5);

  const answers = {
    w1: 'llamo', w2: 'soy', w3: 'vivo', w4: 'años', w5: 'hablar'
  }

  // Restoration
  useEffect(() => {
    if (!loading && progress.hw) {
      const restored = {};
      const newStatus = {};
      let hasData = false;
      Object.keys(answers).forEach(key => {
        const item = progress.hw[key];
        if (item) {
          restored[key] = item.value || '';
          newStatus[key] = item.status === 'correct' ? 'correct' : 'wrong';
          hasData = true;
        }
      });
      if (hasData) {
        setInputs(prev => ({ ...prev, ...restored }));
        setStatus(prev => ({ ...prev, ...newStatus }));
      }
    }
  }, [loading, progress.hw]);

  const normalize = (s) => s.toLowerCase().replace(/[^a-zñáéíóúü]/g, '').trim()

  const checkAll = () => {
    let correctCount = 0
    const newStatus = {}

    Object.keys(answers).forEach((key) => {
      const isCorrect = normalize(inputs[key]) === normalize(answers[key]) && inputs[key] !== ''
      newStatus[key] = isCorrect ? 'correct' : 'wrong'
      updateProgress(key, 'hw', isCorrect ? 'correct' : 'wrong', 1, inputs[key]);
      if (isCorrect) correctCount++
    })

    setStatus(newStatus)

    if (correctCount === 5) {
      setMessage({ text: '¡Excelente! Все слова услышаны и написаны верно! 🎉', type: 'success' })
    } else {
      setMessage({ text: `Правильно ${correctCount} из 5. Попробуй послушать еще раз!`, type: 'error' })
    }
  }

  const handleChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }))
    setStatus(prev => ({ ...prev, [key]: null }))
    setMessage(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') checkAll()
  }

  const playDictation = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const text = "¡Hola! Me llamo Pablo. Yo soy de España. Y vivo en España также. Tengo treinta y seis años. Me gusta mucho hablar español.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8; // Чуть медленнее для диктанта
      window.speechSynthesis.speak(utterance);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">LOADING...</div>

  const getInputClass = (key) => {
    const base = "border-b-2 border-gray-400 bg-transparent font-mono text-[16px] text-[#e63946] text-center outline-none w-[120px] transition-colors px-1 py-0.5 mx-1 focus:border-[#e63946]"
    if (status[key] === 'correct') return `${base} !border-[#2a9d8f] !text-[#2a9d8f]`
    if (status[key] === 'wrong') return `${base} !border-[#e63946] !text-[#e63946]`
    return base
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#e63946] mb-3">
          🇪🇸 Аудирование · Уровень A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Интерактивный<br />
          <em className="text-[#2a9d8f] not-italic font-normal font-serif">Диктант</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Учимся понимать испанскую речь на слух. Включай аудио и заполняй пропуски в тексте.
        </p>
        <div className="absolute right-[-20px] top-[10px] text-[100px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          ESCUCHA
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#e63946] hover:text-white">
            ← На главную
          </Link>
        </nav>

        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#e63946] my-12 mb-5">
          Задание 1
          <div className="w-[40px] h-[2px] bg-[#e63946]"></div>
        </div>
        <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">Слушай и вписывай</h2>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
          <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#f4a261]"></div>
          
          <p className="text-gray-700 text-[15px] mb-6">
            Поскольку YouTube часто блокирует видео на сторонних сайтах, мы перевели этот диктант на <strong>встроенную озвучку</strong>! Жми на кнопку ниже, внимательно слушай диктора и вписывай то, что услышишь, в пропуски (с маленькой буквы).
          </p>

          <div className="flex justify-center mb-8">
            <button 
              onClick={playDictation}
              className="flex items-center gap-3 bg-[#e63946] hover:bg-[#d62839] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="text-2xl">🔊</span> Слушать диктант
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 my-6 text-[14px] text-[#7c4a00]">
            <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">💡 Подсказка:</strong>
            Если ты забыл, как пишутся слова — обратись к нашему разделу "Фонетика"! Испанский читается так же, как пишется. Не забывай про букву <strong>ñ</strong>.
          </div>

          <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Заполни пропуски:</h3>
          
          <div className="text-[18px] leading-[2.2] text-[#1a1a2e] p-6 bg-gray-50 border border-[#e5e0d5] rounded-xl mb-6 shadow-inner">
            ¡Hola! Me 
            <input type="text" className={getInputClass('w1')} value={inputs.w1} onChange={e => handleChange('w1', e.target.value)} onKeyDown={handleKeyDown} /> 
            Pablo. <br/><br/>
            
            Yo 
            <input type="text" className={getInputClass('w2')} value={inputs.w2} onChange={e => handleChange('w2', e.target.value)} onKeyDown={handleKeyDown} /> 
            de España. <br/><br/>
            
            Y 
            <input type="text" className={getInputClass('w3')} value={inputs.w3} onChange={e => handleChange('w3', e.target.value)} onKeyDown={handleKeyDown} /> 
            en España también (тоже). <br/><br/>
            
            Tengo treinta y seis 
            <input type="text" className={getInputClass('w4')} value={inputs.w4} onChange={e => handleChange('w4', e.target.value)} onKeyDown={handleKeyDown} /> 
            . <br/><br/>
            
            Me gusta mucho 
            <input type="text" className={getInputClass('w5')} value={inputs.w5} onChange={e => handleChange('w5', e.target.value)} onKeyDown={handleKeyDown} /> 
            español.
          </div>

          <button 
            className="bg-[#1a1a2e] hover:bg-[#e63946] text-white border-none px-6 py-3 text-[15px] rounded-xl cursor-pointer font-bold transition-colors"
            onClick={checkAll}
          >
            Проверить весь текст
          </button>

          {message && (
            <p className={`mt-4 font-medium text-[15px] ${message.type === 'success' ? 'text-[#2a9d8f]' : 'text-[#e63946]'}`}>
              {message.text}
            </p>
          )}

        </div>
      </div>
    </div>
  )
}
