import type { FaceKey, FaceConfig } from '@/types/editor'

export const FACE_CONFIGS: Record<FaceKey, FaceConfig> = {
  front: {
    key: 'front',
    label: '정면',
    shape: 'rect',
    rows: 6,
    cols: 3,
    inactiveCells: [],
    boardWidth: 200,
    boardHeight: 300,
  },
  'side-left': {
    key: 'side-left',
    label: '좌측면',
    shape: 'rect-h',
    rows: 3,
    cols: 5,
    inactiveCells: [],
    boardWidth: 300,
    boardHeight: 150,
  },
  'side-right': {
    key: 'side-right',
    label: '우측면',
    shape: 'rect-h',
    rows: 3,
    cols: 5,
    inactiveCells: [],
    boardWidth: 300,
    boardHeight: 150,
  },
  back: {
    key: 'back',
    label: '후면',
    shape: 'rect',
    rows: 6,
    cols: 3,
    inactiveCells: [],
    boardWidth: 200,
    boardHeight: 300,
  },
}

// UI에 노출할 면 목록. 여기만 수정해서 오픈 범위를 제어한다.
export const ENABLED_FACES: FaceKey[] = ['front', 'side-left', 'back', 'side-right']
