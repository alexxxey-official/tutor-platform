'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MathText from '../../../components/MathText';
import {
  EGE_MATH_TASKS,
  TASK_TOPICS,
  calculateScores,
  generateStandardVariant,
} from '../../../lib/ege-math-bank';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  ArrowLeft,
  RotateCcw,
  Eye,
  FileCheck,
  Send,
  Sparkles,
  Printer,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

function MathTestContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids');

  // Получение задач для варианта
  const tasks = useMemo(() => {
    if (idsParam) {
      const ids = idsParam.split(',');
      const selected = EGE_MATH_TASKS.filter((t) => ids.includes(t.id));
      if (selected.length > 0) return selected;
    }
    return generateStandardVariant();
  }, [idsParam]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(3 * 3600 + 55 * 60); // 3ч 55мин
  const [timerRunning, setTimerRunning] = useState(true);

  // Обратный отсчет времени
  useEffect(() => {
    if (!timerRunning || isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, isSubmitted]);

  // Форматирование времени (ЧЧ:ММ:СС)
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const currentTask = tasks[currentIndex] || tasks[0];
  const isPart2 = currentTask ? currentTask.number >= 12 : false;

  // Изменение ответа для краткого ответа (1 часть)
  const handleInputChange = (val) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentTask.id]: {
        ...prev[currentTask.id],
        value: val,
      },
    }));
  };

  // Изменение баллов самопроверки (2 часть)
  const handlePart2PointsChange = (pts) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentTask.id]: {
        ...prev[currentTask.id],
        points: pts,
      },
    }));
  };

  // Расчет итогов
  const scores = useMemo(() => {
    if (!isSubmitted) return null;
    return calculateScores(userAnswers);
  }, [isSubmitted, userAnswers]);

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-24">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-lg border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/math-bank"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться к Банку Заданий</span>
          </Link>

          {/* Timer Display */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/90 rounded-xl border border-slate-700 font-mono text-sm font-semibold text-emerald-400">
            <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          {/* Finish Button */}
          {!isSubmitted ? (
            <button
              onClick={() => setIsSubmitted(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-emerald-900/30"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Завершить и проверить</span>
            </button>
          ) : (
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Тест проверен
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        {/* Results Banner (If Submitted) */}
        {isSubmitted && scores && (
          <div className="mb-8 p-6 sm:p-8 bg-slate-900 text-white rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                  Результаты варианта ЕГЭ
                </span>
                <h2 className="text-3xl font-bold font-sans">
                  Тестовый балл: <span className="text-emerald-400">{scores.final100Score} из 100</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Первичный балл: <span className="text-white font-bold">{scores.primaryScore}</span> / {scores.maxPrimary}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/math-bank/print?ids=${tasks.map((t) => t.id).join(',')}&mode=teacher`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>Печать решений (PDF)</span>
                </Link>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setUserAnswers({});
                    setSecondsRemaining(3 * 3600 + 55 * 60);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-900/40"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Пройти заново</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Navigation Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Задания варианта ({tasks.length}):</span>
            <span>Задание {currentIndex + 1} из {tasks.length}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {tasks.map((t, idx) => {
              const isActive = idx === currentIndex;
              const hasAnswer = Boolean(userAnswers[t.id]?.value || userAnswers[t.id]?.points !== undefined);
              const isTaskPart2 = t.number >= 12;

              let statusColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';

              if (isActive) {
                statusColor = 'bg-slate-900 text-white ring-2 ring-slate-900/20';
              } else if (hasAnswer) {
                statusColor = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
              }

              return (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition flex items-center justify-center relative ${statusColor}`}
                >
                  <span>№{t.number}</span>
                  {isTaskPart2 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Task Card */}
        {currentTask && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden mb-6">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3.5 py-1 rounded-xl text-xs font-bold ${
                    isPart2 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  Задание №{currentTask.number}
                </span>

                <span className="text-sm font-semibold text-slate-800">
                  {currentTask.topic} {currentTask.subtopic && `• ${currentTask.subtopic}`}
                </span>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                Макс. балл: {currentTask.number <= 11 ? 1 : TASK_TOPICS[currentTask.number]?.maxPoints || 2}
              </span>
            </div>

            {/* Statement */}
            <div className="p-6 sm:p-8 text-slate-900 text-lg leading-relaxed border-b border-slate-100">
              <MathText text={currentTask.statement} />
            </div>

            {/* Answer & Self-Check Area */}
            <div className="p-6 sm:p-8 bg-slate-50/80">
              {!isPart2 ? (
                /* Part 1 Short Answer */
                <div className="max-w-md">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Ваш ответ (краткий):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={userAnswers[currentTask.id]?.value || ''}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Введите число (например, 7.2)"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl font-mono text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />

                    {isSubmitted && (
                      <div className="flex items-center gap-1 font-semibold text-sm">
                        {String(userAnswers[currentTask.id]?.value || '').trim().replace(',', '.') ===
                          String(currentTask.answer).trim().replace(',', '.') ||
                        (currentTask.answerAlt &&
                          String(userAnswers[currentTask.id]?.value || '').trim().replace(',', '.') ===
                            String(currentTask.answerAlt).trim().replace(',', '.')) ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-5 h-5" /> Верно (+1)
                          </span>
                        ) : (
                          <span className="text-rose-600 flex items-center gap-1">
                            <XCircle className="w-5 h-5" /> Ошибка (Ответ: {currentTask.answer})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    В качестве разделителя дробной части можно использовать точку или запятую.
                  </p>
                </div>
              ) : (
                /* Part 2 Self Check Points */
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Оценка решения 2-й части (Самопроверка по критериям):
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {Array.from(
                      { length: (TASK_TOPICS[currentTask.number]?.maxPoints || 2) + 1 },
                      (_, p) => (
                        <button
                          key={p}
                          onClick={() => handlePart2PointsChange(p)}
                          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
                            (userAnswers[currentTask.id]?.points ?? 0) === p
                              ? 'bg-amber-600 text-white shadow-md'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {p} {p === 1 ? 'балл' : p > 1 ? 'балла' : 'баллов'}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Solution display if submitted or requested */}
              {isSubmitted && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-emerald-400 rounded-lg font-mono text-xs font-semibold mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Правильный ответ: {currentTask.answer}</span>
                  </div>

                  <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Пошаговое решение:
                    </div>
                    <MathText text={currentTask.solution} className="text-sm leading-relaxed" />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="p-5 bg-white border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl text-xs font-semibold transition"
              >
                <ChevronLeft className="w-4 h-4" /> Назад
              </button>

              <button
                disabled={currentIndex === tasks.length - 1}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 rounded-xl text-xs font-semibold transition shadow-sm"
              >
                Вперед <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function MathTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f3] flex items-center justify-center text-slate-500 font-medium">Загрузка теста...</div>}>
      <MathTestContent />
    </Suspense>
  );
}
