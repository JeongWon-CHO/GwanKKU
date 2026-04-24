'use client'

import { useCallback, useEffect, useState } from 'react'

const KEY = 'gwankku:liked-snapshots'

function loadLiked(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function persistLiked(liked: Set<string>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify([...liked]))
  } catch {}
}

export function useLikedSnapshots() {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setLikedIds(loadLiked())
  }, [])

  const isLiked = useCallback((id: string) => likedIds.has(id), [likedIds])

  const addLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      persistLiked(next)
      return next
    })
  }, [])

  const removeLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      persistLiked(next)
      return next
    })
  }, [])

  return { isLiked, addLike, removeLike }
}
