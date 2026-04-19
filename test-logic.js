const lessons = [
  { id: 'm1', title: 'Passive Voice', link: '/lessons/english/passive-voice', status: 'completed', score: 41, total_score: 41, meta: { totalCW: 23, totalHW: 18 }, original: { progress_data: { cw: { 'hw1': { status: 'correct' } }, hw: { 'hw1': { status: 'correct' } } } } },
  { id: 'm2', title: 'Indefinite Pronouns', link: '/lessons/english/indefinite-pronouns', status: 'available', score: 10, total_score: 50, meta: { totalCW: 30, totalHW: 20 }, original: { progress_data: { cw: {}, hw: {} } } },
  { id: 's1', title: 'Введение: Карта грамматики', link: '/lessons/spanish/intro', status: 'completed', score: 0, total_score: 0, meta: { totalCW: 0, totalHW: 0 }, original: {} },
  { id: 's2', title: 'Урок 1: Правила чтения', link: '/lessons/spanish/phonetics', status: 'available', score: 0, total_score: 5, meta: { totalCW: 3, totalHW: 2 }, original: {} }
]

lessons.forEach((lesson, idx) => {
  const progressData = lesson.original?.progress_data || {}
  
  const calcStats = (mode, total) => {
    const data = progressData ? progressData[mode] : {}
    const safeData = data || {}
    const exercises = Object.values(safeData)
    const correct = exercises.filter(ex => ex && ex.status === 'correct').length
    const revealed = exercises.filter(ex => ex && ex.status === 'revealed').length
    const isComplete = (correct + revealed) >= total && total > 0
    return { correct, revealed, total, pct: total > 0 ? Math.round((correct / total) * 100) : 0, isComplete }
  }

  const safeTotalCW = lesson.meta ? (lesson.meta.totalCW || 0) : 0
  const safeTotalHW = lesson.meta ? (lesson.meta.totalHW || 0) : 0

  const cwStats = calcStats('cw', safeTotalCW)
  const hwStats = calcStats('hw', safeTotalHW)
  
  const isComplete = (lesson.meta && safeTotalCW + safeTotalHW > 0) 
    ? (cwStats.isComplete && hwStats.isComplete) 
    : (lesson.status === 'completed' || (lesson.total_score > 0 && lesson.score === lesson.total_score))

  console.log({ id: lesson.id, isComplete, cwStats, hwStats })
})