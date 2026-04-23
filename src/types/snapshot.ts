import type { EditorTarget, FaceKey, GridState, MessageStyle, UploadedImage } from '@/types/editor'
import type { PatternId } from '@/constants/editor-patterns'

export type CoffinSnapshot = {
  version: 1
  id: string
  createdAt: string
  target: EditorTarget
  backgroundColor: string
  backgroundPatternId: PatternId
  faceGrids: Record<FaceKey, GridState>
  message: string
  messageStyle: MessageStyle
  uploadedImages: UploadedImage[]
}
