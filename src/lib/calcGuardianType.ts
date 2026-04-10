import { QUESTIONS } from '@/constants/questions'
import { GUARDIAN_TYPES } from '@/constants/guardian-types'
import type { AxisScores, GuardianType, GuardianTypeKey } from '@/types/guardian'

// answers: Record<questionId, optionId>
export function calcAxisScores(answers: Record<number, string>): AxisScores {
  const scores: AxisScores = { spotlight: 0, soft: 0, playful: 0, warm: 0 }

  for (const [questionIdStr, optionId] of Object.entries(answers)) {
    const questionId = parseInt(questionIdStr, 10)
    const question = QUESTIONS.find((q) => q.id === questionId)
    if (!question) continue

    const option = question.options.find((o) => o.id === optionId)
    if (!option) continue

    for (const vote of option.votes) {
      scores[vote.axis] += vote.direction
    }
  }

  return scores
}

// 동점 처리: 현재는 첫 번째 pole(true) 기본값
// 추후 타이브레이커 문항 결과를 tiebreaker 인자로 받아 처리 가능하도록 확장 포인트 마련
export function resolveAxes(
  scores: AxisScores,
  // tiebreaker?: Partial<Record<GuardianAxisKey, boolean>>  // 추후 확장
): GuardianType['axes'] {
  return {
    spotlight: scores.spotlight >= 0,
    soft: scores.soft >= 0,
    playful: scores.playful >= 0,
    warm: scores.warm >= 0,
  }
}

export function calcGuardianType(answers: Record<number, string>): GuardianTypeKey {
  const scores = calcAxisScores(answers)
  const axes = resolveAxes(scores)

  const match = GUARDIAN_TYPES.find(
    (t) =>
      t.axes.spotlight === axes.spotlight &&
      t.axes.soft === axes.soft &&
      t.axes.playful === axes.playful &&
      t.axes.warm === axes.warm
  )

  // 정상적인 데이터라면 항상 match가 존재함
  return match?.key ?? 'cozy_sunshine'
}
