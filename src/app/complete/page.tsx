'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/store/useEditorStore'
import { CompleteView } from '@/components/editor/CompleteView'

export default function CompletePage() {
  const router = useRouter()
  const target = useEditorStore((s) => s.target)

  useEffect(() => {
    if (!target) {
      router.replace('/editor/coffin')
    }
  }, [target, router])

  if (!target) return null

  return <CompleteView />
}
