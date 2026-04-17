import { create } from 'zustand'
import type { EditorTarget, GridKey, GridState, PlacedDecoration } from '@/types/editor'

const DEFAULT_BACKGROUND = '#faf7f0'

type EditorStore = {
  target: EditorTarget | null
  backgroundColor: string
  grid: GridState
  activeItemId: string | null
  message: string
  setTarget: (target: EditorTarget) => void
  setBackgroundColor: (color: string) => void
  setActiveItem: (itemId: string | null) => void
  placeItem: (key: GridKey, decoration: PlacedDecoration) => void
  removeItem: (key: GridKey) => void
  setMessage: (message: string) => void
  reset: () => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  target: null,
  backgroundColor: DEFAULT_BACKGROUND,
  grid: {},
  activeItemId: null,
  message: '',

  setTarget: (target) => set({ target }),

  setBackgroundColor: (color) => set({ backgroundColor: color }),

  setActiveItem: (itemId) => set({ activeItemId: itemId }),

  placeItem: (key, decoration) =>
    set((state) => ({ grid: { ...state.grid, [key]: decoration } })),

  removeItem: (key) =>
    set((state) => {
      const next = { ...state.grid }
      delete next[key]
      return { grid: next }
    }),

  setMessage: (message) => set({ message }),

  reset: () =>
    set({
      target: null,
      backgroundColor: DEFAULT_BACKGROUND,
      grid: {},
      activeItemId: null,
      message: '',
    }),
}))
