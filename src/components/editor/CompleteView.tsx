'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Share2, ImageDown, RotateCcw, ArrowLeft } from 'lucide-react'
import { useEditorStore } from '@/store/useEditorStore'
import { EDITOR_PRESETS } from '@/constants/editor-presets'
import { CoffinPreviewSmall } from './CoffinBoard'
import { cn, isLight } from '@/lib/utils'

export function CompleteView() {
  const router = useRouter()
  const { target, backgroundColor, message, reset } = useEditorStore()
  const [saveHint, setSaveHint] = useState(false)
  const [shareError, setShareError] = useState(false)

  if (!target) return null

  const preset = EDITOR_PRESETS[target]

  async function handleShare() {
    setShareError(false)
    const shareText = [
      `나만의 ${preset.objectLabel}을 꾸몄어요.`,
      message ? `"${message}"` : '',
      '관꾸 — 나를 기억하는 방식',
    ]
      .filter(Boolean)
      .join('\n')

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText })
      } catch {
        // 사용자 취소 포함 — 오류 표시 생략
      }
    } else {
      setShareError(true)
    }
  }

  function handleSave() {
    setSaveHint(true)
    setTimeout(() => setSaveHint(false), 3000)
  }

  function handleRestart() {
    reset()
    router.push('/')
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="flex items-center gap-3 border-b border-line px-4 py-4">
        <button
          onClick={() => router.push('/editor/coffin')}
          aria-label="에디터로 돌아가기"
          className="flex size-8 items-center justify-center rounded-full hover:bg-surface"
        >
          <ArrowLeft className="size-4 text-body" />
        </button>
        <h1 className="text-base font-medium text-primary">완성됐어요</h1>
      </header>

      {/* 완성 미리보기 — 밝은 관일 때 배경 대비 자동 보정 */}
      <section
        className="flex flex-col items-center px-4 py-10 transition-colors duration-300"
        style={{ backgroundColor: isLight(backgroundColor) ? '#c8c2ba' : '#f5f5f4' }}
      >
        <p className="mb-2 text-sm font-medium text-primary">
          나만의 {preset.objectLabel}이 완성됐어요
        </p>
        <p className="mb-8 text-xs text-caption">
          간직하거나 소중한 사람과 나눠보세요
        </p>
        <CoffinPreviewSmall backgroundColor={backgroundColor} />
      </section>

      {/* 액션 영역 */}
      <section className="flex flex-col gap-3 px-4 py-6">
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 w-full rounded-2xl bg-accent py-4 text-base font-medium text-accent-fg transition-opacity active:opacity-80"
        >
          <Share2 className="size-4" />
          공유하기
        </button>
        {shareError && (
          <p className="text-center text-xs text-caption">
            이 브라우저에서는 공유가 지원되지 않아요
          </p>
        )}

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 w-full rounded-2xl border border-line bg-background py-4 text-base font-medium text-primary transition-opacity active:opacity-80"
        >
          <ImageDown className="size-4" />
          이미지로 저장
        </button>
        {saveHint && (
          <p className="text-center text-xs text-caption">
            화면을 길게 눌러 스크린샷으로 저장해보세요
          </p>
        )}

        <button
          onClick={() => router.push('/editor/coffin')}
          className="flex items-center justify-center gap-2 w-full rounded-2xl border border-line bg-background py-4 text-base font-medium text-primary transition-opacity active:opacity-80"
        >
          다시 꾸미기
        </button>
      </section>

      <div className="flex justify-center pb-10">
        <button
          onClick={handleRestart}
          className={cn(
            'flex items-center gap-1.5 text-sm text-caption',
            'underline-offset-2 hover:underline',
          )}
        >
          <RotateCcw className="size-3.5" />
          처음으로 돌아가기
        </button>
      </div>
    </main>
  )
}
