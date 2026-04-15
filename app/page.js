import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">AG Academy</h1>
      <div className="space-x-4">
        <Link href="/login" className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition">Войти</Link>
        <Link href="/register" className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Регистрация</Link>
      </div>
    </div>
  )
}
