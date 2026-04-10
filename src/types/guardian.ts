// 4개 축 — 각 축의 "첫 번째 pole" 기준 키
// spotlight ↔ moonlight
// soft ↔ strong
// playful ↔ calm
// warm ↔ free
export type GuardianAxisKey = 'spotlight' | 'soft' | 'playful' | 'warm'

// 각 축의 점수 집계 결과
// 양수 → 첫 번째 pole (spotlight / soft / playful / warm)
// 음수 → 두 번째 pole (moonlight / strong / calm / free)
export type AxisScores = Record<GuardianAxisKey, number>

// 16개 타입 키 — axes 조합과 1:1 대응
export type GuardianTypeKey =
  | 'sunshine_mellow'     // spotlight · soft · playful · warm   → 햇살 말랑형
  | 'spark_free'          // spotlight · soft · playful · free   → 반짝 자유형
  | 'cozy_sunshine'       // spotlight · soft · calm   · warm   → 포근한 햇살형
  | 'light_free'          // spotlight · soft · calm   · free   → 빛결 자유형
  | 'warm_leader'         // spotlight · strong · playful · warm → 다정한 리더형
  | 'free_spark'          // spotlight · strong · playful · free → 자유로운 반짝임형
  | 'warm_center'         // spotlight · strong · calm  · warm  → 온기 있는 중심형
  | 'vivid_protagonist'   // spotlight · strong · calm  · free  → 선명한 주인공형
  | 'moonlight_mellow'    // moonlight · soft · playful · warm  → 달빛 말랑형
  | 'subtle_playful'      // moonlight · soft · playful · free  → 은근 장난형
  | 'cozy_moonlight'      // moonlight · soft · calm   · warm  → 포근한 달빛형
  | 'serene_free'         // moonlight · soft · calm   · free  → 고요한 자유형
  | 'hidden_steady'       // moonlight · strong · playful · warm → 숨은 든든형
  | 'mystic_drift'        // moonlight · strong · playful · free → 신비로운 유영형
  | 'quiet_guardian'      // moonlight · strong · calm  · warm  → 조용한 수호형
  | 'deep_night'          // moonlight · strong · calm  · free  → 깊은 밤결형

// 각 타입의 axes 조합
// true = 첫 번째 pole, false = 두 번째 pole
export type GuardianAxes = {
  spotlight: boolean  // true=spotlight, false=moonlight
  soft: boolean       // true=soft,      false=strong
  playful: boolean    // true=playful,   false=calm
  warm: boolean       // true=warm,      false=free
}

// 캐릭터 말투 가이드 — UI 노출 없이 메타데이터로 보관
// 추후 대사 생성, 에디터 가이드 문구 등에 활용 가능
export type GuardianTone = {
  impression: string    // 기본 인상
  temperature: string   // 말투 온도 (낮음 / 중간 / 높음)
  sentenceLength: string // 문장 길이 (짧음 / 중간 / 짧음~중간 등)
  style: string         // 주로 쓰는 방식
  keywords: string[]    // 자주 쓰는 표현 키워드
  avoid: string         // 피해야 할 톤
}

export type GuardianType = {
  key: GuardianTypeKey
  name: string          // 한글 타입명
  description: string   // 한 줄 설명 (결과 화면 노출)
  firstLine: string     // 수호캐릭터 첫 만남 대사 (결과 화면 노출)
  axes: GuardianAxes
  tone?: GuardianTone   // 말투 가이드 (현재 UI 미노출 — 추후 확장용)
}
