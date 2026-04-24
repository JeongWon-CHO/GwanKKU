import { supabase } from './supabase'
import { saveSnapshot } from './snapshot'
import type { GallerySnapshot, SortOrder } from '@/types/gallery'

const SELECT_FIELDS = 'id, client_id, target, message, editor_data, like_count, created_at'

export async function fetchGallerySnapshots(sort: SortOrder): Promise<GallerySnapshot[]> {
  const base = supabase
    .from('snapshots')
    .select(SELECT_FIELDS)
    .eq('is_public', true)

  const { data, error } = await (sort === 'popular'
    ? base.order('like_count', { ascending: false }).order('created_at', { ascending: false })
    : base.order('created_at', { ascending: false }))

  if (error) throw error
  return (data ?? []) as unknown as GallerySnapshot[]
}

export async function incrementLike(snapshotId: string): Promise<number> {
  const { data, error } = await supabase.rpc('increment_like', { snapshot_id: snapshotId })
  if (error) throw error
  return data as number
}

export async function decrementLike(snapshotId: string): Promise<number> {
  const { data, error } = await supabase.rpc('decrement_like', { snapshot_id: snapshotId })
  if (error) throw error
  return data as number
}

export function saveGallerySnapshotToArchive(row: GallerySnapshot): void {
  saveSnapshot({
    version: 1,
    id: Date.now().toString(36),
    createdAt: row.created_at,
    target: row.target,
    message: row.message,
    messageStyle: row.editor_data.messageStyle,
    backgroundColor: row.editor_data.backgroundColor,
    backgroundPatternId: row.editor_data.backgroundPatternId,
    faceGrids: row.editor_data.faceGrids,
    uploadedImages: [],
  })
}
