import type { EditorCategoryConfig } from '@/types/editor'

export const COFFIN_CATEGORIES: EditorCategoryConfig[] = [
  {
    id: 'background',
    label: '배경',
    items: [
      { id: 'bg-ivory',    label: '아이보리', value: '#faf7f0', type: 'color' },
      { id: 'bg-sage',     label: '세이지',   value: '#c5d4be', type: 'color' },
      { id: 'bg-rose',     label: '로즈',     value: '#e8cfc8', type: 'color' },
      { id: 'bg-sky',      label: '하늘',     value: '#c3d8e8', type: 'color' },
      { id: 'bg-lavender', label: '라벤더',   value: '#d5c8e8', type: 'color' },
      { id: 'bg-ink',      label: '먹빛',     value: '#4a4745', type: 'color' },
    ],
  },
  {
    id: 'decoration',
    label: '장식',
    items: [
      // ribbon
      { id: 'deco-bow',      label: '리본',   value: '🎀', type: 'ribbon' },
      // flower
      { id: 'deco-chrysan',  label: '국화',   value: '🌸', type: 'flower' },
      { id: 'deco-rose',     label: '장미',   value: '🌹', type: 'flower' },
      { id: 'deco-bouquet',  label: '꽃다발', value: '💐', type: 'flower' },
      { id: 'deco-blossom',  label: '벚꽃',   value: '🌺', type: 'flower' },
      // sticker
      { id: 'deco-butterfly', label: '나비',   value: '🦋', type: 'sticker' },
      { id: 'deco-heart',     label: '하트',   value: '🤍', type: 'sticker' },
      { id: 'deco-leaf',      label: '잎사귀', value: '🍃', type: 'sticker' },
      { id: 'deco-cloud',     label: '구름',   value: '☁️', type: 'sticker' },
      // symbol
      { id: 'deco-star',   label: '별',  value: '✨', type: 'symbol' },
      { id: 'deco-moon',   label: '달',  value: '🌙', type: 'symbol' },
      { id: 'deco-sun',    label: '태양', value: '☀️', type: 'symbol' },
      { id: 'deco-candle', label: '촛불', value: '🕯️', type: 'symbol' },
    ],
  },
]
