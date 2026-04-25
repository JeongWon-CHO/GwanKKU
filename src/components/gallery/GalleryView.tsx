'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Columns2 } from 'lucide-react'
import {
  fetchGallerySnapshots,
  incrementLike,
  decrementLike,
  saveGallerySnapshotToArchive,
} from '@/lib/gallery'
import { useAuth } from '@/hooks/useAuth'
import { useLikedSnapshots } from '@/hooks/useLikedSnapshots'
import { SnapshotThumbnail } from '@/components/archive/SnapshotThumbnail'
import { cn } from '@/lib/utils'
import type { GallerySnapshot, SortOrder } from '@/types/gallery'
import type { CoffinSnapshot } from '@/types/snapshot'

function toThumbnailSnapshot(row: GallerySnapshot): CoffinSnapshot {
  return {
    version: 1,
    id: row.client_id,
    createdAt: row.created_at,
    target: row.target,
    message: row.message,
    messageStyle: row.editor_data.messageStyle,
    backgroundColor: row.editor_data.backgroundColor,
    backgroundPatternId: row.editor_data.backgroundPatternId,
    faceGrids: row.editor_data.faceGrids,
    uploadedImages: [],
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

export function GalleryView() {
  const router = useRouter()
  const { user } = useAuth()
  const [sort, setSort] = useState<SortOrder>('latest')
  const [snapshots, setSnapshots] = useState<GallerySnapshot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const { isLiked, addLike, removeLike } = useLikedSnapshots()

  useEffect(() => {
    setIsLoading(true)
    fetchGallerySnapshots(sort)
      .then(setSnapshots)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [sort])

  async function handleLike(snapshot: GallerySnapshot) {
    const wasLiked = isLiked(snapshot.id)

    // 1. 낙관적 업데이트
    setSnapshots((prev) =>
      prev.map((s) =>
        s.id === snapshot.id
          ? { ...s, like_count: wasLiked ? Math.max(0, s.like_count - 1) : s.like_count + 1 }
          : s,
      ),
    )
    if (wasLiked) removeLike(snapshot.id)
    else addLike(snapshot.id)

    try {
      // 2. 서버 동기화
      const serverCount = wasLiked
        ? await decrementLike(snapshot.id)
        : await incrementLike(snapshot.id)
      setSnapshots((prev) =>
        prev.map((s) => (s.id === snapshot.id ? { ...s, like_count: serverCount } : s)),
      )
    } catch {
      // 3. 롤백
      setSnapshots((prev) =>
        prev.map((s) =>
          s.id === snapshot.id ? { ...s, like_count: snapshot.like_count } : s,
        ),
      )
      if (wasLiked) addLike(snapshot.id)
      else removeLike(snapshot.id)
    }
  }

  function handleSave(snapshot: GallerySnapshot) {
    saveGallerySnapshotToArchive(snapshot)
    setSavedIds((prev) => new Set(prev).add(snapshot.id))
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
        <div className="flex flex-col">
          <h1 className="text-base font-medium text-primary">온라인 관짝함</h1>
          <p className="text-xs text-caption">사람들이 꾸민 관을 구경해요</p>
        </div>
        <button
          onClick={() => router.push('/archive')}
          className="ml-auto text-xs text-caption underline-offset-2 hover:underline"
        >
          나의 보관함
        </button>
      </header>

      {/* 정렬 탭 */}
      <div className="flex gap-1 border-b border-line px-4 py-2.5">
        {(['latest', 'popular'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm transition-colors',
              sort === s
                ? 'bg-accent text-accent-fg font-medium'
                : 'text-caption hover:text-body',
            )}
          >
            {s === 'latest' ? '최신순' : '추천순'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingState />
      ) : snapshots.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="grid grid-cols-2 gap-3 p-4">
          {snapshots.map((snapshot) => (
            <GalleryCard
              key={snapshot.id}
              snapshot={snapshot}
              liked={isLiked(snapshot.id)}
              saved={savedIds.has(snapshot.id)}
              isOwn={!!user && snapshot.user_id === user.id}
              onLike={() => handleLike(snapshot)}
              onSave={() => handleSave(snapshot)}
            />
          ))}
        </section>
      )}
    </main>
  )
}

type CardProps = {
  snapshot: GallerySnapshot
  liked: boolean
  saved: boolean
  isOwn: boolean
  onLike: () => void
  onSave: () => void
}

function GalleryCard({ snapshot, liked, saved, isOwn, onLike, onSave }: CardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-surface">
      <SnapshotThumbnail snapshot={toThumbnailSnapshot(snapshot)} />

      <div className="flex flex-col gap-2 px-3 pb-3 pt-2.5">
        {snapshot.message ? (
          <p className="line-clamp-1 text-sm leading-snug text-primary">{snapshot.message}</p>
        ) : (
          <p className="text-sm text-caption/40">문구 없음</p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-caption">{formatDate(snapshot.created_at)}</span>
          <button
            onClick={onLike}
            className="flex items-center gap-1 text-xs text-caption transition-opacity active:opacity-60"
            aria-label={liked ? '추천 취소' : '추천하기'}
          >
            <span className={cn('text-sm leading-none', liked && 'text-rose-400')}>
              {liked ? '♥' : '♡'}
            </span>
            <span>{snapshot.like_count}</span>
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <button
            onClick={onLike}
            className={cn(
              'w-full rounded-xl py-1.5 text-xs font-medium transition-colors',
              liked
                ? 'bg-rose-50 text-rose-400'
                : 'border border-line text-caption hover:text-body',
            )}
          >
            {liked ? '♥ 추천했어요' : '♡ 추천하기'}
          </button>

          {!isOwn && (
            <button
              onClick={onSave}
              disabled={saved}
              className="w-full rounded-xl border border-line py-1.5 text-xs text-caption transition-colors hover:text-body disabled:border-transparent disabled:text-caption/50"
            >
              {saved ? '보관함에 저장됐어요' : '내 디자인으로 저장'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <Columns2 className="size-5 animate-pulse text-caption/30" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-24 text-center">
      <p className="text-sm font-medium text-primary">아직 공개된 관이 없어요</p>
      <p className="text-xs text-caption">
        꾸민 관을 공개 저장하면 여기서 볼 수 있어요
      </p>
    </div>
  )
}
