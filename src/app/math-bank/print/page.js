'use client';

import React, { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MathText from '../../../components/MathText';
import { EGE_MATH_TASKS, generateStandardVariant } from '../../../lib/ege-math-bank';
import { Printer, FileText, UserCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function PrintVariantContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids');
  const modeParam = searchParams.get('mode') || 'student'; // 'student' | 'teacher'

  // Получение задач для варианта
  const tasks = useMemo(() => {
    if (idsParam) {
      const ids = idsParam.split(',');
      const selected = EGE_MATH_TASKS.filter((t) => ids.includes(t.id));
      if (selected.length > 0) return selected;
    }
    return generateStandardVariant();
  }, [idsParam]);

  const part1Tasks = tasks.filter((t) => t.number <= 11);
  const part2Tasks = tasks.filter((t) => t.number >= 12);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white print:min-h-0 font-sans text-slate-900">
      {/* Top Non-Printable Controls Bar */}
      <header className="print:hidden bg-slate-900 text-white sticky top-0 z-50 shadow-lg border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/math-bank"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться в банк задач</span>
          </Link>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <Link
              href={`/math-bank/print?ids=${idsParam || ''}&mode=student`}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                modeParam === 'student'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Версия для Ученика</span>
            </Link>

            <Link
              href={`/math-bank/print?ids=${idsParam || ''}&mode=teacher`}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                modeParam === 'teacher'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Версия для Учителя (с решениями)</span>
            </Link>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-900/30"
          >
            <Printer className="w-4 h-4" />
            <span>Печать / Сохранить в PDF</span>
          </button>
        </div>
      </header>

      {/* Printable Sheet Container */}
      <main className="max-w-4xl mx-auto my-8 print:my-0 p-8 sm:p-12 bg-white print:p-0 print:shadow-none shadow-2xl rounded-2xl print:rounded-none">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-8">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
                ЕГЭ по математике • Профильный уровень
              </span>
              <h1 className="text-2xl font-bold font-serif">
                {modeParam === 'teacher'
                  ? 'Тренировочный вариант (Ключи и Пошаговые Решения)'
                  : 'Тренировочный вариант КИМ № 2026-M'}
              </h1>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>Дата: ____.____.2026</div>
              <div>Время выполнения: 3 ч. 55 мин.</div>
            </div>
          </div>

          {modeParam === 'student' && (
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 text-xs text-slate-600 rounded-lg flex justify-between items-center">
              <span>ФИО Ученика: _________________________________________________</span>
              <span>Класс: ________</span>
            </div>
          )}
        </div>

        {/* Part 1 (Short Answer) */}
        {part1Tasks.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-2 mb-6">
              Часть 1 (Задания № 1–11)
            </h2>

            <div className="space-y-8">
              {part1Tasks.map((task) => (
                <div key={task.id} className="break-inside-avoid">
                  <div className="font-bold text-sm text-slate-900 mb-2 flex items-center justify-between">
                    <span>Задание №{task.number} ({task.topic})</span>
                    {modeParam === 'teacher' && (
                      <span className="text-xs font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                        Ответ: {task.answer}
                      </span>
                    )}
                  </div>

                  <div className="text-sm leading-relaxed text-slate-800 mb-3">
                    <MathText text={task.statement} />
                  </div>

                  {modeParam === 'student' && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 font-mono">
                      <span>Ответ:</span>
                      <div className="w-48 h-7 border border-slate-400 bg-slate-50/50 rounded flex items-center justify-center text-slate-300">
                        [ Бланк ответов №1 ]
                      </div>
                    </div>
                  )}

                  {modeParam === 'teacher' && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 mt-2">
                      <div className="font-bold text-slate-700">Решение:</div>
                      <MathText text={task.solution} className="text-slate-800" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Part 2 (Detailed Solution) */}
        {part2Tasks.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-2 mb-6">
              Часть 2 (Задания № 12–18)
            </h2>

            <div className="space-y-10">
              {part2Tasks.map((task) => (
                <div key={task.id} className="break-inside-avoid">
                  <div className="font-bold text-sm text-slate-900 mb-2 flex items-center justify-between">
                    <span>Задание №{task.number} ({task.topic})</span>
                    {modeParam === 'teacher' && (
                      <span className="text-xs font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                        Ответ: {task.answer}
                      </span>
                    )}
                  </div>

                  <div className="text-sm leading-relaxed text-slate-800 mb-4">
                    <MathText text={task.statement} />
                  </div>

                  {modeParam === 'student' && (
                    <div className="my-4 border border-dashed border-slate-300 rounded-xl h-44 bg-slate-50/30 p-3 text-[11px] text-slate-400 flex items-start justify-between">
                      <span>Место для решения задания №{task.number} на Бланке №2</span>
                      <span className="font-mono">Макс: {task.number === 12 || task.number === 14 || task.number === 15 ? '2 б.' : task.number === 13 || task.number === 16 ? '3 б.' : '4 б.'}</span>
                    </div>
                  )}

                  {modeParam === 'teacher' && (
                    <div className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs space-y-2">
                      <div className="font-bold text-emerald-400">Пошаговое решение и критерии:</div>
                      <MathText text={task.solution} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Answer Grid Sheet for Student Version */}
        {modeParam === 'student' && part1Tasks.length > 0 && (
          <div className="break-before-page pt-6 border-t-2 border-slate-900">
            <h3 className="font-bold text-center text-sm uppercase tracking-wider mb-4">
              Бланк ответов № 1 (Часть 1)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {part1Tasks.map((t) => (
                <div key={t.id} className="p-3 border border-slate-300 rounded-lg flex items-center justify-between">
                  <span className="font-bold text-xs">№{t.number}</span>
                  <div className="w-24 h-7 border border-slate-400 rounded bg-white"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function PrintVariantPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-medium">Подготовка печатной версии...</div>}>
      <PrintVariantContent />
    </Suspense>
  );
}
