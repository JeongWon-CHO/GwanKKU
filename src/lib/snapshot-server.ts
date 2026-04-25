import { supabase } from './supabase'
import type { CoffinSnapshot } from '@/types/snapshot'

function storagePrefix(userId: string | null | undefined, clientId: string): string {
  return userId ? `users/${userId}/${clientId}` : `anon/${clientId}`
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png'
  const bytes = atob(base64)
  const arr = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
  return new Blob([arr], { type: mime })
}

async function uploadImages(
  prefix: string,
  images: CoffinSnapshot['uploadedImages'],
): Promise<string[]> {
  if (images.length === 0) return []

  const keys: string[] = []
  for (const img of images) {
    const blob = dataUrlToBlob(img.dataUrl)
    const key = `${prefix}/${img.id}`
    const { error } = await supabase.storage
      .from('snapshot-images')
      .upload(key, blob, { upsert: true })
    if (error) throw error
    keys.push(key)
  }
  return keys
}

async function uploadPreview(prefix: string, blob: Blob): Promise<string> {
  const key = `${prefix}/preview.png`
  const { error } = await supabase.storage
    .from('snapshot-images')
    .upload(key, blob, { contentType: 'image/png', upsert: true })
  if (error) throw error
  return key
}

export async function saveSnapshotToServer(
  snapshot: CoffinSnapshot,
  isPublic: boolean,
  previewBlob?: Blob,
  userId?: string | null,
): Promise<void> {
  const {
    id: clientId,
    uploadedImages,
    createdAt: _createdAt,
    target,
    message,
    version,
    ...editorFields
  } = snapshot

  const prefix = storagePrefix(userId, clientId)

  const [imageKeys, previewKey] = await Promise.all([
    uploadImages(prefix, uploadedImages),
    previewBlob
      ? uploadPreview(prefix, previewBlob).catch(() => null)
      : Promise.resolve(null),
  ])

  const { error } = await supabase.from('snapshots').upsert({
    client_id: clientId,
    user_id: userId ?? null,
    is_public: isPublic,
    version,
    target,
    message,
    editor_data: editorFields,
    image_keys: imageKeys,
    preview_key: previewKey,
  }, { onConflict: 'client_id' })

  if (error) throw error
}
