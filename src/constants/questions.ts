import type { Question } from '@/types/test'

// 임시 문항 — 흐름 검증용 4문항 2지선다
// 추후 실제 성향 분류 기준에 맞춰 12문항 4지선다로 교체 예정
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '혼자만의 시간이 생겼다. 나는?',
    options: [
      { id: 'A', text: '조용한 곳에서 혼자 쉰다' },
      { id: 'B', text: '좋아하는 사람과 함께 보낸다' },
    ],
  },
  {
    id: 2,
    text: '내가 좋아하는 공간의 분위기는?',
    options: [
      { id: 'A', text: '차분하고 절제된 공간' },
      { id: 'B', text: '따뜻하고 생기 넘치는 공간' },
    ],
  },
  {
    id: 3,
    text: '마지막을 기억하는 방식이라면?',
    options: [
      { id: 'A', text: '조용히, 나만 아는 방식으로' },
      { id: 'B', text: '소중한 사람들과 함께 기억되고 싶다' },
    ],
  },
  {
    id: 4,
    text: '내가 남기고 싶은 것은?',
    options: [
      { id: 'A', text: '한 편의 글이나 기록' },
      { id: 'B', text: '따뜻한 기억과 감정' },
    ],
  },
]
