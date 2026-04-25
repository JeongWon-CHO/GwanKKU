import type { CoffinSnapshot } from '@/types/snapshot'

const KEY = 'gwankku:coffin-detail'

export function saveCoffinView(snapshot: CoffinSnapshot): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(snapshot))
  } catch {
    // 저장 실패해도 네비게이션은 계속 진행
  }
}

export function loadCoffinView(): CoffinSnapshot | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw) as CoffinSnapshot
  } catch {
    return null
  }
}
