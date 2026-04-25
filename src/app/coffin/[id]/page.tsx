'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadCoffinView } from '@/lib/coffin-view'
import { CoffinDetailView } from '@/components/coffin/CoffinDetailView'
import type { CoffinSnapshot } from '@/types/snapshot'

export default function CoffinDetailPage() {
  const router = useRouter()
  const [snapshot, setSnapshot] = useState<CoffinSnapshot | null>(null)
  const [isOwn, setIsOwn] = useState(false)

  useEffect(() => {
    const context = loadCoffinView()
    if (!context) {
      router.replace('/gallery')
      return
    }
    setSnapshot(context.snapshot)
    setIsOwn(context.isOwn)
  }, [router])

  if (!snapshot) return null
  return <CoffinDetailView snapshot={snapshot} isOwn={isOwn} />
}
