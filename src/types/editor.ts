export type EditorTarget = 'coffin' | 'urn' | 'funeral' | 'grave'

export type DecorationItemType = 'ribbon' | 'sticker' | 'flower' | 'symbol'

export type EditorItem = {
  id: string
  label: string
  value: string   // color: CSS hex / decoration: unicode emoji
  type: 'color' | DecorationItemType
}

export type EditorCategoryId = 'background' | 'decoration'

export type EditorCategoryConfig = {
  id: EditorCategoryId
  label: string
  items: EditorItem[]
}

export type EditorPreset = {
  target: EditorTarget
  objectLabel: string
  categories: EditorCategoryConfig[]
}

// ── Grid 배치 상태 ──────────────────────────────────────────

export type GridKey = `${number}-${number}`  // "행-열" e.g. "2-1"

// ── 면(Face) 구조 ──────────────────────────────────────────

export type FaceKey = 'front' | 'side-left' | 'side-right' | 'back'

export type FaceShape = 'octagon' | 'rect' | 'rect-h'

export type FaceConfig = {
  key: FaceKey
  label: string
  shape: FaceShape
  rows: number
  cols: number
  inactiveCells: readonly GridKey[]
  boardWidth: number
  boardHeight: number
}

export type PlacedDecoration = {
  itemId: string
  emoji: string
  imageUrl?: string
  decorationType: DecorationItemType
}

export type UploadedImage = {
  id: string
  dataUrl: string
}

export type GridState = Partial<Record<GridKey, PlacedDecoration>>

// ── 문구 스타일 ──────────────────────────────────────────────

export type MessageFontFamily = 'pretendard' | 'konkon' | 'laundry' | 'wishlist'
export type MessageAlign = 'left' | 'center' | 'right'

export type MessageStyle = {
  font: MessageFontFamily
  align: MessageAlign
  bold: boolean
  italic: boolean
}
