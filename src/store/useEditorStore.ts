import { create } from 'zustand'
import type { EditorTarget, FaceKey, GridKey, GridState, MessageStyle, PlacedDecoration, UploadedImage } from '@/types/editor'
import type { PatternId } from '@/constants/editor-patterns'
import type { CoffinSnapshot } from '@/types/snapshot'

const DEFAULT_BACKGROUND = '#faf7f0'
const DEFAULT_FACE: FaceKey = 'front'
const DEFAULT_MESSAGE_STYLE: MessageStyle = {
  font: 'pretendard',
  align: 'center',
  bold: false,
  italic: false,
}

const emptyFaceGrids = (): Record<FaceKey, GridState> => ({
  front: {},
  'side-left': {},
  'side-right': {},
  back: {},
})

type EditorStore = {
  target: EditorTarget | null
  backgroundColor: string
  backgroundPatternId: PatternId
  faceGrids: Record<FaceKey, GridState>
  activeFace: FaceKey
  activeItemId: string | null
  message: string
  messageStyle: MessageStyle
  uploadedImages: UploadedImage[]
  setTarget: (target: EditorTarget) => void
  setBackgroundColor: (color: string) => void
  setBackgroundPatternId: (id: PatternId) => void
  setActiveFace: (face: FaceKey) => void
  setActiveItem: (itemId: string | null) => void
  placeItem: (key: GridKey, decoration: PlacedDecoration) => void
  removeItem: (key: GridKey) => void
  setMessage: (message: string) => void
  setMessageStyle: (partial: Partial<MessageStyle>) => void
  addUploadedImage: (img: UploadedImage) => void
  removeUploadedImage: (id: string) => void
  loadFromSnapshot: (snapshot: CoffinSnapshot) => void
  reset: () => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  target: null,
  backgroundColor: DEFAULT_BACKGROUND,
  backgroundPatternId: 'none',
  faceGrids: emptyFaceGrids(),
  activeFace: DEFAULT_FACE,
  activeItemId: null,
  message: '',
  messageStyle: DEFAULT_MESSAGE_STYLE,
  uploadedImages: [],

  setTarget: (target) => set({ target }),

  setBackgroundColor: (color) => set({ backgroundColor: color }),

  setBackgroundPatternId: (id) => set({ backgroundPatternId: id }),

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

  setMessageStyle: (partial) =>
    set((state) => ({ messageStyle: { ...state.messageStyle, ...partial } })),

  addUploadedImage: (img) =>
    set((state) => ({ uploadedImages: [...state.uploadedImages, img] })),

  removeUploadedImage: (id) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((img) => img.id !== id),
      activeItemId: state.activeItemId === id ? null : state.activeItemId,
    })),

  loadFromSnapshot: (snapshot) =>
    set({
      target: snapshot.target,
      backgroundColor: snapshot.backgroundColor,
      backgroundPatternId: snapshot.backgroundPatternId,
      faceGrids: snapshot.faceGrids,
      activeFace: DEFAULT_FACE,
      activeItemId: null,
      message: snapshot.message,
      messageStyle: snapshot.messageStyle,
      uploadedImages: snapshot.uploadedImages,
    }),

  reset: () =>
    set({
      target: null,
      backgroundColor: DEFAULT_BACKGROUND,
      backgroundPatternId: 'none',
      faceGrids: emptyFaceGrids(),
      activeFace: DEFAULT_FACE,
      activeItemId: null,
      message: '',
      messageStyle: DEFAULT_MESSAGE_STYLE,
      uploadedImages: [],
    }),
}))
