// app/not-found.tsx
'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      router.push('/')
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="max-w-lg w-full text-center bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Ícone animado */}
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-blue-200 rounded-full animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
        </div>

        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Ops! Página não encontrada
        </h2>
        
        <p className="text-gray-600 mb-2">
          Parece que você se perdeu. Vamos te ajudar a voltar.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Redirecionando em {countdown} segundos...
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Voltar para o início
          </Link>
          
        </div>
      </div>
    </div>
  )
}