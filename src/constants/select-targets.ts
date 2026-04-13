// 꾸미기 대상 목록
// enabled: true → 선택 가능 / false → 준비 중 표시
// href: 에디터 라우트 (추후 /editor/[target] 구조로 확장)
export type SelectTarget = {
  id: string
  title: string
  description: string
  href: string
  enabled: boolean
}

export const SELECT_TARGETS: SelectTarget[] = [
  {
    id: 'coffin',
    title: '관 꾸미기',
    description: '나만의 결로 완성하는 마지막 공간',
    href: '/editor/coffin',
    enabled: true,
  },
  {
    id: 'urn',
    title: '유골함 꾸미기',
    description: '조용하고 오래 남는 형태로',
    href: '/editor/urn',
    enabled: false,
  },
  {
    id: 'funeral',
    title: '장례식장 꾸미기',
    description: '마지막 공간의 분위기를 직접 고르는 일',
    href: '/editor/funeral',
    enabled: false,
  },
  {
    id: 'grave',
    title: '산소 꾸미기',
    description: '계절마다 달라지는 내 자리',
    href: '/editor/grave',
    enabled: false,
  },
]
