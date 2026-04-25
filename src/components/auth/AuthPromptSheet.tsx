'use client'

import { cn } from '@/lib/utils'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function AuthPromptSheet({ isOpen, onClose, onConfirm }: Props) {
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/30 transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 바텀 시트 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="로그인 안내"
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-background px-6 pb-10 pt-5 shadow-xl transition-transform duration-300',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {/* 핸들바 */}
        <div className="mx-auto mb-7 h-1 w-10 rounded-full bg-line" />

        {/* 문구 */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-base font-medium text-primary">
            이 관을 보관함에 남기고 싶다면
          </p>
          <p className="text-sm leading-relaxed text-caption">
            로그인하면 나만의 보관함에 저장되고
            <br />
            언제든 다시 꺼내볼 수 있어요
          </p>
        </div>

        {/* Google 로그인 버튼 */}
        <button
          onClick={onConfirm}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-line bg-white py-4 text-sm font-medium text-gray-700 shadow-sm transition-opacity active:opacity-70"
        >
          <GoogleIcon />
          Google로 계속하기
        </button>

        {/* 닫기 */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-center text-sm text-caption transition-opacity active:opacity-60"
        >
          나중에 하기
        </button>
      </div>
    </>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}
