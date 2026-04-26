'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { signInWithGoogle, signOut } from '@/lib/auth'

type Props = {
  slot: 'auth' | 'archive'
}

export function AuthHeaderButton({ slot }: Props) {
  const router = useRouter()
  const { user, loading } = useAuth()

  if (loading) return null

  if (slot === 'archive') {
    if (!user) return null
    return (
      <button
        onClick={() => router.push('/archive')}
        className="text-sm text-body transition-opacity hover:opacity-70"
      >
        내 보관함 →
      </button>
    )
  }

  // slot === 'auth'
  if (user) {
    return (
      <button
        onClick={() => signOut()}
        className="text-sm text-caption transition-opacity hover:opacity-70"
      >
        로그아웃
      </button>
    )
  }

  return (
    <button
      onClick={() => signInWithGoogle('/')}
      className="text-sm text-caption transition-opacity hover:opacity-70"
    >
      로그인
    </button>
  )
}
