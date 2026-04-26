'use client'

import { FACE_CONFIGS } from '@/constants/editor-faces'
import { COFFIN_SHAPES } from '@/constants/coffin-shapes'
import { getPatternStyle } from '@/constants/editor-patterns'
import { deriveFrameColor, deriveGrooveColor, isLight } from '@/lib/utils'
import type { CoffinSnapshot } from '@/types/snapshot'
import type { FaceKey, GridKey } from '@/types/editor'

type Props = {
  snapshot: CoffinSnapshot
  face: FaceKey
}

export function CoffinFacePreview({ snapshot, face }: Props) {
  const { backgroundColor, backgroundPatternId, faceGrids } = snapshot
  const faceConfig = FACE_CONFIGS[face]
  const { viewBox, outer, inner, clip } = COFFIN_SHAPES[faceConfig.shape]
  const grid = faceGrids[face]
  const light = isLight(backgroundColor)
  const patternStyle = getPatternStyle(backgroundPatternId, light)
  const inactiveSet = new Set(faceConfig.inactiveCells)

  const [, , vw, vh] = viewBox.split(' ').map(Number)

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${vw} / ${vh}` }}
    >
      <svg
        viewBox={viewBox}
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, display: 'block' }}
      >
        <polygon points={outer} fill={deriveFrameColor(backgroundColor)} />
        <polygon
          points={inner}
          fill={backgroundColor}
          stroke={deriveGrooveColor(backgroundColor)}
          strokeWidth={2.5}
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: clip,
          pointerEvents: 'none',
        }}
      >
        {patternStyle && (
          <div style={{ position: 'absolute', inset: 0, ...patternStyle }} />
        )}
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
              if (inactiveSet.has(key)) return <div key={key} />
              const placed = grid[key]
              return (
                <div key={key} className="flex items-center justify-center overflow-hidden">
                  {placed?.imageUrl ? (
                    <img
                      src={placed.imageUrl}
                      alt=""
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  ) : placed?.emoji ? (
                    <span className="select-none text-lg leading-none">{placed.emoji}</span>
                  ) : null}
                </div>
              )
            }),
          )}
        </div>
      </div>
    </div>
  )
}
