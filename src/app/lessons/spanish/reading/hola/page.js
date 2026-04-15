'use client'
import Link from 'next/link'

export default function ReadingHolaLesson() {
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

  const SentencePair = ({ spanish, russian }) => (
    <div className="mb-6 group">
      <p className="text-[17px] text-[#1a1a2e] leading-relaxed flex items-start gap-3">
        <button 
          onClick={() => speakSpanish(spanish)}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f4a261]/10 text-[#f4a261] flex items-center justify-center text-sm hover:bg-[#f4a261] hover:text-white transition-colors mt-0.5"
          title="Прослушать"
        >
          🔊
        </button>
        <span className="font-medium pt-1">{spanish}</span>
      </p>
      <span className="text-[14px] text-gray-500 block mt-2 mb-4 border-l-2 border-[#e5e0d5] pl-4 ml-11 transition-colors group-hover:border-[#f4a261]">
        {russian}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#f4a261] mb-3">
          🇪🇸 Чтение · Текст 1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Hola,<br />
          <em className="text-[#f4a261] not-italic font-normal font-serif">me llamo...</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Базовый текст о себе. Идеально для старта! Слушай произношение и сверяйся с переводом.
        </p>
        <div className="absolute right-[-20px] top-[-20px] text-[130px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          TEXTO
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center shadow-sm">
          <Link href="/lessons/spanish/reading/intro" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#f4a261] hover:text-white">
            ← Карта текстов
          </Link>
          <button 
            onClick={() => speakSpanish("¡Hola! Me llamo Carlos. Soy de Madrid, España. Tengo veinticinco años y soy estudiante. Estudio historia en la universidad. Vivo con mi familia. Mi padre se llama Juan y mi madre se llama María. Tengo un hermano menor, Luis. Me gusta mucho leer y escuchar música. Los fines de semana, camino por el parque con mis amigos.")}
            className="bg-[#1a1a2e] text-white no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#f4a261] flex items-center gap-2"
          >
            <span>🔊</span> Прослушать весь текст
          </button>
        </nav>

        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 md:p-12 mb-4 mt-8 shadow-sm">
          <SentencePair 
            spanish="¡Hola! Me llamo Carlos. Soy de Madrid, España." 
            russian="Привет! Меня зовут Карлос. Я из Мадрида, Испания." 
          />

          <SentencePair 
            spanish="Tengo veinticinco años y soy estudiante. Estudio historia en la universidad." 
            russian="Мне 25 лет и я студент. Я изучаю историю в университете." 
          />

          <SentencePair 
            spanish="Vivo con mi familia. Mi padre se llama Juan y mi madre se llama María. Tengo un hermano menor, Luis." 
            russian="Я живу со своей семьей. Моего отца зовут Хуан, а маму зовут Мария. У меня есть младший брат, Луис." 
          />

          <SentencePair 
            spanish="Me gusta mucho leer y escuchar música. Los fines de semana, camino por el parque con mis amigos." 
            russian="Мне очень нравится читать и слушать музыку. По выходным я гуляю по парку с друзьями." 
          />
        </div>
      </div>
    </div>
  )
}
