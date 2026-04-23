'use client'

import { FACE_CONFIGS } from '@/constants/editor-faces'
import { getPatternStyle } from '@/constants/editor-patterns'
import { deriveFrameColor, deriveGrooveColor, isLight } from '@/lib/utils'
import type { CoffinSnapshot } from '@/types/snapshot'
import type { GridKey } from '@/types/editor'

// 정면(rect) SVG 좌표 — CoffinPreviewSmall과 동일한 shape
const RECT = {
  viewBox: '0 0 240 360',
  outer: '0,24 24,0 216,0 240,24 240,336 216,360 24,360 0,336',
  inner: '16,36 40,16 200,16 224,36 224,324 200,344 40,344 16,324',
  clip: 'polygon(6.7% 10%, 16.7% 4.4%, 83.3% 4.4%, 93.3% 10%, 93.3% 90%, 83.3% 95.6%, 16.7% 95.6%, 6.7% 90%)',
}

// 원본 크기 200×300 → 썸네일 140×210 (0.7 비율)
const FULL_W = 200
const FULL_H = 300
const THUMB_W = 140
const THUMB_H = 210
const SCALE = THUMB_W / FULL_W

type Props = { snapshot: CoffinSnapshot }

export function SnapshotThumbnail({ snapshot }: Props) {
  const { backgroundColor, backgroundPatternId, faceGrids } = snapshot
  const face = FACE_CONFIGS.front
  const frontGrid = faceGrids.front
  const light = isLight(backgroundColor)
  const patternStyle = getPatternStyle(backgroundPatternId, light)
  const inactiveSet = new Set(face.inactiveCells)

  return (
    <div style={{ width: THUMB_W, height: THUMB_H, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: FULL_W,
          height: FULL_H,
          transform: `scale(${SCALE})`,
          transformOrigin: 'top left',
        }}
      >
        {/* 관 SVG */}
        <svg
          viewBox={RECT.viewBox}
          width={FULL_W}
          height={FULL_H}
          style={{ position: 'absolute', inset: 0, display: 'block' }}
        >
          <polygon points={RECT.outer} fill={deriveFrameColor(backgroundColor)} />
          <polygon
            points={RECT.inner}
            fill={backgroundColor}
            stroke={deriveGrooveColor(backgroundColor)}
            strokeWidth={2.5}
          />
        </svg>

        {/* 패턴 + 장식 */}
        <div style={{ position: 'absolute', inset: 0, clipPath: RECT.clip, pointerEvents: 'none' }}>
          {patternStyle && (
            <div style={{ position: 'absolute', inset: 0, ...patternStyle }} />
          )}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${face.cols}, 1fr)`,
              gridTemplateRows: `repeat(${face.rows}, 1fr)`,
            }}
          >
            {Array.from({ length: face.rows }, (_, row) =>
              Array.from({ length: face.cols }, (_, col) => {
                const key: GridKey = `${row}-${col}`
                if (inactiveSet.has(key)) return <div key={key} />
                const placed = frontGrid[key]
                return (
                  <div key={key} className="flex items-center justify-center">
                    {placed?.imageUrl ? (
                      <img
                        src={placed.imageUrl}
                        alt=""
                        className="h-full w-full object-contain p-0.5"
                        draggable={false}
                      />
                    ) : placed?.emoji ? (
                      <span className="select-none text-2xl leading-none">{placed.emoji}</span>
                    ) : null}
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
