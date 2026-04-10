import type { Question } from '@/types/test'

// 12문항 4지선다 — 축 구성 주석은 (axis1 pole / axis2 pole) 기준
// direction: +1 = 해당 축의 첫 번째 pole, -1 = 두 번째 pole
//   spotlight(+1) ↔ moonlight(-1)
//   soft(+1) ↔ strong(-1)
//   playful(+1) ↔ calm(-1)
//   warm(+1) ↔ free(-1)
//
// 묶음별 측정 축:
//   묶음 1 (Q1,Q2): spotlight ↔ moonlight  +  soft ↔ strong
//   묶음 2 (Q3,Q4): spotlight ↔ moonlight  +  playful ↔ calm
//   묶음 3 (Q5,Q6): spotlight ↔ moonlight  +  warm ↔ free
//   묶음 4 (Q7,Q8): soft ↔ strong          +  playful ↔ calm
//   묶음 5 (Q9,Q10): soft ↔ strong         +  warm ↔ free
//   묶음 6 (Q11,Q12): playful ↔ calm       +  warm ↔ free
//
// 각 축의 측정 횟수: 묶음 1~3 + 묶음 4~5 또는 1~3 + 5~6 = 6회씩 균등

export const QUESTIONS: Question[] = [
  // ── 묶음 1-A ──────────────────────────────────────
  {
    id: 1,
    text: '사람들이 나를 떠올릴 때, 이런 존재였으면 좋겠어.',
    options: [
      {
        id: 'A',
        text: '환하게 다가와 마음을 풀어주는 사람',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'soft', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '앞에 서면 괜히 믿음이 가는 사람',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'soft', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '조용히 곁에 있으면서 안심을 주는 사람',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'soft', direction: 1 },
        ],
      },
      {
        id: 'D',
        text: '말이 많지 않아도 중심이 느껴지는 사람',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'soft', direction: -1 },
        ],
      },
    ],
  },

  // ── 묶음 1-B ──────────────────────────────────────
  {
    id: 2,
    text: '내 곁을 지켜주는 존재가 있다면 가장 끌리는 건?',
    options: [
      {
        id: 'A',
        text: '먼저 다가와 다정하게 안아주는 존재',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'soft', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '눈에 띄게 나를 지켜주고 이끌어주는 존재',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'soft', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '말없이 곁을 지키며 따뜻함을 주는 존재',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'soft', direction: 1 },
        ],
      },
      {
        id: 'D',
        text: '조용하지만 어떤 순간에도 흔들리지 않는 존재',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'soft', direction: -1 },
        ],
      },
    ],
  },

  // ── 묶음 2-A ──────────────────────────────────────
  {
    id: 3,
    text: '내 방 한쪽을 꾸민다면 더 손이 갈 것 같은 분위기는?',
    options: [
      {
        id: 'A',
        text: '눈에 띄고 귀여운 장난기가 있는 분위기',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'playful', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '눈에 띄지만 정리된 완성도가 있는 분위기',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'playful', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '잔잔하지만 보면 미소가 나는 분위기',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'playful', direction: 1 },
        ],
      },
      {
        id: 'D',
        text: '조용하고 은은하게 예쁜 분위기',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'playful', direction: -1 },
        ],
      },
    ],
  },

  // ── 묶음 2-B ──────────────────────────────────────
  {
    id: 4,
    text: '자꾸 저장하게 되는 공간 사진은 보통 어느 쪽이야?',
    options: [
      {
        id: 'A',
        text: '색감도 확실하고 디테일도 재밌는 공간',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'playful', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '포인트는 분명한데 전체적으로 정리된 공간',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'playful', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '소소한 귀여움이 숨어 있는 공간',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'playful', direction: 1 },
        ],
      },
      {
        id: 'D',
        text: '잔잔하고 여백이 예쁜 공간',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'playful', direction: -1 },
        ],
      },
    ],
  },

  // ── 묶음 3-A ──────────────────────────────────────
  {
    id: 5,
    text: '누군가를 떠올릴 때 괜히 오래 남는 분위기는 어느 쪽이야?',
    options: [
      {
        id: 'A',
        text: '밝고 다정해서 주변 공기가 편해지는 쪽',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '눈에 띄고 자기만의 결이 분명한 쪽',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'warm', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '조용한데 따뜻함이 은근히 느껴지는 쪽',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'D',
        text: '말은 많지 않은데 자기 세계가 선명한 쪽',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'warm', direction: -1 },
        ],
      },
    ],
  },

  // ── 묶음 3-B ──────────────────────────────────────
  {
    id: 6,
    text: '같이 지내고 싶은 반려동물의 느낌으로 더 가까운 건?',
    options: [
      {
        id: 'A',
        text: '반갑게 다가오고 정이 가는 타입',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '독특하고 자기만의 분위기가 있는 타입',
        votes: [
          { axis: 'spotlight', direction: 1 },
          { axis: 'warm', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '조용히 곁에 있는 느낌이 좋은 타입',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'D',
        text: '말없이 자기 방식대로 있는 타입',
        votes: [
          { axis: 'spotlight', direction: -1 },
          { axis: 'warm', direction: -1 },
        ],
      },
    ],
  },

  // ── 묶음 4-A ──────────────────────────────────────
  {
    id: 7,
    text: '내 방에 두는 소품으로 더 자주 고를 것 같은 건?',
    options: [
      {
        id: 'A',
        text: '보면 괜히 웃음 나는 귀엽고 말랑한 소품',
        votes: [
          { axis: 'soft', direction: 1 },
          { axis: 'playful', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '형태가 딱 잡혀 있고 분위기를 정리해주는 소품',
        votes: [
          { axis: 'soft', direction: -1 },
          { axis: 'playful', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '눈에 거슬리지 않고 오래 두기 좋은 포근한 소품',
        votes: [
          { axis: 'soft', direction: 1 },
          { axis: 'playful', direction: -1 },
        ],
      },
      {
        id: 'D',
        text: '작아도 포인트가 확실한 소품',
        votes: [
          { axis: 'soft', direction: -1 },
          { axis: 'playful', direction: 1 },
        ],
      },
    ],
  },

  // ── 묶음 4-B ──────────────────────────────────────
  {
    id: 8,
    text: '기분이 복잡한 날엔 보통 어느 쪽에 더 손이 가?',
    options: [
      {
        id: 'A',
        text: '웃기고 다정한 콘텐츠',
        votes: [
          { axis: 'soft', direction: 1 },
          { axis: 'playful', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '차분하게 정리된 글이나 영상',
        votes: [
          { axis: 'soft', direction: -1 },
          { axis: 'playful', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '조용하고 포근한 음악이나 분위기',
        votes: [
          { axis: 'soft', direction: 1 },
          { axis: 'playful', direction: -1 },
        ],
      },
      {
        id: 'D',
        text: '기분을 확 바꿔주는 시원한 한마디',
        votes: [
          { axis: 'soft', direction: -1 },
          { axis: 'playful', direction: 1 },
        ],
      },
    ],
  },

  // ── 묶음 5-A ──────────────────────────────────────
  {
    id: 9,
    text: '내 이상형은 어느 사람이야?',
    options: [
      {
        id: 'A',
        text: '다정하고 포근해서 같이 있으면 마음이 풀리는 사람',
        votes: [
          { axis: 'soft', direction: 1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '단단한데 남 눈치보다 자기 방식이 더 분명한 사람',
        votes: [
          { axis: 'soft', direction: -1 },
          { axis: 'warm', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '부드럽지만 자기만의 분위기가 있는 사람',
        votes: [
          { axis: 'soft', direction: 1 },
          { axis: 'warm', direction: -1 },
        ],
      },
      {
        id: 'D',
        text: '믿음직스럽고 정이 느껴지는 사람',
        votes: [
          { axis: 'soft', direction: -1 },
          { axis: 'warm', direction: 1 },
        ],
      },
    ],
  },

  // ── 묶음 5-B ──────────────────────────────────────
  {
    id: 10,
    text: '오래 함께하고 싶은 존재의 느낌으로 더 가까운 건?',
    options: [
      {
        id: 'A',
        text: '지친 날 괜히 기대고 싶어지는 말랑한 존재',
        votes: [
          { axis: 'soft', direction: 1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '쉽게 흔들리지 않고 자기 길을 가는 존재',
        votes: [
          { axis: 'soft', direction: -1 },
          { axis: 'warm', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '조용한데 자기만의 분위기가 있어서 자꾸 보게 되는 존재',
        votes: [
          { axis: 'soft', direction: 1 },
          { axis: 'warm', direction: -1 },
        ],
      },
      {
        id: 'D',
        text: '표현은 담백해도 든든하게 내 편인 존재',
        votes: [
          { axis: 'soft', direction: -1 },
          { axis: 'warm', direction: 1 },
        ],
      },
    ],
  },

  // ── 묶음 6-A ──────────────────────────────────────
  {
    id: 11,
    text: '찾아가고 싶은 컨셉 카페는 어느 쪽이야?',
    options: [
      {
        id: 'A',
        text: '소품도 많고 귀엽고 정이 가는 카페',
        votes: [
          { axis: 'playful', direction: 1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '개성 강하고 컨셉이 확실한 카페',
        votes: [
          { axis: 'playful', direction: 1 },
          { axis: 'warm', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '조용하고 포근해서 오래 앉아 있고 싶은 카페',
        votes: [
          { axis: 'playful', direction: -1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'D',
        text: '담백한데 분위기가 선명한 카페',
        votes: [
          { axis: 'playful', direction: -1 },
          { axis: 'warm', direction: -1 },
        ],
      },
    ],
  },

  // ── 묶음 6-B ──────────────────────────────────────
  {
    id: 12,
    text: '서점에서 책을 고를 때 더 눈길이 가는 표지는 어느 쪽이야?',
    options: [
      {
        id: 'A',
        text: '귀엽고 다정한 분위기가 느껴지는 표지',
        votes: [
          { axis: 'playful', direction: 1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'B',
        text: '유니크하고 자기 색이 확실한 표지',
        votes: [
          { axis: 'playful', direction: 1 },
          { axis: 'warm', direction: -1 },
        ],
      },
      {
        id: 'C',
        text: '잔잔하고 따뜻한 분위기의 표지',
        votes: [
          { axis: 'playful', direction: -1 },
          { axis: 'warm', direction: 1 },
        ],
      },
      {
        id: 'D',
        text: '담백한데 무드가 선명한 표지',
        votes: [
          { axis: 'playful', direction: -1 },
          { axis: 'warm', direction: -1 },
        ],
      },
    ],
  },
]
