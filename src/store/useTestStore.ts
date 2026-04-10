import { create } from 'zustand'

type TestStore = {
  answers: Record<number, string>  // { questionId: optionId }
  setAnswer: (questionId: number, optionId: string) => void
  reset: () => void
}

export const useTestStore = create<TestStore>((set) => ({
  answers: {},
  setAnswer: (questionId, optionId) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
    })),
  reset: () => set({ answers: {} }),
}))
