'use client'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export default function AdvancedProgressBar({ data, total, title }) {
  // data: { id: { status, attempts }, ... }
  const exercises = Object.values(data || {})
  const correct = exercises.filter(ex => ex.status === 'correct').length
  const revealed = exercises.filter(ex => ex.status === 'revealed').length
  
  const segments = []
  for (let i = 0; i < total; i++) {
    const ex = exercises[i]
    if (!ex) segments.push('empty')
    else if (ex.status === 'correct') segments.push('correct')
    else if (ex.status === 'revealed') segments.push('revealed')
    else segments.push('attempting')
  }

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">{title}</h3>
        <span className="text-2xl font-black text-slate-900 font-mono">{pct}%</span>
      </div>

      <div className="flex gap-1.5 h-3">
        {segments.map((type, idx) => (
          <div 
            key={idx}
            className={cn(
              "flex-1 rounded-full transition-all duration-500",
              type === 'empty' ? "bg-slate-100" :
              type === 'correct' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" :
              type === 'revealed' ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]" :
              "bg-indigo-300 animate-pulse"
            )}
          />
        ))}
      </div>
      
      <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>{correct} / {total} верно</span>
        {revealed > 0 && <span className="text-rose-400">{revealed} провалено</span>}
      </div>
    </div>
  )
}
