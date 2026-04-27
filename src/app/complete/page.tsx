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
  const sid = searchParams.get('sid')

  useEffect(() => {
    if (!target && !isResume) {
      router.replace('/')
    }
  }, [target, isResume, router])

  // resume 중에는 target이 없어도 CompleteView를 마운트해야
  // CompleteView 내부의 resume effect가 실행되어 loadFromSnapshot을 호출할 수 있다
  if (!target && !isResume) return null

  // sid가 바뀌면 CompleteView를 리마운트해서 useState lazy init(isEditMode 등)을 재실행
  return <CompleteView key={sid ?? 'new'} />
}

export default function CompletePage() {
  return (
    <Suspense>
      <CompletePageInner />
    </Suspense>
  )
}
