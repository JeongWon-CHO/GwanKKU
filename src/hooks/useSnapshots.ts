import { useEffect, useState } from 'react'
import { loadSnapshots } from '@/lib/snapshot'
import type { CoffinSnapshot } from '@/types/snapshot'

export function useSnapshots(): CoffinSnapshot[] {
  const [snapshots, setSnapshots] = useState<CoffinSnapshot[]>([])

  useEffect(() => {
    setSnapshots(loadSnapshots())
  }, [])

  return snapshots
}
