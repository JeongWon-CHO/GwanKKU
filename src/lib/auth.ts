import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export async function signInWithGoogle(path: string): Promise<void> {
  const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(path)}`
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: callbackUrl },
  })
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}

export async function getUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser()
  return data.user
}
