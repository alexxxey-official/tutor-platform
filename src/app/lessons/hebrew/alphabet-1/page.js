'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, BookOpen, Info, Volume2, AlertTriangle } from 'lucide-react';

export default function HebrewAlphabet1() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Полный алфавит (22 буквы + 5 конечных форм)
  const alphabet = [
    { letter: 'א', name: 'Алеф', sound: '—', guttural: true, desc: 'Немая буква, гласный звук определяется огласовкой' },
    { letter: 'ב', name: 'Бет / Вет', sound: 'б / в', guttural: false, desc: 'С дагешем = Б, без дагеша = В' },
    { letter: 'ג', name: 'Гимель', sound: 'г', guttural: false, desc: 'Всегда читается как Г' },
    { letter: 'ד', name: 'Далет', sound: 'д', guttural: false, desc: 'Всегда читается как Д' },
    { letter: 'ה', name: 'Хэй', sound: 'h', guttural: true, desc: 'Легкий выдох, как английское H' },
    { letter: 'ו', name: 'Вав', sound: 'в', guttural: false, desc: 'Читается как В, используется для гласных О и У' },
    { letter: 'ז', name: 'Зайин', sound: 'з', guttural: false, desc: 'Всегда читается как З' },
    { letter: 'ח', name: 'Хет', sound: 'х', guttural: true, desc: 'Глубокий гортанный звук Х' },
    { letter: 'ט', name: 'Тет', sound: 'т', guttural: false, desc: 'Всегда читается как Т' },
    { letter: 'י', name: 'Йод', sound: 'й', guttural: false, desc: 'Читается как Й, используется для гласного И' },
    { letter: 'כ / ך', name: 'Каф / Хаф', sound: 'к / х', guttural: false, desc: 'С дагешем = К, без = Х. ך — конечная форма' },
    { letter: 'ל', name: 'Ламед', sound: 'л', guttural: false, desc: 'Всегда читается как Л' },
    { letter: 'מ / ם', name: 'Мем', sound: 'м', guttural: false, desc: 'Всегда М. ם — конечная форма' },
    { letter: 'נ / ן', name: 'Нун', sound: 'н', guttural: false, desc: 'Всегда Н. ן — конечная форма' },
    { letter: 'ס', name: 'Самех', sound: 'с', guttural: false, desc: 'Всегда читается как С' },
    { letter: 'ע', name: 'Айин', sound: '—', guttural: true, desc: 'Немая гортанная буква' },
    { letter: 'פ / ף', name: 'Пэй / Фэй', sound: 'п / ф', guttural: false, desc: 'С дагешем = П, без = Ф. ף — конечная форма' },
    { letter: 'צ / ץ', name: 'Цади', sound: 'ц', guttural: false, desc: 'Всегда Ц. ץ — конечная форма' },
    { letter: 'ק', name: 'Куф', sound: 'к', guttural: false, desc: 'Всегда читается как К' },
    { letter: 'ר', name: 'Реш', sound: 'р', guttural: true, desc: 'Гортанная Р (не раскатистая)' },
    { letter: 'ש', name: 'Шин / Син', sound: 'ш / с', guttural: false, desc: 'С точкой справа = Ш, слева = С' },
    { letter: 'ת', name: 'Тав', sound: 'т', guttural: false, desc: 'Всегда читается как Т' },
  ];

  // Современные звуки
  const modernSounds = [
    { letter: 'ג׳', name: 'Джимель', sound: 'дж', example: 'ג׳ינס (джинс)' },
    { letter: 'ז׳', name: 'Жайин', sound: 'ж', example: 'ז׳קט (жакет)' },
    { letter: 'צ׳', name: 'Чади', sound: 'ч', example: 'צ׳ק (чек)' },
  ];

  // Огласовки (Никуд)
  const vowels = {
    a: [
      { symbol: 'בָּ', name: 'Камац', desc: 'Долгий звук А' },
      { symbol: 'בַּ', name: 'Патах', desc: 'Короткий звук А' },
      { symbol: 'בֲּ', name: 'Хатаф-патах', desc: 'Очень короткий А (под гортанными)' },
    ],
    e: [
      { symbol: 'בֵּ', name: 'Цере', desc: 'Долгий звук Э' },
      { symbol: 'בֶּ', name: 'Сеголь', desc: 'Короткий звук Э' },
      { symbol: 'בֱּ', name: 'Хатаф-сеголь', desc: 'Очень короткий Э (под гортанными)' },
    ],
    i: [
      { symbol: 'בִּ', name: 'Хирик', desc: 'Короткий звук И' },
      { symbol: 'בִּי', name: 'Хирик гадоль', desc: 'Долгий звук И (с буквой Йод)' },
    ],
    o: [
      { symbol: 'בֹּ', name: 'Холам хасер', desc: 'Звук О (точка над буквой)' },
      { symbol: 'בּוֹ', name: 'Холам мале', desc: 'Звук О (с буквой Вав)' },
      { symbol: 'בֳּ', name: 'Хатаф-камац', desc: 'Короткий О (под гортанными)' },
    ],
    u: [
      { symbol: 'בֻּ', name: 'Кубуц', desc: 'Короткий звук У' },
      { symbol: 'בּוּ', name: 'Шурук', desc: 'Долгий звук У (с буквой Вав)' },
    ],
    shva: [
      { symbol: 'בְּ', name: 'Шва', desc: 'Не читается (или очень короткий Э)' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100" dir="ltr">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white py-16 px-6 shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute text-[200px] font-bold text-white/20 -top-10 -right-10 select-none" style={{ fontFamily: 'unbounded, sans-serif' }}>
            אָלֶף־בֵּית
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🇮🇱</span>
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              Урок 1 · שיעור 1
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'unbounded, sans-serif' }}>
            Алфавит Иврита
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            אָלֶף־בֵּית עִבְרִי • 22 буквы + 5 конечных форм + огласовки
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
        >
          <Home size={18} />
          <span>Главная</span>
        </button>
        <button
          onClick={() => router.push('/lessons/hebrew/intro')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
        >
          <BookOpen size={18} />
          <span>Введение</span>
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
          <BookOpen size={18} />
          <span className="font-medium">Урок 1: Алфавит</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12 space-y-8">

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Info size={28} className="text-blue-600" />
            Что такое Алеф-Бет?
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-blue-900">Алеф-Бет (אָלֶף־בֵּית)</strong> — это название еврейского алфавита,
              происходящее от первых двух букв: <span className="text-2xl" dir="rtl">א</span> (Алеф) и <span className="text-2xl" dir="rtl">ב</span> (Бет).
            </p>
            <p>
              В иврите <strong>22 основные буквы</strong> и <strong>5 конечных форм</strong> (софит), которые используются
              только в конце слова. Все буквы — согласные! Гласные звуки обозначаются специальными значками — <strong>огласовками (никуд)</strong>.
            </p>
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <p className="font-bold text-blue-900 mb-2">⚡ Важно знать:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Иврит пишется и читается <strong>справа налево</strong> (RTL)</li>
                <li>В современных текстах огласовки часто опускаются</li>
                <li>Есть 6 букв с двойным произношением (зависит от дагеша — точки внутри буквы)</li>
                <li>5 букв имеют особую форму в конце слова (софит)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alphabet Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <Volume2 size={28} className="text-cyan-600" />
            Полный Алфавит (22 буквы + 5 софит)
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {alphabet.map((item, idx) => (
              <div
                key={idx}
                className={`relative border-2 rounded-xl p-4 text-center transition-all hover:shadow-lg ${
                  item.guttural
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                {item.guttural && (
                  <div className="absolute top-2 right-2 text-[10px] font-bold text-orange-600 uppercase">
                    Гортанная
                  </div>
                )}
                <div className="text-6xl font-bold mb-2" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
                  {item.letter}
                </div>
                <div className="font-bold text-lg text-gray-800 mb-1">{item.name}</div>
                <div className="text-sm font-bold text-blue-600 mb-2">[{item.sound}]</div>
                <div className="text-xs text-gray-600 leading-tight">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Sounds */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle size={24} className="text-amber-400" />
            Современные звуки (заимствования)
          </h2>
          <p className="text-gray-300 mb-6">
            Для иностранных слов используются буквы с апострофом (גרש):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modernSounds.map((item, idx) => (
              <div key={idx} className="bg-slate-700 p-6 rounded-xl text-center">
                <div className="text-5xl font-bold mb-2" dir="rtl">{item.letter}</div>
                <div className="font-bold text-xl text-amber-300 mb-1">{item.name}</div>
                <div className="text-sm text-cyan-300 mb-2">[{item.sound}]</div>
                <div className="text-xs text-gray-400">{item.example}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vowels (Nikud) */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            נְקּוּד — Огласовки (Никуд)
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Огласовки — это точки и чёрточки под, над и внутри букв, которые обозначают гласные звуки.
            В современном иврите их часто опускают, но для изучения они необходимы!
          </p>

          {/* Sound A */}
          <div className="mb-6">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-t-xl font-bold text-center">
              Звук А
            </div>
            <div className="border-2 border-orange-200 rounded-b-xl p-6 bg-orange-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vowels.a.map((v, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-5xl font-bold mb-2" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
                      {v.symbol}
                    </div>
                    <div className="font-bold text-orange-700">{v.name}</div>
                    <div className="text-sm text-gray-600">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sound E */}
          <div className="mb-6">
            <div className="bg-green-500 text-white px-4 py-2 rounded-t-xl font-bold text-center">
              Звук Э
            </div>
            <div className="border-2 border-green-200 rounded-b-xl p-6 bg-green-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vowels.e.map((v, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-5xl font-bold mb-2" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
                      {v.symbol}
                    </div>
                    <div className="font-bold text-green-700">{v.name}</div>
                    <div className="text-sm text-gray-600">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sound I */}
          <div className="mb-6">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-t-xl font-bold text-center">
              Звук И
            </div>
            <div className="border-2 border-blue-200 rounded-b-xl p-6 bg-blue-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vowels.i.map((v, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-5xl font-bold mb-2" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
                      {v.symbol}
                    </div>
                    <div className="font-bold text-blue-700">{v.name}</div>
                    <div className="text-sm text-gray-600">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sound O */}
          <div className="mb-6">
            <div className="bg-purple-500 text-white px-4 py-2 rounded-t-xl font-bold text-center">
              Звук О
            </div>
            <div className="border-2 border-purple-200 rounded-b-xl p-6 bg-purple-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vowels.o.map((v, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-5xl font-bold mb-2" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
                      {v.symbol}
                    </div>
                    <div className="font-bold text-purple-700">{v.name}</div>
                    <div className="text-sm text-gray-600">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sound U */}
          <div className="mb-6">
            <div className="bg-slate-700 text-white px-4 py-2 rounded-t-xl font-bold text-center">
              Звук У
            </div>
            <div className="border-2 border-slate-300 rounded-b-xl p-6 bg-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vowels.u.map((v, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-5xl font-bold mb-2" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
                      {v.symbol}
                    </div>
                    <div className="font-bold text-slate-700">{v.name}</div>
                    <div className="text-sm text-gray-600">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shva */}
          <div className="mb-6">
            <div className="bg-gray-600 text-white px-4 py-2 rounded-t-xl font-bold text-center">
              Шва (отсутствие гласного)
            </div>
            <div className="border-2 border-gray-300 rounded-b-xl p-6 bg-gray-50">
              <div className="grid grid-cols-1 gap-4">
                {vowels.shva.map((v, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-5xl font-bold mb-2" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
                      {v.symbol}
                    </div>
                    <div className="font-bold text-gray-700">{v.name}</div>
                    <div className="text-sm text-red-600 font-bold">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Rules */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2">
            📌 Ключевые правила
          </h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500">
              <strong className="text-orange-900">Правило 1:</strong> Иврит пишется справа налево (RTL)
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500">
              <strong className="text-orange-900">Правило 2:</strong> Все буквы — согласные. Гласные = огласовки
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500">
              <strong className="text-orange-900">Правило 3:</strong> 5 букв имеют конечную форму (софит): כ ך, מ ם, נ ן, פ ף, צ ץ
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500">
              <strong className="text-orange-900">Правило 4:</strong> 6 букв меняют звук с дагешем: ב (б/в), כ (к/х), פ (п/ф), ש (ш/с)
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500">
              <strong className="text-orange-900">Правило 5:</strong> 5 гортанных букв: א ה ח ע ר (не принимают дагеш)
            </div>
          </div>
        </div>

        {/* Next Lesson */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Отлично! 🎉</h2>
          <p className="text-xl mb-6 text-blue-100">
            Ты познакомился с полным алфавитом иврита и системой огласовок!
          </p>
          <p className="text-lg mb-6 text-blue-100">
            В следующем уроке мы начнём читать первые слова и фразы.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-lg"
          >
            Вернуться на главную →
          </button>
        </div>

      </div>
    </div>
  );
}
