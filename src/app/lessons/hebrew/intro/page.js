'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, BookOpen, Zap } from 'lucide-react';
import { supabase } from '../../../../lib/supabase';

export default function HebrewIntro() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [nextAssigned, setNextAssigned] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('student_lessons').select('id').eq('student_id', user.id).eq('lesson_id', 'heb_alphabet_1').maybeSingle();
      setNextAssigned(!!data);
    };
    check();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100" dir="ltr">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white py-16 px-6 shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute text-[200px] font-bold text-white/20 -top-10 -right-10 select-none" style={{ fontFamily: 'unbounded, sans-serif' }}>
            עברית
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">🇮🇱</span>
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              Введение · מבוא
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'unbounded, sans-serif' }}>
            Иврит
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            עברית • Древний язык современного мира
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-6 py-4 flex gap-3">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
        >
          <Home size={18} />
          <span>Главная</span>
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
          <BookOpen size={18} />
          <span className="font-medium">Введение</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12 space-y-8">

        {/* Welcome */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Добро пожаловать! 🎉</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ты начинаешь изучение одного из самых древних и удивительных языков мира — <strong>иврита (עברית)</strong>.
            Это язык, который был возрождён после почти 2000 лет забвения и сегодня является живым, современным языком
            более 9 миллионов человек в Израиле и по всему миру.
          </p>
        </div>

        {/* History */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            📜 История языка
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="text-2xl font-bold text-blue-600">~1000 до н.э.</div>
                <div className="text-sm text-gray-500">Древний иврит</div>
              </div>
              <div className="flex-1 pt-2">
                <p>Язык Библии (Танах), на котором говорили древние евреи. Использовался для религиозных текстов и повседневного общения.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="text-2xl font-bold text-blue-600">200-1800</div>
                <div className="text-sm text-gray-500">Мёртвый язык</div>
              </div>
              <div className="flex-1 pt-2">
                <p>После разрушения Второго Храма иврит перестал быть разговорным языком. Использовался только для молитв и религиозных текстов.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="text-2xl font-bold text-blue-600">1880-1948</div>
                <div className="text-sm text-gray-500">Возрождение</div>
              </div>
              <div className="flex-1 pt-2">
                <p>Элиэзер Бен-Йехуда начал возрождение иврита как разговорного языка. Создание современной лексики для повседневной жизни.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="text-2xl font-bold text-blue-600">1948-сейчас</div>
                <div className="text-sm text-gray-500">Современный иврит</div>
              </div>
              <div className="flex-1 pt-2">
                <p>Официальный язык Государства Израиль. Живой, развивающийся язык науки, технологий, искусства и повседневной жизни.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Learn Hebrew */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            💡 Зачем учить иврит?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-bold text-blue-900 mb-2">Живой язык</h3>
              <p className="text-gray-700 text-sm">9+ миллионов носителей в Израиле и диаспоре. Язык стартапов, технологий и инноваций.</p>
            </div>

            <div className="p-4 bg-cyan-50 rounded-xl">
              <div className="text-3xl mb-2">📖</div>
              <h3 className="font-bold text-blue-900 mb-2">Доступ к культуре</h3>
              <p className="text-gray-700 text-sm">Читай Библию в оригинале, понимай еврейскую литературу, музыку и кино.</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-bold text-blue-900 mb-2">Уникальная структура</h3>
              <p className="text-gray-700 text-sm">Письмо справа налево, корневая система слов, огласовки — развивает мышление по-новому.</p>
            </div>

            <div className="p-4 bg-cyan-50 rounded-xl">
              <div className="text-3xl mb-2">✈️</div>
              <h3 className="font-bold text-blue-900 mb-2">Путешествия</h3>
              <p className="text-gray-700 text-sm">Свободно общайся в Израиле, понимай вывески, меню, местную культуру.</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            ⚡ Особенности иврита
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold mb-1">Письмо справа налево (RTL)</h3>
                <p className="text-gray-300 text-sm">Иврит пишется и читается справа налево: <span className="text-xl" dir="rtl">שָׁלוֹם</span> (шалом - привет)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold mb-1">22 буквы алфавита</h3>
                <p className="text-gray-300 text-sm">Алеф-Бет (אָלֶף־בֵּית) состоит из 22 букв + 5 конечных форм. Все буквы — согласные!</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold mb-1">Огласовки (Никуд)</h3>
                <p className="text-gray-300 text-sm">Гласные обозначаются точками и чёрточками под/над буквами: <span className="text-xl" dir="rtl">בַּיִת</span> (баит - дом)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold mb-1">Корневая система</h3>
                <p className="text-gray-300 text-sm">Большинство слов образуются от 3-буквенных корней. Например, כ-ת-ב (писать): כָּתַב (писал), כּוֹתֵב (пишет), מִכְתָּב (письмо)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold mb-1">Род существительных</h3>
                <p className="text-gray-300 text-sm">Все существительные имеют род (мужской/женский). Прилагательные и глаголы согласуются с родом.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Roadmap */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            🗺️ Карта курса
          </h2>
          <div className="space-y-3">
            {[
              { num: 0, title: 'Введение в иврит', desc: 'История, особенности, мотивация', color: 'bg-gray-100 text-gray-700', current: true },
              { num: 1, title: 'Алфавит (א-כ)', desc: 'Первые 11 букв алеф-бета', color: 'bg-blue-50 text-blue-700' },
              { num: 2, title: 'Алфавит (ל-ת)', desc: 'Оставшиеся буквы + конечные формы', color: 'bg-blue-50 text-blue-700' },
              { num: 3, title: 'Огласовки (Никуд)', desc: 'Система гласных звуков', color: 'bg-cyan-50 text-cyan-700' },
              { num: 4, title: 'Правила чтения', desc: 'Слоги, ударение, дагеш', color: 'bg-cyan-50 text-cyan-700' },
              { num: 5, title: 'Приветствия', desc: 'Первые слова и фразы', color: 'bg-blue-50 text-blue-700' },
              { num: 6, title: 'Местоимения', desc: 'Я, ты, он, она, мы, вы, они', color: 'bg-blue-50 text-blue-700' },
              { num: 7, title: 'Глагол "быть"', desc: 'Простые предложения', color: 'bg-cyan-50 text-cyan-700' },
              { num: 8, title: 'Числа 1-10', desc: 'Счёт и числительные', color: 'bg-blue-50 text-blue-700' },
              { num: 9, title: 'Семья', desc: 'Базовая лексика', color: 'bg-cyan-50 text-cyan-700' },
              { num: 10, title: 'Базовые глаголы', desc: 'Настоящее время', color: 'bg-blue-50 text-blue-700' },
            ].map((lesson) => (
              <div
                key={lesson.num}
                className={`p-4 rounded-xl ${lesson.color} ${lesson.current ? 'ring-2 ring-blue-500' : ''} transition-all`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-blue-900 shadow">
                    {lesson.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{lesson.title}</h3>
                    <p className="text-sm opacity-80">{lesson.desc}</p>
                  </div>
                  {lesson.current && (
                    <div className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      СЕЙЧАС
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
            💪 Как учить иврит эффективно
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex gap-3 items-start">
              <div className="text-2xl">✍️</div>
              <div>
                <h3 className="font-bold text-orange-900">Пиши от руки</h3>
                <p className="text-sm">Прописывай буквы и слова — это помогает запомнить форму и направление письма.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="text-2xl">🔊</div>
              <div>
                <h3 className="font-bold text-orange-900">Слушай и повторяй</h3>
                <p className="text-sm">Используй аудио в уроках, повторяй вслух — произношение важно с первого дня.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="text-2xl">📅</div>
              <div>
                <h3 className="font-bold text-orange-900">Занимайся регулярно</h3>
                <p className="text-sm">Лучше 15 минут каждый день, чем 2 часа раз в неделю. Постоянство = успех.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="font-bold text-orange-900">Не спеши</h3>
                <p className="text-sm">Алфавит и огласовки — это фундамент. Убедись, что понял их хорошо, прежде чем двигаться дальше.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            ⏱️ Сколько времени займёт курс?
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="text-blue-600" size={24} />
                <h3 className="font-bold text-blue-900">Быстрый темп (2-3 недели)</h3>
              </div>
              <p className="text-sm">1-2 урока в день, активная практика. Для тех, кто хочет быстро освоить основы.</p>
            </div>

            <div className="p-4 bg-cyan-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="text-cyan-600" size={24} />
                <h3 className="font-bold text-cyan-900">Комфортный темп (1-2 месяца)</h3>
              </div>
              <p className="text-sm">3-4 урока в неделю, с повторением и закреплением. Оптимально для большинства.</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Home className="text-blue-600" size={24} />
                <h3 className="font-bold text-blue-900">Спокойный темп (2-3 месяца)</h3>
              </div>
              <p className="text-sm">1-2 урока в неделю, без спешки. Для тех, кто учит язык для себя.</p>
            </div>
          </div>
        </div>

        {/* Ready to Start */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готов начать? 🚀</h2>
          <p className="text-xl mb-6 text-blue-100">
            Впереди увлекательное путешествие в мир иврита!
          </p>
          {nextAssigned ? (
            <button
              onClick={() => router.push('/lessons/hebrew/alphabet-1')}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-lg"
            >
              Начать Урок 1: Алфавит →
            </button>
          ) : (
            <div className="px-8 py-4 bg-gray-200 text-gray-500 font-bold rounded-xl cursor-not-allowed text-lg">
              Урок 1 ещё не назначен
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
