import { create } from 'zustand'
import type { EditorTarget, EditorCategoryId, EditorSelections } from '@/types/editor'

type EditorStore = {
  target: EditorTarget | null
  selections: EditorSelections
  message: string
  setTarget: (target: EditorTarget) => void
  setSelection: (category: EditorCategoryId, itemId: string) => void
  setMessage: (message: string) => void
  reset: () => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  target: null,
  selections: {},
  message: '',

  setTarget: (target) => set({ target }),

  setSelection: (category, itemId) =>
    set((state) => ({
      selections: { ...state.selections, [category]: itemId },
    })),

  setMessage: (message) => set({ message }),

  reset: () => set({ target: null, selections: {}, message: '' }),
}))
