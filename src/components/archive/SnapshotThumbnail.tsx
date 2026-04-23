'use client'

import { FACE_CONFIGS } from '@/constants/editor-faces'
import { getPatternStyle } from '@/constants/editor-patterns'
import { deriveFrameColor, deriveGrooveColor, isLight } from '@/lib/utils'
import type { CoffinSnapshot } from '@/types/snapshot'
import type { GridKey } from '@/types/editor'

// 정면(rect) SVG 좌표 — CoffinPreviewSmall과 동일한 shape
// viewBox 240×360 = 2:3 비율 → aspect-[2/3] 컨테이너와 자연히 일치
const RECT = {
  viewBox: '0 0 240 360',
  outer: '0,24 24,0 216,0 240,24 240,336 216,360 24,360 0,336',
  inner: '16,36 40,16 200,16 224,36 224,324 200,344 40,344 16,324',
  clip: 'polygon(6.7% 10%, 16.7% 4.4%, 83.3% 4.4%, 93.3% 10%, 93.3% 90%, 83.3% 95.6%, 16.7% 95.6%, 6.7% 90%)',
}

type Props = { snapshot: CoffinSnapshot }

export function SnapshotThumbnail({ snapshot }: Props) {
  const { backgroundColor, backgroundPatternId, faceGrids } = snapshot
  const face = FACE_CONFIGS.front
  const frontGrid = faceGrids.front
  const light = isLight(backgroundColor)
  const patternStyle = getPatternStyle(backgroundPatternId, light)
  const inactiveSet = new Set(face.inactiveCells)

  return (
    // w-full + aspect-[2/3] → 컨테이너 폭에 맞춰 높이가 자동 결정
    <div className="relative w-full overflow-hidden aspect-2/3">
      {/* 관 SVG — viewBox 2:3 비율이 컨테이너와 일치해 자연 스케일 */}
      <svg
        viewBox={RECT.viewBox}
        width="100%"
        height="100%"
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

      {/* 배경 패턴 + 장식 그리드 */}
      <div
        style={{ position: 'absolute', inset: 0, clipPath: RECT.clip, pointerEvents: 'none' }}
      >
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
