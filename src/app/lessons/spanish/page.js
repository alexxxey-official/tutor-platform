'use client'
export default function SpanishLesson() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Испанский язык: Урок 1</h1>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <p className="text-xl mb-4 text-yellow-400">¡Hola! Добро пожаловать в урок испанского. 🇪🇸</p>
        <button onClick={() => window.history.back()} className="mt-8 px-6 py-2 bg-gray-700 rounded-lg">Назад</button>
      </div>
    </div>
  )
}
