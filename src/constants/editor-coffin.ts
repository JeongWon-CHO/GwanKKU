import type { EditorCategoryConfig } from '@/types/editor'

export const COFFIN_CATEGORIES: EditorCategoryConfig[] = [
  {
    id: 'background',
    label: '배경',
    items: [
      { id: 'bg-ivory',    label: '아이보리',  value: '#faf7f0', type: 'color' },
      { id: 'bg-sage',     label: '세이지',    value: '#c5d4be', type: 'color' },
      { id: 'bg-rose',     label: '로즈',      value: '#e8cfc8', type: 'color' },
      { id: 'bg-sky',      label: '하늘',      value: '#c3d8e8', type: 'color' },
      { id: 'bg-lavender', label: '라벤더',    value: '#d5c8e8', type: 'color' },
      { id: 'bg-ink',      label: '먹빛',      value: '#4a4745', type: 'color' },
    ],
  },
  {
    id: 'ribbon',
    label: '리본',
    items: [
      { id: 'ribbon-none',    label: '없음',    value: 'none',  type: 'emoji' },
      { id: 'ribbon-bow',     label: '리본',    value: '🎀',    type: 'emoji' },
      { id: 'ribbon-flower',  label: '국화',    value: '🌸',    type: 'emoji' },
      { id: 'ribbon-rose',    label: '장미',    value: '🌹',    type: 'emoji' },
      { id: 'ribbon-bouquet', label: '꽃다발',  value: '💐',    type: 'emoji' },
    ],
  },
  {
    id: 'sticker',
    label: '스티커',
    items: [
      { id: 'sticker-none',      label: '없음',    value: 'none', type: 'emoji' },
      { id: 'sticker-butterfly', label: '나비',    value: '🦋',   type: 'emoji' },
      { id: 'sticker-star',      label: '별',      value: '✨',   type: 'emoji' },
      { id: 'sticker-moon',      label: '달',      value: '🌙',   type: 'emoji' },
      { id: 'sticker-heart',     label: '하트',    value: '🤍',   type: 'emoji' },
      { id: 'sticker-leaf',      label: '잎사귀',  value: '🍃',   type: 'emoji' },
    ],
  },
  {
    id: 'message',
    label: '문구',
    items: [],
  },
]
