'use client'
import { motion } from 'framer-motion'
import { Check, Lock, Play, Star } from 'lucide-react'
import Link from 'next/link'

const SkillNode = ({ item, index, isLeft }) => {
  const statusColors = {
    completed: 'bg-emerald-500 shadow-emerald-500/50',
    current: 'bg-amber-400 shadow-amber-400/50 ring-4 ring-amber-400/30',
    locked: 'bg-slate-200 border-4 border-slate-300'
  }

  const iconColors = {
    completed: 'text-white',
    current: 'text-white',
    locked: 'text-slate-400'
  }

  const StatusIcon = () => {
    if (item.status === 'completed') return <Check size={32} strokeWidth={3} />
    if (item.status === 'current') return <Star size={32} fill="currentColor" />
    return <Lock size={28} />
  }

  const NodeContent = (
    <div className={`relative flex flex-col items-center group w-24 h-24 sm:w-28 sm:h-28`}>
      {/* Tooltip */}
      <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-xl whitespace-nowrap pointer-events-none z-20 shadow-xl">
        {item.title}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
      </div>

      {/* Button */}
      <motion.div 
        whileHover={item.status !== 'locked' ? { scale: 1.1 } : {}}
        whileTap={item.status !== 'locked' ? { scale: 0.95 } : {}}
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-colors z-10 ${statusColors[item.status]} cursor-${item.status === 'locked' ? 'not-allowed' : 'pointer'}`}
      >
        <div className={iconColors[item.status]}>
          <StatusIcon />
        </div>
      </motion.div>
    </div>
  )

  // Align nodes left or right to create a winding path
  return (
    <div className={`flex w-full ${isLeft ? 'justify-start sm:pl-[20%]' : 'justify-end sm:pr-[20%]'} mb-8 relative`}>
      {item.status !== 'locked' ? (
        <Link href={item.link || '#'} className="relative z-10 block">
          {NodeContent}
        </Link>
      ) : (
        <div className="relative z-10 opacity-70">
          {NodeContent}
        </div>
      )}
    </div>
  )
}

export default function SkillTree({ subject, lessons }) {
  return (
    <div className="w-full max-w-md mx-auto py-12 relative">
      {/* Background Path Line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-slate-200 rounded-full z-0 opacity-50"></div>
      
      {/* Decorative Title */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl font-black unbounded uppercase text-indigo-950 mb-2">
          {subject}
        </h2>
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full font-bold text-sm tracking-widest uppercase">
          <Star size={16} fill="currentColor" /> Level B1
        </div>
      </div>

      {/* Nodes */}
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, idx) => (
          <SkillNode 
            key={lesson.id} 
            item={lesson} 
            index={idx} 
            isLeft={idx % 2 === 0} 
          />
        ))}
      </div>
    </div>
  )
}