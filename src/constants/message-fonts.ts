import type { MessageFontFamily } from '@/types/editor'

export type MessageFontConfig = {
  id: MessageFontFamily
  label: string
  cssVar: string
  normalWeight: number
  boldWeight: number
}

export const MESSAGE_FONTS: MessageFontConfig[] = [
  { id: 'pretendard', label: '기본',    cssVar: 'var(--font-pretendard)', normalWeight: 500, boldWeight: 600 },
  { id: 'konkon',     label: '둥글둥글', cssVar: 'var(--font-konkon)',     normalWeight: 400, boldWeight: 700 },
  { id: 'laundry',    label: '둥글고딕', cssVar: 'var(--font-laundry)',    normalWeight: 400, boldWeight: 700 },
  { id: 'wishlist',   label: '필기체',   cssVar: 'var(--font-wishlist)',   normalWeight: 400, boldWeight: 400 },
]
