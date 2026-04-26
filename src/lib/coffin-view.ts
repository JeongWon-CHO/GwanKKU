import type { CoffinSnapshot } from '@/types/snapshot'

const KEY = 'gwankku:coffin-detail'

type CoffinViewContext = {
  snapshot: CoffinSnapshot
  isOwn: boolean
}

export function saveCoffinView(snapshot: CoffinSnapshot, isOwn: boolean): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ snapshot, isOwn }))
  } catch {
    // 저장 실패해도 네비게이션은 계속 진행
  }
}

export function loadCoffinView(): CoffinViewContext | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw) as CoffinViewContext
  } catch {
    return null
  }
}
