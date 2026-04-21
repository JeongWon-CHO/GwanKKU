'use client'

import { ENABLED_FACES, FACE_CONFIGS } from '@/constants/editor-faces'
import { cn } from '@/lib/utils'
import type { FaceKey } from '@/types/editor'

type Props = {
  activeFace: FaceKey
  onFaceChange: (face: FaceKey) => void
}

export function FaceTabs({ activeFace, onFaceChange }: Props) {
  return (
    <div className="flex gap-2 px-4 py-3">
      {ENABLED_FACES.map((face) => (
        <button
          key={face}
          onClick={() => onFaceChange(face)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm transition-colors',
            activeFace === face
              ? 'bg-primary font-medium text-background'
              : 'bg-background/60 text-caption',
          )}
        >
          {FACE_CONFIGS[face].label}
        </button>
      ))}
    </div>
  )
}
