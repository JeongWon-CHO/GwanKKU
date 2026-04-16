'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { GuardianType } from '@/types/guardian'

type Props = {
  guardian: GuardianType
  lines: string[]     // 어떤 대사를 보여줄지는 호출하는 쪽에서 결정
  showMs?: number     // 말풍선이 보이는 시간 (기본 5초)
  hideMs?: number     // 말풍선이 숨겨지는 시간 (기본 10초)
  className?: string  // 배치 방식은 외부에서 담당 (fixed/inline 등)
}

export function GuardianGuide({
  guardian,
  lines,
  showMs = 5000,
  hideMs = 10000,
  className,
}: Props) {
  const [index, setIndex] = useState(0)
  const [bubbleVisible, setBubbleVisible] = useState(true)

  useEffect(() => {
    // lines가 바뀌면 (탭 전환 등) 처음 대사부터 다시 시작
    setIndex(0)
    setBubbleVisible(true)

    // 말풍선 노출 사이클: showMs 보임 → hideMs 숨김 → 다음 대사 → 반복
    const cycleDuration = showMs + hideMs

    let hideTimer = setTimeout(() => setBubbleVisible(false), showMs)

    const cycleTimer = setInterval(() => {
      setIndex((i) => (i + 1) % lines.length)
      setBubbleVisible(true)
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => setBubbleVisible(false), showMs)
    }, cycleDuration)

    return () => {
      clearInterval(cycleTimer)
      clearTimeout(hideTimer)
    }
  }, [lines, showMs, hideMs])

  const currentLine = lines[index] ?? ''

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* 원형 아바타 — 항상 노출 */}
      <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/20">
        <Image
          src={guardian.imagePath}
          alt=""  // 말풍선 텍스트가 내용을 전달하므로 장식 처리
          fill
          className="object-cover"
          aria-hidden
        />
      </div>

      {/* 말풍선 — showMs/hideMs 사이클로 나타났다 사라짐 */}
      <div
        className={cn(
          'relative max-w-[200px] rounded-2xl bg-surface px-3 py-2 shadow-sm transition-opacity duration-300',
          bubbleVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!bubbleVisible}
      >
        {/* 왼쪽 방향 꼬리 */}
        <div
          className="absolute top-1/2 -left-1.5 h-0 w-0 -translate-y-1/2"
          style={{
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderRight: '6px solid var(--bg-surface)',
          }}
          aria-hidden
        />
        <p
          className="line-clamp-2 text-xs leading-snug text-body"
          aria-live="polite"
        >
          {currentLine}
        </p>
      </div>
    </div>
  )
}
