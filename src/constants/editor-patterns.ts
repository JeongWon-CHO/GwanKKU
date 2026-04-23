export type PatternId = 'none' | 'dots' | 'lines' | 'linen'

export type PatternDef = {
  id: PatternId
  label: string
}

export const PATTERN_DEFS: PatternDef[] = [
  { id: 'none',  label: '없음' },
  { id: 'dots',  label: '점' },
  { id: 'lines', label: '사선' },
  { id: 'linen', label: '린넨' },
]

type PatternStyle = {
  backgroundImage: string
  backgroundSize?: string
}

// isLightBg: 관 배경색이 밝으면 dark 패턴, 어두우면 light 패턴
export function getPatternStyle(
  patternId: PatternId,
  isLightBg: boolean,
): PatternStyle | null {
  if (patternId === 'none') return null

  const mk = (opacity: number) =>
    isLightBg ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`

  switch (patternId) {
    case 'dots':
      return {
        backgroundImage: `radial-gradient(circle, ${mk(0.13)} 1px, transparent 1px)`,
        backgroundSize: '12px 12px',
      }
    case 'lines':
      return {
        backgroundImage: `repeating-linear-gradient(-45deg, ${mk(0.09)} 0, ${mk(0.09)} 1px, transparent 1px, transparent 8px)`,
      }
    case 'linen': {
      const c = mk(0.07)
      return {
        backgroundImage: [
          `repeating-linear-gradient(0deg, ${c} 0, ${c} 1px, transparent 1px, transparent 5px)`,
          `repeating-linear-gradient(90deg, ${c} 0, ${c} 1px, transparent 1px, transparent 5px)`,
        ].join(', '),
      }
    }
    default:
      return null
  }
}
