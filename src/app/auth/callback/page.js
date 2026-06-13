'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) {
          router.push('/dashboard')
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/login')
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f3]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#2a9d8f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#1a1a2e] font-bold">Подтверждение аккаунта...</p>
      </div>
    </div>
  )
}
