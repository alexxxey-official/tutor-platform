'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import MathText from '../../components/MathText';
import {
  EGE_MATH_TASKS,
  TASK_TOPICS,
  getTasksByFilters,
  generateStandardVariant,
} from '../../lib/ege-math-bank';
import {
  BookOpen,
  CheckCircle2,
  Printer,
  Play,
  RotateCcw,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  FileText,
  GraduationCap,
  ArrowRight,
  Layers,
} from 'lucide-react';

export default function MathBankPage() {
  const [selectedNumber, setSelectedNumber] = useState(0); // 0 = Все номера
  const [selectedDifficulty, setSelectedDifficulty] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  // Фильтрация списка задач
  const filteredTasks = useMemo(() => {
    return getTasksByFilters({
      number: selectedNumber,
      difficulty: selectedDifficulty,
      search: searchQuery,
    });
  }, [selectedNumber, selectedDifficulty, searchQuery]);

  // Переключение показа решения
  const toggleSolution = (taskId) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Добавление/удаление из текущего варианта
  const toggleTaskSelection = (taskId) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  // Сгенерировать стандартный вариант (1-18)
  const handleGenerateStandard = () => {
    const stdVariant = generateStandardVariant();
    setSelectedTaskIds(stdVariant.map((t) => t.id));
  };

  // Быстрый выбор: Первая часть (#1-11)
  const handleSelectPart1 = () => {
    const part1Ids = EGE_MATH_TASKS.filter((t) => t.number <= 11).map((t) => t.id);
    setSelectedTaskIds(part1Ids);
  };

  // Быстрый выбор: Вторая часть (#12-18)
  const handleSelectPart2 = () => {
    const part2Ids = EGE_MATH_TASKS.filter((t) => t.number >= 12).map((t) => t.id);
    setSelectedTaskIds(part2Ids);
  };

  // Сброс выбора
  const handleClearSelection = () => {
    setSelectedTaskIds([]);
  };

  const selectedTasks = useMemo(() => {
    return EGE_MATH_TASKS.filter((t) => selectedTaskIds.includes(t.id));
  }, [selectedTaskIds]);

  const queryParams = selectedTaskIds.length > 0 ? `?ids=${selectedTaskIds.join(',')}` : '';

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-32">
      {/* Header Banner */}
      <header className="bg-slate-900 text-white pt-10 pb-12 px-4 sm:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>ЕГЭ Профильная математика • Банк Заданий</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight mb-3">
                Конструктор Вариантов & Задач
              </h1>
              <p className="text-slate-400 text-base max-w-2xl">
                Решайте интерактивные задачи с пошаговыми решениями в KaTeX, формируйте
                собственные варианты, проходите онлайн-тесты или распечатывайте бланки для уроков.
              </p>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleGenerateStandard}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-900/30"
              >
                <Sparkles className="w-4 h-4" />
                Собрать вариант 2026
              </button>
              <button
                onClick={handleSelectPart1}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs border border-slate-700 transition"
              >
                Часть 1 (#1-11)
              </button>
              <button
                onClick={handleSelectPart2}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs border border-slate-700 transition"
              >
                Часть 2 (#12-18)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        {/* Number Selector Tabs (#1-18) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" /> Выбор номера задания:
            </span>
            {selectedNumber !== 0 && (
              <button
                onClick={() => setSelectedNumber(0)}
                className="text-xs text-emerald-600 font-medium hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Показать все
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedNumber(0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedNumber === 0
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Все (1-18)
            </button>
            {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => {
              const isSelected = selectedNumber === num;
              const isPart2 = num >= 12;
              return (
                <button
                  key={num}
                  onClick={() => setSelectedNumber(num)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isPart2
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>№{num}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls (Search + Difficulty) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по теме, тегам или тексту..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium">Сложность:</span>
            {['Все', 'Базовый', 'Средний', 'Профиль'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedDifficulty === diff
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-slate-700 font-semibold mb-1">Задания не найдены</h3>
              <p className="text-slate-400 text-sm">
                Попробуйте изменить параметры поиска или сбросить фильтры.
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isSelected = selectedTaskIds.includes(task.id);
              const isExpanded = expandedSolutions[task.id];
              const isPart2 = task.number >= 12;

              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/10'
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/40">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${
                          isPart2
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        Задание №{task.number}
                      </span>

                      <span className="text-xs font-semibold text-slate-700">
                        {task.topic} {task.subtopic && `• ${task.subtopic}`}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                        {task.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleTaskSelection(task.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>В варианте</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Добавить в вариант</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Task Statement (LaTeX Render) */}
                  <div className="p-5 sm:p-6 text-slate-800 text-base leading-relaxed">
                    <MathText text={task.statement} />
                  </div>

                  {/* Tags & Action Bar */}
                  <div className="px-5 sm:px-6 py-3.5 bg-slate-50/60 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {task.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-white border border-slate-200 text-slate-500 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleSolution(task.id)}
                      className="flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800 py-1"
                    >
                      <span>{isExpanded ? 'Скрыть решение' : 'Показать решение и ответ'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Solution & Answer Panel */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-slate-900 text-slate-100 border-t border-slate-800 transition-all">
                      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-lg text-xs font-mono font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ответ: {task.answer}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Подробное решение:
                        </div>
                        <MathText text={task.solution} className="text-slate-200 text-sm leading-relaxed" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Floating Variant Builder Footer Drawer */}
      {selectedTaskIds.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-lg shadow-md">
              {selectedTaskIds.length}
            </div>
            <div>
              <div className="font-semibold text-sm">Вариант сформирован</div>
              <div className="text-xs text-slate-400">
                Задач: {selectedTaskIds.length} из 18
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleClearSelection}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Очистить выбор"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Print Student Mode */}
            <Link
              href={`/math-bank/print${queryParams}&mode=student`}
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Печать (Ученик)</span>
            </Link>

            {/* Print Teacher Mode */}
            <Link
              href={`/math-bank/print${queryParams}&mode=teacher`}
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-medium shadow-md transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Печать (Учитель)</span>
            </Link>

            {/* Online Test Mode */}
            <Link
              href={`/math-bank/test${queryParams}`}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Пройти тест онлайн</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
