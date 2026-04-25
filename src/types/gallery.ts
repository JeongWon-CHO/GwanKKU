import type { EditorTarget, FaceKey, GridState, MessageStyle } from '@/types/editor'
import type { PatternId } from '@/constants/editor-patterns'

export type GallerySnapshot = {
  id: string
  client_id: string
  user_id: string
  target: EditorTarget
  message: string
  editor_data: {
    backgroundColor: string
    backgroundPatternId: PatternId
    faceGrids: Record<FaceKey, GridState>
    messageStyle: MessageStyle
  }
  like_count: number
  created_at: string
}

export type SortOrder = 'latest' | 'popular'
