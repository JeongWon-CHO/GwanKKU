'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Archive, Pencil } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useArchiveSnapshots } from '@/hooks/useArchiveSnapshots'
import { useEditorStore } from '@/store/useEditorStore'
import { signInWithGoogle, signOut } from '@/lib/auth'
import { saveCoffinView } from '@/lib/coffin-view'
import { SnapshotThumbnail } from '@/components/archive/SnapshotThumbnail'
import type { CoffinSnapshot } from '@/types/snapshot'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

export function ArchiveView() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { snapshots, loading } = useArchiveSnapshots(user)
  const loadFromSnapshot = useEditorStore((s) => s.loadFromSnapshot)

  function handleView(snapshot: CoffinSnapshot) {
    saveCoffinView(snapshot, true)
    router.push(`/coffin/${snapshot.id}`)
  }

  function handleEdit(snapshot: CoffinSnapshot, e: React.MouseEvent) {
    e.stopPropagation()
    loadFromSnapshot(snapshot)
    router.push('/editor/coffin')
  }

  const isLoggedIn = !authLoading && user !== null
  const count = snapshots.length

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
        <div className="ml-auto flex items-center gap-3">
          {!loading && count > 0 && !isLoggedIn && (
            <span className="text-xs text-caption">{count} / 5</span>
          )}
          {!authLoading && isLoggedIn && (
            <button
              onClick={() => signOut()}
              className="text-xs text-caption transition-opacity hover:opacity-70"
            >
              로그아웃
            </button>
          )}
        </div>
      </header>

      {loading || authLoading ? (
        // 로딩 중: 조용히 빈 화면 (짧은 네트워크 요청이므로 스피너 없음)
        <div className="flex-1" />
      ) : count === 0 ? (
        <EmptyState isLoggedIn={isLoggedIn} />
      ) : (
        <section className="grid grid-cols-2 gap-3 p-4">
          {snapshots.map((snapshot) => (
            <button
              key={snapshot.id}
              onClick={() => handleView(snapshot)}
              className="flex flex-col overflow-hidden rounded-2xl bg-surface text-left transition-opacity active:opacity-70"
            >
              <SnapshotThumbnail snapshot={snapshot} />
              <div className="w-full px-3 pb-2 pt-2.5">
                {snapshot.message ? (
                  <p className="line-clamp-2 text-sm leading-snug text-primary">
                    {snapshot.message}
                  </p>
                ) : (
                  <p className="text-sm text-caption/50">문구 없음</p>
                )}
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-caption">{formatDate(snapshot.createdAt)}</p>
                  <button
                    onClick={(e) => handleEdit(snapshot, e)}
                    aria-label="다시 꾸미기"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full text-caption/60 active:bg-black/8 -mr-1.5"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                </div>
              </div>
            </button>
          ))}
        </section>
      )}
    </main>
  )
}

function EmptyState({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-24 text-center">
      <Archive className="size-9 text-caption/30" />
      <div className="flex flex-col gap-1">
        {isLoggedIn ? (
          <>
            <p className="text-sm font-medium text-primary">아직 등록된 관이 없어요</p>
            <p className="text-xs text-caption">
              관을 꾸미고 공개하면 내 계정에 보관돼요
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-primary">아직 저장된 관이 없어요</p>
            <p className="text-xs text-caption">관을 꾸미고 완성하면 여기에 보관돼요</p>
          </>
        )}
      </div>
      <button
        onClick={() => router.push('/')}
        className="mt-1 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-fg"
      >
        관 꾸미러 가기
      </button>
      {!isLoggedIn && (
        <button
          onClick={() => signInWithGoogle('/archive')}
          className="text-xs text-caption underline underline-offset-2 transition-opacity hover:opacity-70"
        >
          로그인하면 어디서든 볼 수 있어요
        </button>
      )}
    </div>
  )
}
