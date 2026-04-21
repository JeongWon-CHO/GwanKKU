'use client'

import { DecorationGrid } from './DecorationGrid'
import { MessageBand } from './MessageBand'
import { FACE_CONFIGS } from '@/constants/editor-faces'
import { deriveFrameColor, deriveGrooveColor } from '@/lib/utils'
import type { FaceShape, FaceKey } from '@/types/editor'

type BoardProps = {
  backgroundColor: string
  face: FaceKey
  width?: number
  height?: number
}

type PreviewProps = {
  backgroundColor: string
}

// ── 면 shape별 SVG 좌표 (240×360 viewBox 기준) ──────────────
//
// octagon (정면): 어깨 부분 60px 컷 → 전형적인 관 실루엣
// rect    (측면): 24px 베벨 → 장방형 패널, 어깨 컷 없음
//
const SHAPES: Record<FaceShape, { outer: string; inner: string; clip: string }> = {
  octagon: {
    outer: '60,0 180,0 240,54 240,306 180,360 60,360 0,306 0,54',
    inner: '76,16 164,16 224,70 224,290 164,344 76,344 16,290 16,70',
    // x/240, y/360 → 퍼센트
    clip: 'polygon(31.7% 4.4%, 68.3% 4.4%, 93.3% 19.4%, 93.3% 80.6%, 68.3% 95.6%, 31.7% 95.6%, 6.7% 80.6%, 6.7% 19.4%)',
  },
  rect: {
    outer: '0,24 24,0 216,0 240,24 240,336 216,360 24,360 0,336',
    inner: '16,36 40,16 200,16 224,36 224,324 200,344 40,344 16,324',
    // (16,36)→6.7%/10%  (40,16)→16.7%/4.4%  (200,16)→83.3%/4.4%  (224,36)→93.3%/10%
    // (224,324)→93.3%/90%  (200,344)→83.3%/95.6%  (40,344)→16.7%/95.6%  (16,324)→6.7%/90%
    clip: 'polygon(6.7% 10%, 16.7% 4.4%, 83.3% 4.4%, 93.3% 10%, 93.3% 90%, 83.3% 95.6%, 16.7% 95.6%, 6.7% 90%)',
  },
}

// ── 편집용 관 보드 ──────────────────────────────────────────
export function CoffinBoard({ backgroundColor, face, width = 240, height = 360 }: BoardProps) {
  const { shape } = FACE_CONFIGS[face]
  const { outer, inner, clip } = SHAPES[shape]

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
        width={width}
        height={height}
      />

      <div style={{ position: 'absolute', inset: 0, clipPath: clip }}>
        <DecorationGrid interactive={true} />
        <MessageBand backgroundColor={backgroundColor} />
      </div>
    </div>
  )
}

// ── 완성·공유 화면용 (160×240, non-interactive) ────────────
// 항상 정면(octagon) shape로 고정 렌더링
export function CoffinPreviewSmall({ backgroundColor }: PreviewProps) {
  const { outer, inner, clip } = SHAPES.octagon

  return (
    <div
      style={{
        position: 'relative',
        width: 160,
        height: 240,
        flexShrink: 0,
        filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))',
      }}
    >
      <CoffinSvg
        backgroundColor={backgroundColor}
        outerPoints={outer}
        innerPoints={inner}
        width={160}
        height={240}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: clip,
          pointerEvents: 'none',
        }}
      >
        <DecorationGrid interactive={false} />
        <MessageBand backgroundColor={backgroundColor} />
      </div>
    </div>
  )
}

// ── 공용 SVG 관 비주얼 ─────────────────────────────────────
function CoffinSvg({
  backgroundColor,
  outerPoints,
  innerPoints,
  width,
  height,
}: {
  backgroundColor: string
  outerPoints: string
  innerPoints: string
  width: number
  height: number
}) {
  return (
    <svg
      viewBox="0 0 240 360"
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
