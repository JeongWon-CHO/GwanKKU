'use client'

import { DecorationGrid } from './DecorationGrid'
import { MessageBand } from './MessageBand'
import { deriveFrameColor, deriveGrooveColor } from '@/lib/utils'

type Props = {
  backgroundColor: string
}

// ── 관 형태 좌표 (240×360 기준 viewBox) ────────────────────
// 바깥 프레임 (전체 관 실루엣)
const OUTER_POINTS = '60,0 180,0 240,54 240,306 180,360 60,360 0,306 0,54'

// 안쪽 패널 (장식 보드, 약 16px 내측)
const INNER_POINTS = '76,16 164,16 224,70 224,290 164,344 76,344 16,290 16,70'

// 안쪽 패널을 퍼센트로 변환 (grid·MessageBand clipPath 용)
// 좌표/컨테이너: x/240, y/360
const INNER_CLIP =
  'polygon(31.7% 4.4%, 68.3% 4.4%, 93.3% 19.4%, 93.3% 80.6%, 68.3% 95.6%, 31.7% 95.6%, 6.7% 80.6%, 6.7% 19.4%)'


// ── 편집용 관 보드 (240×360) ────────────────────────────────
export function CoffinBoard({ backgroundColor }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        width: 240,
        height: 360,
        flexShrink: 0,
        filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))',
      }}
    >
      <CoffinSvg
        backgroundColor={backgroundColor}
        width={240}
        height={360}
      />

      {/* 그리드 + 문구 띠: 안쪽 패널 영역으로 clip */}
      <div style={{ position: 'absolute', inset: 0, clipPath: INNER_CLIP }}>
        <DecorationGrid interactive={true} />
        <MessageBand backgroundColor={backgroundColor} />
      </div>
    </div>
  )
}

// ── 완성·공유 화면용 (160×240, non-interactive) ────────────
export function CoffinPreviewSmall({ backgroundColor }: Props) {
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
      {/* 동일 viewBox, 크기만 축소 — SVG가 자동 스케일 */}
      <CoffinSvg
        backgroundColor={backgroundColor}
        width={160}
        height={240}
      />

      {/* 장식 표시 전용 (non-interactive) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: INNER_CLIP,
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
  width,
  height,
}: {
  backgroundColor: string
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
      {/* 바깥 프레임 */}
      <polygon points={OUTER_POINTS} fill={deriveFrameColor(backgroundColor)} />
      {/* 안쪽 패널 + 홈 선 */}
      <polygon
        points={INNER_POINTS}
        fill={backgroundColor}
        stroke={deriveGrooveColor(backgroundColor)}
        strokeWidth={2.5}
      />
    </svg>
  )
}
