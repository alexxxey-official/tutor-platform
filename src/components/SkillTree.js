'use client'
import { motion } from 'framer-motion'
import { Check, Star, BookOpen } from 'lucide-react'
import Link from 'next/link'

const SkillNode = ({ item, index }) => {
  // Чередуем узлы: один выше линии, другой ниже (создаем красивую "змейку")
  const isUp = index % 2 === 0
  
  const statusColors = {
    completed: 'bg-emerald-500 shadow-emerald-500/30 text-white border-2 border-emerald-400',
    available: 'bg-white shadow-md text-slate-700 border-4 border-amber-400 hover:bg-amber-50'
  }

  const StatusIcon = () => {
    if (item.status === 'completed') return <Check size={20} strokeWidth={4} />
    return <Star size={18} fill="#fbbf24" stroke="none" />
  }

  return (
    <div className={`relative flex flex-col items-center min-w-[100px] sm:min-w-[120px] ${isUp ? 'mb-12' : 'mt-12'}`}>
      <Link href={item.link || '#'} className="relative z-10 flex flex-col items-center group">
        
        {/* Кнопка-узел */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all z-10 ${statusColors[item.status] || statusColors.available}`}
        >
          <StatusIcon />
        </motion.div>
        
        {/* Постоянно видимая подпись */}
        <div className={`absolute ${isUp ? 'top-full mt-2' : 'bottom-full mb-2'} w-24 sm:w-28 text-center`}>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 leading-tight block group-hover:text-indigo-600 transition-colors">
            {item.title}
          </span>
        </div>

      </Link>
    </div>
  )
}

export default function SkillTree({ subject, lessons }) {
  return (
    <div className="w-full py-4">
      {/* Заголовок предмета */}
      <div className="mb-8 px-4 flex items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-black unbounded uppercase text-indigo-950">
          {subject}
        </h2>
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold text-[10px] tracking-widest uppercase">
          <BookOpen size={12} /> {lessons.length} уроков
        </div>
      </div>

      {/* Горизонтальный скролл-контейнер */}
      <div className="relative w-full overflow-x-auto pb-16 pt-16 px-4 sm:px-8 hide-scrollbar">
        
        {/* Фоновая линия (Горизонтальная) */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 rounded-full z-0"></div>
        
        {/* Сами узлы (выстраиваются в ряд) */}
        <div className="flex items-center gap-6 sm:gap-10 min-w-max relative z-10 px-4">
          {lessons.map((lesson, idx) => (
            <SkillNode 
              key={lesson.id} 
              item={lesson} 
              index={idx} 
            />
          ))}
        </div>
      </div>
      
      {/* Скрываем скроллбар для красоты, но оставляем функциональность */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}