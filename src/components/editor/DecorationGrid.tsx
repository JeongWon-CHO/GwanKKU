'use client'

import { useEditorStore } from '@/store/useEditorStore'
import { COFFIN_CATEGORIES } from '@/constants/editor-coffin'
import { GridCell } from './GridCell'
import { isLight } from '@/lib/utils'
import type { GridKey, PlacedDecoration } from '@/types/editor'

export const GRID_ROWS = 6
export const GRID_COLS = 3

// 상단 모서리 2칸 + 하단 row 3칸(MessageBand 영역) = 총 5칸 비활성
export const INACTIVE_CELLS = new Set<GridKey>([
  '0-0', '0-2',
  '5-0', '5-1', '5-2',
])

const decorationItems =
  COFFIN_CATEGORIES.find((c) => c.id === 'decoration')?.items ?? []

type Props = {
  interactive?: boolean
}

export function DecorationGrid({ interactive = true }: Props) {
  const { grid, activeItemId, backgroundColor, placeItem, removeItem } = useEditorStore()
  const lightPanel = isLight(backgroundColor)

  function handleCellTap(key: GridKey) {
    if (!interactive) return
    if (grid[key]) { removeItem(key); return }
    if (!activeItemId) return
    const item = decorationItems.find((i) => i.id === activeItemId)
    if (!item || item.type === 'color') return

    const decoration: PlacedDecoration = {
      itemId: item.id,
      emoji: item.value,
      decorationType: item.type,
    }
    placeItem(key, decoration)
  }

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: GRID_ROWS }, (_, row) =>
        Array.from({ length: GRID_COLS }, (_, col) => {
          const key: GridKey = `${row}-${col}`
          return (
            <GridCell
              key={key}
              inactive={INACTIVE_CELLS.has(key)}
              placed={grid[key] ?? null}
              isSelecting={interactive && !!activeItemId}
              interactive={interactive}
              lightPanel={lightPanel}
              onTap={() => handleCellTap(key)}
            />
          )
        }),
      )}
    </div>
  )
}
