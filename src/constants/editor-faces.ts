import type { FaceKey, FaceConfig } from '@/types/editor'

export const FACE_CONFIGS: Record<FaceKey, FaceConfig> = {
  front: {
    key: 'front',
    label: '정면',
    shape: 'octagon',
    rows: 6,
    cols: 3,
    inactiveCells: ['0-0', '0-2', '5-0', '5-1', '5-2'],
  },
  'side-left': {
    key: 'side-left',
    label: '좌측면',
    shape: 'rect',
    rows: 6,
    cols: 3,
    inactiveCells: ['5-0', '5-1', '5-2'],
  },
  'side-right': {
    key: 'side-right',
    label: '우측면',
    shape: 'rect',
    rows: 6,
    cols: 3,
    inactiveCells: [],
  },
  back: {
    key: 'back',
    label: '후면',
    shape: 'octagon',
    rows: 6,
    cols: 3,
    inactiveCells: ['0-0', '0-2', '5-0', '5-1', '5-2'],
  },
}

// UI에 노출할 면 목록. 여기만 수정해서 오픈 범위를 제어한다.
export const ENABLED_FACES: FaceKey[] = ['front', 'side-left']
