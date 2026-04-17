'use client'

import { cn } from '@/lib/utils'
import type { PlacedDecoration } from '@/types/editor'

type Props = {
  inactive: boolean
  placed: PlacedDecoration | null
  isSelecting: boolean
  interactive: boolean
  lightPanel: boolean
  onTap: () => void
}

export function GridCell({ inactive, placed, isSelecting, interactive, lightPanel, onTap }: Props) {
  if (inactive) {
    return <div className="h-full w-full" aria-hidden />
  }

  // 미리보기 모드: 버튼 없이 이모지만 표시
  if (!interactive) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {placed && (
          <span className="select-none text-2xl leading-none">{placed.emoji}</span>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={onTap}
      className={cn(
        'flex h-full w-full items-center justify-center',
        'transition-colors active:bg-white/10',
        isSelecting && !placed && (lightPanel ? 'ring-1 ring-inset ring-black/20' : 'ring-1 ring-inset ring-white/30'),
      )}
    >
      {placed && (
        <span className="select-none text-2xl leading-none">{placed.emoji}</span>
      )}
    </button>
  )
}
