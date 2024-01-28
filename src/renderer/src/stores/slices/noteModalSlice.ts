import { StateCreator } from 'zustand'

export interface noteModalSlice {
  noteModalIsOpened: boolean
  setNoteModalIsOpened: (bool: boolean) => void
  noteModalHandler: () => void
}

export const createNoteModalSlice: StateCreator<noteModalSlice> = (set) => ({
  noteModalIsOpened: false,
  setNoteModalIsOpened: (bool: boolean) => set({ noteModalIsOpened: bool }),
  noteModalHandler: () => set((state) => ({ noteModalIsOpened: !state.noteModalIsOpened }))
})
