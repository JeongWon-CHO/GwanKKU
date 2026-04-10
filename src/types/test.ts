import type { GuardianAxisKey } from './guardian'

// 선택지가 기여하는 축과 방향
// direction: 1 = 첫 번째 pole (spotlight / soft / playful / warm)
//           -1 = 두 번째 pole (moonlight / strong / calm / free)
export type AxisVote = {
  axis: GuardianAxisKey
  direction: 1 | -1
}

export type QuestionOption = {
  id: string          // 'A' | 'B' | 'C' | 'D' — 4지선다 등으로 자유 확장
  text: string
  votes: AxisVote[]   // 이 선택지가 기여하는 축 목록 (한 문항이 2개 축 측정)
}

export type Question = {
  id: number
  text: string
  options: QuestionOption[]
}
