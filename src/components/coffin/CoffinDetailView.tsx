'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { CoffinFacePreview } from './CoffinFacePreview'
import { ENABLED_FACES, FACE_CONFIGS } from '@/constants/editor-faces'
import { COFFIN_SHAPES } from '@/constants/coffin-shapes'
import { GUARDIAN_TYPE_MAP } from '@/constants/guardian-types'
import { useEditorStore } from '@/store/useEditorStore'
import { cn } from '@/lib/utils'
import type { CoffinSnapshot } from '@/types/snapshot'
import type { FaceKey, GridState } from '@/types/editor'

function hasContent(grid: GridState): boolean {
  return Object.keys(grid).length > 0
}

type Props = {
  snapshot: CoffinSnapshot
  isOwn: boolean
}

export function CoffinDetailView({ snapshot, isOwn }: Props) {
  const router = useRouter()
  const [activeFace, setActiveFace] = useState<FaceKey>('front')
  const loadFromSnapshot = useEditorStore((s) => s.loadFromSnapshot)
  const clearActiveSnapshotId = useEditorStore((s) => s.clearActiveSnapshotId)

  const activeShape = FACE_CONFIGS[activeFace].shape
  const isHorizontal = COFFIN_SHAPES[activeShape].viewBox.startsWith('0 0 300')

  const guardianInfo = snapshot.guardianKey
    ? (GUARDIAN_TYPE_MAP[snapshot.guardianKey] ?? null)
    : null

  function handleEdit() {
    loadFromSnapshot(snapshot)   // activeSnapshotId = snapshot.id 자동 설정
    router.push('/editor/coffin')
  }

  function handleFork() {
    loadFromSnapshot(snapshot)   // 내용 로드
    clearActiveSnapshotId()      // activeSnapshotId = null → 새 작품으로 처리
    router.push('/editor/coffin')
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center gap-3 border-b border-line px-4 py-4">
        <button
          onClick={() => router.back()}
          aria-label="뒤로"
          className="flex size-8 items-center justify-center rounded-full hover:bg-surface"
        >
          <ArrowLeft className="size-4 text-body" />
        </button>
        <h1 className="text-base font-medium text-primary">관 감상</h1>
      </header>

      {/* 면 탭 */}
      <div className="flex gap-1 border-b border-line px-4 py-2.5">
        {ENABLED_FACES.map((face) => {
          const isActive = activeFace === face
          const hasDecos = hasContent(snapshot.faceGrids[face])
          return (
            <button
              key={face}
              onClick={() => setActiveFace(face)}
              className={cn(
                'flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors',
                isActive
                  ? 'bg-accent font-medium text-accent-fg'
                  : 'text-caption hover:text-body',
              )}
            >
              {FACE_CONFIGS[face].label}
              {hasDecos && !isActive && (
                <span className="inline-block size-1 rounded-full bg-accent/50" />
              )}
            </button>
          )
        })}
      </div>

      {/* 본문 */}
      <section className="flex flex-1 flex-col items-center px-6 py-10 gap-8">
        {/* 면 미리보기 */}
        <div
          className={cn('w-full', isHorizontal ? '' : 'max-w-55')}
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.13))' }}
        >
          <CoffinFacePreview snapshot={snapshot} face={activeFace} />
        </div>

        {/* 문구 */}
        {snapshot.message && (
          <p className="max-w-xs break-keep text-center text-sm leading-relaxed text-body">
            {snapshot.message}
          </p>
        )}

        {/* 수호캐릭터 서명 */}
        {guardianInfo && (
          <div className="mx-auto flex w-full max-w-xs items-center gap-3 rounded-2xl bg-surface px-4 py-3">
            <div className="relative size-9 shrink-0">
              <Image
                src={guardianInfo.imagePath}
                alt={guardianInfo.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-xs font-medium text-primary">{guardianInfo.name}</span>
              <span className="line-clamp-1 text-xs text-caption">{guardianInfo.description}</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="w-full max-w-xs">
          {isOwn ? (
            <button
              onClick={handleEdit}
              className="w-full rounded-2xl bg-accent py-3.5 text-sm font-medium text-accent-fg transition-opacity active:opacity-80"
            >
              이어서 꾸미기
            </button>
          ) : (
            <button
              onClick={handleFork}
              className="w-full rounded-2xl border border-line py-3.5 text-sm text-primary transition-opacity active:opacity-80"
            >
              이 디자인으로 시작하기
            </button>
          )}
        </div>
      </section>
    </main>
  )
}
