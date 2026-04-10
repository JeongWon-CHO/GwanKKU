'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ── 이미지 교체 포인트 ────────────────────────────────────────────
// 나중에 단계별 이미지가 생기면 아래 경로만 바꾸면 됨
// 이미지가 없는 단계는 이전 단계 이미지를 유지하고, SVG 크랙 오버레이로 표현
const EGG_IMAGES: Record<number, string> = {
  0: '/images/egg/egg-stage-1.png', // 기본 알
  1: '/images/egg/egg-stage-1.png', // 1클릭 후 → 추후 '/images/egg/egg-stage-2.png'
  2: '/images/egg/egg-stage-1.png', // 2클릭 후 → 추후 '/images/egg/egg-stage-3.png'
  3: '/images/egg/egg-stage-1.png', // 3클릭 후 → 추후 '/images/egg/egg-stage-4.png'
}

const STAGE_HINTS: Record<number, string> = {
  0: '두드려봐',
  1: '조금 더...',
  2: '금이 가고 있어...',
  3: '거의 다 왔어...',
}

// 클릭 횟수에 따른 shake 강도
const SHAKE_CLASS: Record<number, string> = {
  1: 'animate-hatch-shake-sm',
  2: 'animate-hatch-shake-md',
  3: 'animate-hatch-shake-lg',
}

const TOTAL_CLICKS = 4

export function HatchView() {
  const router = useRouter()
  const [clicks, setClicks] = useState(0)
  const [shakeKey, setShakeKey] = useState(0)   // key 교체로 애니메이션 재트리거
  const [activeShake, setActiveShake] = useState<number | null>(null)
  const [isCompleting, setIsCompleting] = useState(false)

  function handleTap() {
    if (activeShake !== null || isCompleting) return

    const next = clicks + 1

    if (next >= TOTAL_CLICKS) {
      setIsCompleting(true)
      setTimeout(() => router.push('/result'), 900)
      return
    }

    setClicks(next)
    setActiveShake(next)
    setShakeKey((k) => k + 1)
    // shake 지속 시간보다 약간 짧게 해제 (다음 클릭 허용)
    setTimeout(() => setActiveShake(null), 450)
  }

  const imageSrc = EGG_IMAGES[Math.min(clicks, 3) as keyof typeof EGG_IMAGES]

  const eggAnimClass = isCompleting
    ? 'animate-hatch-burst'
    : activeShake !== null
      ? (SHAKE_CLASS[activeShake] ?? '')
      : ''

  return (
    <>
      {/* 커스텀 keyframe — 나중에 globals.css로 이동 가능 */}
      <style>{`
        @keyframes hatch-shake-sm {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20%       { transform: translate(-4px, -1px) rotate(-1.5deg); }
          40%       { transform: translate(4px, 1px) rotate(1.5deg); }
          60%       { transform: translate(-3px, 0) rotate(-1deg); }
          80%       { transform: translate(3px, 0) rotate(0.5deg); }
        }
        @keyframes hatch-shake-md {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          15%       { transform: translate(-6px, -2px) rotate(-2.5deg); }
          30%       { transform: translate(6px, 2px) rotate(2.5deg); }
          45%       { transform: translate(-5px, -1px) rotate(-1.5deg); }
          60%       { transform: translate(5px, 1px) rotate(1.5deg); }
          75%       { transform: translate(-3px, 0) rotate(-0.5deg); }
          90%       { transform: translate(3px, 0) rotate(0.5deg); }
        }
        @keyframes hatch-shake-lg {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          10%       { transform: translate(-8px, -2px) rotate(-3deg) scale(1.02); }
          22%       { transform: translate(8px, 2px) rotate(3deg) scale(1.02); }
          33%       { transform: translate(-7px, -1px) rotate(-2deg) scale(1.01); }
          44%       { transform: translate(7px, 1px) rotate(2deg) scale(1.01); }
          55%       { transform: translate(-5px, 0) rotate(-1deg); }
          66%       { transform: translate(5px, 0) rotate(1deg); }
          77%       { transform: translate(-2px, 0); }
          88%       { transform: translate(2px, 0); }
        }
        @keyframes hatch-burst {
          0%   { transform: scale(1);    opacity: 1; }
          30%  { transform: scale(1.12); opacity: 1; }
          65%  { transform: scale(1.3);  opacity: 0.5; }
          100% { transform: scale(1.5);  opacity: 0; }
        }
        @keyframes hatch-glow-pulse {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.6; }
        }
        .animate-hatch-shake-sm  { animation: hatch-shake-sm  0.4s  ease-in-out; }
        .animate-hatch-shake-md  { animation: hatch-shake-md  0.42s ease-in-out; }
        .animate-hatch-shake-lg  { animation: hatch-shake-lg  0.48s ease-in-out; }
        .animate-hatch-burst     { animation: hatch-burst     0.9s  ease-out forwards; }
        .animate-hatch-glow      { animation: hatch-glow-pulse 1.6s ease-in-out infinite; }
      `}</style>

      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        {/* 알 클릭 영역 */}
        <button
          onClick={handleTap}
          disabled={isCompleting}
          aria-label="알 두드리기"
          className="relative flex items-center justify-center p-8 focus:outline-none"
        >
          {/* 글로우 — clicks 3단계 이상 또는 완성 중 */}
          {(clicks >= 3 || isCompleting) && (
            <div
              aria-hidden
              className="animate-hatch-glow pointer-events-none absolute inset-0 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,218,100,0.55) 0%, transparent 68%)',
              }}
            />
          )}

          {/* 알 이미지 + 크랙 오버레이 */}
          <div
            key={shakeKey}
            className={cn('relative w-[200px] h-[240px]', eggAnimClass)}
          >
            <Image
              src={imageSrc}
              alt="수호 알"
              fill
              className="object-contain"
              priority
            />

            {/* SVG 크랙 오버레이 ────────────────────────────────────
                실제 금 간 이미지가 추가되면 이 블록을 제거하거나
                이미지와 함께 유지해 레이어드 효과로 활용 가능
            ─────────────────────────────────────────────────────── */}
            {clicks >= 2 && !isCompleting && (
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 200 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 금 1: 상단 중앙 → 왼쪽 하단 */}
                <path
                  d="M100 58 L87 93 L76 119"
                  stroke="rgba(0,0,0,0.22)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* 금 1 가지 */}
                <path
                  d="M87 93 L96 108"
                  stroke="rgba(0,0,0,0.18)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />

                {/* 금 2: 오른쪽 — clicks 3단계부터 표시 */}
                {clicks >= 3 && (
                  <>
                    <path
                      d="M113 68 L124 97 L132 120"
                      stroke="rgba(0,0,0,0.22)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M124 97 L116 112"
                      stroke="rgba(0,0,0,0.18)"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            )}
          </div>
        </button>

        {/* 진행 도트 */}
        <div className="mt-10 flex gap-2">
          {Array.from({ length: TOTAL_CLICKS }, (_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                i < clicks ? 'bg-foreground' : 'bg-subtle',
              )}
            />
          ))}
        </div>

        {/* 단계 힌트 */}
        {!isCompleting && (
          <p className="mt-4 text-sm text-muted">
            {STAGE_HINTS[clicks]}
          </p>
        )}
      </main>
    </>
  )
}
