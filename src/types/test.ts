export type QuestionOption = {
  id: string   // 'A' | 'B' | ... — 문자열이므로 4지선다 등으로 자유 확장
  text: string
}

export type Question = {
  id: number
  text: string
  options: QuestionOption[]  // 배열 기반, 선택지 수 고정 없음
}
