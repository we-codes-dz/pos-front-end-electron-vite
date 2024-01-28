import { StateCreator } from 'zustand'

export interface noteModalSlice {
  modalIsOpened: boolean
  setModalIsOpened: (bool: boolean) => void
  modalHandler: () => void
}

export const createNoteModalSlice: StateCreator<noteModalSlice> = (set) => ({
  modalIsOpened: false,
  setModalIsOpened: (bool: boolean) => set({ modalIsOpened: bool }),
  modalHandler: () => set((state) => ({ modalIsOpened: !state.modalIsOpened }))
})
