'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useEditorStore } from '@/store/useEditorStore'
import { EDITOR_PRESETS } from '@/constants/editor-presets'
import { CoffinPreview } from './CoffinPreview'
import { CategoryTabs } from './CategoryTabs'
import { OptionGrid } from './OptionGrid'
import type { EditorTarget, EditorCategoryId, PreviewState } from '@/types/editor'

const DEFAULT_BACKGROUND = '#faf7f0'
const MESSAGE_MAX_LENGTH = 30

type Props = {
  target: EditorTarget
}

export function EditorView({ target }: Props) {
  const router = useRouter()
  const { selections, message, setTarget, setSelection, setMessage } =
    useEditorStore()

  const preset = EDITOR_PRESETS[target]
  const [activeCategory, setActiveCategory] = useState<EditorCategoryId>(
    preset.categories[0]?.id ?? 'background',
  )

  useEffect(() => {
    setTarget(target)
  }, [target, setTarget])

  // 선택된 itemId → 실제 값(color / emoji)으로 변환
  function resolveValue(
    categoryId: EditorCategoryId,
    fallback?: string,
  ): string | null {
    const selectedId = selections[categoryId]
    if (!selectedId) return fallback ?? null
    const category = preset.categories.find((c) => c.id === categoryId)
    const item = category?.items.find((i) => i.id === selectedId)
    return item?.value ?? fallback ?? null
  }

  const preview: PreviewState = {
    backgroundColor: resolveValue('background', DEFAULT_BACKGROUND) as string,
    ribbonEmoji: resolveValue('ribbon'),
    stickerEmoji: resolveValue('sticker'),
    message,
  }

  const activeItems =
    preset.categories.find((c) => c.id === activeCategory)?.items ?? []

  return (
    <main className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="flex items-center gap-3 border-b border-line px-4 py-4">
        <button
          onClick={() => router.back()}
          aria-label="뒤로 가기"
          className="flex size-8 items-center justify-center rounded-full hover:bg-surface"
        >
          <ArrowLeft className="size-4 text-body" />
        </button>
        <h1 className="text-base font-medium text-primary">
          {preset.objectLabel} 꾸미기
        </h1>
      </header>

      {/* 프리뷰 영역 */}
      <section className="flex items-center justify-center bg-surface py-10">
        <CoffinPreview preview={preview} />
      </section>

      {/* 옵션 영역 */}
      <section className="flex flex-1 flex-col px-4 pt-5 pb-32">
        <CategoryTabs
          categories={preset.categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="mt-5">
          {activeCategory === 'message' ? (
            <MessageInput
              value={message}
              onChange={setMessage}
              maxLength={MESSAGE_MAX_LENGTH}
            />
          ) : (
            <OptionGrid
              items={activeItems}
              selected={selections[activeCategory]}
              onSelect={(id) => setSelection(activeCategory, id)}
            />
          )}
        </div>
      </section>

      {/* 하단 CTA — fixed */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-line bg-background px-4 py-4">
        <button
          onClick={() => router.push('/complete')}
          className="w-full rounded-2xl bg-accent py-4 text-base font-medium text-accent-fg transition-opacity active:opacity-80"
        >
          완성 보기
        </button>
      </div>
    </main>
  )
}

// ── 문구 입력 ─────────────────────────────────────────────
type MessageInputProps = {
  value: string
  onChange: (value: string) => void
  maxLength: number
}

function MessageInput({ value, onChange, maxLength }: MessageInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={3}
        placeholder="마지막으로 남기고 싶은 말 한 마디"
        className="w-full resize-none rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-primary placeholder:text-caption focus:border-line-strong focus:outline-none"
      />
      <p className="text-right text-xs text-caption">
        {value.length} / {maxLength}
      </p>
    </div>
  )
}
