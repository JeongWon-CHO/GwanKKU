'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function AuthCallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const doneRef = useRef(false)

  useEffect(() => {
    const next = searchParams.get('next') ?? '/'

    function go(to: string) {
      if (doneRef.current) return
      doneRef.current = true
      router.replace(to)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) go(next)
    })

    const checkTimer = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) go(next)
    }, 1500)

    const fallbackTimer = setTimeout(() => go('/'), 10_000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(checkTimer)
      clearTimeout(fallbackTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackHandler />
    </Suspense>
  )
}
