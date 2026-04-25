const KEY = 'gwankku:pending-action'
const TTL = 10 * 60 * 1000

type PendingAction = {
  type: 'publish'
  snapshotId: string
  expiresAt: number
}

export function savePendingAction(snapshotId: string): void {
  const action: PendingAction = {
    type: 'publish',
    snapshotId,
    expiresAt: Date.now() + TTL,
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(action))
  } catch {
    // QuotaExceededError — 저장 실패해도 흐름 유지
  }
}

export function getPendingAction(): PendingAction | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const action = JSON.parse(raw) as PendingAction
    if (Date.now() > action.expiresAt) {
      clearPendingAction()
      return null
    }
    return action
  } catch {
    return null
  }
}

export function clearPendingAction(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
