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

export type PlacedDecoration = {
  itemId: string
  emoji: string
  decorationType: DecorationItemType
}

export type GridState = Partial<Record<GridKey, PlacedDecoration>>
