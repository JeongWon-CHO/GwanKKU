import type { CoffinSnapshot } from '@/types/snapshot'

const KEY = 'gwankku:snapshots'
const MAX = 5

export function loadSnapshots(): CoffinSnapshot[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as CoffinSnapshot[]
  } catch {
    return []
  }
}

export function saveSnapshot(snapshot: CoffinSnapshot): void {
  const prev = loadSnapshots()
  const next = [snapshot, ...prev].slice(0, MAX)
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // QuotaExceededError — 저장 실패해도 서비스 흐름은 유지
  }
}
