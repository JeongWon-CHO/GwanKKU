'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useEditorStore } from '@/store/useEditorStore'
import { useTestStore } from '@/store/useTestStore'
import { EDITOR_PRESETS } from '@/constants/editor-presets'
import { GUARDIAN_TYPE_MAP } from '@/constants/guardian-types'
import { calcGuardianType } from '@/lib/calcGuardianType'
import { CoffinBoard } from './CoffinBoard'
import { DecorationPanel } from './DecorationPanel'
import { GuardianGuide } from './GuardianGuide'
import { isLight } from '@/lib/utils'
import type { EditorTarget } from '@/types/editor'

type Props = {
  target: EditorTarget
}

export function EditorView({ target }: Props) {
  const router = useRouter()
  const { backgroundColor, setTarget } = useEditorStore()
  const { answers } = useTestStore()

  const preset = EDITOR_PRESETS[target]

  const guardian = useMemo(() => {
    if (Object.keys(answers).length === 0) return null
    const key = calcGuardianType(answers)
    return GUARDIAN_TYPE_MAP[key] ?? null
  }, [answers])

  useEffect(() => {
    setTarget(target)
  }, [target, setTarget])

  return (
    <main className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-4">
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

      {/* 스크롤 영역 전체 */}
      <div className="flex-1 overflow-y-auto pb-28">

        {/* 관 보드 + 수호캐릭터 가이드 — 같은 배경으로 묶음 */}
        <section
          className="flex flex-col items-center transition-colors duration-300"
          style={{ backgroundColor: isLight(backgroundColor) ? '#c8c2ba' : '#f5f5f4' }}
        >
          <div className="py-8">
            <CoffinBoard backgroundColor={backgroundColor} />
          </div>
          {guardian && (
            <div className="w-full border-t border-black/8 px-4 py-3">
              <GuardianGuide guardian={guardian} lines={guardian.editorLines} />
            </div>
          )}
        </section>

        {/* 장식 패널 */}
        <section className="px-4 pt-5 pb-4">
          <DecorationPanel />
        </section>
      </div>

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
