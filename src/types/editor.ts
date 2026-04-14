export type EditorTarget = 'coffin' | 'urn' | 'funeral' | 'grave'

export type EditorItemType = 'color' | 'emoji'

export type EditorItem = {
  id: string
  label: string
  value: string       // color: CSS hex  /  emoji: unicode 문자
  type: EditorItemType
}

export type EditorCategoryId = 'background' | 'ribbon' | 'sticker' | 'message'

export type EditorCategoryConfig = {
  id: EditorCategoryId
  label: string
  items: EditorItem[] // message 카테고리는 items가 빈 배열
}

export type EditorPreset = {
  target: EditorTarget
  objectLabel: string
  categories: EditorCategoryConfig[]
}

export type EditorSelections = Partial<Record<EditorCategoryId, string>>

// CoffinPreview 에 전달하는 resolved 상태
export type PreviewState = {
  backgroundColor: string
  ribbonEmoji: string | null
  stickerEmoji: string | null
  message: string
}
