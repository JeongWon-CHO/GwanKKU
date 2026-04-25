'use client'

import { useEditorStore } from '@/store/useEditorStore'
import { DecorationGrid } from './DecorationGrid'
import { FACE_CONFIGS } from '@/constants/editor-faces'
import { COFFIN_SHAPES } from '@/constants/coffin-shapes'
import { getPatternStyle } from '@/constants/editor-patterns'
import { deriveFrameColor, deriveGrooveColor, isLight } from '@/lib/utils'
import type { FaceKey } from '@/types/editor'

type BoardProps = {
  backgroundColor: string
  face: FaceKey
  width?: number
  height?: number
}

type PreviewProps = {
  backgroundColor: string
}


// ── 편집용 관 보드 ──────────────────────────────────────────
export function CoffinBoard({ backgroundColor, face, width = 240, height = 360 }: BoardProps) {
  const { shape } = FACE_CONFIGS[face]
  const { viewBox, outer, inner, clip } = COFFIN_SHAPES[shape]
  const backgroundPatternId = useEditorStore((s) => s.backgroundPatternId)
  const patternStyle = getPatternStyle(backgroundPatternId, isLight(backgroundColor))

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        flexShrink: 0,
        filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))',
      }}
    >
      <CoffinSvg
        backgroundColor={backgroundColor}
        outerPoints={outer}
        innerPoints={inner}
        viewBox={viewBox}
        width={width}
        height={height}
      />

      <div style={{ position: 'absolute', inset: 0, clipPath: clip }}>
        {patternStyle && (
          <div
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...patternStyle }}
          />
        )}
        <DecorationGrid interactive={true} />
      </div>
    </div>
  )
}

// ── 완성·공유 화면용 (200×300, non-interactive) ────────────
// 항상 정면(rect) shape로 고정 렌더링
export function CoffinPreviewSmall({ backgroundColor }: PreviewProps) {
  const { viewBox, outer, inner, clip } = COFFIN_SHAPES.rect
  const backgroundPatternId = useEditorStore((s) => s.backgroundPatternId)
  const patternStyle = getPatternStyle(backgroundPatternId, isLight(backgroundColor))

  return (
    <div
      style={{
        position: 'relative',
        width: 200,
        height: 300,
        flexShrink: 0,
        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.14))',
      }}
    >
      <CoffinSvg
        backgroundColor={backgroundColor}
        outerPoints={outer}
        innerPoints={inner}
        viewBox={viewBox}
        width={200}
        height={300}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: clip,
          pointerEvents: 'none',
        }}
      >
        {patternStyle && (
          <div
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...patternStyle }}
          />
        )}
        <DecorationGrid interactive={false} />
      </div>
    </div>
  )
}

// ── 공용 SVG 관 비주얼 ─────────────────────────────────────
function CoffinSvg({
  backgroundColor,
  outerPoints,
  innerPoints,
  viewBox,
  width,
  height,
}: {
  backgroundColor: string
  outerPoints: string
  innerPoints: string
  viewBox: string
  width: number
  height: number
}) {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, display: 'block' }}
    >
      <polygon points={outerPoints} fill={deriveFrameColor(backgroundColor)} />
      <polygon
        points={innerPoints}
        fill={backgroundColor}
        stroke={deriveGrooveColor(backgroundColor)}
        strokeWidth={2.5}
      />
    </svg>
  )
}
