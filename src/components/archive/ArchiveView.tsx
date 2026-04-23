'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Archive } from 'lucide-react'
import { useSnapshots } from '@/hooks/useSnapshots'
import { useEditorStore } from '@/store/useEditorStore'
import { SnapshotThumbnail } from '@/components/archive/SnapshotThumbnail'
import type { CoffinSnapshot } from '@/types/snapshot'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

export function ArchiveView() {
  const router = useRouter()
  const snapshots = useSnapshots()
  const loadFromSnapshot = useEditorStore((s) => s.loadFromSnapshot)

  function handleView(snapshot: CoffinSnapshot) {
    loadFromSnapshot(snapshot)
    router.push('/complete?from=archive')
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
        <h1 className="text-base font-medium text-primary">나의 보관함</h1>
        {snapshots.length > 0 && (
          <span className="ml-auto text-xs text-caption">{snapshots.length} / 5</span>
        )}
      </header>

      {snapshots.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="grid grid-cols-2 gap-3 p-4">
          {snapshots.map((snapshot) => (
            <button
              key={snapshot.id}
              onClick={() => handleView(snapshot)}
              className="flex flex-col items-center gap-2.5 rounded-2xl bg-surface p-3 text-left transition-opacity active:opacity-70"
            >
              <SnapshotThumbnail snapshot={snapshot} />
              <div className="w-full">
                {snapshot.message ? (
                  <p className="line-clamp-2 text-sm leading-snug text-primary">{snapshot.message}</p>
                ) : (
                  <p className="text-sm text-caption/60">문구 없음</p>
                )}
                <p className="mt-1 text-xs text-caption">{formatDate(snapshot.createdAt)}</p>
              </div>
            </button>
          ))}
        </section>
      )}
    </main>
  )
}

function EmptyState() {
  const router = useRouter()
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-24 text-center">
      <Archive className="size-9 text-caption/30" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-primary">아직 저장된 관이 없어요</p>
        <p className="text-xs text-caption">관을 꾸미고 완성하면 여기에 보관돼요</p>
      </div>
      <button
        onClick={() => router.push('/')}
        className="mt-1 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-fg"
      >
        관 꾸미러 가기
      </button>
    </div>
  )
}
