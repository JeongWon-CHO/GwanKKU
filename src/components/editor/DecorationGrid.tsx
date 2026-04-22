'use client'

import { useEditorStore } from '@/store/useEditorStore'
import { COFFIN_CATEGORIES } from '@/constants/editor-coffin'
import { FACE_CONFIGS } from '@/constants/editor-faces'
import { GridCell } from './GridCell'
import { isLight } from '@/lib/utils'
import type { GridKey, PlacedDecoration } from '@/types/editor'

const decorationItems =
  COFFIN_CATEGORIES.find((c) => c.id === 'decoration')?.items ?? []

type Props = {
  interactive?: boolean
}

export function DecorationGrid({ interactive = true }: Props) {
  const { faceGrids, activeFace, activeItemId, backgroundColor, uploadedImages, placeItem, removeItem } =
    useEditorStore()

  const grid = faceGrids[activeFace]
  const faceConfig = FACE_CONFIGS[activeFace]
  const inactiveCellSet = new Set(faceConfig.inactiveCells)
  const lightPanel = isLight(backgroundColor)

  function handleCellTap(key: GridKey) {
    if (!interactive) return
    if (grid[key]) { removeItem(key); return }
    if (!activeItemId) return

    const presetItem = decorationItems.find((i) => i.id === activeItemId)
    if (presetItem && presetItem.type !== 'color') {
      placeItem(key, { itemId: presetItem.id, emoji: presetItem.value, decorationType: presetItem.type })
      return
    }

    const uploadedItem = uploadedImages.find((i) => i.id === activeItemId)
    if (uploadedItem) {
      placeItem(key, { itemId: uploadedItem.id, emoji: '', imageUrl: uploadedItem.dataUrl, decorationType: 'sticker' })
    }
  }

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${faceConfig.cols}, 1fr)`,
        gridTemplateRows: `repeat(${faceConfig.rows}, 1fr)`,
      }}
    >
      {Array.from({ length: faceConfig.rows }, (_, row) =>
        Array.from({ length: faceConfig.cols }, (_, col) => {
          const key: GridKey = `${row}-${col}`
          return (
            <GridCell
              key={key}
              inactive={inactiveCellSet.has(key)}
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
