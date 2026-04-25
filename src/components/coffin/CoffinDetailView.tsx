'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { CoffinFacePreview } from './CoffinFacePreview'
import { ENABLED_FACES, FACE_CONFIGS } from '@/constants/editor-faces'
import { COFFIN_SHAPES } from '@/constants/coffin-shapes'
import { cn } from '@/lib/utils'
import type { CoffinSnapshot } from '@/types/snapshot'
import type { FaceKey, GridState } from '@/types/editor'

function hasContent(grid: GridState): boolean {
  return Object.keys(grid).length > 0
}

type Props = {
  snapshot: CoffinSnapshot
}

export function CoffinDetailView({ snapshot }: Props) {
  const router = useRouter()
  const [activeFace, setActiveFace] = useState<FaceKey>('front')

  const activeShape = FACE_CONFIGS[activeFace].shape
  const isHorizontal = COFFIN_SHAPES[activeShape].viewBox.startsWith('0 0 300')

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

      {/* 면 미리보기 */}
      <section className="flex flex-1 flex-col items-center px-6 py-10 gap-8">
        <div
          className={cn('w-full', isHorizontal ? '' : 'max-w-[220px]')}
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.13))' }}
        >
          <CoffinFacePreview snapshot={snapshot} face={activeFace} />
        </div>

        {snapshot.message && (
          <p className="max-w-xs break-keep text-center text-sm leading-relaxed text-body">
            {snapshot.message}
          </p>
        )}
      </section>
    </main>
  )
}
