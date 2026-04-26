'use client'

import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { loadSnapshots } from '@/lib/snapshot'
import type { CoffinSnapshot } from '@/types/snapshot'
import type { EditorTarget, FaceKey, GridState, MessageStyle } from '@/types/editor'
import type { PatternId } from '@/constants/editor-patterns'
import type { GuardianTypeKey } from '@/types/guardian'

type ArchiveServerRow = {
  client_id: string
  target: EditorTarget
  message: string
  editor_data: {
    backgroundColor: string
    backgroundPatternId: PatternId
    faceGrids: Record<FaceKey, GridState>
    messageStyle: MessageStyle
    guardianKey?: string
  }
  guardian_key?: string | null
  created_at: string
}

function serverRowToSnapshot(row: ArchiveServerRow): CoffinSnapshot {
  const rawKey = row.guardian_key ?? row.editor_data.guardianKey
  return {
    version: 1,
    id: row.client_id,
    createdAt: row.created_at,
    target: row.target,
    message: row.message,
    backgroundColor: row.editor_data.backgroundColor,
    backgroundPatternId: row.editor_data.backgroundPatternId,
    faceGrids: row.editor_data.faceGrids,
    messageStyle: row.editor_data.messageStyle,
    uploadedImages: [],
    guardianKey: rawKey ? (rawKey as GuardianTypeKey) : undefined,
  }
}

const SELECT_FIELDS = 'client_id, target, message, editor_data, guardian_key, created_at'

type Result = {
  snapshots: CoffinSnapshot[]
  loading: boolean
}

export function useArchiveSnapshots(user: User | null): Result {
  const [snapshots, setSnapshots] = useState<CoffinSnapshot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      supabase
        .from('snapshots')
        .select(SELECT_FIELDS)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            setSnapshots((data as ArchiveServerRow[]).map(serverRowToSnapshot))
          }
          setLoading(false)
        })
    } else {
      setSnapshots(loadSnapshots())
      setLoading(false)
    }
  }, [user])

  return { snapshots, loading }
}
