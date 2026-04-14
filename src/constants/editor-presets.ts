import type { EditorPreset, EditorTarget } from '@/types/editor'
import { COFFIN_CATEGORIES } from './editor-coffin'

// target별 에디터 preset 매핑
// 새 target 추가 시: constants/editor-{target}.ts 작성 후 여기에 등록
export const EDITOR_PRESETS: Record<EditorTarget, EditorPreset> = {
  coffin: {
    target: 'coffin',
    objectLabel: '관',
    categories: COFFIN_CATEGORIES,
  },
  urn: {
    target: 'urn',
    objectLabel: '유골함',
    categories: [], // 추후 editor-urn.ts 작성 후 연결
  },
  funeral: {
    target: 'funeral',
    objectLabel: '장례식장',
    categories: [], // 추후 editor-funeral.ts 작성 후 연결
  },
  grave: {
    target: 'grave',
    objectLabel: '산소',
    categories: [], // 추후 editor-grave.ts 작성 후 연결
  },
}
