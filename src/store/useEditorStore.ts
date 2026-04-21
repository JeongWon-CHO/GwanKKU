import { create } from 'zustand'
import type { EditorTarget, FaceKey, GridKey, GridState, PlacedDecoration } from '@/types/editor'

const DEFAULT_BACKGROUND = '#faf7f0'
const DEFAULT_FACE: FaceKey = 'front'

const emptyFaceGrids = (): Record<FaceKey, GridState> => ({
  front: {},
  'side-left': {},
  'side-right': {},
  back: {},
})

type EditorStore = {
  target: EditorTarget | null
  backgroundColor: string
  faceGrids: Record<FaceKey, GridState>
  activeFace: FaceKey
  activeItemId: string | null
  message: string
  setTarget: (target: EditorTarget) => void
  setBackgroundColor: (color: string) => void
  setActiveFace: (face: FaceKey) => void
  setActiveItem: (itemId: string | null) => void
  placeItem: (key: GridKey, decoration: PlacedDecoration) => void
  removeItem: (key: GridKey) => void
  setMessage: (message: string) => void
  reset: () => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  target: null,
  backgroundColor: DEFAULT_BACKGROUND,
  faceGrids: emptyFaceGrids(),
  activeFace: DEFAULT_FACE,
  activeItemId: null,
  message: '',

  setTarget: (target) => set({ target }),

  setBackgroundColor: (color) => set({ backgroundColor: color }),

  setActiveFace: (face) => set({ activeFace: face, activeItemId: null }),

  setActiveItem: (itemId) => set({ activeItemId: itemId }),

  placeItem: (key, decoration) =>
    set((state) => ({
      faceGrids: {
        ...state.faceGrids,
        [state.activeFace]: {
          ...state.faceGrids[state.activeFace],
          [key]: decoration,
        },
      },
    })),

  removeItem: (key) =>
    set((state) => {
      const faceGrid = { ...state.faceGrids[state.activeFace] }
      delete faceGrid[key]
      return {
        faceGrids: {
          ...state.faceGrids,
          [state.activeFace]: faceGrid,
        },
      }
    }),

  setMessage: (message) => set({ message }),

  reset: () =>
    set({
      target: null,
      backgroundColor: DEFAULT_BACKGROUND,
      faceGrids: emptyFaceGrids(),
      activeFace: DEFAULT_FACE,
      activeItemId: null,
      message: '',
    }),
}))
