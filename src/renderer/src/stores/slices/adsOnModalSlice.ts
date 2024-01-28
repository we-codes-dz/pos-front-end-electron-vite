import { TSupply } from '@renderer/types/type-schema'
import { supplyExists } from '@renderer/utils/helper'
import { StateCreator } from 'zustand'

export interface adsOnModalSlice {
  adsOnModalIsOpened: boolean
  supplies: TSupply[]
  suppliesOfProduct: TSupply[]
  setAdsOnModalIsOpened: (bool: boolean) => void
  adsOnModalHandler: () => void
  setSupplySelected: (supply: TSupply) => void
  clearSupplies: () => void
  clearSpecificSupply: (supply: TSupply) => void
  clearAllSuppliesForProduct: (productId: number) => void
  setSuppliesOfSpecificProduct: (productId: number) => void
}

export const createAdsOnModalSlice: StateCreator<adsOnModalSlice> = (set) => ({
  adsOnModalIsOpened: false,
  supplies: [],
  suppliesOfProduct: [],
  setAdsOnModalIsOpened: (bool: boolean) => set({ adsOnModalIsOpened: bool }),
  adsOnModalHandler: () => set((state) => ({ adsOnModalIsOpened: !state.adsOnModalIsOpened })),
  setSupplySelected: (supply: TSupply) =>
    set((state) => {
      //? check if the supply already exist in the array
      const isExist = supplyExists(state.supplies, supply)
      if (!isExist)
        //?  if doesn't exist, add the supply to the array
        return { supplies: [...state.supplies, supply] }
      //? if the supply exist, return the array without modifying it
      return state
    }),
  clearSupplies: () => set({ supplies: [] }),
  clearSpecificSupply: (supply: TSupply) =>
    set((state) => ({
      supplies: state.supplies.filter(
        (item) => item.name !== supply.name || item.productId !== supply.productId
      )
    })),
  clearAllSuppliesForProduct: (productId: number) =>
    set((state) => ({
      supplies: state.supplies.filter((item) => item.productId !== productId)
    })),
  setSuppliesOfSpecificProduct: (productId: number) =>
    set((state) => ({
      suppliesOfProduct: state.supplies.filter((item) => item.productId === productId)
    }))
})
