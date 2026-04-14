import type { PreviewState } from '@/types/editor'

type Props = {
  preview: PreviewState
}

export function CoffinPreview({ preview }: Props) {
  const { backgroundColor, ribbonEmoji, stickerEmoji, message } = preview

  return (
    <div className="relative flex flex-col items-center">
      {/* 관 형태 — hexagonal coffin (top-down lid view) */}
      <div
        className="relative flex flex-col items-center justify-between overflow-hidden transition-colors duration-300"
        style={{
          width: 160,
          height: 240,
          backgroundColor,
          clipPath:
            'polygon(25% 0%, 75% 0%, 100% 15%, 100% 85%, 75% 100%, 25% 100%, 0% 85%, 0% 15%)',
        }}
      >
        {/* 리본/장식 — 상단 */}
        {ribbonEmoji && ribbonEmoji !== 'none' && (
          <div className="mt-6 flex items-center justify-center text-3xl leading-none">
            {ribbonEmoji}
          </div>
        )}

        {/* 스티커 — 중앙 */}
        {stickerEmoji && stickerEmoji !== 'none' && (
          <div className="flex flex-1 items-center justify-center text-4xl leading-none">
            {stickerEmoji}
          </div>
        )}

        {/* 빈 공간 채우기 (둘 다 없을 때 구조 유지) */}
        {(!ribbonEmoji || ribbonEmoji === 'none') &&
          (!stickerEmoji || stickerEmoji === 'none') && (
            <div className="flex flex-1" />
          )}

        {/* 문구 — 하단 */}
        {message && (
          <div className="mb-6 px-4 text-center text-xs leading-relaxed break-keep"
            style={{ color: isLight(backgroundColor) ? '#44403c' : '#f5f5f4' }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

// 배경색이 밝은지 판단 (텍스트 색상 자동 결정)
function isLight(hex: string): boolean {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}
