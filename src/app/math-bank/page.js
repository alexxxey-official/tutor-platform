'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import MathText from '../../components/MathText';
import {
  EGE_MATH_TASKS,
  TASK_TOPICS,
  SOURCES_LIST,
  getTasksByFilters,
  generateCustomVariant,
} from '../../lib/ege-math-bank';
import {
  Search,
  Plus,
  Minus,
  X,
  Printer,
  Play,
  ArrowRight,
  AlertCircle,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

export default function MathBankPage() {
  // Counters for constructor quantities per task number (1 to 19)
  const [quantities, setQuantities] = useState(() => {
    const init = {};
    for (let i = 1; i <= 19; i++) init[i] = 0;
    return init;
  });

  const [selectedSource, setSelectedSource] = useState('Все источники');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrototypeFilter, setActivePrototypeFilter] = useState(null);
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [activeTopicFilter, setActiveTopicFilter] = useState(0); // 0 = all

  // Изменение количества [ - N + ]
  const handleQuantityChange = (num, delta) => {
    setQuantities((prev) => {
      const current = prev[num] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [num]: next };
    });
  };

  // Галочка "Краткий ответ" (установить по 1 задаче для #1-12)
  const handleTogglePart1 = (checked) => {
    setQuantities((prev) => {
      const next = { ...prev };
      for (let i = 1; i <= 12; i++) {
        next[i] = checked ? 1 : 0;
      }
      return next;
    });
  };

  // Галочка "Развернутый ответ" (установить по 1 задаче для #13-19)
  const handleTogglePart2 = (checked) => {
    setQuantities((prev) => {
      const next = { ...prev };
      for (let i = 13; i <= 19; i++) {
        next[i] = checked ? 1 : 0;
      }
      return next;
    });
  };

  // Сбросить все
  const handleClearAll = () => {
    setQuantities((prev) => {
      const next = {};
      for (let i = 1; i <= 19; i++) next[i] = 0;
      return next;
    });
    setActivePrototypeFilter(null);
  };

  // Подсчет общего количества выбранных задач
  const totalSelectedCount = useMemo(() => {
    return Object.values(quantities).reduce((a, b) => a + b, 0);
  }, [quantities]);

  const part1Checked = useMemo(() => {
    for (let i = 1; i <= 12; i++) {
      if ((quantities[i] || 0) === 0) return false;
    }
    return true;
  }, [quantities]);

  const part2Checked = useMemo(() => {
    for (let i = 13; i <= 19; i++) {
      if ((quantities[i] || 0) === 0) return false;
    }
    return true;
  }, [quantities]);

  // Фильтрация списка задач
  const filteredTasks = useMemo(() => {
    return getTasksByFilters({
      number: activeTopicFilter,
      sourceCategory: selectedSource,
      searchQuery: searchQuery,
      prototypeId: activePrototypeFilter,
    });
  }, [activeTopicFilter, selectedSource, searchQuery, activePrototypeFilter]);

  // Сформировать вариант
  const generatedVariant = useMemo(() => {
    return generateCustomVariant(quantities);
  }, [quantities]);

  const generatedTaskIds = useMemo(() => {
    return generatedVariant.map((t) => t.id);
  }, [generatedVariant]);

  const queryParams = generatedTaskIds.length > 0 ? `?ids=${generatedTaskIds.join(',')}` : '';

  // Переключение решения
  const toggleSolution = (taskId) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Фильтр «Аналогичные задачи»
  const handleFilterSimilar = (prototypeId) => {
    setActivePrototypeFilter(prototypeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] font-sans antialiased">
      {/* Top Banner */}
      <header className="bg-slate-900 text-white pt-8 pb-10 px-4 sm:px-8 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ЕГЭ 2026 • Профильный уровень</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Банк Заданий & Конструктор Вариантов
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-slate-300 hover:text-white font-medium underline"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </header>

      {/* Main 2-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Floating / Sticky Constructor Panel */}
        <aside className="lg:col-span-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] overflow-y-auto space-y-5 pr-1">
          {/* Main Constructor Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Количество
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Тема
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-5 text-sm">
              {/* --- SECTION 1: Краткий ответ (#1-12) --- */}
              <div>
                <div className="text-xs font-bold italic text-indigo-950 mb-2.5 border-b border-slate-100 pb-1">
                  Краткий ответ
                </div>

                <div className="space-y-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
                    const topic = TASK_TOPICS[num];
                    const q = quantities[num] || 0;
                    return (
                      <div
                        key={num}
                        className="flex items-center justify-between gap-3 text-xs"
                      >
                        {/* Counter Controls [ - N + ] */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleQuantityChange(num, -1)}
                            disabled={q === 0}
                            className="w-5 h-5 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 disabled:opacity-30 text-slate-700 flex items-center justify-center font-bold transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-mono font-bold text-slate-900 bg-slate-50 py-0.5 rounded border border-slate-200 text-[11px]">
                            {q}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(num, 1)}
                            className="w-5 h-5 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Topic Name */}
                        <button
                          onClick={() => setActiveTopicFilter(num)}
                          className={`text-left flex-1 font-medium transition ${
                            activeTopicFilter === num
                              ? 'text-emerald-700 font-bold underline'
                              : 'text-slate-800 hover:text-indigo-900'
                          }`}
                        >
                          {topic.title}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* --- SECTION 2: Развернутый ответ (#13-19) --- */}
              <div>
                <div className="text-xs font-bold italic text-indigo-950 mb-2.5 border-b border-slate-100 pb-1">
                  Развернутый ответ
                </div>

                <div className="space-y-2">
                  {Array.from({ length: 7 }, (_, i) => i + 13).map((num) => {
                    const topic = TASK_TOPICS[num];
                    const q = quantities[num] || 0;
                    return (
                      <div
                        key={num}
                        className="flex items-center justify-between gap-3 text-xs"
                      >
                        {/* Counter Controls [ - N + ] */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleQuantityChange(num, -1)}
                            disabled={q === 0}
                            className="w-5 h-5 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 disabled:opacity-30 text-slate-700 flex items-center justify-center font-bold transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-mono font-bold text-slate-900 bg-slate-50 py-0.5 rounded border border-slate-200 text-[11px]">
                            {q}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(num, 1)}
                            className="w-5 h-5 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Topic Name */}
                        <button
                          onClick={() => setActiveTopicFilter(num)}
                          className={`text-left flex-1 font-medium transition ${
                            activeTopicFilter === num
                              ? 'text-amber-700 font-bold underline'
                              : 'text-slate-800 hover:text-indigo-900'
                          }`}
                        >
                          {topic.title}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Box (Matching Image 1 Right Box) */}
          <div className="bg-blue-50/90 border border-blue-200/90 p-5 rounded-2xl shadow-sm space-y-3.5">
            <Link
              href={generatedTaskIds.length > 0 ? `/math-bank/test${queryParams}` : '#'}
              className={`w-full py-3 px-4 rounded-xl text-center font-bold text-xs sm:text-sm transition block shadow-sm ${
                generatedTaskIds.length > 0
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-300'
                  : 'bg-blue-300 text-white cursor-not-allowed'
              }`}
            >
              Составить вариант {totalSelectedCount > 0 && `(${totalSelectedCount})`}
            </Link>

            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={part1Checked}
                  onChange={(e) => handleTogglePart1(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Краткий ответ (#1-12)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={part2Checked}
                  onChange={(e) => handleTogglePart2(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Развернутый ответ (#13-19)</span>
              </label>
            </div>

            <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs">
              <button
                onClick={handleClearAll}
                className="text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Убрать все
              </button>

              {totalSelectedCount > 0 && (
                <div className="flex gap-1.5">
                  <Link
                    href={`/math-bank/print${queryParams}&mode=student`}
                    target="_blank"
                    className="p-1.5 bg-white border border-blue-200 rounded-lg text-slate-700 hover:bg-blue-100"
                    title="Печать для ученика"
                  >
                    <Printer className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Task List Cards (Clean Shkolkovo Style) */}
        <main className="lg:col-span-7 space-y-6">
          {/* Top Filter Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по тексту или номеру #..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Source Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-medium">Источник:</span>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  {SOURCES_LIST.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Bar */}
            {(activePrototypeFilter || activeTopicFilter !== 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400 font-medium">Активные фильтры:</span>

                {activeTopicFilter !== 0 && (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-semibold flex items-center gap-1">
                    №{activeTopicFilter}
                    <button onClick={() => setActiveTopicFilter(0)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {activePrototypeFilter && (
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg font-semibold flex items-center gap-1">
                    Прототип {activePrototypeFilter}
                    <button onClick={() => setActivePrototypeFilter(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={() => {
                    setActiveTopicFilter(0);
                    setActivePrototypeFilter(null);
                    setSearchQuery('');
                  }}
                  className="text-xs text-rose-600 font-medium hover:underline ml-auto"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>

          {/* Tasks Cards Container */}
          <div className="space-y-6">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-slate-700 font-semibold mb-1">Задания не найдены</h3>
                <p className="text-slate-400 text-xs">
                  Попробуйте выбрать другой источник или сбросить фильтр аналогичных задач.
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const isExpanded = expandedSolutions[task.id];

                return (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4 transition hover:border-slate-300"
                  >
                    {/* Header Line (Matching Image 2): "Задача X #133120 Максимум баллов: 1" + Source on the right */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-bold text-slate-900 text-sm">
                          Задача {task.number}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {task.taskCode}
                        </span>
                        <span className="text-slate-400">
                          Максимум баллов за задание: {task.number <= 12 ? 1 : TASK_TOPICS[task.number]?.maxPoints || 2}
                        </span>
                      </div>

                      {/* Right Aligned Muted Source */}
                      <div className="text-xs text-slate-400 italic text-left sm:text-right">
                        <strong>Источники:</strong> {task.source}
                      </div>
                    </div>

                    {/* Task Statement (Clean Pure Text with KaTeX) */}
                    <div className="text-slate-900 text-base leading-relaxed font-sans py-2">
                      <MathText text={task.statement} />
                    </div>

                    {/* Action Buttons Bar (Matching Image 2) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Black Button: Ответ и решение */}
                        <button
                          onClick={() => toggleSolution(task.id)}
                          className="px-4 py-2 bg-[#1a1a2e] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
                        >
                          Ответ и решение
                        </button>

                        {/* Gray Button: Аналогичные задачи */}
                        <button
                          onClick={() => handleFilterSimilar(task.prototypeId)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                        >
                          Аналогичные задачи
                        </button>
                      </div>

                      {/* Right Link: Сообщить об ошибке */}
                      <button
                        onClick={() => alert('Сообщение об ошибке отправлено преподавателю!')}
                        className="text-xs text-slate-400 hover:text-slate-600 transition"
                      >
                        Сообщить об ошибке
                      </button>
                    </div>

                    {/* Expanded Solution Panel (Pure Clean Text Shkolkovo Style) */}
                    {isExpanded && (
                      <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl relative space-y-4 text-slate-900 text-sm">
                        <button
                          onClick={() => toggleSolution(task.id)}
                          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Ответ и решение
                        </div>

                        <div className="space-y-3 leading-relaxed">
                          <MathText text={task.solution} className="text-slate-900 font-sans" />
                        </div>

                        <div className="pt-3 border-t border-slate-200 font-bold text-slate-900 text-base">
                          Ответ: {task.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
