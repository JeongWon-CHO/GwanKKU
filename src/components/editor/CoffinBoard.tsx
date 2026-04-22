'use client'

import { DecorationGrid } from './DecorationGrid'
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

// ── 면 shape별 SVG 좌표 ──────────────────────────────────────
//
// octagon (정면/후면): 240×360 viewBox, 어깨 60px 컷 관 실루엣
// rect    (세로 측면): 240×360 viewBox, 24px 베벨 장방형
// rect-h  (가로 측면): 300×150 viewBox, 20px 베벨 가로형 패널
//
const SHAPES: Record<FaceShape, { viewBox: string; outer: string; inner: string; clip: string }> = {
  octagon: {
    viewBox: '0 0 240 360',
    outer: '60,0 180,0 240,54 240,306 180,360 60,360 0,306 0,54',
    inner: '76,16 164,16 224,70 224,290 164,344 76,344 16,290 16,70',
    clip: 'polygon(31.7% 4.4%, 68.3% 4.4%, 93.3% 19.4%, 93.3% 80.6%, 68.3% 95.6%, 31.7% 95.6%, 6.7% 80.6%, 6.7% 19.4%)',
  },
  rect: {
    viewBox: '0 0 240 360',
    outer: '0,24 24,0 216,0 240,24 240,336 216,360 24,360 0,336',
    inner: '16,36 40,16 200,16 224,36 224,324 200,344 40,344 16,324',
    clip: 'polygon(6.7% 10%, 16.7% 4.4%, 83.3% 4.4%, 93.3% 10%, 93.3% 90%, 83.3% 95.6%, 16.7% 95.6%, 6.7% 90%)',
  },
  'rect-h': {
    viewBox: '0 0 300 150',
    // 20px 베벨 코너, outer 테두리
    outer: '0,20 20,0 280,0 300,20 300,130 280,150 20,150 0,130',
    // 10px 추가 인셋, inner 패널 면
    inner: '10,26 26,10 274,10 290,26 290,124 274,140 26,140 10,124',
    // inner 좌표를 300×150 기준 퍼센트로 변환
    clip: 'polygon(3.3% 17.3%, 8.7% 6.7%, 91.3% 6.7%, 96.7% 17.3%, 96.7% 82.7%, 91.3% 93.3%, 8.7% 93.3%, 3.3% 82.7%)',
  },
}

// ── 편집용 관 보드 ──────────────────────────────────────────
export function CoffinBoard({ backgroundColor, face, width = 240, height = 360 }: BoardProps) {
  const { shape } = FACE_CONFIGS[face]
  const { viewBox, outer, inner, clip } = SHAPES[shape]

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
        <DecorationGrid interactive={true} />
      </div>
    </div>
  )
}

// ── 완성·공유 화면용 (160×240, non-interactive) ────────────
// 항상 정면(rect) shape로 고정 렌더링
export function CoffinPreviewSmall({ backgroundColor }: PreviewProps) {
  const { viewBox, outer, inner, clip } = SHAPES.rect

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
        viewBox={viewBox}
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
