'use client'

import { useRouter } from 'next/navigation'
import { useTestStore } from '@/store/useTestStore'
import { QUESTIONS } from '@/constants/questions'
import { cn } from '@/lib/utils'

type Props = {
  step: number
}

export function TestStepView({ step }: Props) {
  const router = useRouter()
  const { answers, setAnswer } = useTestStore()

  const total = QUESTIONS.length
  const question = QUESTIONS[step - 1]

  if (!question) {
    router.replace('/test')
    return null
  }

  const selected = answers[question.id]

  function handleSelect(optionId: string) {
    setAnswer(question.id, optionId)

    if (step < total) {
      router.push(`/test/${step + 1}`)
    } else {
      router.push('/hatch')
    }
  }

  function handleBack() {
    if (step > 1) {
      router.push(`/test/${step - 1}`)
    } else {
      router.push('/test')
    }
  }

  return (
    <main className="flex min-h-screen flex-col px-6 py-16">
      {/* 진행 바 */}
      <div className="mb-10 flex flex-col gap-2">
        <div className="flex justify-between text-xs text-body">
          <span>{step} / {total}</span>
        </div>
        <div className="h-1 w-full rounded-full bg-inset">
          <div
            className="h-1 rounded-full bg-primary transition-all"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      {/* 문항 */}
      <div className="flex flex-1 flex-col justify-between">
        <p className="text-lg font-medium leading-snug text-primary">
          {question.text}
        </p>

        {/* 선택지 */}
        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                'w-full rounded-2xl border px-5 py-4 text-left text-sm transition-colors',
                selected === option.id
                  ? 'border-primary bg-primary text-background'
                  : 'border-line text-primary hover:border-line-strong'
              )}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* 뒤로가기 */}
      <button
        onClick={handleBack}
        className="mt-10 text-xs text-caption hover:opacity-70"
      >
        이전으로
      </button>
    </main>
  )
}
