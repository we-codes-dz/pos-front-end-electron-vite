import { StateCreator } from 'zustand'

export interface processToPaymentModalSlice {
  processToPaymentModalIsOpened: boolean
  setProcessToPaymentModalIsOpened: (bool: boolean) => void
  processToPaymentModalHandler: () => void
}

export const createProcessToPaymentModalSlice: StateCreator<processToPaymentModalSlice> = (
  set
) => ({
  processToPaymentModalIsOpened: false,
  setProcessToPaymentModalIsOpened: (bool: boolean) => set({ processToPaymentModalIsOpened: bool }),
  processToPaymentModalHandler: () =>
    set((state) => ({ processToPaymentModalIsOpened: !state.processToPaymentModalIsOpened }))
})
