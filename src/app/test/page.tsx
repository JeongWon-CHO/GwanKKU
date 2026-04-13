import Link from 'next/link'
import { QUESTIONS } from '@/constants/questions'

export default function TestIntroPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-16">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-primary">
            나를 알아가는 시간
          </h1>
          <p className="text-sm leading-relaxed text-body">
            몇 가지 질문으로 당신의 수호캐릭터를 찾아드릴게요.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-body">
          <span>총 {QUESTIONS.length}문항</span>
          <span>약 1분 소요</span>
        </div>

        <Link
          href="/test/1"
          className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          시작하기
        </Link>
      </div>

      <Link href="/" className="text-xs text-caption hover:opacity-70">
        돌아가기
      </Link>
    </main>
  )
}
