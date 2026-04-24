import { supabase } from './supabase'
import type { CoffinSnapshot } from '@/types/snapshot'

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png'
  const bytes = atob(base64)
  const arr = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
  return new Blob([arr], { type: mime })
}

async function uploadImages(
  clientId: string,
  images: CoffinSnapshot['uploadedImages'],
): Promise<string[]> {
  if (images.length === 0) return []

  const keys: string[] = []
  for (const img of images) {
    const blob = dataUrlToBlob(img.dataUrl)
    const key = `${clientId}/${img.id}`
    const { error } = await supabase.storage
      .from('snapshot-images')
      .upload(key, blob, { upsert: true })
    if (error) throw error
    keys.push(key)
  }
  return keys
}

async function uploadPreview(clientId: string, blob: Blob): Promise<string> {
  const key = `${clientId}/preview.png`
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

  const [imageKeys, previewKey] = await Promise.all([
    uploadImages(clientId, uploadedImages),
    previewBlob
      ? uploadPreview(clientId, previewBlob).catch(() => null)
      : Promise.resolve(null),
  ])

  const { error } = await supabase.from('snapshots').insert({
    client_id: clientId,
    user_id: null,
    is_public: isPublic,
    version,
    target,
    message,
    editor_data: editorFields,
    image_keys: imageKeys,
    preview_key: previewKey,
  })

  if (error) throw error
}
