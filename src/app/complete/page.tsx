'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEditorStore } from '@/store/useEditorStore'
import { CompleteView } from '@/components/editor/CompleteView'

function CompletePageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const target = useEditorStore((s) => s.target)
  const isResume = searchParams.get('resume') === '1'

  useEffect(() => {
    if (!target && !isResume) {
      router.replace('/')
    }
  }, [target, isResume, router])

  // resume 중에는 target이 없어도 CompleteView를 마운트해야
  // CompleteView 내부의 resume effect가 실행되어 loadFromSnapshot을 호출할 수 있다
  if (!target && !isResume) return null

  return <CompleteView />
}

export default function CompletePage() {
  return (
    <Suspense>
      <CompletePageInner />
    </Suspense>
  )
}
