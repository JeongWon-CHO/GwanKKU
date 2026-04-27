import { supabase } from './supabase'
import type { GuardianTypeKey } from '@/types/guardian'

const PENDING_KEY = 'gwankku:pending-guardian'
const TTL = 10 * 60 * 1000

type PendingGuardian = {
  key: GuardianTypeKey
  expiresAt: number
}

export function savePendingGuardian(key: GuardianTypeKey): void {
  const entry: PendingGuardian = { key, expiresAt: Date.now() + TTL }
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(entry))
  } catch {
    // QuotaExceededError — 저장 실패해도 흐름 유지
  }
}

export function getPendingGuardian(): GuardianTypeKey | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw) as PendingGuardian
    if (Date.now() > entry.expiresAt) {
      clearPendingGuardian()
      return null
    }
    return entry.key
  } catch {
    return null
  }
}

export function clearPendingGuardian(): void {
  try {
    localStorage.removeItem(PENDING_KEY)
  } catch {
    // ignore
  }
}

export async function saveGuardianToServer(
  userId: string,
  guardianKey: GuardianTypeKey,
): Promise<void> {
  const { error } = await supabase.from('profiles').upsert(
    {
      user_id: userId,
      guardian_key: guardianKey,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  )
  if (error) throw error
}

export async function fetchUserProfile(
  userId: string,
): Promise<{ guardian_key: string | null } | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('guardian_key')
    .eq('user_id', userId)
    .single()
  if (error) return null
  return data
}
